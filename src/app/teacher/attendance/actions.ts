"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AttendanceState = { ok?: boolean; message?: string };

export async function saveAttendance(
  _prev: AttendanceState,
  formData: FormData
): Promise<AttendanceState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "You are not logged in." };

  const date = String(formData.get("date") ?? "");
  if (!date) return { ok: false, message: "Please choose a date." };

  // Collect every "status-<studentId>" field into attendance rows
  const rows: {
    student_id: string;
    date: string;
    status: string;
    marked_by: string;
  }[] = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("status-")) {
      const studentId = key.slice("status-".length);
      const status = String(value);
      if (status === "present" || status === "absent") {
        rows.push({ student_id: studentId, date, status, marked_by: user.id });
      }
    }
  }

  if (rows.length === 0) {
    return { ok: false, message: "There are no students to save." };
  }

  // Upsert: insert new rows, or update existing ones for the same
  // student + date (so re-saving never creates duplicates).
  const { error } = await supabase
    .from("attendance")
    .upsert(rows, { onConflict: "student_id,date" });

  if (error) {
    console.error("Attendance save failed:", error.message);
    return { ok: false, message: "Could not save attendance. Please try again." };
  }

  revalidatePath("/teacher/attendance");
  return { ok: true, message: "Attendance saved." };
}
