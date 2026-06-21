import type { Metadata } from "next";
import Image from "next/image";
import { Music, Trophy, Palette, PartyPopper, CalendarDays, type LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Stagger, Item } from "@/components/animations";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and celebrations at Kids Planet School.",
};

const categoryIcon: Record<string, LucideIcon> = {
  performance: Music, sports: Trophy, arts: Palette, celebration: PartyPopper,
};
const blobFills = ["bg-teal", "bg-amber-400", "bg-rose-400", "bg-sky-400"];

function formatDate(iso: string | null) {
  if (!iso) return { day: "--", month: "" };
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
  };
}

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, event_date, description, category, image_url")
    .order("event_date", { ascending: true });

  return (
    <>
      <PageHero
        eyebrow="What's on"
        title="Events & celebrations"
        subtitle="From annual day to sports day, there's always something joyful happening at Kids Planet."
      />

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        {(events ?? []).length === 0 ? (
          <p className="text-center font-sans text-ink/60">No events scheduled right now. Check back soon!</p>
        ) : (
          <Stagger className="space-y-10">
            {(events ?? []).map((event, i) => {
              const Icon = categoryIcon[event.category ?? ""] ?? CalendarDays;
              const { day, month } = formatDate(event.event_date);
              return (
                <Item key={event.id} className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                  <div className={`blob flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center ${blobFills[i % blobFills.length]} text-white`}>
                    <span className="font-display text-3xl font-bold leading-none">{day}</span>
                    <span className="font-sans text-xs font-bold uppercase">{month}</span>
                  </div>
                  {event.image_url && (
                    <div className="blob-alt relative h-28 w-28 flex-shrink-0 overflow-hidden">
                      <Image src={event.image_url} alt={event.title} fill sizes="112px" className="object-cover" />
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    {event.category && (
                      <div className="flex items-center justify-center gap-2 text-teal sm:justify-start">
                        <Icon size={16} />
                        <span className="font-sans text-xs font-bold uppercase tracking-wide capitalize">{event.category}</span>
                      </div>
                    )}
                    <h2 className="mt-1 font-display text-2xl font-bold text-deep">{event.title}</h2>
                    {event.description && <p className="mt-2 font-sans text-ink/65">{event.description}</p>}
                  </div>
                </Item>
              );
            })}
          </Stagger>
        )}
      </section>
    </>
  );
}
