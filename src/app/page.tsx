import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Baby,
  Blocks,
  Shapes,
  BookOpen,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Palette,
} from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/animations";
import { ParallaxBand } from "@/components/parallax-band";

const prePrimary = [
  { Icon: Baby, name: "Playgroup", age: "1.5 – 2.5 yrs", desc: "Gentle first steps into a world of play and friendship." },
  { Icon: Blocks, name: "Nursery", age: "2.5 – 3.5 yrs", desc: "Stories, songs, and sensory play that spark curiosity." },
  { Icon: Shapes, name: "LKG", age: "3.5 – 4.5 yrs", desc: "Early literacy and numbers through hands-on activities." },
  { Icon: BookOpen, name: "UKG", age: "4.5 – 5.5 yrs", desc: "Confident readers and thinkers, ready for big school." },
];

const primary = [
  { no: "01", name: "Class 1", desc: "Building strong basics in reading, writing, and numbers." },
  { no: "02", name: "Class 2", desc: "Growing confidence with stories, science, and teamwork." },
  { no: "03", name: "Class 3", desc: "Exploring the world through projects and curiosity." },
  { no: "04", name: "Class 4", desc: "Sharper thinking with maths, language, and discovery." },
  { no: "05", name: "Class 5", desc: "Independent learners ready for the next big step." },
];

const features = [
  { Icon: HeartHandshake, title: "Caring educators", desc: "Trained, warm teachers who know every child by name." },
  { Icon: ShieldCheck, title: "Safe campus", desc: "Secure, supervised spaces that parents can trust." },
  { Icon: Palette, title: "Learning through play", desc: "Hands-on, activity-led days that make learning joyful." },
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
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative overflow-hidden">
        {/* soft decorative gradient glows */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mint/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-deep/15 bg-surface/60 px-4 py-1.5 font-sans text-xs font-medium text-deep backdrop-blur">
                <Sparkles size={14} />
                Admissions open for 2026–27
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Where little minds{" "}
                <span className="bg-gradient-to-r from-teal to-mint bg-clip-text text-transparent">
                  learn to soar
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-ink/65">
                A warm, modern school where children from playgroup to Class 5
                explore, imagine, and grow — guided every step of the way.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/admissions"
                  className="group inline-flex items-center gap-2 rounded-full bg-deep px-7 py-3.5 font-sans text-sm font-semibold text-surface shadow-lg shadow-deep/20 transition-all duration-300 hover:bg-teal"
                >
                  Apply Now
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 font-sans text-sm font-semibold text-ink transition-colors duration-300 hover:border-deep hover:text-deep"
                >
                  Discover more
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Hero visual — real photo with overlay + floating card */}
          <Reveal delay={0.2} y={40}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_rgba(19,48,41,0.18)]">
              <Image
                src="/images/hero.jpg"
                alt="Children learning and playing at Kids Planet School"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              {/* gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/10 to-transparent" />
              {/* floating glass card */}
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl bg-surface/85 p-4 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deep text-surface">
                  <HeartHandshake size={22} />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold leading-tight text-ink">
                    Nurturing since 2010
                  </p>
                  <p className="font-sans text-xs text-ink/60">
                    Loved by 500+ families
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Stats ───────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Stagger className="grid grid-cols-2 gap-6 rounded-3xl bg-surface p-8 shadow-[0_20px_60px_rgba(19,48,41,0.06)] sm:grid-cols-4 sm:p-10">
          {stats.map((s) => (
            <Item key={s.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-deep sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 font-sans text-sm text-ink/60">{s.label}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      {/* ───────────────── Programs ───────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
            Our Programs
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            A path that grows with your child
          </h2>
        </Reveal>

        {/* Pre-primary */}
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prePrimary.map(({ Icon, name, age, desc }) => (
            <Item
              key={name}
              className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/25 text-deep transition-colors duration-300 group-hover:bg-deep group-hover:text-surface">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{name}</h3>
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wide text-teal">
                {age}
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink/60">{desc}</p>
            </Item>
          ))}
        </Stagger>

        {/* Primary */}
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {primary.map(({ no, name, desc }) => (
            <Item
              key={name}
              className="rounded-3xl border border-ink/10 p-6 transition-all duration-300 hover:border-transparent hover:bg-surface hover:shadow-[0_18px_45px_rgba(19,48,41,0.08)]"
            >
              <span className="font-display text-3xl font-semibold text-mint">{no}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{name}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">{desc}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      {/* ───────────────── Parallax banner ───────────────── */}
      <ParallaxBand
        src="/images/joy.jpg"
        alt="Happy children playing together"
      >
        <Reveal className="max-w-xl">
          <h2 className="font-display text-4xl font-semibold leading-tight text-surface sm:text-5xl">
            A place where childhood is celebrated
          </h2>
          <p className="mt-4 font-sans text-lg text-surface/85">
            Bright days, big imaginations, and the freedom to be curious — every
            single day.
          </p>
        </Reveal>
      </ParallaxBand>

      {/* ───────────────── Approach ───────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal y={40}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_rgba(19,48,41,0.12)]">
              <Image
                src="/images/approach.jpg"
                alt="A teacher guiding children through a classroom activity"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-surface/90 p-6 backdrop-blur">
                <p className="font-display text-xl font-semibold leading-snug text-deep sm:text-2xl">
                  &ldquo;Every child is a different kind of flower, and all
                  together they make this world a beautiful garden.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
                Our Approach
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Learning that feels like play
              </h2>
              <p className="mt-5 font-sans text-lg leading-relaxed text-ink/65">
                We believe children learn best when they are curious and
                comfortable. Our caring educators create a safe, joyful space
                where every small win is celebrated.
              </p>
            </Reveal>

            <Stagger className="mt-10 space-y-5">
              {features.map(({ Icon, title, desc }) => (
                <Item key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-deep text-surface">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                    <p className="font-sans text-sm text-ink/60">{desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ───────────────── Moments ───────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
              Moments
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              A glimpse into our days
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 font-sans text-sm font-semibold text-deep"
          >
            View gallery
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { src: "/images/art.jpg", caption: "Art & craft" },
            { src: "/images/reading.jpg", caption: "Story time" },
            { src: "/images/play.jpg", caption: "Outdoor play" },
          ].map((m) => (
            <Item key={m.src}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src={m.src}
                  alt={m.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 to-transparent" />
                <figcaption className="absolute bottom-5 left-5 font-display text-xl font-semibold text-surface">
                  {m.caption}
                </figcaption>
              </figure>
            </Item>
          ))}
        </Stagger>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-deep px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-mint/30 blur-3xl" />
            <h2 className="relative font-display text-4xl font-semibold tracking-tight text-surface sm:text-5xl">
              Ready to join the Kids Planet family?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg font-sans text-lg text-surface/75">
              Admissions for the 2026–27 session are now open. Send us an enquiry
              and we&apos;ll be in touch.
            </p>
            <Link
              href="/admissions"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-8 py-4 font-sans text-sm font-semibold text-deep transition-all duration-300 hover:bg-surface"
            >
              Apply Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
