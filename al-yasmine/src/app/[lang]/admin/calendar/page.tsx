import type { Metadata } from "next";

export const metadata: Metadata = { title: "Calendar" };

export default function AdminCalendarPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl text-brand-cream font-light">Calendar</h1>
        <p className="text-brand-cream/50 text-sm mt-1">Manage your bookings and scheduled sessions.</p>
      </div>

      <div className="bg-brand-teal/20 border border-brand-teal/40 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl text-brand-gold">◈</span>
          <div>
            <h3 className="text-brand-cream font-medium mb-2">Calendly Integration Active</h3>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-4">
              Your booking calendar is managed through Calendly. All appointment scheduling, reminders, and cancellations are handled automatically.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://calendly.com/event_types" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-teal text-brand-cream rounded-full text-sm hover:bg-brand-teal/80 transition-colors">
                Manage Event Types →
              </a>
              <a href="https://calendly.com/scheduled_events" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-cream/10 text-brand-cream rounded-full text-sm hover:bg-brand-cream/20 transition-colors">
                View Scheduled Events →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-6 font-light">Upcoming Sessions</h2>
        <div className="text-center py-16 text-brand-cream/30">
          <p className="text-5xl mb-4">◇</p>
          <p className="text-sm">Connect Calendly API to display upcoming sessions.</p>
        </div>
      </div>
    </div>
  );
}
