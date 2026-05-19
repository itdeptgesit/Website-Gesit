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
      // Construct dynamic dashboard URL based on the request host header
      const host = req.headers.get('host') || 'localhost:3000';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      const dashboardUrl = `${protocol}://${host}/dashboard/contacts`;

      const { data, error: emailError } = await resend.emails.send({
        from: 'Gesit Contact Form <contact@send.gesit.co.id>',
        to: 'contact@gesit.co.id',
        subject: `New Inquiry from ${name}`,
        html: `
          <div style="background-color: #f6f9fc; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(16, 48, 101, 0.05); border: 1px solid #eef2f6;">
              
              <!-- Top Brand Bar -->
              <div style="background: linear-gradient(135deg, #103065 0%, #1c4587 100%); padding: 30px 40px; text-align: center; position: relative;">
                <!-- Subtle Decorative Gold Accent Line -->
                <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background-color: #bc9c33;"></div>
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">New Contact Inquiry</h1>
                <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 13px; font-weight: 500; letter-spacing: 1px;">THE GESIT COMPANIES</p>
              </div>
              
              <div style="padding: 40px;">
                <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                  Hello Team,<br/>
                  A visitor has submitted a new inquiry through the corporate website contact form. Here are the details:
                </p>
                
                <!-- Sender Info Card -->
                <div style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #edf2f7; padding: 24px; margin-bottom: 25px;">
                  <h3 style="margin: 0 0 16px 0; color: #103065; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                    Sender Profile
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 30%;">Full Name</td>
                      <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1e293b;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b;">Email Address</td>
                      <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #bc9c33;"><a href="mailto:${email}" style="color: #bc9c33; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b;">Phone Number</td>
                      <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #475569;">${phone}</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Message Card -->
                <div style="margin-bottom: 35px;">
                  <h3 style="margin: 0 0 12px 0; color: #103065; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                    Message
                  </h3>
                  <div style="padding: 20px; background-color: #ffffff; border-left: 4px solid #bc9c33; border-radius: 4px; color: #334155; line-height: 1.6; font-size: 14px; font-style: italic; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
                    "${message || 'No message provided.'}"
                  </div>
                </div>
                
                <!-- View in Dashboard CTA -->
                <div style="text-align: center; margin-top: 30px;">
                  <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 32px; background-color: #bc9c33; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px; box-shadow: 0 4px 12px rgba(188, 156, 51, 0.25); transition: background-color 0.2s ease;">
                    View in Dashboard
                  </a>
                </div>
                
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #eef2f6;">
                <p style="font-size: 11px; color: #94a3b8; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  &copy; 2026 THE GESIT COMPANIES. ALL RIGHTS RESERVED.
                </p>
              </div>
              
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

