import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

export const metadata = { title: "Attendance Reports — Kids Planet School" };

export default async function TeacherReportsPage() {
  const { profile } = await getUserProfile();
  const supabase = await createClient();

  const { data: students } = await supabase
    .from("students")
    .select("id, full_name")
    .order("full_name");

  const ids = (students ?? []).map((s) => s.id);
  const { data: attendance } = ids.length
    ? await supabase.from("attendance").select("student_id, status").in("student_id", ids)
    : { data: [] };

  // Aggregate present/total per student
  const stats = new Map<string, { present: number; total: number }>();
  for (const a of attendance ?? []) {
    const cur = stats.get(a.student_id) ?? { present: 0, total: 0 };
    cur.total += 1;
    if (a.status === "present") cur.present += 1;
    stats.set(a.student_id, cur);
  }

  const rows = (students ?? []).map((s) => {
    const st = stats.get(s.id) ?? { present: 0, total: 0 };
    const pct = st.total > 0 ? Math.round((st.present / st.total) * 100) : 0;
    return { name: s.full_name ?? "Unnamed", ...st, pct };
  });

  const classAvg =
    rows.length > 0 ? Math.round(rows.reduce((s, r) => s + r.pct, 0) / rows.length) : 0;

  return (
    <div>
      <Link href="/teacher" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Attendance report
        </h1>
        {rows.length > 0 && (
          <a
            href="/teacher/reports/export"
            className="inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 font-sans text-sm font-semibold text-surface transition-colors hover:bg-teal"
          >
            <Download size={15} /> Export CSV
          </a>
        )}
      </div>
      <p className="mt-2 font-sans text-ink/60">
        {profile?.class_name ?? "No class"} · class average {classAvg}%
      </p>

      {rows.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No students in your class yet.
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl bg-surface shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          {rows.map((r, i) => (
            <div key={r.name + i} className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-ink/8" : ""}`}>
              <span className="font-sans text-sm font-semibold text-ink">{r.name}</span>
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs text-ink/50">{r.present}/{r.total} present</span>
                <span className={`font-display text-lg font-semibold ${r.pct >= 75 ? "text-deep" : "text-red-600"}`}>{r.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
