// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  icon: string;
  duration: string;
  price: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  price: number;
  period: string;
  features: readonly string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string | null;
}

export interface NavLink {
  label: string;
  href: string;
  isButton?: boolean;
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  serviceId: string;
  message?: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface TimeSlot {
  id: string;
  date: string;       // ISO date string
  startTime: string;  // "HH:MM"
  endTime: string;    // "HH:MM"
  isAvailable: boolean;
  bookedBy?: string;
}

export interface AdminSettings {
  calendlyUrl: string;
  availableHours: {
    start: string;
    end: string;
  };
  workingDays: number[];  // 0 = Sunday, 6 = Saturday
  bufferMinutes: number;
}
