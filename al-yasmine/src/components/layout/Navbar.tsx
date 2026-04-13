"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, User, Star, Briefcase, Calendar, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTranslator, type Locale } from "@/lib/i18n";

function getNavItems(lang: Locale, t: (key: string) => string) {
  return [
    { name: t("nav.home"),     url: `/${lang}`,          icon: Home      },
    { name: t("nav.about"),    url: `/${lang}/about`,    icon: User      },
    { name: t("nav.services"), url: `/${lang}/services`, icon: Briefcase },
    { name: t("nav.proof"),    url: `/${lang}/proof`,    icon: Star      },
  ];
}

function getActiveName(pathname: string, navItems: ReturnType<typeof getNavItems>): string {
  const stripped = pathname.replace(/^\/(en|ar)/, "") || "/";
  if (stripped === "/" || stripped === "") return navItems[0].name;
  const match = navItems.find((item) => {
    const itemStripped = item.url.replace(/^\/(en|ar)/, "") || "/";
    return itemStripped !== "/" && stripped.startsWith(itemStripped);
  });
  return match?.name ?? navItems[0].name;
}

function LanguageSwitcher({ lang, heroMode }: { lang: Locale; heroMode: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (target: Locale) => {
    if (target === lang) return;
    const newPath = pathname.replace(/^\/(en|ar)/, `/${target}`);
    router.push(newPath);
  };

  return (
    <div className={cn(
      "flex items-center rounded-full p-0.5 text-xs font-medium",
      heroMode ? "bg-white/10" : "bg-brand-cream/80 border border-brand-cream"
    )}>
      <button
        onClick={() => switchTo("en")}
        className={cn(
          "px-3 py-1.5 rounded-full transition-colors duration-200",
          lang === "en"
            ? "bg-brand-teal text-brand-cream"
            : heroMode
              ? "text-white/50 hover:text-white"
              : "text-brand-dark/50 hover:text-brand-dark"
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchTo("ar")}
        className={cn(
          "px-3 py-1.5 rounded-full transition-colors duration-200",
          lang === "ar"
            ? "bg-brand-teal text-brand-cream"
            : heroMode
              ? "text-white/50 hover:text-white"
              : "text-brand-dark/50 hover:text-brand-dark"
        )}
      >
        عر
      </button>
    </div>
  );
}

export function Navbar({ lang = "en" as Locale }: { lang?: Locale }) {
  const t = getTranslator(lang);
  const navItems = getNavItems(lang, t);
  const pathname  = usePathname();
  const activeTab = getActiveName(pathname, navItems);
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  const strippedPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  const isHome = strippedPath === "/";
  const heroMode = isHome && !scrolled;
  const heroModeMobile = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Desktop ── */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 hidden lg:flex items-center justify-between px-8 h-20 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-cream"
          : "bg-transparent"
      )}>
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src={heroMode
              ? "/images/al-yasmine-center-logo-light.png"
              : "/images/al-yasmine-center-logo.png"}
            alt="Al Yasmine Center"
            width={160}
            height={56}
            className="h-11 w-auto transition-all duration-300"
          />
        </Link>

        <div className={cn(
          "flex items-center gap-1 py-1 px-1 rounded-full transition-all duration-300",
          heroMode
            ? "bg-white/10 backdrop-blur-sm"
            : "bg-white/60 border border-brand-cream backdrop-blur-lg shadow-md"
        )}>
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link key={item.name} href={item.url}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300",
                  heroMode
                    ? cn("text-white/80 hover:text-white", isActive && "text-white")
                    : cn("text-brand-dark/70 hover:text-brand-teal", isActive && "text-brand-teal")
                )}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div layoutId="lamp"
                    className={cn(
                      "absolute inset-0 w-full rounded-full -z-10 transition-colors duration-300",
                      heroMode ? "bg-white/15" : "bg-brand-teal/8"
                    )}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className={cn(
                      "absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-t-full transition-colors duration-300",
                      heroMode ? "bg-white" : "bg-brand-teal"
                    )}>
                      <div className={cn(
                        "absolute w-10 h-5 rounded-full blur-md -top-2 -left-2 transition-colors duration-300",
                        heroMode ? "bg-white/20" : "bg-brand-teal/20"
                      )} />
                      <div className={cn(
                        "absolute w-6 h-4 rounded-full blur-md -top-1 transition-colors duration-300",
                        heroMode ? "bg-white/15" : "bg-brand-teal/15"
                      )} />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} heroMode={heroMode} />
          <Link href={`/${lang}/booking`}
            className="px-5 py-2.5 rounded-full bg-brand-gold text-brand-dark text-sm font-medium hover:bg-brand-gold/90 transition-all hover:scale-105 shadow-md shadow-brand-gold/20">
            {t("nav.bookNow")}
          </Link>
        </div>
      </header>

      {/* ── Mobile top bar ── */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 lg:hidden flex items-center justify-between px-5 h-16 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-cream"
          : "bg-transparent"
      )}>
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src={heroModeMobile
              ? "/images/al-yasmine-center-logo-light.png"
              : "/images/al-yasmine-center-logo.png"}
            alt="Al Yasmine Center"
            width={130}
            height={46}
            className="h-9 w-auto transition-all duration-300"
          />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} heroMode={heroModeMobile} />
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg transition-colors" aria-label="Toggle menu" aria-expanded={mobileOpen}>
            {mobileOpen
              ? <X className="w-5 h-5 text-brand-dark" />
              : <Menu className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  heroModeMobile ? "text-white" : "text-brand-dark"
                )} />
            }
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div className={cn(
        "fixed inset-x-0 top-16 z-40 lg:hidden bg-white/97 backdrop-blur-md border-b border-brand-cream transition-all duration-300 overflow-hidden",
        mobileOpen ? "max-h-[420px]" : "max-h-0"
      )}>
        <div className="px-5 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link key={item.name} href={item.url}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                  isActive ? "bg-brand-teal/8 text-brand-teal font-medium" : "text-brand-dark hover:bg-brand-cream hover:text-brand-teal"
                )}>
                <item.icon className={cn("w-4 h-4", isActive ? "text-brand-teal" : "text-brand-teal-light")} />
                {item.name}
              </Link>
            );
          })}
          <Link href={`/${lang}/booking`}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-gold text-brand-dark text-sm font-medium">
            <Calendar className="w-4 h-4" /> {t("nav.bookNow")}
          </Link>
        </div>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden">
        <div className="mx-3 mb-3 flex items-center justify-around bg-white/92 border border-brand-cream backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {navItems.slice(0, 5).map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link key={item.name} href={item.url}
                className={cn(
                  "relative flex flex-col items-center p-2 rounded-full transition-colors min-w-[48px]",
                  isActive ? "text-brand-teal" : "text-brand-dark/45"
                )}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {isActive && (
                  <motion.div layoutId="lamp-mobile"
                    className="absolute inset-0 bg-brand-teal/8 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-teal rounded-t-full">
                      <div className="absolute w-8 h-4 bg-brand-teal/20 rounded-full blur-sm -top-2 -left-1.5" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
          <Link href={`/${lang}/booking`}
            className="flex flex-col items-center p-2 rounded-full bg-brand-gold text-brand-dark min-w-[48px]">
            <Calendar size={20} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </>
  );
}
