import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CmsLesson, Language, LessonSentence } from '../../types'
import { supportedLanguages } from '../../data/languages'
import {
  adminDeleteLesson,
  adminFetchAllLessons,
  adminRestoreLesson,
  adminSyncBuiltinLessonsToDb,
  adminToggleLessonPublished,
  adminUpsertLesson,
  uploadCmsMediaFile,
} from '../../services/cms'
import { parseTranscript } from '../../services/transcriptParser'
import { FuriganaText } from '../../services/furigana'
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  Database,
  Edit3,
  Eye,
  EyeOff,
  FileAudio,
  FileText,
  Film,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Trash2,
  UploadCloud,
  Volume2,
} from 'lucide-react'

interface AdminLessonsManagerProps {
  onDataChanged?: () => void
  autoCreateToken?: number
}

const PAGE_SIZE = 25

const LEVELS_BY_LANG: Record<Language, string[]> = {
  ja: ['Kana', 'N5', 'N4', 'N3', 'N2', 'N1', 'Tự soạn'],
  zh: ['Pinyin', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'Tự soạn'],
  vi: ['Chữ cái', 'Cơ bản', 'Nâng cao', 'Tự soạn'],
}

function slugifyLessonId(title: string, lang: Language): string {
  const base = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 36)
  return `cms-${lang}-${base || 'lesson'}-${Date.now().toString(36).slice(-4)}`
}

function createEmptySentence(index: number): LessonSentence {
  return {
    id: `s-${Date.now().toString(36)}-${index + 1}`,
    text: '',
    phonetic: '',
    furigana: '',
    translation: '',
    grammarNote: '',
  }
}

function createBlankLesson(lang: Language = 'ja', nextOrder = 0): CmsLesson {
  return {
    id: `cms-${lang}-${Date.now().toString(36)}`,
    language: lang,
    title: '',
    level: LEVELS_BY_LANG[lang][1] || LEVELS_BY_LANG[lang][0],
    category: 'Hội thoại',
    description: '',
    sentences: [createEmptySentence(0)],
    audioSourceType: 'tts',
    mediaType: undefined,
    originalAudioUrl: '',
    videoUrl: '',
    originalAudioFileName: '',
    audioDuration: undefined,
    isPublished: true,
    sortOrder: nextOrder,
    source: 'cms',
  }
}

export const AdminLessonsManager: React.FC<AdminLessonsManagerProps> = ({
  onDataChanged,
  autoCreateToken = 0,
}) => {
  const [lessons, setLessons] = useState<CmsLesson[]>([])
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
  const [draft, setDraft] = useState<CmsLesson | null>(null)
  const [isEditingNew, setIsEditingNew] = useState(false)
  const [isIdManuallyEdited, setIsIdManuallyEdited] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingMedia, setIsUploadingMedia] = useState(false)
  const [showTranscriptPaste, setShowTranscriptPaste] = useState(false)
  const [transcriptPasteText, setTranscriptPasteText] = useState('')
  const [transcriptAppendMode, setTranscriptAppendMode] = useState<'replace' | 'append'>('replace')
  const [expandedAdvancedIdx, setExpandedAdvancedIdx] = useState<Record<number, boolean>>({})

  const mediaFileInputRef = useRef<HTMLInputElement | null>(null)
  const transcriptFileInputRef = useRef<HTMLInputElement | null>(null)
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null)
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg((prev) => (prev === msg ? null : prev)), 4000)
  }

  const fetchList = async () => {
    setIsLoading(true)
    setErrorMsg(null)
    const res = await adminFetchAllLessons()
    if (res.error) {
      setErrorMsg(res.error)
    }
    setLessons(res.data)
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
    setDraft(createBlankLesson(lang, lessons.length))
    setIsEditingNew(true)
    setIsIdManuallyEdited(false)
    setShowTranscriptPaste(false)
    setExpandedAdvancedIdx({})
    setErrorMsg(null)
  }

  const openEditLesson = (lesson: CmsLesson) => {
    setDraft({
      ...lesson,
      sentences: lesson.sentences.length
        ? lesson.sentences.map((s) => ({ ...s }))
        : [createEmptySentence(0)],
    })
    // Lock ID for both existing overrides/CMS records AND untouched built-in items so saving overrides the built-in ID
    setIsEditingNew(false)
    setIsIdManuallyEdited(true)
    setShowTranscriptPaste(false)
    setExpandedAdvancedIdx({})
    setErrorMsg(null)
  }

  const handleDuplicateLesson = (lesson: CmsLesson) => {
    setDraft({
      ...lesson,
      id: `cms-${lesson.language}-copy-${Date.now().toString(36).slice(-4)}`,
      title: `${lesson.title} (Bản sao)`,
      isPublished: false,
      isDeleted: false,
      sortOrder: lessons.length,
      source: 'cms',
      sentences: lesson.sentences.map((s, idx) => ({
        ...s,
        id: `${s.id || 's'}-copy-${idx + 1}`,
      })),
    })
    setIsEditingNew(true)
    setIsIdManuallyEdited(true)
    setErrorMsg(null)
  }

  const handleSaveDraft = async () => {
    if (!draft) return
    if (!draft.title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề bài học.')
      return
    }
    if (!draft.id.trim()) {
      setErrorMsg('ID bài học không được để trống.')
      return
    }
    const cleanSentences = draft.sentences
      .map((s, idx) => ({
        ...s,
        id: s.id?.trim() || `s-${idx + 1}`,
        text: s.text.trim(),
        translation: s.translation.trim(),
      }))
      .filter((s) => s.text.length > 0)

    if (cleanSentences.length === 0) {
      setErrorMsg('Bài học cần ít nhất 1 câu thoại có nội dung.')
      return
    }

    setIsSaving(true)
    setErrorMsg(null)

    const res = await adminUpsertLesson({
      ...draft,
      sentences: cleanSentences,
    })
    setIsSaving(false)

    if (res.error || !res.data) {
      setErrorMsg(res.error || 'Không thể lưu bài học lên Supabase.')
      return
    }

    await fetchList()
    onDataChanged?.()
    setDraft(null)
    showToast(`Đã lưu bài học "${res.data.title}" và đồng bộ ra ứng dụng!`)
  }

  const handleDelete = async (lesson: CmsLesson) => {
    const res = await adminDeleteLesson(lesson)
    setConfirmDeleteId(null)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể xóa bài học.')
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(
      lesson.source === 'cms'
        ? `Đã xóa bài "${lesson.title}" khỏi CMS.`
        : `Đã ẩn/xóa bài "${lesson.title}" khỏi hệ thống (có thể khôi phục bất kỳ lúc nào).`
    )
  }

  const handleRestore = async (id: string, title: string) => {
    const res = await adminRestoreLesson(id)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể khôi phục bài học.')
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(`Đã khôi phục "${title}" về bản gốc hệ thống!`)
  }

  const handleTogglePublished = async (lesson: CmsLesson) => {
    const nextPublished = !lesson.isPublished
    const res = await adminToggleLessonPublished(lesson, nextPublished)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể cập nhật trạng thái xuất bản.')
      return
    }
    await fetchList()
    onDataChanged?.()
    showToast(nextPublished ? 'Đã xuất bản bài học!' : 'Đã ẩn bài học (chuyển về Nháp).')
  }

  const handleSyncBuiltinToDb = async () => {
    setErrorMsg(null)
    setSyncProgress({ done: 0, total: untouchedBuiltinCount })
    const res = await adminSyncBuiltinLessonsToDb((done, total) => {
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
      `Đã đồng bộ ${res.synced} bài học gốc lên Supabase CMS (bỏ qua ${res.skipped} bài đã tùy chỉnh/ẩn).`
    )
  }

  const handleUploadMediaFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !draft) return

    setIsUploadingMedia(true)
    setErrorMsg(null)
    const res = await uploadCmsMediaFile(file, draft.language)
    setIsUploadingMedia(false)

    if (res.error || !res.url) {
      setErrorMsg(res.error || 'Tải media lên Storage thất bại.')
      return
    }

    setDraft((prev) =>
      prev
        ? {
            ...prev,
            audioSourceType: res.mediaType === 'video' ? 'video-file' : 'audio-file',
            mediaType: res.mediaType,
            originalAudioUrl: res.mediaType === 'audio' ? res.url || '' : prev.originalAudioUrl,
            videoUrl: res.mediaType === 'video' ? res.url || '' : prev.videoUrl,
            originalAudioFileName: file.name,
          }
        : prev
    )
    showToast(`Đã tải "${file.name}" lên Storage thành công!`)
  }

  const applyParsedTranscript = (raw: string, fileName?: string) => {
    if (!draft) return
    const parsed = parseTranscript(raw, fileName)
    if (parsed.length === 0) {
      setErrorMsg('Không tìm thấy câu hợp lệ trong nội dung transcript (.srt / .lrc / .txt).')
      return
    }
    setDraft((prev) => {
      if (!prev) return prev
      const existingValid = prev.sentences.filter((s) => s.text.trim().length > 0)
      const nextSentences =
        transcriptAppendMode === 'append' ? [...existingValid, ...parsed] : parsed
      return { ...prev, sentences: nextSentences }
    })
    setShowTranscriptPaste(false)
    setTranscriptPasteText('')
    showToast(`Đã nhập ${parsed.length} câu thoại từ transcript!`)
  }

  const handleTranscriptFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const content = String(ev.target?.result || '')
      applyParsedTranscript(content, file.name)
    }
    reader.readAsText(file, 'utf-8')
  }

  const getPreviewCurrentTime = (): number | null => {
    if (!draft) return null
    const el =
      draft.audioSourceType === 'video-file' ? videoPreviewRef.current : audioPreviewRef.current
    if (!el || Number.isNaN(el.currentTime)) return null
    return Number(el.currentTime.toFixed(2))
  }

  const updateSentenceAt = (idx: number, patch: Partial<LessonSentence>) => {
    setDraft((prev) => {
      if (!prev) return prev
      const next = prev.sentences.map((s, i) => (i === idx ? { ...s, ...patch } : s))
      return { ...prev, sentences: next }
    })
  }

  const moveSentence = (idx: number, dir: -1 | 1) => {
    setDraft((prev) => {
      if (!prev) return prev
      const target = idx + dir
      if (target < 0 || target >= prev.sentences.length) return prev
      const copy = [...prev.sentences]
      const [item] = copy.splice(idx, 1)
      copy.splice(target, 0, item)
      return { ...prev, sentences: copy }
    })
  }

  const removeSentenceAt = (idx: number) => {
    setDraft((prev) => {
      if (!prev) return prev
      const next = prev.sentences.filter((_, i) => i !== idx)
      return { ...prev, sentences: next.length ? next : [createEmptySentence(0)] }
    })
  }

  const untouchedBuiltinCount = useMemo(
    () =>
      lessons.filter((l) => l.source === 'builtin' && !l.isDeleted && l.isPublished).length,
    [lessons]
  )

  const countsSummary = useMemo(() => {
    let active = 0
    let cmsNew = 0
    let overrideCount = 0
    let deleted = 0
    for (const l of lessons) {
      if (l.isDeleted) {
        deleted += 1
      } else {
        active += 1
        if (l.source === 'cms') cmsNew += 1
        else if (l.source === 'override') overrideCount += 1
      }
    }
    return { active, cmsNew, overrideCount, deleted }
  }, [lessons])

  const availableLevels = useMemo(() => {
    const set = new Set<string>()
    lessons.forEach((l) => {
      if (filterLang === 'all' || l.language === filterLang) {
        if (l.level) set.add(l.level)
      }
    })
    return Array.from(set)
  }, [lessons, filterLang])

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return lessons.filter((l) => {
      if (filterLang !== 'all' && l.language !== filterLang) return false
      if (filterLevel !== 'all' && l.level !== filterLevel) return false
      if (filterSource !== 'all' && l.source !== filterSource) return false
      if (filterStatus === 'active' && l.isDeleted) return false
      if (filterStatus === 'published' && (l.isDeleted || !l.isPublished)) return false
      if (filterStatus === 'draft' && (l.isDeleted || l.isPublished)) return false
      if (filterStatus === 'deleted' && !l.isDeleted) return false
      if (q) {
        const hay = `${l.title} ${l.id} ${l.level} ${l.category} ${l.description || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [lessons, filterLang, filterLevel, filterSource, filterStatus, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredLessons.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedLessons = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return filteredLessons.slice(start, start + PAGE_SIZE)
  }, [filteredLessons, safePage])

  const pageStartDisplay = filteredLessons.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const pageEndDisplay = Math.min(safePage * PAGE_SIZE, filteredLessons.length)

  // ==========================================
  // Editor View
  // ==========================================
  if (draft) {
    const previewMediaUrl =
      draft.audioSourceType === 'video-file'
        ? draft.videoUrl || draft.originalAudioUrl || ''
        : draft.originalAudioUrl || draft.videoUrl || ''

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
                  ? 'Tạo bài Shadowing mới'
                  : draft.source === 'builtin'
                  ? `Tùy chỉnh bài hệ thống: ${draft.title || draft.id}`
                  : `Chỉnh sửa: ${draft.title || draft.id}`}
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
              <span>{isSaving ? 'Đang lưu...' : 'Lưu bài học'}</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Metadata Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Thông tin chung
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tiêu đề bài học *
              </label>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => {
                  const val = e.target.value
                  setDraft((prev) =>
                    prev
                      ? {
                          ...prev,
                          title: val,
                          id:
                            isEditingNew && !isIdManuallyEdited
                              ? slugifyLessonId(val, prev.language)
                              : prev.id,
                        }
                      : prev
                  )
                }}
                placeholder="VD: Bài 12 - Phỏng vấn công ty IT tại Tokyo"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ID bài học (duy nhất) *
              </label>
              <input
                type="text"
                value={draft.id}
                disabled={!isEditingNew}
                onChange={(e) => {
                  setIsIdManuallyEdited(true)
                  setDraft({ ...draft, id: e.target.value })
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    level: LEVELS_BY_LANG[nextLang][1] || LEVELS_BY_LANG[nextLang][0],
                  })
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
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
                list="cms-lesson-levels"
                value={draft.level}
                onChange={(e) => setDraft({ ...draft, level: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="cms-lesson-levels">
                {LEVELS_BY_LANG[draft.language].map((lvl) => (
                  <option key={lvl} value={lvl} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Chuyên mục</label>
                <input
                  type="text"
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  placeholder="Giao tiếp / Tin tức..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Thứ tự</label>
                <input
                  type="number"
                  value={draft.sortOrder}
                  onChange={(e) =>
                    setDraft({ ...draft, sortOrder: Number(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mô tả ngắn</label>
              <input
                type="text"
                value={draft.description || ''}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Ghi chú bối cảnh, mục tiêu luyện nghe nói cho bài học..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Media Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nguồn Âm thanh / Video gốc
            </h3>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(
                [
                  { id: 'tts', label: 'TTS (Mặc định)', icon: Volume2 },
                  { id: 'audio-file', label: 'File Audio', icon: FileAudio },
                  { id: 'video-file', label: 'File Video', icon: Film },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon
                const active = (draft.audioSourceType || 'tts') === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        audioSourceType: tab.id,
                        mediaType:
                          tab.id === 'video-file'
                            ? 'video'
                            : tab.id === 'audio-file'
                            ? 'audio'
                            : undefined,
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      active
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {draft.audioSourceType !== 'tts' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL {draft.audioSourceType === 'video-file' ? 'Video' : 'Audio'} (tự điền sau khi tải lên hoặc dán link trực tiếp)
                  </label>
                  <input
                    type="url"
                    value={
                      draft.audioSourceType === 'video-file'
                        ? draft.videoUrl || ''
                        : draft.originalAudioUrl || ''
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      setDraft({
                        ...draft,
                        originalAudioUrl:
                          draft.audioSourceType === 'audio-file' ? val : draft.originalAudioUrl,
                        videoUrl: draft.audioSourceType === 'video-file' ? val : draft.videoUrl,
                      })
                    }}
                    placeholder="https://.../storage/v1/object/public/italk-cms-media/..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={mediaFileInputRef}
                    type="file"
                    accept={
                      draft.audioSourceType === 'video-file'
                        ? 'video/*,.mp4,.webm,.mkv,.mov'
                        : 'audio/*,.mp3,.wav,.m4a,.ogg,.webm'
                    }
                    onChange={handleUploadMediaFile}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => mediaFileInputRef.current?.click()}
                    disabled={isUploadingMedia}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{isUploadingMedia ? 'Đang tải lên...' : 'Upload lên Supabase'}</span>
                  </button>
                </div>
              </div>

              {previewMediaUrl && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">
                      File preview: {draft.originalAudioFileName || previewMediaUrl}
                    </span>
                    {draft.audioDuration ? (
                      <span className="font-mono text-emerald-400 shrink-0">
                        Thời lượng: {draft.audioDuration}s
                      </span>
                    ) : null}
                  </div>
                  {draft.audioSourceType === 'video-file' ? (
                    <video
                      ref={videoPreviewRef}
                      src={previewMediaUrl}
                      controls
                      onLoadedMetadata={(e) => {
                        const dur = Math.round(e.currentTarget.duration)
                        if (Number.isFinite(dur) && dur > 0) {
                          setDraft((prev) => (prev ? { ...prev, audioDuration: dur } : prev))
                        }
                      }}
                      className="w-full max-h-60 rounded-lg bg-black"
                    />
                  ) : (
                    <audio
                      ref={audioPreviewRef}
                      src={previewMediaUrl}
                      controls
                      onLoadedMetadata={(e) => {
                        const dur = Math.round(e.currentTarget.duration)
                        if (Number.isFinite(dur) && dur > 0) {
                          setDraft((prev) => (prev ? { ...prev, audioDuration: dur } : prev))
                        }
                      }}
                      className="w-full h-9"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Transcript & Sentences Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Danh sách câu thoại ({draft.sentences.length} câu)
              </h3>
              <p className="text-[11px] text-slate-500">
                Hỗ trợ import .srt / .lrc / .txt và gán mốc thời gian trực tiếp từ trình phát phía trên.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={transcriptFileInputRef}
                type="file"
                accept=".srt,.lrc,.txt"
                onChange={handleTranscriptFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => transcriptFileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Import .SRT / .LRC / .TXT</span>
              </button>
              <button
                type="button"
                onClick={() => setShowTranscriptPaste((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
              >
                <span>Dán nhanh transcript</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    ...draft,
                    sentences: [...draft.sentences, createEmptySentence(draft.sentences.length)],
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm câu</span>
              </button>
            </div>
          </div>

          {showTranscriptPaste && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-300">
                  Dán nội dung SRT, LRC hoặc từng dòng câu thoại:
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <label className="inline-flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      checked={transcriptAppendMode === 'replace'}
                      onChange={() => setTranscriptAppendMode('replace')}
                    />
                    <span>Thay toàn bộ</span>
                  </label>
                  <label className="inline-flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      checked={transcriptAppendMode === 'append'}
                      onChange={() => setTranscriptAppendMode('append')}
                    />
                    <span>Nối thêm</span>
                  </label>
                </div>
              </div>
              <textarea
                rows={5}
                value={transcriptPasteText}
                onChange={(e) => setTranscriptPasteText(e.target.value)}
                placeholder={'[00:01.20] 初めまして、どうぞよろしくお願いします。\n[00:05.80] こちらこそよろしくお願いします。'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTranscriptPaste(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => applyParsedTranscript(transcriptPasteText)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Phân tích &amp; Chèn câu
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {draft.sentences.map((s, idx) => {
              const showAdvanced = Boolean(expandedAdvancedIdx[idx])
              return (
                <div
                  key={`${s.id}-${idx}`}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-400">Câu #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSentence(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                        title="Đưa lên"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSentence(idx, 1)}
                        disabled={idx === draft.sentences.length - 1}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                        title="Đưa xuống"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSentenceAt(idx)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 cursor-pointer"
                        title="Xóa câu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Câu gốc *
                      </label>
                      <input
                        type="text"
                        value={s.text}
                        onChange={(e) => updateSentenceAt(idx, { text: e.target.value })}
                        placeholder="Nhập câu cần luyện..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Nghĩa tiếng Việt
                      </label>
                      <input
                        type="text"
                        value={s.translation}
                        onChange={(e) => updateSentenceAt(idx, { translation: e.target.value })}
                        placeholder="Nghĩa dịch câu..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Phiên âm / Romaji / Pinyin
                      </label>
                      <input
                        type="text"
                        value={s.phonetic || ''}
                        onChange={(e) => updateSentenceAt(idx, { phonetic: e.target.value })}
                        placeholder="VD: Hajimemashite / Wǒ shì..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {draft.language === 'ja' ? (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-slate-400">
                            Furigana (dạng Kanji[kana])
                          </label>
                          {s.text && (
                            <span className="text-[11px] text-emerald-400">
                              <FuriganaText text={s.text} furigana={s.furigana} lang="ja" />
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={s.furigana || ''}
                          onChange={(e) => updateSentenceAt(idx, { furigana: e.target.value })}
                          placeholder="VD: 初[はじ]めまして"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Ghi chú ngữ pháp / bối cảnh
                        </label>
                        <input
                          type="text"
                          value={s.grammarNote || ''}
                          onChange={(e) => updateSentenceAt(idx, { grammarNote: e.target.value })}
                          placeholder="Lưu ý cách dùng..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Timing & Advanced Toggle */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px] text-slate-400">Start (s):</span>
                        <input
                          type="number"
                          step="0.1"
                          value={s.startTime ?? ''}
                          onChange={(e) =>
                            updateSentenceAt(idx, {
                              startTime:
                                e.target.value === '' ? undefined : Number(e.target.value),
                            })
                          }
                          className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-slate-100"
                        />
                        {previewMediaUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              const t = getPreviewCurrentTime()
                              if (t !== null) updateSentenceAt(idx, { startTime: t })
                            }}
                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-bold border border-slate-700 cursor-pointer"
                          >
                            Gán Start
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">End (s):</span>
                        <input
                          type="number"
                          step="0.1"
                          value={s.endTime ?? ''}
                          onChange={(e) =>
                            updateSentenceAt(idx, {
                              endTime: e.target.value === '' ? undefined : Number(e.target.value),
                            })
                          }
                          className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-slate-100"
                        />
                        {previewMediaUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              const t = getPreviewCurrentTime()
                              if (t !== null) updateSentenceAt(idx, { endTime: t })
                            }}
                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 text-[10px] font-bold border border-slate-700 cursor-pointer"
                          >
                            Gán End
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAdvancedIdx((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showAdvanced ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                      <span>Khẩu hình &amp; TTS nâng cao</span>
                    </button>
                  </div>

                  {showAdvanced && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                      {draft.language === 'ja' && (
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Ghi chú ngữ pháp
                          </label>
                          <input
                            type="text"
                            value={s.grammarNote || ''}
                            onChange={(e) => updateSentenceAt(idx, { grammarNote: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Văn bản đọc TTS riêng (speakText)
                        </label>
                        <input
                          type="text"
                          value={s.speakText || ''}
                          onChange={(e) => updateSentenceAt(idx, { speakText: e.target.value })}
                          placeholder="Nếu khác text hiển thị"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Khẩu hình miệng (mouthShape)
                        </label>
                        <input
                          type="text"
                          value={s.mouthShape || ''}
                          onChange={(e) => updateSentenceAt(idx, { mouthShape: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Đặt lưỡi (tonguePosition)
                        </label>
                        <input
                          type="text"
                          value={s.tonguePosition || ''}
                          onChange={(e) =>
                            updateSentenceAt(idx, { tonguePosition: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Luồng hơi (breathGuide)
                        </label>
                        <input
                          type="text"
                          value={s.breathGuide || ''}
                          onChange={(e) => updateSentenceAt(idx, { breathGuide: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
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

      {/* Action & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Quản lý Bài học Shadowing ({countsSummary.active} bài hoạt động)</span>
            </h2>
            <p className="text-xs text-slate-400">
              {countsSummary.cmsNew} bài CMS mới • {countsSummary.overrideCount} bài gốc đã chỉnh sửa •{' '}
              {countsSummary.deleted} bài đã xóa/ẩn. Mọi thay đổi tự đồng bộ cho học viên.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSyncBuiltinToDb}
              disabled={untouchedBuiltinCount === 0 || Boolean(syncProgress)}
              title="Đẩy toàn bộ bài gốc chưa có trên DB vào bảng cms_lessons"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
            >
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {syncProgress
                  ? `Đang đồng bộ (${syncProgress.done}/${syncProgress.total})...`
                  : untouchedBuiltinCount > 0
                  ? `Đồng bộ bài gốc lên DB (${untouchedBuiltinCount})`
                  : 'Đã đồng bộ DB'}
              </span>
            </button>
            <button
              type="button"
              onClick={openCreateNew}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo bài mới</span>
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
          <div className="relative lg:col-span-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tiêu đề, ID, cấp độ..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

      {/* Lessons List */}
      {isLoading ? (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
          Đang tải danh sách bài học...
        </div>
      ) : paginatedLessons.length === 0 ? (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-200">
            Không có bài Shadowing nào khớp bộ lọc.
          </p>
          <p className="text-xs text-slate-400">
            Thử đổi bộ lọc hoặc bấm &quot;Tạo bài mới&quot; để thêm nội dung mới.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {paginatedLessons.map((lesson) => {
            const langMeta =
              supportedLanguages.find((l) => l.code === lesson.language) || supportedLanguages[0]
            return (
              <div
                key={lesson.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      {langMeta.flag} {langMeta.code.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {lesson.level}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800">
                      {lesson.category}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800">
                      {lesson.audioSourceType === 'video-file'
                        ? 'Video'
                        : lesson.audioSourceType === 'audio-file'
                        ? 'Audio'
                        : 'TTS'}
                    </span>
                    {lesson.isDeleted ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        Đã xóa
                      </span>
                    ) : lesson.source === 'cms' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        CMS Mới
                      </span>
                    ) : lesson.source === 'override' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Đã sửa (CMS)
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        Hệ thống gốc
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">
                      {lesson.sentences.length} câu
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">{lesson.title}</h4>
                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    ID: {lesson.id} • Thứ tự: {lesson.sortOrder}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {lesson.isDeleted ? (
                    <button
                      type="button"
                      onClick={() => handleRestore(lesson.id, lesson.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Khôi phục</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(lesson)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                          lesson.isPublished
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {lesson.isPublished ? (
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
                        onClick={() => openEditLesson(lesson)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicateLesson(lesson)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                        title="Nhân bản"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {lesson.source === 'override' && (
                        <button
                          type="button"
                          onClick={() => handleRestore(lesson.id, lesson.title)}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 cursor-pointer"
                          title="Khôi phục về bản gốc"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {confirmDeleteId === lesson.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDelete(lesson)}
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
                          onClick={() => setConfirmDeleteId(lesson.id)}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 cursor-pointer"
                          title="Xóa bài"
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
      {filteredLessons.length > 0 && (
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            Hiển thị <strong className="text-slate-200">{pageStartDisplay}</strong>–
            <strong className="text-slate-200">{pageEndDisplay}</strong> / tổng{' '}
            <strong className="text-white">{filteredLessons.length}</strong> bài
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
