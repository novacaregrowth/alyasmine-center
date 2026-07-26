import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "AED") {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/** WhatsApp deep-link with a per-service inquiry message (locale-aware). */
export function serviceWhatsAppHref(programName: string, lang: "ar" | "en" = "ar") {
  const text =
    lang === "ar"
      ? `السلام عليكم\nأرغب بمعرفة تفاصيل ${programName} وأتمنى معرفة خطوات التسجيل و كيف يمكنني الإنضمام`
      : `Hello,\nI would like to know more about ${programName}, including registration steps and how I can join.`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
