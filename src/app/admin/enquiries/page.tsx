import Link from "next/link";
import { ArrowLeft, Mail, Phone, Trash2, Check, Undo2 } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { setEnquiryStatus, deleteEnquiry } from "./actions";

export const metadata = { title: "Enquiries — Admin — Kids Planet School" };

export default async function AdminEnquiriesPage() {
  const supabase = createAdminClient();
  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("id, parent_name, child_name, child_age_grade, phone, email, message, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Admission enquiries
      </h1>

      {(enquiries ?? []).length === 0 ? (
        <div className="mt-8 rounded-3xl bg-surface p-8 font-sans text-sm text-ink/60 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
          No enquiries yet. Submissions from the Admissions page appear here.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {(enquiries ?? []).map((e) => (
            <div key={e.id} className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">
                    {e.child_name}{" "}
                    <span className="font-sans text-sm font-normal text-ink/50">
                      · {e.child_age_grade}
                    </span>
                  </h2>
                  <p className="font-sans text-sm text-ink/60">Parent: {e.parent_name}</p>
                </div>
                {e.status === "contacted" ? (
                  <span className="rounded-full bg-mint/25 px-3 py-1 font-sans text-xs font-semibold text-deep">Contacted</span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-sans text-xs font-semibold text-amber-700">New</span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-4 font-sans text-sm text-ink/70">
                <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1.5 hover:text-deep">
                  <Phone size={14} /> {e.phone}
                </a>
                <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 hover:text-deep">
                  <Mail size={14} /> {e.email}
                </a>
              </div>

              {e.message && (
                <p className="mt-3 rounded-xl bg-canvas px-4 py-3 font-sans text-sm text-ink/70">
                  {e.message}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <form action={setEnquiryStatus}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="next" value={e.status === "contacted" ? "new" : "contacted"} />
                  <button type="submit" className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-sans text-xs font-semibold text-ink transition-colors hover:border-deep hover:text-deep">
                    {e.status === "contacted" ? <Undo2 size={13} /> : <Check size={13} />}
                    {e.status === "contacted" ? "Mark as new" : "Mark contacted"}
                  </button>
                </form>
                <form action={deleteEnquiry}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" aria-label="Delete enquiry" className="rounded-full p-1.5 text-ink/40 transition-colors hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
