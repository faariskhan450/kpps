"use client";

// The Apply Now form. It calls the server action `submitEnquiry`.
// React's useActionState tracks the result (success / errors) and
// whether the form is currently submitting (so we can disable the button).

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/admissions/actions";

const initialState: EnquiryState = { status: "idle" };

const classOptions = [
  "Playgroup",
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
];

// Small helper for consistent input styling
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 font-sans text-xs text-red-600">{msg}</p>;
}

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialState
  );

  // Success screen replaces the form once submitted
  if (state.status === "success") {
    return (
      <div className="rounded-3xl bg-surface p-10 text-center shadow-[0_10px_40px_rgba(19,48,41,0.06)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/25 text-deep">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
          Enquiry received
        </h3>
        <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-ink/65">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.06)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="font-sans text-sm font-medium text-ink">
            Parent name
          </label>
          <input id="parentName" name="parentName" className={`mt-1.5 ${inputClass}`} placeholder="Your full name" />
          <FieldError msg={state.errors?.parentName} />
        </div>

        <div>
          <label htmlFor="childName" className="font-sans text-sm font-medium text-ink">
            Child name
          </label>
          <input id="childName" name="childName" className={`mt-1.5 ${inputClass}`} placeholder="Your child's name" />
          <FieldError msg={state.errors?.childName} />
        </div>

        <div>
          <label htmlFor="childAgeGrade" className="font-sans text-sm font-medium text-ink">
            Applying for
          </label>
          <select id="childAgeGrade" name="childAgeGrade" defaultValue="" className={`mt-1.5 ${inputClass}`}>
            <option value="" disabled>
              Select a class
            </option>
            {classOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <FieldError msg={state.errors?.childAgeGrade} />
        </div>

        <div>
          <label htmlFor="phone" className="font-sans text-sm font-medium text-ink">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={`mt-1.5 ${inputClass}`} placeholder="+91 ..." />
          <FieldError msg={state.errors?.phone} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="font-sans text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" className={`mt-1.5 ${inputClass}`} placeholder="you@example.com" />
          <FieldError msg={state.errors?.email} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="font-sans text-sm font-medium text-ink">
            Message <span className="text-ink/40">(optional)</span>
          </label>
          <textarea id="message" name="message" rows={4} className={`mt-1.5 ${inputClass} resize-none`} placeholder="Anything you'd like us to know?" />
        </div>
      </div>

      {/* General error banner */}
      {state.status === "error" && state.message && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-deep px-8 py-3.5 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60"
      >
        {pending && <Loader2 size={16} className="animate-spin" />}
        {pending ? "Sending..." : "Submit enquiry"}
      </button>
    </form>
  );
}
