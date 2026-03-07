"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px 0px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Stagger wrapper — children animate in sequence
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({ children, className, staggerDelay = 0.1 }: StaggerRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
