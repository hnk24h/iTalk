import { ScoreResult, WordTokenComparison, Language } from '../types'

/**
 * Clean and normalize text for comparison
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'，。！？、“”‘’（）]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Tokenize string based on language
 * Japanese & Chinese: tokenize by characters or small chunks
 * Vietnamese/English: tokenize by words (split by space)
 */
export function tokenizeSentence(text: string, lang: Language): string[] {
  const cleaned = normalizeText(text)
  if (lang === 'ja' || lang === 'zh') {
    // Split into individual characters for CJK characters, keep words for Latin/numbers
    const chars = Array.from(cleaned).filter(c => c.trim().length > 0)
    return chars
  }
  return cleaned.split(' ').filter(w => w.length > 0)
}

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length
  const n = s2.length
  const d: number[][] = []

  for (let i = 0; i <= m; i++) d[i] = [i]
  for (let j = 0; j <= n; j++) d[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      )
    }
  }
  return d[m][n]
}

/**
 * Compare spoken transcript with target reference sentence
 */
export function evaluatePronunciation({
  targetText,
  spokenText,
  lang,
}: {
  targetText: string
  spokenText: string
  lang: Language
}): ScoreResult {
  const normTarget = normalizeText(targetText)
  const normSpoken = normalizeText(spokenText)

  if (!normSpoken) {
    const targetTokens = tokenizeSentence(targetText, lang)
    return {
      overallScore: 0,
      accuracyPercent: 0,
      targetText,
      spokenText: '',
      wordBreakdown: targetTokens.map(w => ({ word: w, status: 'missed' })),
      feedback: 'Chưa phát hiện được giọng nói. Hãy kiểm tra microphone và đọc to hơn một chút nhé!',
    }
  }

  const targetTokens = tokenizeSentence(targetText, lang)
  const spokenTokens = tokenizeSentence(spokenText, lang)

  const breakdown: WordTokenComparison[] = []
  let correctCount = 0
  let closeCount = 0

  // Match target tokens with spoken tokens
  const spokenUsed = new Set<number>()

  targetTokens.forEach((targetWord, targetIdx) => {
    // Try to find exact match in nearby window
    let bestSpokenIdx = -1
    let matchType: 'correct' | 'close' | 'missed' = 'missed'

    // Look in a sliding window around targetIdx
    const windowStart = Math.max(0, targetIdx - 3)
    const windowEnd = Math.min(spokenTokens.length - 1, targetIdx + 3)

    for (let i = windowStart; i <= windowEnd; i++) {
      if (spokenUsed.has(i)) continue

      const sWord = spokenTokens[i]
      if (sWord === targetWord) {
        bestSpokenIdx = i
        matchType = 'correct'
        break
      }

      // Check fuzzy similarity (for words with length > 2)
      if (targetWord.length >= 2 && sWord.length >= 2) {
        const dist = levenshteinDistance(targetWord, sWord)
        if (dist === 1) {
          bestSpokenIdx = i
          matchType = 'close'
        }
      }
    }

    if (bestSpokenIdx !== -1) {
      spokenUsed.add(bestSpokenIdx)
      if (matchType === 'correct') correctCount++
      if (matchType === 'close') closeCount++
    }

    breakdown.push({
      word: targetWord,
      status: matchType,
    })
  })

  // Calculate overall score (0 - 100)
  const totalTokens = Math.max(targetTokens.length, 1)
  const rawScore = (correctCount * 1.0 + closeCount * 0.6) / totalTokens
  const accuracyPercent = Math.min(100, Math.round(rawScore * 100))

  // Penalize slightly if spoken length is vastly different from target
  const lengthRatio = spokenTokens.length / totalTokens
  let lengthPenalty = 1.0
  if (lengthRatio < 0.5) lengthPenalty = 0.7
  else if (lengthRatio > 1.8) lengthPenalty = 0.85

  const overallScore = Math.max(0, Math.min(100, Math.round(accuracyPercent * lengthPenalty)))

  // Constructive feedback in Vietnamese
  let feedback = ''
  if (overallScore >= 90) {
    feedback = 'Tuyệt vời! Ngữ điệu và phát âm của bạn rất chuẩn xác, rất gần với người bản xứ.'
  } else if (overallScore >= 75) {
    feedback = 'Khá tốt! Bạn đã phát âm đúng phần lớn từ. Hãy chú ý các từ màu vàng/đỏ để tròn vành rõ chữ hơn.'
  } else if (overallScore >= 50) {
    feedback = 'Cần cố gắng thêm! Nhịp đọc hơi nhanh hoặc chưa rõ một số âm. Hãy bấm nghe lại mẫu rồi shadowing nhé.'
  } else {
    feedback = 'Đừng nản lòng! Hãy giảm tốc độ xuống 0.75x, nghe mẫu từng cụm từ rồi bấm thu âm lại từng câu.'
  }

  return {
    overallScore,
    accuracyPercent,
    targetText,
    spokenText,
    wordBreakdown: breakdown,
    feedback,
  }
}
