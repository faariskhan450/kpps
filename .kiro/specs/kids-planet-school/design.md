# Design — Kids Planet School Website

## 1. Tech Stack (2026, free tier)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 15** (App Router, React, TypeScript) | One project for frontend + backend API routes |
| Styling | **Tailwind CSS** | Utility classes, fast and responsive |
| UI kit | **shadcn/ui** | Accessible prebuilt components (forms, tables, dialogs) |
| Database | **Supabase Postgres** | Free tier, relational, scales fine for 200–300 users |
| Auth | **Supabase Auth** | Email/password login, roles via a `profiles` table |
| File storage | **Supabase Storage** | Gallery/event images (used in later phase) |
| Hosting | **Vercel** (app) + **Supabase** (data) | Both free |
| Payments | **Razorpay** (India) | Deferred to a later phase, test mode first |

**Why:** one language (TypeScript) end to end, built-in auth/database/storage so
a beginner avoids the hardest infrastructure work, and everything is free.

---

## 2. High-Level Architecture

```
Browser (visitor / student / teacher / admin)
        |
        v
Next.js app on Vercel
  - Public pages (Home, About, Admissions, Events, Gallery, Contact)
  - Protected pages (Student / Teacher / Admin dashboards)
  - Server-side API routes + middleware (auth & role checks)
        |
        v
Supabase
  - Postgres database (tables below)
  - Auth (users + sessions)
  - Storage (images, later phase)
```

Role-based access is enforced in **Next.js middleware + Supabase Row Level
Security (RLS)**, so the UI is never the only thing protecting data.

---

## 3. Data Model

```
profiles
  id (uuid, = auth user id)   role (student|teacher|admin)
  full_name                   email
  created_at

students
  id (uuid)                   profile_id -> profiles.id
  roll_number                 grade / class
  parent_name                 parent_contact
  teacher_id -> profiles.id   (assigned class teacher)

attendance
  id (uuid)                   student_id -> students.id
  date                        status (present|absent)
  marked_by -> profiles.id
  UNIQUE(student_id, date)    -- prevents duplicates

fees
  id (uuid)                   student_id -> students.id
  amount                      due_date
  status (unpaid|paid)        paid_date (nullable)
  payment_ref (nullable)      -- reserved for Razorpay later
  description

enquiries
  id (uuid)                   parent_name   child_name
  child_age_grade             phone         email
  message                     created_at    status (new|contacted)

events        (phase 1: seeded in code; phase 2: DB-managed)
  id          title           event_date     description     image_url

gallery       (phase 1: seeded in code; phase 2: DB-managed)
  id          image_url       caption        category
```

---

## 4. Pages and Routes

Public:
- `/` Home
- `/about` About
- `/admissions` Apply Now (enquiry form)
- `/events` Events
- `/gallery` Gallery
- `/contact` Contact (map + details)
- `/login` Login

Protected:
- `/student` Student portal (attendance %, fee status)
- `/teacher` Teacher portal (mark/update attendance)
- `/admin` Admin dashboard (students, teachers, fees, enquiries)

---

## 5. Design System (from the Little Rainbow template)

**Theme:** warm, playful, friendly — adapted for "Kids Planet School."

- **Colors**
  - Background: cream `#FDF6EC`
  - Primary text / headings: deep navy `#1F2A5E`
  - Accent peach: `#F6C9A4`
  - Accent coral/orange: `#E8732C`
  - Accent blue: `#3E6FD0`
- **Typography**
  - Headings: a rounded display serif (e.g. **Fraunces**)
  - Body: a clean sans-serif (e.g. **Inter** or **Nunito**)
- **Components**
  - Rounded cards with soft borders
  - Pill-shaped navigation bar
  - Top announcement bar ("Admissions open for 2026!")
  - Playful icons for sections (programs, classes)
- **Layout**: generous spacing, large hero heading, two-column hero (text + image)

---

## 6. Security Notes

- Supabase Auth handles password hashing (never stored in plain text).
- Row Level Security: students can read only their own attendance/fees; teachers
  can write attendance only for their class; admins have full access.
- Middleware redirects unauthenticated users to `/login` and blocks cross-role
  access.
- Environment secrets (Supabase keys) stored in `.env.local`, never committed.

---

## 7. Phasing (matches tasks.md)

1. Project setup + deploy skeleton
2. Public website (static content)
3. Admissions enquiry form (first DB write)
4. Auth + roles
5. Attendance
6. Fee tracking
7. Admin dashboard
8. Polish, optimization, responsiveness
9. (Future) Razorpay payments + admin content management
