import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'

export const RecordingsHistory: React.FC = () => {
  const [recordings, setRecordings] = useState<RecordingItem[]>([])
  const [filterLang, setFilterLang] = useState<string>('all')
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

  const filtered = filterLang === 'all'
    ? recordings
    : recordings.filter(r => r.language === filterLang)

  const totalMinutes = Math.round(recordings.reduce((sum, r) => sum + r.durationSec, 0) / 60)
  const avgScore = recordings.length > 0
    ? Math.round(recordings.reduce((sum, r) => sum + (r.score || 0), 0) / recordings.length)
    : 0

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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterLang('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filterLang === 'all'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Tất cả ({recordings.length})
        </button>
        <button
          onClick={() => setFilterLang('ja')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filterLang === 'ja'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          🇯🇵 Tiếng Nhật ({recordings.filter(r => r.language === 'ja').length})
        </button>
        <button
          onClick={() => setFilterLang('zh')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filterLang === 'zh'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          🇨🇳 Tiếng Trung ({recordings.filter(r => r.language === 'zh').length})
        </button>
        <button
          onClick={() => setFilterLang('vi')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filterLang === 'vi'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          🇻🇳 Tiếng Việt ({recordings.filter(r => r.language === 'vi').length})
        </button>
      </div>

      {/* Video / Audio Player Dialog if selected */}
      {playingItem && playingItem.blobUrl && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-emerald-400 font-semibold block">Đang phát lại bản ghi:</span>
              <h4 className="text-lg font-bold text-white">{playingItem.lessonTitle}</h4>
            </div>
            <button
              onClick={() => setPlayingItem(null)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Đóng trình phát
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-80 flex items-center justify-center">
            {playingItem.type === 'video' ? (
              <video src={playingItem.blobUrl} controls autoPlay className="max-h-80 w-full object-contain" />
            ) : (
              <audio src={playingItem.blobUrl} controls autoPlay className="w-full my-6 px-4" />
            )}
          </div>
        </div>
      )}

      {/* Recordings Table / List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-slate-200">Chưa có bản ghi nào</h4>
          <p className="text-xs text-slate-400 mt-1">
            Hãy qua tab Shadowing để bắt đầu bài đọc và ghi lại video/âm thanh đầu tiên!
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800">
            {filtered.map((item) => {
              const langFlag = item.language === 'ja' ? '🇯🇵' : item.language === 'zh' ? '🇨🇳' : '🇻🇳'
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
