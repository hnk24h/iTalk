import { LanguageMeta, Lesson, Language } from '../types'
import { japaneseLessons } from './lessons-ja'
import { chineseLessons } from './lessons-zh'
import { vietnameseLessons } from './lessons-vi'

export const supportedLanguages: LanguageMeta[] = [
  {
    code: 'ja',
    name: 'Tiếng Nhật',
    nativeName: '日本語',
    flag: '🇯🇵',
    speechCode: 'ja-JP',
    phoneticLabel: 'Romaji / Furigana',
  },
  {
    code: 'zh',
    name: 'Tiếng Trung',
    nativeName: '中文 (普通话)',
    flag: '🇨🇳',
    speechCode: 'zh-CN',
    phoneticLabel: 'Bính âm (Pinyin)',
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    speechCode: 'vi-VN',
    phoneticLabel: 'Thanh điệu & Ngữ âm',
  },
]

export const defaultLessonsByLanguage: Record<Language, Lesson[]> = {
  ja: japaneseLessons,
  zh: chineseLessons,
  vi: vietnameseLessons,
}
