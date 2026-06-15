-- ============================================================
--  Phase 6 — Fee management
--  Run this in the Supabase dashboard:  SQL Editor -> New query
-- ============================================================

create table if not exists public.fees (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.students(id) on delete cascade,
  amount       numeric(10, 2) not null,
  due_date     date,
  status       text not null default 'unpaid' check (status in ('unpaid', 'paid')),
  paid_date    date,
  payment_ref  text,                 -- reserved for online payments (Razorpay) later
  description  text,
  created_at   timestamptz not null default now()
);

alter table public.fees enable row level security;

-- Students may view ONLY their own fees.
-- (The admin manages fees using the service-role key, which bypasses RLS,
--  so no admin policy is needed here.)
drop policy if exists "Students view own fees" on public.fees;
create policy "Students view own fees" on public.fees
  for select to authenticated
  using (
    student_id in (select id from public.students where profile_id = auth.uid())
  );
