import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Hit on a daily schedule (see vercel.json) to keep the free Supabase
// project from pausing. It runs one tiny read query.
export async function GET() {
  try {
    const supabase = await createClient();
    await supabase.from("events").select("id").limit(1);
    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
