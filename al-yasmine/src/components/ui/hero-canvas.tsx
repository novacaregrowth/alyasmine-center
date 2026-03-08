"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { ArrowDown } from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 193;

const frameSrc = (n: number) =>
  `/hero-frames-webp/frame${String(n).padStart(4, "0")}.webp`;

// ─── Cover-crop draw ──────────────────────────────────────────────────────────
// Replicates CSS `object-fit: cover` on a canvas by cropping the source image
// to the canvas aspect ratio before drawing, so no black bars appear.

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const imgAspect    = iw / ih;
  const canvasAspect = cw / ch;

  let sx = 0, sy = 0, sw = iw, sh = ih;

  if (imgAspect > canvasAspect) {
    // Image is wider — crop left/right, fill height
    sw = Math.round(ih * canvasAspect);
    sx = Math.round((iw - sw) / 2);
  } else {
    // Image is taller — crop top/bottom, fill width
    sh = Math.round(iw / canvasAspect);
    sy = Math.round((ih - sh) / 2);
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

// ─── HeroCanvas ──────────────────────────────────────────────────────────────
// A 300vh scroll container with a sticky full-screen canvas inside.
// Scroll position maps linearly to frame index (0 → 192).
// Frame 0 is loaded first and given browser priority so the hero appears
// immediately; all other frames load in the background via a RAF-deferred loop.

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const frameRef = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // progress 0 = canvas top at viewport top
    // progress 1 = canvas bottom at viewport top (user has scrolled full 300vh)
    offset: ["start start", "end start"],
  });

  // ── Draw a single frame ─────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

  // ── Sync canvas pixel dimensions to its CSS size (DPR-aware) ───────────────
  const syncSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
    }
    drawFrame(frameRef.current);
  }, [drawFrame]);

  // ── Preload frames ──────────────────────────────────────────────────────────
  // Frame 0 is loaded immediately and synchronously assigned; the rest are
  // deferred by one RAF tick so the browser services frame-0's request first.
  useEffect(() => {
    const loadOne = (i: number) => {
      const img = new window.Image();
      img.onload = () => {
        imagesRef.current[i] = img;
        if (i === 0) {
          syncSize();
          setReady(true);
        }
      };
      img.src = frameSrc(i + 1);
    };

    // Priority: frame 0
    loadOne(0);

    // Deferred: frames 1–192
    const rafId = requestAnimationFrame(() => {
      for (let i = 1; i < TOTAL_FRAMES; i++) loadOne(i);
    });

    return () => cancelAnimationFrame(rafId);
  }, [syncSize]);

  // ── Resize observer keeps canvas sharp after window resize ─────────────────
  useEffect(() => {
    const obs = new ResizeObserver(syncSize);
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [syncSize]);

  // ── Scroll → frame ──────────────────────────────────────────────────────────
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const index = Math.min(
        Math.round(v * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1,
      );
      if (index === frameRef.current) return;
      frameRef.current = index;
      drawFrame(index);
    });
  }, [scrollYProgress, drawFrame]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    // Tall container gives the sticky canvas its scroll travel distance
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">

      {/* Sticky viewport-sized shell — stays fixed while container scrolls */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero content — fades in once frame 0 is painted */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src="/images/al-yasmine-center-logo-light.png"
              alt="Al Yasmine Center"
              width={200}
              height={70}
              className="h-16 w-auto"
              priority
            />
          </motion.div>

          <h1
            className="font-display font-[200] text-white mb-6 leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
          >
            <span className="block">Heard.</span>
            <span className="block">Understood.</span>
            <span className="block">Healed.</span>
          </h1>

          <p className="text-white/70 text-lg font-light max-w-md mx-auto mb-10">
            I&apos;m here to help you regain your balance.
          </p>

          <Link
            href="/booking"
            className="inline-block bg-brand-gold text-brand-dark rounded-full px-8 py-4 font-medium text-sm hover:scale-105 transition-transform"
          >
            Book a Free Call
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>

      </div>
    </div>
  );
}
