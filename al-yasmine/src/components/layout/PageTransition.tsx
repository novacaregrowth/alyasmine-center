"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// AnimatePresence must live in a client component because layout.tsx is a
// Server Component (it exports `metadata`). usePathname() gives us the current
// route as the key — when the key changes, React unmounts the old motion.div
// and mounts a new one, giving AnimatePresence the unmount signal it needs to
// play the exit animation before the next page enters.

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
