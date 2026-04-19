import Link from "next/link";
import { Metadata } from "next";
import { getTranslator, type Locale } from "@/lib/i18n";

const titles: Record<Locale, string> = {
  en: "Privacy Policy — Al Yasmine Center",
  ar: "سياسة الخصوصية — مركز الياسمين",
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
  const t = getTranslator(lang);
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  return (
    <div className="pt-20 pb-28" dir={dir}>
      <div className="section-container max-w-2xl mx-auto pt-16">
        <p className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
          {t("privacyPage.eyebrow")}
        </p>
        <h1 className="font-display font-light text-brand-dark mb-4">
          {t("privacyPage.heading")}
        </h1>
        <div className="w-14 h-0.5 bg-brand-gold mb-10" />

        <div className="prose prose-sm max-w-none space-y-8 text-brand-dark/70 text-sm leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("privacyPage.section1Heading")}</h2>
            <p>{t("privacyPage.section1Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("privacyPage.section2Heading")}</h2>
            <p>{t("privacyPage.section2Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("privacyPage.section3Heading")}</h2>
            <p>{t("privacyPage.section3Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("privacyPage.section4Heading")}</h2>
            <p>{t("privacyPage.section4Body")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("privacyPage.section5Heading")}</h2>
            <p>
              {t("privacyPage.section5BodyBefore")}
              <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline" dir="ltr">hello@alyasminecenter.com</a>
              {t("privacyPage.section5BodyAfter")}
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3 font-light">{t("privacyPage.section6Heading")}</h2>
            <p>
              {t("privacyPage.section6BodyBefore")}
              <a href="mailto:hello@alyasminecenter.com" className="text-brand-teal hover:underline" dir="ltr">hello@alyasminecenter.com</a>
              {t("privacyPage.section6BodyMiddle")}
              <a href="tel:+971524417078" className="text-brand-teal hover:underline" dir="ltr">+971 52 441 7078</a>
              {t("privacyPage.section6BodyAfter")}
            </p>
          </section>

          <p className="text-xs text-brand-dark/40 pt-4 border-t border-brand-cream">{t("privacyPage.lastUpdated")}</p>
        </div>

        <div className="mt-12">
          <Link href={`/${lang}`} className="text-sm text-brand-teal hover:underline underline-offset-4">{t("privacyPage.back")}</Link>
        </div>
      </div>
    </div>
  );
}
