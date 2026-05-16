import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, interest, source } = await req.json();

    // 1. Insert into Supabase Leads Table
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          interest: interest || "General",
          source: source || "website",
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      // If it's a unique constraint violation, it means they are already a lead, which is fine
      if (error.code !== "23505") {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    // 2. Trigger Email Notification via Resend
    try {
      await resend.emails.send({
        from: "Devoreq Leads <onboarding@resend.dev>",
        to: "infodevoreq@gmail.com",
        subject: `New Lead Captured: ${name} (${source})`,
        html: `
          <h2>New Lead Captured! 🚀</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Details:</strong></p>
          <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px; font-family: monospace;">${interest || "General Inquiry"}</pre>
          <br/>
          <p>View all leads in your <a href="https://supabase.com">Supabase Dashboard</a>.</p>
        `,
      });
    } catch (emailErr) {
      console.error("Resend Email Error:", emailErr);
      // We don't want to throw an error and break the client flow just because the notification email failed.
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
