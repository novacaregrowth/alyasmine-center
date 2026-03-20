import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { label: "Total Bookings", value: "—", icon: "◇", path: "calendar" },
  { label: "This Week",      value: "—", icon: "✦", path: "calendar" },
  { label: "Available Slots",value: "—", icon: "◈", path: "availability" },
  { label: "New Inquiries",  value: "—", icon: "❋", path: "#" },
];

export default function AdminDashboardPage({ params }: { params: { lang: string } }) {
  const lang = params.lang;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="font-display text-3xl text-brand-cream font-light">Dashboard</h1>
        <p className="text-brand-cream/50 text-sm mt-1">Welcome back. Here&apos;s an overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.path === "#" ? "#" : `/${lang}/admin/${s.path}`}
            className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-6 hover:bg-brand-cream/10 transition-colors"
          >
            <span className="text-2xl text-brand-gold block mb-3">{s.icon}</span>
            <p className="font-display text-3xl text-brand-cream">{s.value}</p>
            <p className="text-brand-cream/50 text-xs mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-6 font-light">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${lang}/admin/availability`} className="px-4 py-2 bg-brand-teal text-brand-cream rounded-full text-sm hover:bg-brand-teal/80 transition-colors">
            Update Availability
          </Link>
          <Link href={`/${lang}/admin/calendar`} className="px-4 py-2 bg-brand-cream/10 text-brand-cream rounded-full text-sm hover:bg-brand-cream/20 transition-colors">
            View Calendar
          </Link>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm hover:bg-brand-gold/30 transition-colors">
            Open Calendly →
          </a>
        </div>
      </div>
    </div>
  );
}
