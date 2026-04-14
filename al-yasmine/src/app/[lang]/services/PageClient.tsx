"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { MashrabiyaCanvas } from "@/components/ui/mashrabiya-canvas";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/config";
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

// ─── Parallax Image ──────────────────────────────────────────────────────────

function ParallaxImage({
  src,
  alt,
  className,
  speed = 5,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed}%`, `-${speed}%`]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div
        className="absolute inset-0"
        style={{ y, top: "-10%", bottom: "-10%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}

// ─── Service Images (UI placeholders — replace with real branded photos) ─────

const serviceImages: Record<string, string> = {
  consultation: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
  "cbt-sessions": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
  prewedding: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  adolescent: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
  "red-eye": "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
  "smart-memory": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
};

const featuredServiceId = "smart-memory";
const remainingServiceOrder = ["consultation", "cbt-sessions", "prewedding", "adolescent", "red-eye"] as const;
const gridAccentColors = [
  "bg-brand-gold",
  "bg-brand-blush",
  "bg-brand-teal",
  "bg-brand-teal-light",
  "bg-brand-gold",
];

// ─── Timeline accent colors per service ─────────────────────────────────────

const timelineAccents: Record<string, { dot: string; line: string; bg: string }> = {
  consultation:   { dot: "bg-brand-gold",       line: "from-brand-gold/40 via-brand-gold to-brand-gold/40", bg: "bg-brand-gold/[0.06]" },
  "cbt-sessions": { dot: "bg-brand-teal",       line: "from-brand-teal/40 via-brand-teal to-brand-teal/40", bg: "bg-brand-teal/[0.06]" },
  prewedding:     { dot: "bg-brand-blush",       line: "from-brand-blush/60 via-brand-blush to-brand-blush/60", bg: "bg-brand-blush/[0.08]" },
  adolescent:     { dot: "bg-brand-teal-light", line: "from-brand-teal-light/40 via-brand-teal-light to-brand-teal-light/40", bg: "bg-brand-teal-light/[0.06]" },
  "red-eye":      { dot: "bg-brand-gold",       line: "from-brand-gold/40 via-brand-gold to-brand-gold/40", bg: "bg-brand-gold/[0.06]" },
  "smart-memory": { dot: "bg-brand-teal",       line: "from-brand-teal/40 via-brand-teal to-brand-teal/40", bg: "bg-brand-teal/[0.06]" },
};

// ─── Service Timeline Component ─────────────────────────────────────────────

function ServiceTimeline({
  service,
  lang,
  isOpen,
  onToggle,
}: {
  service: typeof services[number];
  lang: Locale;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const accent = timelineAccents[service.id] || timelineAccents.consultation;
  const isAr = lang === "ar";
  const items = service.timeline;

  return (
    <div id={service.id} className="scroll-mt-24">
      {/* Header — clickable to expand/collapse */}
      <motion.button
        onClick={onToggle}
        className="w-full text-left group"
        whileHover={{ x: isAr ? -4 : 4 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`flex items-center gap-5 py-8 px-6 lg:px-10 rounded-3xl transition-colors duration-300 ${
            isOpen ? "bg-white/70 backdrop-blur-sm shadow-sm" : "hover:bg-white/40"
          }`}
          dir={isAr ? "rtl" : "ltr"}
        >
          <span className="text-3xl flex-shrink-0">{service.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-brand-teal text-xl lg:text-2xl mb-1 truncate">
              {isAr ? service.titleAr : service.title}
            </h3>
            <p className="text-brand-dark/50 text-sm truncate">
              {isAr ? service.descriptionAr : service.description}
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            {service.price && (
              <span className="hidden sm:block text-brand-teal font-semibold text-sm">
                {formatPrice(service.price)}
              </span>
            )}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full border border-brand-teal/20 flex items-center justify-center"
            >
              <ChevronDown className="w-4 h-4 text-brand-teal/60" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Expandable timeline content */}
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
              {/* Info pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-1.5 rounded-full bg-brand-cream text-brand-teal text-xs font-medium">
                  {service.duration}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-brand-cream text-brand-dark/60 text-xs">
                  {service.format}
                </span>
                {service.price && (
                  <span className="px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold">
                    {formatPrice(service.price)}
                  </span>
                )}
              </div>

              {/* Timeline */}
              <div className={`relative ${isAr ? "pr-8" : "pl-8"}`}>
                {/* Vertical line */}
                <div
                  className={`absolute top-0 bottom-0 w-px bg-gradient-to-b ${accent.line} ${
                    isAr ? "right-[11px]" : "left-[11px]"
                  }`}
                />

                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative mb-8 last:mb-0"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute top-1.5 w-[22px] h-[22px] rounded-full border-[3px] border-white ${accent.dot} shadow-sm ${
                        isAr ? "-right-8 translate-x-1/2" : "-left-8 -translate-x-1/2"
                      }`}
                    />

                    {/* Content card */}
                    <div className={`${accent.bg} rounded-2xl p-5 ${isAr ? "mr-4" : "ml-4"}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-brand-teal/30 font-display text-sm font-semibold mt-0.5 flex-shrink-0">
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

              {/* Includes section */}
              {service.includes.length > 0 && (
                <div className="mt-10 pt-8 border-t border-brand-cream">
                  <p className="text-brand-teal text-xs tracking-[0.2em] uppercase font-medium mb-4">
                    {isAr ? "ما يشمله" : "What's Included"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${accent.dot} flex-shrink-0`} />
                        <span className="text-brand-dark/60 text-sm">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price note + CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/booking`}
                  className="inline-block px-8 py-3.5 bg-brand-teal text-brand-cream rounded-full text-xs tracking-[0.12em] uppercase font-medium hover:bg-brand-teal/90 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {isAr ? "احجزي الآن" : "Book Now"}
                </Link>
                {service.priceNote && (
                  <p className="text-brand-dark/40 text-xs italic">
                    {service.priceNote}
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

  const featuredService = services.find((s) => s.id === featuredServiceId)!;
  const gridServices = remainingServiceOrder.map((id) => services.find((s) => s.id === id)!);

  const pathwaySteps = [
    {
      num: "١",
      title: lang === "ar" ? "استشيري" : "Consult",
      titleSecondary: lang === "ar" ? "Consult" : "استشيري",
      desc:
        lang === "ar"
          ? "جلسة استشارية لنفهم احتياجاتكِ ونرسم معًا الخطوة الأولى."
          : "A consultation session to understand your needs and map your first step together.",
      glowClass: "bg-brand-blush/10",
    },
    {
      num: "٢",
      title: lang === "ar" ? "تواصلي" : "Connect",
      titleSecondary: lang === "ar" ? "Connect" : "تواصلي",
      desc:
        lang === "ar"
          ? "ابدأي جلساتكِ في مساحة آمنة مبنية على الثقة والاحترام."
          : "Begin your sessions in a safe space built on trust, respect, and clinical care.",
      glowClass: "bg-brand-cream/[0.06]",
    },
    {
      num: "٣",
      title: lang === "ar" ? "ازدهري" : "Cultivate",
      titleSecondary: lang === "ar" ? "Cultivate" : "ازدهري",
      desc:
        lang === "ar"
          ? "اكتسبي أدوات تدوم — توازن نفسي، وضوح ذهني، وقوة داخلية."
          : "Build lasting tools — psychological balance, mental clarity, and inner strength.",
      glowClass: "bg-brand-gold/[0.06]",
    },
  ];

  return (
    <div>

      {/* ── Hero — The Opening (الافتتاح) ──────────────────────────────── */}
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
              {lang === "ar" ? "مسارات الشفاء" : "Pathways of Healing"}
            </motion.p>

            {/* Arabic headline — cinematic curtain reveal */}
            <motion.h1
              className="font-display font-[200] text-brand-teal leading-[0.9]"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                direction: "rtl",
              }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true }}
            >
              هُنا يبدأ شفاؤكِ
            </motion.h1>

            {/* English headline — delayed curtain reveal */}
            <motion.h2
              className="font-display font-[200] text-brand-teal leading-[0.9] mt-3"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
              viewport={{ once: true }}
            >
              Here, Your Healing Begins
            </motion.h2>

            {/* Shimmer thread */}
            <motion.div
              className="w-20 h-px my-10 animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            />

            {/* Cross-script echo */}
            <motion.p
              className={
                lang === "ar"
                  ? "font-display text-sm text-brand-teal/20 mb-10"
                  : "font-display text-sm text-brand-teal/20 mb-10"
              }
              style={{ direction: lang === "ar" ? "ltr" : "rtl" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              {lang === "ar" ? "Here, Your Healing Begins" : "هُنا يبدأ شفاؤكِ"}
            </motion.p>

            {/* Pills — staggered with frosted glass */}
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {(lang === "ar"
                ? ["٥ مسارات", "للنساء فقط", "منهج CBT"]
                : ["5 Pathways", "Women Only", "CBT-Based"]
              ).map((label) => (
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
                  className="border border-brand-teal/20 text-brand-teal/70 text-xs px-4 py-2 rounded-full backdrop-blur-sm bg-brand-cream/70"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Body */}
            <Reveal direction="up" delay={1.0} className="mt-8">
              <p className="text-brand-dark/50 text-sm leading-relaxed max-w-md mx-auto">
                {lang === "ar"
                  ? "كل خدمة هي مسار — صُمّمت لتلاقيكِ أينما كنتِ وتمشي معكِ نحو ما تريدين أن تكوني."
                  : "Each service is a pathway — designed to meet you where you are and walk with you toward where you want to be."}
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
      <div className="h-32 bg-gradient-to-b from-brand-cream to-[#FDCCBE33] pointer-events-none" />

      {/* ── The Offerings — Services Grid ────────────────────────────────── */}
      <Section className="bg-brand-blush/20">
        <div className="section-container py-20">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-3">
              {lang === "ar" ? "العروض" : "The Offerings"}
            </p>
            <h2
              className="font-display font-light text-brand-teal"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </h2>
            <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-6" />
          </div>

          {/* ── Featured — Smart Memory (full-width horizontal card) ── */}
          <motion.div
            className="relative rounded-2xl overflow-hidden mb-6 group cursor-pointer"
            style={{ boxShadow: "0 4px 30px rgba(3,90,96,0.06)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => {
              setOpenServiceId(featuredService.id);
              setTimeout(() => {
                document.getElementById(featuredService.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 150);
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-56 lg:h-72 overflow-hidden">
                <ParallaxImage
                  src={serviceImages[featuredService.id]}
                  alt={featuredService.title}
                  className="absolute inset-0"
                  speed={3}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:to-white/40" />
                <div className="absolute inset-0 bg-brand-teal/[0.06]" />
                <span
                  className="absolute top-4 left-5 text-white/25 pointer-events-none select-none leading-none font-display"
                  style={{ fontSize: "4rem" }}
                  aria-hidden="true"
                >
                  {featuredService.icon}
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] tracking-[0.12em] uppercase font-semibold">
                  {lang === "ar" ? "الأكثر طلبًا" : "Most Popular"}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-7 lg:p-9 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-brand-gold text-[10px] tracking-[0.15em] uppercase font-medium">
                    {featuredService.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                  <span className="text-brand-dark/40 text-[10px] italic">
                    {featuredService.format}
                  </span>
                </div>
                <h3 className="font-display text-brand-teal text-xl lg:text-2xl mb-1">
                  {lang === "ar" ? featuredService.titleAr : featuredService.title}
                </h3>
                <p
                  className="font-display text-brand-teal-light text-xs mb-3 opacity-60"
                  style={{ direction: lang === "ar" ? "ltr" : "rtl" }}
                >
                  {lang === "ar" ? featuredService.title : featuredService.titleAr}
                </p>
                <p className="text-brand-dark/55 text-sm leading-relaxed mb-5 max-w-lg">
                  {lang === "ar" ? featuredService.descriptionAr : featuredService.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-brand-gold tracking-[0.08em] text-[10px] uppercase font-medium group-hover:text-brand-teal transition-colors duration-300">
                    {lang === "ar" ? "اكتشفي المزيد ←" : "Learn More →"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Row of 3 ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {gridServices.slice(0, 3).map((service, i) => {
              const ServiceCard = (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  onClick={() => {
                    setOpenServiceId(service.id);
                    setTimeout(() => {
                      document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 150);
                  }}
                  className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl group cursor-pointer"
                  style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.05)" }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <ParallaxImage
                      src={serviceImages[service.id]}
                      alt={service.title}
                      className="absolute inset-0"
                      speed={2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
                    <div className="absolute inset-0 bg-brand-teal/[0.03] group-hover:bg-brand-teal/10 transition-colors duration-500" />
                    <span
                      className="absolute top-3 left-4 font-display text-white/30 group-hover:text-white/50 transition-all duration-500 pointer-events-none select-none leading-none"
                      style={{ fontSize: "2.5rem" }}
                      aria-hidden="true"
                    >
                      {service.icon}
                    </span>
                    <div className={`absolute bottom-0 left-0 w-full h-[3px] ${gridAccentColors[i]} opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-brand-teal text-base mb-0.5 group-hover:text-brand-teal/80 transition-colors duration-300">
                      {lang === "ar" ? service.titleAr : service.title}
                    </h3>
                    <p className="font-display text-brand-teal-light text-[11px] mb-3 opacity-60" style={{ direction: lang === "ar" ? "ltr" : "rtl" }}>
                      {lang === "ar" ? service.title : service.titleAr}
                    </p>
                    <p className="text-brand-dark/50 text-xs leading-relaxed mb-4 line-clamp-2">
                      {lang === "ar" ? service.descriptionAr : service.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] pt-3 border-t border-brand-cream/80">
                      <span className="px-2.5 py-1 rounded-full bg-brand-cream text-brand-teal font-medium">
                        {service.duration}
                      </span>
                      <span className="text-brand-gold tracking-[0.08em] uppercase font-medium group-hover:text-brand-teal transition-colors duration-300">
                        {lang === "ar" ? "اكتشفي المزيد ←" : "Learn More →"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
              return ServiceCard;
            })}
          </div>

          {/* ── Row of 2 — centered ── */}
          <div className="flex justify-center gap-5">
            {gridServices.slice(3, 5).map((service, idx) => {
              const i = idx + 3;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  onClick={() => {
                    setOpenServiceId(service.id);
                    setTimeout(() => {
                      document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 150);
                  }}
                  className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl group cursor-pointer w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)]"
                  style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.05)" }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <ParallaxImage
                      src={serviceImages[service.id]}
                      alt={service.title}
                      className="absolute inset-0"
                      speed={2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
                    <div className="absolute inset-0 bg-brand-teal/[0.03] group-hover:bg-brand-teal/10 transition-colors duration-500" />
                    <span
                      className="absolute top-3 left-4 font-display text-white/30 group-hover:text-white/50 transition-all duration-500 pointer-events-none select-none leading-none"
                      style={{ fontSize: "2.5rem" }}
                      aria-hidden="true"
                    >
                      {service.icon}
                    </span>
                    <div className={`absolute bottom-0 left-0 w-full h-[3px] ${gridAccentColors[i]} opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-brand-teal text-base mb-0.5 group-hover:text-brand-teal/80 transition-colors duration-300">
                      {lang === "ar" ? service.titleAr : service.title}
                    </h3>
                    <p className="font-display text-brand-teal-light text-[11px] mb-3 opacity-60" style={{ direction: lang === "ar" ? "ltr" : "rtl" }}>
                      {lang === "ar" ? service.title : service.titleAr}
                    </p>
                    <p className="text-brand-dark/50 text-xs leading-relaxed mb-4 line-clamp-2">
                      {lang === "ar" ? service.descriptionAr : service.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] pt-3 border-t border-brand-cream/80">
                      <span className="px-2.5 py-1 rounded-full bg-brand-cream text-brand-teal font-medium">
                        {service.duration}
                      </span>
                      <span className="text-brand-gold tracking-[0.08em] uppercase font-medium group-hover:text-brand-teal transition-colors duration-300">
                        {lang === "ar" ? "اكتشفي المزيد ←" : "Learn More →"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── Service Detail Timelines ──────────────────────────────────────── */}
      <Section className="bg-brand-cream/80">
        <div className="section-container py-24">
          <Reveal className="text-center mb-16">
            <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-4">
              {lang === "ar" ? "رحلتكِ بالتفصيل" : "Your Journey in Detail"}
            </p>
            <h2
              className="font-display font-light text-brand-teal mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {lang === "ar" ? "ماذا ستتعلمين" : "What You'll Experience"}
            </h2>
            <p className="text-brand-dark/50 text-sm max-w-md mx-auto leading-relaxed">
              {lang === "ar"
                ? "اكتشفي ما تتضمنه كل خدمة خطوة بخطوة"
                : "Discover what each service includes, step by step"}
            </p>
            <div className="w-16 h-px bg-brand-gold/40 mx-auto mt-8" />
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-2">
            {services.map((service) => (
              <ServiceTimeline
                key={service.id}
                service={service}
                lang={lang}
                isOpen={openServiceId === service.id}
                onToggle={() => handleToggle(service.id)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Gradient Bridge — Blush → Cream ─────────────────────────────── */}
      <div className="h-32 bg-gradient-to-b from-[#FDCCBE33] to-brand-cream pointer-events-none" />

      {/* ── The Exhale — Breathing Moment ────────────────────────────────── */}
      <section className="relative bg-brand-cream min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <motion.div
          className="absolute bottom-[20%] right-[18%] w-32 h-32 bg-brand-blush/[0.08] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-arabic text-brand-teal/[0.06] pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
          aria-hidden="true"
        >
          شفاء
        </span>

        <Reveal
          className="relative z-10 text-center px-6 py-40 max-w-2xl mx-auto"
          direction="up"
        >
          <p
            className="font-arabic text-brand-teal leading-snug mb-4"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              direction: "rtl",
            }}
          >
            الخطوة الأولى هي الأصعب — والأجمل
          </p>
          <p className="font-display text-brand-dark/40 text-sm">
            The first step is the hardest — and the most beautiful.
          </p>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-8" />
        </Reveal>
      </section>

      {/* ── Gradient Bridge — Cream via Blush → Teal ────────────────────── */}
      <div className="h-48 bg-gradient-to-b from-brand-cream via-[#FDCCBE33] to-brand-teal pointer-events-none relative">
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
          <p className="text-brand-gold text-sm tracking-[0.3em] mb-8">
            {lang === "ar" ? "رحلتكِ" : "Your Journey"}
          </p>
          <h2
            className="font-display font-[200] text-brand-cream mb-10"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            {lang === "ar"
              ? "ثلاث خطوات نحو التفتّح"
              : "Three Steps to Bloom"}
          </h2>

          <div ref={pathwayLineRef} className="flex justify-center">
            <motion.div
              className="h-px w-32 animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={pathwayLineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
          <div className="relative pl-12 lg:pl-0">
            {/* Scroll-driven vertical gold line */}
            <motion.div
              className="absolute left-8 lg:left-1/2 top-0 w-px h-full origin-top"
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
                    key={step.num}
                    variants={pathwayStep}
                    className="relative mb-24 last:mb-0"
                  >
                    {/* Node circle */}
                    <div className="absolute left-8 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-0 w-14 h-14 rounded-full border-2 border-brand-gold/30 bg-brand-teal flex items-center justify-center z-10">
                      <span className="font-arabic text-3xl text-brand-cream">
                        {step.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className={`relative pt-1 ${
                        isLeft
                          ? "lg:w-[42%] lg:mr-auto lg:text-right lg:pr-20"
                          : "lg:w-[42%] lg:ml-auto lg:text-left lg:pl-20"
                      }`}
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 ${step.glowClass} rounded-full blur-[60px] pointer-events-none`}
                      />

                      <h3
                        className="font-display text-brand-cream mb-1 relative"
                        style={{
                          fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="font-display text-sm text-brand-cream/30 mb-4 relative"
                        style={{
                          direction: lang === "ar" ? "ltr" : "rtl",
                        }}
                      >
                        {step.titleSecondary}
                      </p>
                      <p className="text-brand-cream/60 text-sm leading-relaxed max-w-sm relative lg:max-w-none">
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
      <section className="bg-brand-teal text-brand-cream relative overflow-hidden min-h-[70vh] flex items-center justify-center">
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

        <div className="relative z-10 text-center max-w-lg mx-auto px-6 py-32">
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
              className="font-arabic text-brand-cream tracking-[0.05em] mb-4"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                direction: "rtl",
              }}
            >
              بتلتكِ الأولى تبدأ هنا
            </motion.p>

            <motion.p
              variants={ctaItem}
              className="font-display text-sm text-brand-cream/40 mb-10"
            >
              Your first bloom begins here
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
              className="font-display font-light text-brand-cream mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              {lang === "ar" ? "مستعدة للبداية؟" : "Ready to Begin?"}
            </motion.h2>

            <motion.p
              variants={ctaItem}
              className="text-sm text-brand-cream/40 max-w-sm mb-10 leading-relaxed"
            >
              {lang === "ar"
                ? "خطوتكِ الأولى نحو التغيير تبدأ من هنا."
                : "Take the first step toward real, lasting change."}
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
                className="relative inline-block px-10 py-5 bg-brand-gold text-brand-dark rounded-full text-xs tracking-[0.15em] uppercase font-semibold hover:bg-brand-gold/90 hover:-translate-y-0.5 transition-all duration-300"
              >
                {lang === "ar"
                  ? "احجزي موعدك الآن"
                  : "Book Your Session"}
              </Link>
            </motion.div>

            <motion.p
              variants={ctaItem}
              className="font-arabic text-xs text-brand-gold/30 tracking-wide"
              style={{ direction: "rtl" }}
            >
              أنا هنا من أجلكِ
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
