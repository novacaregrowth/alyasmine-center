"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getTranslator, type Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

function useLocale(): Locale {
  const params = useParams();
  return (params?.lang as Locale) || "en";
}

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

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
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

export default function AboutPage() {
  const lang = useLocale();
  const t = getTranslator(lang);
  const silsilaLineRef = useRef<HTMLDivElement>(null);
  const silsilaLineInView = useInView(silsilaLineRef, { once: true, margin: "-40px" });
  const ctaLineRef = useRef<HTMLDivElement>(null);
  const ctaLineInView = useInView(ctaLineRef, { once: true, margin: "-40px" });
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const cbtCards = [
    { title: t("about.cbtCard1Title"), body: t("about.cbtCard1Body") },
    { title: t("about.cbtCard2Title"), body: t("about.cbtCard2Body") },
    { title: t("about.cbtCard3Title"), body: t("about.cbtCard3Body") },
  ];

  const credentialItems =
    lang === "ar"
      ? [
          "ماجستير في الإرشاد النفسي.",
          "متخصصة في العلاج المعرفي السلوكي CBT.",
          "حاصلة على السند المتصل إلى النبي ﷺ في حفظ القرآن الكريم كاملاً تعلماً وتعليماً.",
          "مدربة معتمدة من المجلس البريطاني وهيئة المعرفة والتنمية البشرية بدبي.",
          "أكثر من 20 عاماً من الخبرة في الإرشاد والعلاج النفسي.",
          "أكثر من 3000 ساعة من الاستشارات والإرشاد والتدريب النفسي.",
          "خبيرة في تصميم البرامج العلاجية والتدريبية القائمة على العلاج المعرفي السلوكي.",
          "خبيرة في الصحة النفسية المؤسسية وتطوير برامج التدخل النفسي.",
        ]
      : [
          "Master's in Psychological Counseling.",
          "Specialist in Cognitive Behavioural Therapy (CBT).",
          "Holds an unbroken chain (sanad) to the Prophet ﷺ for the complete memorisation of the Noble Qur'an, in learning and teaching.",
          "Certified trainer accredited by the British Board and the Knowledge and Human Development Authority (KHDA), Dubai.",
          "Over 20 years of experience in psychological counselling and therapy.",
          "Over 3,000 hours of psychological consultation & guidance and training.",
          "Expert in designing CBT-based therapeutic and training programs.",
          "Expert in organisational mental health and developing psychological intervention programs.",
        ];

  return (
    <div>

      {/* ── Hero — The Threshold ── */}
      <section className="relative min-h-screen bg-brand-cream flex items-center px-8 md:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(253,204,190,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(236,162,0,0.05)_0%,transparent_50%)] pointer-events-none" />

        <motion.div
          className="absolute top-[20%] right-[12%] w-32 h-32 bg-brand-blush/[0.10] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-24 h-24 bg-brand-gold/[0.06] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-brand-teal/[0.04] pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(12rem, 28vw, 26rem)" }}
          aria-hidden="true"
        >
          {lang === "ar" ? "علياء البحري" : "Alia AlBahri"}
        </span>

        <div className="relative z-10 flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-0 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="absolute start-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-brand-gold to-transparent hidden lg:block" />

          {/* Left column — typography */}
          <motion.div
            ref={heroRef}
            className="w-full lg:w-[60%] lg:pl-8"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={heroStagger}
          >
            <motion.p variants={heroItem} className="text-brand-gold tracking-[0.3em] text-base uppercase mb-8">
              {lang === "ar"
                ? "الاستشارية والإرشاد النفسي ومؤسسة مركز الياسمين"
                : "Psychological Counselor & Founder of Al Yasmine Center"}
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="font-display font-extrabold text-brand-teal leading-[0.9]"
              style={{
                fontSize: lang === "ar" ? "clamp(3.5rem, 12vw, 11rem)" : "clamp(4rem, 9vw, 9rem)",
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
            >
              {lang === "ar" ? "علياء البحري" : "Alia AlBahri"}
            </motion.h1>

            <motion.div
              variants={heroItem}
              className="w-20 h-px my-8 animate-shimmer"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
            />

            <motion.div variants={heroItem} className="flex flex-wrap gap-3">
              {(lang === "ar"
                ? ["العلاج المعرفي السلوكي CBT", "+20 عامًا خبرة", "+2000 قصة تغيير"]
                : ["CBT", "20+ Years", "2000+ Transformations"]
              ).map((label) => (
                <span
                  key={label}
                  className="border border-brand-teal/20 text-brand-teal/70 text-xs px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.p variants={heroItem} className="text-brand-dark/50 text-sm leading-relaxed max-w-sm mt-8">
              {lang === "ar"
                ? "أؤمن أن كل امرأة تستحق أن تفهم نفسها وتعيش بطمأنينة وسلام مع ذاتها."
                : "I believe every woman deserves to understand herself and live in peace and serenity with who she is."}
            </motion.p>
          </motion.div>

          {/* Right column — portrait card */}
          <motion.div
            className="w-full lg:w-[40%] flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative lg:-translate-x-8">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-brand-blush/40 blur-[100px] rounded-full" />
              <div className="absolute -z-10 top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-brand-gold/[0.08] blur-[70px] rounded-full" />
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[22rem] md:h-[22rem] opacity-[0.06] pointer-events-none"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="95" fill="none" stroke="#ECA200" strokeWidth="0.5" />
              </svg>
              <motion.div
                className="relative w-56 h-80 md:w-72 md:h-96 rounded-t-[200px] rounded-b-3xl overflow-hidden border border-brand-gold/20 shadow-2xl shadow-brand-blush/20"
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/aliyah-hero-cropped.png"
                  alt="Alia AlBahri"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 224px, 288px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 1. HER STORY ── */}
      <Section className="bg-brand-cream">
        <div className="relative section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start py-20">
          <span
            className="absolute -top-8 start-4 font-display text-brand-blush/[0.07] pointer-events-none select-none leading-none"
            style={{ fontSize: "clamp(10rem, 22vw, 18rem)" }}
            aria-hidden="true"
          >
            {lang === "ar" ? "1" : "1"}
          </span>

          <div className="relative border-s-2 border-solid border-brand-blush ps-8">
            <p className="text-brand-gold text-base tracking-[0.2em] uppercase mb-4">{t("about.storyEyebrow")}</p>
            <h2
              className="font-display font-extrabold text-brand-teal"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {t("about.storyHeading")}
            </h2>
            <div className="w-12 h-px bg-brand-gold mt-6" />
          </div>

          <div className="relative border-s-2 border-brand-blush/30 ps-8">
            <p
              className={`text-brand-dark/60 text-sm leading-[1.8] mb-6 ${lang === 'ar' ? 'font-display' : ''}`}
              style={lang === 'ar' ? { direction: 'rtl' } : undefined}
            >
              {lang === 'ar'
                ? 'تؤمن علياء البحري أن كل امرأة تستحق أن تعيش بطمأنينة وسلام مع ذاتها، وأن التغيير الحقيقي يبدأ عندما تفهم نفسها بعمق وتمنحها ما تستحقه من اهتمام ورعاية.'
                : 'Alia AlBahri believes that every woman deserves to live in serenity and peace with herself, and that real change begins when she understands herself deeply and gives herself the care and attention she deserves.'}
            </p>
            <p
              className={`text-brand-dark/60 text-sm leading-[1.8] mb-6 ${lang === 'ar' ? 'font-display' : ''}`}
              style={lang === 'ar' ? { direction: 'rtl' } : undefined}
            >
              {lang === 'ar'
                ? 'منذ أكثر من عشرين عامًا، رافقت آلاف النساء في رحلتهن نحو التحرر من القلق والخوف والتفكير الزائد واستعادة الثقة والاتزان النفسي.'
                : 'For more than twenty years, she has accompanied thousands of women on their journey toward freedom from anxiety, fear, and overthinking, and toward restoring their confidence and psychological balance.'}
            </p>
            <p
              className={`text-brand-dark/60 text-sm leading-[1.8] mb-6 ${lang === 'ar' ? 'font-display' : ''}`}
              style={lang === 'ar' ? { direction: 'rtl' } : undefined}
            >
              {lang === 'ar'
                ? 'تخصصت في العلاج المعرفي السلوكي CBT، وأسست مركز الياسمين ليكون مساحة آمنة تجمع بين العلم والخبرة والإنسانية، حيث يتحول الفهم إلى تغيير، والتغيير إلى أسلوب حياة.'
                : 'She specialised in Cognitive Behavioural Therapy (CBT) and founded Al Yasmine Center as a safe space that brings together knowledge, experience, and humanity, where understanding turns into change, and change becomes a way of life.'}
            </p>
            <p
              className={`text-brand-dark/60 text-sm leading-[1.8] ${lang === 'ar' ? 'font-display' : ''}`}
              style={lang === 'ar' ? { direction: 'rtl' } : undefined}
            >
              {lang === 'ar'
                ? 'جلساتها العلاجية منظمة ومبنية على أسس علمية تمنحك الأدوات التي تحتاجينها لتعيشي حياة أكثر اتزانًا ووعيًا وسلامًا نفسيًا، لأن هدفها ليس أن تشعري بالتحسن مؤقتًا، بل أن تمتلكي المهارات التي تبقى معك مدى الحياة.'
                : 'Her therapy sessions are structured and grounded in scientific foundations, giving you the tools you need to live a life of greater balance, awareness, and inner peace, because her goal is not for you to feel better temporarily, but for you to own skills that stay with you for life.'}
            </p>
          </div>
        </div>
      </Section>

      {/* ── GRADIENT BRIDGE — Cream → Blush ── */}
      <div className="h-48 bg-gradient-to-b from-brand-cream to-[#FDCCBE33] pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── WHAT IS CBT ── */}
      <Section className="bg-brand-blush/20">
        <div className="section-container py-20">
          <p className="text-brand-gold text-base tracking-[0.2em] uppercase mb-4">{t("about.cbtEyebrow")}</p>
          <h2
            className="font-display font-extrabold text-brand-teal mb-16"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {t("about.cbtHeading")}
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {cbtCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden ${
                  ["", "md:mt-8", "md:mt-4"][i]
                } bg-white/40 backdrop-blur-md rounded-ss-[60px] rounded-ee-[60px] rounded-se-2xl rounded-es-2xl border-s-4 ${
                  ["border-s-[#ECA200]", "border-s-[#FDCCBE]", "border-s-[#7FB0B4]"][i]
                } p-8 shadow-md hover:shadow-xl transition-shadow duration-700`}
              >
                <span
                  className="absolute -top-4 end-4 font-display text-brand-blush/[0.08] pointer-events-none select-none leading-none"
                  style={{ fontSize: "7rem" }}
                  aria-hidden="true"
                >
                  {(lang === "ar" ? ["1", "2", "3"] : ["1", "2", "3"])[i]}
                </span>
                <h3 className="relative font-display font-extrabold text-lg text-brand-teal mb-3">{card.title}</h3>
                <p className="relative text-brand-dark/60 text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── GRADIENT BRIDGE — Blush → Teal ── */}
      <div className="h-48 bg-gradient-to-b from-[#FDCCBE33] to-brand-teal pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── THE SILSILA ── */}
      <section className="bg-brand-teal relative w-full min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,204,190,0.08)_0%,transparent_70%)] pointer-events-none" />

        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] opacity-[0.04] pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <g fill="none" stroke="#ECA200">
            <rect x="36" y="36" width="128" height="128" strokeWidth="0.5" />
            <rect x="36" y="36" width="128" height="128" strokeWidth="0.5" transform="rotate(45 100 100)" />
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
        <motion.div
          className="absolute top-[55%] left-[65%] w-20 h-20 bg-brand-gold/[0.05] rounded-full blur-2xl pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <Reveal className="relative z-10 px-6 py-20 max-w-3xl mx-auto" direction="up">
          <p className="text-brand-gold text-[19px] tracking-[0.3em] mb-8">{t("about.silsilaEyebrow")}</p>
          <h2
            className="font-display font-extrabold text-brand-cream mb-10"
            style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
          >
            {t("about.silsilaHeading")}
          </h2>

          <div ref={silsilaLineRef} className="flex justify-center mb-10">
            <motion.div
              className="h-px w-32 animate-shimmer"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
                transformOrigin: lang === "ar" ? "right center" : "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: silsilaLineInView ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <p className="text-brand-cream/70 max-w-2xl mx-auto leading-relaxed text-[15px] mb-6">
            {t("about.silsilaBody")}
          </p>

          <p className="text-brand-cream/60 max-w-2xl mx-auto leading-relaxed text-[15px] mb-10">
            {t("about.silsilaBody2")}
          </p>

          <p className="text-brand-gold/70 text-sm tracking-[0.15em]">
            {lang === "ar" ? "علياء البحري" : "Alia AlBahri"}
          </p>
        </Reveal>
      </section>

      {/* ── GRADIENT BRIDGE — Teal → Cream ── */}
      <div className="h-48 bg-gradient-to-b from-brand-teal to-brand-cream pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── CREDENTIALS ── */}
      <Section className="bg-brand-cream">
        <div className="section-container py-16">
          <p className="text-brand-gold text-base tracking-[0.2em] uppercase mb-3">{t("about.credentialsEyebrow")}</p>
          <h2 className="font-display font-extrabold text-brand-teal text-4xl mb-10">{t("about.credentialsHeading")}</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {credentialItems.map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="flex items-start gap-3 bg-white border border-brand-teal/10 rounded-2xl p-5"
                style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.06)" }}
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-gold shrink-0" aria-hidden="true" />
                <p className={`text-brand-dark/70 text-sm leading-relaxed ${lang === "ar" ? "font-display" : ""}`}>
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── GRADIENT BRIDGE — Cream → Teal ── */}
      <div className="h-48 bg-gradient-to-b from-brand-cream to-brand-teal pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── CTA — The Invitation ── */}
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
            <rect x="36" y="36" width="128" height="128" strokeWidth="0.5" />
            <rect x="36" y="36" width="128" height="128" strokeWidth="0.5" transform="rotate(45 100 100)" />
            <circle cx="100" cy="100" r="85" strokeWidth="0.3" />
            <circle cx="100" cy="100" r="55" strokeWidth="0.2" />
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
              className="w-px h-20 bg-gradient-to-b from-brand-gold/0 via-brand-gold to-brand-gold/0"
              style={{ transformOrigin: "top center" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: ctaLineInView ? 1 : 0, opacity: ctaLineInView ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate={ctaLineInView ? "visible" : "hidden"}
            variants={ctaStagger}
            className="flex flex-col items-center"
          >
            {t("about.ctaLead") && (
              <motion.p
                variants={ctaItem}
                className="font-display text-brand-cream tracking-[0.05em] mb-8"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {t("about.ctaLead")}
              </motion.p>
            )}

            <motion.div
              variants={ctaItem}
              className="w-16 h-px animate-shimmer mb-10"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
                backgroundSize: "200% auto",
              }}
            />

            <motion.h2
              variants={ctaItem}
              className="font-display font-extrabold text-brand-cream mb-6 text-balance"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("about.ctaHeading")}
            </motion.h2>

            <motion.p
              variants={ctaItem}
              className="text-sm text-brand-cream/40 max-w-sm mb-10 leading-relaxed"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("about.ctaBody")}
            </motion.p>

            <motion.div variants={ctaItem} className="relative mb-12">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-brand-blush/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Link
                href={`/${lang}/booking`}
                className="relative inline-block px-10 py-5 bg-brand-gold text-brand-dark rounded-full text-xs tracking-[0.15em] uppercase font-semibold hover:bg-brand-gold/90 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("about.ctaCta")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
