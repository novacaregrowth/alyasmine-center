import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang = params.lang;

  return (
    <div className="pt-20 pb-28">
      <div className="section-container max-w-2xl mx-auto pt-16">
        <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">Legal</p>
        <h1 className="font-display font-light text-brand-dark mb-4">Privacy Policy</h1>
        <div className="w-14 h-0.5 bg-brand-gold mb-10" />

        <div className="prose prose-sm max-w-none space-y-8 text-brand-dark/70 text-sm leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">1. Information We Collect</h2>
            <p>When you use Al Yasmine Center&apos;s website or book a session, we may collect personal information including your name, email address, phone number, and any information you share during coaching sessions. We collect this information only when you voluntarily provide it.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">2. How We Use Your Information</h2>
            <p>We use your information to provide coaching services, communicate with you about your sessions, send relevant updates if you have opted in, and improve our services. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">3. Confidentiality</h2>
            <p>All information shared during coaching sessions is treated with strict confidentiality in accordance with professional coaching ethics. Session content will not be disclosed to any third party without your explicit written consent, except where required by law.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">4. Data Storage & Security</h2>
            <p>Your data is stored securely and we implement appropriate technical and organisational measures to protect it against unauthorised access, alteration, or disclosure.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">5. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline">hello@alyasminecenter.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">6. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline">hello@alyasminecenter.com</a> or call <a href="tel:+971524417078" className="text-brand-teal hover:underline">+971 52 441 7078</a>.</p>
          </section>

          <p className="text-xs text-brand-dark/40 pt-4 border-t border-brand-cream">Last updated: January 2026. Al Yasmine Center, UAE.</p>
        </div>

        <div className="mt-12">
          <Link href={`/${lang}`} className="text-sm text-brand-teal hover:underline underline-offset-4">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
