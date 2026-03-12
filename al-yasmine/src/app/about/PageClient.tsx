"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { motion, useInView } from "framer-motion";

const sectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionAnim}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const cbtCards = [
  {
    title: "Your Thoughts Shape Your Reality",
    body: "CBT helps you identify patterns of thinking that keep you feeling stuck, anxious, or overwhelmed.",
  },
  {
    title: "Change the Pattern, Change the Feeling",
    body: "Practical, proven tools to interrupt cycles of anxiety and fear before they take hold.",
  },
  {
    title: "Lasting Change, Not Just Relief",
    body: "Builds long-term resilience and emotional regulation — not dependency on sessions.",
  },
];

const credentialCards = [
  {
    num: "١",
    title: "Certified Psychological Counselor",
    desc: "Formally trained and certified in psychological counseling and mental health support.",
  },
  {
    num: "٢",
    title: "CBT Specialist",
    desc: "Specialized in Cognitive Behavioral Therapy, one of the most evidence-based approaches to treating anxiety and emotional distress.",
  },
  {
    num: "٣",
    title: "10+ Years of Practice",
    desc: "Over a decade of clinical experience working with women navigating fear, anxiety, and life transitions.",
  },
  {
    num: "٤",
    title: "2000+ Women Supported",
    desc: "A community of women who have found lasting calm, clarity, and confidence through this work.",
  },
];

export default function AboutPage() {
  const silsilaLineRef = useRef<HTMLDivElement>(null);
  const silsilaLineInView = useInView(silsilaLineRef, { once: true, margin: "-40px" });

  return (
    <div>

      {/* ── Full-bleed Aliyah Hero ── */}
      <section className="relative w-full bg-black">
        <img
          src="/images/aliyah-hero-cropped.png"
          alt="Aliyah Al Bahari"
          className="block w-full h-auto"
        />

        <div className="absolute top-0 left-0 w-full h-48 z-10 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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

      {/* ── 1. HER STORY ── */}
      <Section className="bg-brand-cream">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start py-24">
          <div className="border-l-2 border-solid border-[#FDCCBE] pl-8">
            <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-3">The Founder</p>
            <h2 className="font-display text-5xl text-brand-teal">Her Story</h2>
          </div>
          <div>
            {/* TODO: Replace with Aliyah's real story */}
            <p className="text-brand-dark/60 text-sm leading-relaxed mb-5">
              Aliyah Al Bahari discovered her calling not in a classroom, but in the quiet
              moments between a woman&apos;s tears and her first breath of courage. After years of
              studying psychology and working with women from every walk of life, she understood
              that lasting healing requires more than clinical technique — it demands a counselor
              who can hold both the science of the mind and the wisdom of the soul.
            </p>
            <p className="text-brand-dark/60 text-sm leading-relaxed">
              Today, Aliyah helps women navigate fear, anxiety, and emotional pain by
              weaving evidence-based Cognitive Behavioural Therapy with deep spiritual
              grounding. Her approach is gentle yet unflinching — creating a safe space
              where women can confront what holds them back and step into the lives they
              were always meant to lead.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 2. GRADIENT BRIDGE — Cream → Teal ── */}
      <div className="h-32 bg-gradient-to-b from-brand-cream to-brand-teal pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── 3. THE SILSILA ── */}
      <Section className="z-10 bg-brand-teal relative w-full min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,204,190,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 px-6 py-24 max-w-3xl mx-auto">
          <p className="text-brand-gold text-sm tracking-[0.3em] mb-6">سند متصل</p>
          <h2
            className="font-display font-[200] text-brand-cream mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            An Unbroken Chain
          </h2>

          <div ref={silsilaLineRef} className="flex justify-center mb-10">
            <motion.div
              className="h-px bg-brand-gold"
              initial={{ width: 0 }}
              animate={silsilaLineInView ? { width: "6rem" } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="h-full w-full bg-brand-gold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* TODO: Expand with Aliyah's real Silsila details */}
          <p className="text-brand-cream/70 max-w-2xl mx-auto leading-relaxed text-base">
            Aliyah holds an unbroken chain of Islamic knowledge transmission —
            a silsila — traced back to the Prophet Muhammad ﷺ. This sacred
            lineage is not merely ceremonial; it is the spiritual foundation
            upon which her clinical work rests. Her practice bridges deep
            spiritual trust with clinical precision, offering women a rare
            combination of evidence-based therapy and soul-level understanding.
          </p>
        </div>
      </Section>

      {/* ── 4. GRADIENT BRIDGE — Teal → Blush ── */}
      <div className="h-32 bg-gradient-to-b from-brand-teal to-[#FDCCBE33] pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── 5. WHAT IS CBT ── */}
      <Section className="bg-brand-blush/20">
        <div className="section-container py-24">
          <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-3">The Method</p>
          <h2 className="font-display font-light text-brand-teal text-4xl mb-12">What is CBT?</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {cbtCards.map((card) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/40 backdrop-blur-md rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl border-t-4 border-brand-teal p-8 shadow-md hover:shadow-xl transition-shadow duration-700"
              >
                <h3 className="font-display text-lg text-brand-teal mb-3">{card.title}</h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── GRADIENT BRIDGE — Blush → Cream ── */}
      <div className="h-32 bg-gradient-to-b from-[#FDCCBE33] to-brand-cream pointer-events-none" />

      {/* ── 6. CREDENTIALS ── */}
      <Section className="bg-brand-cream">
        <div className="section-container py-24">
          <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-3">Qualifications</p>
          <h2 className="font-display font-light text-brand-teal text-4xl mb-10">Education &amp; Certifications</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {credentialCards.map((card) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-brand-teal/10 rounded-3xl p-8"
                style={{ boxShadow: "0 2px 20px rgba(3,90,96,0.06)" }}
              >
                <span className="font-display text-5xl text-brand-blush block mb-4">{card.num}</span>
                <h3 className="font-display text-lg text-brand-teal mb-2">{card.title}</h3>
                <p className="text-brand-dark/50 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── GRADIENT BRIDGE — Cream → Teal ── */}
      <div className="h-32 bg-gradient-to-b from-brand-cream to-brand-teal pointer-events-none relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      {/* ── CTA ── */}
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
