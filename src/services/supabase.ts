import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { Lesson, RecordingItem, UserSchedule } from '../types'
import { AppSettings, loadSchedule, loadRecordings, loadCustomLessons, loadSettings, saveSchedule, saveCustomLesson } from './storage'

const SUPABASE_CONFIG_KEY = 'italk_supabase_config'

export interface SupabaseConfig {
  url: string
  anonKey: string
}

export function getSupabaseConfig(): SupabaseConfig {
  let url = ''
  let anonKey = ''

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(SUPABASE_CONFIG_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        url = parsed.url || ''
        anonKey = parsed.anonKey || ''
      }
    } catch {}
  }

  // Fallback to Vite environment variables if not set in localStorage
  if (!url) {
    url = (import.meta as any).env?.VITE_SUPABASE_URL || ''
  }
  if (!anonKey) {
    anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ''
  }

  return { url: url.trim(), anonKey: anonKey.trim() }
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config))
    // Reset instance so next call uses updated keys
    supabaseInstance = null
  }
}

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance

  const { url, anonKey } = getSupabaseConfig()
  if (!url || !anonKey) return null

  try {
    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
    return supabaseInstance
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
    return null
  }
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig()
  return Boolean(url && anonKey)
}

export function getEffectiveUserId(user: User | null): string {
  if (user?.id) return user.id
  if (typeof window === 'undefined') return 'guest_default'
  try {
    let guestId = localStorage.getItem('italk_guest_device_id')
    if (!guestId) {
      guestId = 'guest_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
      localStorage.setItem('italk_guest_device_id', guestId)
    }
    return guestId
  } catch {
    return 'guest_default'
  }
}

// ==========================================
// Auth Services
// ==========================================

export async function getCurrentUser(): Promise<User | null> {
  const client = getSupabaseClient()
  if (!client) return null
  try {
    const { data: { user } } = await client.auth.getUser()
    return user
  } catch {
    return null
  }
}

export async function signUpWithEmail(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabaseClient()
  if (!client) return { user: null, error: 'Chưa cấu hình Supabase URL hoặc Anon Key' }

  try {
    const { data, error } = await client.auth.signUp({ email, password })
    if (error) return { user: null, error: error.message }
    return { user: data.user, error: null }
  } catch (err: any) {
    return { user: null, error: err.message || 'Lỗi khi đăng ký tài khoản' }
  }
}

export async function signInWithEmail(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabaseClient()
  if (!client) return { user: null, error: 'Chưa cấu hình Supabase URL hoặc Anon Key' }

  try {
    const { data, error } = await client.auth.signInWithPassword({ email, password })
    if (error) return { user: null, error: error.message }
    return { user: data.user, error: null }
  } catch (err: any) {
    return { user: null, error: err.message || 'Lỗi khi đăng nhập' }
  }
}

export async function signOutSupabase(): Promise<void> {
  const client = getSupabaseClient()
  if (client) {
    await client.auth.signOut()
  }
}

// ==========================================
// Cloud Sync Services
// ==========================================

/**
 * Sync current schedule to Supabase cloud
 */
export async function syncScheduleToCloud(schedule?: UserSchedule): Promise<boolean> {
  const client = getSupabaseClient()
  if (!client) return false

  const user = await getCurrentUser()
  const userId = getEffectiveUserId(user)
  const dataToSync = schedule || loadSchedule()

  try {
    const { error } = await client.from('user_schedules').upsert(
      {
        user_id: userId,
        streak: dataToSync.streak,
        last_active_date: dataToSync.lastActiveDate,
        target_minutes: dataToSync.dailyGoal.targetMinutes,
        target_lessons: dataToSync.dailyGoal.targetLessons,
        history: dataToSync.history,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    if (error) {
      console.warn('Sync schedule to cloud warning:', error)
      return false
    }
    return true
  } catch (err) {
    console.warn('Sync schedule error:', err)
    return false
  }
}

/**
 * Fetch schedule from cloud and merge with local
 */
export async function fetchScheduleFromCloud(): Promise<UserSchedule | null> {
  const client = getSupabaseClient()
  if (!client) return null

  const user = await getCurrentUser()
  const userId = getEffectiveUserId(user)

  try {
    const { data, error } = await client
      .from('user_schedules')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error || !data) return null

    const cloudSchedule: UserSchedule = {
      streak: data.streak || 0,
      lastActiveDate: data.last_active_date || '',
      dailyGoal: {
        targetMinutes: data.target_minutes || 15,
        targetLessons: data.target_lessons || 3,
      },
      history: data.history || {},
    }

    // Merge with local schedule
    const local = loadSchedule()
    const mergedHistory = { ...cloudSchedule.history, ...local.history }
    const merged: UserSchedule = {
      streak: Math.max(cloudSchedule.streak, local.streak),
      lastActiveDate: local.lastActiveDate || cloudSchedule.lastActiveDate,
      dailyGoal: local.dailyGoal || cloudSchedule.dailyGoal,
      history: mergedHistory,
    }

    saveSchedule(merged)
    return merged
  } catch {
    return null
  }
}

/**
 * Sync custom lessons to cloud
 */
export async function syncCustomLessonsToCloud(lessons?: Lesson[]): Promise<boolean> {
  const client = getSupabaseClient()
  if (!client) return false

  const user = await getCurrentUser()
  const userId = getEffectiveUserId(user)

  const list = lessons || loadCustomLessons()
  if (list.length === 0) return true

  try {
    const rows = list.map((l) => ({
      id: l.id,
      user_id: userId,
      title: l.title,
      language: l.language,
      level: l.level,
      category: l.category || 'Tự tạo',
      description: l.description || '',
      sentences: l.sentences,
      updated_at: new Date().toISOString(),
    }))

    const { error } = await client.from('custom_lessons').upsert(rows, { onConflict: 'id,user_id' })
    if (error) {
      console.warn('Sync custom lessons warning:', error)
      return false
    }
    return true
  } catch (err) {
    console.warn('Sync custom lessons error:', err)
    return false
  }
}

/**
 * Fetch custom lessons from cloud
 */
export async function fetchCustomLessonsFromCloud(): Promise<Lesson[] | null> {
  const client = getSupabaseClient()
  if (!client) return null

  const user = await getCurrentUser()
  const userId = getEffectiveUserId(user)

  try {
    const { data, error } = await client
      .from('custom_lessons')
      .select('*')
      .eq('user_id', userId)

    if (error || !data) return null

    const cloudLessons: Lesson[] = data.map((d: any) => ({
      id: d.id,
      title: d.title,
      language: d.language,
      level: d.level,
      category: d.category,
      description: d.description,
      sentences: d.sentences || [],
    }))

    // Save cloud lessons to local storage
    for (const l of cloudLessons) {
      saveCustomLesson(l)
    }

    return cloudLessons
  } catch {
    return null
  }
}

/**
 * Upload recording file to Supabase Storage bucket 'italk-recordings'
 */
export async function uploadRecordingToStorage(
  fileName: string,
  blob: Blob
): Promise<{ url: string | null; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { url: null, error: 'Chưa cấu hình Supabase URL hoặc Key' }

  const user = await getCurrentUser()
  const userId = getEffectiveUserId(user)

  try {
    const storagePath = `${userId}/${Date.now()}_${fileName}`
    const contentType = blob.type || (fileName.endsWith('.webm') ? 'video/webm' : 'audio/wav')

    const { error } = await client.storage
      .from('italk-recordings')
      .upload(storagePath, blob, {
        contentType,
        upsert: true,
      })

    if (error) {
      console.warn('Upload recording warning:', error)
      return { url: null, error: error.message }
    }

    const { data: publicUrlData } = client.storage
      .from('italk-recordings')
      .getPublicUrl(storagePath)

    return { url: publicUrlData?.publicUrl || null }
  } catch (err: any) {
    console.warn('Upload recording to Supabase error:', err)
    return { url: null, error: err.message || 'Lỗi upload file' }
  }
}

/**
 * Save recording metadata to cloud
 */
export async function saveRecordingMetadataToCloud(
  item: RecordingItem,
  cloudFileUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, error: 'Chưa cấu hình Supabase' }

  const user = await getCurrentUser()
  const userId = getEffectiveUserId(user)

  try {
    const { error } = await client.from('study_recordings').upsert(
      {
        id: item.id,
        user_id: userId,
        lesson_id: item.lessonId,
        lesson_title: item.lessonTitle,
        language: item.language,
        duration_sec: item.durationSec,
        score: item.score,
        type: item.type,
        file_url: cloudFileUrl || item.blobUrl,
        created_at: item.date,
      },
      { onConflict: 'id,user_id' }
    )

    if (error) {
      console.warn('Save recording metadata warning:', error)
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (err: any) {
    console.warn('Save recording error:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Perform a full 2-way sync across schedule, lessons and settings
 */
export async function performFullSync(): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient()
  if (!client) return { success: false, message: 'Chưa cấu hình Supabase' }

  try {
    // 1. Sync schedule
    await syncScheduleToCloud()
    await fetchScheduleFromCloud()

    // 2. Sync custom lessons
    await syncCustomLessonsToCloud()
    await fetchCustomLessonsFromCloud()

    return { success: true, message: 'Đồng bộ dữ liệu thành công với Cloud!' }
  } catch (err: any) {
    return { success: false, message: err.message || 'Lỗi trong quá trình đồng bộ' }
  }
}
