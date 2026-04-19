"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroCanvas } from "@/components/ui/hero-canvas";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { services } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { CinematicWrapper } from "@/components/layout/CinematicWrapper";
import { getTranslator, type Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

function useLocale(): Locale {
  const params = useParams();
  return (params?.lang as Locale) || "en";
}

function Stats() {
  const lang = useLocale();
  const t = getTranslator(lang);

  const stats = [
    { value: "2000+", label: t("stats.clientsTransformed") },
    { value: "98%",  label: t("stats.satisfactionRate")   },
    { value: "10+",  label: t("stats.yearsOfImpact")     },
    { value: "4.9",  label: t("stats.averageRating")      },
  ];

  return (
    <section
      className="pt-24 pb-12"
      style={{ background: "linear-gradient(to bottom, #FDF0E8 0%, #FDF0E8 60%, #FDCCBE20 100%)" }}
    >
      <p className="text-brand-teal text-xs tracking-[0.3em] uppercase font-medium text-center mb-12">
        {t("stats.label")}
      </p>
      <StaggerReveal className="section-container flex flex-wrap justify-center items-center gap-y-10">
        {stats.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <div className="hidden md:block w-px h-12 bg-brand-blush mx-auto" />
            )}
            <motion.div variants={staggerChild} className="w-1/2 md:flex-1 text-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-blush opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 pointer-events-none" />
                <p className="font-display text-5xl text-brand-teal font-medium mb-1">{s.value}</p>
                <p className="text-brand-charcoal/50 text-xs tracking-widest uppercase">{s.label}</p>
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </StaggerReveal>
    </section>
  );
}

function WhyAliyah() {
  const lang = useLocale();
  const t = getTranslator(lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cards = [
    {
      numeral: lang === "ar" ? "١" : "1",
      title: t("whyAliyah.card1Title"),
      body: t("whyAliyah.card1Body"),
    },
    {
      numeral: lang === "ar" ? "٢" : "2",
      title: t("whyAliyah.card2Title"),
      body: t("whyAliyah.card2Body"),
    },
    {
      numeral: lang === "ar" ? "٣" : "3",
      title: t("whyAliyah.card3Title"),
      body: t("whyAliyah.card3Body"),
    },
  ];

  return (
    <section ref={sectionRef} className="pt-12 pb-24" style={{ background: "linear-gradient(to bottom, #FDCCBE20 0%, #FDCCBE26 20%, #FDCCBE26 60%, #FDCCBE 100%)" }}>
      <p className="text-brand-teal text-xs tracking-[0.3em] uppercase font-medium text-center mb-4">
        {t("whyAliyah.eyebrow")}
      </p>
      <h2
        className="font-display font-normal text-brand-dark text-center mb-16"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
      >
        {t("whyAliyah.heading")}
      </h2>

      <div className="relative w-full flex justify-center mb-12">
        <svg width="600" height="60" viewBox="0 0 600 60" fill="none" className="w-full max-w-2xl">
          <motion.path
            d="M 0 30 Q 150 10 300 30 Q 450 50 600 30"
            stroke="#ECA200"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            style={{ pathLength, opacity: pathLength }}
          />
        </svg>
      </div>

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
        {cards.map((c) => (
          <motion.div
            key={c.numeral}
            variants={staggerChild}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center shadow-sm border border-brand-blush/30"
          >
            <p className="font-display text-4xl text-brand-blush mb-4">{c.numeral}</p>
            <h3 className="font-display font-[200] text-brand-teal text-xl mb-3">{c.title}</h3>
            <p className="text-brand-charcoal/60 text-sm leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </StaggerReveal>

      <div className="w-24 h-px bg-brand-blush mx-auto mt-16" />
    </section>
  );
}

function Services() {
  const lang = useLocale();
  const t = getTranslator(lang);

  return (
    <section className="py-24" style={{ background: "linear-gradient(to bottom, #F6F2E9 0%, #F6F2E9 80%, #FDCCBE 100%)" }}>
      <div className="section-container">
        <Reveal className="text-center mb-14">
          <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">{t("services.eyebrow")}</p>
          <h2
            className="font-display font-medium text-brand-dark"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {t("services.heading")}
          </h2>
        </Reveal>

        <StaggerReveal className="flex flex-wrap justify-center gap-5">
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={staggerChild}
              className="group p-7 rounded-3xl bg-white border-s-[3px] border-s-brand-blush shadow-sm hover:bg-brand-teal hover:border-s-brand-gold hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col gap-4 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
            >
              <span className="text-2xl text-brand-gold group-hover:text-brand-cream transition-colors duration-500 block">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-display text-xl text-brand-dark group-hover:text-brand-cream transition-colors duration-500 mb-1.5">{lang === "ar" ? s.titleAr : s.title}</h3>
                <p className="text-xs text-brand-dark/55 group-hover:text-brand-cream/70 transition-colors duration-500 leading-relaxed">{lang === "ar" ? s.descriptionAr : s.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-brand-cream group-hover:border-brand-cream/20 transition-colors duration-500">
                <span className="text-brand-teal-light group-hover:text-brand-cream/60 transition-colors duration-500">
                  {lang === "ar" ? s.durationAr : s.duration}
                </span>
                <span className={`${s.price ? "font-semibold text-brand-teal" : "text-brand-teal-light"} group-hover:text-brand-gold transition-colors duration-500`}>
                  {s.price ? formatPrice(s.price) : lang === "ar" ? "تواصلي معنا" : "Contact us"}
                </span>
              </div>
              <Link
                href={`/${lang}/services#${s.id}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-teal group-hover:text-brand-gold transition-colors duration-500 tracking-wide"
              >
                {t("servicesPage.learnMore")}
                <span className="inline-block text-[10px] ms-0.5 rtl:-scale-x-100" aria-hidden>
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </StaggerReveal>

        <Reveal delay={0.3} className="text-center mt-10">
          <Link href={`/${lang}/services`} className="text-xs text-brand-teal font-medium hover:underline underline-offset-4 tracking-wide">
            {t("services.exploreAll")} &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const textTestimonials = {
  en: [
    {
      quote: "[PLACEHOLDER — Client testimonial 1]",
      author: "[PLACEHOLDER]",
      role: "[PLACEHOLDER]",
    },
    {
      quote: "[PLACEHOLDER — Client testimonial 2]",
      author: "[PLACEHOLDER]",
      role: "[PLACEHOLDER]",
    },
    {
      quote: "[PLACEHOLDER — Client testimonial 3]",
      author: "[PLACEHOLDER]",
      role: "[PLACEHOLDER]",
    },
  ],
  ar: [
    {
      quote: "[نص شهادة عميلة — سيُستبدل عند التوفر]",
      author: "[الاسم]",
      role: "[التعريف]",
    },
    {
      quote: "[نص شهادة عميلة — سيُستبدل عند التوفر]",
      author: "[الاسم]",
      role: "[التعريف]",
    },
    {
      quote: "[نص شهادة عميلة — سيُستبدل عند التوفر]",
      author: "[الاسم]",
      role: "[التعريف]",
    },
  ],
};

function Testimonials() {
  const lang = useLocale();
  const t = getTranslator(lang);
  const items = lang === "ar" ? textTestimonials.ar : textTestimonials.en;

  return (
    <section className="bg-brand-blush py-24">
      <div className="section-container">
        <Reveal className="text-center mb-16">
          <p className="text-brand-teal text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t("testimonials.eyebrow")}
          </p>
          <h2
            className="font-display font-medium text-brand-teal"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {t("testimonials.heading")}
          </h2>
          <div className="w-16 h-px bg-brand-teal/30 mx-auto mt-6" />
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-brand-blush shadow-sm flex flex-col"
            >
              <div
                className="font-display text-brand-teal/20 leading-none select-none mb-4"
                style={{ fontSize: "5rem", lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </div>
              <p
                className="text-brand-dark/75 leading-relaxed flex-1 mb-6"
                style={{ fontSize: "0.9375rem" }}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {item.quote}
              </p>
              <div className="border-t border-brand-blush/60 pt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-teal font-display font-semibold text-sm">
                    {item.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-brand-teal text-sm">{item.author}</p>
                  <p className="text-brand-dark/40 text-xs mt-0.5">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        <Reveal delay={0.3} className="text-center mt-12">
          <Link
            href={`/${lang}/proof`}
            className="inline-block px-6 py-2.5 border border-brand-teal/40 text-brand-teal rounded-full text-xs font-medium hover:bg-brand-teal hover:text-brand-cream hover:border-brand-teal transition-all duration-300"
          >
            {t("testimonials.seeAll")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function DarkStatement() {
  const lang = useLocale();
  const t = getTranslator(lang);
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: quoteScroll } = useScroll({
    target: quoteRef,
    offset: ["start end", "center center"],
  });
  const quoteOpacity = useTransform(quoteScroll, [0, 1], [0, 1]);
  const quoteScale = useTransform(quoteScroll, [0, 1], [0.95, 1]);

  return (
    <motion.section
      ref={quoteRef}
      className="relative min-h-screen flex items-center justify-center bg-brand-teal py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,204,190,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        style={{ opacity: quoteOpacity, scale: quoteScale }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-brand-gold text-xs tracking-[0.4em] uppercase font-light mb-12">
          {t("darkStatement.eyebrow")}
        </p>
        <p
          className="font-display font-normal text-brand-cream leading-relaxed mb-12"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {t("darkStatement.quote")}
        </p>
        <div className="w-12 h-px bg-brand-gold mx-auto mb-6" />
        <p className="text-brand-blush/70 text-sm tracking-widest">{t("darkStatement.attribution")}</p>
      </motion.div>
    </motion.section>
  );
}

function BookingCTA() {
  const lang = useLocale();
  const t = getTranslator(lang);

  return (
    <section className="bg-brand-teal py-32">
      <Reveal className="section-container text-center max-w-lg mx-auto">
        <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">{t("bookingCta.eyebrow")}</p>
        <h2 className="font-display font-medium text-4xl md:text-5xl text-brand-cream mb-4">
          {t("bookingCta.heading")}
        </h2>
        <p className="text-brand-cream/60 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
          {t("bookingCta.body")}
        </p>
        <div className="relative inline-block">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-brand-blush pointer-events-none"
          />
          <Link
            href={`/${lang}/booking`}
            className="relative inline-block bg-brand-gold text-brand-dark rounded-full px-10 py-4 font-medium text-sm hover:scale-105 transition-transform"
          >
            {t("bookingCta.cta")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function HomePage() {
  const lang = useLocale();

  return (
    <CinematicWrapper>
      <HeroCanvas lang={lang} />
      <Stats />
      <WhyAliyah />
      <div className="h-16 bg-gradient-to-b from-[#FDCCBE] to-[#035A60] pointer-events-none" />
      <DarkStatement />
      <div className="h-16 bg-gradient-to-b from-[#035A60] to-[#F6F2E9] pointer-events-none" />
      <Services />
      <Testimonials />
      <div className="h-32 bg-gradient-to-b from-[#FDCCBE] to-[#035A60] pointer-events-none" />
      <BookingCTA />
    </CinematicWrapper>
  );
}
