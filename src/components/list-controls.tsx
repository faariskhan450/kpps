import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Search box (GET form) + prev/next pagination for admin lists.
 * Pure server component — no client JS needed.
 */
export function ListControls({
  basePath,
  q,
  page,
  totalPages,
  placeholder = "Search...",
}: {
  basePath: string;
  q: string;
  page: number;
  totalPages: number;
  placeholder?: string;
}) {
  const mkHref = (p: number) =>
    `${basePath}?q=${encodeURIComponent(q)}&page=${p}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <form action={basePath} className="relative">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          name="q"
          defaultValue={q}
          placeholder={placeholder}
          className="w-64 max-w-full rounded-full border border-ink/15 bg-surface py-2.5 pl-10 pr-4 font-sans text-sm text-ink outline-none focus:border-deep"
        />
      </form>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 font-sans text-sm">
          <Link
            href={mkHref(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 ${
              page <= 1 ? "pointer-events-none opacity-40" : "hover:border-deep"
            }`}
          >
            <ChevronLeft size={16} />
          </Link>
          <span className="text-ink/60">
            Page {page} of {totalPages}
          </span>
          <Link
            href={mkHref(Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 ${
              page >= totalPages ? "pointer-events-none opacity-40" : "hover:border-deep"
            }`}
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
