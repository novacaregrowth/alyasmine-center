"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";

interface CalendlyEmbedProps {
  url: string;
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  useEffect(() => {
    if (!url) return;
    const script = document.createElement("script");
    script.src   = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [url]);

  // ── No URL configured ──────────────────────────────────────────────────────
  if (!url) {
    return (
      <div className="w-full rounded-3xl border-2 border-dashed border-brand-teal/20 bg-brand-cream/40 flex flex-col items-center justify-center gap-5 py-20 px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-teal/8 flex items-center justify-center">
          <Calendar className="w-7 h-7 text-brand-teal/50" />
        </div>
        <div>
          <p className="font-display text-2xl text-brand-dark font-light mb-2">Booking Coming Soon</p>
          <p className="text-sm text-brand-dark/50 leading-relaxed max-w-xs">
            Our online booking will be live shortly. In the meantime, reach out directly:
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href="tel:+971524417078" className="flex items-center gap-2 px-5 py-3 bg-brand-teal text-brand-cream rounded-full hover:bg-brand-teal/90 transition-all hover:scale-105">
            📞 &nbsp;+971 52 441 7078
          </a>
          <a href="mailto:hello@alyasminecenter.com" className="flex items-center gap-2 px-5 py-3 border border-brand-teal text-brand-teal rounded-full hover:bg-brand-teal/5 transition-all">
            ✉ &nbsp;hello@alyasminecenter.com
          </a>
        </div>
      </div>
    );
  }

  // ── Calendly embed ─────────────────────────────────────────────────────────
  return (
    <div
      className="calendly-inline-widget w-full rounded-3xl overflow-hidden"
      data-url={url}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}
