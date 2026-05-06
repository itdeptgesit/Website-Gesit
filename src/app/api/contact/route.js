import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

import { sanitizeInput } from '@/lib/security';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role to bypass RLS for public submissions
);

export async function POST(req) {
  try {
    const json = await req.json();
    const name = sanitizeInput(json.name);
    const email = sanitizeInput(json.email);
    const phone = sanitizeInput(json.phone);
    const message = sanitizeInput(json.message);
    const honeypot = json.website; // Hidden field
    const turnstileToken = json.turnstileToken;

    // Anti-Spam Check: Honeypot (Silent Drop)
    if (honeypot) {
      console.warn("Spam detected: Honeypot field filled. Silently dropping.");
      // Return 200 so the bot thinks it succeeded
      return NextResponse.json({ success: true });
    }

    // Anti-Spam Check: Cloudflare Turnstile
    if (process.env.TURNSTILE_SECRET_KEY) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
      }
    }

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Persist to Dashboard Database (contact_messages table)
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([
        { name, email, phone, message }
      ]);

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      // We continue to send email even if DB fails, or vice versa? 
      // Usually, we want both.
    }

    // 2. Send Email Notification via Resend
    if (process.env.RESEND_API_KEY) {
      const { data, error: emailError } = await resend.emails.send({
        from: 'Gesit Contact Form <onboarding@resend.dev>', // Use verified domain once available
        to: 'rudi.siarudin@gesit.co.id',
        subject: `New Inquiry from ${name}`,
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e1e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #103065; padding: 20px; text-align: center;">
               <h2 style="color: white; margin: 0; font-size: 20px;">New Contact Inquiry</h2>
            </div>
            <div style="padding: 30px;">
              <p style="font-size: 14px; color: #64748b;">You have received a new message from the website contact form:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e293b; width: 30%;">Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #475569;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e293b;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #475569;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e293b;">Phone</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #475569;">${phone}</td>
                </tr>
              </table>
              
              <p style="font-weight: bold; color: #1e293b; margin-bottom: 10px;">Message:</p>
              <div style="padding: 20px; background: #f8fafc; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #edf2f7;">
                ${message || '<span style="font-style: italic; color: #94a3b8;">No message provided.</span>'}
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9; text-align: center;">
                <a href="http://localhost:3000/dashboard/contacts" style="display: inline-block; padding: 12px 24px; background-color: #bc9c33; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View in Dashboard</a>
              </div>
            </div>
            <div style="background-color: #fcfdfe; padding: 15px; border-top: 1px solid #f1f5f9; text-align: center;">
               <p style="font-size: 11px; color: #94a3b8; margin: 0; text-transform: uppercase; letter-spacing: 1px;">&copy; 2026 THE GESIT COMPANIES</p>
            </div>
          </div>
        `,
      });

      if (emailError) {
        console.error("Resend API Error:", emailError);
        // If DB succeeded but email failed, we still return success with a warning or just handle it.
      }
    } else {
      console.log("[DEBUG] Contact Submission (No Resend API Key):", { name, email, phone, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
