"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 193;

const frameSrc = (n: number) =>
  `/hero-frames-webp/frame${String(n).padStart(4, "0")}.webp`;

// ─── Cover-crop draw ──────────────────────────────────────────────────────────

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
    sw = Math.round(ih * canvasAspect);
    sx = Math.round((iw - sw) / 2);
  } else {
    sh = Math.round(iw / canvasAspect);
    sy = Math.round((ih - sh) / 2);
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

// ─── HeroCanvas ──────────────────────────────────────────────────────────────
// A tall scroll container with a sticky full-screen canvas inside. The canvas
// sticks while frames advance, then naturally releases — no portal, no fixed
// positioning, no snap. The next section scrolls up from below like a normal page.

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
    offset: ["start start", "end start"],
  });

  // Hero content exits before the quote arrives
  const heroOpacity  = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);

  // Extra overlay darkens as quote appears
  const extraDark    = useTransform(scrollYProgress, [0.65, 0.80], [0, 0.3]);

  // Quote fades in starting around frame 135 (135/193 ≈ 0.70)
  const quoteOpacity = useTransform(scrollYProgress, [0.70, 0.82], [0, 1]);
  const quoteY       = useTransform(scrollYProgress, [0.70, 0.88], [28, 0]);

  // Attribution trails the quote by a beat
  const attrOpacity  = useTransform(scrollYProgress, [0.78, 0.90], [0, 1]);
  const attrY        = useTransform(scrollYProgress, [0.78, 0.90], [14, 0]);

  // Bottom gradient — hidden on load, fades in after 60% scroll progress
  const bottomGradientOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

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
    if (w === 0 || h === 0) return;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
    }
    drawFrame(frameRef.current);
  }, [drawFrame]);

  // ── Preload frames ──────────────────────────────────────────────────────────
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

    loadOne(0);

    const rafId = requestAnimationFrame(() => {
      for (let i = 1; i < TOTAL_FRAMES; i++) loadOne(i);
    });

    return () => cancelAnimationFrame(rafId);
  }, [syncSize]);

  // ── Resize observer keeps canvas sharp after window resize ─────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(syncSize);
    obs.observe(canvas);
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
    <div ref={containerRef} style={{ height: "300vh" }} className="relative bg-black">
      <div className="sticky top-0 w-full h-screen">
        {/* Frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Extra overlay that deepens as the quote appears */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: extraDark }}
        />

        {/* Hero content — scroll-exits before the quote arrives */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>

        {/* Quote overlay — appears over frames ~135–193 */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8 pointer-events-none"
          style={{ opacity: quoteOpacity, y: quoteY }}
        >
          <p
            className="font-display font-[200] italic text-white leading-[1.5] max-w-3xl"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
          >
            &ldquo;I am here to help you regain your balance.
            Listen to your inner voice instead of the voice
            of fear, anxiety, and tension.&rdquo;
          </p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-3"
            style={{ opacity: attrOpacity, y: attrY }}
          >
            <div className="w-12 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase">
              Aliyah Al Bahari
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom edge gradient — hidden on load, appears after 60% scroll */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-48 z-30 bg-gradient-to-b from-transparent to-black pointer-events-none"
          style={{ opacity: bottomGradientOpacity }}
        />
      </div>
    </div>
  );
}
