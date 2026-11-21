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
export type SpeechStatus = 'mic-open' | 'sound' | 'speech'

type RecognizerState = 'idle' | 'starting' | 'listening' | 'stopping'

/**
 * State-machine wrapper around a single reused Web Speech API instance.
 * - Keeps ONE `SpeechRecognition` instance alive to avoid Chromium's dual-instance `abort()` race
 *   where creating a second instance synchronously starves audio capture.
 * - Starts synchronously on click when idle; queues pending restarts cleanly until `onend` settles.
 * - `stopAndWait()` lets callers flush the trailing final transcript before scoring.
 */
export class SpeechRecognizer {
  private recognition: any = null
  private state: RecognizerState = 'idle'
  private sessionId: number = 0
  private retryTimer: ReturnType<typeof setTimeout> | null = null
  private pendingStart: (() => void) | null = null
  private pendingStartTimer: ReturnType<typeof setTimeout> | null = null
  private pendingStopResolvers: Array<() => void> = []
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

  private flushStopResolvers() {
    if (this.pendingStopResolvers.length === 0) return
    const list = this.pendingStopResolvers.splice(0, this.pendingStopResolvers.length)
    list.forEach((resolve) => {
      try {
        resolve()
      } catch {}
    })
  }

  private clearTimers() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer)
      this.retryTimer = null
    }
    if (this.pendingStartTimer) {
      clearTimeout(this.pendingStartTimer)
      this.pendingStartTimer = null
    }
  }

  public start({
    lang,
    onResult,
    onError,
    onEnd,
    onStatus,
  }: {
    lang: string // ja-JP, zh-CN, vi-VN
    onResult: (transcript: string, isFinal: boolean) => void
    onError: (error: any) => void
    onEnd: () => void
    onStatus?: (status: SpeechStatus) => void
  }) {
    if (!this.recognition) {
      onError({ error: 'unsupported', message: 'Speech Recognition không được hỗ trợ trên trình duyệt này' })
      return
    }

    this.clearTimers()
    this.pendingStart = null
    const mySession = ++this.sessionId

    const launch = (allowRetry: boolean) => {
      if (mySession !== this.sessionId || !this.recognition) return
      const rec = this.recognition
      rec.lang = lang

      rec.onstart = () => {
        if (mySession !== this.sessionId) return
        this.state = 'listening'
        this.isListening = true
      }

      rec.onaudiostart = () => {
        if (mySession === this.sessionId) onStatus?.('mic-open')
      }
      rec.onsoundstart = () => {
        if (mySession === this.sessionId) onStatus?.('sound')
      }
      rec.onspeechstart = () => {
        if (mySession === this.sessionId) onStatus?.('speech')
      }

      rec.onresult = (event: any) => {
        if (mySession !== this.sessionId) return
        let fullFinal = ''
        let fullInterim = ''
        let hasNewFinal = false
        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i]
          const seg = res?.[0]?.transcript || ''
          if (res?.isFinal) {
            fullFinal += seg
            if (i >= event.resultIndex) hasNewFinal = true
          } else {
            fullInterim += seg
          }
        }
        const combined = `${fullFinal}${fullInterim}`.trim()
        if (combined) {
          onResult(combined, hasNewFinal && !fullInterim.trim())
        }
      }

      rec.onerror = (event: any) => {
        if (mySession !== this.sessionId) return
        this.isListening = false
        onError(event)
      }

      rec.onend = () => {
        this.state = 'idle'
        this.isListening = false
        if (this.pendingStartTimer) {
          clearTimeout(this.pendingStartTimer)
          this.pendingStartTimer = null
        }
        this.flushStopResolvers()

        if (this.pendingStart) {
          const next = this.pendingStart
          this.pendingStart = null
          next()
          return
        }

        if (mySession === this.sessionId) {
          onEnd()
        }
      }

      try {
        this.state = 'starting'
        this.isListening = true
        rec.start()
      } catch (err: any) {
        this.state = 'idle'
        this.isListening = false
        if (allowRetry && err?.name === 'InvalidStateError') {
          this.retryTimer = setTimeout(() => {
            this.retryTimer = null
            launch(false)
          }, 180)
          return
        }
        if (mySession === this.sessionId) {
          onError({ error: err?.name || 'start-failed', message: err?.message })
        }
      }
    }

    if (this.state === 'idle') {
      launch(true)
      return
    }

    this.pendingStart = () => launch(true)
    this.state = 'stopping'
    this.isListening = false
    try {
      this.recognition.abort()
    } catch {}

    this.pendingStartTimer = setTimeout(() => {
      this.pendingStartTimer = null
      if (this.pendingStart && mySession === this.sessionId) {
        this.state = 'idle'
        const next = this.pendingStart
        this.pendingStart = null
        next()
      }
    }, 250)
  }

  public stop() {
    if (!this.recognition) return
    if (this.state === 'starting' || this.state === 'listening') {
      this.state = 'stopping'
      try {
        this.recognition.stop()
      } catch {}
    }
  }

  public stopAndWait(timeoutMs: number = 1000): Promise<void> {
    if (!this.recognition || this.state === 'idle') {
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      let settled = false
      const done = () => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        resolve()
      }
      const timer = setTimeout(() => {
        const idx = this.pendingStopResolvers.indexOf(done)
        if (idx >= 0) this.pendingStopResolvers.splice(idx, 1)
        done()
      }, timeoutMs)

      this.pendingStopResolvers.push(done)
      if (this.state === 'starting' || this.state === 'listening') {
        this.stop()
      }
    })
  }

  public abort() {
    this.sessionId += 1
    this.clearTimers()
    this.pendingStart = null
    this.flushStopResolvers()
    this.isListening = false
    if (this.recognition && this.state !== 'idle') {
      this.state = 'stopping'
      try {
        this.recognition.abort()
      } catch {}
    }
  }
}

/**
 * Cloud fallback STT (OpenAI Whisper compatible endpoint) for environments where the browser
 * Web Speech API is unavailable or blocked (Electron, Chromium without Google keys, Brave, ...).
 */
export async function transcribeAudioWithOpenAI(blob: Blob, langCode: string): Promise<string> {
  const settings = loadSettings()
  const apiKey = (settings.openaiApiKey || '').trim()
  if (!apiKey) throw new Error('Chưa cấu hình OpenAI API Key trong Cài đặt.')
  const base = (settings.openaiEndpoint || 'https://api.openai.com/v1').replace(/\/+$/, '')
  const ext = blob.type.includes('mp4') ? 'mp4' : blob.type.includes('ogg') ? 'ogg' : 'webm'
  const form = new FormData()
  form.append('file', blob, `speech.${ext}`)
  form.append('model', 'whisper-1')
  form.append('language', langCode.split('-')[0].toLowerCase())
  form.append('response_format', 'json')

  const res = await fetch(`${base}/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  })
  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.json())?.error?.message || ''
    } catch {}
    throw new Error(`Whisper lỗi ${res.status}${detail ? `: ${detail}` : ''}`)
  }
  const data = await res.json()
  return String(data?.text || '').trim()
}
