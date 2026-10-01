-- Custom SEO tags; merged with each item's stack (technologies) at render time
alter table public.projects add column if not exists tags text[] not null default '{}';
alter table public.experiences add column if not exists tags text[] not null default '{}';
alter table public.services add column if not exists tags text[] not null default '{}';
