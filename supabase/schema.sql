
-- Drop existing policies for the 'posts' table if they exist
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON public.posts;

-- Drop the 'posts' table if it exists to start fresh
DROP TABLE IF EXISTS public.posts;

-- Create the 'posts' table
CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    title text,
    description text,
    content text,
    "imageUrl" text,
    category text,
    "seoTitle" text,
    "seoDescription" text,
    "seoKeywords" text
);

-- Add a primary key to the 'posts' table
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);

-- Enable Row Level Security for the 'posts' table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies for the 'posts' table
CREATE POLICY "Allow public read access" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update" ON public.posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete" ON public.posts FOR DELETE TO authenticated USING (true);


-- Policies for 'blog_images' storage bucket
DROP POLICY IF EXISTS "Allow public read access for blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete blog images" ON storage.objects;

CREATE POLICY "Allow public read access for blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog_images');
CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog_images');
CREATE POLICY "Allow authenticated users to delete blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog_images');

    