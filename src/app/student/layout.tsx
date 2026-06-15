import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";
import { PortalShell } from "@/components/portal-shell";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getUserProfile();

  if (!user) redirect("/login/student");

  if (profile?.role !== "student") {
    redirect(profile?.role === "teacher" ? "/teacher" : "/login/student");
  }

  return (
    <PortalShell
      title="Student & Parent Portal"
      name={profile?.full_name ?? undefined}
      signOut={signOut}
    >
      {children}
    </PortalShell>
  );
}
