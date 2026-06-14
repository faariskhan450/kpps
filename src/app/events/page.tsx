import type { Metadata } from "next";
import { Music, Trophy, Palette, PartyPopper, type LucideIcon } from "lucide-react";
import { events, type EventCategory } from "@/data/events";
import { Reveal, Stagger, Item } from "@/components/animations";

export const metadata: Metadata = {
  title: "Events — Kids Planet School",
  description: "Upcoming events and celebrations at Kids Planet School.",
};

// Map each category to a clean icon
const categoryIcon: Record<EventCategory, LucideIcon> = {
  performance: Music,
  sports: Trophy,
  arts: Palette,
  celebration: PartyPopper,
};

// "2026-07-15" -> { day: "15", month: "Jul", year: "2026" }
function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
    year: d.toLocaleDateString("en-IN", { year: "numeric" }),
  };
}

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      <Reveal className="max-w-3xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
          What&apos;s on
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          School events &amp; celebrations
        </h1>
        <p className="mt-6 font-sans text-lg leading-relaxed text-ink/65">
          From annual day to sports day, there&apos;s always something exciting
          happening at Kids Planet School.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
        {sorted.map((event) => {
          const Icon = categoryIcon[event.category];
          const { day, month, year } = formatDate(event.date);
          return (
            <Item
              key={event.id}
              className="group flex gap-6 rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
            >
              {/* Date block */}
              <div className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-deep text-surface">
                <span className="font-display text-2xl font-semibold leading-none">{day}</span>
                <span className="font-sans text-xs font-medium uppercase tracking-wide">{month}</span>
                <span className="font-sans text-[10px] text-surface/70">{year}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-teal">
                  <Icon size={16} />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wide capitalize">
                    {event.category}
                  </span>
                </div>
                <h2 className="mt-1.5 font-display text-xl font-semibold text-ink">
                  {event.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                  {event.description}
                </p>
              </div>
            </Item>
          );
        })}
      </Stagger>
    </div>
  );
}
