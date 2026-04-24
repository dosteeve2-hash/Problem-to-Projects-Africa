-- Enable RLS on all user-facing tables
alter table public.user_profiles enable row level security;
alter table public.recommendation_sessions enable row level security;
alter table public.project_recommendations enable row level security;
alter table public.project_alternatives enable row level security;
alter table public.saved_projects enable row level security;

-- user_profiles: users can only see and modify their own profile
create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = user_id);

-- recommendation_sessions: users can only see and create their own sessions
create policy "Users can view own sessions"
  on public.recommendation_sessions for select
  using (auth.uid() = user_id);

create policy "Users can create own sessions"
  on public.recommendation_sessions for insert
  with check (auth.uid() = user_id);

-- project_recommendations: accessible via session ownership
create policy "Users can view own recommendations"
  on public.project_recommendations for select
  using (
    exists (
      select 1 from public.recommendation_sessions
      where recommendation_sessions.id = project_recommendations.session_id
        and recommendation_sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert own recommendations"
  on public.project_recommendations for insert
  with check (
    exists (
      select 1 from public.recommendation_sessions
      where recommendation_sessions.id = project_recommendations.session_id
        and recommendation_sessions.user_id = auth.uid()
    )
  );

-- project_alternatives: accessible via session ownership
create policy "Users can view own alternatives"
  on public.project_alternatives for select
  using (
    exists (
      select 1 from public.recommendation_sessions
      where recommendation_sessions.id = project_alternatives.session_id
        and recommendation_sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert own alternatives"
  on public.project_alternatives for insert
  with check (
    exists (
      select 1 from public.recommendation_sessions
      where recommendation_sessions.id = project_alternatives.session_id
        and recommendation_sessions.user_id = auth.uid()
    )
  );

-- saved_projects: users can only manage their own saved projects
create policy "Users can view own saved projects"
  on public.saved_projects for select
  using (auth.uid() = user_id);

create policy "Users can save projects"
  on public.saved_projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own saved projects"
  on public.saved_projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own saved projects"
  on public.saved_projects for delete
  using (auth.uid() = user_id);

-- country_contexts: readable by everyone (public data)
alter table public.country_contexts enable row level security;

create policy "Country contexts are publicly readable"
  on public.country_contexts for select
  using (true);
