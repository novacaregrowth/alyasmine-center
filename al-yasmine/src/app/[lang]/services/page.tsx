import type { Metadata } from "next";
import ServicesPage from "./PageClient";
import type { Locale } from "@/lib/i18n";

const titles: Record<Locale, string> = {
  en: "Services | Al Yasmine Center",
  ar: "الخدمات | مركز الياسمين",
};

const descriptions: Record<Locale, string> = {
  en: "Psychological consultation, CBT sessions, and women-only programs with Alia AlBahri.",
  ar: "الاستشارة النفسية، جلسات العلاج المعرفي السلوكي، وبرامج مخصصة للنساء مع علياء البحري.",
};

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  const { lang } = params;
  const locale = lang === "ar" ? "ar_AE" : "en_AE";
  return {
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
    openGraph: {
      locale,
      title: titles[lang] ?? titles.en,
      description: descriptions[lang] ?? descriptions.en,
    },
  };
}

export default ServicesPage;
