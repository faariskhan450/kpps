import Link from "next/link";
import { ClipboardCheck, Users, CalendarDays } from "lucide-react";
import { getUserProfile } from "@/lib/auth/session";

export default async function TeacherDashboard() {
  const { profile } = await getUserProfile();
  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Welcome, {firstName}
      </h1>
      <p className="mt-2 font-sans text-ink/60">
        This is your teacher portal
        {profile?.class_name ? ` for ${profile.class_name}` : ""}.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active: Mark attendance */}
        <Link
          href="/teacher/attendance"
          className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
            <ClipboardCheck size={22} />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">
            Mark attendance
          </h2>
          <p className="mt-2 font-sans text-sm text-ink/60">
            Record daily present/absent for your class.
          </p>
          <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">
            Open →
          </span>
        </Link>

        {/* Coming soon cards */}
        {[
          { Icon: Users, title: "My class", desc: "View the students assigned to you." },
          { Icon: CalendarDays, title: "Attendance history", desc: "Review and update past records." },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/25 text-deep">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">{desc}</p>
            <span className="mt-4 inline-block rounded-full bg-canvas px-3 py-1 font-sans text-xs font-semibold text-ink/50">
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
