import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl font-semibold text-mint">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 font-sans text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-deep px-7 py-3.5 font-sans text-sm font-semibold text-surface transition-colors duration-300 hover:bg-teal"
      >
        <Home size={16} />
        Back to home
      </Link>
    </div>
  );
}
