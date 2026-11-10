import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { pathForPageSlug, publicSiteUrl } from "@/lib/cms/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = publicSiteUrl();
  try {
    const [site, pages, products, legal] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
      prisma.page.findMany({ where: { isPublished: true, noIndex: false } }),
      prisma.product.findMany({ where: { isPublished: true, noIndex: false } }),
      prisma.legalDoc.findMany({ where: { isPublished: true, noIndex: false } }),
    ]);
    if (site && !site.allowIndexing) return [];

    const pageUrls = new Set(pages.map((page) => pathForPageSlug(page.slug)));
    return [
      ...pages.map((page) => ({
        url: `${base}${pathForPageSlug(page.slug)}`,
        lastModified: page.updatedAt,
      })),
      ...products
        .filter((product) => !pageUrls.has(`/products/${product.slug}`))
        .map((product) => ({
          url: `${base}/products/${product.slug}`,
          lastModified: product.updatedAt,
        })),
      ...legal.map((doc) => ({
        url: `${base}/legal/${doc.slug}`,
        lastModified: doc.updatedAt,
      })),
    ];
  } catch {
    return [{ url: base, lastModified: new Date() }];
  }
}
