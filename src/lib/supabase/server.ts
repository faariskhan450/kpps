import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import WebSocketImpl from "ws";

// Node.js < 22 has no built-in WebSocket, which the Supabase client expects.
// Provide one so the client can be constructed on the server.
// (This workaround can be removed once Node is upgraded to v22+.)
if (typeof (globalThis as { WebSocket?: unknown }).WebSocket === "undefined") {
  (globalThis as { WebSocket?: unknown }).WebSocket = WebSocketImpl;
}

/**
 * Supabase client for code that runs on the SERVER
 * (Server Components, Server Actions, route handlers).
 *
 * It reads/writes cookies so that, later, logged-in sessions are
 * remembered across page loads. For now it also handles our
 * enquiry form submission securely on the server.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // This can be called from a Server Component where cookies
            // are read-only. Safe to ignore — middleware refreshes sessions.
          }
        },
      },
    }
  );
}
