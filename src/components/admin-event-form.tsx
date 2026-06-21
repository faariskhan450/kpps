"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { addEvent, type EventState } from "@/app/admin/events/actions";

const initial: EventState = {};
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

const categories = ["performance", "sports", "arts", "celebration"];

export function AdminEventForm() {
  const [state, formAction, pending] = useActionState(addEvent, initial);

  return (
    <form action={formAction} className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h2 className="font-display text-xl font-semibold text-ink">Add an event</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <input name="title" className={inputClass} placeholder="Event title" />
        <input name="event_date" type="date" className={inputClass} />
        <select name="category" defaultValue="" className={inputClass}>
          <option value="" disabled>Category</option>
          {categories.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
        <input name="image" type="file" accept="image/*" className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-deep file:px-3 file:py-1 file:text-surface`} />
        <textarea name="description" rows={3} className={`${inputClass} sm:col-span-2 resize-none`} placeholder="Short description" />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-7 py-3 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60">
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Adding..." : "Add event"}
        </button>
        {state.ok && <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-deep"><CheckCircle2 size={16} /> {state.message}</span>}
        {state.ok === false && state.message && <span className="font-sans text-sm text-red-600">{state.message}</span>}
      </div>
    </form>
  );
}
