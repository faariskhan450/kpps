import type { Metadata } from "next";
import { Heart, Puzzle, ShieldCheck, Sprout } from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/animations";

export const metadata: Metadata = {
  title: "About — Kids Planet School",
  description:
    "Learn about Kids Planet School's mission, vision, and caring approach to early education.",
};

const values = [
  { Icon: Heart, title: "Care", desc: "Every child is seen, heard, and supported." },
  { Icon: Puzzle, title: "Play", desc: "Learning happens best through joyful play." },
  { Icon: ShieldCheck, title: "Safety", desc: "A secure campus parents can trust." },
  { Icon: Sprout, title: "Growth", desc: "We nurture curiosity and confidence." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      {/* Intro */}
      <Reveal className="max-w-3xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
          About us
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          A joyful start to a lifetime of learning
        </h1>
        <p className="mt-6 font-sans text-lg leading-relaxed text-ink/65">
          Kids Planet School is a place where little ones take their first steps
          into learning. Founded on the belief that childhood should be joyful,
          we blend play, creativity, and care to help every child shine.
        </p>
      </Reveal>

      {/* Mission / Vision */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl bg-surface p-8 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            <h2 className="font-display text-2xl font-semibold text-deep">Our Mission</h2>
            <p className="mt-3 font-sans leading-relaxed text-ink/65">
              To provide a safe, stimulating, and loving environment where
              children develop a lifelong love of learning and the confidence to
              explore the world around them.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl bg-gradient-to-br from-teal to-deep p-8 text-surface">
            <h2 className="font-display text-2xl font-semibold">Our Vision</h2>
            <p className="mt-3 font-sans leading-relaxed text-surface/80">
              To be a nurturing community where each child grows into a kind,
              curious, and capable individual, ready for the journey ahead.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Values */}
      <Reveal className="mt-20">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-ink">
          What we value
        </h2>
      </Reveal>
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, desc }) => (
          <Item
            key={title}
            className="group rounded-3xl bg-surface p-7 text-center shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/25 text-deep transition-colors duration-300 group-hover:bg-deep group-hover:text-surface">
              <Icon size={24} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 font-sans text-sm text-ink/60">{desc}</p>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
