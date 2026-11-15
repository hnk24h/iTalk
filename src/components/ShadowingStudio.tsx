import React, { useState, useEffect, useRef } from 'react'
import { Language, Lesson, LessonSentence, ScoreResult } from '../types'
import { supportedLanguages } from '../data/languages'
import { defaultLessonsByLanguage } from '../data/languages'
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
} from 'lucide-react'

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
        }).catch(() => setAudioSourceMode('tts'))
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
    }
  }, [])

  const stopPlayback = () => {
    stopTextToSpeech()
    if (nativeAudioRef.current) {
      nativeAudioRef.current.pause()
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
    setIsPlayingAudio(true)
    playTextToSpeech({
      text: currentSentence.text,
      lang: langMeta.speechCode,
      rate: speechRate,
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
      alert(`Không thể bắt đầu ghi: ${err.message}`)
    }
  }

  // Handle Stop Recording & Evaluate
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

  // Callback when a new lesson with native audio is created
  const handleLessonCreated = (newLesson: Lesson) => {
    setLessons((prev) => [newLesson, ...prev])
    setActiveLessonId(newLesson.id)
    setCurrentSentenceIdx(0)
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
      level: 'Tự biên soạn',
      category: 'Cá nhân',
      sentences: newSentences.length > 0 ? newSentences : [
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
  }

  return (
    <div className="space-y-6">
      {/* Hidden audio element for Native Audio File */}
      {activeLesson?.originalAudioUrl && (
        <audio
          ref={nativeAudioRef}
          src={activeLesson.originalAudioUrl}
          onTimeUpdate={(e) => setNativeAudioCurrentTime(e.currentTarget.currentTime)}
          onEnded={() => {
            setIsPlayingAudio(false)
            if (autoLoop) setTimeout(handlePlayModel, 600)
          }}
        />
      )}

      {/* Top Bar: Lesson Selector, Native Audio Importer & Mode Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
        {/* Lesson Picker */}
        <div className="flex-1 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            {activeLesson?.originalAudioUrl ? (
              <FileAudio className="w-5 h-5 text-indigo-400" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Bài đọc ({langMeta.name})
              </label>
              {activeLesson?.originalAudioUrl && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Headphones className="w-3 h-3" /> File gốc
                </span>
              )}
            </div>
            <select
              value={activeLessonId}
              onChange={(e) => {
                setActiveLessonId(e.target.value)
                setCurrentSentenceIdx(0)
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-sm font-medium text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.originalAudioUrl ? '🎧 [Audio Gốc] ' : ''}[{l.level}] {l.title} ({l.sentences.length} câu)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons: Import Audio, Custom Text & Record Mode */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dedicated Button: Import Original Audio */}
          <button
            onClick={() => setShowAudioImporter(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
            title="Nạp file nghe MP3/WAV gốc và phụ đề"
          >
            <FileAudio className="w-4 h-4" />
            <span>Nạp File Nghe Gốc</span>
          </button>

          <button
            onClick={() => setShowAddCustom(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Thêm chữ</span>
          </button>

          {/* Record Mode Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setRecordMode('video')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
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
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
                recordMode === 'audio'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Mic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Target Sentence & Model Voice */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            {/* Sentence Header / Index */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Câu {currentSentenceIdx + 1} / {activeLesson?.sentences.length || 1}
                </span>
                <span className="text-xs text-slate-400">{activeLesson?.category}</span>
                {typeof currentSentence?.startTime === 'number' && (
                  <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    ⏱ {currentSentence.startTime.toFixed(1)}s
                    {currentSentence.endTime ? ` - ${currentSentence.endTime.toFixed(1)}s` : ''}
                  </span>
                )}
              </div>

              {/* Prev / Next Sentence Navigation */}
              <div className="flex items-center gap-1">
                <button
                  disabled={currentSentenceIdx <= 0}
                  onClick={() => setCurrentSentenceIdx((p) => Math.max(0, p - 1))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors"
                  title="Câu trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentSentenceIdx >= (activeLesson?.sentences.length || 1) - 1}
                  onClick={() =>
                    setCurrentSentenceIdx((p) =>
                      Math.min((activeLesson?.sentences.length || 1) - 1, p + 1)
                    )
                  }
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors"
                  title="Câu kế tiếp"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
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
            <div className="my-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-relaxed tracking-normal font-sans">
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
                            : 'Nghe người bản xứ'}
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
                    <span>Lặp lại: {autoLoop ? 'Bật' : 'Tắt'}</span>
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

        {/* Right Column: Webcam Preview, Live Mic Meter & Shadowing Action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-full min-h-[420px]">
            {/* Webcam / Audio Visualizer Box */}
            <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
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
                  <p className="text-sm font-semibold text-slate-200 mt-4">
                    {isRecording ? 'Đang thu âm microphone...' : 'Chế độ chỉ ghi âm Microphone'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Âm thanh sẽ được lưu vào máy tính để bạn nghe lại bất cứ lúc nào
                  </p>
                </div>
              )}

              {/* Live Recording Badge & Timer */}
              {isRecording && (
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-rose-400">
                    REC {Math.floor(recordingSeconds / 60)}:
                    {(recordingSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Audio Level Waveform Indicator */}
              {isRecording && (
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>Âm lượng mic</span>
                    <span>{audioLevel}%</span>
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
                  Dịch nghĩa tiếng Việt (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Nghĩa tóm tắt của đoạn văn..."
                  value={customTranslation}
                  onChange={(e) => setCustomTranslation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddCustom(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateCustomLesson}
                disabled={!customTitle.trim() || !customText.trim()}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md transition-colors"
              >
                Lưu & Luyện tập ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
