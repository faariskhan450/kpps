"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { addNotice, type NoticeState } from "@/app/admin/notices/actions";

const initial: NoticeState = {};
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

export function AdminNoticeForm() {
  const [state, formAction, pending] = useActionState(addNotice, initial);

  return (
    <form action={formAction} className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h2 className="font-display text-xl font-semibold text-ink">Post a notice</h2>
      <div className="mt-5 space-y-4">
        <input name="title" className={inputClass} placeholder="Title" />
        <textarea name="body" rows={3} className={`${inputClass} resize-none`} placeholder="Write your announcement..." />
        <div>
          <label htmlFor="notice-audience" className="font-sans text-sm font-medium text-ink">Audience</label>
          <select id="notice-audience" name="audience" defaultValue="all" className={`mt-1.5 ${inputClass}`}>
            <option value="all">Everyone</option>
            <option value="teachers">Teachers only</option>
            <option value="students">Students &amp; parents only</option>
          </select>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-7 py-3 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60">
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Posting..." : "Post notice"}
        </button>
        {state.ok && <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-deep"><CheckCircle2 size={16} /> {state.message}</span>}
        {state.ok === false && state.message && <span className="font-sans text-sm text-red-600">{state.message}</span>}
      </div>
    </form>
  );
}
