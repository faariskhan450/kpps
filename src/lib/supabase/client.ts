import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for code that runs in the BROWSER
 * (e.g. interactive Client Components).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
