-- ============================================================
--  Phase 4 — User profiles & roles
--  Run this in the Supabase dashboard:  SQL Editor -> New query
-- ============================================================

-- 1) One profile row per user, holding their role and name.
--    The id matches the Supabase Auth user id.
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  role        text not null check (role in ('teacher', 'student')),
  full_name   text,
  email       text,
  created_at  timestamptz not null default now()
);

-- 2) Row Level Security: a user may read and update only their OWN profile.
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- 3) When a new user signs up, automatically create their profile,
--    copying the role and name they chose (stored in user metadata).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'student'),
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
