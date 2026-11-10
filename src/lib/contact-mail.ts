import { Resend } from "resend";
import { enquiryTypes, type EnquiryType } from "@/lib/contact";

export type ContactEnquiryPayload = {
  type: EnquiryType;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  company: string;
  product: string;
  need: string;
  topic: string;
  role: string;
  message: string;
};

export async function sendContactEnquiryEmail(
  payload: ContactEnquiryPayload,
  toEmail: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error: "Contact form is not configured yet (missing RESEND_API_KEY).",
    };
  }

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || "SAF Water <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || toEmail.trim();
  if (!to) {
    return { ok: false, error: "No inbox configured for contact enquiries." };
  }

  const typeLabel =
    enquiryTypes.find((t) => t.id === payload.type)?.title ?? payload.type;
  const subject = `SAF ${typeLabel} — ${payload.fullName}`;

  const lines = [
    `Type: ${typeLabel}`,
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    payload.location ? `Location: ${payload.location}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    payload.product ? `Product: ${payload.product}` : null,
    payload.need ? `Need: ${payload.need}` : null,
    payload.topic ? `Topic: ${payload.topic}` : null,
    payload.role ? `Role: ${payload.role}` : null,
    "",
    "Message:",
    payload.message || "(none)",
  ].filter((line): line is string => line !== null);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text: lines.join("\n"),
    ...(payload.email ? { replyTo: payload.email } : {}),
  });

  if (error) {
    return { ok: false, error: error.message || "Failed to send enquiry email." };
  }

  return { ok: true };
}
