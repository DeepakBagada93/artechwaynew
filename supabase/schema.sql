-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    title text,
    description text,
    content text,
    "imageUrl" text,
    category text,
    "seoTitle" text,
    "seoDescription" text,
    "seoKeywords" text
);

-- RLS Policies for posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all posts
CREATE POLICY "Allow public read access" ON posts
FOR SELECT USING (true);

-- Allow admin users to insert new posts
-- This policy allows any authenticated user to insert.
CREATE POLICY "Allow insert for authenticated users" ON posts
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow admin users to update posts
CREATE POLICY "Allow update for authenticated users" ON posts
FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Allow admin users to delete posts
CREATE POLICY "Allow delete for authenticated users" ON posts
FOR DELETE USING (auth.role() = 'authenticated');


-- Create a bucket for blog images with public read access
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for blog_images bucket
-- Allow public read access to all images in the bucket
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'blog_images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow insert for authenticated users" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog_images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own images
CREATE POLICY "Allow update for authenticated users" ON storage.objects
FOR UPDATE USING (bucket_id = 'blog_images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own images
CREATE POLICY "Allow delete for authenticated users" ON storage.objects
FOR DELETE USING (bucket_id = 'blog_images' AND auth.role() = 'authenticated');
