-- ============================================================
--  Tier 1 advanced features — notices, events, gallery, storage
--  Run this in the Supabase dashboard:  SQL Editor -> New query
-- ============================================================

-- ---------- Notices / Announcements ----------
create table if not exists public.notices (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text not null,
  audience   text not null default 'all' check (audience in ('all', 'teachers', 'students')),
  created_at timestamptz not null default now()
);
alter table public.notices enable row level security;

drop policy if exists "Read notices for my role" on public.notices;
create policy "Read notices for my role" on public.notices
  for select to authenticated
  using (
    audience = 'all'
    or (audience = 'teachers' and exists (
        select 1 from public.profiles p where p.id = auth.uid() and p.role = 'teacher'))
    or (audience = 'students' and exists (
        select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student'))
  );

-- ---------- Events (now database-managed) ----------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  event_date  date,
  description text,
  category    text,
  image_url   text,
  created_at  timestamptz not null default now()
);
alter table public.events enable row level security;

drop policy if exists "Public read events" on public.events;
create policy "Public read events" on public.events
  for select to anon, authenticated using (true);

-- ---------- Gallery (now database-managed) ----------
create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  caption    text,
  image_url  text not null,
  created_at timestamptz not null default now()
);
alter table public.gallery enable row level security;

drop policy if exists "Public read gallery" on public.gallery;
create policy "Public read gallery" on public.gallery
  for select to anon, authenticated using (true);

-- ---------- Storage bucket for uploaded images ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

-- ---------- Seed initial content (only if tables are empty) ----------
insert into public.events (title, event_date, description, category)
select * from (values
  ('Annual Day Celebration', date '2026-07-15', 'An evening of music, dance, and drama by our little stars.', 'performance'),
  ('Independence Day',        date '2026-08-15', 'Flag hoisting, patriotic songs, and tricolour fun.',         'celebration'),
  ('Sports Day',              date '2026-08-22', 'Races, games, and cheering as our children show team spirit.','sports'),
  ('Little Artists Fair',     date '2026-09-10', 'A colourful showcase of paintings and crafts.',              'arts')
) as v(title, event_date, description, category)
where not exists (select 1 from public.events);

insert into public.gallery (caption, image_url)
select * from (values
  ('Art & craft',     '/images/art.jpg'),
  ('Story time',      '/images/reading.jpg'),
  ('Outdoor play',    '/images/play.jpg'),
  ('Joyful days',     '/images/joy.jpg'),
  ('Our classrooms',  '/images/approach.jpg')
) as v(caption, image_url)
where not exists (select 1 from public.gallery);
