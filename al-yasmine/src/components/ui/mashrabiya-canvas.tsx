"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Brand hex values (Canvas API doesn't support Tailwind tokens) ───────────
const CREAM = "#F6F2E9";
const TEAL = "3, 90, 96";
const GOLD = "236, 162, 0";

// ─── Geometric constants ─────────────────────────────────────────────────────
const GRID_SPACING = 120;
const UNIT_SIZE = 40;
const ANG_STEP = Math.PI / 4;
const ANG_START = -Math.PI / 2 + Math.PI / 8; // flat-topped octagon orientation

// ─── Dust mote seeds (deterministic so they don't re-randomize on re-render) ─
const MOTE_COUNT = 14;
const MOTES = Array.from({ length: MOTE_COUNT }, (_, i) => ({
  baseX: (i * 0.0731 + 0.12) % 1,
  baseY: (i * 0.0937 + 0.08) % 1,
  radius: 1 + (i % 3) * 0.5,
  freqX: 0.2 + (i % 5) * 0.08,
  freqY: 0.15 + (i % 7) * 0.06,
  phaseX: i * 1.1,
  phaseY: i * 0.7,
  ampX: 20 + (i % 4) * 10,
  ampY: 15 + (i % 3) * 8,
  opacityBase: 0.05 + (i % 5) * 0.02,
  opacityAmp: 0.015 + (i % 3) * 0.01,
  opacityFreq: 0.3 + (i % 4) * 0.1,
}));

// ─── Light patch seeds ───────────────────────────────────────────────────────
const PATCHES = [
  { baseX: 0.25, baseY: 0.35, freqX: 0.18, freqY: 0.22, phX: 0, phY: 0.5, amp: 30 },
  { baseX: 0.65, baseY: 0.25, freqX: 0.14, freqY: 0.19, phX: 1.2, phY: 0.3, amp: 25 },
  { baseX: 0.4, baseY: 0.7, freqX: 0.21, freqY: 0.16, phX: 2.1, phY: 1.8, amp: 35 },
  { baseX: 0.75, baseY: 0.65, freqX: 0.17, freqY: 0.24, phX: 0.8, phY: 2.4, amp: 28 },
];

// ─── Light ray seeds ─────────────────────────────────────────────────────────
const RAYS = Array.from({ length: 5 }, (_, i) => ({
  baseX: 0.15 + i * 0.175,
  widthTop: 30 + (i % 3) * 15,
  widthBottom: 80 + (i % 3) * 30,
  freqX: 0.4,
  phaseX: i * 1.3,
  ampX: 40,
  opacityBase: 0.04,
  opacityAmp: 0.02,
  opacityFreq: 0.3,
  opacityPhase: i * 0.8,
}));

// ─── Geometric unit drawer ───────────────────────────────────────────────────

function drawOctagonalStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  strokeOpacity: number,
) {
  ctx.strokeStyle = `rgba(${TEAL}, ${strokeOpacity})`;
  ctx.lineWidth = 0.8;
  ctx.lineJoin = "miter";

  const R_OCT = size * 0.9;
  const R_STAR_OUT = size * 0.7;
  const R_STAR_IN = size * 0.35;
  const R_CENTER = size * 0.15;
  const STAR_START = ANG_START + ANG_STEP / 2;

  // Part 1 — Outer octagon
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = ANG_START + i * ANG_STEP;
    const vx = cx + Math.cos(angle) * R_OCT;
    const vy = cy + Math.sin(angle) * R_OCT;
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.stroke();

  // Part 2 — 8-pointed star (16 alternating vertices)
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const angle = STAR_START + i * (Math.PI / 8);
    const r = i % 2 === 0 ? R_STAR_OUT : R_STAR_IN;
    const vx = cx + Math.cos(angle) * r;
    const vy = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.stroke();

  // Part 3 — Central circle
  ctx.beginPath();
  ctx.arc(cx, cy, R_CENTER, 0, Math.PI * 2);
  ctx.stroke();

  // Part 4 — 8 connecting lines (circle edge → star outer points)
  for (let i = 0; i < 8; i++) {
    const angle = STAR_START + i * ANG_STEP;
    ctx.beginPath();
    ctx.moveTo(
      cx + Math.cos(angle) * R_CENTER,
      cy + Math.sin(angle) * R_CENTER,
    );
    ctx.lineTo(
      cx + Math.cos(angle) * R_STAR_OUT,
      cy + Math.sin(angle) * R_STAR_OUT,
    );
    ctx.stroke();
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

interface MashrabiyaCanvasProps {
  className?: string;
}

export function MashrabiyaCanvas({ className }: MashrabiyaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const syncSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    sizeRef.current = { w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    syncSize();

    const drawFrame = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) return;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const t = timeRef.current;

      // ── Layer 1 — Base fill + radial gold glow ──
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, w, h);

      const glowRadius = Math.max(w, h) * 0.7;
      const glow = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, glowRadius);
      glow.addColorStop(0, `rgba(${GOLD}, 0.06)`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // ── Layer 2 — Geometric mashrabiya pattern ──
      const driftX = Math.sin(t * 0.5) * 15;
      const driftY = Math.cos(t * 0.35) * 10;
      const rotation = Math.sin(t * 0.15) * 0.03;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(rotation);
      ctx.translate(-w / 2, -h / 2);

      const halfSpacing = GRID_SPACING / 2;
      const cols = Math.ceil(w / GRID_SPACING) + 4;
      const rows = Math.ceil(h / GRID_SPACING) + 4;
      const startCol = -2;
      const startRow = -2;

      for (let row = startRow; row < rows; row++) {
        const rowOffset = row % 2 === 0 ? 0 : halfSpacing;
        for (let col = startCol; col < cols; col++) {
          const cx = col * GRID_SPACING + rowOffset + driftX;
          const cy = row * GRID_SPACING + driftY;
          const unitOpacity =
            0.025 + Math.sin(t * 0.4 + col * 0.5 + row * 0.3) * 0.012;
          drawOctagonalStar(ctx, cx, cy, UNIT_SIZE, unitOpacity);
        }
      }

      ctx.restore();

      // ── Layer 3 — Light rays ──
      for (let i = 0; i < RAYS.length; i++) {
        const ray = RAYS[i];
        const rayX = ray.baseX * w + Math.sin(t * ray.freqX + ray.phaseX) * ray.ampX;
        const rayOpacity =
          ray.opacityBase +
          Math.sin(t * ray.opacityFreq + ray.opacityPhase) * ray.opacityAmp;

        const grad = ctx.createLinearGradient(rayX, 0, rayX, h);
        grad.addColorStop(0, `rgba(${GOLD}, ${rayOpacity.toFixed(4)})`);
        grad.addColorStop(0.7, `rgba(${GOLD}, ${(rayOpacity * 0.3).toFixed(4)})`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(rayX - ray.widthTop / 2, 0);
        ctx.lineTo(rayX + ray.widthTop / 2, 0);
        ctx.lineTo(rayX + ray.widthBottom / 2, h);
        ctx.lineTo(rayX - ray.widthBottom / 2, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Layer 4 — Warm light patches ──
      for (let i = 0; i < PATCHES.length; i++) {
        const p = PATCHES[i];
        const px = p.baseX * w + Math.sin(t * p.freqX + p.phX) * p.amp;
        const py = p.baseY * h + Math.cos(t * p.freqY + p.phY) * p.amp;
        const patchGrad = ctx.createRadialGradient(px, py, 0, px, py, 120);
        patchGrad.addColorStop(0, `rgba(${GOLD}, 0.03)`);
        patchGrad.addColorStop(1, "transparent");
        ctx.fillStyle = patchGrad;
        ctx.fillRect(px - 120, py - 120, 240, 240);
      }

      // ── Layer 5 — Dust motes ──
      for (let i = 0; i < MOTES.length; i++) {
        const m = MOTES[i];
        const mx = m.baseX * w + Math.sin(t * m.freqX + m.phaseX) * m.ampX;
        const my = m.baseY * h + Math.cos(t * m.freqY + m.phaseY) * m.ampY;
        const mOpacity =
          m.opacityBase + Math.sin(t * m.opacityFreq + m.phaseX) * m.opacityAmp;
        ctx.beginPath();
        ctx.arc(mx, my, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD}, ${Math.max(0, mOpacity).toFixed(4)})`;
        ctx.fill();
      }

      ctx.restore();
    };

    // Reduced motion: single static frame
    if (prefersReduced) {
      drawFrame();
      return;
    }

    const tick = () => {
      timeRef.current += 0.003;
      drawFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Resize handling via ResizeObserver
    const obs = new ResizeObserver(() => {
      syncSize();
    });
    obs.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, [syncSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
