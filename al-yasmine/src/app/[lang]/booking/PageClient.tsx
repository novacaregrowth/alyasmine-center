"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { JasmineBloom } from "@/components/ui/jasmine-bloom";
import { siteConfig } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => (
  <div className="border-b border-white/10">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-6 text-left gap-4 cursor-pointer"
      aria-expanded={isOpen}
    >
      <span className="font-display text-lg text-white">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="shrink-0"
      >
        <ChevronDown className="w-5 h-5 text-brand-gold/70" aria-hidden="true" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          className="overflow-hidden"
        >
          <p className="text-white/70 text-sm leading-relaxed pb-6 max-w-2xl">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Bloom Interlude Constants ───────────────────────────────────────────────

const PETAL_RAIN_CONFIGS = [
  { x: 8, size: 20, startY: "-3%", endY: "85%", rotStart: -15, rotEnd: 120, blur: "", opacityMax: 0.6, isBlush: false },
  { x: 15, size: 16, startY: "10%", endY: "95%", rotStart: 30, rotEnd: -90, blur: "blur-[1px]", opacityMax: 0.5, isBlush: true },
  { x: 22, size: 28, startY: "-5%", endY: "110%", rotStart: -45, rotEnd: 135, blur: "", opacityMax: 0.7, isBlush: false },
  { x: 30, size: 14, startY: "15%", endY: "80%", rotStart: 60, rotEnd: -60, blur: "blur-sm", opacityMax: 0.35, isBlush: true },
  { x: 37, size: 24, startY: "5%", endY: "100%", rotStart: -20, rotEnd: 160, blur: "", opacityMax: 0.65, isBlush: false },
  { x: 42, size: 18, startY: "20%", endY: "90%", rotStart: 45, rotEnd: -120, blur: "blur-[1px]", opacityMax: 0.45, isBlush: true },
  { x: 50, size: 30, startY: "-2%", endY: "120%", rotStart: -60, rotEnd: 90, blur: "", opacityMax: 0.55, isBlush: false },
  { x: 56, size: 15, startY: "25%", endY: "75%", rotStart: 20, rotEnd: -150, blur: "blur-sm", opacityMax: 0.3, isBlush: true },
  { x: 63, size: 22, startY: "0%", endY: "105%", rotStart: -35, rotEnd: 145, blur: "", opacityMax: 0.7, isBlush: false },
  { x: 70, size: 26, startY: "8%", endY: "115%", rotStart: 50, rotEnd: -80, blur: "blur-[1px]", opacityMax: 0.5, isBlush: true },
  { x: 75, size: 17, startY: "30%", endY: "70%", rotStart: -10, rotEnd: 170, blur: "", opacityMax: 0.4, isBlush: false },
  { x: 82, size: 32, startY: "-4%", endY: "130%", rotStart: 70, rotEnd: -40, blur: "", opacityMax: 0.75, isBlush: true },
  { x: 88, size: 19, startY: "12%", endY: "88%", rotStart: -55, rotEnd: 110, blur: "blur-[1px]", opacityMax: 0.55, isBlush: false },
  { x: 93, size: 21, startY: "7%", endY: "95%", rotStart: 25, rotEnd: -130, blur: "", opacityMax: 0.6, isBlush: true },
  { x: 5, size: 25, startY: "18%", endY: "100%", rotStart: -40, rotEnd: 100, blur: "blur-sm", opacityMax: 0.35, isBlush: false },
  { x: 47, size: 16, startY: "-1%", endY: "78%", rotStart: 55, rotEnd: -70, blur: "", opacityMax: 0.5, isBlush: true },
  { x: 33, size: 29, startY: "22%", endY: "125%", rotStart: -25, rotEnd: 155, blur: "blur-[1px]", opacityMax: 0.45, isBlush: false },
  { x: 60, size: 14, startY: "3%", endY: "82%", rotStart: 40, rotEnd: -100, blur: "", opacityMax: 0.65, isBlush: true },
  { x: 78, size: 23, startY: "28%", endY: "108%", rotStart: -50, rotEnd: 130, blur: "", opacityMax: 0.4, isBlush: false },
  { x: 18, size: 20, startY: "14%", endY: "92%", rotStart: 15, rotEnd: -160, blur: "", opacityMax: 0.55, isBlush: true },
];

const GOLD_PARTICLE_CONFIGS = [
  { x: 10, top: 35, driftY: -120, isGold: true, floatDuration: 4.5 },
  { x: 20, top: 55, driftY: -90, isGold: true, floatDuration: 5.2 },
  { x: 30, top: 42, driftY: -160, isGold: true, floatDuration: 3.8 },
  { x: 38, top: 65, driftY: -100, isGold: false, floatDuration: 5.8 },
  { x: 48, top: 30, driftY: -140, isGold: true, floatDuration: 4.2 },
  { x: 55, top: 50, driftY: -80, isGold: true, floatDuration: 5.5 },
  { x: 62, top: 40, driftY: -180, isGold: false, floatDuration: 3.5 },
  { x: 72, top: 60, driftY: -110, isGold: true, floatDuration: 6.0 },
  { x: 80, top: 35, driftY: -150, isGold: true, floatDuration: 4.8 },
  { x: 88, top: 70, driftY: -60, isGold: false, floatDuration: 5.3 },
  { x: 45, top: 45, driftY: -170, isGold: true, floatDuration: 3.2 },
  { x: 25, top: 58, driftY: -130, isGold: false, floatDuration: 4.0 },
];

// ─── Bloom Interlude Sub-Components ─────────────────────────────────────────

interface DriftingPetalProps {
  config: (typeof PETAL_RAIN_CONFIGS)[number];
  scrollYProgress: MotionValue<number>;
}

const DriftingPetal = ({ config, scrollYProgress }: DriftingPetalProps) => {
  const y = useTransform(scrollYProgress, [0, 1], [config.startY, config.endY]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [config.rotStart, config.rotEnd]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0, config.opacityMax, config.opacityMax, 0]
  );

  return (
    <motion.div
      className={`absolute pointer-events-none z-[4] ${config.blur}`}
      style={{ left: `${config.x}%`, y, rotate, opacity }}
      aria-hidden="true"
    >
      <svg
        width={config.size}
        height={config.size}
        viewBox="-5 -20 10 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0 C -4 -6, -3 -14, 0 -18 C 3 -14, 4 -6, 0 0 Z"
          fill={config.isBlush ? "#FDCCBE" : "white"}
          fillOpacity={config.isBlush ? 0.7 : 0.9}
          stroke="#ECA200"
          strokeWidth={0.3}
          strokeOpacity={0.4}
        />
      </svg>
    </motion.div>
  );
};

interface GoldParticleProps {
  config: (typeof GOLD_PARTICLE_CONFIGS)[number];
  scrollYProgress: MotionValue<number>;
}

const GoldParticle = ({ config, scrollYProgress }: GoldParticleProps) => {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `${config.driftY}px`]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.8, 0.8, 0]
  );

  return (
    <motion.div
      className="absolute pointer-events-none z-[3]"
      style={{
        left: `${config.x}%`,
        top: `${config.top}%`,
        y,
        opacity,
      }}
      aria-hidden="true"
    >
      <motion.div
        className={
          config.isGold
            ? "w-1.5 h-1.5 rounded-full bg-brand-gold"
            : "w-1 h-1 rounded-full bg-white/60"
        }
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: config.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

interface BookingPageProps {
  lang: Locale;
}

export default function BookingPage({ lang }: BookingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isAr = lang === "ar";

  const interludeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress: interludeProgress } = useScroll({
    target: interludeRef,
    offset: ["start end", "end start"],
  });

  const bloomRotate = useTransform(interludeProgress, [0, 1], ["-8deg", "8deg"]);
  const bloomScale = useTransform(interludeProgress, [0, 0.5, 1], [0.85, 1, 1.05]);
  const glowScale = useTransform(interludeProgress, [0, 0.5, 1], [0.8, 1.2, 1.0]);
  const glowOpacity = useTransform(
    interludeProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.8, 0.8, 0]
  );

  const steps = [
    {
      num: isAr ? "1" : "1",
      title: isAr ? "تواصلي معنا" : "Book Your Session",
      body: isAr
        ? "أرسلي لنا عبر الواتساب وسيساعدك فريق مركز الياسمين في اختيار الموعد والخدمة الأنسب لك"
        : "She picks a time that works for her. At her own pace, on her own terms.",
    },
    {
      num: isAr ? "2" : "2",
      title: isAr ? "جلسة استشارة" : "Meet Alia",
      body: isAr
        ? "لقاء خاص مع أ . علياء البحري لفهم ما تمرين به وتحديد احتياجاتك وأهدافك بكل سرية واهتمام"
        : "A warm, private 30-minute conversation. She listens. She understands. No judgment.",
    },
    {
      num: isAr ? "3" : "3",
      title: isAr ? "ابدئي خطتك العلاجية" : "Begin Your Journey",
      body: isAr
        ? "بعد التقييم نضع معك الخطوة الأنسب سواء كانت جلسات فردية أو برنامجًا علاجيًا يناسب احتياج"
        : "If it feels right, you take the next step together. On your terms, at your pace.",
    },
  ];

  const faqs = [
    {
      q: isAr ? "كيف أبدأ؟" : "How do I get started?",
      a: isAr
        ? "ابدأي بحجز استشارتك الأولى. هي جلسة تقييم مدتها 90 دقيقة تستمع فيها علياء إلى وضعكِ وتبنيان معاً خطة عمل مناسبة. الخطوة الأساسية قبل أي رحلة علاجية."
        : "Start by booking your initial consultation, a 90-minute session where Alia listens, understands your situation, and together you build a personalised action plan. It\u2019s the essential first step before beginning any therapeutic journey.",
    },
    {
      q: isAr ? "هل كل ما أشاركه سري؟" : "Is everything I share confidential?",
      a: isAr
        ? "بالتأكيد. خصوصيتك مقدسة. كل ما تشاركينه مع علياء يبقى بينكما."
        : "Absolutely. Your privacy is sacred. Everything shared with Alia stays between you.",
    },
    {
      q: isAr ? "ماذا لو لم أكن متأكدة أنني مستعدة؟" : "What if I\u2019m not sure I\u2019m ready?",
      a: isAr
        ? "لا تحتاجين أن تكوني مستعدة تماماً، فقط أن تحضري وأن تبدأي."
        : "You don\u2019t need to be fully ready, you just need to show up and begin.",
    },
    {
      q: isAr ? "هل يمكنني الحجز بالعربية؟" : "Can I book in Arabic?",
      a: isAr
        ? "بالطبع. تعمل علياء بطلاقة بالعربية والإنجليزية. الجلسة لكِ، بلغتك."
        : "Of course. Alia works fluently in both Arabic and English. The session is yours, in your language.",
    },
  ];

  return (
    <div>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6F2E9 0%, #FDF0E8 50%, #F6F2E9 100%)' }}>

        {/* Layer 1 — Islamic geometric octagram pattern */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 text-brand-teal"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="octagram"
              patternUnits="userSpaceOnUse"
              width="80"
              height="80"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity={0.09}
              >
                <rect x="16" y="16" width="48" height="48" />
                <rect
                  x="16"
                  y="16"
                  width="48"
                  height="48"
                  transform="rotate(45 40 40)"
                />
                <polygon points="40,16 54,22 60,36 60,44 54,58 40,64 26,58 20,44 20,36 26,22" />
                <circle cx="40" cy="40" r="2" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#octagram)" />
        </svg>

        {/* Layer 2 — Jasmine botanical sprig */}
        <motion.div
          className="absolute pointer-events-none z-0 right-[-20px] bottom-[10%] w-[160px] h-[220px] opacity-[0.35] md:right-[-10px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[280px] md:h-[380px] md:opacity-[0.6]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Main stem */}
            <path
              d="M140,370 C130,320 120,280 125,240 C130,200 145,170 140,130 C135,100 125,70 130,30"
              className="stroke-brand-teal/15"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left branch */}
            <path
              d="M130,220 C110,200 80,190 60,180"
              className="stroke-brand-teal/15"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Right branch */}
            <path
              d="M138,160 C160,145 185,140 210,145"
              className="stroke-brand-teal/15"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Upper left branch */}
            <path
              d="M133,100 C115,85 95,80 80,85"
              className="stroke-brand-teal/15"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Flower 1 — full bloom, top */}
            <g transform="translate(130, 30)">
              <ellipse cx="0" cy="-14" rx="8" ry="12" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="13" cy="-4" rx="8" ry="12" transform="rotate(72)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="-13" cy="-4" rx="8" ry="12" transform="rotate(-72)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="8" cy="11" rx="8" ry="12" transform="rotate(144)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="-8" cy="11" rx="8" ry="12" transform="rotate(-144)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="4" className="fill-brand-gold/40" />
            </g>

            {/* Flower 2 — full bloom, mid-right */}
            <g transform="translate(210, 145)">
              <ellipse cx="0" cy="-12" rx="7" ry="10" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="11" cy="-4" rx="7" ry="10" transform="rotate(72)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="-11" cy="-4" rx="7" ry="10" transform="rotate(-72)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="7" cy="10" rx="7" ry="10" transform="rotate(144)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="-7" cy="10" rx="7" ry="10" transform="rotate(-144)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="3.5" className="fill-brand-gold/40" />
            </g>

            {/* Flower 3 — smaller bloom, left */}
            <g transform="translate(60, 180)">
              <ellipse cx="0" cy="-10" rx="6" ry="9" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="9" cy="-3" rx="6" ry="9" transform="rotate(72)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="-9" cy="-3" rx="6" ry="9" transform="rotate(-72)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="6" cy="8" rx="6" ry="9" transform="rotate(144)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <ellipse cx="-6" cy="8" rx="6" ry="9" transform="rotate(-144)" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="3" className="fill-brand-gold/40" />
            </g>

            {/* Bud 1 — teardrop, upper left */}
            <path d="M80,73 C86,79 86,91 80,97 C74,91 74,79 80,73Z" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />
            {/* Bud 2 — teardrop, on main stem */}
            <path d="M128,260 C133,265 133,275 128,280 C123,275 123,265 128,260Z" className="fill-white stroke-brand-blush/60" strokeWidth="0.5" />

            {/* Leaves */}
            <ellipse cx="95" cy="195" rx="18" ry="8" transform="rotate(-30 95 195)" className="fill-brand-teal/20" />
            <ellipse cx="175" cy="150" rx="16" ry="7" transform="rotate(15 175 150)" className="fill-brand-teal/20" />
            <ellipse cx="110" cy="90" rx="15" ry="7" transform="rotate(-45 110 90)" className="fill-brand-teal/20" />
            <ellipse cx="135" cy="310" rx="14" ry="6" transform="rotate(20 135 310)" className="fill-brand-teal/20" />
          </svg>
        </motion.div>

        {/* Layer 3 — Soft radial glow (bottom-left, warmth engine) */}
        <motion.div
          className="absolute bottom-[-80px] left-[-80px] w-[600px] h-[600px] rounded-full bg-brand-blush/40 blur-3xl pointer-events-none z-0"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Layer 3b — Secondary radial glow (top-right, gold accent) */}
        <motion.div
          className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none z-0"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32 lg:py-40 text-center">

          {/* Gold anchor line */}
          <motion.div
            className="w-[2px] h-[60px] bg-brand-gold mx-auto mb-6"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformOrigin: "top center" }}
          />

          <Reveal direction="up" delay={0.1}>
            <p
              className="text-brand-gold text-base tracking-[0.2em] uppercase font-light mb-6 font-display"
              style={isAr ? { direction: "rtl" } : undefined}
            >
              {isAr ? "إطمئني … أنت في المكان الصحيح" : "Begin Your Journey"}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h1
              className="font-display font-extrabold text-brand-teal max-w-3xl mx-auto leading-tight"
              style={{
                fontSize: isAr ? "clamp(2.2rem, 5vw, 3.8rem)" : "clamp(2.4rem, 5vw, 4rem)",
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              {isAr
                ? "أنتِ على بُعد خطوة واحدة"
                : "A conversation that could change everything."}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <p
              className="text-brand-dark/70 text-sm leading-relaxed max-w-xl mx-auto mt-8 font-display"
              style={isAr ? { direction: "rtl" } : undefined}
            >
              {isAr
                ? "سنرافقك خطوة بخطوة لتبدئي رحلتك النفسية بكل خصوصية وطمأنينة"
                : "You deserve to feel supported. The first step is always the hardest, but it\u2019s the most important one. Begin today."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Bridge: Hero (cream) → Calendly (teal) ── */}
      <div className="h-48 bg-gradient-to-b from-brand-cream via-brand-blush/30 to-brand-teal pointer-events-none" />

      {/* ── 2. Calendly Embed ── */}
      <section className="bg-brand-teal relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 lg:py-32">
          <Reveal direction="up" className="text-center mb-12">
            <p
              className="text-brand-gold text-base tracking-[0.2em] uppercase font-light mb-4 font-display"
              style={isAr ? { direction: "rtl" } : undefined}
            >
              {isAr ? "الحجز" : "Reserve Your Session"}
            </p>
            <h2
              className="font-display font-extrabold text-white"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              {isAr
                ? "نحن بانتظارك"
                : "Choose a time that feels right."}
            </h2>
            <p
              className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto mt-4"
              style={isAr ? { direction: "rtl" } : undefined}
            >
              {isAr
                ? "تواصلي معنا عبر الواتساب وسنساعدك في اختيار ما يناسب احتياجاتك بكل سرية واهتمام"
                : "Reach out directly on WhatsApp to arrange your session. Completely private and safe."}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="flex flex-col items-center">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                isAr
                  ? "السلام عليكم، أرغب في حجز جلسة مع مركز الياسمين."
                  : "Hello, I'd like to book a session with Al Yasmine Center."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-10 py-5 text-brand-teal font-display font-semibold text-lg shadow-lg transition-[transform,opacity] duration-300 hover:opacity-90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{isAr ? "تواصلي عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>
            <p className="text-white/50 text-xs mt-4 tracking-wide" dir="ltr">
              {siteConfig.phone}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Bridge: Calendly (teal) → Interlude (cream) ── */}
      <div className="h-48 bg-gradient-to-b from-brand-teal via-brand-blush/30 to-brand-cream pointer-events-none" />

      {/* ── Cinematic Bloom Interlude ── */}
      {prefersReducedMotion ? (
        <section
          className="relative overflow-hidden h-[45vh] md:h-[60vh]"
          style={{
            background: "linear-gradient(to bottom, #F6F2E9 0%, #FDCCBE 100%)",
          }}
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 right-0 h-16 md:h-48 bg-gradient-to-b from-brand-cream to-transparent pointer-events-none z-10" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-brand-gold/15 blur-3xl pointer-events-none z-[1]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
            <div
              className="w-[280px] md:w-[400px] lg:w-[520px] aspect-square"
              style={{ filter: "drop-shadow(0 8px 40px rgba(236,162,0,0.15))" }}
            >
              <JasmineBloom seed={7} size="100%" toneClass="text-brand-teal" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 md:h-48 bg-gradient-to-b from-transparent to-brand-blush pointer-events-none z-10" />
        </section>
      ) : (
        <section
          ref={interludeRef}
          className="relative overflow-hidden h-[45vh] md:h-[60vh]"
          style={{
            background: "linear-gradient(to bottom, #F6F2E9 0%, #FDCCBE 100%)",
          }}
          aria-hidden="true"
        >
          {/* Transition in — hero cream bleed */}
          <div className="absolute top-0 left-0 right-0 h-16 md:h-48 bg-gradient-to-b from-brand-cream to-transparent pointer-events-none z-10" />

          {/* Element 4 — Radial glow behind bloom */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-brand-gold/15 blur-3xl pointer-events-none z-[1]"
            style={{ scale: glowScale, opacity: glowOpacity }}
            aria-hidden="true"
          />

          {/* Element 3 — Gold particle drift */}
          {GOLD_PARTICLE_CONFIGS.map((particle, i) => (
            <GoldParticle
              key={i}
              config={particle}
              scrollYProgress={interludeProgress}
            />
          ))}

          {/* Element 2 — Petal rain */}
          {PETAL_RAIN_CONFIGS.map((petal, i) => (
            <DriftingPetal
              key={i}
              config={petal}
              scrollYProgress={interludeProgress}
            />
          ))}

          {/* Element 1 — Central jasmine bloom */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
            <motion.div
              className="w-[280px] md:w-[400px] lg:w-[520px] aspect-square"
              style={{
                rotate: bloomRotate,
                scale: bloomScale,
                filter: "drop-shadow(0 8px 40px rgba(236,162,0,0.15))",
              }}
              aria-hidden="true"
            >
              <JasmineBloom seed={7} size="100%" toneClass="text-brand-teal" />
            </motion.div>
          </div>

          {/* Transition out — bleed into What to Expect */}
          <div className="absolute bottom-0 left-0 right-0 h-16 md:h-48 bg-gradient-to-b from-transparent to-brand-blush pointer-events-none z-10" />
        </section>
      )}

      {/* ── 3. What to Expect ── */}
      <section className="bg-brand-blush relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 lg:py-32">
          <Reveal direction="up" className="text-center mb-16">
            <p
              className="text-brand-gold text-base tracking-[0.2em] uppercase font-light mb-4 font-display"
              style={isAr ? { direction: "rtl" } : undefined}
            >
              {isAr ? "الخطوات" : "The Process"}
            </p>
            <h2
              className="font-display font-extrabold text-brand-teal"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              {isAr ? "بداية بسيطة وآمنة" : "Simple. Private. Yours."}
            </h2>
            {isAr && (
              <p
                className="text-brand-dark/70 text-sm leading-relaxed max-w-xl mx-auto mt-6 font-display"
                style={{ direction: "rtl" }}
              >
                ثلاث خطوات واضحة تبدأ برسالة وتنتهي بخطة تناسب احتياجك
              </p>
            )}
          </Reveal>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            staggerDelay={0.15}
          >
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white/40 backdrop-blur-sm p-8 text-center"
              >
                <span className="font-display text-5xl font-light text-brand-gold block mb-4">
                  {step.num}
                </span>
                <h3
                  className="font-display font-extrabold text-lg text-brand-teal mb-3"
                  style={isAr ? { direction: "rtl" } : undefined}
                >
                  {step.title}
                </h3>
                <p
                  className="text-brand-dark/70 text-sm leading-relaxed"
                  style={isAr ? { direction: "rtl" } : undefined}
                >
                  {step.body}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Bridge: What to Expect (blush) → FAQ (teal) ── */}
      <div className="h-64 bg-gradient-to-b from-brand-blush via-brand-blush/30 to-brand-teal pointer-events-none" />

      {/* ── 4. FAQ (continuous teal) ── */}
      <section className="bg-brand-teal relative overflow-hidden pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-20 md:pb-24 lg:pb-32">
          <Reveal direction="up" className="text-center mb-12">
            <p
              className="text-brand-gold text-base tracking-[0.2em] uppercase font-light mb-4 font-display"
              style={isAr ? { direction: "rtl" } : undefined}
            >
              {isAr ? "أسئلة شائعة" : "Common Questions"}
            </p>
            <h2
              className="font-display font-extrabold text-white"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              {isAr ? "ربما تتساءلين..." : "You may be wondering\u2026"}
            </h2>
          </Reveal>

          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <Reveal key={i} direction="up" delay={i * 0.1}>
                <FaqItem
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
