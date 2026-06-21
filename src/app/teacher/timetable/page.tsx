import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";
import { TeacherTimetableForm } from "@/components/teacher-timetable-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { DAYS } from "@/lib/days";
import { deleteTimetableEntry } from "./actions";

export const metadata = { title: "Timetable — Kids Planet School" };

type Entry = { id: string; day_of_week: number; period: number; subject: string; time_label: string | null };

export default async function TeacherTimetablePage() {
  const { profile } = await getUserProfile();
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("timetable")
    .select("id, day_of_week, period, subject, time_label")
    .order("period", { ascending: true });

  const byDay = (day: number) =>
    ((entries ?? []) as Entry[]).filter((e) => e.day_of_week === day).sort((a, b) => a.period - b.period);

  return (
    <div>
      <Link href="/teacher" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to portal
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Class timetable
      </h1>
      <p className="mt-2 font-sans text-ink/60">{profile?.class_name ?? "No class assigned."}</p>

      <div className="mt-8">
        <TeacherTimetableForm />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DAYS.map((d) => {
          const periods = byDay(d.value);
          return (
            <div key={d.value} className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
              <h3 className="font-display text-lg font-semibold text-ink">{d.label}</h3>
              {periods.length === 0 ? (
                <p className="mt-3 font-sans text-sm text-ink/40">No periods.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {periods.map((e) => (
                    <div key={e.id} className="flex items-center justify-between rounded-xl bg-canvas px-4 py-2.5">
                      <div>
                        <p className="font-sans text-sm font-semibold text-ink">{e.subject}</p>
                        <p className="font-sans text-xs text-ink/50">P{e.period}{e.time_label ? ` · ${e.time_label}` : ""}</p>
                      </div>
                      <form action={deleteTimetableEntry}>
                        <input type="hidden" name="id" value={e.id} />
                        <ConfirmDeleteButton title="Delete period?" message="This timetable entry will be removed." ariaLabel="Delete period" />
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
