import type { Metadata } from "next";
import BookingPage from "./PageClient";
import type { Locale } from "@/lib/i18n";

const titles: Record<Locale, string> = {
  en: "Book a Session — Al Yasmine Center",
  ar: "احجزي موعدك — مركز الياسمين",
};

const descriptions: Record<Locale, string> = {
  en: "Book a session with Alia AlBahri at Al Yasmine Center.",
  ar: "احجزي جلستك مع علياء البحري في مركز الياسمين.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <BookingPage lang={lang} />;
}
