"use client";

import React from "react";
import Link from "next/link";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { WaveDivider, CurveDivider } from "@/components/ui/dividers";
import { motion } from "framer-motion";

const CREAM = "#F6F2E9";
const WHITE = "#ffffff";
const TEAL  = "#035A60";

const modules = [
  { number: "01", title: "Understanding Yourself",    duration: "20 min", body: "Explore your core values, beliefs, and the patterns that have shaped your journey so far." },
  { number: "02", title: "Setting Intentional Goals", duration: "25 min", body: "Learn how to set goals that are truly aligned with who you are and where you want to go." },
  { number: "03", title: "Breaking Limiting Beliefs", duration: "30 min", body: "Identify and begin to dismantle the stories that have been holding you back from your potential." },
  { number: "04", title: "Building Daily Momentum",   duration: "20 min", body: "Create gentle rituals and habits that support your growth between coaching sessions." },
];

export default function FreeCoursePage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #024d52 0%, #035A60 50%, #047a82 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(236,162,0,0.13) 0%, transparent 60%)" }} />
        <div className="section-container relative z-10 max-w-3xl pt-16 pb-12">
          <Reveal>
            <span className="text-brand-gold text-[10px] tracking-[0.3em] uppercase font-medium mb-4 block">For Clients ✦</span>
            <h1 className="font-display font-light text-brand-cream mb-3 text-5xl md:text-6xl">Your Pre-Session Guide</h1>
            <div className="w-14 h-px bg-brand-gold my-6" />
            <p className="text-brand-cream/60 text-base leading-relaxed max-w-xl mb-8">
              This guide is shared with every client after booking — four short modules designed to help you arrive at your first session grounded, clear, and ready to make the most of your time with Aliyah.
            </p>
            <div className="flex flex-wrap gap-5 text-xs text-brand-cream/50">
              {["4 modules", "~95 min total", "Sent after booking", "For clients only"].map((item) => (
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
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">What's Inside</p>
            <h2 className="font-display font-light text-brand-dark mb-2">Four Modules to Prepare You</h2>
            <div className="brand-divider" />
            <p className="text-brand-dark/45 text-sm mt-4 max-w-md mx-auto">
              Each module takes under 30 minutes. Work through them at your own pace before your first session.
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
                    <h3 className="font-display text-xl text-brand-dark">{mod.title}</h3>
                    <span className="text-xs text-brand-teal-light bg-brand-cream px-3 py-1 rounded-full shrink-0">{mod.duration}</span>
                  </div>
                  <p className="text-sm text-brand-dark/55 leading-relaxed">{mod.body}</p>
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
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">How It Works</p>
            <h2 className="font-display font-light text-brand-dark mb-2">Shared After You Book</h2>
            <div className="brand-divider" />
          </Reveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "◇", step: "01", title: "Book a session",       body: "Choose your coaching program and book your first session with Aliyah." },
              { icon: "✦", step: "02", title: "Receive your guide",   body: "You'll receive a link to this guide as part of your confirmation email." },
              { icon: "❋", step: "03", title: "Arrive prepared",      body: "Work through the modules at your own pace before your first session." },
            ].map((s) => (
              <motion.div key={s.step} variants={staggerChild}
                className="bg-white rounded-3xl p-8 border border-[#ede8de]"
                style={{ boxShadow: "0 2px 16px rgba(3,90,96,0.04)" }}
              >
                <span className="text-2xl text-brand-teal block mb-4">{s.icon}</span>
                <p className="text-brand-gold text-[10px] tracking-[0.2em] uppercase font-medium mb-2">{s.step}</p>
                <h4 className="font-display text-lg text-brand-dark mb-2">{s.title}</h4>
                <p className="text-xs text-brand-dark/55 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
        <div className="-mb-1"><CurveDivider from={CREAM} to={TEAL} /></div>
      </section>

      {/* CTA */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-10">
          <h2 className="font-display font-light text-3xl mb-3">Ready to get started?</h2>
          <p className="text-brand-cream/55 mb-8 text-sm leading-relaxed">
            Book your session with Aliyah and you'll receive access to this guide as part of your welcome package.
          </p>
          <Link href="/booking"
            className="inline-block px-8 py-4 bg-brand-gold text-brand-dark rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105">
            Book Your Session
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
