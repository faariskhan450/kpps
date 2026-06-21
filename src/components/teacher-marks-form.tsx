"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { saveMark, type MarkState } from "@/app/teacher/marks/actions";

type Student = { id: string; full_name: string | null };

const initial: MarkState = {};
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

export function TeacherMarksForm({ students }: { students: Student[] }) {
  const [state, formAction, pending] = useActionState(saveMark, initial);

  return (
    <form action={formAction} className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h2 className="font-display text-xl font-semibold text-ink">Enter a mark</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <select name="student_id" defaultValue="" className={`${inputClass} sm:col-span-2`}>
          <option value="" disabled>Select student</option>
          {students.map((s) => <option key={s.id} value={s.id}>{s.full_name ?? "Unnamed"}</option>)}
        </select>
        <input name="subject" className={inputClass} placeholder="Subject (e.g. Maths)" />
        <input name="term" className={inputClass} placeholder="Term (e.g. Term 1)" />
        <input name="score" type="number" min="0" step="0.5" className={inputClass} placeholder="Score" />
        <input name="max_score" type="number" min="1" step="1" defaultValue={100} className={inputClass} placeholder="Out of (max)" />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-7 py-3 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60">
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Saving..." : "Save mark"}
        </button>
        {state.ok && <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-deep"><CheckCircle2 size={16} /> {state.message}</span>}
        {state.ok === false && state.message && <span className="font-sans text-sm text-red-600">{state.message}</span>}
      </div>
    </form>
  );
}
