import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { LegalBlock, LegalDoc } from "@/lib/legalContent";

function Blocks({ blocks, isAr }: { blocks: LegalBlock[]; isAr: boolean }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.ul) {
          return (
            <ul
              key={i}
              className={`space-y-2 ${isAr ? "pr-5" : "pl-5"} list-disc marker:text-brand-gold`}
            >
              {block.ul.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block.p}</p>;
      })}
    </>
  );
}

export default function LegalDocView({
  doc,
  lang,
}: {
  doc: LegalDoc;
  lang: Locale;
}) {
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const multiPolicy = doc.policies.length > 1;

  return (
    <div className="pt-20 pb-28" dir={dir}>
      <div className="section-container max-w-3xl mx-auto pt-16">
        <p className="text-brand-gold text-[14px] tracking-[0.25em] uppercase font-medium mb-4">
          {doc.eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-brand-dark mb-4">
          {doc.heading}
        </h1>
        <div className="w-14 h-0.5 bg-brand-gold mb-8" />

        {doc.intro && (
          <p className="text-brand-dark/70 text-sm leading-relaxed mb-10">
            {doc.intro}
          </p>
        )}

        <div className="space-y-14 text-brand-dark/70 text-sm leading-relaxed">
          {doc.policies.map((policy, pi) => (
            <article key={pi} className="space-y-8">
              {multiPolicy && (
                <header className="scroll-mt-24" id={`policy-${pi + 1}`}>
                  <h2 className="font-display text-2xl md:text-[28px] text-brand-dark font-extrabold">
                    {policy.title}
                  </h2>
                  <div className="w-10 h-0.5 bg-brand-gold/60 mt-3" />
                </header>
              )}

              {policy.intro && <Blocks blocks={policy.intro} isAr={isAr} />}

              {policy.sections.map((section, si) => (
                <section key={si} className="space-y-3">
                  {multiPolicy ? (
                    <h3 className="font-display text-lg text-brand-dark font-extrabold">
                      {section.heading}
                    </h3>
                  ) : (
                    <h2 className="font-display text-xl text-brand-dark font-extrabold">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-3">
                    <Blocks blocks={section.blocks} isAr={isAr} />
                  </div>
                </section>
              ))}
            </article>
          ))}

          <p className="text-xs text-brand-dark/40 pt-4 border-t border-brand-cream">
            {doc.lastUpdated}
          </p>
        </div>

        <div className="mt-12">
          <Link
            href={`/${lang}`}
            className="text-sm text-brand-teal hover:underline underline-offset-4"
          >
            {doc.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
