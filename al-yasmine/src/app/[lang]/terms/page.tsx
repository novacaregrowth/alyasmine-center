import Link from "next/link";
import { Metadata } from "next";
import { getTranslator, type Locale } from "@/lib/i18n";

const titles: Record<Locale, string> = {
  en: "Terms & Conditions — Al Yasmine Center",
  ar: "الشروط والأحكام — مركز الياسمين",
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
  const t = getTranslator(lang);
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  return (
    <div className="pt-20 pb-28" dir={dir}>
      <div className="section-container max-w-2xl mx-auto pt-16">
        <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
          {t("termsPage.eyebrow")}
        </p>
        <h1 className="font-display font-light text-brand-dark mb-4">
          {t("termsPage.heading")}
        </h1>
        <div className="w-14 h-0.5 bg-brand-gold mb-10" />

        <div className="space-y-8 text-brand-dark/70 text-sm leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("termsPage.section1Heading")}</h2>
            <p>{t("termsPage.section1Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("termsPage.section2Heading")}</h2>
            <p>{t("termsPage.section2Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("termsPage.section3Heading")}</h2>
            <p>{t("termsPage.section3Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("termsPage.section4Heading")}</h2>
            <p>
              {t("termsPage.section4BodyBefore")}
              <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline" dir="ltr">hello@alyasminecenter.com</a>
              {t("termsPage.section4BodyAfter")}
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("termsPage.section5Heading")}</h2>
            <p>{t("termsPage.section5Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("termsPage.section6Heading")}</h2>
            <p>
              {t("termsPage.section6BodyBefore")}
              <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline" dir="ltr">hello@alyasminecenter.com</a>
              {t("termsPage.section6BodyMiddle")}
              <a href="tel:+971524417078" className="text-brand-teal hover:underline" dir="ltr">+971 52 441 7078</a>
              {t("termsPage.section6BodyAfter")}
            </p>
          </section>

          <p className="text-xs text-brand-dark/40 pt-4 border-t border-brand-cream">{t("termsPage.lastUpdated")}</p>
        </div>

        <div className="mt-12">
          <Link href={`/${lang}`} className="text-sm text-brand-teal hover:underline underline-offset-4">{t("termsPage.back")}</Link>
        </div>
      </div>
    </div>
  );
}
