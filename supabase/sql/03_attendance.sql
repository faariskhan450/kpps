-- ============================================================
--  Phase 5 — Students & Attendance
--  Run this in the Supabase dashboard:  SQL Editor -> New query
-- ============================================================

-- 0) A teacher's profile stores the class they teach.
alter table public.profiles add column if not exists class_name text;

-- 1) Students — one row per student account.
create table if not exists public.students (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid not null references public.profiles(id) on delete cascade unique,
  full_name      text,
  roll_number    text,
  grade          text,            -- class name, e.g. "Class 1"
  parent_contact text,
  created_at     timestamptz not null default now()
);
alter table public.students enable row level security;

-- 2) Attendance — one row per student per date (no duplicates).
create table if not exists public.attendance (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students(id) on delete cascade,
  date        date not null,
  status      text not null check (status in ('present', 'absent')),
  marked_by   uuid references public.profiles(id),
  created_at  timestamptz not null default now(),
  unique (student_id, date)
);
alter table public.attendance enable row level security;

-- 3) Update the signup trigger: also create a student row and store class.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role  text := coalesce(new.raw_user_meta_data->>'role', 'student');
  v_name  text := new.raw_user_meta_data->>'full_name';
  v_class text := new.raw_user_meta_data->>'class_name';
begin
  insert into public.profiles (id, role, full_name, email, class_name)
  values (new.id, v_role, v_name, new.email, v_class);

  if v_role = 'student' then
    insert into public.students (profile_id, full_name, grade)
    values (new.id, v_name, v_class);
  end if;

  return new;
end;
$$;

-- 4) RLS — students
drop policy if exists "Students view own record" on public.students;
create policy "Students view own record" on public.students
  for select to authenticated
  using (profile_id = auth.uid());

drop policy if exists "Teachers view their class students" on public.students;
create policy "Teachers view their class students" on public.students
  for select to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'teacher'
        and p.class_name = students.grade
    )
  );

-- 5) RLS — attendance
--    A teacher may read/write attendance only for students in their class.
--    A student may read only their own attendance.
drop policy if exists "Students view own attendance" on public.attendance;
create policy "Students view own attendance" on public.attendance
  for select to authenticated
  using (
    student_id in (select id from public.students where profile_id = auth.uid())
  );

drop policy if exists "Teachers view class attendance" on public.attendance;
create policy "Teachers view class attendance" on public.attendance
  for select to authenticated
  using (
    student_id in (
      select s.id from public.students s
      join public.profiles p on p.id = auth.uid()
      where p.role = 'teacher' and p.class_name = s.grade
    )
  );

drop policy if exists "Teachers insert class attendance" on public.attendance;
create policy "Teachers insert class attendance" on public.attendance
  for insert to authenticated
  with check (
    student_id in (
      select s.id from public.students s
      join public.profiles p on p.id = auth.uid()
      where p.role = 'teacher' and p.class_name = s.grade
    )
  );

drop policy if exists "Teachers update class attendance" on public.attendance;
create policy "Teachers update class attendance" on public.attendance
  for update to authenticated
  using (
    student_id in (
      select s.id from public.students s
      join public.profiles p on p.id = auth.uid()
      where p.role = 'teacher' and p.class_name = s.grade
    )
  );
