-- Drop existing table and policies to ensure a clean slate
DROP POLICY IF EXISTS "Public posts are viewable by everyone." ON public.posts;
DROP POLICY IF EXISTS "Users can insert their own posts." ON public.posts;
DROP TABLE IF EXISTS public.posts;

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
    slug text NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_slug_key UNIQUE (slug)
);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Add policies for public access and authenticated inserts
CREATE POLICY "Public posts are viewable by everyone." ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own posts." ON public.posts FOR INSERT WITH CHECK (true);

-- Create storage bucket for blog images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO NOTHING;

-- Add policy for public read access to blog_images
CREATE POLICY "Blog images are publicly accessible." ON storage.objects
FOR SELECT USING (bucket_id = 'blog_images');

-- Add policy for authenticated users to upload to blog_images
CREATE POLICY "Authenticated users can upload images." ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog_images' AND auth.role() = 'authenticated');
