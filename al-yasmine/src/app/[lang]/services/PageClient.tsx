"use client";

import React from "react";
import Link from "next/link";
import { services } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function ServicesPage() {
  const params = useParams();
  const lang = (params?.lang as Locale) || "en";

  return (
    <div className="pt-20">

      <section className="relative" style={{ background: "linear-gradient(160deg,#f6f2e9 0%,#eef6f6 100%)" }}>
        <div className="section-container max-w-3xl pt-16 pb-12">
          <Reveal>
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">What We Offer</p>
            <h1 className="font-display font-light text-brand-dark mb-4">Our Services</h1>
            <div className="brand-divider mx-0" />
            <p className="text-brand-dark/55 text-lg mt-6 max-w-xl leading-relaxed">
              Whether you&apos;re just starting out or ready for deep transformation, we have a program designed for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pt-6 pb-8">
        <div className="section-container py-16">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {services.map((s) => (
              <motion.div key={s.id} variants={staggerChild}
                className="group p-10 rounded-3xl border border-[#ede8de] bg-white hover:border-brand-teal/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6"
                style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.04)" }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-5xl">{s.icon}</span>
                  <div className="text-right">
                    <p className="font-display text-2xl font-light text-brand-teal">{formatPrice(s.price)}</p>
                    <p className="text-xs text-brand-dark/35 mt-0.5">per {s.duration}</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-brand-dark mb-1">{s.title}</h2>
                  {s.titleAr && <p className="arabic text-brand-teal-light text-sm mb-3" lang="ar">{s.titleAr}</p>}
                  <p className="text-brand-dark/55 leading-relaxed text-sm">{s.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#ede8de] flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-brand-cream text-brand-teal">{s.duration}</span>
                  <Link href={`/${lang}/booking`}>
                    <InteractiveHoverButton text="Book this" className="border-brand-teal text-brand-teal w-28 h-9 text-xs"
                      style={{ "--primary": "#035A60", "--primary-foreground": "#F6F2E9" } as React.CSSProperties} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-brand-cream pt-6 pb-20">
        <div className="section-container max-w-2xl mx-auto py-14">
          <Reveal className="text-center mb-12">
            <h2 className="font-display font-light text-brand-dark mb-2">Frequently Asked</h2>
            <div className="brand-divider" />
          </Reveal>
          <StaggerReveal className="space-y-4">
            {[
              { q: "How do I know which service is right for me?", a: "Book a free discovery call and we'll guide you to the perfect fit for your goals and budget." },
              { q: "Are sessions online or in-person?",            a: "Both options are available — online via Zoom or in-person at our center." },
              { q: "Do you offer payment plans?",                   a: "Yes! We offer installment options for our Bloom and Intensive programs." },
            ].map((faq) => (
              <motion.div key={faq.q} variants={staggerChild}
                className="bg-white rounded-2xl p-7 border border-[#ede8de]"
                style={{ boxShadow: "0 2px 16px rgba(3,90,96,0.04)" }}
              >
                <h4 className="font-medium text-brand-dark mb-2 text-sm">{faq.q}</h4>
                <p className="text-xs text-brand-dark/55 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

    </div>
  );
}
