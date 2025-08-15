-- Create the posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  "imageUrl" TEXT,
  category TEXT,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "seoKeywords" TEXT
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies for the "posts" table
-- 1. Allow public read access to everyone
CREATE POLICY "Allow public read access" ON public.posts
  FOR SELECT USING (true);

-- 2. Allow logged-in users to insert their own posts
CREATE POLICY "Allow authenticated insert" ON public.posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow users to update their own posts
CREATE POLICY "Allow individual update" ON public.posts
  FOR UPDATE USING (auth.role() = 'authenticated');
  
-- 4. Allow users to delete their own posts
CREATE POLICY "Allow individual delete" ON public.posts
  FOR DELETE USING (auth.role() = 'authenticated');
