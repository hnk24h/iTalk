// Web Speech & High-Quality Neural Cloud TTS Engine
import { setAudioOutputDevice } from './deviceManager'

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
  return allVoices.filter(v => v.lang.toLowerCase().startsWith(prefix))
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

/**
 * Play Speech with High-Quality Google Studio Voice or Local System Voice Fallback
 */
export function playTextToSpeech({
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

  // 1. PRIMARY: High-Quality Google Neural Studio Voice (Same voice as Web Chrome!)
  if (useNeuralCloud && text.length <= 250) {
    try {
      const shortLang = getShortLang(lang)
      const cloudUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text
      )}&tl=${shortLang}&client=tw-ob`

      const audio = new Audio(cloudUrl)
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
        console.warn('Cloud TTS error, falling back to local system speech synthesis:', e)
        activeAudio = null
        playLocalSpeechSynthesis({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
      }

      activeAudio = audio
      audio.play().catch((err) => {
        console.warn('Audio play prevented or offline, falling back to local voice:', err)
        activeAudio = null
        playLocalSpeechSynthesis({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
      })
      return
    } catch (err) {
      console.warn('Cloud audio initialization error:', err)
    }
  }

  // 2. FALLBACK: Local System Speech Synthesis
  playLocalSpeechSynthesis({ text, lang, rate, pitch, voiceUri, onStart, onEnd, onError })
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
    // Pick best natural voice matching language
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
