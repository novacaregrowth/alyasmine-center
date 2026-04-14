import { NextRequest, NextResponse } from "next/server";

/**
 * Calendly Webhook Handler
 *
 * Events this handles:
 * - invitee.created  → New booking made
 * - invitee.canceled → Booking canceled
 *
 * Setup:
 * 1. Add CALENDLY_WEBHOOK_SIGNING_KEY to .env.local
 * 2. Register this URL in Calendly: https://yourdomain.com/api/webhooks/calendly
 *
 * Docs: https://developer.calendly.com/api-docs/docs/A2YjxgAAIABiT29-/webhooks
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, payload } = body;

    // TODO: Verify webhook signature for security
    // const signature = req.headers.get("calendly-webhook-signature");
    // verifySignature(signature, body, process.env.CALENDLY_WEBHOOK_SIGNING_KEY);

    switch (event) {
      case "invitee.created": {
        const { name, email, scheduled_event } = payload;
        // TODO: 
        // 1. Save to your DB (Supabase, Prisma, etc.)
        // 2. Send confirmation email (Resend / Nodemailer)
        // 3. Send Slack/WhatsApp notification to coach

        break;
      }

      case "invitee.canceled": {
        const { name, email, cancellation } = payload;
        // TODO:
        // 1. Update booking status in DB
        // 2. Send cancellation notification

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
