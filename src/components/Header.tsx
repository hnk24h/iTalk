import React from 'react'
import { Language, UserSchedule } from '../types'
import { supportedLanguages } from '../data/languages'
import {
  Mic,
  BookOpen,
  Calendar,
  FolderOpen,
  Flame,
  Settings as SettingsIcon,
  Laptop,
  Globe,
} from 'lucide-react'

interface HeaderProps {
  currentLang: Language
  onSelectLang: (lang: Language) => void
  activeTab: 'shadowing' | 'speaking' | 'recordings' | 'schedule'
  onSelectTab: (tab: 'shadowing' | 'speaking' | 'recordings' | 'schedule') => void
  schedule: UserSchedule
  onOpenSettings: () => void
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  onSelectTab,
  schedule,
  onOpenSettings,
}) => {
  const isElectron = Boolean(window.electronAPI?.isElectron)
  const currentLangMeta = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0]

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Desktop Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Mic className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  iTalk
                </span>
                {isElectron ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Laptop className="w-3 h-3" /> Desktop App
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Globe className="w-3 h-3" /> Web
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Luyện Nghe - Nói & Shadowing</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onSelectTab('shadowing')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'shadowing'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Shadowing</span>
            </button>

            <button
              onClick={() => onSelectTab('speaking')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'speaking'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Luyện Ngữ Pháp</span>
              <span className="sm:hidden">Ngữ Pháp</span>
            </button>

            <button
              onClick={() => onSelectTab('recordings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'recordings'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Bản Ghi & Lịch Sử</span>
              <span className="sm:hidden">Bản Ghi</span>
            </button>

            <button
              onClick={() => onSelectTab('schedule')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'schedule'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Tiến Độ & Lịch</span>
              <span className="sm:hidden">Lịch</span>
            </button>
          </nav>

          {/* Right Controls: Streak & Language Selector & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            <div
              title={`Bạn đã duy trì luyện tập liên tục ${schedule.streak} ngày!`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
              <span>{schedule.streak} ngày</span>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as Language)}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs sm:text-sm rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-100">
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              title="Cài đặt hệ thống & Thư mục lưu"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
