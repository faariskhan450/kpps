"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { adminSignIn, type AuthState } from "@/lib/auth/actions";

const initial: AuthState = {};

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminSignIn, initial);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.06)] sm:p-9"
    >
      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="admin-email" className="font-sans text-sm font-medium text-ink">
          Admin email
        </label>
        <input id="admin-email" name="email" type="email" className={`mt-1.5 ${inputClass}`} placeholder="admin@example.com" />
      </div>
      <div>
        <label htmlFor="admin-password" className="font-sans text-sm font-medium text-ink">
          Password
        </label>
        <input id="admin-password" name="password" type="password" className={`mt-1.5 ${inputClass}`} placeholder="••••••••" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-8 py-3.5 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60"
      >
        {pending && <Loader2 size={16} className="animate-spin" />}
        {pending ? "Please wait..." : "Log in as admin"}
      </button>
    </form>
  );
}
