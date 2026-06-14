"use client";

// Reusable scroll-animation building blocks (powered by Framer Motion).
// These are Client Components because animation runs in the browser.
//
//  <Reveal>            -> one element fades + rises into view on scroll
//  <Stagger>/<Item>    -> a group whose children appear one after another

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// A smooth, premium easing curve (same one used in globals.css)
const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Single reveal ---------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** how far it travels upward as it appears (px) */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Staggered group ---------- */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
