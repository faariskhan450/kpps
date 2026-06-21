"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

export type HwState = { ok?: boolean; message?: string };

export async function addHomework(
  _prev: HwState,
  formData: FormData
): Promise<HwState> {
  const { user, profile } = await getUserProfile();
  if (!user || profile?.role !== "teacher" || !profile.class_name)
    return { ok: false, message: "Not allowed." };

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const dueDate = String(formData.get("due_date") ?? "") || null;

  if (!title) return { ok: false, message: "Please enter a title." };

  const supabase = await createClient();
  const { error } = await supabase.from("homework").insert({
    class_name: profile.class_name,
    title,
    description,
    due_date: dueDate,
  });

  if (error) return { ok: false, message: "Could not add homework." };
  revalidatePath("/teacher/homework");
  return { ok: true, message: "Homework added." };
}

export async function deleteHomework(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("homework").delete().eq("id", id);
  revalidatePath("/teacher/homework");
}
