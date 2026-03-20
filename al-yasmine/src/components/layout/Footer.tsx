"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Phone } from "lucide-react";
import { getTranslator, type Locale } from "@/lib/i18n";

function getLinkGroups(lang: Locale, t: (key: string) => string) {
  return [
    {
      label: t("footer.navigate"),
      links: [
        { text: t("footer.home"),         href: `/${lang}` },
        { text: t("footer.aboutLink"),    href: `/${lang}/about` },
        { text: t("footer.servicesLink"), href: `/${lang}/services` },
        { text: t("footer.proofLink"),    href: `/${lang}/proof` },
        { text: t("footer.pricingLink"),  href: `/${lang}/pricing` },
      ],
    },
    {
      label: t("footer.support"),
      links: [
        { text: t("footer.bookSession"), href: `/${lang}/booking` },
        { text: t("footer.contact"),     href: `/${lang}/contact` },
        { text: t("footer.faq"),         href: `/${lang}/faq` },
      ],
    },
    {
      label: t("footer.legal"),
      links: [
        { text: t("footer.privacy"), href: `/${lang}/privacy` },
        { text: t("footer.terms"),   href: `/${lang}/terms` },
      ],
    },
  ];
}

function columnVariants(delay: number) {
  return {
    initial: { filter: "blur(4px)", translateY: -8, opacity: 0 },
    whileInView: { filter: "blur(0px)", translateY: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
    viewport: { once: true } as const,
  };
}

export function Footer({ lang = "en" as Locale }: { lang?: Locale }) {
  const t = getTranslator(lang);
  const linkGroups = getLinkGroups(lang, t);

  return (
    <footer className="relative bg-brand-charcoal text-brand-cream border-t border-brand-cream/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(40%_120px_at_50%_0%,rgba(253,204,190,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(253,204,190,0.07),transparent)] pointer-events-none" />

      <div className="relative section-container py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand column */}
        <motion.div className="lg:col-span-2 space-y-5" {...columnVariants(0)}>
          <p className="font-display text-brand-gold text-2xl">{t("footer.siteName")}</p>
          <p className="text-brand-cream/50 text-sm max-w-xs">
            {t("footer.tagline")}
          </p>

          <div className="space-y-3 pt-2">
            <a
              href="https://instagram.com/alyasmine_center"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-cream/60 text-sm hover:text-brand-gold transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
              @alyasmine_center
            </a>
            <a
              href="tel:+971524117078"
              className="flex items-center gap-2 text-brand-cream/60 text-sm hover:text-brand-gold transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              +971 52 411 7078
            </a>
          </div>

          <p className="text-brand-cream/30 text-xs pt-4">
            {t("footer.copyright")}
          </p>
        </motion.div>

        {/* Link columns */}
        {linkGroups.map((group, i) => (
          <motion.div key={group.label} {...columnVariants(0.1 * (i + 1))}>
            <h4 className="text-brand-gold uppercase tracking-[0.2em] text-xs mb-4">
              {group.label}
            </h4>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/60 hover:text-brand-gold transition-colors duration-300 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </footer>
  );
}
