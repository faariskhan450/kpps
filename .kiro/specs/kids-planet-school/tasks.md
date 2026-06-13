# Tasks — Kids Planet School Website

Work top to bottom. Each phase leaves you with something working.

## Phase 1 — Project setup
- [x] 1.1 Create Next.js 15 app (TypeScript, Tailwind, App Router)
- [x] 1.2 Set up base theme (cream/navy/peach colors, Fraunces + Nunito fonts)
      _shadcn/ui deferred to Phase 2, added when we build forms/tables_
- [ ] 1.3 Create a Supabase project and add keys to `.env.local`
- [ ] 1.4 Deploy a starter page to Vercel to confirm the full pipeline works
  - _Requirements: Non-functional (cost, responsive)_

## Phase 2 — Public website (static content first)
- [ ] 2.1 Build shared layout: top announcement bar, nav, footer
- [ ] 2.2 Home page (hero, highlights, programs section)
- [ ] 2.3 About page
- [ ] 2.4 Events page (content seeded in code)
- [ ] 2.5 Gallery page (image grid, content seeded in code)
- [ ] 2.6 Contact page (address, phone, email, embedded map)
- [ ] 2.7 Make all pages responsive + optimize images
  - _Requirements: 1, 6_

## Phase 3 — Admissions enquiry form
- [ ] 3.1 Create `enquiries` table in Supabase
- [ ] 3.2 Build Apply Now form with validation
- [ ] 3.3 Save submissions to the database + success/error states
  - _Requirements: 2_

## Phase 4 — Authentication and roles
- [ ] 4.1 Create `profiles` table + role field; enable RLS
- [ ] 4.2 Build login page with Supabase Auth
- [ ] 4.3 Add middleware: protect routes, redirect by role, logout
  - _Requirements: 3_

## Phase 5 — Attendance
- [ ] 5.1 Create `students` and `attendance` tables + RLS
- [ ] 5.2 Teacher page: list class, mark/update attendance (no duplicates)
- [ ] 5.3 Student portal: view attendance history + percentage
  - _Requirements: 4_

## Phase 6 — Fee tracking
- [ ] 6.1 Create `fees` table + RLS (with `payment_ref` reserved for later)
- [ ] 6.2 Admin: create and update fee records, mark paid
- [ ] 6.3 Student portal: view fees + paid/outstanding summary
  - _Requirements: 5_

## Phase 7 — Admin dashboard
- [ ] 7.1 Dashboard layout with sections
- [ ] 7.2 Manage students and teachers (add/view)
- [ ] 7.3 View admission enquiries
  - _Requirements: 7_

## Phase 8 — Polish
- [ ] 8.1 Final responsive pass (mobile/tablet/desktop)
- [ ] 8.2 Performance optimization (images, fonts, lazy loading)
- [ ] 8.3 Accessibility check
  - _Requirements: Non-functional_

## Phase 9 — Future (not now)
- [ ] 9.1 Razorpay integration (test mode first)
- [ ] 9.2 Admin-managed events & gallery uploads via Supabase Storage
  - _Requirements: 5, 7_
