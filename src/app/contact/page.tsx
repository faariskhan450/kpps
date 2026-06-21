import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/animations";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kids Planet School — address, phone, and email.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`;

  const details = [
    { Icon: MapPin, label: "Address", value: siteConfig.address, href: undefined, fill: "bg-teal" },
    { Icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, fill: "bg-amber-400" },
    { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, fill: "bg-rose-400" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Visit us, call, or drop an email — our doors are always open to families."
      />

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:items-center">
        <Stagger className="space-y-8">
          {details.map(({ Icon, label, value, href, fill }) => (
            <Item key={label} className="flex items-center gap-5">
              <div className={`blob flex h-16 w-16 flex-shrink-0 items-center justify-center ${fill} text-white`}>
                <Icon size={26} />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-deep">{label}</h2>
                {href ? (
                  <a href={href} className="mt-1 block font-sans text-ink/70 transition-colors hover:text-teal">{value}</a>
                ) : (
                  <p className="mt-1 font-sans text-ink/70">{value}</p>
                )}
              </div>
            </Item>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="blob-alt absolute -inset-3 bg-mint/50" />
            <div className="blob relative h-full w-full overflow-hidden">
              <iframe
                title="School location map"
                src={mapSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
