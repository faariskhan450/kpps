import Link from "next/link";
import { Inbox, GraduationCap, Users, Wallet } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Admin dashboard
      </h1>
      <p className="mt-2 font-sans text-ink/60">
        Manage the school from here. More tools arrive in the next phase.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active: Fees */}
        <Link
          href="/admin/fees"
          className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
            <Wallet size={22} />
          </div>
          <h2 className="mt-5 font-display text-lg font-semibold text-ink">Fees</h2>
          <p className="mt-2 font-sans text-sm text-ink/60">Create and track fee records.</p>
          <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">Open →</span>
        </Link>

        {/* Coming soon */}
        {[
          { Icon: Inbox, title: "Enquiries", desc: "Read admission enquiries." },
          { Icon: Users, title: "Students", desc: "Add and manage students." },
          { Icon: GraduationCap, title: "Teachers", desc: "Add and manage staff." },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/25 text-deep">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">{desc}</p>
            <span className="mt-4 inline-block rounded-full bg-canvas px-3 py-1 font-sans text-xs font-semibold text-ink/50">
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
