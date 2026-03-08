"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

function TestimonialBlock({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const quoteY  = useTransform(scrollYProgress, [0, 0.5], [28, 0]);

  const accents = ["#ECA200", "#7FB0B4", "#035A60"];
  const accent  = accents[index % accents.length];

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative flex flex-col items-center text-center px-8 py-16 max-w-2xl mx-auto"
    >
      {/* Decorative oversized quote mark */}
      <motion.span
        style={{ y: quoteY, color: accent }}
        className="font-display text-[100px] leading-none opacity-[0.08] select-none absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </motion.span>

      {/* Stars */}
      <div className="flex gap-1 mb-6 relative z-10">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="text-brand-gold text-sm">★</span>
        ))}
      </div>

      {/* Quote text */}
      <motion.p
        style={{ y: quoteY }}
        className="font-display font-light italic text-brand-dark text-2xl md:text-[1.75rem] leading-relaxed mb-8 relative z-10"
      >
        &ldquo;{t.quote}&rdquo;
      </motion.p>

      {/* Accent dot */}
      <span
        className="block w-1.5 h-1.5 rounded-full mb-5"
        style={{ backgroundColor: accent }}
      />

      {/* Author */}
      <p className="text-sm font-semibold text-brand-dark tracking-wide">{t.name}</p>
      <p className="text-xs text-brand-teal-light mt-0.5">{t.role}</p>
    </motion.div>
  );
}

export function ScrollTestimonials({
  testimonials,
}: {
  testimonials: readonly Testimonial[];
}) {
  return (
    <div className="divide-y divide-[#ede8de]">
      {testimonials.map((t, i) => (
        <TestimonialBlock key={t.id} t={t} index={i} />
      ))}
    </div>
  );
}
