"use server";

// Server Actions for authentication. These run only on the server.

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_COOKIE, checkAdminCredentials, createAdminToken } from "./admin";

export type AuthState = { error?: string };

const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

/** Create a new teacher or student account. */
export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "");
  const className = String(formData.get("class_name") ?? "").trim();

  if (role !== "teacher" && role !== "student")
    return { error: "Something went wrong. Please try again." };
  if (!fullName) return { error: "Please enter your full name." };
  if (!emailOk(email)) return { error: "Please enter a valid email address." };
  if (password.length < 6)
    return { error: "Password must be at least 6 characters." };
  if (!className) return { error: "Please choose a class." };

  const supabase = await createClient();
  // The role, name, and class are saved as user metadata; a database
  // trigger then creates the matching profile (and student) rows.
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role, full_name: fullName, class_name: className } },
  });

  if (error) return { error: error.message };

  // With email confirmation disabled, the user is now signed in.
  redirect(`/${role}`);
}

/** Log in. Routes to the dashboard that matches the account's role. */
export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password)
    return { error: "Please enter your email and password." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) return { error: "Invalid email or password." };

  // The account's stored role decides where they go — not which form they used.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role === "teacher" ? "teacher" : "student";
  redirect(`/${role}`);
}

/** Log out a teacher/student. */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/** Admin login — checks credentials from environment variables. */
export async function adminSignIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkAdminCredentials(email, password))
    return { error: "Invalid admin credentials." };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });

  redirect("/admin");
}

/** Admin logout. */
export async function adminSignOut() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/");
}
