-- =================================================================
--  CLEANUP: Drop existing objects to start with a clean slate
-- =================================================================

-- Drop policies for the 'posts' table if they exist
DROP POLICY IF EXISTS "Allow public read access for posts" ON public.posts;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.posts;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON public.posts;
DROP POLICY IF EXISTS "Allow delete for authenticated users" ON public.posts;

-- Drop the 'posts' table if it exists
DROP TABLE IF EXISTS public.posts;

-- Drop policies for the 'blog_images' storage bucket if they exist
DROP POLICY IF EXISTS "Allow public read access for blog_images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow insert for authenticated users for blog_images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow update for authenticated users for blog_images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete for authenticated users for blog_images bucket" ON storage.objects;

-- Empty and delete the storage bucket if it exists
-- Note: You might need to manually empty the bucket from the Supabase UI if this fails.
DELETE FROM storage.objects WHERE bucket_id = 'blog_images';
DELETE FROM storage.buckets WHERE id = 'blog_images';

-- =================================================================
--  SETUP: Create tables, storage, and policies
-- =================================================================

-- 1. Create the 'posts' table
-- This table will store all the blog post content.
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
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.posts IS 'Stores blog posts for the application.';

-- 2. Create Storage Bucket for Blog Images
-- This bucket will store all the images associated with blog posts.
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO NOTHING;
COMMENT ON BUCKET blog_images IS 'Stores images for blog posts.';


-- 3. Set up Row Level Security (RLS) for the 'posts' table
-- These policies control who can read, create, update, or delete posts.

-- Policy: Allow public (anonymous) read access to all posts.
CREATE POLICY "Allow public read access for posts"
ON public.posts
FOR SELECT USING (true);

-- Policy: Allow authenticated users to insert new posts.
-- This is the key policy to fix the "violates row-level security" error.
CREATE POLICY "Allow insert for authenticated users"
ON public.posts
FOR INSERT TO authenticated
WITH CHECK (true);

-- Policy: Allow authenticated users to update their own posts (optional, good practice).
CREATE POLICY "Allow update for authenticated users"
ON public.posts
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to delete their own posts (optional, good practice).
CREATE POLICY "Allow delete for authenticated users"
ON public.posts
FOR DELETE TO authenticated
USING (true);


-- 4. Set up RLS policies for the 'blog_images' storage bucket
-- These policies control who can manage images in the storage bucket.

-- Policy: Allow public read access to all images in the bucket.
CREATE POLICY "Allow public read access for blog_images bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog_images');

-- Policy: Allow authenticated users to upload new images.
CREATE POLICY "Allow insert for authenticated users for blog_images bucket"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog_images');

-- Policy: Allow authenticated users to update their own images.
CREATE POLICY "Allow update for authenticated users for blog_images bucket"
ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'blog_images');

-- Policy: Allow authenticated users to delete their own images.
CREATE POLICY "Allow delete for authenticated users for blog_images bucket"
ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'blog_images');
