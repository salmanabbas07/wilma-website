// controllers/inquiryController.js
// Handles processing inquiry submissions and sending emails via Nodemailer.

const { transporter } = require('../config/mailConfig');

/**
 * Escapes special HTML characters to prevent HTML/XSS injection in emails.
 */
const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Human-readable mapping for service/subject dropdown codes.
 */
const serviceLabels = {
  'hotel-housekeeping': 'Hotelsko gospodinjstvo (Hotel Housekeeping)',
  'seasonal-teams': 'Sezonske ekipe za čiščenje (Seasonal Cleaning Teams)',
  'temporary-support': 'Začasna podpora gospodinjstvu (Temporary Support)',
  'subcontracting': 'Prilagodljivo podizvajanje (Subcontracting)',
  'commercial-cleaning': 'Poslovno in pisarniško čiščenje (Commercial Cleaning)',
  'specialized-cleaning': 'Specialno in globinsko čiščenje (Specialized/Deep Cleaning)',
  'other': 'Drugo splošno vprašanje (Other / General Inquiry)',
};

/**
 * Controller to send an inquiry email.
 */
const sendInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Sanitize user inputs for safe HTML insertion
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Ni navedeno (Not provided)');
    const readableSubject = serviceLabels[subject] || escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    // Current submission date and time (ISO and formatted)
    const submissionDate = new Date();
    const formattedDate = submissionDate.toLocaleString('sl-SI', {
      timeZone: 'Europe/Ljubljana',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const receiverEmail = process.env.RECEIVER_EMAIL || process.env.SMTP_USER;

    // Plain text alternative for email clients that do not render HTML
    const textContent = `
Nova stranka je poslala povpraševanje preko spletne strani:

Ime in priimek: ${name}
E-poštni naslov: ${email}
Telefonska številka: ${phone || 'Ni navedeno'}
Zadeva / Storitev: ${readableSubject}
Datum in čas oddaje: ${formattedDate}

Sporočilo:
${message}
    `.trim();

    // Professional HTML email body
    const htmlContent = `
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <title>Novo povpraševanje stranke</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #333333; }
    .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #0B4D26; color: #ffffff; padding: 24px 30px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d1fae5; }
    .content { padding: 30px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .info-table td.label { width: 35%; font-weight: 600; color: #475569; background-color: #f8fafc; }
    .info-table td.value { width: 65%; color: #0f172a; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0B4D26; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1e293b; margin-top: 8px; }
    .footer { background-color: #f8fafc; padding: 18px 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Customer Inquiry – William Cleaning Services</h1>
      <p>Novo povpraševanje je bilo oddano preko spletnega obrazca.</p>
    </div>
    <div class="content">
      <table class="info-table">
        <tr>
          <td class="label">Ime in priimek</td>
          <td class="value"><strong>${safeName}</strong></td>
        </tr>
        <tr>
          <td class="label">E-poštni naslov</td>
          <td class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Telefonska številka</td>
          <td class="value">${safePhone}</td>
        </tr>
        <tr>
          <td class="label">Zadeva / Storitev</td>
          <td class="value"><span style="color: #0B4D26; font-weight: 600;">${readableSubject}</span></td>
        </tr>
        <tr>
          <td class="label">Datum in čas</td>
          <td class="value">${formattedDate}</td>
        </tr>
      </table>

      <div style="font-weight: 600; font-size: 14px; color: #334155; margin-bottom: 6px;">
        Vsebina sporočila:
      </div>
      <div class="message-box">
        ${safeMessage}
      </div>
    </div>
    <div class="footer">
      To je avtomatsko generirano obvestilo spletne strani William Cleaning Services.<br>
      Če želite odgovoriti stranki, preprosto odgovorite (Reply) na to e-poštno sporočilo.
    </div>
  </div>
</body>
</html>
    `.trim();

    // Configure email options
    const mailOptions = {
      from: `"William Cleaning Services" <${process.env.SMTP_USER}>`,
      to: receiverEmail,
      replyTo: email, // Direct reply to customer email
      subject: 'New Customer Inquiry – William Cleaning Services',
      text: textContent,
      html: htmlContent,
    };

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);

    // Return success response according to PRD specification
    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been sent successfully.',
    });
  } catch (error) {
    // Pass to centralized error handler middleware
    next(error);
  }
};

module.exports = {
  sendInquiry,
};
