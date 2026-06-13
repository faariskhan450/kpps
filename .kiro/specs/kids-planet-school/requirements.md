# Requirements — Kids Planet School Website

## Overview

A website and lightweight school management system for **Kids Planet School**.
It has a public-facing website (for parents and visitors) and a secure portal
with three roles: **Student**, **Teacher**, and **Admin**. The system handles
attendance and fee tracking. Online payments are deferred to a later phase.

**Audience size:** ~200–300 users. Must run on free hosting tiers.

---

## Glossary

- **Profile**: a user account with a role (student / teacher / admin).
- **Enquiry**: an admission form submitted by a prospective parent.
- **Attendance record**: one entry marking a student present/absent on a date.
- **Fee record**: one charge for a student (amount, due date, paid/unpaid).

---

## Requirement 1: Public Website

**User story:** As a visitor (parent), I want to learn about the school and how
to apply, so that I can decide whether to enroll my child.

### Acceptance Criteria
1. WHEN a visitor opens the site THEN the system SHALL show a Home page with the
   school name, a welcoming hero section, and navigation to all public pages.
2. THE system SHALL provide these public pages: Home, About, Admissions (Apply
   Now), Events, Gallery, and Contact.
3. WHEN a visitor opens the Contact page THEN the system SHALL display the
   school address, phone, email, and an embedded map of the location.
4. THE public pages SHALL be fully responsive on mobile, tablet, and desktop.
5. THE site SHALL be optimized for performance (fast load, optimized images).

---

## Requirement 2: Admissions Enquiry Form

**User story:** As a prospective parent, I want to submit an enquiry form, so
that the school can contact me about admission.

### Acceptance Criteria
1. WHEN a visitor opens the Admissions page THEN the system SHALL display an
   "Apply Now" enquiry form.
2. THE form SHALL collect: parent name, child name, child age/grade, contact
   phone, email, and an optional message.
3. WHEN a visitor submits the form with all required fields valid THEN the
   system SHALL save the enquiry to the database AND show a success message.
4. IF a required field is missing or invalid THEN the system SHALL show an inline
   validation error AND SHALL NOT submit the form.
5. WHEN an enquiry is saved THEN it SHALL be visible to admins in the dashboard.

---

## Requirement 3: Authentication and Roles

**User story:** As a user, I want to log in securely, so that I only see what is
relevant to my role.

### Acceptance Criteria
1. THE system SHALL provide a single login page for students, teachers, and admins.
2. WHEN a user logs in with valid credentials THEN the system SHALL redirect them
   to the dashboard for their role.
3. IF a user enters invalid credentials THEN the system SHALL show an error and
   deny access.
4. WHEN an unauthenticated user tries to open a protected page THEN the system
   SHALL redirect them to the login page.
5. WHEN a logged-in user tries to access a page outside their role THEN the
   system SHALL deny access.
6. THE system SHALL allow a user to log out.

---

## Requirement 4: Attendance Management

**User story:** As a teacher, I want to mark and update attendance, so that
student records stay accurate. As a student, I want to view my attendance.

### Acceptance Criteria
1. WHEN a teacher opens the attendance page THEN the system SHALL list the
   students in their class.
2. WHEN a teacher marks students present/absent for a date and saves THEN the
   system SHALL store one attendance record per student for that date.
3. WHEN a teacher changes a previously saved record THEN the system SHALL update
   it (no duplicates for the same student and date).
4. WHEN a student opens their portal THEN the system SHALL show their attendance
   history and overall attendance percentage.
5. THE system SHALL prevent students from editing attendance.

---

## Requirement 5: Fee Management (tracking only, payments later)

**User story:** As an admin, I want to track and update each student's fees, so
that I know who has paid. As a student/parent, I want to view my fee status.

### Acceptance Criteria
1. WHEN an admin creates a fee record THEN the system SHALL store the student,
   amount, due date, and status (unpaid by default).
2. WHEN an admin marks a fee as paid THEN the system SHALL update its status and
   record the payment date.
3. WHEN a student opens their portal THEN the system SHALL show their fee records
   with amounts, due dates, and paid/unpaid status.
4. THE system SHALL display a summary of total paid and total outstanding for a
   student.
5. THE fee module SHALL be designed so an online payment provider (Razorpay) can
   be added later without redesigning the data model.

---

## Requirement 6: Events and Gallery

**User story:** As a visitor, I want to see school events and photos, so that I
can experience the school's activities.

### Acceptance Criteria
1. THE system SHALL provide an Events page listing events with title, date, and
   description.
2. THE system SHALL provide a Gallery page displaying school photos in a grid.
3. WHEN content is edited in code (phase 1) THEN the pages SHALL reflect the
   updated events and images.
4. THE Events and Gallery pages SHALL be responsive and load images efficiently.

---

## Requirement 7: Admin Dashboard

**User story:** As an admin, I want one place to manage the system, so that I can
run day-to-day operations.

### Acceptance Criteria
1. WHEN an admin logs in THEN the system SHALL show a dashboard with access to
   students, teachers, fees, and enquiries.
2. THE admin SHALL be able to add and view student and teacher profiles.
3. THE admin SHALL be able to view submitted admission enquiries.
4. THE admin SHALL be able to create and update fee records.
5. (Later phase) THE admin SHALL be able to upload/manage events and gallery
   images through the UI.

---

## Non-Functional Requirements

- **Cost:** All services SHALL use free tiers suitable for 200–300 users.
- **Responsive:** All pages SHALL work on mobile, tablet, and desktop.
- **Performance:** Pages SHALL be optimized (image optimization, minimal blocking).
- **Security:** Passwords SHALL never be stored in plain text; role-based access
  SHALL be enforced on the backend, not only the UI.
- **Learnability:** Code SHALL be organized clearly and commented for a beginner.
