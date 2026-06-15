import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

export const metadata = { title: "My Fees — Kids Planet School" };

function rupees(n: number) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export default async function StudentFeesPage() {
  const { user } = await getUserProfile();
  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("profile_id", user!.id)
    .single();

  const { data: fees } = student
    ? await supabase
        .from("fees")
        .select("id, amount, due_date, status, paid_date, description")
        .eq("student_id", student.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const paid = (fees ?? [])
    .filter((f) => f.status === "paid")
    .reduce((s, f) => s + Number(f.amount), 0);
  const outstanding = (fees ?? [])
    .filter((f) => f.status === "unpaid")
    .reduce((s, f) => s + Number(f.amount), 0);

  return (
    <div>
      <Link
        href="/student"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep"
      >
        <ArrowLeft size={15} /> Back to portal
      </Link>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        My fees
      </h1>

      {/* Summary */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Total paid</p>
          <p className="mt-1 font-display text-4xl font-semibold text-deep">{rupees(paid)}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-teal to-deep p-7 text-surface">
          <p className="font-sans text-sm text-surface/80">Outstanding</p>
          <p className="mt-1 font-display text-4xl font-semibold">{rupees(outstanding)}</p>
        </div>
      </div>

      {/* List */}
      <h2 className="mt-12 font-display text-xl font-semibold text-ink">Fee details</h2>
      {(fees ?? []).length === 0 ? (
        <div className="mt-4 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No fees have been added to your account yet.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {(fees ?? []).map((f) => (
            <div
              key={f.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]"
            >
              <div>
                <p className="font-sans text-sm font-semibold text-ink">
                  {f.description || "Fee"}
                </p>
                <p className="font-sans text-xs text-ink/50">
                  {f.due_date ? `Due ${f.due_date}` : "No due date"}
                  {f.status === "paid" && f.paid_date ? ` · Paid ${f.paid_date}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-semibold text-ink">{rupees(f.amount)}</span>
                {f.status === "paid" ? (
                  <span className="rounded-full bg-mint/25 px-3 py-1 font-sans text-xs font-semibold text-deep">Paid</span>
                ) : (
                  <span className="rounded-full bg-red-50 px-3 py-1 font-sans text-xs font-semibold text-red-600">Unpaid</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
