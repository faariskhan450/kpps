export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-2xl rounded-3xl border border-peach bg-white/60 p-10 shadow-sm sm:p-14">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
          Welcome to
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy sm:text-6xl">
          Kids Planet School
        </h1>

        <p className="mt-4 font-display text-2xl font-medium sm:text-3xl">
          <span className="text-navy">Play. </span>
          <span className="text-skyblue">Learn. </span>
          <span className="text-coral">Grow.</span>
        </p>

        <p className="mx-auto mt-6 max-w-md font-sans text-base text-navy/70">
          Project setup complete. This is our starter page — the full website
          and student portal are coming in the next phases.
        </p>

        <div className="mt-8 inline-block rounded-full bg-navy px-6 py-3 font-sans text-sm font-semibold text-cream">
          Phase 1 ✓ Project is up and running
        </div>
      </div>
    </main>
  );
}
