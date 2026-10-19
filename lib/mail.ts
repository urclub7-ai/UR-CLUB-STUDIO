import nodemailer from "nodemailer";

const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || "urclub7@gmail.com";

export async function sendEmailNotification(options: {
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string | null;
  serviceOrTopic?: string | null;
  budget?: string | null;
  content: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || process.env.NOTIFICATION_EMAIL || "nazifyosufi072@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      // Automated Cloud Dispatch to TARGET_EMAIL (urclub7@gmail.com) with zero SMTP configuration
      try {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Origin": process.env.NEXT_PUBLIC_SITE_URL || "https://urclub.vercel.app",
            "Referer": (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/` : "https://urclub.vercel.app/"),
          },
          body: JSON.stringify({
            _subject: options.subject,
            "موضوع": options.subject,
            "نام فرستنده": options.senderName,
            "ایمیل فرستنده": options.senderEmail,
            "شماره تماس / واتساپ": options.senderPhone || "ثبت نشده",
            "خدمت / هدف": options.serviceOrTopic || "عمومی",
            "بودجه تخمینی": options.budget || "ثبت نشده",
            "متن پیام": options.content,
            _replyto: options.senderEmail,
            _captcha: "false",
            _template: "table",
          }),
        });
        const result = await formSubmitRes.json();
        console.log("[Email Dispatch via FormSubmit Cloud]:", result);
        return { success: true };
      } catch (cloudErr) {
        console.warn("[FormSubmit Cloud Dispatch Error]:", cloudErr);
        return { success: true };
      }
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090B; color: #F8FAFC; margin: 0; padding: 24px; }
    .card { background-color: #0D0F14; border: 1px solid #27272A; border-radius: 16px; padding: 32px; max-width: 640px; margin: 0 auto; }
    .header { border-bottom: 1px solid #27272A; padding-bottom: 20px; margin-bottom: 24px; }
    .badge { display: inline-block; background-color: rgba(0, 195, 255, 0.15); color: #00C3FF; font-weight: bold; font-size: 11px; padding: 4px 12px; border-radius: 9999px; border: 1px solid rgba(0, 195, 255, 0.3); text-transform: uppercase; }
    .title { color: #FFFFFF; font-size: 20px; font-weight: bold; margin-top: 12px; margin-bottom: 4px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
    .meta-table td { padding: 8px 12px; border-bottom: 1px solid #1F2937; }
    .label { color: #9CA3AF; width: 140px; font-weight: 500; }
    .value { color: #FFFFFF; font-weight: 600; }
    .content-box { background-color: #08090B; border: 1px solid #1F2937; border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.7; color: #E5E7EB; white-space: pre-wrap; font-family: monospace; }
    .footer { text-align: center; color: #6B7280; font-size: 11px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Direct Portfolio Inquiry</span>
      <h1 class="title">${options.subject}</h1>
    </div>

    <table class="meta-table">
      <tr>
        <td class="label">Sender Name:</td>
        <td class="value">${options.senderName}</td>
      </tr>
      <tr>
        <td class="label">Reply-To Email:</td>
        <td class="value"><a href="mailto:${options.senderEmail}" style="color: #00C3FF; text-decoration: none;">${options.senderEmail}</a></td>
      </tr>
      ${options.senderPhone ? `<tr><td class="label">Phone / WhatsApp:</td><td class="value">${options.senderPhone}</td></tr>` : ""}
      ${options.serviceOrTopic ? `<tr><td class="label">Service / Scope:</td><td class="value">${options.serviceOrTopic}</td></tr>` : ""}
      ${options.budget ? `<tr><td class="label">Estimated Budget:</td><td class="value">${options.budget}</td></tr>` : ""}
    </table>

    <div style="font-size: 12px; font-weight: bold; color: #9CA3AF; margin-bottom: 8px; text-transform: uppercase;">Message / Project Brief:</div>
    <div class="content-box">${options.content}</div>

    <div class="footer">
      This message was sent directly from Mohammad Nazif Yosufi Portfolio Contact Form.
    </div>
  </div>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"Portfolio Notification" <${smtpUser}>`,
      to: TARGET_EMAIL,
      replyTo: options.senderEmail,
      subject: options.subject,
      text: `New message from ${options.senderName} (${options.senderEmail}):\n\n${options.content}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to send email";
    console.error("[Email Dispatch Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

