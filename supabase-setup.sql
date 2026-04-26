-- Run this query in your Supabase SQL Editor to create the post_summaries table

CREATE TABLE IF NOT EXISTS public.post_summaries (
  slug text PRIMARY KEY,
  summary text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.post_summaries ENABLE ROW LEVEL SECURITY;

-- Allow public read access to summaries
CREATE POLICY "Public summaries are viewable by everyone."
  ON public.post_summaries FOR SELECT
  USING ( true );

-- Allow inserts/updates (you might want to restrict this in a real production app to authenticated admin users only)
CREATE POLICY "Allow anon inserts for generating summaries."
  ON public.post_summaries FOR INSERT
  WITH CHECK ( true );

CREATE POLICY "Allow anon updates for generating summaries."
  ON public.post_summaries FOR UPDATE
  USING ( true )
  WITH CHECK ( true );
