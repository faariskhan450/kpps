import Link from "next/link";
import { CalendarCheck, Wallet, Bell } from "lucide-react";
import { getUserProfile } from "@/lib/auth/session";

export default async function StudentDashboard() {
  const { profile } = await getUserProfile();
  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Hello, {firstName}
      </h1>
      <p className="mt-2 font-sans text-ink/60">
        This is your student &amp; parent portal.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active: My attendance */}
        <Link
          href="/student/attendance"
          className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
            <CalendarCheck size={22} />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">
            My attendance
          </h2>
          <p className="mt-2 font-sans text-sm text-ink/60">
            See attendance history and percentage.
          </p>
          <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">
            Open →
          </span>
        </Link>

        {/* Active: Fees */}
        <Link
          href="/student/fees"
          className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
            <Wallet size={22} />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Fees</h2>
          <p className="mt-2 font-sans text-sm text-ink/60">
            View paid and outstanding fees.
          </p>
          <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">
            Open →
          </span>
        </Link>

        {/* Coming soon */}
        {[
          { Icon: Bell, title: "Notices", desc: "Stay updated with school announcements." },
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
