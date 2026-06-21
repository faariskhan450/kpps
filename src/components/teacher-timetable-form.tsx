"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { addTimetableEntry, type TTState } from "@/app/teacher/timetable/actions";
import { DAYS } from "@/lib/days";

const initial: TTState = {};
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

export function TeacherTimetableForm() {
  const [state, formAction, pending] = useActionState(addTimetableEntry, initial);

  return (
    <form action={formAction} className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h2 className="font-display text-xl font-semibold text-ink">Add / update a period</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <select name="day_of_week" defaultValue="" className={inputClass}>
          <option value="" disabled>Day</option>
          {DAYS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
        <input name="period" type="number" min="1" max="12" className={inputClass} placeholder="Period number (1, 2, ...)" />
        <input name="subject" className={inputClass} placeholder="Subject" />
        <input name="time_label" className={inputClass} placeholder="Time (e.g. 9:00 - 9:45)" />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-7 py-3 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60">
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Saving..." : "Save period"}
        </button>
        {state.ok && <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-deep"><CheckCircle2 size={16} /> {state.message}</span>}
        {state.ok === false && state.message && <span className="font-sans text-sm text-red-600">{state.message}</span>}
      </div>
    </form>
  );
}
