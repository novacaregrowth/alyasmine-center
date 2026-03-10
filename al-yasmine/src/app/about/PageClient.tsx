"use client";

import React from "react";
import Link from "next/link";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div>

      {/* Full-bleed Aliyah Hero */}
      <section className="relative w-full bg-black">
        <img
          src="/images/aliyah-hero-cropped.png"
          alt="Aliyah Al Bahari"
          className="block w-full h-auto"
        />

        {/* Top gradient connecting to navbar */}
        <div className="absolute top-0 left-0 w-full h-48 z-10 bg-gradient-to-b from-black/70 to-transparent" />

        {/* Bottom gradient for quote legibility */}
        <div className="absolute bottom-0 left-0 w-full h-64 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Credentials block */}
        <Reveal className="absolute top-0 left-0 z-20 p-12 md:p-24 max-w-lg">
          <p className="text-brand-gold text-xs tracking-[0.3em] font-light mb-4">المستشارة النفسية</p>
          <h1
            className="font-display font-[200] text-white leading-none mb-2"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            علياء البحري
          </h1>
          <p className="text-white/60 text-sm tracking-widest uppercase mb-8">Aliyah Al Bahari</p>
          <p className="text-white/80 text-base font-light leading-relaxed max-w-lg mb-8">
            A psychological counselor and CBT specialist dedicated exclusively to women and teenage girls.
            Certified at the Prophet&#39;s Mosque in Madinah, and a descendant of the Prophet Muhammad ﷺ
            — her work is rooted in deep spiritual trust, clinical precision, and unwavering compassion.
          </p>
          <div className="flex flex-wrap gap-3">
            {["CBT Specialist", "Prophet's Mosque Certified", "Women Only"].map((label) => (
              <span key={label} className="border border-white/30 text-white/70 text-xs px-4 py-2 rounded-full">
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Arabic quote */}
        <Reveal className="absolute bottom-0 inset-x-0 z-20 pb-12 md:pb-20 px-8 text-center" delay={0.2}>
          <p
            className="font-display font-[200] text-brand-cream leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", direction: "rtl" }}
          >
            الخوف شعور طبيعي، لكن البقاء في دوامة الخوف ليس قدرًا.
            حين يتعلم الإنسان كيف يحتوي مشاعره وينظم أفكاره...
            يعود الهدوء إلى قلبه.
          </p>
          <div className="w-12 h-px bg-brand-gold mx-auto my-6" />
          <p className="text-brand-teal-light text-sm tracking-widest">— علياء البحري</p>
        </Reveal>
      </section>

      {/* Mission + Values */}
      <section className="bg-brand-cream pt-6 pb-8">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20">
          <Reveal direction="right">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">Our Mission</p>
            <h2 className="font-display font-light text-brand-dark text-4xl mb-6">Why We Do What We Do</h2>
            <p className="text-brand-dark/55 leading-relaxed mb-4 text-sm">
              We believe lasting change starts from within. Aliyah combines evidence-based CBT methodologies with heart-centred support to guide women through real, sustainable transformation.
            </p>
            <p className="text-brand-dark/55 leading-relaxed text-sm">
              From one-on-one sessions to group programs, everything we do is designed to meet you where you are and take you where you want to go.
            </p>
          </Reveal>
          <StaggerReveal className="grid grid-cols-2 gap-4">
            {[
              { icon: "✦", title: "Authenticity", body: "We create space for your true self to emerge." },
              { icon: "◈", title: "Growth",        body: "Progress over perfection, always." },
              { icon: "❋", title: "Community",     body: "Transformation is better together." },
              { icon: "◇", title: "Empowerment",   body: "You hold all the answers. We help you find them." },
            ].map((v) => (
              <motion.div key={v.title} variants={staggerChild}
                className="p-6 rounded-3xl bg-white border border-[#ede8de] hover:border-brand-teal/20 hover:shadow-md transition-all"
                style={{ boxShadow: "0 2px 16px rgba(3,90,96,0.04)" }}
              >
                <span className="text-2xl text-brand-teal block mb-3">{v.icon}</span>
                <h4 className="font-display text-lg text-brand-dark mb-1">{v.title}</h4>
                <p className="text-xs text-brand-dark/55 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-8">
          <h2 className="font-display font-light text-3xl mb-6">Ready to work together?</h2>
          <Link href="/booking" className="inline-block px-8 py-4 bg-brand-gold text-brand-dark rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105">
            Book a Discovery Call
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
