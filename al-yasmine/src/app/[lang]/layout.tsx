import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { BreathWrapper } from "@/components/layout/BreathWrapper";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const lang = params.lang;

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background font-body antialiased">
        <LenisProvider>
          <ScrollProgress />
          <Navbar lang={lang} />
          <main>
            <BreathWrapper>{children}</BreathWrapper>
          </main>
          <Footer lang={lang} />
        </LenisProvider>
      </body>
    </html>
  );
}
