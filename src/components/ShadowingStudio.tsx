import React, { useState, useEffect, useRef } from 'react'
import { Language, Lesson, LessonSentence, ScoreResult } from '../types'
import { supportedLanguages, defaultLessonsByLanguage } from '../data/languages'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer } from '../services/speech'
import { MediaRecordingManager } from '../services/mediaRecorder'
import { evaluatePronunciation } from '../services/scoring'
import { saveRecordingEntry, loadCustomLessons, saveCustomLesson, loadSettings } from '../services/storage'
import { getAudioBlob } from '../services/audioDb'
import { setAudioOutputDevice } from '../services/deviceManager'
import { AudioImporterModal } from './AudioImporterModal'
import {
  Volume2,
  Square,
  Mic,
  Video,
  ChevronLeft,
  ChevronRight,
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
} from 'lucide-react'

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

  // 2 Transition Modes: Auto next lesson vs Manual user selection
  const [advanceMode, setAdvanceMode] = useState<LessonAdvanceMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('italk_lesson_advance_mode') as LessonAdvanceMode) || 'auto'
    }
    return 'auto'
  })

  // Sidebar Filter & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [lessonFilter, setLessonFilter] = useState<'all' | 'native' | 'tts'>('all')
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false)

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

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecordingManager>(new MediaRecordingManager())
  const speechRecognizerRef = useRef<SpeechRecognizer>(new SpeechRecognizer())
  const timerIntervalRef = useRef<any>(null)
  const audioCheckIntervalRef = useRef<any>(null)
  const activeLessonRef = useRef<HTMLDivElement | null>(null)

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
    return () => {
      stopPlayback()
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (audioCheckIntervalRef.current) clearInterval(audioCheckIntervalRef.current)
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

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
      text: currentSentence.text,
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
      alert(`Không thể kích hoạt thiết bị thu âm: ${err.message}`)
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
      const transcriptToEvaluate = realtimeTranscript || currentSentence?.text.slice(0, 5) || ''
      const score = evaluatePronunciation({
        targetText: currentSentence ? currentSentence.text : '',
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

  const handleNextSentence = () => {
    if (!activeLesson) return
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

  // Filter lessons in sidebar
  const filteredLessons = lessons.filter((l) => {
    const matchSearch =
      !searchQuery.trim() ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.category && l.category.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchSearch) return false

    if (lessonFilter === 'native') return Boolean(l.originalAudioUrl || l.audioBlobId)
    if (lessonFilter === 'tts') return !l.originalAudioUrl && !l.audioBlobId
    return true
  })

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

          {/* 2-MODE SWITCHER (AUTO JUMP VS MANUAL SELECTION) */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider px-1">
              <span>Chuyển bài (Mode)</span>
              <span
                className={`text-[10px] font-bold ${
                  advanceMode === 'auto' ? 'text-emerald-400' : 'text-indigo-400'
                }`}
              >
                {advanceMode === 'auto' ? '⚡ Tự động' : '👆 Tự chọn'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => handleSetAdvanceMode('auto')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-bold transition-all ${
                  advanceMode === 'auto'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tự động nhảy sang bài kế tiếp sau khi học hết câu cuối cùng"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Tự động</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetAdvanceMode('manual')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-bold transition-all ${
                  advanceMode === 'manual'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Người dùng tự bấm vào danh sách để chọn bài theo ý muốn"
              >
                <MousePointer className="w-3.5 h-3.5" />
                <span>Tự chọn</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 px-1 leading-relaxed">
              {advanceMode === 'auto'
                ? '⚡ Khi luyện hết câu cuối, app sẽ tự động nhảy sang bài tiếp theo để bạn luyện tập liên tục.'
                : '👆 App sẽ ở nguyên bài hiện tại, bạn tự click vào danh sách bên dưới khi muốn chuyển bài.'}
            </p>
          </div>

          {/* Action Buttons: Import Audio & Add Custom Text */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowAudioImporter(true)}
              className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-[11px] font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
              title="Nạp file nghe MP3/WAV gốc và lời phụ đề"
            >
              <FileAudio className="w-3.5 h-3.5" />
              <span>+ Nạp audio gốc</span>
            </button>

            <button
              onClick={() => setShowAddCustom(true)}
              className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 transition-colors"
              title="Dán đoạn văn bản để luyện đọc"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Soạn chữ</span>
            </button>
          </div>

          {/* Search Input & Filter Tabs */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm kiếm bài đọc..."
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
          </div>

          {/* LESSONS LIST (SCROLLABLE) */}
          <div className="space-y-2 max-h-[calc(100vh-320px)] min-h-[350px] overflow-y-auto pr-1">
            {filteredLessons.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                Không tìm thấy bài học nào phù hợp
              </div>
            ) : (
              filteredLessons.map((l, idx) => {
                const isActive = l.id === activeLessonId
                const hasOriginal = Boolean(l.originalAudioUrl || l.audioBlobId)

                return (
                  <div
                    key={l.id}
                    ref={isActive ? activeLessonRef : null}
                    onClick={() => {
                      setActiveLessonId(l.id)
                      setCurrentSentenceIdx(0)
                      setIsSidebarOpenMobile(false)
                    }}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all duration-150 relative ${
                      isActive
                        ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/70 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Row: Level & Source Badge */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300'
                          }`}
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

                      <span className="text-[10px] text-slate-400 font-mono">
                        {l.sentences.length} câu
                      </span>
                    </div>

                    {/* Lesson Title */}
                    <h4
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {l.title}
                    </h4>

                    {/* Active Learning Progress Info */}
                    {isActive && (
                      <div className="mt-2 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Đang luyện: Câu {currentSentenceIdx + 1}/{l.sentences.length}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                )
              })
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
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      advanceMode === 'auto'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                    }`}
                  >
                    {advanceMode === 'auto' ? <Zap className="w-3 h-3" /> : <MousePointer className="w-3 h-3" />}
                    <span>{advanceMode === 'auto' ? 'Auto nhảy bài' : 'Tự chọn bài'}</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  {activeLesson?.title}
                </h3>
              </div>
            </div>

            {/* Right: Record Mode Switch (Webcam vs Mic) */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setRecordMode('video')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    recordMode === 'video'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Webcam</span>
                </button>
                <button
                  onClick={() => setRecordMode('audio')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    recordMode === 'audio'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
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
            <div className="xl:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                {/* Sentence Header & Pager */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Câu {currentSentenceIdx + 1} / {activeLesson?.sentences.length || 1}
                    </span>
                    {typeof currentSentence?.startTime === 'number' && (
                      <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                        ⏱ {currentSentence.startTime.toFixed(1)}s
                        {currentSentence.endTime ? ` - ${currentSentence.endTime.toFixed(1)}s` : ''}
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

                    {/* Next Sentence or Next Lesson Button */}
                    {isLastSentenceOfLesson && advanceMode === 'auto' ? (
                      <button
                        onClick={handleNextSentence}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 animate-pulse"
                        title="Hết bài - Tự động chuyển sang bài tiếp theo"
                      >
                        <span>Bài tiếp</span>
                        <FastForward className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled={isLastSentenceOfLesson && advanceMode === 'manual'}
                        onClick={handleNextSentence}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors"
                        title={isLastSentenceOfLesson ? 'Câu cuối của bài' : 'Câu kế tiếp'}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Phonetic Transcription (Furigana / Romaji / Pinyin) */}
                {currentSentence?.phonetic && (
                  <div className="mb-2">
                    <span className="text-xs font-mono text-emerald-400/90 tracking-wide bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10">
                      {currentSentence.phonetic}
                    </span>
                  </div>
                )}

                {/* Target Big Text */}
                <div className="my-5">
                  <h2 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white leading-relaxed tracking-normal font-sans">
                    {currentSentence?.text}
                  </h2>
                </div>

                {/* Vietnamese Translation */}
                {currentSentence?.translation && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-400 mb-1">Dịch nghĩa:</div>
                    <div className="text-sm text-slate-200">{currentSentence.translation}</div>
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

            {/* Webcam Preview, Live Mic Meter & Shadowing Action */}
            <div className="xl:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-full min-h-[440px]">
                {/* Webcam / Audio Visualizer Box */}
                <div className="relative w-full aspect-video xl:aspect-[16/10] 2xl:aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {recordMode === 'video' ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`w-full h-full object-cover transform -scale-x-100 ${
                          !isRecording ? 'opacity-70' : 'opacity-100'
                        }`}
                      />
                      {!isRecording && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 p-4 text-center">
                          <Video className="w-10 h-10 text-slate-400 mb-2 opacity-50" />
                          <p className="text-xs text-slate-300 font-medium">
                            Webcam sẽ hiển thị khi bạn bấm Bắt đầu Shadowing
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Quan sát khẩu hình miệng giúp bạn sửa âm chuẩn như người bản xứ
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isRecording
                            ? 'bg-rose-500/20 text-rose-400 scale-110 shadow-lg shadow-rose-500/20 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Mic className="w-10 h-10" />
                      </div>
                      <p className="text-xs text-slate-300 mt-3 font-semibold">Chế độ ghi âm qua Micro</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Tập trung tối đa vào độ vang và ngữ điệu câu nói
                      </p>
                    </div>
                  )}

                  {/* Recording indicator badge */}
                  {isRecording && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-rose-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <span>REC {recordingSeconds}s</span>
                    </div>
                  )}
                </div>

                {/* Live Mic Audio Level VU Meter */}
                <div className="mt-4">
                  {isRecording && (
                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Âm lượng giọng nói:</span>
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
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-0.5">
                      Nhận diện trực tiếp:
                    </span>
                    <span className="text-emerald-300 font-medium">{realtimeTranscript}</span>
                  </div>
                )}

                {/* Big Action Buttons */}
                <div className="mt-4">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform active:scale-[0.99]"
                    >
                      <Radio className="w-5 h-5 animate-pulse" />
                      <span>BẮT ĐẦU SHADOWING</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-transform active:scale-[0.99] animate-pulse"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>DỪNG & CHẤM ĐIỂM PHÁT ÂM</span>
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
