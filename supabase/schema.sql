-- supabase/schema.sql

-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS public.posts CASCADE;

-- Create the posts table
CREATE TABLE public.posts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title text NOT NULL,
    description text,
    content text,
    "imageUrl" text,
    category text,
    "seoTitle" text,
    "seoDescription" text,
    "seoKeywords" text,
    CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.posts IS 'Stores blog posts for the Artechway application.';
COMMENT ON COLUMN public.posts.id IS 'Unique identifier for each post.';
COMMENT ON COLUMN public.posts.created_at IS 'The timestamp when the post was created.';
COMMENT ON COLUMN public.posts.title IS 'The main title of the blog post.';
COMMENT ON COLUMN public.posts.description IS 'A short summary of the blog post.';
COMMENT ON COLUMN public.posts.content IS 'The full content of the post in Markdown format.';
COMMENT ON COLUMN public.posts."imageUrl" IS 'The URL for the post''s feature image.';
COMMENT ON COLUMN public.posts.category IS 'The category of the post (e.g., Creatives, Business).';
COMMENT ON COLUMN public.posts."seoTitle" IS 'The SEO-optimized title.';
COMMENT ON COLUMN public.posts."seoDescription" IS 'The meta description for SEO.';
COMMENT ON COLUMN public.posts."seoKeywords" IS 'Comma-separated SEO keywords.';


-- Enable Row Level Security (RLS) for the posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to manage posts" ON public.posts;

-- Policy: Allow public read access
-- This policy allows anyone to read the posts.
CREATE POLICY "Allow public read access" ON public.posts
FOR SELECT USING (true);

-- Policy: Allow authenticated users to manage posts
-- This policy allows users who are logged in (authenticated) to insert, update, and delete their own posts.
CREATE POLICY "Allow authenticated users to manage posts" ON public.posts
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- STORAGE (for blog_images)

-- Drop existing policies on the storage bucket to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload blog images" ON storage.objects;

-- Policy: Allow public read access for blog images
CREATE POLICY "Allow public read access to blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog_images');

-- Policy: Allow authenticated users to upload blog images
CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog_images' AND auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update their own images
CREATE POLICY "Allow authenticated users to update blog images" ON storage.objects
FOR UPDATE USING (bucket_id = 'blog_images' AND auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete their own images
CREATE POLICY "Allow authenticated users to delete blog images" ON storage.objects
FOR DELETE USING (bucket_id = 'blog_images' AND auth.role() = 'authenticated');
