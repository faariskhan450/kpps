"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/auth/require-admin";

export type ManageState = { ok?: boolean; message?: string };

const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

/** Create a new student account (they can log in immediately). */
export async function addStudent(
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
  if (!className) return { ok: false, message: "Please choose a class." };

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip email verification — admin created it
    user_metadata: { role: "student", full_name: fullName, class_name: className },
  });

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/students");
  return { ok: true, message: "Student account created." };
}

/** Reassign a student's class. */
export async function updateStudentClass(formData: FormData) {
  await requireAdmin();
  const studentId = String(formData.get("student_id") ?? "");
  const profileId = String(formData.get("profile_id") ?? "");
  const className = String(formData.get("class_name") ?? "");
  if (!studentId || !className) return;

  const supabase = createAdminClient();
  await supabase.from("students").update({ grade: className }).eq("id", studentId);
  if (profileId) {
    await supabase.from("profiles").update({ class_name: className }).eq("id", profileId);
  }
  revalidatePath("/admin/students");
}

/** Delete a student account (cascades profile, attendance, fees). */
export async function deleteStudent(formData: FormData) {
  await requireAdmin();
  const profileId = String(formData.get("profile_id") ?? "");
  if (!profileId) return;

  const supabase = createAdminClient();
  await supabase.auth.admin.deleteUser(profileId);
  revalidatePath("/admin/students");
}
