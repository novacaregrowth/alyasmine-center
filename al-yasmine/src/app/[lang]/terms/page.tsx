import { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { termsContent } from "@/lib/legalContentTerms";
import LegalDocView from "@/components/legal/LegalDocView";

const titles: Record<Locale, string> = {
  en: "Terms & Policies | Al Yasmine Center",
  ar: "الشروط والسياسات | مركز الياسمين",
};

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return { title: titles[params.lang] ?? titles.en };
}

export default function TermsPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const doc = termsContent[lang] ?? termsContent.en;
  return <LegalDocView doc={doc} lang={lang} />;
}
