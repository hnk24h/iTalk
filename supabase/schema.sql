-- ==============================================================================
-- iTalk Database Schema & CMS Admin Setup for Supabase (Idempotent & Safe)
-- Hướng dẫn: Mở SQL Editor trên Supabase -> Tạo tab mới (New Query) -> Dán toàn bộ và bấm Run
-- ==============================================================================

-- 1. Kích hoạt Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bảng Hồ sơ Người dùng (Profiles) + Phân quyền Admin/User
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_role_check'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Helper kiểm tra quyền Admin (SECURITY DEFINER để tránh đệ quy RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Ngăn user thường tự nâng quyền role qua REST API
CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()
RETURNS trigger AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role
     AND auth.role() = 'authenticated'
     AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can change user roles';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_prevent_self_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_self_role_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_escalation();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles select own or admin" ON public.profiles;
CREATE POLICY "Profiles select own or admin"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Profiles insert own" ON public.profiles;
DROP POLICY IF EXISTS "Profiles insert own or admin" ON public.profiles;
CREATE POLICY "Profiles insert own or admin"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Profiles update own or admin" ON public.profiles;
CREATE POLICY "Profiles update own or admin"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Profiles delete admin only" ON public.profiles;
CREATE POLICY "Profiles delete admin only"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (public.is_admin() AND auth.uid() <> id);

-- RPC xóa hoàn toàn tài khoản + dữ liệu học tập bởi Admin
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id UUID)
RETURNS void AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can delete users';
  END IF;
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot delete your own admin account';
  END IF;

  DELETE FROM public.study_recordings WHERE user_id = target_user_id::text;
  DELETE FROM public.custom_lessons WHERE user_id = target_user_id::text;
  DELETE FROM public.user_schedules WHERE user_id = target_user_id::text;
  DELETE FROM public.user_settings WHERE user_id = target_user_id::text;
  DELETE FROM public.profiles WHERE id = target_user_id;
  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

REVOKE ALL ON FUNCTION public.admin_delete_user(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_user(UUID) TO authenticated;

-- 3. Bảng Cài đặt Người dùng (Settings)
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id TEXT NOT NULL PRIMARY KEY,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on user_settings" ON public.user_settings;
DROP POLICY IF EXISTS "User settings own, guest, or admin" ON public.user_settings;
CREATE POLICY "User settings own, guest, or admin"
  ON public.user_settings FOR ALL
  TO anon, authenticated
  USING (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin())
  WITH CHECK (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin());

-- 4. Bảng Lịch trình & Tiến độ Học tập (Schedules)
CREATE TABLE IF NOT EXISTS public.user_schedules (
  user_id TEXT NOT NULL PRIMARY KEY,
  streak INT DEFAULT 0,
  last_active_date TEXT,
  target_minutes INT DEFAULT 15,
  target_lessons INT DEFAULT 3,
  history JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_schedules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on user_schedules" ON public.user_schedules;
DROP POLICY IF EXISTS "User schedules own, guest, or admin" ON public.user_schedules;
CREATE POLICY "User schedules own, guest, or admin"
  ON public.user_schedules FOR ALL
  TO anon, authenticated
  USING (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin())
  WITH CHECK (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin());

-- 5. Bảng Bài học Cá nhân Tự tạo & Import (Custom Lessons)
CREATE TABLE IF NOT EXISTS public.custom_lessons (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'ja',
  level TEXT NOT NULL DEFAULT 'N3',
  category TEXT DEFAULT 'Tự tạo',
  description TEXT,
  sentences JSONB NOT NULL DEFAULT '[]'::jsonb,
  original_audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, user_id)
);

ALTER TABLE public.custom_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on custom_lessons" ON public.custom_lessons;
DROP POLICY IF EXISTS "Custom lessons own, guest, or admin" ON public.custom_lessons;
CREATE POLICY "Custom lessons own, guest, or admin"
  ON public.custom_lessons FOR ALL
  TO anon, authenticated
  USING (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin())
  WITH CHECK (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin());

-- 6. Bảng Lịch sử Thu âm Shadowing (Recordings)
CREATE TABLE IF NOT EXISTS public.study_recordings (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  lesson_id TEXT,
  lesson_title TEXT NOT NULL,
  language TEXT NOT NULL,
  duration_sec INT NOT NULL DEFAULT 0,
  score NUMERIC(5, 2),
  type TEXT NOT NULL DEFAULT 'audio',
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, user_id)
);

ALTER TABLE public.study_recordings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on study_recordings" ON public.study_recordings;
DROP POLICY IF EXISTS "Study recordings own, guest, or admin" ON public.study_recordings;
CREATE POLICY "Study recordings own, guest, or admin"
  ON public.study_recordings FOR ALL
  TO anon, authenticated
  USING (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin())
  WITH CHECK (user_id = auth.uid()::text OR user_id LIKE 'guest_%' OR public.is_admin());

-- 7. Bảng CMS: Bài học Shadowing hệ thống (CMS Lessons)
CREATE TABLE IF NOT EXISTS public.cms_lessons (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('ja', 'zh', 'vi')),
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Chung',
  description TEXT DEFAULT '',
  sentences JSONB NOT NULL DEFAULT '[]'::jsonb,
  audio_source_type TEXT NOT NULL DEFAULT 'tts' CHECK (audio_source_type IN ('tts', 'audio-file', 'video-file')),
  media_type TEXT CHECK (media_type IN ('audio', 'video')),
  original_audio_url TEXT,
  video_url TEXT,
  original_audio_file_name TEXT,
  audio_duration NUMERIC,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cms_lessons_lang_sort
  ON public.cms_lessons (language, sort_order, updated_at DESC);

ALTER TABLE public.cms_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "CMS lessons read published or admin" ON public.cms_lessons;
CREATE POLICY "CMS lessons read published or admin"
  ON public.cms_lessons FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "CMS lessons insert admin only" ON public.cms_lessons;
CREATE POLICY "CMS lessons insert admin only"
  ON public.cms_lessons FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "CMS lessons update admin only" ON public.cms_lessons;
CREATE POLICY "CMS lessons update admin only"
  ON public.cms_lessons FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "CMS lessons delete admin only" ON public.cms_lessons;
CREATE POLICY "CMS lessons delete admin only"
  ON public.cms_lessons FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 8. Bảng CMS: Mẫu Ngữ pháp & Ví dụ hệ thống (CMS Grammar Patterns)
CREATE TABLE IF NOT EXISTS public.cms_grammar_patterns (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('ja', 'zh', 'vi')),
  level TEXT NOT NULL,
  pattern TEXT NOT NULL,
  meaning TEXT NOT NULL,
  formula TEXT NOT NULL DEFAULT '',
  note TEXT,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cms_grammar_lang_sort
  ON public.cms_grammar_patterns (language, sort_order, updated_at DESC);

ALTER TABLE public.cms_grammar_patterns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "CMS grammar read published or admin" ON public.cms_grammar_patterns;
CREATE POLICY "CMS grammar read published or admin"
  ON public.cms_grammar_patterns FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "CMS grammar insert admin only" ON public.cms_grammar_patterns;
CREATE POLICY "CMS grammar insert admin only"
  ON public.cms_grammar_patterns FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "CMS grammar update admin only" ON public.cms_grammar_patterns;
CREATE POLICY "CMS grammar update admin only"
  ON public.cms_grammar_patterns FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "CMS grammar delete admin only" ON public.cms_grammar_patterns;
CREATE POLICY "CMS grammar delete admin only"
  ON public.cms_grammar_patterns FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 9. Tự động thêm Profile khi đăng ký tài khoản mới + Backfill user cũ
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'user'
  )
  ON CONFLICT (id) DO UPDATE
    SET email = COALESCE(EXCLUDED.email, public.profiles.email),
        updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.profiles (id, email, display_name, role)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  'user'
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- 10. Khởi tạo Storage Bucket cho Video & Audio người học
INSERT INTO storage.buckets (id, name, public)
VALUES ('italk-recordings', 'italk-recordings', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Allow all uploads to recordings" ON storage.objects;
CREATE POLICY "Allow all uploads to recordings"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'italk-recordings');

DROP POLICY IF EXISTS "Allow all reads for recordings" ON storage.objects;
CREATE POLICY "Allow all reads for recordings"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'italk-recordings');

DROP POLICY IF EXISTS "Allow all deletes for recordings" ON storage.objects;
CREATE POLICY "Allow all deletes for recordings"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'italk-recordings');

-- 11. Khởi tạo Storage Bucket riêng cho Media bài học CMS (Audio/Video gốc)
INSERT INTO storage.buckets (id, name, public)
VALUES ('italk-cms-media', 'italk-cms-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "CMS media public read" ON storage.objects;
CREATE POLICY "CMS media public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'italk-cms-media');

DROP POLICY IF EXISTS "CMS media admin upload" ON storage.objects;
CREATE POLICY "CMS media admin upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'italk-cms-media' AND public.is_admin());

DROP POLICY IF EXISTS "CMS media admin update" ON storage.objects;
CREATE POLICY "CMS media admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'italk-cms-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'italk-cms-media' AND public.is_admin());

DROP POLICY IF EXISTS "CMS media admin delete" ON storage.objects;
CREATE POLICY "CMS media admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'italk-cms-media' AND public.is_admin());

-- ==============================================================================
-- HƯỚNG DẪN CẤP QUYỀN ADMIN ĐẦU TIÊN:
-- Sau khi đăng ký / đăng nhập tài khoản trên iTalk, chạy lệnh dưới đây trong SQL Editor
-- (nhớ thay đúng email tài khoản của bạn):
--
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
-- ==============================================================================
