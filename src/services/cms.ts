import { createClient, User } from '@supabase/supabase-js'
import {
  AdminUserOverview,
  AdminUserRecording,
  CmsGrammarPattern,
  CmsLesson,
  DayProgress,
  GrammarPattern,
  Language,
  Lesson,
  UserProfile,
  UserRole,
} from '../types'
import { defaultLessonsByLanguage } from '../data/languages'
import { japaneseGrammar } from '../data/grammar-ja'
import { chineseGrammar } from '../data/grammar-zh'
import { vietnameseGrammar } from '../data/grammar-vi'
import { getCurrentUser, getSupabaseClient, getSupabaseConfig } from './supabase'

const CMS_LESSONS_CACHE_KEY = 'italk_cms_lessons_cache_v1'
const CMS_GRAMMAR_CACHE_KEY = 'italk_cms_grammar_cache_v1'

const HIDDEN_PREFIX = '__hidden__:'
const DELETED_PREFIX = '__deleted__:'

// In-memory cache backing localStorage so large datasets work smoothly even if storage quota is tight
let memoryLessonsRows: any[] | null = null
let memoryGrammarRows: any[] | null = null

export function isMarkerId(id: string): boolean {
  return id.startsWith(HIDDEN_PREFIX) || id.startsWith(DELETED_PREFIX)
}

export function getAllBuiltinLessons(): Lesson[] {
  return [
    ...defaultLessonsByLanguage.ja,
    ...defaultLessonsByLanguage.zh,
    ...defaultLessonsByLanguage.vi,
  ]
}

export function getAllBuiltinGrammar(): GrammarPattern[] {
  return [...japaneseGrammar, ...chineseGrammar, ...vietnameseGrammar]
}

const builtinLessonIdSet = new Set(getAllBuiltinLessons().map((l) => l.id))
const builtinGrammarIdSet = new Set(getAllBuiltinGrammar().map((g) => g.id))

export function formatCmsError(err: any): string {
  const code = String(err?.code || '')
  const msg = String(err?.message || err || '')
  const lower = msg.toLowerCase()

  if (
    code === '42P01' ||
    code === 'PGRST205' ||
    lower.includes('does not exist') ||
    lower.includes('could not find the table') ||
    lower.includes('bucket not found')
  ) {
    return 'Cơ sở dữ liệu CMS chưa được khởi tạo trên Supabase. Hãy mở SQL Editor trên Supabase và chạy toàn bộ file supabase/schema.sql.'
  }

  if (
    code === '42501' ||
    lower.includes('row-level security') ||
    lower.includes('permission denied') ||
    lower.includes('only administrators')
  ) {
    return 'Bạn không có quyền Admin hoặc chính sách RLS trên Supabase chưa cho phép thao tác này.'
  }

  return msg || 'Đã xảy ra lỗi khi kết nối CMS Supabase.'
}

function isMissingSchemaError(err: any): boolean {
  const code = String(err?.code || '')
  const lower = String(err?.message || err || '').toLowerCase()
  return (
    code === '42P01' ||
    code === 'PGRST205' ||
    lower.includes('does not exist') ||
    lower.includes('could not find the table')
  )
}

function mapProfileRow(row: any): UserProfile {
  return {
    id: String(row.id),
    email: row.email || null,
    displayName: row.display_name || null,
    avatarUrl: row.avatar_url || null,
    role: row.role === 'admin' ? 'admin' : 'user',
    createdAt: row.created_at || undefined,
    updatedAt: row.updated_at || undefined,
  }
}

function mapLessonRow(row: any): CmsLesson {
  if (!('is_published' in row) && 'isPublished' in row) {
    return row as CmsLesson
  }
  return {
    id: String(row.id),
    language: (row.language as Language) || 'ja',
    title: row.title || '',
    level: row.level || 'N5',
    category: row.category || 'Chung',
    description: row.description || '',
    sentences: Array.isArray(row.sentences) ? row.sentences : [],
    audioSourceType: row.audio_source_type || 'tts',
    mediaType: row.media_type || undefined,
    originalAudioUrl: row.original_audio_url || undefined,
    videoUrl: row.video_url || undefined,
    originalAudioFileName: row.original_audio_file_name || undefined,
    audioDuration: typeof row.audio_duration === 'number' ? row.audio_duration : undefined,
    isPublished: row.is_published !== false,
    sortOrder: typeof row.sort_order === 'number' ? row.sort_order : 0,
    createdAt: row.created_at || undefined,
    updatedAt: row.updated_at || undefined,
    source: 'cms',
  }
}

function mapGrammarRow(row: any): CmsGrammarPattern {
  if (!('is_published' in row) && 'isPublished' in row) {
    return row as CmsGrammarPattern
  }
  return {
    id: String(row.id),
    language: (row.language as Language) || 'ja',
    level: row.level || 'N5',
    pattern: row.pattern || '',
    meaning: row.meaning || '',
    formula: row.formula || '',
    note: row.note ?? null,
    examples: Array.isArray(row.examples) ? row.examples : [],
    isPublished: row.is_published !== false,
    sortOrder: typeof row.sort_order === 'number' ? row.sort_order : 0,
    createdAt: row.created_at || undefined,
    updatedAt: row.updated_at || undefined,
    source: 'cms',
  }
}

function inferBuiltinAudioSource(b: Lesson): 'tts' | 'audio-file' | 'video-file' {
  if (b.videoUrl) return 'video-file'
  if (b.originalAudioUrl) return 'audio-file'
  return b.audioSourceType || 'tts'
}

function buildLessonMarkerRow(
  id: string,
  language: Language,
  kind: 'hidden' | 'deleted',
  userId?: string | null
) {
  const prefix = kind === 'hidden' ? HIDDEN_PREFIX : DELETED_PREFIX
  return {
    id: `${prefix}${id}`,
    language,
    title: kind === 'hidden' ? '__hidden__' : '__deleted__',
    level: '__meta__',
    category: kind === 'hidden' ? '__cms_hidden__' : '__cms_deleted__',
    description: '',
    sentences: [],
    audio_source_type: 'tts',
    media_type: null,
    original_audio_url: null,
    video_url: null,
    original_audio_file_name: null,
    audio_duration: null,
    is_published: true,
    sort_order: -1,
    created_by: userId || null,
    updated_at: new Date().toISOString(),
  }
}

function buildGrammarMarkerRow(
  id: string,
  language: Language,
  kind: 'hidden' | 'deleted',
  userId?: string | null
) {
  const prefix = kind === 'hidden' ? HIDDEN_PREFIX : DELETED_PREFIX
  return {
    id: `${prefix}${id}`,
    language,
    level: '__meta__',
    pattern: kind === 'hidden' ? '__hidden__' : '__deleted__',
    meaning: '__meta__',
    formula: '',
    note: null,
    examples: [],
    is_published: true,
    sort_order: -1,
    created_by: userId || null,
    updated_at: new Date().toISOString(),
  }
}

async function fetchAllRows(
  table: 'cms_lessons' | 'cms_grammar_patterns',
  publishedOnly: boolean
): Promise<{ rows: any[]; error?: any }> {
  const client = getSupabaseClient()
  if (!client) return { rows: [], error: { message: 'Chưa cấu hình Supabase.' } }

  const pageSize = 1000
  const allRows: any[] = []
  let from = 0

  while (true) {
    let query = client
      .from(table)
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(from, from + pageSize - 1)

    if (publishedOnly) {
      query = query.eq('is_published', true)
    }

    const { data, error } = await query
    if (error) {
      return { rows: allRows, error }
    }
    const batch = Array.isArray(data) ? data : []
    allRows.push(...batch)
    if (batch.length < pageSize) break
    from += pageSize
  }

  return { rows: allRows }
}

function readCachedRows(storageKey: string, memoryRows: any[] | null): any[] {
  if (memoryRows) return memoryRows
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeCachedRows(storageKey: string, rows: any[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(storageKey, JSON.stringify(rows))
  } catch {
    // Ignore localStorage quota exceeded; memory cache holds the full dataset
  }
}

// ==========================================
// Auth & Role
// ==========================================

export async function getCurrentUserProfile(): Promise<{
  user: User | null
  profile: UserProfile | null
  isAdmin: boolean
  error?: string
}> {
  const client = getSupabaseClient()
  if (!client) {
    return { user: null, profile: null, isAdmin: false }
  }

  try {
    const user = await getCurrentUser()
    if (!user) {
      return { user: null, profile: null, isAdmin: false }
    }

    const { data, error } = await client
      .from('profiles')
      .select('id, email, display_name, avatar_url, role, created_at, updated_at')
      .eq('id', user.id)
      .maybeSingle()

    if (error || !data) {
      return {
        user,
        profile: {
          id: user.id,
          email: user.email || null,
          displayName: user.email ? user.email.split('@')[0] : null,
          role: 'user',
        },
        isAdmin: false,
        error: error ? formatCmsError(error) : undefined,
      }
    }

    const profile = mapProfileRow(data)
    return {
      user,
      profile,
      isAdmin: profile.role === 'admin',
    }
  } catch (err: any) {
    return {
      user: null,
      profile: null,
      isAdmin: false,
      error: formatCmsError(err),
    }
  }
}

export async function checkIsAdmin(): Promise<boolean> {
  const res = await getCurrentUserProfile()
  return res.isAdmin
}

// ==========================================
// Learner Cache & Merged Content
// ==========================================

function compareCmsSort<T extends { sortOrder: number; createdAt?: string }>(a: T, b: T): number {
  const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  if (orderDiff !== 0) return orderDiff
  return (b.createdAt || '').localeCompare(a.createdAt || '')
}

function splitRowsAndMarkers<T extends { id: string }>(
  rawRows: any[],
  mapper: (row: any) => T
): {
  items: T[]
  hiddenIds: Set<string>
  deletedIds: Set<string>
} {
  const hiddenIds = new Set<string>()
  const deletedIds = new Set<string>()
  const items: T[] = []

  for (const row of rawRows) {
    const id = String(row?.id || '')
    if (!id) continue
    if (id.startsWith(HIDDEN_PREFIX)) {
      hiddenIds.add(id.slice(HIDDEN_PREFIX.length))
    } else if (id.startsWith(DELETED_PREFIX)) {
      deletedIds.add(id.slice(DELETED_PREFIX.length))
    } else {
      items.push(mapper(row))
    }
  }

  return { items, hiddenIds, deletedIds }
}

export function getAllLessonsForLanguage(lang: Language): Lesson[] {
  const builtin = defaultLessonsByLanguage[lang] || []
  const rawRows = readCachedRows(CMS_LESSONS_CACHE_KEY, memoryLessonsRows)
  if (rawRows.length === 0) return builtin

  const { items, hiddenIds, deletedIds } = splitRowsAndMarkers(rawRows, mapLessonRow)
  const langItems = items.filter((l) => l.language === lang)
  const overrideMap = new Map<string, CmsLesson>()
  langItems.forEach((l) => overrideMap.set(l.id, l))

  const merged: Lesson[] = []
  for (const b of builtin) {
    if (deletedIds.has(b.id) || hiddenIds.has(b.id)) continue
    const ov = overrideMap.get(b.id)
    if (ov) {
      if (ov.isPublished) merged.push(ov)
    } else {
      merged.push(b)
    }
  }

  const newCmsItems = langItems
    .filter(
      (l) =>
        !builtinLessonIdSet.has(l.id) &&
        l.isPublished &&
        !deletedIds.has(l.id) &&
        !hiddenIds.has(l.id)
    )
    .sort(compareCmsSort)

  return [...merged, ...newCmsItems]
}

export function getAllGrammarPatternsForLanguage(lang: Language): GrammarPattern[] {
  const builtin =
    lang === 'ja' ? japaneseGrammar : lang === 'zh' ? chineseGrammar : vietnameseGrammar
  const rawRows = readCachedRows(CMS_GRAMMAR_CACHE_KEY, memoryGrammarRows)
  if (rawRows.length === 0) return builtin

  const { items, hiddenIds, deletedIds } = splitRowsAndMarkers(rawRows, mapGrammarRow)
  const langItems = items.filter((p) => p.language === lang)
  const overrideMap = new Map<string, CmsGrammarPattern>()
  langItems.forEach((p) => overrideMap.set(p.id, p))

  const merged: GrammarPattern[] = []
  for (const b of builtin) {
    if (deletedIds.has(b.id) || hiddenIds.has(b.id)) continue
    const ov = overrideMap.get(b.id)
    if (ov) {
      if (ov.isPublished) merged.push(ov)
    } else {
      merged.push(b)
    }
  }

  const newCmsItems = langItems
    .filter(
      (p) =>
        !builtinGrammarIdSet.has(p.id) &&
        p.isPublished &&
        !deletedIds.has(p.id) &&
        !hiddenIds.has(p.id)
    )
    .sort(compareCmsSort)

  return [...merged, ...newCmsItems]
}

export async function refreshPublishedCmsContent(): Promise<{
  lessonsCount: number
  grammarCount: number
}> {
  const client = getSupabaseClient()
  if (!client || typeof window === 'undefined') {
    return { lessonsCount: 0, grammarCount: 0 }
  }

  try {
    const [lessonsRes, grammarRes] = await Promise.all([
      fetchAllRows('cms_lessons', true),
      fetchAllRows('cms_grammar_patterns', true),
    ])

    let updated = false

    if (!lessonsRes.error) {
      memoryLessonsRows = lessonsRes.rows
      writeCachedRows(CMS_LESSONS_CACHE_KEY, lessonsRes.rows)
      updated = true
    }

    if (!grammarRes.error) {
      memoryGrammarRows = grammarRes.rows
      writeCachedRows(CMS_GRAMMAR_CACHE_KEY, grammarRes.rows)
      updated = true
    }

    if (updated) {
      window.dispatchEvent(new CustomEvent('italk:cms-content-updated'))
    }

    return {
      lessonsCount: lessonsRes.rows.filter((r) => !isMarkerId(String(r.id || ''))).length,
      grammarCount: grammarRes.rows.filter((r) => !isMarkerId(String(r.id || ''))).length,
    }
  } catch {
    return { lessonsCount: 0, grammarCount: 0 }
  }
}

// ==========================================
// Admin Merged Fetchers (Built-in + CMS + Tombstones)
// ==========================================

export async function adminFetchAllLessons(): Promise<{
  data: CmsLesson[]
  cmsCount: number
  missingSchema?: boolean
  error?: string
}> {
  let rows: any[] = []
  let errorMsg: string | undefined
  let missingSchema = false

  if (getSupabaseClient()) {
    const res = await fetchAllRows('cms_lessons', false)
    if (res.error) {
      missingSchema = isMissingSchemaError(res.error)
      errorMsg = formatCmsError(res.error)
    } else {
      rows = res.rows
    }
  } else {
    errorMsg = 'Chưa cấu hình Supabase.'
  }

  const { items, hiddenIds, deletedIds } = splitRowsAndMarkers(rows, mapLessonRow)
  const cmsMap = new Map<string, CmsLesson>()
  items.forEach((l) => cmsMap.set(l.id, l))

  const newCmsLessons: CmsLesson[] = items
    .filter((l) => !builtinLessonIdSet.has(l.id))
    .sort((a, b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || ''))
    .map((l) => ({
      ...l,
      source: 'cms' as const,
      isDeleted: deletedIds.has(l.id),
    }))

  const builtinLessons: CmsLesson[] = getAllBuiltinLessons().map((b, idx) => {
    const isDeleted = deletedIds.has(b.id)
    const isHidden = hiddenIds.has(b.id)
    const ov = cmsMap.get(b.id)
    if (ov) {
      return {
        ...ov,
        isPublished: !isDeleted && !isHidden && ov.isPublished,
        isDeleted,
        source: 'override' as const,
      }
    }
    return {
      ...b,
      audioSourceType: inferBuiltinAudioSource(b),
      isPublished: !isDeleted && !isHidden,
      isDeleted,
      sortOrder: idx,
      source: 'builtin' as const,
    }
  })

  return {
    data: [...newCmsLessons, ...builtinLessons],
    cmsCount: cmsMap.size,
    missingSchema,
    error: errorMsg,
  }
}

export async function adminFetchAllGrammarPatterns(): Promise<{
  data: CmsGrammarPattern[]
  cmsCount: number
  missingSchema?: boolean
  error?: string
}> {
  let rows: any[] = []
  let errorMsg: string | undefined
  let missingSchema = false

  if (getSupabaseClient()) {
    const res = await fetchAllRows('cms_grammar_patterns', false)
    if (res.error) {
      missingSchema = isMissingSchemaError(res.error)
      errorMsg = formatCmsError(res.error)
    } else {
      rows = res.rows
    }
  } else {
    errorMsg = 'Chưa cấu hình Supabase.'
  }

  const { items, hiddenIds, deletedIds } = splitRowsAndMarkers(rows, mapGrammarRow)
  const cmsMap = new Map<string, CmsGrammarPattern>()
  items.forEach((p) => cmsMap.set(p.id, p))

  const newCmsGrammar: CmsGrammarPattern[] = items
    .filter((p) => !builtinGrammarIdSet.has(p.id))
    .sort((a, b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || ''))
    .map((p) => ({
      ...p,
      source: 'cms' as const,
      isDeleted: deletedIds.has(p.id),
    }))

  const builtinGrammar: CmsGrammarPattern[] = getAllBuiltinGrammar().map((b, idx) => {
    const isDeleted = deletedIds.has(b.id)
    const isHidden = hiddenIds.has(b.id)
    const ov = cmsMap.get(b.id)
    if (ov) {
      return {
        ...ov,
        isPublished: !isDeleted && !isHidden && ov.isPublished,
        isDeleted,
        source: 'override' as const,
      }
    }
    return {
      ...b,
      isPublished: !isDeleted && !isHidden,
      isDeleted,
      sortOrder: idx,
      source: 'builtin' as const,
    }
  })

  return {
    data: [...newCmsGrammar, ...builtinGrammar],
    cmsCount: cmsMap.size,
    missingSchema,
    error: errorMsg,
  }
}

// ==========================================
// Admin CRUD — Shadowing Lessons
// ==========================================

function lessonToDbPayload(lesson: CmsLesson, createdBy: string | null) {
  return {
    id: lesson.id.trim(),
    language: lesson.language,
    title: lesson.title.trim(),
    level: lesson.level.trim() || 'N5',
    category: lesson.category.trim() || 'Chung',
    description: lesson.description || '',
    sentences: lesson.sentences || [],
    audio_source_type: inferBuiltinAudioSource(lesson),
    media_type: lesson.mediaType || null,
    original_audio_url: lesson.originalAudioUrl || null,
    video_url: lesson.videoUrl || null,
    original_audio_file_name: lesson.originalAudioFileName || null,
    audio_duration:
      typeof lesson.audioDuration === 'number' && !Number.isNaN(lesson.audioDuration)
        ? lesson.audioDuration
        : null,
    is_published: lesson.isPublished !== false,
    sort_order: Number.isFinite(lesson.sortOrder) ? lesson.sortOrder : 0,
    created_by: createdBy,
    updated_at: new Date().toISOString(),
  }
}

export async function adminUpsertLesson(
  lesson: CmsLesson
): Promise<{ data: CmsLesson | null; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { data: null, error: 'Chưa cấu hình Supabase.' }

  try {
    const user = await getCurrentUser()
    const cleanId = lesson.id.trim()
    const payload = lessonToDbPayload(lesson, user?.id || null)

    const { data, error } = await client
      .from('cms_lessons')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single()

    if (error) {
      return { data: null, error: formatCmsError(error) }
    }

    await client.from('cms_lessons').delete().eq('id', `${DELETED_PREFIX}${cleanId}`)

    if (builtinLessonIdSet.has(cleanId)) {
      if (lesson.isPublished !== false) {
        await client.from('cms_lessons').delete().eq('id', `${HIDDEN_PREFIX}${cleanId}`)
      } else {
        await client
          .from('cms_lessons')
          .upsert(buildLessonMarkerRow(cleanId, lesson.language, 'hidden', user?.id), {
            onConflict: 'id',
          })
      }
    }

    await refreshPublishedCmsContent()
    const mapped = mapLessonRow(data)
    return {
      data: {
        ...mapped,
        source: builtinLessonIdSet.has(cleanId) ? 'override' : 'cms',
        isDeleted: false,
      },
    }
  } catch (err: any) {
    return { data: null, error: formatCmsError(err) }
  }
}

export async function adminToggleLessonPublished(
  lesson: CmsLesson,
  nextPublished: boolean
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const user = await getCurrentUser()
    const id = lesson.id

    if (builtinLessonIdSet.has(id)) {
      await client.from('cms_lessons').delete().eq('id', `${DELETED_PREFIX}${id}`)

      if (nextPublished) {
        const { error: delErr } = await client
          .from('cms_lessons')
          .delete()
          .eq('id', `${HIDDEN_PREFIX}${id}`)
        if (delErr) return { success: false, error: formatCmsError(delErr) }

        if (lesson.source === 'override') {
          const { error: updErr } = await client
            .from('cms_lessons')
            .update({ is_published: true, updated_at: new Date().toISOString() })
            .eq('id', id)
          if (updErr) return { success: false, error: formatCmsError(updErr) }
        }
      } else {
        const { error: hidErr } = await client
          .from('cms_lessons')
          .upsert(buildLessonMarkerRow(id, lesson.language, 'hidden', user?.id), {
            onConflict: 'id',
          })
        if (hidErr) return { success: false, error: formatCmsError(hidErr) }

        if (lesson.source === 'override') {
          const { error: updErr } = await client
            .from('cms_lessons')
            .update({ is_published: false, updated_at: new Date().toISOString() })
            .eq('id', id)
          if (updErr) return { success: false, error: formatCmsError(updErr) }
        }
      }
    } else {
      const { error } = await client
        .from('cms_lessons')
        .update({ is_published: nextPublished, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) return { success: false, error: formatCmsError(error) }
    }

    await refreshPublishedCmsContent()
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminDeleteLesson(
  lesson: CmsLesson
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const user = await getCurrentUser()
    const id = lesson.id

    const { error: delErr } = await client
      .from('cms_lessons')
      .delete()
      .in('id', [id, `${HIDDEN_PREFIX}${id}`])

    if (delErr) return { success: false, error: formatCmsError(delErr) }

    if (builtinLessonIdSet.has(id)) {
      const { error: markErr } = await client
        .from('cms_lessons')
        .upsert(buildLessonMarkerRow(id, lesson.language, 'deleted', user?.id), {
          onConflict: 'id',
        })
      if (markErr) return { success: false, error: formatCmsError(markErr) }
    }

    await refreshPublishedCmsContent()
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminRestoreLesson(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { error } = await client
      .from('cms_lessons')
      .delete()
      .in('id', [id, `${HIDDEN_PREFIX}${id}`, `${DELETED_PREFIX}${id}`])

    if (error) return { success: false, error: formatCmsError(error) }
    await refreshPublishedCmsContent()
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminSyncBuiltinLessonsToDb(
  onProgress?: (done: number, total: number) => void
): Promise<{ synced: number; skipped: number; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { synced: 0, skipped: 0, error: 'Chưa cấu hình Supabase.' }

  try {
    const existingRes = await fetchAllRows('cms_lessons', false)
    if (existingRes.error) {
      return { synced: 0, skipped: 0, error: formatCmsError(existingRes.error) }
    }

    const { items, hiddenIds, deletedIds } = splitRowsAndMarkers(existingRes.rows, mapLessonRow)
    const existingIds = new Set(items.map((l) => l.id))
    const allBuiltin = getAllBuiltinLessons()

    const toSync = allBuiltin
      .map((b, idx) => ({ b, idx }))
      .filter(
        ({ b }) =>
          !existingIds.has(b.id) && !deletedIds.has(b.id) && !hiddenIds.has(b.id)
      )

    const skipped = allBuiltin.length - toSync.length
    if (toSync.length === 0) {
      return { synced: 0, skipped }
    }

    const user = await getCurrentUser()
    const chunkSize = 40
    let done = 0

    for (let i = 0; i < toSync.length; i += chunkSize) {
      const slice = toSync.slice(i, i + chunkSize)
      const payloads = slice.map(({ b, idx }) =>
        lessonToDbPayload(
          {
            ...b,
            isPublished: true,
            sortOrder: idx,
          },
          user?.id || null
        )
      )
      const { error } = await client
        .from('cms_lessons')
        .upsert(payloads, { onConflict: 'id' })
      if (error) {
        return { synced: done, skipped, error: formatCmsError(error) }
      }
      done += slice.length
      onProgress?.(done, toSync.length)
    }

    await refreshPublishedCmsContent()
    return { synced: done, skipped }
  } catch (err: any) {
    return { synced: 0, skipped: 0, error: formatCmsError(err) }
  }
}

export async function uploadCmsMediaFile(
  file: File,
  lang: Language
): Promise<{ url: string | null; mediaType: 'audio' | 'video'; error?: string }> {
  const isVideo =
    file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(file.name)
  const mediaType: 'audio' | 'video' = isVideo ? 'video' : 'audio'

  const client = getSupabaseClient()
  if (!client) return { url: null, mediaType, error: 'Chưa cấu hình Supabase.' }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `${lang}/${Date.now()}_${safeName}`

    const { error } = await client.storage
      .from('italk-cms-media')
      .upload(storagePath, file, {
        contentType: file.type || undefined,
        upsert: true,
      })

    if (error) {
      return { url: null, mediaType, error: formatCmsError(error) }
    }

    const { data: publicUrlData } = client.storage
      .from('italk-cms-media')
      .getPublicUrl(storagePath)

    return {
      url: publicUrlData?.publicUrl || null,
      mediaType,
    }
  } catch (err: any) {
    return { url: null, mediaType, error: formatCmsError(err) }
  }
}

// ==========================================
// Admin CRUD — Grammar Patterns
// ==========================================

function grammarToDbPayload(pattern: CmsGrammarPattern, createdBy: string | null) {
  return {
    id: pattern.id.trim(),
    language: pattern.language,
    level: pattern.level.trim() || 'N5',
    pattern: pattern.pattern.trim(),
    meaning: pattern.meaning.trim(),
    formula: pattern.formula || '',
    note: pattern.note ?? null,
    examples: pattern.examples || [],
    is_published: pattern.isPublished !== false,
    sort_order: Number.isFinite(pattern.sortOrder) ? pattern.sortOrder : 0,
    created_by: createdBy,
    updated_at: new Date().toISOString(),
  }
}

export async function adminUpsertGrammarPattern(
  pattern: CmsGrammarPattern
): Promise<{ data: CmsGrammarPattern | null; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { data: null, error: 'Chưa cấu hình Supabase.' }

  try {
    const user = await getCurrentUser()
    const cleanId = pattern.id.trim()
    const payload = grammarToDbPayload(pattern, user?.id || null)

    const { data, error } = await client
      .from('cms_grammar_patterns')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single()

    if (error) {
      return { data: null, error: formatCmsError(error) }
    }

    await client
      .from('cms_grammar_patterns')
      .delete()
      .eq('id', `${DELETED_PREFIX}${cleanId}`)

    if (builtinGrammarIdSet.has(cleanId)) {
      if (pattern.isPublished !== false) {
        await client
          .from('cms_grammar_patterns')
          .delete()
          .eq('id', `${HIDDEN_PREFIX}${cleanId}`)
      } else {
        await client
          .from('cms_grammar_patterns')
          .upsert(buildGrammarMarkerRow(cleanId, pattern.language, 'hidden', user?.id), {
            onConflict: 'id',
          })
      }
    }

    await refreshPublishedCmsContent()
    const mapped = mapGrammarRow(data)
    return {
      data: {
        ...mapped,
        source: builtinGrammarIdSet.has(cleanId) ? 'override' : 'cms',
        isDeleted: false,
      },
    }
  } catch (err: any) {
    return { data: null, error: formatCmsError(err) }
  }
}

export async function adminToggleGrammarPublished(
  pattern: CmsGrammarPattern,
  nextPublished: boolean
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const user = await getCurrentUser()
    const id = pattern.id

    if (builtinGrammarIdSet.has(id)) {
      await client.from('cms_grammar_patterns').delete().eq('id', `${DELETED_PREFIX}${id}`)

      if (nextPublished) {
        const { error: delErr } = await client
          .from('cms_grammar_patterns')
          .delete()
          .eq('id', `${HIDDEN_PREFIX}${id}`)
        if (delErr) return { success: false, error: formatCmsError(delErr) }

        if (pattern.source === 'override') {
          const { error: updErr } = await client
            .from('cms_grammar_patterns')
            .update({ is_published: true, updated_at: new Date().toISOString() })
            .eq('id', id)
          if (updErr) return { success: false, error: formatCmsError(updErr) }
        }
      } else {
        const { error: hidErr } = await client
          .from('cms_grammar_patterns')
          .upsert(buildGrammarMarkerRow(id, pattern.language, 'hidden', user?.id), {
            onConflict: 'id',
          })
        if (hidErr) return { success: false, error: formatCmsError(hidErr) }

        if (pattern.source === 'override') {
          const { error: updErr } = await client
            .from('cms_grammar_patterns')
            .update({ is_published: false, updated_at: new Date().toISOString() })
            .eq('id', id)
          if (updErr) return { success: false, error: formatCmsError(updErr) }
        }
      }
    } else {
      const { error } = await client
        .from('cms_grammar_patterns')
        .update({ is_published: nextPublished, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) return { success: false, error: formatCmsError(error) }
    }

    await refreshPublishedCmsContent()
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminDeleteGrammarPattern(
  pattern: CmsGrammarPattern
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const user = await getCurrentUser()
    const id = pattern.id

    const { error: delErr } = await client
      .from('cms_grammar_patterns')
      .delete()
      .in('id', [id, `${HIDDEN_PREFIX}${id}`])

    if (delErr) return { success: false, error: formatCmsError(delErr) }

    if (builtinGrammarIdSet.has(id)) {
      const { error: markErr } = await client
        .from('cms_grammar_patterns')
        .upsert(buildGrammarMarkerRow(id, pattern.language, 'deleted', user?.id), {
          onConflict: 'id',
        })
      if (markErr) return { success: false, error: formatCmsError(markErr) }
    }

    await refreshPublishedCmsContent()
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminRestoreGrammarPattern(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { error } = await client
      .from('cms_grammar_patterns')
      .delete()
      .in('id', [id, `${HIDDEN_PREFIX}${id}`, `${DELETED_PREFIX}${id}`])

    if (error) return { success: false, error: formatCmsError(error) }
    await refreshPublishedCmsContent()
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminSyncBuiltinGrammarToDb(
  onProgress?: (done: number, total: number) => void
): Promise<{ synced: number; skipped: number; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { synced: 0, skipped: 0, error: 'Chưa cấu hình Supabase.' }

  try {
    const existingRes = await fetchAllRows('cms_grammar_patterns', false)
    if (existingRes.error) {
      return { synced: 0, skipped: 0, error: formatCmsError(existingRes.error) }
    }

    const { items, hiddenIds, deletedIds } = splitRowsAndMarkers(
      existingRes.rows,
      mapGrammarRow
    )
    const existingIds = new Set(items.map((p) => p.id))
    const allBuiltin = getAllBuiltinGrammar()

    const toSync = allBuiltin
      .map((b, idx) => ({ b, idx }))
      .filter(
        ({ b }) =>
          !existingIds.has(b.id) && !deletedIds.has(b.id) && !hiddenIds.has(b.id)
      )

    const skipped = allBuiltin.length - toSync.length
    if (toSync.length === 0) {
      return { synced: 0, skipped }
    }

    const user = await getCurrentUser()
    const chunkSize = 50
    let done = 0

    for (let i = 0; i < toSync.length; i += chunkSize) {
      const slice = toSync.slice(i, i + chunkSize)
      const payloads = slice.map(({ b, idx }) =>
        grammarToDbPayload(
          {
            ...b,
            isPublished: true,
            sortOrder: idx,
          },
          user?.id || null
        )
      )
      const { error } = await client
        .from('cms_grammar_patterns')
        .upsert(payloads, { onConflict: 'id' })
      if (error) {
        return { synced: done, skipped, error: formatCmsError(error) }
      }
      done += slice.length
      onProgress?.(done, toSync.length)
    }

    await refreshPublishedCmsContent()
    return { synced: done, skipped }
  } catch (err: any) {
    return { synced: 0, skipped: 0, error: formatCmsError(err) }
  }
}

// ==========================================
// Admin — Users & Progress Management
// ==========================================

export async function adminFetchUsersOverview(): Promise<{
  users: AdminUserOverview[]
  totalRecordings: number
  totalMinutes: number
  guestScheduleCount: number
  error?: string
}> {
  const client = getSupabaseClient()
  if (!client) {
    return {
      users: [],
      totalRecordings: 0,
      totalMinutes: 0,
      guestScheduleCount: 0,
      error: 'Chưa cấu hình Supabase.',
    }
  }

  try {
    const [profilesRes, schedulesRes, recordingsRes] = await Promise.all([
      client
        .from('profiles')
        .select('id, email, display_name, avatar_url, role, created_at')
        .order('created_at', { ascending: false }),
      client
        .from('user_schedules')
        .select('user_id, streak, last_active_date, target_minutes, target_lessons, history'),
      client.from('study_recordings').select('user_id, score'),
    ])

    if (profilesRes.error) {
      return {
        users: [],
        totalRecordings: 0,
        totalMinutes: 0,
        guestScheduleCount: 0,
        error: formatCmsError(profilesRes.error),
      }
    }

    const profiles = profilesRes.data || []
    const schedules = schedulesRes.error ? [] : schedulesRes.data || []
    const recordings = recordingsRes.error ? [] : recordingsRes.data || []

    const profileIds = new Set(profiles.map((p: any) => String(p.id)))
    const scheduleByUser = new Map<string, any>()
    let guestScheduleCount = 0
    let globalMinutes = 0

    for (const s of schedules) {
      const uid = String(s.user_id || '')
      if (uid.startsWith('guest_') || !profileIds.has(uid)) {
        guestScheduleCount += 1
      }
      scheduleByUser.set(uid, s)
      const hist = (s.history || {}) as Record<string, DayProgress>
      for (const day of Object.values(hist)) {
        if (day && typeof day.minutes === 'number') {
          globalMinutes += day.minutes
        }
      }
    }

    const recordingStatsByUser = new Map<
      string,
      { count: number; scoreSum: number; scoreCount: number }
    >()
    for (const r of recordings) {
      const uid = String(r.user_id || '')
      const prev = recordingStatsByUser.get(uid) || { count: 0, scoreSum: 0, scoreCount: 0 }
      prev.count += 1
      if (typeof r.score === 'number' && !Number.isNaN(r.score)) {
        prev.scoreSum += r.score
        prev.scoreCount += 1
      }
      recordingStatsByUser.set(uid, prev)
    }

    const users: AdminUserOverview[] = profiles.map((p: any) => {
      const uid = String(p.id)
      const sched = scheduleByUser.get(uid)
      const historyMap = (sched?.history || {}) as Record<string, DayProgress>

      let totalMinutes = 0
      let totalLessonsCompleted = 0
      const historyScores: number[] = []

      const recentHistory = Object.entries(historyMap)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 14)
        .map(([date, day]) => {
          const dayScores = Array.isArray(day?.scores)
            ? day.scores.filter((n) => typeof n === 'number' && !Number.isNaN(n))
            : []
          const avgDayScore =
            dayScores.length > 0
              ? Math.round(dayScores.reduce((acc, v) => acc + v, 0) / dayScores.length)
              : null
          return {
            date,
            minutes: Number(day?.minutes || 0),
            lessonsCompleted: Number(day?.lessonsCompleted || 0),
            avgScore: avgDayScore,
          }
        })

      for (const day of Object.values(historyMap)) {
        totalMinutes += Number(day?.minutes || 0)
        totalLessonsCompleted += Number(day?.lessonsCompleted || 0)
        if (Array.isArray(day?.scores)) {
          day.scores.forEach((sc) => {
            if (typeof sc === 'number' && !Number.isNaN(sc)) historyScores.push(sc)
          })
        }
      }

      const recStats = recordingStatsByUser.get(uid) || {
        count: 0,
        scoreSum: 0,
        scoreCount: 0,
      }
      let avgScore: number | null = null
      if (recStats.scoreCount > 0) {
        avgScore = Math.round(recStats.scoreSum / recStats.scoreCount)
      } else if (historyScores.length > 0) {
        avgScore = Math.round(
          historyScores.reduce((a, b) => a + b, 0) / historyScores.length
        )
      }

      return {
        id: uid,
        email: p.email || '',
        displayName:
          p.display_name || (p.email ? String(p.email).split('@')[0] : 'Người dùng'),
        avatarUrl: p.avatar_url || null,
        role: p.role === 'admin' ? 'admin' : 'user',
        createdAt: p.created_at || undefined,
        streak: Number(sched?.streak || 0),
        lastActiveDate: sched?.last_active_date || '',
        targetMinutes: Number(sched?.target_minutes || 15),
        targetLessons: Number(sched?.target_lessons || 3),
        totalMinutes,
        totalLessonsCompleted,
        recordingsCount: recStats.count,
        avgScore,
        recentHistory,
      }
    })

    return {
      users,
      totalRecordings: recordings.length,
      totalMinutes: globalMinutes,
      guestScheduleCount,
    }
  } catch (err: any) {
    return {
      users: [],
      totalRecordings: 0,
      totalMinutes: 0,
      guestScheduleCount: 0,
      error: formatCmsError(err),
    }
  }
}

export async function adminUpdateUserRole(
  userId: string,
  role: UserRole
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { error } = await client
      .from('profiles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', userId)

    if (error) return { success: false, error: formatCmsError(error) }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminFetchUserRecordings(
  userId: string
): Promise<{ data: AdminUserRecording[]; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { data: [], error: 'Chưa cấu hình Supabase.' }

  try {
    const { data, error } = await client
      .from('study_recordings')
      .select(
        'id, user_id, lesson_id, lesson_title, language, duration_sec, score, type, file_url, created_at'
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) return { data: [], error: formatCmsError(error) }

    return {
      data: (data || []).map((r: any) => ({
        id: String(r.id),
        userId: String(r.user_id),
        lessonId: r.lesson_id || undefined,
        lessonTitle: r.lesson_title || '',
        language: (r.language as Language) || 'ja',
        durationSec: Number(r.duration_sec || 0),
        score:
          typeof r.score === 'number' ? r.score : r.score ? Number(r.score) : null,
        type: r.type === 'video' ? 'video' : 'audio',
        fileUrl: r.file_url || null,
        createdAt: r.created_at || '',
      })),
    }
  } catch (err: any) {
    return { data: [], error: formatCmsError(err) }
  }
}

export async function adminCreateUser(params: {
  email: string
  password: string
  displayName?: string
  role: UserRole
  targetMinutes?: number
  targetLessons?: number
}): Promise<{ userId: string | null; needsEmailConfirmation: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) {
    return { userId: null, needsEmailConfirmation: false, error: 'Chưa cấu hình Supabase.' }
  }

  const { url, anonKey } = getSupabaseConfig()
  if (!url || !anonKey) {
    return {
      userId: null,
      needsEmailConfirmation: false,
      error: 'Thiếu Supabase URL hoặc Anon Key.',
    }
  }

  const cleanEmail = params.email.trim()
  const cleanDisplayName =
    params.displayName?.trim() || cleanEmail.split('@')[0] || 'Người dùng'

  try {
    // Use an isolated ephemeral client so signUp never replaces the logged-in Admin's session
    const ephemeralClient = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storageKey: `italk_ephemeral_create_${Date.now()}`,
      },
    })

    const { data, error } = await ephemeralClient.auth.signUp({
      email: cleanEmail,
      password: params.password,
      options: {
        data: { full_name: cleanDisplayName },
      },
    })

    if (error) {
      return { userId: null, needsEmailConfirmation: false, error: error.message }
    }

    if (
      data?.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0
    ) {
      return {
        userId: null,
        needsEmailConfirmation: false,
        error: 'Email này đã tồn tại trong hệ thống Supabase Auth.',
      }
    }

    const createdUserId = data?.user?.id || null
    if (!createdUserId) {
      return {
        userId: null,
        needsEmailConfirmation: false,
        error: 'Không nhận được ID tài khoản mới từ Supabase Auth.',
      }
    }

    const now = new Date().toISOString()
    const { error: profErr } = await client.from('profiles').upsert(
      {
        id: createdUserId,
        email: cleanEmail,
        display_name: cleanDisplayName,
        role: params.role,
        updated_at: now,
      },
      { onConflict: 'id' }
    )

    if (profErr) {
      return {
        userId: createdUserId,
        needsEmailConfirmation: !data.session,
        error: `Đã tạo Auth nhưng lỗi cập nhật hồ sơ: ${formatCmsError(profErr)}`,
      }
    }

    if (
      typeof params.targetMinutes === 'number' ||
      typeof params.targetLessons === 'number'
    ) {
      await client.from('user_schedules').upsert(
        {
          user_id: createdUserId,
          streak: 0,
          last_active_date: '',
          target_minutes: Math.max(1, params.targetMinutes ?? 15),
          target_lessons: Math.max(1, params.targetLessons ?? 3),
          history: {},
          updated_at: now,
        },
        { onConflict: 'user_id' }
      )
    }

    return {
      userId: createdUserId,
      needsEmailConfirmation: !data.session,
    }
  } catch (err: any) {
    return {
      userId: null,
      needsEmailConfirmation: false,
      error: formatCmsError(err),
    }
  }
}

export async function adminUpdateUser(
  userId: string,
  params: {
    displayName: string
    avatarUrl?: string | null
    role: UserRole
    streak: number
    targetMinutes: number
    targetLessons: number
  }
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const now = new Date().toISOString()
    const { error: profErr } = await client
      .from('profiles')
      .update({
        display_name: params.displayName.trim(),
        avatar_url: params.avatarUrl?.trim() || null,
        role: params.role,
        updated_at: now,
      })
      .eq('id', userId)

    if (profErr) {
      return { success: false, error: formatCmsError(profErr) }
    }

    const safeStreak = Math.max(0, Math.round(params.streak || 0))
    const safeMinutes = Math.max(1, Math.round(params.targetMinutes || 15))
    const safeLessons = Math.max(1, Math.round(params.targetLessons || 3))

    const { data: existingSched } = await client
      .from('user_schedules')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (existingSched) {
      const { error: schedErr } = await client
        .from('user_schedules')
        .update({
          streak: safeStreak,
          target_minutes: safeMinutes,
          target_lessons: safeLessons,
          updated_at: now,
        })
        .eq('user_id', userId)

      if (schedErr) {
        return { success: false, error: formatCmsError(schedErr) }
      }
    } else {
      const { error: schedInsErr } = await client.from('user_schedules').insert({
        user_id: userId,
        streak: safeStreak,
        last_active_date: '',
        target_minutes: safeMinutes,
        target_lessons: safeLessons,
        history: {},
        updated_at: now,
      })
      if (schedInsErr) {
        return { success: false, error: formatCmsError(schedInsErr) }
      }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminDeleteUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { error: rpcErr } = await client.rpc('admin_delete_user', {
      target_user_id: userId,
    })

    if (!rpcErr) {
      return { success: true }
    }

    const code = String(rpcErr?.code || '')
    const lower = String(rpcErr?.message || '').toLowerCase()
    const isMissingFn =
      code === '42883' ||
      code === 'PGRST202' ||
      lower.includes('could not find the function') ||
      (lower.includes('function') && lower.includes('does not exist'))

    if (!isMissingFn) {
      return { success: false, error: formatCmsError(rpcErr) }
    }

    // Fallback cleanup if admin_delete_user RPC has not been installed yet
    await Promise.all([
      client.from('study_recordings').delete().eq('user_id', userId),
      client.from('custom_lessons').delete().eq('user_id', userId),
      client.from('user_schedules').delete().eq('user_id', userId),
      client.from('user_settings').delete().eq('user_id', userId),
    ])

    const { data: deletedRows, error: profDelErr } = await client
      .from('profiles')
      .delete()
      .eq('id', userId)
      .select('id')

    if (profDelErr || !deletedRows || deletedRows.length === 0) {
      return {
        success: false,
        error:
          'Chưa thể xóa hoàn toàn tài khoản vì thiếu hàm admin_delete_user / quyền DELETE trên Supabase. Hãy chạy lại file supabase/schema.sql trong SQL Editor.',
      }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminResetUserProgress(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { data: existing } = await client
      .from('user_schedules')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (!existing) {
      return { success: true }
    }

    const { error } = await client
      .from('user_schedules')
      .update({
        streak: 0,
        last_active_date: '',
        history: {},
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    if (error) return { success: false, error: formatCmsError(error) }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminDeleteUserRecording(
  recordingId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { error } = await client
      .from('study_recordings')
      .delete()
      .eq('id', recordingId)
      .eq('user_id', userId)

    if (error) return { success: false, error: formatCmsError(error) }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}

export async function adminSendPasswordReset(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase.' }

  try {
    const { error } = await client.auth.resetPasswordForEmail(email.trim())
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: formatCmsError(err) }
  }
}
