-- Soft skills shown on the CV (per language)
alter table public.profiles
  add column if not exists soft_skills text[] not null default '{}';
