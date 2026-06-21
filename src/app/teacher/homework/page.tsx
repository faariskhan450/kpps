import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";
import { TeacherHomeworkForm } from "@/components/teacher-homework-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteHomework } from "./actions";

export const metadata = { title: "Homework — Kids Planet School" };

export default async function TeacherHomeworkPage() {
  const { profile } = await getUserProfile();
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("homework")
    .select("id, title, description, due_date")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link href="/teacher" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Homework
      </h1>
      <p className="mt-2 font-sans text-ink/60">
        {profile?.class_name ? `For ${profile.class_name}` : "No class assigned."}
      </p>

      {profile?.class_name && (
        <div className="mt-8">
          <TeacherHomeworkForm />
        </div>
      )}

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        Assigned ({(items ?? []).length})
      </h2>
      <div className="mt-4 space-y-3">
        {(items ?? []).map((h) => (
          <div key={h.id} className="flex items-start justify-between gap-4 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            <div>
              <p className="font-sans text-sm font-semibold text-ink">{h.title}</p>
              {h.description && <p className="mt-1 font-sans text-sm text-ink/60">{h.description}</p>}
              {h.due_date && <p className="mt-1 font-sans text-xs font-semibold text-teal">Due {h.due_date}</p>}
            </div>
            <form action={deleteHomework}>
              <input type="hidden" name="id" value={h.id} />
              <ConfirmDeleteButton title="Delete homework?" message="This assignment will be removed." ariaLabel="Delete homework" />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
