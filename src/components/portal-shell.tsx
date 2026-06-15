import { LogOut } from "lucide-react";
import { Logo } from "@/components/logo";

/**
 * The frame around a logged-in portal (teacher / student / admin).
 * Shows a simple header with the portal name, the user's name, and a
 * log-out button. `signOut` is a Server Action passed in by each portal.
 */
export function PortalShell({
  title,
  name,
  signOut,
  children,
}: {
  title: string;
  name?: string;
  signOut: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5 text-deep">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-semibold text-ink">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {name && (
              <span className="hidden font-sans text-sm text-ink/60 sm:inline">
                {name}
              </span>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-sans text-sm font-semibold text-ink transition-colors hover:border-deep hover:text-deep"
              >
                <LogOut size={15} />
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
