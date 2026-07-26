"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Instagram, Phone } from "lucide-react";
import { getTranslator, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/config";

type FooterLink = { text: string; href: string | null; external?: boolean };
type FooterGroup = { label: string; links: FooterLink[] };

function getLinkGroups(lang: Locale, t: (key: string) => string): FooterGroup[] {
  return [
    {
      label: t("footer.navigate"),
      links: [
        { text: t("footer.home"),         href: `/${lang}` },
        { text: t("footer.aboutLink"),    href: `/${lang}/about` },
        { text: t("footer.servicesLink"), href: `/${lang}/services` },
        { text: t("footer.proofLink"),    href: `/${lang}/proof` },
      ],
    },
    {
      label: t("footer.support"),
      links: [
        { text: t("footer.whatsapp"),  href: `https://wa.me/${siteConfig.whatsapp}`, external: true },
        { text: t("footer.instagram"), href: siteConfig.instagram, external: true },
        { text: t("footer.email"),     href: `mailto:${siteConfig.email}`, external: true },
        { text: t("footer.workingHoursValue"), href: null },
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
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <footer className="relative bg-brand-charcoal text-brand-cream border-t border-brand-cream/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(40%_120px_at_50%_0%,rgba(253,204,190,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(253,204,190,0.07),transparent)] pointer-events-none" />

      {/* ── Mobile (below lg) — compact accordion strip ── */}
      <div className="relative lg:hidden section-container pt-8 pb-24 flex flex-col gap-5">
        {/* Row 1: logo + contact icons */}
        <div className="flex items-center justify-between">
          <Image
            src="/images/al-yasmine-center-logo-light.png"
            alt="Al Yasmine Center"
            width={140}
            height={48}
            className="h-9 w-auto"
          />
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-brand-cream/60 hover:text-brand-gold transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              aria-label="Phone"
              className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-brand-cream/60 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Row 2: tagline */}
        <p className="text-brand-cream/50 text-xs italic">
          {t("footer.tagline")}
        </p>

        {/* Row 3: accordion groups */}
        <div className="border-t border-brand-cream/10">
          {linkGroups.map((group) => {
            const isOpen = openGroup === group.label;
            return (
              <div key={group.label} className="border-b border-brand-cream/10">
                <button
                  type="button"
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className="w-full flex items-center justify-between py-3 min-h-[44px] text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-brand-gold uppercase tracking-[0.2em] text-xs">
                    {group.label}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    className="inline-flex"
                  >
                    <ChevronDown
                      className="w-4 h-4 text-brand-gold/70"
                      aria-hidden="true"
                    />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      {group.links.map((link) => (
                        <li key={link.text} className="pb-3">
                          {link.href ? (
                            link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-cream/60 hover:text-brand-gold text-sm"
                              >
                                {link.text}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                className="text-brand-cream/60 hover:text-brand-gold text-sm"
                              >
                                {link.text}
                              </Link>
                            )
                          ) : (
                            <span className="text-brand-cream/60 text-sm">
                              {link.text}
                            </span>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Row 4: copyright */}
        <p className="text-brand-cream/30 text-[10px]">
          {t("footer.copyright")}
        </p>
      </div>

      {/* ── Desktop (lg+) — existing 4-column grid, unchanged ── */}
      <div className="relative section-container hidden lg:grid pt-20 pb-20 grid-cols-4 gap-12">
        {/* Brand column */}
        <motion.div className="space-y-5" {...columnVariants(0)}>
          <Image
            src="/images/al-yasmine-center-logo-light.png"
            alt="Al Yasmine Center"
            width={180}
            height={64}
            className="h-12 w-auto"
          />
          <p className="text-brand-cream/50 text-sm italic max-w-xs">
            {t("footer.tagline")}
          </p>

          <div className="space-y-3 pt-2">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-cream/60 text-sm hover:text-brand-gold transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
              @Alyasmine_center
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-brand-cream/60 text-sm hover:text-brand-gold transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phone}
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
                <li key={link.text}>
                  {link.href ? (
                    link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 inline-block text-brand-cream/60 hover:text-brand-gold transition-colors duration-300 text-sm"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="py-2 inline-block text-brand-cream/60 hover:text-brand-gold transition-colors duration-300 text-sm"
                      >
                        {link.text}
                      </Link>
                    )
                  ) : (
                    <span className="py-2 inline-block text-brand-cream/60 text-sm">
                      {link.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </footer>
  );
}
