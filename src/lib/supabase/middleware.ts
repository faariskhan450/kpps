import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth/constants";

// Stub WebSocket so the Supabase client can be created in the Edge
// runtime without probing for a real one (we never use realtime here).
class NoopWebSocket {}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      realtime: { transport: NoopWebSocket as any },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the auth session (keeps logged-in users logged in)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Guard student/teacher dashboards: must be logged in.
  // (Role matching is enforced in each dashboard's layout.)
  if (path.startsWith("/teacher") && !user) {
    return NextResponse.redirect(new URL("/login/teacher", request.url));
  }
  if (path.startsWith("/student") && !user) {
    return NextResponse.redirect(new URL("/login/student", request.url));
  }

  // Guard admin dashboard: must have an admin cookie present.
  // (The cookie's signature is fully verified in the admin layout.)
  if (path.startsWith("/admin")) {
    const hasAdminCookie = request.cookies.get(ADMIN_COOKIE);
    if (!hasAdminCookie) {
      return NextResponse.redirect(new URL("/login/admin", request.url));
    }
  }

  return response;
}
