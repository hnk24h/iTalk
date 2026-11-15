// Multi-Engine High-Quality Neural TTS & Speech Recognition Service
import { setAudioOutputDevice } from './deviceManager'
import { loadSettings } from './storage'

export interface SpeechVoiceOption {
  voice: SpeechSynthesisVoice
  name: string
  lang: string
}

let activeUtterance: SpeechSynthesisUtterance | null = null
let activeAudio: HTMLAudioElement | null = null

export function getAvailableVoices(langCode?: string): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  const allVoices = window.speechSynthesis.getVoices()
  if (!langCode) return allVoices
  const prefix = langCode.split('-')[0].toLowerCase()
  return allVoices.filter((v) => v.lang.toLowerCase().startsWith(prefix))
}

function getShortLang(lang: string): string {
  const lower = lang.toLowerCase()
  if (lower.startsWith('ja')) return 'ja'
  if (lower.startsWith('zh')) return 'zh-CN'
  if (lower.startsWith('vi')) return 'vi'
  return lang
}

export function stopTextToSpeech() {
  if (activeAudio) {
    try {
      activeAudio.pause()
      activeAudio.currentTime = 0
    } catch {}
    activeAudio = null
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
    activeUtterance = null
  }
}

function playAudioDataUrl({
  dataUrl,
  rate = 1.0,
  sinkId,
  onStart,
  onEnd,
  onError,
}: {
  dataUrl: string
  rate?: number
  sinkId?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}) {
  try {
    const audio = new Audio(dataUrl)
    audio.playbackRate = rate

    if (sinkId) {
      setAudioOutputDevice(audio, sinkId)
    }

    audio.onplay = () => {
      onStart?.()
    }

    audio.onended = () => {
      activeAudio = null
      onEnd?.()
    }

    audio.onerror = (e) => {
      activeAudio = null
      onError?.(e)
    }

    activeAudio = audio
    audio.play().catch((err) => {
      activeAudio = null
      onError?.(err)
    })
  } catch (err) {
    onError?.(err)
  }
}

/**
 * Play Speech with Multi-Engine Support:
 * 1. Microsoft Edge Natural Neural (Default for desktop & web)
 * 2. VoiceStudio AI Engine (http://localhost:3900 - CosyVoice / IndexTTS)
 * 3. OpenAI Cloud TTS
 * 4. Local System Speech Fallback
 */
export async function playTextToSpeech({
  text,
  lang,
  rate = 1.0,
  pitch = 1.0,
  useNeuralCloud = true,
  voiceUri,
  sinkId,
  onStart,
  onEnd,
  onError,
}: {
  text: string
  lang: string // e.g. ja-JP, zh-CN, vi-VN
  rate?: number // 0.5 to 1.5
  pitch?: number
  useNeuralCloud?: boolean
  voiceUri?: string
  sinkId?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}) {
  stopTextToSpeech()

  const settings = loadSettings()
  const engine = settings.ttsEngine || 'edge'

  // 1. VoiceStudio Local AI Engine (CosyVoice / IndexTTS)
  if (engine === 'voicestudio' && window.electronAPI?.synthesizeVoiceStudioSpeech) {
    try {
      const res = await window.electronAPI.synthesizeVoiceStudioSpeech({
        endpoint: settings.voiceStudioEndpoint || 'http://127.0.0.1:3900',
        text,
        model: settings.voiceStudioModel || 'cosyvoice',
        voice: settings.voiceStudioVoice || 'ja_female',
        speed: rate,
      })

      if (res.success && res.audioDataUrl) {
        playAudioDataUrl({
          dataUrl: res.audioDataUrl,
          rate,
          sinkId,
          onStart,
          onEnd,
          onError: () => {
            // Fallback to Edge Neural if playback failed
            fallbackToEdgeOrSystem({ text, lang, rate, pitch, voiceUri, sinkId, onStart, onEnd, onError })
          },
        })
        return
      } else {
        console.warn('VoiceStudio synthesis failed, falling back:', res.error)
      }
    } catch (err) {
      console.warn('VoiceStudio request error:', err)
    }
  }

  // 2. OpenAI Cloud TTS
  if (engine === 'openai' && window.electronAPI?.synthesizeOpenAISpeech) {
    try {
      const res = await window.electronAPI.synthesizeOpenAISpeech({
        endpoint: settings.openaiEndpoint || 'https://api.openai.com/v1',
        apiKey: settings.openaiApiKey,
        text,
        model: settings.openaiModel || 'tts-1',
        voice: settings.openaiVoice || 'nova',
        speed: rate,
      })

      if (res.success && res.audioDataUrl) {
        playAudioDataUrl({
          dataUrl: res.audioDataUrl,
          rate,
          sinkId,
          onStart,
          onEnd,
          onError: () => {
            fallbackToEdgeOrSystem({ text, lang, rate, pitch, voiceUri, sinkId, onStart, onEnd, onError })
          },
        })
        return
      }
    } catch (err) {
      console.warn('OpenAI TTS error:', err)
    }
  }

  // 3. Microsoft Edge Natural Neural (Default & High-Accuracy studio pronunciation)
  if (useNeuralCloud && engine !== 'system' && window.electronAPI?.synthesizeEdgeSpeech) {
    try {
      let voice = settings.edgeVoiceJa || 'ja-JP-NanamiNeural'
      if (lang.toLowerCase().startsWith('zh')) {
        voice = settings.edgeVoiceZh || 'zh-CN-XiaoxiaoNeural'
      } else if (lang.toLowerCase().startsWith('vi')) {
        voice = settings.edgeVoiceVi || 'vi-VN-HoaiMyNeural'
      }

      const res = await window.electronAPI.synthesizeEdgeSpeech({
        text,
        voice,
        rate,
        pitch: 0,
      })

      if (res.success && res.audioDataUrl) {
        playAudioDataUrl({
          dataUrl: res.audioDataUrl,
          rate,
          sinkId,
          onStart,
          onEnd,
          onError: () => {
            playLocalSpeechSynthesis({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
          },
        })
        return
      } else {
        console.warn('Edge TTS synthesis failed in main process:', res.error)
      }
    } catch (err) {
      console.warn('Edge TTS invocation error:', err)
    }
  }

  // 4. Web browser fallback: Google Translate TTS if in web mode
  if (useNeuralCloud && engine !== 'system' && !window.electronAPI?.isElectron && text.length <= 250) {
    try {
      const shortLang = getShortLang(lang)
      const cloudUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text
      )}&tl=${shortLang}&client=tw-ob`

      playAudioDataUrl({
        dataUrl: cloudUrl,
        rate,
        sinkId,
        onStart,
        onEnd,
        onError: () => {
          playLocalSpeechSynthesis({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
        },
      })
      return
    } catch (err) {
      console.warn('Web Cloud TTS error:', err)
    }
  }

  // 5. Final Fallback: Local System Speech Synthesis
  playLocalSpeechSynthesis({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
}

function fallbackToEdgeOrSystem({
  text,
  lang,
  rate,
  pitch,
  voiceUri,
  sinkId,
  onStart,
  onEnd,
  onError,
}: {
  text: string
  lang: string
  rate: number
  pitch?: number
  voiceUri?: string
  sinkId?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}) {
  if (window.electronAPI?.synthesizeEdgeSpeech) {
    const settings = loadSettings()
    let voice = settings.edgeVoiceJa || 'ja-JP-NanamiNeural'
    if (lang.toLowerCase().startsWith('zh')) voice = settings.edgeVoiceZh || 'zh-CN-XiaoxiaoNeural'
    if (lang.toLowerCase().startsWith('vi')) voice = settings.edgeVoiceVi || 'vi-VN-HoaiMyNeural'

    window.electronAPI
      .synthesizeEdgeSpeech({ text, voice, rate })
      .then((res) => {
        if (res.success && res.audioDataUrl) {
          playAudioDataUrl({ dataUrl: res.audioDataUrl, rate, sinkId, onStart, onEnd, onError })
        } else {
          playLocalSpeechSynthesis({ text, lang, rate, pitch: pitch || 1.0, voiceUri, onStart, onEnd, onError })
        }
      })
      .catch(() => {
        playLocalSpeechSynthesis({ text, lang, rate, pitch: pitch || 1.0, voiceUri, onStart, onEnd, onError })
      })
  } else {
    playLocalSpeechSynthesis({ text, lang, rate, pitch: pitch || 1.0, voiceUri, onStart, onEnd, onError })
  }
}

function playLocalSpeechSynthesis({
  text,
  lang,
  rate,
  pitch,
  voiceUri,
  onStart,
  onEnd,
  onError,
}: {
  text: string
  lang: string
  rate: number
  pitch: number
  voiceUri?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError?.(new Error('Hệ thống không hỗ trợ Speech Synthesis'))
    return
  }

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = rate
  utterance.pitch = pitch

  const allVoices = window.speechSynthesis.getVoices()
  if (voiceUri) {
    const selectedVoice = allVoices.find((v) => v.voiceURI === voiceUri)
    if (selectedVoice) utterance.voice = selectedVoice
  } else {
    const matching = getAvailableVoices(lang)
    if (matching.length > 0) {
      const best = matching.find(
        (v) =>
          v.name.includes('Natural') ||
          v.name.includes('Online') ||
          v.name.includes('Google') ||
          v.name.includes('Ayumi') ||
          v.name.includes('Haruka') ||
          v.name.includes('Xiaoxiao') ||
          v.name.includes('HoaiMy')
      )
      utterance.voice = best || matching[0]
    }
  }

  utterance.onstart = () => onStart?.()
  utterance.onend = () => {
    activeUtterance = null
    onEnd?.()
  }
  utterance.onerror = (e) => {
    activeUtterance = null
    onError?.(e)
  }

  activeUtterance = utterance
  window.speechSynthesis.speak(utterance)
}

// Speech Recognition (Speech to Text)
export class SpeechRecognizer {
  private recognition: any = null
  public isListening: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.maxAlternatives = 1
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null
  }

  public start({
    lang,
    onResult,
    onError,
    onEnd,
  }: {
    lang: string // ja-JP, zh-CN, vi-VN
    onResult: (transcript: string, isFinal: boolean) => void
    onError: (error: any) => void
    onEnd: () => void
  }) {
    if (!this.recognition) {
      onError(new Error('Speech Recognition không được hỗ trợ'))
      return
    }

    try {
      this.recognition.abort()
    } catch {}

    this.recognition.lang = lang

    this.recognition.onresult = (event: any) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interimTranscript += event.results[i][0].transcript
        }
      }

      const combined = finalTranscript || interimTranscript
      onResult(combined.trim(), Boolean(finalTranscript))
    }

    this.recognition.onerror = (event: any) => {
      this.isListening = false
      onError(event)
    }

    this.recognition.onend = () => {
      this.isListening = false
      onEnd()
    }

    try {
      this.recognition.start()
      this.isListening = true
    } catch (err) {
      this.isListening = false
      onError(err)
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop()
      } catch {}
      this.isListening = false
    }
  }
}
