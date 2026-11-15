export type Language = 'ja' | 'zh' | 'vi'

export interface LanguageMeta {
  code: Language
  name: string
  nativeName: string
  flag: string
  speechCode: string // e.g. ja-JP, zh-CN, vi-VN
  phoneticLabel: string // Furigana/Romaji, Pinyin, Phiên âm
}

export interface LessonSentence {
  id: string
  text: string
  phonetic?: string // Furigana/Romaji for Japanese, Pinyin for Chinese
  translation: string
  grammarNote?: string
}

export interface Lesson {
  id: string
  language: Language
  title: string
  level: string
  category: string
  description?: string
  sentences: LessonSentence[]
}

export interface WordTokenComparison {
  word: string
  status: 'correct' | 'close' | 'missed' | 'extra'
  confidence?: number
}

export interface ScoreResult {
  overallScore: number // 0 to 100
  accuracyPercent: number
  targetText: string
  spokenText: string
  wordBreakdown: WordTokenComparison[]
  feedback: string
}

export interface RecordingItem {
  id: string
  lessonId?: string
  lessonTitle: string
  language: Language
  date: string
  durationSec: number
  score?: number
  type: 'audio' | 'video'
  blobUrl?: string
  localPath?: string
  fileName?: string
}

export interface DailyGoal {
  targetMinutes: number
  targetLessons: number
}

export interface DayProgress {
  date: string // YYYY-MM-DD
  minutes: number
  lessonsCompleted: number
  scores: number[]
}

export interface UserSchedule {
  streak: number
  lastActiveDate: string
  dailyGoal: DailyGoal
  history: Record<string, DayProgress> // keyed by YYYY-MM-DD
}

export interface ElectronAPI {
  isElectron: boolean
  getRecordingsDir: () => Promise<string>
  selectRecordingFolder: () => Promise<string | null>
  saveRecording: (data: { fileName: string; buffer: ArrayBuffer; mimeType: string }) => Promise<{
    success: boolean
    filePath?: string
    fileName?: string
    error?: string
  }>
  openRecordingFolder: (customPath?: string) => Promise<{ success: boolean; error?: string }>
  listLocalRecordings: () => Promise<Array<{
    name: string
    path: string
    size: number
    createdAt: string
    type: 'audio' | 'video'
  }>>
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
