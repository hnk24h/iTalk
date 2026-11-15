import React, { useState } from 'react'
import { UserSchedule } from '../types'
import {
  Flame,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Target,
  Trophy,
  TrendingUp,
  Sparkles,
} from 'lucide-react'

export const ScheduleTracker: React.FC<{ schedule: UserSchedule }> = ({ schedule }) => {
  const todayStr = new Date().toISOString().split('T')[0]
  const todayProgress = schedule.history[todayStr] || {
    date: todayStr,
    minutes: 0,
    lessonsCompleted: 0,
    scores: [],
  }

  const targetMinutes = schedule.dailyGoal.targetMinutes || 15
  const targetLessons = schedule.dailyGoal.targetLessons || 3

  const minutePercent = Math.min(100, Math.round((todayProgress.minutes / targetMinutes) * 100))
  const lessonPercent = Math.min(100, Math.round((todayProgress.lessonsCompleted / targetLessons) * 100))

  // Generate last 28 days for habit matrix
  const days: Array<{ dateStr: string; dayNum: number; active: boolean; minutes: number }> = []
  for (let i = 27; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const dStr = d.toISOString().split('T')[0]
    const p = schedule.history[dStr]
    days.push({
      dateStr: dStr,
      dayNum: d.getDate(),
      active: Boolean(p && p.minutes > 0),
      minutes: p ? p.minutes : 0,
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner: Streak and Motivation */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20 flex-shrink-0">
            <Flame className="w-9 h-9 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">
                Chuỗi luyện tập: {schedule.streak} ngày liên tục!
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              "Nguyên lý Shadowing: 15 phút nhại giọng bản xứ mỗi ngày tạo phản xạ thần kinh vượt trội hơn học dồn 2 tiếng cuối tuần."
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 text-center w-full md:w-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Mục tiêu hôm nay
          </div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">
            {todayProgress.minutes >= targetMinutes ? 'ĐÃ HOÀN THÀNH' : `${todayProgress.minutes} / ${targetMinutes} phút`}
          </div>
        </div>
      </div>

      {/* Today's Goal Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Minutes Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm text-white">Thời lượng luyện hôm nay</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {todayProgress.minutes} / {targetMinutes} phút
            </span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-2">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${minutePercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400">
            {minutePercent >= 100
              ? '🎉 Xuất sắc! Bạn đã đạt chỉ tiêu thời gian hôm nay.'
              : `Còn ${targetMinutes - todayProgress.minutes} phút nữa để đạt mục tiêu ngày.`}
          </span>
        </div>

        {/* Lessons Completed Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-400" />
              <span className="font-bold text-sm text-white">Số bài shadowing hoàn thành</span>
            </div>
            <span className="text-xs font-mono font-bold text-teal-400">
              {todayProgress.lessonsCompleted} / {targetLessons} bài
            </span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-2">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${lessonPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400">
            {lessonPercent >= 100
              ? '🎉 Tuyệt vời! Bạn đã hoàn thành các bài học đề ra.'
              : `Còn ${targetLessons - todayProgress.lessonsCompleted} bài nữa để hoàn thành.`}
          </span>
        </div>
      </div>

      {/* 28-Day Habit Heatmap / Calendar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Bản đồ thói quen luyện tập (28 ngày gần nhất)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Tối thiểu 15p/ngày</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2.5">
          {days.map((d) => {
            const isToday = d.dateStr === todayStr
            let bg = 'bg-slate-950 border-slate-800 text-slate-500'
            if (d.active) {
              if (d.minutes >= 15) {
                bg = 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              } else {
                bg = 'bg-emerald-500/30 border-emerald-500/40 text-emerald-300 font-semibold'
              }
            }

            return (
              <div
                key={d.dateStr}
                title={`${d.dateStr}: ${d.minutes} phút luyện tập`}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-xs transition-transform hover:scale-105 cursor-pointer relative ${bg} ${
                  isToday ? 'ring-2 ring-amber-400' : ''
                }`}
              >
                <span>{d.dayNum}</span>
                {d.active && <span className="text-[9px] font-mono opacity-80">{d.minutes}m</span>}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <span>Ngày có viền vàng: Hôm nay</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-950 border border-slate-800 inline-block" /> Chưa học
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500/30 border border-emerald-500/40 inline-block" /> &lt; 15 phút
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500 border border-emerald-400 inline-block" /> Hoàn thành (&ge; 15 phút)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
