# Al Yasmine Center — Website

Coaching & personal development website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom brand tokens |
| Components | shadcn/ui + Radix UI |
| Booking | Calendly (inline embed + webhooks) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Email | Resend (to set up) |
| Auth (admin) | Add Clerk or NextAuth |

---

## Brand

| Token | Value | Use |
|-------|-------|-----|
| `brand-gold` | `#ECA200` | Accent, CTAs |
| `brand-cream` | `#F6F2E9` | Background |
| `brand-teal` | `#035A60` | Primary, headings |
| `brand-teal-light` | `#7FB0B4` | Secondary |
| `brand-charcoal` | `#252525` | Body text |
| `brand-dark` | `#2F2F2F` | Footer, admin |

**Fonts:** Cormorant Garamond (display/headings) + DM Sans (body) + Noto Naskh Arabic (Arabic text)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── about/                # About Us
│   ├── services/             # Services
│   ├── proof/                # Case Studies & Testimonials
│   ├── pricing/              # Pricing Plans
│   ├── free-course/          # Free Course
│   ├── booking/              # Calendly booking page
│   ├── admin/
│   │   ├── dashboard/        # Admin overview
│   │   ├── calendar/         # Booking management
│   │   └── availability/     # Availability settings
│   └── api/
│       └── webhooks/
│           └── calendly/     # Calendly webhook handler
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── booking/
│       └── CalendlyEmbed.tsx
├── lib/
│   ├── config.ts             # ← UPDATE THIS with real content
│   └── utils.ts
├── types/
│   └── index.ts
└── styles/
    └── globals.css
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in your values (Calendly URL, API tokens, etc.)

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key Configuration

### 1. Update Content (`src/lib/config.ts`)
- `siteConfig.calendlyUrl` — your Calendly scheduling URL
- `services` — your real service offerings
- `pricingPlans` — your actual pricing
- `testimonials` — real client testimonials

### 2. Calendly Setup
1. Create account at [calendly.com](https://calendly.com)
2. Set your availability
3. Copy your scheduling URL → add to `siteConfig.calendlyUrl`
4. For admin webhooks: Integrations → API & Webhooks → add token to `.env.local`

### 3. Admin Auth
The `/admin` routes are **currently unprotected**. Before deploying, add auth:
- **Clerk** (recommended): `npm install @clerk/nextjs`
- **NextAuth**: `npm install next-auth`

### 4. Instagram Feed (optional)
- Use the Instagram Basic Display API or a service like Behold.so
- Add to the homepage hero section

---

## Deployment

Deploy to **Vercel** (recommended for Next.js):

```bash
npm install -g vercel
vercel
```

Add all environment variables in Vercel dashboard → Settings → Environment Variables.

---

## TODO Checklist

- [ ] Add real content to `src/lib/config.ts`
- [ ] Add coach photo and bio to `/about` page
- [ ] Connect Calendly URL
- [ ] Set up admin auth (Clerk recommended)
- [ ] Configure Calendly webhooks
- [ ] Add email notifications (Resend)
- [ ] Add real case studies to `/proof` page
- [ ] Connect free course platform (Notion, Teachable, etc.)
- [ ] Add Instagram feed to homepage
- [ ] SEO: Add OG images, sitemap, robots.txt
