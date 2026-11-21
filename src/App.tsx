import React, { useEffect, useState } from 'react'
import { Language, UserSchedule } from './types'
import { Header } from './components/Header'
import { ShadowingStudio } from './components/ShadowingStudio'
import { GrammarSpeaking } from './components/GrammarSpeaking'
import { RecordingsHistory } from './components/RecordingsHistory'
import { ScheduleTracker } from './components/ScheduleTracker'
import { SettingsModal } from './components/SettingsModal'
import { AdminCmsPage } from './components/admin/AdminCmsPage'
import { loadSchedule, loadSettings } from './services/storage'
import { loadStudyPlan } from './services/studyPlan'
import { getCurrentUserProfile, refreshPublishedCmsContent } from './services/cms'
import { Mic, BookOpen, FolderOpen, Calendar } from 'lucide-react'

function isAdminRouteLocation(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.location.pathname.startsWith('/admin') ||
    window.location.hash.startsWith('#/admin')
  )
}

export function App() {
  const initialSettings = loadSettings()
  const [currentLang, setCurrentLang] = useState<Language>(initialSettings.defaultLanguage || 'ja')
  const [activeTab, setActiveTab] = useState<'shadowing' | 'speaking' | 'recordings' | 'schedule'>('shadowing')
  const [schedule, setSchedule] = useState<UserSchedule>(loadSchedule())

  // Admin CMS Routing & Role state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => isAdminRouteLocation())
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false)

  // Settings Modal state
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const syncRoute = () => setIsAdminRoute(isAdminRouteLocation())
    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)
    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  useEffect(() => {
    const syncAuthAndCms = () => {
      getCurrentUserProfile()
        .then((res) => setIsAdminUser(res.isAdmin))
        .catch(() => setIsAdminUser(false))
      refreshPublishedCmsContent().catch(() => {})
    }
    syncAuthAndCms()
    window.addEventListener('italk:auth-changed', syncAuthAndCms)
    return () => window.removeEventListener('italk:auth-changed', syncAuthAndCms)
  }, [])

  const enterAdminRoute = () => {
    if (typeof window !== 'undefined') {
      if (window.location.protocol === 'file:') {
        window.location.hash = '#/admin'
      } else {
        window.history.pushState({}, '', '/admin')
      }
    }
    setIsAdminRoute(true)
  }

  const exitAdminRoute = () => {
    if (typeof window !== 'undefined') {
      if (window.location.protocol === 'file:') {
        window.location.hash = ''
      } else {
        window.history.pushState({}, '', '/')
      }
    }
    setIsAdminRoute(false)
  }

  // Deep-link navigation state between ScheduleTracker <-> Shadowing / Grammar
  const [pendingLessonId, setPendingLessonId] = useState<string | undefined>(undefined)
  const [pendingGrammarPatternId, setPendingGrammarPatternId] = useState<string | undefined>(undefined)
  const [scheduleSubTab, setScheduleSubTab] = useState<'overview' | 'plan'>('overview')
  const [autoOpenPlanCreator, setAutoOpenPlanCreator] = useState(false)

  const handleOpenStudyPlan = () => {
    const existing = loadStudyPlan(currentLang)
    setScheduleSubTab('plan')
    setAutoOpenPlanCreator(!existing)
    setActiveTab('schedule')
  }

  // Refresh schedule periodically or after activity
  const refreshSchedule = () => {
    setSchedule(loadSchedule())
  }

  if (isAdminRoute) {
    return (
      <>
        <AdminCmsPage
          onExitAdmin={exitAdminRoute}
          onOpenSettings={() => setShowSettings(true)}
        />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSettingsChanged={(newSettings) => {
            if (newSettings.defaultLanguage) setCurrentLang(newSettings.defaultLanguage)
          }}
        />
      </>
    )
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
        isAdmin={isAdminUser}
        onOpenAdmin={enterAdminRoute}
      />

      {/* Main Content Area - Full Width responsive */}
      <main className="flex-1 w-full px-2 sm:px-6 lg:px-8 xl:px-10 py-3 sm:py-5 pb-24 md:pb-6">
        {activeTab === 'shadowing' && (
          <ShadowingStudio
            currentLang={currentLang}
            onPracticeComplete={refreshSchedule}
            initialLessonId={pendingLessonId}
            onConsumeInitialLesson={() => setPendingLessonId(undefined)}
            onOpenStudyPlan={handleOpenStudyPlan}
          />
        )}

        {activeTab === 'speaking' && (
          <GrammarSpeaking
            currentLang={currentLang}
            initialPatternId={pendingGrammarPatternId}
            onConsumeInitialPattern={() => setPendingGrammarPatternId(undefined)}
            onOpenStudyPlan={handleOpenStudyPlan}
          />
        )}

        {activeTab === 'recordings' && (
          <RecordingsHistory />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTracker
            schedule={schedule}
            currentLang={currentLang}
            onScheduleChange={(updated) => setSchedule(updated)}
            onOpenLesson={(lessonId) => {
              setPendingLessonId(lessonId)
              setActiveTab('shadowing')
            }}
            onOpenGrammar={(patternId) => {
              setPendingGrammarPatternId(patternId)
              setActiveTab('speaking')
            }}
            initialSubTab={scheduleSubTab}
            autoOpenPlanCreator={autoOpenPlanCreator}
            onConsumePlanNavigation={() => setAutoOpenPlanCreator(false)}
          />
        )}
      </main>

      {/* Footer - Full Width Desktop */}
      <footer className="hidden md:block border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>iTalk Language Studio © 2026 — Luyện Shadowing Tiếng Nhật, Tiếng Trung & Tiếng Việt</span>
          <span>Hỗ trợ Web & Electron Desktop Native Recording</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (iOS HIG compliant & Safe Area) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 pb-safe shadow-2xl">
        <div className="grid grid-cols-4 h-15">
          <button
            onClick={() => setActiveTab('shadowing')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === 'shadowing'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span className="text-[10px]">Shadowing</span>
          </button>

          <button
            onClick={() => setActiveTab('speaking')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === 'speaking'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Ngữ Pháp</span>
          </button>

          <button
            onClick={() => setActiveTab('recordings')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === 'recordings'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            <span className="text-[10px]">Bản Ghi</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === 'schedule'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px]">Tiến Độ</span>
          </button>
        </div>
      </nav>

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
