-- Drop existing objects if they exist
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP BUCKET IF EXISTS blog_images;

DROP POLICY IF EXISTS "Allow full access for authenticated users" ON public.dpost;
DROP POLICY IF EXISTS "Allow public read access" ON public.dpost;
DROP TABLE IF EXISTS public.dpost;

-- Create the dpost table
CREATE TABLE public.dpost (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    "imageUrl" TEXT,
    category TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments to the table and columns
COMMENT ON TABLE public.dpost IS 'Stores blog posts for the Artechway application.';
COMMENT ON COLUMN public.dpost.id IS 'Unique identifier for each post.';
COMMENT ON COLUMN public.dpost.title IS 'The title of the blog post.';
COMMENT ON COLUMN public.dpost.created_at IS 'The timestamp when the post was created.';

-- Enable Row Level Security (RLS)
ALTER TABLE public.dpost ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the dpost table
CREATE POLICY "Allow public read access" ON public.dpost
    FOR SELECT USING (true);

CREATE POLICY "Allow full access for authenticated users" ON public.dpost
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create the storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog_images', 'blog_images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Add RLS policies for the storage bucket
CREATE POLICY "Allow public read access" ON storage.objects
    FOR SELECT USING (bucket_id = 'blog_images');

CREATE POLICY "Allow authenticated uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'blog_images' AND auth.role() = 'authenticated');
