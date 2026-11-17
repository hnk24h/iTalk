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
  furigana?: string // Ruby format: e.g. "初[はじ]めまして、ホアンと申[もう]します。"
  translation: string
  grammarNote?: string
  speakText?: string       // Văn bản dùng riêng cho TTS & chấm điểm (nếu khác text hiển thị)
  mouthShape?: string      // Hướng dẫn khẩu hình miệng (mở rộng, môi tròn, môi dẹt...)
  tonguePosition?: string  // Hướng dẫn cách đặt lưỡi (đầu lưỡi chạm răng trên, uốn cong...)
  breathGuide?: string     // Hướng dẫn luồng hơi & thanh quản (bật hơi, rung thanh đới...)
  startTime?: number // Seconds in original audio file
  endTime?: number   // Seconds in original audio file
}

export interface Lesson {
  id: string
  language: Language
  title: string
  level: string
  category: string
  description?: string
  sentences: LessonSentence[]
  audioSourceType?: 'tts' | 'audio-file'
  originalAudioUrl?: string     // base64 data URL or blob URL
  originalAudioFileName?: string
  audioBlobId?: string           // Key in IndexedDB
  audioDuration?: number        // Total seconds
}

export interface GrammarExample {
  text: string
  furigana?: string // Ruby format (Japanese): 学生[がくせい]です。
  reading?: string  // Pinyin (Chinese) hoặc ghi chú phát âm
  translation: string
}

export interface GrammarPattern {
  id: string
  language: Language
  level: string // N5..N1, HSK 1..HSK 6, Cơ bản, Nâng cao
  pattern: string
  meaning: string
  formula: string
  note?: string | null
  examples: GrammarExample[] // 3-5 ví dụ
}

export interface KaiwaGroup {
  id: string
  language: Language
  level: string
  situation: string
  phrases: GrammarExample[]
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
  cloudUrl?: string
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
  selectAudioFile: () => Promise<{
    filePath: string
    fileName: string
    dataUrl: string
    size: number
  } | null>
  selectTextFile: () => Promise<{
    filePath: string
    fileName: string
    content: string
  } | null>
  saveRecording: (data: { fileName: string; buffer: ArrayBuffer; mimeType: string }) => Promise<{
    success: boolean
    filePath?: string
    fileName?: string
    error?: string
  }>
  openRecordingFolder: (customPath?: string) => Promise<{ success: boolean; error?: string }>
  openRecordingFile: (filePath: string) => Promise<{ success: boolean; error?: string }>
  readRecordingFile: (filePath: string) => Promise<{ success: boolean; dataUrl?: string; mime?: string; error?: string }>
  listLocalRecordings: () => Promise<Array<{
    name: string
    path: string
    size: number
    createdAt: string
    type: 'audio' | 'video'
  }>>
  synthesizeEdgeSpeech: (params: {
    text: string
    voice?: string
    rate?: number
    pitch?: number
  }) => Promise<{ success: boolean; audioDataUrl?: string; error?: string }>
  synthesizeVoiceStudioSpeech: (params: {
    endpoint?: string
    text: string
    voice?: string
    model?: string
    speed?: number
  }) => Promise<{ success: boolean; audioDataUrl?: string; error?: string }>
  synthesizeOpenAISpeech: (params: {
    endpoint?: string
    apiKey?: string
    text: string
    voice?: string
    model?: string
    speed?: number
  }) => Promise<{ success: boolean; audioDataUrl?: string; error?: string }>
  checkVoiceStudioStatus: (endpoint?: string) => Promise<{ online: boolean; endpoint: string; error?: string }>
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
