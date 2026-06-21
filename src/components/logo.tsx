import Image from "next/image";

/**
 * Kids Planet School crest logo.
 * Source file: public/images/logo.png
 * Sizing is controlled by the passed className (e.g. "h-10 w-10").
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Kids Planet School logo"
      width={120}
      height={120}
      priority
      className={`${className ?? ""} object-contain`}
    />
  );
}
