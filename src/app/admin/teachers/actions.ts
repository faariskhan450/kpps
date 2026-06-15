"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/auth/require-admin";

export type ManageState = { ok?: boolean; message?: string };

const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

/** Create a new teacher account. */
export async function addTeacher(
  _prev: ManageState,
  formData: FormData
): Promise<ManageState> {
  await requireAdmin();

  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const className = String(formData.get("class_name") ?? "").trim();

  if (!fullName) return { ok: false, message: "Please enter a name." };
  if (!emailOk(email)) return { ok: false, message: "Enter a valid email." };
  if (password.length < 6) return { ok: false, message: "Password needs 6+ characters." };
  if (!className) return { ok: false, message: "Please choose a class to teach." };

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "teacher", full_name: fullName, class_name: className },
  });

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/teachers");
  return { ok: true, message: "Teacher account created." };
}

/** Reassign which class a teacher teaches. */
export async function updateTeacherClass(formData: FormData) {
  await requireAdmin();
  const profileId = String(formData.get("profile_id") ?? "");
  const className = String(formData.get("class_name") ?? "");
  if (!profileId || !className) return;

  const supabase = createAdminClient();
  await supabase.from("profiles").update({ class_name: className }).eq("id", profileId);
  revalidatePath("/admin/teachers");
}

export async function deleteTeacher(formData: FormData) {
  await requireAdmin();
  const profileId = String(formData.get("profile_id") ?? "");
  if (!profileId) return;

  const supabase = createAdminClient();
  await supabase.auth.admin.deleteUser(profileId);
  revalidatePath("/admin/teachers");
}
