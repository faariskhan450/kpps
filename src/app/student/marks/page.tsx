import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

export const metadata = { title: "Report Card — Kids Planet School" };

type Mark = { subject: string; term: string; score: number; max_score: number };

export default async function StudentMarksPage() {
  const { user } = await getUserProfile();
  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students").select("id").eq("profile_id", user!.id).single();

  const { data: marks } = student
    ? await supabase.from("marks").select("subject, term, score, max_score").eq("student_id", student.id)
    : { data: [] };

  // Group marks by term
  const byTerm = new Map<string, Mark[]>();
  for (const m of (marks ?? []) as Mark[]) {
    const list = byTerm.get(m.term) ?? [];
    list.push(m);
    byTerm.set(m.term, list);
  }

  return (
    <div>
      <Link href="/student" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Report card
      </h1>

      {byTerm.size === 0 ? (
        <div className="mt-8 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No marks have been recorded yet.
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {Array.from(byTerm.entries()).map(([term, list]) => {
            const totalScore = list.reduce((s, m) => s + Number(m.score), 0);
            const totalMax = list.reduce((s, m) => s + Number(m.max_score), 0);
            const pct = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
            return (
              <div key={term} className="overflow-hidden rounded-3xl bg-surface shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
                <div className="flex items-center justify-between bg-gradient-to-r from-teal to-deep px-6 py-4 text-surface">
                  <h2 className="font-display text-lg font-semibold">{term}</h2>
                  <span className="font-display text-lg font-semibold">{pct}%</span>
                </div>
                {list.map((m, i) => (
                  <div key={i} className={`flex items-center justify-between px-6 py-3 ${i > 0 ? "border-t border-ink/8" : ""}`}>
                    <span className="font-sans text-sm text-ink">{m.subject}</span>
                    <span className="font-sans text-sm font-semibold text-deep">{m.score}/{m.max_score}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
