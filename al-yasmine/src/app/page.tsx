"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, stagger, useAnimate } from "framer-motion";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Reveal, StaggerReveal, staggerChild } from "@/components/ui/reveal";
import { WaveDivider } from "@/components/ui/dividers";
import { ScrollTestimonials } from "@/components/ui/scroll-testimonials";
import { services, testimonials, siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Brand color hex values (must match tailwind config — used in SVG dividers)
const TEAL = "#035A60";

// Coaching/wellness themed Unsplash photos
const floatingImages = [
  { url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80", depth: 0.5, className: "top-[9%]  left-[5%]",  size: "w-24 h-24  md:w-32 md:h-32"  },
  { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", depth: 1.5, className: "top-[5%]  left-[27%]", size: "w-20 h-20  md:w-28 md:h-28"  },
  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80", depth: 2,   className: "top-[2%]  left-[57%]", size: "w-28 h-40  md:w-36 md:h-52"  },
  { url: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80", depth: 1,   className: "top-[7%]  right-[4%]", size: "w-22 h-22  md:w-28 md:h-28"  },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", depth: 1,   className: "top-[45%] left-[1%]",  size: "w-28 h-28  md:w-36 md:h-36"  },
  { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", depth: 2,   className: "top-[43%] right-[2%]", size: "w-24 h-32  md:w-32 md:h-40"  },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80", depth: 1.5, className: "top-[74%] left-[9%]",  size: "w-32 h-32  md:w-44 md:h-44"  },
  { url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=80", depth: 1,   className: "top-[77%] right-[7%]", size: "w-24 h-32  md:w-32 md:h-44"  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero — full viewport, cream→white gradient, parallax photos behind center text
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.7, delay: stagger(0.1) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return (
    <section
      ref={scope}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 0%, #e8f4f5 0%, #f6f2e9 40%, #ffffff 100%)",
      }}
    >
      {/* Subtle radial glow behind center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(127,176,180,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Parallax floating photos — pointer-events-none so they don't block nav */}
      <Floating sensitivity={-0.6} className="overflow-hidden pointer-events-none">
        {floatingImages.map((img, i) => (
          <FloatingElement key={i} depth={img.depth} className={img.className}>
            <motion.img
              initial={{ opacity: 0 }}
              src={img.url}
              alt=""
              className={`${img.size} object-cover rounded-2xl shadow-lg`}
              style={{ filter: "saturate(0.85) brightness(1.02)" }}
            />
          </FloatingElement>
        ))}
      </Floating>

      {/* Center content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        >
          ✦ &nbsp;Coaching & Personal Development&nbsp; ✦
        </motion.p>

        <h1
          className="font-display font-[200] text-brand-charcoal mb-3 leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          <span className="block">Heard.</span>
          <span className="block text-brand-teal">Understood.</span>
          <span className="block">Healed.</span>
        </h1>

        <p className="arabic text-brand-teal text-lg md:text-xl mb-5 opacity-70" lang="ar">
          {siteConfig.taglineAr}
        </p>

        <p className="text-brand-charcoal/55 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          {siteConfig.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Link href="/booking">
            <InteractiveHoverButton
              text="Book a Free Call"
              className="border-brand-teal text-brand-teal w-44 h-12 text-sm"
              style={{ "--primary": "#035A60", "--primary-foreground": "#F6F2E9" } as React.CSSProperties}
            />
          </Link>
        </div>

        {/* Social proof avatars */}
        <motion.div
          className="mt-12 flex items-center gap-3 justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
        >
          <div className="flex -space-x-2">
            {["#035A60", "#7FB0B4", "#ECA200", "#c9a4a0"].map((color, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm" style={{ backgroundColor: color }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-charcoal/45">
            <span className="font-semibold text-brand-charcoal/70">200+</span> lives transformed
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-brand-teal/30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.div>

      {/* Bottom wave blending into stats (teal) */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider from="transparent" to={TEAL} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats — teal band, flows directly from hero wave
// ─────────────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "200+", label: "Clients Transformed" },
    { value: "98%",  label: "Satisfaction Rate"   },
    { value: "3+",   label: "Years of Impact"     },
    { value: "4.9★", label: "Average Rating"      },
  ];

  return (
    <section className="bg-brand-teal text-brand-cream pt-6 pb-16">
      <StaggerReveal className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <motion.div key={s.label} variants={staggerChild}>
            <p className="font-display text-4xl md:text-5xl text-brand-gold mb-1">{s.value}</p>
            <p className="text-brand-cream/55 text-xs tracking-wide uppercase">{s.label}</p>
          </motion.div>
        ))}
      </StaggerReveal>

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Services — white background
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="bg-white pt-4 pb-8">
      <div className="section-container">
        <Reveal className="text-center mb-14">
          <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">What We Offer</p>
          <h2 className="font-display font-light text-brand-charcoal">Our Services</h2>
          <div className="brand-divider" />
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={staggerChild}
              className="group p-7 rounded-3xl border border-[#ede8de] bg-white hover:border-brand-teal/20 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col gap-4"
              style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.04)" }}
            >
              <span className="text-4xl">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-display text-xl text-brand-charcoal mb-1.5">{s.title}</h3>
                <p className="text-xs text-brand-charcoal/55 leading-relaxed">{s.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-[#ede8de]">
                <span className="text-brand-teal-light">{s.duration}</span>
                <span className="font-semibold text-brand-teal">{formatPrice(s.price)}</span>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        <Reveal delay={0.3} className="text-center mt-10">
          <Link href="/services" className="text-xs text-brand-teal font-medium hover:underline underline-offset-4 tracking-wide">
            Explore all services →
          </Link>
        </Reveal>
      </div>

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials — cream background, scroll-triggered quotes
// ─────────────────────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="bg-brand-cream pt-6 pb-8">
      <div className="section-container">
        <Reveal className="text-center mb-4">
          <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-3">Real Results</p>
          <h2 className="font-display font-light text-brand-charcoal">What Our Clients Say</h2>
          <div className="brand-divider" />
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
// Typographic statement — cream, no decoration
// ─────────────────────────────────────────────────────────────────────────────
function Statement() {
  return (
    <section className="bg-brand-cream py-20">
      <Reveal className="text-center px-6">
        <p
          className="font-display font-[200] text-brand-charcoal tracking-tight leading-none"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          You are one decision away.
        </p>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// What happens after you book — dark section
// ─────────────────────────────────────────────────────────────────────────────
function FreeCourseCTA() {
  return (
    <section className="relative bg-brand-dark pt-4 pb-8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 20% 60%, rgba(236,162,0,0.10) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 80% 40%, rgba(127,176,180,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="section-container relative z-10">
        <Reveal className="max-w-xl mx-auto text-center text-brand-cream">
          <motion.span
            className="text-brand-gold text-4xl block mb-5"
            animate={{ y: [0, -7, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
          <h2 className="font-display font-light text-4xl md:text-5xl mb-4">What Happens Next</h2>
          <p className="text-brand-cream/50 text-base mb-10 leading-relaxed">
            Every client receives a personal welcome guide after booking — four short modules to help you arrive grounded and ready for your first session with Aliyah.
          </p>
          <Link
            href="/booking"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-dark rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105"
          >
            Book Your Session →
          </Link>
        </Reveal>
      </div>

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking CTA — clean white close
// ─────────────────────────────────────────────────────────────────────────────
function BookingCTA() {
  return (
    <section className="bg-white pt-4 pb-28">
      <Reveal className="section-container text-center max-w-lg mx-auto">
        <p className="text-brand-teal-light text-[10px] tracking-[0.25em] uppercase font-medium mb-3">Ready to Begin?</p>
        <h2 className="font-display font-light text-brand-charcoal mb-3">Book Your Session</h2>
        <p className="text-brand-charcoal/45 mb-10 text-sm leading-relaxed max-w-sm mx-auto">
          Your first discovery call is completely free. Choose a time that works for you.
        </p>
        <div className="flex justify-center">
          <Link href="/booking">
            <InteractiveHoverButton
              text="Book Now"
              className="border-brand-teal text-brand-teal w-36 h-12"
              style={{ "--primary": "#035A60", "--primary-foreground": "#F6F2E9" } as React.CSSProperties}
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <Statement />
      <FreeCourseCTA />
      <BookingCTA />
    </>
  );
}
