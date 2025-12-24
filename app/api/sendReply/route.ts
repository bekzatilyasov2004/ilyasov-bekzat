// app/api/sendReply/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { toEmail, subject, message } = await req.json();

    if (!toEmail || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD,
      },
    });

    const htmlMessage = `
      <div style="
        font-family: 'Inter', sans-serif;
        background-color: #f9f9f9;
        padding: 40px 30px;
        border-radius: 12px;
        max-width: 600px;
        margin: auto;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      ">
        <h1 style="color: #111; font-weight: 700; font-size: 24px; margin-bottom: 20px;">
          ${subject}
        </h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          ${message}
        </p>
        <div style="
          margin-top: 30px;
          padding: 12px 20px;
          background-color: #4a90e2;
          color: #fff;
          font-weight: 600;
          border-radius: 8px;
          display: inline-block;
          text-decoration: none;
        ">
          Visit My Portfolio
        </div>
        <p style="margin-top: 25px; font-size: 12px; color: #888;">
          Sent via <a href="https://yourportfolio.com" style="color: #4a90e2; text-decoration: none;">Your Portfolio</a>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"ɪʟʏᴀꜱᴏᴠ" <${process.env.MY_EMAIL}>`,
      to: toEmail,
      subject,
      html: htmlMessage,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("SendReply Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
