-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text not null,
  content text,
  cover_image text,
  images text[],
  technologies text[] default '{}',
  demo_url text,
  repo_url text,
  status text check (status in ('IN_PROGRESS', 'COMPLETED', 'ARCHIVED')) default 'IN_PROGRESS',
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Experiences Table
create table if not exists public.experiences (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  company text not null,
  company_url text,
  location text,
  start_date date not null,
  end_date date,
  description text[] default '{}',
  logo text,
  technologies text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages Table
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Storage bucket for projects (Ensure storage schema exists or handle via UI)
-- insert into storage.buckets (id, name, public) 
-- values ('projects', 'projects', true)
-- on conflict (id) do nothing;

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.messages enable row level security;

-- Policies

-- Projects: Everyone can view, Only Authenticated can edit
create policy "Public projects are viewable by everyone" 
  on public.projects for select using (true);

create policy "Authenticated users can insert projects" 
  on public.projects for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects" 
  on public.projects for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects" 
  on public.projects for delete using (auth.role() = 'authenticated');

-- Experiences: Everyone can view, Only Authenticated can edit
create policy "Public experiences are viewable by everyone" 
  on public.experiences for select using (true);

create policy "Authenticated users can insert experiences" 
  on public.experiences for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update experiences" 
  on public.experiences for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete experiences" 
  on public.experiences for delete using (auth.role() = 'authenticated');

-- Messages: Anyone can insert, Only Authenticated can view/edit
create policy "Anyone can insert messages" 
  on public.messages for insert with check (true);

create policy "Authenticated users can view messages" 
  on public.messages for select using (auth.role() = 'authenticated');

create policy "Authenticated users can update messages" 
  on public.messages for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete messages" 
  on public.messages for delete using (auth.role() = 'authenticated');
