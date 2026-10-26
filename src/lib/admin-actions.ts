"use server";

import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { signIn, signOut } from "@/lib/auth";
import {
  canDelete,
  canEditSettings,
  canManageUsers,
  canPublish,
  requireAdmin,
  requireRole,
} from "@/lib/admin";
import { prisma } from "@/lib/db";
import { uploadMediaFile } from "@/lib/media-upload";
import { revalidateSite } from "@/lib/revalidate";
import type { Role } from "@/lib/roles";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optStr(formData: FormData, key: string) {
  const v = str(formData, key);
  return v || null;
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function int(formData: FormData, key: string, fallback = 0) {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function publishedForRole(role: Role, requested: boolean) {
  return canPublish(role) ? requested : false;
}

function linesFromTextarea(raw: string) {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseJsonField<T>(raw: string, fallback: T): T {
  if (!raw.trim()) return fallback;
  return JSON.parse(raw) as T;
}

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

function fail(message: string): ActionResult {
  return { ok: false, error: message };
}

function ok(): ActionResult {
  return { ok: true };
}

export async function adminSignIn(formData: FormData): Promise<ActionResult> {
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const callbackUrl = str(formData, "callbackUrl") || "/admin";

  if (!email || !password) return fail("Email and password are required.");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return ok();
  } catch (error) {
    if (error instanceof AuthError) {
      return fail("Invalid email or password.");
    }
    throw error;
  }
}

export async function adminSignOut() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function updateSettings(formData: FormData): Promise<ActionResult> {
  try {
    await requireRole(canEditSettings);
  } catch {
    return fail("You do not have permission to edit settings.");
  }

  const addressLines = linesFromTextarea(str(formData, "addressLines"));

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      companyName: str(formData, "companyName"),
      tagline: str(formData, "tagline"),
      addressLines,
      hotline: str(formData, "hotline"),
      email: str(formData, "email"),
      seoTitle: optStr(formData, "seoTitle"),
      seoDescription: optStr(formData, "seoDescription"),
      noticeEnabled: bool(formData, "noticeEnabled"),
      noticeText: optStr(formData, "noticeText"),
      noticeHref: optStr(formData, "noticeHref"),
    },
    update: {
      companyName: str(formData, "companyName"),
      tagline: str(formData, "tagline"),
      addressLines,
      hotline: str(formData, "hotline"),
      email: str(formData, "email"),
      seoTitle: optStr(formData, "seoTitle"),
      seoDescription: optStr(formData, "seoDescription"),
      noticeEnabled: bool(formData, "noticeEnabled"),
      noticeText: optStr(formData, "noticeText"),
      noticeHref: optStr(formData, "noticeHref"),
    },
  });

  revalidateSite(["/", "/about"]);
  revalidatePath("/admin/settings");
  return ok();
}

export async function createMedia(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return fail("Choose a file to upload.");
  }

  const alt = str(formData, "alt");
  const uploaded = await uploadMediaFile(file);

  await prisma.media.create({
    data: {
      url: uploaded.url,
      alt,
      filename: uploaded.filename,
      mimeType: uploaded.mimeType,
      sizeBytes: uploaded.sizeBytes,
    },
  });

  revalidateSite(["/"]);
  revalidatePath("/admin/media");
  return ok();
}

export async function updateMediaAlt(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = str(formData, "id");
  if (!id) return fail("Missing media id.");

  await prisma.media.update({
    where: { id },
    data: { alt: str(formData, "alt") },
  });

  revalidateSite(["/", "/products", "/news"]);
  revalidatePath("/admin/media");
  return ok();
}

export async function deleteMedia(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete media.");

  const id = str(formData, "id");
  if (!id) return fail("Missing media id.");

  await prisma.media.delete({ where: { id } });
  revalidateSite(["/", "/products", "/news"]);
  revalidatePath("/admin/media");
  return ok();
}

export async function upsertHeroSlide(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const key = str(formData, "key");
  if (!key) return fail("Key is required.");

  const data = {
    key,
    tab: str(formData, "tab"),
    eyebrow: str(formData, "eyebrow"),
    title: str(formData, "title"),
    body: str(formData, "body"),
    focus: optStr(formData, "focus"),
    ctaHref: str(formData, "ctaHref"),
    ctaLabel: str(formData, "ctaLabel"),
    secondaryHref: optStr(formData, "secondaryHref"),
    secondaryLabel: optStr(formData, "secondaryLabel"),
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
    mediaId: optStr(formData, "mediaId"),
  };

  let slideId = id;
  if (id) {
    await prisma.heroSlide.update({ where: { id }, data });
  } else {
    const created = await prisma.heroSlide.create({ data });
    slideId = created.id;
  }

  revalidateSite(["/"]);
  revalidatePath("/admin/hero");
  return { ok: true, id: slideId ?? undefined };
}

export async function deleteHeroSlide(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete hero slides.");

  const id = str(formData, "id");
  if (!id) return fail("Missing id.");

  await prisma.heroSlide.delete({ where: { id } });
  revalidateSite(["/"]);
  revalidatePath("/admin/hero");
  return ok();
}

export async function upsertProduct(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const slug = str(formData, "slug");
  const name = str(formData, "name");
  if (!slug || !name) return fail("Slug and name are required.");

  const highlightsJson = str(formData, "highlightsJson");
  const specsJson = str(formData, "specsJson");
  const faqsJson = str(formData, "faqsJson");
  const idealForJson = str(formData, "idealForJson");

  const scalar = {
    slug,
    name,
    size: str(formData, "size"),
    pack: str(formData, "pack"),
    whereUsed: str(formData, "whereUsed"),
    feature: str(formData, "feature"),
    summary: str(formData, "summary"),
    tagline: optStr(formData, "tagline"),
    description: optStr(formData, "description"),
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
    packMediaId: optStr(formData, "packMediaId"),
    lifeMediaId: optStr(formData, "lifeMediaId"),
    ...(idealForJson.trim()
      ? {
          idealFor: parseJsonField(idealForJson, []) as Prisma.InputJsonValue,
        }
      : {}),
  };

  let productId = id;

  if (id) {
    await prisma.product.update({ where: { id }, data: scalar });
  } else {
    const created = await prisma.product.create({ data: scalar });
    productId = created.id;
  }

  if (productId && (highlightsJson || specsJson || faqsJson)) {
    if (highlightsJson.trim()) {
      const items = parseJsonField<
        { iconKey?: string; title: string; body: string; order?: number }[]
      >(highlightsJson, []);
      await prisma.productHighlight.deleteMany({ where: { productId } });
      if (items.length) {
        await prisma.productHighlight.createMany({
          data: items.map((h, i) => ({
            productId,
            iconKey: h.iconKey ?? null,
            title: h.title,
            body: h.body,
            order: h.order ?? i,
          })),
        });
      }
    }
    if (specsJson.trim()) {
      const items = parseJsonField<{ label: string; value: string; order?: number }[]>(
        specsJson,
        [],
      );
      await prisma.productSpec.deleteMany({ where: { productId } });
      if (items.length) {
        await prisma.productSpec.createMany({
          data: items.map((s, i) => ({
            productId,
            label: s.label,
            value: s.value,
            order: s.order ?? i,
          })),
        });
      }
    }
    if (faqsJson.trim()) {
      const items = parseJsonField<{ question: string; answer: string; order?: number }[]>(
        faqsJson,
        [],
      );
      await prisma.productFaq.deleteMany({ where: { productId } });
      if (items.length) {
        await prisma.productFaq.createMany({
          data: items.map((f, i) => ({
            productId,
            question: f.question,
            answer: f.answer,
            order: f.order ?? i,
          })),
        });
      }
    }
  }

  revalidateSite(["/", "/products", `/products/${slug}`]);
  revalidatePath("/admin/products");
  if (productId) revalidatePath(`/admin/products/${productId}`);
  return { ok: true, id: productId ?? undefined };
}

export async function deleteProduct(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete products.");

  const id = str(formData, "id");
  if (!id) return fail("Missing id.");

  await prisma.product.delete({ where: { id } });
  revalidateSite(["/", "/products"]);
  revalidatePath("/admin/products");
  return ok();
}

export async function upsertNews(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const slug = str(formData, "slug");
  const title = str(formData, "title");
  if (!slug || !title) return fail("Slug and title are required.");

  const publishedAtRaw = str(formData, "publishedAt");
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date();

  const data = {
    slug,
    title,
    body: str(formData, "body"),
    dateLabel: str(formData, "dateLabel"),
    publishedAt,
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
    mediaId: optStr(formData, "mediaId"),
  };

  if (id) {
    await prisma.newsPost.update({ where: { id }, data });
  } else {
    await prisma.newsPost.create({ data });
  }

  revalidateSite(["/", "/news"]);
  revalidatePath("/admin/news");
  return ok();
}

export async function deleteNews(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete news.");

  const id = str(formData, "id");
  if (!id) return fail("Missing id.");

  await prisma.newsPost.delete({ where: { id } });
  revalidateSite(["/", "/news"]);
  revalidatePath("/admin/news");
  return ok();
}

export async function upsertFaq(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const data = {
    question: str(formData, "question"),
    answer: str(formData, "answer"),
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
  };

  if (!data.question) return fail("Question is required.");

  let faqId = id;
  if (id) {
    await prisma.faqItem.update({ where: { id }, data });
  } else {
    const created = await prisma.faqItem.create({ data });
    faqId = created.id;
  }

  revalidateSite(["/", "/faq"]);
  revalidatePath("/admin/faq");
  return { ok: true, id: faqId ?? undefined };
}

export async function deleteFaq(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete FAQ items.");

  const id = str(formData, "id");
  if (!id) return fail("Missing id.");

  await prisma.faqItem.delete({ where: { id } });
  revalidateSite(["/", "/faq"]);
  revalidatePath("/admin/faq");
  return ok();
}

export async function upsertJob(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const slug = str(formData, "slug");
  const title = str(formData, "title");
  if (!slug || !title) return fail("Slug and title are required.");

  const data = {
    slug,
    title,
    team: str(formData, "team"),
    experience: str(formData, "experience"),
    location: str(formData, "location"),
    type: str(formData, "type"),
    summary: str(formData, "summary"),
    requirements: linesFromTextarea(str(formData, "requirements")),
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
  };

  if (id) {
    await prisma.job.update({ where: { id }, data });
  } else {
    await prisma.job.create({ data });
  }

  revalidateSite(["/", "/careers"]);
  revalidatePath("/admin/jobs");
  return ok();
}

export async function deleteJob(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete jobs.");

  const id = str(formData, "id");
  if (!id) return fail("Missing id.");

  await prisma.job.delete({ where: { id } });
  revalidateSite(["/", "/careers"]);
  revalidatePath("/admin/jobs");
  return ok();
}

export async function upsertSection(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const pageId = str(formData, "pageId");
  const key = str(formData, "key");
  if (!pageId || !key) return fail("Page and section key are required.");

  const data = {
    pageId,
    key,
    title: optStr(formData, "title"),
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
  };

  let sectionId = id;
  if (id) {
    await prisma.section.update({ where: { id }, data });
  } else {
    const created = await prisma.section.create({ data });
    sectionId = created.id;
  }

  revalidateSite(["/", "/about", "/heritage", "/media-kit"]);
  revalidatePath(`/admin/pages/${pageId}`);
  return { ok: true, id: sectionId ?? undefined };
}

export async function upsertSectionBlock(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const sectionId = str(formData, "sectionId");
  const pageId = str(formData, "pageId");
  if (!sectionId) return fail("Section is required.");

  let dataJson: Prisma.InputJsonValue;
  try {
    dataJson = parseJsonField(str(formData, "dataJson"), {}) as Prisma.InputJsonValue;
  } catch {
    return fail("Block data must be valid JSON.");
  }

  const payload = {
    sectionId,
    key: optStr(formData, "key"),
    type: str(formData, "type") || "text",
    order: int(formData, "order"),
    data: dataJson,
    mediaId: optStr(formData, "mediaId"),
  };

  if (id) {
    await prisma.sectionBlock.update({ where: { id }, data: payload });
  } else {
    await prisma.sectionBlock.create({ data: payload });
  }

  revalidateSite(["/", "/about", "/heritage", "/media-kit"]);
  if (pageId) revalidatePath(`/admin/pages/${pageId}`);
  return ok();
}

export async function deleteSectionBlock(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete blocks.");

  const id = str(formData, "id");
  const pageId = str(formData, "pageId");
  if (!id) return fail("Missing id.");

  await prisma.sectionBlock.delete({ where: { id } });
  revalidateSite(["/", "/about", "/heritage", "/media-kit"]);
  if (pageId) revalidatePath(`/admin/pages/${pageId}`);
  return ok();
}

export async function upsertLegal(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const id = optStr(formData, "id");
  const slug = str(formData, "slug");
  if (!slug) return fail("Slug is required.");

  let sections: Prisma.InputJsonValue;
  try {
    const parsed = parseJsonField(str(formData, "sectionsJson"), []) as unknown;
    if (!Array.isArray(parsed)) return fail("Sections are invalid.");
    sections = parsed.map((raw, index) => {
      const item = (raw ?? {}) as Record<string, unknown>;
      const title = String(item.title ?? "").trim();
      const id =
        String(item.id ?? "")
          .trim()
          .replace(/[^a-z0-9-]+/gi, "-")
          .toLowerCase() || `section-${index + 1}`;
      const body = Array.isArray(item.body)
        ? item.body.map((p) => String(p).trim()).filter(Boolean)
        : String(item.body ?? "")
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean);
      const list = Array.isArray(item.list)
        ? item.list.map((p) => String(p).trim()).filter(Boolean)
        : String(item.list ?? "")
            .split("\n")
            .map((p) => p.trim())
            .filter(Boolean);
      return {
        id,
        title: title || `Section ${index + 1}`,
        body,
        ...(list.length ? { list } : {}),
      };
    }) as Prisma.InputJsonValue;
  } catch {
    return fail("Could not save sections.");
  }

  const data = {
    slug,
    label: str(formData, "label"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    intro: str(formData, "intro"),
    sections,
    updatedLabel: optStr(formData, "updatedLabel"),
    updatedIso: optStr(formData, "updatedIso"),
    order: int(formData, "order"),
    isPublished: publishedForRole(user.role, bool(formData, "isPublished")),
  };

  if (id) {
    await prisma.legalDoc.update({ where: { id }, data });
  } else {
    await prisma.legalDoc.create({ data });
  }

  revalidateSite(["/", `/legal/${slug}`]);
  revalidatePath("/admin/legal");
  return ok();
}

export async function deleteLegal(formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }
  if (!canDelete(user.role)) return fail("You cannot delete legal documents.");

  const id = str(formData, "id");
  if (!id) return fail("Missing id.");

  const doc = await prisma.legalDoc.delete({ where: { id } });
  revalidateSite(["/", `/legal/${doc.slug}`]);
  revalidatePath("/admin/legal");
  return ok();
}

export async function upsertContact(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const enquiryTypes: {
    id: string;
    label: string;
    title: string;
    body: string;
    cta: string;
    iconKey: string;
  }[] = [];

  for (let i = 0; i < 20; i++) {
    const id = str(formData, `enquiry_${i}_id`);
    const label = str(formData, `enquiry_${i}_label`);
    if (!id && !label) continue;
    enquiryTypes.push({
      id: id || label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label: label || id,
      title: str(formData, `enquiry_${i}_title`) || label || id,
      body: str(formData, `enquiry_${i}_body`),
      cta: str(formData, `enquiry_${i}_cta`) || "Contact",
      iconKey: str(formData, `enquiry_${i}_iconKey`) || id || "product",
    });
  }

  // Fallback for older JSON payloads
  if (enquiryTypes.length === 0 && str(formData, "enquiryTypesJson")) {
    try {
      const parsed = parseJsonField(str(formData, "enquiryTypesJson"), []) as typeof enquiryTypes;
      enquiryTypes.push(...parsed);
    } catch {
      return fail("Enquiry types must be valid.");
    }
  }

  const businessNeeds = linesFromTextarea(str(formData, "businessNeeds"));
  const supportTopics = linesFromTextarea(str(formData, "supportTopics"));

  await prisma.contactSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      enquiryTypes,
      businessNeeds,
      supportTopics,
    },
    update: {
      enquiryTypes,
      businessNeeds,
      supportTopics,
    },
  });

  revalidateSite(["/", "/contact"]);
  revalidatePath("/admin/contact");
  return ok();
}

export async function createUser(formData: FormData): Promise<ActionResult> {
  try {
    await requireRole(canManageUsers);
  } catch {
    return fail("Only superadmins can manage users.");
  }

  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const name = optStr(formData, "name");
  const role = str(formData, "role") as Role;

  if (!email || !password) return fail("Email and password are required.");
  if (!["SUPERADMIN", "ADMIN", "STAFF"].includes(role)) {
    return fail("Invalid role.");
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role,
      active: bool(formData, "active"),
    },
  });

  revalidatePath("/admin/users");
  return ok();
}

export async function updateUser(formData: FormData): Promise<ActionResult> {
  let actor;
  try {
    actor = await requireRole(canManageUsers);
  } catch {
    return fail("Only superadmins can manage users.");
  }

  const id = str(formData, "id");
  if (!id) return fail("Missing user id.");
  if (id === actor.id && !bool(formData, "active")) {
    return fail("You cannot deactivate your own account.");
  }

  const role = str(formData, "role") as Role;
  if (!["SUPERADMIN", "ADMIN", "STAFF"].includes(role)) {
    return fail("Invalid role.");
  }

  const data: {
    name: string | null;
    role: Role;
    active: boolean;
    passwordHash?: string;
  } = {
    name: optStr(formData, "name"),
    role,
    active: bool(formData, "active"),
  };

  const newPassword = str(formData, "password");
  if (newPassword) {
    data.passwordHash = await hash(newPassword, 12);
  }

  await prisma.user.update({ where: { id }, data });
  revalidatePath("/admin/users");
  return ok();
}

/** Friendly homepage section saves (no raw JSON required in the UI). */
export async function saveHomeSection(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized.");
  }

  const sectionKey = str(formData, "sectionKey");
  if (!sectionKey) return fail("Missing section.");

  const home = await prisma.page.findUnique({ where: { slug: "home" } });
  if (!home) return fail("Home page missing — run db:seed.");

  const section = await prisma.section.upsert({
    where: { pageId_key: { pageId: home.id, key: sectionKey } },
    create: {
      pageId: home.id,
      key: sectionKey,
      title: str(formData, "sectionTitle") || sectionKey,
      order: int(formData, "sectionOrder"),
      isPublished: true,
    },
    update: {
      title: str(formData, "sectionTitle") || sectionKey,
    },
  });

  await prisma.sectionBlock.deleteMany({ where: { sectionId: section.id } });

  if (sectionKey === "purity-measured") {
    await prisma.sectionBlock.create({
      data: {
        sectionId: section.id,
        key: "header",
        type: "text",
        order: 0,
        data: {
          eyebrow: str(formData, "eyebrow"),
          title: str(formData, "title"),
          ctaLabel: str(formData, "ctaLabel"),
          ctaHref: str(formData, "ctaHref"),
        },
      },
    });
    for (let i = 0; i < 4; i++) {
      const label = str(formData, `stat_${i}_label`);
      if (!label) continue;
      await prisma.sectionBlock.create({
        data: {
          sectionId: section.id,
          key: `stat-${i}`,
          type: "stat",
          order: i + 1,
          data: {
            label,
            value: str(formData, `stat_${i}_value`),
            unit: str(formData, `stat_${i}_unit`),
            note: str(formData, `stat_${i}_note`),
          },
        },
      });
    }
  } else if (sectionKey === "why-saf") {
    await prisma.sectionBlock.create({
      data: {
        sectionId: section.id,
        key: "header",
        type: "text",
        order: 0,
        data: {
          eyebrow: str(formData, "eyebrow"),
          title: str(formData, "title"),
          body: str(formData, "body"),
        },
      },
    });
    for (let i = 0; i < 4; i++) {
      const title = str(formData, `card_${i}_title`);
      if (!title) continue;
      await prisma.sectionBlock.create({
        data: {
          sectionId: section.id,
          key: `card-${i}`,
          type: "bento",
          order: i + 1,
          data: {
            title,
            body: str(formData, `card_${i}_body`),
            points: linesFromTextarea(str(formData, `card_${i}_points`)),
          },
          mediaId: optStr(formData, `card_${i}_mediaId`),
        },
      });
    }
  } else if (sectionKey === "know-what-you-drink") {
    await prisma.sectionBlock.create({
      data: {
        sectionId: section.id,
        key: "copy",
        type: "text",
        order: 0,
        data: {
          eyebrow: str(formData, "eyebrow"),
          title: str(formData, "title"),
          body: str(formData, "body"),
          bullets: linesFromTextarea(str(formData, "bullets")),
          ctaLabel: str(formData, "ctaLabel"),
          ctaHref: str(formData, "ctaHref"),
        },
        mediaId: optStr(formData, "mediaId"),
      },
    });
  } else if (sectionKey === "ways") {
    await prisma.sectionBlock.create({
      data: {
        sectionId: section.id,
        key: "header",
        type: "text",
        order: 0,
        data: {
          eyebrow: str(formData, "eyebrow"),
          title: str(formData, "title"),
          body: str(formData, "body"),
        },
      },
    });
    for (let i = 0; i < 3; i++) {
      const title = str(formData, `way_${i}_title`);
      if (!title) continue;
      await prisma.sectionBlock.create({
        data: {
          sectionId: section.id,
          key: `way-${i}`,
          type: "way",
          order: i + 1,
          data: {
            title,
            body: str(formData, `way_${i}_body`),
            points: linesFromTextarea(str(formData, `way_${i}_points`)),
            cta: str(formData, `way_${i}_cta`),
            href: str(formData, `way_${i}_href`),
          },
          mediaId: optStr(formData, `way_${i}_mediaId`),
        },
      });
    }
  } else {
    return fail("Unknown homepage section.");
  }

  revalidateSite(["/"]);
  revalidatePath("/admin/home");
  revalidatePath(`/admin/home/${sectionKey}`);
  return ok();
}
