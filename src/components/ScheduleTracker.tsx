import React, { useEffect, useMemo, useState } from 'react'
import {
  GrammarPattern,
  GrammarQuizRecord,
  Language,
  Lesson,
  LessonProgress,
  RecordingItem,
  ScoreResult,
  StudyPlan,
  StudyPlanDayItem,
  UserSchedule,
} from '../types'
import { supportedLanguages, defaultLessonsByLanguage } from '../data/languages'
import {
  loadAllLessonProgress,
  loadCustomLessons,
  loadRecordings,
  saveSchedule,
} from '../services/storage'
import {
  deleteStudyPlan,
  getGrammarPatternsByLanguage,
  isGrammarPatternPracticed,
  loadGrammarScores,
  loadStudyPlan,
  saveStudyPlan,
  togglePlanItemCompletion,
} from '../services/studyPlan'
import { loadGrammarQuizResults } from '../services/grammarQuiz'
import { StudyPlanGeneratorModal } from './StudyPlanGeneratorModal'
import {
  Flame,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Target,
  Trophy,
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  Play,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Award,
  ArrowRight,
  GraduationCap,
  Mic,
  Video,
  X,
  Lock,
  Check,
  BookOpen,
  Trash2,
  RotateCcw,
  Coffee,
  Map as MapIcon,
} from 'lucide-react'

interface ScheduleTrackerProps {
  schedule: UserSchedule
  currentLang?: Language
  onScheduleChange?: (updated: UserSchedule) => void
  onOpenLesson?: (lessonId?: string) => void
  onOpenGrammar?: (patternId?: string) => void
  initialSubTab?: 'overview' | 'plan'
  autoOpenPlanCreator?: boolean
  onConsumePlanNavigation?: () => void
}

const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

const LEVEL_GROUPS_BY_LANG: Record<Language, Array<{ key: string; label: string; icon: string }>> = {
  ja: [
    { key: 'Kana', label: 'Bảng chữ cái Kana', icon: '🔤' },
    { key: 'N5', label: 'JLPT N5', icon: '🔰' },
    { key: 'N4', label: 'JLPT N4', icon: '📘' },
    { key: 'N3', label: 'JLPT N3', icon: '📙' },
    { key: 'N2', label: 'JLPT N2', icon: '📕' },
    { key: 'N1', label: 'JLPT N1', icon: '👑' },
  ],
  zh: [
    { key: 'Pinyin', label: 'Bính âm Pinyin', icon: '🔤' },
    { key: 'HSK 1', label: 'HSK 1', icon: '🌱' },
    { key: 'HSK 2', label: 'HSK 2', icon: '🌿' },
    { key: 'HSK 3', label: 'HSK 3', icon: '📘' },
    { key: 'HSK 4', label: 'HSK 4', icon: '📙' },
    { key: 'HSK 5', label: 'HSK 5', icon: '📕' },
    { key: 'HSK 6', label: 'HSK 6', icon: '👑' },
  ],
  vi: [
    { key: 'Chữ cái', label: 'Chữ cái & Thanh điệu', icon: '🔤' },
    { key: 'Cơ bản', label: 'Cơ bản', icon: '🌱' },
    { key: 'Nâng cao', label: 'Nâng cao', icon: '👑' },
  ],
}

const GOAL_PRESETS = [
  { id: 'light', label: 'Nhẹ nhàng', desc: 'Duy trì phản xạ mỗi ngày', minutes: 10, lessons: 2 },
  { id: 'standard', label: 'Tiêu chuẩn', desc: 'Cân bằng nghe - nhại', minutes: 15, lessons: 3 },
  { id: 'intensive', label: 'Chuyên sâu', desc: 'Bứt tốc phản xạ nói', minutes: 30, lessons: 5 },
]

function parseUtcDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1))
}

function formatDateKey(year: number, monthIdx: number, day: number): string {
  return `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatShortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${d}/${m}/${y}`
}

function formatDisplayDate(dateStr: string): string {
  const dt = parseUtcDate(dateStr)
  const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  const dayName = dayNames[dt.getUTCDay()] || ''
  const dd = String(dt.getUTCDate()).padStart(2, '0')
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0')
  const yyyy = dt.getUTCFullYear()
  return `${dayName}, ${dd}/${mm}/${yyyy}`
}

export const ScheduleTracker: React.FC<ScheduleTrackerProps> = ({
  schedule,
  currentLang = 'ja',
  onScheduleChange,
  onOpenLesson,
  onOpenGrammar,
  initialSubTab,
  autoOpenPlanCreator,
  onConsumePlanNavigation,
}) => {
  const todayStr = new Date().toISOString().split('T')[0]
  const todayParts = useMemo(() => {
    const [y, m] = todayStr.split('-').map(Number)
    return { year: y, month: (m || 1) - 1 }
  }, [todayStr])

  const langMeta =
    supportedLanguages.find((l) => l.code === currentLang) || supportedLanguages[0]

  // Interactive UI states
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'plan'>(
    initialSubTab || 'overview'
  )
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr)
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>(() => todayParts)
  const [chartMetric, setChartMetric] = useState<'minutes' | 'score'>('minutes')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [selectedWeekIdx, setSelectedWeekIdx] = useState<number>(0)
  const [planDayFilter, setPlanDayFilter] = useState<'all' | 'pending' | 'done'>('all')
  const [draftMinutes, setDraftMinutes] = useState<number>(schedule.dailyGoal.targetMinutes || 15)
  const [draftLessons, setDraftLessons] = useState<number>(schedule.dailyGoal.targetLessons || 3)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // Persistent lesson progress, grammar scores, recordings & study plan synced live
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, LessonProgress>>(() =>
    loadAllLessonProgress()
  )
  const [grammarScores, setGrammarScores] = useState<Record<string, ScoreResult>>(() =>
    loadGrammarScores()
  )
  const [grammarQuizResults, setGrammarQuizResults] = useState<Record<string, GrammarQuizRecord>>(() =>
    loadGrammarQuizResults()
  )
  const [recordings, setRecordings] = useState<RecordingItem[]>(() => loadRecordings())
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(() => loadStudyPlan(currentLang))

  useEffect(() => {
    setStudyPlan(loadStudyPlan(currentLang))
  }, [currentLang])

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab)
    }
    if (autoOpenPlanCreator) {
      setShowPlanModal(true)
      onConsumePlanNavigation?.()
    } else if (initialSubTab) {
      onConsumePlanNavigation?.()
    }
  }, [initialSubTab, autoOpenPlanCreator])

  useEffect(() => {
    setLessonProgressMap(loadAllLessonProgress())
    setGrammarScores(loadGrammarScores())
    setGrammarQuizResults(loadGrammarQuizResults())
    setRecordings(loadRecordings())

    const handleProgressUpdate = (e: Event) => {
      const detail = (e as CustomEvent<Record<string, LessonProgress>>).detail
      if (detail) {
        setLessonProgressMap(detail)
      } else {
        setLessonProgressMap(loadAllLessonProgress())
      }
      setGrammarScores(loadGrammarScores())
      setGrammarQuizResults(loadGrammarQuizResults())
      setRecordings(loadRecordings())
    }

    const handleGrammarProgressUpdate = () => {
      setGrammarScores(loadGrammarScores())
      setGrammarQuizResults(loadGrammarQuizResults())
    }

    const handlePlanUpdate = () => {
      setStudyPlan(loadStudyPlan(currentLang))
    }

    window.addEventListener('italk:lesson-progress-updated', handleProgressUpdate)
    window.addEventListener('italk:grammar-progress-updated', handleGrammarProgressUpdate)
    window.addEventListener('italk:study-plan-updated', handlePlanUpdate)
    return () => {
      window.removeEventListener('italk:lesson-progress-updated', handleProgressUpdate)
      window.removeEventListener('italk:grammar-progress-updated', handleGrammarProgressUpdate)
      window.removeEventListener('italk:study-plan-updated', handlePlanUpdate)
    }
  }, [currentLang])

  useEffect(() => {
    setDraftMinutes(schedule.dailyGoal.targetMinutes || 15)
    setDraftLessons(schedule.dailyGoal.targetLessons || 3)
  }, [schedule.dailyGoal.targetMinutes, schedule.dailyGoal.targetLessons])

  useEffect(() => {
    if (!showGoalModal) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGoalModal(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showGoalModal])

  const targetMinutes = Math.max(1, schedule.dailyGoal.targetMinutes || 15)
  const targetLessons = Math.max(1, schedule.dailyGoal.targetLessons || 3)

  const todayProgress = schedule.history[todayStr] || {
    date: todayStr,
    minutes: 0,
    lessonsCompleted: 0,
    scores: [],
  }

  const minutePercent = Math.min(100, Math.round((todayProgress.minutes / targetMinutes) * 100))
  const lessonPercent = Math.min(
    100,
    Math.round((todayProgress.lessonsCompleted / targetLessons) * 100)
  )
  const combinedGoalPercent = Math.round((minutePercent + lessonPercent) / 2)

  // All lessons & grammar patterns for current language + O(1) lookup maps
  const allLangLessons = useMemo<Lesson[]>(() => {
    const builtin = defaultLessonsByLanguage[currentLang] || []
    const custom = loadCustomLessons().filter((l) => l.language === currentLang)
    return [...builtin, ...custom]
  }, [currentLang, lessonProgressMap])

  const allLangPatterns = useMemo<GrammarPattern[]>(
    () => getGrammarPatternsByLanguage(currentLang),
    [currentLang]
  )

  const lessonByIdMap = useMemo(() => {
    const map = new Map<string, Lesson>()
    allLangLessons.forEach((l) => map.set(l.id, l))
    return map
  }, [allLangLessons])

  const patternByIdMap = useMemo(() => {
    const map = new Map<string, GrammarPattern>()
    allLangPatterns.forEach((p) => map.set(p.id, p))
    return map
  }, [allLangPatterns])

  const planDayByDateMap = useMemo(() => {
    const map = new Map<string, StudyPlanDayItem>()
    studyPlan?.days.forEach((d) => map.set(d.date, d))
    return map
  }, [studyPlan])

  // Auto-select week containing today when switching to/loading a study plan
  useEffect(() => {
    if (!studyPlan || !studyPlan.days.length) {
      setSelectedWeekIdx(0)
      return
    }
    const todayIdx = studyPlan.days.findIndex((d) => d.date === todayStr)
    if (todayIdx >= 0) {
      setSelectedWeekIdx(Math.floor(todayIdx / 7))
    } else {
      setSelectedWeekIdx(0)
    }
  }, [studyPlan?.id, todayStr])

  // Helpers to check item completion inside Study Plan (real progress + manual check)
  const isPlanShadowingDone = (lessonId: string): boolean => {
    if (studyPlan?.completedShadowingIds?.includes(lessonId)) return true
    const p = lessonProgressMap[lessonId]
    return Boolean(p && (p.isCompleted || (p.progressPercent ?? 0) >= 100))
  }

  const isPlanGrammarDone = (patternId: string): boolean => {
    if (studyPlan?.completedGrammarIds?.includes(patternId)) return true
    return isGrammarPatternPracticed(patternId, grammarScores, grammarQuizResults)
  }

  // Study Plan overall & weekly breakdown calculations
  const planAnalytics = useMemo(() => {
    if (!studyPlan) return null

    let doneShadowing = 0
    let doneGrammar = 0
    const seenShadowing = new Set<string>()
    const seenGrammar = new Set<string>()

    studyPlan.days.forEach((d) => {
      d.shadowingLessonIds.forEach((id) => {
        if (seenShadowing.has(id)) return
        seenShadowing.add(id)
        if (isPlanShadowingDone(id)) doneShadowing += 1
      })
      d.grammarPatternIds.forEach((id) => {
        if (seenGrammar.has(id)) return
        seenGrammar.add(id)
        if (isPlanGrammarDone(id)) doneGrammar += 1
      })
    })

    const totalItems = studyPlan.totalShadowingCount + studyPlan.totalGrammarCount
    const doneItems = doneShadowing + doneGrammar
    const overallPercent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0

    // Chunk days into weeks of 7 days
    const weeks: Array<{
      weekIndex: number
      days: StudyPlanDayItem[]
      containsToday: boolean
      isCompleted: boolean
      doneCount: number
      totalCount: number
    }> = []

    for (let i = 0; i < studyPlan.days.length; i += 7) {
      const slice = studyPlan.days.slice(i, i + 7)
      let wDone = 0
      let wTotal = 0
      let containsToday = false
      slice.forEach((day) => {
        if (day.date === todayStr) containsToday = true
        day.shadowingLessonIds.forEach((id) => {
          wTotal += 1
          if (isPlanShadowingDone(id)) wDone += 1
        })
        day.grammarPatternIds.forEach((id) => {
          wTotal += 1
          if (isPlanGrammarDone(id)) wDone += 1
        })
      })
      weeks.push({
        weekIndex: weeks.length,
        days: slice,
        containsToday,
        isCompleted: wTotal > 0 && wDone >= wTotal,
        doneCount: wDone,
        totalCount: wTotal,
      })
    }

    const todayPlanDay = planDayByDateMap.get(todayStr) || null

    return {
      doneShadowing,
      doneGrammar,
      totalItems,
      doneItems,
      overallPercent,
      weeks,
      todayPlanDay,
    }
  }, [studyPlan, lessonProgressMap, grammarScores, grammarQuizResults, todayStr, planDayByDateMap])

  // Aggregate Activity, Streaks, Scores & Weekly Series
  const analytics = useMemo(() => {
    const historyEntries = Object.values(schedule.history || {})
    const activeDates = historyEntries
      .filter((h) => h && h.minutes > 0)
      .map((h) => h.date)
      .sort()

    // Longest streak calculation from active history dates
    let longestStreak = 0
    let runningStreak = 0
    let prevMs: number | null = null
    for (const dateStr of activeDates) {
      const ms = parseUtcDate(dateStr).getTime()
      if (prevMs !== null && ms - prevMs === 86400000) {
        runningStreak += 1
      } else {
        runningStreak = 1
      }
      if (runningStreak > longestStreak) longestStreak = runningStreak
      prevMs = ms
    }
    longestStreak = Math.max(longestStreak, schedule.streak || 0)

    const totalMinutesAllTime = historyEntries.reduce((sum, h) => sum + (h?.minutes || 0), 0)
    const totalActiveDays = activeDates.length

    const historyScores: number[] = []
    historyEntries.forEach((h) => {
      if (Array.isArray(h?.scores)) {
        h.scores.forEach((sc) => {
          if (typeof sc === 'number') historyScores.push(sc)
        })
      }
    })
    const recordingScores = recordings
      .map((r) => r.score)
      .filter((sc): sc is number => typeof sc === 'number')

    const effectiveScores = historyScores.length > 0 ? historyScores : recordingScores
    const totalSessions = Math.max(
      historyEntries.reduce((sum, h) => sum + (h?.lessonsCompleted || 0), 0),
      recordings.length
    )
    const avgScore =
      effectiveScores.length > 0
        ? Math.round(effectiveScores.reduce((a, b) => a + b, 0) / effectiveScores.length)
        : null
    const bestScore = effectiveScores.length > 0 ? Math.max(...effectiveScores) : null

    // Last 7 days series (ending at todayStr)
    const todayUtcMs = parseUtcDate(todayStr).getTime()
    const weeklyDays = Array.from({ length: 7 }, (_, idx) => {
      const offset = 6 - idx
      const d = new Date(todayUtcMs - offset * 86400000)
      const dateStr = d.toISOString().split('T')[0]
      const entry = schedule.history[dateStr]
      const minutes = entry?.minutes || 0
      const lessonsCompleted = entry?.lessonsCompleted || 0
      const dayScores = Array.isArray(entry?.scores) ? entry.scores : []
      const dayAvgScore =
        dayScores.length > 0
          ? Math.round(dayScores.reduce((a, b) => a + b, 0) / dayScores.length)
          : 0
      const weekdayIdx = (d.getUTCDay() + 6) % 7
      const shortDate = `${String(d.getUTCDate()).padStart(2, '0')}/${String(
        d.getUTCMonth() + 1
      ).padStart(2, '0')}`

      return {
        dateStr,
        weekdayLabel: WEEKDAY_LABELS[weekdayIdx],
        shortDate,
        minutes,
        lessonsCompleted,
        avgScore: dayAvgScore,
        hasScores: dayScores.length > 0,
        isToday: dateStr === todayStr,
      }
    })

    const weeklyMinutes = weeklyDays.reduce((sum, d) => sum + d.minutes, 0)
    const weeklyActiveDays = weeklyDays.filter((d) => d.minutes > 0).length
    const maxWeeklyMinutes = Math.max(targetMinutes, ...weeklyDays.map((d) => d.minutes), 15)

    return {
      longestStreak,
      totalMinutesAllTime,
      totalActiveDays,
      avgScore,
      bestScore,
      totalSessions,
      weeklyDays,
      weeklyMinutes,
      weeklyActiveDays,
      maxWeeklyMinutes,
    }
  }, [schedule, recordings, todayStr, targetMinutes])

  // Lesson Progress Stats for current language
  const lessonAnalytics = useMemo(() => {
    let completedCount = 0
    let inProgressCount = 0
    let viewedCount = 0

    allLangLessons.forEach((l) => {
      const p = lessonProgressMap[l.id]
      if (!p) return
      if (p.isCompleted || (p.progressPercent ?? 0) >= 100) {
        completedCount += 1
      } else if ((p.practicedCount ?? 0) > 0) {
        inProgressCount += 1
      } else if (p.hasViewed) {
        viewedCount += 1
      }
    })

    const totalLessons = allLangLessons.length
    const overallLessonPercent =
      totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    // Breakdown by level
    const groups = LEVEL_GROUPS_BY_LANG[currentLang] || []
    const matchedIds = new Set<string>()
    const levelStats = groups
      .map((g) => {
        const list = allLangLessons.filter((l) => l.level && l.level.startsWith(g.key))
        list.forEach((l) => matchedIds.add(l.id))
        let completed = 0
        let inProgress = 0
        const bestScores: number[] = []
        list.forEach((l) => {
          const p = lessonProgressMap[l.id]
          if (!p) return
          if (p.isCompleted || (p.progressPercent ?? 0) >= 100) completed += 1
          else if ((p.practicedCount ?? 0) > 0 || p.hasViewed) inProgress += 1
          if (typeof p.bestScore === 'number') bestScores.push(p.bestScore)
        })
        const total = list.length
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0
        const avgBest =
          bestScores.length > 0
            ? Math.round(bestScores.reduce((a, b) => a + b, 0) / bestScores.length)
            : null
        return {
          key: g.key,
          label: g.label,
          icon: g.icon,
          total,
          completed,
          inProgress,
          percent,
          avgBest,
        }
      })
      .filter((st) => st.total > 0)

    const otherLessons = allLangLessons.filter((l) => !matchedIds.has(l.id))
    if (otherLessons.length > 0) {
      let completed = 0
      let inProgress = 0
      const bestScores: number[] = []
      otherLessons.forEach((l) => {
        const p = lessonProgressMap[l.id]
        if (!p) return
        if (p.isCompleted || (p.progressPercent ?? 0) >= 100) completed += 1
        else if ((p.practicedCount ?? 0) > 0 || p.hasViewed) inProgress += 1
        if (typeof p.bestScore === 'number') bestScores.push(p.bestScore)
      })
      levelStats.push({
        key: 'other',
        label: 'Bài tự tạo / Khác',
        icon: '📝',
        total: otherLessons.length,
        completed,
        inProgress,
        percent: Math.round((completed / otherLessons.length) * 100),
        avgBest:
          bestScores.length > 0
            ? Math.round(bestScores.reduce((a, b) => a + b, 0) / bestScores.length)
            : null,
      })
    }

    // Recent / In-progress lessons
    const recentLessons = allLangLessons
      .map((l) => ({ lesson: l, progress: lessonProgressMap[l.id] }))
      .filter(
        (item): item is { lesson: Lesson; progress: LessonProgress } =>
          Boolean(item.progress && (item.progress.hasViewed || item.progress.practicedCount > 0))
      )
      .sort((a, b) => {
        const tA = a.progress.lastPracticedAt || a.progress.lastViewedAt || ''
        const tB = b.progress.lastPracticedAt || b.progress.lastViewedAt || ''
        return tB.localeCompare(tA)
      })
      .slice(0, 5)

    // Total completed across all languages for milestones
    const totalCompletedAllLangs = Object.values(lessonProgressMap).filter(
      (p) => p && (p.isCompleted || (p.progressPercent ?? 0) >= 100)
    ).length

    return {
      completedCount,
      inProgressCount,
      viewedCount,
      totalLessons,
      overallLessonPercent,
      levelStats,
      recentLessons,
      totalCompletedAllLangs,
    }
  }, [allLangLessons, lessonProgressMap, currentLang])

  // Interactive Monthly Calendar Grid (Monday-first 7-col grid)
  const calendarData = useMemo(() => {
    const { year, month } = viewMonth
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7 // 0 = Mon .. 6 = Sun

    const cells: Array<{
      empty?: boolean
      day?: number
      dateStr?: string
      minutes?: number
      lessonsCompleted?: number
      isToday?: boolean
      hasPlanTasks?: boolean
    }> = []

    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ empty: true })
    }

    let monthMinutes = 0
    let monthActiveDays = 0

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateKey(year, month, day)
      const entry = schedule.history[dateStr]
      const minutes = entry?.minutes || 0
      const lessonsCompleted = entry?.lessonsCompleted || 0
      monthMinutes += minutes
      if (minutes > 0) monthActiveDays += 1
      const pDay = planDayByDateMap.get(dateStr)
      const hasPlanTasks = Boolean(
        pDay &&
          (pDay.shadowingLessonIds.length > 0 ||
            pDay.grammarPatternIds.length > 0 ||
            pDay.isReviewDay)
      )
      cells.push({
        day,
        dateStr,
        minutes,
        lessonsCompleted,
        isToday: dateStr === todayStr,
        hasPlanTasks,
      })
    }

    return { cells, monthMinutes, monthActiveDays }
  }, [viewMonth, schedule.history, todayStr, planDayByDateMap])

  // Selected Day Inspector Data
  const selectedDayInfo = useMemo(() => {
    const entry = schedule.history[selectedDateStr]
    const minutes = entry?.minutes || 0
    const lessonsCompleted = entry?.lessonsCompleted || 0
    const scores = Array.isArray(entry?.scores) ? entry.scores : []
    const dayRecordings = recordings.filter(
      (r) => typeof r.date === 'string' && r.date.slice(0, 10) === selectedDateStr
    )
    const combinedScores =
      scores.length > 0
        ? scores
        : dayRecordings.map((r) => r.score).filter((s): s is number => typeof s === 'number')
    const avgDayScore =
      combinedScores.length > 0
        ? Math.round(combinedScores.reduce((a, b) => a + b, 0) / combinedScores.length)
        : null

    const planDay = planDayByDateMap.get(selectedDateStr) || null

    return {
      minutes,
      lessonsCompleted: Math.max(lessonsCompleted, dayRecordings.length),
      avgDayScore,
      dayRecordings: dayRecordings.slice(0, 4),
      isGoalMet: minutes >= targetMinutes,
      isToday: selectedDateStr === todayStr,
      planDay,
    }
  }, [schedule.history, selectedDateStr, recordings, targetMinutes, todayStr, planDayByDateMap])

  // Milestones / Achievements
  const milestones = useMemo(() => {
    return [
      {
        id: 'first-step',
        title: 'Khởi hành',
        desc: 'Có ít nhất 1 ngày luyện tập',
        unlocked: analytics.totalActiveDays >= 1 || analytics.totalSessions >= 1,
        progressText: `${Math.min(1, analytics.totalActiveDays)}/1 ngày`,
        icon: '🚀',
      },
      {
        id: 'streak-3',
        title: 'Bền bỉ 3 ngày',
        desc: 'Đạt chuỗi 3 ngày liên tục',
        unlocked: analytics.longestStreak >= 3,
        progressText: `${Math.min(3, analytics.longestStreak)}/3 ngày`,
        icon: '🔥',
      },
      {
        id: 'streak-7',
        title: 'Thói quen 7 ngày',
        desc: 'Duy trì chuỗi 1 tuần liên tục',
        unlocked: analytics.longestStreak >= 7,
        progressText: `${Math.min(7, analytics.longestStreak)}/7 ngày`,
        icon: '⚡',
      },
      {
        id: 'time-60',
        title: 'Tích lũy 60 phút',
        desc: 'Tổng thời lượng luyện đạt 60p',
        unlocked: analytics.totalMinutesAllTime >= 60,
        progressText: `${Math.min(60, analytics.totalMinutesAllTime)}/60p`,
        icon: '⏱️',
      },
      {
        id: 'score-85',
        title: 'Phát âm chuẩn',
        desc: 'Đạt điểm phát âm từ 85đ trở lên',
        unlocked: (analytics.bestScore ?? 0) >= 85,
        progressText: analytics.bestScore !== null ? `${analytics.bestScore}/85đ` : '0/85đ',
        icon: '🎯',
      },
      {
        id: 'lessons-3',
        title: 'Chinh phục 3 bài',
        desc: 'Hoàn thành 100% ít nhất 3 bài',
        unlocked: lessonAnalytics.totalCompletedAllLangs >= 3,
        progressText: `${Math.min(3, lessonAnalytics.totalCompletedAllLangs)}/3 bài`,
        icon: '🏆',
      },
    ]
  }, [analytics, lessonAnalytics.totalCompletedAllLangs])

  const unlockedCount = milestones.filter((m) => m.unlocked).length

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3200)
  }

  const handleShiftMonth = (delta: -1 | 1) => {
    setViewMonth((prev) => {
      const nextMonth = prev.month + delta
      if (nextMonth < 0) return { year: prev.year - 1, month: 11 }
      if (nextMonth > 11) return { year: prev.year + 1, month: 0 }
      return { year: prev.year, month: nextMonth }
    })
  }

  const handleJumpToToday = () => {
    setViewMonth(todayParts)
    setSelectedDateStr(todayStr)
  }

  const handleSaveGoal = () => {
    const cleanMinutes = Math.min(180, Math.max(5, Math.round(draftMinutes || 15)))
    const cleanLessons = Math.min(30, Math.max(1, Math.round(draftLessons || 3)))
    const updated: UserSchedule = {
      ...schedule,
      dailyGoal: {
        targetMinutes: cleanMinutes,
        targetLessons: cleanLessons,
      },
    }
    saveSchedule(updated)
    onScheduleChange?.(updated)
    setShowGoalModal(false)
    showToast(`✅ Đã cập nhật mục tiêu: ${cleanMinutes} phút & ${cleanLessons} bài/ngày`)
  }

  const handlePlanCreated = (plan: StudyPlan, syncGoal: boolean) => {
    saveStudyPlan(plan)
    setStudyPlan(plan)
    setActiveSubTab('plan')

    if (syncGoal) {
      const updatedSchedule: UserSchedule = {
        ...schedule,
        dailyGoal: {
          targetMinutes: Math.min(180, Math.max(5, plan.estimatedMinutesPerDay || 15)),
          targetLessons: Math.min(
            30,
            Math.max(1, Math.round(plan.avgShadowingPerDay + plan.avgGrammarPerDay))
          ),
        },
      }
      saveSchedule(updatedSchedule)
      onScheduleChange?.(updatedSchedule)
    }

    showToast(`✨ Đã tạo kế hoạch ${plan.totalDays} ngày (${langMeta.name})`)
  }

  const handleDeletePlan = () => {
    if (!studyPlan) return
    if (confirm(`Bạn có chắc chắn muốn xóa "${studyPlan.title}"?`)) {
      deleteStudyPlan(currentLang)
      setStudyPlan(null)
      showToast('Đã xóa kế hoạch học tập')
    }
  }

  const handleTogglePlanItem = (kind: 'shadowing' | 'grammar', itemId: string) => {
    const updated = togglePlanItemCompletion(currentLang, kind, itemId)
    if (updated) {
      setStudyPlan(updated)
    }
  }

  const handleJumpToTodayInPlan = () => {
    if (!studyPlan) return
    const idx = studyPlan.days.findIndex((d) => d.date === todayStr)
    if (idx >= 0) {
      setSelectedWeekIdx(Math.floor(idx / 7))
      setPlanDayFilter('all')
    }
  }

  // SVG Ring math
  const ringRadius = 46
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringStrokeDashoffset =
    ringCircumference - (combinedGoalPercent / 100) * ringCircumference

  const hasPracticedToday = todayProgress.minutes > 0
  const currentWeek =
    planAnalytics?.weeks[selectedWeekIdx] || planAnalytics?.weeks[0] || null

  return (
    <div className="w-full space-y-5 relative">
      {/* Toast confirmation */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TIER 1: DASHBOARD HEADER, SUB-TABS & QUICK ACTIONS                   */}
      {/* ==================================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Tiến độ &amp; Lịch luyện tập
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  <span>{langMeta.flag}</span>
                  <span>{langMeta.name}</span>
                </span>
                {hasPracticedToday ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    Đã giữ chuỗi hôm nay
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Flame className="w-3 h-3" />
                    Cần luyện hôm nay để giữ chuỗi
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Theo dõi thời lượng Shadowing hàng ngày, tạo lộ trình học tự động theo số ngày và kiểm tra tiến độ từng cấp độ.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowPlanModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{studyPlan ? 'Tạo lại Plan' : 'Tạo kế hoạch học'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowGoalModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chỉnh mục tiêu</span>
            </button>

            {onOpenLesson && (
              <button
                type="button"
                onClick={() => onOpenLesson()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Luyện Shadowing ngay</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tab Bar: Overview & Calendar | Study Plan */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSubTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSubTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Tổng quan &amp; Lịch</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('plan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSubTab === 'plan'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Kế hoạch học tập</span>
            {studyPlan && planAnalytics ? (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeSubTab === 'plan'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {planAnalytics.overallPercent}%
              </span>
            ) : (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeSubTab === 'plan'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}
              >
                Tự động
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SUB-TAB 1: OVERVIEW & INTERACTIVE CALENDAR                           */}
      {/* ==================================================================== */}
      {activeSubTab === 'overview' && (
        <>
          {/* TIER 2: 4 KPI SUMMARY STAT CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 1: Streak */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-400">Chuỗi luyện tập</span>
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  <Flame className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {schedule.streak}{' '}
                  <span className="text-sm font-bold text-slate-400">ngày</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Kỷ lục cá nhân:{' '}
                  <strong className="text-amber-300 font-mono">
                    {analytics.longestStreak} ngày
                  </strong>
                </p>
              </div>
            </div>

            {/* Card 2: Weekly Practice */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-400">Tuần này (7 ngày)</span>
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {analytics.weeklyMinutes}{' '}
                  <span className="text-sm font-bold text-slate-400">phút</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  <strong className="text-emerald-400 font-mono">
                    {analytics.weeklyActiveDays}/7
                  </strong>{' '}
                  ngày · Tổng{' '}
                  <strong className="text-slate-300 font-mono">
                    {analytics.totalMinutesAllTime}p
                  </strong>
                </p>
              </div>
            </div>

            {/* Card 3: Average Pronunciation Score */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-400">Điểm phát âm TB</span>
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {analytics.avgScore !== null ? (
                    <>
                      {analytics.avgScore}
                      <span className="text-sm font-bold text-slate-400">đ</span>
                    </>
                  ) : (
                    '—'
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Cao nhất:{' '}
                  <strong className="text-indigo-300 font-mono">
                    {analytics.bestScore !== null ? `${analytics.bestScore}đ` : '—'}
                  </strong>{' '}
                  · {analytics.totalSessions} lượt
                </p>
              </div>
            </div>

            {/* Card 4: Lesson Completion */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-400">
                  Bài học ({langMeta.name})
                </span>
                <div className="p-2 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/25">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {lessonAnalytics.completedCount}
                  <span className="text-base font-bold text-slate-400">
                    /{lessonAnalytics.totalLessons}
                  </span>{' '}
                  <span className="text-xs font-bold text-emerald-400">
                    ({lessonAnalytics.overallLessonPercent}%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Đang học:{' '}
                  <strong className="text-teal-300 font-mono">
                    {lessonAnalytics.inProgressCount}
                  </strong>{' '}
                  bài · Đã xem: {lessonAnalytics.viewedCount}
                </p>
              </div>
            </div>
          </div>

          {/* TODAY'S STUDY PLAN BANNER */}
          {studyPlan && planAnalytics ? (
            <div className="bg-slate-900 border border-indigo-500/35 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shrink-0">
                    <MapIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate">
                        {studyPlan.title}
                      </h3>
                      {planAnalytics.todayPlanDay && (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Ngày {planAnalytics.todayPlanDay.dayIndex}/{studyPlan.totalDays}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tiến độ Plan:{' '}
                      <strong className="text-emerald-400 font-mono">
                        {planAnalytics.doneItems}/{planAnalytics.totalItems} mục (
                        {planAnalytics.overallPercent}%)
                      </strong>{' '}
                      · Trung bình ~{studyPlan.avgShadowingPerDay} Shadowing +{' '}
                      {studyPlan.avgGrammarPerDay} Ngữ pháp/ngày
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('plan')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    <span>Xem toàn bộ Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Today's Assigned Plan Tasks */}
              {planAnalytics.todayPlanDay &&
                (planAnalytics.todayPlanDay.shadowingLessonIds.length > 0 ||
                  planAnalytics.todayPlanDay.grammarPatternIds.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                    {planAnalytics.todayPlanDay.shadowingLessonIds.map((lId) => {
                      const lesson = lessonByIdMap.get(lId)
                      if (!lesson) return null
                      const done = isPlanShadowingDone(lId)
                      return (
                        <div
                          key={`today-sh-${lId}`}
                          className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={() => handleTogglePlanItem('shadowing', lId)}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                done
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                  : 'bg-slate-900 border-slate-700 hover:border-emerald-400'
                              }`}
                              title="Đánh dấu hoàn thành"
                            >
                              {done && <Check className="w-3.5 h-3.5" />}
                            </button>
                            <div className="min-w-0">
                              <div className="text-[10px] font-bold text-emerald-400">
                                🎤 Shadowing · {lesson.level}
                              </div>
                              <div
                                className={`text-xs font-semibold truncate ${
                                  done ? 'line-through text-slate-500' : 'text-slate-200'
                                }`}
                              >
                                {lesson.title}
                              </div>
                            </div>
                          </div>

                          {onOpenLesson && (
                            <button
                              type="button"
                              onClick={() => onOpenLesson(lId)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                            >
                              Luyện →
                            </button>
                          )}
                        </div>
                      )
                    })}

                    {planAnalytics.todayPlanDay.grammarPatternIds.map((gId) => {
                      const pattern = patternByIdMap.get(gId)
                      if (!pattern) return null
                      const done = isPlanGrammarDone(gId)
                      return (
                        <div
                          key={`today-gr-${gId}`}
                          className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={() => handleTogglePlanItem('grammar', gId)}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                done
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                  : 'bg-slate-900 border-slate-700 hover:border-indigo-400'
                              }`}
                              title="Đánh dấu hoàn thành"
                            >
                              {done && <Check className="w-3.5 h-3.5" />}
                            </button>
                            <div className="min-w-0">
                              <div className="text-[10px] font-bold text-indigo-300">
                                📘 Ngữ pháp · {pattern.level}
                              </div>
                              <div
                                className={`text-xs font-semibold truncate ${
                                  done ? 'line-through text-slate-500' : 'text-slate-200'
                                }`}
                              >
                                {pattern.pattern} — {pattern.meaning}
                              </div>
                            </div>
                          </div>

                          {onOpenGrammar && (
                            <button
                              type="button"
                              onClick={() => onOpenGrammar(gId)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-500 hover:text-white text-indigo-300 text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                            >
                              Học →
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

              {planAnalytics.todayPlanDay?.isReviewDay && (
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 shrink-0" />
                  <span>
                    Hôm nay là <strong>Ngày ôn tập</strong> trong kế hoạch — hãy nghe lại và ôn những bài đã học trong tuần!
                  </span>
                </div>
              )}

              {planAnalytics.todayPlanDay?.isRestDay && (
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Hôm nay là <strong>Ngày nghỉ ngơi</strong> theo kế hoạch ({studyPlan.studyDaysPerWeek} ngày/tuần). Bạn vẫn có thể ôn nhẹ nếu muốn.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-dashed border-indigo-500/40 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Chưa có kế hoạch học tự động ({langMeta.name})
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Nhập số ngày muốn học (VD: 90 ngày / 3 tháng) — hệ thống sẽ tự chia đều bài Shadowing và mẫu Ngữ pháp mỗi ngày cho bạn.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPlanModal(true)}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tạo Plan ngay</span>
              </button>
            </div>
          )}

          {/* TIER 3: 7-DAY CHART & INTERACTIVE CALENDAR + GOALS & INSPECTOR */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN (7/12): 7-Day Activity Chart + Monthly Interactive Calendar */}
            <div className="xl:col-span-7 space-y-5">
              {/* A. 7-Day Activity Bar Chart */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Hoạt động 7 ngày gần nhất
                      </h3>
                      <p className="text-xs text-slate-400">
                        Bấm vào một cột ngày để xem chi tiết buổi luyện bên phải
                      </p>
                    </div>
                  </div>

                  {/* Metric Switcher */}
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setChartMetric('minutes')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                        chartMetric === 'minutes'
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Thời lượng (phút)
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartMetric('score')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                        chartMetric === 'score'
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Điểm TB
                    </button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="relative pt-5 pb-1">
                  <div className="relative h-44 flex items-end justify-between gap-2 sm:gap-3 px-1">
                    {(() => {
                      const refPercent =
                        chartMetric === 'minutes'
                          ? Math.min(
                              100,
                              Math.round((targetMinutes / analytics.maxWeeklyMinutes) * 100)
                            )
                          : 70
                      return (
                        <div
                          className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-amber-400/50 z-0 flex justify-end"
                          style={{ bottom: `${refPercent}%` }}
                        >
                          <span className="text-[10px] font-mono font-semibold text-amber-400 bg-slate-900 px-1.5 -mt-2.5 rounded">
                            {chartMetric === 'minutes'
                              ? `Mục tiêu ${targetMinutes}p`
                              : 'Chuẩn 70đ'}
                          </span>
                        </div>
                      )
                    })()}

                    {analytics.weeklyDays.map((day) => {
                      const value = chartMetric === 'minutes' ? day.minutes : day.avgScore
                      const heightPercent =
                        chartMetric === 'minutes'
                          ? value > 0
                            ? Math.max(
                                8,
                                Math.round((value / analytics.maxWeeklyMinutes) * 100)
                              )
                            : 4
                          : value > 0
                          ? Math.max(8, Math.min(100, value))
                          : 4

                      const isSelected = selectedDateStr === day.dateStr
                      const isTargetMet =
                        chartMetric === 'minutes'
                          ? day.minutes >= targetMinutes
                          : day.avgScore >= 70

                      const barColor =
                        value === 0
                          ? 'bg-slate-800'
                          : chartMetric === 'minutes'
                          ? isTargetMet
                            ? 'bg-gradient-to-t from-emerald-500 to-teal-300 shadow-md shadow-emerald-500/20'
                            : 'bg-emerald-500/45 border border-emerald-400/40'
                          : isTargetMet
                          ? 'bg-gradient-to-t from-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/20'
                          : 'bg-amber-500/60'

                      return (
                        <button
                          key={day.dateStr}
                          type="button"
                          onClick={() => setSelectedDateStr(day.dateStr)}
                          className={`group flex-1 h-full flex flex-col justify-end items-center gap-1.5 z-10 cursor-pointer rounded-2xl p-1 transition-all ${
                            isSelected
                              ? 'bg-indigo-500/10 ring-1 ring-indigo-400/60'
                              : 'hover:bg-slate-800/40'
                          }`}
                          title={`${day.shortDate}: ${day.minutes} phút · ${
                            day.hasScores ? `${day.avgScore}đ TB` : 'Chưa có điểm'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              value > 0 ? 'text-slate-200' : 'text-slate-500'
                            }`}
                          >
                            {value > 0
                              ? chartMetric === 'minutes'
                                ? `${value}p`
                                : `${value}đ`
                              : '0'}
                          </span>

                          <div className="w-full max-w-[38px] flex-1 flex items-end justify-center">
                            <div
                              className={`w-full rounded-t-xl transition-all duration-300 ${barColor}`}
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* X-Axis Labels */}
                  <div className="flex items-center justify-between gap-2 sm:gap-3 px-1 mt-1.5 border-t border-slate-800 pt-2">
                    {analytics.weeklyDays.map((day) => {
                      const isSelected = selectedDateStr === day.dateStr
                      return (
                        <div
                          key={`lbl-${day.dateStr}`}
                          className="flex-1 text-center leading-tight"
                        >
                          <div
                            className={`text-[11px] font-bold ${
                              day.isToday
                                ? 'text-amber-400'
                                : isSelected
                                ? 'text-indigo-300'
                                : 'text-slate-300'
                            }`}
                          >
                            {day.isToday ? 'Nay' : day.weekdayLabel}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            {day.shortDate}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* B. Interactive Monthly Calendar Heatmap */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Tháng {viewMonth.month + 1}, {viewMonth.year}
                      </h3>
                      <p className="text-xs text-slate-400">
                        <strong className="text-emerald-400 font-mono">
                          {calendarData.monthActiveDays}
                        </strong>{' '}
                        ngày luyện ·{' '}
                        <strong className="text-slate-200 font-mono">
                          {calendarData.monthMinutes} phút
                        </strong>{' '}
                        trong tháng
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleShiftMonth(-1)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                      title="Tháng trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleJumpToToday}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Hôm nay
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftMonth(1)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                      title="Tháng sau"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday Header Row (Mon - Sun) */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
                  {WEEKDAY_LABELS.map((wd, idx) => (
                    <div
                      key={wd}
                      className={`text-[11px] font-bold py-1 ${
                        idx >= 5 ? 'text-amber-400/90' : 'text-slate-400'
                      }`}
                    >
                      {wd}
                    </div>
                  ))}
                </div>

                {/* 7-Column Calendar Cells */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {calendarData.cells.map((cell, idx) => {
                    if (cell.empty || !cell.dateStr) {
                      return <div key={`empty-${idx}`} className="aspect-square" />
                    }

                    const mins = cell.minutes || 0
                    const isSelected = selectedDateStr === cell.dateStr

                    let cellStyle =
                      'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/70'
                    if (mins > 0 && mins < targetMinutes) {
                      cellStyle =
                        'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold hover:bg-emerald-500/30'
                    } else if (mins >= targetMinutes && mins < targetMinutes * 1.5) {
                      cellStyle =
                        'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
                    } else if (mins >= targetMinutes * 1.5) {
                      cellStyle =
                        'bg-gradient-to-br from-emerald-400 to-teal-400 border-emerald-300 text-slate-950 font-extrabold shadow-md shadow-emerald-500/25'
                    }

                    return (
                      <button
                        key={cell.dateStr}
                        type="button"
                        onClick={() => setSelectedDateStr(cell.dateStr!)}
                        title={`${cell.dateStr}: ${mins} phút luyện tập${
                          cell.hasPlanTasks ? ' · Có lịch Plan' : ''
                        }`}
                        className={`aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all hover:scale-[1.03] cursor-pointer relative ${cellStyle} ${
                          isSelected
                            ? 'ring-2 ring-indigo-400 ring-offset-1 ring-offset-slate-900'
                            : cell.isToday
                            ? 'ring-2 ring-amber-400'
                            : ''
                        }`}
                      >
                        <span className="text-xs sm:text-sm leading-none">{cell.day}</span>
                        {mins > 0 && (
                          <span className="text-[9px] font-mono opacity-85 mt-0.5 leading-none">
                            {mins}p
                          </span>
                        )}
                        {cell.isToday && (
                          <span
                            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400"
                            title="Hôm nay"
                          />
                        )}
                        {cell.hasPlanTasks && (
                          <span
                            className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-indigo-400"
                            title="Có bài trong Kế hoạch học"
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Heatmap Legend */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full ring-2 ring-amber-400 inline-block" />
                      Hôm nay
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full ring-2 ring-indigo-400 inline-block" />
                      Đang xem
                    </span>
                    {studyPlan && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                        Lịch Plan
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800 inline-block" />
                      0p
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />
                      &lt;{targetMinutes}p
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-400 inline-block" />
                      &ge;{targetMinutes}p
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-gradient-to-br from-emerald-400 to-teal-400 inline-block" />
                      &ge;{Math.round(targetMinutes * 1.5)}p
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (5/12): Today Goal Ring + Selected Day Inspector + Milestones */}
            <div className="xl:col-span-5 space-y-5">
              {/* A. Today's Goal Progress Ring */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Mục tiêu hôm nay
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGoalModal(true)}
                    className="text-[11px] font-semibold text-emerald-400 hover:underline cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* SVG Circular Ring */}
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                      <circle
                        cx="56"
                        cy="56"
                        r={ringRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="9"
                        className="text-slate-800"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r={ringRadius}
                        fill="none"
                        stroke="url(#goalRingGrad)"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={ringStrokeDashoffset}
                        className="transition-all duration-700"
                      />
                      <defs>
                        <linearGradient id="goalRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#2dd4bf" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-black text-white font-mono">
                        {combinedGoalPercent}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">Hôm nay</span>
                    </div>
                  </div>

                  {/* Minutes & Lessons Progress Bars */}
                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          Thời lượng
                        </span>
                        <span className="font-mono font-bold text-emerald-400">
                          {todayProgress.minutes} / {targetMinutes}p
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${minutePercent}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          Lượt / Bài Shadowing
                        </span>
                        <span className="font-mono font-bold text-cyan-400">
                          {todayProgress.lessonsCompleted} / {targetLessons} bài
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${lessonPercent}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      {combinedGoalPercent >= 100
                        ? '🎉 Tuyệt vời! Bạn đã hoàn thành trọn vẹn mục tiêu hôm nay.'
                        : `Còn ${Math.max(0, targetMinutes - todayProgress.minutes)} phút & ${Math.max(
                            0,
                            targetLessons - todayProgress.lessonsCompleted
                          )} lượt để đạt 100%.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* B. Selected Day Inspector (including Plan items for selected day) */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">
                        {formatDisplayDate(selectedDateStr)}
                      </h3>
                      {selectedDayInfo.isToday && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Hôm nay
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Chi tiết hoạt động &amp; lịch học trong ngày
                    </p>
                  </div>

                  {selectedDayInfo.isGoalMet ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Đạt mục tiêu
                    </span>
                  ) : selectedDayInfo.minutes > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      <Clock className="w-3 h-3" />
                      Đang tiến hành
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                      Chưa học
                    </span>
                  )}
                </div>

                {/* Day Mini Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 font-medium">Thời lượng</div>
                    <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">
                      {selectedDayInfo.minutes}p
                    </div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 font-medium">Lượt / Bài</div>
                    <div className="text-sm font-black text-cyan-400 font-mono mt-0.5">
                      {selectedDayInfo.lessonsCompleted}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 font-medium">Điểm TB</div>
                    <div className="text-sm font-black text-indigo-300 font-mono mt-0.5">
                      {selectedDayInfo.avgDayScore !== null
                        ? `${selectedDayInfo.avgDayScore}đ`
                        : '—'}
                    </div>
                  </div>
                </div>

                {/* Planned Items for Selected Date */}
                {selectedDayInfo.planDay && (
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300">
                      <span>
                        🗓️ Lịch theo Plan (Ngày {selectedDayInfo.planDay.dayIndex})
                      </span>
                      <span className="font-mono text-slate-400">
                        {selectedDayInfo.planDay.isRestDay
                          ? 'Ngày nghỉ'
                          : selectedDayInfo.planDay.isReviewDay
                          ? 'Ôn tập'
                          : `~${selectedDayInfo.planDay.estimatedMinutes}p`}
                      </span>
                    </div>

                    {selectedDayInfo.planDay.isRestDay ? (
                      <p className="text-[11px] text-slate-400">
                        Ngày nghỉ phục hồi theo nhịp {studyPlan?.studyDaysPerWeek} ngày/tuần.
                      </p>
                    ) : selectedDayInfo.planDay.isReviewDay ? (
                      <p className="text-[11px] text-slate-300">
                        Ôn tập lại các bài Shadowing &amp; mẫu Ngữ pháp đã học trong tuần.
                      </p>
                    ) : (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-0.5">
                        {selectedDayInfo.planDay.shadowingLessonIds.map((lId) => {
                          const lesson = lessonByIdMap.get(lId)
                          if (!lesson) return null
                          const done = isPlanShadowingDone(lId)
                          return (
                            <div
                              key={`sel-sh-${lId}`}
                              className="flex items-center justify-between gap-2 text-xs bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-800"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => handleTogglePlanItem('shadowing', lId)}
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 cursor-pointer ${
                                    done
                                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                      : 'border-slate-600'
                                  }`}
                                >
                                  {done && <Check className="w-3 h-3" />}
                                </button>
                                <span
                                  className={`truncate ${
                                    done ? 'line-through text-slate-500' : 'text-slate-200'
                                  }`}
                                >
                                  🎤 {lesson.title}
                                </span>
                              </div>
                              {onOpenLesson && (
                                <button
                                  type="button"
                                  onClick={() => onOpenLesson(lId)}
                                  className="text-[10px] font-bold text-emerald-400 hover:underline shrink-0 cursor-pointer"
                                >
                                  Mở →
                                </button>
                              )}
                            </div>
                          )
                        })}

                        {selectedDayInfo.planDay.grammarPatternIds.map((gId) => {
                          const pattern = patternByIdMap.get(gId)
                          if (!pattern) return null
                          const done = isPlanGrammarDone(gId)
                          return (
                            <div
                              key={`sel-gr-${gId}`}
                              className="flex items-center justify-between gap-2 text-xs bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-800"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => handleTogglePlanItem('grammar', gId)}
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 cursor-pointer ${
                                    done
                                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                      : 'border-slate-600'
                                  }`}
                                >
                                  {done && <Check className="w-3 h-3" />}
                                </button>
                                <span
                                  className={`truncate ${
                                    done ? 'line-through text-slate-500' : 'text-slate-200'
                                  }`}
                                >
                                  📘 {pattern.pattern} ({pattern.meaning})
                                </span>
                              </div>
                              {onOpenGrammar && (
                                <button
                                  type="button"
                                  onClick={() => onOpenGrammar(gId)}
                                  className="text-[10px] font-bold text-indigo-300 hover:underline shrink-0 cursor-pointer"
                                >
                                  Mở →
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Recordings from Selected Day */}
                {selectedDayInfo.dayRecordings.length > 0 ? (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400">
                      Bản ghi trong ngày ({selectedDayInfo.dayRecordings.length}):
                    </div>
                    {selectedDayInfo.dayRecordings.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 shrink-0">
                            {rec.type === 'video' ? (
                              <Video className="w-3.5 h-3.5" />
                            ) : (
                              <Mic className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-200 truncate">
                              {rec.lessonTitle}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {rec.durationSec}s · {rec.language.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        {typeof rec.score === 'number' && (
                          <span
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              rec.score >= 70
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {rec.score}đ
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  !selectedDayInfo.planDay && (
                    <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-dashed border-slate-800 text-center space-y-2">
                      <p className="text-xs text-slate-400">
                        {selectedDayInfo.minutes > 0
                          ? `Đã ghi nhận ${selectedDayInfo.minutes} phút luyện tập trong ngày này.`
                          : 'Chưa có hoạt động Shadowing được ghi nhận trong ngày này.'}
                      </p>
                      {selectedDayInfo.isToday && onOpenLesson && (
                        <button
                          type="button"
                          onClick={() => onOpenLesson()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Luyện tập ngay</span>
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* C. Milestones & Badges */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Cột mốc thành tích
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {unlockedCount}/{milestones.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {milestones.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        m.unlocked
                          ? 'bg-emerald-500/10 border-emerald-500/35 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-lg leading-none">{m.icon}</span>
                        {m.unlocked ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
                            <Check className="w-2.5 h-2.5" /> Đạt
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400">
                            <Lock className="w-2.5 h-2.5" /> {m.progressText}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-white truncate">{m.title}</div>
                      <div className="text-[10px] text-slate-400 leading-snug mt-0.5 line-clamp-2">
                        {m.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TIER 4: LEVEL PROGRESS BREAKDOWN & RECENT / IN-PROGRESS LESSONS */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* Left: Progress Breakdown by Level */}
            <div className="xl:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Lộ trình theo cấp độ ({langMeta.name})
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tổng quan tiến độ hoàn thành từng cấp độ bài học
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {lessonAnalytics.completedCount}/{lessonAnalytics.totalLessons} bài hoàn thành
                </span>
              </div>

              <div className="space-y-3">
                {lessonAnalytics.levelStats.map((st) => (
                  <div
                    key={st.key}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{st.icon}</span>
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          {st.label}
                        </span>
                        {st.inProgress > 0 && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {st.inProgress} đang học
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 text-xs font-mono shrink-0">
                        {st.avgBest !== null && (
                          <span className="text-indigo-300 font-semibold">TB {st.avgBest}đ</span>
                        )}
                        <span className="text-emerald-400 font-bold">
                          {st.completed}/{st.total} bài ({st.percent}%)
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${st.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Recent & In-progress Lessons (Deep link to Shadowing) */}
            <div className="xl:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Bài học gần đây</h3>
                    <p className="text-xs text-slate-400">Bấm để quay lại luyện tiếp ngay</p>
                  </div>
                </div>
              </div>

              {lessonAnalytics.recentLessons.length > 0 ? (
                <div className="space-y-2.5">
                  {lessonAnalytics.recentLessons.map(({ lesson, progress }) => {
                    const isCompleted =
                      progress.isCompleted || (progress.progressPercent ?? 0) >= 100
                    const pct = progress.progressPercent ?? 0

                    return (
                      <div
                        key={lesson.id}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {lesson.level}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate">
                              {lesson.category}
                            </span>
                            {typeof progress.bestScore === 'number' && (
                              <span className="text-[10px] font-mono font-bold text-amber-300">
                                🏆 {progress.bestScore}đ
                              </span>
                            )}
                          </div>

                          <div className="text-xs sm:text-sm font-bold text-white truncate">
                            {lesson.title}
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                              <div
                                className={`h-full rounded-full ${
                                  isCompleted
                                    ? 'bg-emerald-500'
                                    : 'bg-gradient-to-r from-amber-400 to-emerald-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-300 shrink-0">
                              {pct}%
                            </span>
                          </div>
                        </div>

                        {onOpenLesson && (
                          <button
                            type="button"
                            onClick={() => onOpenLesson(lesson.id)}
                            className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                          >
                            <span>{isCompleted ? 'Ôn lại' : 'Luyện tiếp'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                  <div className="text-2xl">🎧</div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">
                      Bạn chưa bắt đầu bài {langMeta.name} nào
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Hãy chọn bài đầu tiên để hệ thống bắt đầu ghi nhận tiến độ và điểm phát âm.
                    </p>
                  </div>
                  {onOpenLesson && allLangLessons[0] && (
                    <button
                      type="button"
                      onClick={() => onOpenLesson(allLangLessons[0].id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bắt đầu bài đầu tiên</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ==================================================================== */}
      {/* SUB-TAB 2: AUTO STUDY PLAN VIEWER                                    */}
      {/* ==================================================================== */}
      {activeSubTab === 'plan' && (
        <>
          {!studyPlan || !planAnalytics ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="max-w-lg mx-auto space-y-2">
                <h3 className="text-xl font-extrabold text-white">
                  Tạo kế hoạch học {langMeta.name} cá nhân hóa
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Chỉ cần nhập số ngày bạn muốn học (ví dụ 30 ngày, 90 ngày / 3 tháng...), iTalk sẽ tự động chia đều bài Shadowing và mẫu Ngữ pháp phù hợp với tiến độ của bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-emerald-400">Bước 1 · Nhập thời gian</div>
                  <p className="text-xs text-slate-300">
                    Chọn 14, 30, 60, 90 ngày (3 tháng) hoặc số ngày tùy ý cùng nhịp 5–7 buổi/tuần.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-indigo-300">Bước 2 · Tự động chia bài</div>
                  <p className="text-xs text-slate-300">
                    Tính rõ mỗi ngày cần học bao nhiêu bài Shadowing &amp; mẫu Ngữ pháp, tự chèn ngày ôn tập.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-amber-300">Bước 3 · Theo dõi &amp; Luyện</div>
                  <p className="text-xs text-slate-300">
                    Xem Plan theo từng tuần/ngày, bấm trực tiếp vào bài để mở Studio luyện và đánh dấu hoàn thành.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPlanModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tự tạo kế hoạch học ngay</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Plan Overview Header Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {langMeta.flag} {langMeta.name}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {formatShortDate(studyPlan.startDate)} → {formatShortDate(studyPlan.endDate)}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      {studyPlan.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {planAnalytics.todayPlanDay && (
                      <button
                        type="button"
                        onClick={handleJumpToTodayInPlan}
                        className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Nhảy đến hôm nay (Ngày {planAnalytics.todayPlanDay.dayIndex})
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowPlanModal(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tạo lại Plan</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDeletePlan}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer"
                      title="Xóa kế hoạch này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 4 Plan Summary Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-semibold">Tiến độ kế hoạch</div>
                    <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                      {planAnalytics.overallPercent}%
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800 mt-1.5">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${planAnalytics.overallPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-semibold">Shadowing</div>
                    <div className="text-xl font-black text-white font-mono mt-0.5">
                      {planAnalytics.doneShadowing}
                      <span className="text-sm text-slate-400">
                        /{studyPlan.totalShadowingCount}
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                      ~{studyPlan.avgShadowingPerDay} bài/ngày học
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-semibold">Ngữ pháp</div>
                    <div className="text-xl font-black text-white font-mono mt-0.5">
                      {planAnalytics.doneGrammar}
                      <span className="text-sm text-slate-400">
                        /{studyPlan.totalGrammarCount}
                      </span>
                    </div>
                    <div className="text-[11px] text-indigo-300 font-mono mt-0.5">
                      ~{studyPlan.avgGrammarPerDay} mẫu/ngày học
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-semibold">
                      Ước lượng mỗi ngày
                    </div>
                    <div className="text-xl font-black text-amber-300 font-mono mt-0.5">
                      ~{studyPlan.estimatedMinutesPerDay} phút
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {studyPlan.studyDaysPerWeek} ngày/tuần · {studyPlan.activeStudyDays} ngày học mới
                    </div>
                  </div>
                </div>
              </div>

              {/* Week Navigator + Filter Bar */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
                    {planAnalytics.weeks.map((wk) => {
                      const isSel = currentWeek?.weekIndex === wk.weekIndex
                      return (
                        <button
                          key={wk.weekIndex}
                          type="button"
                          onClick={() => setSelectedWeekIdx(wk.weekIndex)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                            isSel
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                              : wk.containsToday
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
                              : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800'
                          }`}
                        >
                          <span>Tuần {wk.weekIndex + 1}</span>
                          {wk.containsToday && !isSel && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          )}
                          {wk.isCompleted && (
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${
                                isSel ? 'text-slate-950' : 'text-emerald-400'
                              }`}
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Filter days inside week */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0 self-end sm:self-center">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'pending', label: 'Chưa xong' },
                      { id: 'done', label: 'Đã xong' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setPlanDayFilter(f.id as 'all' | 'pending' | 'done')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                          planDayFilter === f.id
                            ? 'bg-slate-800 text-emerald-400'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days inside Selected Week */}
                <div className="space-y-3">
                  {currentWeek?.days
                    .filter((day) => {
                      if (planDayFilter === 'all') return true
                      const totalDay =
                        day.shadowingLessonIds.length + day.grammarPatternIds.length
                      if (totalDay === 0) return planDayFilter !== 'done'
                      const doneDay =
                        day.shadowingLessonIds.filter(isPlanShadowingDone).length +
                        day.grammarPatternIds.filter(isPlanGrammarDone).length
                      const dayComplete = doneDay >= totalDay
                      return planDayFilter === 'done' ? dayComplete : !dayComplete
                    })
                    .map((day) => {
                      const isToday = day.date === todayStr
                      const totalDayItems =
                        day.shadowingLessonIds.length + day.grammarPatternIds.length
                      const doneDayItems =
                        day.shadowingLessonIds.filter(isPlanShadowingDone).length +
                        day.grammarPatternIds.filter(isPlanGrammarDone).length
                      const isDayCompleted = totalDayItems > 0 && doneDayItems >= totalDayItems

                      return (
                        <div
                          key={day.date}
                          className={`p-4 rounded-2xl border transition-all space-y-3 ${
                            isToday
                              ? 'bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500/30'
                              : isDayCompleted
                              ? 'bg-slate-950/40 border-emerald-500/30'
                              : 'bg-slate-950/60 border-slate-800'
                          }`}
                        >
                          {/* Day Header */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-lg font-mono ${
                                  isToday
                                    ? 'bg-emerald-500 text-slate-950'
                                    : 'bg-slate-800 text-slate-200'
                                }`}
                              >
                                Ngày {day.dayIndex}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-white">
                                {formatDisplayDate(day.date)}
                              </span>
                              {isToday && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  Hôm nay
                                </span>
                              )}
                              {day.isReviewDay && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                  <RotateCcw className="w-3 h-3" /> Ngày ôn tập
                                </span>
                              )}
                              {day.isRestDay && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                                  <Coffee className="w-3 h-3 text-amber-400" /> Ngày nghỉ
                                </span>
                              )}
                              {isDayCompleted && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                              {totalDayItems > 0 && (
                                <span className="text-emerald-400 font-bold">
                                  {doneDayItems}/{totalDayItems} mục
                                </span>
                              )}
                              {day.estimatedMinutes > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                                  ~{day.estimatedMinutes}p
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Day Tasks */}
                          {day.isRestDay ? (
                            <p className="text-xs text-slate-400">
                              Nghỉ ngơi thư giãn để củng cố trí nhớ, chuẩn bị cho tuần học tiếp theo.
                            </p>
                          ) : day.isReviewDay ? (
                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                              <span className="text-slate-200">
                                Ôn lại các bài Shadowing khó, nghe lại bản ghi của mình và luyện nói trôi chảy các mẫu Ngữ pháp tuần vừa qua.
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                {onOpenLesson && (
                                  <button
                                    type="button"
                                    onClick={() => onOpenLesson()}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[11px] cursor-pointer"
                                  >
                                    Mở Shadowing
                                  </button>
                                )}
                                {onOpenGrammar && (
                                  <button
                                    type="button"
                                    onClick={() => onOpenGrammar()}
                                    className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] cursor-pointer"
                                  >
                                    Mở Ngữ pháp
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : totalDayItems === 0 ? (
                            <p className="text-xs text-slate-400 italic">
                              Ngày đệm linh hoạt — bạn có thể ôn lại bài cũ hoặc nghỉ ngơi.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {/* Shadowing lessons for this day */}
                              {day.shadowingLessonIds.map((lId) => {
                                const lesson = lessonByIdMap.get(lId)
                                if (!lesson) return null
                                const done = isPlanShadowingDone(lId)
                                const prog = lessonProgressMap[lId]
                                return (
                                  <div
                                    key={`day-${day.dayIndex}-sh-${lId}`}
                                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-colors ${
                                      done
                                        ? 'bg-emerald-500/10 border-emerald-500/30'
                                        : 'bg-slate-900/90 border-slate-800'
                                    }`}
                                  >
                                    <div className="flex items-start gap-2.5 min-w-0">
                                      <button
                                        type="button"
                                        onClick={() => handleTogglePlanItem('shadowing', lId)}
                                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                          done
                                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                            : 'bg-slate-950 border-slate-700 hover:border-emerald-400'
                                        }`}
                                        title="Đánh dấu hoàn thành"
                                      >
                                        {done && <Check className="w-3.5 h-3.5" />}
                                      </button>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400">
                                            Shadowing · {lesson.level}
                                          </span>
                                          <span className="text-[10px] text-slate-400">
                                            {lesson.sentences.length} câu
                                          </span>
                                          {typeof prog?.bestScore === 'number' && (
                                            <span className="text-[10px] font-mono font-bold text-amber-300">
                                              🏆 {prog.bestScore}đ
                                            </span>
                                          )}
                                        </div>
                                        <div
                                          className={`text-xs font-bold mt-1 line-clamp-1 ${
                                            done ? 'line-through text-slate-500' : 'text-white'
                                          }`}
                                        >
                                          {lesson.title}
                                        </div>
                                      </div>
                                    </div>

                                    {onOpenLesson && (
                                      <button
                                        type="button"
                                        onClick={() => onOpenLesson(lId)}
                                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-extrabold shrink-0 transition-colors cursor-pointer"
                                      >
                                        {done ? 'Ôn lại' : 'Luyện →'}
                                      </button>
                                    )}
                                  </div>
                                )
                              })}

                              {/* Grammar patterns for this day */}
                              {day.grammarPatternIds.map((gId) => {
                                const pattern = patternByIdMap.get(gId)
                                if (!pattern) return null
                                const done = isPlanGrammarDone(gId)
                                return (
                                  <div
                                    key={`day-${day.dayIndex}-gr-${gId}`}
                                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-colors ${
                                      done
                                        ? 'bg-emerald-500/10 border-emerald-500/30'
                                        : 'bg-slate-900/90 border-slate-800'
                                    }`}
                                  >
                                    <div className="flex items-start gap-2.5 min-w-0">
                                      <button
                                        type="button"
                                        onClick={() => handleTogglePlanItem('grammar', gId)}
                                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                          done
                                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                            : 'bg-slate-950 border-slate-700 hover:border-indigo-400'
                                        }`}
                                        title="Đánh dấu hoàn thành"
                                      >
                                        {done && <Check className="w-3.5 h-3.5" />}
                                      </button>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                                            Ngữ pháp · {pattern.level}
                                          </span>
                                          <span className="text-[10px] text-slate-400">
                                            {pattern.examples.length} ví dụ
                                          </span>
                                        </div>
                                        <div
                                          className={`text-xs font-bold mt-1 truncate ${
                                            done ? 'line-through text-slate-500' : 'text-white'
                                          }`}
                                        >
                                          {pattern.pattern}
                                        </div>
                                        <div className="text-[10px] text-slate-400 truncate">
                                          {pattern.meaning}
                                        </div>
                                      </div>
                                    </div>

                                    {onOpenGrammar && (
                                      <button
                                        type="button"
                                        onClick={() => onOpenGrammar(gId)}
                                        className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                                      >
                                        {done ? 'Ôn lại' : 'Học →'}
                                      </button>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ==================================================================== */}
      {/* MODAL: AUTO STUDY PLAN GENERATOR                                     */}
      {/* ==================================================================== */}
      <StudyPlanGeneratorModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        currentLang={currentLang}
        existingPlan={studyPlan}
        allLessons={allLangLessons}
        allPatterns={allLangPatterns}
        lessonProgressMap={lessonProgressMap}
        grammarScores={grammarScores}
        onPlanCreated={handlePlanCreated}
      />

      {/* ==================================================================== */}
      {/* MODAL: EDIT DAILY GOAL                                               */}
      {/* ==================================================================== */}
      {showGoalModal && (
        <div
          onClick={() => setShowGoalModal(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Thiết lập mục tiêu hàng ngày</h3>
                  <p className="text-xs text-slate-400">
                    Tùy chỉnh thời lượng và số bài phù hợp nhịp sinh hoạt
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preset Cards */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Chọn nhanh mức độ:</div>
              <div className="grid grid-cols-3 gap-2">
                {GOAL_PRESETS.map((preset) => {
                  const isActive =
                    draftMinutes === preset.minutes && draftLessons === preset.lessons
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setDraftMinutes(preset.minutes)
                        setDraftLessons(preset.lessons)
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500/40'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{preset.label}</div>
                      <div className="text-[11px] font-mono font-bold text-emerald-400 mt-0.5">
                        {preset.minutes}p · {preset.lessons} bài
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {preset.desc}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Số phút mỗi ngày (5–180)
                </label>
                <input
                  type="number"
                  min={5}
                  max={180}
                  value={draftMinutes}
                  onChange={(e) => setDraftMinutes(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Số lượt / bài (1–30)
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={draftLessons}
                  onChange={(e) => setDraftLessons(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveGoal}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
              >
                Lưu mục tiêu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
