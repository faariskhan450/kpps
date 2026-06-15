import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";
import { PortalShell } from "@/components/portal-shell";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getUserProfile();

  // Not logged in → go to teacher login
  if (!user) redirect("/login/teacher");

  // Logged in but not a teacher → send them to where they belong
  if (profile?.role !== "teacher") {
    redirect(profile?.role === "student" ? "/student" : "/login/teacher");
  }

  return (
    <PortalShell
      title="Teacher Portal"
      name={profile?.full_name ?? undefined}
      signOut={signOut}
    >
      {children}
    </PortalShell>
  );
}
