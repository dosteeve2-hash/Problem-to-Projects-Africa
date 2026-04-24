create extension if not exists "pgcrypto";

create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  country text not null default 'Burkina Faso',
  region text,
  level text not null,
  domain text not null,
  skills text[] not null default '{}',
  preferred_sector text,
  weekly_time text,
  goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.recommendation_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  mode text not null check (mode in ('skills', 'idea', 'problem')),
  country text not null,
  region text,
  input_payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.project_recommendations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.recommendation_sessions(id) on delete cascade,
  title text not null,
  concept text not null,
  why_it_fits text not null,
  local_why text not null,
  feasibility_level text not null,
  cost_level text not null,
  complexity_level text not null,
  mvp_summary text not null,
  top_features text[] not null default '{}',
  skills_to_learn text[] not null default '{}',
  next_step text not null,
  roadmap jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.project_alternatives (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.recommendation_sessions(id) on delete cascade,
  title text not null,
  concept text not null,
  local_relevance text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  recommendation_id uuid not null references public.project_recommendations(id) on delete cascade,
  status text not null default 'saved' check (status in ('new', 'saved', 'in_progress')),
  created_at timestamptz not null default now()
);

create table if not exists public.country_contexts (
  id uuid primary key default gen_random_uuid(),
  country text not null unique,
  summary text not null,
  realities text[] not null default '{}',
  sectors text[] not null default '{}',
  heuristics text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.country_contexts (country, summary, realities, sectors, heuristics)
values (
  'Burkina Faso',
  'MVP focus country for Problem to Project Africa',
  array[
    'Connectivity can be unstable outside urban centers',
    'Budgets are often constrained for early builders',
    'Solutions should work with low-friction field operations',
    'Offline-first and hybrid models are often more realistic than app-only approaches'
  ],
  array[
    'Agriculture',
    'Education',
    'Health',
    'Commerce informel',
    'Energie',
    'Logistique'
  ],
  array[
    'Prefer low-cost MVPs',
    'Avoid unnecessary AI complexity',
    'Prioritize practical execution and local adoption',
    'Make the context visible in every recommendation'
  ]
)
on conflict (country) do nothing;
