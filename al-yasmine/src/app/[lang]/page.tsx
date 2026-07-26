"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroCanvas } from "@/components/ui/hero-canvas";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { orderedServices } from "@/lib/config";
import { formatPrice, serviceWhatsAppHref } from "@/lib/utils";
import { CinematicWrapper } from "@/components/layout/CinematicWrapper";
import { getTranslator, type Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

function useLocale(): Locale {
  const params = useParams();
  return (params?.lang as Locale) || "en";
}

function MeetAlia() {
  const lang = useLocale();
  const t = getTranslator(lang);
  const isAr = lang === "ar";
  const credentials = [t("meetAlia.line1"), t("meetAlia.line2"), t("meetAlia.line3")];

  return (
    <section
      className="relative overflow-hidden py-10 md:py-24"
      style={{
        background:
          "linear-gradient(160deg, #F6F2E9 0%, #FDF0E8 45%, #FDCCBE33 100%)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(253,204,190,0.35)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(236,162,0,0.07)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative section-container">
        <Reveal direction="up" className="relative">
          {/* Yellow heading above the card */}
          <div className="text-center mb-5 md:mb-8">
            <h3
              className={`text-brand-gold mb-3 md:mb-4 mx-auto max-w-[18ch] md:max-w-none leading-[1.35] ${
                isAr
                  ? "font-display font-semibold text-[1.85rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[0.02em]"
                  : "font-semibold text-[1.5rem] sm:text-[1.85rem] md:text-[2.25rem] tracking-[0.12em] uppercase"
              }`}
            >
              {t("meetAlia.eyebrow")}
            </h3>
            <div className="flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px w-8 md:w-12 bg-brand-gold/40" />
              <svg
                width="16"
                height="11"
                viewBox="0 0 18 12"
                className="text-brand-gold/70"
              >
                <path
                  d="M9 1 C7 4, 4 5.5, 1 6 C4 6.5, 7 8, 9 11 C11 8, 14 6.5, 17 6 C14 5.5, 11 4, 9 1 Z"
                  fill="currentColor"
                />
              </svg>
              <span className="h-px w-8 md:w-12 bg-brand-gold/40" />
            </div>
          </div>

          {/* Soft composition card — side-by-side on all breakpoints */}
          <div className="relative grid grid-cols-[1.05fr_0.95fr] md:grid-cols-2 items-stretch overflow-hidden rounded-[1.35rem] md:rounded-[2.5rem] bg-[#FBF7F1] ring-1 ring-brand-gold/20 shadow-[0_28px_80px_-36px_rgba(3,90,96,0.35)]">
            {/* Corner botanical watermark */}
            <svg
              className="absolute bottom-0 end-0 w-24 h-24 md:w-48 md:h-48 text-brand-blush/45 pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M160 180 C140 140, 150 90, 175 55 C155 80, 120 95, 95 85 C115 110, 130 150, 125 180 Z"
                fill="currentColor"
                opacity="0.55"
              />
              <path
                d="M175 55 C165 70, 140 85, 120 80"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.7"
              />
              <path
                d="M95 85 C105 100, 115 130, 112 160"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>

            {/* Portrait column */}
            <div className="relative min-h-[240px] sm:min-h-[300px] md:min-h-[440px] lg:min-h-[520px]">
              <Image
                src="/images/alia-portrait.png"
                alt={t("meetAlia.name")}
                fill
                className="object-cover object-[center_12%]"
                sizes="(max-width: 768px) 52vw, 45vw"
                priority
              />
            </div>

            {/* Text column */}
            <div className="relative flex flex-col justify-center px-3.5 py-5 sm:px-6 sm:py-8 md:px-10 md:py-14 lg:px-14">
              <h2
                className="font-display font-extrabold text-brand-teal text-center leading-[1.15] mb-3 md:mb-5"
                style={{
                  fontSize: isAr
                    ? "clamp(1.35rem, 4.8vw, 3.4rem)"
                    : "clamp(1.4rem, 4.2vw, 3.5rem)",
                }}
              >
                {t("meetAlia.name")}
              </h2>

              <ul className="space-y-1 md:space-y-2 mb-3 md:mb-5 text-center">
                {credentials.map((line) => (
                  <li key={line}>
                    <p
                      className={`text-brand-dark/60 leading-snug ${
                        isAr
                          ? "font-display text-[10px] sm:text-xs md:text-sm"
                          : "text-[10px] sm:text-xs md:text-sm"
                      }`}
                    >
                      {line}
                    </p>
                  </li>
                ))}
              </ul>

              <p
                className={`text-brand-teal/80 text-center leading-[1.7] mb-5 md:mb-8 max-w-[16rem] sm:max-w-xs md:max-w-md mx-auto ${
                  isAr
                    ? "font-display text-[11px] sm:text-sm md:text-base"
                    : "font-display italic text-[11px] sm:text-sm md:text-base"
                }`}
              >
                {t("meetAlia.quote")}
              </p>

              <div className="flex justify-center">
                <Link
                  href={`/${lang}/about`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 text-brand-dark text-xs sm:text-sm md:text-base font-medium shadow-sm ring-1 ring-brand-gold/40 hover:bg-brand-gold/90 hover:scale-[1.02] transition-all"
                >
                  <span>{t("meetAlia.cta")}</span>
                  <span aria-hidden="true">{isAr ? "←" : "→"}</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  const lang = useLocale();
  const t = getTranslator(lang);

  const stats = [
    { value: "2000+", label: t("stats.clientsTransformed") },
    { value: "98%",  label: t("stats.satisfactionRate")   },
    { value: "4.9",  label: t("stats.averageRating")      },
    { value: "20+",  label: t("stats.yearsOfImpact")     },
  ];

  return (
    <section
      className="pt-24 pb-12"
      style={{ background: "linear-gradient(to bottom, #FDF0E8 0%, #FDF0E8 60%, #FDCCBE20 100%)" }}
    >
      <p className="text-brand-teal text-base tracking-[0.3em] uppercase font-extrabold text-center mb-12">
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
      numeral: lang === "ar" ? "1" : "1",
      title: t("whyAliyah.card1Title"),
      body: t("whyAliyah.card1Body"),
    },
    {
      numeral: lang === "ar" ? "2" : "2",
      title: t("whyAliyah.card2Title"),
      body: t("whyAliyah.card2Body"),
    },
    {
      numeral: lang === "ar" ? "3" : "3",
      title: t("whyAliyah.card3Title"),
      body: t("whyAliyah.card3Body"),
    },
    {
      numeral: lang === "ar" ? "4" : "4",
      title: t("whyAliyah.card4Title"),
      body: t("whyAliyah.card4Body"),
    },
    {
      numeral: lang === "ar" ? "5" : "5",
      title: t("whyAliyah.card5Title"),
      body: t("whyAliyah.card5Body"),
    },
  ];

  return (
    <section ref={sectionRef} className="pt-12 pb-24" style={{ background: "linear-gradient(to bottom, #FDCCBE20 0%, #FDCCBE26 20%, #FDCCBE26 60%, #FDCCBE 100%)" }}>
      <p className="text-brand-teal text-base tracking-[0.3em] uppercase font-medium text-center mb-4">
        {t("whyAliyah.eyebrow")}
      </p>
      <h2
        className="font-display font-extrabold text-brand-dark text-center mb-16"
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

      <StaggerReveal className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto px-6">
        {cards.map((c) => (
          <motion.div
            key={c.numeral}
            variants={staggerChild}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center shadow-sm border border-brand-blush/30 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
          >
            <p className="font-display text-4xl text-brand-blush mb-4">{c.numeral}</p>
            <h3 className="font-display font-extrabold text-brand-teal text-xl mb-3">{c.title}</h3>
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
          <p className="text-brand-gold text-base tracking-[0.3em] uppercase font-medium mb-3">{t("services.eyebrow")}</p>
          <h2
            className="font-display font-extrabold text-brand-dark"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {t("services.heading")}
          </h2>
        </Reveal>

        <StaggerReveal className="flex flex-wrap justify-center gap-5">
          {orderedServices.map((s) => (
            <motion.div
              key={s.id}
              variants={staggerChild}
              className="group p-7 rounded-3xl bg-white border-s-[3px] border-s-brand-blush shadow-sm hover:bg-brand-teal hover:border-s-brand-gold hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col gap-4 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
            >
              <span className="text-2xl text-brand-gold group-hover:text-brand-cream transition-colors duration-500 block">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-display font-extrabold text-xl text-brand-dark group-hover:text-brand-cream transition-colors duration-500 mb-1.5">{lang === "ar" ? s.titleAr : s.title}</h3>
                <span className="text-brand-dark/55 group-hover:text-brand-cream/70 transition-colors duration-500 leading-relaxed text-xs">
                  {lang === "ar" ? s.descriptionAr : s.description}
                </span>
                {"disclaimerAr" in s && s.disclaimerAr && (
                  <p className="mt-2 text-[10px] leading-snug text-brand-teal/70 group-hover:text-brand-cream/55 transition-colors duration-500">
                    {lang === "ar" ? s.disclaimerAr : s.disclaimer}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-brand-cream group-hover:border-brand-cream/20 transition-colors duration-500">
                <span className="text-brand-teal-light group-hover:text-brand-cream/60 transition-colors duration-500">
                  {lang === "ar" ? s.durationAr : s.duration}
                </span>
                {s.price ? (
                  <span className="font-semibold text-brand-teal group-hover:text-brand-gold transition-colors duration-500">
                    {formatPrice(s.price)}
                  </span>
                ) : (
                  <a
                    href={serviceWhatsAppHref(s.titleAr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-teal-light group-hover:text-brand-gold transition-colors duration-500 hover:underline"
                  >
                    {lang === "ar" ? "تواصلي معنا" : "Contact us"}
                  </a>
                )}
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

        <Reveal delay={0.3} className="text-center mt-12">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-teal text-brand-cream text-base font-semibold hover:bg-brand-teal/90 transition-all hover:scale-105 shadow-md"
          >
            {t("services.exploreAll")}
            <span aria-hidden="true">&rarr;</span>
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
        <p className="text-brand-gold text-base tracking-[0.4em] uppercase font-bold mb-12">
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
    <section className="bg-brand-teal pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-24 lg:pb-32">
      <Reveal className="section-container text-center max-w-lg mx-auto">
        <p className="text-brand-gold text-base tracking-[0.3em] uppercase font-medium mb-4">{t("bookingCta.eyebrow")}</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-brand-cream mb-4">
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
      <div className="h-32 bg-gradient-to-b from-black via-[#FDF0E8] to-[#F6F2E9] pointer-events-none" />
      <MeetAlia />
      <Stats />
      <WhyAliyah />
      <div className="h-32 bg-gradient-to-b from-[#FDCCBE] to-[#035A60] pointer-events-none" />
      <DarkStatement />
      <div className="h-32 bg-gradient-to-b from-[#035A60] to-[#F6F2E9] pointer-events-none" />
      <Services />
      <div className="h-48 bg-gradient-to-b from-brand-blush via-brand-blush/30 to-brand-teal pointer-events-none" />
      <BookingCTA />
    </CinematicWrapper>
  );
}
