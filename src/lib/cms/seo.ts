import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CMS_TAG } from "@/lib/revalidate";

export const DEFAULT_SEO_TITLE =
  "SAF Packaged Drinking Water | Simply Pure Hydration Bangladesh";
export const DEFAULT_SEO_DESCRIPTION =
  "Order SAF packaged drinking water online. 8-stage purified water with essential minerals for home and office delivery across Dhaka.";
export const DEFAULT_TITLE_TEMPLATE = "%s | SAF Water";

export type SiteSeo = {
  title: string | null;
  description: string | null;
  keywords: string | null;
  titleTemplate: string;
  ogImageUrl: string | null;
  allowIndexing: boolean;
};

export type EntrySeo = {
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  noIndex: boolean;
};

const emptySite = (): SiteSeo => ({
  title: null,
  description: null,
  keywords: null,
  titleTemplate: DEFAULT_TITLE_TEMPLATE,
  ogImageUrl: null,
  allowIndexing: true,
});

function keywordList(value: string | null | undefined) {
  const list = (value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return list.length ? list : undefined;
}

export function publicSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const auth = process.env.AUTH_URL?.trim();
  if (auth && !/localhost|127\.0\.0\.1/.test(auth)) return auth.replace(/\/$/, "");
  return "http://localhost:3000";
}

export function pathForPageSlug(slug: string) {
  return slug === "home" ? "/" : `/${slug}`;
}

async function loadSiteSeo(): Promise<SiteSeo> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: 1 },
      include: { ogImage: true },
    });
    if (!row) return emptySite();
    return {
      title: row.seoTitle,
      description: row.seoDescription,
      keywords: row.seoKeywords,
      titleTemplate: row.titleTemplate?.trim() || DEFAULT_TITLE_TEMPLATE,
      ogImageUrl: row.ogImage?.url ?? null,
      allowIndexing: row.allowIndexing,
    };
  } catch {
    return emptySite();
  }
}

export const getSiteSeo = unstable_cache(loadSiteSeo, ["cms-site-seo"], {
  tags: [CMS_TAG],
  revalidate: 60,
});

async function loadEntry(
  kind: "page" | "product" | "legal",
  slug: string,
): Promise<EntrySeo | null> {
  try {
    if (kind === "page") {
      const row = await prisma.page.findUnique({
        where: { slug },
        include: { ogImage: true },
      });
      if (!row || !row.isPublished) return null;
      return {
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        seoKeywords: row.seoKeywords,
        ogTitle: row.ogTitle,
        ogDescription: row.ogDescription,
        ogImageUrl: row.ogImage?.url ?? null,
        noIndex: row.noIndex,
      };
    }
    if (kind === "product") {
      const row = await prisma.product.findUnique({
        where: { slug },
        include: { ogImage: true },
      });
      if (!row || !row.isPublished) return null;
      return {
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        seoKeywords: row.seoKeywords,
        ogTitle: row.ogTitle,
        ogDescription: row.ogDescription,
        ogImageUrl: row.ogImage?.url ?? null,
        noIndex: row.noIndex,
      };
    }
    const row = await prisma.legalDoc.findUnique({
      where: { slug },
      include: { ogImage: true },
    });
    if (!row || !row.isPublished) return null;
    return {
      seoTitle: row.seoTitle ?? row.title,
      seoDescription: row.seoDescription ?? row.description,
      seoKeywords: row.seoKeywords,
      ogTitle: row.ogTitle,
      ogDescription: row.ogDescription,
      ogImageUrl: row.ogImage?.url ?? null,
      noIndex: row.noIndex,
    };
  } catch {
    return null;
  }
}

export async function metadataForEntry(input: {
  kind: "page" | "product" | "legal";
  slug: string;
  fallbackTitle: string;
  fallbackDescription: string;
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const [site, entry] = await Promise.all([
    getSiteSeo(),
    loadEntry(input.kind, input.slug),
  ]);
  const title = entry?.seoTitle?.trim() || input.fallbackTitle;
  const description = entry?.seoDescription?.trim() || input.fallbackDescription;
  const image = entry?.ogImageUrl || site.ogImageUrl || undefined;
  const index = site.allowIndexing && !entry?.noIndex;
  return {
    title: input.absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywordList(entry?.seoKeywords || site.keywords),
    openGraph: {
      title: entry?.ogTitle?.trim() || title,
      description: entry?.ogDescription?.trim() || description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    robots: { index, follow: index },
  };
}

export async function rootMetadata(): Promise<Metadata> {
  const site = await getSiteSeo();
  const title = site.title?.trim() || DEFAULT_SEO_TITLE;
  const description = site.description?.trim() || DEFAULT_SEO_DESCRIPTION;
  return {
    title: {
      default: title,
      template: site.titleTemplate || DEFAULT_TITLE_TEMPLATE,
    },
    description,
    keywords: keywordList(site.keywords),
    openGraph: {
      title,
      description,
      ...(site.ogImageUrl ? { images: [{ url: site.ogImageUrl }] } : {}),
    },
    robots: site.allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
