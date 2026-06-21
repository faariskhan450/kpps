import { WaveDivider } from "@/components/wave-divider";
import { Reveal } from "@/components/animations";

// Colourful, wavy page header used on the public inner pages.
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mint via-mint/40 to-canvas pb-24 pt-24 sm:pt-32">
      {/* playful doodles */}
      <div className="pointer-events-none absolute left-[7%] top-[34%] h-10 w-10 rounded-full bg-amber-300/70" />
      <div className="pointer-events-none absolute right-[9%] top-[26%] h-8 w-8 rounded-full bg-rose-300/70" />
      <div className="pointer-events-none absolute right-[22%] bottom-[34%] h-6 w-6 rounded-full bg-teal/40" />
      <div className="pointer-events-none absolute left-[20%] bottom-[30%] h-5 w-5 rounded-full bg-sky-300/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          {eyebrow && (
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-teal">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight text-deep sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl font-sans text-lg leading-relaxed text-ink/70">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>

      <WaveDivider className="absolute inset-x-0 bottom-0 h-14 text-canvas sm:h-20" />
    </section>
  );
}
