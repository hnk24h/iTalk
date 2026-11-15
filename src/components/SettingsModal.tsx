import React, { useState, useEffect } from 'react'
import { Language } from '../types'
import { supportedLanguages } from '../data/languages'
import { loadSettings, saveSettings, AppSettings } from '../services/storage'
import {
  Settings,
  FolderOpen,
  Laptop,
  Globe,
  Sliders,
  Volume2,
  Video,
  X,
  Check,
  BookOpen,
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

  useEffect(() => {
    if (window.electronAPI?.getRecordingsDir) {
      window.electronAPI.getRecordingsDir().then(setLocalDir).catch(() => {})
    }
  }, [])

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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cài đặt ứng dụng iTalk</h3>
              <p className="text-xs text-slate-400">Tùy biến môi trường luyện tập và lưu trữ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 my-6">
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
                Khi chạy trên trình duyệt Web, video/âm thanh được lưu trong bộ nhớ tạm của trang. Để lưu trực tiếp vào ổ cứng không qua hộp thoại hỏi, hãy khởi chạy bản Desktop Electron!
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

          {/* Shadowing Tip Guide */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Quy trình luyện Shadowing 4 bước đạt hiệu quả cao:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
              <li>Nghe người bản xứ đọc 1-2 lần ở tốc độ 1.0x để bắt nhịp ngữ điệu.</li>
              <li>Bấm <strong className="text-emerald-400">Bắt đầu Shadowing</strong> và đọc nhại theo từng âm tiết.</li>
              <li>Xem kết quả chấm điểm để biết từ nào bị nuốt âm hoặc sai thanh điệu.</li>
              <li>Xem lại video bản thân để điều chỉnh khẩu hình miệng và góc mở môi.</li>
            </ol>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            Đã xong
          </button>
        </div>
      </div>
    </div>
  )
}
