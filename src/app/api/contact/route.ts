import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from_name, from_email, phone, message } = body;

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

    // Phone validation (exactly 10 digits)
    const phoneDigits = (phone || "").replace(/\D/g, "");
    if (!phone || phoneDigits.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number" },
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

    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser.trim(),
        pass: gmailAppPassword.replace(/\s+/g, ""),
      },
    });

    // 1. Send enquiry notification to site owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      replyTo: `"${from_name}" <${from_email}>`,
      to: "anilpatil0955@gmail.com",
      subject: `Portfolio Contact: ${from_name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden; border: 1px solid #2d2d44;">
          <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 24px 32px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">📩 New Portfolio Enquiry</h2>
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
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2d2d44; color: #a78bfa; font-weight: 600;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2d2d44; color: #e2e8f0;">${phone || "Not provided"}</td>
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

    // 2. Send confirmation email to the user
    await transporter.sendMail({
      from: `"Anil Patil" <${gmailUser}>`,
      to: from_email,
      subject: "Thank you for your enquiry!",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden; border: 1px solid #2d2d44;">
          <div style="background: linear-gradient(135deg, #ff2e8c, #7c3aed); padding: 28px 32px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Thank You for Reaching Out! 🙏</h2>
          </div>
          <div style="padding: 32px;">
            <p style="color: #e2e8f0; font-size: 16px; line-height: 1.8; margin: 0 0 16px;">
              Hi <strong>${from_name}</strong>,
            </p>
            <p style="color: #cbd5e1; font-size: 15px; line-height: 1.8; margin: 0 0 16px;">
              Thank you for your enquiry! I have received your message and will get back to you as soon as possible.
            </p>
            <p style="color: #cbd5e1; font-size: 15px; line-height: 1.8; margin: 0 0 24px;">
              In the meantime, feel free to check out my portfolio at <a href="https://anilpatil.dev" style="color: #818cf8; text-decoration: none;">anilpatil.dev</a>.
            </p>
            <div style="background: #16162a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #a78bfa; font-weight: 600; margin: 0 0 8px; font-size: 14px;">Your Message:</p>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="color: #64748b; font-size: 13px; margin: 0;">
              Best regards,<br/>
              <strong style="color: #e2e8f0;">Anil Patil</strong><br/>
              Full Stack Developer
            </p>
          </div>
          <div style="background: #16162a; padding: 16px 32px; text-align: center;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("✅ Contact email sent successfully from:", from_email);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Contact form error:", error);
    
    const errString = error?.message || String(error);
    if (errString.includes("535") || errString.includes("Invalid login")) {
      return NextResponse.json(
        { error: "Gmail App Password authentication failed. Please update GMAIL_APP_PASSWORD in .env.local with a new Google App Password." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
