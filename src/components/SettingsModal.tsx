import React, { useState, useEffect, useRef } from 'react'
import { Language } from '../types'
import { supportedLanguages } from '../data/languages'
import { loadSettings, saveSettings, AppSettings } from '../services/storage'
import {
  getConnectedDevices,
  requestMediaPermissions,
  playHeadphoneTestTone,
  DeviceCatalog,
} from '../services/deviceManager'
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
  BookOpen,
  Play,
  RefreshCw,
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

  useEffect(() => {
    if (window.electronAPI?.getRecordingsDir) {
      window.electronAPI.getRecordingsDir().then(setLocalDir).catch(() => {})
    }
    loadDevices()

    return () => {
      stopMicTest()
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cài đặt thiết bị & Ứng dụng</h3>
              <p className="text-xs text-slate-400">Chọn Microphone, Tai nghe / Loa và Thư mục lưu</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopMicTest()
              onClose()
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 my-6">
          {/* Audio Devices Section (Mic & Headphone) */}
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

            {/* 1. Microphone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                <span>Microphone (Thu âm giọng nói)</span>
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

            {/* 2. Headphone / Audio Output Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-900">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Tai nghe / Loa (Phát âm mẫu)</span>
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

            {/* 3. Camera / Webcam Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-900">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-teal-400" />
                <span>Camera / Webcam (Quan sát khẩu hình)</span>
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

          {/* Storage folder section */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                Thư mục lưu Video & Audio
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
                  <span>Chọn thư mục khác trên máy</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                Khi chạy trên Web, video/audio lưu trong bộ nhớ tạm của trang. Để lưu thẳng vào ổ đĩa không cần hỏi, hãy khởi chạy bản Electron Desktop!
              </p>
            )}
          </div>

          {/* Default Language Selector */}
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

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              stopMicTest()
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
