"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { addTeacher, type ManageState } from "@/app/admin/teachers/actions";
import { CLASS_OPTIONS } from "@/lib/classes";

const initial: ManageState = {};
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

export function AdminTeacherForm() {
  const [state, formAction, pending] = useActionState(addTeacher, initial);

  return (
    <form action={formAction} className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h2 className="font-display text-xl font-semibold text-ink">Add a teacher</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <input name="full_name" className={inputClass} placeholder="Full name" />
        <select name="class_name" defaultValue="" className={inputClass}>
          <option value="" disabled>Class they teach</option>
          {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name="email" type="email" className={inputClass} placeholder="Email" />
        <input name="password" type="text" className={inputClass} placeholder="Temporary password (6+ chars)" />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-7 py-3 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60">
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Creating..." : "Create teacher"}
        </button>
        {state.ok && (
          <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-deep">
            <CheckCircle2 size={16} /> {state.message}
          </span>
        )}
        {state.ok === false && state.message && (
          <span className="font-sans text-sm text-red-600">{state.message}</span>
        )}
      </div>
    </form>
  );
}
