import { Megaphone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Shows recent notices relevant to the logged-in user.
// RLS automatically limits results to "all" + the user's role.
export async function NoticesPanel() {
  const supabase = await createClient();
  const { data: notices } = await supabase
    .from("notices")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (!notices || notices.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 text-deep">
        <Megaphone size={20} />
        <h2 className="font-display text-xl font-semibold text-ink">Notices</h2>
      </div>
      <div className="mt-4 space-y-3">
        {notices.map((n) => (
          <div
            key={n.id}
            className="rounded-2xl border-l-4 border-teal bg-surface p-5 shadow-[0_10px_40px_rgba(19,48,41,0.05)]"
          >
            <h3 className="font-display text-base font-semibold text-ink">{n.title}</h3>
            <p className="mt-1 font-sans text-sm text-ink/70">{n.body}</p>
            <p className="mt-2 font-sans text-xs text-ink/40">
              {new Date(n.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
