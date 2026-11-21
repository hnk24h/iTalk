import React, { useEffect, useMemo, useState } from 'react'
import { CmsGrammarPattern, GrammarExample, Language } from '../../types'
import { supportedLanguages } from '../../data/languages'
import {
  adminDeleteGrammarPattern,
  adminFetchAllGrammarPatterns,
  adminRestoreGrammarPattern,
  adminSyncBuiltinGrammarToDb,
  adminToggleGrammarPublished,
  adminUpsertGrammarPattern,
} from '../../services/cms'
import { FuriganaText } from '../../services/furigana'
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Database,
  Edit3,
  Eye,
  EyeOff,
  GraduationCap,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Trash2,
} from 'lucide-react'

interface AdminGrammarManagerProps {
  onDataChanged?: () => void
  autoCreateToken?: number
}

const PAGE_SIZE = 25

const GRAMMAR_LEVELS_BY_LANG: Record<Language, string[]> = {
  ja: ['N5', 'N4', 'N3', 'N2', 'N1'],
  zh: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'],
  vi: ['Cơ bản', 'Nâng cao'],
}

function slugifyGrammarId(pattern: string, lang: Language): string {
  const base = pattern
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
  return `cms-g-${lang}-${base || 'pattern'}-${Date.now().toString(36).slice(-4)}`
}

function createEmptyExample(): GrammarExample {
  return {
    text: '',
    furigana: '',
    reading: '',
    translation: '',
  }
}

function createBlankPattern(lang: Language = 'ja', nextOrder = 0): CmsGrammarPattern {
  return {
    id: `cms-g-${lang}-${Date.now().toString(36)}`,
    language: lang,
    level: GRAMMAR_LEVELS_BY_LANG[lang][0],
    pattern: '',
    meaning: '',
    formula: '',
    note: '',
    examples: [createEmptyExample()],
    isPublished: true,
    sortOrder: nextOrder,
    source: 'cms',
  }
}

export const AdminGrammarManager: React.FC<AdminGrammarManagerProps> = ({
  onDataChanged,
  autoCreateToken = 0,
}) => {
  const [patterns, setPatterns] = useState<CmsGrammarPattern[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // Filters & pagination
  const [filterLang, setFilterLang] = useState<Language | 'all'>('all')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [filterSource, setFilterSource] = useState<'all' | 'builtin' | 'override' | 'cms'>('all')
  const [filterStatus, setFilterStatus] = useState<'active' | 'published' | 'draft' | 'deleted'>('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [syncProgress, setSyncProgress] = useState<{ done: number; total: number } | null>(null)

  // Editor state
  const [draft, setDraft] = useState<CmsGrammarPattern | null>(null)
  const [isEditingNew, setIsEditingNew] = useState(false)
  const [isIdManuallyEdited, setIsIdManuallyEdited] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg((prev) => (prev === msg ? null : prev)), 4000)
  }

  const fetchList = async () => {
    setIsLoading(true)
    setErrorMsg(null)
    const res = await adminFetchAllGrammarPatterns()
    if (res.error) {
      setErrorMsg(res.error)
    }
    setPatterns(res.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    if (autoCreateToken > 0) {
      openCreateNew()
    }
  }, [autoCreateToken])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterLang, filterLevel, filterSource, filterStatus, searchQuery])

  const openCreateNew = () => {
    const lang: Language = filterLang === 'all' ? 'ja' : filterLang
    setDraft(createBlankPattern(lang, patterns.length))
    setIsEditingNew(true)
    setIsIdManuallyEdited(false)
    setErrorMsg(null)
  }

  const openEditPattern = (item: CmsGrammarPattern) => {
    setDraft({
      ...item,
      examples: item.examples.length
        ? item.examples.map((ex) => ({ ...ex }))
        : [createEmptyExample()],
    })
    // Lock ID for overrides/CMS and untouched built-ins so edits cleanly override built-in ID
    setIsEditingNew(false)
    setIsIdManuallyEdited(true)
    setErrorMsg(null)
  }

  const handleDuplicate = (item: CmsGrammarPattern) => {
    setDraft({
      ...item,
      id: `cms-g-${item.language}-copy-${Date.now().toString(36).slice(-4)}`,
      pattern: `${item.pattern} (Bản sao)`,
      isPublished: false,
      isDeleted: false,
      sortOrder: patterns.length,
      source: 'cms',
      examples: item.examples.map((ex) => ({ ...ex })),
    })
    setIsEditingNew(true)
    setIsIdManuallyEdited(true)
    setErrorMsg(null)
  }

  const handleSaveDraft = async () => {
    if (!draft) return
    if (!draft.pattern.trim()) {
      setErrorMsg('Vui lòng nhập mẫu ngữ pháp.')
      return
    }
    if (!draft.meaning.trim()) {
      setErrorMsg('Vui lòng nhập ý nghĩa của mẫu ngữ pháp.')
      return
    }
    if (!draft.id.trim()) {
      setErrorMsg('ID mẫu ngữ pháp không được để trống.')
      return
    }

    const cleanExamples = draft.examples
      .map((ex) => ({
        text: ex.text.trim(),
        furigana: ex.furigana?.trim() || undefined,
        reading: ex.reading?.trim() || undefined,
        translation: ex.translation.trim(),
      }))
      .filter((ex) => ex.text.length > 0)

    if (cleanExamples.length === 0) {
      setErrorMsg('Mẫu ngữ pháp cần ít nhất 1 câu ví dụ.')
      return
    }

    setIsSaving(true)
    setErrorMsg(null)
    const res = await adminUpsertGrammarPattern({
      ...draft,
      examples: cleanExamples,
    })
    setIsSaving(false)

    if (res.error || !res.data) {
      setErrorMsg(res.error || 'Không thể lưu mẫu ngữ pháp lên Supabase.')
      return
    }

    await fetchList()
    onDataChanged?.()
    setDraft(null)
    showToast(`Đã lưu mẫu "${res.data.pattern}" và đồng bộ ra ứng dụng!`)
  }

  const handleDelete = async (item: CmsGrammarPattern) => {
    const res = await adminDeleteGrammarPattern(item)
    setConfirmDeleteId(null)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể xóa mẫu ngữ pháp.')
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(
      item.source === 'cms'
        ? `Đã xóa mẫu "${item.pattern}" khỏi CMS.`
        : `Đã ẩn/xóa mẫu "${item.pattern}" khỏi hệ thống (có thể khôi phục bất kỳ lúc nào).`
    )
  }

  const handleRestore = async (id: string, patternName: string) => {
    const res = await adminRestoreGrammarPattern(id)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể khôi phục mẫu ngữ pháp.')
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(`Đã khôi phục "${patternName}" về bản gốc hệ thống!`)
  }

  const handleTogglePublished = async (item: CmsGrammarPattern) => {
    const nextPublished = !item.isPublished
    const res = await adminToggleGrammarPublished(item, nextPublished)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể cập nhật trạng thái xuất bản.')
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(nextPublished ? 'Đã xuất bản mẫu ngữ pháp!' : 'Đã ẩn mẫu (chuyển về Nháp).')
  }

  const handleSyncBuiltinToDb = async () => {
    setErrorMsg(null)
    setSyncProgress({ done: 0, total: untouchedBuiltinCount })
    const res = await adminSyncBuiltinGrammarToDb((done, total) => {
      setSyncProgress({ done, total })
    })
    setSyncProgress(null)
    if (res.error) {
      setErrorMsg(res.error)
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(
      `Đã đồng bộ ${res.synced} mẫu ngữ pháp gốc lên Supabase CMS (bỏ qua ${res.skipped} mẫu đã tùy chỉnh/ẩn).`
    )
  }

  const updateExampleAt = (idx: number, patch: Partial<GrammarExample>) => {
    setDraft((prev) => {
      if (!prev) return prev
      const next = prev.examples.map((ex, i) => (i === idx ? { ...ex, ...patch } : ex))
      return { ...prev, examples: next }
    })
  }

  const moveExample = (idx: number, dir: -1 | 1) => {
    setDraft((prev) => {
      if (!prev) return prev
      const target = idx + dir
      if (target < 0 || target >= prev.examples.length) return prev
      const copy = [...prev.examples]
      const [item] = copy.splice(idx, 1)
      copy.splice(target, 0, item)
      return { ...prev, examples: copy }
    })
  }

  const removeExampleAt = (idx: number) => {
    setDraft((prev) => {
      if (!prev) return prev
      const next = prev.examples.filter((_, i) => i !== idx)
      return { ...prev, examples: next.length ? next : [createEmptyExample()] }
    })
  }

  const untouchedBuiltinCount = useMemo(
    () =>
      patterns.filter((p) => p.source === 'builtin' && !p.isDeleted && p.isPublished).length,
    [patterns]
  )

  const countsSummary = useMemo(() => {
    let active = 0
    let cmsNew = 0
    let overrideCount = 0
    let deleted = 0
    for (const p of patterns) {
      if (p.isDeleted) {
        deleted += 1
      } else {
        active += 1
        if (p.source === 'cms') cmsNew += 1
        else if (p.source === 'override') overrideCount += 1
      }
    }
    return { active, cmsNew, overrideCount, deleted }
  }, [patterns])

  const availableLevels = useMemo(() => {
    const set = new Set<string>()
    patterns.forEach((p) => {
      if (filterLang === 'all' || p.language === filterLang) {
        if (p.level) set.add(p.level)
      }
    })
    return Array.from(set)
  }, [patterns, filterLang])

  const filteredPatterns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return patterns.filter((p) => {
      if (filterLang !== 'all' && p.language !== filterLang) return false
      if (filterLevel !== 'all' && p.level !== filterLevel) return false
      if (filterSource !== 'all' && p.source !== filterSource) return false
      if (filterStatus === 'active' && p.isDeleted) return false
      if (filterStatus === 'published' && (p.isDeleted || !p.isPublished)) return false
      if (filterStatus === 'draft' && (p.isDeleted || p.isPublished)) return false
      if (filterStatus === 'deleted' && !p.isDeleted) return false
      if (q) {
        const hay = `${p.pattern} ${p.meaning} ${p.formula} ${p.level} ${p.id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [patterns, filterLang, filterLevel, filterSource, filterStatus, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPatterns.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedPatterns = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return filteredPatterns.slice(start, start + PAGE_SIZE)
  }, [filteredPatterns, safePage])

  const pageStartDisplay = filteredPatterns.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const pageEndDisplay = Math.min(safePage * PAGE_SIZE, filteredPatterns.length)

  // ==========================================
  // Editor View
  // ==========================================
  if (draft) {
    return (
      <div className="space-y-5">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {isEditingNew
                  ? 'Thêm Mẫu Ngữ pháp mới'
                  : draft.source === 'builtin'
                  ? `Tùy chỉnh mẫu hệ thống: ${draft.pattern || draft.id}`
                  : `Chỉnh sửa: ${draft.pattern || draft.id}`}
              </h2>
              <p className="text-[11px] text-slate-400 truncate">ID: {draft.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.isPublished}
                onChange={(e) => setDraft({ ...draft, isPublished: e.target.checked })}
                className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Xuất bản ngay</span>
            </label>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Đang lưu...' : 'Lưu mẫu ngữ pháp'}</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Grammar Metadata */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Cấu trúc &amp; Giải thích
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Mẫu ngữ pháp *
              </label>
              <input
                type="text"
                value={draft.pattern}
                onChange={(e) => {
                  const val = e.target.value
                  setDraft((prev) =>
                    prev
                      ? {
                          ...prev,
                          pattern: val,
                          id:
                            isEditingNew && !isIdManuallyEdited
                              ? slugifyGrammarId(val, prev.language)
                              : prev.id,
                        }
                      : prev
                  )
                }}
                placeholder="VD: 〜てもいい / 虽然...但是..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ý nghĩa *</label>
              <input
                type="text"
                value={draft.meaning}
                onChange={(e) => setDraft({ ...draft, meaning: e.target.value })}
                placeholder="VD: Được phép làm gì đó..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ID (duy nhất) *
              </label>
              <input
                type="text"
                value={draft.id}
                disabled={!isEditingNew}
                onChange={(e) => {
                  setIsIdManuallyEdited(true)
                  setDraft({ ...draft, id: e.target.value })
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ngôn ngữ</label>
              <select
                value={draft.language}
                onChange={(e) => {
                  const nextLang = e.target.value as Language
                  setDraft({
                    ...draft,
                    language: nextLang,
                    level: GRAMMAR_LEVELS_BY_LANG[nextLang][0],
                  })
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cấp độ</label>
              <input
                list="cms-grammar-levels"
                value={draft.level}
                onChange={(e) => setDraft({ ...draft, level: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
              <datalist id="cms-grammar-levels">
                {GRAMMAR_LEVELS_BY_LANG[draft.language].map((lvl) => (
                  <option key={lvl} value={lvl} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Công thức / Cách chia (Formula)
              </label>
              <input
                type="text"
                value={draft.formula}
                onChange={(e) => setDraft({ ...draft, formula: e.target.value })}
                placeholder="VD: Vて + もいいです / Adjい(くても)いい"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ghi chú cách dùng / sắc thái (tùy chọn)
              </label>
              <textarea
                rows={2}
                value={draft.note || ''}
                onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                placeholder="Lưu ý ngữ cảnh trang trọng, văn nói, ngoại lệ..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Examples Editor */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Câu ví dụ thực hành ({draft.examples.length} câu)
              </h3>
              <p className="text-[11px] text-slate-500">
                Dùng cho luyện nói chấm điểm &amp; tự động sinh câu hỏi Mini Quiz khi học.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft({ ...draft, examples: [...draft.examples, createEmptyExample()] })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm ví dụ</span>
            </button>
          </div>

          <div className="space-y-3">
            {draft.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-indigo-400">Ví dụ #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveExample(idx, -1)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveExample(idx, 1)}
                      disabled={idx === draft.examples.length - 1}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExampleAt(idx)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Câu ví dụ *
                    </label>
                    <input
                      type="text"
                      value={ex.text}
                      onChange={(e) => updateExampleAt(idx, { text: e.target.value })}
                      placeholder="Nhập câu ví dụ..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Dịch nghĩa tiếng Việt
                    </label>
                    <input
                      type="text"
                      value={ex.translation}
                      onChange={(e) => updateExampleAt(idx, { translation: e.target.value })}
                      placeholder="Nghĩa câu ví dụ..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100"
                    />
                  </div>

                  {draft.language === 'ja' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-400">
                          Furigana (Kanji[kana])
                        </label>
                        {ex.text && (
                          <span className="text-[11px] text-emerald-400">
                            <FuriganaText text={ex.text} furigana={ex.furigana} lang="ja" />
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={ex.furigana || ''}
                        onChange={(e) => updateExampleAt(idx, { furigana: e.target.value })}
                        placeholder="VD: 学[がく]生[せい]です。"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                      />
                    </div>
                  )}

                  <div className={draft.language === 'ja' ? '' : 'md:col-span-2'}>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Phiên âm / Pinyin / Cách đọc
                    </label>
                    <input
                      type="text"
                      value={ex.reading || ''}
                      onChange={(e) => updateExampleAt(idx, { reading: e.target.value })}
                      placeholder="VD: Gakusei desu / Wǒ shì xuéshēng"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // List View
  // ==========================================
  return (
    <div className="space-y-4">
      {toastMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Quản lý Ngữ pháp &amp; Mẫu câu ({countsSummary.active} mẫu hoạt động)</span>
            </h2>
            <p className="text-xs text-slate-400">
              {countsSummary.cmsNew} mẫu CMS mới • {countsSummary.overrideCount} mẫu gốc đã chỉnh sửa •{' '}
              {countsSummary.deleted} mẫu đã xóa/ẩn.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSyncBuiltinToDb}
              disabled={untouchedBuiltinCount === 0 || Boolean(syncProgress)}
              title="Đẩy toàn bộ mẫu ngữ pháp gốc chưa có trên DB vào bảng cms_grammar_patterns"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
            >
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {syncProgress
                  ? `Đang đồng bộ (${syncProgress.done}/${syncProgress.total})...`
                  : untouchedBuiltinCount > 0
                  ? `Đồng bộ ngữ pháp gốc lên DB (${untouchedBuiltinCount})`
                  : 'Đã đồng bộ DB'}
              </span>
            </button>
            <button
              type="button"
              onClick={openCreateNew}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm mẫu ngữ pháp</span>
            </button>
            <button
              type="button"
              onClick={fetchList}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              title="Làm mới"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mẫu, ý nghĩa, công thức..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100"
            />
          </div>

          <select
            value={filterLang}
            onChange={(e) => {
              setFilterLang(e.target.value as Language | 'all')
              setFilterLevel('all')
            }}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
          >
            <option value="all">Tất cả ngôn ngữ</option>
            {supportedLanguages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
          >
            <option value="all">Tất cả cấp độ</option>
            {availableLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <select
            value={filterSource}
            onChange={(e) =>
              setFilterSource(e.target.value as 'all' | 'builtin' | 'override' | 'cms')
            }
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
          >
            <option value="all">Tất cả nguồn</option>
            <option value="builtin">Hệ thống gốc</option>
            <option value="override">Đã chỉnh sửa (CMS)</option>
            <option value="cms">Tạo mới (CMS)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as 'active' | 'published' | 'draft' | 'deleted')
            }
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
          >
            <option value="active">Đang hoạt động ({countsSummary.active})</option>
            <option value="published">Đang xuất bản</option>
            <option value="draft">Đang ẩn / Nháp</option>
            <option value="deleted">Đã xóa ({countsSummary.deleted})</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
          Đang tải danh sách ngữ pháp...
        </div>
      ) : paginatedPatterns.length === 0 ? (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-200">
            Không có mẫu ngữ pháp nào khớp bộ lọc.
          </p>
          <p className="text-xs text-slate-400">
            Thử đổi bộ lọc hoặc bấm &quot;Thêm mẫu ngữ pháp&quot; để tạo nội dung mới.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {paginatedPatterns.map((item) => {
            const langMeta =
              supportedLanguages.find((l) => l.code === item.language) || supportedLanguages[0]
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      {langMeta.flag} {langMeta.code.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {item.level}
                    </span>
                    {item.isDeleted ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        Đã xóa
                      </span>
                    ) : item.source === 'cms' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        CMS Mới
                      </span>
                    ) : item.source === 'override' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Đã sửa (CMS)
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        Hệ thống gốc
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">
                      {item.examples.length} ví dụ
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h4 className="text-sm font-bold text-white">{item.pattern}</h4>
                    <span className="text-xs text-emerald-400">— {item.meaning}</span>
                  </div>
                  {item.formula && (
                    <p className="text-[11px] text-slate-400 truncate">Công thức: {item.formula}</p>
                  )}
                  <p className="text-[10px] font-mono text-slate-500 truncate">ID: {item.id}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {item.isDeleted ? (
                    <button
                      type="button"
                      onClick={() => handleRestore(item.id, item.pattern)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Khôi phục</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                          item.isPublished
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {item.isPublished ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Nháp</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditPattern(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(item)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                        title="Nhân bản"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {item.source === 'override' && (
                        <button
                          type="button"
                          onClick={() => handleRestore(item.id, item.pattern)}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 cursor-pointer"
                          title="Khôi phục về bản gốc"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {confirmDeleteId === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold cursor-pointer"
                          >
                            Xác nhận xóa
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 cursor-pointer"
                          title="Xóa mẫu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {filteredPatterns.length > 0 && (
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            Hiển thị <strong className="text-slate-200">{pageStartDisplay}</strong>–
            <strong className="text-slate-200">{pageEndDisplay}</strong> / tổng{' '}
            <strong className="text-white">{filteredPatterns.length}</strong> mẫu
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trước</span>
            </button>
            <span className="px-2 font-semibold text-slate-300">
              Trang {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <span>Sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
