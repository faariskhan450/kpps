"use client";

// Green navigation bar whose OWN bottom edge is wavy (via a CSS mask).
//  - solid bottle-green bar, wavy bottom edge, white text
//  - playful amber "Apply Now"; animated mobile menu

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, Users } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/logo";

// A wave-shaped mask: green shows where the SVG is white; the bottom edge waves.
const WAVE =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201440%20120'%20preserveAspectRatio='none'%3E%3Cpath%20fill='white'%20d='M0%200%20H1440%20V86%20C1140%20132%20960%2072%20720%2096%20C480%20120%20300%2070%200%20108%20Z'/%3E%3C/svg%3E";

const maskStyle: React.CSSProperties = {
  maskImage: `url("${WAVE}")`,
  WebkitMaskImage: `url("${WAVE}")`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  filter: "drop-shadow(0 6px 6px rgba(11,77,56,0.18))",
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 text-surface">
      {/* The bar — its green background is masked into a wavy bottom edge */}
      <div className="relative">
        <div aria-hidden className="absolute inset-0 bg-deep" style={maskStyle} />

        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 pb-7 pt-6 sm:px-8">
          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-2 text-surface" onClick={() => setOpen(false)}>
            <Logo className="-my-3 h-16 w-16" />
            <span className="font-display text-xl font-bold tracking-tight">Kids Planet</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative font-sans text-sm font-semibold transition-colors ${active ? "text-surface" : "text-surface/75 hover:text-surface"}`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-mint transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right cluster */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLoginOpen((v) => !v)}
                onBlur={() => setTimeout(() => setLoginOpen(false), 150)}
                aria-expanded={loginOpen}
                className="inline-flex items-center gap-1.5 rounded-full border border-surface/30 px-5 py-2.5 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-surface/10"
              >
                Login
                <ChevronDown size={15} className={`transition-transform duration-300 ${loginOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {loginOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl bg-surface p-1.5 shadow-[0_20px_50px_rgba(11,77,56,0.25)]"
                  >
                    <Link href="/login/teacher" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-canvas">
                      <GraduationCap size={17} className="text-teal" /> As Teacher
                    </Link>
                    <Link href="/login/student" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-canvas">
                      <Users size={17} className="text-teal" /> As Student / Parent
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/admissions" className="rounded-full bg-amber-300 px-5 py-2.5 font-sans text-sm font-bold text-ink shadow-sm transition-colors duration-300 hover:bg-surface">
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button type="button" className="text-surface md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="-mt-2 overflow-hidden bg-deep md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-4">
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 font-sans text-sm font-medium ${active ? "bg-surface/15 text-surface" : "text-surface/75 hover:bg-surface/10"}`}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link href="/admissions" onClick={() => setOpen(false)} className="block rounded-full bg-amber-300 px-4 py-3 text-center font-sans text-sm font-bold text-ink">
                  Apply Now
                </Link>
              </li>
              <li className="mt-1">
                <Link href="/login/teacher" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-4 py-3 font-sans text-sm font-medium text-surface/75 hover:bg-surface/10">
                  <GraduationCap size={17} className="text-mint" /> Login as Teacher
                </Link>
              </li>
              <li>
                <Link href="/login/student" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-4 py-3 font-sans text-sm font-medium text-surface/75 hover:bg-surface/10">
                  <Users size={17} className="text-mint" /> Login as Student / Parent
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
