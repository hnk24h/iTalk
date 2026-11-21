import React, { useEffect, useMemo, useState } from 'react'
import {
  GrammarPattern,
  Language,
  Lesson,
  LessonProgress,
  ScoreResult,
  StudyPlan,
  StudyPlanConfig,
} from '../types'
import { supportedLanguages } from '../data/languages'
import {
  generateStudyPlan,
  getAvailablePlanLevels,
  previewStudyPlanMetrics,
} from '../services/studyPlan'
import {
  Sparkles,
  Calendar,
  BookOpen,
  Mic,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  Compass,
  RotateCcw,
} from 'lucide-react'

interface StudyPlanGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  currentLang: Language
  existingPlan: StudyPlan | null
  allLessons: Lesson[]
  allPatterns: GrammarPattern[]
  lessonProgressMap: Record<string, LessonProgress>
  grammarScores: Record<string, ScoreResult>
  onPlanCreated: (plan: StudyPlan, syncDailyGoal: boolean) => void
}

const DAY_PRESETS = [
  { days: 14, label: '14 ngày', sub: '2 tuần' },
  { days: 30, label: '30 ngày', sub: '1 tháng' },
  { days: 60, label: '60 ngày', sub: '2 tháng' },
  { days: 90, label: '90 ngày', sub: '3 tháng' },
  { days: 180, label: '180 ngày', sub: '6 tháng' },
]

function formatShortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${d}/${m}/${y}`
}

export const StudyPlanGeneratorModal: React.FC<StudyPlanGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  existingPlan,
  allLessons,
  allPatterns,
  lessonProgressMap,
  grammarScores,
  onPlanCreated,
}) => {
  const todayStr = new Date().toISOString().split('T')[0]
  const langMeta =
    supportedLanguages.find((l) => l.code === currentLang) || supportedLanguages[0]
  const availableLevels = useMemo(() => getAvailablePlanLevels(currentLang), [currentLang])

  const [totalDays, setTotalDays] = useState<number>(90)
  const [startDate, setStartDate] = useState<string>(todayStr)
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState<number>(6)
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['all'])
  const [includeShadowing, setIncludeShadowing] = useState<boolean>(true)
  const [includeGrammar, setIncludeGrammar] = useState<boolean>(true)
  const [includeReviewDays, setIncludeReviewDays] = useState<boolean>(true)
  const [skipCompleted, setSkipCompleted] = useState<boolean>(true)
  const [syncDailyGoal, setSyncDailyGoal] = useState<boolean>(true)

  // Reset form defaults when modal opens or language changes
  useEffect(() => {
    if (!isOpen) return
    if (existingPlan && existingPlan.language === currentLang) {
      setTotalDays(existingPlan.totalDays || 90)
      setStartDate(todayStr)
      setStudyDaysPerWeek(existingPlan.studyDaysPerWeek || 6)
      setSelectedLevels(
        existingPlan.selectedLevels?.length ? existingPlan.selectedLevels : ['all']
      )
      setIncludeShadowing(existingPlan.includeShadowing)
      setIncludeGrammar(existingPlan.includeGrammar)
      setIncludeReviewDays(existingPlan.includeReviewDays)
      setSkipCompleted(existingPlan.skipCompleted)
    } else {
      setTotalDays(90)
      setStartDate(todayStr)
      setStudyDaysPerWeek(6)
      setSelectedLevels(['all'])
      setIncludeShadowing(true)
      setIncludeGrammar(true)
      setIncludeReviewDays(true)
      setSkipCompleted(true)
    }
    setSyncDailyGoal(true)
  }, [isOpen, currentLang, existingPlan?.id])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Level counts for display inside pills
  const levelCounts = useMemo(() => {
    const map: Record<string, { shadowing: number; grammar: number }> = {}
    availableLevels.forEach((lvl) => {
      const sCount = allLessons.filter((l) => l.level && l.level.startsWith(lvl)).length
      const gCount = allPatterns.filter((p) => p.level === lvl).length
      map[lvl] = { shadowing: sCount, grammar: gCount }
    })
    return map
  }, [availableLevels, allLessons, allPatterns])

  const config: StudyPlanConfig = useMemo(
    () => ({
      language: currentLang,
      startDate: startDate || todayStr,
      totalDays: Math.min(365, Math.max(7, Math.round(totalDays || 30))),
      studyDaysPerWeek,
      selectedLevels,
      includeShadowing,
      includeGrammar,
      includeReviewDays,
      skipCompleted,
      syncDailyGoal,
    }),
    [
      currentLang,
      startDate,
      todayStr,
      totalDays,
      studyDaysPerWeek,
      selectedLevels,
      includeShadowing,
      includeGrammar,
      includeReviewDays,
      skipCompleted,
      syncDailyGoal,
    ]
  )

  const preview = useMemo(
    () =>
      previewStudyPlanMetrics(
        config,
        allLessons,
        allPatterns,
        lessonProgressMap,
        grammarScores
      ),
    [config, allLessons, allPatterns, lessonProgressMap, grammarScores]
  )

  if (!isOpen) return null

  const toggleLevel = (lvl: string) => {
    if (lvl === 'all') {
      setSelectedLevels(['all'])
      return
    }
    setSelectedLevels((prev) => {
      const withoutAll = prev.filter((item) => item !== 'all')
      if (withoutAll.includes(lvl)) {
        const next = withoutAll.filter((item) => item !== lvl)
        return next.length === 0 ? ['all'] : next
      }
      const next = [...withoutAll, lvl]
      return next.length >= availableLevels.length ? ['all'] : next
    })
  }

  const handleToggleIncludeShadowing = () => {
    if (includeShadowing && !includeGrammar) return
    setIncludeShadowing(!includeShadowing)
  }

  const handleToggleIncludeGrammar = () => {
    if (includeGrammar && !includeShadowing) return
    setIncludeGrammar(!includeGrammar)
  }

  const handleCreate = () => {
    if (preview.totalShadowingCount + preview.totalGrammarCount === 0) return
    const plan = generateStudyPlan(
      config,
      allLessons,
      allPatterns,
      lessonProgressMap,
      grammarScores
    )
    onPlanCreated(plan, syncDailyGoal)
    onClose()
  }

  const intensityBadgeClass =
    preview.intensityLabel === 'Nhẹ nhàng'
      ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
      : preview.intensityLabel === 'Vừa sức'
      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      : preview.intensityLabel === 'Tập trung cao'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'

  const hasContent = preview.totalShadowingCount + preview.totalGrammarCount > 0

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto space-y-5"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Tự động tạo kế hoạch học tập
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {langMeta.flag} {langMeta.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhập tổng số ngày muốn học — hệ thống tự chia đều bài Shadowing &amp; Ngữ pháp mỗi ngày
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Duration & Start Date */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>1. Thời gian hoàn thành mục tiêu</span>
          </div>

          {/* Preset Duration Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {DAY_PRESETS.map((preset) => {
              const isSelected = totalDays === preset.days
              return (
                <button
                  key={preset.days}
                  type="button"
                  onClick={() => setTotalDays(preset.days)}
                  className={`p-2 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500/40 shadow-sm'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-800'
                  }`}
                >
                  <div
                    className={`text-xs font-extrabold font-mono ${
                      isSelected ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {preset.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{preset.sub}</div>
                </button>
              )
            })}
          </div>

          {/* Custom Days + Start Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Số ngày muốn học (7 – 365 ngày)
              </label>
              <input
                type="number"
                min={7}
                max={365}
                value={totalDays}
                onChange={(e) => setTotalDays(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Levels, Content & Rhythm */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>2. Phạm vi bài học &amp; Nhịp luyện tập</span>
          </div>

          {/* Levels Multi-Select */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-slate-300">Cấp độ muốn đưa vào Plan:</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => toggleLevel('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedLevels.includes('all')
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800'
                }`}
              >
                Tất cả ({allLessons.length} bài · {allPatterns.length} mẫu)
              </button>

              {availableLevels.map((lvl) => {
                const isSelected = !selectedLevels.includes('all') && selectedLevels.includes(lvl)
                const cnt = levelCounts[lvl] || { shadowing: 0, grammar: 0 }
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => toggleLevel(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-slate-800'
                    }`}
                    title={`${cnt.shadowing} bài Shadowing · ${cnt.grammar} mẫu Ngữ pháp`}
                  >
                    <span>{lvl}</span>
                    <span className="ml-1 text-[10px] font-mono opacity-75">
                      ({cnt.shadowing}+{cnt.grammar})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Type + Days Per Week */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Include Shadowing / Grammar */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-300">Nội dung kết hợp:</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleToggleIncludeShadowing}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    includeShadowing
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Mic className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Shadowing</div>
                    <div className="text-[10px] opacity-80">Nhại giọng</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleToggleIncludeGrammar}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    includeGrammar
                      ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Ngữ pháp</div>
                    <div className="text-[10px] opacity-80">Mẫu câu nói</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Study Days Per Week */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-300">Số ngày học mỗi tuần:</div>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                {[
                  { val: 5, label: '5 ngày', sub: 'T2–T6' },
                  { val: 6, label: '6 ngày', sub: 'Nghỉ CN' },
                  { val: 7, label: '7 ngày', sub: 'Cả tuần' },
                ].map((opt) => {
                  const isSel = studyDaysPerWeek === opt.val
                  return (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setStudyDaysPerWeek(opt.val)}
                      className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center ${
                        isSel
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{opt.label}</div>
                      <div className="text-[9px] opacity-80">{opt.sub}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Extra Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={skipCompleted}
                onChange={(e) => setSkipCompleted(e.target.checked)}
                className="accent-emerald-500 w-4 h-4 rounded"
              />
              <span className="text-slate-300 font-medium">Bỏ qua bài đã xong</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeReviewDays}
                onChange={(e) => setIncludeReviewDays(e.target.checked)}
                className="accent-emerald-500 w-4 h-4 rounded"
              />
              <span className="text-slate-300 font-medium flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-indigo-400" />
                Ngày ôn cuối tuần
              </span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={syncDailyGoal}
                onChange={(e) => setSyncDailyGoal(e.target.checked)}
                className="accent-emerald-500 w-4 h-4 rounded"
              />
              <span className="text-slate-300 font-medium">Đồng bộ mục tiêu ngày</span>
            </label>
          </div>
        </div>

        {/* Live Calculation Preview Box */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tính toán tự động mỗi ngày học</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${intensityBadgeClass}`}
            >
              Cường độ: {preview.intensityLabel}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold">Shadowing / ngày</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono mt-0.5">
                {preview.avgShadowingPerDay}
                <span className="text-[11px] font-bold text-slate-400 ml-1">bài</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold">Ngữ pháp / ngày</div>
              <div className="text-lg sm:text-xl font-black text-indigo-300 font-mono mt-0.5">
                {preview.avgGrammarPerDay}
                <span className="text-[11px] font-bold text-slate-400 ml-1">mẫu</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold">Thời lượng / ngày</div>
              <div className="text-lg sm:text-xl font-black text-amber-300 font-mono mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>~{preview.estimatedMinutesPerDay}p</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300 pt-1">
            <span>
              Tổng: <strong className="font-mono text-white">{preview.totalShadowingCount}</strong> bài Shadowing ·{' '}
              <strong className="font-mono text-white">{preview.totalGrammarCount}</strong> mẫu Ngữ pháp
            </span>
            <span className="font-mono text-slate-400">
              {preview.activeStudyDays} ngày học mới
              {preview.reviewDaysCount > 0 ? ` · ${preview.reviewDaysCount} ôn tập` : ''} (
              {formatShortDate(config.startDate)} → {formatShortDate(preview.endDate)})
            </span>
          </div>

          {!hasContent && (
            <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                Không có bài học nào còn lại trong phạm vi đã chọn. Hãy bỏ chọn &ldquo;Bỏ qua bài đã xong&rdquo; hoặc chọn thêm cấp độ khác.
              </span>
            </div>
          )}

          {hasContent && preview.intensityLabel === 'Rất nặng' && (
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Khối lượng mỗi ngày khá lớn (~{preview.estimatedMinutesPerDay} phút/ngày). Bạn có thể tăng số ngày lên (VD: 120–180 ngày) hoặc chọn từng cấp độ cụ thể để học nhẹ nhàng hơn.
              </span>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={!hasContent}
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:opacity-95 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo kế hoạch ngay</span>
          </button>
        </div>
      </div>
    </div>
  )
}
