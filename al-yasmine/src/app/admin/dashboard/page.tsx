import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

// Stub stats — replace with real data fetching
const stats = [
  { label: "Total Bookings", value: "—", icon: "◇", href: "/admin/calendar" },
  { label: "This Week",      value: "—", icon: "✦", href: "/admin/calendar" },
  { label: "Available Slots",value: "—", icon: "◈", href: "/admin/availability" },
  { label: "New Inquiries",  value: "—", icon: "❋", href: "#" },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-brand-cream font-light">Dashboard</h1>
        <p className="text-brand-cream/50 text-sm mt-1">Welcome back. Here's an overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-6 hover:bg-brand-cream/10 transition-colors"
          >
            <span className="text-2xl text-brand-gold block mb-3">{s.icon}</span>
            <p className="font-display text-3xl text-brand-cream">{s.value}</p>
            <p className="text-brand-cream/50 text-xs mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-6 font-light">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/availability" className="px-4 py-2 bg-brand-teal text-brand-cream rounded-full text-sm hover:bg-brand-teal/80 transition-colors">
            Update Availability
          </Link>
          <Link href="/admin/calendar" className="px-4 py-2 bg-brand-cream/10 text-brand-cream rounded-full text-sm hover:bg-brand-cream/20 transition-colors">
            View Calendar
          </Link>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm hover:bg-brand-gold/30 transition-colors">
            Open Calendly →
          </a>
        </div>
      </div>

      {/* Setup checklist */}
      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-2 font-light">Launch Checklist</h2>
        <p className="text-brand-cream/40 text-xs mb-6">Items still needed before going live</p>
        <ul className="space-y-3 text-sm">
          {[
            { done: false, task: "Add Calendly URL → src/lib/config.ts (siteConfig.calendlyUrl)" },
            { done: false, task: "Replace coach photo with real photo → src/lib/config.ts (siteConfig.coachPhoto)" },
            { done: false, task: "Update coach bio with full text → src/lib/config.ts (siteConfig.coachBio)" },
            { done: false, task: "Replace placeholder testimonials with real client testimonials" },
            { done: false, task: "Verify stats with client (200+ clients, 98% satisfaction, 4.9★) before publishing" },
            { done: true,  task: "Admin auth secured — server-side httpOnly cookie via /api/admin/auth (set ADMIN_PASSWORD in .env.local)" },
            { done: false, task: "Set up email notifications (Resend or Nodemailer)" },
            { done: false, task: "Wire free course guide delivery to actual files/videos after booking" },
            { done: true,  task: "Phone number updated (+971 52 441 7078)" },
            { done: true,  task: "Instagram URL corrected (@alyasmine_center)" },
            { done: true,  task: "Privacy Policy and Terms pages created" },
            { done: true,  task: "OG image set for social sharing" },
            { done: true,  task: "Nav active state fixed (usePathname)" },
            { done: true,  task: "Mobile bottom padding fixed" },
            { done: true,  task: "AI chat wired to Claude API" },
          ].map((item) => (
            <li key={item.task} className="flex items-start gap-3">
              <span className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center text-[10px] ${item.done ? "bg-brand-gold border-brand-gold text-brand-dark font-bold" : "border-brand-cream/30"}`}>
                {item.done ? "✓" : ""}
              </span>
              <span className={item.done ? "text-brand-cream/40 line-through" : "text-brand-cream/70"}>{item.task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
