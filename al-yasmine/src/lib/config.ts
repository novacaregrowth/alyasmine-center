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
    id:          "consultation",
    title:       "Psychological Consultation",
    // TODO: verify Arabic title with client — may be internal label not public-facing brand name
    titleAr:     "رسالة الاستشارات",
    description: "A first consultation session focused on identifying your concern and building the right action plan together — the essential first step before any therapeutic journey.",
    descriptionAr: "جلسة استشارية أولى تركّز على فهم وضعك وبناء خطة عمل مناسبة — الخطوة الأساسية قبل أي رحلة علاجية.",
    includes: [
      "Initial assessment of your concern",
      "Professional guidance from Aliyah",
      "A personalised action plan for next steps",
    ],
    format:      "Online via Zoom",
    duration:    "90 min",
    price:       685,
    priceNote:   "Includes tax. Urgent consultation available at different pricing — contact us.",
    icon:        "✦",
  },
  {
    id:          "cbt-sessions",
    title:       "Psychological Counseling & CBT Sessions",
    titleAr:     "جلسات الإرشاد النفسي و العلاج السلوكي المعرفي",
    description: "Follow-up sessions designed to apply the action plan agreed in your initial consultation. This is where real, lasting change takes root.",
    descriptionAr: "جلسات متابعة لتطبيق خطة العمل المتفق عليها في الاستشارة الأولى. هنا يبدأ التغيير الحقيقي والعميق.",
    includes: [
      "Ongoing therapeutic support",
      "Application of your personalised treatment plan",
      "Sessions with Aliyah Al Bahari",
    ],
    format:      "Session-based",
    duration:    "50 min per session",
    price:       550,
    priceNote:   "Per session. Minimum package: 4 sessions (AED 2,200 total).",
    icon:        "◈",
  },
  {
    id:          "prewedding",
    title:       "Pre-Wedding Psychological Preparation",
    titleAr:     "رحلة ما قبل الزفاف – إعداد نفسي عميق للحياة الزوجية",
    description: "A premium, invitation-only program for brides who want to enter married life with deep emotional clarity, healthy relationship patterns, and genuine inner readiness.",
    descriptionAr: "برنامج حصري للعرائس اللواتي يردن الدخول إلى الحياة الزوجية بوعي عاطفي عميق وأنماط علاقات صحية واستعداد نفسي حقيقي.",
    includes: [
      "8 individual sessions with the bride",
      "2 joint sessions with the groom",
      "CBT-based psychological guidance",
      "Supervision by Aliyah Al Bahari",
    ],
    format:      "Session-based program",
    duration:    "10 sessions total",
    price:       13500,
    priceNote:   "Admission is selective. Apply by sending 'Ready' on WhatsApp.",
    icon:        "❋",
  },
  {
    id:          "adolescent",
    title:       "The Art of Dealing with an Adolescent",
    titleAr:     "فن التعامل مع المراهق",
    description: "A recorded course for mothers and parents who want to truly understand their adolescent — and become the calm, influential presence their child needs.",
    descriptionAr: "دورة مسجّلة للأمهات والآباء الذين يريدون فهم مراهقيهم حقًا — وأن يكونوا الحضور الهادئ والمؤثر الذي يحتاجه أبناؤهم.",
    includes: [
      "5 recorded sessions",
      "Listening and communication skills",
      "Discipline without conflict",
      "Building self-esteem in your adolescent",
    ],
    format:      "Recorded course — links sent after payment",
    duration:    "Access for 15 days",
    price:       550,
    priceNote:   "Includes tax.",
    icon:        "◇",
  },
  {
    id:          "red-eye",
    title:       "Red Eye Mechanism & Communication Program",
    // TODO: verify Arabic title with client — confirm emoji usage is intentional for public site
    titleAr:     "آلية العين الحمراء + لغات التواصل والتأثير",
    // TODO: awaiting plain-language description from client — what is the Red Eye Mechanism?
    description: "A comprehensive recorded program combining the Red Eye Mechanism with communication and influence training, plus a bonus course on family stability.",
    descriptionAr: "برنامج مسجّل شامل يجمع بين آلية العين الحمراء وتدريب التواصل والتأثير، مع دورة مجانية في أسس الاستقرار الأسري.",
    includes: [
      "6 core recorded sessions",
      "Bonus course: Fundamentals of Family Stability",
      "8 sessions total including bonus",
    ],
    format:      "Recorded course — links sent after payment",
    duration:    "Access for 1 month",
    price:       1200,
    priceNote:   null,
    icon:        "◇",
  },
  {
    id:          "smart-memory",
    title:       "Excellence Journey: Smart Memory Course",
    titleAr:     "دورة رحلة التميز نحو الذاكرة الذكية",
    description: "A memory development course teaching activation skills and fast memorisation techniques, with daily exercises, personal supervision, and confidence-building psychological training.",
    descriptionAr: "دورة لتطوير الذاكرة تُعلّم مهارات التنشيط وتقنيات الحفظ السريع، مع تمارين يومية وإشراف شخصي وتدريب نفسي لبناء الثقة بالنفس.",
    includes: [
      "Memory activation training",
      "Daily exercises for approximately one month",
      "Supervision by Aliyah and her team",
      "Psychological training to build positivity and confidence",
    ],
    // TODO: awaiting format details from client (live / recorded / hybrid)
    format:      "Contact us for details",
    duration:    "Approx. 1 month",
    price:       null,
    priceNote:   "Contact us for pricing.",
    icon:        "✦",
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
