import React, { useState, useEffect } from 'react'
import { Language, ScoreResult, UserSchedule } from './types'
import { Header } from './components/Header'
import { ShadowingStudio } from './components/ShadowingStudio'
import { GrammarSpeaking } from './components/GrammarSpeaking'
import { RecordingsHistory } from './components/RecordingsHistory'
import { ScheduleTracker } from './components/ScheduleTracker'
import { PronunciationScoreModal } from './components/PronunciationScoreModal'
import { SettingsModal } from './components/SettingsModal'
import { loadSchedule, loadSettings } from './services/storage'

export function App() {
  const initialSettings = loadSettings()
  const [currentLang, setCurrentLang] = useState<Language>(initialSettings.defaultLanguage || 'ja')
  const [activeTab, setActiveTab] = useState<'shadowing' | 'speaking' | 'recordings' | 'schedule'>('shadowing')
  const [schedule, setSchedule] = useState<UserSchedule>(loadSchedule())

  // Scoring Modal state
  const [activeScoreResult, setActiveScoreResult] = useState<ScoreResult | null>(null)
  const [activeVideoBlobUrl, setActiveVideoBlobUrl] = useState<string | undefined>()
  const [activeLocalPath, setActiveLocalPath] = useState<string | undefined>()

  // Settings Modal state
  const [showSettings, setShowSettings] = useState(false)

  // Refresh schedule periodically or after activity
  const refreshSchedule = () => {
    setSchedule(loadSchedule())
  }

  const handleScoreReady = (result: ScoreResult, videoBlobUrl?: string, localPath?: string) => {
    setActiveScoreResult(result)
    setActiveVideoBlobUrl(videoBlobUrl)
    setActiveLocalPath(localPath)
    refreshSchedule()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        schedule={schedule}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'shadowing' && (
          <ShadowingStudio
            currentLang={currentLang}
            onScoreReady={handleScoreReady}
          />
        )}

        {activeTab === 'speaking' && (
          <GrammarSpeaking currentLang={currentLang} />
        )}

        {activeTab === 'recordings' && (
          <RecordingsHistory />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTracker schedule={schedule} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>iTalk Language Studio © 2026 — Luyện Shadowing Tiếng Nhật, Tiếng Trung & Tiếng Việt</span>
          <span>Hỗ trợ Web & Electron Desktop Native Recording</span>
        </div>
      </footer>

      {/* Pronunciation Scoring Modal */}
      {activeScoreResult && (
        <PronunciationScoreModal
          scoreResult={activeScoreResult}
          videoBlobUrl={activeVideoBlobUrl}
          localPath={activeLocalPath}
          onClose={() => {
            setActiveScoreResult(null)
            setActiveVideoBlobUrl(undefined)
            setActiveLocalPath(undefined)
          }}
          onRetry={() => {
            setActiveScoreResult(null)
          }}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChanged={(newSettings) => {
          if (newSettings.defaultLanguage) setCurrentLang(newSettings.defaultLanguage)
        }}
      />
    </div>
  )
}

export default App
