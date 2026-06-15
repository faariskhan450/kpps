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
        {[
          { href: "/admin/enquiries", Icon: Inbox, title: "Enquiries", desc: "Read admission enquiries." },
          { href: "/admin/students", Icon: Users, title: "Students", desc: "Add and manage students." },
          { href: "/admin/teachers", Icon: GraduationCap, title: "Teachers", desc: "Add and manage staff." },
          { href: "/admin/fees", Icon: Wallet, title: "Fees", desc: "Create and track fee records." },
        ].map(({ href, Icon, title, desc }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-3xl bg-surface p-7 shadow-[0_10px_40px_rgba(19,48,41,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(19,48,41,0.1)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-surface">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">{desc}</p>
            <span className="mt-4 inline-block font-sans text-sm font-semibold text-teal">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
