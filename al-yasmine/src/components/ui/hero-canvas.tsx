"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { getTranslator, type Locale } from "@/lib/i18n";

const TOTAL_FRAMES = 193;
const FRAME_OFFSET = 100; // skip first ~52%, start with flower mid-bloom
const ACTIVE_FRAMES = TOTAL_FRAMES - FRAME_OFFSET;

const frameSrc = (n: number) =>
  `/hero-frames-webp/frame${String(n).padStart(4, "0")}.webp`;

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

export function HeroCanvas({ lang = "en" }: { lang?: Locale }) {
  const t = getTranslator(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const frameRef = useRef(FRAME_OFFSET);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity  = useTransform(scrollYProgress, [0.42, 0.58], [1, 0]);
  const extraDark    = useTransform(scrollYProgress, [0.50, 0.65], [0, 0.3]);
  const quoteOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.78, 0.85], [0, 1, 1, 0]);
  const quoteY       = useTransform(scrollYProgress, [0.55, 0.68], [14, 0]);
  const attrOpacity  = useTransform(scrollYProgress, [0.62, 0.72, 0.78, 0.85], [0, 1, 1, 0]);
  const attrY        = useTransform(scrollYProgress, [0.62, 0.72], [8, 0]);
  const bottomGradientOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

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

  useEffect(() => {
    const loadOne = (i: number) => {
      const img = new window.Image();
      img.onload = () => {
        imagesRef.current[i] = img;
        if (i === FRAME_OFFSET) {
          syncSize();
          setReady(true);
        }
      };
      img.src = frameSrc(i + 1);
    };

    loadOne(FRAME_OFFSET);

    const rafId = requestAnimationFrame(() => {
      for (let i = FRAME_OFFSET + 1; i < TOTAL_FRAMES; i++) loadOne(i);
    });

    return () => cancelAnimationFrame(rafId);
  }, [syncSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(syncSize);
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [syncSize]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const index = FRAME_OFFSET + Math.min(
        Math.round(v * (ACTIVE_FRAMES - 1)),
        ACTIVE_FRAMES - 1,
      );
      if (index === frameRef.current) return;
      frameRef.current = index;
      drawFrame(index);
    });
  }, [scrollYProgress, drawFrame]);

  return (
    <div ref={containerRef} style={{ height: "280vh" }} className="relative bg-black">
      <div className="sticky top-0 w-full h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: extraDark }}
        />

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-16"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-display font-extrabold text-white/70 mb-6 tracking-tight"
              style={{
                fontSize: lang === "ar" ? "clamp(2.8rem, 7vw, 6.5rem)" : "clamp(4rem, 10vw, 9rem)",
                lineHeight: lang === "ar" ? "1.2" : "0.9",
              }}
            >
              <span className="block">{t("hero.line1")}</span>
              <span className="block">{t("hero.line2")}</span>
              <span className="block">{t("hero.line3")}</span>
            </h1>

            <p className="text-white/70 text-lg font-light max-w-md mx-auto mb-10">
              {t("hero.subtitle")}
            </p>

            <Link
              href={`/${lang}/booking`}
              className="inline-block bg-brand-gold text-brand-dark rounded-full px-8 py-4 font-medium text-sm hover:scale-105 transition-transform"
            >
              {t("hero.cta")}
            </Link>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase">{t("hero.scroll")}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8 pointer-events-none"
          style={{ opacity: quoteOpacity, y: quoteY }}
        >
          <p
            className="font-display font-[200] italic text-white leading-[1.5] max-w-2xl"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
          >
            {t("hero.quote")}
          </p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-3"
            style={{ opacity: attrOpacity, y: attrY }}
          >
            <div className="w-12 h-px bg-brand-gold" />
            <p className="text-brand-gold text-base tracking-[0.3em] uppercase">
              {t("hero.quoteAttribution")}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-48 z-30 bg-gradient-to-b from-transparent to-black pointer-events-none"
          style={{ opacity: bottomGradientOpacity }}
        />
      </div>
    </div>
  );
}
