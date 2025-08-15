-- Step 1: Create the table for blog posts
-- This table will store all the data related to your blog posts.
CREATE TABLE public.dpost (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    "imageUrl" TEXT,
    category TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT
);
COMMENT ON TABLE public.dpost IS 'Stores blog post data.';

-- Step 2: Set up the storage bucket for images
-- This creates a dedicated bucket to store images for your blog posts.
-- Note: You might need to run this via the Supabase Dashboard if you encounter issues.
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO NOTHING;
COMMENT ON BUCKET blog_images IS 'Stores images for blog posts.';


-- Step 3: Enable Row Level Security (RLS) for the posts table
-- This is a crucial security step that ensures your data access policies are enforced.
ALTER TABLE public.dpost ENABLE ROW LEVEL SECURITY;


-- Step 4: Create security policies for the 'dpost' table
-- These policies control who can read, create, update, or delete posts.

-- Policy 1: Allow public read access for everyone
DROP POLICY IF EXISTS "Allow public read access" ON public.dpost;
CREATE POLICY "Allow public read access" ON public.dpost FOR SELECT USING (true);

-- Policy 2: Allow authenticated users to insert new posts
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.dpost;
CREATE POLICY "Allow authenticated insert" ON public.dpost FOR INSERT TO authenticated WITH CHECK (true);

-- Policy 3: Allow authenticated users to update their own posts
DROP POLICY IF EXISTS "Allow authenticated update" ON public.dpost;
CREATE POLICY "Allow authenticated update" ON public.dpost FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Policy 4: Allow authenticated users to delete their own posts
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.dpost;
CREATE POLICY "Allow authenticated delete" ON public.dpost FOR DELETE TO authenticated USING (true);


-- Step 5: Create security policies for the 'blog_images' storage bucket
-- These policies control who can upload, view, update, or delete images.

-- Policy 1: Allow public read access to images
DROP POLICY IF EXISTS "Allow public read access on blog_images" ON storage.objects;
CREATE POLICY "Allow public read access on blog_images" ON storage.objects FOR SELECT USING (bucket_id = 'blog_images');

-- Policy 2: Allow authenticated users to upload images
DROP POLICY IF EXISTS "Allow authenticated uploads to blog_images" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to blog_images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog_images');

-- Policy 3: Allow authenticated users to update their own images
DROP POLICY IF EXISTS "Allow authenticated updates on blog_images" ON storage.objects;
CREATE POLICY "Allow authenticated updates on blog_images" ON storage.objects FOR UPDATE TO authenticated USING (auth.uid() = owner) WITH CHECK (bucket_id = 'blog_images');

-- Policy 4: Allow authenticated users to delete their own images
DROP POLICY IF EXISTS "Allow authenticated deletes on blog_images" ON storage.objects;
CREATE POLICY "Allow authenticated deletes on blog_images" ON storage.objects FOR DELETE TO authenticated USING (auth.uid() = owner);
