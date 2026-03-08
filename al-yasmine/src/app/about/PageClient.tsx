"use client";

import React from "react";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="relative" style={{ background: "linear-gradient(160deg,#f6f2e9 0%,#eef6f6 100%)" }}>
        <div className="section-container max-w-3xl pt-16 pb-12">
          <Reveal>
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">Our Story</p>
            <h1 className="font-display font-light text-brand-dark mb-4">About Al Yasmine Center</h1>
            <div className="brand-divider mx-0" />
            <p className="text-brand-dark/55 text-lg mt-6 max-w-xl leading-relaxed">
              Born from a belief that every woman carries within her the seeds of greatness — we exist to help those seeds bloom.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3D scroll showcase */}
      <section className="bg-white overflow-hidden">
        <ContainerScroll
          titleComponent={
            <Reveal>
              <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">Our Approach</p>
              <h2 className="font-display font-light text-brand-dark text-4xl md:text-5xl mb-2">Where Science Meets Heart</h2>
              <p className="text-brand-dark/45 text-sm max-w-md mx-auto mt-3">A glimpse inside how we work — and the space we create for you.</p>
            </Reveal>
          }
        >
          <div className="w-full h-full relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=80"
              alt="Coaching session at Al Yasmine Center"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/80 via-transparent to-transparent flex items-end p-8">
              <div>
                <p className="font-display text-2xl text-brand-cream font-light mb-1">
                  &ldquo;You are one decision away from a completely different life.&rdquo;
                </p>
                <p className="text-brand-gold text-sm">— Al Yasmine Center</p>
              </div>
            </div>
          </div>
        </ContainerScroll>
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

      {/* Meet the Coach */}
      <section className="bg-white pt-6 pb-8">
        <div className="section-container max-w-2xl mx-auto text-center py-20">
          <Reveal>
            <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">The Team</p>
            <h2 className="font-display font-light text-brand-dark mb-4">Meet Your Coach</h2>
            <div className="brand-divider" />
            <div className="mt-12 w-28 h-28 rounded-full overflow-hidden border-4 border-white mx-auto mb-6 shadow-md">
              <img src={siteConfig.coachPhoto} alt={siteConfig.coachName} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-display text-2xl text-brand-dark mb-0.5">{siteConfig.coachName}</h3>
            <p className="arabic text-brand-teal text-sm mb-1" lang="ar">{siteConfig.coachNameAr}</p>
            <p className="text-brand-teal-light text-sm mb-5">{siteConfig.coachTitle}</p>
            <p className="text-brand-dark/55 leading-relaxed text-sm max-w-md mx-auto">
              {siteConfig.coachBio}
            </p>
          </Reveal>
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
