"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createFee, type FeeState } from "@/app/admin/fees/actions";

type Student = { id: string; full_name: string | null; grade: string | null };

const initial: FeeState = {};

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

export function AdminFeeForm({ students }: { students: Student[] }) {
  const [state, formAction, pending] = useActionState(createFee, initial);

  return (
    <form
      action={formAction}
      className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]"
    >
      <h2 className="font-display text-xl font-semibold text-ink">Add a fee</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fee-student" className="font-sans text-sm font-medium text-ink">
            Student
          </label>
          <select id="fee-student" name="student_id" defaultValue="" className={`mt-1.5 ${inputClass}`}>
            <option value="" disabled>Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.full_name ?? "Unnamed"} {s.grade ? `— ${s.grade}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fee-amount" className="font-sans text-sm font-medium text-ink">
            Amount (₹)
          </label>
          <input id="fee-amount" name="amount" type="number" min="1" step="1" className={`mt-1.5 ${inputClass}`} placeholder="e.g. 5000" />
        </div>

        <div>
          <label htmlFor="fee-due" className="font-sans text-sm font-medium text-ink">
            Due date
          </label>
          <input id="fee-due" name="due_date" type="date" className={`mt-1.5 ${inputClass}`} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="fee-desc" className="font-sans text-sm font-medium text-ink">
            Description <span className="text-ink/40">(optional)</span>
          </label>
          <input id="fee-desc" name="description" className={`mt-1.5 ${inputClass}`} placeholder="e.g. Term 1 tuition fee" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-7 py-3 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60"
        >
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Adding..." : "Add fee"}
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
