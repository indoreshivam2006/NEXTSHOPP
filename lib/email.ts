import nodemailer from "nodemailer"

export interface ContactEmailPayload {
  inquiryId: string
  name: string
  email: string
  phone?: string
  category: string
  message: string
  timestamp?: string
}

/**
 * Transmits customer contact inquiry directly to the store administrator Gmail
 * (nextshopp0904@gmail.com).
 * 
 * Delivery strategy:
 * 1. Uses Gmail SMTP (Nodemailer) if GMAIL_APP_PASSWORD or EMAIL_PASSWORD is set in .env.local
 * 2. Uses FormSubmit instant forwarding relay as zero-config automatic delivery to nextshopp0904@gmail.com
 */
export async function sendInquiryToGmail(payload: ContactEmailPayload): Promise<{
  success: boolean
  method: "gmail_smtp" | "relay" | "none"
  details?: any
}> {
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || "nextshopp0904@gmail.com"
  const gmailUser = process.env.GMAIL_USER || "nextshopp0904@gmail.com"
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD

  const timestampStr =
    payload.timestamp ||
    new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    })

  // 1. Direct Gmail SMTP via Nodemailer if credentials configured
  if (gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      })

      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fdfbf7; border: 1px solid #e2dacf; border-radius: 16px; overflow: hidden; color: #181818;">
          <div style="background: #181818; padding: 28px 24px; color: #f0ebe6;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h1 style="margin: 0; font-size: 22px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase;">NEXTSHOPP</h1>
              <span style="background: #C9AC86; color: #181818; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px;">NEW INQUIRY</span>
            </div>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #f0ebe6; opacity: 0.75; letter-spacing: 1px;">PATRON CARE & STUDIO CONCIERGE DISPATCH</p>
          </div>
          
          <div style="padding: 28px 24px;">
            <div style="background: #f4ede3; border: 1px solid #e2dacf; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-family: monospace; color: #7c7c7c;">REFERENCE: <strong style="color: #181818; font-size: 13px;">#${payload.inquiryId}</strong></p>
              <p style="margin: 0 0 6px 0; font-size: 12px; font-family: monospace; color: #7c7c7c;">CATEGORY: <strong style="color: #059669; text-transform: uppercase;">${payload.category}</strong></p>
              <p style="margin: 0; font-size: 12px; font-family: monospace; color: #7c7c7c;">SUBMITTED: <strong style="color: #181818;">${timestampStr}</strong></p>
            </div>
            
            <h3 style="font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; color: #7c7c7c; border-bottom: 1px solid #e2dacf; padding-bottom: 8px; margin: 0 0 14px 0;">Patron Coordinates</h3>
            <table style="width: 100%; font-size: 14px; margin-bottom: 24px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #7c7c7c; width: 110px; font-size: 13px;">Full Name:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #181818;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7c7c7c; font-size: 13px;">Email Address:</td>
                <td style="padding: 8px 0;"><a href="mailto:${payload.email}" style="color: #181818; font-weight: 600; text-decoration: underline;">${payload.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7c7c7c; font-size: 13px;">Telephone:</td>
                <td style="padding: 8px 0; color: #181818; font-family: monospace;">${payload.phone || "Not provided"}</td>
              </tr>
            </table>

            <h3 style="font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; color: #7c7c7c; border-bottom: 1px solid #e2dacf; padding-bottom: 8px; margin: 0 0 14px 0;">Inquiry Narrative</h3>
            <div style="background: #ffffff; border-left: 3px solid #181818; border-radius: 4px; padding: 16px; margin-bottom: 28px; font-size: 14px; line-height: 1.7; color: #222; white-space: pre-wrap;">${payload.message}</div>

            <div style="text-align: center; margin: 20px 0;">
              <a href="mailto:${payload.email}?subject=Re: NextShop Inquiry [${payload.inquiryId}]&body=Hi ${encodeURIComponent(payload.name)},%0D%0A%0D%0AThank you for reaching out to NextShop.%0D%0A%0D%0A" style="display: inline-block; background: #181818; color: #f0ebe6; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">Reply to ${payload.name}</a>
            </div>
          </div>
          
          <div style="background: #ece5dc; padding: 16px 24px; font-size: 11px; text-align: center; color: #7c7c7c; border-top: 1px solid #e2dacf;">
            NextShop Concierge System · Direct notification dispatched to ${recipient}
          </div>
        </div>
      `

      const info = await transporter.sendMail({
        from: `"NextShop Concierge" <${gmailUser}>`,
        to: recipient,
        replyTo: payload.email,
        subject: `[NextShop Inquiry #${payload.inquiryId}] ${payload.category} - from ${payload.name}`,
        text: `New NextShop Inquiry #${payload.inquiryId}\n\nCategory: ${payload.category}\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\n\nMessage:\n${payload.message}`,
        html: htmlContent,
      })

      console.log(`[Email] Delivered inquiry #${payload.inquiryId} via Gmail SMTP: ${info.messageId}`)
      return { success: true, method: "gmail_smtp", details: info.messageId }
    } catch (smtpError) {
      console.warn("[Email] Nodemailer SMTP attempt failed, falling back to FormSubmit relay:", smtpError)
    }
  }

  // 2. Automatic forwarding relay directly to nextshopp0904@gmail.com
  try {
    const relayRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "http://localhost:3000",
      },
      body: JSON.stringify({
        _subject: `[NextShop Inquiry #${payload.inquiryId}] ${payload.category} from ${payload.name}`,
        _replyto: payload.email,
        _template: "table",
        "Inquiry Reference": `#${payload.inquiryId}`,
        "Category": payload.category,
        "Customer Name": payload.name,
        "Customer Email": payload.email,
        "Telephone": payload.phone || "Not provided",
        "Inquiry Narrative": payload.message,
        "Submitted At": timestampStr,
      }),
    })

    const relayData = await relayRes.json()
    console.log(`[Email] FormSubmit relay result for inquiry #${payload.inquiryId}:`, relayData)
    return { success: true, method: "relay", details: relayData }
  } catch (relayError) {
    console.error("[Email] Failed to forward email via relay:", relayError)
    return { success: false, method: "none", details: relayError }
  }
}
