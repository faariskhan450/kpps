"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/auth/admin";

// Every admin action re-checks the signed admin cookie, so actions can't
// be called by anyone who isn't actually logged in as admin.
async function requireAdmin() {
  const store = await cookies();
  if (!verifyAdminToken(store.get(ADMIN_COOKIE)?.value)) {
    throw new Error("Unauthorized");
  }
}

export type FeeState = { ok?: boolean; message?: string };

export async function createFee(
  _prev: FeeState,
  formData: FormData
): Promise<FeeState> {
  await requireAdmin();

  const studentId = String(formData.get("student_id") ?? "");
  const amount = Number(formData.get("amount"));
  const dueDate = String(formData.get("due_date") ?? "") || null;
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!studentId) return { ok: false, message: "Please select a student." };
  if (!Number.isFinite(amount) || amount <= 0)
    return { ok: false, message: "Please enter a valid amount." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("fees")
    .insert({ student_id: studentId, amount, due_date: dueDate, description });

  if (error) {
    console.error("Create fee failed:", error.message);
    return { ok: false, message: "Could not create the fee." };
  }

  revalidatePath("/admin/fees");
  return { ok: true, message: "Fee added." };
}

/** Toggle a fee between paid and unpaid. */
export async function setFeeStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("next") ?? "");
  if (!id || (next !== "paid" && next !== "unpaid")) return;

  const supabase = createAdminClient();
  await supabase
    .from("fees")
    .update({
      status: next,
      paid_date: next === "paid" ? new Date().toISOString().slice(0, 10) : null,
    })
    .eq("id", id);

  revalidatePath("/admin/fees");
}

export async function deleteFee(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("fees").delete().eq("id", id);

  revalidatePath("/admin/fees");
}
