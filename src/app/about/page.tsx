import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Puzzle, ShieldCheck, Sprout } from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/animations";
import { PageHero } from "@/components/page-hero";
import { WaveDivider } from "@/components/wave-divider";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Kids Planet School's mission, vision, and caring approach.",
};

const values = [
  { Icon: Heart, title: "Care", desc: "Every child is seen, heard, and supported.", fill: "bg-teal" },
  { Icon: Puzzle, title: "Play", desc: "Learning happens best through joyful play.", fill: "bg-amber-400" },
  { Icon: ShieldCheck, title: "Safety", desc: "A secure campus parents can trust.", fill: "bg-rose-400" },
  { Icon: Sprout, title: "Growth", desc: "We nurture curiosity and confidence.", fill: "bg-sky-400" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A joyful start to a lifetime of learning"
        subtitle="Founded in 2010, Kids Planet is a place where little ones take their first steps into learning — blending play, creativity, and care."
      />

      {/* Intro + campus blob */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal y={40}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="blob-alt absolute -inset-4 bg-mint/60" />
            <div className="blob relative h-full w-full overflow-hidden">
              <Image src="/images/campus.jpg" alt="Kids Planet School campus" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-[100%_10%]"/>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-deep sm:text-4xl">
            Welcome to Kids Planet
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-ink/70">
            We believe childhood should be joyful. Our caring educators create a
            warm, safe, and stimulating space where every child is encouraged to
            explore, imagine, and grow at their own happy pace.
          </p>
        </Reveal>
      </section>

      {/* Mission / Vision — bottle-green band */}
      <section className="relative overflow-hidden bg-deep pb-32 pt-28 text-surface">
        <WaveDivider flip className="absolute inset-x-0 top-0 h-14 text-canvas sm:h-20" />
        <div className="pointer-events-none absolute right-[10%] top-[28%] h-10 w-10 rounded-full bg-mint/25" />

        <div className="relative z-10 mx-auto grid max-w-5xl gap-12 px-5 sm:px-8 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 font-sans leading-relaxed text-surface/80">
              To provide a safe, stimulating, and loving environment where children
              develop a lifelong love of learning and the confidence to explore the
              world around them.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold">Our Vision</h2>
            <p className="mt-4 font-sans leading-relaxed text-surface/80">
              To be a nurturing community where each child grows into a kind,
              curious, and capable individual, ready for the journey ahead.
            </p>
          </Reveal>
        </div>

        <WaveDivider className="absolute inset-x-0 bottom-0 h-14 text-canvas sm:h-20" />
      </section>

      {/* Values — colourful medallions */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-deep">What we value</h2>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {values.map(({ Icon, title, desc, fill }) => (
            <Item key={title} className="group text-center">
              <div className={`blob mx-auto flex h-24 w-24 items-center justify-center ${fill} text-white transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6`}>
                <Icon size={34} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-deep">{title}</h3>
              <p className="mx-auto mt-2 max-w-[12rem] font-sans text-sm text-ink/60">{desc}</p>
            </Item>
          ))}
        </Stagger>
      </section>
    </>
  );
}
