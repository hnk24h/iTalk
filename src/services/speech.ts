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

export function isElectron(): boolean {
  return typeof window !== 'undefined' && Boolean(window.electronAPI?.isElectron)
}

export function getAvailableVoices(langCode?: string): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  const allVoices = window.speechSynthesis.getVoices()
  if (!langCode) return allVoices
  const prefix = langCode.split('-')[0].toLowerCase()
  return allVoices.filter((v) => v.lang.toLowerCase().startsWith(prefix))
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
 * Standard Web Browser Speech Synthesis
 * Prioritizes Chrome's built-in "Google 日本語" / "Google 普通话" cloud neural voices,
 * and Microsoft Edge's "Online (Natural)" voices, strictly excluding robotic desktop voices.
 */
function playWebBrowserSpeech({
  text,
  lang,
  rate = 1.0,
  pitch = 1.0,
  voiceUri,
  onStart,
  onEnd,
  onError,
}: {
  text: string
  lang: string
  rate?: number
  pitch?: number
  voiceUri?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError?.(new Error('Trình duyệt không hỗ trợ Web Speech API'))
    return
  }

  const speak = () => {
    stopTextToSpeech()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = pitch

    const allVoices = window.speechSynthesis.getVoices()

    if (voiceUri) {
      const selectedVoice = allVoices.find((v) => v.voiceURI === voiceUri)
      if (selectedVoice) utterance.voice = selectedVoice
    } else {
      const prefix = lang.split('-')[0].toLowerCase()
      const matching = allVoices.filter((v) => v.lang.toLowerCase().startsWith(prefix))

      if (matching.length > 0) {
        // Priority 1: Google Cloud voice in Chrome (e.g. "Google 日本語", "Google 普通话", "Google US English")
        const googleVoice = matching.find((v) => v.name.includes('Google'))

        // Priority 2: Microsoft Online / Natural in Edge browser (e.g. "Microsoft Nanami Online (Natural)")
        const naturalVoice = matching.find(
          (v) => (v.name.includes('Natural') || v.name.includes('Online')) && !v.name.includes('Desktop')
        )

        // Priority 3: Any non-desktop voice (excluding robotic Haruka / Ichiro desktop)
        const nonDesktopVoice = matching.find(
          (v) =>
            !v.name.includes('Desktop') &&
            !v.name.includes('Haruka') &&
            !v.name.includes('Ichiro') &&
            !v.name.includes('Ayumi')
        )

        utterance.voice = googleVoice || naturalVoice || nonDesktopVoice || matching[0]
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

  // Handle async voice loading in browsers
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) {
    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
      speak()
    }
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged)
    // Safety fallback timeout if voiceschanged doesn't fire
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
      speak()
    }, 200)
  } else {
    speak()
  }
}

/**
 * High-quality fallback speech execution:
 * On Electron, falls back to Edge Natural Neural TTS; on Web, falls back to Web Speech API.
 */
function fallbackSpeech(options: {
  text: string
  lang: string
  rate?: number
  pitch?: number
  voiceUri?: string
  sinkId?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}) {
  const inElectron = isElectron()
  if (inElectron && window.electronAPI?.synthesizeEdgeSpeech) {
    const langPrefix = options.lang.split('-')[0].toLowerCase()
    const edgeVoice =
      langPrefix === 'ja'
        ? 'ja-JP-NanamiNeural'
        : langPrefix === 'zh'
        ? 'zh-CN-XiaoxiaoNeural'
        : langPrefix === 'vi'
        ? 'vi-VN-HoaiMyNeural'
        : 'en-US-JennyNeural'

    window.electronAPI
      .synthesizeEdgeSpeech({
        text: options.text,
        voice: edgeVoice,
        rate: options.rate || 1.0,
      })
      .then((res) => {
        if (res.success && res.audioDataUrl) {
          playAudioDataUrl({
            dataUrl: res.audioDataUrl,
            rate: options.rate,
            sinkId: options.sinkId,
            onStart: options.onStart,
            onEnd: options.onEnd,
            onError: () => {
              playWebBrowserSpeech(options)
            },
          })
        } else {
          playWebBrowserSpeech(options)
        }
      })
      .catch(() => {
        playWebBrowserSpeech(options)
      })
  } else {
    playWebBrowserSpeech(options)
  }
}

/**
 * Play Speech with Multi-Engine Support:
 * - On Web Browser: Native Chrome "Google 日本語" / Edge Natural (Original standard pronunciation)
 * - On Electron Desktop: Microsoft Edge Natural Neural (NanamiNeural/KeitaNeural) or VoiceStudio
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
  const inElectron = isElectron()
  const engine = settings.ttsEngine || 'edge'

  // 1. VoiceStudio Local AI Engine (OmniVoice / CosyVoice / IndexTTS) - Available on Desktop and Web
  if (engine === 'voicestudio') {
    let vsHandled = false

    if (inElectron && window.electronAPI?.synthesizeVoiceStudioSpeech) {
      try {
        const res = await window.electronAPI.synthesizeVoiceStudioSpeech({
          endpoint: settings.voiceStudioEndpoint || 'http://127.0.0.1:3900',
          text,
          model: settings.voiceStudioModel || 'tts-1',
          voice: settings.voiceStudioVoice || 'default',
          speed: rate,
          language: lang,
          responseFormat: 'wav',
        })

        if (res.success && res.audioDataUrl) {
          vsHandled = true
          playAudioDataUrl({
            dataUrl: res.audioDataUrl,
            rate,
            sinkId,
            onStart,
            onEnd,
            onError: (playErr) => {
              console.warn('[VoiceStudio] Audio playback failed, falling back:', playErr)
              fallbackSpeech({ text, lang, rate, pitch, voiceUri, sinkId, onStart, onEnd, onError })
            },
          })
          return
        } else if (res.error) {
          console.warn('[VoiceStudio] Synthesis error from server:', res.error)
        }
      } catch (err) {
        console.warn('[VoiceStudio] Electron IPC error:', err)
      }
    } else if (!inElectron) {
      // Direct fetch on Web (VoiceStudio has CORS enabled)
      try {
        let endpoint = (settings.voiceStudioEndpoint || 'http://127.0.0.1:3900').trim().replace(/\/+$/, '')
        if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
          endpoint = `http://${endpoint}`
        }
        const langCode = lang ? lang.split('-')[0].toLowerCase() : undefined
        let voice = settings.voiceStudioVoice || 'default'
        if (voice === 'ja_female') voice = 'default'

        const resp = await fetch(`${endpoint}/v1/audio/speech`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: settings.voiceStudioModel || 'tts-1',
            input: text,
            voice,
            response_format: 'wav',
            speed: rate,
            ...(langCode ? { language: langCode } : {}),
          }),
        })

        if (resp.ok) {
          const blob = await resp.blob()
          const blobUrl = URL.createObjectURL(blob)
          vsHandled = true
          playAudioDataUrl({
            dataUrl: blobUrl,
            rate,
            sinkId,
            onStart,
            onEnd: () => {
              URL.revokeObjectURL(blobUrl)
              onEnd?.()
            },
            onError: () => {
              URL.revokeObjectURL(blobUrl)
              fallbackSpeech({ text, lang, rate, pitch, voiceUri, sinkId, onStart, onEnd, onError })
            },
          })
          return
        } else {
          const errText = await resp.text().catch(() => '')
          console.warn('[VoiceStudio Web] HTTP error:', resp.status, errText)
        }
      } catch (err) {
        console.warn('[VoiceStudio Web] fetch error:', err)
      }
    }

    if (!vsHandled) {
      console.warn('[VoiceStudio] Server unreachable or returned error. Falling back to backup TTS...')
      fallbackSpeech({ text, lang, rate, pitch, voiceUri, sinkId, onStart, onEnd, onError })
      return
    }
  }

  // 2. OpenAI Cloud TTS
  if (engine === 'openai' && settings.openaiApiKey) {
    if (inElectron && window.electronAPI?.synthesizeOpenAISpeech) {
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
              playWebBrowserSpeech({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
            },
          })
          return
        }
      } catch (err) {
        console.warn('OpenAI TTS error:', err)
      }
    }
  }

  // 3. Electron Desktop Mode: Use Microsoft Edge Natural Neural (Nanami / Keita)
  if (inElectron && useNeuralCloud && engine !== 'system' && window.electronAPI?.synthesizeEdgeSpeech) {
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
            playWebBrowserSpeech({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
          },
        })
        return
      }
    } catch (err) {
      console.warn('Edge TTS invocation error on desktop:', err)
    }
  }

  // 4. Web Browser Mode (Default & Standard):
  // Directly use browser's natural cloud speech synthesis (Google 日本語 / Google 普通话)
  playWebBrowserSpeech({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
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
      onError(new Error('Speech Recognition không được hỗ trợ trên trình duyệt này'))
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
