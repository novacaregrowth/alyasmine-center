import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-cream/80">
      {/* Main footer */}
      <div className="section-container py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div>
            <p className="font-display text-2xl text-brand-cream font-light">
              {siteConfig.name}
            </p>
            <p className="arabic text-brand-teal-light text-sm mt-1" lang="ar">
              {siteConfig.nameAr}
            </p>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            {siteConfig.description}
          </p>
          {/* Social */}
          <div className="flex gap-3 pt-2">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-brand-cream/20 hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-2 rounded-full border border-brand-cream/20 hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="p-2 rounded-full border border-brand-cream/20 hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <h4 className="text-brand-cream text-sm font-medium tracking-widest uppercase">
            Pages
          </h4>
          <ul className="space-y-2">
            {navLinks
              .filter((l) => !l.isButton)
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Contact + CTA */}
        <div className="space-y-4">
          <h4 className="text-brand-cream text-sm font-medium tracking-widest uppercase">
            Get in Touch
          </h4>
          <div className="space-y-2 text-sm">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
          </div>
          <Link
            href="/booking"
            className="inline-block mt-4 px-6 py-3 bg-brand-gold text-brand-dark rounded-full text-sm font-medium hover:bg-brand-gold/90 transition-colors"
          >
            Book a Session ✦
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-cream/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-cream/40">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-cream/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-cream/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
