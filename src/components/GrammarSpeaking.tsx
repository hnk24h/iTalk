import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Language, GrammarPattern, KaiwaGroup, GrammarExample, ScoreResult } from '../types'
import { supportedLanguages } from '../data/languages'
import { japaneseGrammar, japaneseKaiwa } from '../data/grammar-ja'
import { chineseGrammar, chineseKaiwa } from '../data/grammar-zh'
import { vietnameseGrammar, vietnameseKaiwa } from '../data/grammar-vi'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer } from '../services/speech'
import { evaluatePronunciation } from '../services/scoring'
import { FuriganaText } from '../services/furigana'
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
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  Flame,
  Info,
  Compass,
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

export const GrammarSpeaking: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
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

  // Reset level & selected pattern when language changes
  useEffect(() => {
    const firstLevel = languageData.levels[0]
    setSelectedLevel(firstLevel)
    const firstPattern = languageData.patterns.find((p) => p.level === firstLevel)
    setSelectedPatternId(firstPattern ? firstPattern.id : '')
    setExpandedPatternIds({})
  }, [currentLang, languageData])

  // Reset selected pattern when level changes
  useEffect(() => {
    const firstPattern = levelPatterns[0]
    if (firstPattern && (!selectedPatternId || !levelPatterns.some((p) => p.id === selectedPatternId))) {
      setSelectedPatternId(firstPattern.id)
    }
  }, [selectedLevel, levelPatterns])

  // Active selected pattern
  const currentPattern = useMemo(() => {
    return levelPatterns.find((p) => p.id === selectedPatternId) || levelPatterns[0] || null
  }, [levelPatterns, selectedPatternId])

  // Audio playing state
  const [playingKey, setPlayingKey] = useState<string | null>(null)

  // Speech recording state
  const [recordingKey, setRecordingKey] = useState<string | null>(null)
  const [spokenTranscript, setSpokenTranscript] = useState<string>('')
  const [scoreResults, setScoreResults] = useState<Record<string, ScoreResult>>({})
  const recognizerRef = useRef<SpeechRecognizer | null>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const activePatternBtnRef = useRef<HTMLButtonElement>(null)

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
      if (recognizerRef.current) {
        recognizerRef.current.stop()
      }
    }
  }, [])

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
    if (recordingKey === key) {
      // Stop recording and score
      if (recognizerRef.current) {
        recognizerRef.current.stop()
      }
      setRecordingKey(null)
      return
    }

    stopTextToSpeech()
    setPlayingKey(null)
    setSpokenTranscript('')
    setRecordingKey(key)

    if (!recognizerRef.current) {
      recognizerRef.current = new SpeechRecognizer()
    }

    const cleanTarget = cleanSpeechText(targetExample.text)

    recognizerRef.current.start({
      lang: currentLangMeta.speechCode,
      onResult: (transcript, isFinal) => {
        setSpokenTranscript(transcript)
        if (isFinal && transcript.trim()) {
          const result = evaluatePronunciation({
            targetText: cleanTarget,
            spokenText: transcript,
            lang: currentLang,
          })
          setScoreResults((prev) => ({ ...prev, [key]: result }))
          setRecordingKey(null)
        }
      },
      onError: (err) => {
        console.warn('Speech error:', err)
        setRecordingKey(null)
      },
      onEnd: () => {
        setRecordingKey(null)
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

  return (
    <div className="h-[calc(100vh-115px)] min-h-[640px] flex flex-col bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
            {currentLangMeta.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Luyện Ngữ Pháp & Kaiwa Đời Sống</h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentLangMeta.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân cấp theo Level • Mẫu câu giao tiếp thực tế • 3-5 Ví dụ trực quan & Luyện phát âm
            </p>
          </div>
        </div>

        {/* Global Controls: Japanese Furigana Toggle & Tab switchers */}
        <div className="flex items-center gap-3">
          {currentLang === 'ja' && (
            <button
              onClick={() => setShowFurigana(!showFurigana)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                showFurigana
                  ? 'bg-indigo-600/30 border-indigo-500/40 text-indigo-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Bật/Tắt hiển thị Hiragana trên chữ Kanji"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Furigana</span>
              <span
                className={`w-2 h-2 rounded-full ${showFurigana ? 'bg-indigo-400 shadow-sm shadow-indigo-400' : 'bg-slate-600'}`}
              />
            </button>
          )}

          {/* Tab Selector */}
          <div className="flex p-1 bg-slate-800/80 rounded-xl border border-slate-700/70 text-xs">
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'practice'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Luyện Từng Mẫu (3-5 Ví Dụ)</span>
            </button>
            <button
              onClick={() => setActiveTab('all-patterns')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'all-patterns'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tất Cả Mẫu Của Level ({levelPatterns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('kaiwa')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'kaiwa'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Kaiwa Đời Sống ({levelKaiwa.length} Chủ Đề)</span>
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
                      : 'bg-slate-800/70 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{lvl}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 text-slate-300 font-normal">
                    {countP} mẫu
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Level summary description note */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 italic">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>{levelMeta[selectedLevel]?.desc || ''}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* ================= TAB 1: PRACTICE FOCUS VIEW ================= */}
        {activeTab === 'practice' && (
          <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar list of patterns in this level - Sticky on desktop */}
            <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-slate-950/60 shrink-0 max-h-72 md:max-h-full h-full min-h-0 md:sticky md:top-0 z-10">
              {/* Sticky Search Header in Sidebar */}
              <div className="p-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder={`Tìm kiếm trong ${selectedLevel}...`}
                    className="w-full pl-9 pr-7 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                  {searchKeyword && (
                    <button
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-0.5 font-medium">
                  <span>Mẫu ngữ pháp ({selectedLevel}):</span>
                  <span className="text-cyan-400 font-semibold">
                    {filteredAllPatterns.length} / {levelPatterns.length} mẫu
                  </span>
                </div>
              </div>

              {/* Scrollable list of patterns */}
              <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
                {filteredAllPatterns.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">Không tìm thấy mẫu phù hợp</div>
                ) : (
                  filteredAllPatterns.map((pat, idx) => {
                    const isCur = currentPattern?.id === pat.id
                    return (
                      <button
                        key={pat.id}
                        ref={isCur ? activePatternBtnRef : null}
                        onClick={() => setSelectedPatternId(pat.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isCur
                            ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                            : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-cyan-400">
                            #{idx + 1} • {pat.level}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                            {pat.examples.length} ví dụ
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-white leading-snug line-clamp-2">
                          {pat.pattern}
                        </div>
                        <div className="text-xs text-slate-400 mt-1 line-clamp-1">{pat.meaning}</div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>

            {/* Main Area: Pattern Formula, Notes and 3-5 Interactive Examples */}
            <div
              ref={mainContentRef}
              className="flex-1 min-h-0 h-full flex flex-col overflow-y-auto p-6 lg:p-8 bg-slate-900/30 scrollbar-thin scrollbar-thumb-slate-700"
            >
              {currentPattern ? (
                <div className="max-w-4xl w-full mx-auto space-y-6">
                  {/* Pattern Header Card */}
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {currentPattern.level}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Mẫu Ngữ Pháp Trọng Tâm</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{currentPattern.pattern}</h2>
                    <p className="text-sm text-slate-300 mb-4">{currentPattern.meaning}</p>

                    {/* Formula Box */}
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-700/70">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Công thức kết hợp
                      </div>
                      <div className="text-sm font-medium text-emerald-300 font-mono">
                        {currentPattern.formula}
                      </div>
                    </div>

                    {/* Note if any */}
                    {currentPattern.note && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/30 border border-amber-800/40 rounded-lg p-2.5">
                        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-amber-300">Lưu ý: </strong>
                          {currentPattern.note}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3-5 Example Sentences Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        Danh sách ví dụ làm quen ({currentPattern.examples.length} câu)
                      </h3>
                      <span className="text-xs text-slate-500">
                        Bấm loa để nghe • Bấm micro để luyện đọc & chấm điểm
                      </span>
                    </div>

                    <div className="space-y-4">
                      {currentPattern.examples.map((ex, exIdx) => {
                        const key = `ex-${currentPattern.id}-${exIdx}`
                        const isPlaying = playingKey === key
                        const isRecording = recordingKey === key
                        const score = scoreResults[key]

                        return (
                          <div
                            key={exIdx}
                            className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-all shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-slate-700/80 text-[11px] font-bold text-slate-300 flex items-center justify-center">
                                    {exIdx + 1}
                                  </span>
                                  <div className="text-base md:text-lg font-semibold text-white leading-relaxed">
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
                                  <div className="text-xs text-cyan-400 font-mono pl-7">
                                    {ex.reading}
                                  </div>
                                )}

                                <div className="text-sm text-slate-300 pl-7">{ex.translation}</div>
                              </div>

                              {/* Action Buttons: Listen & Speak */}
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => handlePlayTTS(ex.text, key)}
                                  className={`p-2.5 rounded-xl border transition-all ${
                                    isPlaying
                                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 animate-pulse'
                                      : 'bg-slate-700/60 border-slate-600/60 text-slate-300 hover:text-white hover:bg-slate-700'
                                  }`}
                                  title="Nghe phát âm chuẩn"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => handleToggleRecord(ex, key)}
                                  className={`p-2.5 rounded-xl border transition-all ${
                                    isRecording
                                      ? 'bg-red-500 border-red-400 text-white shadow-md shadow-red-500/30 animate-pulse'
                                      : 'bg-slate-700/60 border-slate-600/60 text-slate-300 hover:text-white hover:bg-slate-700'
                                  }`}
                                  title="Luyện đọc câu này"
                                >
                                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {/* Live Speech or Score Feedback */}
                            {isRecording && (
                              <div className="mt-3 pl-7 flex items-center gap-2 text-xs text-amber-300 animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                                <span>Đang lắng nghe: {spokenTranscript || 'Hãy nói vào micro...'}</span>
                              </div>
                            )}

                            {score && !isRecording && (
                              <div className="mt-3 pl-7 pt-3 border-t border-slate-700/50">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${
                                      score.overallScore >= 80
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                        : score.overallScore >= 60
                                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                    }`}
                                  >
                                    <Award className="w-3.5 h-3.5" />
                                    <span>Điểm phát âm: {score.overallScore}%</span>
                                  </div>

                                  <span className="text-xs text-slate-400">
                                    Độ chính xác: {score.accuracyPercent}%
                                  </span>
                                </div>

                                <div className="text-xs text-slate-300 mt-1.5">{score.feedback}</div>

                                {score.spokenText && (
                                  <div className="text-xs text-slate-400 mt-1 italic">
                                    Máy ghi nhận: "{score.spokenText}"
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
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
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 bg-slate-900/30">
            <div className="max-w-5xl w-full mx-auto space-y-4">
              {/* Top search & count header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Toàn bộ ngữ pháp cấp độ {selectedLevel}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
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
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
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
                      className="rounded-2xl bg-slate-800/50 border border-slate-700/60 overflow-hidden transition-all shadow-sm"
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => togglePatternExpand(pat.id)}
                        className="w-full text-left p-4.5 flex items-center justify-between gap-4 hover:bg-slate-800/90 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-base font-bold text-white">{pat.pattern}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{pat.meaning}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-400 hidden sm:inline-block">
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
                        <div className="px-5 pb-5 pt-2 border-t border-slate-700/50 space-y-4 bg-slate-900/40">
                          {/* Formula & Note */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                              <span className="text-[11px] font-bold text-cyan-400 block mb-1">
                                CÔNG THỨC KẾT HỢP:
                              </span>
                              <span className="text-emerald-300 font-mono">{pat.formula}</span>
                            </div>

                            {pat.note && (
                              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                                <span className="text-[11px] font-bold text-amber-400 block mb-1">
                                  LƯU Ý SỬ DỤNG:
                                </span>
                                <span>{pat.note}</span>
                              </div>
                            )}
                          </div>

                          {/* 3-5 Examples */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Ví dụ mẫu ({pat.examples.length} câu):
                            </div>
                            {pat.examples.map((ex, exIdx) => {
                              const key = `all-ex-${pat.id}-${exIdx}`
                              const isPlaying = playingKey === key

                              return (
                                <div
                                  key={exIdx}
                                  className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/40 flex items-center justify-between gap-3 text-xs"
                                >
                                  <div className="flex-1 space-y-1">
                                    <div className="text-sm font-semibold text-white">
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
                                      <div className="text-cyan-400 font-mono">{ex.reading}</div>
                                    )}
                                    <div className="text-slate-300">{ex.translation}</div>
                                  </div>

                                  <button
                                    onClick={() => handlePlayTTS(ex.text, key)}
                                    className={`p-2 rounded-lg border transition-all shrink-0 ${
                                      isPlaying
                                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md animate-pulse'
                                        : 'bg-slate-700/50 border-slate-600/60 text-slate-300 hover:text-white hover:bg-slate-700'
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
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto p-6 bg-slate-900/30">
            <div className="max-w-5xl w-full mx-auto space-y-6">
              {/* Header Info */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {selectedLevel} Kaiwa
                  </span>
                  <h2 className="text-base font-bold text-white">Mẫu Câu Giao Tiếp Đời Sống Thực Tế</h2>
                </div>
                <p className="text-xs text-slate-300">
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
                      className="rounded-2xl bg-slate-800/60 border border-slate-700/70 overflow-hidden shadow-lg flex flex-col"
                    >
                      {/* Group Header */}
                      <div className="p-4 bg-slate-800/90 border-b border-slate-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <h3 className="text-sm font-bold text-white">{group.situation}</h3>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-400">
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
                              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all text-xs"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 space-y-1">
                                  <div className="text-sm font-semibold text-white">
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
                                    <div className="text-cyan-400 font-mono">{phrase.reading}</div>
                                  )}

                                  <div className="text-slate-300">{phrase.translation}</div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => handlePlayTTS(phrase.text, key)}
                                    className={`p-2 rounded-lg border transition-all ${
                                      isPlaying
                                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md animate-pulse'
                                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
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
                                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
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
                                <div className="mt-2 text-[11px] text-amber-300 animate-pulse flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                                  <span>Đang lắng nghe: {spokenTranscript || 'Hãy nói vào mic...'}</span>
                                </div>
                              )}

                              {/* Pronunciation score */}
                              {score && !isRecording && (
                                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                                  <div
                                    className={`font-semibold ${
                                      score.overallScore >= 80
                                        ? 'text-emerald-400'
                                        : score.overallScore >= 60
                                        ? 'text-amber-400'
                                        : 'text-rose-400'
                                    }`}
                                  >
                                    Điểm: {score.overallScore}% ({score.accuracyPercent}% chuẩn)
                                  </div>
                                  <div className="text-slate-400">{score.feedback}</div>
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
