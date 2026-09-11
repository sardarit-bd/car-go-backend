import { Resend } from "resend";
import { prisma } from "../../../lib/prisma.js";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendReservationConfirmationEmail = async (reservation) => {
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
  const frontendUrl = process.env.FRONTEND_URL || "https://car-go.pl";
  const confirmationLink = `${frontendUrl}/lookup?id=${reservation.bookingReference || reservation.id}`;
  const pickupDate = new Date(reservation.pickupDate).toLocaleDateString(
    "pl-PL",
  );
  const returnDate = new Date(reservation.returnDate).toLocaleDateString(
    "pl-PL",
  );
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Potwierdzenie rezerwacji CAR-GO</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
<!-- Header -->
<tr>
  <td style="background-color: ${primaryColor}; padding: 24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="text-align: left; vertical-align: middle;">
          <img src="${logoUrl}" alt="CAR-GO Logo" style="max-height: 50px;" />
        </td>
        <td style="text-align: right; vertical-align: middle;">
          <span style="color: #ffffff; font-weight: 700; font-size: 14px;">📞 ${phone}</span>
        </td>
      </tr>
    </table>
    <h1 style="margin: 16px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; text-align: center;">
      POTWIERDZENIE REZERWACJI
    </h1>
  </td>
</tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; color: #0f172a;">
              Cześć ${reservation.customerFirstName}!
            </h2>
            
            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
              Dziękujemy za dokonanie rezerwacji w CAR-GO. Poniżej znajdziesz szczegóły swojego wynajmu.
            </p>

            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Pojazd:</strong> ${reservation.vehicle?.brand || ""} ${reservation.vehicle?.model || ""}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Data odbioru:</strong> ${pickupDate}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Data zwrotu:</strong> ${returnDate}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Numer rezerwacji:</strong> ${reservation.bookingReference || reservation.id}</p>
              <p style="margin: 8px 0 0 0; font-size: 16px; font-weight: 800; color: ${primaryColor};"><strong>Łączna kwota: PLN ${reservation.totalPrice}</strong></p>
            </div>

<p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.6; color: #475569;">
  PS. Polub nasz profil na Facebooku i bądź na bieżąco z aktualnymi promocjami! <a href="${fbLink}" style="color: ${primaryColor}; font-weight: 700; text-decoration: underline;">Sprawdź</a>
</p>

<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
  ${signature}
</p>
          </td>
        </tr>

        <!-- Footer -->
<!-- Footer -->
<tr>
  <td style="background-color: #0f172a; padding: 28px 24px; text-align: center;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 14px;">
      <tr>
        <td style="border-radius: 50%; border: 2px solid ${primaryColor}; padding: 4px;">
          <img src="${logoUrl}" alt="CAR-GO Logo" width="48" height="48" style="display: block; border-radius: 50%; object-fit: cover;" />
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #ffffff;">
      ${companyName}
    </p>
    <p style="margin: 0 0 14px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
      📞 ${phone} <br>
      ✉️ ${email} <br>
      🌐 ${website}
    </p>

    <!-- Social Media Links -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 4px;">
      <tr>
        <td style="padding: 0 8px;">
          <a href="${fbLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 700; font-size: 13px;">Facebook</a>
        </td>
        <td style="padding: 0 8px;">
          <a href="${igLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 700; font-size: 13px;">Instagram</a>
        </td>
      </tr>
    </table>

    <p style="margin: 20px 0 0 0; font-size: 11px; color: #64748b;">
      © ${new Date().getFullYear()} CAR-GO. Wszelkie prawa zastrzeżone.
    </p>
  </td>
</tr>
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
  } catch (err) {
    console.error("[Email Service] Unexpected Error:", err.message);
    return { success: false, error: err.message };
  }
};
export const sendActivationEmail = async (email, firstName, activationLink) => {
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
  <td style="background-color: ${primaryColor}; padding: 24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="text-align: left; vertical-align: middle;">
          <img src="${logoUrl}" alt="CAR-GO Logo" style="max-height: 50px;" />
        </td>
        <td style="text-align: right; vertical-align: middle;">
          <span style="color: #ffffff; font-weight: 700; font-size: 14px;">📞 ${phone}</span>
        </td>
      </tr>
    </table>
    <h1 style="margin: 16px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; text-align: center;">
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

<p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.6; color: #475569;">
  PS. Polub nasz profil na Facebooku i bądź na bieżąco z aktualnymi promocjami! <a href="${fbLink}" style="color: ${primaryColor}; font-weight: 700; text-decoration: underline;">Sprawdź</a>
</p>

<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
  ${signature}
</p>
          </td>
        </tr>

<!-- Footer -->
<tr>
  <td style="background-color: #0f172a; padding: 28px 24px; text-align: center;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 14px;">
      <tr>
        <td style="border-radius: 50%; border: 2px solid ${primaryColor}; padding: 4px;">
          <img src="${logoUrl}" alt="CAR-GO Logo" width="48" height="48" style="display: block; border-radius: 50%; object-fit: cover;" />
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #ffffff;">
      ${companyName}
    </p>
    <p style="margin: 0 0 14px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
      📞 ${phone} <br>
      ✉️ ${companyEmail} <br>
      🌐 ${website}
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 4px;">
      <tr>
        <td style="padding: 0 8px;">
          <a href="${fbLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 700; font-size: 13px;">Facebook</a>
        </td>
        <td style="padding: 0 8px;">
          <a href="${igLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 700; font-size: 13px;">Instagram</a>
        </td>
      </tr>
    </table>

    <p style="margin: 20px 0 0 0; font-size: 11px; color: #64748b;">
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
  } catch (err) {
    console.error(
      "[Email Service] Unexpected Error (activation):",
      err.message,
    );
    return { success: false, error: err.message };
  }
};
export const sendResetPasswordOtpEmail = async (email, firstName, otp) => {
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
  <td style="background-color: ${primaryColor}; padding: 24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="text-align: left; vertical-align: middle;">
          <img src="${logoUrl}" alt="CAR-GO Logo" style="max-height: 50px;" />
        </td>
        <td style="text-align: right; vertical-align: middle;">
          <span style="color: #ffffff; font-weight: 700; font-size: 14px;">📞 ${phone}</span>
        </td>
      </tr>
    </table>
    <h1 style="margin: 16px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; text-align: center;">
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

<p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.6; color: #475569;">
  PS. Polub nasz profil na Facebooku i bądź na bieżąco z aktualnymi promocjami! <a href="${fbLink}" style="color: ${primaryColor}; font-weight: 700; text-decoration: underline;">Sprawdź</a>
</p>

<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569;">
  ${signature}
</p>
          </td>
        </tr>

<tr>
  <td style="background-color: #0f172a; padding: 28px 24px; text-align: center;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 14px;">
      <tr>
        <td style="border-radius: 50%; border: 2px solid ${primaryColor}; padding: 4px;">
          <img src="${logoUrl}" alt="CAR-GO Logo" width="48" height="48" style="display: block; border-radius: 50%; object-fit: cover;" />
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #ffffff;">
      ${companyName}
    </p>
    <p style="margin: 0 0 14px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
      📞 ${phone} <br>
      ✉️ ${companyEmail} <br>
      🌐 ${website}
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 4px;">
      <tr>
        <td style="padding: 0 8px;">
          <a href="${fbLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 700; font-size: 13px;">Facebook</a>
        </td>
        <td style="padding: 0 8px;">
          <a href="${igLink}" target="_blank" style="text-decoration: none; color: ${primaryColor}; font-weight: 700; font-size: 13px;">Instagram</a>
        </td>
      </tr>
    </table>

    <p style="margin: 20px 0 0 0; font-size: 11px; color: #64748b;">
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
  } catch (err) {
    console.error("[Email Service] Unexpected Error (reset otp):", err.message);
    return { success: false, error: err.message };
  }
};
