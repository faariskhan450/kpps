"use client";

// Decides whether to show the public marketing navbar + footer.
// On portal/login routes we hide them, because those pages have their
// own header (or none).

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const HIDE_PREFIXES = ["/teacher", "/student", "/admin"];

export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_PREFIXES.some((p) => pathname.startsWith(p));

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
