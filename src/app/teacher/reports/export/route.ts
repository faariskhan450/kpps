import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/session";

// Returns the class attendance summary as a downloadable CSV file.
export async function GET() {
  const { user, profile } = await getUserProfile();
  if (!user || profile?.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, full_name")
    .order("full_name");

  const ids = (students ?? []).map((s) => s.id);
  const { data: attendance } = ids.length
    ? await supabase.from("attendance").select("student_id, status").in("student_id", ids)
    : { data: [] };

  const stats = new Map<string, { present: number; total: number }>();
  for (const a of attendance ?? []) {
    const cur = stats.get(a.student_id) ?? { present: 0, total: 0 };
    cur.total += 1;
    if (a.status === "present") cur.present += 1;
    stats.set(a.student_id, cur);
  }

  // Build CSV (escape quotes in names)
  const header = "Student,Present,Total,Percentage\n";
  const lines = (students ?? []).map((s) => {
    const st = stats.get(s.id) ?? { present: 0, total: 0 };
    const pct = st.total > 0 ? Math.round((st.present / st.total) * 100) : 0;
    const name = `"${(s.full_name ?? "Unnamed").replace(/"/g, '""')}"`;
    return `${name},${st.present},${st.total},${pct}%`;
  });
  const csv = header + lines.join("\n");

  const fileName = `attendance-${(profile.class_name ?? "class").replace(/\s+/g, "-")}.csv`;
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
