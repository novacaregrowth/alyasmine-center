"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const heroArabicLine = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const heroEnglishLine = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
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
        className="absolute"
        style={{ y, top: "-10%", bottom: "-10%", left: 0, right: 0 }}
      >
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      </motion.div>
    </div>
  );
}

// ─── Service Data ────────────────────────────────────────────────────────────

interface ServiceItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  sensory: string;
  image: string;
  duration: string;
}

const serviceOfferings: ServiceItem[] = [
  {
    id: "one-on-one",
    title: "1-on-1 Coaching",
    titleAr: "جلسات فردية",
    description:
      "Personalised CBT-based sessions tailored to your unique goals and challenges. A private space where your story is heard and honoured.",
    sensory: "warm light, quiet conversation",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    duration: "60 min",
  },
  {
    id: "group-sessions",
    title: "Group Sessions",
    titleAr: "جلسات جماعية",
    description:
      "Grow alongside a community of like-minded women in a safe, supportive setting. Shared vulnerability becomes shared strength.",
    sensory: "shared warmth, collective strength",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    duration: "90 min",
  },
  {
    id: "intensive",
    title: "Intensive Program",
    titleAr: "برنامج مكثّف",
    description:
      "Deep-dive transformation over 8 weeks with full CBT support and accountability. For women ready to do the deep work.",
    sensory: "deep immersion, lasting change",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
    duration: "8 weeks",
  },
  {
    id: "workshops",
    title: "Workshops",
    titleAr: "ورش العمل",
    description:
      "Focused skill-building sessions on specific life areas using proven CBT techniques. Practical tools you can use immediately.",
    sensory: "hands-on learning, practical tools",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    duration: "Half-day",
  },
  {
    id: "teen-coaching",
    title: "Teen Coaching",
    titleAr: "استشارات المراهقات",
    description:
      "Age-appropriate counseling designed for teenage girls navigating identity, pressure, and growth. A gentle space to be herself.",
    sensory: "gentle guidance, safe space",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80",
    duration: "45 min",
  },
];

const arabicNumerals = ["١", "٢", "٣", "٤", "٥"];

const gridBorderColors = [
  "border-l-brand-gold",
  "border-l-brand-blush",
  "border-l-brand-teal-light",
  "border-l-brand-gold",
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ServicesPage() {
  const lang = useLocale();

  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(heroScroll, [0, 1], ["0%", "-30%"]);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

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

  const featuredService = serviceOfferings[0];
  const gridServices = serviceOfferings.slice(1);

  const pathwaySteps = [
    {
      num: "١",
      title: lang === "ar" ? "استشيري" : "Consult",
      titleSecondary: lang === "ar" ? "Consult" : "استشيري",
      desc:
        lang === "ar"
          ? "مكالمة مجانية لنفهم احتياجاتكِ ونرسم معًا الخطوة الأولى."
          : "A free discovery call to understand your needs and map your first step together.",
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
      <section
        ref={heroSectionRef}
        className="relative min-h-screen bg-brand-cream flex items-center justify-center overflow-hidden"
      >
        {/* Atmospheric layers */}
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(253,204,190,0.16)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(236,162,0,0.05)_0%,transparent_50%)] pointer-events-none" />

        {/* Breathing orbs — polyrhythmic, unique to this page */}
        <motion.div
          className="absolute top-[18%] left-[12%] w-32 h-32 bg-brand-blush/[0.10] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[14%] w-24 h-24 bg-brand-gold/[0.06] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Watermark — "شفاء" (healing), scroll-parallax */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.span
            className="font-arabic text-brand-teal/[0.03] select-none whitespace-nowrap block"
            style={{ fontSize: "clamp(10rem, 24vw, 22rem)", y: watermarkY }}
            aria-hidden="true"
          >
            شفاء
          </motion.span>
        </div>

        {/* Sacred geometry — Jasmine 5-petal motif */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[540px] md:h-[540px] opacity-[0.03] pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <g fill="none" stroke="#ECA200">
            <path d="M100,30 C115,60 115,85 100,130 C85,85 85,60 100,30Z" strokeWidth="0.3" />
            <path d="M100,30 C115,60 115,85 100,130 C85,85 85,60 100,30Z" strokeWidth="0.3" transform="rotate(72 100 100)" />
            <path d="M100,30 C115,60 115,85 100,130 C85,85 85,60 100,30Z" strokeWidth="0.3" transform="rotate(144 100 100)" />
            <path d="M100,30 C115,60 115,85 100,130 C85,85 85,60 100,30Z" strokeWidth="0.3" transform="rotate(216 100 100)" />
            <path d="M100,30 C115,60 115,85 100,130 C85,85 85,60 100,30Z" strokeWidth="0.3" transform="rotate(288 100 100)" />
            <circle cx="100" cy="100" r="12" strokeWidth="0.2" />
          </g>
        </svg>

        {/* Content — centered composition */}
        <div ref={heroRef} className="relative z-10 text-center px-6 py-40 w-full">

          {/* Gold thread — the curtain pull */}
          <div className="flex justify-center mb-10">
            <motion.div
              className="w-px bg-gradient-to-b from-brand-gold/0 via-brand-gold to-brand-gold/0"
              initial={{ height: 0, opacity: 0 }}
              animate={heroInView ? { height: "4rem", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={heroStagger}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.p
              variants={heroItem}
              className="text-brand-gold tracking-[0.3em] text-xs uppercase mb-10"
            >
              {lang === "ar" ? "مسارات الشفاء" : "Pathways of Healing"}
            </motion.p>

            {/* Arabic headline — enters from the right */}
            <motion.h1
              variants={heroArabicLine}
              className="font-display font-[200] text-brand-teal leading-[0.9]"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                direction: "rtl",
              }}
            >
              هُنا يبدأ شفاؤكِ
            </motion.h1>

            {/* English headline — enters from the left */}
            <motion.p
              variants={heroEnglishLine}
              className="font-display font-[200] text-brand-teal leading-[0.9] mt-3"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              }}
            >
              Here, Your Healing Begins
            </motion.p>

            {/* Shimmer thread */}
            <motion.div
              variants={heroItem}
              className="w-20 h-px my-10 animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
            />

            {/* Cross-script echo */}
            <motion.p
              variants={heroItem}
              className={
                lang === "ar"
                  ? "font-display text-sm text-brand-teal/20 mb-10"
                  : "font-arabic text-sm text-brand-teal/20 mb-10"
              }
              style={{ direction: lang === "ar" ? "ltr" : "rtl" }}
            >
              {lang === "ar" ? "Here, Your Healing Begins" : "هُنا يبدأ شفاؤكِ"}
            </motion.p>

            {/* Pills */}
            <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-3">
              {(lang === "ar"
                ? ["٥ مسارات", "للنساء فقط", "منهج CBT"]
                : ["5 Pathways", "Women Only", "CBT-Based"]
              ).map((label) => (
                <span
                  key={label}
                  className="border border-brand-teal/20 text-brand-teal/70 text-xs px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Body */}
            <motion.p
              variants={heroItem}
              className="text-brand-dark/50 text-sm leading-relaxed max-w-md mt-8"
            >
              {lang === "ar"
                ? "كل خدمة هي مسار — صُمّمت لتلاقيكِ أينما كنتِ وتمشي معكِ نحو ما تريدين أن تكوني."
                : "Each service is a pathway — designed to meet you where you are and walk with you toward where you want to be."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Gradient Bridge — Cream → Blush ─────────────────────────────── */}
      <div className="h-32 bg-gradient-to-b from-brand-cream to-[#FDCCBE33] pointer-events-none" />

      {/* ── The Offerings — Services Grid ────────────────────────────────── */}
      <Section className="bg-brand-blush/20">
        <div className="section-container py-32">
          <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-4">
            {lang === "ar" ? "العروض" : "The Offerings"}
          </p>
          <h2
            className="font-display font-light text-brand-teal mb-20"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {lang === "ar" ? "خدماتنا" : "Our Services"}
          </h2>

          {/* ── Featured Service — "The Window" ── */}
          <motion.div
            className="relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[560px] mb-10"
            style={{ boxShadow: "0 4px 40px rgba(3,90,96,0.08)" }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ParallaxImage
              src={featuredService.image}
              alt={featuredService.title}
              className="absolute inset-0"
              speed={5}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/30 via-transparent to-transparent" />

            <span
              className="absolute top-4 left-6 font-arabic text-white/[0.12] pointer-events-none select-none leading-none"
              style={{ fontSize: "clamp(8rem, 15vw, 14rem)" }}
              aria-hidden="true"
            >
              ١
            </span>

            <div className="absolute bottom-12 right-12 w-64 h-64 bg-brand-blush/30 rounded-full blur-[80px] pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-8 lg:bottom-8 lg:w-[45%] bg-white/70 backdrop-blur-xl rounded-3xl p-8 lg:p-10">
              <span className="text-brand-gold text-xs tracking-[0.15em] uppercase mb-3 block">
                {featuredService.duration}
              </span>
              <h3
                className="font-display text-brand-teal mb-1"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
              >
                {featuredService.title}
              </h3>
              <p
                className="font-display text-brand-teal-light text-sm mb-4"
                style={{ direction: "rtl" }}
              >
                {featuredService.titleAr}
              </p>
              <p className="text-brand-dark/60 text-sm leading-relaxed mb-3">
                {featuredService.description}
              </p>
              <p className="text-brand-gold/60 text-xs italic tracking-wide mb-6">
                {featuredService.sensory}
              </p>
              <Link
                href={`/${lang}/booking`}
                className="inline-block px-8 py-3.5 bg-brand-teal text-brand-cream rounded-full text-xs tracking-[0.12em] uppercase font-medium hover:bg-brand-teal/90 hover:-translate-y-0.5 transition-all duration-300"
              >
                {lang === "ar" ? "احجزي الآن" : "Book This"}
              </Link>
            </div>
          </motion.div>

          {/* ── Grid — Remaining Services ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {gridServices.map((service, i) => (
              <motion.div
                key={service.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl border-l-4 ${gridBorderColors[i]} group ${
                  i % 2 === 1 ? "md:mt-12" : ""
                }`}
                style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.05)" }}
              >
                <span
                  className="absolute -top-2 right-4 font-arabic text-brand-blush/[0.07] group-hover:text-brand-blush/[0.14] transition-all duration-700 pointer-events-none select-none leading-none z-10"
                  style={{ fontSize: "7rem" }}
                  aria-hidden="true"
                >
                  {arabicNumerals[i + 1]}
                </span>

                <div className="relative h-56 overflow-hidden">
                  <ParallaxImage
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0"
                    speed={3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/15 to-transparent" />
                  <div className="absolute inset-0 bg-brand-blush/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="absolute bottom-4 left-5 right-5 text-white/80 font-display italic text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                    {service.sensory}
                  </p>
                </div>

                <div className="p-10 relative">
                  <h3 className="font-display text-xl text-brand-teal mb-1">
                    {service.title}
                  </h3>
                  <p
                    className="font-display text-brand-teal-light text-sm mb-4"
                    style={{ direction: "rtl" }}
                  >
                    {service.titleAr}
                  </p>
                  <p className="text-brand-dark/60 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <p className="text-brand-gold/60 text-xs italic tracking-wide mb-6">
                    {service.sensory}
                  </p>
                  <div className="pt-4 border-t border-brand-cream flex items-center justify-between">
                    <span className="text-xs px-3 py-1.5 rounded-full bg-brand-cream text-brand-teal">
                      {service.duration}
                    </span>
                    <Link
                      href={`/${lang}/booking`}
                      className="text-brand-teal text-xs tracking-[0.1em] uppercase font-medium hover:text-brand-gold transition-colors duration-300"
                    >
                      {lang === "ar" ? "احجزي" : "Book"}
                    </Link>
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-brand-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
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
              className="h-px animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
              initial={{ width: 0 }}
              animate={pathwayLineInView ? { width: "8rem" } : { width: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
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
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {pathwaySteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.num}
                    variants={staggerItem}
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
              className="w-px bg-gradient-to-b from-brand-gold/0 via-brand-gold to-brand-gold/0"
              initial={{ height: 0, opacity: 0 }}
              animate={
                ctaLineInView
                  ? { height: "6rem", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
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
                ? "مكالمتكِ الأولى مجانية — بلا التزام، مجرد حوار."
                : "Your first call is free — no commitment, just conversation."}
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
                  ? "احجزي مكالمة مجانية"
                  : "Book a Discovery Call"}
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
