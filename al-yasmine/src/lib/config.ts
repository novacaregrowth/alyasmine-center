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
  coachName:   "Alia AlBahri",
  coachNameAr: "علياء البحري",
  coachTitle:  "CBT Specialist & Certified Life Coach",
  // TODO: Add full bio when client provides it
  coachBio:    "Alia AlBahri is a Cognitive Behavioural Therapy specialist and certified life coach dedicated to guiding women through meaningful, lasting transformation. Her evidence-based approach creates a safe, nurturing space where real change becomes possible.",
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
    titleAr:     "الاستشارة النفسية",
    description: "A first consultation session focused on identifying your concern and building the right action plan together — the essential first step before any therapeutic journey.",
    descriptionAr: "جلسة استشارية أولى تركّز على فهم وضعك وبناء خطة عمل مناسبة — الخطوة الأساسية قبل أي رحلة علاجية.",
    includes: [
      "Initial assessment of your concern",
      "Professional guidance from Alia",
      "A personalised action plan for next steps",
    ],
    format:      "Online via Zoom",
    duration:    "90 min",
    price:       685,
    priceNote:   "Includes tax. Urgent consultation available at different pricing — contact us.",
    icon:        "✦",
    timeline: [
      { en: "Share your story in a safe, private space", ar: "شاركي قصتك في مساحة آمنة وخاصة" },
      { en: "Alia listens deeply to understand your situation", ar: "تستمع علياء بعمق لفهم وضعك" },
      { en: "Identify the core concern together", ar: "تحديد المشكلة الأساسية معاً" },
      { en: "Receive a personalised action plan", ar: "الحصول على خطة عمل مخصصة لكِ" },
      { en: "Leave with clarity and next steps", ar: "الخروج بوضوح وخطوات واضحة للأمام" },
    ],
  },
  {
    id:          "cbt-sessions",
    title:       "Psychological Counseling & CBT Sessions",
    titleAr:     "جلسات الإرشاد النفسي والعلاج السلوكي المعرفي",
    description: "Follow-up sessions designed to apply the action plan agreed in your initial consultation. This is where real, lasting change takes root.",
    descriptionAr: "جلسات متابعة لتطبيق خطة العمل المتفق عليها في الاستشارة الأولى. هنا يبدأ التغيير الحقيقي والعميق.",
    includes: [
      "Ongoing therapeutic support",
      "Application of your personalised treatment plan",
      "Sessions with Alia AlBahri",
    ],
    format:      "Session-based",
    duration:    "50 min per session",
    price:       550,
    priceNote:   "Per session. Minimum package: 4 sessions (AED 2,200 total).",
    icon:        "◈",
    timeline: [
      { en: "Apply your personalised treatment plan", ar: "تطبيق خطة العلاج المخصصة لكِ" },
      { en: "Identify and interrupt negative thinking patterns", ar: "تحديد ومقاطعة أنماط التفكير السلبية" },
      { en: "Learn CBT tools for anxiety and emotional regulation", ar: "تعلّم أدوات العلاج السلوكي المعرفي للقلق والتنظيم العاطفي" },
      { en: "Build long-term resilience — not dependency on sessions", ar: "بناء مرونة طويلة المدى — وليس الاعتماد على الجلسات" },
      { en: "Track progress and adjust your plan as you grow", ar: "متابعة التقدم وتعديل الخطة مع تطوّرك" },
    ],
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
      "Supervision by Alia AlBahri",
    ],
    format:      "Session-based program",
    duration:    "10 sessions total",
    price:       13500,
    priceNote:   "Admission is selective. Apply by sending 'Ready' on WhatsApp.",
    icon:        "❋",
    timeline: [
      { en: "Analyse your emotional thinking patterns before entering the relationship", ar: "تحليل نمط التفكير العاطفي لديكِ قبل الدخول في العلاقة" },
      { en: "Understand yourself and your psychological needs deeply", ar: "فهم ذاتك واحتياجاتك النفسية بشكل أعمق" },
      { en: "Learn languages of communication and emotional influence", ar: "تعلّم لغات التواصل والتأثير العاطفي مع الشريك" },
      { en: "Win your partner's heart through understanding, not pressure", ar: "كسب قلب شريكك بالفهم والاحتواء لا بالضغط والسيطرة" },
      { en: "Manage marital conflicts with awareness — without escalation", ar: "إدارة الخلافات الزوجية بوعي دون تصعيد أو انسحاب" },
      { en: "Discover and correct cognitive distortions that affect relationships", ar: "اكتشاف وتصحيح التشوهات الفكرية التي قد تؤثر على العلاقة" },
      { en: "Build inner security and trust within the relationship", ar: "بناء شعور داخلي بالأمان والثقة داخل العلاقة" },
      { en: "Realistic psychological preparation for married life", ar: "الاستعداد النفسي الواقعي لمسؤوليات الحياة الزوجية" },
    ],
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
    timeline: [
      { en: "Adolescence from an educational psychology perspective", ar: "المراهقة من منظور علم النفس التربوي" },
      { en: "The clash with your adolescent — causes and solutions", ar: "الصدام مع المراهق: أسبابه وعلاجه" },
      { en: "Core psychological needs and how to fulfil them properly", ar: "الحاجات النفسية الأساسية عند المراهق وطرق إشباعها الصحيحة" },
      { en: "How to be the psychologically healing parent", ar: "كيف أكون الأم المعالجة نفسياً لابنتي المراهقة" },
      { en: "Building balanced personality through psychological skills", ar: "المهارات النفسية التي تساهم في بناء شخصية متوازنة" },
      { en: "Encouragement that builds self-esteem and self-respect", ar: "مهارة التشجيع النفسي الذي يزيد من تقدير واحترام الذات" },
      { en: "How to have a successful, influential parental conversation", ar: "كيف أجري محادثة أبوية ناجحة ومؤثرة" },
      { en: "The art of listening to your adolescent", ar: "مهارة الإنصات للمراهق" },
      { en: "The skill of persuasion to change negative behaviour", ar: "مهارة إقناع المراهق وتغيير سلوكه السلبي" },
    ],
  },
  {
    id:            "red-eye",
    title:         "Red Eye Mechanism & Communication Program",
    titleAr:       "آلية العين الحمراء + لغات التواصل والتأثير",
    sensoryLine:   "When the love is still there — but the connection isn't",
    sensoryLineAr: "حين يبقى الحب — لكن يغيب التواصل",
    description:   "A proprietary psychological framework for navigating marriage challenges. Covers emotional neglect, rebuilding connection after discovered infidelity, understanding emotional cooling after years of marriage, reigniting the attraction phase, applying Gottman's conflict theory, understanding the emotional separation ('exit') phase of the marital cycle, and reviving true love through evidence-based psychological methods. Part of the Languages of Communication and Influence program.",
    descriptionAr: "إطار نفسي متخصص للتعامل مع تحديات الحياة الزوجية. يشمل: التعامل مع اللامبالاة والنقد المستمر، إعادة بناء العلاقة بعد اكتشاف علاقات غير مشروعة، فهم أسباب فتور المشاعر بعد سنوات الزواج، إعادة إشعال مرحلة الانجذاب، تطبيق نظرية غوتمان في مواجهة الخلافات، فهم مراحل الانفصال العاطفي في الدورة الزواجية، وإحياء مشاعر الحب الحقيقي بأساليب نفسية مؤثرة. ضمن برنامج لغات التواصل والتأثير.",
    includes: [
      "6 core recorded sessions",
      "Bonus course: Fundamentals of Family Stability",
      "8 sessions total including bonus",
    ],
    format:      "Contact us for format details",
    duration:    "Contact us for duration details",
    price:       null,
    priceNote:   "Contact us for pricing details.",
    icon:        "◇",
    timeline: [
      { en: "When he doesn't care and constantly criticises — how to respond", ar: "زوجي لا يهتم بي وينتقدني باستمرار — كيف أتعامل" },
      { en: "Dealing with emotional coolness after years of marriage", ar: "فتور المشاعر بعد سنوات من الزواج — لماذا وكيف" },
      { en: "Restoring feelings from the engagement phase — is it possible?", ar: "إعادة المشاعر كما كانت في مرحلة الخطوبة — هل هذا ممكن؟" },
      { en: "Gottman theory: developing skills for managing marital conflict", ar: "نظرية غوتمان: تطوير المهارات لمواجهة الخلافات الزوجية" },
      { en: "Understanding real love and refreshing it with psychological tools", ar: "التعرف على مشاعر الحب الحقيقي وإنعاشها بأساليب نفسية مؤثرة" },
      { en: "Bonus: Fundamentals of Family Stability course", ar: "هدية: دورة أسس الاستقرار الأسري" },
    ],
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
      "Supervision by Alia and her team",
      "Psychological training to build positivity and confidence",
    ],
    format:      "Contact us for details",
    duration:    "Approx. 1 month",
    price:       null,
    priceNote:   "[PLACEHOLDER]",
    icon:        "✦",
    timeline: [
      { en: "Memory activation and fast memorisation techniques", ar: "تنشيط الذاكرة وتقنيات الحفظ السريع" },
      { en: "Fun daily exercises that stimulate and strengthen memory", ar: "تدريبات يومية ممتعة ومحفزة لتنشيط الذاكرة" },
      { en: "The proper stabilisation technique for what you memorise", ar: "طريقة التثبيت الصحيحة للمحفوظ" },
      { en: "Psychological lectures to build positivity and confidence", ar: "محاضرات نفسية ترفع الإيجابية والثقة بالنفس" },
      { en: "Direct supervision from Alia AlBahri and her team", ar: "إشراف مباشر من أ. علياء البحري وفريقها المتميز" },
    ],
  },
] as const;

// ─── Testimonials ─────────────────────────────────────────────────────────────
// TODO: Replace with verified real testimonials + photos from clients

export const testimonials = [
  {
    id:     1,
    name:   "[PLACEHOLDER]",
    role:   "[PLACEHOLDER]",
    quote:  "[PLACEHOLDER — Client testimonial 1]",
    rating: 5,
    image:  null,
  },
  {
    id:     2,
    name:   "[PLACEHOLDER]",
    role:   "[PLACEHOLDER]",
    quote:  "[PLACEHOLDER — Client testimonial 2]",
    rating: 5,
    image:  null,
  },
  {
    id:     3,
    name:   "[PLACEHOLDER]",
    role:   "[PLACEHOLDER]",
    quote:  "[PLACEHOLDER — Client testimonial 3]",
    rating: 5,
    image:  null,
  },
] as const;
