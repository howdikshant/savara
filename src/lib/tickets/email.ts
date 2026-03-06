import { getResendClient } from "@/lib/email/resend";

export async function sendActivationCodeEmail(params: {
  to: string;
  activationCode: string;
  ticketCount: number;
}) {
  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured");
  }

  const resend = getResendClient();

  await resend.emails.send({
    from,
    to: params.to,
    subject: "Savara 2026 Ticket Activation Code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin-bottom: 8px;">Your Savara 2026 Ticket Activation Code</h2>
        <p style="margin: 0 0 10px;">Use this code in your dashboard to activate tickets.</p>
        <p style="margin: 0 0 4px;"><strong>Activation code:</strong> ${params.activationCode}</p>
        <p style="margin: 0 0 16px;"><strong>Ticket capacity:</strong> ${params.ticketCount}</p>
        <p style="margin: 0;">Open the site, sign in with Google, and redeem this code at <strong>/dashboard/ticket</strong>.</p>
      </div>
    `,
  });
}
