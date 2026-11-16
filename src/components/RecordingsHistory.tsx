import React, { useState, useEffect, useMemo } from 'react'
import { RecordingItem, Language } from '../types'
import { loadRecordings, deleteRecordingEntry } from '../services/storage'
import {
  FolderOpen,
  Video,
  Mic,
  Trash2,
  Play,
  Calendar,
  Clock,
  Award,
  HardDrive,
  Laptop,
  RefreshCw,
  CalendarDays,
  LayoutList,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'

interface DayGroup {
  dateKey: string
  dateLabel: string
  formattedDate: string
  items: RecordingItem[]
  totalSeconds: number
  avgScore: number
  videoCount: number
  audioCount: number
}

export const RecordingsHistory: React.FC = () => {
  const [recordings, setRecordings] = useState<RecordingItem[]>([])
  const [filterLang, setFilterLang] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline')
  const [playingItem, setPlayingItem] = useState<RecordingItem | null>(null)
  const [localDir, setLocalDir] = useState<string>('')

  const isElectron = Boolean(window.electronAPI?.isElectron)

  const refreshList = async () => {
    const list = loadRecordings()
    setRecordings(list)

    if (window.electronAPI?.getRecordingsDir) {
      try {
        const dir = await window.electronAPI.getRecordingsDir()
        setLocalDir(dir)
      } catch {}
    }
  }

  useEffect(() => {
    refreshList()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này khỏi lịch sử?')) {
      const updated = deleteRecordingEntry(id)
      setRecordings(updated)
      if (playingItem?.id === id) setPlayingItem(null)
    }
  }

  const handleOpenFolder = () => {
    if (window.electronAPI?.openRecordingFolder) {
      window.electronAPI.openRecordingFolder()
    }
  }

  const handleChangeFolder = async () => {
    if (window.electronAPI?.selectRecordingFolder) {
      const selected = await window.electronAPI.selectRecordingFolder()
      if (selected) {
        setLocalDir(selected)
      }
    }
  }

  const filtered = useMemo(() => {
    return filterLang === 'all'
      ? recordings
      : recordings.filter((r) => r.language === filterLang)
  }, [recordings, filterLang])

  const totalMinutes = Math.round(
    recordings.reduce((sum, r) => sum + (r.durationSec || 0), 0) / 60
  )
  const avgScore =
    recordings.length > 0
      ? Math.round(
          recordings.reduce((sum, r) => sum + (r.score || 0), 0) / recordings.length
        )
      : 0

  // Format single date label: "Hôm nay", "Hôm qua", or full weekday + date
  const formatDayLabel = (dateStr: string): { label: string; fullDate: string } => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) {
      return { label: 'Bản ghi khác', fullDate: '' }
    }

    const today = new Date()
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()

    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    const isYesterday =
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear()

    const formattedDate = d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    if (isToday) {
      return { label: 'Hôm nay', fullDate: formattedDate }
    }
    if (isYesterday) {
      return { label: 'Hôm qua', fullDate: formattedDate }
    }

    const rawWeekday = d.toLocaleDateString('vi-VN', { weekday: 'long' })
    const capitalizedWeekday =
      rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1)
    return { label: capitalizedWeekday, fullDate: formattedDate }
  }

  const formatTimeOnly = (dateStr: string): string => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return '--:--'
    return d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Group filtered recordings by day
  const groupedByDay = useMemo<DayGroup[]>(() => {
    const map = new Map<string, RecordingItem[]>()

    filtered.forEach((item) => {
      const d = new Date(item.date)
      const key = isNaN(d.getTime())
        ? 'unknown'
        : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
            d.getDate()
          ).padStart(2, '0')}`

      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(item)
    })

    const sortedKeys = Array.from(map.keys()).sort((a, b) => {
      if (a === 'unknown') return 1
      if (b === 'unknown') return -1
      return b.localeCompare(a)
    })

    return sortedKeys.map((key) => {
      const dayItems = map.get(key)!
      // Sort newest recordings first within the same day
      dayItems.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )

      const totalSec = dayItems.reduce((acc, it) => acc + (it.durationSec || 0), 0)
      const scoredItems = dayItems.filter((it) => typeof it.score === 'number')
      const avg =
        scoredItems.length > 0
          ? Math.round(
              scoredItems.reduce((acc, it) => acc + (it.score || 0), 0) /
                scoredItems.length
            )
          : 0

      const { label, fullDate } =
        key === 'unknown'
          ? { label: 'Bản ghi khác', fullDate: '' }
          : formatDayLabel(dayItems[0].date)

      return {
        dateKey: key,
        dateLabel: label,
        formattedDate: fullDate,
        items: dayItems,
        totalSeconds: totalSec,
        avgScore: avg,
        videoCount: dayItems.filter((it) => it.type === 'video').length,
        audioCount: dayItems.filter((it) => it.type === 'audio').length,
      }
    })
  }, [filtered])

  const getScoreBadge = (score?: number) => {
    if (typeof score !== 'number') return null
    if (score >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <Award className="w-3 h-3" />
          {score}đ • Xuất sắc
        </span>
      )
    }
    if (score >= 60) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <Award className="w-3 h-3" />
          {score}đ • Khá
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
        <Award className="w-3 h-3" />
        {score}đ • Cần cải thiện
      </span>
    )
  }

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner / Electron Folder Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white">Thư mục & Lịch sử bản ghi</h2>
            {isElectron && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Laptop className="w-3.5 h-3.5" /> Desktop Mode
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Xem lại video và âm thanh các bài bạn đã luyện tập để đối chiếu sự tiến bộ qua từng ngày.
          </p>

          {isElectron && localDir && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-300 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <HardDrive className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="truncate max-w-md">{localDir}</span>
            </div>
          )}
        </div>

        {/* Action Buttons for Folder */}
        <div className="flex items-center gap-2 flex-wrap">
          {isElectron && (
            <>
              <button
                onClick={handleOpenFolder}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Mở thư mục trên máy</span>
              </button>
              <button
                onClick={handleChangeFolder}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                Đổi thư mục
              </button>
            </>
          )}

          <button
            onClick={refreshList}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Làm mới danh sách"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl">
            {recordings.length}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Tổng số bài đã ghi</div>
            <div className="text-lg font-extrabold text-white">{recordings.length} bản ghi</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xl">
            {totalMinutes}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Thời gian luyện tập</div>
            <div className="text-lg font-extrabold text-white">{totalMinutes} phút</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">
            {avgScore}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Điểm phát âm trung bình</div>
            <div className="text-lg font-extrabold text-white">{avgScore} / 100</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterLang('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterLang === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/60'
            }`}
          >
            Tất cả ({recordings.length})
          </button>
          <button
            onClick={() => setFilterLang('ja')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterLang === 'ja'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/60'
            }`}
          >
            🇯🇵 Tiếng Nhật ({recordings.filter((r) => r.language === 'ja').length})
          </button>
          <button
            onClick={() => setFilterLang('zh')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterLang === 'zh'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/60'
            }`}
          >
            🇨🇳 Tiếng Trung ({recordings.filter((r) => r.language === 'zh').length})
          </button>
          <button
            onClick={() => setFilterLang('vi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterLang === 'vi'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/60'
            }`}
          >
            🇻🇳 Tiếng Việt ({recordings.filter((r) => r.language === 'vi').length})
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'timeline'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Hiển thị dạng dòng thời gian theo từng ngày"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Dòng thời gian (Timeline)</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Hiển thị dạng danh sách bảng"
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Danh sách</span>
          </button>
        </div>
      </div>

      {/* Video / Audio Player Dialog if selected */}
      {playingItem && playingItem.blobUrl && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-emerald-400 font-semibold block">
                Đang phát lại bản ghi:
              </span>
              <h4 className="text-lg font-bold text-white">
                {playingItem.lessonTitle}
              </h4>
            </div>
            <button
              onClick={() => setPlayingItem(null)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Đóng trình phát
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-80 flex items-center justify-center">
            {playingItem.type === 'video' ? (
              <video
                src={playingItem.blobUrl}
                controls
                autoPlay
                className="max-h-80 w-full object-contain"
              />
            ) : (
              <audio
                src={playingItem.blobUrl}
                controls
                autoPlay
                className="w-full my-6 px-4"
              />
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-slate-200">
            Chưa có bản ghi nào
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Hãy qua tab Shadowing để bắt đầu bài đọc và ghi lại video/âm thanh đầu tiên!
          </p>
        </div>
      ) : viewMode === 'timeline' ? (
        /* TIMELINE VIEW (Theo từng ngày) */
        <div className="space-y-8">
          {groupedByDay.map((group) => {
            const minutesFormatted =
              group.totalSeconds >= 60
                ? `${Math.round(group.totalSeconds / 60)} phút`
                : `${group.totalSeconds}s`

            return (
              <div key={group.dateKey} className="relative">
                {/* Day Header Card */}
                <div className="sticky top-20 z-10 flex flex-wrap items-center justify-between gap-3 mb-5 bg-slate-900/95 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center font-bold">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-wide">
                          {group.dateLabel}
                        </h3>
                        {group.formattedDate && (
                          <span className="text-xs text-slate-400 font-medium">
                            • {group.formattedDate}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {group.items.length} bài luyện tập
                        {group.videoCount > 0 && ` (${group.videoCount} video`}
                        {group.videoCount > 0 && group.audioCount > 0 && `, `}
                        {group.audioCount > 0 &&
                          (group.videoCount > 0
                            ? `${group.audioCount} audio)`
                            : ` (${group.audioCount} audio)`)}
                        {group.videoCount === 0 && group.audioCount === 0 && `)`}
                      </div>
                    </div>
                  </div>

                  {/* Day Aggregated Stats Badges */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{minutesFormatted}</span>
                    </span>

                    {group.avgScore > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                        <Award className="w-3.5 h-3.5" />
                        <span>ĐTB: {group.avgScore}đ</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Vertical Timeline Stem & Cards */}
                <div className="relative pl-6 sm:pl-8 ml-3 sm:ml-4 border-l-2 border-emerald-500/30 space-y-4">
                  {group.items.map((item) => {
                    const langFlag =
                      item.language === 'ja'
                        ? '🇯🇵'
                        : item.language === 'zh'
                        ? '🇨🇳'
                        : '🇻🇳'
                    const langName =
                      item.language === 'ja'
                        ? 'Tiếng Nhật'
                        : item.language === 'zh'
                        ? 'Tiếng Trung'
                        : 'Tiếng Việt'
                    const timeStr = formatTimeOnly(item.date)

                    return (
                      <div key={item.id} className="relative group">
                        {/* Timeline Node Point (Glow on hover) */}
                        <div
                          className={`absolute -left-[31px] sm:-left-[39px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border-2 transition-all flex items-center justify-center shadow-md ${
                            item.type === 'video'
                              ? 'border-emerald-500 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950'
                              : 'border-teal-400 text-teal-400 group-hover:bg-teal-400 group-hover:text-slate-950'
                          }`}
                          title={`${item.type === 'video' ? 'Video' : 'Audio'} ghi lúc ${timeStr}`}
                        >
                          {item.type === 'video' ? (
                            <Video className="w-3.5 h-3.5" />
                          ) : (
                            <Mic className="w-3.5 h-3.5" />
                          )}
                        </div>

                        {/* Event Card */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-4.5 hover:border-emerald-500/40 hover:shadow-xl transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              {/* Metadata Row */}
                              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                {/* Time of recording */}
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-semibold">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  {timeStr}
                                </span>

                                {/* Language */}
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium">
                                  <span>{langFlag}</span>
                                  <span>{langName}</span>
                                </span>

                                {/* Type Badge */}
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${
                                    item.type === 'video'
                                      ? 'bg-emerald-500/10 text-emerald-400'
                                      : 'bg-teal-500/10 text-teal-400'
                                  }`}
                                >
                                  {item.type === 'video' ? 'Video thực hành' : 'Ghi âm'}
                                </span>

                                {/* Duration */}
                                <span className="text-xs text-slate-400 font-medium">
                                  • {item.durationSec}s
                                </span>

                                {/* Score Pill */}
                                {getScoreBadge(item.score)}
                              </div>

                              {/* Lesson Title */}
                              <h4 className="font-bold text-sm sm:text-base text-white tracking-tight truncate max-w-lg sm:max-w-xl">
                                {item.lessonTitle}
                              </h4>

                              {/* Desktop Local Path (if any) */}
                              {item.localPath && (
                                <div className="text-[11px] font-mono text-slate-500 truncate max-w-md mt-1 flex items-center gap-1">
                                  <HardDrive className="w-3 h-3 flex-shrink-0" />
                                  <span>{item.localPath}</span>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                              {item.blobUrl && (
                                <button
                                  onClick={() => setPlayingItem(item)}
                                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md transition-all active:scale-95"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>{item.type === 'video' ? 'Xem video' : 'Nghe lại'}</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                                title="Xóa bản ghi"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* LIST / TABLE VIEW (Dạng danh sách cũ) */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800">
            {filtered.map((item) => {
              const langFlag =
                item.language === 'ja'
                  ? '🇯🇵'
                  : item.language === 'zh'
                  ? '🇨🇳'
                  : '🇻🇳'
              const dateFormatted = new Date(item.date).toLocaleString('vi-VN', {
                dateStyle: 'short',
                timeStyle: 'short',
              })

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        item.type === 'video'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-teal-500/10 text-teal-400'
                      }`}
                    >
                      {item.type === 'video' ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{langFlag}</span>
                        <h4 className="font-bold text-sm text-white truncate max-w-sm sm:max-w-md">
                          {item.lessonTitle}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {dateFormatted}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {item.durationSec}s
                        </span>
                        {typeof item.score === 'number' && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 font-semibold text-emerald-400">
                              <Award className="w-3.5 h-3.5" />
                              {item.score} điểm
                            </span>
                          </>
                        )}
                      </div>
                      {item.localPath && (
                        <div className="text-[11px] font-mono text-slate-500 truncate max-w-sm mt-0.5">
                          {item.localPath}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {item.blobUrl && (
                      <button
                        onClick={() => setPlayingItem(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Phát</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Xóa bản ghi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
