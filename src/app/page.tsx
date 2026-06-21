import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Baby, Blocks, Shapes, BookOpen, Sparkles,
  ShieldCheck, HeartHandshake, Palette,
} from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/animations";
import { FloatingDoodles } from "@/components/floating-doodles";
import { WaveDivider } from "@/components/wave-divider";

// Colourful organic medallions (blob shapes, white icon)
const prePrimary = [
  { Icon: Baby, name: "Playgroup", age: "1.5 – 2.5 yrs", fill: "bg-teal" },
  { Icon: Blocks, name: "Nursery", age: "2.5 – 3.5 yrs", fill: "bg-amber-400" },
  { Icon: Shapes, name: "LKG", age: "3.5 – 4.5 yrs", fill: "bg-rose-400" },
  { Icon: BookOpen, name: "UKG", age: "4.5 – 5.5 yrs", fill: "bg-sky-400" },
];

const primary = [
  { no: "1", name: "Class 1", fill: "bg-deep" },
  { no: "2", name: "Class 2", fill: "bg-teal" },
  { no: "3", name: "Class 3", fill: "bg-amber-400" },
  { no: "4", name: "Class 4", fill: "bg-rose-400" },
  { no: "5", name: "Class 5", fill: "bg-deep" },
];

const features = [
  { Icon: HeartHandshake, title: "Caring educators", desc: "Warm teachers who know every child by name." },
  { Icon: ShieldCheck, title: "Safe campus", desc: "Secure, supervised spaces parents can trust." },
  { Icon: Palette, title: "Learning through play", desc: "Hands-on, joyful, activity-led days." },
];

const stats = [
  { value: "500+", label: "Happy students" },
  { value: "15+", label: "Years of care" },
  { value: "1:10", label: "Teacher ratio" },
  { value: "20+", label: "Activities weekly" },
];

export default function Home() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mint via-mint/40 to-wash pb-28">
        <FloatingDoodles />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mint/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2 font-sans text-sm font-bold text-ink shadow-sm">
                <Sparkles size={16} /> Admissions open 2026–27
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Where <span className="text-teal">little minds</span>{" "}
                <span className="text-deep">learn to soar</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-ink/70">
                A warm, joyful school where children from playgroup to Class 5
                explore, imagine, and grow.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/admissions" className="group inline-flex items-center gap-2 rounded-full bg-deep px-8 py-4 font-sans text-sm font-bold text-surface shadow-lg shadow-deep/20 transition-all duration-300 hover:bg-teal">
                  Apply Now
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-surface px-8 py-4 font-sans text-sm font-bold text-deep shadow-sm transition-colors duration-300 hover:bg-mint/40">
                  Discover more
                </Link>
              </div>
            </Reveal>
          </div>

          {/* organic blob photo */}
          <Reveal delay={0.2} y={40}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="blob-alt absolute -inset-4 bg-mint/60" />
              <div className="blob relative h-full w-full overflow-hidden">
                <Image src="/images/campus.jpg" alt="Kids Planet School campus" fill priority sizes="(max-width:1024px) 100vw, 100vw" className="object-cover object-[100%_10%]" />
              </div>
              <div className="absolute -right-1 top-2 z-10 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-amber-300 p-2 text-center font-display text-xs font-bold leading-tight text-ink shadow-lg">
                Admissions Open!
              </div>
              <div className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-surface px-5 py-2.5 font-display text-sm font-bold text-deep shadow-lg">
                Nurturing since 2010
              </div>
            </div>
          </Reveal>
        </div>

        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 text-wash sm:h-24" />
      </section>

      {/* ───────────── Programs (pale band, organic medallions) ───────────── */}
      <section className="relative bg-wash pb-32 pt-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-teal">Our Programs</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
              A path that grows with your child
            </h2>
          </Reveal>

          <h3 className="mt-12 text-center font-display text-2xl font-bold text-deep">Pre-Primary</h3>
          <Stagger className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {prePrimary.map(({ Icon, name, age, fill }) => (
              <Item key={name} className="group text-center">
                <div className={`blob mx-auto flex h-28 w-28 items-center justify-center ${fill} text-white transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6`}>
                  <Icon size={40} />
                </div>
                <h4 className="mt-5 font-display text-xl font-bold text-deep">{name}</h4>
                <p className="font-sans text-xs font-bold uppercase tracking-wide text-ink/50">{age}</p>
              </Item>
            ))}
          </Stagger>

          <h3 className="mt-16 text-center font-display text-2xl font-bold text-deep">Primary · Class 1–5</h3>
          <Stagger className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {primary.map(({ no, name, fill }) => (
              <Item key={name} className="group text-center">
                <div className={`blob-alt mx-auto flex h-24 w-24 items-center justify-center ${fill} font-display text-3xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-6`}>
                  {no}
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-deep">{name}</h4>
              </Item>
            ))}
          </Stagger>
        </div>

        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 text-deep sm:h-24" />
      </section>

      {/* ───────────── Why families love us (bottle-green band) ───────────── */}
      <section className="relative overflow-hidden bg-deep pb-32 pt-12 text-surface">
        <div className="pointer-events-none absolute right-[8%] top-[26%] h-12 w-12 rounded-full bg-mint/30" />
        <div className="pointer-events-none absolute left-[6%] bottom-[30%] h-9 w-9 rounded-full border-4 border-mint/30" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Why families love us
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-surface/75">
              A nurturing place built around every child&apos;s happiness and growth.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-12 sm:grid-cols-3">
            {features.map(({ Icon, title, desc }) => (
              <Item key={title} className="text-center">
                <div className="blob mx-auto flex h-20 w-20 items-center justify-center bg-surface/15">
                  <Icon size={30} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs font-sans text-sm text-surface/70">{desc}</p>
              </Item>
            ))}
          </Stagger>

          <Stagger className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
            {stats.map((s) => (
              <Item key={s.label} className="text-center">
                <p className="font-display text-5xl font-bold text-mint">{s.value}</p>
                <p className="mt-1 font-sans text-sm text-surface/70">{s.label}</p>
              </Item>
            ))}
          </Stagger>
        </div>

        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 text-wash sm:h-24" />
      </section>

      {/* ───────────── Approach (pale band, blob photo) ───────────── */}
      <section className="relative bg-wash pb-32 pt-10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal y={40}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="blob absolute -inset-4 bg-amber-200" />
              <div className="blob-alt relative h-full w-full overflow-hidden">
                <Image src="/images/approach.jpg" alt="A classroom activity" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-sans text-sm font-bold uppercase tracking-widest text-teal">Our Approach</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
                Learning that feels like play
              </h2>
              <p className="mt-5 font-sans text-lg leading-relaxed text-ink/70">
                Children learn best when they&apos;re curious and comfortable. Our
                caring educators make every day safe, joyful, and full of wonder.
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-4">
              {["Trained, caring teachers", "Safe and secure campus", "Play-based, activity-led learning"].map((t) => (
                <Item key={t} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mint font-bold text-deep">✓</span>
                  <span className="font-sans text-ink/80">{t}</span>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 text-deep sm:h-24" />
      </section>

      {/* ───────────── Celebration band (bottle green) ───────────── */}
      <section className="relative overflow-hidden bg-deep pb-32 pt-16 text-surface">
        <div className="pointer-events-none absolute left-[10%] top-[30%] h-10 w-10 rounded-full bg-amber-300/80" />
        <div className="pointer-events-none absolute right-[12%] bottom-[34%] h-8 w-8 rounded-full bg-surface/30" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              A place where childhood is celebrated
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-lg text-surface/85">
              Bright days, big imaginations, and the freedom to be curious — every single day.
            </p>
          </Reveal>
        </div>
        <WaveDivider className="absolute inset-x-0 bottom-0 h-16 text-canvas sm:h-24" />
      </section>

      {/* ───────────── Moments (blob photos) ───────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal className="text-center">
          <p className="font-sans text-sm font-bold uppercase tracking-widest text-teal">Moments</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">A glimpse into our days</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-10 sm:grid-cols-3">
          {[
            { src: "/images/art.jpg", caption: "Art & craft" },
            { src: "/images/reading.jpg", caption: "Story time" },
            { src: "/images/play.jpg", caption: "Outdoor play" },
          ].map((m, i) => (
            <Item key={m.src} className="text-center">
              <div className="relative mx-auto aspect-square w-full max-w-xs">
                <div className={`${i % 2 ? "blob-alt" : "blob"} absolute -inset-3 bg-mint/50`} />
                <div className={`${i % 2 ? "blob" : "blob-alt"} relative h-full w-full overflow-hidden`}>
                  <Image src={m.src} alt={m.caption} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
                </div>
              </div>
              <p className="mt-5 font-display text-xl font-bold text-deep">{m.caption}</p>
            </Item>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Link href="/gallery" className="group inline-flex items-center gap-2 rounded-full bg-deep px-7 py-3.5 font-sans text-sm font-bold text-surface transition-colors hover:bg-teal">
            View gallery
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ───────────── CTA (full-bleed bottle-green band) ───────────── */}
      <section className="relative overflow-hidden bg-deep pb-24 pt-32 text-center text-surface">
        <WaveDivider flip className="absolute inset-x-0 top-0 h-16 text-canvas sm:h-24" />
        <div className="pointer-events-none absolute left-[12%] top-[40%] h-10 w-10 rounded-full bg-amber-300/80" />
        <div className="pointer-events-none absolute right-[14%] top-[38%] h-7 w-7 rounded-full bg-mint/40" />
        <div className="relative z-10 mx-auto max-w-2xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to join the Kids Planet family?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg text-surface/80">
            Admissions for 2026–27 are open. Send us an enquiry and we&apos;ll be in touch.
          </p>
          <Link href="/admissions" className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-300 px-8 py-4 font-sans text-sm font-bold text-ink transition-colors duration-300 hover:bg-surface">
            Apply Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
