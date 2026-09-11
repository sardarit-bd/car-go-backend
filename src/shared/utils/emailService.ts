import { Resend } from "resend";
import { prisma } from "../../../lib/prisma.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReservationConfirmationEmail = async (reservation: any) => {
  const settings = await prisma.emailSettings.findFirst();
  const logoUrl = settings?.logoUrl || "https://car-go.pl/logo.png"; 
  const primaryColor = settings?.primaryColor || "#dc2626";
  const companyName = "CAR-GO - wypożyczalnia samochodów | Rent a car";
  const phone = settings?.companyPhone || "+48 459 111 828";
  const email = settings?.companyEmail || "rezerwacje@car-go.pl";
  const website = settings?.website || "www.car-go.pl";
  const signature = settings?.signature || "Z poważaniem,<br>Zespół CAR-GO";
  const fbLink = settings?.facebookUrl || "#";
  const igLink = settings?.instagramUrl || "#";

  const pickupDate = new Date(reservation.pickupDate).toLocaleDateString("pl-PL");
  const returnDate = new Date(reservation.returnDate).toLocaleDateString("pl-PL");

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Potwierdzenie rezerwacji CAR-GO</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <tr>
          <td style="background-color: ${primaryColor}; padding: 32px 24px; text-align: center;">
            <!-- Added width="auto" and background fallback to ensure logo matches website design -->
            <img src="${logoUrl}" alt="CAR-GO Logo" style="max-height: 60px; width: auto; background-color: #ffffff; padding: 8px 16px; border-radius: 8px; margin-bottom: 12px;" />
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
              Potwierdzenie Rezerwacji
            </h1>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
              Cześć ${reservation.customerFirstName}!
            </h2>
            
            <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              Dziękujemy za dokonanie rezerwacji w CAR-GO. Poniżej znajdziesz szczegóły swojego wynajmu.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;"><strong>Pojazd:</strong> ${reservation.vehicle?.brand || ''} ${reservation.vehicle?.model || ''}</p>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;"><strong>Data odbioru:</strong> ${pickupDate}</p>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;"><strong>Data zwrotu:</strong> ${returnDate}</p>
              <p style="margin: 0; font-size: 14px; color: #334155;"><strong>Numer rezerwacji:</strong> ${reservation.bookingReference || reservation.id}</p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed #cbd5e1;">
                <p style="margin: 0; font-size: 18px; font-weight: 800; color: ${primaryColor};">Łączna kwota: PLN ${reservation.totalPrice}</p>
              </div>
            </div>

            <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.6; color: #475569;">
              ${signature}
            </p>
          </td>
        </tr>

        <!-- Dynamic Footer -->
        <tr>
          <td style="background-color: #f1f5f9; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #0f172a; letter-spacing: 0.5px;">
              CAR-GO
            </p>
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569; line-height: 1.8;">
              📞 <a href="tel:${phone}" style="color: #475569; text-decoration: none;">${phone}</a><br>
              ✉️ <a href="mailto:${email}" style="color: #475569; text-decoration: none;">${email}</a><br>
              🌐 <a href="https://${website}" target="_blank" style="color: #475569; text-decoration: none;">${website}</a>
            </p>
            
            <!-- Dynamic Social Media Links -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 20px;">
              <tr>
                ${fbLink && fbLink !== '#' ? `
                <td style="padding: 0 12px;">
                  <a href="${fbLink}" target="_blank" style="text-decoration: none; color: #ffffff; background-color: ${primaryColor}; font-weight: 600; font-size: 12px; padding: 8px 16px; border-radius: 6px; display: inline-block;">Facebook</a>
                </td>` : ''}
                ${igLink && igLink !== '#' ? `
                <td style="padding: 0 12px;">
                  <a href="${igLink}" target="_blank" style="text-decoration: none; color: #ffffff; background-color: ${primaryColor}; font-weight: 600; font-size: 12px; padding: 8px 16px; border-radius: 6px; display: inline-block;">Instagram</a>
                </td>` : ''}
              </tr>
            </table>

            <p style="margin: 24px 0 0 0; font-size: 11px; color: #94a3b8;">
              © ${new Date().getFullYear()} CAR-GO. Wszelkie prawa zastrzeżone.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "CAR-GO <noreply@car-go.pl>",
      to: [reservation.customerEmail],
      subject: `Potwierdzenie rezerwacji #${reservation.bookingReference || reservation.id}`,
      html: htmlTemplate,
    });

    if (error) {
      console.error("[Email Service] Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: any) {
    console.error("[Email Service] Unexpected Error:", err.message);
    return { success: false, error: err.message };
  }
};

export const sendActivationEmail = async (
  email: string,
  firstName: string,
  activationLink: string,
) => {
  const settings = await prisma.emailSettings.findFirst();
  const logoUrl = settings?.logoUrl || "https://car-go.pl/logo.png";
  const primaryColor = settings?.primaryColor || "#dc2626";
  const companyName = "CAR-GO - wypożyczalnia samochodów | Rent a car";
  const phone = settings?.companyPhone || "+48 459 111 828";
  const companyEmail = settings?.companyEmail || "rezerwacje@car-go.pl";
  const website = settings?.website || "www.car-go.pl";
  const signature = settings?.signature || "Z poważaniem,<br>Zespół CAR-GO";
  const fbLink = settings?.facebookUrl || "#";
  const igLink = settings?.instagramUrl || "#";

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aktywacja konta CAR-GO</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <tr>
          <td style="background-color: ${primaryColor}; padding: 24px; text-align: center;">
            <img src="${logoUrl}" alt="CAR-GO Logo" style="max-height: 50px; margin-bottom: 8px;" />
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
              AKTYWACJA KONTA
            </h1>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; color: #0f172a;">
              Cześć ${firstName}!
            </h2>

            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              Twoje konto CAR-GO zostało utworzone na podstawie rezerwacji. Aby ustawić hasło i aktywować konto, kliknij poniższy przycisk.
            </p>

            <div style="text-align: center; margin: 24px 0;">
              <a href="${activationLink}" target="_blank" style="display: inline-block; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 12px 28px; border-radius: 8px;">
                Aktywuj konto
              </a>
            </div>

            <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #94a3b8;">
              Jeśli przycisk nie działa, skopiuj i wklej ten link do przeglądarki:<br>
              <a href="${activationLink}" style="color: ${primaryColor};">${activationLink}</a>
            </p>

            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              ${signature}
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a;">
              ${companyName}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #475569;">
              📞 ${phone} <br>
              ✉️ ${companyEmail} <br>
              🌐 ${website}
            </p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 16px;">
              <tr>
                <td style="padding: 0 8px;">
                  <a href="${fbLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 600; font-size: 13px;">Facebook</a>
                </td>
                <td style="padding: 0 8px;">
                  <a href="${igLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 600; font-size: 13px;">Instagram</a>
                </td>
              </tr>
            </table>

            <p style="margin: 24px 0 0 0; font-size: 11px; color: #94a3b8;">
              © ${new Date().getFullYear()} CAR-GO. Wszelkie prawa zastrzeżone.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "CAR-GO <noreply@car-go.pl>",
      to: [email],
      subject: "Aktywuj swoje konto CAR-GO",
      html: htmlTemplate,
    });

    if (error) {
      console.error("[Email Service] Resend API Error (activation):", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: any) {
    console.error("[Email Service] Unexpected Error (activation):", err.message);
    return { success: false, error: err.message };
  }
};

export const sendResetPasswordOtpEmail = async (
  email: string,
  firstName: string,
  otp: string,
) => {
  const settings = await prisma.emailSettings.findFirst();
  const logoUrl = settings?.logoUrl || "https://car-go.pl/logo.png";
  const primaryColor = settings?.primaryColor || "#dc2626";
  const companyName = "CAR-GO - wypożyczalnia samochodów | Rent a car";
  const phone = settings?.companyPhone || "+48 459 111 828";
  const companyEmail = settings?.companyEmail || "rezerwacje@car-go.pl";
  const website = settings?.website || "www.car-go.pl";
  const signature = settings?.signature || "Z poważaniem,<br>Zespół CAR-GO";
  const fbLink = settings?.facebookUrl || "#";
  const igLink = settings?.instagramUrl || "#";

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kod resetowania hasła CAR-GO</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

        <tr>
          <td style="background-color: ${primaryColor}; padding: 24px; text-align: center;">
            <img src="${logoUrl}" alt="CAR-GO Logo" style="max-height: 50px; margin-bottom: 8px;" />
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
              RESETOWANIE HASŁA
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; color: #0f172a;">
              Cześć ${firstName}!
            </h2>

            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta. Użyj poniższego kodu, aby kontynuować. Kod jest ważny przez 10 minut.
            </p>

            <div style="text-align: center; margin: 24px 0;">
              <span style="display: inline-block; background-color: #f1f5f9; color: ${primaryColor}; font-weight: 900; font-size: 32px; letter-spacing: 8px; padding: 16px 28px; border-radius: 8px;">
                ${otp}
              </span>
            </div>

            <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #94a3b8;">
              Jeśli to nie Ty prosiłeś o zresetowanie hasła, zignoruj tę wiadomość.
            </p>

            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              ${signature}
            </p>
          </td>
        </tr>

        <tr>
          <td style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a;">
              ${companyName}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #475569;">
              📞 ${phone} <br>
              ✉️ ${companyEmail} <br>
              🌐 ${website}
            </p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 16px;">
              <tr>
                <td style="padding: 0 8px;">
                  <a href="${fbLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 600; font-size: 13px;">Facebook</a>
                </td>
                <td style="padding: 0 8px;">
                  <a href="${igLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 600; font-size: 13px;">Instagram</a>
                </td>
              </tr>
            </table>

            <p style="margin: 24px 0 0 0; font-size: 11px; color: #94a3b8;">
              © ${new Date().getFullYear()} CAR-GO. Wszelkie prawa zastrzeżone.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "CAR-GO <noreply@car-go.pl>",
      to: [email],
      subject: "Twój kod resetowania hasła CAR-GO",
      html: htmlTemplate,
    });

    if (error) {
      console.error("[Email Service] Resend API Error (reset otp):", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: any) {
    console.error("[Email Service] Unexpected Error (reset otp):", err.message);
    return { success: false, error: err.message };
  }
};