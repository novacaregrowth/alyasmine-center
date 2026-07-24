"use client";

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { MashrabiyaCanvas } from "@/components/ui/mashrabiya-canvas";
import { WaveDivider } from "@/components/ui/dividers";
import { motion, useInView, useScroll, useTransform, useReducedMotion, AnimatePresence, type MotionValue } from "framer-motion";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getTranslator, type Locale } from "@/lib/i18n";
import { services, orderedServices } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useLocale(): Locale {
  const params = useParams();
  return (params?.lang as Locale) || "en";
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const sectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const pathwayStaggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const pathwayStep = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ctaStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const ctaItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Section Wrapper ─────────────────────────────────────────────────────────

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionAnim}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Jasmine SVG Mark — used as a connector node + sticky-rail ornament ────

function JasmineMark({
  className,
  size = 28,
  petalFill = "#FDF0EC",
  stroke = "#ECA200",
  strokeOpacity = 0.6,
  centerFill = "#ECA200",
}: {
  className?: string;
  size?: number;
  petalFill?: string;
  stroke?: string;
  strokeOpacity?: number;
  centerFill?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(50 50)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-20"
            rx="9"
            ry="16"
            transform={`rotate(${rot})`}
            fill={petalFill}
            stroke={stroke}
            strokeOpacity={strokeOpacity}
            strokeWidth="1"
          />
        ))}
        <circle cx="0" cy="0" r="5" fill={centerFill} fillOpacity={0.85} />
      </g>
    </svg>
  );
}

// Per-service accent palette for the editorial offerings section
type OfferingAccent = {
  ring: string;       // border / ring color
  text: string;       // accent text color
  bg: string;         // soft tint background
  rule: string;       // hex for inline gradients/svg
  badge: string;      // badge color class
};

const offeringAccents: Record<string, OfferingAccent> = {
  "smart-memory":  { ring: "ring-brand-gold/30",       text: "text-brand-gold",       bg: "bg-brand-gold/[0.05]",       rule: "#ECA200", badge: "bg-brand-gold text-brand-dark" },
  "majlis-fatayat": { ring: "ring-brand-blush/40",     text: "text-brand-dark/70",    bg: "bg-brand-blush/[0.18]",      rule: "#F2C4B5", badge: "bg-brand-gold text-brand-dark" },
  "majlis-aliya": { ring: "ring-brand-blush/40",      text: "text-brand-dark/70",    bg: "bg-brand-blush/[0.18]",      rule: "#F2C4B5", badge: "bg-brand-gold text-brand-dark" },
  consultation:   { ring: "ring-brand-teal/25",       text: "text-brand-teal",       bg: "bg-brand-teal/[0.04]",       rule: "#035A60", badge: "bg-brand-teal text-brand-cream" },
  "cbt-sessions": { ring: "ring-brand-teal-light/35", text: "text-brand-teal-light", bg: "bg-brand-teal-light/[0.07]", rule: "#7FB0B4", badge: "bg-brand-teal-light text-brand-dark" },
  prewedding:     { ring: "ring-brand-blush/40",      text: "text-brand-dark/70",    bg: "bg-brand-blush/[0.18]",      rule: "#F2C4B5", badge: "bg-brand-blush text-brand-dark" },
  adolescent:     { ring: "ring-brand-teal/20",       text: "text-brand-teal",       bg: "bg-brand-teal/[0.05]",       rule: "#035A60", badge: "bg-brand-teal text-brand-cream" },
  "red-eye":      { ring: "ring-brand-gold/25",       text: "text-brand-gold",       bg: "bg-brand-gold/[0.06]",       rule: "#ECA200", badge: "bg-brand-gold text-brand-dark" },
  corporate:      { ring: "ring-brand-teal/25",       text: "text-brand-teal",       bg: "bg-brand-teal/[0.05]",       rule: "#035A60", badge: "bg-brand-teal text-brand-cream" },
};

// Convert a 1-based index into Arabic-Indic numerals (01, 02, …)
const toArabicNumeral = (n: number): string => {
  const map: Record<string, string> = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9" };
  return String(n).padStart(2, "0").split("").map((d) => map[d] ?? d).join("");
};

// ─── Timeline accent colors per service ─────────────────────────────────────

const timelineAccents: Record<string, { dot: string; line: string; bg: string }> = {
  consultation:   { dot: "bg-brand-gold",       line: "from-brand-gold/40 via-brand-gold to-brand-gold/40", bg: "bg-brand-gold/[0.06]" },
  "cbt-sessions": { dot: "bg-brand-teal",       line: "from-brand-teal/40 via-brand-teal to-brand-teal/40", bg: "bg-brand-teal/[0.06]" },
  prewedding:     { dot: "bg-brand-blush",       line: "from-brand-blush/60 via-brand-blush to-brand-blush/60", bg: "bg-brand-blush/[0.08]" },
  adolescent:     { dot: "bg-brand-teal-light", line: "from-brand-teal-light/40 via-brand-teal-light to-brand-teal-light/40", bg: "bg-brand-teal-light/[0.06]" },
  "red-eye":      { dot: "bg-brand-gold",       line: "from-brand-gold/40 via-brand-gold to-brand-gold/40", bg: "bg-brand-gold/[0.06]" },
  "smart-memory": { dot: "bg-brand-teal",       line: "from-brand-teal/40 via-brand-teal to-brand-teal/40", bg: "bg-brand-teal/[0.06]" },
  "majlis-fatayat": { dot: "bg-brand-blush",    line: "from-brand-blush/60 via-brand-blush to-brand-blush/60", bg: "bg-brand-blush/[0.08]" },
  "majlis-aliya": { dot: "bg-brand-blush",      line: "from-brand-blush/60 via-brand-blush to-brand-blush/60", bg: "bg-brand-blush/[0.08]" },
  corporate:      { dot: "bg-brand-teal",       line: "from-brand-teal/40 via-brand-teal to-brand-teal/40", bg: "bg-brand-teal/[0.06]" },
};

// ─── Beat Motif — per-index rotation/scale for fallback motif ────────────────

function getBeatMotif(index: number): { rotation: number; scale: number } {
  return {
    rotation: (index * 24) % 360,
    scale: 1 + (index % 3) * 0.08,
  };
}

// ─── BeatImage — service photo with a branded motif fallback ────────────────
// Renders the service photo (next/image, object-cover, fixed aspect ratio).
// When a photo is missing or fails to load (e.g. a service still awaiting its
// final image), it gracefully falls back to an intentional branded panel:
// soft blush/cream gradient + a centered JasmineMark whose rotation/scale vary
// per index so beats feel related, not identical.

function BeatImage({
  ringClass,
  accentHex,
  index,
  alt,
  src,
  badge,
  badgeClass,
  parallaxY,
  prefersReducedMotion,
  objectPosition,
}: {
  ringClass: string;
  accentHex: string;
  index: number;
  alt: string;
  src?: string | null;
  badge?: string | null;
  badgeClass?: string;
  parallaxY: MotionValue<number>;
  prefersReducedMotion: boolean;
  objectPosition?: string;
}) {
  const { rotation, scale } = getBeatMotif(index);
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = Boolean(src) && !imgFailed;

  return (
    <div
      role={showPhoto ? undefined : "img"}
      aria-label={showPhoto ? undefined : alt}
      className={`relative aspect-[4/3] overflow-hidden ring-1 ${ringClass} bg-gradient-to-br from-brand-blush/40 via-brand-cream to-brand-blush/20 rounded-none lg:rounded-3xl lg:ring-white/60 lg:shadow-[0_30px_80px_-30px_rgba(3,90,96,0.35)]`}
    >
      {showPhoto ? (
        // Photo — fills the rounded container, transform-only parallax. The
        // small scale buffer keeps the parallax translate from revealing edges.
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { y: parallaxY, scale: 1.12 }}
        >
          <Image
            src={src as string}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            style={objectPosition ? { objectPosition } : undefined}
            onError={() => setImgFailed(true)}
          />
        </motion.div>
      ) : (
        // Fallback — branded jasmine motif panel
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={prefersReducedMotion ? undefined : { y: parallaxY }}
        >
          <motion.div
            style={{ rotate: rotation, scale }}
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <JasmineMark
              size={130}
              stroke={accentHex}
              strokeOpacity={0.45}
              centerFill={accentHex}
              petalFill="#FDF0EC"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Soft accent tint — unifies photos and fallbacks under one brand wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          background: `linear-gradient(135deg, ${accentHex}11 0%, transparent 60%, ${accentHex}0D 100%)`,
        }}
      />

      {/* Thin gold inset hairline — the "frame" of the desktop photo bubble */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-2 rounded-[20px] ring-1 ring-brand-gold/30 pointer-events-none"
      />

      {/* Badge — logical-positioned (top-start) so it flips correctly in RTL */}
      {badge && (
        <span
          className={`absolute top-3 start-3 z-10 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm ${
            badgeClass ?? "bg-brand-gold text-brand-dark"
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

// ─── Spine — scroll-drawn central line (desktop only) ────────────────────────
// Uses scaleY of a w-px div (transform-only, GPU composited) instead of SVG
// pathLength to comply with the transform/opacity-only constraint.

function Spine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none"
    >
      <motion.div
        className="w-px h-full bg-brand-gold/40 origin-top"
        style={{ scaleY: progress }}
      />
    </div>
  );
}

// ─── BeatList — wraps the spine + alternating ServiceBeats ───────────────────

function BeatList({
  items,
  lang,
  t,
  onOpen,
}: {
  items: ReadonlyArray<(typeof services)[number]>;
  lang: Locale;
  t: (key: string) => string;
  onOpen: (id: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.2"],
  });

  return (
    <div ref={listRef} className="relative max-w-5xl mx-auto mt-12 md:mt-16">
      <Spine progress={scrollYProgress} />
      <ul className="relative space-y-20 md:space-y-32">
        {items.map((service, i) => (
          <li key={service.id}>
            <ServiceBeat
              service={service}
              index={i}
              isFeatured={i === 0}
              lang={lang}
              t={t}
              onOpen={() => onOpen(service.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── ServiceBeat — single cinematic beat card ────────────────────────────────

const metaStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const metaItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function ServiceBeat({
  service,
  index,
  isFeatured,
  lang,
  t,
  onOpen,
}: {
  service: (typeof services)[number];
  index: number;
  isFeatured: boolean;
  lang: Locale;
  t: (key: string) => string;
  onOpen: () => void;
}) {
  const isAr = lang === "ar";
  const accent = offeringAccents[service.id] ?? offeringAccents.consultation;
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Detect desktop so clipPath reveal only fires where the alternating layout applies
  const [isDesktop, setIsDesktop] = useState(false);
  useLayoutEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 0-indexed: even index (0, 2, 4) anchors to inline-start
  const anchorStart = index % 2 === 0;
  // Physical position (used by physical-direction props: clipPath, left/right, transformOrigin)
  const cardOnLeft = anchorStart !== isAr;

  const numeral = isAr
    ? toArabicNumeral(index + 1)
    : String(index + 1).padStart(2, "0");

  // Scroll-linked parallax for the motif panel
  const beatRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: beatRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // ClipPath unveil — direction depends on which physical side the card sits on
  const clipHidden = cardOnLeft
    ? "inset(0% 100% 0% 0%)"
    : "inset(0% 0% 0% 100%)";
  const clipVisible = "inset(0% 0% 0% 0%)";

  // On mobile (non-desktop): simple opacity+y fade — clipPath horizontal reveal is
  // a desktop-only effect (alternating anchoring doesn't apply on full-width stacked cards)
  const cardInitial =
    prefersReducedMotion || !isDesktop
      ? { opacity: 0, y: 16 }
      : { opacity: 0, clipPath: clipHidden };
  const cardWhileInView =
    prefersReducedMotion || !isDesktop
      ? { opacity: 1, y: 0 }
      : { opacity: 1, clipPath: clipVisible };

  // Sensory line — only red-eye has this in config
  const sensory =
    "sensoryLine" in service
      ? isAr
        ? (service as { sensoryLineAr?: string }).sensoryLineAr
        : (service as { sensoryLine?: string }).sensoryLine
      : undefined;

  const mainTitle = isAr ? service.titleAr : service.title;
  const subTitle = isAr ? service.title : service.titleAr;

  // Optional per-service offering label (overrides the generic "Offerings" eyebrow)
  const offeringLabel =
    "offeringLabel" in service
      ? isAr
        ? (service as { offeringLabelAr?: string }).offeringLabelAr
        : (service as { offeringLabel?: string }).offeringLabel
      : undefined;

  return (
    <div ref={beatRef} className="relative w-full min-h-[420px] lg:min-h-[560px]">
      {/* Ghosted numeral — opposite side, desktop only */}
      <div
        aria-hidden="true"
        className={`hidden md:block pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-display font-light leading-none text-brand-teal/[0.05] ${
          cardOnLeft ? "right-0" : "left-0"
        }`}
        style={{ fontSize: "clamp(7rem, 14vw, 15rem)" }}
      >
        {numeral}
      </div>

      {/* Beat mark — gold diamond pinned to spine at card vertical center */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-brand-gold rounded-[2px] shadow-[0_0_0_4px_rgba(246,242,233,1)] z-[1]"
        initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
        whileInView={
          prefersReducedMotion ? { opacity: 1 } : { scale: [0, 1.15, 1], opacity: 1 }
        }
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: prefersReducedMotion ? 0.6 : 0.7,
          ease: [0.19, 1, 0.22, 1],
        }}
      />

      {/* Connector — from spine outward to card edge */}
      <motion.div
        aria-hidden="true"
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-10 bg-brand-gold/30 ${
          cardOnLeft ? "right-1/2 mr-1.5" : "left-1/2 ml-1.5"
        }`}
        style={{ transformOrigin: cardOnLeft ? "right center" : "left center" }}
        initial={
          prefersReducedMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }
        }
        whileInView={
          prefersReducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }
        }
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
      />

      {/* Card — full-width row: unified card on mobile, split editorial on desktop */}
      <motion.article
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={mainTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="relative cursor-pointer group w-full"
        initial={cardInitial}
        whileInView={cardWhileInView}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center bg-white/85 backdrop-blur-sm rounded-3xl ring-1 ${accent.ring} shadow-[0_18px_60px_-25px_rgba(3,90,96,0.25)] overflow-hidden lg:bg-transparent lg:backdrop-blur-0 lg:ring-0 lg:shadow-none lg:rounded-none lg:overflow-visible`}
        >
          {/* Photo column — full-bleed top on mobile, framed bubble on desktop */}
          <div className={cardOnLeft ? "lg:order-1" : "lg:order-2"}>
            <BeatImage
              ringClass={accent.ring}
              accentHex={accent.rule}
              index={index}
              alt={mainTitle}
              src={service.image}
              badge={
                "badge" in service
                  ? isAr
                    ? (service as { badgeAr?: string }).badgeAr
                    : (service as { badge?: string }).badge
                  : null
              }
              badgeClass={accent.badge}
              parallaxY={parallaxY}
              prefersReducedMotion={prefersReducedMotion}
              objectPosition={
                service.id === "corporate" || service.id === "majlis-fatayat"
                  ? "left center"
                  : undefined
              }
            />
          </div>

          {/* Text column — continues the card on mobile, own card on desktop */}
          <div
            className={`p-6 lg:p-8 flex flex-col gap-4 ${
              cardOnLeft ? "lg:order-2" : "lg:order-1"
            } lg:bg-white/85 lg:backdrop-blur-sm lg:ring-1 ${accent.ring} lg:rounded-3xl lg:shadow-[0_18px_60px_-25px_rgba(3,90,96,0.25)]`}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brand-gold" aria-hidden="true" />
              <span
                className={`text-[10px] tracking-[0.25em] uppercase font-medium ${accent.text}`}
              >
                {numeral}
                {isFeatured
                  ? ` · ${t("servicesPage.mostPopular")}`
                  : ` · ${offeringLabel ?? t("servicesPage.offeringsEyebrow")}`}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3
                className="font-display font-light text-brand-teal text-balance text-3xl lg:text-[2.25rem]"
                style={{ lineHeight: isAr ? 1.35 : 1.2 }}
              >
                {mainTitle}
              </h3>
              <p
                className="font-display text-brand-teal-light/80 text-sm lg:text-base"
                style={{
                  lineHeight: isAr ? 1.6 : 1.8,
                  direction: isAr ? "ltr" : "rtl",
                }}
              >
                {subTitle}
              </p>
            </div>

            {sensory && (
              <p
                className="font-display italic text-brand-dark/55 text-sm lg:text-[0.95rem] leading-relaxed"
                dir={isAr ? "rtl" : "ltr"}
              >
                {sensory}
              </p>
            )}

            <p className="text-brand-dark/65 text-[0.95rem] leading-relaxed text-pretty">
              {isAr ? service.descriptionAr : service.description}
            </p>

            <motion.div
              className="flex flex-wrap items-center gap-2 mt-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={metaStagger}
            >
              <motion.span
                variants={metaItem}
                className={`px-3 py-1.5 rounded-full ${accent.bg} ${accent.text} text-[11px] font-medium tracking-wide`}
              >
                {isAr ? service.durationAr : service.duration}
              </motion.span>
              <motion.span
                variants={metaItem}
                className="px-3 py-1.5 rounded-full bg-brand-cream text-brand-dark/55 text-[11px]"
              >
                {isAr ? service.formatAr : service.format}
              </motion.span>
              {service.price ? (
                <motion.span
                  variants={metaItem}
                  className="px-3 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[11px] font-semibold tracking-wide ms-auto"
                >
                  {formatPrice(service.price)}
                </motion.span>
              ) : (
                <motion.span
                  variants={metaItem}
                  className="px-3 py-1.5 rounded-full bg-brand-cream text-brand-teal/70 text-[11px] font-medium tracking-wide ms-auto"
                >
                  {isAr ? "تواصلي معنا" : "Contact us"}
                </motion.span>
              )}
            </motion.div>

            <div className="flex items-center justify-between gap-4 pt-5 mt-2 border-t border-brand-cream">
              <span className="text-brand-dark/40 text-[10px] tracking-[0.2em] uppercase">
                {t("servicesPage.learnMore")}
              </span>
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${accent.bg} ring-1 ${accent.ring}`}
              >
                <ChevronRight
                  className={`w-4 h-4 ${accent.text} rtl:rotate-180`}
                />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// ─── Service Timeline Component ─────────────────────────────────────────────

function ServiceTimeline({
  service,
  lang,
  isOpen,
  onToggle,
  t,
}: {
  service: (typeof services)[number];
  lang: Locale;
  isOpen: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}) {
  const accent = timelineAccents[service.id] || timelineAccents.consultation;
  const isAr = lang === "ar";
  const items = service.timeline;
  const includesList = isAr ? service.includesAr : service.includes;
  const durationLabel = isAr ? service.durationAr : service.duration;
  const formatLabel = isAr ? service.formatAr : service.format;
  const note = isAr ? service.priceNoteAr : service.priceNote;
  const suitableFor =
    isAr && "suitableForAr" in service
      ? (service as { suitableForAr?: readonly string[] }).suitableForAr
      : undefined;
  const bookLabel =
    "bookLabel" in service
      ? isAr
        ? (service as { bookLabelAr?: string }).bookLabelAr
        : (service as { bookLabel?: string }).bookLabel
      : undefined;

  return (
    <div id={service.id} className="scroll-mt-24">
      <motion.button
        type="button"
        onClick={onToggle}
        className="w-full text-start group transition-[opacity,transform] duration-300 hover:opacity-95"
      >
        <div
          className={`flex items-center gap-5 py-8 px-6 lg:px-10 rounded-3xl transition-all duration-300 ${
            isOpen
              ? "bg-white/85 backdrop-blur-sm shadow-md border border-brand-teal/5"
              : "hover:bg-white/50 hover:shadow-sm border border-transparent"
          }`}
          dir={isAr ? "rtl" : "ltr"}
        >
          <span className="text-3xl shrink-0 transition-transform duration-300 group-hover:scale-105">
            {service.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-extrabold text-brand-teal text-xl lg:text-2xl mb-1 truncate">
              {isAr ? service.titleAr : service.title}
            </h3>
            <p className="text-brand-dark/50 text-sm truncate">
              {isAr ? service.descriptionAr : service.description}
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {service.price && (
              <span className="hidden sm:block text-brand-teal font-semibold text-sm">
                {formatPrice(service.price)}
              </span>
            )}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full border border-brand-teal/20 flex items-center justify-center bg-white/50"
            >
              <ChevronDown className="w-4 h-4 text-brand-teal/60" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-12 px-6 lg:px-10" dir={isAr ? "rtl" : "ltr"}>
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-1.5 rounded-full bg-brand-cream text-brand-teal text-xs font-medium">
                  {durationLabel}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-brand-cream text-brand-dark/60 text-xs">
                  {formatLabel}
                </span>
                {service.price && (
                  <span className="px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold">
                    {formatPrice(service.price)}
                  </span>
                )}
              </div>

              {service.id === "majlis-aliya" && (
                <div className="mb-10 overflow-hidden rounded-2xl ring-1 ring-brand-teal/10 shadow-md bg-black/5">
                  <video
                    src="/services/majlis-aliya-video.mp4#t=0.1"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={isAr ? service.titleAr : service.title}
                    className="block w-full h-auto"
                  />
                </div>
              )}

              <div className="relative ps-10">
                <div
                  className={`absolute top-0 bottom-0 w-px start-3 bg-gradient-to-b ${accent.line}`}
                />

                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative mb-8 last:mb-0"
                  >
                    <div
                      className={`absolute top-1.5 w-[22px] h-[22px] rounded-full border-[3px] border-white ${accent.dot} shadow-sm start-3 -translate-x-1/2 rtl:translate-x-1/2`}
                    />

                    <div className={`${accent.bg} rounded-2xl p-5 ms-4`}>
                      <div className="flex items-start gap-3">
                        <span className="text-brand-teal/30 font-display text-sm font-semibold mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-brand-dark/80 text-sm leading-relaxed">
                          {isAr ? item.ar : item.en}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {includesList.length > 0 && (
                <div className="mt-10 pt-8 border-t border-brand-cream">
                  <p className="text-brand-teal text-base tracking-[0.2em] uppercase font-medium mb-4">
                    {t("servicesPage.whatsIncluded")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {includesList.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${accent.dot} shrink-0`} />
                        <span className="text-brand-dark/60 text-sm">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {suitableFor && suitableFor.length > 0 && (
                <div className="mt-10 pt-8 border-t border-brand-cream" dir="rtl">
                  <p className="text-brand-teal text-base font-medium mb-4">
                    مجلس علياء مناسب لكِ إذا كنتِ ترغبين في:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suitableFor.map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${accent.dot} shrink-0`} />
                        <span className="text-brand-dark/60 text-sm">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/booking`}
                  className="inline-block px-8 py-3.5 bg-brand-teal text-brand-cream rounded-full text-xs tracking-[0.12em] uppercase font-medium hover:bg-brand-teal/90 transition-opacity duration-300 hover:opacity-95"
                >
                  {bookLabel ?? t("servicesPage.bookNow")}
                </Link>
                {note && (
                  <p className="text-brand-dark/40 text-xs italic max-w-md leading-relaxed">
                    {note}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ServicesPage() {
  const lang = useLocale();
  const t = getTranslator(lang);
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenServiceId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && services.some((s) => s.id === hash)) {
      setOpenServiceId(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const pathwaySectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pathwayProgress } = useScroll({
    target: pathwaySectionRef,
    offset: ["start 0.6", "end 0.8"],
  });
  const lineScale = useTransform(pathwayProgress, [0, 1], [0, 1]);

  const pathwayLineRef = useRef<HTMLDivElement>(null);
  const pathwayLineInView = useInView(pathwayLineRef, {
    once: true,
    margin: "-40px",
  });

  const ctaLineRef = useRef<HTMLDivElement>(null);
  const ctaLineInView = useInView(ctaLineRef, { once: true, margin: "-40px" });

  const openServiceById = useCallback((id: string) => {
    setOpenServiceId(id);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }, []);

  const pathwaySteps = [
    {
      num: lang === "ar" ? "1" : "1",
      title: t("servicesPage.pathwayStep1Title"),
      desc: t("servicesPage.pathwayStep1Body"),
      glowClass: "bg-brand-blush/10",
    },
    {
      num: lang === "ar" ? "2" : "2",
      title: t("servicesPage.pathwayStep2Title"),
      desc: t("servicesPage.pathwayStep2Body"),
      glowClass: "bg-brand-cream/[0.06]",
    },
    {
      num: lang === "ar" ? "3" : "3",
      title: t("servicesPage.pathwayStep3Title"),
      desc: t("servicesPage.pathwayStep3Body"),
      glowClass: "bg-brand-gold/[0.06]",
    },
  ];

  return (
    <div>

      {/* ── Hero (keep layout + mashrabiya — copy is locale-only) ─────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated mashrabiya background */}
        <MashrabiyaCanvas className="absolute inset-0 z-0" />

        {/* Content — centered composition */}
        <div className="relative z-10 text-center px-6 py-40 w-full max-w-5xl mx-auto">

          {/* Gold thread — the curtain pull */}
          <motion.div
            className="w-0.5 h-16 bg-brand-gold mx-auto mb-10"
            style={{ boxShadow: "0 0 16px rgba(236,162,0,0.25)" }}
            initial={{ scaleY: 0, transformOrigin: "top center" }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          />

          <div className="flex flex-col items-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="text-brand-gold tracking-[0.3em] text-xs uppercase mb-10"
            >
              {t("servicesPage.heroEyebrow")}
            </motion.p>

            <motion.h1
              className="font-display font-extrabold text-brand-teal"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: lang === "ar" ? 1.25 : 0.9,
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true }}
            >
              {t("servicesPage.heroTitle")}
            </motion.h1>

            <motion.div
              className="w-20 h-px my-10 animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            />

            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[t("servicesPage.pill1"), t("servicesPage.pill2"), t("servicesPage.pill3")].map(
                (label) => (
                <motion.span
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                    },
                  }}
                  className="border border-brand-teal/20 text-brand-teal/70 text-xs px-4 py-2 rounded-full backdrop-blur-sm bg-brand-cream/70 transition-shadow duration-300 hover:shadow-md"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            <Reveal direction="up" delay={0.85} className="mt-8">
              <p
                className="text-brand-dark/50 text-sm leading-relaxed max-w-md mx-auto text-pretty"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {t("servicesPage.heroBody")}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
          animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-5 bg-gradient-to-b from-transparent to-brand-teal-light" />
          <ChevronDown className="w-3 h-3 text-brand-teal-light opacity-50" />
        </motion.div>
      </section>

      {/* ── Gradient Bridge — Cream → Blush ─────────────────────────────── */}
      <div className="h-48 bg-gradient-to-b from-brand-cream to-[#FDCCBE33] pointer-events-none" />

      {/* ── The Atelier — Cinematic Beat Sequence ───────────────────────── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-brand-cream via-[#FBF6EB] to-brand-blush/30">
        {/* Faint Islamic octagram lattice — kept for depth */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full text-brand-teal opacity-[0.07]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="offerings-octagram" patternUnits="userSpaceOnUse" width="120" height="120">
              <g fill="none" stroke="currentColor" strokeWidth="0.6">
                <rect x="24" y="24" width="72" height="72" />
                <rect x="24" y="24" width="72" height="72" transform="rotate(45 60 60)" />
                <circle cx="60" cy="60" r="2" fill="currentColor" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#offerings-octagram)" />
        </svg>

        <div className="section-container relative py-16 md:py-20 lg:py-24">
          {/* Section header — centered, refined */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {lang !== "ar" && (
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  className="h-px w-10 bg-brand-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                />
                <p className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-medium">
                  {t("servicesPage.offeringsEyebrow")}
                </p>
                <motion.div
                  className="h-px w-10 bg-brand-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                />
              </div>
            )}
            <h2
              className="font-display font-extrabold text-brand-teal text-balance leading-[1.1]"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
            >
              {t("servicesPage.offeringsHeading")}
            </h2>
            <div className="mt-8 flex justify-center">
              <JasmineMark size={32} />
            </div>
          </motion.div>

          {/* The beat sequence — spine + alternating cards */}
          <BeatList
            items={orderedServices}
            lang={lang}
            t={t}
            onOpen={openServiceById}
          />
        </div>
      </Section>

      {/* ── Section Transition — Blush → Cream ──────────────────────────── */}
      <WaveDivider from="#FDCCBE40" to="#F6F2E9" />

      <Section className="relative bg-brand-cream/90 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blush/50 to-transparent"
          aria-hidden
        />
        <div className="section-container py-20 md:py-24">
          <Reveal className="text-center mb-12 md:mb-16">
            <p className="text-brand-gold text-base tracking-[0.2em] uppercase mb-4">
              {t("servicesPage.journeyDetailEyebrow")}
            </p>
            <h2
              className="font-display font-extrabold text-brand-teal mb-4 text-balance"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {t("servicesPage.journeyDetailHeading")}
            </h2>
            <p
              className="text-brand-dark/50 text-sm max-w-md mx-auto leading-relaxed text-pretty"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("servicesPage.journeyDetailBody")}
            </p>
            <div className="w-16 h-px bg-brand-gold/40 mx-auto mt-8" />
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {orderedServices.map((service) => (
              <ServiceTimeline
                key={service.id}
                service={service}
                lang={lang}
                isOpen={openServiceId === service.id}
                onToggle={() => handleToggle(service.id)}
                t={t}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Gradient Bridge — Blush → Cream ─────────────────────────────── */}
      <div className="h-48 bg-gradient-to-b from-[#FDCCBE33] to-brand-cream pointer-events-none" />

      {/* ── The Exhale — Breathing Moment ────────────────────────────────── */}
      <section className="relative bg-brand-cream min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <motion.div
          className="absolute bottom-[20%] right-[18%] w-32 h-32 bg-brand-blush/[0.08] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-brand-teal/[0.06] pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
          aria-hidden="true"
        >
          {t("servicesPage.exhaleWatermark")}
        </span>

        <Reveal
          className="relative z-10 text-center px-6 py-40 max-w-2xl mx-auto"
          direction="up"
        >
          <p
            className="font-display text-brand-teal leading-snug"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {t("servicesPage.exhaleTitle")}
          </p>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-8" />
        </Reveal>
      </section>

      {/* ── Gradient Bridge — Cream via Blush → Teal ────────────────────── */}
      <div className="h-64 bg-gradient-to-b from-brand-cream via-[#FDCCBE33] to-brand-teal pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* ── The Pathway — Vertical Journey ───────────────────────────────── */}
      <section
        ref={pathwaySectionRef}
        className="bg-brand-teal relative w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,204,190,0.08)_0%,transparent_70%)] pointer-events-none" />

        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] opacity-[0.04] pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <g fill="none" stroke="#ECA200">
            <rect x="36" y="36" width="128" height="128" strokeWidth="0.5" />
            <rect
              x="36"
              y="36"
              width="128"
              height="128"
              strokeWidth="0.5"
              transform="rotate(45 100 100)"
            />
            <circle cx="100" cy="100" r="85" strokeWidth="0.3" />
            <circle cx="100" cy="100" r="55" strokeWidth="0.2" />
          </g>
        </svg>

        <motion.div
          className="absolute top-[15%] left-[10%] w-32 h-32 bg-brand-blush/10 rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-24 h-24 bg-brand-blush/[0.08] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header */}
        <Reveal
          className="relative z-10 text-center px-6 pt-32 pb-16 max-w-3xl mx-auto"
          direction="up"
        >
          <p className="text-brand-gold text-[19px] tracking-[0.3em] mb-8">
            {t("servicesPage.pathwayEyebrow")}
          </p>
          <h2
            className="font-display font-extrabold text-brand-cream mb-10 text-balance"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {t("servicesPage.pathwayHeading")}
          </h2>

          <div ref={pathwayLineRef} className="flex justify-center">
            <motion.div
              className="h-px w-32 animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
                transformOrigin: "center center",
              }}
              initial={{ scaleX: 0 }}
              animate={pathwayLineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            />
          </div>
        </Reveal>

        <div className="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
          <div className="relative lg:ps-0">
            <motion.div
              className="absolute start-7 top-0 w-px h-full origin-top lg:start-1/2 lg:-translate-x-1/2"
              style={{
                scaleY: lineScale,
                backgroundImage:
                  "linear-gradient(to bottom, #ECA200, #ECA200 80%, transparent)",
              }}
            />

            <motion.div
              variants={pathwayStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {pathwaySteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    variants={pathwayStep}
                    className="relative mb-16 last:mb-0 flex items-start gap-5 lg:block"
                  >
                    <div className="relative shrink-0 w-14 h-14 rounded-full border-2 border-brand-gold/30 bg-brand-teal flex items-center justify-center z-10 shadow-md lg:absolute lg:start-1/2 lg:top-0 lg:-translate-x-1/2">
                      <span className="font-display text-2xl text-brand-cream">{step.num}</span>
                    </div>

                    <div
                      className={`relative pt-1 flex-1 min-w-0 lg:flex-none ${
                        isLeft
                          ? "lg:w-[42%] lg:me-auto lg:text-end lg:pe-20"
                          : "lg:w-[42%] lg:ms-auto lg:text-start lg:ps-20"
                      }`}
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 ${step.glowClass} rounded-full blur-[60px] pointer-events-none`}
                      />

                      <h3
                        className="font-display font-extrabold text-brand-cream mb-3 relative"
                        style={{
                          fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        }}
                        dir={lang === "ar" ? "rtl" : "ltr"}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-brand-cream/60 text-sm leading-relaxed max-w-sm relative lg:max-w-none text-pretty"
                        dir={lang === "ar" ? "rtl" : "ltr"}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA — The First Bloom ────────────────────────────────────────── */}
      <section className="bg-brand-teal text-brand-cream relative overflow-hidden min-h-[70vh] flex items-center justify-center pb-20 lg:pb-0">
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,204,190,0.10)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(236,162,0,0.06)_0%,transparent_50%)] pointer-events-none" />

        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[480px] md:h-[480px] opacity-[0.03] pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <g fill="none" stroke="#ECA200">
            <circle cx="100" cy="100" r="90" strokeWidth="0.3" />
            <polygon
              points="100,15 155,45 185,100 155,155 100,185 45,155 15,100 45,45"
              strokeWidth="0.4"
            />
            <circle cx="100" cy="100" r="50" strokeWidth="0.2" />
          </g>
        </svg>

        {/* Jasmine petal motif */}
        <svg
          className="absolute top-[15%] right-[10%] w-[200px] h-[200px] md:w-[280px] md:h-[280px] opacity-[0.03] pointer-events-none"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <g fill="none" stroke="#ECA200">
            <path
              d="M50,10 C65,30 65,50 50,80 C35,50 35,30 50,10Z"
              strokeWidth="0.4"
            />
            <path
              d="M50,10 C65,30 65,50 50,80 C35,50 35,30 50,10Z"
              strokeWidth="0.4"
              transform="rotate(120 50 50)"
            />
            <path
              d="M50,10 C65,30 65,50 50,80 C35,50 35,30 50,10Z"
              strokeWidth="0.4"
              transform="rotate(240 50 50)"
            />
          </g>
        </svg>

        <motion.div
          className="absolute top-[25%] right-[18%] w-28 h-28 bg-brand-blush/[0.08] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, -18, 0], x: [0, -6, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[12%] w-20 h-20 bg-brand-gold/[0.05] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center max-w-lg mx-auto px-6 py-20">
          <div ref={ctaLineRef} className="flex justify-center mb-10">
            <motion.div
              className="w-px h-24 bg-gradient-to-b from-brand-gold/0 via-brand-gold to-brand-gold/0"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={
                ctaLineInView
                  ? { scaleY: 1, opacity: 1 }
                  : { scaleY: 0, opacity: 0 }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top center" }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate={ctaLineInView ? "visible" : "hidden"}
            variants={ctaStagger}
            className="flex flex-col items-center"
          >
            <motion.p
              variants={ctaItem}
              className="font-display text-brand-cream/90 tracking-[0.05em] mb-10"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
              }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("servicesPage.ctaBloomLine")}
            </motion.p>

            <motion.div
              variants={ctaItem}
              className="w-16 h-px animate-shimmer mb-10"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
            />

            <motion.h2
              variants={ctaItem}
              className="font-display font-extrabold text-brand-cream mb-6 text-balance"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("servicesPage.ctaReadyHeading")}
            </motion.h2>

            <motion.p
              variants={ctaItem}
              className="text-sm text-brand-cream/40 max-w-sm mb-10 leading-relaxed text-pretty"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("servicesPage.ctaReadyBody")}
            </motion.p>

            <motion.div variants={ctaItem} className="relative mb-12">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-brand-blush/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Link
                href={`/${lang}/booking`}
                className="relative inline-block px-10 py-5 bg-brand-gold text-brand-dark rounded-full text-xs tracking-[0.15em] uppercase font-semibold hover:bg-brand-gold/90 transition-opacity duration-300 hover:opacity-95"
              >
                {t("servicesPage.ctaBook")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
