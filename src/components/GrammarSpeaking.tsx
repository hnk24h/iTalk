import React, { useState } from 'react'
import { Language } from '../types'
import { supportedLanguages } from '../data/languages'
import { playTextToSpeech, stopTextToSpeech, SpeechRecognizer } from '../services/speech'
import { evaluatePronunciation } from '../services/scoring'
import {
  Volume2,
  Mic,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react'

interface GrammarPattern {
  id: string
  pattern: string
  meaning: string
  formula: string
  prompt: string // Tình huống cần nói
  example: string
  pinyinOrRomaji?: string
  translation: string
}

const grammarPatternsByLang: Record<Language, GrammarPattern[]> = {
  ja: [
    {
      id: 'ja-g1',
      pattern: '〜てから (Sau khi làm V1 thì làm V2)',
      meaning: 'Diễn tả trình tự thời gian, hành động V2 chỉ xảy ra sau khi đã hoàn thành V1.',
      formula: 'Động từ thể て + から',
      prompt: 'Hãy nói: "Sau khi ăn cơm xong, tôi sẽ uống thuốc."',
      example: 'ご飯を食べてから、薬を飲みます。',
      pinyinOrRomaji: 'Gohan wo tabete kara, kusuri wo nomimasu.',
      translation: 'Sau khi ăn cơm xong, tôi sẽ uống thuốc.',
    },
    {
      id: 'ja-g2',
      pattern: '〜なければなりません (Bắt buộc phải làm gì)',
      meaning: 'Diễn tả nghĩa vụ hoặc điều bắt buộc phải thực hiện trong đời sống/công việc.',
      formula: 'Động từ thể ない bỏ い + ければなりません',
      prompt: 'Hãy nói: "Ngày mai tôi phải dậy sớm lúc 6 giờ."',
      example: '明日は朝六時に起きなければなりません。',
      pinyinOrRomaji: 'Ashita wa asa rokuji ni okinakereba narimasen.',
      translation: 'Ngày mai tôi phải thức dậy lúc 6 giờ sáng.',
    },
    {
      id: 'ja-g3',
      pattern: '〜たことがあります (Đã từng có trải nghiệm làm gì)',
      meaning: 'Kể về trải nghiệm trong quá khứ đã từng trải qua.',
      formula: 'Động từ thể た + ことがあります',
      prompt: 'Hãy nói: "Tôi đã từng đi leo núi Phú Sĩ."',
      example: '富士山に登ったことがあります。',
      pinyinOrRomaji: 'Fujisan ni nobotta koto ga arimasu.',
      translation: 'Tôi đã từng leo núi Phú Sĩ.',
    },
  ],
  zh: [
    {
      id: 'zh-g1',
      pattern: '虽然...但是... (Tuy... nhưng...)',
      meaning: 'Cặp liên từ biểu thị quan hệ nhượng bộ, tương phản trong câu.',
      formula: 'Suīrán [vế 1] dànshì [vế 2]',
      prompt: 'Hãy nói: "Tuy tiếng Trung rất khó, nhưng tôi rất thích học."',
      example: '虽然汉语很难，但是我很喜欢学。',
      pinyinOrRomaji: 'Suīrán Hànyǔ hěn nán, dànshì wǒ hěn xǐhuan xué.',
      translation: 'Tuy tiếng Trung rất khó, nhưng tôi rất thích học.',
    },
    {
      id: 'zh-g2',
      pattern: '越来越... (Càng ngày càng...)',
      meaning: 'Biểu thị sự biến chuyển mức độ theo thời gian tăng dần.',
      formula: 'Yuè lái yuè + Tính từ / Động từ tâm lý',
      prompt: 'Hãy nói: "Thời tiết dạo này càng ngày càng lạnh."',
      example: '最近天气越来越冷了。',
      pinyinOrRomaji: 'Zuìjìn tiānqì yuè lái yuè lěng le.',
      translation: 'Dạo này thời tiết càng ngày càng lạnh rồi.',
    },
    {
      id: 'zh-g3',
      pattern: '把字句 (Câu chữ BẢ - xử lý tân ngữ)',
      meaning: 'Nhấn mạnh sự tác động làm thay đổi trạng thái, vị trí của sự vật.',
      formula: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác',
      prompt: 'Hãy nói: "Làm ơn hãy đóng cửa sổ lại giùm tôi."',
      example: '请把窗户关上。',
      pinyinOrRomaji: 'Qǐng bǎ chuānghu guānshàng.',
      translation: 'Làm ơn hãy đóng cửa sổ lại.',
    },
  ],
  vi: [
    {
      id: 'vi-g1',
      pattern: 'Cấu trúc giả định: "Nếu... thì..."',
      meaning: 'Diễn tả điều kiện và hệ quả tự nhiên hoặc giả định.',
      formula: 'Nếu + [Mệnh đề điều kiện], thì + [Mệnh đề kết quả]',
      prompt: 'Hãy nói: "Nếu kiên trì luyện nói mỗi ngày, bạn sẽ tiến bộ vượt bậc."',
      example: 'Nếu kiên trì luyện nói mỗi ngày, bạn sẽ tiến bộ vượt bậc.',
      pinyinOrRomaji: 'Nhấn giọng ở vế kết quả để tạo niềm tin mạnh mẽ.',
      translation: 'If you persist in speaking daily, you will make outstanding progress.',
    },
    {
      id: 'vi-g2',
      pattern: 'Cấu trúc nguyên nhân: "Không những... mà còn..."',
      meaning: 'Diễn đạt tính chất bổ sung, tăng tiến của hành động hoặc sự việc.',
      formula: 'Không những [Tính chất 1] mà còn [Tính chất 2]',
      prompt: 'Hãy nói: "Học ngoại ngữ không những mở rộng tư duy mà còn mang lại nhiều cơ hội."',
      example: 'Học ngoại ngữ không những mở rộng tư duy mà còn mang lại nhiều cơ hội việc làm.',
      pinyinOrRomaji: 'Phát âm tròn vành rõ chữ, ngắt nhẹ sau vế thứ nhất.',
      translation: 'Learning languages not only broadens mind but also brings career opportunities.',
    },
  ],
}

export const GrammarSpeaking: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const langMeta = supportedLanguages.find((l) => l.code === currentLang) || supportedLanguages[0]
  const patterns = grammarPatternsByLang[currentLang] || []

  const [activeIdx, setActiveIdx] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [spokenTranscript, setSpokenTranscript] = useState('')
  const [scoreResult, setScoreResult] = useState<any>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const activePattern = patterns[activeIdx] || patterns[0]

  const handlePlayExample = () => {
    if (!activePattern) return
    playTextToSpeech({
      text: activePattern.example,
      lang: langMeta.speechCode,
      rate: 0.95,
    })
  }

  const handleStartSpeaking = () => {
    setSpokenTranscript('')
    setScoreResult(null)
    const recognizer = new SpeechRecognizer()

    if (!recognizer.isSupported()) {
      alert('Trình duyệt không hỗ trợ Web Speech API nhận diện giọng nói')
      return
    }

    setIsRecording(true)
    recognizer.start({
      lang: langMeta.speechCode,
      onResult: (transcript, isFinal) => {
        setSpokenTranscript(transcript)
        if (isFinal) {
          setIsRecording(false)
          const result = evaluatePronunciation({
            targetText: activePattern.example,
            spokenText: transcript,
            lang: currentLang,
          })
          setScoreResult(result)
        }
      },
      onError: (e) => {
        console.warn('Speech error:', e)
        setIsRecording(false)
      },
      onEnd: () => {
        setIsRecording(false)
      },
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-slate-900 border border-emerald-500/20 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Luyện Phản Xạ Ngữ Pháp ({langMeta.name})</h2>
            <p className="text-xs text-slate-400">
              Nắm vững mẫu câu qua tình huống thực tế và luyện nói thành phản xạ tự nhiên.
            </p>
          </div>
        </div>

        {/* Pattern Navigator Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {patterns.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveIdx(idx)
                setShowAnswer(false)
                setScoreResult(null)
                setSpokenTranscript('')
                stopTextToSpeech()
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeIdx === idx
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Mẫu {idx + 1}: {p.pattern.slice(0, 25)}...
            </button>
          ))}
        </div>
      </div>

      {/* Main Pattern Practice Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Pattern Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Mẫu ngữ pháp trọng điểm
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-2">{activePattern.pattern}</h3>
          <p className="text-sm text-slate-300 mt-1">{activePattern.meaning}</p>
        </div>

        {/* Formula Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Công thức ứng dụng:</span>
          </div>
          <div className="text-sm font-mono text-emerald-300">{activePattern.formula}</div>
        </div>

        {/* Situation Prompt */}
        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <span className="text-xs font-semibold text-emerald-400 block mb-1">
            Tình huống phản xạ của bạn:
          </span>
          <h4 className="text-lg font-bold text-slate-100">{activePattern.prompt}</h4>
        </div>

        {/* Action: Speak Your Response */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            onClick={handleStartSpeaking}
            disabled={isRecording}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>{isRecording ? 'Đang lắng nghe câu nói của bạn...' : 'Bấm vào đây để nói câu trả lời'}</span>
          </button>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 underline decoration-slate-700 underline-offset-4"
          >
            {showAnswer ? 'Ẩn câu mẫu tham khảo' : 'Xem câu mẫu tham khảo'}
          </button>
        </div>

        {/* Spoken Result & Pronunciation Score */}
        {spokenTranscript && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-semibold">Bạn vừa nói:</div>
            <div className="text-base text-emerald-300 font-medium">{spokenTranscript}</div>
            {scoreResult && (
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">
                  Điểm phát âm: <span className="text-emerald-400">{scoreResult.overallScore}/100</span>
                </span>
                <span className="text-xs text-slate-400">• {scoreResult.feedback}</span>
              </div>
            )}
          </div>
        )}

        {/* Reference Answer Section */}
        {showAnswer && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Câu mẫu tham khảo chuẩn bản xứ
              </span>
              <button
                onClick={handlePlayExample}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe phát âm</span>
              </button>
            </div>

            <div className="text-xl font-bold text-white">{activePattern.example}</div>
            {activePattern.pinyinOrRomaji && (
              <div className="text-xs font-mono text-emerald-400/90">{activePattern.pinyinOrRomaji}</div>
            )}
            <div className="text-xs text-slate-300 italic">{activePattern.translation}</div>
          </div>
        )}
      </div>
    </div>
  )
}
