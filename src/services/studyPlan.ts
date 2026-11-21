import {
  GrammarPattern,
  GrammarQuizRecord,
  Language,
  Lesson,
  LessonProgress,
  ScoreResult,
  StudyPlan,
  StudyPlanConfig,
  StudyPlanDayItem,
} from '../types'
import { japaneseGrammar } from '../data/grammar-ja'
import { chineseGrammar } from '../data/grammar-zh'
import { vietnameseGrammar } from '../data/grammar-vi'
import { GRAMMAR_SPEAKING_PASS_SCORE, loadGrammarQuizResults } from './grammarQuiz'

const STUDY_PLANS_KEY = 'italk_study_plans_v1'
const GRAMMAR_SCORES_KEY = 'italk_grammar_scores_v1'

const LANG_LABEL: Record<Language, string> = {
  ja: 'Tiếng Nhật',
  zh: 'Tiếng Trung',
  vi: 'Tiếng Việt',
}

export function getGrammarPatternsByLanguage(lang: Language): GrammarPattern[] {
  if (lang === 'ja') return japaneseGrammar
  if (lang === 'zh') return chineseGrammar
  return vietnameseGrammar
}

export function getAvailablePlanLevels(lang: Language): string[] {
  if (lang === 'ja') return ['Kana', 'N5', 'N4', 'N3', 'N2', 'N1']
  if (lang === 'zh') return ['Pinyin', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6']
  return ['Chữ cái', 'Cơ bản', 'Nâng cao']
}

export function loadGrammarScores(): Record<string, ScoreResult> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(GRAMMAR_SCORES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

let cachedPatternById: Map<string, GrammarPattern> | null = null

function getGrammarPatternById(patternId: string): GrammarPattern | undefined {
  if (!cachedPatternById) {
    cachedPatternById = new Map<string, GrammarPattern>()
    for (const p of [...japaneseGrammar, ...chineseGrammar, ...vietnameseGrammar]) {
      cachedPatternById.set(p.id, p)
    }
  }
  return cachedPatternById.get(patternId)
}

export function isGrammarPatternPracticed(
  patternId: string,
  scoresMap: Record<string, ScoreResult>,
  quizMap?: Record<string, GrammarQuizRecord>
): boolean {
  const effectiveQuizMap = quizMap || loadGrammarQuizResults()
  if (effectiveQuizMap[patternId]?.passed) return true

  const pattern = getGrammarPatternById(patternId)
  if (pattern && pattern.examples.length > 0) {
    return pattern.examples.every((_, idx) => {
      const sc = scoresMap[`ex-${patternId}-${idx}`]
      return Boolean(sc && sc.overallScore >= GRAMMAR_SPEAKING_PASS_SCORE)
    })
  }

  const prefix = `ex-${patternId}-`
  return Object.entries(scoresMap).some(
    ([k, v]) => k.startsWith(prefix) && v.overallScore >= GRAMMAR_SPEAKING_PASS_SCORE
  )
}

export function loadAllStudyPlans(): Partial<Record<Language, StudyPlan>> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STUDY_PLANS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function loadStudyPlan(lang: Language): StudyPlan | null {
  const all = loadAllStudyPlans()
  return all[lang] || null
}

export function getTodayDateStr(): string {
  return new Date().toISOString().split('T')[0]
}

export function getTodayStudyPlanDay(plan: StudyPlan | null): StudyPlanDayItem | null {
  if (!plan || !plan.days.length) return null
  const todayStr = getTodayDateStr()
  return plan.days.find((d) => d.date === todayStr) || null
}

export function saveStudyPlan(plan: StudyPlan): StudyPlan {
  const all = loadAllStudyPlans()
  all[plan.language] = plan
  try {
    localStorage.setItem(STUDY_PLANS_KEY, JSON.stringify(all))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('italk:study-plan-updated', { detail: plan }))
    }
  } catch {}
  return plan
}

export function deleteStudyPlan(lang: Language): void {
  const all = loadAllStudyPlans()
  delete all[lang]
  try {
    localStorage.setItem(STUDY_PLANS_KEY, JSON.stringify(all))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('italk:study-plan-updated', { detail: null }))
    }
  } catch {}
}

export function togglePlanItemCompletion(
  lang: Language,
  kind: 'shadowing' | 'grammar',
  itemId: string
): StudyPlan | null {
  const plan = loadStudyPlan(lang)
  if (!plan) return null

  const list =
    kind === 'shadowing'
      ? [...(plan.completedShadowingIds || [])]
      : [...(plan.completedGrammarIds || [])]

  const idx = list.indexOf(itemId)
  if (idx >= 0) {
    list.splice(idx, 1)
  } else {
    list.push(itemId)
  }

  const updated: StudyPlan = {
    ...plan,
    completedShadowingIds: kind === 'shadowing' ? list : plan.completedShadowingIds || [],
    completedGrammarIds: kind === 'grammar' ? list : plan.completedGrammarIds || [],
  }
  return saveStudyPlan(updated)
}

function parseUtcDateStr(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y || 2026, (m || 1) - 1, d || 1))
}

function levelOrderIndex(lang: Language, level: string): number {
  const order = getAvailablePlanLevels(lang)
  const idx = order.findIndex((lvl) => level === lvl || level.startsWith(lvl))
  return idx >= 0 ? idx : order.length + 1
}

export function filterLessonsForPlan(
  lang: Language,
  lessons: Lesson[],
  selectedLevels: string[],
  skipCompleted: boolean,
  lessonProgressMap: Record<string, LessonProgress>
): Lesson[] {
  const useAll = selectedLevels.length === 0 || selectedLevels.includes('all')
  const filtered = lessons.filter((l) => {
    if (!useAll) {
      const matchesLevel = selectedLevels.some(
        (lvl) => l.level === lvl || (l.level && l.level.startsWith(lvl))
      )
      if (!matchesLevel) return false
    }
    if (skipCompleted) {
      const p = lessonProgressMap[l.id]
      if (p && (p.isCompleted || (p.progressPercent ?? 0) >= 100)) return false
    }
    return true
  })

  return filtered.sort((a, b) => levelOrderIndex(lang, a.level) - levelOrderIndex(lang, b.level))
}

export function filterGrammarForPlan(
  lang: Language,
  patterns: GrammarPattern[],
  selectedLevels: string[],
  skipCompleted: boolean,
  grammarScores: Record<string, ScoreResult>
): GrammarPattern[] {
  const useAll = selectedLevels.length === 0 || selectedLevels.includes('all')
  const filtered = patterns.filter((p) => {
    if (!useAll && !selectedLevels.includes(p.level)) {
      return false
    }
    if (skipCompleted && isGrammarPatternPracticed(p.id, grammarScores)) {
      return false
    }
    return true
  })

  return filtered.sort((a, b) => levelOrderIndex(lang, a.level) - levelOrderIndex(lang, b.level))
}

interface DaySlot {
  dayIndex: number
  date: string
  isRestDay: boolean
  isReviewDay: boolean
}

export function buildDaySlots(
  startDate: string,
  totalDaysInput: number,
  studyDaysPerWeek: number,
  includeReviewDays: boolean
): DaySlot[] {
  const totalDays = Math.min(365, Math.max(1, Math.round(totalDaysInput || 30)))
  const startUtcMs = parseUtcDateStr(startDate).getTime()
  const slots: DaySlot[] = []

  for (let i = 0; i < totalDays; i++) {
    const dt = new Date(startUtcMs + i * 86400000)
    const date = dt.toISOString().split('T')[0]
    const weekday = (dt.getUTCDay() + 6) % 7 // 0 = Mon .. 6 = Sun
    let isRestDay = false
    if (studyDaysPerWeek === 6 && weekday === 6) {
      isRestDay = true
    } else if (studyDaysPerWeek <= 5 && weekday >= 5) {
      isRestDay = true
    }
    slots.push({
      dayIndex: i + 1,
      date,
      isRestDay,
      isReviewDay: false,
    })
  }

  // Ensure at least one learning day even for ultra-short plans on weekends
  const nonRestIndices = slots
    .map((s, idx) => (!s.isRestDay ? idx : -1))
    .filter((idx) => idx >= 0)

  if (nonRestIndices.length === 0 && slots.length > 0) {
    slots[0].isRestDay = false
    nonRestIndices.push(0)
  }

  // Mark weekly review days (every 7th active day when enough active days exist)
  if (includeReviewDays && nonRestIndices.length >= 14) {
    let activeCounter = 0
    for (const idx of nonRestIndices) {
      activeCounter += 1
      if (activeCounter % 7 === 0) {
        slots[idx].isReviewDay = true
      }
    }
  }

  return slots
}

export interface StudyPlanPreviewMetrics {
  totalDays: number
  activeStudyDays: number
  reviewDaysCount: number
  restDaysCount: number
  totalShadowingCount: number
  totalGrammarCount: number
  avgShadowingPerDay: number
  avgGrammarPerDay: number
  estimatedMinutesPerDay: number
  intensityLabel: 'Nhẹ nhàng' | 'Vừa sức' | 'Tập trung cao' | 'Rất nặng'
  endDate: string
  slots: DaySlot[]
  filteredLessons: Lesson[]
  filteredPatterns: GrammarPattern[]
}

export function previewStudyPlanMetrics(
  config: StudyPlanConfig,
  lessons: Lesson[],
  patterns: GrammarPattern[],
  lessonProgressMap: Record<string, LessonProgress>,
  grammarScores: Record<string, ScoreResult>
): StudyPlanPreviewMetrics {
  const slots = buildDaySlots(
    config.startDate,
    config.totalDays,
    config.studyDaysPerWeek,
    config.includeReviewDays
  )
  const filteredLessons = config.includeShadowing
    ? filterLessonsForPlan(
        config.language,
        lessons,
        config.selectedLevels,
        config.skipCompleted,
        lessonProgressMap
      )
    : []
  const filteredPatterns = config.includeGrammar
    ? filterGrammarForPlan(
        config.language,
        patterns,
        config.selectedLevels,
        config.skipCompleted,
        grammarScores
      )
    : []

  const learningDays = slots.filter((s) => !s.isRestDay && !s.isReviewDay)
  const activeStudyDays = Math.max(1, learningDays.length)
  const reviewDaysCount = slots.filter((s) => s.isReviewDay).length
  const restDaysCount = slots.filter((s) => s.isRestDay).length

  const totalShadowingCount = filteredLessons.length
  const totalGrammarCount = filteredPatterns.length

  const avgShadowingPerDay = Number((totalShadowingCount / activeStudyDays).toFixed(1))
  const avgGrammarPerDay = Number((totalGrammarCount / activeStudyDays).toFixed(1))
  const rawMinutes = Math.round(avgShadowingPerDay * 7 + avgGrammarPerDay * 3.5)
  const estimatedMinutesPerDay =
    totalShadowingCount + totalGrammarCount > 0 ? Math.max(10, rawMinutes) : 0

  let intensityLabel: StudyPlanPreviewMetrics['intensityLabel'] = 'Nhẹ nhàng'
  if (estimatedMinutesPerDay > 75) intensityLabel = 'Rất nặng'
  else if (estimatedMinutesPerDay > 45) intensityLabel = 'Tập trung cao'
  else if (estimatedMinutesPerDay > 20) intensityLabel = 'Vừa sức'

  const endDate = slots.length > 0 ? slots[slots.length - 1].date : config.startDate

  return {
    totalDays: slots.length,
    activeStudyDays: learningDays.length,
    reviewDaysCount,
    restDaysCount,
    totalShadowingCount,
    totalGrammarCount,
    avgShadowingPerDay,
    avgGrammarPerDay,
    estimatedMinutesPerDay,
    intensityLabel,
    endDate,
    slots,
    filteredLessons,
    filteredPatterns,
  }
}

export function generateStudyPlan(
  config: StudyPlanConfig,
  lessons: Lesson[],
  patterns: GrammarPattern[],
  lessonProgressMap: Record<string, LessonProgress>,
  grammarScores: Record<string, ScoreResult>
): StudyPlan {
  const metrics = previewStudyPlanMetrics(
    config,
    lessons,
    patterns,
    lessonProgressMap,
    grammarScores
  )

  const learningIndices = metrics.slots
    .map((s, idx) => (!s.isRestDay && !s.isReviewDay ? idx : -1))
    .filter((idx) => idx >= 0)

  const D = Math.max(1, learningIndices.length)
  const totalS = metrics.filteredLessons.length
  const totalG = metrics.filteredPatterns.length

  const dayItems: StudyPlanDayItem[] = metrics.slots.map((slot) => ({
    dayIndex: slot.dayIndex,
    date: slot.date,
    shadowingLessonIds: [],
    grammarPatternIds: [],
    isRestDay: slot.isRestDay,
    isReviewDay: slot.isReviewDay,
    estimatedMinutes: slot.isRestDay
      ? 0
      : slot.isReviewDay
      ? Math.max(10, Math.round(metrics.estimatedMinutesPerDay * 0.8))
      : 0,
  }))

  learningIndices.forEach((slotIdx, k) => {
    const sStart = Math.floor((k * totalS) / D)
    const sEnd = Math.floor(((k + 1) * totalS) / D)
    const gStart = Math.floor((k * totalG) / D)
    const gEnd = Math.floor(((k + 1) * totalG) / D)

    const sIds = metrics.filteredLessons.slice(sStart, sEnd).map((l) => l.id)
    const gIds = metrics.filteredPatterns.slice(gStart, gEnd).map((p) => p.id)

    dayItems[slotIdx].shadowingLessonIds = sIds
    dayItems[slotIdx].grammarPatternIds = gIds
    dayItems[slotIdx].estimatedMinutes =
      sIds.length + gIds.length > 0
        ? Math.max(5, Math.round(sIds.length * 7 + gIds.length * 3.5))
        : 0
  })

  const levelSummary =
    config.selectedLevels.length === 0 || config.selectedLevels.includes('all')
      ? 'Tất cả cấp độ'
      : config.selectedLevels.join(', ')

  return {
    id: `plan-${config.language}-${Date.now()}`,
    language: config.language,
    title: `Lộ trình ${LANG_LABEL[config.language]} (${levelSummary}) • ${metrics.totalDays} ngày`,
    startDate: config.startDate,
    endDate: metrics.endDate,
    totalDays: metrics.totalDays,
    activeStudyDays: metrics.activeStudyDays,
    studyDaysPerWeek: config.studyDaysPerWeek,
    selectedLevels: config.selectedLevels.length > 0 ? config.selectedLevels : ['all'],
    includeShadowing: config.includeShadowing,
    includeGrammar: config.includeGrammar,
    includeReviewDays: config.includeReviewDays,
    skipCompleted: config.skipCompleted,
    totalShadowingCount: totalS,
    totalGrammarCount: totalG,
    avgShadowingPerDay: metrics.avgShadowingPerDay,
    avgGrammarPerDay: metrics.avgGrammarPerDay,
    estimatedMinutesPerDay: metrics.estimatedMinutesPerDay,
    days: dayItems,
    completedShadowingIds: [],
    completedGrammarIds: [],
    createdAt: new Date().toISOString(),
  }
}
