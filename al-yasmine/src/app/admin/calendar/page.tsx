import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Calendar" };

export default function AdminCalendarPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl text-brand-cream font-light">Calendar</h1>
        <p className="text-brand-cream/50 text-sm mt-1">Manage your bookings and scheduled sessions.</p>
      </div>

      {/* Calendly integration notice */}
      <div className="bg-brand-teal/20 border border-brand-teal/40 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl text-brand-gold">◈</span>
          <div>
            <h3 className="text-brand-cream font-medium mb-2">Calendly Integration Active</h3>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-4">
              Your booking calendar is managed through Calendly. All appointment scheduling, reminders, and cancellations are handled automatically. Manage your calendar directly from the Calendly dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendly.com/event_types"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-teal text-brand-cream rounded-full text-sm hover:bg-brand-teal/80 transition-colors"
              >
                Manage Event Types →
              </a>
              <a
                href="https://calendly.com/scheduled_events"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-cream/10 text-brand-cream rounded-full text-sm hover:bg-brand-cream/20 transition-colors"
              >
                View Scheduled Events →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming sessions placeholder */}
      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-6 font-light">Upcoming Sessions</h2>
        {/* 
          TODO: Connect Calendly Webhooks API to display upcoming bookings here.
          Steps:
          1. Create a Calendly API token (https://calendly.com/integrations/api_webhooks)
          2. Add CALENDLY_API_TOKEN to .env.local
          3. Create /api/calendly/events route to fetch scheduled events
          4. Render events here with Server Component or SWR
        */}
        <div className="text-center py-16 text-brand-cream/30">
          <p className="text-5xl mb-4">◇</p>
          <p className="text-sm">Connect Calendly API to display upcoming sessions.</p>
          <p className="text-xs mt-2">See comment in source code for setup instructions.</p>
        </div>
      </div>

      {/* Calendly Webhook Setup Guide */}
      <div className="bg-brand-cream/5 border border-brand-cream/10 rounded-2xl p-8">
        <h2 className="font-display text-xl text-brand-cream mb-4 font-light">Webhook Setup Guide</h2>
        <ol className="space-y-3 text-sm text-brand-cream/70 list-decimal list-inside">
          <li>Go to Calendly → Integrations → API & Webhooks</li>
          <li>Create a Personal Access Token and add to <code className="bg-brand-cream/10 px-1 rounded text-brand-gold">.env.local</code> as <code className="bg-brand-cream/10 px-1 rounded text-brand-gold">CALENDLY_API_TOKEN</code></li>
          <li>Subscribe to <code className="bg-brand-cream/10 px-1 rounded text-brand-gold">invitee.created</code> and <code className="bg-brand-cream/10 px-1 rounded text-brand-gold">invitee.canceled</code> events</li>
          <li>Point webhooks to <code className="bg-brand-cream/10 px-1 rounded text-brand-gold">https://yourdomain.com/api/webhooks/calendly</code></li>
          <li>The webhook handler is pre-stubbed at <code className="bg-brand-cream/10 px-1 rounded text-brand-gold">src/app/api/webhooks/calendly/route.ts</code></li>
        </ol>
      </div>
    </div>
  );
}
