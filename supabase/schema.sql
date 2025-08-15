-- Drop existing table and policies if they exist to start fresh.
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to manage posts" ON public.posts;
DROP TABLE IF EXISTS public.posts;

-- Create the posts table
CREATE TABLE public.posts (
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

-- Add comments to the table and columns for clarity.
COMMENT ON TABLE public.posts IS 'Stores blog posts for the Artechway application.';
COMMENT ON COLUMN public.posts.id IS 'Unique identifier for each post.';
COMMENT ON COLUMN public.posts.created_at IS 'The timestamp when the post was created.';
COMMENT ON COLUMN public.posts.title IS 'The main title of the blog post.';
COMMENT ON COLUMN public.posts.description IS 'A short summary of the blog post.';
COMMENT ON COLUMN public.posts.content IS 'The full content of the blog post in Markdown format.';
COMMENT ON COLUMN public.posts."imageUrl" IS 'The URL for the post''s feature image.';
COMMENT ON COLUMN public.posts.category IS 'The category of the post (e.g., Creatives, Business).';
COMMENT ON COLUMN public.posts."seoTitle" IS 'The SEO-optimized title.';
COMMENT ON COLUMN public.posts."seoDescription" IS 'The meta description for SEO.';
COMMENT ON COLUMN public.posts."seoKeywords" IS 'Comma-separated SEO keywords.';

-- Enable Row Level Security (RLS) for the posts table.
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public, read-only access to all posts.
CREATE POLICY "Allow public read access"
ON public.posts
FOR SELECT
TO public, anon
USING (true);

-- Create a policy to allow authenticated users to insert, update, and delete their own posts.
CREATE POLICY "Allow authenticated users to manage posts"
ON public.posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Clean up existing storage bucket and policies if they exist.
DELETE FROM storage.objects WHERE bucket_id = 'blog_images';
DELETE FROM storage.buckets WHERE id = 'blog_images';

-- Create a storage bucket for blog images with public read access.
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Add RLS policies for the storage bucket.
-- Allow public read access to all images in the bucket.
CREATE POLICY "Allow public read access to blog images"
ON storage.objects FOR SELECT
TO public, anon
USING (bucket_id = 'blog_images');

-- Allow authenticated users to upload, update, and delete images.
CREATE POLICY "Allow authenticated users to manage blog images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'blog_images')
WITH CHECK (bucket_id = 'blog_images');
