import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, rank, nationality, phone, experience, availability, cocCountry } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store in Supabase when NEXT_PUBLIC_SUPABASE_URL is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("crew_registrations").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        rank,
        nationality,
        phone,
        years_experience: experience ? parseInt(experience) : null,
        availability_date: availability || null,
        coc_country: cocCountry,
        status: "pending",
        created_at: new Date().toISOString(),
      });

      if (error) console.error("Supabase insert error:", error);
    }

    // Send confirmation email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Melvin Gaal Ltd <noreply@melvingaal.com>",
        to: email,
        subject: "Registration Received — Melvin Gaal Ltd",
        html: `
          <div style="font-family: Inter, sans-serif; background: #051324; color: #e0e3e5; padding: 40px; max-width: 600px;">
            <h1 style="color: #D4AF37;">Melvin Gaal Ltd</h1>
            <p>Dear ${firstName},</p>
            <p>Your seafarer registration has been received. A recruitment officer will review your profile and contact you within 24 hours.</p>
            <p style="color: #D4AF37;"><strong>Registered Rank:</strong> ${rank || "Not specified"}</p>
            <p style="color: #a5c8ff;">If you have any questions, contact us at support@melvingaal.com</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
