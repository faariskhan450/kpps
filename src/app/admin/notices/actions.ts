"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/auth/require-admin";

export type NoticeState = { ok?: boolean; message?: string };

export async function addNotice(
  _prev: NoticeState,
  formData: FormData
): Promise<NoticeState> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const audience = String(formData.get("audience") ?? "all");

  if (!title) return { ok: false, message: "Please enter a title." };
  if (!body) return { ok: false, message: "Please enter the notice text." };
  if (!["all", "teachers", "students"].includes(audience))
    return { ok: false, message: "Invalid audience." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("notices")
    .insert({ title, body, audience });

  if (error) return { ok: false, message: "Could not post the notice." };

  revalidatePath("/admin/notices");
  return { ok: true, message: "Notice posted." };
}

export async function deleteNotice(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("notices").delete().eq("id", id);
  revalidatePath("/admin/notices");
}
