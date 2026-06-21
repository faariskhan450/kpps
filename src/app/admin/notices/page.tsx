import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { AdminNoticeForm } from "@/components/admin-notice-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteNotice } from "./actions";

export const metadata = { title: "Notices — Admin — Kids Planet School" };

const audienceLabel: Record<string, string> = {
  all: "Everyone",
  teachers: "Teachers",
  students: "Students & parents",
};

export default async function AdminNoticesPage() {
  const supabase = createAdminClient();
  const { data: notices } = await supabase
    .from("notices")
    .select("id, title, body, audience, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Notices &amp; announcements
      </h1>

      <div className="mt-8">
        <AdminNoticeForm />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        Posted ({(notices ?? []).length})
      </h2>
      <div className="mt-4 space-y-3">
        {(notices ?? []).map((n) => (
          <div key={n.id} className="rounded-2xl bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{n.title}</h3>
                <p className="mt-1 font-sans text-sm text-ink/70">{n.body}</p>
                <span className="mt-2 inline-block rounded-full bg-canvas px-3 py-1 font-sans text-xs font-semibold text-ink/60">
                  {audienceLabel[n.audience] ?? n.audience}
                </span>
              </div>
              <form action={deleteNotice}>
                <input type="hidden" name="id" value={n.id} />
                <ConfirmDeleteButton title="Delete notice?" message="This announcement will be removed." ariaLabel="Delete notice" />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
