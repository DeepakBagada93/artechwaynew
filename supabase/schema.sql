-- Create the posts table
CREATE TABLE if not exists posts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    title text,
    description text,
    "content" text,
    "imageUrl" text,
    category text,
    "seoTitle" text,
    "seoDescription" text,
    "seoKeywords" text
);

-- Create a bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog_images', 'blog_images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif'])
ON CONFLICT (id) DO NOTHING;


-- Set up Row Level Security (RLS)
-- Enable RLS for the posts table
alter table public.posts enable row level security;

-- Allow public read access to everyone
create policy "Allow public read access" on public.posts
as permissive for select
to public
using ( true );

-- Allow insert access to authenticated users
create policy "Allow insert for authenticated users" on public.posts
as permissive for insert
to authenticated
with check ( true );

-- Allow update access to authenticated users
create policy "Allow update for authenticated users" on public.posts
as permissive for update
to authenticated
using ( true );

-- Allow delete access to authenticated users
create policy "Allow delete for authenticated users" on public.posts
as permissive for delete
to authenticated
using ( true );

-- Set up policies for the storage bucket
-- Allow public read access to the blog_images bucket
CREATE POLICY "Public read access for blog_images" ON storage.objects
FOR SELECT
USING (bucket_id = 'blog_images');

-- Allow insert access to authenticated users for the blog_images bucket
CREATE POLICY "Allow insert for authenticated users on blog_images" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog_images');

-- Allow update access to authenticated users for the blog_images bucket
CREATE POLICY "Allow update for authenticated users on blog_images" ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'blog_images');

-- Allow delete access to authenticated users for the blog_images bucket
CREATE POLICY "Allow delete for authenticated users on blog_images" ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'blog_images');
