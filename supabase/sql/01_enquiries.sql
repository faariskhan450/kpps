-- ============================================================
--  Phase 3 — Admissions enquiries table
--  Run this in the Supabase dashboard:  SQL Editor -> New query
-- ============================================================

-- 1) The table that stores each "Apply Now" submission
create table if not exists public.enquiries (
  id              uuid primary key default gen_random_uuid(),
  parent_name     text not null,
  child_name      text not null,
  child_age_grade text not null,
  phone           text not null,
  email           text not null,
  message         text,
  status          text not null default 'new',   -- new | contacted
  created_at      timestamptz not null default now()
);

-- 2) Turn on Row Level Security.
--    With RLS ON, NOTHING is allowed unless a policy explicitly permits it.
alter table public.enquiries enable row level security;

-- 3) Allow the public website to SUBMIT an enquiry (insert only).
--    Visitors can add a row, but cannot read anyone's submissions.
--    (Admins will get read access later, in Phase 7.)
drop policy if exists "Anyone can submit an enquiry" on public.enquiries;
create policy "Anyone can submit an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (true);
