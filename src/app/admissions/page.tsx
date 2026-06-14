import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/animations";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Admissions — Kids Planet School",
  description: "Admissions information and enquiry for Kids Planet School.",
};

const steps = [
  { no: "01", title: "Enquire", desc: "Fill the form below with a few details about your child." },
  { no: "02", title: "Visit", desc: "Tour our campus and meet our caring team of educators." },
  { no: "03", title: "Enrol", desc: "Complete the simple paperwork and welcome to the family." },
];

export default function AdmissionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      <Reveal className="max-w-3xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
          Admissions 2026–27
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Start your child&apos;s journey with us
        </h1>
        <p className="mt-6 font-sans text-lg leading-relaxed text-ink/65">
          Admissions for the 2026–27 session are open. Send us an enquiry below
          and our team will be in touch. Prefer to talk? Call us at{" "}
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="font-semibold text-deep underline-offset-2 hover:underline"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
      </Reveal>

      {/* How it works */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.no} delay={i * 0.1}>
            <div className="h-full rounded-3xl bg-surface p-8 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
              <span className="font-display text-4xl font-semibold text-mint">{step.no}</span>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">{step.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Enquiry form */}
      <Reveal className="mx-auto mt-16 max-w-3xl">
        <div className="mb-6 flex items-center gap-2 text-teal">
          <Phone size={18} />
          <span className="font-sans text-sm font-semibold uppercase tracking-widest">
            Enquiry form
          </span>
        </div>
        <EnquiryForm />
      </Reveal>
    </div>
  );
}
