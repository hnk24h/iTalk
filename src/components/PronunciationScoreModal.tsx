import React, { useEffect } from 'react'
import { ScoreResult } from '../types'
import confetti from 'canvas-confetti'
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FolderOpen,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Play,
} from 'lucide-react'

interface PronunciationScoreModalProps {
  scoreResult: ScoreResult | null
  videoBlobUrl?: string
  localPath?: string
  onClose: () => void
  onRetry: () => void
}

export const PronunciationScoreModal: React.FC<PronunciationScoreModalProps> = ({
  scoreResult,
  videoBlobUrl,
  localPath,
  onClose,
  onRetry,
}) => {
  if (!scoreResult) return null

  const isElectron = Boolean(window.electronAPI?.isElectron)
  const isExcellent = scoreResult.overallScore >= 80

  useEffect(() => {
    if (isExcellent) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        })
      } catch {}
    }
  }, [isExcellent])

  const handleOpenFolder = () => {
    if (window.electronAPI?.openRecordingFolder) {
      window.electronAPI.openRecordingFolder()
    }
  }

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    if (score >= 65) return 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10'
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Score Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div
              className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg ${getScoreColor(
                scoreResult.overallScore
              )}`}
            >
              <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                {scoreResult.overallScore}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Điểm</span>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-xl font-extrabold text-white">Kết quả phát âm</h3>
                {isExcellent && <Trophy className="w-5 h-5 text-amber-400 fill-amber-400" />}
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">{scoreResult.feedback}</p>
            </div>
          </div>

          {/* Quick Accuracy Badge */}
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Độ chính xác: {scoreResult.accuracyPercent}%</span>
          </div>
        </div>

        {/* Word-by-Word Breakdown */}
        <div className="my-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>Chi tiết từng từ phát âm</span>
            <div className="flex items-center gap-3 text-[11px] normal-case">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Chuẩn
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Gần đúng
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Sai/Thiếu
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2 text-base sm:text-lg leading-relaxed">
            {scoreResult.wordBreakdown.map((item, idx) => {
              let bg = 'bg-slate-800 text-slate-200'
              if (item.status === 'correct') {
                bg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              } else if (item.status === 'close') {
                bg = 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              } else if (item.status === 'missed') {
                bg = 'bg-rose-500/20 text-rose-300 border border-rose-500/30 line-through decoration-rose-500'
              }

              return (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded-lg font-medium transition-all ${bg}`}
                >
                  {item.word}
                </span>
              )
            })}
          </div>
        </div>

        {/* Comparison: What you said vs Target */}
        <div className="space-y-2 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-slate-400 block mb-0.5">Giọng bạn vừa nói:</span>
            <span className="text-slate-200 font-mono">
              {scoreResult.spokenText || '(Không nhận diện rõ âm thanh)'}
            </span>
          </div>
        </div>

        {/* Video / Audio Playback of User */}
        {videoBlobUrl && (
          <div className="mb-6">
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              Xem lại video & khẩu hình của bạn:
            </span>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-56 flex items-center justify-center">
              <video
                src={videoBlobUrl}
                controls
                className="max-h-56 w-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Local Saved File Notification (Desktop) */}
        {localPath && isElectron && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-3 text-xs">
            <div className="min-w-0">
              <span className="font-semibold text-emerald-400 block">
                Đã lưu trực tiếp vào ổ đĩa:
              </span>
              <span className="text-slate-300 truncate block font-mono text-[11px]">
                {localPath}
              </span>
            </div>
            <button
              onClick={handleOpenFolder}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex-shrink-0"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Mở thư mục</span>
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose()
              onRetry()
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Đọc lại lần nữa</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-md transition-colors"
          >
            <span>Tiếp tục bài học</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
