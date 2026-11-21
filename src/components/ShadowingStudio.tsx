import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Language, Lesson, LessonSentence, ScoreResult, LessonProgress, LearningStatus, StudyPlan } from '../types'
import { supportedLanguages } from '../data/languages'
import { getAllLessonsForLanguage } from '../services/cms'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer, SpeechStatus, transcribeAudioWithOpenAI } from '../services/speech'
import { MediaRecordingManager } from '../services/mediaRecorder'
import { evaluatePronunciation } from '../services/scoring'
import {
  saveRecordingEntry,
  loadCustomLessons,
  saveCustomLesson,
  loadSettings,
  loadAllLessonProgress,
  recordLessonViewed,
  recordSentencePractice,
} from '../services/storage'
import { getAudioBlob } from '../services/audioDb'
import { loadStudyPlan, getTodayStudyPlanDay } from '../services/studyPlan'
import { setAudioOutputDevice } from '../services/deviceManager'
import { FuriganaText } from '../services/furigana'
import { AudioImporterModal } from './AudioImporterModal'
import confetti from 'canvas-confetti'
import {
  Volume2,
  Square,
  Mic,
  Video,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  PlusCircle,
  HelpCircle,
  Radio,
  FileText,
  FileAudio,
  Headphones,
  Sparkles,
  BookOpen,
  Zap,
  MousePointer,
  Search,
  Check,
  FastForward,
  Rewind,
  Menu,
  X,
  Layers,
  Camera,
  CameraOff,
  AlertTriangle,
  Lock,
  CheckCircle2,
  AlertCircle,
  Tag,
  GraduationCap,
  SlidersHorizontal,
  Eye,
  Circle,
  Trophy,
  Clock,
  List,
  VolumeX,
  Film,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  ArrowRight,
  FolderOpen,
  Target,
} from 'lucide-react'

export const PASS_SCORE = 70

export const JA_LEVEL_INFO: Record<string, { title: string; desc: string; icon: string }> = {
  Kana: { title: 'Bảng chữ cái Kana', desc: 'Hiragana, Katakana & Khẩu hình miệng', icon: '🔤' },
  N5: { title: 'Cấp độ N5', desc: 'Cơ bản & Nhập môn giao tiếp', icon: '🔰' },
  N4: { title: 'Cấp độ N4', desc: 'Sơ trung cấp & Đời sống', icon: '📘' },
  N3: { title: 'Cấp độ N3', desc: 'Trung cấp & Công sở', icon: '📙' },
  N2: { title: 'Cấp độ N2', desc: 'Trung cao cấp & Đàm phán', icon: '📕' },
  N1: { title: 'Cấp độ N1', desc: 'Cao cấp & Chiến lược', icon: '👑' },
}

export const ZH_LEVEL_INFO: Record<string, { title: string; desc: string; icon: string }> = {
  Pinyin: { title: 'Bính âm & Ngữ âm', desc: 'Thanh mẫu, Vận mẫu & 4 Thanh điệu', icon: '🔤' },
  'HSK 1': { title: 'Cấp độ HSK 1', desc: 'Sơ cấp cơ bản (150 từ)', icon: '🌱' },
  'HSK 2': { title: 'Cấp độ HSK 2', desc: 'Giao tiếp hàng ngày (300 từ)', icon: '🌿' },
  'HSK 3': { title: 'Cấp độ HSK 3', desc: 'Trung cấp đời sống (600 từ)', icon: '📘' },
  'HSK 4': { title: 'Cấp độ HSK 4', desc: 'Thành thạo công sở (1200 từ)', icon: '📙' },
  'HSK 5': { title: 'Cấp độ HSK 5', desc: 'Nâng cao & Báo chí (2500 từ)', icon: '📕' },
  'HSK 6': { title: 'Cấp độ HSK 6', desc: 'Chuyên gia & Bản xứ (5000+ từ)', icon: '👑' },
}

export const VI_LEVEL_INFO: Record<string, { title: string; desc: string; icon: string }> = {
  'Chữ cái': { title: 'Bảng chữ cái & Thanh điệu', desc: 'Nguyên âm, Phụ âm & Khẩu hình chuẩn', icon: '🔤' },
  'Cơ bản': { title: 'Cơ bản', desc: 'Ngữ âm chuẩn & Luyện dấu', icon: '🌱' },
  'Nâng cao': { title: 'Nâng cao', desc: 'Thuyết trình chuyên nghiệp', icon: '👑' },
}

export type LessonAdvanceMode = 'auto' | 'manual'

interface ShadowingStudioProps {
  currentLang: Language
  onPracticeComplete?: () => void
  initialLessonId?: string
  onConsumeInitialLesson?: () => void
  onOpenStudyPlan?: () => void
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export const ShadowingStudio: React.FC<ShadowingStudioProps> = ({
  currentLang,
  onPracticeComplete,
  initialLessonId,
  onConsumeInitialLesson,
  onOpenStudyPlan,
}) => {
  const langMeta = supportedLanguages.find((l) => l.code === currentLang) || supportedLanguages[0]

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [activeLessonId, setActiveLessonId] = useState<string>('')
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(0)
  // Tracking scores for each sentence: key = `${lessonId}_${sentenceIdx}`
  const [sentenceScores, setSentenceScores] = useState<Record<string, number>>({})

  // 2 Transition Modes: Auto next lesson vs Manual user selection
  const [advanceMode, setAdvanceMode] = useState<LessonAdvanceMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('italk_lesson_advance_mode') as LessonAdvanceMode) || 'auto'
    }
    return 'auto'
  })

  // Japanese Furigana ruby display toggle
  const [showFurigana, setShowFurigana] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('italk_show_furigana')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  const toggleFurigana = () => {
    setShowFurigana((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('italk_show_furigana', String(next))
      }
      return next
    })
  }

  // Sidebar Filter, Search & Layout Mode
  const [searchQuery, setSearchQuery] = useState('')
  const [lessonFilter, setLessonFilter] = useState<'all' | 'native' | 'tts'>('all')
  const [statusFilter, setStatusFilter] = useState<LearningStatus>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showSidebarFilters, setShowSidebarFilters] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)

  // Persistent lesson learning progress state
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, LessonProgress>>(() =>
    loadAllLessonProgress()
  )
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(() => loadStudyPlan(currentLang))

  // Listen to progress updates across tabs/windows
  useEffect(() => {
    const handleProgressUpdate = (e: any) => {
      if (e.detail) {
        setLessonProgressMap(e.detail)
      }
    }
    window.addEventListener('italk:lesson-progress-updated', handleProgressUpdate)
    return () => {
      window.removeEventListener('italk:lesson-progress-updated', handleProgressUpdate)
    }
  }, [])

  // Sync active Study Plan on language change or plan updates
  useEffect(() => {
    setStudyPlan(loadStudyPlan(currentLang))
    const handlePlanUpdate = () => setStudyPlan(loadStudyPlan(currentLang))
    window.addEventListener('italk:study-plan-updated', handlePlanUpdate)
    return () => window.removeEventListener('italk:study-plan-updated', handlePlanUpdate)
  }, [currentLang])

  // Reset filters when switching languages
  useEffect(() => {
    setSelectedLevel('all')
    setSelectedCategory('all')
    setStatusFilter('all')
    setSearchQuery('')
  }, [currentLang])

  // Toast Notification (e.g. when auto-jumping to next lesson)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastTimeoutRef = useRef<any>(null)

  // Audio/Playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [speechRate, setSpeechRate] = useState<number>(1.0)
  const [autoLoop, setAutoLoop] = useState(false)
  const [audioSourceMode, setAudioSourceMode] = useState<'native' | 'tts'>('tts')
  const [nativeAudioCurrentTime, setNativeAudioCurrentTime] = useState<number>(0)

  // Media Video Player & Synchronization state
  const [mediaUrl, setMediaUrl] = useState<string>('')
  const [isPlayingMedia, setIsPlayingMedia] = useState(false)
  const [isPlayingTtsSequence, setIsPlayingTtsSequence] = useState(false)
  const [mediaCurrentTime, setMediaCurrentTime] = useState<number>(0)
  const [mediaDuration, setMediaDuration] = useState<number>(0)
  const [isLoopSentence, setIsLoopSentence] = useState(false)
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)
  const [isMediaMuted, setIsMediaMuted] = useState(false)
  const [expandedGuides, setExpandedGuides] = useState<Record<number, boolean>>({})
  const [showScriptTranslation, setShowScriptTranslation] = useState(true)

  // Recording state
  const [recordMode, setRecordMode] = useState<'video' | 'audio'>('video')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [realtimeTranscript, setRealtimeTranscript] = useState('')
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus | null>(null)
  const [isTranscribingWhisper, setIsTranscribingWhisper] = useState(false)
  const realtimeTranscriptRef = useRef('')

  // Modals state
  const [showAddCustom, setShowAddCustom] = useState(false)
  const [showAudioImporter, setShowAudioImporter] = useState(false)
  const [showWebcamModal, setShowWebcamModal] = useState(false)
  const [modalScoreResult, setModalScoreResult] = useState<ScoreResult | null>(null)
  const [modalRecordingUrl, setModalRecordingUrl] = useState<string | undefined>(undefined)
  const [modalRecordingType, setModalRecordingType] = useState<'audio' | 'video'>('video')
  const [modalLocalPath, setModalLocalPath] = useState<string | undefined>(undefined)
  const [showModalMouthGuide, setShowModalMouthGuide] = useState(false)
  const modalRecordingUrlRef = useRef<string | undefined>(undefined)
  const modalKeyHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null)
  const [customTitle, setCustomTitle] = useState('')
  const [customText, setCustomText] = useState('')
  const [customTranslation, setCustomTranslation] = useState('')

  // Live Camera Preview & Permissions
  const [isPreviewCam, setIsPreviewCam] = useState(false)
  const previewStreamRef = useRef<MediaStream | null>(null)
  const [mediaPermissionError, setMediaPermissionError] = useState<string | null>(null)

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null)
  const mediaVideoRef = useRef<HTMLVideoElement | null>(null)
  const scriptContainerRef = useRef<HTMLDivElement | null>(null)
  const scriptItemRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const mediaRecorderRef = useRef<MediaRecordingManager>(new MediaRecordingManager())
  const speechRecognizerRef = useRef<SpeechRecognizer>(new SpeechRecognizer())
  const timerIntervalRef = useRef<any>(null)
  const audioCheckIntervalRef = useRef<any>(null)
  const activeLessonRef = useRef<HTMLDivElement | null>(null)
  const sidebarListRef = useRef<HTMLDivElement | null>(null)
  const addMenuRef = useRef<HTMLDivElement | null>(null)
  const isTtsSequenceRunningRef = useRef(false)
  const ttsSequenceTimeoutRef = useRef<any>(null)
  const isLoopSentenceRef = useRef(isLoopSentence)
  const speechRateRef = useRef(speechRate)

  useEffect(() => {
    isLoopSentenceRef.current = isLoopSentence
  }, [isLoopSentence])

  useEffect(() => {
    speechRateRef.current = speechRate
  }, [speechRate])

  useEffect(() => {
    if (!showAddMenu) return
    const handleOutside = (e: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) {
        setShowAddMenu(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [showAddMenu])

  const [cmsVersion, setCmsVersion] = useState(0)
  const prevLangRef = useRef<Language | null>(null)

  useEffect(() => {
    const handleCmsUpdated = () => setCmsVersion((v) => v + 1)
    window.addEventListener('italk:cms-content-updated', handleCmsUpdated)
    return () => window.removeEventListener('italk:cms-content-updated', handleCmsUpdated)
  }, [])

  // Load lessons for current language (prioritizing today's Study Plan lesson if active)
  useEffect(() => {
    const isSameLangRefresh = prevLangRef.current === currentLang
    prevLangRef.current = currentLang

    const builtin = getAllLessonsForLanguage(currentLang)
    const custom = loadCustomLessons().filter((l) => l.language === currentLang)
    const combined = [...builtin, ...custom]
    setLessons(combined)
    if (combined.length > 0) {
      if (initialLessonId && combined.some((l) => l.id === initialLessonId)) {
        setActiveLessonId(initialLessonId)
        setCurrentSentenceIdx(0)
        onConsumeInitialLesson?.()
      } else if (isSameLangRefresh && combined.some((l) => l.id === activeLessonId)) {
        // Keep current lesson selection on live CMS refresh
      } else {
        const plan = loadStudyPlan(currentLang)
        const todayDay = getTodayStudyPlanDay(plan)
        let prioritizedLesson: Lesson | undefined
        if (plan && todayDay && todayDay.shadowingLessonIds.length > 0) {
          const progMap = loadAllLessonProgress()
          const byId = new Map(combined.map((l) => [l.id, l]))
          const todayMatches = todayDay.shadowingLessonIds
            .map((id) => byId.get(id))
            .filter((l): l is Lesson => Boolean(l))
          prioritizedLesson =
            todayMatches.find((l) => {
              if (plan.completedShadowingIds?.includes(l.id)) return false
              const p = progMap[l.id]
              return !(p && (p.isCompleted || (p.progressPercent ?? 0) >= 100))
            }) || todayMatches[0]
        }
        setActiveLessonId((prioritizedLesson || combined[0]).id)
        setCurrentSentenceIdx(0)
      }
    }
  }, [currentLang, cmsVersion])

  // Open a specific lesson when navigated from ScheduleTracker
  useEffect(() => {
    if (!initialLessonId || lessons.length === 0) return
    const target = lessons.find((l) => l.id === initialLessonId)
    if (target) {
      setActiveLessonId(target.id)
      setCurrentSentenceIdx(0)
      const updated = recordLessonViewed(target.id, currentLang, target.sentences.length)
      setLessonProgressMap((prev) => ({ ...prev, [target.id]: updated }))
      onConsumeInitialLesson?.()
    }
  }, [initialLessonId, lessons])

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0]
  const currentSentence: LessonSentence | undefined = activeLesson?.sentences[currentSentenceIdx]

  // Persist advance mode change
  const handleSetAdvanceMode = (mode: LessonAdvanceMode) => {
    setAdvanceMode(mode)
    try {
      localStorage.setItem('italk_lesson_advance_mode', mode)
    } catch {}
    triggerToast(
      mode === 'auto'
        ? '⚡ Đã bật: Tự động nhảy sang bài tiếp theo khi hết câu'
        : '👆 Đã bật: Người dùng tự chọn bài thủ công'
    )
  }

  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToastMessage(msg)
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Auto-scroll active lesson into view INSIDE Sidebar container (never scrolls outer page)
  useEffect(() => {
    const container = sidebarListRef.current
    const item = activeLessonRef.current
    if (!container || !item) return
    const cRect = container.getBoundingClientRect()
    const iRect = item.getBoundingClientRect()
    if (iRect.top < cRect.top || iRect.bottom > cRect.bottom) {
      const targetTop =
        iRect.top - cRect.top + container.scrollTop - container.clientHeight / 2 + item.clientHeight / 2
      container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    }
  }, [activeLessonId, isSidebarCollapsed])

  // Load original audio blob from IndexedDB if needed
  useEffect(() => {
    if (activeLesson) {
      if (activeLesson.videoUrl) {
        setMediaUrl(activeLesson.videoUrl)
        setAudioSourceMode('native')
      } else if (activeLesson.originalAudioUrl) {
        setMediaUrl(activeLesson.originalAudioUrl)
        setAudioSourceMode('native')
      } else if (activeLesson.audioBlobId) {
        getAudioBlob(activeLesson.audioBlobId).then((res) => {
          if (res) {
            const url = URL.createObjectURL(res.blob)
            activeLesson.originalAudioUrl = url
            setMediaUrl(url)
            setAudioSourceMode('native')
          } else {
            setMediaUrl('')
            setAudioSourceMode('tts')
          }
        })
      } else {
        setMediaUrl('')
        setAudioSourceMode('tts')
      }
    } else {
      setMediaUrl('')
    }
  }, [activeLessonId, activeLesson])

  const isVideoFile = useMemo(() => {
    if (activeLesson?.mediaType === 'video' || activeLesson?.videoUrl) return true
    const fileName = activeLesson?.originalAudioFileName || ''
    return /\.(mp4|webm|mkv|mov|avi)$/i.test(fileName)
  }, [activeLesson])

  const currentMediaSrc = mediaUrl || activeLesson?.videoUrl || activeLesson?.originalAudioUrl || ''

  // Stop playback when lesson changes or unmounts
  useEffect(() => {
    stopPlayback()
    setRealtimeTranscript('')
    setMediaCurrentTime(0)
    scriptItemRefs.current = {}
  }, [activeLessonId])

  useEffect(() => {
    setRealtimeTranscript('')
  }, [currentSentenceIdx])

  // Internal auto-scroll ONLY inside the Live Script Panel (never scrolls the outer page)
  useEffect(() => {
    if (!isAutoScrollEnabled) return
    const container = scriptContainerRef.current
    const item = scriptItemRefs.current[currentSentenceIdx]
    if (!container || !item) return
    const containerRect = container.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const relativeTop = itemRect.top - containerRect.top + container.scrollTop
    const targetScrollTop = relativeTop - container.clientHeight / 2 + item.clientHeight / 2
    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    })
  }, [currentSentenceIdx, isAutoScrollEnabled, activeLessonId])

  // Keyboard shortcuts inside Speaking Practice Modal (Escape & Space)
  useEffect(() => {
    if (!showWebcamModal) return
    const handleKeyDown = (e: KeyboardEvent) => {
      modalKeyHandlerRef.current?.(e)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showWebcamModal])

  useEffect(() => {
    const handleCloudSync = (e: any) => {
      const { message } = e.detail || {}
      if (message) {
        triggerToast(message)
      }
    }
    window.addEventListener('italk:cloud-sync', handleCloudSync)

    return () => {
      window.removeEventListener('italk:cloud-sync', handleCloudSync)
      isTtsSequenceRunningRef.current = false
      if (ttsSequenceTimeoutRef.current) clearTimeout(ttsSequenceTimeoutRef.current)
      stopPlayback()
      stopCamPreview()
      speechRecognizerRef.current.abort()
      if (modalRecordingUrlRef.current?.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(modalRecordingUrlRef.current)
        } catch {}
        modalRecordingUrlRef.current = undefined
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (audioCheckIntervalRef.current) clearInterval(audioCheckIntervalRef.current)
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  const stopCamPreview = () => {
    if (previewStreamRef.current) {
      previewStreamRef.current.getTracks().forEach((t) => {
        try {
          t.stop()
        } catch {}
      })
      previewStreamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsPreviewCam(false)
  }

  const toggleCamPreview = async () => {
    if (isPreviewCam) {
      stopCamPreview()
      return
    }

    setMediaPermissionError(null)

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const msg =
        'Trình duyệt yêu cầu truy cập qua http://localhost:5173 hoặc https:// để mở Camera & Micro!'
      setMediaPermissionError(msg)
      alert(msg)
      return
    }

    try {
      const currentSettings = loadSettings()
      const videoConstraint: MediaTrackConstraints = {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user',
      }
      if (currentSettings.selectedVideoInputId && currentSettings.selectedVideoInputId !== 'default' && currentSettings.selectedVideoInputId !== '') {
        videoConstraint.deviceId = { ideal: currentSettings.selectedVideoInputId }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraint,
        audio: false,
      })

      previewStreamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.muted = true
        videoRef.current.play().catch(() => {})
      }
      setIsPreviewCam(true)
      setMediaPermissionError(null)
    } catch (err: any) {
      console.error('Camera preview error:', err)
      const name = err.name || ''
      let msg = err.message || 'Không thể mở Camera trên trình duyệt.'
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || msg.includes('Permission denied')) {
        msg =
          'Trình duyệt chưa được cấp quyền mở Camera / Micro!\n👉 Hãy bấm vào biểu tượng Ổ khóa / Camera trên thanh địa chỉ URL (bên cạnh http://localhost:5173) và chọn "Cho phép" (Allow).'
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        msg = 'Không tìm thấy thiết bị Camera nào cắm vào máy tính.'
      } else if (name === 'NotReadableError' || name === 'TrackStartError') {
        msg =
          'Camera đang bị ứng dụng khác sử dụng (như Zoom, Teams, Zalo, Discord). Hãy tắt các ứng dụng đó và bấm thử lại.'
      }
      setMediaPermissionError(msg)
      alert(msg)
    }
  }

  const stopPlayback = () => {
    isTtsSequenceRunningRef.current = false
    setIsPlayingTtsSequence(false)
    if (ttsSequenceTimeoutRef.current) {
      clearTimeout(ttsSequenceTimeoutRef.current)
      ttsSequenceTimeoutRef.current = null
    }
    stopTextToSpeech()
    if (mediaVideoRef.current) {
      try {
        mediaVideoRef.current.pause()
      } catch {}
      setIsPlayingMedia(false)
    }
    if (nativeAudioRef.current) {
      try {
        nativeAudioRef.current.pause()
      } catch {}
    }
    if (audioCheckIntervalRef.current) {
      clearInterval(audioCheckIntervalRef.current)
      audioCheckIntervalRef.current = null
    }
    setIsPlayingAudio(false)
  }

  const clearModalResult = () => {
    if (modalRecordingUrlRef.current?.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(modalRecordingUrlRef.current)
      } catch {}
    }
    modalRecordingUrlRef.current = undefined
    setModalScoreResult(null)
    setModalRecordingUrl(undefined)
    setModalLocalPath(undefined)
    setSpeechError(null)
    setSpeechStatus(null)
  }

  // Open / Close Webcam & Shadowing Studio Modal
  const openWebcamModalForSentence = (idx?: number) => {
    stopPlayback()
    clearModalResult()
    setShowModalMouthGuide(false)
    realtimeTranscriptRef.current = ''
    setRealtimeTranscript('')
    if (typeof idx === 'number') {
      setCurrentSentenceIdx(idx)
    }
    setShowWebcamModal(true)
  }

  const handleCloseWebcamModal = () => {
    if (isRecording) {
      triggerToast('⚠️ Đang ghi âm! Hãy bấm "Dừng & Chấm điểm" trước khi đóng.')
      return
    }
    stopPlayback()
    stopCamPreview()
    speechRecognizerRef.current.abort()
    clearModalResult()
    setShowModalMouthGuide(false)
    setShowWebcamModal(false)
  }

  // Play sentences sequentially with AI TTS (when lesson has no video/audio file)
  const playTtsSequenceFrom = (startIdx: number) => {
    if (!activeLesson || !activeLesson.sentences.length || startIdx >= activeLesson.sentences.length) {
      isTtsSequenceRunningRef.current = false
      setIsPlayingTtsSequence(false)
      setIsPlayingAudio(false)
      return
    }

    if (ttsSequenceTimeoutRef.current) {
      clearTimeout(ttsSequenceTimeoutRef.current)
      ttsSequenceTimeoutRef.current = null
    }
    stopTextToSpeech()

    const sentence = activeLesson.sentences[startIdx]
    const currentSettings = loadSettings()
    isTtsSequenceRunningRef.current = true
    setIsPlayingTtsSequence(true)
    setCurrentSentenceIdx(startIdx)
    setIsPlayingAudio(true)

    playTextToSpeech({
      text: sentence.speakText || sentence.text,
      lang: langMeta.speechCode,
      rate: speechRateRef.current,
      useNeuralCloud: currentSettings.ttsMode !== 'local',
      voiceUri: currentSettings.preferredVoiceUri || undefined,
      sinkId: currentSettings.selectedAudioOutputId || undefined,
      onStart: () => {
        setIsPlayingAudio(true)
      },
      onEnd: () => {
        setIsPlayingAudio(false)
        if (!isTtsSequenceRunningRef.current) return
        ttsSequenceTimeoutRef.current = setTimeout(() => {
          if (!isTtsSequenceRunningRef.current) return
          if (isLoopSentenceRef.current) {
            playTtsSequenceFrom(startIdx)
          } else if (startIdx + 1 < activeLesson.sentences.length) {
            playTtsSequenceFrom(startIdx + 1)
          } else {
            isTtsSequenceRunningRef.current = false
            setIsPlayingTtsSequence(false)
          }
        }, 350)
      },
      onError: (err) => {
        console.error('TTS sequence error', err)
        isTtsSequenceRunningRef.current = false
        setIsPlayingTtsSequence(false)
        setIsPlayingAudio(false)
      },
    })
  }

  // Media Player Controls & Synchronization Handlers
  const togglePlayMedia = () => {
    if (!currentMediaSrc) {
      if (isPlayingTtsSequence) {
        stopPlayback()
      } else {
        playTtsSequenceFrom(currentSentenceIdx)
      }
      return
    }

    const video = mediaVideoRef.current
    if (!video) return

    if (isPlayingMedia) {
      video.pause()
      setIsPlayingMedia(false)
    } else {
      const currentSettings = loadSettings()
      if (currentSettings.selectedAudioOutputId) {
        setAudioOutputDevice(video, currentSettings.selectedAudioOutputId)
      }
      video.playbackRate = speechRate
      video.play().then(() => {
        setIsPlayingMedia(true)
      }).catch((err) => {
        console.warn('Media play error:', err)
      })
    }
  }

  const handleSeekRelative = (seconds: number) => {
    const video = mediaVideoRef.current
    if (!video) return
    const maxDur = mediaDuration || video.duration || 0
    const target = Math.max(0, Math.min(maxDur, video.currentTime + seconds))
    video.currentTime = target
    setMediaCurrentTime(target)
  }

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = mediaVideoRef.current
    if (!video) return
    const target = parseFloat(e.target.value)
    video.currentTime = target
    setMediaCurrentTime(target)
  }

  const handleMediaTimeUpdate = () => {
    const video = mediaVideoRef.current
    if (!video) return
    const curTime = video.currentTime
    setMediaCurrentTime(curTime)

    // Check sentence loop if enabled
    if (isLoopSentence && currentSentence) {
      const sStart = currentSentence.startTime ?? 0
      const sEnd = currentSentence.endTime ?? (activeLesson?.sentences[currentSentenceIdx + 1]?.startTime ?? Infinity)
      if (sEnd !== Infinity && curTime >= sEnd) {
        video.currentTime = sStart
        return
      }
    }

    // Auto synchronize sentence (Script panel scrolls internally via useEffect on currentSentenceIdx)
    if (activeLesson?.sentences && activeLesson.sentences.length > 0) {
      const foundIdx = activeLesson.sentences.findIndex((s, i) => {
        const next = activeLesson.sentences[i + 1]
        const sStart = s.startTime ?? -1
        const sEnd = s.endTime ?? (next?.startTime ?? Infinity)
        if (sStart === -1) return false
        return curTime >= sStart && curTime < sEnd
      })

      if (foundIdx !== -1 && foundIdx !== currentSentenceIdx) {
        setCurrentSentenceIdx(foundIdx)
      }
    }
  }

  const handleJumpToSentence = (idx: number, play: boolean = false) => {
    setCurrentSentenceIdx(idx)
    const targetSentence = activeLesson?.sentences[idx]
    const video = mediaVideoRef.current
    if (currentMediaSrc && video && targetSentence && typeof targetSentence.startTime === 'number') {
      video.currentTime = targetSentence.startTime
      setMediaCurrentTime(targetSentence.startTime)
      if (play || isPlayingMedia) {
        video.play().then(() => setIsPlayingMedia(true)).catch(() => {})
      }
      return
    }
    if (!currentMediaSrc && (play || isPlayingTtsSequence)) {
      stopPlayback()
      playTtsSequenceFrom(idx)
    }
  }

  const handlePlaySentenceAudio = (s: LessonSentence, idx: number) => {
    isTtsSequenceRunningRef.current = false
    setIsPlayingTtsSequence(false)
    if (ttsSequenceTimeoutRef.current) {
      clearTimeout(ttsSequenceTimeoutRef.current)
      ttsSequenceTimeoutRef.current = null
    }
    setCurrentSentenceIdx(idx)
    const video = mediaVideoRef.current
    if (currentMediaSrc && video && typeof s.startTime === 'number') {
      stopTextToSpeech()
      video.currentTime = s.startTime
      video.playbackRate = speechRate
      const currentSettings = loadSettings()
      if (currentSettings.selectedAudioOutputId) {
        setAudioOutputDevice(video, currentSettings.selectedAudioOutputId)
      }
      video.play().then(() => {
        setIsPlayingMedia(true)
        const endTime = typeof s.endTime === 'number' ? s.endTime : null
        if (endTime && typeof s.startTime === 'number' && endTime > s.startTime) {
          if (audioCheckIntervalRef.current) clearInterval(audioCheckIntervalRef.current)
          audioCheckIntervalRef.current = setInterval(() => {
            if (video.currentTime >= endTime) {
              video.pause()
              setIsPlayingMedia(false)
              clearInterval(audioCheckIntervalRef.current)
              audioCheckIntervalRef.current = null
              if (autoLoop) {
                setTimeout(() => handlePlaySentenceAudio(s, idx), 500)
              }
            }
          }, 50)
        }
      }).catch((e) => {
        console.warn('Video segment play error:', e)
      })
      return
    }

    // Fallback: TTS
    if (mediaVideoRef.current) {
      try {
        mediaVideoRef.current.pause()
      } catch {}
      setIsPlayingMedia(false)
    }
    const currentSettings = loadSettings()
    setIsPlayingAudio(true)
    playTextToSpeech({
      text: s.speakText || s.text,
      lang: langMeta.speechCode,
      rate: speechRate,
      useNeuralCloud: currentSettings.ttsMode !== 'local',
      voiceUri: currentSettings.preferredVoiceUri || undefined,
      sinkId: currentSettings.selectedAudioOutputId || undefined,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => {
        setIsPlayingAudio(false)
        if (autoLoop) {
          setTimeout(() => handlePlaySentenceAudio(s, idx), 500)
        }
      },
      onError: (err) => {
        console.error('TTS error', err)
        setIsPlayingAudio(false)
      },
    })
  }

  const toggleSentenceGuide = (idx: number) => {
    setExpandedGuides((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  // Handle Play Model (Native Audio or TTS)
  const handlePlayModel = () => {
    if (!currentSentence) return

    if (isPlayingAudio) {
      stopPlayback()
      return
    }

    // MODE 1: Play Original Native Audio File
    if (audioSourceMode === 'native' && activeLesson?.originalAudioUrl && nativeAudioRef.current) {
      const audioEl = nativeAudioRef.current
      const currentSettings = loadSettings()
      if (currentSettings.selectedAudioOutputId) {
        setAudioOutputDevice(audioEl, currentSettings.selectedAudioOutputId)
      }
      audioEl.playbackRate = speechRate

      const startTime = typeof currentSentence.startTime === 'number' ? currentSentence.startTime : 0
      const endTime = typeof currentSentence.endTime === 'number' ? currentSentence.endTime : null

      audioEl.currentTime = startTime
      audioEl.play().then(() => {
        setIsPlayingAudio(true)

        // Check when to stop if sentence has endTime
        if (endTime !== null && endTime > startTime) {
          if (audioCheckIntervalRef.current) clearInterval(audioCheckIntervalRef.current)
          audioCheckIntervalRef.current = setInterval(() => {
            if (audioEl.currentTime >= endTime) {
              audioEl.pause()
              setIsPlayingAudio(false)
              clearInterval(audioCheckIntervalRef.current)
              audioCheckIntervalRef.current = null

              if (autoLoop) {
                setTimeout(handlePlayModel, 600)
              }
            }
          }, 50)
        }
      }).catch((e) => {
        console.warn('Native audio play error, falling back to TTS:', e)
        setAudioSourceMode('tts')
        playTTS()
      })
      return
    }

    // MODE 2: Play Text-to-Speech
    playTTS()
  }

  const playTTS = () => {
    if (!currentSentence) return
    const currentSettings = loadSettings()
    setIsPlayingAudio(true)
    playTextToSpeech({
      text: currentSentence.speakText || currentSentence.text,
      lang: langMeta.speechCode,
      rate: speechRate,
      useNeuralCloud: currentSettings.ttsMode !== 'local',
      voiceUri: currentSettings.preferredVoiceUri || undefined,
      sinkId: currentSettings.selectedAudioOutputId || undefined,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => {
        setIsPlayingAudio(false)
        if (autoLoop) {
          setTimeout(handlePlayModel, 600)
        }
      },
      onError: (err) => {
        console.error('TTS error', err)
        setIsPlayingAudio(false)
      },
    })
  }

  // Handle Start Recording (Audio or Video) & Speech Recognition
  const handleStartRecording = async () => {
    if (!currentSentence) return
    stopPlayback()
    clearModalResult()
    realtimeTranscriptRef.current = ''
    setRealtimeTranscript('')
    setRecordingSeconds(0)
    setMediaPermissionError(null)
    setSpeechError(null)
    setSpeechStatus(null)

    // Stop standalone preview so MediaRecorder can claim the camera device exclusively
    stopCamPreview()

    const currentSettings = loadSettings()

    try {
      await mediaRecorderRef.current.start({
        type: recordMode,
        videoElement: recordMode === 'video' ? videoRef.current : null,
        onAudioLevel: (lvl) => setAudioLevel(lvl),
        audioDeviceId: currentSettings.selectedAudioInputId || undefined,
        videoDeviceId: currentSettings.selectedVideoInputId || undefined,
      })

      setIsRecording(true)

      // Start recording timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1)
      }, 1000)

      // Start speech recognition in parallel
      if (speechRecognizerRef.current.isSupported()) {
        speechRecognizerRef.current.start({
          lang: langMeta.speechCode,
          onStatus: (st) => {
            setSpeechStatus(st)
          },
          onResult: (transcript) => {
            realtimeTranscriptRef.current = transcript
            setRealtimeTranscript(transcript)
            setSpeechError(null)
          },
          onError: (e: any) => {
            const code = e?.error || ''
            if (code === 'aborted') return
            console.warn('Speech recognition warning:', e)
            if (code === 'not-allowed' || code === 'service-not-allowed') {
              setSpeechError(
                'Trình duyệt chặn quyền hoặc dịch vụ nhận diện giọng nói. Hãy cấp quyền Micro trên thanh địa chỉ.'
              )
            } else if (code === 'network' || code === 'language-not-supported') {
              setSpeechError(
                currentSettings.openaiApiKey?.trim()
                  ? 'Web Speech API không kết nối được — sau khi bấm Dừng hệ thống sẽ tự nhận diện qua OpenAI Whisper.'
                  : 'Trình duyệt không kết nối được dịch vụ nhận diện chữ (Web Speech API). Video/audio vẫn được ghi; để chấm điểm chuẩn hãy dùng Chrome/Edge hoặc nhập OpenAI API Key trong Cài đặt.'
              )
            } else if (code === 'audio-capture') {
              setSpeechError('Không thu được âm thanh từ micro mặc định của hệ thống.')
            } else if (code === 'no-speech' && !realtimeTranscriptRef.current.trim()) {
              setSpeechError(
                'Chưa nghe rõ lời nói. Hãy nói to rõ gần micro hơn hoặc kiểm tra Input mặc định của máy.'
              )
            }
          },
          onEnd: () => {},
        })
      } else if (!currentSettings.openaiApiKey?.trim()) {
        setSpeechError(
          'Trình duyệt này không hỗ trợ Web Speech API. Hãy mở bằng Chrome/Edge hoặc nhập OpenAI API Key trong Cài đặt để chấm điểm bằng Whisper.'
        )
      }
    } catch (err: any) {
      console.error('Start recording error:', err)
      setMediaPermissionError(err.message)
      alert(err.message)
      setIsRecording(false)
    }
  }

  // Handle Stop Recording & Scoring (stays inside Unified Practice Modal)
  const handleStopRecording = async () => {
    if (!isRecording) return

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    try {
      const [recResult] = await Promise.all([
        mediaRecorderRef.current.stop(),
        speechRecognizerRef.current.stopAndWait(800),
      ])
      setIsRecording(false)
      setAudioLevel(0)

      let transcriptToEvaluate = realtimeTranscriptRef.current.trim()
      const currentSettings = loadSettings()
      let hasSpecificError = Boolean(speechError)

      if (!transcriptToEvaluate && (currentSettings.openaiApiKey || '').trim()) {
        setIsTranscribingWhisper(true)
        try {
          transcriptToEvaluate = await transcribeAudioWithOpenAI(recResult.blob, langMeta.speechCode)
          if (transcriptToEvaluate) {
            realtimeTranscriptRef.current = transcriptToEvaluate
            setRealtimeTranscript(transcriptToEvaluate)
            setSpeechError(null)
            hasSpecificError = false
          }
        } catch (whisperErr: any) {
          hasSpecificError = true
          setSpeechError(whisperErr?.message || 'Lỗi nhận diện giọng nói qua OpenAI Whisper.')
        } finally {
          setIsTranscribingWhisper(false)
        }
      }

      if (!transcriptToEvaluate && !hasSpecificError) {
        setSpeechError(
          'Không nhận diện được chữ bạn vừa nói. Hãy kiểm tra Micro mặc định trong Cài đặt âm thanh máy, dùng Chrome/Edge, hoặc bật OpenAI Whisper trong Cài đặt.'
        )
      }

      // Evaluate pronunciation honestly using actual recognized text
      const score = evaluatePronunciation({
        targetText: currentSentence ? (currentSentence.speakText || currentSentence.text) : '',
        spokenText: transcriptToEvaluate,
        lang: currentLang,
      })

      // Save recording to storage / local filesystem via Electron
      const savedEntry = await saveRecordingEntry({
        lessonId: activeLesson?.id,
        lessonTitle: `${activeLesson?.title} - Câu ${currentSentenceIdx + 1}`,
        language: currentLang,
        durationSec: recResult.durationSec,
        score: score.overallScore,
        type: recordMode,
        blob: recResult.blob,
        mimeType: recResult.mimeType,
      })

      // Track score for current sentence
      const sKey = activeLesson ? `${activeLesson.id}_${currentSentenceIdx}` : ''
      if (sKey) {
        setSentenceScores((prev) => ({
          ...prev,
          [sKey]: score.overallScore,
        }))
      }

      // Record sentence practice in persistent storage
      if (activeLesson) {
        const updatedProg = recordSentencePractice(
          activeLesson.id,
          currentLang,
          currentSentenceIdx,
          activeLesson.sentences.length,
          score.overallScore
        )
        setLessonProgressMap((prev) => ({ ...prev, [activeLesson.id]: updatedProg }))
      }

      // Display scoring & playback inline inside the still-open modal
      if (modalRecordingUrlRef.current?.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(modalRecordingUrlRef.current)
        } catch {}
      }
      modalRecordingUrlRef.current = recResult.blobUrl
      setModalRecordingUrl(recResult.blobUrl)
      setModalRecordingType(recResult.actualType)
      setModalLocalPath(savedEntry.localPath)
      setModalScoreResult(score)

      if (score.overallScore >= 85) {
        try {
          confetti({
            particleCount: 70,
            spread: 65,
            origin: { y: 0.6 },
          })
        } catch {}
      }

      // Notify parent so header streak & schedule stats refresh immediately
      onPracticeComplete?.()
    } catch (err: any) {
      alert(`Lỗi khi dừng ghi: ${err.message}`)
      setIsRecording(false)
    }
  }

  // Option 2: Retry immediately inside the same modal without closing it
  const handleRetryRecordingNow = () => {
    void handleStartRecording()
  }

  modalKeyHandlerRef.current = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'VIDEO' ||
        target.tagName === 'AUDIO' ||
        target.isContentEditable)
    ) {
      return
    }
    if (e.key === 'Escape') {
      handleCloseWebcamModal()
      return
    }
    if (e.code === 'Space') {
      e.preventDefault()
      if (target instanceof HTMLButtonElement) {
        target.blur()
      }
      if (isRecording) {
        void handleStopRecording()
      } else if (modalScoreResult) {
        handleRetryRecordingNow()
      } else {
        void handleStartRecording()
      }
    }
  }

  // Navigation Logic between sentences & lessons based on 2-modes
  const isLastSentenceOfLesson =
    Boolean(activeLesson) && currentSentenceIdx >= (activeLesson.sentences.length - 1)

  const currentSentenceKey = activeLesson ? `${activeLesson.id}_${currentSentenceIdx}` : ''
  const currentSentenceScore =
    sentenceScores[currentSentenceKey] ??
    (activeLesson ? lessonProgressMap[activeLesson.id]?.sentenceScores?.[currentSentenceIdx] : undefined)
  const isCurrentSentencePassed =
    typeof currentSentenceScore === 'number' && currentSentenceScore >= PASS_SCORE
  const isCurrentSentenceFailed =
    typeof currentSentenceScore === 'number' && currentSentenceScore < PASS_SCORE

  const handleModalPrevSentence = () => {
    if (isRecording || !activeLesson || currentSentenceIdx <= 0) return
    stopPlayback()
    clearModalResult()
    setShowModalMouthGuide(false)
    setRealtimeTranscript('')
    setCurrentSentenceIdx((prev) => Math.max(0, prev - 1))
  }

  const handleModalNextSentence = () => {
    if (isRecording || !activeLesson) return
    if (isCurrentSentenceFailed) {
      triggerToast(
        `🔒 Bạn chưa đạt điểm Pass (${currentSentenceScore}/100đ, cần ≥ ${PASS_SCORE}đ). Hãy luyện tập lại câu này để mở khóa câu kế tiếp!`
      )
      return
    }
    if (currentSentenceIdx < activeLesson.sentences.length - 1) {
      stopPlayback()
      clearModalResult()
      setShowModalMouthGuide(false)
      setRealtimeTranscript('')
      setCurrentSentenceIdx((prev) => prev + 1)
    }
  }

  const handleNextSentence = () => {
    if (!activeLesson) return
    if (isCurrentSentenceFailed) {
      triggerToast(
        `🔒 Bạn chưa đạt điểm Pass (${currentSentenceScore}/100đ, cần ≥ ${PASS_SCORE}đ). Hãy luyện tập lại câu này để mở khóa câu kế tiếp!`
      )
      return
    }
    const total = activeLesson.sentences.length
    if (currentSentenceIdx < total - 1) {
      setCurrentSentenceIdx((prev) => prev + 1)
    } else {
      // Reached the end of current lesson
      if (advanceMode === 'auto') {
        goToNextLesson()
      }
    }
  }

  const handlePrevSentence = () => {
    if (currentSentenceIdx > 0) {
      setCurrentSentenceIdx((prev) => prev - 1)
    } else if (advanceMode === 'auto') {
      goToPrevLesson()
    }
  }

  const goToNextLesson = () => {
    if (isCurrentSentenceFailed) {
      triggerToast(
        `🔒 Bạn chưa đạt điểm Pass (${currentSentenceScore}/100đ, cần ≥ ${PASS_SCORE}đ). Hãy luyện tập lại để mở khóa bài tiếp theo!`
      )
      return
    }
    const currentIdx = lessons.findIndex((l) => l.id === activeLessonId)
    if (currentIdx !== -1 && currentIdx < lessons.length - 1) {
      const next = lessons[currentIdx + 1]
      setActiveLessonId(next.id)
      setCurrentSentenceIdx(0)
      triggerToast(`⚡ Tự động chuyển sang bài tiếp theo: "${next.title}"`)
    } else if (lessons.length > 0) {
      // Loop back to first lesson
      const first = lessons[0]
      setActiveLessonId(first.id)
      setCurrentSentenceIdx(0)
      triggerToast(`🎉 Đã học hết bài! Tự động quay lại: "${first.title}"`)
    }
  }

  const goToPrevLesson = () => {
    const currentIdx = lessons.findIndex((l) => l.id === activeLessonId)
    if (currentIdx > 0) {
      const prev = lessons[currentIdx - 1]
      setActiveLessonId(prev.id)
      setCurrentSentenceIdx(Math.max(0, prev.sentences.length - 1))
      triggerToast(`Quay lại bài trước: "${prev.title}"`)
    }
  }

  // Level & Topic metadata & grouping
  const availableLevels = useMemo(() => {
    if (currentLang === 'ja') {
      return ['all', 'Kana', 'N5', 'N4', 'N3', 'N2', 'N1']
    }
    if (currentLang === 'zh') {
      return ['all', 'Pinyin', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6']
    }
    if (currentLang === 'vi') {
      return ['all', 'Chữ cái', 'Cơ bản', 'Nâng cao']
    }
    const set = new Set<string>()
    lessons.forEach((l: Lesson) => {
      if (l.level) set.add(l.level.split(' ')[0] || l.level)
    })
    return ['all', ...Array.from(set)]
  }, [lessons, currentLang])

  const availableCategories = useMemo(() => {
    const set = new Set<string>()
    lessons.forEach((l: Lesson) => {
      if (l.category) set.add(l.category.trim())
    })
    return ['all', ...Array.from(set)]
  }, [lessons])

  const getLevelBadgeClass = (level: string) => {
    const lvl = level.toUpperCase()
    if (lvl.includes('KANA') || lvl.includes('PINYIN') || lvl.includes('CHỮ CÁI')) {
      return 'bg-pink-500/15 text-pink-400 border border-pink-500/30'
    }
    if (lvl.includes('N5') || lvl.includes('HSK 1') || lvl.includes('A1')) {
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
    }
    if (lvl.includes('N4') || lvl.includes('HSK 2') || lvl.includes('A2')) {
      return 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
    }
    if (lvl.includes('N3') || lvl.includes('HSK 3') || lvl.includes('B1')) {
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
    }
    if (lvl.includes('N2') || lvl.includes('HSK 4') || lvl.includes('B2')) {
      return 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
    }
    if (lvl.includes('N1') || lvl.includes('HSK 5') || lvl.includes('HSK 6') || lvl.includes('C1')) {
      return 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
    }
    return 'bg-slate-800 text-slate-300 border border-slate-700'
  }

  // Today's scheduled Study Plan lessons (prioritized at top of left sidebar)
  const todayPlanDay = useMemo(() => getTodayStudyPlanDay(studyPlan), [studyPlan])

  const isPlanLessonCompleted = (lessonId: string): boolean => {
    if (studyPlan?.completedShadowingIds?.includes(lessonId)) return true
    const prog = lessonProgressMap[lessonId]
    return Boolean(prog && (prog.isCompleted || (prog.progressPercent ?? 0) >= 100))
  }

  const todayPlanLessons = useMemo(() => {
    if (!todayPlanDay || !todayPlanDay.shadowingLessonIds.length) return []
    const byId = new Map(lessons.map((l) => [l.id, l]))
    const matched = todayPlanDay.shadowingLessonIds
      .map((id) => byId.get(id))
      .filter((l): l is Lesson => Boolean(l))

    const incomplete: Lesson[] = []
    const done: Lesson[] = []
    matched.forEach((l) => {
      if (isPlanLessonCompleted(l.id)) done.push(l)
      else incomplete.push(l)
    })
    return [...incomplete, ...done]
  }, [todayPlanDay, lessons, studyPlan, lessonProgressMap])

  const todayPlanLessonIdSet = useMemo(
    () => new Set(todayPlanLessons.map((l) => l.id)),
    [todayPlanLessons]
  )

  const todayPlanOrderMap = useMemo(() => {
    const map = new Map<string, number>()
    todayPlanLessons.forEach((l, idx) => map.set(l.id, idx))
    return map
  }, [todayPlanLessons])

  const todayPlanDoneCount = useMemo(
    () => todayPlanLessons.filter((l) => isPlanLessonCompleted(l.id)).length,
    [todayPlanLessons, studyPlan, lessonProgressMap]
  )

  const showPinnedTodaySection =
    Boolean(todayPlanDay) &&
    selectedLevel === 'all' &&
    !searchQuery.trim() &&
    statusFilter === 'all' &&
    selectedCategory === 'all' &&
    lessonFilter === 'all'

  useEffect(() => {
    if (selectedLevel === 'today_plan' && todayPlanLessons.length === 0) {
      setSelectedLevel('all')
    }
  }, [selectedLevel, todayPlanLessons.length])

  // Filter lessons in sidebar (prioritizing today's Study Plan lessons first)
  const filteredLessons = useMemo(() => {
    const filtered = lessons.filter((l: Lesson) => {
      const matchSearch =
        !searchQuery.trim() ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.category && l.category.toLowerCase().includes(searchQuery.toLowerCase()))

      if (!matchSearch) return false

      if (selectedLevel === 'today_plan') {
        if (!todayPlanLessonIdSet.has(l.id)) return false
      } else if (selectedLevel !== 'all') {
        const normalizedLvl = l.level.startsWith('HSK')
          ? (l.level.match(/HSK\s*\d+/)?.[0] || l.level)
          : (l.level.split(' ')[0] || l.level)
        if (!normalizedLvl.startsWith(selectedLevel) && !l.level.toLowerCase().includes(selectedLevel.toLowerCase())) return false
      }

      if (selectedCategory !== 'all' && l.category !== selectedCategory) {
        return false
      }

      if (lessonFilter === 'native') return Boolean(l.originalAudioUrl || l.audioBlobId)
      if (lessonFilter === 'tts') return !l.originalAudioUrl && !l.audioBlobId

      // Filter by Learning Status (all / unviewed / in_progress / completed)
      if (statusFilter === 'unviewed') {
        const prog = lessonProgressMap[l.id]
        if (prog && (prog.hasViewed || (prog.practicedCount || 0) > 0)) return false
      } else if (statusFilter === 'in_progress') {
        const prog = lessonProgressMap[l.id]
        if (!prog || !prog.hasViewed || prog.isCompleted || (prog.progressPercent || 0) >= 100) return false
      } else if (statusFilter === 'completed') {
        const prog = lessonProgressMap[l.id]
        if (!prog || (!prog.isCompleted && (prog.progressPercent || 0) < 100)) return false
      }

      return true
    })

    if (todayPlanOrderMap.size === 0) return filtered

    return [...filtered].sort((a, b) => {
      const aRank = todayPlanOrderMap.get(a.id)
      const bRank = todayPlanOrderMap.get(b.id)
      if (aRank !== undefined && bRank !== undefined) return aRank - bRank
      if (aRank !== undefined) return -1
      if (bRank !== undefined) return 1
      return 0
    })
  }, [
    lessons,
    searchQuery,
    selectedLevel,
    selectedCategory,
    lessonFilter,
    statusFilter,
    lessonProgressMap,
    todayPlanLessonIdSet,
    todayPlanOrderMap,
  ])

  // Overall learning progress statistics
  const progressStats = useMemo(() => {
    let unviewed = 0
    let inProgress = 0
    let completed = 0

    const baseList =
      selectedLevel === 'today_plan'
        ? todayPlanLessons
        : selectedLevel === 'all'
        ? lessons
        : lessons.filter((l: Lesson) => {
            const normalizedLvl = l.level.startsWith('HSK')
              ? (l.level.match(/HSK\s*\d+/)?.[0] || l.level)
              : (l.level.split(' ')[0] || l.level)
            return normalizedLvl.startsWith(selectedLevel) || l.level.toLowerCase().includes(selectedLevel.toLowerCase())
          })

    baseList.forEach((l) => {
      const prog = lessonProgressMap[l.id]
      const doneViaPlan =
        selectedLevel === 'today_plan' && Boolean(studyPlan?.completedShadowingIds?.includes(l.id))
      if (doneViaPlan || (prog && (prog.isCompleted || (prog.progressPercent || 0) >= 100))) {
        completed++
      } else if (prog && prog.hasViewed) {
        inProgress++
      } else {
        unviewed++
      }
    })

    const total = baseList.length
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      unviewed,
      inProgress,
      completed,
      completionPercent,
    }
  }, [lessons, lessonProgressMap, selectedLevel, todayPlanLessons, studyPlan])

  // Group lessons by level (excluding pinned Today Plan lessons when shown separately above)
  const groupedLessonsByLevel = useMemo(() => {
    const groups: { levelKey: string; lessons: Lesson[] }[] = []
    const map = new Map<string, Lesson[]>()

    const excludePinned = showPinnedTodaySection && todayPlanLessons.length > 0

    filteredLessons.forEach((l: Lesson) => {
      if (excludePinned && todayPlanLessonIdSet.has(l.id)) return
      const lvlKey = l.level.startsWith('HSK')
        ? (l.level.match(/HSK\s*\d+/)?.[0] || l.level)
        : (l.level.split(' ')[0] || l.level || 'Khác')
      if (!map.has(lvlKey)) {
        map.set(lvlKey, [])
      }
      map.get(lvlKey)!.push(l)
    })

    // If Japanese, preserve Kana -> N5 -> N1 order
    if (currentLang === 'ja') {
      const jaOrder = ['Kana', 'N5', 'N4', 'N3', 'N2', 'N1']
      jaOrder.forEach((k) => {
        if (map.has(k)) {
          groups.push({ levelKey: k, lessons: map.get(k)! })
          map.delete(k)
        }
      })
    }

    // If Chinese, preserve Pinyin -> HSK 1 -> HSK 6 order
    if (currentLang === 'zh') {
      const zhOrder = ['Pinyin', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6']
      zhOrder.forEach((k) => {
        if (map.has(k)) {
          groups.push({ levelKey: k, lessons: map.get(k)! })
          map.delete(k)
        }
      })
    }

    // If Vietnamese, preserve Chữ cái -> Cơ bản -> Nâng cao order
    if (currentLang === 'vi') {
      const viOrder = ['Chữ cái', 'Cơ bản', 'Nâng cao']
      viOrder.forEach((k) => {
        if (map.has(k)) {
          groups.push({ levelKey: k, lessons: map.get(k)! })
          map.delete(k)
        }
      })
    }

    // Add remaining groups
    map.forEach((list, k) => {
      groups.push({ levelKey: k, lessons: list })
    })

    return groups
  }, [filteredLessons, currentLang, showPinnedTodaySection, todayPlanLessons.length, todayPlanLessonIdSet])

  // Callback when a new lesson with native audio is created
  const handleLessonCreated = (newLesson: Lesson) => {
    setLessons((prev) => [newLesson, ...prev])
    setActiveLessonId(newLesson.id)
    setCurrentSentenceIdx(0)
    triggerToast(`Đã thêm bài học mới: "${newLesson.title}"`)
  }

  // Create Quick Custom Text Lesson
  const handleCreateCustomLesson = () => {
    if (!customTitle.trim() || !customText.trim()) return

    const rawSentences = customText
      .split(/([.!?。\n]+)/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && !/^[.!?。\n]+$/.test(s))

    const newSentences: LessonSentence[] = rawSentences.map((stx, idx) => ({
      id: `custom-s-${idx + 1}`,
      text: stx,
      translation: idx === 0 ? customTranslation : '',
      grammarNote: 'Bài đọc tự nhập',
    }))

    const newLesson: Lesson = {
      id: `custom-${Date.now()}`,
      language: currentLang,
      title: customTitle.trim(),
      level: 'Tự soạn',
      category: 'Cá nhân',
      sentences:
        newSentences.length > 0
          ? newSentences
          : [
              {
                id: 'custom-s-1',
                text: customText.trim(),
                translation: customTranslation,
                grammarNote: 'Bài đọc tự do',
              },
            ],
    }

    const updated = saveCustomLesson(newLesson)
    setLessons([...getAllLessonsForLanguage(currentLang), ...updated])
    setActiveLessonId(newLesson.id)
    setCurrentSentenceIdx(0)
    setShowAddCustom(false)
    setCustomTitle('')
    setCustomText('')
    setCustomTranslation('')
    triggerToast(`Đã tạo bài đọc mới: "${newLesson.title}"`)
  }

  // Active lesson index within currently filtered playlist
  const activeFilteredIdx = useMemo(
    () => filteredLessons.findIndex((l: Lesson) => l.id === activeLessonId),
    [filteredLessons, activeLessonId]
  )

  const activeExtraFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (lessonFilter !== 'all' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0)

  // Handle selecting a lesson
  const handleSelectLesson = (lessonId: string) => {
    if (lessonId === activeLessonId) {
      setIsSidebarOpenMobile(false)
      return
    }

    if (isCurrentSentenceFailed) {
      triggerToast(
        `🔒 Chưa đạt điểm Pass ở câu hiện tại (${currentSentenceScore}/100đ, cần ≥ ${PASS_SCORE}đ). Hãy luyện tập lại câu này để đạt chuẩn trước khi chọn bài khác!`
      )
      return
    }

    const targetLesson = lessons.find((l) => l.id === lessonId)
    if (targetLesson) {
      const updated = recordLessonViewed(lessonId, currentLang, targetLesson.sentences.length)
      setLessonProgressMap((prev) => ({ ...prev, [lessonId]: updated }))
    }

    setActiveLessonId(lessonId)
    setCurrentSentenceIdx(0)
    setIsSidebarOpenMobile(false)
  }

  // Step to previous / next lesson in the filtered playlist (used in Slim Focus Rail)
  const handleStepFilteredLesson = (delta: -1 | 1) => {
    if (filteredLessons.length === 0) return
    const cur = activeFilteredIdx
    const nextIdx =
      cur === -1
        ? 0
        : Math.max(0, Math.min(filteredLessons.length - 1, cur + delta))
    const target = filteredLessons[nextIdx]
    if (target && target.id !== activeLessonId) {
      handleSelectLesson(target.id)
    }
  }

  // Render Compact Playlist Lesson Card (no repeated sentence list inside Sidebar)
  const renderLessonCard = (
    l: Lesson,
    opts?: { isTodayPlan?: boolean; isPlanDone?: boolean }
  ) => {
    const isActive = l.id === activeLessonId
    const hasOriginal = Boolean(l.originalAudioUrl || l.videoUrl || l.audioBlobId)
    const lvlClass = getLevelBadgeClass(l.level)
    const progress = lessonProgressMap[l.id]
    const inTodayPlan = opts?.isTodayPlan ?? todayPlanLessonIdSet.has(l.id)
    const isPlanDone = opts?.isPlanDone ?? (inTodayPlan && isPlanLessonCompleted(l.id))
    const isCompleted = Boolean(
      progress?.isCompleted || (progress?.progressPercent ?? 0) >= 100 || isPlanDone
    )
    const hasPracticed = Boolean((progress?.practicedCount ?? 0) > 0)
    const hasViewed = Boolean(progress?.hasViewed)
    const progressPercent = progress?.progressPercent ?? 0

    return (
      <div
        key={l.id}
        ref={isActive ? activeLessonRef : null}
        onClick={() => handleSelectLesson(l.id)}
        className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all duration-150 flex items-start gap-2.5 ${
          isActive
            ? 'bg-emerald-500/15 border-emerald-500/60 shadow-sm ring-1 ring-emerald-500/30'
            : inTodayPlan && !isCompleted
            ? 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/35 hover:border-amber-500/50'
            : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
        }`}
      >
        {/* Left: Status / Playing Icon */}
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isActive
              ? 'bg-emerald-500 text-slate-950 shadow-xs'
              : isCompleted
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : hasPracticed
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              : hasViewed
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
              : 'bg-slate-900 text-slate-500 border border-slate-800'
          }`}
          title={
            isActive
              ? 'Đang mở bài học này'
              : isCompleted
              ? 'Đã hoàn thành'
              : hasPracticed
              ? 'Đang học dở'
              : hasViewed
              ? 'Đã xem'
              : 'Chưa học'
          }
        >
          {isActive ? (
            <Play className="w-3.5 h-3.5 fill-current" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : hasPracticed ? (
            <Clock className="w-3.5 h-3.5" />
          ) : hasViewed ? (
            <Eye className="w-3.5 h-3.5" />
          ) : (
            <Circle className="w-3 h-3" />
          )}
        </div>

        {/* Right: Title, Compact Metadata & Mini Progress */}
        <div className="flex-1 min-w-0">
          <h4
            className={`text-xs font-bold leading-snug line-clamp-2 ${
              isActive ? 'text-white' : 'text-slate-200'
            }`}
          >
            {l.title}
          </h4>

          {/* Metadata single line: Today Plan · Level · Category · Count · Media icon */}
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 min-w-0">
            {inTodayPlan && (
              <span
                className={`font-bold px-1.5 py-0.2 rounded-md border shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {isCompleted ? '✓ Plan' : 'Hôm nay'}
              </span>
            )}
            <span className={`font-bold px-1.5 py-0.2 rounded-md border shrink-0 ${lvlClass}`}>
              {l.level || 'Bài đọc'}
            </span>
            {l.category && <span className="truncate">{l.category}</span>}
            <span className="text-slate-500 shrink-0">· {l.sentences.length} câu</span>
            {hasOriginal && (
              <Headphones
                className="w-2.5 h-2.5 text-indigo-400 shrink-0 ml-auto"
                aria-label="Có video/audio gốc"
              />
            )}
          </div>

          {/* Progress Strip (shown only when active, practiced, or completed) */}
          {isCompleted ? (
            <div className="flex items-center justify-between text-[10px] mt-1.5 text-emerald-400 font-semibold">
              <span>Hoàn thành</span>
              {progress?.bestScore !== undefined && (
                <span className="font-mono text-emerald-300">🏆 {progress.bestScore}đ</span>
              )}
            </div>
          ) : isActive || hasPracticed ? (
            <div className="mt-1.5 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className={isActive ? 'text-emerald-400 font-semibold' : 'text-amber-300 font-medium'}>
                  {isActive
                    ? `Câu ${currentSentenceIdx + 1}/${l.sentences.length}`
                    : `${progress?.practicedSentences?.length || 0}/${l.sentences.length} câu`}
                </span>
                {progressPercent > 0 && (
                  <span className="font-mono text-slate-400">{progressPercent}%</span>
                )}
              </div>
              {progressPercent > 0 && (
                <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 animate-bounce transition-all">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-900 hover:text-black"
          >
            ×
          </button>
        </div>
      )}

      {/* Hidden audio element for Native Audio File */}
      {activeLesson?.originalAudioUrl && (
        <audio
          ref={nativeAudioRef}
          src={activeLesson.originalAudioUrl}
          onTimeUpdate={() => {
            if (nativeAudioRef.current) {
              setNativeAudioCurrentTime(nativeAudioRef.current.currentTime)
            }
          }}
          onEnded={() => {
            setIsPlayingAudio(false)
            if (autoLoop) setTimeout(handlePlayModel, 600)
          }}
        />
      )}

      {/* Responsive Layout: Sidebar on Left + Studio Workspace on Right */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Mobile Backdrop Overlay */}
        {isSidebarOpenMobile && (
          <div
            onClick={() => setIsSidebarOpenMobile(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          />
        )}

        {/* ======================================================== */}
        {/* 1. SIDEBAR: COMPACT PLAYLIST / SLIM FOCUS RAIL           */}
        {/* ======================================================== */}
        {isSidebarCollapsed && !isSidebarOpenMobile ? (
          <aside className="hidden lg:flex w-12 shrink-0 bg-slate-900 border border-slate-800 rounded-3xl py-3 px-1.5 shadow-xl flex-col items-center justify-between lg:h-[calc(100vh-120px)]">
            {/* Top actions: Expand Sidebar & Quick Add */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors cursor-pointer"
                title="Mở danh sách bài học"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowAudioImporter(true)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                title="Nạp Video / Audio mới"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Middle: Quick Prev / Next Lesson Stepper */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={filteredLessons.length === 0 || activeFilteredIdx <= 0}
                onClick={() => handleStepFilteredLesson(-1)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                title="Bài trước"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <span
                className="text-[10px] font-mono font-bold text-slate-300 text-center leading-tight px-0.5"
                title="Vị trí bài hiện tại trong danh sách"
              >
                {activeFilteredIdx >= 0 ? activeFilteredIdx + 1 : 0}
                <span className="block text-[9px] text-slate-500">/{filteredLessons.length}</span>
              </span>
              <button
                type="button"
                disabled={
                  filteredLessons.length === 0 ||
                  activeFilteredIdx >= filteredLessons.length - 1
                }
                onClick={() => handleStepFilteredLesson(1)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                title="Bài kế tiếp"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom: Completion Percent Pill */}
            <div
              className="w-9 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center"
              title={`Tiến độ hoàn thành: ${progressStats.completionPercent}%`}
            >
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                {progressStats.completionPercent}%
              </span>
            </div>
          </aside>
        ) : (
          <aside
            className={`w-full lg:w-72 xl:w-[300px] 2xl:w-[320px] flex-shrink-0 bg-slate-900 border border-slate-800 shadow-xl flex flex-col space-y-3 transition-all duration-200 ${
              isSidebarOpenMobile
                ? 'fixed inset-y-0 left-0 z-50 w-[88vw] max-w-sm p-4 rounded-r-3xl overflow-hidden bg-slate-900/98 shadow-2xl pt-safe pb-safe border-r border-slate-700'
                : 'hidden lg:flex rounded-3xl p-3.5 lg:h-[calc(100vh-120px)] overflow-hidden'
            }`}
          >
            {/* Sidebar Compact Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="truncate">Bài học</span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono font-normal shrink-0">
                      {filteredLessons.length}/{lessons.length}
                    </span>
                  </h3>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {langMeta.name} ({langMeta.nativeName})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {/* Quick Add Lesson Dropdown (+) */}
                <div ref={addMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowAddMenu((prev) => !prev)}
                    className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                      showAddMenu
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                        : 'bg-slate-950 hover:bg-slate-800 text-emerald-400 border-slate-800'
                    }`}
                    title="Thêm bài học mới (Nạp Video/Audio hoặc Soạn chữ)"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {showAddMenu && (
                    <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-30 space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddMenu(false)
                          setShowAudioImporter(true)
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 text-left cursor-pointer"
                      >
                        <FileAudio className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Nạp Video / Audio gốc</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddMenu(false)
                          setShowAddCustom(true)
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 text-left cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Soạn bài đọc chữ</span>
                      </button>
                      {onOpenStudyPlan && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddMenu(false)
                            onOpenStudyPlan()
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-slate-800 text-left cursor-pointer border-t border-slate-800 mt-1 pt-2"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Kế hoạch học (Study Plan)</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Collapse Sidebar to Slim Rail (Desktop) */}
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="hidden lg:flex p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
                  title="Thu gọn Sidebar để tập trung luyện Shadowing"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>

                {/* Mobile Close Button */}
                <button
                  type="button"
                  onClick={() => setIsSidebarOpenMobile(false)}
                  className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2-Tier Compact Search & Filter Bar */}
            <div className="space-y-2 shrink-0">
              {/* Tier 1: Search Input + Advanced Filters Popover Toggle */}
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1 min-w-0">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Tìm bài học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-6 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowSidebarFilters((prev) => !prev)}
                  className={`relative p-1.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                    showSidebarFilters || activeExtraFilterCount > 0
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                  title="Lọc nâng cao (Chủ đề, Trạng thái, Nguồn âm thanh)"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {activeExtraFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                      {activeExtraFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Tier 2: Horizontal Level Selector Strip */}
              <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                {todayPlanLessons.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedLevel('today_plan')}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all shrink-0 cursor-pointer inline-flex items-center gap-1 ${
                      selectedLevel === 'today_plan'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/35 hover:bg-amber-500/25'
                    }`}
                    title="Lọc nhanh các bài học cần hoàn thành hôm nay theo Study Plan"
                  >
                    <Target className="w-3 h-3 shrink-0" />
                    <span>Hôm nay</span>
                    <span
                      className={`text-[10px] font-mono ${
                        selectedLevel === 'today_plan' ? 'text-slate-900 font-bold' : 'opacity-90'
                      }`}
                    >
                      {todayPlanDoneCount}/{todayPlanLessons.length}
                    </span>
                  </button>
                )}

                {availableLevels.map((lvl: string) => {
                  const isSel = selectedLevel === lvl
                  const count =
                    lvl === 'all'
                      ? lessons.length
                      : lessons.filter((l: Lesson) => l.level.startsWith(lvl)).length

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                        isSel
                          ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      <span>{lvl === 'all' ? 'Tất cả' : lvl}</span>
                      {count > 0 && (
                        <span
                          className={`ml-1 text-[10px] ${
                            isSel ? 'text-slate-900 font-bold' : 'text-slate-500'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Expandable Extra Filters Drawer (Topic, Status, Source) */}
              {showSidebarFilters && (
                <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  {/* Category Dropdown */}
                  {availableCategories.length > 1 && (
                    <div className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
                      <Tag className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-transparent text-slate-200 text-xs w-full focus:outline-none cursor-pointer"
                      >
                        <option value="all" className="bg-slate-900 text-slate-200">
                          Tất cả chủ đề ({lessons.length})
                        </option>
                        {availableCategories
                          .filter((c: string) => c !== 'all')
                          .map((cat: string) => (
                            <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                              {cat} ({lessons.filter((l: Lesson) => l.category === cat).length})
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* Learning Status Filter */}
                  <div className="grid grid-cols-4 gap-1 text-[10px] bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStatusFilter('all')}
                      className={`py-1 rounded-lg font-semibold transition-all text-center cursor-pointer ${
                        statusFilter === 'all'
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('unviewed')}
                      className={`py-1 rounded-lg font-semibold transition-all text-center cursor-pointer ${
                        statusFilter === 'unviewed'
                          ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/40'
                          : 'text-slate-400 hover:text-rose-300'
                      }`}
                    >
                      Chưa học
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('in_progress')}
                      className={`py-1 rounded-lg font-semibold transition-all text-center cursor-pointer ${
                        statusFilter === 'in_progress'
                          ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                          : 'text-slate-400 hover:text-amber-300'
                      }`}
                    >
                      Đang học
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('completed')}
                      className={`py-1 rounded-lg font-semibold transition-all text-center cursor-pointer ${
                        statusFilter === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                          : 'text-slate-400 hover:text-emerald-300'
                      }`}
                    >
                      Đã xong
                    </button>
                  </div>

                  {/* Audio Source Filters */}
                  <div className="flex gap-1 text-[10px] bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setLessonFilter('all')}
                      className={`flex-1 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                        lessonFilter === 'all'
                          ? 'bg-slate-800 text-emerald-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Tất cả nguồn
                    </button>
                    <button
                      type="button"
                      onClick={() => setLessonFilter('native')}
                      className={`flex-1 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                        lessonFilter === 'native'
                          ? 'bg-slate-800 text-indigo-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🎧 Gốc
                    </button>
                    <button
                      type="button"
                      onClick={() => setLessonFilter('tts')}
                      className={`flex-1 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                        lessonFilter === 'tts'
                          ? 'bg-slate-800 text-emerald-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🔊 Mẫu AI
                    </button>
                  </div>

                  {activeExtraFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all')
                        setStatusFilter('all')
                        setLessonFilter('all')
                      }}
                      className="w-full py-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 hover:underline text-center cursor-pointer"
                    >
                      Đặt lại bộ lọc ({activeExtraFilterCount})
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* PLAYLIST SCROLLABLE AREA */}
            <div
              ref={sidebarListRef}
              className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1 scroll-smooth"
            >
              {/* Pinned Today's Study Plan Lessons (shown above all other lessons when plan active) */}
              {showPinnedTodaySection && todayPlanDay && studyPlan && (
                todayPlanLessons.length > 0 ? (
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 mb-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-[11px] font-extrabold text-amber-300 truncate">
                          Hôm nay • Ngày {todayPlanDay.dayIndex}/{studyPlan.totalDays}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                            todayPlanDoneCount === todayPlanLessons.length
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {todayPlanDoneCount}/{todayPlanLessons.length}
                        </span>
                        {onOpenStudyPlan && (
                          <button
                            type="button"
                            onClick={onOpenStudyPlan}
                            className="text-[10px] font-semibold text-amber-300 hover:underline cursor-pointer"
                            title="Mở trang xem chi tiết kế hoạch học tập"
                          >
                            Xem Plan
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            (todayPlanDoneCount / Math.max(1, todayPlanLessons.length)) * 100
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      {todayPlanLessons.map((l: Lesson) =>
                        renderLessonCard(l, {
                          isTodayPlan: true,
                          isPlanDone: isPlanLessonCompleted(l.id),
                        })
                      )}
                    </div>
                  </div>
                ) : (todayPlanDay.isReviewDay || todayPlanDay.isRestDay) ? (
                  <div
                    className={`p-2.5 rounded-2xl border mb-2 flex items-center justify-between gap-2 text-xs ${
                      todayPlanDay.isReviewDay
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-semibold truncate">
                      {todayPlanDay.isReviewDay
                        ? `📚 Ngày ${todayPlanDay.dayIndex}: Ngày ôn tập theo Plan`
                        : `☕ Ngày ${todayPlanDay.dayIndex}: Ngày nghỉ theo Plan`}
                    </span>
                    {onOpenStudyPlan && (
                      <button
                        type="button"
                        onClick={onOpenStudyPlan}
                        className="text-[10px] font-semibold hover:underline shrink-0 cursor-pointer"
                      >
                        Xem Plan
                      </button>
                    )}
                  </div>
                ) : null
              )}

              {showPinnedTodaySection &&
                todayPlanLessons.length > 0 &&
                filteredLessons.some((l) => !todayPlanLessonIdSet.has(l.id)) && (
                  <div className="px-1 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Bài học khác
                  </div>
                )}

              {filteredLessons.length === 0 ? (
                <div className="p-5 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-2xl space-y-2">
                  <div className="text-base">
                    {statusFilter === 'unviewed' ? '🎉' : statusFilter === 'completed' ? '📚' : '🔍'}
                  </div>
                  <div className="font-semibold text-slate-300">
                    {statusFilter === 'unviewed'
                      ? 'Tuyệt vời! Bạn đã xem và học hết các bài trong danh mục này.'
                      : statusFilter === 'completed'
                      ? 'Chưa có bài nào hoàn thành 100%. Hãy tiếp tục luyện tập nhé!'
                      : 'Không tìm thấy bài học nào phù hợp với bộ lọc hiện tại.'}
                  </div>
                  {(statusFilter !== 'all' || selectedCategory !== 'all' || lessonFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setStatusFilter('all')
                        setSelectedCategory('all')
                        setLessonFilter('all')
                      }}
                      className="text-[11px] text-emerald-400 hover:underline font-medium cursor-pointer"
                    >
                      Xem lại tất cả bài học
                    </button>
                  )}
                </div>
              ) : selectedLevel === 'all' && groupedLessonsByLevel.length > 1 ? (
                groupedLessonsByLevel.map((group: { levelKey: string; lessons: Lesson[] }) => {
                  const meta =
                    currentLang === 'ja'
                      ? JA_LEVEL_INFO[group.levelKey]
                      : currentLang === 'zh'
                      ? ZH_LEVEL_INFO[group.levelKey]
                      : VI_LEVEL_INFO[group.levelKey]

                  return (
                    <div key={group.levelKey} className="space-y-1.5 pt-1">
                      {/* Sticky Level Divider Header */}
                      <div className="sticky top-0 z-10 my-1 px-2.5 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs shadow-sm">
                        <div className="flex items-center gap-1.5 font-bold text-white min-w-0">
                          <span>{meta?.icon || '📚'}</span>
                          <span className="truncate">{meta?.title || group.levelKey}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 shrink-0">
                          {group.lessons.length} bài
                        </span>
                      </div>

                      {/* Group's lessons */}
                      <div className="space-y-1.5">
                        {group.lessons.map((l: Lesson) => renderLessonCard(l))}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="space-y-1.5">
                  {(showPinnedTodaySection && todayPlanLessons.length > 0
                    ? filteredLessons.filter((l) => !todayPlanLessonIdSet.has(l.id))
                    : filteredLessons
                  ).map((l: Lesson) => renderLessonCard(l))}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ======================================================== */}
        {/* 2. MAIN WORKSPACE: SHADOWING STUDIO                      */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 w-full">
          {/* ======================================================== */}
          {/* VIDEO/MEDIA PLAYER (7/12) + LESSON INFO & SCRIPT (5/12)  */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* 1. Synchronized Video / Audio Player (7/12 cols) */}
            <div className="xl:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
              {/* Media Display Screen */}
              <div
                className={`relative w-full aspect-video rounded-2xl overflow-hidden border flex items-center justify-center ${
                  currentMediaSrc
                    ? 'bg-slate-950 border-slate-800'
                    : 'media-empty-frame bg-slate-800/70 border-slate-700/80 border-dashed'
                }`}
              >
                {currentMediaSrc ? (
                  <>
                    <video
                      ref={mediaVideoRef}
                      src={currentMediaSrc}
                      muted={isMediaMuted}
                      playsInline
                      onTimeUpdate={handleMediaTimeUpdate}
                      onLoadedMetadata={() => {
                        if (mediaVideoRef.current) {
                          setMediaDuration(mediaVideoRef.current.duration)
                        }
                      }}
                      onEnded={() => {
                        setIsPlayingMedia(false)
                        if (isLoopSentence && currentSentence && mediaVideoRef.current) {
                          mediaVideoRef.current.currentTime = currentSentence.startTime || 0
                          mediaVideoRef.current.play().catch(() => {})
                          setIsPlayingMedia(true)
                        }
                      }}
                      className={`w-full h-full object-contain ${!isVideoFile ? 'hidden' : 'block'}`}
                    />

                    {/* Audio File Visualizer View (if loaded file is audio) */}
                    {!isVideoFile && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/40 p-6 text-center">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-indigo-500/30 bg-indigo-500/10 shadow-2xl transition-all duration-300 ${
                            isPlayingMedia ? 'scale-105 shadow-indigo-500/30 animate-pulse' : ''
                          }`}
                        >
                          <Headphones
                            className={`w-10 h-10 ${
                              isPlayingMedia ? 'text-indigo-400' : 'text-slate-500'
                            }`}
                          />
                        </div>
                        <h4 className="text-white font-bold text-sm mt-3 truncate max-w-sm">
                          {activeLesson?.originalAudioFileName || activeLesson?.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                            Audio gốc
                          </span>
                          {isPlayingMedia && (
                            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              Đang phát...
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <Film className="w-12 h-12 text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-200">Bài học chưa có video / file nghe gốc</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Bạn có thể nạp file video/âm thanh kèm phụ đề hoặc bấm phát để chạy Script bằng giọng AI.
                    </p>
                    <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAudioImporter(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <FileAudio className="w-4 h-4" />
                        <span>Nạp Video / Audio cho bài này</span>
                      </button>
                      <button
                        type="button"
                        onClick={togglePlayMedia}
                        disabled={!activeLesson?.sentences?.length}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        {isPlayingTtsSequence ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Dừng Script AI</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4" />
                            <span>Phát Script bằng AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Media Player Controls Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
                {/* Timeline Scrubber */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 font-semibold">{formatTime(mediaCurrentTime)}</span>
                    <span>{formatTime(mediaDuration || activeLesson?.audioDuration || 0)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={mediaDuration || activeLesson?.audioDuration || 100}
                    step={0.1}
                    value={mediaCurrentTime}
                    disabled={!currentMediaSrc}
                    onChange={handleScrubberChange}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:h-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {/* Main Playback Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={!currentMediaSrc}
                      onClick={() => handleSeekRelative(-5)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 transition-colors cursor-pointer"
                      title="Lùi 5 giây"
                    >
                      <Rewind className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={togglePlayMedia}
                      disabled={!currentMediaSrc && !activeLesson?.sentences?.length}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
                        (currentMediaSrc ? isPlayingMedia : isPlayingTtsSequence)
                          ? 'bg-rose-500 hover:bg-rose-600 text-white'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      }`}
                    >
                      {(currentMediaSrc ? isPlayingMedia : isPlayingTtsSequence) ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>Tạm dừng</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>{currentMediaSrc ? 'Phát video' : 'Phát Script (AI)'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={!currentMediaSrc}
                      onClick={() => handleSeekRelative(5)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 transition-colors cursor-pointer"
                      title="Tiến 5 giây"
                    >
                      <FastForward className="w-4 h-4" />
                    </button>

                    {/* Mute button */}
                    <button
                      type="button"
                      disabled={!currentMediaSrc}
                      onClick={() => setIsMediaMuted(!isMediaMuted)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
                        isMediaMuted
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                      title={isMediaMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                    >
                      {isMediaMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Sync & Loop Switches */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Loop Sentence Switch */}
                    <button
                      type="button"
                      onClick={() => setIsLoopSentence(!isLoopSentence)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isLoopSentence
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Khi bật, video hoặc giọng đọc sẽ tự động lặp đi lặp lại câu đang chọn"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Lặp câu: {isLoopSentence ? 'Bật' : 'Tắt'}</span>
                    </button>

                    {/* Quick Practice (Shadowing Modal) Button */}
                    <button
                      type="button"
                      disabled={!activeLesson?.sentences?.length}
                      onClick={() => openWebcamModalForSentence(currentSentenceIdx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
                        isRecording
                          ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      }`}
                      title={`Luyện tập Shadowing (Câu ${currentSentenceIdx + 1})`}
                    >
                      {isRecording ? (
                        <>
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>REC {recordingSeconds}s</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5" />
                          <span>Luyện tập</span>
                        </>
                      )}
                    </button>

                    {/* Auto Scroll Switch */}
                    <button
                      type="button"
                      onClick={() => setIsAutoScrollEnabled(!isAutoScrollEnabled)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isAutoScrollEnabled
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Tự động chạy khung Script bên phải theo nhịp video/giọng đọc"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Cuộn tự động: {isAutoScrollEnabled ? 'Bật' : 'Tắt'}</span>
                    </button>

                    {/* Speed selector */}
                    <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-xs">
                      {[0.75, 1.0, 1.25].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => {
                            setSpeechRate(rate)
                            if (mediaVideoRef.current) mediaVideoRef.current.playbackRate = rate
                          }}
                          className={`px-2 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                            speechRate === rate
                              ? 'bg-slate-800 text-emerald-400 font-bold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Right Panel: Lesson Title, Progress Bar & Live Sync Script (5/12 cols) */}
            <div className="xl:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col overflow-hidden h-[75vh] min-h-[560px] xl:h-[calc(100vh-120px)]">
              {/* Lesson Info & Progress Section */}
              <div className="p-4 border-b border-slate-800 space-y-3 shrink-0">
                {/* Lesson Header (Title + Badges + Webcam & Shadowing Trigger) */}
                <div className="flex items-start justify-between gap-2.5 min-w-0">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpenMobile(true)}
                      className="lg:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shrink-0 mt-0.5 cursor-pointer"
                      title="Mở danh sách bài học"
                    >
                      <Menu className="w-4 h-4" />
                    </button>

                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      {currentMediaSrc ? (
                        <FileAudio className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {activeLesson?.level || 'Bài học'}
                        </span>
                        {activeLesson?.category && (
                          <span className="text-[11px] text-slate-400 truncate">
                            {activeLesson.category}
                          </span>
                        )}
                        {currentMediaSrc && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            <Headphones className="w-2.5 h-2.5" />
                            <span>{isVideoFile ? 'Video gốc' : 'Audio gốc'}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                        {activeLesson?.title}
                      </h3>
                    </div>
                  </div>

                  {/* Open Webcam & Shadowing Studio Button */}
                  <button
                    type="button"
                    onClick={() => openWebcamModalForSentence(currentSentenceIdx)}
                    className={`shrink-0 px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                      isRecording
                        ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white animate-pulse'
                        : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 shadow-emerald-500/20'
                    }`}
                    title={`Mở Webcam & Shadowing (Câu ${currentSentenceIdx + 1})`}
                  >
                    {isRecording ? (
                      <>
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span>REC {recordingSeconds}s</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Webcam &amp; Shadowing</span>
                        <span className="sm:hidden">Shadowing</span>
                      </>
                    )}
                  </button>
                </div>

                  {/* Progress Section directly below Lesson Title */}
                  <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-bold text-slate-200 truncate">
                          Tiến độ ({selectedLevel === 'today_plan' ? 'Hôm nay' : selectedLevel === 'all' ? 'Tất cả' : selectedLevel})
                        </span>
                      </div>
                      <span className="font-bold text-emerald-400 font-mono shrink-0">
                        {progressStats.completed}/{progressStats.total} ({progressStats.completionPercent}%)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressStats.completionPercent}%` }}
                      />
                    </div>

                    {/* Compact Status Filter Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setStatusFilter(statusFilter === 'completed' ? 'all' : 'completed')}
                        className={`flex-1 min-w-fit px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          statusFilter === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-300'
                        }`}
                        title="Bấm để lọc các bài đã hoàn thành"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Đã xong: <strong className="text-emerald-300 font-mono">{progressStats.completed}</strong></span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatusFilter(statusFilter === 'in_progress' ? 'all' : 'in_progress')}
                        className={`flex-1 min-w-fit px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          statusFilter === 'in_progress'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-300'
                        }`}
                        title="Bấm để lọc các bài đang học dở dang"
                      >
                        <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>Đang học: <strong className="text-amber-300 font-mono">{progressStats.inProgress}</strong></span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatusFilter(statusFilter === 'unviewed' ? 'all' : 'unviewed')}
                        className={`flex-1 min-w-fit px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          statusFilter === 'unviewed'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-300'
                        }`}
                        title="Bấm để lọc các bài chưa học / chưa xem"
                      >
                        <Circle className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                        <span>Chưa học: <strong className="text-slate-300 font-mono">{progressStats.unviewed}</strong></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Script Control Header */}
                <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/30 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <List className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white truncate">Script theo nhịp</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono shrink-0">
                      {activeLesson?.sentences.length ? `${currentSentenceIdx + 1}/${activeLesson.sentences.length}` : '0/0'}
                    </span>
                    {(isPlayingMedia || isPlayingTtsSequence) && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    )}
                  </div>

                  {/* Quick Script Toggles */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowScriptTranslation(!showScriptTranslation)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        showScriptTranslation
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Hiện/Ẩn bản dịch tiếng Việt trong Script"
                    >
                      Dịch
                    </button>

                    {currentLang === 'ja' && (
                      <button
                        type="button"
                        onClick={toggleFurigana}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                          showFurigana
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Bật/Tắt Furigana"
                      >
                        Furi
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsAutoScrollEnabled(!isAutoScrollEnabled)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        isAutoScrollEnabled
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Tự động cuộn Script theo nhịp"
                    >
                      Auto
                    </button>
                  </div>
                </div>

                {/* Script Panel Scrollable Body */}
                <div
                  ref={scriptContainerRef}
                  className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 scroll-smooth"
                >
                  {activeLesson?.sentences.map((sent, idx) => {
                    const isCurrent = idx === currentSentenceIdx
                    const isPast = idx < currentSentenceIdx
                    const isNext = idx === currentSentenceIdx + 1
                    const isMediaOrTtsPlaying = currentMediaSrc ? isPlayingMedia : isPlayingTtsSequence
                    const sKey = `${activeLesson.id}_${idx}`
                    const sentenceScore =
                      sentenceScores[sKey] ?? lessonProgressMap[activeLesson.id]?.sentenceScores?.[idx]
                    const isPassed = typeof sentenceScore === 'number' && sentenceScore >= PASS_SCORE
                    const isFailed = typeof sentenceScore === 'number' && sentenceScore < PASS_SCORE
                    const hasGuide = Boolean(sent.mouthShape || sent.tonguePosition || sent.breathGuide)
                    const isGuideOpen = Boolean(expandedGuides[idx])

                    let sentenceProgressPct = 0
                    if (isCurrent && currentMediaSrc && typeof sent.startTime === 'number') {
                      const nextStart = activeLesson.sentences[idx + 1]?.startTime
                      const endT =
                        typeof sent.endTime === 'number'
                          ? sent.endTime
                          : typeof nextStart === 'number'
                          ? nextStart
                          : mediaDuration || sent.startTime + 4
                      const span = Math.max(0.2, endT - sent.startTime)
                      sentenceProgressPct = Math.min(
                        100,
                        Math.max(0, ((mediaCurrentTime - sent.startTime) / span) * 100)
                      )
                    }

                    return (
                      <div
                        key={sent.id || idx}
                        ref={(el) => {
                          scriptItemRefs.current[idx] = el
                        }}
                        onClick={() => handleJumpToSentence(idx, true)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500/40 shadow-md'
                            : isNext
                            ? 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-700/80 opacity-95'
                            : isPast
                            ? 'bg-slate-950/30 hover:bg-slate-800/50 border-slate-800/60 opacity-65 hover:opacity-100'
                            : 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800/80 opacity-85 hover:opacity-100'
                        }`}
                      >
                        {/* Top metadata + mini quick actions */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                isCurrent
                                  ? 'bg-emerald-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              #{idx + 1}
                            </span>

                            {typeof sent.startTime === 'number' && (
                              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                                {formatTime(sent.startTime)}
                              </span>
                            )}

                            {isCurrent && isMediaOrTtsPlaying && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                Đang chạy
                              </span>
                            )}

                            {isNext && (
                              <span className="text-[10px] font-semibold text-amber-400/90">
                                Tiếp theo
                              </span>
                            )}

                            {isPassed && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                {sentenceScore}đ
                              </span>
                            )}
                            {isFailed && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400">
                                <AlertCircle className="w-2.5 h-2.5" />
                                {sentenceScore}đ
                              </span>
                            )}
                          </div>

                          <div
                            className="flex items-center gap-1 shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {hasGuide && (
                              <button
                                type="button"
                                onClick={() => toggleSentenceGuide(idx)}
                                className={`px-1.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer ${
                                  isGuideOpen
                                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                }`}
                                title="Xem hướng dẫn khẩu hình & đặt lưỡi"
                              >
                                👄
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handlePlaySentenceAudio(sent, idx)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors cursor-pointer"
                              title="Nghe câu này"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openWebcamModalForSentence(idx)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isCurrent
                                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                              title="Mở Webcam luyện nói câu này"
                            >
                              <Mic className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Script Sentence Text */}
                        <div
                          className={
                            isCurrent
                              ? 'text-sm sm:text-base font-bold text-white leading-relaxed font-sans'
                              : 'text-xs sm:text-sm font-medium text-slate-200 leading-relaxed font-sans'
                          }
                        >
                          <FuriganaText
                            text={sent.text}
                            furigana={sent.furigana}
                            lang={currentLang}
                            showFurigana={showFurigana}
                          />
                        </div>

                        {/* Optional Translation */}
                        {showScriptTranslation && sent.translation && (
                          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                            {sent.translation}
                          </p>
                        )}

                        {/* Compact Pronunciation / Mouth Guide inside Script line */}
                        {hasGuide && isGuideOpen && (
                          <div className="mt-2 p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/25 space-y-1 text-[11px]">
                            {sent.mouthShape && (
                              <div>
                                <span className="font-bold text-indigo-300">👄 Khẩu hình: </span>
                                <span className="text-slate-300">{sent.mouthShape}</span>
                              </div>
                            )}
                            {sent.tonguePosition && (
                              <div>
                                <span className="font-bold text-purple-300">👅 Đặt lưỡi: </span>
                                <span className="text-slate-300">{sent.tonguePosition}</span>
                              </div>
                            )}
                            {sent.breathGuide && (
                              <div>
                                <span className="font-bold text-teal-300">💨 Luồng hơi: </span>
                                <span className="text-slate-300">{sent.breathGuide}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Rhythm Progress Bar on Active Line */}
                        {isCurrent && currentMediaSrc && typeof sent.startTime === 'number' && (
                          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-150"
                              style={{ width: `${sentenceProgressPct}%` }}
                            />
                          </div>
                        )}
                        {isCurrent && !currentMediaSrc && isPlayingTtsSequence && (
                          <div className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden mt-2">
                            <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
          </div>
        </main>
      </div>

      {/* Modal: Add Native Audio & Data Source */}
      <AudioImporterModal
        isOpen={showAudioImporter}
        onClose={() => setShowAudioImporter(false)}
        currentLang={currentLang}
        onLessonCreated={handleLessonCreated}
      />

      {/* Modal: Add Quick Custom Text */}
      {showAddCustom && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              Thêm bài đọc chữ ({langMeta.name})
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Bạn có thể dán bất kỳ bài báo, đoạn hội thoại hoặc lời bài hát nào để luyện đọc.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tiêu đề bài đọc
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Tin tức NHK / Đoạn hội thoại Anime / Bài phát biểu"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nội dung đoạn văn ({langMeta.nativeName})
                </label>
                <textarea
                  rows={4}
                  placeholder={`Dán đoạn văn bằng ${langMeta.name} vào đây...`}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Bản dịch tiếng Việt (Không bắt buộc)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ý nghĩa tiếng Việt để tham khảo..."
                  value={customTranslation}
                  onChange={(e) => setCustomTranslation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowAddCustom(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateCustomLesson}
                disabled={!customTitle.trim() || !customText.trim()}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold transition-colors"
              >
                Lưu và luyện tập ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Unified Webcam & Shadowing Studio */}
      {showWebcamModal && (
        <div
          onClick={handleCloseWebcamModal}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 max-w-2xl w-full shadow-2xl max-h-[94vh] overflow-y-auto space-y-3.5"
          >
            {/* 1. Compact Single-Row Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    disabled={isRecording || currentSentenceIdx <= 0}
                    onClick={handleModalPrevSentence}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors cursor-pointer"
                    title="Câu trước"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-emerald-400 px-2 font-mono whitespace-nowrap">
                    Câu {currentSentenceIdx + 1} / {activeLesson?.sentences.length || 1}
                  </span>
                  <button
                    type="button"
                    disabled={
                      isRecording ||
                      !activeLesson ||
                      currentSentenceIdx >= activeLesson.sentences.length - 1
                    }
                    onClick={handleModalNextSentence}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors cursor-pointer"
                    title={
                      isCurrentSentenceFailed
                        ? `Cần đạt ≥ ${PASS_SCORE}đ để mở khóa câu tiếp theo`
                        : 'Câu kế tiếp'
                    }
                  >
                    {isCurrentSentenceFailed &&
                    activeLesson &&
                    currentSentenceIdx < activeLesson.sentences.length - 1 ? (
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {typeof currentSentenceScore === 'number' && (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border font-mono shrink-0 ${
                      isCurrentSentencePassed
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {isCurrentSentencePassed ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                    <span>{currentSentenceScore}đ</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Record Mode Switch (Webcam vs Mic) */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    disabled={isRecording}
                    onClick={() => {
                      if (modalScoreResult) clearModalResult()
                      setRecordMode('video')
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 ${
                      recordMode === 'video'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Luyện nói ghi hình khuôn mặt với Webcam"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Webcam</span>
                  </button>
                  <button
                    type="button"
                    disabled={isRecording}
                    onClick={() => {
                      if (modalScoreResult) clearModalResult()
                      stopCamPreview()
                      setRecordMode('audio')
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 ${
                      recordMode === 'audio'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Chỉ thu âm giọng nói với Micro"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Micro</span>
                  </button>
                </div>

                {/* Close Modal Button */}
                <button
                  type="button"
                  onClick={handleCloseWebcamModal}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Đóng cửa sổ (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Smart Target Sentence Card (Sample + Inline Color Word Feedback) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {modalScoreResult ? (
                  <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
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
                ) : (
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                    {activeLesson?.title}
                  </p>
                )}

                <div className="flex items-center gap-1.5 ml-auto">
                  {(currentSentence?.mouthShape ||
                    currentSentence?.tonguePosition ||
                    currentSentence?.breathGuide) && (
                    <button
                      type="button"
                      onClick={() => setShowModalMouthGuide((prev) => !prev)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                        showModalMouthGuide
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                      title="Xem hướng dẫn khẩu hình, vị trí lưỡi và luồng hơi"
                    >
                      <span>👄</span>
                      <span>Mẹo</span>
                    </button>
                  )}

                  {currentSentence && (
                    <button
                      type="button"
                      disabled={isRecording}
                      onClick={() => handlePlaySentenceAudio(currentSentence, currentSentenceIdx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Nghe mẫu</span>
                    </button>
                  )}
                </div>
              </div>

              {modalScoreResult ? (
                <div className="flex flex-wrap gap-1.5 text-base sm:text-lg leading-relaxed pt-0.5">
                  {modalScoreResult.wordBreakdown.map((item, idx) => {
                    let chipClass = 'bg-slate-800 text-slate-200 border border-slate-700'
                    if (item.status === 'correct') {
                      chipClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    } else if (item.status === 'close') {
                      chipClass = 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    } else if (item.status === 'missed') {
                      chipClass =
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30 line-through decoration-rose-500'
                    }
                    return (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-lg font-semibold ${chipClass}`}
                      >
                        {item.word}
                      </span>
                    )
                  })}
                </div>
              ) : (
                <div className="text-lg sm:text-xl font-bold text-white leading-relaxed font-sans">
                  <FuriganaText
                    text={currentSentence?.text || 'Chưa chọn câu'}
                    furigana={currentSentence?.furigana}
                    lang={currentLang}
                    showFurigana={showFurigana}
                  />
                </div>
              )}

              {currentSentence?.phonetic && (
                <div className="text-xs font-mono text-emerald-400/90">{currentSentence.phonetic}</div>
              )}

              {currentSentence?.translation && (
                <p className="text-xs text-slate-400 leading-snug">
                  <span className="font-semibold text-slate-300 mr-1">Dịch:</span>
                  {currentSentence.translation}
                </p>
              )}

              {showModalMouthGuide &&
                (currentSentence?.mouthShape ||
                  currentSentence?.tonguePosition ||
                  currentSentence?.breathGuide) && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-indigo-300">
                    {currentSentence.mouthShape && (
                      <span>👄 {currentSentence.mouthShape}</span>
                    )}
                    {currentSentence.tonguePosition && (
                      <span>👅 {currentSentence.tonguePosition}</span>
                    )}
                    {currentSentence.breathGuide && (
                      <span>💨 {currentSentence.breathGuide}</span>
                    )}
                  </div>
                )}
            </div>

            {/* 3. Center Stage: Ready / Recording / Inline Playback (videoRef stays mounted) */}
            <div className="group/video relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover transform -scale-x-100 ${
                  recordMode !== 'video' || Boolean(modalScoreResult)
                    ? 'hidden'
                    : !isRecording && !isPreviewCam
                    ? 'opacity-70'
                    : 'opacity-100'
                }`}
              />

              {!modalScoreResult ? (
                <>
                  {recordMode === 'video' ? (
                    <>
                      {!isRecording && !isPreviewCam && (
                        <>
                          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={toggleCamPreview}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold shadow-md transition-all cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>Bật xem trước</span>
                            </button>
                          </div>
                        </>
                      )}
                      {!isRecording && isPreviewCam && (
                        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                          <span
                            className="flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm"
                            style={{ color: '#ffffff' }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            Xem trước
                          </span>
                          <button
                            type="button"
                            onClick={toggleCamPreview}
                            className="p-0.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[10px] flex items-center gap-1 px-1.5 cursor-pointer"
                            title="Tắt xem trước"
                          >
                            <CameraOff className="w-3 h-3 text-rose-400" />
                            <span>Tắt</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {isRecording && (
                        <div className="absolute inset-0 bg-rose-500/10 animate-pulse pointer-events-none" />
                      )}
                      <div className="absolute top-2.5 left-2.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-[11px] font-semibold backdrop-blur-sm">
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ghi âm qua Micro</span>
                      </div>
                    </>
                  )}

                  {/* Centered Play / Pause Shadowing Overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 pointer-events-none">
                    {!isRecording ? (
                      <>
                        <button
                          type="button"
                          onClick={handleStartRecording}
                          title={`Bắt đầu Shadowing (Câu ${currentSentenceIdx + 1})`}
                          aria-label={`Bắt đầu Shadowing (Câu ${currentSentenceIdx + 1})`}
                          className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/35 ring-4 ring-emerald-400/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                        </button>
                        <span className="px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-100 text-xs font-bold shadow-lg backdrop-blur-sm">
                          Bắt đầu Shadowing (Space)
                        </span>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handleStopRecording}
                          title="Dừng & Chấm điểm (Space)"
                          aria-label="Dừng & Chấm điểm"
                          className={`pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-2xl shadow-rose-500/35 ring-4 ring-rose-400/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                            recordMode === 'video'
                              ? 'opacity-65 group-hover/video:opacity-100'
                              : 'opacity-95 hover:opacity-100'
                          }`}
                        >
                          <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                        </button>
                        <span
                          className={`px-3.5 py-1 rounded-full bg-slate-900/90 border border-rose-500/40 text-slate-100 text-xs font-bold shadow-lg backdrop-blur-sm transition-opacity ${
                            recordMode === 'video'
                              ? 'opacity-75 group-hover/video:opacity-100'
                              : 'opacity-100'
                          }`}
                        >
                          Dừng &amp; Chấm điểm (Space)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Top-Right REC Badge */}
                  {isRecording && (
                    <div
                      className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-rose-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm animate-pulse"
                      style={{ color: '#ffffff' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <span>REC {recordingSeconds}s</span>
                    </div>
                  )}

                  {/* Bottom Recording HUD (Realtime STT + Slim VU Meter) */}
                  {isRecording && (
                    <div className="absolute bottom-2.5 inset-x-3 z-20 pointer-events-none space-y-1.5">
                      {(realtimeTranscript || speechStatus) && (
                        <div className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700/80 text-emerald-300 text-xs font-medium truncate backdrop-blur-sm shadow">
                          {realtimeTranscript
                            ? realtimeTranscript
                            : speechStatus === 'sound' || speechStatus === 'speech'
                            ? 'Đang nghe thấy giọng nói...'
                            : 'Micro đã mở — hãy đọc câu mẫu'}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-black/50 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-75"
                            style={{ width: `${audioLevel}%` }}
                          />
                        </div>
                        <span
                          className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60"
                          style={{ color: '#6ee7b7' }}
                        >
                          {audioLevel}%
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {modalRecordingUrl && modalRecordingType === 'video' ? (
                    <>
                      <video
                        key={modalRecordingUrl}
                        src={modalRecordingUrl}
                        controls
                        className="w-full h-full object-contain bg-black"
                      />
                      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-100 text-[11px] font-semibold backdrop-blur-sm">
                        Xem lại khẩu hình vừa ghi
                      </div>
                    </>
                  ) : (
                    <div className="w-full max-w-md mx-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-4 sm:p-5 flex flex-col items-center gap-3 text-center shadow-xl backdrop-blur-sm">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                        <Mic className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-slate-200">
                        Nghe lại giọng nói của bạn
                      </p>
                      {modalRecordingUrl && (
                        <audio
                          key={modalRecordingUrl}
                          src={modalRecordingUrl}
                          controls
                          className="w-full"
                        />
                      )}
                    </div>
                  )}

                  {/* Top-Right Score Pill */}
                  <div
                    className={`absolute top-2.5 right-2.5 z-20 pointer-events-none flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm ${
                      modalScoreResult.overallScore >= PASS_SCORE
                        ? 'bg-emerald-600/95'
                        : 'bg-rose-600/95'
                    }`}
                    style={{ color: '#ffffff' }}
                  >
                    {modalScoreResult.overallScore >= PASS_SCORE ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {modalScoreResult.overallScore}đ •{' '}
                      {modalScoreResult.overallScore >= PASS_SCORE
                        ? 'Đạt chuẩn'
                        : `Cần ≥ ${PASS_SCORE}đ`}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Inline Permission / Device Error Banner */}
            {mediaPermissionError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-0.5">
                  <p className="font-semibold text-rose-200 text-xs">Lỗi Microphone / Camera</p>
                  <p className="whitespace-pre-line text-[10px] leading-relaxed text-rose-300/90">
                    {mediaPermissionError}
                  </p>
                </div>
              </div>
            )}

            {/* Whisper Processing / STT Diagnostic Banner */}
            {isTranscribingWhisper && (
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin shrink-0" />
                <span className="font-semibold">Đang nhận diện giọng nói bằng OpenAI Whisper...</span>
              </div>
            )}

            {speechError && !mediaPermissionError && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">{speechError}</p>
              </div>
            )}

            {/* 4. Compact Score Summary & Seamless Action Bar */}
            {modalScoreResult && !isRecording && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-2xl border flex items-center gap-3 ${
                    modalScoreResult.overallScore >= PASS_SCORE
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 shrink-0 flex flex-col items-center justify-center font-mono ${
                      modalScoreResult.overallScore >= PASS_SCORE
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <span className="text-xl font-extrabold leading-none">
                      {modalScoreResult.overallScore}
                    </span>
                    <span className="text-[9px] font-bold uppercase mt-0.5">/100đ</span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm font-extrabold flex items-center gap-1 ${
                          modalScoreResult.overallScore >= PASS_SCORE
                            ? 'text-emerald-300'
                            : 'text-rose-300'
                        }`}
                      >
                        {modalScoreResult.overallScore >= PASS_SCORE
                          ? 'Đạt chuẩn!'
                          : `Chưa đủ điểm đỗ (cần ≥ ${PASS_SCORE}đ)`}
                        {modalScoreResult.overallScore >= 85 && (
                          <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>Chính xác {modalScoreResult.accuracyPercent}%</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">{modalScoreResult.feedback}</p>
                    <p className="text-[11px] text-slate-400 truncate">
                      <span className="font-semibold">Bạn nói: </span>
                      <span className="font-mono">
                        {modalScoreResult.spokenText || '(Không nhận diện rõ âm thanh)'}
                      </span>
                    </p>
                  </div>

                  {modalLocalPath && Boolean(window.electronAPI?.isElectron) && (
                    <button
                      type="button"
                      onClick={() => window.electronAPI?.openRecordingFolder?.()}
                      className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      title={modalLocalPath}
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mở thư mục</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  {modalScoreResult.overallScore < PASS_SCORE ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          currentSentence &&
                          handlePlaySentenceAudio(currentSentence, currentSentenceIdx)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span>Nghe lại mẫu</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRetryRecordingNow}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Làm lại ngay (Space)</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleRetryRecordingNow}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Đọc lại</span>
                      </button>

                      {!isLastSentenceOfLesson ? (
                        <button
                          type="button"
                          onClick={handleModalNextSentence}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                        >
                          <span>Câu tiếp theo</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            const doneTitle = activeLesson?.title || ''
                            handleCloseWebcamModal()
                            triggerToast(`🎉 Hoàn thành bài "${doneTitle}"!`)
                          }}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Hoàn thành bài</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
