// ─── Site Configuration ───────────────────────────────────────────────────────

export const siteConfig = {
  name:        "Al Yasmine Center",
  nameAr:      "مركز الياسمين",
  tagline:     "Grow. Transform. Bloom.",
  taglineAr:   "انمُ. تحوّل. تفتّح.",
  description: "Transformative coaching and personal development programs designed to help you unlock your fullest potential.",
  url:         "https://alyasminecenter.com",
  email:       "hello@alyasminecenter.com",
  phone:       "+971 52 441 7078",
  instagram:   "https://instagram.com/alyasmine_center",

  // TODO: Replace with your real Calendly link when ready
  // e.g. "https://calendly.com/aliyah-albahari/discovery-call"
  calendlyUrl: "",

  // Coach — update photo URL when real one is available
  coachName:   "Aliyah Al Bahari",
  coachNameAr: "علياء البحري",
  coachTitle:  "CBT Specialist & Certified Life Coach",
  // TODO: Add full bio when client provides it
  coachBio:    "Aliyah Al Bahari is a Cognitive Behavioural Therapy specialist and certified life coach dedicated to guiding women through meaningful, lasting transformation. Her evidence-based approach creates a safe, nurturing space where real change becomes possible.",
  // TODO: Replace with real photo
  coachPhoto:  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Home",        href: "/"            },
  { label: "About",       href: "/about"       },
  { label: "Services",    href: "/services"    },
  { label: "Proof",       href: "/proof"       },
  { label: "Pricing",     href: "/pricing"     },
  { label: "Book Now",    href: "/booking", isButton: true },
] as const;

// ─── Brand Colors ─────────────────────────────────────────────────────────────

export const brandColors = {
  gold:      "#ECA200",
  cream:     "#F6F2E9",
  teal:      "#035A60",
  tealLight: "#7FB0B4",
  charcoal:  "#252525",
  dark:      "#2F2F2F",
  blush:     "#F2C4B5",
} as const;

// ─── Services ─────────────────────────────────────────────────────────────────

export const services = [
  {
    id:          "one-on-one",
    title:       "1-on-1 Coaching",
    titleAr:     "جلسات فردية",
    description: "Personalised CBT-based sessions tailored to your unique goals and challenges.",
    icon:        "✦",
    duration:    "60 min",
    price:       350,
  },
  {
    id:          "group-sessions",
    title:       "Group Sessions",
    titleAr:     "جلسات جماعية",
    description: "Grow alongside a community of like-minded women in a safe, supportive setting.",
    icon:        "◈",
    duration:    "90 min",
    price:       150,
  },
  {
    id:          "intensive",
    title:       "Intensive Program",
    titleAr:     "برنامج مكثّف",
    description: "Deep-dive transformation over 8 weeks with full CBT support and accountability.",
    icon:        "❋",
    duration:    "8 weeks",
    price:       1800,
  },
  {
    id:          "workshop",
    title:       "Workshops",
    titleAr:     "ورش العمل",
    description: "Focused skill-building sessions on specific life areas using proven CBT techniques.",
    icon:        "◇",
    duration:    "Half-day",
    price:       200,
  },
] as const;

// ─── Pricing Plans ────────────────────────────────────────────────────────────

export const pricingPlans = [
  {
    id:          "starter",
    name:        "Starter",
    nameAr:      "البداية",
    description: "Perfect for your first step toward transformation.",
    price:       350,
    period:      "session",
    features: [
      "1 × 60-min coaching session",
      "Personalised action plan",
      "Follow-up resources",
      "Email support (48h response)",
    ],
    highlighted: false,
    cta:         "Book a Session",
  },
  {
    id:          "bloom",
    name:        "Bloom",
    nameAr:      "الازدهار",
    description: "Our most popular program for lasting change.",
    price:       1200,
    period:      "month",
    features: [
      "4 × 60-min coaching sessions",
      "Unlimited messaging support",
      "Custom growth roadmap",
      "Access to pre-session client guide",
      "Priority booking",
    ],
    highlighted: true,
    badge:       "Most Popular",
    cta:         "Start Blooming",
  },
  {
    id:          "intensive",
    name:        "Intensive",
    nameAr:      "المكثّف",
    description: "Full immersion for women ready to transform completely.",
    price:       3200,
    period:      "8 weeks",
    features: [
      "8 × 90-min deep-dive sessions",
      "24/7 WhatsApp support",
      "Full CBT assessment & diagnostics",
      "Personalised workbook",
      "Post-program check-in (30 days)",
      "Group community access",
    ],
    highlighted: false,
    cta:         "Apply Now",
  },
] as const;

// ─── Testimonials ─────────────────────────────────────────────────────────────
// TODO: Replace with verified real testimonials + photos from clients

export const testimonials = [
  {
    id:     1,
    name:   "Sara Al-Mansouri",
    role:   "Entrepreneur",
    quote:  "Working with Al Yasmine Center completely shifted my perspective. Within 3 months I launched my business and finally feel aligned with my purpose.",
    rating: 5,
    image:  null,
  },
  {
    id:     2,
    name:   "Nour Khalid",
    role:   "Corporate Manager",
    quote:  "I was skeptical at first, but the results speak for themselves. My confidence at work has doubled and my relationships have transformed.",
    rating: 4,
    image:  null,
  },
  {
    id:     3,
    name:   "Lina Hamdan",
    role:   "Teacher",
    quote:  "The sessions with Aliyah completely changed how I see myself. The 1-on-1 work took everything to a completely new level.",
    rating: 5,
    image:  null,
  },
] as const;
