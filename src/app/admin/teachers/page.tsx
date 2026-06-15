import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { AdminTeacherForm } from "@/components/admin-teacher-form";
import { CLASS_OPTIONS } from "@/lib/classes";
import { updateTeacherClass, deleteTeacher } from "./actions";

export const metadata = { title: "Teachers — Admin — Kids Planet School" };

export default async function AdminTeachersPage() {
  const supabase = createAdminClient();
  const { data: teachers } = await supabase
    .from("profiles")
    .select("id, full_name, email, class_name")
    .eq("role", "teacher")
    .order("full_name");

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Teachers
      </h1>

      <div className="mt-8">
        <AdminTeacherForm />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        All teachers ({(teachers ?? []).length})
      </h2>
      {(teachers ?? []).length === 0 ? (
        <div className="mt-4 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No teachers yet.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {(teachers ?? []).map((t) => (
            <div key={t.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{t.full_name ?? "Unnamed"}</p>
                <p className="font-sans text-xs text-ink/50">{t.email ?? "—"}</p>
              </div>
              <div className="flex items-center gap-2">
                <form action={updateTeacherClass} className="flex items-center gap-2">
                  <input type="hidden" name="profile_id" value={t.id} />
                  <select name="class_name" defaultValue={t.class_name ?? ""} className="rounded-xl border border-ink/15 bg-surface px-3 py-2 font-sans text-sm text-ink outline-none focus:border-deep">
                    <option value="" disabled>Class</option>
                    {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button type="submit" className="rounded-full border border-ink/15 px-3 py-2 font-sans text-xs font-semibold text-ink transition-colors hover:border-deep hover:text-deep">
                    Save
                  </button>
                </form>
                <form action={deleteTeacher}>
                  <input type="hidden" name="profile_id" value={t.id} />
                  <button type="submit" aria-label="Delete teacher" className="rounded-full p-2 text-ink/40 transition-colors hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
