import { Resend } from "resend";
// Initialize Resend with your API key from .env
const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Sends the account activation email to the guest user.
 */
export const sendActivationEmail = async (
  toEmail,
  firstName,
  activationLink,
) => {
  // Clean, responsive HTML template with inline styles for email client compatibility
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Activate your CAR-GO Account</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <tr>
          <td style="background-color: #dc2626; padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
              CAR-<span style="color: #fecaca;">GO</span>.PL
            </h1>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; color: #0f172a;">
              Cześć ${firstName}! / Hi ${firstName}!
            </h2>
            
            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              Dziękujemy za rezerwację w CAR-GO! Aby zarządzać swoją rezerwacją i przeglądać historię, dokończ tworzenie konta, ustawiając hasło.
              <br><br>
              Thank you for booking with CAR-GO! To manage your reservation and view your history, please complete your account setup by creating a password.
            </p>

            <!-- Call to Action Button -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 32px auto;">
              <tr>
                <td style="background-color: #dc2626; border-radius: 8px;">
                  <a href="${activationLink}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">
                    Aktywuj Konto / Activate Account
                  </a>
                </td>
              </tr>
            </table>

            <!-- Fallback Link -->
            <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.5; color: #64748b; text-align: center;">
              Jeśli przycisk nie działa, skopiuj i wklej ten link w przeglądarce:
              <br>
              <a href="${activationLink}" style="color: #dc2626; text-decoration: underline; word-break: break-all;">
                ${activationLink}
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f1f5f9; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
              CAR-GO Sp. z o.o.
              <br>
              © ${new Date().getFullYear()} CAR-GO. Wszelkie prawa zastrzeżone. / All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
  try {
    const { data, error } = await resend.emails.send({
      from: "CAR-GO <onboarding@resend.dev>",
      to: [toEmail],
      subject: "Aktywuj swoje konto CAR-GO / Activate your CAR-GO account",
      html: htmlTemplate,
    });
    if (error) {
      console.error("[Email Service] Resend API Error:", error);
      return { success: false, error: error.message };
    }
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("[Email Service] Unexpected Error:", err.message);
    return { success: false, error: err.message };
  }
};
