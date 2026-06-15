import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Reveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Admin Login — Kids Planet School",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-md px-5 pb-20 pt-24 sm:px-8">
      <Reveal>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-deep text-surface">
          <ShieldCheck size={26} />
        </div>
        <h1 className="mt-4 text-center font-display text-4xl font-semibold tracking-tight text-ink">
          Admin access
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-center font-sans text-sm text-ink/60">
          Restricted area. Please sign in with admin credentials.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </Reveal>
    </div>
  );
}
