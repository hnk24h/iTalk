import React, { useState } from 'react'
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
  Sun,
  Moon,
} from 'lucide-react'
import { getStoredTheme, applyTheme, getResolvedTheme, AppTheme } from '../services/theme'

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
  const [theme, setTheme] = useState<AppTheme>(getStoredTheme())

  const handleToggleTheme = () => {
    const next = getResolvedTheme(theme) === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Desktop Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Mic className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  iTalk
                </span>
                {isElectron ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <Laptop className="w-3 h-3" /> Desktop App
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                    <Globe className="w-3 h-3" /> Web
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Luyện Nghe - Nói & Shadowing</p>
            </div>
          </div>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-950/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onSelectTab('shadowing')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'shadowing'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
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
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
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
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
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
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
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
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{schedule.streak} ngày</span>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as Language)}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleTheme}
              title={getResolvedTheme(theme) === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {getResolvedTheme(theme) === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-500" />
              )}
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              title="Cài đặt hệ thống & Thư mục lưu"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
