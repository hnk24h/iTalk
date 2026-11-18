import { RecordingItem, UserSchedule, Lesson, Language, LessonProgress } from '../types'
import { storeRecordingBlob, deleteRecordingBlob } from './audioDb'

const SCHEDULE_KEY = 'italk_schedule_v1'
const RECORDINGS_KEY = 'italk_recordings_v1'
const CUSTOM_LESSONS_KEY = 'italk_custom_lessons_v1'
const SETTINGS_KEY = 'italk_settings_v1'
const LESSON_PROGRESS_KEY = 'italk_lesson_progress_v1'

export type TTSEngineType = 'edge' | 'voicestudio' | 'openai' | 'system'
export type AppTheme = 'dark' | 'light' | 'system'

export interface AppSettings {
  defaultLanguage: Language
  speechRate: number
  recordVideo: boolean
  localRecordingsDir: string
  theme?: AppTheme
  selectedAudioInputId?: string
  selectedAudioOutputId?: string
  selectedVideoInputId?: string
  ttsMode?: 'neural' | 'local'
  ttsEngine?: TTSEngineType
  edgeVoiceJa?: string
  edgeVoiceZh?: string
  edgeVoiceVi?: string
  voiceStudioEndpoint?: string
  voiceStudioModel?: string
  voiceStudioVoice?: string
  openaiEndpoint?: string
  openaiApiKey?: string
  openaiModel?: string
  openaiVoice?: string
  preferredVoiceUri?: string
}

export const defaultSettings: AppSettings = {
  defaultLanguage: 'ja',
  speechRate: 1.0,
  recordVideo: true,
  localRecordingsDir: '',
  theme: 'dark',
  selectedAudioInputId: '',
  selectedAudioOutputId: '',
  selectedVideoInputId: '',
  ttsMode: 'neural',
  ttsEngine: 'edge',
  edgeVoiceJa: 'ja-JP-NanamiNeural',
  edgeVoiceZh: 'zh-CN-XiaoxiaoNeural',
  edgeVoiceVi: 'vi-VN-HoaiMyNeural',
  voiceStudioEndpoint: 'http://127.0.0.1:3900',
  voiceStudioModel: 'tts-1',
  voiceStudioVoice: 'default',
  openaiEndpoint: 'https://api.openai.com/v1',
  openaiApiKey: '',
  openaiModel: 'tts-1',
  openaiVoice: 'nova',
  preferredVoiceUri: '',
}

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return defaultSettings
    const parsed = JSON.parse(raw)
    // Migrate legacy default values
    if (parsed.voiceStudioVoice === 'ja_female') {
      parsed.voiceStudioVoice = 'default'
    }
    if (parsed.voiceStudioModel === 'cosyvoice') {
      parsed.voiceStudioModel = 'tts-1'
    }
    return { ...defaultSettings, ...parsed }
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  const current = loadSettings()
  const updated = { ...current, ...settings }
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated))
  } catch {}
  return updated
}

export function loadSchedule(): UserSchedule {
  const defaultSchedule: UserSchedule = {
    streak: 0,
    lastActiveDate: '',
    dailyGoal: {
      targetMinutes: 15,
      targetLessons: 3,
    },
    history: {},
  }

  if (typeof window === 'undefined') return defaultSchedule
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY)
    if (!raw) return defaultSchedule
    return { ...defaultSchedule, ...JSON.parse(raw) }
  } catch {
    return defaultSchedule
  }
}

export function saveSchedule(schedule: UserSchedule): UserSchedule {
  try {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule))
  } catch {}
  return schedule
}

export function recordDayActivity(minutes: number, score?: number): UserSchedule {
  const schedule = loadSchedule()
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  // Check streak
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (schedule.lastActiveDate === yesterday) {
    schedule.streak += 1
  } else if (schedule.lastActiveDate !== today) {
    // If not today and not yesterday, reset streak to 1
    schedule.streak = 1
  }
  schedule.lastActiveDate = today

  // Update today's progress
  if (!schedule.history[today]) {
    schedule.history[today] = {
      date: today,
      minutes: 0,
      lessonsCompleted: 0,
      scores: [],
    }
  }

  schedule.history[today].minutes += minutes
  schedule.history[today].lessonsCompleted += 1
  if (typeof score === 'number') {
    schedule.history[today].scores.push(score)
  }

  try {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule))
  } catch {}

  // Non-blocking cloud sync if Supabase is enabled
  if (typeof window !== 'undefined') {
    import('./supabase')
      .then((sb) => sb.syncScheduleToCloud(schedule).catch(() => {}))
      .catch(() => {})
  }

  return schedule
}

export function loadRecordings(): RecordingItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECORDINGS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function saveRecordingEntry({
  lessonId,
  lessonTitle,
  language,
  durationSec,
  score,
  type,
  blob,
  mimeType,
}: {
  lessonId?: string
  lessonTitle: string
  language: Language
  durationSec: number
  score?: number
  type: 'audio' | 'video'
  blob: Blob
  mimeType: string
}): Promise<RecordingItem> {
  const dateStr = new Date().toISOString()
  const cleanTitle = lessonTitle.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)
  const ext = type === 'video' ? 'webm' : 'wav'
  const fileName = `${new Date().toISOString().replace(/[:.]/g, '-')}_${language}_${cleanTitle}.${ext}`

  let localPath: string | undefined

  // If running in Electron, save directly to local folder via native IPC!
  if (window.electronAPI?.isElectron) {
    try {
      const buffer = await blob.arrayBuffer()
      const res = await window.electronAPI.saveRecording({
        fileName,
        buffer,
        mimeType,
      })
      if (res.success) {
        localPath = res.filePath
      }
    } catch (err) {
      console.error('Failed to save recording to Electron local filesystem:', err)
    }
  }

  const blobUrl = URL.createObjectURL(blob)

  const item: RecordingItem = {
    id: `rec-${Date.now()}`,
    lessonId,
    lessonTitle,
    language,
    date: dateStr,
    durationSec,
    score,
    type,
    blobUrl,
    localPath,
    fileName,
  }

  const current = loadRecordings()
  current.unshift(item)
  try {
    // Only persist metadata to localStorage, keep latest 50
    const toSave = current.slice(0, 50).map(r => ({
      ...r,
      blobUrl: undefined, // URLs expire across reloads
    }))
    localStorage.setItem(RECORDINGS_KEY, JSON.stringify(toSave))
  } catch {}

  // Persist the actual binary blob in IndexedDB for web offline / reload playback
  try {
    await storeRecordingBlob(item.id, blob)
  } catch (err) {
    console.warn('Failed to store recording in IndexedDB:', err)
  }

  // Update schedule
  recordDayActivity(Math.max(1, Math.round(durationSec / 60)), score)

  // Non-blocking upload & metadata sync to Supabase Cloud
  if (typeof window !== 'undefined') {
    import('./supabase')
      .then(async (sb) => {
        if (sb.isSupabaseConfigured()) {
          window.dispatchEvent(
            new CustomEvent('italk:cloud-sync', {
              detail: { status: 'uploading', message: 'Đang tải bản ghi lên Supabase Storage...' },
            })
          )
          const uploadRes = await sb.uploadRecordingToStorage(fileName, blob)
          if (uploadRes.url) {
            item.cloudUrl = uploadRes.url
            await sb.saveRecordingMetadataToCloud(item, uploadRes.url)

            // Update cloudUrl in local metadata
            const recs = loadRecordings()
            const idx = recs.findIndex(r => r.id === item.id)
            if (idx >= 0) {
              recs[idx].cloudUrl = uploadRes.url
              try {
                localStorage.setItem(RECORDINGS_KEY, JSON.stringify(recs.slice(0, 50).map(r => ({ ...r, blobUrl: undefined }))))
              } catch {}
            }

            window.dispatchEvent(
              new CustomEvent('italk:cloud-sync', {
                detail: {
                  status: 'success',
                  message: 'Đã tải bản ghi lên Supabase Storage thành công!',
                  url: uploadRes.url,
                },
              })
            )
          } else {
            console.warn('Supabase upload failed:', uploadRes.error)
            window.dispatchEvent(
              new CustomEvent('italk:cloud-sync', {
                detail: {
                  status: 'error',
                  message: `Không thể tải lên Supabase: ${uploadRes.error || 'Vui lòng kiểm tra Bucket hoặc SQL'}`,
                },
              })
            )
          }
        }
      })
      .catch((err) => {
        console.warn('Supabase sync import error:', err)
      })
  }

  return item
}

export function deleteRecordingEntry(id: string): RecordingItem[] {
  const current = loadRecordings()
  const next = current.filter(r => r.id !== id)
  try {
    localStorage.setItem(RECORDINGS_KEY, JSON.stringify(next))
  } catch {}

  deleteRecordingBlob(id).catch(() => {})

  return next
}

export function loadCustomLessons(): Lesson[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CUSTOM_LESSONS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveCustomLesson(lesson: Lesson): Lesson[] {
  const current = loadCustomLessons()
  const existingIdx = current.findIndex(l => l.id === lesson.id)
  if (existingIdx >= 0) {
    current[existingIdx] = lesson
  } else {
    current.unshift(lesson)
  }
  try {
    localStorage.setItem(CUSTOM_LESSONS_KEY, JSON.stringify(current))
  } catch {}

  // Non-blocking sync to Supabase Cloud
  if (typeof window !== 'undefined') {
    import('./supabase')
      .then((sb) => sb.syncCustomLessonsToCloud(current).catch(() => {}))
      .catch(() => {})
  }

  return current
}

export function loadAllLessonProgress(): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(LESSON_PROGRESS_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function saveAllLessonProgress(progressMap: Record<string, LessonProgress>): void {
  try {
    localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(progressMap))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('italk:lesson-progress-updated', { detail: progressMap }))
    }
  } catch {}
}

export function getLessonProgress(lessonId: string): LessonProgress | undefined {
  const all = loadAllLessonProgress()
  return all[lessonId]
}

export function recordLessonViewed(lessonId: string, language: Language, totalSentences: number): LessonProgress {
  const all = loadAllLessonProgress()
  const existing = all[lessonId] || {
    lessonId,
    language,
    hasViewed: false,
    practicedCount: 0,
    practicedSentences: [],
    sentenceScores: {},
    progressPercent: 0,
    isCompleted: false,
  }

  const now = new Date().toISOString()
  if (!existing.hasViewed) {
    existing.hasViewed = true
    existing.firstViewedAt = now
  }
  existing.lastViewedAt = now

  all[lessonId] = existing
  saveAllLessonProgress(all)
  return existing
}

export function recordSentencePractice(
  lessonId: string,
  language: Language,
  sentenceIdx: number,
  totalSentences: number,
  score: number
): LessonProgress {
  const all = loadAllLessonProgress()
  const existing = all[lessonId] || {
    lessonId,
    language,
    hasViewed: true,
    practicedCount: 0,
    practicedSentences: [],
    sentenceScores: {},
    progressPercent: 0,
    isCompleted: false,
  }

  const now = new Date().toISOString()
  existing.hasViewed = true
  existing.lastViewedAt = now
  existing.lastPracticedAt = now
  existing.practicedCount = (existing.practicedCount || 0) + 1
  existing.lastScore = score
  existing.bestScore = Math.max(existing.bestScore || 0, score)

  if (!existing.practicedSentences) existing.practicedSentences = []
  if (!existing.sentenceScores) existing.sentenceScores = {}

  if (!existing.practicedSentences.includes(sentenceIdx)) {
    existing.practicedSentences.push(sentenceIdx)
    existing.practicedSentences.sort((a, b) => a - b)
  }

  existing.sentenceScores[sentenceIdx] = Math.max(existing.sentenceScores[sentenceIdx] || 0, score)

  const count = existing.practicedSentences.length
  const total = Math.max(1, totalSentences)
  existing.progressPercent = Math.min(100, Math.round((count / total) * 100))
  if (existing.progressPercent >= 100) {
    existing.isCompleted = true
  }

  all[lessonId] = existing
  saveAllLessonProgress(all)
  return existing
}
