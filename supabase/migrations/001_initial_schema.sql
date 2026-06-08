-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================
-- PROFILES
-- =====================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- =====================
-- SUBMISSIONS
-- =====================
create table if not exists public.submissions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  payload jsonb not null,
  created_at timestamptz default now() not null
);

alter table public.submissions enable row level security;

-- Anyone can create a submission (anonymous users too)
create policy "Anyone can create submissions"
  on public.submissions for insert
  with check (true);

-- Users can only read their own submissions
create policy "Users can read their own submissions"
  on public.submissions for select
  using (user_id = auth.uid() or user_id is null);

-- =====================
-- GENERATED PROJECTS
-- =====================
create table if not exists public.generated_projects (
  id uuid default uuid_generate_v4() primary key,
  submission_id uuid references public.submissions(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  title text not null,
  one_liner text not null,
  country char(2) not null,
  sector text not null,
  mode text not null check (mode in ('skills', 'idea', 'problem')),
  result jsonb not null,
  created_at timestamptz default now() not null
);

alter table public.generated_projects enable row level security;

-- Anyone can read generated projects (for sharing via link)
create policy "Anyone can read generated projects"
  on public.generated_projects for select
  using (true);

-- Service role inserts projects
create policy "Service role can insert generated projects"
  on public.generated_projects for insert
  with check (true);

-- =====================
-- SAVED PROJECTS
-- =====================
create table if not exists public.saved_projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.generated_projects(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique (user_id, project_id)
);

alter table public.saved_projects enable row level security;

create policy "Users can manage their own saved projects"
  on public.saved_projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =====================
-- INDEXES
-- =====================
create index if not exists idx_generated_projects_user_id on public.generated_projects(user_id);
create index if not exists idx_generated_projects_created_at on public.generated_projects(created_at desc);
create index if not exists idx_submissions_user_id on public.submissions(user_id);
create index if not exists idx_saved_projects_user_id on public.saved_projects(user_id);

-- =====================
-- AUTO-UPDATE updated_at
-- =====================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- =====================
-- NEW USER HOOK
-- =====================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
