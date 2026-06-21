"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";

/**
 * A delete button that opens a confirmation modal before submitting its
 * parent <form> (which runs the server action). Place inside the form.
 */
export function ConfirmDeleteButton({
  title = "Delete this item?",
  message = "This action cannot be undone.",
  ariaLabel = "Delete",
}: {
  title?: string;
  message?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function doDelete() {
    btnRef.current?.form?.requestSubmit();
    setOpen(false);
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen(true)}
        className="rounded-full p-2 text-ink/40 transition-colors hover:text-red-600"
      >
        <Trash2 size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-sm rounded-3xl bg-surface p-6 shadow-[0_30px_80px_rgba(19,48,41,0.25)]"
            >
              <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 font-sans text-sm text-ink/60">{message}</p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-ink/15 px-5 py-2.5 font-sans text-sm font-semibold text-ink transition-colors hover:border-deep"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={doDelete}
                  className="rounded-full bg-red-500 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
