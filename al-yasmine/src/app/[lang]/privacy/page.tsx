import { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { privacyContent } from "@/lib/legalContent";
import LegalDocView from "@/components/legal/LegalDocView";

const titles: Record<Locale, string> = {
  en: "Privacy Policy | Al Yasmine Center",
  ar: "سياسة الخصوصية | مركز الياسمين",
};

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return { title: titles[params.lang] ?? titles.en };
}

export default function PrivacyPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const doc = privacyContent[lang] ?? privacyContent.en;
  return <LegalDocView doc={doc} lang={lang} />;
}
