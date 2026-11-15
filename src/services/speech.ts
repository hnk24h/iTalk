// Web Speech API Wrapper for Text-To-Speech (TTS) and Speech-To-Text (STT)

export interface SpeechVoiceOption {
  voice: SpeechSynthesisVoice
  name: string
  lang: string
}

let activeUtterance: SpeechSynthesisUtterance | null = null

export function getAvailableVoices(langCode?: string): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  const allVoices = window.speechSynthesis.getVoices()
  if (!langCode) return allVoices
  const prefix = langCode.split('-')[0].toLowerCase()
  return allVoices.filter(v => v.lang.toLowerCase().startsWith(prefix))
}

export function playTextToSpeech({
  text,
  lang,
  rate = 1.0,
  pitch = 1.0,
  onStart,
  onEnd,
  onError,
}: {
  text: string
  lang: string // e.g. ja-JP, zh-CN, vi-VN
  rate?: number // 0.5 to 1.5
  pitch?: number
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError?.(new Error('Trình duyệt không hỗ trợ Web Speech API'))
    return null
  }

  // Cancel any ongoing speech
  stopTextToSpeech()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = rate
  utterance.pitch = pitch

  // Pick best matching voice
  const matchingVoices = getAvailableVoices(lang)
  if (matchingVoices.length > 0) {
    // Prefer natural/Google/native voice
    const naturalVoice = matchingVoices.find(v =>
      v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium')
    )
    utterance.voice = naturalVoice || matchingVoices[0]
  }

  utterance.onstart = () => {
    onStart?.()
  }

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
  return utterance
}

export function stopTextToSpeech() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
    activeUtterance = null
  }
}

// Speech Recognition (Speech to Text)
export class SpeechRecognizer {
  private recognition: any = null
  public isListening: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
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
