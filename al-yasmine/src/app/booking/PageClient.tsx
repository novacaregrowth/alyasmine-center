"use client";

import React from "react";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";
import AIChatCard from "@/components/ui/ai-chat";
import { Reveal } from "@/components/ui/reveal";
import { WaveDivider, CurveDivider } from "@/components/ui/dividers";
import { siteConfig } from "@/lib/config";

const CREAM = "#F6F2E9";
const WHITE = "#ffffff";
const TEAL  = "#035A60";

export default function BookingPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="relative pb-8" style={{ background: "linear-gradient(160deg,#f6f2e9 0%,#eef6f6 100%)" }}>
        <div className="section-container max-w-2xl mx-auto text-center pt-16 pb-12">
          <Reveal>
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">Let&apos;s Connect</p>
            <h1 className="font-display font-light text-brand-dark mb-3">Book Your Session</h1>
            <div className="brand-divider" />
            <p className="text-brand-dark/55 mt-5 text-sm leading-relaxed">
              Your first discovery call is completely free. Pick a time that works for you below.
            </p>
          </Reveal>
        </div>
        <WaveDivider from="transparent" to={WHITE} />
      </section>

      {/* Pre-booking AI chat */}
      <section className="bg-white pt-6 pb-8">
        <div className="section-container py-16">
          <div className="flex flex-col lg:flex-row items-center gap-14 max-w-5xl mx-auto">
            <Reveal direction="right" className="flex-1 max-w-md">
              <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">Before You Book</p>
              <h2 className="font-display font-light text-brand-dark text-3xl md:text-4xl mb-4">Have a question?</h2>
              <p className="text-brand-dark/55 leading-relaxed text-sm mb-6">
                Not sure which session is right for you? Chat with our coaching assistant first.
              </p>
              <ul className="space-y-3 text-sm text-brand-dark/60">
                {["Which program fits my goals?","What happens in the first session?","Do you offer online sessions?"].map((q) => (
                  <li key={q} className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 shrink-0">✦</span>{q}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal direction="left" className="flex justify-center">
              <AIChatCard />
            </Reveal>
          </div>
        </div>
        <div className="-mb-1"><WaveDivider from={WHITE} to={CREAM} flip /></div>
      </section>

      {/* Calendly */}
      <section className="bg-brand-cream pt-6 pb-8">
        <div className="section-container max-w-4xl mx-auto py-14">
          <Reveal className="text-center mb-10">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">Schedule</p>
            <h2 className="font-display font-light text-brand-dark text-3xl">Choose Your Time</h2>
            <div className="brand-divider" />
          </Reveal>
          <Reveal delay={0.15}><CalendlyEmbed url={siteConfig.calendlyUrl} /></Reveal>
        </div>
        <div className="-mb-1"><CurveDivider from={CREAM} to={WHITE} /></div>
      </section>

      {/* What to expect */}
      <section className="bg-white pt-6 pb-20">
        <div className="section-container max-w-3xl mx-auto py-14">
          <Reveal className="text-center mb-12">
            <h2 className="font-display font-light text-brand-dark text-3xl mb-2">What to Expect</h2>
            <div className="brand-divider" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "◇", step: "1", title: "Book Your Slot",       body: "Pick a date and time that suits your schedule." },
              { icon: "✦", step: "2", title: "Receive Confirmation", body: "You'll get a Zoom link and a short prep guide." },
              { icon: "❋", step: "3", title: "Your Session",         body: "Show up as you are. We'll take it from there." },
            ].map((s) => (
              <Reveal key={s.step} delay={Number(s.step) * 0.1}>
                <div className="p-8 rounded-3xl border border-[#ede8de] bg-white hover:border-brand-teal/20 hover:shadow-sm transition-all"
                  style={{ boxShadow: "0 2px 16px rgba(3,90,96,0.04)" }}>
                  <span className="text-3xl text-brand-teal block mb-3">{s.icon}</span>
                  <h4 className="font-display text-lg text-brand-dark mb-2">{s.title}</h4>
                  <p className="text-xs text-brand-dark/55 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
