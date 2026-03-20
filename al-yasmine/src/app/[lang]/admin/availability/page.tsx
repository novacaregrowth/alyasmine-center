import type { Metadata } from "next";

export const metadata: Metadata = { title: "Availability" };

export default function AdminAvailabilityPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl text-brand-cream font-light">Availability</h1>
        <p className="text-brand-cream/50 text-sm mt-1">
          Set your working hours and manage available time slots.
        </p>
      </div>

      <div className="bg-brand-teal/20 border border-brand-teal/40 rounded-2xl p-6">
        <p className="text-brand-cream text-sm mb-4">
          Your availability is managed directly in Calendly. Changes sync automatically with your booking page.
        </p>
        <a
          href="https://calendly.com/availability"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-brand-teal text-brand-cream rounded-full text-sm hover:bg-brand-teal/80 transition-colors inline-block"
        >
          Edit Availability in Calendly →
        </a>
      </div>

      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8 space-y-6">
        <h2 className="font-display text-xl text-brand-cream font-light">Custom Blocked Dates</h2>
        <p className="text-brand-cream/50 text-sm">
          Block out specific dates (e.g. holidays, personal time).
        </p>
        <div className="text-center py-12 text-brand-cream/30">
          <p className="text-4xl mb-3">◇</p>
          <p className="text-sm">Date blocking UI coming soon.</p>
        </div>
      </div>

      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-4 font-light">Session Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Buffer Between Sessions", value: "15 minutes", note: "Set in Calendly" },
            { label: "Max Sessions per Day", value: "4 sessions", note: "Set in Calendly" },
            { label: "Booking Notice Required", value: "24 hours", note: "Set in Calendly" },
            { label: "Max Advance Booking", value: "60 days", note: "Set in Calendly" },
          ].map((s) => (
            <div key={s.label} className="bg-brand-cream/5 rounded-xl p-4">
              <p className="text-brand-cream/50 text-xs mb-1">{s.label}</p>
              <p className="text-brand-cream font-medium text-sm">{s.value}</p>
              <p className="text-brand-teal-light text-xs mt-1">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
