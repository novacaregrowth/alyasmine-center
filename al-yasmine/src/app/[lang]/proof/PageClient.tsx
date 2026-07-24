"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { useParams } from "next/navigation";
import { getTranslator, type Locale } from "@/lib/i18n";
import { JasmineBloom } from "@/components/ui/jasmine-bloom";
import { testimonials as allTestimonials } from "@/lib/config";

// ─── Jasmine petal — single soft petal used for ambient floaters ──────────────
function JasminePetal({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className="block"
    >
      <defs>
        <radialGradient id="petalFade" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#FDCCBE" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#FDCCBE" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FDCCBE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(50 50)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-22"
            rx="9"
            ry="18"
            transform={`rotate(${rot})`}
            fill="url(#petalFade)"
          />
        ))}
        <circle cx="0" cy="0" r="3.5" fill="#ECA200" fillOpacity="0.35" />
      </g>
    </svg>
  );
}

// ─── DriftingPetals ──────────────────────────────────────────────────────────
// rAF-driven jasmine particles drifting across the hero. Direction is bound to
// reading order (LTR drifts right, RTL drifts left). Per-particle startX is
// SEEDED based on driftDirection so the entire field begins off-screen on the
// upstream side and crosses the viewport before wrapping. A naive sign flip on
// LTR seeding would spawn RTL particles off the wrong edge and they'd never
// appear — this implementation flips both seed and wrap condition together.

interface PetalSeed {
  topPct: number;     // vertical position in % of stage
  speed: number;      // vw per second
  size: number;       // px
  opacity: number;
  startOffset: number; // extra off-screen distance (vw) — staggers entries
  blendSeed: number;  // passed to JasmineBloom for shape variance
}

const PETAL_SEEDS: ReadonlyArray<PetalSeed> = [
  { topPct: 14, speed: 1.6, size: 36, opacity: 0.30, startOffset: 6,  blendSeed: 101 },
  { topPct: 24, speed: 2.4, size: 28, opacity: 0.22, startOffset: 14, blendSeed: 102 },
  { topPct: 36, speed: 1.2, size: 44, opacity: 0.34, startOffset: 22, blendSeed: 103 },
  { topPct: 48, speed: 2.0, size: 32, opacity: 0.26, startOffset: 4,  blendSeed: 104 },
  { topPct: 58, speed: 1.4, size: 40, opacity: 0.30, startOffset: 18, blendSeed: 105 },
  { topPct: 70, speed: 2.2, size: 26, opacity: 0.20, startOffset: 10, blendSeed: 106 },
  { topPct: 82, speed: 1.8, size: 34, opacity: 0.28, startOffset: 16, blendSeed: 107 },
  { topPct: 90, speed: 2.6, size: 24, opacity: 0.18, startOffset: 2,  blendSeed: 108 },
];

interface DriftingPetalsProps {
  isAr: boolean;
  reduceMotion: boolean | null;
}

function DriftingPetals({ isAr, reduceMotion }: DriftingPetalsProps) {
  const driftDirection = isAr ? -1 : 1;

  // Compute per-particle layout once. RTL seeds startX off the RIGHT edge
  // (positive, > 100); LTR seeds startX off the LEFT edge (negative, < 0).
  const particles = useMemo(
    () =>
      PETAL_SEEDS.map((s) => ({
        ...s,
        // startX in vw — off-screen on the upstream side for this direction.
        startX: isAr ? 100 + s.startOffset : -10 - s.startOffset,
        driftDirection,
      })),
    [isAr, driftDirection]
  );

  const elsRef = useRef<Array<HTMLDivElement | null>>([]);
  const startTimesRef = useRef<number[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduceMotion) return;

    const startedAt = performance.now();
    startTimesRef.current = particles.map(() => startedAt);
    let cancelled = false;

    const tick = (t: number) => {
      if (cancelled) return;
      for (let i = 0; i < particles.length; i++) {
        const el = elsRef.current[i];
        if (!el) continue;
        const p = particles[i];
        const startTime = startTimesRef.current[i] ?? t;
        const elapsedSec = (t - startTime) / 1000;

        // x = startX + driftDirection * (elapsed * speed)
        let x = p.startX + p.driftDirection * elapsedSec * p.speed;

        // RTL-aware wrap. Reset both clock and position when the particle
        // exits the downstream edge for its direction.
        if (p.driftDirection === 1 && x > 110) {
          startTimesRef.current[i] = t;
          x = p.startX;
        } else if (p.driftDirection === -1 && x < -10) {
          startTimesRef.current[i] = t;
          x = p.startX;
        }

        el.style.transform = `translate3d(${x}vw, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [particles, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          ref={(el) => {
            elsRef.current[i] = el;
          }}
          className="absolute"
          style={{
            top: `${p.topPct}%`,
            left: 0,
            opacity: p.opacity,
            willChange: "transform",
            // Initial transform — particle begins off-screen at startX so it
            // doesn't pop in at 0vw on the first paint before rAF fires.
            transform: `translate3d(${p.startX}vw, 0, 0)`,
          }}
        >
          <JasmineBloom
            seed={p.blendSeed}
            size={p.size}
            toneClass="text-brand-blush"
          />
        </div>
      ))}
    </div>
  );
}

// ─── BLOOM_SEEDS ─────────────────────────────────────────────────────────────
// Fourteen hand-tuned bloom definitions driving the convergence choreography.
// Each seed records a start position (off-stage, vw/vh units), a target
// position (converged ring around the headline, vmin units), a rotation
// delta, a render size, and a petalSeed that feeds JasmineBloom for
// deterministic shape variance. Values are NOT algorithmically generated —
// they are intentional placements so the convergence reads as composed.

const BLOOM_SEEDS = [
  { startX: "-38vw", startY: "-28vh", targetX: "-16vmin", targetY: "-14vmin", rotateDelta:  1.8, size: 52, petalSeed: 0.12 },
  { startX:  "41vw", startY: "-31vh", targetX:  "14vmin", targetY: "-17vmin", rotateDelta: -2.1, size: 44, petalSeed: 0.67 },
  { startX: "-44vw", startY:  "11vh", targetX: "-18vmin", targetY:   "3vmin", rotateDelta:  1.2, size: 60, petalSeed: 0.34 },
  { startX:  "38vw", startY:  "18vh", targetX:  "17vmin", targetY:   "6vmin", rotateDelta: -1.6, size: 48, petalSeed: 0.89 },
  { startX:  "-8vw", startY: "-42vh", targetX:  "-5vmin", targetY: "-19vmin", rotateDelta:  2.0, size: 40, petalSeed: 0.23 },
  { startX:  "12vw", startY:  "44vh", targetX:   "8vmin", targetY:  "19vmin", rotateDelta: -1.4, size: 56, petalSeed: 0.78 },
  { startX: "-50vw", startY: "-14vh", targetX: "-19vmin", targetY:  "-6vmin", rotateDelta:  0.9, size: 36, petalSeed: 0.45 },
  { startX:  "48vw", startY:   "8vh", targetX:  "18vmin", targetY:   "2vmin", rotateDelta: -2.3, size: 64, petalSeed: 0.11 },
  { startX: "-22vw", startY:  "38vh", targetX: "-11vmin", targetY:  "16vmin", rotateDelta:  1.5, size: 50, petalSeed: 0.56 },
  { startX:  "28vw", startY: "-38vh", targetX:  "12vmin", targetY: "-16vmin", rotateDelta: -1.0, size: 42, petalSeed: 0.92 },
  { startX: "-32vw", startY:  "30vh", targetX: "-15vmin", targetY:  "12vmin", rotateDelta:  2.2, size: 58, petalSeed: 0.28 },
  { startX:  "35vw", startY: "-22vh", targetX:  "16vmin", targetY:  "-9vmin", rotateDelta: -1.8, size: 46, petalSeed: 0.73 },
  { startX:  "-6vw", startY:  "46vh", targetX:  "-3vmin", targetY:  "20vmin", rotateDelta:  1.1, size: 38, petalSeed: 0.39 },
  { startX:  "18vw", startY: "-46vh", targetX:   "9vmin", targetY: "-20vmin", rotateDelta: -0.7, size: 54, petalSeed: 0.84 },
] as const;

type BloomSeed = (typeof BLOOM_SEEDS)[number];

// ─── parseUnitToPx ───────────────────────────────────────────────────────────
// Convert a CSS unit string (vw/vh/vmin/vmax/px) to a pixel value given the
// current viewport dimensions. Used to resolve BLOOM_SEEDS' mixed vw/vh →
// vmin convergence endpoints into plain numeric px so framer-motion's
// useTransform can interpolate smoothly (it will NOT mix strings of
// different unit types — it snaps mid-range instead of tweening).

function parseUnitToPx(value: string, vw: number, vh: number): number {
  const match = value.match(/^(-?\d+(?:\.\d+)?)(vw|vh|vmin|vmax|px)$/);
  if (!match) return 0;
  const n = parseFloat(match[1]);
  const unit = match[2];
  const vmin = Math.min(vw, vh);
  const vmax = Math.max(vw, vh);
  switch (unit) {
    case "vw":   return (n / 100) * vw;
    case "vh":   return (n / 100) * vh;
    case "vmin": return (n / 100) * vmin;
    case "vmax": return (n / 100) * vmax;
    case "px":   return n;
    default:     return 0;
  }
}

// ─── FieldBloom ──────────────────────────────────────────────────────────────
// One of 14 blooms that fly in from off-stage and converge in a ring around
// the headline. Receives RAW scrollYProgress (NOT the parent's spring-smoothed
// value) to avoid double-lag. Applies its OWN per-bloom useSpring locally
// around convergence x/y only — opacity and rotate read raw progress.
//
// Pixel endpoints are computed at layout time from the seed's mixed-unit
// strings (vw/vh/vmin) so the x/y useTransform can interpolate numbers.

interface FieldBloomProps {
  seed: BloomSeed;
  index: number;
  scrollYProgress: MotionValue<number>;
}

function FieldBloom({ seed, index, scrollYProgress }: FieldBloomProps) {
  const [px, setPx] = useState(() => ({ sx: 0, sy: 0, tx: 0, ty: 0 }));

  useLayoutEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") return;
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      setPx({
        sx: parseUnitToPx(seed.startX,  vw, vh),
        sy: parseUnitToPx(seed.startY,  vw, vh),
        tx: parseUnitToPx(seed.targetX, vw, vh),
        ty: parseUnitToPx(seed.targetY, vw, vh),
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [seed.startX, seed.startY, seed.targetX, seed.targetY]);

  // Local spring — smooths ONLY convergence x/y. opacity and rotate read raw.
  const localSmooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Per-bloom staggered entry window (each bloom lags the prior by 0.025).
  const entryStart = 0.40 + index * 0.025;
  const entryEnd   = entryStart + 0.10;

  const opacity = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1]);
  const x       = useTransform(localSmooth,     [0.60, 0.88],          [px.sx, px.tx]);
  const y       = useTransform(localSmooth,     [0.60, 0.88],          [px.sy, px.ty]);
  const rotate  = useTransform(scrollYProgress, [0.85, 1],             [0, seed.rotateDelta]);

  // Anchor the bloom's visual centre at the sticky stage centre via
  // calc(50% - half-size). Motion x/y then translates in pixels from there.
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: `calc(50% - ${seed.size / 2}px)`,
        top:  `calc(50% - ${seed.size / 2}px)`,
        x, y, rotate, opacity,
      }}
    >
      <JasmineBloom
        seed={seed.petalSeed}
        size={seed.size}
        toneClass="text-brand-blush"
      />
    </motion.div>
  );
}

// ─── ProofGardenHero ─────────────────────────────────────────────────────────
// 220vh scroll-linked sticky hero. Minimal foreground: one headline + one
// whispered count. All visual depth lives in the atmosphere + bloom layers.
//
// Layer stack (back to front), isolated under one sticky wrapper:
//   1a tonal depth wash     (radial blush, drifts up — slowest layer)
//   1b base gradient        (cream → blush landing zone)
//   2  mashrabiya lattice   (repeating SVG tile, Islamic geometry)
//   3  central gold glow    (replaces old orbs; peaks at bloom convergence)
//   4  drifting petals      (rAF, RTL-aware)
//   5  field blooms         (14 hand-seeded, convergence x/y, mix-blend-multiply)
//   6  Beat Two bloom       (lower-third, NO blend)
//   7  foreground           (h1 headline + p whispered count; nothing else)

interface ProofGardenHeroProps {
  t: (key: string) => string;
  isAr: boolean;
  reduceMotion: boolean | null;
}

function ProofGardenHero({
  t,
  isAr,
  reduceMotion,
}: ProofGardenHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Parent-level spring — drives atmosphere, Beat Two, headline, whisper.
  // FieldBloom children receive RAW scrollYProgress (not this) to avoid
  // stacking their own per-bloom spring on top of a parent spring.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.6,
  });

  // Independent one-shot locks — headline locks when its fade completes;
  // whisper locks slightly later. Atmosphere layers NEVER lock: they must
  // reverse smoothly on scroll-up per spec.
  const [headlineLocked, setHeadlineLocked] = useState(false);
  const [whisperLocked,  setWhisperLocked]  = useState(false);
  useMotionValueEvent(smooth, "change", (v) => {
    if (!headlineLocked && v > 0.92) setHeadlineLocked(true);
    if (!whisperLocked  && v > 0.95) setWhisperLocked(true);
  });

  // Atmosphere motion values.
  const tonalY       = useTransform(smooth, [0, 1], ["0%", "-8%"]);
  const tonalOpacity = useTransform(smooth, [0, 1], [0.6, 1]);

  const mashY        = useTransform(smooth, [0, 1],   ["0%", "-14%"]);
  const mashOpacity  = useTransform(smooth, [0, 0.5], [0.3, 0.7]);

  const glowScale    = useTransform(smooth, [0, 0.5, 1],       [0.8, 1, 1.15]);
  const glowOpacity  = useTransform(smooth, [0, 0.33, 0.66, 1], [0.2, 0.45, 0.75, 0.9]);

  // Beat Two bloom (lower-third, NO blend wrapper).
  const beatTwoOpacity = useTransform(smooth, [0.15, 0.40], [0, 1]);
  const beatTwoY       = useTransform(smooth, [0.15, 0.70], ["20%", "-4%"]);
  const beatTwoScale   = useTransform(smooth, [0.15, 0.40], [0.6, 1]);

  // Headline + whispered count.
  const headlineOpacity = useTransform(smooth, [0.82, 0.90], [0, 1]);
  const headlineY       = useTransform(smooth, [0.82, 0.90], [12, 0]);
  const whisperOpacity  = useTransform(smooth, [0.88, 0.96], [0, 1]);
  const whisperY        = useTransform(smooth, [0.88, 0.96], [12, 0]);

  // Beat Two bloom position — percentage anchor, same as before.
  const beatTwoBloom = { leftPct: 50, bottomPct: 14, size: 380, seed: 21 };

  return (
    <section
      ref={sectionRef}
      aria-label={t("proofPage.heroNew.headline")}
      className="relative w-full"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 isolate flex h-screen w-full items-center justify-center overflow-hidden">

        {/* Layer 1a — tonal depth wash. Slowest-moving layer, furthest back.
            Warm blush radial that makes the cream ground feel alive. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(253,204,190,0.10) 0%, rgba(253,204,190,0) 70%)",
            y: tonalY,
            opacity: tonalOpacity,
          }}
        />

        {/* Layer 1b — base gradient, ends in blush so ProofStats
            (bg-brand-blush) lands without a seam. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-brand-cream via-brand-cream to-brand-blush"
        />

        {/* Layer 2 — mashrabiya lattice. Repeating inline-SVG tile of Islamic
            geometry at very low teal opacity. Drifts up as she descends. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' fill='none'><path d='M40 4 L64 22 L64 58 L40 76 L16 58 L16 22 Z' stroke='%23035A60' stroke-opacity='0.5' stroke-width='0.6'/><circle cx='40' cy='40' r='6' stroke='%23035A60' stroke-opacity='0.4' stroke-width='0.4'/></svg>\")",
            backgroundSize: "80px 80px",
            backgroundRepeat: "repeat",
            y: mashY,
            opacity: mashOpacity,
          }}
        />

        {/* Layer 3 — central gold glow. Single luminous disc behind the
            convergence point. Replaces the previous two orbs entirely.
            Peaks in scale and opacity exactly as the blooms finish
            converging and the headline arrives. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at center, rgba(236,162,0,0.20) 0%, rgba(236,162,0,0.05) 45%, rgba(236,162,0,0) 75%)",
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />

        {/* Layer 4 — drifting jasmine petals (rAF, RTL-aware) */}
        <DriftingPetals isAr={isAr} reduceMotion={reduceMotion} />

        {/* Layer 5 — FIELD BLOOMS (14 hand-seeded) under mix-blend-multiply.
            Per-bloom motion lives inside FieldBloom; this wrapper only sets
            stacking + blend context. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{ mixBlendMode: "multiply" }}
        >
          {BLOOM_SEEDS.map((seed, i) => (
            <FieldBloom
              key={i}
              seed={seed}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Layer 6/7 — Beat Two bloom + headline share the same visual center.
            Flex parent centers both at the sticky frame's middle; bloom sits
            behind (z-0), headline + whisper above (z-10). FieldBloom convergence
            already targets this same point (calc(50% - size/2)), so they all
            meet here. */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center">
          {/* Beat Two bloom — centered, behind text. No lock — reverses
              smoothly on scroll-up. */}
          <motion.div
            aria-hidden="true"
            className="absolute pointer-events-none z-0"
            style={{
              opacity: beatTwoOpacity,
              y: beatTwoY,
              scale: beatTwoScale,
            }}
          >
            <JasmineBloom
              seed={beatTwoBloom.seed}
              size={beatTwoBloom.size}
              gradient="linear-gradient(155deg, rgba(247,215,122,0.45) 0%, rgba(236,162,0,0.38) 48%, rgba(201,138,0,0.45) 100%)"
            />
          </motion.div>

          {/* Foreground — h1 headline + p whispered count. EXACTLY two
              elements; no eyebrow, no scroll hint, no subheading. */}
          <div className="section-container relative z-10 flex flex-col items-center text-center">
            <motion.h1
              className={`font-display font-extrabold text-brand-teal leading-[0.95] ${
                isAr ? "font-display leading-[1.15]" : ""
              }`}
              style={{
                fontSize: isAr
                  ? "clamp(2rem, 5.2vw, 5.25rem)"
                  : "clamp(2rem, 6vw, 6rem)",
                letterSpacing: isAr ? "0" : "-0.02em",
                ...(headlineLocked
                  ? { opacity: 1, y: 0 }
                  : { opacity: headlineOpacity, y: headlineY }),
              }}
            >
              {t("proofPage.heroNew.headline")}
            </motion.h1>

            <motion.p
              className={`mt-5 font-display tracking-normal text-brand-teal ${
                isAr ? "" : "italic"
              }`}
              style={{
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                ...(whisperLocked
                  ? { opacity: 1, y: 0 }
                  : { opacity: whisperOpacity, y: whisperY }),
              }}
            >
              {t("proofPage.heroNew.whisperedCount")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ProofStats ──────────────────────────────────────────────────────────────
// Inline blush-zone stats lockup. Lands directly on the hero's blush exit so
// there's no gradient seam between sections. Three numerals separated by two
// hairlines — ALL five children use `variants={staggerChild}` so they share a
// single source of truth for the stagger cascade. (Bypassing variants with
// per-element initial/whileInView would cause the hairlines to fire on their
// own viewport trigger, breaking the visual cadence.)

interface ProofStatsProps {
  t: (key: string) => string;
  isAr: boolean;
}

function ProofStats({ t, isAr }: ProofStatsProps) {
  const items = [
    {
      value: t("proofPage.proofStats.stat1Value"),
      label: t("proofPage.proofStats.stat1Label"),
    },
    {
      value: t("proofPage.proofStats.stat2Value"),
      label: t("proofPage.proofStats.stat2Label"),
    },
    {
      value: t("proofPage.proofStats.stat3Value"),
      label: t("proofPage.proofStats.stat3Label"),
    },
  ];

  return (
    <section className="bg-brand-blush py-28 md:py-32">
      <div className="section-container mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <p
            className={`text-brand-gold uppercase ${
              isAr
                ? "font-display text-[18px] tracking-[0.25em] font-extrabold"
                : "text-[15px] tracking-[0.4em] font-extrabold"
            }`}
          >
            {t("proofPage.proofStats.eyebrow")}
          </p>
        </Reveal>

        <StaggerReveal
          staggerDelay={0.15}
          className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0"
        >
          {/* Stat 1 */}
          <motion.div variants={staggerChild} className="text-center">
            <div
              className={`mb-3 font-display text-5xl font-light leading-none text-brand-teal md:text-6xl ${
                isAr ? "font-display" : ""
              }`}
            >
              {items[0].value}
            </div>
            <div
              className={`text-brand-teal/70 ${
                isAr
                  ? "font-display text-[12px] tracking-[0.12em]"
                  : "text-[11px] uppercase tracking-[0.25em]"
              }`}
            >
              {items[0].label}
            </div>
          </motion.div>

          {/* Hairline 1 — variants={staggerChild}, no per-element trigger */}
          <motion.span
            aria-hidden="true"
            variants={staggerChild}
            className="mx-auto hidden h-20 w-px bg-brand-teal/25 md:block"
          />

          {/* Stat 2 */}
          <motion.div variants={staggerChild} className="text-center">
            <div
              className={`mb-3 font-display text-5xl font-light leading-none text-brand-teal md:text-6xl ${
                isAr ? "font-display" : ""
              }`}
            >
              {items[1].value}
            </div>
            <div
              className={`text-brand-teal/70 ${
                isAr
                  ? "font-display text-[12px] tracking-[0.12em]"
                  : "text-[11px] uppercase tracking-[0.25em]"
              }`}
            >
              {items[1].label}
            </div>
          </motion.div>

          {/* Hairline 2 — variants={staggerChild}, no per-element trigger */}
          <motion.span
            aria-hidden="true"
            variants={staggerChild}
            className="mx-auto hidden h-20 w-px bg-brand-teal/25 md:block"
          />

          {/* Stat 3 */}
          <motion.div variants={staggerChild} className="text-center">
            <div
              className={`mb-3 font-display text-5xl font-light leading-none text-brand-teal md:text-6xl ${
                isAr ? "font-display" : ""
              }`}
            >
              {items[2].value}
            </div>
            <div
              className={`text-brand-teal/70 ${
                isAr
                  ? "font-display text-[12px] tracking-[0.12em]"
                  : "text-[11px] uppercase tracking-[0.25em]"
              }`}
            >
              {items[2].label}
            </div>
          </motion.div>
        </StaggerReveal>
      </div>
    </section>
  );
}

// ─── TestimonialsGallery ──────────────────────────────────────────────────────
// Three-row cinematic layout on a deep teal stage.
//   Row 1: two short cards (T1, T3) side-by-side.
//   Row 2: featured testimonial (T2) as a centered typographic spread.
//   Row 3: endorsement (T4) as a softer, framed quotation.
// A single gold hairline divider separates Row 1 from Row 2, animated scaleY
// from top on viewport entry. No jasmine imagery in this section.

type LocalTestimonial = (typeof allTestimonials)[number];

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2.6l2.82 6.38 6.93.69-5.23 4.66 1.56 6.81L12 17.77l-6.08 3.37 1.56-6.81L2.25 9.67l6.93-.69L12 2.6z" />
    </svg>
  );
}

function StarRow({
  rating,
  className = "",
  justify = "start",
}: {
  rating: number;
  className?: string;
  justify?: "start" | "center";
}) {
  const justifyClass = justify === "center" ? "justify-center" : "justify-start";
  return (
    <div
      className={`flex ${justifyClass} gap-1 text-brand-gold ${className}`}
      aria-label={`${rating} of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <StarIcon key={i} className="w-4 h-4" />
      ))}
    </div>
  );
}

function GoldHairlineDivider({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div className="flex justify-center py-10 md:py-14" aria-hidden="true">
      <motion.span
        className="block w-px h-14 md:h-16 bg-brand-gold origin-top"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={reduceMotion ? undefined : { scaleY: 1 }}
        transition={{ duration: 2.4, ease: [0.19, 1, 0.22, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      />
    </div>
  );
}

function ShortCard({
  testimonial,
  isAr,
}: {
  testimonial: LocalTestimonial;
  isAr: boolean;
}) {
  const quote = isAr ? testimonial.quoteAr : testimonial.quote;
  const name = isAr ? testimonial.nameAr : testimonial.name;
  const quoteFont = isAr ? "font-display" : "font-body";
  const nameFont = isAr ? "font-display" : "font-display";
  const nameTracking = isAr
    ? "tracking-[0.08em]"
    : "tracking-[0.2em] uppercase";

  return (
    <motion.article
      className="relative rounded-3xl bg-brand-cream/5 border border-brand-gold/20 p-10 md:p-12 overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2 ltr:left-6 rtl:right-6 font-display text-brand-gold/30 text-[8rem] leading-none select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <div className="relative">
        <p
          className={`${quoteFont} text-brand-cream text-lg leading-[1.8]`}
        >
          {quote}
        </p>

        <span
          aria-hidden="true"
          className="block h-px w-16 bg-brand-gold/40 my-8"
        />

        <p
          className={`${nameFont} text-brand-teal-light text-sm ${nameTracking}`}
        >
          {name}
        </p>

        <StarRow rating={testimonial.rating} className="mt-3" />
      </div>
    </motion.article>
  );
}

function FeaturedCard({
  testimonial,
  isAr,
  reduceMotion,
}: {
  testimonial: LocalTestimonial;
  isAr: boolean;
  reduceMotion: boolean | null;
}) {
  const quote = isAr ? testimonial.quoteAr : testimonial.quote;
  const name = isAr ? testimonial.nameAr : testimonial.name;
  const quoteFont = isAr ? "font-display" : "font-display";
  const nameFont = isAr ? "font-display" : "font-display";
  const nameTracking = isAr
    ? "tracking-[0.1em]"
    : "tracking-[0.3em] uppercase";

  // Scroll-linked cinematic entrance — with one-shot lock past v > 0.95.
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 25%"],
  });
  const [locked, setLocked] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.95 && !locked) setLocked(true);
  });
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = reduceMotion || locked ? 1 : opacityRaw;
  const y = reduceMotion || locked ? 0 : yRaw;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative mx-auto max-w-3xl text-center"
    >
      <span
        aria-hidden="true"
        className="absolute -top-10 md:-top-14 ltr:left-0 rtl:right-0 font-display text-brand-gold/40 text-[10rem] md:text-[13rem] leading-none select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <p
        className={`${quoteFont} text-brand-cream text-xl md:text-2xl leading-[1.7]`}
      >
        {quote}
      </p>

      <span
        aria-hidden="true"
        className="block h-px w-24 bg-brand-gold mx-auto mt-16"
      />

      <StarRow
        rating={testimonial.rating}
        justify="center"
        className="mt-6"
      />

      <p
        className={`${nameFont} text-brand-gold/80 text-sm ${nameTracking} mt-3`}
      >
        {name}
      </p>
    </motion.div>
  );
}

function TestimonialsGallery({
  t,
  isAr,
  reduceMotion,
}: {
  t: ReturnType<typeof getTranslator>;
  isAr: boolean;
  reduceMotion: boolean | null;
}) {
  // Five testimonials: two short cards, one featured centre spread, two more short cards.
  const featured = allTestimonials.find((x) => x.featured);
  const shorts = allTestimonials.filter((x) => !x.featured);
  const firstPair = shorts.slice(0, 2);
  const secondPair = shorts.slice(2, 4);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="bg-brand-teal text-brand-cream overflow-hidden"
    >
      <div className="section-container mx-auto max-w-6xl py-16 md:py-20">
        {/* Section header (rendered immediately, no fade) */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className={`text-brand-gold ${
              isAr
                ? "font-display text-[19px] tracking-[0.08em]"
                : "font-body text-base uppercase tracking-[0.3em]"
            }`}
          >
            {t("proofPage.testimonialsSection.eyebrow")}
          </p>
          <h2
            className={`${
              isAr ? "font-display" : "font-display"
            } text-brand-cream font-extrabold mt-6`}
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {t("proofPage.testimonialsSection.heading")}
          </h2>
          {t("proofPage.testimonialsSection.subheading") && (
            <p
              className={`${
                isAr ? "font-display" : "font-display"
              } text-brand-teal-light font-light mt-4`}
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.375rem)", lineHeight: 1.5 }}
            >
              {t("proofPage.testimonialsSection.subheading")}
            </p>
          )}
        </div>

        {/* ROW 1 — two short cards side-by-side */}
        {firstPair.length === 2 && (
          <StaggerReveal
            staggerDelay={0.3}
            className="grid md:grid-cols-2 gap-4 md:gap-6"
          >
            <motion.div variants={staggerChild}>
              <ShortCard testimonial={firstPair[0]} isAr={isAr} />
            </motion.div>
            <motion.div variants={staggerChild}>
              <ShortCard testimonial={firstPair[1]} isAr={isAr} />
            </motion.div>
          </StaggerReveal>
        )}

        {/* Vertical gold hairline — bridges Row 1 → Row 2 */}
        <GoldHairlineDivider reduceMotion={reduceMotion} />

        {/* ROW 2 — featured testimonial, typographic spread */}
        {featured && (
          <FeaturedCard
            testimonial={featured}
            isAr={isAr}
            reduceMotion={reduceMotion}
          />
        )}

        {/* ROW 3 — two more short cards side-by-side */}
        {secondPair.length === 2 && (
          <StaggerReveal
            staggerDelay={0.3}
            className="mt-16 md:mt-20 grid md:grid-cols-2 gap-4 md:gap-6"
          >
            <motion.div variants={staggerChild}>
              <ShortCard testimonial={secondPair[0]} isAr={isAr} />
            </motion.div>
            <motion.div variants={staggerChild}>
              <ShortCard testimonial={secondPair[1]} isAr={isAr} />
            </motion.div>
          </StaggerReveal>
        )}
      </div>
    </section>
  );
}

export default function ProofPage() {
  const params = useParams();
  const lang = (params?.lang as Locale) || "en";
  const t = getTranslator(lang);
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const reduceMotion = useReducedMotion();

  return (
    <div dir={dir}>

      {/* ───────────────────────────────────────────────────────────────────
          HERO — "Voices of Transformation"
          220vh sticky scroll-linked jasmine garden. See ProofGardenHero.
         ─────────────────────────────────────────────────────────────────── */}
      <ProofGardenHero
        t={t}
        isAr={isAr}
        reduceMotion={reduceMotion}
      />

      {/* ── Inline Proof Stats — adopts the hero's blush landing zone ── */}
      <ProofStats t={t} isAr={isAr} />

      {/* ───────────────────────────────────────────────────────────────────
          TESTIMONIALS — "Her words"
          Blush (proof stats) → teal-light → teal bridge, then the three-row
          cinematic gallery on a deep teal stage. The section ends on teal
          so the CTA (also teal) abuts seamlessly with no trailing bridge.
         ─────────────────────────────────────────────────────────────────── */}

      {/* Bridge stage 1: blush (proof stats) → teal-light, h-32 */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-48 w-full bg-gradient-to-b from-brand-blush to-brand-teal-light"
      />
      {/* Bridge stage 2: teal-light → teal, h-32 */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-48 w-full bg-gradient-to-b from-brand-teal-light to-brand-teal"
      />

      <TestimonialsGallery t={t} isAr={isAr} reduceMotion={reduceMotion} />

      {/* ── CTA ── */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-10">
          <h2 className="font-display font-extrabold text-3xl mb-3">{t("proofPage.ctaHeading")}</h2>
          <p className="text-brand-cream/55 mb-8 text-sm">
            {t("proofPage.ctaBody")}
          </p>
          <Link
            href={`/${lang}/booking`}
            className="inline-block px-8 py-4 bg-brand-gold text-brand-dark rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105"
          >
            {t("proofPage.ctaButton")}
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
