import "server-only";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "./admin";

/**
 * Throws if the current request is not an authenticated admin.
 * Call at the start of every admin Server Action.
 */
export async function requireAdmin() {
  const store = await cookies();
  if (!verifyAdminToken(store.get(ADMIN_COOKIE)?.value)) {
    throw new Error("Unauthorized");
  }
}
