import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client for ADMIN operations only.
 *
 * It uses the service-role key, which BYPASSES row-level security, so it
 * can read/write any table. It must only ever be used in server code that
 * has already verified the admin is logged in. Never import this into a
 * Client Component — the "server-only" guard above will error if you do.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
