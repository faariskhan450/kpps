import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Contact — Kids Planet School",
  description: "Get in touch with Kids Planet School — address, phone, and email.",
};

export default function ContactPage() {
  // Keyless Google Maps embed using the address from our site config
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.mapQuery
  )}&output=embed`;

  const details = [
    { Icon: MapPin, label: "Address", value: siteConfig.address, href: undefined },
    { Icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      <Reveal className="max-w-3xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
          Contact
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          We&apos;d love to hear from you
        </h1>
        <p className="mt-6 font-sans text-lg leading-relaxed text-ink/65">
          Visit us, call, or drop an email — and do say hello. Our doors are
          always open to families.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Details */}
        <div className="space-y-5">
          {details.map(({ Icon, label, value, href }) => (
            <Reveal key={label}>
              <div className="flex gap-5 rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-mint/25 text-deep">
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">{label}</h2>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block font-sans text-sm text-ink/65 transition-colors hover:text-deep"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-sans text-sm text-ink/65">{value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="h-full overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            <iframe
              title="School location map"
              src={mapSrc}
              className="h-full min-h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
