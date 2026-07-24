"use client";

import React from "react";

// ─── JasmineBloom ─────────────────────────────────────────────────────────────
// Seeded jasmine bloom used across the Proof hero garden. The bloom silhouette
// is a single transparent PNG (public/proof/jasmine-flower.png) painted via a
// CSS mask, so its colour is driven entirely by `currentColor` (the toneClass)
// — exactly like the old inline SVG. A small seeded rotation/scale keeps the
// field from reading as a copy/paste tile. An optional Arabic flourish overlay
// renders above the bloom — used only for one bloom per the brand brief, and
// only in the ar locale.
//
// IMPORTANT: when withFlourish is true the consumer MUST mount this bloom
// OUTSIDE any mix-blend-multiply group. Brand-gold under multiply over teal
// muddies to brown and kills the legibility of the flourish arc. See proof
// PageClient.tsx where bloom index 6 (ar only) is rendered in its own
// no-blend wrapper for exactly this reason.

const FLOWER_MASK_SRC = "/proof/jasmine-flower.png";

interface JasmineBloomProps {
  /** Stable index — drives micro rotation/scale variance per bloom. */
  seed: number;
  /** CSS size; passed as width/height. Accepts any valid CSS length. */
  size: number | string;
  /** Tailwind text-* class controlling petal currentColor. */
  toneClass?: string;
  /** Optional CSS background (e.g. a gradient) that fills the flower silhouette
   *  instead of the flat `currentColor`. When set, `toneClass` is ignored for
   *  the fill. Use for hero blooms that need a tonal gradient. */
  gradient?: string;
  /** Render the Arabic flourish overlay (gold arc). Use sparingly. */
  withFlourish?: boolean;
  /** Extra wrapper classes — opacity / positioning live here. */
  className?: string;
}

const TAU = Math.PI * 2;

// Tiny deterministic hash — no dependencies, stable across SSR/CSR.
function seeded(n: number, salt: number): number {
  const x = Math.sin(n * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

export function JasmineBloom({
  seed,
  size,
  toneClass = "text-brand-cream",
  gradient,
  withFlourish = false,
  className = "",
}: JasmineBloomProps) {
  // Per-bloom variance — each bloom gets a small unique rotation and scale
  // so the field never reads as a copy/paste tile.
  const baseRotation = seeded(seed, 1) * 360;
  const petalScale = 0.92 + seeded(seed, 2) * 0.16; // 0.92 .. 1.08

  return (
    <span
      className={`relative inline-block leading-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Flower silhouette — PNG mask filled with currentColor (toneClass) or an
          optional gradient background when provided. */}
      <span
        className={`block h-full w-full ${gradient ? "" : toneClass}`}
        style={{
          ...(gradient
            ? { background: gradient }
            : { backgroundColor: "currentColor" }),
          transform: `rotate(${baseRotation.toFixed(2)}deg) scale(${petalScale.toFixed(3)})`,
          WebkitMaskImage: `url(${FLOWER_MASK_SRC})`,
          maskImage: `url(${FLOWER_MASK_SRC})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />

      {withFlourish ? <ArabicFlourish seed={seed} /> : null}
    </span>
  );
}

// ─── ArabicFlourish ───────────────────────────────────────────────────────────
// Single gold arc + inner crescent + small jewel, drawn deterministically from
// the same seed as the parent bloom. Sits absolutely over the bloom centre.
// The element wraps itself in `style={{ isolation: "isolate" }}` so even if a
// caller forgets and mounts the bloom inside a multiply group, the flourish
// stamps a fresh blend root and renders true gold rather than muddied brown.
function ArabicFlourish({ seed }: { seed: number }) {
  // Sweep angle: deterministic small variation so the arc isn't perfectly
  // axis-aligned across blooms (would feel mechanical).
  const sweep = -90 + (seeded(seed, 30) - 0.5) * 30; // -105 .. -75 deg
  const arcRadius = 36;
  const startAngle = (sweep - 70) * (TAU / 360);
  const endAngle = (sweep + 70) * (TAU / 360);
  const x1 = 50 + Math.cos(startAngle) * arcRadius;
  const y1 = 50 + Math.sin(startAngle) * arcRadius;
  const x2 = 50 + Math.cos(endAngle) * arcRadius;
  const y2 = 50 + Math.sin(endAngle) * arcRadius;

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      className="absolute inset-0 block text-brand-gold"
      style={{ isolation: "isolate" }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${arcRadius} ${arcRadius} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d={`M 50 14 C 56 22, 56 30, 50 36 C 44 30, 44 22, 50 14 Z`}
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="50" cy="50" r="2.4" fill="currentColor" />
    </svg>
  );
}

export default JasmineBloom;
