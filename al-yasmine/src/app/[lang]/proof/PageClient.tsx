"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { useParams } from "next/navigation";
import { getDictionary, getTranslator, type Locale } from "@/lib/i18n";

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

// ─── Quote opener — small five-petal jasmine icon (gold), used above quotes ───
function JasmineQuoteIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <g transform="translate(16 16)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-7"
            rx="3.4"
            ry="6.2"
            transform={`rotate(${rot})`}
            fill="currentColor"
            fillOpacity="0.9"
          />
        ))}
        <circle cx="0" cy="0" r="1.8" fill="currentColor" />
      </g>
    </svg>
  );
}

// ─── Testimonial botanicals — four distinct, decorative jasmine silhouettes ──
// Variant 1 — Full bloom: open five-petal jasmine, generous spread.
function BotanicalBloom({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      <g transform="translate(100 100)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <path
            key={rot}
            d="M0 -10 C 18 -28, 26 -58, 0 -82 C -26 -58, -18 -28, 0 -10 Z"
            transform={`rotate(${rot})`}
            fill="currentColor"
          />
        ))}
        <circle cx="0" cy="0" r="9" fill="currentColor" fillOpacity="0.65" />
        {[36, 108, 180, 252, 324].map((rot) => (
          <circle
            key={rot}
            cx="0"
            cy="-6"
            r="1.6"
            transform={`rotate(${rot})`}
            fill="currentColor"
            fillOpacity="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

// Variant 2 — Sprig: a softly curved branch with two buds and a leaf.
function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" className={className} fill="none">
      <path
        d="M30 220 C 60 170, 100 140, 150 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M88 158 C 70 160, 58 178, 64 196 C 84 192, 100 174, 88 158 Z"
        fill="currentColor"
        opacity="0.75"
      />
      <g transform="translate(150 80)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-14"
            rx="7"
            ry="14"
            transform={`rotate(${rot})`}
            fill="currentColor"
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="currentColor" fillOpacity="0.7" />
      </g>
      <g transform="translate(108 122)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-7"
            rx="3.6"
            ry="7"
            transform={`rotate(${rot})`}
            fill="currentColor"
            fillOpacity="0.85"
          />
        ))}
        <circle cx="0" cy="0" r="2" fill="currentColor" />
      </g>
    </svg>
  );
}

// Variant 3 — Single elongated petal, abstract and tall.
function BotanicalPetal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 280" aria-hidden="true" className={className} fill="none">
      <path
        d="M80 8 C 132 60, 144 150, 80 268 C 16 150, 28 60, 80 8 Z"
        fill="currentColor"
      />
      <path
        d="M80 32 C 80 110, 80 190, 80 252"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="80" cy="46" r="2.4" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

// Variant 4 — Three jasmine leaves in a soft cluster.
function BotanicalLeaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" aria-hidden="true" className={className} fill="none">
      <g transform="translate(80 110) rotate(-22)">
        <path d="M0 -56 C 32 -38, 32 38, 0 56 C -32 38, -32 -38, 0 -56 Z" fill="currentColor" />
        <path d="M0 -50 L 0 50" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
      </g>
      <g transform="translate(150 80) rotate(28)">
        <path d="M0 -48 C 28 -32, 28 32, 0 48 C -28 32, -28 -32, 0 -48 Z" fill="currentColor" opacity="0.85" />
        <path d="M0 -44 L 0 44" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      </g>
      <g transform="translate(170 150) rotate(-8)">
        <path d="M0 -36 C 22 -24, 22 24, 0 36 C -22 24, -22 -24, 0 -36 Z" fill="currentColor" opacity="0.7" />
        <path d="M0 -32 L 0 32" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      </g>
    </svg>
  );
}

// ─── TestimonialCard — one cinematic, viewport-tall testimony ────────────────
type TestimonialTheme = "teal" | "cream";
type BotanicalCorner = "tl" | "tr" | "bl" | "br";

interface TestimonialCardProps {
  quote: string;
  attribution: string;
  theme: TestimonialTheme;
  Botanical: React.ComponentType<{ className?: string }>;
  corner: BotanicalCorner;
  isAr: boolean;
  reduceMotion: boolean | null;
}

function TestimonialCard({
  quote,
  attribution,
  theme,
  Botanical,
  corner,
  isAr,
  reduceMotion,
}: TestimonialCardProps) {
  const isTeal = theme === "teal";
  const cineEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

  // Theme tokens
  const sectionBg = isTeal ? "bg-brand-teal" : "bg-brand-cream";
  const quoteText = isTeal ? "text-brand-cream" : "text-brand-teal";
  const ruleColor = "text-brand-gold"; // used for the gold rule
  const attribColor = "text-brand-gold";
  const botanicalTone = isTeal
    ? "text-brand-cream/[0.12]"
    : "text-brand-teal/[0.10]";

  // Corner positioning — logical-property friendly enough for symmetric layouts
  const cornerClass: Record<BotanicalCorner, string> = {
    tl: "top-[6%] left-[4%]",
    tr: "top-[6%] right-[4%]",
    bl: "bottom-[6%] left-[4%]",
    br: "bottom-[6%] right-[4%]",
  };

  return (
    <section
      className={`relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden ${sectionBg}`}
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Decorative botanical — entry fade then gentle infinite float (nested) */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute ${cornerClass[corner]} ${botanicalTone}`}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: cineEase }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4,
          }}
        >
          <Botanical className="w-32 sm:w-40 md:w-56 lg:w-72 h-auto" />
        </motion.div>
      </motion.div>

      {/* Cinematic curtain reveal — clip-path inset top → 0 */}
      <motion.div
        className="relative z-10 w-full"
        initial={reduceMotion ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={
          reduceMotion ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }
        }
        transition={{ duration: 1.4, ease: cineEase }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div
          className="section-container mx-auto flex max-w-3xl flex-col items-center text-center"
          style={isAr ? { direction: "rtl" } : undefined}
        >
          {/* Quote opener — gold jasmine icon replaces traditional marks */}
          <Reveal delay={0.4}>
            <JasmineQuoteIcon
              className={`mb-8 h-8 w-8 ${ruleColor}`}
            />
          </Reveal>

          {/* Quote */}
          <Reveal delay={0.4} direction="up">
            <p
              className={`font-display font-light leading-relaxed ${quoteText} ${
                isAr ? "font-arabic leading-[1.95]" : ""
              }`}
              style={{
                fontSize: isAr
                  ? "clamp(1.125rem, 2.2vw, 1.875rem)"
                  : "clamp(1.125rem, 2.4vw, 1.875rem)",
              }}
            >
              {quote}
            </p>
          </Reveal>

          {/* Gold rule — emotional separator */}
          <Reveal delay={0.7}>
            <span
              aria-hidden="true"
              className="my-10 block h-px w-16 bg-brand-gold/70"
            />
          </Reveal>

          {/* Attribution */}
          <Reveal delay={0.8} direction="up">
            <p
              className={`font-medium ${attribColor} ${
                isAr
                  ? "font-arabic text-base md:text-lg tracking-[0.06em]"
                  : "text-sm md:text-base uppercase tracking-[0.28em]"
              }`}
            >
              {attribution}
            </p>
          </Reveal>
        </div>
      </motion.div>
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

  // ── Headline lines for staggered reveal ────────────────────────────────────
  const headlineLines = [
    t("proofPage.heroLine1"),
    t("proofPage.heroLine2"),
    t("proofPage.heroLine3"),
  ];

  // ── Hero stats lockup ──────────────────────────────────────────────────────
  const heroStats = [
    {
      value: t("proofPage.heroStat1Value"),
      label: t("proofPage.heroStat1Label"),
    },
    {
      value: t("proofPage.heroStat2Value"),
      label: t("proofPage.heroStat2Label"),
    },
    {
      value: t("proofPage.heroStat3Value"),
      label: t("proofPage.heroStat3Label"),
    },
  ];

  // ── Floating petals — deterministic positions so SSR/CSR match ─────────────
  // Reduced count on small screens via CSS (last 3 petals hidden < md).
  const petals = useMemo(
    () => [
      { top: "12%",  left: "8%",  size: 56, dur: 7.5, delay: 0,    opaA: 0.22, opaB: 0.42, hideMobile: false },
      { top: "22%",  left: "82%", size: 40, dur: 8.2, delay: 1.4,  opaA: 0.18, opaB: 0.38, hideMobile: false },
      { top: "62%",  left: "14%", size: 48, dur: 6.8, delay: 2.1,  opaA: 0.20, opaB: 0.40, hideMobile: false },
      { top: "70%",  left: "78%", size: 36, dur: 9.0, delay: 0.6,  opaA: 0.16, opaB: 0.34, hideMobile: true  },
      { top: "40%",  left: "92%", size: 28, dur: 7.8, delay: 3.2,  opaA: 0.14, opaB: 0.30, hideMobile: true  },
      { top: "85%",  left: "44%", size: 32, dur: 8.6, delay: 1.8,  opaA: 0.16, opaB: 0.32, hideMobile: true  },
    ],
    []
  );

  // ── Cinematic testimonials gallery — pulled from locale ───────────────────
  // These live as an array of objects in proof.testimonials, so we reach for
  // them via getDictionary rather than the string-only translator.
  const dict = getDictionary(lang);
  const galleryTestimonials = (dict as unknown as {
    proof?: { testimonials?: { quote: string; attribution: string }[] };
  }).proof?.testimonials ?? [];

  // Per-card visual recipe — alternating themes, four distinct botanicals,
  // four distinct corner placements (TR, BL, TL, BR).
  const cardRecipes: {
    theme: TestimonialTheme;
    Botanical: React.ComponentType<{ className?: string }>;
    corner: BotanicalCorner;
  }[] = [
    { theme: "teal",  Botanical: BotanicalBloom,  corner: "tr" },
    { theme: "cream", Botanical: BotanicalSprig,  corner: "bl" },
    { theme: "teal",  Botanical: BotanicalPetal,  corner: "tl" },
    { theme: "cream", Botanical: BotanicalLeaves, corner: "br" },
  ];

  const caseStudies = [
    {
      number: isAr ? "٠١" : "01",
      title: t("proofPage.caseTitlePlaceholder"),
      tags: [t("proofPage.caseTagPlaceholder"), t("proofPage.caseTagPlaceholder")],
      body: t("proofPage.caseBodyPlaceholder"),
    },
    {
      number: isAr ? "٠٢" : "02",
      title: t("proofPage.caseTitlePlaceholder"),
      tags: [t("proofPage.caseTagPlaceholder"), t("proofPage.caseTagPlaceholder")],
      body: t("proofPage.caseBodyPlaceholder"),
    },
  ];

  // Smooth, cinematic ease used across the hero
  const cineEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

  return (
    <div dir={dir}>

      {/* ───────────────────────────────────────────────────────────────────
          HERO — "Voices of Transformation"
          A reverent, near-silent space. Layers of ambient depth, a single
          witness line, and stories rising one breath at a time.
         ─────────────────────────────────────────────────────────────────── */}
      <section
        aria-label={t("proofPage.heroEyebrow")}
        className="relative isolate min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-24"
      >
        {/* Layer 1 — base gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-50 bg-gradient-to-b from-brand-cream via-brand-blush/30 to-brand-cream"
        />

        {/* Layer 1b — faint grain for texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-40 bg-grain opacity-[0.35] mix-blend-multiply"
        />

        {/* Layer 3 — radial glow orbs */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -start-32 top-1/4 -z-30 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(3,90,96,0.16) 0%, rgba(3,90,96,0.08) 45%, rgba(3,90,96,0) 75%)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -end-32 bottom-1/3 -z-30 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(236,162,0,0.12) 0%, rgba(236,162,0,0.05) 45%, rgba(236,162,0,0) 75%)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Layer 2 — floating jasmine petals */}
        {!reduceMotion &&
          petals.map((p, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              className={`pointer-events-none absolute -z-20 ${p.hideMobile ? "hidden md:block" : ""}`}
              style={{ top: p.top, left: p.left }}
              animate={{
                y: [0, -14, 0],
                opacity: [p.opaA, p.opaB, p.opaA],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            >
              <JasminePetal size={p.size} />
            </motion.div>
          ))}

        {/* Layer 4 — gold witness line (vertical thread of testimony) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-gold/70 to-transparent"
          style={{ height: "60vh" }}
          initial={{ scaleY: 0, transformOrigin: "top center", opacity: 0 }}
          animate={
            reduceMotion
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 1, opacity: 1 }
          }
          transition={{ duration: 2.5, ease: cineEase, delay: 0.8 }}
        />

        {/* Foreground content */}
        <div className="section-container relative z-10 flex flex-col items-center text-center">

          {/* Eyebrow */}
          <Reveal delay={0.2}>
            <p
              className={`text-brand-gold uppercase mb-6 ${
                isAr
                  ? "font-arabic text-[13px] tracking-[0.35em]"
                  : "text-[11px] tracking-[0.4em] font-medium"
              }`}
            >
              {t("proofPage.heroEyebrow")}
            </p>
          </Reveal>

          {/* Headline — staggered line-by-line */}
          <div className={`mb-8 ${isAr ? "space-y-3" : "space-y-2"}`}>
            {headlineLines.map((line, i) => (
              <Reveal key={i} delay={0.35 + i * 0.15} direction="up">
                <h1
                  className={`font-display font-light text-brand-teal leading-[0.95] ${
                    isAr ? "font-arabic leading-[1.15]" : ""
                  }`}
                  style={{
                    fontSize: isAr
                      ? "clamp(2rem, 5.2vw, 5.25rem)"
                      : "clamp(2rem, 6vw, 6rem)",
                    letterSpacing: isAr ? "0" : "-0.02em",
                  }}
                >
                  {line}
                </h1>
              </Reveal>
            ))}
          </div>

          {/* Subheading */}
          <Reveal delay={0.8}>
            <p
              className={`mx-auto max-w-2xl text-brand-teal/70 ${
                isAr
                  ? "font-arabic text-lg md:text-xl leading-[1.9]"
                  : "text-lg md:text-xl leading-[1.7]"
              }`}
            >
              {t("proofPage.heroSubheading")}
            </p>
          </Reveal>

          {/* Stats lockup — 3 frosted glass pills */}
          <StaggerReveal
            className={`mt-14 flex w-full max-w-3xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap md:gap-6`}
            staggerDelay={0.12}
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerChild}
                className={`group relative flex flex-1 items-center gap-4 rounded-full bg-white/40 px-6 py-4 backdrop-blur-xl ring-1 ring-white/40 transition-colors duration-500 hover:bg-white/55 ${
                  isAr
                    ? "border-r-2 border-brand-gold pr-6 pl-6"
                    : "border-l-2 border-brand-gold pl-6 pr-6"
                }`}
                style={{
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 30px -12px rgba(3,90,96,0.18)",
                }}
              >
                <div
                  className={`font-display text-3xl md:text-[2rem] font-light text-brand-teal leading-none ${
                    isAr ? "font-arabic" : ""
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-start text-xs md:text-[13px] uppercase tracking-[0.18em] text-brand-teal/60 ${
                    isAr
                      ? "font-arabic text-[12px] tracking-[0.12em] normal-case leading-tight"
                      : ""
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </StaggerReveal>

          {/* Subtle scroll affordance */}
          <Reveal delay={1.6}>
            <div className="mt-16 flex flex-col items-center gap-3">
              <p
                className={`text-brand-teal/45 ${
                  isAr
                    ? "font-arabic text-[12px] tracking-[0.18em]"
                    : "text-[10px] tracking-[0.4em] uppercase"
                }`}
              >
                {t("proofPage.heroScrollHint")}
              </p>
              <motion.span
                aria-hidden="true"
                className="block h-10 w-px bg-gradient-to-b from-brand-teal/40 to-transparent"
                initial={{ scaleY: 0, transformOrigin: "top center" }}
                animate={reduceMotion ? { scaleY: 1 } : { scaleY: [0, 1, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          CINEMATIC TESTIMONIALS GALLERY — "Stories Held in Trust"
          Each testimony lives in its own viewport-tall room, separated by
          warm blush bridges so colour never collides head-on (per brand rule:
          cream → blush → teal, never direct).
         ─────────────────────────────────────────────────────────────────── */}

      {/* Bridge: hero (cream) → Card 1 (teal) — h-48 for the largest shift */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-48 w-full bg-gradient-to-b from-brand-cream via-brand-blush to-brand-teal"
      />

      {galleryTestimonials.map((tst, i) => {
        const recipe = cardRecipes[i] ?? cardRecipes[0];
        const next = cardRecipes[i + 1];

        // Choose the bridge after this card (none after the last).
        let bridgeAfter: React.ReactNode = null;
        if (next) {
          // teal → cream OR cream → teal — always via blush, h-32.
          const fromTo =
            recipe.theme === "teal" && next.theme === "cream"
              ? "from-brand-teal via-brand-blush to-brand-cream"
              : recipe.theme === "cream" && next.theme === "teal"
              ? "from-brand-cream via-brand-blush to-brand-teal"
              : recipe.theme === "teal"
              ? "from-brand-teal to-brand-teal"
              : "from-brand-cream to-brand-cream";
          bridgeAfter = (
            <div
              aria-hidden="true"
              className={`pointer-events-none h-32 w-full bg-gradient-to-b ${fromTo}`}
            />
          );
        }

        return (
          <React.Fragment key={`testimonial-${i}`}>
            <TestimonialCard
              quote={tst.quote}
              attribution={tst.attribution}
              theme={recipe.theme}
              Botanical={recipe.Botanical}
              corner={recipe.corner}
              isAr={isAr}
              reduceMotion={reduceMotion}
            />
            {bridgeAfter}
          </React.Fragment>
        );
      })}

      {/* Bridge: last card (cream) → Case Studies (cream) — none needed,
          colours match. We omit the bridge to avoid a redundant band.       */}

      {/* ── Case Studies ── */}
      <section className="bg-brand-cream pt-6 pb-8">
        <div className="section-container">
          <Reveal className="text-center mb-14">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">
              {t("proofPage.inDepthEyebrow")}
            </p>
            <h2 className="font-display font-light text-brand-dark">
              {t("proofPage.inDepthHeading")}
            </h2>
            <div className="brand-divider" />
          </Reveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {caseStudies.map((cs) => (
              <motion.div
                key={cs.number}
                variants={staggerChild}
                className="bg-white rounded-3xl p-10 border border-[#ede8de]"
                style={{ boxShadow: "0 4px 24px rgba(3,90,96,0.05)" }}
              >
                <p className="text-brand-teal text-[10px] tracking-[0.2em] uppercase font-medium mb-3">
                  {t("proofPage.caseStudyLabel")} {cs.number}
                </p>
                <h3 className="font-display text-2xl text-brand-dark mb-3">{cs.title}</h3>
                <p className="text-brand-dark/55 text-sm leading-relaxed mb-6">{cs.body}</p>
                <div className="flex gap-2 flex-wrap">
                  {cs.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-brand-teal text-xs font-medium border border-brand-teal/15 bg-brand-teal/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>

      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-10">
          <h2 className="font-display font-light text-3xl mb-3">{t("proofPage.ctaHeading")}</h2>
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
