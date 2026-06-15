import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

export const metadata = { title: "My Attendance — Kids Planet School" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function StudentAttendancePage() {
  const { user } = await getUserProfile();
  const supabase = await createClient();

  // The student's own record
  const { data: student } = await supabase
    .from("students")
    .select("id, grade")
    .eq("profile_id", user!.id)
    .single();

  // Their attendance history (RLS limits this to their own rows)
  const { data: records } = student
    ? await supabase
        .from("attendance")
        .select("date, status")
        .eq("student_id", student.id)
        .order("date", { ascending: false })
    : { data: [] };

  const total = records?.length ?? 0;
  const present = (records ?? []).filter((r) => r.status === "present").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div>
      <Link
        href="/student"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep"
      >
        <ArrowLeft size={15} /> Back to portal
      </Link>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        My attendance
      </h1>

      {/* Summary */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-teal to-deep p-7 text-surface">
          <p className="font-sans text-sm text-surface/80">Overall</p>
          <p className="mt-1 font-display text-5xl font-semibold">{percentage}%</p>
        </div>
        <div className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Days present</p>
          <p className="mt-1 font-display text-5xl font-semibold text-deep">{present}</p>
        </div>
        <div className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Days recorded</p>
          <p className="mt-1 font-display text-5xl font-semibold text-ink">{total}</p>
        </div>
      </div>

      {/* History */}
      <h2 className="mt-12 font-display text-xl font-semibold text-ink">History</h2>
      {total === 0 ? (
        <div className="mt-4 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No attendance has been recorded yet.
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-3xl bg-surface shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          {(records ?? []).map((r, i) => (
            <div
              key={r.date}
              className={`flex items-center justify-between px-6 py-4 ${
                i > 0 ? "border-t border-ink/8" : ""
              }`}
            >
              <span className="font-sans text-sm text-ink">{formatDate(r.date)}</span>
              {r.status === "present" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/25 px-3 py-1 font-sans text-xs font-semibold text-deep">
                  <Check size={14} /> Present
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 font-sans text-xs font-semibold text-red-600">
                  <X size={14} /> Absent
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
