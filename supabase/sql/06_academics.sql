-- ============================================================
--  Tier 2 — Academics: homework, marks, timetable
--  (Attendance reports reuse the existing attendance table.)
--  Run this in the Supabase dashboard:  SQL Editor -> New query
-- ============================================================

-- Helper note: a teacher's class is profiles.class_name; a student's
-- class is students.grade. Policies below link people to a class_name.

-- ---------- Homework ----------
create table if not exists public.homework (
  id          uuid primary key default gen_random_uuid(),
  class_name  text not null,
  title       text not null,
  description text,
  due_date    date,
  created_at  timestamptz not null default now()
);
alter table public.homework enable row level security;

drop policy if exists "Read homework for my class" on public.homework;
create policy "Read homework for my class" on public.homework
  for select to authenticated
  using (
    exists (select 1 from public.students s where s.profile_id = auth.uid() and s.grade = homework.class_name)
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher' and p.class_name = homework.class_name)
  );

drop policy if exists "Teachers add homework" on public.homework;
create policy "Teachers add homework" on public.homework
  for insert to authenticated
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher' and p.class_name = homework.class_name));

drop policy if exists "Teachers delete homework" on public.homework;
create policy "Teachers delete homework" on public.homework
  for delete to authenticated
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher' and p.class_name = homework.class_name));

-- ---------- Marks (report cards) ----------
create table if not exists public.marks (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students(id) on delete cascade,
  subject     text not null,
  term        text not null,
  score       numeric(5, 2) not null,
  max_score   numeric(5, 2) not null default 100,
  created_at  timestamptz not null default now(),
  unique (student_id, subject, term)
);
alter table public.marks enable row level security;

drop policy if exists "Students view own marks" on public.marks;
create policy "Students view own marks" on public.marks
  for select to authenticated
  using (student_id in (select id from public.students where profile_id = auth.uid()));

drop policy if exists "Teachers view class marks" on public.marks;
create policy "Teachers view class marks" on public.marks
  for select to authenticated
  using (student_id in (
    select s.id from public.students s join public.profiles p on p.id = auth.uid()
    where p.role = 'teacher' and p.class_name = s.grade));

drop policy if exists "Teachers add class marks" on public.marks;
create policy "Teachers add class marks" on public.marks
  for insert to authenticated
  with check (student_id in (
    select s.id from public.students s join public.profiles p on p.id = auth.uid()
    where p.role = 'teacher' and p.class_name = s.grade));

drop policy if exists "Teachers update class marks" on public.marks;
create policy "Teachers update class marks" on public.marks
  for update to authenticated
  using (student_id in (
    select s.id from public.students s join public.profiles p on p.id = auth.uid()
    where p.role = 'teacher' and p.class_name = s.grade));

-- ---------- Timetable ----------
create table if not exists public.timetable (
  id          uuid primary key default gen_random_uuid(),
  class_name  text not null,
  day_of_week int not null,   -- 1=Mon ... 6=Sat
  period      int not null,   -- 1, 2, 3 ...
  subject     text not null,
  time_label  text,           -- e.g. "9:00 - 9:45"
  created_at  timestamptz not null default now(),
  unique (class_name, day_of_week, period)
);
alter table public.timetable enable row level security;

drop policy if exists "Read timetable for my class" on public.timetable;
create policy "Read timetable for my class" on public.timetable
  for select to authenticated
  using (
    exists (select 1 from public.students s where s.profile_id = auth.uid() and s.grade = timetable.class_name)
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher' and p.class_name = timetable.class_name)
  );

drop policy if exists "Teachers add timetable" on public.timetable;
create policy "Teachers add timetable" on public.timetable
  for insert to authenticated
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher' and p.class_name = timetable.class_name));

drop policy if exists "Teachers delete timetable" on public.timetable;
create policy "Teachers delete timetable" on public.timetable
  for delete to authenticated
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher' and p.class_name = timetable.class_name));
