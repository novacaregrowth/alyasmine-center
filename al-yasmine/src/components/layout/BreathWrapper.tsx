"use client";

import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";

export function BreathWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ backgroundColor: ["#F6F2E9", "#FDF0E8", "#F6F2E9"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="flex-1 pb-24 lg:pb-0 font-body antialiased"
    >
      <PageTransition>{children}</PageTransition>
    </motion.div>
  );
}
