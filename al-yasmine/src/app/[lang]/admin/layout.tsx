"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const adminLinks = [
  { label: "Dashboard",    path: "dashboard",    icon: "◈" },
  { label: "Calendar",     path: "calendar",     icon: "◇" },
  { label: "Availability", path: "availability", icon: "✦" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || "en";

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push(`/${lang}/admin/login`);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream flex">
      <aside className="w-60 shrink-0 border-r border-brand-cream/10 p-6 flex flex-col gap-6">
        <div>
          <p className="font-display text-lg text-brand-cream">Al Yasmine</p>
          <p className="text-brand-teal-light text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex flex-col gap-1">
          {adminLinks.map((link) => (
            <Link key={link.path} href={`/${lang}/admin/${link.path}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-brand-cream/70 hover:bg-brand-cream/10 hover:text-brand-cream transition-colors">
              <span className="text-brand-gold">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <button onClick={handleLogout}
            className="text-xs text-brand-cream/40 hover:text-red-400 transition-colors text-left">
            Log out
          </button>
          <Link href={`/${lang}`} className="text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
