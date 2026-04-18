import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from_name, from_email, message } = body;

    // Validate input
    if (!from_name || !from_email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Verify environment variables are configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the site owner." },
        { status: 500 }
      );
    }

    // Create Nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      replyTo: `"${from_name}" <${from_email}>`,
      to: gmailUser,
      subject: `Portfolio Contact: ${from_name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden; border: 1px solid #2d2d44;">
          <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 24px 32px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">📩 New Portfolio Message</h2>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2d2d44; color: #a78bfa; font-weight: 600; width: 100px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2d2d44; color: #e2e8f0;">${from_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2d2d44; color: #a78bfa; font-weight: 600;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2d2d44; color: #e2e8f0;">
                  <a href="mailto:${from_email}" style="color: #818cf8; text-decoration: none;">${from_email}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #a78bfa; font-weight: 600; margin-bottom: 8px;">Message</p>
              <div style="background: #16162a; border-radius: 8px; padding: 16px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background: #16162a; padding: 16px 32px; text-align: center;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">Sent from your Portfolio Contact Form</p>
          </div>
        </div>
      `,
    });

    console.log("✅ Contact email sent successfully from:", from_email);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
