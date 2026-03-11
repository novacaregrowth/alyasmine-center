"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export function CinematicWrapper({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    ["#F6F2E9", "#FDF0E8", "#FDCCBE", "#F6F2E9", "#035A60", "#2F2F2F"]
  );

  return (
    <motion.div style={{ backgroundColor: bgColor }}>
      {children}
    </motion.div>
  );
}
