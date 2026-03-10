"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroCanvas } from "@/components/ui/hero-canvas";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { services } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

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
// Testimonials — horizontal scrolling image gallery
// ─────────────────────────────────────────────────────────────────────────────
const testimonialImages = [
  { src: "/images/testimonial-1.jpeg", alt: "شهادة عميلة عن تجربتها مع مركز الياسمين" },
  { src: "/images/testimonial-2.jpeg", alt: "رأي عميلة في جلسات الاستشارة النفسية" },
  { src: "/images/testimonial-3.jpeg", alt: "تجربة عميلة مع العلاج السلوكي المعرفي" },
  { src: "/images/testimonial-4.jpeg", alt: "شهادة عميلة عن التحول الذي حققته" },
  { src: "/images/testimonial-5.jpeg", alt: "رأي عميلة في برنامج التطوير الشخصي" },
  { src: "/images/testimonial-6.jpeg", alt: "تجربة عميلة مع جلسات علياء البحري" },
  { src: "/images/testimonial-7.jpeg", alt: "شهادة عميلة عن رحلة الشفاء والتعافي" },
  { src: "/images/testimonial-8.jpeg", alt: "رأي عميلة في خدمات مركز الياسمين" },
];

function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="section-container">
        <Reveal className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium">
              What They Say
            </p>
            <span className="text-brand-gold/40">|</span>
            <p className="text-brand-gold text-xs tracking-[0.3em] font-medium arabic">
              ماذا قلن
            </p>
          </div>
          <h2
            className="font-display font-[200] text-brand-dark"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Real Results
          </h2>
        </Reveal>
      </div>

      <div className="overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {testimonialImages.map((img) => (
            <div key={img.src} className="flex-shrink-0 relative h-[500px] w-auto">
              <Image
                src={img.src}
                alt={img.alt}
                width={375}
                height={500}
                className="h-[500px] w-auto rounded-3xl object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="section-container">
        <Reveal delay={0.2} className="text-center mt-6 pb-4">
          <Link
            href="/proof"
            className="inline-block px-6 py-2.5 border border-brand-teal/40 text-brand-teal rounded-full text-xs font-medium hover:bg-brand-teal hover:text-brand-cream hover:border-brand-teal transition-all duration-300"
          >
            See all stories
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dark Statement — single typographic line
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
      <Stats />
      <Services />
      <Testimonials />
      <DarkStatement />
      <BookingCTA />
    </>
  );
}
