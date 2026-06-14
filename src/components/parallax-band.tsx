"use client";

// A full-width image band with a subtle parallax effect:
// the photo drifts slowly as the section scrolls through the viewport.
// This is the kind of motion you see on premium sites like Apple.

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function ParallaxBand({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  // Track this section's progress through the viewport (0 = entering, 1 = leaving)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map that progress to a gentle vertical shift of the image
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative my-20 h-[55vh] min-h-[360px] overflow-hidden"
    >
      {/* Oversized so the parallax shift never reveals an edge */}
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>

      {/* Brand tint for contrast + on-brand colour */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-deep/55 to-deep/30" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-5 sm:px-8">
        {children}
      </div>
    </section>
  );
}
