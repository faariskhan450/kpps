import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";
import { TeacherMarksForm } from "@/components/teacher-marks-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteMark } from "./actions";

export const metadata = { title: "Marks — Kids Planet School" };

type MarkRow = {
  id: string;
  subject: string;
  term: string;
  score: number;
  max_score: number;
  students: { full_name: string | null } | { full_name: string | null }[] | null;
};

export default async function TeacherMarksPage() {
  const { profile } = await getUserProfile();
  const supabase = await createClient();

  const { data: students } = await supabase
    .from("students")
    .select("id, full_name")
    .order("full_name");

  const { data: marks } = await supabase
    .from("marks")
    .select("id, subject, term, score, max_score, students(full_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link href="/teacher" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Marks &amp; grades
      </h1>
      <p className="mt-2 font-sans text-ink/60">
        {profile?.class_name ?? "No class assigned."}
      </p>

      <div className="mt-8">
        <TeacherMarksForm students={students ?? []} />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        Recorded marks ({(marks ?? []).length})
      </h2>
      <div className="mt-4 space-y-3">
        {((marks ?? []) as MarkRow[]).map((m) => {
          const st = Array.isArray(m.students) ? m.students[0] : m.students;
          return (
            <div key={m.id} className="flex items-center justify-between gap-4 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{st?.full_name ?? "Unknown"}</p>
                <p className="font-sans text-xs text-ink/50">{m.subject} · {m.term}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold text-deep">{m.score}/{m.max_score}</span>
                <form action={deleteMark}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmDeleteButton title="Delete mark?" message="This mark will be removed." ariaLabel="Delete mark" />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
