import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="pt-20 pb-28">
      <div className="section-container max-w-2xl mx-auto pt-16">
        <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">Legal</p>
        <h1 className="font-display font-light text-brand-dark mb-4">Terms & Conditions</h1>
        <div className="w-14 h-0.5 bg-brand-gold mb-10" />

        <div className="space-y-8 text-brand-dark/70 text-sm leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">1. Services</h2>
            <p>Al Yasmine Center provides life coaching and CBT-based personal development services. Coaching is not a substitute for therapy, medical advice, or psychological treatment. If you are experiencing a mental health crisis, please contact a qualified mental health professional.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">2. Bookings & Cancellations</h2>
            <p>Sessions must be cancelled or rescheduled at least 24 hours in advance. Cancellations made with less than 24 hours notice may be charged in full. No-shows are charged at the full session rate.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">3. Payments</h2>
            <p>Payment is due prior to or at the time of each session unless a package has been agreed upon. All prices are in AED and include applicable taxes where required.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">4. Refund Policy</h2>
            <p>We offer a full refund if you are not satisfied after your first session — no questions asked. For packages, unused sessions may be refunded on a pro-rata basis within 14 days of purchase. To request a refund, email us at <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline">hello@alyasminecenter.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">5. Intellectual Property</h2>
            <p>All materials, workbooks, and content provided by Al Yasmine Center are for personal use only and may not be reproduced or distributed without written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">6. Contact</h2>
            <p>For any questions, reach us at <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline">hello@alyasminecenter.com</a> or <a href="tel:+971524417078" className="text-brand-teal hover:underline">+971 52 441 7078</a>.</p>
          </section>

          <p className="text-xs text-brand-dark/40 pt-4 border-t border-brand-cream">Last updated: January 2026. Al Yasmine Center, UAE.</p>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-sm text-brand-teal hover:underline underline-offset-4">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
