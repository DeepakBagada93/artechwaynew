-- supabase/migrations/YYYYMMDDHHMMSS_add-posts-and-storage-rls.sql

-- Enable Row Level Security for the posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to prevent conflicts
DROP POLICY IF EXISTS "Allow public read access" ON posts;
DROP POLICY IF EXISTS "Allow all access for anonymous users" ON posts;
DROP POLICY IF EXISTS "Allow insert for all users" ON posts;
DROP POLICY IF EXISTS "Allow anonymous select access" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous insert access" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous update access" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous delete access" ON storage.objects;

-- Create policies for the 'posts' table
CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow insert for all users" ON posts FOR INSERT WITH CHECK (true);

-- Create policies for Supabase storage to allow public access to images
CREATE POLICY "Allow anonymous select access" ON storage.objects FOR SELECT USING (bucket_id = 'blog_images');
CREATE POLICY "Allow anonymous insert access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog_images');
CREATE POLICY "Allow anonymous update access" ON storage.objects FOR UPDATE USING (bucket_id = 'blog_images');
CREATE POLICY "Allow anonymous delete access" ON storage.objects FOR DELETE USING (bucket_id = 'blog_images');
