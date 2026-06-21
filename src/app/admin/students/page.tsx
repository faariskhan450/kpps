import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { AdminStudentForm } from "@/components/admin-student-form";
import { ListControls } from "@/components/list-controls";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { CLASS_OPTIONS } from "@/lib/classes";
import { updateStudentClass, deleteStudent } from "./actions";

export const metadata = { title: "Students — Admin — Kids Planet School" };

const PAGE_SIZE = 10;

type Row = {
  id: string;
  full_name: string | null;
  grade: string | null;
  profile_id: string;
  profiles: { email: string | null } | { email: string | null }[] | null;
};

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page) || 1);

  const supabase = createAdminClient();
  let query = supabase
    .from("students")
    .select("id, full_name, grade, profile_id, profiles(email)", { count: "exact" });
  if (q) query = query.ilike("full_name", `%${q}%`);
  const { data: students, count } = await query
    .order("full_name")
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Students
      </h1>

      <div className="mt-8">
        <AdminStudentForm />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        All students ({count ?? 0})
      </h2>
      <div className="mt-4">
        <ListControls basePath="/admin/students" q={q} page={page} totalPages={totalPages} placeholder="Search by name..." />
      </div>

      {(students ?? []).length === 0 ? (
        <div className="mt-4 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No students found.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {((students ?? []) as Row[]).map((s) => {
            const prof = Array.isArray(s.profiles) ? s.profiles[0] : s.profiles;
            return (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">{s.full_name ?? "Unnamed"}</p>
                  <p className="font-sans text-xs text-ink/50">{prof?.email ?? "—"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <form action={updateStudentClass} className="flex items-center gap-2">
                    <input type="hidden" name="student_id" value={s.id} />
                    <input type="hidden" name="profile_id" value={s.profile_id} />
                    <select name="class_name" defaultValue={s.grade ?? ""} className="rounded-xl border border-ink/15 bg-surface px-3 py-2 font-sans text-sm text-ink outline-none focus:border-deep">
                      <option value="" disabled>Class</option>
                      {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button type="submit" className="rounded-full border border-ink/15 px-3 py-2 font-sans text-xs font-semibold text-ink transition-colors hover:border-deep hover:text-deep">
                      Save
                    </button>
                  </form>
                  <form action={deleteStudent}>
                    <input type="hidden" name="profile_id" value={s.profile_id} />
                    <ConfirmDeleteButton title="Delete student?" message="Their account, attendance, and fees will be permanently removed." ariaLabel="Delete student" />
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
