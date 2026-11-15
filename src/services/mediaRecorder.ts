export interface RecordingResult {
  blob: Blob
  blobUrl: string
  mimeType: string
  durationSec: number
}

export class MediaRecordingManager {
  private mediaRecorder: MediaRecorder | null = null
  private recordedChunks: Blob[] = []
  private stream: MediaStream | null = null
  private startTime: number = 0
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private animFrameId: number | null = null

  public isRecording: boolean = false

  public async start({
    type,
    videoElement,
    onAudioLevel,
  }: {
    type: 'audio' | 'video'
    videoElement?: HTMLVideoElement | null
    onAudioLevel?: (level: number) => void
  }): Promise<void> {
    this.recordedChunks = []
    this.startTime = Date.now()

    const constraints: MediaStreamConstraints = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: type === 'video' ? {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user',
      } : false,
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (type === 'video' && videoElement && this.stream) {
        videoElement.srcObject = this.stream
        videoElement.play().catch(() => {})
      }

      // Audio Level Meter
      if (onAudioLevel && this.stream.getAudioTracks().length > 0) {
        this.setupAudioMeter(this.stream, onAudioLevel)
      }

      // Pick supported mimeType
      let mimeType = 'video/webm;codecs=vp9,opus'
      if (type === 'audio') {
        mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm'
      } else {
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = MediaRecorder.isTypeSupported('video/webm')
            ? 'video/webm'
            : 'video/mp4'
        }
      }

      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
      })

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data)
        }
      }

      this.mediaRecorder.start(250) // slice every 250ms
      this.isRecording = true
    } catch (err: any) {
      this.cleanup()
      throw new Error(err.message || 'Không thể truy cập Microphone hoặc Camera')
    }
  }

  public async stop(): Promise<RecordingResult> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        reject(new Error('Chưa có phiên ghi âm nào đang chạy'))
        return
      }

      const durationSec = Math.max(1, Math.round((Date.now() - this.startTime) / 1000))
      const mimeType = this.mediaRecorder.mimeType || 'video/webm'

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: mimeType })
        const blobUrl = URL.createObjectURL(blob)
        this.cleanup()
        resolve({
          blob,
          blobUrl,
          mimeType,
          durationSec,
        })
      }

      try {
        this.mediaRecorder.stop()
        this.isRecording = false
      } catch (err) {
        this.cleanup()
        reject(err)
      }
    })
  }

  private setupAudioMeter(stream: MediaStream, callback: (level: number) => void) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      this.audioContext = new AudioCtx()
      const source = this.audioContext.createMediaStreamSource(stream)
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 64
      source.connect(this.analyser)

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount)

      const checkLevel = () => {
        if (!this.analyser || !this.isRecording) return
        this.analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const avg = sum / dataArray.length
        const normalized = Math.min(100, Math.round((avg / 128) * 100))
        callback(normalized)
        this.animFrameId = requestAnimationFrame(checkLevel)
      }
      this.animFrameId = requestAnimationFrame(checkLevel)
    } catch (e) {
      console.warn('AudioContext setup error:', e)
    }
  }

  private cleanup() {
    this.isRecording = false
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }
    if (this.audioContext) {
      try { this.audioContext.close() } catch {}
      this.audioContext = null
    }
    this.analyser = null

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
    }
    this.mediaRecorder = null
  }
}
