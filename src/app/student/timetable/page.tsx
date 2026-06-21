import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DAYS } from "@/lib/days";

export const metadata = { title: "Timetable — Kids Planet School" };

type Entry = { day_of_week: number; period: number; subject: string; time_label: string | null };

export default async function StudentTimetablePage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("timetable")
    .select("day_of_week, period, subject, time_label")
    .order("period", { ascending: true });

  const all = (entries ?? []) as Entry[];
  const byDay = (day: number) =>
    all.filter((e) => e.day_of_week === day).sort((a, b) => a.period - b.period);

  return (
    <div>
      <Link href="/student" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        My timetable
      </h1>

      {all.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No timetable has been set yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DAYS.map((d) => {
            const periods = byDay(d.value);
            return (
              <div key={d.value} className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
                <h3 className="font-display text-lg font-semibold text-ink">{d.label}</h3>
                {periods.length === 0 ? (
                  <p className="mt-3 font-sans text-sm text-ink/40">No classes.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {periods.map((e, i) => (
                      <div key={i} className="rounded-xl bg-canvas px-4 py-2.5">
                        <p className="font-sans text-sm font-semibold text-ink">{e.subject}</p>
                        <p className="font-sans text-xs text-ink/50">P{e.period}{e.time_label ? ` · ${e.time_label}` : ""}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
