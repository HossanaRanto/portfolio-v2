-- Ensure 'projects' bucket exists
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

-- Ensure 'gallery' bucket exists (re-affirming)
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Policy for Public Read Access on 'projects'
create policy "Public Access Projects Select"
  on storage.objects for select
  using ( bucket_id = 'projects' );

-- Policy for Authenticated Insert on 'projects'
create policy "Authenticated Insert Projects"
  on storage.objects for insert
  with check ( bucket_id = 'projects' and auth.role() = 'authenticated' );

-- Policy for Authenticated Update on 'projects'
create policy "Authenticated Update Projects"
  on storage.objects for update
  using ( bucket_id = 'projects' and auth.role() = 'authenticated' );

-- Policy for Authenticated Delete on 'projects'
create policy "Authenticated Delete Projects"
  on storage.objects for delete
  using ( bucket_id = 'projects' and auth.role() = 'authenticated' );

-- (Repeat for gallery if not already fully covered or if we want to be sure)
create policy "Authenticated Insert Gallery"
  on storage.objects for insert
  with check ( bucket_id = 'gallery' and auth.role() = 'authenticated' );

create policy "Authenticated Delete Gallery"
  on storage.objects for delete
  using ( bucket_id = 'gallery' and auth.role() = 'authenticated' );
