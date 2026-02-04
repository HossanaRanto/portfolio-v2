ALTER TABLE projects ADD COLUMN gallery text[] DEFAULT '{}';

-- Update storage policy to allow larger files (This is conceptual, policies are usually row level security for access, size limits are bucket config, but we can document it or try to insert a config if there was a config table)
-- Supabase Storage 'buckets' table is in 'storage' schema. 
-- We cannot easily change the max file size via SQL on the storage schema directly without admin privileges often reserved for the dashboard.
-- However, we can ensure RLS allows uploads.

-- Assuming 'projects' bucket exists or we adhere to a convention.
-- If we need to create a bucket for gallery:
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'gallery' );

create policy "Authenticated User Upload"
  on storage.objects for insert
  with check ( bucket_id = 'gallery' and auth.role() = 'authenticated' );
