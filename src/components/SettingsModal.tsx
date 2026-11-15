import React, { useState, useEffect, useRef } from 'react'
import { Language } from '../types'
import { supportedLanguages } from '../data/languages'
import { loadSettings, saveSettings, AppSettings, TTSEngineType } from '../services/storage'
import {
  getConnectedDevices,
  requestMediaPermissions,
  playHeadphoneTestTone,
  DeviceCatalog,
} from '../services/deviceManager'
import { playTextToSpeech, stopTextToSpeech } from '../services/speech'
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
} from 'lucide-react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSettingsChanged?: (newSettings: AppSettings) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsChanged,
}) => {
  if (!isOpen) return null

  const isElectron = Boolean(window.electronAPI?.isElectron)
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings())
  const [localDir, setLocalDir] = useState<string>('')

  // Device lists
  const [devices, setDevices] = useState<DeviceCatalog>({
    audioInputs: [],
    audioOutputs: [],
    videoInputs: [],
  })
  const [isLoadingDevices, setIsLoadingDevices] = useState(false)

  // Mic test state
  const [isTestingMic, setIsTestingMic] = useState(false)
  const [micTestLevel, setMicTestLevel] = useState(0)
  const micStreamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number | null>(null)

  // VoiceStudio status
  const [isCheckingVs, setIsCheckingVs] = useState(false)
  const [vsStatus, setVsStatus] = useState<'idle' | 'online' | 'offline'>('idle')

  // Sample audio testing state
  const [isPlayingTestVoice, setIsPlayingTestVoice] = useState(false)

  useEffect(() => {
    if (window.electronAPI?.getRecordingsDir) {
      window.electronAPI.getRecordingsDir().then(setLocalDir).catch(() => {})
    }
    loadDevices()

    return () => {
      stopMicTest()
      stopTextToSpeech()
    }
  }, [])

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

  const handleUpdate = (patch: Partial<AppSettings>) => {
    const updated = saveSettings(patch)
    setSettingsState(updated)
    onSettingsChanged?.(updated)
  }

  // Live Mic Test Meter
  const startMicTest = async () => {
    stopMicTest()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: settings.selectedAudioInputId ? { exact: settings.selectedAudioInputId } : undefined,
        },
      })
      micStreamRef.current = stream
      setIsTestingMic(true)

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      source.connect(analyser)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateMeter = () => {
        if (!micStreamRef.current) return
        analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i]
        const avg = sum / dataArray.length
        setMicTestLevel(Math.min(100, Math.round((avg / 128) * 100)))
        animFrameRef.current = requestAnimationFrame(updateMeter)
      }
      animFrameRef.current = requestAnimationFrame(updateMeter)
    } catch (e: any) {
      alert(`Không thể test micro: ${e.message}`)
    }
  }

  const stopMicTest = () => {
    setIsTestingMic(false)
    setMicTestLevel(0)
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop())
      micStreamRef.current = null
    }
  }

  // Play test sound for headphone
  const handleTestHeadphone = () => {
    playHeadphoneTestTone(settings.selectedAudioOutputId)
  }

  // Check VoiceStudio Connection
  const handleCheckVoiceStudio = async () => {
    if (!window.electronAPI?.checkVoiceStudioStatus) {
      alert('Tính năng kiểm tra chỉ hỗ trợ trong ứng dụng Desktop!')
      return
    }
    setIsCheckingVs(true)
    try {
      const res = await window.electronAPI.checkVoiceStudioStatus(
        settings.voiceStudioEndpoint || 'http://127.0.0.1:3900'
      )
      setVsStatus(res.online ? 'online' : 'offline')
    } catch {
      setVsStatus('offline')
    } finally {
      setIsCheckingVs(false)
    }
  }

  // Test speaking current voice
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cài đặt Giọng đọc & Thiết bị</h3>
              <p className="text-xs text-slate-400">Tối ưu phát âm ngoại ngữ chuẩn tự nhiên & phần cứng thu âm</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopMicTest()
              stopTextToSpeech()
              onClose()
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 my-6 max-h-[72vh] overflow-y-auto pr-1">
          {/* SECTION 1: VOICE ENGINE & HIGH-QUALITY TTS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                Bộ phát âm mẫu (Voice Engine)
              </span>
              <button
                onClick={handleTestSpeaking}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option 1: Edge Neural (Default Recommended) */}
              <button
                type="button"
                onClick={() => handleUpdate({ ttsEngine: 'edge' })}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  currentEngine === 'edge'
                    ? 'bg-emerald-500/15 border-emerald-500/50 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Microsoft Natural Neural
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    Khuyên dùng
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 leading-relaxed">
                  Giọng người thật phòng thu (Nanami, Keita), tự nhiên 100%, miễn phí, không cần GPU/Python.
                </span>
              </button>

              {/* Option 2: VoiceStudio Local AI Engine */}
              <button
                type="button"
                onClick={() => handleUpdate({ ttsEngine: 'voicestudio' })}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  currentEngine === 'voicestudio'
                    ? 'bg-purple-500/15 border-purple-500/50 ring-1 ring-purple-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                    <Radio className="w-3.5 h-3.5 text-purple-400" />
                    VoiceStudio AI Server
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                    Local Engine
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 leading-relaxed">
                  Kết nối CosyVoice, IndexTTS & Clone giọng từ VoiceStudio chạy tại máy bạn (port 3900).
                </span>
              </button>

              {/* Option 3: OpenAI Cloud TTS */}
              <button
                type="button"
                onClick={() => handleUpdate({ ttsEngine: 'openai' })}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  currentEngine === 'openai'
                    ? 'bg-blue-500/15 border-blue-500/50 ring-1 ring-blue-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                  OpenAI Cloud TTS
                </span>
                <span className="text-[11px] text-slate-400 leading-relaxed">
                  Sử dụng mô hình tts-1 (Nova, Alloy) qua OpenAI API Key của bạn.
                </span>
              </button>

              {/* Option 4: Local System Offline */}
              <button
                type="button"
                onClick={() => handleUpdate({ ttsEngine: 'system' })}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  currentEngine === 'system'
                    ? 'bg-slate-700/30 border-slate-600 ring-1 ring-slate-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold text-xs flex items-center gap-1.5 text-slate-100">
                  <Laptop className="w-3.5 h-3.5 text-slate-400" />
                  Giọng máy Windows (Offline)
                </span>
                <span className="text-[11px] text-slate-400 leading-relaxed">
                  Sử dụng SAPI5 mặc định khi hoàn toàn không có kết nối internet.
                </span>
              </button>
            </div>

            {/* Dynamic Engine Settings Detail */}
            {currentEngine === 'edge' && (
              <div className="pt-3 border-t border-slate-900 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Giọng đọc Tiếng Nhật (ja-JP):
                    </label>
                    <select
                      value={settings.edgeVoiceJa || 'ja-JP-NanamiNeural'}
                      onChange={(e) => handleUpdate({ edgeVoiceJa: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="ja-JP-NanamiNeural">Nanami (Nữ - Tự nhiên Tokyo NHK, Khuyên dùng)</option>
                      <option value="ja-JP-KeitaNeural">Keita (Nam - Rõ ràng, chuẩn mực tin tức)</option>
                      <option value="ja-JP-AoiNeural">Aoi (Nữ - Hội thoại đời thường tự nhiên)</option>
                      <option value="ja-JP-DaichiNeural">Daichi (Nam - Trầm ấm, truyền cảm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Giọng đọc Tiếng Trung (zh-CN):
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
              <div className="pt-3 border-t border-slate-900 space-y-3">
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2">
                  <Radio className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div className="leading-relaxed">
                    VoiceStudio cung cấp các mô hình AI TTS hàng đầu (CosyVoice 3, IndexTTS) qua chuẩn OpenAI API.
                    Đảm bảo bạn đã chạy VoiceStudio tại máy để iTalk kết nối.
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
                        className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs whitespace-nowrap transition-colors"
                      >
                        {isCheckingVs ? 'Đang test...' : 'Kiểm tra'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Mô hình AI (Model):
                    </label>
                    <input
                      type="text"
                      value={settings.voiceStudioModel || 'cosyvoice'}
                      onChange={(e) => handleUpdate({ voiceStudioModel: e.target.value })}
                      placeholder="cosyvoice"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                    />
                  </div>
                </div>

                {vsStatus !== 'idle' && (
                  <div
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold ${
                      vsStatus === 'online'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {vsStatus === 'online' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Kết nối VoiceStudio thành công! Đã sẵn sàng phát âm thanh AI.</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Chưa kết nối được. Hãy đảm bảo bạn đã khởi chạy VoiceStudio ở cổng 3900.</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentEngine === 'openai' && (
              <div className="pt-3 border-t border-slate-900 space-y-3">
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
          </div>

          {/* SECTION 2: AUDIO DEVICES (MIC & HEADPHONE) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Thiết bị Thu & Phát Âm thanh
              </span>
              <button
                onClick={loadDevices}
                className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1"
                title="Làm mới danh sách thiết bị"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDevices ? 'animate-spin' : ''}`} />
                <span>Quét lại</span>
              </button>
            </div>

            {/* Microphone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                <span>Microphone (Thu âm giọng nói của bạn)</span>
              </label>
              <select
                value={settings.selectedAudioInputId || ''}
                onChange={(e) => handleUpdate({ selectedAudioInputId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="">Microphone mặc định của hệ thống</option>
                {devices.audioInputs.map((d, idx) => (
                  <option key={d.deviceId || idx} value={d.deviceId}>
                    {d.label || `Microphone ${idx + 1}`}
                  </option>
                ))}
              </select>

              {/* Test Mic Button & VU Meter */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={isTestingMic ? stopMicTest : startMicTest}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isTestingMic
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isTestingMic ? 'Dừng test mic' : 'Nói thử mic'}
                </button>

                <div className="flex-1 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-75"
                    style={{ width: `${micTestLevel}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                  {micTestLevel}%
                </span>
              </div>
            </div>

            {/* Headphone / Audio Output Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-900">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Tai nghe / Loa (Phát âm bài mẫu)</span>
                </span>
                <button
                  onClick={handleTestHeadphone}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                >
                  <Play className="w-3 h-3 fill-indigo-400" />
                  <span>Thử chuông tai nghe</span>
                </button>
              </label>

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
            <div className="space-y-2 pt-2 border-t border-slate-900">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-teal-400" />
                <span>Camera / Webcam (Quan sát khẩu hình miệng)</span>
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

          {/* SECTION 3: STORAGE FOLDER */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                Thư mục lưu Video & Audio luyện tập
              </span>
              {isElectron ? (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Desktop Native
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Web Sandbox
                </span>
              )}
            </div>

            {isElectron ? (
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 truncate">
                  {localDir || '~/iTalk-Recordings'}
                </div>
                <button
                  onClick={handleChangeFolder}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Chọn thư mục lưu khác trên máy</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                Trên bản Web, video/audio lưu trong bộ nhớ tạm của trang. Khi chạy bản Electron Desktop trên Windows, tệp sẽ lưu trực tiếp vào ổ đĩa máy tính.
              </p>
            )}
          </div>

          {/* SECTION 4: DEFAULT LANGUAGE */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Ngôn ngữ ưu tiên mặc định
            </label>
            <div className="grid grid-cols-3 gap-2">
              {supportedLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleUpdate({ defaultLanguage: l.code })}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    settings.defaultLanguage === l.code
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              stopMicTest()
              stopTextToSpeech()
              onClose()
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            Đã xong
          </button>
        </div>
      </div>
    </div>
  )
}
