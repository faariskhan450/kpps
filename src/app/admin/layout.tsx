import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/auth/admin";
import { adminSignOut } from "@/lib/auth/actions";
import { PortalShell } from "@/components/portal-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  // Fully verify the signed admin cookie (signature + not expired)
  if (!verifyAdminToken(token)) {
    redirect("/login/admin");
  }

  return (
    <PortalShell title="Admin Portal" name="Administrator" signOut={adminSignOut}>
      {children}
    </PortalShell>
  );
}
