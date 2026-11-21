import React, { useCallback, useEffect, useState } from 'react'
import { CmsGrammarPattern, CmsLesson, Language, UserProfile } from '../../types'
import { supportedLanguages } from '../../data/languages'
import {
  isSupabaseConfigured,
  signInWithEmail,
  signOutSupabase,
} from '../../services/supabase'
import {
  adminFetchAllGrammarPatterns,
  adminFetchAllLessons,
  adminFetchUsersOverview,
  getCurrentUserProfile,
} from '../../services/cms'
import { AppTheme, applyTheme, getResolvedTheme, getStoredTheme } from '../../services/theme'
import { AdminLessonsManager } from './AdminLessonsManager'
import { AdminGrammarManager } from './AdminGrammarManager'
import { AdminUsersManager } from './AdminUsersManager'
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Check,
  Clock,
  Copy,
  Database,
  GraduationCap,
  LayoutDashboard,
  Lock,
  LogIn,
  LogOut,
  Mic,
  Moon,
  Plus,
  RefreshCw,
  Shield,
  ShieldAlert,
  Sun,
  Users,
} from 'lucide-react'

interface AdminCmsPageProps {
  onExitAdmin: () => void
  onOpenSettings: () => void
}

type AdminSection = 'overview' | 'lessons' | 'grammar' | 'users'

export const AdminCmsPage: React.FC<AdminCmsPageProps> = ({
  onExitAdmin,
  onOpenSettings,
}) => {
  const [section, setSection] = useState<AdminSection>('overview')
  const [theme, setTheme] = useState<AppTheme>(getStoredTheme())

  // Auth & Role Gate
  const [isConfigured, setIsConfigured] = useState<boolean>(() => isSupabaseConfigured())
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  // Overview stats
  const [cmsLessons, setCmsLessons] = useState<CmsLesson[]>([])
  const [cmsGrammar, setCmsGrammar] = useState<CmsGrammarPattern[]>([])
  const [usersStats, setUsersStats] = useState({
    usersCount: 0,
    totalRecordings: 0,
    totalMinutes: 0,
  })
  const [schemaMissingWarning, setSchemaMissingWarning] = useState(false)
  const [isLoadingOverview, setIsLoadingOverview] = useState(false)
  const [lessonCreateToken, setLessonCreateToken] = useState(0)
  const [grammarCreateToken, setGrammarCreateToken] = useState(0)

  const handleToggleTheme = () => {
    const next = getResolvedTheme(theme) === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  const refreshAuthState = useCallback(async () => {
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)
    if (!configured) {
      setProfile(null)
      setIsAdmin(false)
      setIsCheckingAuth(false)
      return
    }
    setIsCheckingAuth(true)
    const res = await getCurrentUserProfile()
    setProfile(res.profile)
    setIsAdmin(res.isAdmin)
    setIsCheckingAuth(false)
  }, [])

  const loadOverviewData = useCallback(async () => {
    setIsLoadingOverview(true)
    const [lessonsRes, grammarRes, usersRes] = await Promise.all([
      adminFetchAllLessons(),
      adminFetchAllGrammarPatterns(),
      adminFetchUsersOverview(),
    ])
    setCmsLessons(lessonsRes.data)
    setCmsGrammar(grammarRes.data)
    setUsersStats({
      usersCount: usersRes.users.length,
      totalRecordings: usersRes.totalRecordings,
      totalMinutes: usersRes.totalMinutes,
    })
    setSchemaMissingWarning(
      Boolean(lessonsRes.missingSchema || grammarRes.missingSchema)
    )
    setIsLoadingOverview(false)
  }, [])

  useEffect(() => {
    refreshAuthState()
    const handleAuthChanged = () => {
      refreshAuthState()
    }
    window.addEventListener('italk:auth-changed', handleAuthChanged)
    return () => window.removeEventListener('italk:auth-changed', handleAuthChanged)
  }, [refreshAuthState])

  useEffect(() => {
    if (isAdmin) {
      loadOverviewData()
    }
  }, [isAdmin, loadOverviewData])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setIsSigningIn(true)
    const res = await signInWithEmail(authEmail.trim(), authPassword)
    setIsSigningIn(false)
    if (res.error) {
      setAuthError(res.error)
      return
    }
    await refreshAuthState()
  }

  const handleSignOut = async () => {
    await signOutSupabase()
    setProfile(null)
    setIsAdmin(false)
  }

  const sqlGrantSnippet = `UPDATE public.profiles SET role = 'admin' WHERE email = '${
    profile?.email || 'your-admin@email.com'
  }';`

  const handleCopySql = () => {
    navigator.clipboard?.writeText(sqlGrantSnippet).catch(() => {})
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  // ==========================================
  // Auth & Permission Gates
  // ==========================================
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Database className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-extrabold text-white">
            Chưa cấu hình kết nối Supabase cho CMS Admin
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            CMS Admin sử dụng Supabase Auth, Postgres và Storage để quản lý bài học, mẫu ngữ pháp và tài khoản học viên. Hãy nhập Project URL &amp; Anon Key trong Cài đặt Cloud.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onOpenSettings}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              Mở Cài đặt Cloud
            </button>
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại iTalk</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-sm text-slate-300">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <span>Đang xác thực quyền truy cập CMS Admin...</span>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white">iTalk CMS Admin</h1>
                <p className="text-xs text-slate-400">Đăng nhập bằng tài khoản quản trị Supabase</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onExitAdmin}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email quản trị
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mật khẩu</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md disabled:opacity-50 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{isSigningIn ? 'Đang đăng nhập...' : 'Đăng nhập CMS Admin'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Cần đổi project Supabase?</span>
            <button
              type="button"
              onClick={onOpenSettings}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Cài đặt Cloud
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white">Không có quyền Admin</h1>
              <p className="text-xs text-slate-400">
                Tài khoản đang đăng nhập:{' '}
                <span className="text-slate-200 font-semibold">{profile.email || profile.id}</span> (role:{' '}
                <span className="font-mono">{profile.role}</span>)
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-300">
            <p className="font-semibold text-white">
              Hướng dẫn cấp quyền Admin lần đầu trên Supabase:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>
                Mở <strong>SQL Editor</strong> trên Supabase Dashboard và chạy toàn bộ file{' '}
                <code className="text-emerald-400">supabase/schema.sql</code>.
              </li>
              <li>Chạy tiếp câu lệnh SQL dưới đây để nâng quyền cho tài khoản này:</li>
            </ol>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
              <code className="text-[11px] text-emerald-400 break-all">{sqlGrantSnippet}</code>
              <button
                type="button"
                onClick={handleCopySql}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] shrink-0 cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Đã chép' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={refreshAuthState}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Kiểm tra lại quyền</span>
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại iTalk</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // Authenticated Admin Studio
  // ==========================================
  const activeLessons = cmsLessons.filter((l) => !l.isDeleted)
  const cmsNewLessonsCount = activeLessons.filter((l) => l.source === 'cms').length
  const overrideLessonsCount = activeLessons.filter((l) => l.source === 'override').length
  const draftLessonsCount = activeLessons.filter((l) => !l.isPublished).length

  const activeGrammar = cmsGrammar.filter((g) => !g.isDeleted)
  const cmsNewGrammarCount = activeGrammar.filter((g) => g.source === 'cms').length
  const overrideGrammarCount = activeGrammar.filter((g) => g.source === 'override').length
  const draftGrammarCount = activeGrammar.filter((g) => !g.isPublished).length

  const navItems: Array<{
    id: AdminSection
    label: string
    icon: React.FC<{ className?: string }>
    count?: number
  }> = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'lessons', label: 'Bài Shadowing', icon: BookOpen, count: activeLessons.length },
    { id: 'grammar', label: 'Ngữ pháp & Ví dụ', icon: GraduationCap, count: activeGrammar.length },
    { id: 'users', label: 'Người dùng & Tiến độ', icon: Users, count: usersStats.usersCount },
  ]

  const sectionTitle = navItems.find((n) => n.id === section)?.label || 'CMS Admin'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-slate-900 border-r border-slate-800 flex-col justify-between shrink-0">
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-white">iTalk CMS</div>
              <div className="text-[11px] text-emerald-400 font-semibold">Admin Studio</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = section === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </span>
                  {typeof item.count === 'number' && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        active
                          ? 'bg-slate-950/20 text-slate-950'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2.5">
          <div className="px-2">
            <div className="text-[11px] text-slate-400 truncate">Đăng nhập với quyền Admin</div>
            <div className="text-xs font-bold text-white truncate">{profile.email}</div>
          </div>
          <button
            type="button"
            onClick={onExitAdmin}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại ứng dụng học</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
              {sectionTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onExitAdmin}
              className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>App</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span className="max-w-[160px] truncate">{profile.email}</span>
            </span>

            <button
              type="button"
              onClick={handleToggleTheme}
              title={
                getResolvedTheme(theme) === 'dark'
                  ? 'Chuyển sang giao diện Sáng'
                  : 'Chuyển sang giao diện Tối'
              }
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
            >
              {getResolvedTheme(theme) === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Mobile Nav Switcher */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = section === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-5">
          {schemaMissingWarning && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  Chưa phát hiện bảng `cms_lessons` hoặc `cms_grammar_patterns` trên Supabase!
                </p>
                <p>
                  Hãy mở SQL Editor trên Supabase Dashboard và chạy toàn bộ nội dung file{' '}
                  <code className="text-white">supabase/schema.sql</code> để kích hoạt lưu trữ CMS.
                </p>
              </div>
            </div>
          )}

          {section === 'overview' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-white">Tổng quan hệ thống iTalk</h2>
                  <p className="text-xs text-slate-400">
                    Theo dõi nội dung CMS đồng bộ và hoạt động của học viên.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadOverviewData}
                  disabled={isLoadingOverview}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOverview ? 'animate-spin' : ''}`} />
                  <span>Làm mới số liệu</span>
                </button>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Bài Shadowing</span>
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">{activeLessons.length}</div>
                  <div className="text-[11px] text-slate-400">
                    {cmsNewLessonsCount} tạo mới • {overrideLessonsCount} đã sửa • {draftLessonsCount} nháp
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Mẫu Ngữ pháp</span>
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">{activeGrammar.length}</div>
                  <div className="text-[11px] text-slate-400">
                    {cmsNewGrammarCount} tạo mới • {overrideGrammarCount} đã sửa • {draftGrammarCount} nháp
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Người dùng đăng ký</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">{usersStats.usersCount}</div>
                  <div className="text-[11px] text-slate-400">Quản lý role &amp; lịch sử học</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Hoạt động thu âm</span>
                    <div className="flex items-center gap-1 text-rose-400">
                      <Clock className="w-3.5 h-3.5" />
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {usersStats.totalRecordings}{' '}
                    <span className="text-sm font-semibold text-slate-400">
                      / {usersStats.totalMinutes}p
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">Bản ghi / Tổng phút học</div>
                </div>
              </div>

              {/* Language Breakdown + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phân bổ nội dung đang hoạt động theo ngôn ngữ
                  </h3>
                  <div className="space-y-2.5">
                    {supportedLanguages.map((lang) => {
                      const code: Language = lang.code
                      const totalL = activeLessons.filter((l) => l.language === code).length
                      const cmsEditedOrNewL = activeLessons.filter(
                        (l) => l.language === code && l.source !== 'builtin'
                      ).length
                      const totalG = activeGrammar.filter((g) => g.language === code).length
                      const cmsEditedOrNewG = activeGrammar.filter(
                        (g) => g.language === code && g.source !== 'builtin'
                      ).length
                      return (
                        <div
                          key={code}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="font-bold text-white">
                            {lang.flag} {lang.name}
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span>
                              Shadowing: <strong className="text-emerald-400">{totalL}</strong> bài
                              {cmsEditedOrNewL > 0 ? ` (${cmsEditedOrNewL} CMS)` : ''}
                            </span>
                            <span>
                              Ngữ pháp: <strong className="text-indigo-400">{totalG}</strong> mẫu
                              {cmsEditedOrNewG > 0 ? ` (${cmsEditedOrNewG} CMS)` : ''}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Thao tác nhanh
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSection('lessons')
                        setLessonCreateToken((t) => t + 1)
                      }}
                      className="p-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tạo bài Shadowing mới</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSection('grammar')
                        setGrammarCreateToken((t) => t + 1)
                      }}
                      className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm mẫu ngữ pháp mới</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSection('lessons')}
                      className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>Quản lý Bài Shadowing</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSection('users')}
                      className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>Xem Người dùng &amp; Tiến độ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === 'lessons' && (
            <AdminLessonsManager
              onDataChanged={loadOverviewData}
              autoCreateToken={lessonCreateToken}
            />
          )}

          {section === 'grammar' && (
            <AdminGrammarManager
              onDataChanged={loadOverviewData}
              autoCreateToken={grammarCreateToken}
            />
          )}

          {section === 'users' && (
            <AdminUsersManager
              currentUserId={profile.id}
              onStatsUpdated={setUsersStats}
            />
          )}
        </main>
      </div>
    </div>
  )
}
