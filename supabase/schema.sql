--
-- comprehensive supabase schema
--
-- drop existing policies on the posts table if they exist
drop policy if exists "allow public read access" on public.posts;
drop policy if exists "allow authenticated users to manage posts" on public.posts;
-- drop the posts table if it exists
drop table if exists public.posts;
-- create the posts table
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  content text,
  "imageUrl" text,
  category text,
  "seoTitle" text,
  "seoDescription" text,
  "seoKeywords" text
);
comment on table public.posts is 'stores blog posts for the application.';
-- enable row level security (rls) on the posts table
alter table public.posts enable row level security;
-- create policies for the posts table
create policy "allow public read access" on public.posts for
select
  using (true);
create policy "allow authenticated users to manage posts" on public.posts for all using (auth.role() = 'authenticated');
--
-- storage setup
--
-- drop existing storage bucket policies if they exist
drop policy if exists "allow public read access for blog images" on storage.objects;
drop policy if exists "allow authenticated users to upload blog images" on storage.objects;
-- drop the storage bucket if it exists (requires storage admin privileges)
-- note: this might need to be done manually in the supabase dashboard if the user running the script doesn't have permissions.
-- select storage.delete_bucket('blog_images');
-- create the storage bucket
-- insert into storage.buckets (id, name, public) values ('blog_images', 'blog_images', true);
-- create policies for the blog_images storage bucket
create policy "allow public read access for blog images" on storage.objects for
select
  using (bucket_id = 'blog_images');
create policy "allow authenticated users to upload blog images" on storage.objects for insert with check (
  bucket_id = 'blog_images'
  and auth.role() = 'authenticated'
);
comment on policy "allow authenticated users to upload blog images" on storage.objects is 'allows authenticated users to upload images to the blog_images bucket.';
