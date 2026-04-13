import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Al Yasmine Brand Colors ───────────────────────────────────────
      colors: {
        brand: {
          gold:       "#ECA200",  // primary accent
          cream:      "#F6F2E9",  // background / light surfaces
          teal:       "#035A60",  // deep teal (CTAs, headings)
          "teal-light": "#7FB0B4", // secondary teal
          dark:       "#2F2F2F",  // footer / dark surfaces
          charcoal:   "#2F2F2F",  // body text / neutral dark
          blush:      "#FDCCBE",  // soft pink (from logo bg)
        },
        // Semantic aliases
        background:   "var(--background)",
        foreground:   "var(--foreground)",
        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT:    "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border:       "var(--border)",
        input:        "var(--input)",
        ring:         "var(--ring)",
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT:    "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
      },

      // ─── Typography ────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "serif"],
        arabic:  ["var(--font-arabic)", "serif"],
      },

      // ─── Spacing / Sizing ──────────────────────────────────────────────
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "2rem",
      },

      // ─── Animations ────────────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "bloom": {
          "0%":   { transform: "scale(0.8) rotate(-5deg)", opacity: "0" },
          "60%":  { transform: "scale(1.05) rotate(2deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        moveHorizontal: {
          "0%":   { transform: "translateX(-50%) translateY(-10%)" },
          "50%":  { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%":   { transform: "rotate(0deg)" },
          "50%":  { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%":   { transform: "translateY(-50%)" },
          "50%":  { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s ease-out both",
        "fade-in":        "fade-in 0.4s ease-out both",
        "bloom":          "bloom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "float":          "float 3s ease-in-out infinite",
        "shimmer":        "shimmer 2.5s linear infinite",
        "first":          "moveVertical 30s ease infinite",
        "second":         "moveInCircle 20s reverse infinite",
        "third":          "moveInCircle 40s linear infinite",
        "fourth":         "moveHorizontal 40s ease infinite",
        "fifth":          "moveInCircle 20s ease infinite",
      },

      // ─── Background Patterns ───────────────────────────────────────────
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        "brand-gradient": "linear-gradient(135deg, #F6F2E9 0%, #fff 50%, #e8f4f5 100%)",
        "teal-gradient":  "linear-gradient(135deg, #035A60 0%, #7FB0B4 100%)",
        "gold-shimmer":   "linear-gradient(90deg, transparent 0%, #ECA200 50%, transparent 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }) {
      addVariant("rtl", '[dir="rtl"] &');
      addVariant("ltr", '[dir="ltr"] &');
    }),
  ],
};

export default config;
