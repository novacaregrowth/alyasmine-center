"use client";

import React from "react";
import Link from "next/link";
import { pricingPlans } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="pt-20">

      <section className="relative" style={{ background: "linear-gradient(160deg,#f6f2e9 0%,#eef6f6 100%)" }}>
        <div className="section-container max-w-2xl mx-auto text-center pt-16 pb-12">
          <Reveal>
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">Investment</p>
            <h1 className="font-display font-light text-brand-dark mb-3">Simple, Transparent Pricing</h1>
            <div className="brand-divider" />
            <p className="text-brand-dark/55 text-base mt-5 leading-relaxed">Every plan includes our full support and commitment to your growth.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pt-6 pb-8">
        <div className="section-container py-16">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {pricingPlans.map((plan) => (
              <motion.div key={plan.id} variants={staggerChild}
                className={`relative rounded-3xl p-8 flex flex-col gap-6 ${
                  plan.highlighted
                    ? "bg-brand-teal text-brand-cream shadow-2xl shadow-brand-teal/25 md:scale-105"
                    : "border border-[#ede8de] bg-white"
                }`}
                style={!plan.highlighted ? { boxShadow: "0 2px 20px rgba(3,90,96,0.05)" } : {}}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">{plan.badge}</span>
                  </div>
                )}
                <div>
                  <h3 className={`font-display text-2xl mb-0.5 ${plan.highlighted ? "text-brand-cream" : "text-brand-dark"}`}>{plan.name}</h3>
                  {plan.nameAr && <p className={`arabic text-sm ${plan.highlighted ? "text-brand-cream/55" : "text-brand-teal-light"}`} lang="ar">{plan.nameAr}</p>}
                  <p className={`text-xs mt-2 leading-relaxed ${plan.highlighted ? "text-brand-cream/55" : "text-brand-dark/45"}`}>{plan.description}</p>
                </div>
                <div className={`pb-5 border-b ${plan.highlighted ? "border-brand-cream/20" : "border-[#ede8de]"}`}>
                  <span className="font-display text-4xl font-light">{formatPrice(plan.price)}</span>
                  <span className={`text-xs ml-1 ${plan.highlighted ? "text-brand-cream/45" : "text-brand-dark/35"}`}>/ {plan.period}</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.highlighted ? "text-brand-gold" : "text-brand-teal"}`} />
                      <span className={plan.highlighted ? "text-brand-cream/75" : "text-brand-dark/65"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking"
                  className={`block text-center px-5 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                    plan.highlighted ? "bg-brand-gold text-brand-dark hover:bg-brand-gold/90" : "bg-brand-teal text-brand-cream hover:bg-brand-teal/90"
                  }`}
                >{plan.cta}</Link>
              </motion.div>
            ))}
          </StaggerReveal>
          <Reveal delay={0.3} className="text-center mt-10">
            <p className="text-xs text-brand-dark/35">All prices in AED. Payment plans available. <Link href="/booking" className="text-brand-teal hover:underline">Talk to us</Link> about custom options.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-14">
          <span className="text-5xl block mb-4">❋</span>
          <h2 className="font-display text-3xl font-light text-brand-dark mb-3">Our Promise</h2>
          <p className="text-brand-dark/55 leading-relaxed text-sm">
            If you&apos;re not satisfied after your first session, we&apos;ll refund it in full. No questions asked.
          </p>
        </Reveal>
      </section>

    </div>
  );
}
