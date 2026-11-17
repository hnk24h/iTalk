import React from 'react'
import { Language } from '../types'

/**
 * Common dictionary for JLPT N5-N3 Japanese Kanji words
 * Used as automatic fallback if a sentence doesn't have explicit furigana tags.
 * Ordered from longest phrases to single kanji to avoid partial replacement bugs.
 */
const COMMON_KANJI_DICT: [RegExp, string][] = [
  // Multi-kanji compound phrases
  [/進捗状況/g, '進[しん]捗[ちょく]状[じょう]況[きょう]'],
  [/優先順位/g, '優[ゆう]先[せん]順[じゅん]位[い]'],
  [/見直しましょう/g, '見[み]直[なお]しましょう'],
  [/見直し/g, '見[み]直[なお]し'],
  [/間に合わせる/g, '間[ま]に合[あ]わせる'],
  [/間に合う/g, '間[ま]に合[あ]う'],
  [/考えてみる/g, '考[かんが]えてみる'],
  [/考えて/g, '考[かんが]えて'],
  [/考え/g, '考[かんが]え'],
  [/初めまして/g, '初[はじ]めまして'],
  [/申します/g, '申[もう]します'],
  [/来ました/g, '来[き]ました'],
  [/来てから/g, '来[き]てから'],
  [/経ちました/g, '経[た]ちました'],
  [/生じた/g, '生[しょう]じた'],
  [/お願いいたします/g, 'お願[ねが]いいたします'],
  [/お願いします/g, 'お願[ねが]いします'],
  [/お願い/g, 'お願[ねが]い'],
  [/温めて/g, '温[あたた]めて'],
  [/温める/g, '温[あたた]める'],
  [/レジ袋/g, 'レジ袋[ぶくろ]'],
  [/お支払い/g, 'お支払[しはら]い'],
  [/支払い/g, '支払[しはら]い'],
  [/お持ちですか/g, 'お持[も]ちですか'],
  [/お持ち/g, 'お持[も]ち'],
  [/持っています/g, '持[も]っています'],
  [/持つ/g, '持[も]つ'],
  [/別の角度/g, '別[べつ]の角[かく]度[ど]'],
  [/角度/g, '角[かく]度[ど]'],
  [/必要/g, '必[ひつ]要[よう]'],
  [/思います/g, '思[おも]います'],
  [/思い/g, '思[おも]い'],
  [/思う/g, '思[おも]う'],
  [/納期/g, '納[のう]期[き]'],
  [/場合は/g, '場[ば]合[あい]は'],
  [/場合/g, '場[ば]合[あい]'],
  [/速やかに/g, '速[すみ]やかに'],
  [/共有/g, '共[きょう]有[ゆう]'],
  [/問題/g, '問[もん]題[だい]'],
  [/日本/g, '日[に]本[ほん]'],
  [/半年/g, '半[はん]年[とし]'],
  [/昨日/g, '昨[きの]日[う]'],
  [/今日/g, '今[きょう]日[]'],
  [/明日/g, '明[あ]日[した]'],
  [/毎日/g, '毎[まい]日[にち]'],
  [/毎週/g, '毎[まい]週[しゅう]'],
  [/毎月/g, '毎[まい]月[つき]'],
  [/毎年/g, '毎[まい]年[とし]'],
  [/時間/g, '時[じ]間[かん]'],
  [/仕事/g, '仕[し]事[ごと]'],
  [/会社/g, '会[かい]社[しゃ]'],
  [/会話/g, '会[かい]話[わ]'],
  [/会議/g, '会[かい]議[ぎ]'],
  [/勉強/g, '勉[べん]強[きょう]'],
  [/練習/g, '練[れん]習[しゅう]'],
  [/発音/g, '発[はつ]音[おん]'],
  [/質問/g, '質[しつ]問[もん]'],
  [/回答/g, '回[かい]答[とう]'],
  [/先生/g, '先[せん]生[せい]'],
  [/学生/g, '学[がく]生[せい]'],
  [/友達/g, '友[とも]達[だち]'],
  [/家族/g, '家[か]族[ぞく]'],
  [/電話/g, '電[でん]話[わ]'],
  [/大切/g, '大[たい]切[せつ]'],
  [/大丈夫/g, '大[だい]丈[じょう]夫[ぶ]'],
  [/簡単/g, '簡[かん]単[たん]'],
  [/難しい/g, '難[むずか]しい'],
  [/上手/g, '上[じょう]手[ず]'],
  [/下手/g, '下[へ]手[た]'],
  [/楽しい/g, '楽[たの]しい'],
  [/嬉しい/g, '嬉[うれ]しい'],
  [/食べる/g, '食[た]べる'],
  [/飲む/g, '飲[の]む'],
  [/見る/g, '見[み]る'],
  [/聞く/g, '聞[き]く'],
  [/話す/g, '話[はな]す'],
  [/行く/g, '行[い]く'],
  [/来る/g, '来[く]る'],
  [/私/g, '私[わたし]'],
  [/誰/g, '誰[だれ]'],
  [/何/g, '何[なに]'],
  [/今/g, '今[いま]'],
]

/**
 * Auto-annotates a Japanese sentence with bracketed furigana if not already formatted
 */
export function autoAnnotateFurigana(text: string): string {
  if (!text) return ''
  // If already contains bracket annotations, return as is
  if (/\[[ぁ-んァ-ヶー]+\]/.test(text)) {
    return text
  }

  let result = text
  for (const [regex, replacement] of COMMON_KANJI_DICT) {
    result = result.replace(regex, replacement)
  }
  return result
}

/**
 * Parse text containing `Kanji[furigana]` into HTML <ruby> elements
 * Example: "初[はじ]めまして、ホアンと申[もう]します。"
 */
export function parseFurigana(
  annotatedText: string,
  showFurigana: boolean = true
): React.ReactNode {
  if (!annotatedText) return null

  // Regex to match Kanji[furigana]
  // Matches: 1 or more Kanji/Ideographs followed by [hiragana/katakana]
  const pattern = /([一-龯々ヶ]+)\[([ぁ-んァ-ヶー]*)\]/g

  const elements: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(annotatedText)) !== null) {
    const matchIndex = match.index

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      elements.push(annotatedText.substring(lastIndex, matchIndex))
    }

    const kanji = match[1]
    const reading = match[2]

    if (showFurigana && reading) {
      elements.push(
        <ruby key={`ruby-${matchIndex}-${kanji}`} className="ruby-group">
          {kanji}
          <rt className="ruby-rt">{reading}</rt>
        </ruby>
      )
    } else {
      elements.push(kanji)
    }

    lastIndex = pattern.lastIndex
  }

  // Push remaining plain text
  if (lastIndex < annotatedText.length) {
    elements.push(annotatedText.substring(lastIndex))
  }

  return elements
}

interface FuriganaTextProps {
  text: string
  furigana?: string
  lang: Language
  showFurigana?: boolean
  className?: string
}

/**
 * React Component to render Japanese text with Furigana Ruby above Kanji
 */
export const FuriganaText: React.FC<FuriganaTextProps> = ({
  text,
  furigana,
  lang,
  showFurigana = true,
  className = '',
}) => {
  if (lang !== 'ja') {
    return <span className={className}>{text}</span>
  }

  const annotated = furigana || autoAnnotateFurigana(text)
  return (
    <span className={`inline-ruby-wrapper ${className}`}>
      {parseFurigana(annotated, showFurigana)}
    </span>
  )
}
