import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js runs this on every matching request (before the page loads).
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Run on everything except static files and images
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
