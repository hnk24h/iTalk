-- ==============================================================================
-- iTalk Database Schema for Supabase
-- Run this script in the Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
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

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. User Settings Table
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own settings"
  ON public.user_settings FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. User Schedule & Progress Tracking
CREATE TABLE IF NOT EXISTS public.user_schedules (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak INT DEFAULT 0,
  last_active_date TEXT,
  target_minutes INT DEFAULT 15,
  target_lessons INT DEFAULT 3,
  history JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own schedule"
  ON public.user_schedules FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Custom Lessons Table (Self-created or imported from transcripts)
CREATE TABLE IF NOT EXISTS public.custom_lessons (
  id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

CREATE POLICY "Users can manage own custom lessons"
  ON public.custom_lessons FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Shadowing Practice Recordings Metadata
CREATE TABLE IF NOT EXISTS public.study_recordings (
  id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

CREATE POLICY "Users can manage own recordings"
  ON public.study_recordings FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

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

-- 8. Storage bucket setup for Recordings & Audio files (Run if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('italk-recordings', 'italk-recordings', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for user uploads
CREATE POLICY "Allow authenticated users to upload recordings"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'italk-recordings' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Allow public read for recordings"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'italk-recordings');

CREATE POLICY "Allow authenticated users to delete own recordings"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'italk-recordings' AND (storage.foldername(name))[1] = auth.uid()::text);
