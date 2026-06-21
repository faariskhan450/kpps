"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

export type TTState = { ok?: boolean; message?: string };

export async function addTimetableEntry(
  _prev: TTState,
  formData: FormData
): Promise<TTState> {
  const { user, profile } = await getUserProfile();
  if (!user || profile?.role !== "teacher" || !profile.class_name)
    return { ok: false, message: "Not allowed." };

  const day = Number(formData.get("day_of_week"));
  const period = Number(formData.get("period"));
  const subject = String(formData.get("subject") ?? "").trim();
  const timeLabel = String(formData.get("time_label") ?? "").trim() || null;

  if (!day || !period) return { ok: false, message: "Choose day and period." };
  if (!subject) return { ok: false, message: "Enter a subject." };

  const supabase = await createClient();
  // Upsert so editing the same day+period replaces it
  const { error } = await supabase.from("timetable").upsert(
    {
      class_name: profile.class_name,
      day_of_week: day,
      period,
      subject,
      time_label: timeLabel,
    },
    { onConflict: "class_name,day_of_week,period" }
  );

  if (error) return { ok: false, message: "Could not save the entry." };
  revalidatePath("/teacher/timetable");
  return { ok: true, message: "Saved." };
}

export async function deleteTimetableEntry(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("timetable").delete().eq("id", id);
  revalidatePath("/teacher/timetable");
}
