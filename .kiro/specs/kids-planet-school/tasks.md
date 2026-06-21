# Tasks — Kids Planet School Website

Work top to bottom. Each phase leaves you with something working.

## Phase 1 — Project setup
- [x] 1.1 Create Next.js 15 app (TypeScript, Tailwind, App Router)
- [x] 1.2 Set up base theme (cream/navy/peach colors, Fraunces + Nunito fonts)
      _shadcn/ui deferred to Phase 2, added when we build forms/tables_
- [ ] 1.3 Create a Supabase project and add keys to `.env.local`
- [ ] 1.4 Deploy to Vercel — _deferred; building locally first, repo is pushed to GitHub and ready to connect later_
  - _Requirements: Non-functional (cost, responsive)_

## Phase 2 — Public website (static content first)
- [x] 2.1 Build shared layout: top announcement bar, nav, footer
- [x] 2.2 Home page (hero, programs Pre-Primary + Primary 1–5, approach, CTA)
- [x] 2.3 About page
- [x] 2.4 Events page (content seeded in code)
- [x] 2.5 Gallery page (image grid, content seeded in code)
- [x] 2.6 Contact page (address, phone, email, embedded map)
- [x] 2.7 Make all pages responsive + optimize images
  - _Requirements: 1, 6_

## Phase 3 — Admissions enquiry form
- [x] 3.1 Create `enquiries` table in Supabase (supabase/sql/01_enquiries.sql)
- [x] 3.2 Build Apply Now form with validation
- [x] 3.3 Save submissions to the database + success/error states
  - _Requirements: 2 — verified: test row inserted successfully_
  - _Note: Node 20 needs a `ws` WebSocket polyfill (src/lib/supabase/server.ts);
    can be removed after upgrading to Node 22+._

## Phase 4 — Authentication and roles
- [x] 4.1 Create `profiles` table + role field; enable RLS (supabase/sql/02_profiles.sql)
- [x] 4.2 Build login pages (teacher, student/parent, admin) + signup with Supabase Auth
- [x] 4.3 Add middleware + portal layouts: protect routes, redirect by role, logout
  - _Requirements: 3_
  - _Admin login reads credentials from env (ADMIN_EMAIL/ADMIN_PASSWORD); signed cookie session._
  - _Pending user steps: run 02_profiles.sql, disable "Confirm email" in Supabase, restart dev._

## Phase 5 — Attendance
- [x] 5.1 Create `students` and `attendance` tables + RLS (supabase/sql/03_attendance.sql)
- [x] 5.2 Teacher page: list class, mark/update attendance (upsert, no duplicates)
- [x] 5.3 Student portal: view attendance history + percentage
  - _Requirements: 4_
  - _Class is chosen at signup (student = their class, teacher = class they teach);
    teacher sees students whose class matches. Admin reassignment comes in Phase 7._
  - _Pending user step: run 03_attendance.sql, then create fresh teacher + student
    test accounts in the SAME class to test._

## Phase 6 — Fee tracking
- [x] 6.1 Create `fees` table + RLS (payment_ref reserved for Razorpay) — supabase/sql/04_fees.sql
- [x] 6.2 Admin: create fees, mark paid/unpaid, delete (service-role client)
- [x] 6.3 Student portal: view fees + paid/outstanding summary
  - _Requirements: 5_
  - _Admin uses SUPABASE_SERVICE_ROLE_KEY (server-only) since admin isn't a Supabase user._
  - _Pending user step: run 04_fees.sql, add SUPABASE_SERVICE_ROLE_KEY to .env.local, restart dev._

## Phase 7 — Admin dashboard
- [x] 7.1 Dashboard layout with sections (all cards now link to live pages)
- [x] 7.2 Manage students and teachers (create accounts, reassign class, delete)
- [x] 7.3 View admission enquiries (mark contacted, delete)
  - _Requirements: 7_
  - _Admin creates accounts via Supabase admin API (service-role); trigger builds profile/student rows._
  - _No new SQL or env needed — uses tables/keys from earlier phases._

## Phase 8 — Polish
- [x] 8.1 Final responsive pass (mobile/tablet/desktop)
- [x] 8.2 Performance optimization (next/image, next/font, static where possible)
- [x] 8.3 Accessibility (focus-visible rings, skip-to-content, aria labels, reduced motion)
- [x] 8.4 SEO: rich metadata + Open Graph, sitemap.xml, robots.txt
- [x] 8.5 Custom 404 page + loading states
  - _Requirements: Non-functional_

## Phase 9 — Future (not now)
- [ ] 9.1 Razorpay integration (test mode first)
- [ ] 9.2 Admin-managed events & gallery uploads via Supabase Storage
  - _Requirements: 5, 7_


## Tier 1 — Advanced features (post-Phase 8)
- [x] T1.1 Admin analytics dashboard — stat cards + charts (recharts)
- [x] T1.2 Notices/Announcements — admin posts; teachers & students see on dashboards
- [x] T1.3 Admin-managed Events & Gallery + image uploads (Supabase Storage bucket "media")
- [x] T1.4 Search + pagination on admin lists (students, teachers, enquiries) + confirm-before-delete dialogs
  - _New SQL: supabase/sql/05_advanced.sql (notices, events, gallery tables, storage bucket, seed data)._
  - _Public Events & Gallery now read from the database (were hardcoded)._
  - _Pending user step: run 05_advanced.sql; service-role key already set in Phase 6._


## Tier 2 — Academics
- [x] T2.1 Homework — teachers assign per class; students view (/teacher/homework, /student/homework)
- [x] T2.2 Attendance reports — class summary + CSV export (/teacher/reports, /teacher/reports/export)
- [x] T2.3 Marks / report cards — teachers enter; students view by term (/teacher/marks, /student/marks)
- [x] T2.4 Timetable — teachers set; students view weekly grid (/teacher/timetable, /student/timetable)
  - _New SQL: supabase/sql/06_academics.sql (homework, marks, timetable tables + RLS)._
  - _Pending user step: run 06_academics.sql._