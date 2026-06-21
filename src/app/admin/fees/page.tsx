import Link from "next/link";
import { ArrowLeft, Check, Undo2 } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { AdminFeeForm } from "@/components/admin-fee-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { setFeeStatus, deleteFee } from "./actions";

export const metadata = { title: "Fees — Admin — Kids Planet School" };

function rupees(n: number) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export default async function AdminFeesPage() {
  const supabase = createAdminClient();

  const { data: students } = await supabase
    .from("students")
    .select("id, full_name, grade")
    .order("full_name");

  const { data: fees } = await supabase
    .from("fees")
    .select("id, amount, due_date, status, paid_date, description, students(full_name, grade)")
    .order("created_at", { ascending: false });

  const totalPaid = (fees ?? [])
    .filter((f) => f.status === "paid")
    .reduce((sum, f) => sum + Number(f.amount), 0);
  const totalOutstanding = (fees ?? [])
    .filter((f) => f.status === "unpaid")
    .reduce((sum, f) => sum + Number(f.amount), 0);

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep"
      >
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Fee management
      </h1>

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Collected</p>
          <p className="mt-1 font-display text-3xl font-semibold text-deep">{rupees(totalPaid)}</p>
        </div>
        <div className="rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          <p className="font-sans text-sm text-ink/60">Outstanding</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">{rupees(totalOutstanding)}</p>
        </div>
      </div>

      <div className="mt-8">
        <AdminFeeForm students={students ?? []} />
      </div>

      {/* Fees list */}
      <h2 className="mt-12 font-display text-xl font-semibold text-ink">All fees</h2>
      {(fees ?? []).length === 0 ? (
        <div className="mt-4 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No fees added yet.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {((fees ?? []) as FeeRow[]).map((f) => {
            const st = Array.isArray(f.students) ? f.students[0] : f.students;
            return (
              <div
                key={f.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">
                    {st?.full_name ?? "Unknown"}{" "}
                    <span className="font-normal text-ink/50">{st?.grade ? `· ${st.grade}` : ""}</span>
                  </p>
                  <p className="font-sans text-xs text-ink/50">
                    {f.description || "Fee"}
                    {f.due_date ? ` · due ${f.due_date}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-semibold text-ink">{rupees(f.amount)}</span>
                  {f.status === "paid" ? (
                    <span className="rounded-full bg-mint/25 px-3 py-1 font-sans text-xs font-semibold text-deep">Paid</span>
                  ) : (
                    <span className="rounded-full bg-red-50 px-3 py-1 font-sans text-xs font-semibold text-red-600">Unpaid</span>
                  )}

                  {/* Toggle paid/unpaid */}
                  <form action={setFeeStatus}>
                    <input type="hidden" name="id" value={f.id} />
                    <input type="hidden" name="next" value={f.status === "paid" ? "unpaid" : "paid"} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-sans text-xs font-semibold text-ink transition-colors hover:border-deep hover:text-deep"
                    >
                      {f.status === "paid" ? <Undo2 size={13} /> : <Check size={13} />}
                      {f.status === "paid" ? "Mark unpaid" : "Mark paid"}
                    </button>
                  </form>

                  {/* Delete */}
                  <form action={deleteFee}>
                    <input type="hidden" name="id" value={f.id} />
                    <ConfirmDeleteButton title="Delete fee?" message="This fee record will be permanently removed." ariaLabel="Delete fee" />
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

type FeeRow = {
  id: string;
  amount: number;
  due_date: string | null;
  status: string;
  paid_date: string | null;
  description: string | null;
  students:
    | { full_name: string | null; grade: string | null }
    | { full_name: string | null; grade: string | null }[]
    | null;
};
