import Link from "next/link";
import { Inbox, GraduationCap, Users, Wallet, CalendarDays, ImageIcon, Megaphone, TrendingUp } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { StudentsByClassChart, FeesChart } from "@/components/admin-charts";

export const metadata = { title: "Dashboard — Admin — Kids Planet School" };

function rupees(n: number) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  // Gather stats in parallel
  const [studentsRes, teachersRes, enquiriesRes, feesRes, attTotalRes, attPresentRes] =
    await Promise.all([
      supabase.from("students").select("grade"),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
      supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("fees").select("amount, status"),
      supabase.from("attendance").select("*", { count: "exact", head: true }),
      supabase.from("attendance").select("*", { count: "exact", head: true }).eq("status", "present"),
    ]);

  const students = studentsRes.data ?? [];
  const studentCount = students.length;
  const teacherCount = teachersRes.count ?? 0;
  const newEnquiries = enquiriesRes.count ?? 0;

  const fees = feesRes.data ?? [];
  const paid = fees.filter((f) => f.status === "paid").reduce((s, f) => s + Number(f.amount), 0);
  const outstanding = fees.filter((f) => f.status === "unpaid").reduce((s, f) => s + Number(f.amount), 0);

  const attTotal = attTotalRes.count ?? 0;
  const attPresent = attPresentRes.count ?? 0;
  const attendanceRate = attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 0;

  // Students grouped by class for the bar chart
  const perClassMap = new Map<string, number>();
  for (const s of students) {
    const key = s.grade ?? "Unassigned";
    perClassMap.set(key, (perClassMap.get(key) ?? 0) + 1);
  }
  const perClass = Array.from(perClassMap, ([name, count]) => ({ name, count }));

  const stats = [
    { label: "Students", value: studentCount, Icon: Users },
    { label: "Teachers", value: teacherCount, Icon: GraduationCap },
    { label: "New enquiries", value: newEnquiries, Icon: Inbox },
    { label: "Attendance rate", value: `${attendanceRate}%`, Icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Admin dashboard
      </h1>
      <p className="mt-2 font-sans text-ink/60">An overview of your school at a glance.</p>

      {/* Stat cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/25 text-deep">
              <Icon size={20} />
            </div>
            <p className="mt-4 font-display text-4xl font-semibold text-ink">{value}</p>
            <p className="mt-1 font-sans text-sm text-ink/60">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <StudentsByClassChart data={perClass} />
        <FeesChart paid={paid} outstanding={outstanding} />
      </div>

      {/* Fee totals row */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Fees collected</p>
          <p className="mt-1 font-display text-3xl font-semibold text-deep">{rupees(paid)}</p>
        </div>
        <div className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Fees outstanding</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">{rupees(outstanding)}</p>
        </div>
      </div>

      {/* Management sections */}
      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">Manage</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/admin/enquiries", Icon: Inbox, title: "Enquiries", desc: "Admission enquiries." },
          { href: "/admin/students", Icon: Users, title: "Students", desc: "Manage students." },
          { href: "/admin/teachers", Icon: GraduationCap, title: "Teachers", desc: "Manage staff." },
          { href: "/admin/fees", Icon: Wallet, title: "Fees", desc: "Track fee records." },
          { href: "/admin/notices", Icon: Megaphone, title: "Notices", desc: "Post announcements." },
          { href: "/admin/events", Icon: CalendarDays, title: "Events", desc: "Manage events." },
          { href: "/admin/gallery", Icon: ImageIcon, title: "Gallery", desc: "Manage photos." },
        ].map(({ href, Icon, title, desc }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 font-sans text-sm text-ink/60">{desc}</p>
            <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
