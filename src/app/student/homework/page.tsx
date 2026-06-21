import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Homework — Kids Planet School" };

function isOverdue(due: string | null) {
  if (!due) return false;
  return new Date(due) < new Date(new Date().toDateString());
}

export default async function StudentHomeworkPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("homework")
    .select("id, title, description, due_date")
    .order("due_date", { ascending: true });

  return (
    <div>
      <Link href="/student" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Homework
      </h1>

      {(items ?? []).length === 0 ? (
        <div className="mt-8 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No homework assigned right now.
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {(items ?? []).map((h) => (
            <div key={h.id} className="flex gap-4 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-mint/25 text-deep">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{h.title}</p>
                {h.description && <p className="mt-1 font-sans text-sm text-ink/60">{h.description}</p>}
                {h.due_date && (
                  <p className={`mt-1 font-sans text-xs font-semibold ${isOverdue(h.due_date) ? "text-red-600" : "text-teal"}`}>
                    Due {h.due_date}{isOverdue(h.due_date) ? " · overdue" : ""}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
