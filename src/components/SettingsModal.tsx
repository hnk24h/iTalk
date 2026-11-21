import React, { useState, useEffect, useRef } from 'react'
import { Language } from '../types'
import { supportedLanguages } from '../data/languages'
import { loadSettings, saveSettings, AppSettings, TTSEngineType } from '../services/storage'
import {
  getConnectedDevices,
  requestMediaPermissions,
  playHeadphoneTestTone,
  setAudioOutputDevice,
  DeviceCatalog,
} from '../services/deviceManager'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer } from '../services/speech'
import {
  Settings,
  FolderOpen,
  Laptop,
  Globe,
  Sliders,
  Volume2,
  Video,
  Mic,
  Headphones,
  X,
  Check,
  Play,
  RefreshCw,
  Sparkles,
  Server,
  Radio,
  CheckCircle2,
  AlertCircle,
  Database,
  Lock,
  Mail,
  UserCheck,
  LogOut,
  LogIn,
  ChevronRight,
  Gauge,
  Sun,
  Moon,
  Square,
  Trash2,
} from 'lucide-react'
import { applyTheme, getStoredTheme, AppTheme } from '../services/theme'
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  isSupabaseConfigured,
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signOutSupabase,
  performFullSync,
} from '../services/supabase'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSettingsChanged?: (newSettings: AppSettings) => void
}

type SettingsTab = 'voice' | 'devices' | 'cloud' | 'storage' | 'general'

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsChanged,
}) => {
  if (!isOpen) return null

  const isElectron = Boolean(window.electronAPI?.isElectron)
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings())
  const [localDir, setLocalDir] = useState<string>('')
  const [activeTab, setActiveTab] = useState<SettingsTab>('voice')

  // Device lists
  const [devices, setDevices] = useState<DeviceCatalog>({
    audioInputs: [],
    audioOutputs: [],
    videoInputs: [],
  })
  const [isLoadingDevices, setIsLoadingDevices] = useState(false)

  // Mic test & STT diagnostic state
  const [isTestingMic, setIsTestingMic] = useState(false)
  const [micTestLevel, setMicTestLevel] = useState(0)
  const [micTestSeconds, setMicTestSeconds] = useState(0)
  const [micTestDuration, setMicTestDuration] = useState(0)
  const [micTestAudioUrl, setMicTestAudioUrl] = useState<string | null>(null)
  const [micActiveDeviceLabel, setMicActiveDeviceLabel] = useState('')
  const [micTestError, setMicTestError] = useState<string | null>(null)
  const micSessionRef = useRef<{
    sessionId: number
    stream: MediaStream
    recorder: MediaRecorder | null
    chunks: Blob[]
  } | null>(null)
  const micTestSessionIdRef = useRef(0)
  const micTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const micTestSecondsRef = useRef(0)
  const micTestAudioUrlRef = useRef<string | null>(null)
  const micPlaybackAudioRef = useRef<HTMLAudioElement | null>(null)
  const shouldAutoPlayMicTestRef = useRef(false)
  const isUnmountedRef = useRef(false)
  const animFrameRef = useRef<number | null>(null)
  const micAudioCtxRef = useRef<AudioContext | null>(null)
  const [isTestingStt, setIsTestingStt] = useState(false)
  const [sttTestText, setSttTestText] = useState('')
  const [sttTestError, setSttTestError] = useState<string | null>(null)
  const sttTestRecognizerRef = useRef<SpeechRecognizer | null>(null)

  // VoiceStudio status
  const [isCheckingVs, setIsCheckingVs] = useState(false)
  const [vsStatus, setVsStatus] = useState<'idle' | 'online' | 'offline'>('idle')
  const [vsDetail, setVsDetail] = useState<{
    engine?: string
    version?: string
    models?: string[]
    voices?: any[]
    error?: string
  }>({})

  // Sample audio testing state
  const [isPlayingTestVoice, setIsPlayingTestVoice] = useState(false)

  // Supabase Cloud State
  const [supabaseConfig, setSupabaseConfigState] = useState(getSupabaseConfig())
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [showConfigInputs, setShowConfigInputs] = useState(false)

  const clearMicTestRecording = () => {
    if (micTestAudioUrlRef.current?.startsWith('blob:')) {
      URL.revokeObjectURL(micTestAudioUrlRef.current)
    }
    micTestAudioUrlRef.current = null
    shouldAutoPlayMicTestRef.current = false
    if (!isUnmountedRef.current) {
      setMicTestAudioUrl(null)
      setMicTestDuration(0)
    }
  }

  useEffect(() => {
    isUnmountedRef.current = false
    if (window.electronAPI?.getRecordingsDir) {
      window.electronAPI.getRecordingsDir().then(setLocalDir).catch(() => {})
    }
    loadDevices()
    getCurrentUser().then(setCurrentUser).catch(() => {})

    return () => {
      isUnmountedRef.current = true
      stopMicTest(true)
      clearMicTestRecording()
      stopSttTest()
      stopTextToSpeech()
    }
  }, [])

  useEffect(() => {
    const el = micPlaybackAudioRef.current
    if (!el || !micTestAudioUrl) return
    let cancelled = false
    const routeAndPlay = async () => {
      if (settings.selectedAudioOutputId) {
        await setAudioOutputDevice(el, settings.selectedAudioOutputId)
      }
      if (!cancelled && shouldAutoPlayMicTestRef.current) {
        shouldAutoPlayMicTestRef.current = false
        el.currentTime = 0
        el.play().catch(() => {})
      }
    }
    routeAndPlay()
    return () => {
      cancelled = true
    }
  }, [micTestAudioUrl, settings.selectedAudioOutputId])

  const handleSaveSupabaseConfig = () => {
    saveSupabaseConfig(supabaseConfig)
    getCurrentUser().then(setCurrentUser).catch(() => {})
    setSyncMessage('Đã lưu cấu hình Supabase!')
    setTimeout(() => setSyncMessage(null), 3000)
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setIsAuthLoading(true)

    if (authMode === 'login') {
      const { user, error } = await signInWithEmail(authEmail, authPassword)
      if (error) {
        setAuthError(error)
      } else {
        setCurrentUser(user)
        setSyncMessage('Đăng nhập thành công! Bắt đầu đồng bộ...')
        await performFullSync()
      }
    } else {
      const { user, error } = await signUpWithEmail(authEmail, authPassword)
      if (error) {
        setAuthError(error)
      } else {
        setCurrentUser(user)
        setSyncMessage('Đăng ký thành công! Hãy đăng nhập để bắt đầu đồng bộ.')
      }
    }
    setIsAuthLoading(false)
  }

  const handleSignOut = async () => {
    await signOutSupabase()
    setCurrentUser(null)
    setSyncMessage('Đã đăng xuất khỏi Cloud.')
    setTimeout(() => setSyncMessage(null), 3000)
  }

  const handleTriggerSync = async () => {
    setIsSyncing(true)
    setSyncMessage('Đang đồng bộ dữ liệu với Cloud...')
    const res = await performFullSync()
    setSyncMessage(res.message)
    setIsSyncing(false)
    setTimeout(() => setSyncMessage(null), 4000)
  }

  const loadDevices = async () => {
    setIsLoadingDevices(true)
    await requestMediaPermissions()
    const catalog = await getConnectedDevices()
    setDevices(catalog)
    setIsLoadingDevices(false)
  }

  const handleChangeFolder = async () => {
    if (window.electronAPI?.selectRecordingFolder) {
      const selected = await window.electronAPI.selectRecordingFolder()
      if (selected) {
        setLocalDir(selected)
        const updated = saveSettings({ localRecordingsDir: selected })
        setSettingsState(updated)
        onSettingsChanged?.(updated)
      }
    }
  }

  const handleUpdate = (partial: Partial<AppSettings>) => {
    const updated = saveSettings(partial)
    setSettingsState(updated)
    onSettingsChanged?.(updated)
  }

  const startMicTest = async () => {
    stopSttTest()
    stopMicTest(true)
    clearMicTestRecording()
    setMicTestError(null)
    micTestSecondsRef.current = 0
    setMicTestSeconds(0)
    const sessionId = ++micTestSessionIdRef.current

    try {
      const constraints: MediaStreamConstraints = {
        audio: settings.selectedAudioInputId
          ? { deviceId: { ideal: settings.selectedAudioInputId } }
          : true,
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (isUnmountedRef.current || sessionId !== micTestSessionIdRef.current) {
        stream.getTracks().forEach((t) => t.stop())
        return
      }

      const trackLabel = stream.getAudioTracks()[0]?.label || ''
      setMicActiveDeviceLabel(trackLabel)

      const chunks: Blob[] = []
      const sessionObj: {
        sessionId: number
        stream: MediaStream
        recorder: MediaRecorder | null
        chunks: Blob[]
      } = { sessionId, stream, recorder: null, chunks }
      micSessionRef.current = sessionObj

      if (typeof MediaRecorder !== 'undefined') {
        const preferredTypes = [
          'audio/webm;codecs=opus',
          'audio/webm',
          'audio/mp4',
          'audio/ogg;codecs=opus',
        ]
        const supportedType = preferredTypes.find(
          (t) =>
            typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported(t)
        )
        const recorder = supportedType
          ? new MediaRecorder(stream, { mimeType: supportedType })
          : new MediaRecorder(stream)
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data)
          }
        }
        sessionObj.recorder = recorder
        recorder.start(200)
      }

      setIsTestingMic(true)

      micTimerRef.current = setInterval(() => {
        micTestSecondsRef.current += 1
        setMicTestSeconds(micTestSecondsRef.current)
        if (micTestSecondsRef.current >= 30) {
          stopMicTest(false)
        }
      }, 1000)

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const audioCtx = new AudioCtx()
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {})
      }
      micAudioCtxRef.current = audioCtx
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 64
      source.connect(analyser)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const updateLevel = () => {
        if (!micSessionRef.current || micSessionRef.current.sessionId !== sessionId) return
        analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const avg = sum / dataArray.length
        setMicTestLevel(Math.min(100, Math.round((avg / 128) * 100)))
        animFrameRef.current = requestAnimationFrame(updateLevel)
      }
      updateLevel()
    } catch (err: any) {
      stopMicTest(true)
      if (!isUnmountedRef.current) {
        setMicTestError(
          `Không thể kích hoạt Micro: ${err?.message || 'Hãy kiểm tra quyền trên trình duyệt'}`
        )
      }
    }
  }

  const stopMicTest = (discardRecording = false) => {
    if (discardRecording) {
      micTestSessionIdRef.current += 1
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (micTimerRef.current) {
      clearInterval(micTimerRef.current)
      micTimerRef.current = null
    }
    if (micAudioCtxRef.current) {
      micAudioCtxRef.current.close().catch(() => {})
      micAudioCtxRef.current = null
    }

    const session = micSessionRef.current
    micSessionRef.current = null
    const durationSec = Math.max(1, micTestSecondsRef.current)

    if (!isUnmountedRef.current) {
      setIsTestingMic(false)
      setMicTestLevel(0)
    }

    if (!session) return

    const releaseStream = () => {
      session.stream.getTracks().forEach((t) => t.stop())
    }

    if (session.recorder && session.recorder.state !== 'inactive') {
      const recorder = session.recorder
      recorder.onstop = () => {
        releaseStream()
        if (discardRecording || isUnmountedRef.current || session.sessionId !== micTestSessionIdRef.current) {
          return
        }
        const blob = new Blob(session.chunks, {
          type: recorder.mimeType || 'audio/webm',
        })
        if (blob.size === 0) {
          setMicTestError(
            'Không thu được âm thanh từ Micro. Hãy kiểm tra quyền Micro hoặc chọn đúng thiết bị đầu vào.'
          )
          return
        }
        if (micTestAudioUrlRef.current?.startsWith('blob:')) {
          URL.revokeObjectURL(micTestAudioUrlRef.current)
        }
        const url = URL.createObjectURL(blob)
        micTestAudioUrlRef.current = url
        shouldAutoPlayMicTestRef.current = true
        setMicTestDuration(durationSec)
        setMicTestAudioUrl(url)
      }
      try {
        recorder.stop()
      } catch {
        releaseStream()
      }
    } else {
      releaseStream()
    }
  }

  const stopSttTest = () => {
    sttTestRecognizerRef.current?.abort()
    setIsTestingStt(false)
  }

  const toggleSttTest = () => {
    if (isTestingStt) {
      stopSttTest()
      return
    }
    stopMicTest(true)
    setSttTestText('')
    setSttTestError(null)
    if (!sttTestRecognizerRef.current) {
      sttTestRecognizerRef.current = new SpeechRecognizer()
    }
    if (!sttTestRecognizerRef.current.isSupported()) {
      setSttTestError('unsupported: Trình duyệt không hỗ trợ Web Speech API.')
      return
    }
    const langMeta =
      supportedLanguages.find((l) => l.code === settings.defaultLanguage) || supportedLanguages[0]
    setIsTestingStt(true)
    sttTestRecognizerRef.current.start({
      lang: langMeta.speechCode,
      onResult: (transcript) => {
        setSttTestText(transcript)
        setSttTestError(null)
      },
      onError: (err) => {
        const code = err?.error || 'unknown'
        if (code === 'aborted') return
        setIsTestingStt(false)
        setSttTestError(
          `Lỗi "${code}": ${
            code === 'network'
              ? 'Không kết nối được máy chủ Web Speech API (cần Chrome/Edge hoặc OpenAI Whisper).'
              : code === 'not-allowed' || code === 'service-not-allowed'
              ? 'Micro hoặc Web Speech bị chặn quyền.'
              : code === 'no-speech'
              ? 'Không nghe thấy giọng nói (kiểm tra OS Input mặc định).'
              : err?.message || 'Thử lại sau.'
          }`
        )
      },
      onEnd: () => {
        setIsTestingStt(false)
      },
    })
  }

  const handleTestHeadphone = () => {
    playHeadphoneTestTone(settings.selectedAudioOutputId)
  }

  const handleCheckVoiceStudio = async () => {
    setIsCheckingVs(true)
    const endpoint = settings.voiceStudioEndpoint || 'http://127.0.0.1:3900'
    try {
      if (window.electronAPI?.checkVoiceStudioStatus) {
        const res = await window.electronAPI.checkVoiceStudioStatus(endpoint)
        setVsStatus(res.online ? 'online' : 'offline')
        setVsDetail({
          engine: res.engine,
          version: res.version,
          models: res.models,
          voices: res.voices,
          error: res.error,
        })
      } else {
        // Direct browser test for Web
        let clean = endpoint.trim().replace(/\/+$/, '')
        if (!clean.startsWith('http://') && !clean.startsWith('https://')) clean = `http://${clean}`
        const r = await fetch(`${clean}/health`).catch(() => null)
        if (r && (r.ok || r.status === 503)) {
          const data = await r.json().catch(() => ({}))
          setVsStatus('online')
          setVsDetail({ engine: data.engine || data.status, version: data.version })
        } else {
          setVsStatus('offline')
          setVsDetail({ error: `Không thể kết nối đến ${clean}. Hãy đảm bảo VoiceStudio đang chạy.` })
        }
      }
    } catch (err: any) {
      setVsStatus('offline')
      setVsDetail({ error: err.message || 'Kết nối thất bại' })
    } finally {
      setIsCheckingVs(false)
    }
  }

  const handleTestSpeaking = () => {
    if (isPlayingTestVoice) {
      stopTextToSpeech()
      setIsPlayingTestVoice(false)
      return
    }

    const testPhrases: Record<Language, { text: string; langCode: string }> = {
      ja: {
        text: 'こんにちは！iTalkの音声テストです。日本語の発音はとても自然ですね。',
        langCode: 'ja-JP',
      },
      zh: {
        text: '你好！这是iTalk的发音测试，声音听起来非常纯正自然。',
        langCode: 'zh-CN',
      },
      vi: {
        text: 'Xin chào! Đây là bài kiểm tra giọng đọc tự nhiên chuẩn của ứng dụng iTalk.',
        langCode: 'vi-VN',
      },
    }

    const sample = testPhrases[settings.defaultLanguage] || testPhrases.ja
    setIsPlayingTestVoice(true)

    playTextToSpeech({
      text: sample.text,
      lang: sample.langCode,
      rate: settings.speechRate || 1.0,
      sinkId: settings.selectedAudioOutputId,
      onStart: () => setIsPlayingTestVoice(true),
      onEnd: () => setIsPlayingTestVoice(false),
      onError: (err) => {
        setIsPlayingTestVoice(false)
        console.error('Test speak error:', err)
      },
    })
  }

  const currentEngine = settings.ttsEngine || 'edge'

  const menuItems = [
    {
      id: 'voice' as SettingsTab,
      label: 'Giọng đọc & TTS',
      desc: 'Mẫu câu & Tốc độ',
      icon: <Volume2 className="w-4 h-4" />,
      badge: currentEngine === 'edge' ? 'Edge' : currentEngine === 'voicestudio' ? 'VoiceStudio' : currentEngine === 'openai' ? 'OpenAI' : 'Offline',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'devices' as SettingsTab,
      label: 'Micro & Thiết bị',
      desc: 'Mic, Tai nghe, Webcam',
      icon: <Sliders className="w-4 h-4" />,
      badge: `${devices.audioInputs.length} Mic`,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'cloud' as SettingsTab,
      label: 'Đồng bộ Đám mây',
      desc: 'Supabase & Backup',
      icon: <Database className="w-4 h-4" />,
      badge: currentUser ? 'Đã kết nối' : isSupabaseConfigured() ? 'Sẵn sàng' : 'Offline',
      badgeColor: currentUser ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      dot: currentUser ? 'bg-emerald-400 animate-pulse' : isSupabaseConfigured() ? 'bg-sky-400' : 'bg-slate-600',
    },
    {
      id: 'storage' as SettingsTab,
      label: 'Thư mục Lưu trữ',
      desc: 'Video & Audio thu âm',
      icon: <FolderOpen className="w-4 h-4" />,
      badge: isElectron ? 'Desktop' : 'Web',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      id: 'general' as SettingsTab,
      label: 'Ngôn ngữ & Chung',
      desc: 'Ngôn ngữ ưu tiên',
      icon: <Globe className="w-4 h-4" />,
      badge: settings.defaultLanguage.toUpperCase(),
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl relative flex flex-col h-[650px] max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Cài đặt & Cấu hình iTalk</span>
              </h3>
              <p className="text-xs text-slate-400">
                Tối ưu giọng đọc bản xứ, thiết bị thu phát và đồng bộ đám mây
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopMicTest(true)
              stopSttTest()
              stopTextToSpeech()
              onClose()
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Area: Sidebar + Body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-56 sm:w-64 bg-slate-950/50 border-r border-slate-800/80 p-3 flex flex-col justify-between shrink-0">
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-slate-900 text-slate-400 group-hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold truncate">{item.label}</span>
                          {item.dot && <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />}
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                      </div>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ml-1.5 ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Bottom info card */}
            <div className="pt-3 border-t border-slate-800/60 px-2 space-y-1 text-[11px] text-slate-500">
              <div className="flex items-center justify-between font-mono">
                <span>iTalk Studio</span>
                <span className="text-slate-400">v1.0.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/90 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Hệ thống hoạt động tốt</span>
              </div>
            </div>
          </div>

          {/* Main Body Content Pane */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-900 min-h-0 space-y-5">
            {/* TAB 1: VOICE & TTS */}
            {activeTab === 'voice' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>Bộ phát âm mẫu & Công nghệ TTS</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Chọn công nghệ đọc câu mẫu phát âm tự nhiên chuẩn như người bản xứ
                    </p>
                  </div>
                  <button
                    onClick={handleTestSpeaking}
                    className={`text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                      isPlayingTestVoice
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    <Play className={`w-3.5 h-3.5 ${isPlayingTestVoice ? 'fill-white' : 'fill-amber-300'}`} />
                    <span>{isPlayingTestVoice ? 'Đang đọc... (Bấm dừng)' : 'Nghe thử giọng đọc'}</span>
                  </button>
                </div>

                {/* Engine Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Edge Neural (Default Recommended) */}
                  <button
                    type="button"
                    onClick={() => handleUpdate({ ttsEngine: 'edge' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                      currentEngine === 'edge'
                        ? 'bg-emerald-500/15 border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/5'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Microsoft Natural Neural
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        Khuyên dùng
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 leading-relaxed">
                      Giọng người thật phòng thu (Nanami, Keita, Xiaoxiao), ngữ điệu tự nhiên 100%, miễn phí, không tốn tài nguyên.
                    </span>
                  </button>

                  {/* Option 2: VoiceStudio Local AI Engine */}
                  <button
                    type="button"
                    onClick={() => handleUpdate({ ttsEngine: 'voicestudio' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                      currentEngine === 'voicestudio'
                        ? 'bg-purple-500/15 border-purple-500/50 ring-1 ring-purple-500/30 shadow-lg shadow-purple-500/5'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                        <Radio className="w-3.5 h-3.5 text-purple-400" />
                        VoiceStudio AI Server
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                        Local AI
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 leading-relaxed">
                      Kết nối mô hình CosyVoice 3 & Clone giọng từ VoiceStudio chạy trực tiếp tại máy tính của bạn (port 3900).
                    </span>
                  </button>

                  {/* Option 3: OpenAI Cloud TTS */}
                  <button
                    type="button"
                    onClick={() => handleUpdate({ ttsEngine: 'openai' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                      currentEngine === 'openai'
                        ? 'bg-blue-500/15 border-blue-500/50 ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/5'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                        <Server className="w-3.5 h-3.5 text-blue-400" />
                        OpenAI Cloud TTS
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                        Cloud API
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 leading-relaxed">
                      Sử dụng mô hình OpenAI `tts-1` (Nova, Alloy, Onyx) qua API Key của bạn.
                    </span>
                  </button>

                  {/* Option 4: Local System Offline */}
                  <button
                    type="button"
                    onClick={() => handleUpdate({ ttsEngine: 'system' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                      currentEngine === 'system'
                        ? 'bg-slate-700/30 border-slate-600 ring-1 ring-slate-500/30 shadow-lg shadow-slate-500/5'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                        <Laptop className="w-3.5 h-3.5 text-slate-400" />
                        Giọng máy Windows (Offline)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold border border-slate-700">
                        Fallback
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 leading-relaxed">
                      Sử dụng giọng mặc định hệ thống SAPI5 / Web Speech khi không có kết nối mạng.
                    </span>
                  </button>
                </div>

                {/* Dynamic Engine Settings Details */}
                {currentEngine === 'edge' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Tùy chọn giọng đọc Microsoft Natural
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Tiếng Nhật (ja-JP):
                        </label>
                        <select
                          value={settings.edgeVoiceJa || 'ja-JP-NanamiNeural'}
                          onChange={(e) => handleUpdate({ edgeVoiceJa: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        >
                          <option value="ja-JP-NanamiNeural">Nanami (Nữ - Tự nhiên Tokyo NHK, Chuẩn nhất)</option>
                          <option value="ja-JP-KeitaNeural">Keita (Nam - Rõ ràng, chuẩn mực tin tức)</option>
                          <option value="ja-JP-AoiNeural">Aoi (Nữ - Hội thoại đời thường tự nhiên)</option>
                          <option value="ja-JP-DaichiNeural">Daichi (Nam - Trầm ấm, truyền cảm)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Tiếng Trung (zh-CN):
                        </label>
                        <select
                          value={settings.edgeVoiceZh || 'zh-CN-XiaoxiaoNeural'}
                          onChange={(e) => handleUpdate({ edgeVoiceZh: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        >
                          <option value="zh-CN-XiaoxiaoNeural">Xiaoxiao (Nữ - Chuẩn Bắc Kinh truyền hình)</option>
                          <option value="zh-CN-YunxiNeural">Yunxi (Nam - Trẻ trung, tự nhiên)</option>
                          <option value="zh-CN-YunjianNeural">Yunjian (Nam - Trầm ấm, tin tức)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentEngine === 'voicestudio' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2">
                      <Radio className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <div className="leading-relaxed">
                        VoiceStudio cung cấp các mô hình AI TTS hàng đầu (OmniVoice, CosyVoice 3, IndexTTS, Supertonic). Đảm bảo VoiceStudio đang chạy trên máy (port 3900) để iTalk kết nối.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Địa chỉ VoiceStudio Endpoint:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.voiceStudioEndpoint || 'http://127.0.0.1:3900'}
                            onChange={(e) => handleUpdate({ voiceStudioEndpoint: e.target.value })}
                            placeholder="http://127.0.0.1:3900"
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                          />
                          <button
                            type="button"
                            onClick={handleCheckVoiceStudio}
                            disabled={isCheckingVs}
                            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer"
                          >
                            {isCheckingVs ? 'Đang test...' : 'Kiểm tra'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Mô hình AI (Model ID):
                        </label>
                        <input
                          type="text"
                          value={settings.voiceStudioModel || 'tts-1'}
                          onChange={(e) => handleUpdate({ voiceStudioModel: e.target.value })}
                          placeholder="tts-1 (Tự động) hoặc omnivoice"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Giọng đọc (Voice / Profile ID):
                        </label>
                        <input
                          type="text"
                          value={settings.voiceStudioVoice || 'default'}
                          onChange={(e) => handleUpdate({ voiceStudioVoice: e.target.value })}
                          placeholder="default (chuẩn của model)"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Chọn nhanh Model khả dụng:
                        </label>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {[
                            { id: 'tts-1', label: 'Tự động (Khuyên dùng)' },
                            { id: 'omnivoice', label: 'OmniVoice' },
                            { id: 'cosyvoice', label: 'CosyVoice 3' },
                            { id: 'indextts2', label: 'IndexTTS 2' },
                            { id: 'supertonic3', label: 'Supertonic 3' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleUpdate({ voiceStudioModel: item.id })}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                                (settings.voiceStudioModel || 'tts-1') === item.id
                                  ? 'bg-purple-600 text-white border-purple-500'
                                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                              }`}
                            >
                              {item.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {vsStatus !== 'idle' && (
                      <div
                        className={`flex flex-col gap-1.5 p-3 rounded-xl text-xs font-medium border ${
                          vsStatus === 'online'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold">
                          {vsStatus === 'online' ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>Kết nối VoiceStudio thành công! Đã sẵn sàng phát âm thanh AI.</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              <span>Chưa kết nối được với VoiceStudio.</span>
                            </>
                          )}
                        </div>
                        {vsStatus === 'online' && (
                          <div className="text-[11px] text-slate-300 pl-6 space-y-0.5">
                            {vsDetail.engine && (
                              <div>
                                • Engine đang chạy: <span className="text-emerald-300 font-mono font-bold">{vsDetail.engine}</span>
                              </div>
                            )}
                            {vsDetail.version && (
                              <div>
                                • Phiên bản: <span className="font-mono">{vsDetail.version}</span>
                              </div>
                            )}
                            {vsDetail.models && vsDetail.models.length > 0 && (
                              <div>
                                • Models khả dụng: <span className="text-purple-300 font-mono">{vsDetail.models.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        )}
                        {vsStatus === 'offline' && vsDetail.error && (
                          <div className="text-[11px] text-rose-300/90 pl-6">
                            Chi tiết: {vsDetail.error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {currentEngine === 'openai' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          OpenAI API Key:
                        </label>
                        <input
                          type="password"
                          value={settings.openaiApiKey || ''}
                          onChange={(e) => handleUpdate({ openaiApiKey: e.target.value })}
                          placeholder="sk-..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Giọng đọc OpenAI:
                        </label>
                        <select
                          value={settings.openaiVoice || 'nova'}
                          onChange={(e) => handleUpdate({ openaiVoice: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="nova">Nova (Nữ - Truyền cảm)</option>
                          <option value="alloy">Alloy (Trung tính)</option>
                          <option value="echo">Echo (Nam)</option>
                          <option value="fable">Fable (Anh ngữ)</option>
                          <option value="onyx">Onyx (Nam trầm)</option>
                          <option value="shimmer">Shimmer (Nữ nhẹ nhàng)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Speech Rate Slider */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tốc độ đọc câu mẫu</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      {settings.speechRate || 1.0}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.5"
                    step="0.05"
                    value={settings.speechRate || 1.0}
                    onChange={(e) => handleUpdate({ speechRate: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <button
                      type="button"
                      onClick={() => handleUpdate({ speechRate: 0.8 })}
                      className="hover:text-emerald-400 cursor-pointer"
                    >
                      0.8x (Chậm rõ ràng)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate({ speechRate: 1.0 })}
                      className="hover:text-emerald-400 font-semibold cursor-pointer"
                    >
                      1.0x (Tự nhiên chuẩn)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate({ speechRate: 1.2 })}
                      className="hover:text-emerald-400 cursor-pointer"
                    >
                      1.2x (Nhanh phản xạ)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HARDWARE DEVICES */}
            {activeTab === 'devices' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      <span>Thiết bị Thu âm, Phát thanh & Khẩu hình</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Đảm bảo micro bắt âm rõ và camera sẵn sàng cho bài tập Shadowing
                    </p>
                  </div>
                  <button
                    onClick={loadDevices}
                    className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Làm mới danh sách thiết bị"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDevices ? 'animate-spin' : ''}`} />
                    <span>Quét lại thiết bị</span>
                  </button>
                </div>

                {/* Microphone Section */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Microphone (Thu âm giọng nói của bạn)</span>
                  </label>
                  <select
                    value={settings.selectedAudioInputId || ''}
                    onChange={(e) => {
                      if (isTestingMic) stopMicTest(true)
                      handleUpdate({ selectedAudioInputId: e.target.value })
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="">Microphone mặc định của hệ thống</option>
                    {devices.audioInputs.map((d, idx) => (
                      <option key={d.deviceId || idx} value={d.deviceId}>
                        {d.label || `Microphone ${idx + 1}`}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400">
                    Lưu ý: Web Speech API của trình duyệt luôn thu theo Micro mặc định của hệ điều hành (OS Input). Nếu chỉ dùng trình duyệt, hãy đặt đúng mic làm mặc định trong hệ thống.
                  </p>

                  {/* Test Mic Button & VU Meter + Live STT Test */}
                  <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        stopSttTest()
                        isTestingMic ? stopMicTest(false) : startMicTest()
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                        isTestingMic
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isTestingMic ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          <span>Dừng &amp; Nghe lại ({micTestSeconds}s)</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5" />
                          <span>Ghi âm thử mic</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleSttTest}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                        isTestingStt
                          ? 'bg-indigo-600 text-white animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700'
                      }`}
                    >
                      {isTestingStt ? 'Dừng test STT' : 'Test nhận diện chữ (STT)'}
                    </button>

                    <div className="flex-1 min-w-[120px] bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-75"
                        style={{ width: `${micTestLevel}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 w-9 text-right">
                      {micTestLevel}%
                    </span>
                  </div>

                  {isTestingMic && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-2 flex-wrap">
                      <span>Đang ghi âm thử... Hãy nói vài câu rồi bấm Dừng &amp; Nghe lại</span>
                      {micActiveDeviceLabel && (
                        <span className="text-[11px] text-emerald-400 truncate max-w-[240px]">
                          {micActiveDeviceLabel}
                        </span>
                      )}
                    </div>
                  )}

                  {micTestError && (
                    <div className="p-2.5 rounded-xl border text-xs bg-amber-500/10 border-amber-500/30 text-amber-300">
                      {micTestError}
                    </div>
                  )}

                  {micTestAudioUrl && !isTestingMic && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold min-w-0">
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Bản ghi thử ({micTestDuration}s)</span>
                          {micActiveDeviceLabel && (
                            <span className="text-[11px] font-normal text-slate-400 truncate max-w-[200px]">
                              • {micActiveDeviceLabel}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={startMicTest}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Ghi lại</span>
                          </button>
                          <button
                            type="button"
                            onClick={clearMicTestRecording}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </div>
                      <audio
                        ref={micPlaybackAudioRef}
                        key={micTestAudioUrl}
                        src={micTestAudioUrl}
                        controls
                        className="w-full h-9"
                      />
                    </div>
                  )}

                  {(isTestingStt || sttTestText || sttTestError) && (
                    <div
                      className={`p-2.5 rounded-xl border text-xs ${
                        sttTestError
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-emerald-300'
                      }`}
                    >
                      {sttTestError
                        ? sttTestError
                        : sttTestText
                        ? `Nhận diện được: "${sttTestText}"`
                        : 'Đang lắng nghe — hãy nói vài từ bằng ngôn ngữ đang học...'}
                    </div>
                  )}
                </div>

                {/* Headphone / Speaker Section */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Tai nghe / Loa (Phát âm bài mẫu)</span>
                    </label>
                    <button
                      onClick={handleTestHeadphone}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-indigo-400" />
                      <span>Thử chuông tai nghe</span>
                    </button>
                  </div>
                  <select
                    value={settings.selectedAudioOutputId || ''}
                    onChange={(e) => handleUpdate({ selectedAudioOutputId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="">Tai nghe / Loa mặc định của hệ thống</option>
                    {devices.audioOutputs.map((d, idx) => (
                      <option key={d.deviceId || idx} value={d.deviceId}>
                        {d.label || `Headphone / Speaker ${idx + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Camera / Webcam Selector */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-teal-400" />
                    <span>Camera / Webcam (Quan sát khẩu hình miệng khi Shadowing)</span>
                  </label>
                  <select
                    value={settings.selectedVideoInputId || ''}
                    onChange={(e) => handleUpdate({ selectedVideoInputId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="">Camera mặc định của hệ thống</option>
                    {devices.videoInputs.map((d, idx) => (
                      <option key={d.deviceId || idx} value={d.deviceId}>
                        {d.label || `Webcam ${idx + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* TAB 3: CLOUD SYNC & SUPABASE */}
            {activeTab === 'cloud' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-sky-400" />
                      <span>Cơ sở dữ liệu Đám mây & Đồng bộ Supabase</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Lưu trữ Streak học, Bài học tự tạo và File ghi âm an toàn trên Cloud miễn phí
                    </p>
                  </div>
                  {currentUser ? (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Đã kết nối</span>
                    </span>
                  ) : isSupabaseConfigured() ? (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Sẵn sàng kết nối
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      Chế độ Offline cục bộ
                    </span>
                  )}
                </div>

                {currentUser ? (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-2.5 text-xs text-slate-200">
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-semibold uppercase">Tài khoản Cloud</p>
                          <strong className="text-white text-xs">{currentUser.email}</strong>
                        </div>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={handleTriggerSync}
                        disabled={isSyncing}
                        className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-600/25"
                      >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Đang đồng bộ với Cloud...' : 'Đồng bộ 2 chiều với Cloud ngay'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-sky-400" />
                          <span>{authMode === 'login' ? 'Đăng nhập tài khoản học tập' : 'Tạo tài khoản mới'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode(authMode === 'login' ? 'register' : 'login')
                            setAuthError(null)
                          }}
                          className="text-[11px] text-sky-400 hover:underline cursor-pointer"
                        >
                          {authMode === 'login' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
                        </button>
                      </div>

                      <form onSubmit={handleAuthSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                            <input
                              type="email"
                              required
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              placeholder="Email của bạn..."
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>
                          <div className="relative">
                            <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                            <input
                              type="password"
                              required
                              value={authPassword}
                              onChange={(e) => setAuthPassword(e.target.value)}
                              placeholder="Mật khẩu..."
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        {authError && (
                          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
                            {authError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isAuthLoading}
                          className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>
                            {isAuthLoading
                              ? 'Đang kết nối...'
                              : authMode === 'login'
                              ? 'Đăng nhập & Bắt đầu đồng bộ'
                              : 'Tạo tài khoản'}
                          </span>
                        </button>
                      </form>
                    </div>

                    {/* Advanced Custom Project Keys Toggle */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Cấu hình Dự án Supabase</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowConfigInputs(!showConfigInputs)}
                          className="text-[11px] text-sky-400 hover:underline cursor-pointer"
                        >
                          {showConfigInputs ? 'Thu gọn' : 'Chỉnh sửa URL & Key'}
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        Mặc định iTalk tự động kết nối theo file <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">.env</code>. Bạn cũng có thể tùy chỉnh thông tin dự án riêng ngay tại đây:
                      </div>

                      {showConfigInputs && (
                        <div className="space-y-3 pt-1">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                              Supabase Project URL:
                            </label>
                            <input
                              type="text"
                              value={supabaseConfig.url}
                              onChange={(e) => setSupabaseConfigState({ ...supabaseConfig, url: e.target.value })}
                              placeholder="https://xyzcompany.supabase.co"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                              Supabase Anon Key:
                            </label>
                            <input
                              type="password"
                              value={supabaseConfig.anonKey}
                              onChange={(e) => setSupabaseConfigState({ ...supabaseConfig, anonKey: e.target.value })}
                              placeholder="sb_publishable_..."
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSaveSupabaseConfig}
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer transition-colors"
                          >
                            Lưu thông tin kết nối
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {syncMessage && (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{syncMessage}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: STORAGE */}
            {activeTab === 'storage' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-emerald-400" />
                      <span>Thư mục Lưu trữ Video & Âm thanh Thu âm</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Quản lý nơi lưu các tệp Shadowing trên ổ đĩa máy tính
                    </p>
                  </div>
                  {isElectron ? (
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Desktop Native
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Web Sandbox
                    </span>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                  {isElectron ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Đường dẫn thư mục hiện tại:
                        </span>
                        <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-xl border border-slate-800 truncate">
                          {localDir || '~/iTalk-Recordings'}
                        </div>
                      </div>
                      <button
                        onClick={handleChangeFolder}
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <FolderOpen className="w-4 h-4 text-emerald-400" />
                        <span>Chọn thư mục lưu khác trên máy tính</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
                      <p>
                        Trên bản Web, các tệp âm thanh và video ghi hình được lưu tạm thời trong bộ nhớ trình duyệt (IndexedDB).
                      </p>
                      <p>
                        👉 Khi bạn kết nối với <strong>Supabase Cloud</strong>, các bản ghi âm sẽ được tự động tải lên Cloud Storage để lưu trữ an toàn và có thể nghe lại trên bất kỳ thiết bị nào.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: GENERAL & LANGUAGE */}
            {activeTab === 'general' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400" />
                      <span>Ngôn ngữ & Tùy chọn Chung</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tùy chỉnh ngôn ngữ ưu tiên mặc định khi mở ứng dụng
                    </p>
                  </div>
                </div>

                {/* Language Selector */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Ngôn ngữ ưu tiên mặc định:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {supportedLanguages.map((l) => {
                      const isSelected = settings.defaultLanguage === l.code
                      return (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => handleUpdate({ defaultLanguage: l.code })}
                          className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 ring-1 ring-purple-500/30 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-2xl">{l.flag}</span>
                          <span>{l.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Theme Mode Selector */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Chủ đề giao diện (Theme):
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Tùy chọn tông màu sáng tối phù hợp với mắt nhìn của bạn
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleUpdate({ theme: 'dark' })
                        applyTheme('dark')
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        (settings.theme || getStoredTheme()) === 'dark'
                          ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-300 ring-1 ring-indigo-500/30 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-950 text-indigo-400 border border-slate-800">
                        <Moon className="w-5 h-5" />
                      </div>
                      <span>Giao diện Tối</span>
                      <span className="text-[10px] text-slate-500 font-normal">Dịu mắt ban đêm</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleUpdate({ theme: 'light' })
                        applyTheme('light')
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        (settings.theme || getStoredTheme()) === 'light'
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 ring-1 ring-amber-500/30 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-950 text-amber-400 border border-slate-800">
                        <Sun className="w-5 h-5" />
                      </div>
                      <span>Giao diện Sáng</span>
                      <span className="text-[10px] text-slate-500 font-normal">Sáng sủa ban ngày</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleUpdate({ theme: 'system' })
                        applyTheme('system')
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        (settings.theme || getStoredTheme()) === 'system'
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <span>Theo hệ thống</span>
                      <span className="text-[10px] text-slate-500 font-normal">Tự động theo OS</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mọi thay đổi cài đặt được tự động lưu</span>
          </span>
          <button
            onClick={() => {
              stopMicTest(true)
              stopSttTest()
              stopTextToSpeech()
              onClose()
            }}
            className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Đã xong
          </button>
        </div>
      </div>
    </div>
  )
}
