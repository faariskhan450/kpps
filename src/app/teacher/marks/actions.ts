"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type MarkState = { ok?: boolean; message?: string };

export async function saveMark(
  _prev: MarkState,
  formData: FormData
): Promise<MarkState> {
  const studentId = String(formData.get("student_id") ?? "");
  const subject = String(formData.get("subject") ?? "").trim();
  const term = String(formData.get("term") ?? "").trim();
  const score = Number(formData.get("score"));
  const maxScore = Number(formData.get("max_score")) || 100;

  if (!studentId) return { ok: false, message: "Select a student." };
  if (!subject) return { ok: false, message: "Enter a subject." };
  if (!term) return { ok: false, message: "Enter a term." };
  if (!Number.isFinite(score) || score < 0)
    return { ok: false, message: "Enter a valid score." };

  const supabase = await createClient();
  // Upsert so re-entering the same subject+term updates instead of duplicating
  const { error } = await supabase
    .from("marks")
    .upsert(
      { student_id: studentId, subject, term, score, max_score: maxScore },
      { onConflict: "student_id,subject,term" }
    );

  if (error) return { ok: false, message: "Could not save the mark." };
  revalidatePath("/teacher/marks");
  return { ok: true, message: "Mark saved." };
}

export async function deleteMark(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("marks").delete().eq("id", id);
  revalidatePath("/teacher/marks");
}
