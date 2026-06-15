import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";
import { AttendanceForm } from "@/components/attendance-form";

export const metadata = { title: "Mark Attendance — Kids Planet School" };

type Status = "present" | "absent";

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { profile } = await getUserProfile();
  const className = profile?.class_name ?? null;

  // Default to today's date (YYYY-MM-DD)
  const params = await searchParams;
  const date = params.date || new Date().toISOString().slice(0, 10);

  const supabase = await createClient();

  // Students in this teacher's class (RLS also enforces this)
  const { data: students } = await supabase
    .from("students")
    .select("id, full_name, roll_number")
    .order("full_name");

  // Existing attendance for the chosen date
  const studentIds = (students ?? []).map((s) => s.id);
  const initialStatuses: Record<string, Status> = {};
  if (studentIds.length > 0) {
    const { data: existing } = await supabase
      .from("attendance")
      .select("student_id, status")
      .eq("date", date)
      .in("student_id", studentIds);
    for (const row of existing ?? []) {
      initialStatuses[row.student_id] = row.status as Status;
    }
  }

  return (
    <div>
      <Link
        href="/teacher"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep"
      >
        <ArrowLeft size={15} /> Back to portal
      </Link>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Mark attendance
      </h1>
      <p className="mt-2 font-sans text-ink/60">
        {className ? (
          <>Class: <span className="font-semibold text-ink">{className}</span></>
        ) : (
          "No class is assigned to your account yet."
        )}
      </p>

      <div className="mt-8">
        {!className ? (
          <div className="rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            Your account has no class assigned. Please sign up again selecting a
            class, or ask the admin to assign one (coming in a later phase).
          </div>
        ) : (students ?? []).length === 0 ? (
          <div className="rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            No students are enrolled in {className} yet. Students appear here once
            they sign up and select this class.
          </div>
        ) : (
          <AttendanceForm
            students={students ?? []}
            date={date}
            initialStatuses={initialStatuses}
          />
        )}
      </div>
    </div>
  );
}
