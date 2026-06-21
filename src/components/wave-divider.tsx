// A curvy wave divider between sections (Kidzee-style).
// Uses currentColor — set the text color to the colour you want the wave.
export function WaveDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`h-full w-full ${flip ? "rotate-180" : ""}`}
      >
        <path
          fill="currentColor"
          d="M0,64 C240,128 480,16 720,48 C960,80 1200,128 1440,72 L1440,121 L0,121 Z"
        />
      </svg>
    </div>
  );
}
