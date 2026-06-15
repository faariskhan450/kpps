"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn, signUp, type AuthState } from "@/lib/auth/actions";
import { CLASS_OPTIONS } from "@/lib/classes";

const initial: AuthState = {};

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-deep";

const labelClass = "font-sans text-sm font-medium text-ink";

function ErrorBanner({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="rounded-xl bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
      {msg}
    </p>
  );
}

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-8 py-3.5 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal disabled:opacity-60"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {pending ? "Please wait..." : label}
    </button>
  );
}

function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initial);
  return (
    <form action={formAction} className="space-y-4">
      <ErrorBanner msg={state.error} />
      <div>
        <label htmlFor="login-email" className={labelClass}>Email</label>
        <input id="login-email" name="email" type="email" className={`mt-1.5 ${inputClass}`} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="login-password" className={labelClass}>Password</label>
        <input id="login-password" name="password" type="password" className={`mt-1.5 ${inputClass}`} placeholder="••••••••" />
      </div>
      <SubmitButton label="Log in" pending={pending} />
    </form>
  );
}

function SignupForm({ role }: { role: "teacher" | "student" }) {
  const [state, formAction, pending] = useActionState(signUp, initial);
  return (
    <form action={formAction} className="space-y-4">
      {/* Tells the server which role this account should have */}
      <input type="hidden" name="role" value={role} />
      <ErrorBanner msg={state.error} />
      <div>
        <label htmlFor="signup-name" className={labelClass}>Full name</label>
        <input id="signup-name" name="fullName" className={`mt-1.5 ${inputClass}`} placeholder="Your full name" />
      </div>
      <div>
        <label htmlFor="signup-email" className={labelClass}>Email</label>
        <input id="signup-email" name="email" type="email" className={`mt-1.5 ${inputClass}`} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="signup-password" className={labelClass}>Password</label>
        <input id="signup-password" name="password" type="password" className={`mt-1.5 ${inputClass}`} placeholder="At least 6 characters" />
      </div>
      <div>
        <label htmlFor="signup-class" className={labelClass}>
          {role === "teacher" ? "Class you teach" : "Student's class"}
        </label>
        <select id="signup-class" name="class_name" defaultValue="" className={`mt-1.5 ${inputClass}`}>
          <option value="" disabled>
            Select a class
          </option>
          {CLASS_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <SubmitButton label="Create account" pending={pending} />
    </form>
  );
}

export function AuthForm({ role }: { role: "teacher" | "student" }) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.06)] sm:p-9">
      {/* Tabs */}
      <div className="mb-6 flex rounded-full bg-canvas p-1">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 rounded-full py-2 font-sans text-sm font-semibold transition-colors ${
              mode === m ? "bg-deep text-surface" : "text-ink/60 hover:text-ink"
            }`}
          >
            {m === "login" ? "Log in" : "Create account"}
          </button>
        ))}
      </div>

      {mode === "login" ? <LoginForm /> : <SignupForm role={role} />}
    </div>
  );
}
