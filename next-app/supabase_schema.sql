-- CREATE TABLES FOR CMS

-- Table for Poetry
CREATE TABLE IF NOT EXISTS public.poems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    preview TEXT NOT NULL,
    content TEXT NOT NULL,
    insight TEXT,
    tags TEXT[],
    date TEXT,
    view_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for Thoughts
CREATE TABLE IF NOT EXISTS public.thoughts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for Quotes
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for Music Tracks
CREATE TABLE IF NOT EXISTS public.music_tracks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    src_url TEXT NOT NULL,
    lyrics_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SETUP ROW LEVEL SECURITY (RLS)
-- We only allow authenticated users to INSERT/UPDATE/DELETE.
-- Anyone (anon) can SELECT (read) the data for the frontend.

ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;

-- Read policies (Public)
CREATE POLICY "Allow public read-only access to poems" ON public.poems FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to thoughts" ON public.thoughts FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to quotes" ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to music_tracks" ON public.music_tracks FOR SELECT USING (true);

-- Write policies (Authenticated users only)
CREATE POLICY "Allow auth insert to poems" ON public.poems FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow auth update to poems" ON public.poems FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow auth delete to poems" ON public.poems FOR DELETE TO authenticated USING (true);

-- Public readers can increment a published poem's view count without receiving
-- permission to update any other poem fields.
CREATE OR REPLACE FUNCTION public.increment_poem_view(poem_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    updated_count BIGINT;
BEGIN
    UPDATE public.poems
    SET view_count = view_count + 1
    WHERE id = poem_id
      AND is_public = true
    RETURNING view_count INTO updated_count;

    RETURN COALESCE(updated_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.increment_poem_view(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_poem_view(UUID) TO anon, authenticated;

CREATE POLICY "Allow auth insert to thoughts" ON public.thoughts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow auth update to thoughts" ON public.thoughts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow auth delete to thoughts" ON public.thoughts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow auth insert to quotes" ON public.quotes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow auth update to quotes" ON public.quotes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow auth delete to quotes" ON public.quotes FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow auth insert to music_tracks" ON public.music_tracks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow auth update to music_tracks" ON public.music_tracks FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow auth delete to music_tracks" ON public.music_tracks FOR DELETE TO authenticated USING (true);

-- STORAGE BUCKETS
-- You also need to manually create 3 storage buckets in the Supabase Dashboard:
-- 1. "covers" (Public)
-- 2. "audio" (Public)
-- 3. "lyrics" (Public)
