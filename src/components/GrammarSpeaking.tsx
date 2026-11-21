import React, { useState, useEffect, useMemo, useRef } from 'react'
import confetti from 'canvas-confetti'
import { Language, GrammarPattern, KaiwaGroup, GrammarExample, ScoreResult, StudyPlan, GrammarQuizRecord } from '../types'
import { supportedLanguages } from '../data/languages'
import { japaneseGrammar, japaneseKaiwa } from '../data/grammar-ja'
import { chineseGrammar, chineseKaiwa } from '../data/grammar-zh'
import { vietnameseGrammar, vietnameseKaiwa } from '../data/grammar-vi'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer, SpeechStatus, transcribeAudioWithOpenAI } from '../services/speech'
import { MediaRecordingManager } from '../services/mediaRecorder'
import { loadSettings } from '../services/storage'
import { evaluatePronunciation } from '../services/scoring'
import { FuriganaText } from '../services/furigana'
import {
  loadStudyPlan,
  getTodayStudyPlanDay,
  isGrammarPatternPracticed,
  loadGrammarScores,
} from '../services/studyPlan'
import {
  GRAMMAR_SPEAKING_PASS_SCORE,
  GRAMMAR_QUIZ_PASS_PERCENT,
  GrammarQuizQuestion,
  generateGrammarQuiz,
  getGrammarPatternPassStatus,
  loadGrammarQuizResults,
  saveGrammarQuizResult,
} from '../services/grammarQuiz'
import {
  Volume2,
  Mic,
  MicOff,
  CheckCircle,
  Sparkles,
  BookOpen,
  MessageCircle,
  Search,
  Award,
  Layers,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  Flame,
  Info,
  Compass,
  Target,
  ArrowRight,
  Eye,
  EyeOff,
  FileCheck2,
  HelpCircle,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Square,
} from 'lucide-react'

// Level metadata description
const levelMeta: Record<string, { desc: string; color: string; badgeBg: string }> = {
  // Japanese
  N5: { desc: 'Nhập môn & Sinh hoạt cơ bản', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  N4: { desc: 'Giao tiếp hàng ngày thông dụng', color: 'text-teal-400', badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  N3: { desc: 'Trung cấp - Tình huống đời sống thực tế', color: 'text-blue-400', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  N2: { desc: 'Trung cao cấp - Công việc & Đời sống Nhật', color: 'text-indigo-400', badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  N1: { desc: 'Thượng cấp - Tin tức, học thuật & chuyên nghiệp', color: 'text-purple-400', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },

  // Chinese
  'HSK 1': { desc: 'Sơ cấp 1 - Chào hỏi & Sinh hoạt cơ bản', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  'HSK 2': { desc: 'Sơ cấp 2 - Giao tiếp thường nhật đơn giản', color: 'text-teal-400', badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  'HSK 3': { desc: 'Trung cấp 1 - Giao tiếp du lịch & mua sắm', color: 'text-cyan-400', badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  'HSK 4': { desc: 'Trung cấp 2 - Thảo luận chủ đề đa dạng', color: 'text-blue-400', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  'HSK 5': { desc: 'Cao cấp 1 - Báo chí & lập luận xã hội', color: 'text-indigo-400', badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  'HSK 6': { desc: 'Cao cấp 2 - Ngữ cảm tự nhiên như bản xứ', color: 'text-purple-400', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },

  // Vietnamese
  'Cơ bản': { desc: 'Cấu trúc nền tảng & Câu giao tiếp cơ bản', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  'Nâng cao': { desc: 'Thành ngữ, khẩu ngữ & cấu trúc phức hợp', color: 'text-indigo-400', badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
}

// Clean text for speech synthesis and scoring (strip bracketed furigana)
function cleanSpeechText(text: string): string {
  return text.replace(/\[[^\]]+\]/g, '').trim()
}

interface GrammarSpeakingProps {
  currentLang: Language
  initialPatternId?: string
  onConsumeInitialPattern?: () => void
  onOpenStudyPlan?: () => void
}

export const GrammarSpeaking: React.FC<GrammarSpeakingProps> = ({
  currentLang,
  initialPatternId,
  onConsumeInitialPattern,
  onOpenStudyPlan,
}) => {
  // Lang meta
  const currentLangMeta = useMemo(() => {
    return supportedLanguages.find((l) => l.code === currentLang) || supportedLanguages[0]
  }, [currentLang])

  // Data sets based on language
  const languageData = useMemo(() => {
    if (currentLang === 'ja') {
      return {
        patterns: japaneseGrammar,
        kaiwa: japaneseKaiwa,
        levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      }
    }
    if (currentLang === 'zh') {
      return {
        patterns: chineseGrammar,
        kaiwa: chineseKaiwa,
        levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'],
      }
    }
    return {
      patterns: vietnameseGrammar,
      kaiwa: vietnameseKaiwa,
      levels: ['Cơ bản', 'Nâng cao'],
    }
  }, [currentLang])

  // Current Level selection
  const [selectedLevel, setSelectedLevel] = useState<string>(() => languageData.levels[0])

  // Active view tab: 'practice' | 'all-patterns' | 'kaiwa'
  const [activeTab, setActiveTab] = useState<'practice' | 'all-patterns' | 'kaiwa'>('practice')

  // Mobile sub-tab in Tab 1 (list vs detail)
  const [mobileTab1View, setMobileTab1View] = useState<'list' | 'detail'>('detail')

  // Furigana toggle for Japanese
  const [showFurigana, setShowFurigana] = useState<boolean>(true)

  // Filtered patterns by selected level
  const levelPatterns = useMemo(() => {
    return languageData.patterns.filter((p) => p.level === selectedLevel)
  }, [languageData.patterns, selectedLevel])

  // Filtered kaiwa by selected level
  const levelKaiwa = useMemo(() => {
    return languageData.kaiwa.filter((k) => k.level === selectedLevel)
  }, [languageData.kaiwa, selectedLevel])

  // Selected pattern for focus practice
  const [selectedPatternId, setSelectedPatternId] = useState<string>('')

  // Search keyword for all patterns / search
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  // Expanded pattern IDs in the "all-patterns" accordion view
  const [expandedPatternIds, setExpandedPatternIds] = useState<Record<string, boolean>>({})

  // Active Study Plan synced per language
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(() => loadStudyPlan(currentLang))

  useEffect(() => {
    setStudyPlan(loadStudyPlan(currentLang))
    const handlePlanUpdate = () => setStudyPlan(loadStudyPlan(currentLang))
    window.addEventListener('italk:study-plan-updated', handlePlanUpdate)
    return () => window.removeEventListener('italk:study-plan-updated', handlePlanUpdate)
  }, [currentLang])

  // Reset level & selected pattern when language changes (respecting deep-link & today's Study Plan)
  useEffect(() => {
    if (initialPatternId) {
      const target = languageData.patterns.find((p) => p.id === initialPatternId)
      if (target) {
        setSelectedLevel(target.level)
        setActiveTab('practice')
        setSelectedPatternId(target.id)
        setExpandedPatternIds({})
        onConsumeInitialPattern?.()
        return
      }
    }
    const plan = loadStudyPlan(currentLang)
    const todayDay = getTodayStudyPlanDay(plan)
    if (plan && todayDay && todayDay.grammarPatternIds.length > 0) {
      const scores = loadGrammarScores()
      const byId = new Map(languageData.patterns.map((p) => [p.id, p]))
      const todayMatches = todayDay.grammarPatternIds
        .map((id) => byId.get(id))
        .filter((p): p is GrammarPattern => Boolean(p))
      const prioritized =
        todayMatches.find(
          (p) =>
            !plan.completedGrammarIds?.includes(p.id) &&
            !isGrammarPatternPracticed(p.id, scores)
        ) || todayMatches[0]
      if (prioritized) {
        setSelectedLevel(prioritized.level)
        setSelectedPatternId(prioritized.id)
        setExpandedPatternIds({})
        return
      }
    }
    const firstLevel = languageData.levels[0]
    setSelectedLevel(firstLevel)
    const firstPattern = languageData.patterns.find((p) => p.level === firstLevel)
    setSelectedPatternId(firstPattern ? firstPattern.id : '')
    setExpandedPatternIds({})
  }, [currentLang, languageData])

  // Open a specific pattern when navigated from Study Plan
  useEffect(() => {
    if (!initialPatternId) return
    const target = languageData.patterns.find((p) => p.id === initialPatternId)
    if (target) {
      setSelectedLevel(target.level)
      setActiveTab('practice')
      setSelectedPatternId(target.id)
      onConsumeInitialPattern?.()
    }
  }, [initialPatternId, languageData])

  // Reset selected pattern when level changes (only if current selectedPatternId is not in levelPatterns)
  useEffect(() => {
    if (initialPatternId) {
      const target = languageData.patterns.find((p) => p.id === initialPatternId)
      if (target && target.level === selectedLevel) return
    }
    const firstPattern = levelPatterns[0]
    if (firstPattern && (!selectedPatternId || !levelPatterns.some((p) => p.id === selectedPatternId))) {
      setSelectedPatternId(firstPattern.id)
    }
  }, [selectedLevel, levelPatterns, initialPatternId])

  // Active selected pattern
  const currentPattern = useMemo(() => {
    return levelPatterns.find((p) => p.id === selectedPatternId) || levelPatterns[0] || null
  }, [levelPatterns, selectedPatternId])

  // Audio playing state
  const [playingKey, setPlayingKey] = useState<string | null>(null)

  // Speech recording & Mini Quiz state
  const [recordingKey, setRecordingKey] = useState<string | null>(null)
  const [spokenTranscript, setSpokenTranscript] = useState<string>('')
  const [speechError, setSpeechError] = useState<{ key: string; message: string } | null>(null)
  const [micStatus, setMicStatus] = useState<SpeechStatus | 'starting' | null>(null)
  const [micHint, setMicHint] = useState<string>('')
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false)
  const preferCloudSttRef = useRef<boolean>(false)
  const cloudRecorderRef = useRef<MediaRecordingManager>(new MediaRecordingManager())
  const [scoreResults, setScoreResults] = useState<Record<string, ScoreResult>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('italk_grammar_scores_v1')
        return raw ? JSON.parse(raw) : {}
      } catch {}
    }
    return {}
  })
  const [quizResults, setQuizResults] = useState<Record<string, GrammarQuizRecord>>(() =>
    loadGrammarQuizResults()
  )
  const [practiceMode, setPracticeMode] = useState<'speaking' | 'quiz'>('speaking')
  const [reflexMode, setReflexMode] = useState<boolean>(false)
  const [revealedReflexKeys, setRevealedReflexKeys] = useState<Record<string, boolean>>({})

  // Active Quiz Session state
  const [quizQuestions, setQuizQuestions] = useState<GrammarQuizQuestion[]>([])
  const [quizIdx, setQuizIdx] = useState<number>(0)
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null)
  const [quizPlacedIndices, setQuizPlacedIndices] = useState<number[]>([])
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false)
  const [quizCorrectCount, setQuizCorrectCount] = useState<number>(0)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)

  const scoreResultsRef = useRef(scoreResults)
  scoreResultsRef.current = scoreResults
  const quizResultsRef = useRef(quizResults)
  quizResultsRef.current = quizResults
  const recognizerRef = useRef<SpeechRecognizer | null>(null)
  const autoFinishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeRecordSessionRef = useRef<{
    key: string
    targetText: string
    patternSnapshot: GrammarPattern | null
    latestTranscript: string
    hasScored: boolean
    mode: 'browser' | 'cloud'
  } | null>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const activePatternBtnRef = useRef<HTMLButtonElement>(null)

  const abortActiveRecording = () => {
    if (autoFinishTimerRef.current) {
      clearTimeout(autoFinishTimerRef.current)
      autoFinishTimerRef.current = null
    }
    activeRecordSessionRef.current = null
    recognizerRef.current?.abort()
    cloudRecorderRef.current.cleanup()
    setRecordingKey(null)
    setMicStatus(null)
    setMicHint('')
    setIsTranscribing(false)
  }

  const finalizeRecordingAndScore = (
    transcriptOverride?: string,
    options?: { silentIfEmpty?: boolean }
  ) => {
    const session = activeRecordSessionRef.current
    if (!session || session.hasScored) return
    session.hasScored = true
    activeRecordSessionRef.current = null

    if (autoFinishTimerRef.current) {
      clearTimeout(autoFinishTimerRef.current)
      autoFinishTimerRef.current = null
    }

    recognizerRef.current?.abort()
    cloudRecorderRef.current.cleanup()
    setRecordingKey(null)
    setMicStatus(null)
    setMicHint('')
    setIsTranscribing(false)

    const finalSpoken = (transcriptOverride ?? session.latestTranscript ?? '').trim()
    if (!finalSpoken && options?.silentIfEmpty) {
      setSpeechError({
        key: session.key,
        message:
          'Chưa nghe thấy giọng nói rõ ràng. Hãy bấm micro, nói to rõ gần mic rồi bấm "Dừng & Chấm điểm" (hoặc chuyển sang Bài Tập Nhanh).',
      })
      return
    }

    const result = evaluatePronunciation({
      targetText: session.targetText,
      spokenText: finalSpoken,
      lang: currentLang,
    })

    const prevScores = scoreResultsRef.current
    const nextScores = { ...prevScores, [session.key]: result }
    scoreResultsRef.current = nextScores
    try {
      localStorage.setItem('italk_grammar_scores_v1', JSON.stringify(nextScores))
    } catch {}
    setScoreResults(nextScores)

    // Auto-reveal the hidden script in Reflex Mode so user can compare right away
    setRevealedReflexKeys((prev) => ({ ...prev, [session.key]: true }))

    if (session.patternSnapshot) {
      const wasSpeakingPassed = getGrammarPatternPassStatus(
        session.patternSnapshot,
        prevScores,
        quizResultsRef.current
      ).isSpeakingPassed
      const isNowSpeakingPassed = getGrammarPatternPassStatus(
        session.patternSnapshot,
        nextScores,
        quizResultsRef.current
      ).isSpeakingPassed
      if (!wasSpeakingPassed && isNowSpeakingPassed) {
        try {
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } })
        } catch {}
      }
    }

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('italk:grammar-progress-updated'))
    }, 0)
  }

  const startFreshQuiz = (pat: GrammarPattern | null) => {
    if (!pat) {
      setQuizQuestions([])
      return
    }
    setQuizQuestions(generateGrammarQuiz(pat, languageData.patterns))
    setQuizIdx(0)
    setQuizSelectedOption(null)
    setQuizPlacedIndices([])
    setQuizAnswered(false)
    setQuizCorrectCount(0)
    setQuizFinished(false)
  }

  useEffect(() => {
    const syncProgress = () => {
      setQuizResults(loadGrammarQuizResults())
    }
    window.addEventListener('italk:grammar-progress-updated', syncProgress)
    return () => window.removeEventListener('italk:grammar-progress-updated', syncProgress)
  }, [])

  useEffect(() => {
    abortActiveRecording()
    setSpeechError(null)
    setRevealedReflexKeys({})
    startFreshQuiz(currentPattern)
  }, [currentPattern?.id, languageData.patterns])

  useEffect(() => {
    if (practiceMode === 'quiz') {
      abortActiveRecording()
    }
  }, [practiceMode])

  useEffect(() => {
    if (selectedPatternId) {
      mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      activePatternBtnRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selectedPatternId])

  useEffect(() => {
    recognizerRef.current = new SpeechRecognizer()
    return () => {
      stopTextToSpeech()
      abortActiveRecording()
    }
  }, [])

  // Watchdog: tell the user if the mic opened but no sound is arriving
  useEffect(() => {
    if (!recordingKey) return
    if (micStatus === 'sound' || micStatus === 'speech') return
    const t = setTimeout(() => {
      setMicHint(
        micStatus === 'mic-open'
          ? 'Micro đã mở nhưng chưa nghe thấy tiếng. Hãy nói to hơn hoặc kiểm tra micro mặc định của hệ thống.'
          : 'Chưa mở được micro. Hãy cấp quyền Microphone cho trang này và kiểm tra thiết bị thu âm.'
      )
    }, 5000)
    return () => clearTimeout(t)
  }, [recordingKey, micStatus])

  // Handle Play TTS
  const handlePlayTTS = (text: string, key: string) => {
    const clean = cleanSpeechText(text)
    if (playingKey === key) {
      stopTextToSpeech()
      setPlayingKey(null)
      return
    }

    setPlayingKey(key)
    playTextToSpeech({
      text: clean,
      lang: currentLangMeta.speechCode,
      rate: 0.95,
      onStart: () => setPlayingKey(key),
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null),
    })
  }

  // Handle Recording Toggle
  const handleToggleRecord = (targetExample: GrammarExample, key: string) => {
    const langCode = currentLangMeta.speechCode

    // ---- Stop / score the active recording ----
    if (recordingKey === key) {
      const cur = activeRecordSessionRef.current
      if (!cur || cur.hasScored) {
        abortActiveRecording()
        return
      }
      if (cur.mode === 'cloud') {
        setIsTranscribing(true)
        cloudRecorderRef.current
          .stop()
          .then((rec) => transcribeAudioWithOpenAI(rec.blob, langCode))
          .then((text) => {
            if (activeRecordSessionRef.current === cur) {
              finalizeRecordingAndScore(text, { silentIfEmpty: true })
            }
          })
          .catch((err: any) => {
            if (activeRecordSessionRef.current !== cur) return
            abortActiveRecording()
            setSpeechError({ key, message: err?.message || 'Không nhận diện được giọng nói qua OpenAI Whisper.' })
          })
        return
      }
      if (cur.latestTranscript.trim()) {
        finalizeRecordingAndScore()
      } else {
        // Wait for the speech engine to flush any trailing final result before settling
        recognizerRef.current?.stopAndWait(1200).then(() => {
          if (activeRecordSessionRef.current === cur && !cur.hasScored) {
            finalizeRecordingAndScore(undefined, { silentIfEmpty: true })
          }
        })
      }
      return
    }

    if (recordingKey) abortActiveRecording()

    stopTextToSpeech()
    setPlayingKey(null)
    setSpokenTranscript('')
    setSpeechError(null)
    setMicHint('')
    setMicStatus('starting')

    if (!recognizerRef.current) recognizerRef.current = new SpeechRecognizer()

    const hasCloudKey = Boolean((loadSettings().openaiApiKey || '').trim())
    const useCloud = hasCloudKey && (preferCloudSttRef.current || !recognizerRef.current.isSupported())

    if (!useCloud && !recognizerRef.current.isSupported()) {
      setMicStatus(null)
      setSpeechError({
        key,
        message:
          'Trình duyệt/ứng dụng này không hỗ trợ nhận diện giọng nói (Web Speech API). Hãy dùng Chrome hoặc Edge, hoặc nhập OpenAI API Key trong Cài đặt để dùng Whisper, hoặc làm Bài Tập Nhanh.',
      })
      return
    }

    const session = {
      key,
      targetText: cleanSpeechText(targetExample.text),
      patternSnapshot: key.startsWith('ex-') ? currentPattern : null,
      latestTranscript: '',
      hasScored: false,
      mode: (useCloud ? 'cloud' : 'browser') as 'browser' | 'cloud',
    }
    activeRecordSessionRef.current = session
    setRecordingKey(key)

    // ---- Cloud (Whisper) mode: plain MediaRecorder, transcribe on stop ----
    if (useCloud) {
      const settings = loadSettings()
      cloudRecorderRef.current
        .start({
          type: 'audio',
          audioDeviceId: settings.selectedAudioInputId || undefined,
        })
        .then(() => {
          if (activeRecordSessionRef.current === session) setMicStatus('mic-open')
        })
        .catch((err: any) => {
          if (activeRecordSessionRef.current !== session) return
          abortActiveRecording()
          setSpeechError({ key, message: err?.message || 'Không thể mở Microphone.' })
        })
      return
    }

    // ---- Browser Web Speech mode ----
    recognizerRef.current.start({
      lang: langCode,
      onStatus: (st) => {
        if (activeRecordSessionRef.current === session) {
          setMicStatus(st)
          if (st === 'sound' || st === 'speech') setMicHint('')
        }
      },
      onResult: (transcript, isFinal) => {
        if (activeRecordSessionRef.current !== session) return
        session.latestTranscript = transcript
        setSpokenTranscript(transcript)
        setMicHint('')
        if (autoFinishTimerRef.current) {
          clearTimeout(autoFinishTimerRef.current)
          autoFinishTimerRef.current = null
        }
        if (isFinal && transcript.trim()) {
          autoFinishTimerRef.current = setTimeout(() => finalizeRecordingAndScore(transcript), 1500)
        }
      },
      onError: (err) => {
        if (activeRecordSessionRef.current !== session || session.hasScored) return
        const code = err?.error || ''
        if (code === 'aborted') return

        if (code === 'no-speech') {
          if (session.latestTranscript.trim()) {
            finalizeRecordingAndScore(session.latestTranscript)
          } else {
            abortActiveRecording()
            setSpeechError({
              key,
              message:
                'Không nghe thấy giọng nói. Hãy kiểm tra micro mặc định của hệ thống (Cài đặt âm thanh → Input), nói to hơn, rồi bấm mic thử lại.',
            })
          }
          return
        }

        abortActiveRecording()
        let msg = err?.message || `Lỗi nhận diện giọng nói (${code || 'unknown'}).`
        if (code === 'not-allowed' || code === 'service-not-allowed') {
          msg =
            'Quyền Microphone bị từ chối hoặc dịch vụ nhận diện bị chặn. Bấm biểu tượng ổ khóa cạnh thanh địa chỉ → cho phép Microphone, rồi thử lại.'
        } else if (code === 'audio-capture') {
          msg = 'Không tìm thấy thiết bị thu âm. Hãy cắm micro hoặc chọn micro mặc định trong hệ thống.'
        } else if (code === 'network' || code === 'unsupported' || code === 'language-not-supported') {
          if (hasCloudKey) {
            preferCloudSttRef.current = true
            msg =
              'Dịch vụ nhận diện giọng nói của trình duyệt không khả dụng. Đã tự chuyển sang OpenAI Whisper — hãy bấm mic và nói lại.'
          } else {
            msg =
              'Trình duyệt không kết nối được dịch vụ nhận diện giọng nói (thường gặp ở Chromium/Brave/Electron). Hãy dùng Google Chrome hoặc Edge, hoặc nhập OpenAI API Key trong Cài đặt để dùng Whisper, hoặc làm Bài Tập Nhanh.'
          }
        }
        setSpeechError({ key, message: msg })
      },
      onEnd: () => {
        if (activeRecordSessionRef.current === session && !session.hasScored) {
          finalizeRecordingAndScore(undefined, { silentIfEmpty: true })
        }
      },
    })
  }

  // Toggle accordion expand
  const togglePatternExpand = (id: string) => {
    setExpandedPatternIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Filtered patterns by search keyword
  const filteredAllPatterns = useMemo(() => {
    if (!searchKeyword.trim()) return levelPatterns
    const q = searchKeyword.toLowerCase()
    return levelPatterns.filter(
      (p) =>
        p.pattern.toLowerCase().includes(q) ||
        p.meaning.toLowerCase().includes(q) ||
        p.formula.toLowerCase().includes(q) ||
        p.examples.some(
          (e) =>
            e.text.toLowerCase().includes(q) ||
            (e.reading && e.reading.toLowerCase().includes(q)) ||
            e.translation.toLowerCase().includes(q)
        )
    )
  }, [levelPatterns, searchKeyword])

  // Today's scheduled Study Plan grammar patterns (pinned at top of left sidebar)
  const todayPlanDay = useMemo(() => getTodayStudyPlanDay(studyPlan), [studyPlan])

  const isPlanPatternCompleted = (patternId: string): boolean => {
    if (studyPlan?.completedGrammarIds?.includes(patternId)) return true
    return isGrammarPatternPracticed(patternId, scoreResults, quizResults)
  }

  const todayPlanPatterns = useMemo(() => {
    if (!todayPlanDay || !todayPlanDay.grammarPatternIds.length) return []
    const byId = new Map(languageData.patterns.map((p) => [p.id, p]))
    const matched = todayPlanDay.grammarPatternIds
      .map((id) => byId.get(id))
      .filter((p): p is GrammarPattern => Boolean(p))

    const incomplete: GrammarPattern[] = []
    const done: GrammarPattern[] = []
    matched.forEach((p) => {
      if (isPlanPatternCompleted(p.id)) done.push(p)
      else incomplete.push(p)
    })
    return [...incomplete, ...done]
  }, [todayPlanDay, languageData.patterns, studyPlan, scoreResults, quizResults])

  const todayPlanPatternIdSet = useMemo(
    () => new Set(todayPlanPatterns.map((p) => p.id)),
    [todayPlanPatterns]
  )

  const todayPlanDoneCount = useMemo(
    () => todayPlanPatterns.filter((p) => isPlanPatternCompleted(p.id)).length,
    [todayPlanPatterns, studyPlan, scoreResults, quizResults]
  )

  const showPinnedTodayPatterns = Boolean(todayPlanDay) && !searchKeyword.trim()

  const currentPassStatus = useMemo(() => {
    if (!currentPattern) return null
    return getGrammarPatternPassStatus(currentPattern, scoreResults, quizResults)
  }, [currentPattern, scoreResults, quizResults])

  const isCurrentPatternPassed = Boolean(
    currentPattern &&
      (currentPassStatus?.isPassed || studyPlan?.completedGrammarIds?.includes(currentPattern.id))
  )

  const handleGoToNextPattern = () => {
    if (!currentPattern) return
    if (todayPlanPatterns.length > 0) {
      const nextPlanPat = todayPlanPatterns.find(
        (p) => p.id !== currentPattern.id && !isPlanPatternCompleted(p.id)
      )
      if (nextPlanPat) {
        if (nextPlanPat.level !== selectedLevel) {
          setSelectedLevel(nextPlanPat.level)
        }
        setSelectedPatternId(nextPlanPat.id)
        setMobileTab1View('detail')
        return
      }
    }
    const curIdx = levelPatterns.findIndex((p) => p.id === currentPattern.id)
    if (curIdx >= 0 && curIdx < levelPatterns.length - 1) {
      const nextPat = levelPatterns[curIdx + 1]
      setSelectedPatternId(nextPat.id)
      setMobileTab1View('detail')
      return
    }
    const lvlIdx = languageData.levels.indexOf(selectedLevel)
    if (lvlIdx >= 0 && lvlIdx < languageData.levels.length - 1) {
      const nextLvl = languageData.levels[lvlIdx + 1]
      const nextPat = languageData.patterns.find((p) => p.level === nextLvl)
      if (nextPat) {
        setSelectedLevel(nextLvl)
        setSelectedPatternId(nextPat.id)
        setMobileTab1View('detail')
      }
    }
  }

  const handleSelectMcqOption = (opt: string) => {
    if (quizAnswered) return
    const q = quizQuestions[quizIdx]
    if (!q) return
    setQuizSelectedOption(opt)
    setQuizAnswered(true)
    if (opt === q.correctOption) {
      setQuizCorrectCount((c) => c + 1)
    }
  }

  const handleSubmitReorder = () => {
    const q = quizQuestions[quizIdx]
    if (!q || !q.reorderChunks || quizAnswered) return
    if (quizPlacedIndices.length !== q.reorderChunks.length) return
    const built = quizPlacedIndices
      .map((i) => q.reorderChunks![i])
      .join(q.joinWithSpace ? ' ' : '')
    setQuizSelectedOption(built)
    setQuizAnswered(true)
    if (built === q.correctSentence) {
      setQuizCorrectCount((c) => c + 1)
    }
  }

  const handleAdvanceQuiz = () => {
    if (quizIdx < quizQuestions.length - 1) {
      setQuizIdx((prev) => prev + 1)
      setQuizSelectedOption(null)
      setQuizPlacedIndices([])
      setQuizAnswered(false)
    } else if (currentPattern) {
      const total = Math.max(1, quizQuestions.length)
      const percent = Math.round((quizCorrectCount / total) * 100)
      const passed = percent >= GRAMMAR_QUIZ_PASS_PERCENT
      const nextMap = saveGrammarQuizResult({
        patternId: currentPattern.id,
        passed,
        bestPercent: percent,
        correctCount: quizCorrectCount,
        totalCount: quizQuestions.length,
        updatedAt: new Date().toISOString(),
      })
      setQuizResults(nextMap)
      setQuizFinished(true)
      if (passed) {
        try {
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } })
        } catch {}
      }
    }
  }

  return (
    <div className="h-auto md:h-[calc(100vh-115px)] min-h-[520px] md:min-h-[640px] flex flex-col bg-slate-900 text-slate-100 rounded-2xl md:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
            {currentLangMeta.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">Luyện Ngữ Pháp & Kaiwa</h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentLangMeta.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
              Phân cấp theo Level • Mẫu câu giao tiếp thực tế • 3-5 Ví dụ trực quan & Luyện phát âm
            </p>
          </div>
        </div>

        {/* Global Controls: Japanese Furigana Toggle, Study Plan & Tab switchers */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {onOpenStudyPlan && (
            <button
              type="button"
              onClick={onOpenStudyPlan}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border bg-indigo-50 border-indigo-300 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-600/25 dark:border-indigo-500/40 dark:text-indigo-200 dark:hover:bg-indigo-600/40 transition-colors cursor-pointer"
              title="Tạo hoặc xem kế hoạch học Shadowing & Ngữ pháp theo số ngày"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-300" />
              <span>Kế hoạch học</span>
            </button>
          )}

          {currentLang === 'ja' && (
            <button
              onClick={() => setShowFurigana(!showFurigana)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                showFurigana
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-600/30 dark:border-indigo-500/40 dark:text-indigo-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title="Bật/Tắt hiển thị Hiragana trên chữ Kanji"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Furigana</span>
              <span
                className={`w-2 h-2 rounded-full ${showFurigana ? 'bg-indigo-500 dark:bg-indigo-400 shadow-sm shadow-indigo-400' : 'bg-slate-300 dark:bg-slate-600'}`}
              />
            </button>
          )}

          {/* Tab Selector */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/70 text-xs overflow-x-auto scrollbar-none max-w-full">
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                activeTab === 'practice'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Luyện Từng Mẫu (3-5 Ví Dụ)</span>
              <span className="sm:hidden">Luyện Mẫu</span>
            </button>
            <button
              onClick={() => setActiveTab('all-patterns')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                activeTab === 'all-patterns'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tất Cả Mẫu Của Level ({levelPatterns.length})</span>
              <span className="sm:hidden">Tất Cả ({levelPatterns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('kaiwa')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                activeTab === 'kaiwa'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kaiwa Đời Sống ({levelKaiwa.length} Chủ Đề)</span>
              <span className="sm:hidden">Kaiwa ({levelKaiwa.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Level Selection Bar */}
      <div className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between gap-4 overflow-x-auto shrink-0 scrollbar-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Cấp độ:
          </span>
          <div className="flex items-center gap-2">
            {languageData.levels.map((lvl) => {
              const meta = levelMeta[lvl] || {
                desc: '',
                color: 'text-cyan-400',
                badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
              }
              const isSelected = selectedLevel === lvl
              const countP = languageData.patterns.filter((p) => p.level === lvl).length
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                    isSelected
                      ? `${meta.badgeBg} shadow-lg ring-1 ring-cyan-400/40 scale-105`
                      : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{lvl}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-normal">
                    {countP} mẫu
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Level summary description note */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic">
          <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>{levelMeta[selectedLevel]?.desc || ''}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* ================= TAB 1: PRACTICE FOCUS VIEW ================= */}
        {activeTab === 'practice' && (
          <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar list of patterns in this level - Sticky on desktop */}
            <div
              className={`w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/60 shrink-0 h-full min-h-0 md:sticky md:top-0 z-10 ${
                mobileTab1View === 'list' ? 'flex' : 'hidden md:flex'
              }`}
            >
              {/* Sticky Search Header in Sidebar */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder={`Tìm kiếm trong ${selectedLevel}...`}
                    className="w-full pl-9 pr-7 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                  {searchKeyword && (
                    <button
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 px-0.5 font-medium">
                  <span>Mẫu ngữ pháp ({selectedLevel}):</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                    {filteredAllPatterns.length} / {levelPatterns.length} mẫu
                  </span>
                </div>
              </div>

              {/* Scrollable list of patterns */}
              <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
                {/* Pinned Today's Scheduled Grammar Patterns */}
                {showPinnedTodayPatterns && todayPlanDay && studyPlan && (
                  todayPlanPatterns.length > 0 ? (
                    <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 space-y-2 mb-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300 truncate">
                            Hôm nay • Ngày {todayPlanDay.dayIndex}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                              todayPlanDoneCount === todayPlanPatterns.length
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                                : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
                            }`}
                          >
                            {todayPlanDoneCount}/{todayPlanPatterns.length}
                          </span>
                          {onOpenStudyPlan && (
                            <button
                              type="button"
                              onClick={onOpenStudyPlan}
                              className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 hover:underline cursor-pointer"
                            >
                              Xem Plan
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {todayPlanPatterns.map((pat) => {
                          const isCur = currentPattern?.id === pat.id
                          const isDone = isPlanPatternCompleted(pat.id)
                          return (
                            <button
                              key={`today-${pat.id}`}
                              type="button"
                              ref={isCur ? activePatternBtnRef : null}
                              onClick={() => {
                                if (pat.level !== selectedLevel) {
                                  setSelectedLevel(pat.level)
                                }
                                setSelectedPatternId(pat.id)
                                setMobileTab1View('detail')
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                                isCur
                                  ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-500/50 shadow-sm ring-1 ring-cyan-400/30'
                                  : isDone
                                  ? 'bg-white/80 dark:bg-slate-900/60 border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400'
                                  : 'bg-white dark:bg-slate-900/80 border-amber-200 dark:border-amber-500/35 hover:border-amber-400 dark:hover:border-amber-400/60'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1.5 mb-1">
                                <span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400">
                                  {pat.level}
                                </span>
                                {isDone ? (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 font-bold flex items-center gap-0.5">
                                    <Check className="w-2.5 h-2.5" /> Xong
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-bold">
                                    Hôm nay
                                  </span>
                                )}
                              </div>
                              <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2">
                                {pat.pattern}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                {pat.meaning}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : (todayPlanDay.isReviewDay || todayPlanDay.isRestDay) ? (
                    <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 mb-2 flex items-center justify-between gap-2 text-xs text-indigo-800 dark:text-indigo-300">
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

                {filteredAllPatterns.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">Không tìm thấy mẫu phù hợp</div>
                ) : (
                  (showPinnedTodayPatterns && todayPlanPatterns.length > 0
                    ? filteredAllPatterns.filter((p) => !todayPlanPatternIdSet.has(p.id))
                    : filteredAllPatterns
                  ).map((pat, idx) => {
                    const isCur = currentPattern?.id === pat.id
                    const status = getGrammarPatternPassStatus(pat, scoreResults, quizResults)
                    const isDone =
                      status.isPassed || Boolean(studyPlan?.completedGrammarIds?.includes(pat.id))

                    return (
                      <button
                        key={pat.id}
                        ref={isCur ? activePatternBtnRef : null}
                        onClick={() => {
                          setSelectedPatternId(pat.id)
                          setMobileTab1View('detail')
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          isCur
                            ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-500/50 shadow-sm ring-1 ring-cyan-400/30'
                            : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                            #{idx + 1} • {pat.level}
                          </span>
                          {isDone ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 font-bold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              <span>
                                Pass
                                {status.passMethod === 'quiz'
                                  ? ' (Quiz)'
                                  : status.passMethod === 'speaking'
                                  ? ' (Nói)'
                                  : ''}
                              </span>
                            </span>
                          ) : status.passedExamplesCount > 0 ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-semibold">
                              {status.passedExamplesCount}/{pat.examples.length} đạt
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {pat.examples.length} ví dụ
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {pat.pattern}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{pat.meaning}</div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>

            {/* Main Area: Pattern Formula, Pass Modes, Speaking/Reflex & Quick Quiz */}
            <div
              ref={mainContentRef}
              className={`flex-1 min-h-0 h-full flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/40 dark:bg-slate-900/30 scrollbar-thin scrollbar-thumb-slate-700 ${
                mobileTab1View === 'detail' ? 'flex' : 'hidden md:flex'
              }`}
            >
              {currentPattern ? (
                <div className="max-w-4xl w-full mx-auto space-y-5 sm:space-y-6">
                  {/* Mobile Navigation Header: Back to list */}
                  <div className="md:hidden flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setMobileTab1View('list')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Danh sách mẫu ({filteredAllPatterns.length})</span>
                    </button>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                      {currentPattern.level}
                    </span>
                  </div>

                  {/* Pattern Header Card */}
                  <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-md dark:shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                          {currentPattern.level}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mẫu Ngữ Pháp Trọng Tâm</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrentPatternPassed ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              Đã Pass
                              {currentPassStatus?.passMethod === 'both'
                                ? ' (Nói & Quiz)'
                                : currentPassStatus?.passMethod === 'speaking'
                                ? ' (Luyện Nói)'
                                : currentPassStatus?.passMethod === 'quiz'
                                ? ` (Quiz ${currentPassStatus.quizBestPercent}%)`
                                : ''}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            Chưa Pass
                          </span>
                        )}

                        {isCurrentPatternPassed && (
                          <button
                            type="button"
                            onClick={handleGoToNextPattern}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-sm transition-all cursor-pointer"
                          >
                            <span>Mẫu tiếp</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{currentPattern.pattern}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{currentPattern.meaning}</p>

                    {/* Formula Box */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700/70">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Công thức kết hợp
                      </div>
                      <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300 font-mono">
                        {currentPattern.formula}
                      </div>
                    </div>

                    {/* Note if any */}
                    {currentPattern.note && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-lg p-2.5">
                        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-amber-900 dark:text-amber-300">Lưu ý: </strong>
                          {currentPattern.note}
                        </div>
                      </div>
                    )}

                    {/* Pass Rule Hint */}
                    {!isCurrentPatternPassed && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/25 rounded-lg px-3 py-2">
                        <HelpCircle className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                        <span>
                          Để <b>Pass</b> bài này, bạn chọn 1 trong 2 cách: đọc hết ví dụ đạt <b>≥ {GRAMMAR_SPEAKING_PASS_SCORE}đ</b> <i>hoặc</i> hoàn thành <b>Bài Tập Nhanh ≥ {GRAMMAR_QUIZ_PASS_PERCENT}%</b> (không cần Mic).
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dual-Path Mode Switcher: Speaking/Reflex OR Quick Quiz */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setPracticeMode('speaking')}
                      className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        practiceMode === 'speaking'
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Mic className="w-4 h-4 shrink-0" />
                        <span>Luyện Nói &amp; Phản Xạ</span>
                      </span>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                          practiceMode === 'speaking'
                            ? 'bg-emerald-950/15 text-slate-950 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {currentPassStatus?.isSpeakingPassed
                          ? '✓ Pass'
                          : `${currentPassStatus?.passedExamplesCount || 0}/${
                              currentPassStatus?.totalExamplesCount || 0
                            } đạt`}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPracticeMode('quiz')}
                      className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        practiceMode === 'quiz'
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 shrink-0" />
                        <span>Bài Tập Nhanh (Không cần Mic)</span>
                      </span>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                          practiceMode === 'quiz'
                            ? 'bg-white/20 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {currentPassStatus?.isQuizPassed
                          ? `✓ ${currentPassStatus.quizBestPercent}%`
                          : `${quizQuestions.length} câu • ≥${GRAMMAR_QUIZ_PASS_PERCENT}%`}
                      </span>
                    </button>
                  </div>

                  {practiceMode === 'speaking' ? (
                    /* MODE 1: SPEAKING & REFLEX PRACTICE */
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                          <span>
                            Ví dụ luyện nói ({currentPassStatus?.passedExamplesCount || 0}/
                            {currentPattern.examples.length} đạt ≥ {GRAMMAR_SPEAKING_PASS_SCORE}đ)
                          </span>
                        </h3>

                        <button
                          type="button"
                          onClick={() => {
                            setReflexMode((prev) => !prev)
                            setRevealedReflexKeys({})
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            reflexMode
                              ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                          title="Ẩn câu mẫu để luyện phản xạ nói dựa trên nghĩa tiếng Việt"
                        >
                          {reflexMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>Chế độ Phản xạ: {reflexMode ? 'Đang ẩn chữ' : 'Tắt'}</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {currentPattern.examples.map((ex, exIdx) => {
                          const key = `ex-${currentPattern.id}-${exIdx}`
                          const isPlaying = playingKey === key
                          const isRecording = recordingKey === key
                          const score = scoreResults[key]
                          const isExPassed = Boolean(
                            score && score.overallScore >= GRAMMAR_SPEAKING_PASS_SCORE
                          )
                          const hideScript = reflexMode && !revealedReflexKeys[key]

                          return (
                            <div
                              key={exIdx}
                              className={`p-5 rounded-2xl bg-white dark:bg-slate-800/60 border transition-all shadow-sm ${
                                isExPassed
                                  ? 'border-emerald-300 dark:border-emerald-500/40'
                                  : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-1.5">
                                  {hideScript ? (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-[11px] font-bold text-amber-700 dark:text-amber-300 flex items-center justify-center">
                                          {exIdx + 1}
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                                          Phản xạ nói theo nghĩa:
                                        </span>
                                      </div>
                                      <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white pl-7">
                                        {ex.translation}
                                      </div>
                                      <div className="pl-7">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setRevealedReflexKeys((prev) => ({
                                              ...prev,
                                              [key]: true,
                                            }))
                                          }
                                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                          <span>Xem gợi ý chữ</span>
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                                            isExPassed
                                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                              : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300'
                                          }`}
                                        >
                                          {isExPassed ? '✓' : exIdx + 1}
                                        </span>
                                        <div className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                                          {currentLang === 'ja' ? (
                                            <FuriganaText
                                              text={ex.text}
                                              furigana={ex.furigana}
                                              lang="ja"
                                              showFurigana={showFurigana}
                                            />
                                          ) : (
                                            <span>{ex.text}</span>
                                          )}
                                        </div>
                                      </div>

                                      {ex.reading && (
                                        <div className="text-xs text-cyan-600 dark:text-cyan-400 font-mono pl-7">
                                          {ex.reading}
                                        </div>
                                      )}

                                      <div className="text-sm text-slate-600 dark:text-slate-300 pl-7">
                                        {ex.translation}
                                      </div>
                                    </>
                                  )}
                                </div>

                                {/* Action Buttons: Listen & Speak */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => handlePlayTTS(ex.text, key)}
                                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                                      isPlaying
                                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 animate-pulse'
                                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                    title="Nghe phát âm chuẩn"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>

                                  <button
                                    onClick={() => handleToggleRecord(ex, key)}
                                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                                      isRecording
                                        ? 'bg-red-500 border-red-400 text-white shadow-md shadow-red-500/30 animate-pulse'
                                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                    title={isRecording ? 'Dừng & Chấm điểm' : 'Luyện đọc câu này'}
                                  >
                                    {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>

                              {/* Live Recording HUD (Transcript + Explicit Stop & Score) */}
                              {isRecording && (
                                <div className="mt-3 ml-7 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-200 min-w-0 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                                    <span className="font-semibold truncate">
                                      {isTranscribing
                                        ? 'Đang nhận diện giọng nói (Whisper)...'
                                        : spokenTranscript
                                        ? `Đang nhận: "${spokenTranscript}"`
                                        : micStatus === 'starting'
                                        ? 'Đang mở micro...'
                                        : micStatus === 'mic-open'
                                        ? 'Micro đã mở — hãy nói câu mẫu'
                                        : micStatus === 'sound' || micStatus === 'speech'
                                        ? 'Đã nghe thấy giọng nói...'
                                        : 'Đang lắng nghe...'}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleToggleRecord(ex, key)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer shrink-0"
                                  >
                                    <Square className="w-3 h-3 fill-current" />
                                    <span>Dừng &amp; Chấm điểm</span>
                                  </button>
                                </div>
                              )}

                              {isRecording && micHint && (
                                <div className="mt-2 ml-7 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 rounded-lg px-3 py-2">
                                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                  <span>{micHint}</span>
                                </div>
                              )}

                              {/* Inline Speech / Microphone Error Notice */}
                              {speechError && speechError.key === key && !isRecording && (
                                <div className="mt-3 ml-7 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{speechError.message}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setPracticeMode('quiz')}
                                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shrink-0 cursor-pointer self-start sm:self-center"
                                  >
                                    Chuyển Bài Tập Nhanh
                                  </button>
                                </div>
                              )}

                              {score && !isRecording && (
                                <div className="mt-3 pl-7 pt-3 border-t border-slate-200 dark:border-slate-700/50 space-y-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <div
                                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${
                                        score.overallScore >= GRAMMAR_SPEAKING_PASS_SCORE
                                          ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
                                          : 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/30'
                                      }`}
                                    >
                                      <Award className="w-3.5 h-3.5" />
                                      <span>
                                        {score.overallScore >= GRAMMAR_SPEAKING_PASS_SCORE
                                          ? `Đạt chuẩn: ${score.overallScore}đ`
                                          : `Chưa đạt: ${score.overallScore}đ (cần ≥ ${GRAMMAR_SPEAKING_PASS_SCORE}đ)`}
                                      </span>
                                    </div>

                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                      Độ chính xác: {score.accuracyPercent}%
                                    </span>
                                  </div>

                                  {score.wordBreakdown && score.wordBreakdown.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 text-sm">
                                      {score.wordBreakdown.map((tok, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className={`px-1.5 py-0.5 rounded-md font-semibold border ${
                                            tok.status === 'correct'
                                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
                                              : tok.status === 'close'
                                              ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
                                              : 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/30 line-through'
                                          }`}
                                        >
                                          {tok.word}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  <div className="text-xs text-slate-700 dark:text-slate-300">{score.feedback}</div>

                                  {score.spokenText && (
                                    <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                                      Máy ghi nhận: "{score.spokenText}"
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {currentPassStatus?.isSpeakingPassed && (
                        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <div className="text-xs sm:text-sm font-bold">
                              Chúc mừng! Bạn đã Pass toàn bộ ví dụ nói của mẫu này.
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {!currentPassStatus.isQuizPassed && (
                              <button
                                type="button"
                                onClick={() => setPracticeMode('quiz')}
                                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                              >
                                Làm thêm Quiz
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={handleGoToNextPattern}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-sm cursor-pointer"
                            >
                              <span>Mẫu tiếp theo</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* MODE 2: QUICK QUIZ WITHOUT MICROPHONE */
                    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 shadow-sm space-y-5">
                      {!quizFinished && quizQuestions[quizIdx] ? (
                        (() => {
                          const q = quizQuestions[quizIdx]
                          const isMcqCorrect =
                            q.type !== 'reorder' && quizSelectedOption === q.correctOption
                          const isReorderCorrect =
                            q.type === 'reorder' && quizSelectedOption === q.correctSentence

                          return (
                            <>
                              {/* Quiz Header & Progress Dots */}
                              <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-slate-200 dark:border-slate-700/70">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40">
                                    {q.badge}
                                  </span>
                                  <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400">
                                    Câu {quizIdx + 1}/{quizQuestions.length}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {quizQuestions.map((_, i) => (
                                      <span
                                        key={i}
                                        className={`h-2 rounded-full transition-all ${
                                          i === quizIdx
                                            ? 'w-5 bg-indigo-500'
                                            : i < quizIdx
                                            ? 'w-2 bg-emerald-500'
                                            : 'w-2 bg-slate-200 dark:bg-slate-700'
                                        }`}
                                      />
                                    ))}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => startFreshQuiz(currentPattern)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold cursor-pointer"
                                    title="Tạo bộ câu hỏi mới"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Đổi câu</span>
                                  </button>
                                </div>
                              </div>

                              {/* Question Prompt */}
                              <div className="space-y-2.5">
                                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                                  {q.prompt}
                                </h4>

                                {q.sentenceDisplay && (
                                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700 text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                                    {q.sentenceDisplay}
                                  </div>
                                )}

                                {q.subPrompt && (
                                  <div className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/25 rounded-xl px-3.5 py-2 font-medium">
                                    {q.subPrompt}
                                  </div>
                                )}
                              </div>

                              {/* Reorder Question UI vs MCQ Options */}
                              {q.type === 'reorder' && q.reorderChunks ? (
                                <div className="space-y-4">
                                  {/* Answer Drop Zone */}
                                  <div className="min-h-[60px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
                                    {quizPlacedIndices.length === 0 ? (
                                      <span className="text-xs text-slate-400">
                                        Chạm vào các thẻ bên dưới theo đúng thứ tự câu...
                                      </span>
                                    ) : (
                                      quizPlacedIndices.map((chunkIdx, pos) => (
                                        <button
                                          key={`placed-${chunkIdx}-${pos}`}
                                          type="button"
                                          disabled={quizAnswered}
                                          onClick={() =>
                                            setQuizPlacedIndices((prev) =>
                                              prev.filter((idxVal) => idxVal !== chunkIdx)
                                            )
                                          }
                                          className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition-all cursor-pointer disabled:cursor-default ${
                                            quizAnswered
                                              ? isReorderCorrect
                                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-400'
                                                : 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-400'
                                              : 'bg-indigo-100 dark:bg-indigo-500/25 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-500/50 hover:bg-rose-50 dark:hover:bg-rose-500/20'
                                          }`}
                                          title="Bấm để bỏ mảnh ghép này ra"
                                        >
                                          {q.reorderChunks![chunkIdx]}
                                        </button>
                                      ))
                                    )}
                                  </div>

                                  {/* Chunk Bank */}
                                  <div className="flex flex-wrap gap-2">
                                    {q.reorderChunks.map((chunk, chunkIdx) => {
                                      const isUsed = quizPlacedIndices.includes(chunkIdx)
                                      return (
                                        <button
                                          key={`bank-${chunkIdx}`}
                                          type="button"
                                          disabled={isUsed || quizAnswered}
                                          onClick={() =>
                                            setQuizPlacedIndices((prev) => [...prev, chunkIdx])
                                          }
                                          className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                                            isUsed
                                              ? 'opacity-30 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-default'
                                              : 'bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-indigo-400 cursor-pointer active:scale-95'
                                          }`}
                                        >
                                          {chunk}
                                        </button>
                                      )
                                    })}
                                  </div>

                                  {!quizAnswered && (
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        type="button"
                                        disabled={quizPlacedIndices.length === 0}
                                        onClick={() => setQuizPlacedIndices([])}
                                        className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                                      >
                                        Xóa chọn
                                      </button>
                                      <button
                                        type="button"
                                        disabled={quizPlacedIndices.length !== q.reorderChunks.length}
                                        onClick={handleSubmitReorder}
                                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
                                      >
                                        Kiểm tra đáp án
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                /* MCQ 4 Options */
                                <div className="grid grid-cols-1 gap-2.5">
                                  {(q.options || []).map((opt, optIdx) => {
                                    const isSelected = quizSelectedOption === opt
                                    const isCorrectOpt = opt === q.correctOption
                                    let btnStyle =
                                      'bg-slate-50 dark:bg-slate-900/80 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-100'
                                    if (quizAnswered) {
                                      if (isCorrectOpt) {
                                        btnStyle =
                                          'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500/60 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-400/40'
                                      } else if (isSelected) {
                                        btnStyle =
                                          'bg-rose-50 dark:bg-rose-500/20 border-rose-400 dark:border-rose-500/60 text-rose-900 dark:text-rose-200'
                                      } else {
                                        btnStyle =
                                          'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-65'
                                      }
                                    }

                                    return (
                                      <button
                                        key={optIdx}
                                        type="button"
                                        disabled={quizAnswered}
                                        onClick={() => handleSelectMcqOption(opt)}
                                        className={`w-full text-left p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                                      >
                                        <span className="flex items-center gap-3 min-w-0">
                                          <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                                            {String.fromCharCode(65 + optIdx)}
                                          </span>
                                          <span className="leading-snug">{opt}</span>
                                        </span>
                                        {quizAnswered && isCorrectOpt && (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        )}
                                        {quizAnswered && isSelected && !isCorrectOpt && (
                                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                        )}
                                      </button>
                                    )
                                  })}
                                </div>
                              )}

                              {/* Immediate Explanation + Next Button */}
                              {quizAnswered && (
                                <div className="space-y-3 pt-2">
                                  <div
                                    className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                                      (q.type === 'reorder' ? isReorderCorrect : isMcqCorrect)
                                        ? 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                                        : 'bg-rose-50 dark:bg-rose-500/15 border-rose-300 dark:border-rose-500/40 text-rose-900 dark:text-rose-200'
                                    }`}
                                  >
                                    {(q.type === 'reorder' ? isReorderCorrect : isMcqCorrect) ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    )}
                                    <div className="space-y-0.5">
                                      <div className="font-bold">
                                        {(q.type === 'reorder' ? isReorderCorrect : isMcqCorrect)
                                          ? 'Chính xác!'
                                          : 'Chưa đúng'}
                                      </div>
                                      <div>{q.explanation}</div>
                                    </div>
                                  </div>

                                  <div className="flex justify-end">
                                    <button
                                      type="button"
                                      onClick={handleAdvanceQuiz}
                                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md cursor-pointer"
                                    >
                                      <span>
                                        {quizIdx < quizQuestions.length - 1
                                          ? 'Câu tiếp theo'
                                          : 'Xem kết quả'}
                                      </span>
                                      <ArrowRight className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )
                        })()
                      ) : (
                        /* Quiz Result Summary */
                        (() => {
                          const total = Math.max(1, quizQuestions.length)
                          const percent = Math.round((quizCorrectCount / total) * 100)
                          const isAttemptPass = percent >= GRAMMAR_QUIZ_PASS_PERCENT

                          return (
                            <div className="py-4 text-center space-y-4">
                              <div
                                className={`w-20 h-20 mx-auto rounded-2xl border-2 flex flex-col items-center justify-center font-mono ${
                                  isAttemptPass
                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-rose-100 dark:bg-rose-500/20 border-rose-400 text-rose-700 dark:text-rose-300'
                                }`}
                              >
                                <span className="text-2xl font-extrabold leading-none">
                                  {percent}%
                                </span>
                                <span className="text-[11px] font-bold mt-1">
                                  {quizCorrectCount}/{quizQuestions.length} câu
                                </span>
                              </div>

                              <div className="space-y-1">
                                <h4
                                  className={`text-lg font-extrabold flex items-center justify-center gap-1.5 ${
                                    isAttemptPass
                                      ? 'text-emerald-700 dark:text-emerald-300'
                                      : 'text-rose-700 dark:text-rose-300'
                                  }`}
                                >
                                  {isAttemptPass
                                    ? '🎉 Đã Pass Bài Tập Ngữ Pháp!'
                                    : `Chưa đủ điểm đỗ (cần ≥ ${GRAMMAR_QUIZ_PASS_PERCENT}%)`}
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                                  {isAttemptPass
                                    ? 'Mẫu ngữ pháp này đã được tính hoàn thành và tự động đồng bộ vào Tiến độ & Kế hoạch học tập của bạn.'
                                    : 'Bạn hãy thử làm lại bộ câu hỏi mới hoặc chuyển sang tab Luyện Nói để Pass mẫu này nhé!'}
                                </p>
                              </div>

                              <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
                                <button
                                  type="button"
                                  onClick={() => startFreshQuiz(currentPattern)}
                                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold cursor-pointer"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                  <span>Làm lại bộ câu hỏi mới</span>
                                </button>

                                {(isAttemptPass || isCurrentPatternPassed) && (
                                  <button
                                    type="button"
                                    onClick={handleGoToNextPattern}
                                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md cursor-pointer"
                                  >
                                    <span>Mẫu tiếp theo</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        })()
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500">
                  Chọn một mẫu ngữ pháp để bắt đầu luyện tập
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: ALL PATTERNS OF LEVEL (ACCORDION & SEARCH) ================= */}
        {activeTab === 'all-patterns' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 bg-slate-50/40 dark:bg-slate-900/30">
            <div className="max-w-5xl w-full mx-auto space-y-4">
              {/* Top search & count header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Toàn bộ ngữ pháp cấp độ {selectedLevel}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tổng hợp tất cả {levelPatterns.length} cấu trúc trọng tâm, công thức và 3-5 ví dụ minh họa
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Tìm theo tên mẫu, công thức, nghĩa..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Accordion Pattern List */}
              <div className="space-y-3">
                {filteredAllPatterns.map((pat, idx) => {
                  const isExpanded = expandedPatternIds[pat.id] !== false // Default expanded or user toggle
                  return (
                    <div
                      key={pat.id}
                      className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 overflow-hidden transition-all shadow-sm"
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => togglePatternExpand(pat.id)}
                        className="w-full text-left p-4.5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/90 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-base font-bold text-slate-900 dark:text-white">{pat.pattern}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pat.meaning}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                            {pat.examples.length} ví dụ
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Body */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-slate-700/50 space-y-4 bg-slate-50/70 dark:bg-slate-900/40">
                          {/* Formula & Note */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                              <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 block mb-1">
                                CÔNG THỨC KẾT HỢP:
                              </span>
                              <span className="text-emerald-700 dark:text-emerald-300 font-mono font-medium">{pat.formula}</span>
                            </div>

                            {pat.note && (
                              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
                                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
                                  LƯU Ý SỬ DỤNG:
                                </span>
                                <span>{pat.note}</span>
                              </div>
                            )}
                          </div>

                          {/* 3-5 Examples */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Ví dụ mẫu ({pat.examples.length} câu):
                            </div>
                            {pat.examples.map((ex, exIdx) => {
                              const key = `all-ex-${pat.id}-${exIdx}`
                              const isPlaying = playingKey === key

                              return (
                                <div
                                  key={exIdx}
                                  className="p-3 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/40 flex items-center justify-between gap-3 text-xs shadow-xs"
                                >
                                  <div className="flex-1 space-y-1">
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                      {currentLang === 'ja' ? (
                                        <FuriganaText
                                          text={ex.text}
                                          furigana={ex.furigana}
                                          lang="ja"
                                          showFurigana={showFurigana}
                                        />
                                      ) : (
                                        <span>{ex.text}</span>
                                      )}
                                    </div>
                                    {ex.reading && (
                                      <div className="text-cyan-700 dark:text-cyan-400 font-mono">{ex.reading}</div>
                                    )}
                                    <div className="text-slate-600 dark:text-slate-300">{ex.translation}</div>
                                  </div>

                                  <button
                                    onClick={() => handlePlayTTS(ex.text, key)}
                                    className={`p-2 rounded-lg border transition-all shrink-0 ${
                                      isPlaying
                                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md animate-pulse'
                                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                    title="Nghe câu này"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: KAIWA LIVING CONVERSATIONS ================= */}
        {activeTab === 'kaiwa' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 bg-slate-50/40 dark:bg-slate-900/30">
            <div className="max-w-5xl w-full mx-auto space-y-6">
              {/* Header Info */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-gradient-to-r dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                    {selectedLevel} Kaiwa
                  </span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Mẫu Câu Giao Tiếp Đời Sống Thực Tế</h2>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Tổng hợp các tình huống đời sống sinh hoạt, công việc, mua sắm, nhà hàng, du lịch... sát với thực tế của trình độ {selectedLevel}.
                </p>
              </div>

              {/* Kaiwa Situation Groups */}
              {levelKaiwa.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  Chưa có dữ liệu Kaiwa cho cấp độ này
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {levelKaiwa.map((group) => (
                    <div
                      key={group.id}
                      className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 overflow-hidden shadow-sm dark:shadow-lg flex flex-col"
                    >
                      {/* Group Header */}
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{group.situation}</h3>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400">
                          {group.phrases.length} câu
                        </span>
                      </div>

                      {/* Group Phrases */}
                      <div className="p-4 space-y-3 flex-1">
                        {group.phrases.map((phrase, pIdx) => {
                          const key = `kaiwa-${group.id}-${pIdx}`
                          const isPlaying = playingKey === key
                          const isRecording = recordingKey === key
                          const score = scoreResults[key]

                          return (
                            <div
                              key={pIdx}
                              className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 space-y-1">
                                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {currentLang === 'ja' ? (
                                      <FuriganaText
                                        text={phrase.text}
                                        furigana={phrase.furigana}
                                        lang="ja"
                                        showFurigana={showFurigana}
                                      />
                                    ) : (
                                      <span>{phrase.text}</span>
                                    )}
                                  </div>

                                  {phrase.reading && (
                                    <div className="text-cyan-700 dark:text-cyan-400 font-mono">{phrase.reading}</div>
                                  )}

                                  <div className="text-slate-600 dark:text-slate-300">{phrase.translation}</div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => handlePlayTTS(phrase.text, key)}
                                    className={`p-2 rounded-lg border transition-all ${
                                      isPlaying
                                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md animate-pulse'
                                        : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                    title="Nghe phát âm"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => handleToggleRecord(phrase, key)}
                                    className={`p-2 rounded-lg border transition-all ${
                                      isRecording
                                        ? 'bg-red-500 border-red-400 text-white shadow-md animate-pulse'
                                        : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                    title="Luyện đọc câu này"
                                  >
                                    {isRecording ? (
                                      <MicOff className="w-3.5 h-3.5" />
                                    ) : (
                                      <Mic className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Live Recording text */}
                              {isRecording && (
                                <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-rose-600 dark:text-rose-300">
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                                    <span className="truncate">
                                      Đang lắng nghe: {spokenTranscript || 'Hãy nói vào mic...'}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleRecord(phrase, key)}
                                    className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold shrink-0 cursor-pointer"
                                  >
                                    Dừng &amp; Chấm
                                  </button>
                                </div>
                              )}

                              {speechError && speechError.key === key && !isRecording && (
                                <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{speechError.message}</span>
                                </div>
                              )}

                              {/* Pronunciation score */}
                              {score && !isRecording && (
                                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                                  <div
                                    className={`font-semibold ${
                                      score.overallScore >= 80
                                        ? 'text-emerald-700 dark:text-emerald-400'
                                        : score.overallScore >= 60
                                        ? 'text-amber-700 dark:text-amber-400'
                                        : 'text-rose-700 dark:text-rose-400'
                                    }`}
                                  >
                                    Điểm: {score.overallScore}% ({score.accuracyPercent}% chuẩn)
                                  </div>
                                  <div className="text-slate-500 dark:text-slate-400">{score.feedback}</div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
