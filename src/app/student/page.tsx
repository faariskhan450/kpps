import Link from "next/link";
import { CalendarCheck, Wallet, BookOpen, GraduationCap, CalendarRange } from "lucide-react";
import { getUserProfile } from "@/lib/auth/session";
import { NoticesPanel } from "@/components/notices-panel";

const cards = [
  { href: "/student/attendance", Icon: CalendarCheck, title: "My attendance", desc: "History and percentage." },
  { href: "/student/fees", Icon: Wallet, title: "Fees", desc: "Paid and outstanding fees." },
  { href: "/student/homework", Icon: BookOpen, title: "Homework", desc: "Assignments from your teacher." },
  { href: "/student/marks", Icon: GraduationCap, title: "Report card", desc: "Your marks by term." },
  { href: "/student/timetable", Icon: CalendarRange, title: "Timetable", desc: "Your weekly schedule." },
];

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
        {cards.map(({ href, Icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">{desc}</p>
            <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">Open →</span>
          </Link>
        ))}
      </div>

      <NoticesPanel />
    </div>
  );
}
