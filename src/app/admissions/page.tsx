import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/animations";
import { PageHero } from "@/components/page-hero";
import { WaveDivider } from "@/components/wave-divider";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Admissions information and enquiry for Kids Planet School.",
};

const steps = [
  { no: "1", title: "Enquire", desc: "Fill the form below with a few details about your child.", fill: "bg-teal" },
  { no: "2", title: "Visit", desc: "Tour our campus and meet our caring team of educators.", fill: "bg-amber-400" },
  { no: "3", title: "Enrol", desc: "Complete the simple paperwork — welcome to the family!", fill: "bg-rose-400" },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions 2026–27"
        title="Start your child's journey with us"
        subtitle="Admissions for the 2026–27 session are open. Send an enquiry below, or call us anytime."
      />

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Stagger className="grid gap-10 sm:grid-cols-3">
          {steps.map(({ no, title, desc, fill }) => (
            <Item key={no} className="text-center">
              <div className={`blob-alt mx-auto flex h-20 w-20 items-center justify-center ${fill} font-display text-3xl font-bold text-white`}>
                {no}
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-deep">{title}</h2>
              <p className="mx-auto mt-2 max-w-xs font-sans text-sm text-ink/60">{desc}</p>
            </Item>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-deep px-7 py-3.5 font-sans text-sm font-bold text-surface transition-colors hover:bg-teal"
          >
            <Phone size={16} /> Call {siteConfig.phone}
          </a>
        </div>
      </section>

      {/* Enquiry form on a pale band */}
      <section className="relative bg-wash pb-32 pt-28">
        <WaveDivider flip className="absolute inset-x-0 top-0 h-14 text-canvas sm:h-20" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-deep sm:text-4xl">
              Send an enquiry
            </h2>
            <p className="mt-3 font-sans text-ink/65">
              We&apos;ll get back to you as soon as we can.
            </p>
          </Reveal>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
