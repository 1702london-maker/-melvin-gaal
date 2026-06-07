import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vesselName, imoNumber, service, urgency, message } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("contact_requests").insert({
        vessel_name: vesselName,
        imo_number: imoNumber,
        service_required: service,
        urgency: urgency || "routine",
        message,
        created_at: new Date().toISOString(),
      });
    }

    // Notify team via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Melvin Gaal Portal <noreply@melvingaal.com>",
        to: "support@melvingaal.com",
        subject: `[${urgency?.toUpperCase() || "ROUTINE"}] New Service Request — ${vesselName || "Unknown Vessel"}`,
        html: `
          <div style="font-family: Inter, sans-serif; background: #051324; color: #e0e3e5; padding: 40px; max-width: 600px;">
            <h1 style="color: #D4AF37;">New Service Request</h1>
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="color:#a5c8ff;padding:8px 0;">Vessel Name</td><td>${vesselName || "—"}</td></tr>
              <tr><td style="color:#a5c8ff;padding:8px 0;">IMO Number</td><td>${imoNumber || "—"}</td></tr>
              <tr><td style="color:#a5c8ff;padding:8px 0;">Service</td><td>${service || "—"}</td></tr>
              <tr><td style="color:#a5c8ff;padding:8px 0;">Urgency</td><td style="color:${urgency === 'urgent' ? '#D4AF37' : '#e0e3e5'}">${urgency || "routine"}</td></tr>
              <tr><td style="color:#a5c8ff;padding:8px 0;vertical-align:top;">Message</td><td>${message || "—"}</td></tr>
            </table>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
