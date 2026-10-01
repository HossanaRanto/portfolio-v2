-- Skills (tech stack shown on the home page and the CV)
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Frontend',
  color text not null default '#6366f1',
  logo text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.skills enable row level security;

create policy "Public skills are viewable by everyone"
  on public.skills for select using (true);
create policy "Authenticated users can insert skills"
  on public.skills for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update skills"
  on public.skills for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete skills"
  on public.skills for delete using (auth.role() = 'authenticated');

insert into public.skills (name, category, color, logo, sort_order) values
  ('React',   'Frontend',  '#61DAFB', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 0),
  ('Next.js', 'Fullstack', '#ffffff', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', 1),
  ('Angular', 'Frontend',  '#DD0031', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', 2),
  ('NestJS',  'Backend',   '#E0234E', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg', 3),
  ('Express', 'Backend',   '#ffffff', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', 4),
  ('Flutter', 'Mobile',    '#02569B', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', 5),
  ('.NET',    'Backend',   '#512BD4', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg', 6);

-- Profile / CV content, one row per language
create table if not exists public.profiles (
  language text primary key,
  full_name text not null default '',
  headline text not null default '',
  summary text not null default '',
  location text,
  email text,
  phone text,
  website text,
  linkedin text,
  github text,
  education jsonb not null default '[]'::jsonb,
  spoken_languages jsonb not null default '[]'::jsonb,
  interests text[] not null default '{}',
  updated_at timestamp with time zone not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Authenticated users can insert profiles"
  on public.profiles for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update profiles"
  on public.profiles for update using (auth.role() = 'authenticated');

insert into public.profiles (language, full_name, headline, summary, website, education, interests) values
  ('en', 'Ranto Mahefaniaina', 'Full Stack Developer',
   'I am a web Full Stack Developer. I specialize in building reliable, scalable applications using React, Next.js, and Domain-Driven Design. I turn complex ideas into high-performing digital realities.',
   'https://ranto.mahefaniaina.com',
   '[{"degree":"Degree in Software Engineering","school":"Adventist University Zurcher, Madagascar","start":"","end":"","description":""}]'::jsonb,
   '{Volleyball,Chess}'),
  ('fr', 'Ranto Mahefaniaina', 'Développeur Full Stack',
   'Je suis Développeur Full Stack. Je me spécialise dans la création d''applications fiables et évolutives avec React, Next.js et la conception pilotée par le domaine. Je transforme des idées complexes en réalités numériques performantes.',
   'https://ranto.mahefaniaina.com',
   '[{"degree":"Diplôme en Génie Logiciel","school":"Université Adventiste Zurcher, Madagascar","start":"","end":"","description":""}]'::jsonb,
   '{Volley-ball,Échecs}')
on conflict (language) do nothing;

-- Site-wide settings (e.g. profile photo)
create table if not exists public.settings (
  key text primary key,
  value text,
  updated_at timestamp with time zone not null default now()
);

alter table public.settings enable row level security;

create policy "Public settings are viewable by everyone"
  on public.settings for select using (true);
create policy "Authenticated users can insert settings"
  on public.settings for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update settings"
  on public.settings for update using (auth.role() = 'authenticated');
