import { createClient } from "@/lib/supabase/server";

export type Role = "teacher" | "student";

/**
 * Returns the logged-in user and their profile (role + name),
 * or nulls if not logged in.
 */
export async function getUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email, class_name")
    .eq("id", user.id)
    .single();

  return { user, profile };
}
