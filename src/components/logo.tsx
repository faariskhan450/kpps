/**
 * Kids Planet School logo mark — a planet with an orbiting moon.
 * Uses `currentColor`, so it inherits whatever text color its parent sets.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* planet */}
      <circle cx="20" cy="20" r="9" fill="currentColor" />
      {/* orbit ring */}
      <ellipse
        cx="20"
        cy="20"
        rx="17"
        ry="7"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
        transform="rotate(-28 20 20)"
      />
      {/* orbiting moon */}
      <circle cx="34" cy="13.5" r="2.4" fill="currentColor" />
    </svg>
  );
}
