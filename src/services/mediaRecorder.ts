export interface RecordingResult {
  blob: Blob
  blobUrl: string
  mimeType: string
  durationSec: number
  actualType: 'audio' | 'video'
}

function formatMediaError(err: any): Error {
  const name = err.name || ''
  const msg = err.message || ''

  if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || msg.includes('Permission denied')) {
    return new Error(
      'Trình duyệt chưa được cấp quyền mở Microphone / Camera!\n👉 Hãy bấm vào biểu tượng Ổ khóa / Camera trên thanh địa chỉ URL (bên cạnh http://localhost:5173) và chọn "Cho phép" (Allow), sau đó tải lại trang.'
    )
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return new Error(
      'Không tìm thấy thiết bị Microphone hoặc Camera. Hãy đảm bảo micro/webcam đã được cắm vào máy tính.'
    )
  }
  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return new Error(
      'Microphone hoặc Camera đang bị ứng dụng khác chiếm dụng (như Zoom, Teams, Zalo, Discord). Hãy tắt các app đó và thử lại.'
    )
  }
  if (name === 'OverconstrainedError') {
    return new Error(
      'Thiết bị đã chọn không phản hồi. Hãy vào Cài đặt và chọn "Microphone/Camera mặc định".'
    )
  }
  return new Error(msg || 'Lỗi khi kích hoạt Microphone hoặc Camera.')
}

export class MediaRecordingManager {
  private mediaRecorder: MediaRecorder | null = null
  private recordedChunks: Blob[] = []
  private stream: MediaStream | null = null
  private startTime: number = 0
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private animFrameId: number | null = null
  private actualType: 'audio' | 'video' = 'video'

  public isRecording: boolean = false

  public async start({
    type,
    videoElement,
    onAudioLevel,
    audioDeviceId,
    videoDeviceId,
  }: {
    type: 'audio' | 'video'
    videoElement?: HTMLVideoElement | null
    onAudioLevel?: (level: number) => void
    audioDeviceId?: string
    videoDeviceId?: string
  }): Promise<void> {
    this.recordedChunks = []
    this.startTime = Date.now()
    this.actualType = type

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (typeof window !== 'undefined' && !window.isSecureContext) {
        throw new Error(
          'Trình duyệt yêu cầu truy cập qua http://localhost:5173 (hoặc HTTPS) để cấp quyền mở Camera & Micro. Vui lòng không dùng IP mạng ngoài khi chưa bật HTTPS.'
        )
      }
      throw new Error('Trình duyệt hiện tại không hỗ trợ Web MediaStream API!')
    }

    const audioConstraint: MediaTrackConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    }
    if (audioDeviceId && audioDeviceId !== 'default' && audioDeviceId !== '') {
      audioConstraint.deviceId = { ideal: audioDeviceId }
    }

    const videoConstraint: MediaTrackConstraints = {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: 'user',
    }
    if (videoDeviceId && videoDeviceId !== 'default' && videoDeviceId !== '') {
      videoConstraint.deviceId = { ideal: videoDeviceId }
    }

    let stream: MediaStream | null = null

    // Attempt 1: Try requested type (video + audio)
    if (type === 'video') {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraint,
          video: videoConstraint,
        })
      } catch (videoErr: any) {
        console.warn('Could not open video stream, falling back to audio-only stream:', videoErr)
        // If camera failed or not available, fallback to audio-only so practice is not blocked
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: audioConstraint,
            video: false,
          })
          this.actualType = 'audio'
        } catch (audioErr: any) {
          throw formatMediaError(audioErr)
        }
      }
    } else {
      // Audio only
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraint,
          video: false,
        })
      } catch (audioErr: any) {
        throw formatMediaError(audioErr)
      }
    }

    if (!stream) {
      throw new Error('Không thể khởi tạo luồng âm thanh/video.')
    }

    this.stream = stream

    try {
      // Attach to video preview element if available
      if (videoElement && this.actualType === 'video') {
        videoElement.srcObject = this.stream
        videoElement.muted = true
        videoElement.play().catch(() => {})
      }

      // Audio Level VU Meter
      if (onAudioLevel && this.stream.getAudioTracks().length > 0) {
        this.setupAudioMeter(this.stream, onAudioLevel)
      }

      // Determine best supported mimeType
      let mimeType = 'video/webm;codecs=vp9,opus'
      if (this.actualType === 'audio') {
        mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm'
      } else {
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = MediaRecorder.isTypeSupported('video/webm')
            ? 'video/webm'
            : MediaRecorder.isTypeSupported('video/mp4')
            ? 'video/mp4'
            : ''
        }
      }

      const recorderOptions: MediaRecorderOptions = {}
      if (mimeType && MediaRecorder.isTypeSupported(mimeType)) {
        recorderOptions.mimeType = mimeType
      }

      this.mediaRecorder = new MediaRecorder(this.stream, recorderOptions)

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data)
        }
      }

      this.mediaRecorder.start(250) // collect chunks every 250ms
      this.isRecording = true
    } catch (err: any) {
      this.cleanup()
      throw formatMediaError(err)
    }
  }

  public async stop(): Promise<RecordingResult> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.cleanup()
        reject(new Error('Chưa có phiên ghi âm nào đang chạy'))
        return
      }

      const durationSec = Math.max(1, Math.round((Date.now() - this.startTime) / 1000))
      const mimeType = this.mediaRecorder.mimeType || (this.actualType === 'audio' ? 'audio/webm' : 'video/webm')
      const resultType = this.actualType

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: mimeType })
        const blobUrl = URL.createObjectURL(blob)
        this.cleanup()
        resolve({
          blob,
          blobUrl,
          mimeType,
          durationSec,
          actualType: resultType,
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

  private setupAudioMeter(stream: MediaStream, onAudioLevel: (level: number) => void) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return

      this.audioContext = new AudioCtx()
      const source = this.audioContext.createMediaStreamSource(stream)
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 64
      this.analyser.smoothingTimeConstant = 0.5
      source.connect(this.analyser)

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount)

      const checkVolume = () => {
        if (!this.analyser) return
        this.analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const avg = sum / dataArray.length
        // Convert to percentage 0 - 100
        const percentage = Math.min(100, Math.round((avg / 128) * 100))
        onAudioLevel(percentage)

        this.animFrameId = requestAnimationFrame(checkVolume)
      }

      checkVolume()
    } catch (e) {
      console.warn('Audio meter init warning:', e)
    }
  }

  public cleanup() {
    this.isRecording = false

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close()
      } catch {}
      this.audioContext = null
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        try {
          track.stop()
        } catch {}
      })
      this.stream = null
    }

    this.mediaRecorder = null
    this.analyser = null
  }
}
