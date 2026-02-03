create table public.services (
  id uuid not null default gen_random_uuid (),
  title text not null,
  description text not null,
  icon text not null,
  language text not null default 'en'::text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint services_pkey primary key (id)
);

alter table public.services enable row level security;

create policy "Enable read access for all users" on public.services
  for select using (true);

create policy "Enable insert for authenticated users only" on public.services
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.services
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.services
  for delete using (auth.role() = 'authenticated');
