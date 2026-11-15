// Device Manager for Microphone, Headphone (SinkId), and Webcam

export interface DeviceCatalog {
  audioInputs: MediaDeviceInfo[]
  audioOutputs: MediaDeviceInfo[]
  videoInputs: MediaDeviceInfo[]
}

/**
 * Request device permissions first so labels are not empty
 */
export async function requestMediaPermissions(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) return false
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    stream.getTracks().forEach(t => t.stop())
    return true
  } catch {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(t => t.stop())
      return true
    } catch {
      return false
    }
  }
}

/**
 * Enumerate all connected audio and video devices
 */
export async function getConnectedDevices(): Promise<DeviceCatalog> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) {
    return { audioInputs: [], audioOutputs: [], videoInputs: [] }
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioInputs = devices.filter(d => d.kind === 'audioinput')
    const audioOutputs = devices.filter(d => d.kind === 'audiooutput')
    const videoInputs = devices.filter(d => d.kind === 'videoinput')

    return { audioInputs, audioOutputs, videoInputs }
  } catch (err) {
    console.error('Error enumerating devices:', err)
    return { audioInputs: [], audioOutputs: [], videoInputs: [] }
  }
}

/**
 * Direct audio element playback to chosen headphone/speaker (setSinkId)
 */
export async function setAudioOutputDevice(element: HTMLMediaElement | null, sinkId?: string): Promise<boolean> {
  if (!element || !sinkId) return false
  if (typeof (element as any).setSinkId === 'function') {
    try {
      await (element as any).setSinkId(sinkId)
      return true
    } catch (err) {
      console.warn('Failed to set sinkId on audio element:', err)
      return false
    }
  }
  return false
}

/**
 * Play a gentle test chime through chosen headphone/speaker
 */
export async function playHeadphoneTestTone(sinkId?: string): Promise<void> {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    // If setSinkId supported on AudioContext
    if (sinkId && typeof (ctx as any).setSinkId === 'function') {
      try {
        await (ctx as any).setSinkId(sinkId)
      } catch {}
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    // Play pleasant two-tone chime (523.25Hz -> 659.25Hz - C5 to E5)
    osc.frequency.setValueAtTime(523.25, ctx.currentTime)
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15)

    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.6)

    setTimeout(() => {
      ctx.close().catch(() => {})
    }, 700)
  } catch (err) {
    console.warn('Could not play test tone:', err)
  }
}
