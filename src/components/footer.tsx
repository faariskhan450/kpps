import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/logo";

// Small inline brand icons (lucide removed brand icons, so we draw them here)
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-28 bg-deep text-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-xl font-semibold">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-surface/70">
              A modern, nurturing school where children from playgroup to Class 5
              explore, imagine, and grow.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: siteConfig.social.facebook, Icon: FacebookIcon, label: "Facebook" },
                { href: siteConfig.social.instagram, Icon: InstagramIcon, label: "Instagram" },
                { href: siteConfig.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/10 transition-colors hover:bg-mint hover:text-deep"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-base font-semibold">Explore</h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-surface/70 transition-colors hover:text-mint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-semibold">Visit us</h3>
            <ul className="mt-4 space-y-3 font-sans text-sm text-surface/70">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-mint" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="flex-shrink-0 text-mint" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-mint">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="flex-shrink-0 text-mint" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-mint">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-surface/15 pt-6 text-center font-sans text-xs text-surface/50">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
