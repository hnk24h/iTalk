import {
  GrammarPattern,
  GrammarQuizRecord,
  Language,
  ScoreResult,
} from '../types'

export const GRAMMAR_SPEAKING_PASS_SCORE = 70
export const GRAMMAR_QUIZ_PASS_PERCENT = 75

const GRAMMAR_QUIZ_STORAGE_KEY = 'italk_grammar_quiz_v1'

export interface GrammarPatternPassStatus {
  isPassed: boolean
  isSpeakingPassed: boolean
  isQuizPassed: boolean
  passedExamplesCount: number
  totalExamplesCount: number
  quizBestPercent?: number
  passMethod: 'both' | 'speaking' | 'quiz' | null
}

export type GrammarQuizQuestionType =
  | 'meaning'
  | 'example-match'
  | 'cloze'
  | 'formula'
  | 'reorder'
  | 'translation-match'

export interface GrammarQuizQuestion {
  id: string
  type: GrammarQuizQuestionType
  badge: string
  prompt: string
  subPrompt?: string
  sentenceDisplay?: string
  options?: string[]
  correctOption?: string
  reorderChunks?: string[]
  correctSentence?: string
  joinWithSpace?: boolean
  explanation: string
}

export function loadGrammarQuizResults(): Record<string, GrammarQuizRecord> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(GRAMMAR_QUIZ_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveGrammarQuizResult(
  record: GrammarQuizRecord
): Record<string, GrammarQuizRecord> {
  const all = loadGrammarQuizResults()
  const prev = all[record.patternId]
  const merged: GrammarQuizRecord = {
    patternId: record.patternId,
    passed: Boolean(prev?.passed || record.passed),
    bestPercent: Math.max(prev?.bestPercent || 0, record.bestPercent),
    correctCount: record.correctCount,
    totalCount: record.totalCount,
    updatedAt: record.updatedAt,
  }
  const next = {
    ...all,
    [record.patternId]: merged,
  }
  try {
    localStorage.setItem(GRAMMAR_QUIZ_STORAGE_KEY, JSON.stringify(next))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('italk:grammar-progress-updated'))
    }
  } catch {}
  return next
}

export function getGrammarPatternPassStatus(
  pattern: GrammarPattern,
  scoresMap: Record<string, ScoreResult>,
  quizMap: Record<string, GrammarQuizRecord>
): GrammarPatternPassStatus {
  const totalExamplesCount = pattern.examples.length
  let passedExamplesCount = 0
  for (let i = 0; i < totalExamplesCount; i++) {
    const sc = scoresMap[`ex-${pattern.id}-${i}`]
    if (sc && sc.overallScore >= GRAMMAR_SPEAKING_PASS_SCORE) {
      passedExamplesCount += 1
    }
  }

  const isSpeakingPassed =
    totalExamplesCount > 0 && passedExamplesCount >= totalExamplesCount
  const quizRec = quizMap[pattern.id]
  const isQuizPassed = Boolean(quizRec?.passed)
  const isPassed = isSpeakingPassed || isQuizPassed

  const passMethod: GrammarPatternPassStatus['passMethod'] =
    isSpeakingPassed && isQuizPassed
      ? 'both'
      : isSpeakingPassed
      ? 'speaking'
      : isQuizPassed
      ? 'quiz'
      : null

  return {
    isPassed,
    isSpeakingPassed,
    isQuizPassed,
    passedExamplesCount,
    totalExamplesCount,
    quizBestPercent: quizRec?.bestPercent,
    passMethod,
  }
}

export function stripBracketFurigana(text: string): string {
  return text.replace(/\[[^\]]+\]/g, '').trim()
}

export function cleanPatternHead(pattern: string): string {
  const stripped = pattern
    .replace(/\s*(\([^)]*\)|（[^）]*）)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return stripped || pattern.trim()
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickDistractors(
  pattern: GrammarPattern,
  allLangPatterns: GrammarPattern[],
  extractor: (p: GrammarPattern) => string | undefined,
  correctValue: string,
  count: number = 3
): string[] {
  const normalizedCorrect = correctValue.trim().toLowerCase()
  const seen = new Set<string>([normalizedCorrect])
  const results: string[] = []

  const sameLevel = shuffleArray(
    allLangPatterns.filter((p) => p.id !== pattern.id && p.level === pattern.level)
  )
  const otherLevels = shuffleArray(
    allLangPatterns.filter((p) => p.id !== pattern.id && p.level !== pattern.level)
  )

  for (const candidate of [...sameLevel, ...otherLevels]) {
    const val = extractor(candidate)?.trim()
    if (!val) continue
    const norm = val.toLowerCase()
    if (seen.has(norm)) continue
    seen.add(norm)
    results.push(val)
    if (results.length >= count) break
  }

  return results
}

function extractCorePatternToken(p: GrammarPattern): string {
  const head = cleanPatternHead(p.pattern)
    .replace(/[〜～]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return head.replace(/…+/g, '...').replace(/\.{3,}/g, ' ... ').replace(/\s+/g, ' ').trim()
}

function tryBuildClozeQuestion(
  pattern: GrammarPattern,
  exampleIdx: number,
  allLangPatterns: GrammarPattern[],
  head: string
): GrammarQuizQuestion | null {
  const ex = pattern.examples[exampleIdx]
  if (!ex) return null
  const cleanSentence = stripBracketFurigana(ex.text)
  const rawToken = extractCorePatternToken(pattern)
  if (!rawToken) return null

  const normalized = rawToken.replace(/\s*\.\.\.\s*/g, '...')
  const isVi = pattern.language === 'vi'

  // Case 1: Paired pattern such as "Nếu... thì..." or "是……的" or "太……了"
  if (normalized.includes('...')) {
    const parts = normalized
      .split('...')
      .map((s) => s.trim())
      .filter(Boolean)
    if (parts.length === 2) {
      const lowerSentence = cleanSentence.toLowerCase()
      const idx1 = lowerSentence.indexOf(parts[0].toLowerCase())
      if (idx1 >= 0) {
        const searchFrom = idx1 + parts[0].length
        const idx2 = lowerSentence.indexOf(parts[1].toLowerCase(), searchFrom)
        if (idx2 > idx1) {
          const matched1 = cleanSentence.slice(idx1, idx1 + parts[0].length)
          const matched2 = cleanSentence.slice(idx2, idx2 + parts[1].length)
          const blanked =
            cleanSentence.slice(0, idx1) +
            '＿＿＿' +
            cleanSentence.slice(idx1 + matched1.length, idx2) +
            '＿＿＿' +
            cleanSentence.slice(idx2 + matched2.length)
          const correctOption = `${matched1} ... ${matched2}`

          const distractors = pickDistractors(
            pattern,
            allLangPatterns,
            (cand) => {
              const t = extractCorePatternToken(cand)
              return t && t.length <= 28 ? t : undefined
            },
            correctOption,
            3
          )

          if (distractors.length >= 2) {
            return {
              id: `${pattern.id}-q3-cloze`,
              type: 'cloze',
              badge: 'Điền cấu trúc',
              prompt: 'Chọn cặp từ / cấu trúc thích hợp điền vào chỗ trống:',
              subPrompt: ex.translation,
              sentenceDisplay: blanked,
              options: shuffleArray([correctOption, ...distractors]),
              correctOption,
              explanation: `Câu hoàn chỉnh: "${cleanSentence}" (${head}: ${pattern.meaning}).`,
            }
          }
        }
      }
    }
  }

  // Case 2: Single token or slash alternative (e.g., "は", "から", "ている")
  const candidates = normalized
    .split('/')
    .map((s) => s.replace(/\.\.\./g, '').trim())
    .filter((s) => (isVi ? s.length >= 2 : s.length >= 1))

  for (const tok of candidates) {
    const lowerSentence = cleanSentence.toLowerCase()
    const idx = lowerSentence.indexOf(tok.toLowerCase())
    if (idx < 0) continue

    const matched = cleanSentence.slice(idx, idx + tok.length)
    const blanked =
      cleanSentence.slice(0, idx) + '＿＿＿' + cleanSentence.slice(idx + matched.length)

    const distractors = pickDistractors(
      pattern,
      allLangPatterns,
      (cand) => {
        const t = extractCorePatternToken(cand)
          .split('/')[0]
          .replace(/\.\.\./g, '')
          .trim()
        if (!t || t.length > 18) return undefined
        return t
      },
      matched,
      3
    )

    if (distractors.length >= 2) {
      return {
        id: `${pattern.id}-q3-cloze`,
        type: 'cloze',
        badge: 'Điền vào chỗ trống',
        prompt: 'Chọn phần ngữ pháp đúng để hoàn thành câu sau:',
        subPrompt: ex.translation,
        sentenceDisplay: blanked,
        options: shuffleArray([matched, ...distractors]),
        correctOption: matched,
        explanation: `Câu đúng: "${cleanSentence}" — dùng mẫu "${head}".`,
      }
    }
  }

  return null
}

function splitEvenly(text: string, targetParts: number): string[] {
  const chars = Array.from(text)
  const parts: string[] = []
  const count = Math.min(targetParts, chars.length)
  for (let i = 0; i < count; i++) {
    const start = Math.floor((i * chars.length) / count)
    const end = Math.floor(((i + 1) * chars.length) / count)
    const slice = chars.slice(start, end).join('')
    if (slice) parts.push(slice)
  }
  return parts
}

function buildSentenceChunks(
  cleanText: string,
  lang: Language
): { chunks: string[]; correctSentence: string; joinWithSpace: boolean } {
  if (lang === 'vi') {
    const normalized = cleanText.replace(/\s+/g, ' ').trim()
    const words = normalized.split(' ').filter(Boolean)
    if (words.length <= 5) {
      return { chunks: words, correctSentence: normalized, joinWithSpace: true }
    }
    const targetGroups = words.length >= 8 ? 4 : 3
    const chunks: string[] = []
    for (let i = 0; i < targetGroups; i++) {
      const start = Math.floor((i * words.length) / targetGroups)
      const end = Math.floor(((i + 1) * words.length) / targetGroups)
      const seg = words.slice(start, end).join(' ')
      if (seg) chunks.push(seg)
    }
    return { chunks, correctSentence: normalized, joinWithSpace: true }
  }

  const normalized = cleanText.replace(/\s+/g, '').trim()

  if (lang === 'ja') {
    const rawParts = normalized
      .split(/(?<=[、はがをにでとものへ]|から|まで)(?=[^。！？、])/)
      .filter(Boolean)

    // Merge 1-char trailing punctuation into previous chunk
    const merged: string[] = []
    for (const part of rawParts) {
      if (
        merged.length > 0 &&
        (/^([。！？、]+)$/.test(part) || Array.from(part).length === 1)
      ) {
        merged[merged.length - 1] += part
      } else {
        merged.push(part)
      }
    }

    if (merged.length >= 3 && merged.length <= 5) {
      return { chunks: merged, correctSentence: normalized, joinWithSpace: false }
    }
  }

  if (lang === 'zh') {
    const clauseParts = normalized.split(/(?<=[，、])/).filter(Boolean)
    const chunks: string[] = []
    for (const clause of clauseParts) {
      const len = Array.from(clause).length
      if (len > 4) {
        chunks.push(...splitEvenly(clause, len >= 8 ? 3 : 2))
      } else {
        chunks.push(clause)
      }
    }
    if (chunks.length >= 3 && chunks.length <= 5) {
      return { chunks, correctSentence: normalized, joinWithSpace: false }
    }
  }

  const fallbackChunks = splitEvenly(normalized, 4)
  return {
    chunks: fallbackChunks,
    correctSentence: normalized,
    joinWithSpace: false,
  }
}

export function generateGrammarQuiz(
  pattern: GrammarPattern,
  allLangPatterns: GrammarPattern[]
): GrammarQuizQuestion[] {
  const head = cleanPatternHead(pattern.pattern)
  const questions: GrammarQuizQuestion[] = []

  // Q1: Meaning MCQ
  const meaningDistractors = pickDistractors(
    pattern,
    allLangPatterns,
    (p) => p.meaning,
    pattern.meaning,
    3
  )
  questions.push({
    id: `${pattern.id}-q1-meaning`,
    type: 'meaning',
    badge: 'Ý nghĩa & Cách dùng',
    prompt: `Mẫu ngữ pháp "${head}" dùng để diễn tả ý nghĩa nào?`,
    subPrompt: pattern.formula ? `Công thức: ${pattern.formula}` : undefined,
    options: shuffleArray([pattern.meaning, ...meaningDistractors]),
    correctOption: pattern.meaning,
    explanation: `"${head}" nghĩa là: ${pattern.meaning}.`,
  })

  // Prepare example indices cleanly without repeating when >= 3 examples exist
  const exCount = pattern.examples.length
  const exIndices = shuffleArray(Array.from({ length: exCount }, (_, i) => i))
  const idxA = exIndices[0] ?? 0
  const idxB = exIndices[1] ?? idxA
  const idxC = exIndices[2] ?? idxB

  // Q2: Example-match MCQ
  const exA = pattern.examples[idxA]
  if (exA) {
    const correctExText = stripBracketFurigana(exA.text)
    const exDistractors = pickDistractors(
      pattern,
      allLangPatterns,
      (p) => {
        if (!p.examples.length) return undefined
        const randEx = pickRandomItem(p.examples)
        return stripBracketFurigana(randEx.text)
      },
      correctExText,
      3
    )
    questions.push({
      id: `${pattern.id}-q2-example`,
      type: 'example-match',
      badge: 'Nhận diện câu đúng',
      prompt: 'Câu nào sau đây khớp với nghĩa tiếng Việt dưới đây?',
      subPrompt: `"${exA.translation}"`,
      options: shuffleArray([correctExText, ...exDistractors]),
      correctOption: correctExText,
      explanation: `Đáp án đúng là "${correctExText}" (${exA.translation}).`,
    })
  }

  // Q3: Cloze (with fallback to Formula MCQ)
  const clozeQuestion = tryBuildClozeQuestion(pattern, idxB, allLangPatterns, head)
  if (clozeQuestion) {
    questions.push(clozeQuestion)
  } else {
    const formulaDistractors = pickDistractors(
      pattern,
      allLangPatterns,
      (p) => p.formula,
      pattern.formula,
      3
    )
    questions.push({
      id: `${pattern.id}-q3-formula`,
      type: 'formula',
      badge: 'Công thức kết hợp',
      prompt: `Công thức kết hợp chuẩn của mẫu "${head}" là gì?`,
      options: shuffleArray([pattern.formula, ...formulaDistractors]),
      correctOption: pattern.formula,
      explanation: `Công thức chuẩn: ${pattern.formula}.`,
    })
  }

  // Q4: Sentence Reorder (with fallback to Translation-match MCQ)
  const exC = pattern.examples[idxC]
  if (exC) {
    const cleanExC = stripBracketFurigana(exC.text)
    const { chunks, correctSentence, joinWithSpace } = buildSentenceChunks(
      cleanExC,
      pattern.language
    )
    if (chunks.length >= 3) {
      const shuffled = shuffleArray(chunks)
      const isSameOrder = shuffled.every((item, i) => item === chunks[i])
      if (isSameOrder && shuffled.length >= 2) {
        ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
      }
      questions.push({
        id: `${pattern.id}-q4-reorder`,
        type: 'reorder',
        badge: 'Ghép câu hoàn chỉnh',
        prompt: 'Chạm vào các mảnh ghép theo đúng thứ tự để tạo thành câu hoàn chỉnh:',
        subPrompt: exC.translation,
        reorderChunks: shuffled,
        correctSentence,
        joinWithSpace,
        explanation: `Câu hoàn chỉnh: "${correctSentence}" — ${exC.translation}`,
      })
    } else {
      const transDistractors = pickDistractors(
        pattern,
        allLangPatterns,
        (p) => (p.examples.length ? pickRandomItem(p.examples).translation : undefined),
        exC.translation,
        3
      )
      questions.push({
        id: `${pattern.id}-q4-trans`,
        type: 'translation-match',
        badge: 'Hiểu nghĩa ví dụ',
        prompt: 'Câu ví dụ sau đây có nghĩa tiếng Việt là gì?',
        sentenceDisplay: cleanExC,
        options: shuffleArray([exC.translation, ...transDistractors]),
        correctOption: exC.translation,
        explanation: `"${cleanExC}" có nghĩa là "${exC.translation}".`,
      })
    }
  }

  return questions
}
