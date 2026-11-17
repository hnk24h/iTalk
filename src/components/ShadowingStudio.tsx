import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Language, Lesson, LessonSentence, ScoreResult, LessonProgress, LearningStatus } from '../types'
import { supportedLanguages, defaultLessonsByLanguage } from '../data/languages'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer } from '../services/speech'
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
import { setAudioOutputDevice } from '../services/deviceManager'
import { FuriganaText } from '../services/furigana'
import { AudioImporterModal } from './AudioImporterModal'
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
  RotateCcw,
  PlusCircle,
  HelpCircle,
  CheckCircle,
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
  onScoreReady: (result: ScoreResult, videoBlobUrl?: string, localPath?: string) => void
}

export const ShadowingStudio: React.FC<ShadowingStudioProps> = ({
  currentLang,
  onScoreReady,
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

  // Sidebar Filter & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [lessonFilter, setLessonFilter] = useState<'all' | 'native' | 'tts'>('all')
  const [statusFilter, setStatusFilter] = useState<LearningStatus>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false)

  // Persistent lesson learning progress state
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, LessonProgress>>(() =>
    loadAllLessonProgress()
  )

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

  // Recording state
  const [recordMode, setRecordMode] = useState<'video' | 'audio'>('video')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [realtimeTranscript, setRealtimeTranscript] = useState('')

  // Modals state
  const [showAddCustom, setShowAddCustom] = useState(false)
  const [showAudioImporter, setShowAudioImporter] = useState(false)
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
  const mediaRecorderRef = useRef<MediaRecordingManager>(new MediaRecordingManager())
  const speechRecognizerRef = useRef<SpeechRecognizer>(new SpeechRecognizer())
  const timerIntervalRef = useRef<any>(null)
  const audioCheckIntervalRef = useRef<any>(null)
  const activeLessonRef = useRef<HTMLDivElement | null>(null)

  // Expanded state for lessons in sidebar (lessonId -> boolean)
  const [expandedLessonIds, setExpandedLessonIds] = useState<Record<string, boolean>>({})

  // Load lessons for current language
  useEffect(() => {
    const builtin = defaultLessonsByLanguage[currentLang] || []
    const custom = loadCustomLessons().filter((l) => l.language === currentLang)
    const combined = [...builtin, ...custom]
    setLessons(combined)
    if (combined.length > 0) {
      setActiveLessonId(combined[0].id)
      setCurrentSentenceIdx(0)
    }
  }, [currentLang])

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

  // Auto-scroll active lesson into view in sidebar
  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeLessonId])

  // Load original audio blob from IndexedDB if needed
  useEffect(() => {
    if (activeLesson) {
      if (activeLesson.originalAudioUrl) {
        setAudioSourceMode('native')
      } else if (activeLesson.audioBlobId) {
        getAudioBlob(activeLesson.audioBlobId).then((res) => {
          if (res) {
            const url = URL.createObjectURL(res.blob)
            activeLesson.originalAudioUrl = url
            setAudioSourceMode('native')
          } else {
            setAudioSourceMode('tts')
          }
        })
      } else {
        setAudioSourceMode('tts')
      }
    }
  }, [activeLessonId])

  // Stop playback when sentence changes or unmounts
  useEffect(() => {
    stopPlayback()
    setRealtimeTranscript('')
  }, [activeLessonId, currentSentenceIdx])

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
      stopPlayback()
      stopCamPreview()
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
    stopTextToSpeech()
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
    setRealtimeTranscript('')
    setRecordingSeconds(0)
    setMediaPermissionError(null)

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
          onResult: (transcript, isFinal) => {
            setRealtimeTranscript(transcript)
          },
          onError: (e) => {
            console.warn('Speech recognition warning:', e)
          },
          onEnd: () => {},
        })
      }
    } catch (err: any) {
      console.error('Start recording error:', err)
      setMediaPermissionError(err.message)
      alert(err.message)
      setIsRecording(false)
    }
  }

  // Handle Stop Recording & Scoring
  const handleStopRecording = async () => {
    if (!isRecording) return

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    speechRecognizerRef.current.stop()

    try {
      const recResult = await mediaRecorderRef.current.stop()
      setIsRecording(false)
      setAudioLevel(0)

      // Evaluate pronunciation
      const transcriptToEvaluate = realtimeTranscript || (currentSentence?.speakText || currentSentence?.text)?.slice(0, 5) || ''
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

      // Notify parent to show Scoring Modal
      onScoreReady(score, recResult.blobUrl, savedEntry.localPath)
    } catch (err: any) {
      alert(`Lỗi khi dừng ghi: ${err.message}`)
      setIsRecording(false)
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

  // Filter lessons in sidebar
  const filteredLessons = useMemo(() => {
    return lessons.filter((l: Lesson) => {
      const matchSearch =
        !searchQuery.trim() ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.category && l.category.toLowerCase().includes(searchQuery.toLowerCase()))

      if (!matchSearch) return false

      if (selectedLevel !== 'all') {
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
  }, [lessons, searchQuery, selectedLevel, selectedCategory, lessonFilter, statusFilter, lessonProgressMap])

  // Overall learning progress statistics
  const progressStats = useMemo(() => {
    let unviewed = 0
    let inProgress = 0
    let completed = 0

    const baseList = selectedLevel === 'all'
      ? lessons
      : lessons.filter((l: Lesson) => {
          const normalizedLvl = l.level.startsWith('HSK')
            ? (l.level.match(/HSK\s*\d+/)?.[0] || l.level)
            : (l.level.split(' ')[0] || l.level)
          return normalizedLvl.startsWith(selectedLevel) || l.level.toLowerCase().includes(selectedLevel.toLowerCase())
        })

    baseList.forEach((l) => {
      const prog = lessonProgressMap[l.id]
      if (prog && (prog.isCompleted || (prog.progressPercent || 0) >= 100)) {
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
  }, [lessons, lessonProgressMap, selectedLevel])

  // Group lessons by level
  const groupedLessonsByLevel = useMemo(() => {
    const groups: { levelKey: string; lessons: Lesson[] }[] = []
    const map = new Map<string, Lesson[]>()

    filteredLessons.forEach((l: Lesson) => {
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
  }, [filteredLessons, currentLang])

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
    setLessons([...defaultLessonsByLanguage[currentLang], ...updated])
    setActiveLessonId(newLesson.id)
    setCurrentSentenceIdx(0)
    setShowAddCustom(false)
    setCustomTitle('')
    setCustomText('')
    setCustomTranslation('')
    triggerToast(`Đã tạo bài đọc mới: "${newLesson.title}"`)
  }

  // Toggle expansion of a lesson's sentence list
  const toggleExpandLesson = (lessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setExpandedLessonIds((prev) => {
      const isCurrentlyExpanded =
        prev[lessonId] !== undefined ? prev[lessonId] : lessonId === activeLessonId
      return { ...prev, [lessonId]: !isCurrentlyExpanded }
    })
  }

  // Check if all filtered lessons are expanded
  const areAllLessonsExpanded = useMemo(() => {
    if (filteredLessons.length === 0) return false
    return filteredLessons.every((l: Lesson) =>
      expandedLessonIds[l.id] !== undefined ? expandedLessonIds[l.id] : l.id === activeLessonId
    )
  }, [filteredLessons, expandedLessonIds, activeLessonId])

  // Toggle expand / collapse all lessons
  const toggleExpandAllLessons = () => {
    const nextState = !areAllLessonsExpanded
    const newMap: Record<string, boolean> = {}
    filteredLessons.forEach((l: Lesson) => {
      newMap[l.id] = nextState
    })
    setExpandedLessonIds(newMap)
  }

  // Handle selecting a lesson
  const handleSelectLesson = (lessonId: string) => {
    if (lessonId === activeLessonId) {
      toggleExpandLesson(lessonId)
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
    setExpandedLessonIds((prev) => ({ ...prev, [lessonId]: true }))
    setIsSidebarOpenMobile(false)
  }

  // Handle selecting a specific sentence inside any lesson
  const handleSelectSentence = (lessonId: string, sentenceIdx: number) => {
    const isDifferentLesson = lessonId !== activeLessonId
    const isDifferentSentence = isDifferentLesson || sentenceIdx !== currentSentenceIdx

    if (isDifferentSentence && isCurrentSentenceFailed) {
      triggerToast(
        `🔒 Chưa đạt điểm Pass ở câu hiện tại (${currentSentenceScore}/100đ, cần ≥ ${PASS_SCORE}đ). Hãy luyện tập lại câu này để đạt chuẩn trước khi chọn bài hoặc câu khác!`
      )
      return
    }

    if (isDifferentLesson) {
      setActiveLessonId(lessonId)
      setExpandedLessonIds((prev) => ({ ...prev, [lessonId]: true }))
    }
    setCurrentSentenceIdx(sentenceIdx)
    setIsSidebarOpenMobile(false)
  }

  // Render an individual Lesson Card with expandable sentence list
  const renderLessonCard = (l: Lesson) => {
    const isActive = l.id === activeLessonId
    const isExpanded =
      expandedLessonIds[l.id] !== undefined ? expandedLessonIds[l.id] : isActive
    const hasOriginal = Boolean(l.originalAudioUrl || l.audioBlobId)
    const lvlClass = getLevelBadgeClass(l.level)
    const progress = lessonProgressMap[l.id]
    const isCompleted = Boolean(progress?.isCompleted || (progress?.progressPercent ?? 0) >= 100)
    const hasPracticed = Boolean((progress?.practicedCount ?? 0) > 0)
    const hasViewed = Boolean(progress?.hasViewed)
    const progressPercent = progress?.progressPercent ?? 0

    return (
      <div
        key={l.id}
        ref={isActive ? activeLessonRef : null}
        onClick={() => handleSelectLesson(l.id)}
        className={`p-3 rounded-2xl border text-left cursor-pointer transition-all duration-150 relative ${
          isActive
            ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
            : 'bg-slate-950/70 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
        }`}
      >
        {/* Top Row: Level, Source Badge & Sentence Count Expand Toggle */}
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvlClass}`}
            >
              {l.level || 'Bài đọc'}
            </span>
            {hasOriginal ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Headphones className="w-2.5 h-2.5" /> Gốc
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Volume2 className="w-2.5 h-2.5" /> AI
              </span>
            )}
          </div>

          {/* Expand / Collapse Button */}
          <button
            type="button"
            onClick={(e) => toggleExpandLesson(l.id, e)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
              isExpanded
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
            title={isExpanded ? 'Thu gọn danh sách câu' : 'Mở xem danh sách các câu trong bài'}
          >
            <span>{l.sentences.length} câu</span>
            {isExpanded ? (
              <ChevronUp className="w-3 h-3 text-emerald-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </div>

        {/* Lesson Title */}
        <h4
          className={`text-xs font-bold leading-snug line-clamp-2 ${
            isActive ? 'text-white' : 'text-slate-300'
          }`}
        >
          {l.title}
        </h4>

        {/* Topic / Category Tag */}
        {l.category && (
          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-medium">
            <Tag className="w-2.5 h-2.5 text-teal-400 shrink-0" />
            <span className="truncate">{l.category}</span>
          </div>
        )}

        {/* Learning Progress Indicator Badge & Mini Progress Bar */}
        <div className="mt-2 pt-2 border-t border-slate-800/70">
          {isCompleted ? (
            <div className="flex items-center justify-between text-[10px]">
              <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Hoàn thành (100%)</span>
              </span>
              {progress?.bestScore !== undefined && (
                <span className="font-semibold text-emerald-300">
                  🏆 {progress.bestScore}đ
                </span>
              )}
            </div>
          ) : hasPracticed ? (
            <div>
              <div className="flex items-center justify-between text-[10px] font-semibold text-amber-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Đang học ({progress?.practicedSentences?.length || 0}/{l.sentences.length} câu)</span>
                </span>
                <span className="font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1 mt-1 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : hasViewed ? (
            <div className="flex items-center justify-between text-[10px]">
              <span className="inline-flex items-center gap-1 font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                <Eye className="w-3 h-3 text-cyan-400" />
                <span>Đã xem (Chưa luyện)</span>
              </span>
              <span className="text-slate-500 font-mono">0%</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[10px]">
              <span className="inline-flex items-center gap-1 font-medium text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                <Circle className="w-2.5 h-2.5 text-slate-600" />
                <span>Chưa học</span>
              </span>
              <span className="text-[9px] text-slate-500 italic">Chưa xem</span>
            </div>
          )}
        </div>

        {/* Active Learning Progress Info (collapsed mode) */}
        {isActive && !isExpanded && (
          <div className="mt-2 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                Đang luyện: Câu {currentSentenceIdx + 1}/{l.sentences.length}
              </span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        )}

        {/* EXPANDED SENTENCE LIST */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 px-0.5">
              <span>Danh sách {l.sentences.length} câu:</span>
              <span className="text-[9px] text-emerald-400/90 italic font-normal">
                Click để chọn câu
              </span>
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto pr-0.5 scrollbar-thin">
              {l.sentences.map((sent, sIdx) => {
                const isCurrentSentence = isActive && currentSentenceIdx === sIdx
                const isSentPracticed = Boolean(progress?.practicedSentences?.includes(sIdx))
                const sentScore = progress?.sentenceScores?.[sIdx]

                return (
                  <div
                    key={sent.id || `sent-${sIdx}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectSentence(l.id, sIdx)
                    }}
                    className={`p-2 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                      isCurrentSentence
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-white shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                            isCurrentSentence
                              ? 'bg-emerald-400 text-slate-950 font-black'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {sIdx + 1}
                        </span>
                        {isCurrentSentence && (
                          <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5">
                            <Play className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />
                            Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isSentPracticed ? (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border flex items-center gap-0.5 ${
                              (sentScore || 0) >= 80
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : (sentScore || 0) >= 60
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5" />
                            <span>{sentScore ? `${sentScore}đ` : 'Đã luyện'}</span>
                          </span>
                        ) : (
                          <span className="text-[9px] text-slate-500 flex items-center gap-0.5">
                            <Circle className="w-2 h-2 text-slate-600" />
                            <span>Chưa luyện</span>
                          </span>
                        )}

                        {typeof sent.startTime === 'number' && typeof sent.endTime === 'number' && (
                          <span className="text-[9px] font-mono text-slate-500">
                            {Math.floor(sent.startTime)}s - {Math.ceil(sent.endTime)}s
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sentence Text with Furigana if Japanese */}
                    <div className="text-xs font-medium leading-relaxed">
                      <FuriganaText
                        text={sent.text}
                        furigana={sent.furigana}
                        lang={currentLang}
                        showFurigana={showFurigana}
                      />
                    </div>

                    {/* Vietnamese Translation */}
                    {sent.translation && (
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-normal">
                        {sent.translation}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
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
        {/* ======================================================== */}
        {/* 1. SIDEBAR: LESSONS LIST & 2-MODE SWITCH                  */}
        {/* ======================================================== */}
        <aside
          className={`w-full lg:w-80 xl:w-96 2xl:w-[420px] flex-shrink-0 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col space-y-4 ${
            isSidebarOpenMobile ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Danh sách bài học</span>
                  <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-normal">
                    {lessons.length}
                  </span>
                </h3>
                <span className="text-[11px] text-slate-400">{langMeta.name} ({langMeta.nativeName})</span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsSidebarOpenMobile(false)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input, Level Selector & Topic Filters */}
          <div className="space-y-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm bài theo tên, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Overall Learning Progress Card */}
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tiến độ học tập</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-400 font-mono">
                  {progressStats.completed}/{progressStats.total} ({progressStats.completionPercent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800/80">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressStats.completionPercent}%` }}
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="grid grid-cols-4 gap-1 pt-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`py-1 rounded-lg font-semibold transition-all text-center ${
                    statusFilter === 'all'
                      ? 'bg-slate-800 text-white shadow-xs ring-1 ring-slate-700'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                  title="Hiển thị tất cả bài học"
                >
                  <span>Tất cả</span>
                  <span className="block text-[9px] opacity-75 font-normal">{progressStats.total}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('unviewed')}
                  className={`py-1 rounded-lg font-semibold transition-all text-center ${
                    statusFilter === 'unviewed'
                      ? 'bg-rose-950/70 text-rose-300 ring-1 ring-rose-500/50 shadow-xs'
                      : 'text-slate-400 hover:text-rose-300 hover:bg-slate-900'
                  }`}
                  title="Chỉ hiển thị bài chưa học / chưa xem"
                >
                  <span>Chưa học</span>
                  <span className="block text-[9px] opacity-75 font-normal">{progressStats.unviewed}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('in_progress')}
                  className={`py-1 rounded-lg font-semibold transition-all text-center ${
                    statusFilter === 'in_progress'
                      ? 'bg-amber-950/70 text-amber-300 ring-1 ring-amber-500/50 shadow-xs'
                      : 'text-slate-400 hover:text-amber-300 hover:bg-slate-900'
                  }`}
                  title="Chỉ hiển thị bài đang học"
                >
                  <span>Đang học</span>
                  <span className="block text-[9px] opacity-75 font-normal">{progressStats.inProgress}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('completed')}
                  className={`py-1 rounded-lg font-semibold transition-all text-center ${
                    statusFilter === 'completed'
                      ? 'bg-emerald-950/70 text-emerald-300 ring-1 ring-emerald-500/50 shadow-xs'
                      : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900'
                  }`}
                  title="Chỉ hiển thị bài đã hoàn thành"
                >
                  <span>Đã xong</span>
                  <span className="block text-[9px] opacity-75 font-normal">{progressStats.completed}</span>
                </button>
              </div>
            </div>

            {/* Level Filter Bar (N5 đến N1) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-0.5">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cấp độ:</span>
                </span>
                {selectedLevel !== 'all' && (
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                  >
                    Xem tất cả ({lessons.length})
                  </button>
                )}
              </div>
              <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                {availableLevels.map((lvl: string) => {
                  const isSel = selectedLevel === lvl
                  const count =
                    lvl === 'all'
                      ? lessons.length
                      : lessons.filter((l: Lesson) => l.level.startsWith(lvl)).length

                  return (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isSel
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
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
            </div>

            {/* Topic / Category Filter Dropdown */}
            {availableCategories.length > 1 && (
              <div className="flex items-center gap-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5">
                <Tag className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs w-full focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900 text-slate-200">
                    Tất cả chủ đề ({lessons.length} bài)
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

            {/* Audio Source Filters */}
            <div className="flex gap-1 text-[11px] bg-slate-950 p-1 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setLessonFilter('all')}
                className={`flex-1 py-1 rounded-lg font-semibold transition-colors ${
                  lessonFilter === 'all'
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setLessonFilter('native')}
                className={`flex-1 py-1 rounded-lg font-semibold transition-colors ${
                  lessonFilter === 'native'
                    ? 'bg-slate-800 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🎧 Gốc
              </button>
              <button
                onClick={() => setLessonFilter('tts')}
                className={`flex-1 py-1 rounded-lg font-semibold transition-colors ${
                  lessonFilter === 'tts'
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔊 Mẫu AI
              </button>
            </div>

            {/* Lessons Count & Expand All Toggle */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
              <span className="font-semibold text-slate-300">
                {filteredLessons.length} bài học
              </span>
              {filteredLessons.length > 0 && (
                <button
                  type="button"
                  onClick={toggleExpandAllLessons}
                  className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors"
                  title={areAllLessonsExpanded ? 'Thu gọn tất cả các câu' : 'Mở rộng hiển thị tất cả các câu'}
                >
                  <Layers className="w-3 h-3" />
                  <span>
                    {areAllLessonsExpanded ? 'Thu gọn tất cả câu' : 'Mở rộng tất cả câu'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* LESSONS LIST (SCROLLABLE & GROUPED) */}
          <div className="space-y-2 max-h-[calc(100vh-230px)] min-h-[460px] overflow-y-auto pr-1">
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
                {statusFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
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
                    <div className="sticky top-0 z-10 my-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs shadow-sm">
                      <div className="flex items-center gap-1.5 font-bold text-white min-w-0">
                        <span>{meta?.icon || '📚'}</span>
                        <span className="truncate">{meta?.title || group.levelKey}</span>
                        {meta?.desc && (
                          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline truncate">
                            • {meta.desc}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 shrink-0">
                        {group.lessons.length} bài
                      </span>
                    </div>

                    {/* Group's lessons */}
                    <div className="space-y-2">
                      {group.lessons.map((l: Lesson) => renderLessonCard(l))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="space-y-2">
                {filteredLessons.map((l: Lesson) => renderLessonCard(l))}
              </div>
            )}
          </div>
        </aside>

        {/* ======================================================== */}
        {/* 2. MAIN WORKSPACE: SHADOWING STUDIO                      */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 w-full space-y-5">
          {/* Top Bar of Studio: Current Lesson Details, Advance Mode Pill & Record Mode */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
            {/* Active Lesson Meta & Mobile Sidebar Toggle */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile Sidebar Toggle Button */}
              <button
                onClick={() => setIsSidebarOpenMobile(true)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex-shrink-0"
                title="Mở danh sách bài học"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                {activeLesson?.originalAudioUrl ? (
                  <FileAudio className="w-5 h-5 text-indigo-400" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeLesson?.level || 'Bài học'}
                  </span>
                  <span className="text-xs text-slate-400 truncate">{activeLesson?.category}</span>
                  {activeLesson?.originalAudioUrl && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      <Headphones className="w-3 h-3" /> Audio gốc
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  {activeLesson?.title}
                </h3>
              </div>
            </div>

            {/* Right: Toolbar (Advance Mode, Action Buttons & Record Mode) */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
              {/* Advance Mode Switcher (Auto vs Manual) */}
              <div
                className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0"
                title="Chế độ chuyển bài khi kết thúc câu cuối"
              >
                <button
                  type="button"
                  onClick={() => handleSetAdvanceMode('auto')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    advanceMode === 'auto'
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Tự động nhảy sang bài kế tiếp sau khi hoàn thành câu cuối"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Auto bài</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetAdvanceMode('manual')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    advanceMode === 'manual'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Tự chọn bài trong danh sách theo ý muốn"
                >
                  <MousePointer className="w-3.5 h-3.5" />
                  <span>Tự chọn</span>
                </button>
              </div>

              {/* Action Buttons: Import Audio & Add Custom Text */}
              <button
                type="button"
                onClick={() => setShowAudioImporter(true)}
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                title="Nạp file nghe MP3/WAV gốc và lời phụ đề"
              >
                <FileAudio className="w-3.5 h-3.5" />
                <span>+ Nạp audio</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddCustom(true)}
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-colors cursor-pointer shrink-0"
                title="Dán đoạn văn bản để tự luyện đọc"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+ Soạn chữ</span>
              </button>

              {/* Record Mode Switch (Webcam vs Mic) */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setRecordMode('video')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
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
                  onClick={() => setRecordMode('audio')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
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
            </div>
          </div>

          {/* Main Studio Grid: Target Sentence (Left) + Webcam & Shadowing (Right) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Target Sentence & Audio Player */}
            <div className="xl:col-span-8 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                {/* Sentence Header & Pager */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Câu {currentSentenceIdx + 1} / {activeLesson?.sentences.length || 1}
                    </span>
                    {typeof currentSentence?.startTime === 'number' && (
                      <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                        ⏱ {currentSentence.startTime.toFixed(1)}s
                        {currentSentence.endTime ? ` - ${currentSentence.endTime.toFixed(1)}s` : ''}
                      </span>
                    )}

                    {/* Pass / Fail Status Pill on Sentence */}
                    {isCurrentSentencePassed && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Đạt Pass ({currentSentenceScore}đ)
                      </span>
                    )}
                    {isCurrentSentenceFailed && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
                        <Lock className="w-3 h-3" />
                        Chưa đạt ({currentSentenceScore}/{PASS_SCORE}đ) — Khóa qua bài
                      </span>
                    )}
                  </div>

                  {/* Prev / Next Sentence & Auto Lesson Transition Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={currentSentenceIdx <= 0 && advanceMode === 'manual'}
                      onClick={handlePrevSentence}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors"
                      title={currentSentenceIdx === 0 && advanceMode === 'auto' ? 'Quay lại bài trước' : 'Câu trước'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono text-slate-400 px-1">
                      {currentSentenceIdx + 1}/{activeLesson?.sentences.length || 1}
                    </span>

                    {/* Next Sentence or Next Lesson Button (Locked if failed) */}
                    {isLastSentenceOfLesson && advanceMode === 'auto' ? (
                      <button
                        onClick={handleNextSentence}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 ${
                          isCurrentSentenceFailed
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 animate-pulse'
                        }`}
                        title={
                          isCurrentSentenceFailed
                            ? `Khóa: Chưa đạt điểm Pass (${currentSentenceScore}/${PASS_SCORE}đ). Hãy luyện tập lại câu này để mở khóa bài tiếp!`
                            : 'Hết bài - Tự động chuyển sang bài tiếp theo'
                        }
                      >
                        {isCurrentSentenceFailed ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Khóa</span>
                          </>
                        ) : (
                          <>
                            <span>Bài tiếp</span>
                            <FastForward className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        disabled={isLastSentenceOfLesson && advanceMode === 'manual'}
                        onClick={handleNextSentence}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isCurrentSentenceFailed
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25'
                            : 'bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300'
                        }`}
                        title={
                          isCurrentSentenceFailed
                            ? `Khóa: Chưa đạt điểm Pass (${currentSentenceScore}/${PASS_SCORE}đ). Hãy luyện tập lại câu này để mở khóa!`
                            : isLastSentenceOfLesson
                            ? 'Câu cuối của bài'
                            : 'Câu kế tiếp'
                        }
                      >
                        {isCurrentSentenceFailed ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Phonetic Transcription & Furigana Controls */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  {currentSentence?.phonetic && (
                    <span className="text-xs font-mono text-emerald-400/90 tracking-wide bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10">
                      {currentSentence.phonetic}
                    </span>
                  )}

                  {/* Furigana toggle button for Japanese */}
                  {currentLang === 'ja' && (
                    <button
                      type="button"
                      onClick={toggleFurigana}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        showFurigana
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                      }`}
                      title={showFurigana ? 'Tắt hiển thị Furigana trên chữ Kanji' : 'Bật hiển thị Furigana trên chữ Kanji'}
                    >
                      <span>Furigana:</span>
                      <span className={showFurigana ? 'text-emerald-300 font-bold' : 'text-slate-400'}>
                        {showFurigana ? 'Bật (Hiragana)' : 'Tắt'}
                      </span>
                    </button>
                  )}
                </div>

                {/* Target Big Text (With Furigana on Kanji for Japanese) */}
                <div className="my-5">
                  <h2 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white leading-loose tracking-normal font-sans">
                    <FuriganaText
                      text={currentSentence?.text || ''}
                      furigana={currentSentence?.furigana}
                      lang={currentLang}
                      showFurigana={showFurigana}
                    />
                  </h2>
                </div>

                {/* Vietnamese Translation */}
                {currentSentence?.translation && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-400 mb-1">Dịch nghĩa:</div>
                    <div className="text-sm text-slate-200">{currentSentence.translation}</div>
                  </div>
                )}

                {/* Pronunciation, Mouth & Tongue Guide Card */}
                {(currentSentence?.mouthShape || currentSentence?.tonguePosition || currentSentence?.breathGuide) && (
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/25 shadow-lg shadow-indigo-950/30">
                    <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      <span className="text-base">👄</span>
                      <span>Hướng dẫn phát âm & Khẩu hình chuẩn</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                      {currentSentence.mouthShape && (
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-1">
                            <span>👄</span>
                            <span>Khẩu hình miệng</span>
                          </div>
                          <div className="text-slate-200 leading-relaxed">{currentSentence.mouthShape}</div>
                        </div>
                      )}
                      {currentSentence.tonguePosition && (
                        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-1">
                            <span>👅</span>
                            <span>Cách đặt lưỡi</span>
                          </div>
                          <div className="text-slate-200 leading-relaxed">{currentSentence.tonguePosition}</div>
                        </div>
                      )}
                      {currentSentence.breathGuide && (
                        <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20">
                          <div className="flex items-center gap-1.5 font-bold text-teal-300 mb-1">
                            <span>💨</span>
                            <span>Luồng hơi & Dây thanh</span>
                          </div>
                          <div className="text-slate-200 leading-relaxed">{currentSentence.breathGuide}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Grammar / Pronunciation Note */}
                {currentSentence?.grammarNote && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-2.5 text-xs text-amber-300/90">
                    <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">Ghi chú: </span>
                      {currentSentence.grammarNote}
                    </div>
                  </div>
                )}

                {/* Audio Model Controls: Native Audio vs TTS Switch */}
                <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                  {/* Audio Source Switcher if Native Audio exists */}
                  {activeLesson?.originalAudioUrl && (
                    <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 font-medium">Nguồn phát mẫu:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setAudioSourceMode('native')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                            audioSourceMode === 'native'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Headphones className="w-3.5 h-3.5" />
                          <span>File gốc</span>
                        </button>
                        <button
                          onClick={() => setAudioSourceMode('tts')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                            audioSourceMode === 'tts'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Giọng AI (TTS)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePlayModel}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                          isPlayingAudio
                            ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                            : audioSourceMode === 'native' && activeLesson?.originalAudioUrl
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        }`}
                      >
                        {isPlayingAudio ? (
                          <>
                            <Square className="w-4 h-4 fill-white" />
                            <span>Dừng nghe</span>
                          </>
                        ) : (
                          <>
                            {audioSourceMode === 'native' && activeLesson?.originalAudioUrl ? (
                              <Headphones className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                            <span>
                              {audioSourceMode === 'native' && activeLesson?.originalAudioUrl
                                ? 'Nghe file gốc'
                                : 'Nghe phát âm chuẩn'}
                            </span>
                          </>
                        )}
                      </button>

                      {/* Auto loop toggle */}
                      <button
                        onClick={() => setAutoLoop(!autoLoop)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                          autoLoop
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Lặp lại tự động để ngấm ngữ điệu"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Lặp: {autoLoop ? 'Bật' : 'Tắt'}</span>
                      </button>
                    </div>

                    {/* Speed rate selector */}
                    <div className="flex items-center gap-1 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <span className="text-slate-400 px-2 font-medium">Tốc độ:</span>
                      {[0.75, 1.0, 1.25].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setSpeechRate(rate)}
                          className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                            speechRate === rate
                              ? 'bg-slate-800 text-emerald-400'
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

            {/* Webcam Preview, Live Mic Meter & Shadowing Action (Compact & Refined) */}
            <div className="xl:col-span-4 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col justify-between">
                {/* Webcam / Audio Visualizer Box */}
                <div className="relative w-full aspect-video max-h-52 sm:max-h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {recordMode === 'video' ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`w-full h-full max-h-52 sm:max-h-56 object-cover transform -scale-x-100 ${
                          !isRecording && !isPreviewCam ? 'opacity-70' : 'opacity-100'
                        }`}
                      />
                      {!isRecording && !isPreviewCam && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 p-3 text-center">
                          <Video className="w-8 h-8 text-slate-400 mb-1 opacity-60" />
                          <p className="text-xs text-slate-200 font-semibold">
                            Webcam xem khẩu hình
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 mb-2.5">
                            Quan sát khẩu hình miệng khi nói
                          </p>
                          <button
                            type="button"
                            onClick={toggleCamPreview}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold shadow-md transition-all cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            Bật xem trước
                          </button>
                        </div>
                      )}
                      {!isRecording && isPreviewCam && (
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            Xem trước
                          </span>
                          <button
                            type="button"
                            onClick={toggleCamPreview}
                            className="p-0.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[10px] flex items-center gap-1 px-1.5 cursor-pointer"
                            title="Tắt xem trước"
                          >
                            <CameraOff className="w-3 h-3 text-rose-400" />
                            <span>Tắt</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                          isRecording
                            ? 'bg-rose-500/20 text-rose-400 scale-105 shadow-md shadow-rose-500/20 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Mic className="w-7 h-7" />
                      </div>
                      <p className="text-xs text-slate-200 mt-2 font-semibold">Ghi âm qua Micro</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Tập trung vào ngữ điệu câu nói
                      </p>
                    </div>
                  )}

                  {/* Recording indicator badge */}
                  {isRecording && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-rose-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <span>REC {recordingSeconds}s</span>
                    </div>
                  )}
                </div>

                {/* Inline Permission / Device Error Banner */}
                {mediaPermissionError && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-0.5">
                      <p className="font-semibold text-rose-200 text-xs">Lỗi Microphone / Camera</p>
                      <p className="whitespace-pre-line text-[10px] leading-relaxed text-rose-300/90">
                        {mediaPermissionError}
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Mic Audio Level VU Meter */}
                <div className="mt-2.5">
                  {isRecording && (
                    <div className="space-y-1 mb-1.5">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Âm lượng giọng:</span>
                        <span className="font-mono text-emerald-400 font-bold">{audioLevel}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-75"
                          style={{ width: `${audioLevel}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Realtime STT transcript preview */}
                {isRecording && realtimeTranscript && (
                  <div className="mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-0.5">
                      Nhận diện trực tiếp:
                    </span>
                    <span className="text-emerald-300 font-medium text-xs">{realtimeTranscript}</span>
                  </div>
                )}

                {/* Big Action Buttons */}
                <div className="mt-3">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-transform active:scale-[0.99]"
                    >
                      <Radio className="w-4 h-4 animate-pulse" />
                      <span>BẮT ĐẦU SHADOWING</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 transition-transform active:scale-[0.99] animate-pulse"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>DỪNG & CHẤM ĐIỂM</span>
                    </button>
                  )}
                </div>
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
    </div>
  )
}
