-- Drop existing table and storage bucket to start fresh
DROP TABLE IF EXISTS public.posts CASCADE;
SELECT extensions.storage_try_delete_bucket('blog_images');

-- Create the storage bucket for blog images
SELECT extensions.storage_create_bucket('blog_images', '{"public":true}');

-- Create the posts table
CREATE TABLE public.posts (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT,
    description TEXT,
    content TEXT,
    "imageUrl" TEXT,
    category TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- Add comments to the table and columns
COMMENT ON TABLE public.posts IS 'Stores blog post data.';
COMMENT ON COLUMN public.posts.id IS 'Unique identifier for each post';
COMMENT ON COLUMN public.posts.created_at IS 'Timestamp of when the post was created';
COMMENT ON COLUMN public.posts.title IS 'The title of the blog post.';
COMMENT ON COLUMN public.posts.description IS 'A short summary of the post.';
COMMENT ON COLUMN public.posts.content IS 'The full content of the blog post in Markdown format.';
COMMENT ON COLUMN public.posts."imageUrl" IS 'URL of the header image for the post.';
COMMENT ON COLUMN public.posts.category IS 'Category of the blog post (e.g., "Creatives", "Business").';
COMMENT ON COLUMN public.posts."seoTitle" IS 'SEO-optimized title.';
COMMENT ON COLUMN public.posts."seoDescription" IS 'SEO-optimized meta description.';
COMMENT ON COLUMN public.posts."seoKeywords" IS 'Comma-separated list of SEO keywords.';

-- Enable Row Level Security (RLS) for the posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.posts;
DROP POLICY IF EXISTS "Allow owner to update" ON public.posts;
DROP POLICY IF EXISTS "Allow owner to delete" ON public.posts;

-- Create RLS policies for the posts table
CREATE POLICY "Allow public read access" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow owner to update" ON public.posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow owner to delete" ON public.posts FOR DELETE USING (auth.role() = 'authenticated');


-- RLS policies for storage bucket
DROP POLICY IF EXISTS "Allow public read access to blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload blog images" ON storage.objects;

CREATE POLICY "Allow public read access to blog images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'blog_images');
CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog_images');
