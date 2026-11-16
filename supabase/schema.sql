-- ==============================================================================
-- iTalk Database Schema for Supabase (Clean & Safe)
-- Hướng dẫn: Mở SQL Editor trên Supabase -> Tạo tab mới (New Query) -> Dán toàn bộ và bấm Run
-- ==============================================================================

-- 1. Kích hoạt Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bảng Hồ sơ Người dùng (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on profiles" ON public.profiles;
CREATE POLICY "Allow all on profiles"
  ON public.profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Bảng Cài đặt Người dùng (Settings)
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id TEXT NOT NULL PRIMARY KEY,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on user_settings" ON public.user_settings;
CREATE POLICY "Allow all on user_settings"
  ON public.user_settings FOR ALL
  USING (true)
  WITH CHECK (true);

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
CREATE POLICY "Allow all on user_schedules"
  ON public.user_schedules FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Bảng Bài học Tự tạo & Import (Custom Lessons)
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
CREATE POLICY "Allow all on custom_lessons"
  ON public.custom_lessons FOR ALL
  USING (true)
  WITH CHECK (true);

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
CREATE POLICY "Allow all on study_recordings"
  ON public.study_recordings FOR ALL
  USING (true)
  WITH CHECK (true);

-- 7. Tự động thêm Profile khi đăng ký tài khoản mới
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Khởi tạo Storage Bucket cho Video & Audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('italk-recordings', 'italk-recordings', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Phân quyền Storage cho phép tải lên và xem video
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
