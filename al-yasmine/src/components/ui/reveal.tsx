"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, ReactNode } from "react";

// ─── Reveal ───────────────────────────────────────────────────────────────────
// Scroll-driven fade + slide. Animation progress is tied 1:1 to how far the
// element has travelled through its reveal window, rather than snapping on
// viewport entry. Once fully revealed (once=true, default), the element detaches
// from scroll so it never fades back out on scroll-up.

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
  const ref = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);

  // Reveal window: progress 0 when element top hits viewport bottom,
  // progress 1 when element top reaches 40% from the viewport top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });

  // Map delay (seconds) into a scroll-progress offset so staggered siblings
  // still feel sequential even without time-based transitions.
  const d = Math.min(delay * 0.1, 0.35);
  const range: [number, number] = [d, Math.min(d + 0.6, 1)];

  const yFrom = direction === "up" ? 36 : direction === "down" ? -36 : 0;
  const xFrom = direction === "left" ? 36 : direction === "right" ? -36 : 0;

  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const y       = useTransform(scrollYProgress, range, [yFrom, 0]);
  const x       = useTransform(scrollYProgress, range, [xFrom, 0]);

  // Lock-in: once the element is fully revealed, detach from scroll so
  // scrolling back up never hides the content again.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (once && !locked && v >= 0.95) setLocked(true);
  });

  if (locked) {
    // React reconciles the same DOM node — no remount, no visual jump,
    // because the motion values were already at ~1/0 when locking fired.
    return (
      <motion.div className={className} style={{ opacity: 1, y: 0, x: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, x }}>
      {children}
    </motion.div>
  );
}

// ─── StaggerReveal ────────────────────────────────────────────────────────────
// Stagger children can't be driven by a raw MotionValue (variants are
// declarative, not reactive). Instead, useScroll + useMotionValueEvent gives a
// precise scroll-position trigger — firing as soon as the container's leading
// edge enters the lower quarter of the viewport, earlier and more natural than
// a fixed -80px IntersectionObserver margin.

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Progress > 0 the moment the container's top edge crosses the bottom
  // 25% of the viewport — earlier than the old -80px IntersectionObserver.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!visible && v > 0.05) setVisible(true);
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden:  {},
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── staggerChild ─────────────────────────────────────────────────────────────
// Variant object used on individual children inside StaggerReveal.
// The expo-out ease gives each child a smooth deceleration that complements
// the scroll-driven parent trigger.

export const staggerChild = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
