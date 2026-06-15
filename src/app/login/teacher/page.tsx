import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { Reveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Teacher Login — Kids Planet School",
};

export default function TeacherLoginPage() {
  return (
    <div className="mx-auto max-w-md px-5 pb-20 pt-24 sm:px-8">
      <Reveal>
        <p className="text-center font-sans text-sm font-semibold uppercase tracking-widest text-teal">
          Teacher portal
        </p>
        <h1 className="mt-2 text-center font-display text-4xl font-semibold tracking-tight text-ink">
          Welcome, educator
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-center font-sans text-sm text-ink/60">
          Log in to manage attendance and your classes.
        </p>
        <div className="mt-8">
          <AuthForm role="teacher" />
        </div>
      </Reveal>
    </div>
  );
}
