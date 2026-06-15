"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2, CheckCircle2 } from "lucide-react";
import { saveAttendance, type AttendanceState } from "@/app/teacher/attendance/actions";

type Student = { id: string; full_name: string | null; roll_number: string | null };
type Status = "present" | "absent";

const initial: AttendanceState = {};

export function AttendanceForm({
  students,
  date,
  initialStatuses,
}: {
  students: Student[];
  date: string;
  initialStatuses: Record<string, Status>;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveAttendance, initial);

  // Each student's current choice (default present if not previously marked)
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => {
    const start: Record<string, Status> = {};
    for (const s of students) start[s.id] = initialStatuses[s.id] ?? "present";
    return start;
  });

  const setStatus = (id: string, value: Status) =>
    setStatuses((prev) => ({ ...prev, [id]: value }));

  return (
    <div>
      {/* Date picker — changing it reloads existing records for that day */}
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="att-date" className="font-sans text-sm font-medium text-ink">
          Date
        </label>
        <input
          id="att-date"
          type="date"
          defaultValue={date}
          onChange={(e) =>
            router.push(`/teacher/attendance?date=${e.target.value}`)
          }
          className="rounded-xl border border-ink/15 bg-surface px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-deep"
        />
      </div>

      <form action={formAction} className="mt-6">
        <input type="hidden" name="date" value={date} />

        <div className="overflow-hidden rounded-3xl bg-surface shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          {students.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${
                i > 0 ? "border-t border-ink/8" : ""
              }`}
            >
              {/* Keeps each student's status in the submitted form data */}
              <input type="hidden" name={`status-${s.id}`} value={statuses[s.id]} />

              <div>
                <p className="font-sans text-sm font-semibold text-ink">
                  {s.full_name ?? "Unnamed student"}
                </p>
                {s.roll_number && (
                  <p className="font-sans text-xs text-ink/50">Roll {s.roll_number}</p>
                )}
              </div>

              {/* Present / Absent segmented control */}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setStatus(s.id, "present")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                    statuses[s.id] === "present"
                      ? "bg-deep text-surface"
                      : "bg-canvas text-ink/60 hover:text-ink"
                  }`}
                >
                  <Check size={15} /> Present
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(s.id, "absent")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                    statuses[s.id] === "absent"
                      ? "bg-red-500 text-white"
                      : "bg-canvas text-ink/60 hover:text-ink"
                  }`}
                >
                  <X size={15} /> Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-deep px-8 py-3.5 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60"
          >
            {pending && <Loader2 size={16} className="animate-spin" />}
            {pending ? "Saving..." : "Save attendance"}
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
    </div>
  );
}
