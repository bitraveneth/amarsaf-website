"use server";

import {
  businessNeeds,
  isEnquiryType,
  supportTopics,
  type EnquiryType,
} from "@/lib/contact";
import { sendContactEnquiryEmail } from "@/lib/contact-mail";
import { getSiteSettings } from "@/lib/cms/settings";
import { jobs } from "@/lib/careers";
import { products } from "@/lib/site";

export type ContactSubmitResult = { ok: true } | { ok: false; error: string };

const requiredByType: Record<EnquiryType, string[]> = {
  product: ["fullName", "phone", "location", "product"],
  business: ["fullName", "phone", "company", "location", "need"],
  support: ["fullName", "phone", "location", "topic", "message"],
  careers: ["fullName", "phone", "role"],
};

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactEnquiry(
  formData: FormData,
): Promise<ContactSubmitResult> {
  const typeRaw = field(formData, "type");
  if (!isEnquiryType(typeRaw)) {
    return { ok: false, error: "Choose what this enquiry is about." };
  }
  const type = typeRaw;

  const payload = {
    type,
    fullName: field(formData, "fullName"),
    phone: field(formData, "phone"),
    email: field(formData, "email"),
    location: field(formData, "location"),
    company: field(formData, "company"),
    product: field(formData, "product"),
    need: field(formData, "need"),
    topic: field(formData, "topic"),
    role: field(formData, "role"),
    message: field(formData, "message"),
  };

  for (const name of requiredByType[type]) {
    if (!payload[name as keyof typeof payload]) {
      return { ok: false, error: "Please fill in all required fields." };
    }
  }

  if (payload.email && !isEmail(payload.email)) {
    return { ok: false, error: "Enter a valid email address, or leave it empty." };
  }

  if (type === "product") {
    const allowed = new Set([
      ...products.map((p) => p.name),
      "Not sure yet",
    ]);
    if (!allowed.has(payload.product)) {
      return { ok: false, error: "Choose a valid product." };
    }
  }

  if (type === "business" && !businessNeeds.includes(payload.need)) {
    return { ok: false, error: "Choose what you need." };
  }

  if (type === "support" && !supportTopics.includes(payload.topic)) {
    return { ok: false, error: "Choose a support topic." };
  }

  if (type === "careers") {
    const allowedRoles = new Set([
      ...jobs.map((j) => j.slug),
      "open-application",
    ]);
    if (!allowedRoles.has(payload.role)) {
      return { ok: false, error: "Choose a valid role." };
    }
  }

  const settings = await getSiteSettings();
  return sendContactEnquiryEmail(payload, settings.company.email);
}
