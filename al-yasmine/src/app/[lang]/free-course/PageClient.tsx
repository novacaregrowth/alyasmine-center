"use client";

import React from "react";
import Link from "next/link";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { WaveDivider, CurveDivider } from "@/components/ui/dividers";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getTranslator, type Locale } from "@/lib/i18n";

const CREAM = "#F6F2E9";
const WHITE = "#ffffff";
const TEAL  = "#035A60";

export default function FreeCoursePage() {
  const params = useParams();
  const lang = (params?.lang as Locale) || "en";
  const t = getTranslator(lang);
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const modules = [
    { number: isAr ? "٠١" : "01", titleKey: "module1Title", durationKey: "module1Duration", bodyKey: "module1Body" },
    { number: isAr ? "٠٢" : "02", titleKey: "module2Title", durationKey: "module2Duration", bodyKey: "module2Body" },
    { number: isAr ? "٠٣" : "03", titleKey: "module3Title", durationKey: "module3Duration", bodyKey: "module3Body" },
    { number: isAr ? "٠٤" : "04", titleKey: "module4Title", durationKey: "module4Duration", bodyKey: "module4Body" },
  ];

  const steps = [
    { icon: "◇", step: isAr ? "٠١" : "01", titleKey: "step1Title", bodyKey: "step1Body" },
    { icon: "✦", step: isAr ? "٠٢" : "02", titleKey: "step2Title", bodyKey: "step2Body" },
    { icon: "❋", step: isAr ? "٠٣" : "03", titleKey: "step3Title", bodyKey: "step3Body" },
  ];

  const pills = [
    t("freeCoursePage.pill1"),
    t("freeCoursePage.pill2"),
    t("freeCoursePage.pill3"),
    t("freeCoursePage.pill4"),
  ];

  return (
    <div className="pt-20" dir={dir}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #024d52 0%, #035A60 50%, #047a82 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(236,162,0,0.13) 0%, transparent 60%)" }} />
        <div className="section-container relative z-10 max-w-3xl pt-16 pb-12">
          <Reveal>
            <span className="text-brand-gold text-[10px] tracking-[0.3em] uppercase font-medium mb-4 block">{t("freeCoursePage.heroEyebrow")} ✦</span>
            <h1 className="font-display font-light text-brand-cream mb-3 text-5xl md:text-6xl">{t("freeCoursePage.heroHeading")}</h1>
            <div className="w-14 h-px bg-brand-gold my-6" />
            <p className="text-brand-cream/60 text-base leading-relaxed max-w-xl mb-8">
              {t("freeCoursePage.heroBody")}
            </p>
            <div className="flex flex-wrap gap-5 text-xs text-brand-cream/50">
              {pills.map((item) => (
                <span key={item} className="flex items-center gap-1.5"><span className="text-brand-gold">✦</span>{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <WaveDivider from="transparent" to={WHITE} />
      </section>

      {/* Modules */}
      <section className="bg-white pt-6 pb-8">
        <div className="section-container max-w-3xl mx-auto py-16">
          <Reveal className="text-center mb-14">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">{t("freeCoursePage.modulesEyebrow")}</p>
            <h2 className="font-display font-light text-brand-dark mb-2">{t("freeCoursePage.modulesHeading")}</h2>
            <div className="brand-divider" />
            <p className="text-brand-dark/45 text-sm mt-4 max-w-md mx-auto">
              {t("freeCoursePage.modulesBody")}
            </p>
          </Reveal>

          <StaggerReveal className="space-y-4">
            {modules.map((mod) => (
              <motion.div key={mod.number} variants={staggerChild}
                className="group flex gap-6 items-start p-8 rounded-3xl border border-[#ede8de] bg-white"
                style={{ boxShadow: "0 2px 16px rgba(3,90,96,0.04)" }}
              >
                <span className="font-display text-5xl font-light text-brand-teal/12 leading-none shrink-0 w-12 group-hover:text-brand-teal/22 transition-colors">{mod.number}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-xl text-brand-dark">{t(`freeCoursePage.${mod.titleKey}`)}</h3>
                    <span className="text-xs text-brand-teal-light bg-brand-cream px-3 py-1 rounded-full shrink-0">{t(`freeCoursePage.${mod.durationKey}`)}</span>
                  </div>
                  <p className="text-sm text-brand-dark/55 leading-relaxed">{t(`freeCoursePage.${mod.bodyKey}`)}</p>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
        <div className="-mb-1"><CurveDivider from={WHITE} to={CREAM} /></div>
      </section>

      {/* How you get access */}
      <section className="bg-brand-cream pt-6 pb-8">
        <div className="section-container max-w-2xl mx-auto py-16">
          <Reveal className="text-center mb-12">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">{t("freeCoursePage.howEyebrow")}</p>
            <h2 className="font-display font-light text-brand-dark mb-2">{t("freeCoursePage.howHeading")}</h2>
            <div className="brand-divider" />
          </Reveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {steps.map((s) => (
              <motion.div key={s.step} variants={staggerChild}
                className="bg-white rounded-3xl p-8 border border-[#ede8de]"
                style={{ boxShadow: "0 2px 16px rgba(3,90,96,0.04)" }}
              >
                <span className="text-2xl text-brand-teal block mb-4">{s.icon}</span>
                <p className="text-brand-gold text-[10px] tracking-[0.2em] uppercase font-medium mb-2">{s.step}</p>
                <h4 className="font-display text-lg text-brand-dark mb-2">{t(`freeCoursePage.${s.titleKey}`)}</h4>
                <p className="text-xs text-brand-dark/55 leading-relaxed">{t(`freeCoursePage.${s.bodyKey}`)}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
        <div className="-mb-1"><CurveDivider from={CREAM} to={TEAL} /></div>
      </section>

      {/* CTA */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-10">
          <h2 className="font-display font-light text-3xl mb-3">{t("freeCoursePage.ctaHeading")}</h2>
          <p className="text-brand-cream/55 mb-8 text-sm leading-relaxed">
            {t("freeCoursePage.ctaBody")}
          </p>
          <Link href={`/${lang}/booking`}
            className="inline-block px-8 py-4 bg-brand-gold text-brand-dark rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105">
            {t("freeCoursePage.ctaButton")}
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
