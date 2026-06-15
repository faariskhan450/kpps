"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/auth/require-admin";

/** Mark an enquiry as new or contacted. */
export async function setEnquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("next") ?? "");
  if (!id || (next !== "new" && next !== "contacted")) return;

  const supabase = createAdminClient();
  await supabase.from("enquiries").update({ status: next }).eq("id", id);
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("enquiries").delete().eq("id", id);
  revalidatePath("/admin/enquiries");
}
