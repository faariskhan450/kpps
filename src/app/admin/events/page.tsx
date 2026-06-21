import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { AdminEventForm } from "@/components/admin-event-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteEvent } from "./actions";

export const metadata = { title: "Events — Admin — Kids Planet School" };

export default async function AdminEventsPage() {
  const supabase = createAdminClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, event_date, description, category, image_url")
    .order("event_date", { ascending: true });

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Manage events
      </h1>

      <div className="mt-8">
        <AdminEventForm />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        All events ({(events ?? []).length})
      </h2>
      <div className="mt-4 space-y-3">
        {(events ?? []).map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-4 rounded-2xl bg-surface p-4 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            <div className="flex items-center gap-4">
              {e.image_url && (
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image src={e.image_url} alt={e.title} fill sizes="56px" className="object-cover" />
                </div>
              )}
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{e.title}</p>
                <p className="font-sans text-xs text-ink/50">
                  {e.event_date ?? "No date"}{e.category ? ` · ${e.category}` : ""}
                </p>
              </div>
            </div>
            <form action={deleteEvent}>
              <input type="hidden" name="id" value={e.id} />
              <ConfirmDeleteButton title="Delete event?" message="This event will be removed from the website." ariaLabel="Delete event" />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
