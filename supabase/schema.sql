-- Create the posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title text,
    description text,
    "imageUrl" text,
    content text,
    category text,
    "seoTitle" text,
    "seoDescription" text,
    "seoKeywords" text
);

-- Enable Row Level Security for the posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating them to ensure idempotency
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.posts;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.posts
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert" ON public.posts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.role() = 'authenticated');
    
-- Create a storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies before creating them
DROP POLICY IF EXISTS "Allow public read access to blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to insert into blog images" ON storage.objects;

-- Create policy for public read access to blog_images
CREATE POLICY "Allow public read access to blog images" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'blog_images');

-- Create policy for authenticated users to insert into blog_images
CREATE POLICY "Allow authenticated users to insert into blog images" ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'blog_images' AND auth.role() = 'authenticated');
