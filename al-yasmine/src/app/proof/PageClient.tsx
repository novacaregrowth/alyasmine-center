"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollTestimonials } from "@/components/ui/scroll-testimonials";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { WaveDivider, CurveDivider } from "@/components/ui/dividers";
import { testimonials } from "@/lib/config";

const CREAM = "#F6F2E9";
const WHITE = "#ffffff";
const TEAL  = "#035A60";

export default function ProofPage() {
  return (
    <div className="pt-20">

      {/* ── Hero ── */}
      <section
        className="relative pb-8"
        style={{ background: "linear-gradient(160deg, #f6f2e9 0%, #eef6f6 100%)" }}
      >
        <div className="section-container max-w-3xl pt-16 pb-12">
          <Reveal>
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
              Real Results
            </p>
            <h1 className="font-display font-light text-brand-charcoal mb-4">
              The Proof Is in the Transformation
            </h1>
            <div className="brand-divider mx-0" />
            <p className="text-brand-charcoal/55 text-lg mt-6 max-w-xl leading-relaxed">
              Real stories from real women who chose to invest in themselves.
            </p>
          </Reveal>
        </div>
        <WaveDivider from="transparent" to={TEAL} />
      </section>

      {/* ── Stats ── */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-14">
        <StaggerReveal className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "200+", label: "Clients Transformed" },
            { stat: "98%",  label: "Satisfaction Rate"   },
            { stat: "3+",   label: "Years of Impact"     },
            { stat: "4.9★", label: "Average Rating"      },
          ].map((s) => (
            <motion.div key={s.label} variants={staggerChild}>
              <p className="font-display text-4xl text-brand-gold mb-1">{s.stat}</p>
              <p className="text-brand-cream/55 text-xs tracking-wide uppercase">{s.label}</p>
            </motion.div>
          ))}
        </StaggerReveal>
        <div className="-mb-1 mt-10">
          <CurveDivider from={TEAL} to={WHITE} />
        </div>
      </section>

      {/* ── Scroll Testimonials ── */}
      <section className="bg-white pt-6 pb-8">
        <div className="section-container">
          <Reveal className="text-center mb-4">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">
              Voices
            </p>
            <h2 className="font-display font-light text-brand-charcoal mb-2">
              What Our Clients Say
            </h2>
            <div className="brand-divider" />
          </Reveal>

          {/* Testimonials — each fades + rises as it enters the viewport */}
          <ScrollTestimonials testimonials={testimonials} />

          <Reveal delay={0.2} className="text-center mt-4 pb-8">
            <Link
              href="/booking"
              className="inline-block px-8 py-3.5 bg-brand-teal text-brand-cream rounded-full text-sm font-semibold hover:bg-brand-teal/90 transition-all hover:scale-105"
            >
              Start Your Story
            </Link>
          </Reveal>
        </div>

        <div className="-mb-1 mt-8">
          <WaveDivider from={WHITE} to={CREAM} flip />
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="bg-brand-cream pt-6 pb-8">
        <div className="section-container">
          <Reveal className="text-center mb-14">
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">
              In Depth
            </p>
            <h2 className="font-display font-light text-brand-charcoal">Case Studies</h2>
            <div className="brand-divider" />
          </Reveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: "From Burnout to Business Owner",
                tags: ["1-on-1 Coaching", "8 Weeks"],
                body: "Hessa came to us exhausted and directionless. Through our Intensive Program, she rediscovered her purpose and launched her own business within 3 months of graduating.",
              },
              {
                number: "02",
                title: "Rebuilding Confidence After Setback",
                tags: ["Bloom Program", "1 Month"],
                body: "After a difficult career transition, Mariam worked with Aliyah to rebuild her self-belief and land a leadership role just 6 weeks later.",
              },
            ].map((cs) => (
              <motion.div
                key={cs.number}
                variants={staggerChild}
                className="bg-white rounded-3xl p-10 border border-[#ede8de]"
                style={{ boxShadow: "0 4px 24px rgba(3,90,96,0.05)" }}
              >
                <p className="text-brand-teal text-[10px] tracking-[0.2em] uppercase font-medium mb-3">
                  Case Study {cs.number}
                </p>
                <h3 className="font-display text-2xl text-brand-charcoal mb-3">{cs.title}</h3>
                <p className="text-brand-charcoal/55 text-sm leading-relaxed mb-6">{cs.body}</p>
                <div className="flex gap-2 flex-wrap">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-brand-teal text-xs font-medium border border-brand-teal/15 bg-brand-teal/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>

        <div className="-mb-1 mt-14">
          <CurveDivider from={CREAM} to={TEAL} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-teal text-brand-cream pt-6 pb-20">
        <Reveal className="section-container text-center max-w-lg mx-auto py-10">
          <h2 className="font-display font-light text-3xl mb-3">Your story starts here.</h2>
          <p className="text-brand-cream/55 mb-8 text-sm">
            Join the women who chose to invest in themselves.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-brand-gold text-brand-dark rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105"
          >
            Book a Discovery Call
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
