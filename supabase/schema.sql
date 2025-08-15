--
-- RLS and Table schema for 'posts'
--
-- 1. Clean up old table and policies
DROP TABLE IF EXISTS public.posts;

-- 2. Create the posts table
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
COMMENT ON TABLE public.posts IS 'Stores blog posts for the application.';

-- 3. Enable Row Level Security (RLS) on the posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for the posts table
-- Policy for public read access
CREATE POLICY "Allow public read access" 
ON public.posts 
FOR SELECT 
USING (true);

-- Policy for allowing authenticated users to insert, update, and delete
CREATE POLICY "Allow authenticated users full access" 
ON public.posts 
FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');


--
-- Storage Bucket and Policies for 'blog_images'
--
-- 1. Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog_images', 'blog_images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

COMMENT ON BUCKET blog_images IS 'Stores images for blog posts.';

-- 2. Clean up old policies for the bucket
DROP POLICY IF EXISTS "Allow public read access to blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload to blog images" ON storage.objects;

-- 3. Create policies for the blog_images bucket
-- Policy for public read access
CREATE POLICY "Allow public read access to blog images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog_images');

-- Policy for authenticated users to upload, update, and delete their own images
CREATE POLICY "Allow authenticated users to upload to blog images"
ON storage.objects
FOR ALL
USING (auth.role() = 'authenticated' AND bucket_id = 'blog_images')
WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'blog_images');
