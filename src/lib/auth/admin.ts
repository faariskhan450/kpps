import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { ADMIN_COOKIE } from "./constants";

// Admin auth is NOT stored in the database — it reads the email/password
// from environment variables. Change them in .env.local (or Vercel) and
// the login updates immediately. Nothing here is ever sent to the browser.

export { ADMIN_COOKIE };
const SESSION_HOURS = 12;

function secret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "fallback-secret"
  );
}

/** Check submitted credentials against the environment values. */
export function checkAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  return (
    email.trim().toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  );
}

/** Create a signed token like "<expiry>.<signature>". */
export function createAdminToken() {
  const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = String(expiry);
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

/** Verify a token: signature must match and it must not be expired. */
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  // Constant-time compare to avoid timing attacks
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiry = Number(payload);
  return Number.isFinite(expiry) && Date.now() < expiry;
}
