"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User, Star, Briefcase, DollarSign, Calendar, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const navItems = [
  { name: "Home",     url: "/",         icon: Home       },
  { name: "About",    url: "/about",    icon: User       },
  { name: "Services", url: "/services", icon: Briefcase  },
  { name: "Proof",    url: "/proof",    icon: Star       },
  { name: "Pricing",  url: "/pricing",  icon: DollarSign },
];

function getActiveName(pathname: string): string {
  if (pathname === "/") return "Home";
  const match = navItems.find((item) => item.url !== "/" && pathname.startsWith(item.url));
  return match?.name ?? "Home";
}

export function Navbar() {
  const pathname  = usePathname();
  const activeTab = getActiveName(pathname);
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Desktop ── */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 hidden lg:flex items-center justify-between px-8 h-20 transition-all duration-300",
        scrolled ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-brand-cream" : "bg-transparent"
      )}>
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl text-brand-teal font-medium">{siteConfig.name}</span>
          <span className="arabic text-xs text-brand-teal-light mt-0.5" lang="ar">{siteConfig.nameAr}</span>
        </Link>

        <div className="flex items-center gap-1 bg-white/60 border border-brand-cream backdrop-blur-lg py-1 px-1 rounded-full shadow-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link key={item.name} href={item.url}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors",
                  "text-brand-charcoal/70 hover:text-brand-teal",
                  isActive && "text-brand-teal"
                )}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div layoutId="lamp"
                    className="absolute inset-0 w-full bg-brand-teal/8 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-teal rounded-t-full">
                      <div className="absolute w-10 h-5 bg-brand-teal/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-6 h-4 bg-brand-teal/15 rounded-full blur-md -top-1" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>

        <Link href="/booking"
          className="px-5 py-2.5 rounded-full bg-brand-teal text-brand-cream text-sm font-medium hover:bg-brand-teal/90 transition-all hover:scale-105 shadow-md shadow-brand-teal/20">
          Book Now ✦
        </Link>
      </header>

      {/* ── Mobile top bar ── */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 lg:hidden flex items-center justify-between px-5 h-16 transition-all duration-300",
        scrolled || mobileOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-cream" : "bg-transparent"
      )}>
        <Link href="/" className="font-display text-lg text-brand-teal font-medium">{siteConfig.name}</Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-brand-cream transition-colors" aria-label="Toggle menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="w-5 h-5 text-brand-charcoal" /> : <Menu className="w-5 h-5 text-brand-charcoal" />}
        </button>
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
                  isActive ? "bg-brand-teal/8 text-brand-teal font-medium" : "text-brand-charcoal hover:bg-brand-cream hover:text-brand-teal"
                )}>
                <item.icon className={cn("w-4 h-4", isActive ? "text-brand-teal" : "text-brand-teal-light")} />
                {item.name}
              </Link>
            );
          })}
          <Link href="/booking"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-teal text-brand-cream text-sm font-medium">
            <Calendar className="w-4 h-4" /> Book Now
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
                  isActive ? "text-brand-teal" : "text-brand-charcoal/45"
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
          <Link href="/booking"
            className="flex flex-col items-center p-2 rounded-full bg-brand-teal text-brand-cream min-w-[48px]">
            <Calendar size={20} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </>
  );
}
