/**
 * School events — seeded in code for now.
 * Later (Phase 9) this will come from the database so the admin can
 * add events through the website.
 *
 * `category` controls which icon shows on the Events page.
 * Allowed: "performance" | "sports" | "arts" | "celebration"
 */
export type EventCategory = "performance" | "sports" | "arts" | "celebration";

export type SchoolEvent = {
  id: string;
  title: string;
  date: string; // e.g. "2026-07-15"
  description: string;
  category: EventCategory;
};

export const events: SchoolEvent[] = [
  {
    id: "annual-day-2026",
    title: "Annual Day Celebration",
    date: "2026-07-15",
    description:
      "Our little stars take the stage for an evening of music, dance, and drama.",
    category: "performance",
  },
  {
    id: "independence-day-2026",
    title: "Independence Day",
    date: "2026-08-15",
    description:
      "Flag hoisting, patriotic songs, and tricolour fun for the whole school.",
    category: "celebration",
  },
  {
    id: "sports-day-2026",
    title: "Sports Day",
    date: "2026-08-22",
    description:
      "Races, games, and lots of cheering as our children show their team spirit.",
    category: "sports",
  },
  {
    id: "art-fair-2026",
    title: "Little Artists Fair",
    date: "2026-09-10",
    description:
      "A colourful showcase of paintings and crafts made by our young creators.",
    category: "arts",
  },
];
