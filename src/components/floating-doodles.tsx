"use client";

// Bold, cartoonish floating shapes — the playful "Kidzee" feel.
import { motion } from "framer-motion";

const bob = (delay = 0, distance = 16) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.6 6.3L21 9l-5 4.3L17.5 20 12 16.4 6.5 20 8 13.3 3 9l6.4-.7z" />
    </svg>
  );
}

function Balloon({ className, color }: { className?: string; color: string }) {
  return (
    <div className={className} aria-hidden>
      <div className={`h-12 w-10 rounded-full ${color} shadow-sm`} />
      <div className="mx-auto h-5 w-px bg-ink/20" />
    </div>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} fill="currentColor" aria-hidden>
      <path d="M20 32a12 12 0 010-24 16 16 0 0131 4 10 10 0 011 20z" />
    </svg>
  );
}

export function FloatingDoodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* sun */}
      <motion.div {...bob(0, 12)} className="absolute left-[4%] top-[14%]">
        <div className="h-12 w-12 rounded-full bg-amber-300" />
      </motion.div>
      {/* balloons */}
      <motion.div {...bob(0.6, 22)} className="absolute right-[7%] top-[10%]">
        <Balloon color="bg-rose-300" />
      </motion.div>
      <motion.div {...bob(1.4, 18)} className="absolute right-[14%] top-[26%]">
        <Balloon color="bg-teal/70" />
      </motion.div>
      {/* clouds */}
      <motion.div {...bob(0.9, 10)} className="absolute left-[26%] top-[6%] text-white">
        <Cloud className="h-10 w-20 drop-shadow" />
      </motion.div>
      {/* stars */}
      <motion.div {...bob(1.1, 14)} className="absolute left-[46%] top-[18%] text-amber-400">
        <Star className="h-8 w-8" />
      </motion.div>
      <motion.div {...bob(0.4, 16)} className="absolute right-[34%] bottom-[30%] text-teal">
        <Star className="h-6 w-6" />
      </motion.div>
      {/* dots & rings */}
      <motion.div {...bob(0.3, 14)} className="absolute bottom-[26%] left-[10%] h-10 w-10 rounded-full bg-mint/70" />
      <motion.div {...bob(1, 18)} className="absolute bottom-[34%] left-[30%] h-7 w-7 rounded-full border-[4px] border-teal/50" />
    </div>
  );
}
