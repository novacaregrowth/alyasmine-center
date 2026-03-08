"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroCanvas } from "@/components/ui/hero-canvas";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { ScrollTestimonials } from "@/components/ui/scroll-testimonials";
import { services, testimonials } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Intro Quote — white, massive padding, single centered line
// ─────────────────────────────────────────────────────────────────────────────
function IntroQuote() {
  return (
    <section className="bg-white py-40">
      <Reveal className="text-center px-6 max-w-3xl mx-auto">
        <p
          className="font-display font-[200] text-brand-dark italic leading-relaxed"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          &ldquo;I am here to help you regain your balance. Listen to your inner voice
          instead of the voice of fear, anxiety, and tension.&rdquo;
        </p>
        <div className="w-12 h-px bg-brand-gold mx-auto my-8" />
        <p className="text-brand-teal-light text-sm tracking-widest uppercase">
          &mdash; Aliyah Al Bahari
        </p>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats — teal band
// ─────────────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "200+", label: "Clients Transformed" },
    { value: "98%",  label: "Satisfaction Rate"   },
    { value: "3+",   label: "Years of Impact"     },
    { value: "4.9",  label: "Average Rating"      },
  ];

  return (
    <section className="bg-brand-teal py-24">
      <StaggerReveal className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <motion.div key={s.label} variants={staggerChild}>
            <p className="font-display text-5xl text-brand-gold font-light mb-1">{s.value}</p>
            <p className="text-brand-cream/60 text-xs tracking-widest uppercase">{s.label}</p>
          </motion.div>
        ))}
      </StaggerReveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Services — cream background, blush left-border cards
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="bg-brand-cream py-24">
      <div className="section-container">
        <Reveal className="text-center mb-14">
          <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">What We Offer</p>
          <h2
            className="font-display font-[200] text-brand-dark"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Our Services
          </h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={staggerChild}
              className="group p-7 rounded-3xl bg-white border-l-[3px] border-l-brand-blush shadow-sm hover:border-l-brand-teal hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
            >
              <span className="text-4xl">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-display text-xl text-brand-dark mb-1.5">{s.title}</h3>
                <p className="text-xs text-brand-dark/55 leading-relaxed">{s.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-brand-cream">
                <span className="text-brand-teal-light">{s.duration}</span>
                <span className="font-semibold text-brand-teal">{formatPrice(s.price)}</span>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        <Reveal delay={0.3} className="text-center mt-10">
          <Link href="/services" className="text-xs text-brand-teal font-medium hover:underline underline-offset-4 tracking-wide">
            Explore all services &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials — white background, scroll-triggered quotes
// ─────────────────────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="section-container">
        <Reveal className="text-center mb-4">
          <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">Real Results</p>
          <h2
            className="font-display font-[200] text-brand-dark"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What Our Clients Say
          </h2>
        </Reveal>

        <ScrollTestimonials testimonials={testimonials} />

        <Reveal delay={0.2} className="text-center mt-6 pb-4">
          <Link href="/proof" className="inline-block px-6 py-2.5 border border-brand-teal/40 text-brand-teal rounded-full text-xs font-medium hover:bg-brand-teal hover:text-brand-cream hover:border-brand-teal transition-all duration-300">
            See all stories
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dark Statement — single typographic line, massive padding
// ─────────────────────────────────────────────────────────────────────────────
function DarkStatement() {
  return (
    <section className="bg-brand-dark py-40">
      <Reveal className="text-center px-6">
        <p
          className="font-display font-[200] text-brand-cream leading-none"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
        >
          You are one decision away.
        </p>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking CTA — teal background
// ─────────────────────────────────────────────────────────────────────────────
function BookingCTA() {
  return (
    <section className="bg-brand-teal py-32">
      <Reveal className="section-container text-center max-w-lg mx-auto">
        <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Ready to Begin?</p>
        <h2 className="font-display font-[200] text-4xl md:text-5xl text-brand-cream mb-4">
          Book Your First Session
        </h2>
        <p className="text-brand-cream/60 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
          Your first discovery call is completely free. This is your first step.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-brand-gold text-brand-dark rounded-full px-10 py-4 font-medium text-sm hover:scale-105 transition-transform"
        >
          Book a Free Call
        </Link>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroCanvas />
      <IntroQuote />
      <Stats />
      <Services />
      <Testimonials />
      <DarkStatement />
      <BookingCTA />
    </>
  );
}
