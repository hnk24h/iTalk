import { LessonSentence } from '../types'

/**
 * Parse time string "mm:ss.xx" or "hh:mm:ss,xxx" to seconds
 */
export function timeStringToSeconds(timeStr: string): number {
  const clean = timeStr.trim().replace(',', '.')
  const parts = clean.split(':').map(Number)
  if (parts.length === 2) {
    // mm:ss.xx
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // hh:mm:ss.xxx
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  return 0
}

/**
 * Parse LRC (Lyric) format:
 * [00:12.30] 初めまして、ホアンと申します。
 * [00:16.80] ベトナムから来ました。
 */
export function parseLrc(content: string): LessonSentence[] {
  const lines = content.split('\n')
  const results: Array<{ time: number; text: string }> = []

  const timeRegex = /\[(\d{2}:\d{2}(?:\.\d{1,3})?)\](.*)/

  for (const line of lines) {
    const match = line.match(timeRegex)
    if (match) {
      const timeSec = timeStringToSeconds(match[1])
      const text = match[2].trim()
      if (text) {
        results.push({ time: timeSec, text })
      }
    }
  }

  // Sort by time
  results.sort((a, b) => a.time - b.time)

  // Calculate start and end times for each sentence
  return results.map((item, idx) => {
    const nextTime = idx < results.length - 1 ? results[idx + 1].time : item.time + 5
    return {
      id: `lrc-s-${idx + 1}`,
      text: item.text,
      translation: '',
      startTime: item.time,
      endTime: nextTime,
    }
  })
}

/**
 * Parse SRT Subtitle format
 */
export function parseSrt(content: string): LessonSentence[] {
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const blocks = normalized.split('\n\n').filter((b) => b.trim().length > 0)
  const sentences: LessonSentence[] = []

  const timeRegex = /(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})/

  for (let idx = 0; idx < blocks.length; idx++) {
    const block = blocks[idx].trim()
    const lines = block.split('\n')
    let timeMatch: RegExpMatchArray | null = null
    let textLines: string[] = []

    for (const line of lines) {
      if (!timeMatch && timeRegex.test(line)) {
        timeMatch = line.match(timeRegex)
      } else if (timeMatch) {
        textLines.push(line)
      }
    }

    if (timeMatch && textLines.length > 0) {
      const startTime = timeStringToSeconds(timeMatch[1])
      const endTime = timeStringToSeconds(timeMatch[2])
      const text = textLines.join(' ').trim()

      if (text) {
        sentences.push({
          id: `srt-s-${idx + 1}`,
          text,
          translation: '',
          startTime,
          endTime,
        })
      }
    }
  }

  return sentences
}

/**
 * Parse Plain text (each line is a sentence)
 */
export function parsePlainText(content: string): LessonSentence[] {
  const lines = content
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  return lines.map((line, idx) => ({
    id: `txt-s-${idx + 1}`,
    text: line,
    translation: '',
  }))
}

/**
 * Auto-detect and parse any transcript format
 */
export function parseTranscript(content: string, fileName?: string): LessonSentence[] {
  const ext = fileName ? fileName.split('.').pop()?.toLowerCase() : ''

  if (ext === 'json') {
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) return parsed
      if (Array.isArray(parsed.sentences)) return parsed.sentences
    } catch {}
  }

  if (ext === 'lrc' || /\[\d{2}:\d{2}/.test(content)) {
    const lrc = parseLrc(content)
    if (lrc.length > 0) return lrc
  }

  if (ext === 'srt' || /-->/.test(content)) {
    const srt = parseSrt(content)
    if (srt.length > 0) return srt
  }

  return parsePlainText(content)
}
