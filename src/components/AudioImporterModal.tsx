import React, { useState, useRef } from 'react'
import { Language, Lesson, LessonSentence } from '../types'
import { supportedLanguages } from '../data/languages'
import { parseTranscript } from '../services/transcriptParser'
import { storeAudioBlob } from '../services/audioDb'
import { saveCustomLesson } from '../services/storage'
import {
  UploadCloud,
  FileAudio,
  FileText,
  Play,
  Pause,
  X,
  CheckCircle,
  Plus,
  Trash2,
  FolderOpen,
  Laptop,
  HelpCircle,
  Layers,
  Sparkles,
} from 'lucide-react'

interface AudioImporterModalProps {
  isOpen: boolean
  onClose: () => void
  currentLang: Language
  onLessonCreated: (lesson: Lesson) => void
}

export const AudioImporterModal: React.FC<AudioImporterModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLessonCreated,
}) => {
  if (!isOpen) return null

  const isElectron = Boolean(window.electronAPI?.isElectron)

  // Lesson metadata
  const [selectedLang, setSelectedLang] = useState<Language>(currentLang)
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('N3 / HSK4 / Tự học')
  const [category, setCategory] = useState('File nghe gốc')

  // Audio state
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [audioFileName, setAudioFileName] = useState<string>('')
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  // Transcript state
  const [rawText, setRawText] = useState('')
  const [sentences, setSentences] = useState<LessonSentence[]>([])
  const [activeTab, setActiveTab] = useState<'upload' | 'sentences'>('upload')

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const textFileInputRef = useRef<HTMLInputElement | null>(null)

  // Handle Audio File Selection (Web input or Electron native dialog)
  const handleSelectAudioWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processAudioFile(file, file.name)
    }
  }

  const handleSelectAudioElectron = async () => {
    if (window.electronAPI?.selectAudioFile) {
      const res = await window.electronAPI.selectAudioFile()
      if (res) {
        setAudioUrl(res.dataUrl)
        setAudioFileName(res.fileName)
        if (!title) {
          setTitle(res.fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '))
        }
      }
    }
  }

  const processAudioFile = (blob: Blob, fileName: string) => {
    setAudioBlob(blob)
    setAudioFileName(fileName)
    const url = URL.createObjectURL(blob)
    setAudioUrl(url)
    if (!title) {
      setTitle(fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '))
    }
  }

  // Handle Transcript File Selection
  const handleSelectTranscriptWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        if (content) {
          setRawText(content)
          const parsed = parseTranscript(content, file.name)
          setSentences(parsed)
          if (parsed.length > 0) setActiveTab('sentences')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSelectTranscriptElectron = async () => {
    if (window.electronAPI?.selectTextFile) {
      const res = await window.electronAPI.selectTextFile()
      if (res) {
        setRawText(res.content)
        const parsed = parseTranscript(res.content, res.fileName)
        setSentences(parsed)
        if (parsed.length > 0) setActiveTab('sentences')
      }
    }
  }

  const handleParseText = () => {
    if (!rawText.trim()) return
    const parsed = parseTranscript(rawText)
    setSentences(parsed)
    if (parsed.length > 0) setActiveTab('sentences')
  }

  // Audio Playback
  const togglePlayAudio = () => {
    if (!audioRef.current) return
    if (isPlayingAudio) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    } else {
      audioRef.current.play()
      setIsPlayingAudio(true)
    }
  }

  // Edit individual sentence
  const handleUpdateSentence = (index: number, patch: Partial<LessonSentence>) => {
    setSentences((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], ...patch }
      return next
    })
  }

  const handleDeleteSentence = (index: number) => {
    setSentences((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddEmptySentence = () => {
    setSentences((prev) => [
      ...prev,
      {
        id: `custom-s-${Date.now()}`,
        text: '',
        translation: '',
      },
    ])
  }

  // Save Lesson
  const handleSaveLesson = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề bài học')
      return
    }

    if (sentences.length === 0) {
      alert('Vui lòng nhập ít nhất 1 câu bài đọc')
      return
    }

    const lessonId = `native-audio-${Date.now()}`
    let blobId: string | undefined

    if (audioBlob) {
      try {
        blobId = await storeAudioBlob(lessonId, audioBlob, audioFileName)
      } catch (err) {
        console.warn('Could not store in IndexedDB:', err)
      }
    }

    const isVideo = audioFileName ? /\.(mp4|webm|mkv|mov|avi)$/i.test(audioFileName) : false

    const newLesson: Lesson = {
      id: lessonId,
      language: selectedLang,
      title: title.trim(),
      level: level.trim() || 'Nâng cao',
      category: category.trim() || (isVideo ? 'Video gốc' : 'File nghe gốc'),
      description: `Nạp từ file gốc: ${audioFileName || (isVideo ? 'Video tự chọn' : 'Audio tự chọn')}`,
      sentences: sentences.filter((s) => s.text.trim().length > 0),
      audioSourceType: audioUrl ? (isVideo ? 'video-file' : 'audio-file') : 'tts',
      mediaType: isVideo ? 'video' : 'audio',
      originalAudioUrl: audioUrl,
      videoUrl: isVideo ? audioUrl : undefined,
      originalAudioFileName: audioFileName,
      audioBlobId: blobId,
      audioDuration,
    }

    saveCustomLesson(newLesson)
    onLessonCreated(newLesson)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <FileAudio className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">Nạp Nguồn Data & File Nghe Gốc</h3>
                {isElectron && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Laptop className="w-3 h-3" /> Desktop Native
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Nạp file audio bản xứ (MP3, WAV, M4A) kèm phụ đề (LRC, SRT, Text) để luyện Shadowing chuẩn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps / Tabs */}
        <div className="flex items-center gap-2 my-5 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'upload'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>1. Nạp File Nghe & Nội Dung</span>
          </button>
          <button
            onClick={() => setActiveTab('sentences')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'sentences'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Danh Sách Câu Đọc ({sentences.length})</span>
          </button>
        </div>

        {/* Tab 1: Upload Audio and Transcript */}
        {activeTab === 'upload' && (
          <div className="space-y-5">
            {/* Meta info: Language, Title, Level */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Ngôn ngữ</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value as Language)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {supportedLanguages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tiêu đề bài học
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: JLPT N2 Chōkai 01 / Podcast Nhịp sống Tokyo / HSK4 Keting"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Audio Upload Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileAudio className="w-4 h-4 text-indigo-400" />
                  File video / âm thanh gốc (MP4, WebM, MP3, WAV, M4A)
                </span>
                {audioFileName && (
                  <span className="text-xs font-mono text-emerald-400 font-semibold truncate max-w-xs">
                    ✓ {audioFileName}
                  </span>
                )}
              </div>

              {!audioUrl ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/40">
                  {isElectron ? (
                    <button
                      onClick={handleSelectAudioElectron}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span>Chọn file video / audio từ máy tính</span>
                    </button>
                  ) : (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*,video/*"
                        className="hidden"
                        onChange={handleSelectAudioWeb}
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Tải file video / audio từ máy tính</span>
                      </button>
                    </>
                  )}
                  <span className="text-xs text-slate-500">hoặc kéo thả file âm thanh vào đây</span>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayAudio}
                      className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center shadow-md transition-colors"
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-bold text-slate-100 truncate max-w-sm">
                        {audioFileName || 'File nghe gốc'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {audioDuration > 0 ? `${Math.round(audioDuration)} giây` : 'Sẵn sàng phát'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setAudioUrl('')
                      setAudioBlob(null)
                      setAudioFileName('')
                    }}
                    className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded-lg"
                  >
                    Đổi file khác
                  </button>
                </div>
              )}

              {/* Hidden HTML audio element for testing */}
              {audioUrl && (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                  onEnded={() => setIsPlayingAudio(false)}
                />
              )}
            </div>

            {/* Transcript / Subtitle Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Bài đọc hoặc File phụ đề (.LRC, .SRT, .TXT)
                </span>
                <div className="flex items-center gap-2">
                  {isElectron ? (
                    <button
                      onClick={handleSelectTranscriptElectron}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Chọn file từ máy</span>
                    </button>
                  ) : (
                    <>
                      <input
                        ref={textFileInputRef}
                        type="file"
                        accept=".lrc,.srt,.txt,.json"
                        className="hidden"
                        onChange={handleSelectTranscriptWeb}
                      />
                      <button
                        onClick={() => textFileInputRef.current?.click()}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Nạp file phụ đề</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <textarea
                rows={5}
                placeholder={`Dán nội dung bài đọc vào đây. Hỗ trợ:
• File lời có mốc thời gian [00:12.30] Câu đọc... (LRC format)
• File phụ đề SRT 00:00:12,300 --> 00:00:15,000
• Hoặc mỗi dòng là một câu đọc`}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hệ thống tự động tách câu và mốc thời gian</span>
                </div>
                <button
                  onClick={handleParseText}
                  disabled={!rawText.trim()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Bóc tách câu & Tiếp tục &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sentence List Preview & Edit */}
        {activeTab === 'sentences' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Đã nhận diện <strong className="text-indigo-400">{sentences.length} câu</strong>.
                Bạn có thể sửa trực tiếp hoặc bổ sung mốc thời gian (startTime/endTime).
              </span>
              <button
                onClick={handleAddEmptySentence}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Thêm câu mới</span>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {sentences.map((st, idx) => (
                <div
                  key={st.id || idx}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400">Câu {idx + 1}</span>
                    <div className="flex items-center gap-2">
                      {typeof st.startTime === 'number' && (
                        <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded-md text-amber-300 border border-slate-800">
                          {st.startTime.toFixed(1)}s &rarr; {st.endTime ? st.endTime.toFixed(1) : ''}s
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteSentence(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Xóa câu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Sentence Original Text */}
                  <input
                    type="text"
                    value={st.text}
                    onChange={(e) => handleUpdateSentence(idx, { text: e.target.value })}
                    placeholder="Nội dung câu nói gốc..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                  />

                  {/* Phonetic & Translation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={st.phonetic || ''}
                      onChange={(e) => handleUpdateSentence(idx, { phonetic: e.target.value })}
                      placeholder="Phiên âm (Romaji / Pinyin)..."
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={st.translation || ''}
                      onChange={(e) => handleUpdateSentence(idx, { translation: e.target.value })}
                      placeholder="Dịch nghĩa tiếng Việt..."
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (activeTab === 'sentences') setActiveTab('upload')
              else onClose()
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            {activeTab === 'sentences' ? 'Quay lại bước 1' : 'Hủy bỏ'}
          </button>

          <button
            onClick={handleSaveLesson}
            disabled={!title.trim() || sentences.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 disabled:opacity-40 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>LƯU & BẮT ĐẦU SHADOWING NGAY</span>
          </button>
        </div>
      </div>
    </div>
  )
}
