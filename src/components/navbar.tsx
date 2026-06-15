"use client";

// Scroll-aware navigation:
//  - transparent at the very top of the page
//  - becomes a frosted white bar with a subtle shadow once you scroll
//  - animated slide-down menu on mobile

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, Users } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Track whether the page has been scrolled a little, to switch nav styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 shadow-[0_8px_30px_rgba(19,48,41,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo + name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-deep"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Kids Planet
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative font-sans text-sm font-medium transition-colors ${
                    active ? "text-deep" : "text-ink/70 hover:text-deep"
                  }`}
                >
                  {item.label}
                  {/* animated underline */}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-teal transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop right cluster: Login dropdown + Apply Now */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLoginOpen(false), 150)}
              aria-expanded={loginOpen}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 font-sans text-sm font-semibold text-ink transition-colors duration-300 hover:border-deep hover:text-deep"
            >
              Login
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${loginOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {loginOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-1.5 shadow-[0_20px_50px_rgba(19,48,41,0.12)]"
                >
                  <Link
                    href="/login/teacher"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-canvas"
                  >
                    <GraduationCap size={17} className="text-teal" />
                    As Teacher
                  </Link>
                  <Link
                    href="/login/student"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-canvas"
                  >
                    <Users size={17} className="text-teal" />
                    As Student / Parent
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/admissions"
            className="rounded-full bg-deep px-5 py-2.5 font-sans text-sm font-semibold text-surface shadow-sm transition-all duration-300 hover:bg-teal hover:shadow-md"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-deep md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-surface md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 font-sans text-sm font-medium ${
                        active
                          ? "bg-mint/20 text-deep"
                          : "text-ink/70 hover:bg-canvas"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link
                  href="/admissions"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-deep px-4 py-3 text-center font-sans text-sm font-semibold text-surface"
                >
                  Apply Now
                </Link>
              </li>
              <li className="mt-2 border-t border-ink/10 pt-2">
                <Link
                  href="/login/teacher"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3 font-sans text-sm font-medium text-ink/70 hover:bg-canvas"
                >
                  <GraduationCap size={17} className="text-teal" />
                  Login as Teacher
                </Link>
              </li>
              <li>
                <Link
                  href="/login/student"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3 font-sans text-sm font-medium text-ink/70 hover:bg-canvas"
                >
                  <Users size={17} className="text-teal" />
                  Login as Student / Parent
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
