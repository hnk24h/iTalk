-- ==============================================================================
-- iTalk Database Schema for Supabase (Full Cloud Sync & Storage)
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles access policy" ON public.profiles;
CREATE POLICY "Profiles access policy"
  ON public.profiles FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 3. User Settings Table
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id TEXT NOT NULL PRIMARY KEY,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Settings access policy" ON public.user_settings;
CREATE POLICY "Settings access policy"
  ON public.user_settings FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 4. User Schedule & Progress Tracking
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

DROP POLICY IF EXISTS "Schedules access policy" ON public.user_schedules;
CREATE POLICY "Schedules access policy"
  ON public.user_schedules FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Custom Lessons Table
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

DROP POLICY IF EXISTS "Custom lessons access policy" ON public.custom_lessons;
CREATE POLICY "Custom lessons access policy"
  ON public.custom_lessons FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Shadowing Practice Recordings Metadata
CREATE TABLE IF NOT EXISTS public.study_recordings (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  lesson_id TEXT,
  lesson_title TEXT NOT NULL,
  language TEXT NOT NULL,
  duration_sec INT NOT NULL DEFAULT 0,
  score NUMERIC(5, 2),
  type TEXT NOT NULL DEFAULT 'audio', -- 'audio' | 'video'
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, user_id)
);

ALTER TABLE public.study_recordings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Recordings access policy" ON public.study_recordings;
CREATE POLICY "Recordings access policy"
  ON public.study_recordings FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Automatic profile creation on auth signup
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

-- 8. Storage bucket setup for Recordings & Video files
INSERT INTO storage.buckets (id, name, public)
VALUES ('italk-recordings', 'italk-recordings', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for uploads & reads (Both authenticated users & guest users)
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
