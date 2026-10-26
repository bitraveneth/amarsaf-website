import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { toCmsImage } from "@/lib/cms/media";
import type { CmsProduct } from "@/lib/cms/types";
import { CMS_TAG } from "@/lib/revalidate";
import { products as staticProducts } from "@/lib/site";

function mapProduct(
  row: Awaited<ReturnType<typeof fetchProductsRaw>>[number],
): CmsProduct {
  const idealFor = Array.isArray(row.idealFor)
    ? (row.idealFor as { iconKey?: string; label: string }[])
    : [];
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    size: row.size,
    pack: row.pack,
    where: row.whereUsed,
    feature: row.feature,
    summary: row.summary,
    tagline: row.tagline,
    description: row.description,
    packImage: toCmsImage(row.packMedia),
    lifestyleImage: toCmsImage(row.lifeMedia),
    highlights: row.highlights.map((h) => ({
      iconKey: h.iconKey,
      title: h.title,
      body: h.body,
    })),
    specs: row.specs.map((s) => ({ label: s.label, value: s.value })),
    faqs: row.faqs.map((f) => ({ q: f.question, a: f.answer })),
    idealFor,
  };
}

async function fetchProductsRaw() {
  return prisma.product.findMany({
    where: { isPublished: true },
    include: {
      packMedia: true,
      lifeMedia: true,
      highlights: { orderBy: { order: "asc" } },
      specs: { orderBy: { order: "asc" } },
      faqs: { orderBy: { order: "asc" } },
    },
    orderBy: { order: "asc" },
  });
}

async function loadProducts(): Promise<CmsProduct[]> {
  try {
    const rows = await fetchProductsRaw();
    if (rows.length === 0) {
      return staticProducts.map((p) => ({
        id: p.id,
        slug: p.id,
        name: p.name,
        size: p.size,
        pack: p.pack,
        where: p.where,
        feature: p.feature,
        summary: p.summary,
        highlights: [],
        specs: [],
        faqs: [],
        idealFor: [],
      }));
    }
    return rows.map(mapProduct);
  } catch {
    return staticProducts.map((p) => ({
      id: p.id,
      slug: p.id,
      name: p.name,
      size: p.size,
      pack: p.pack,
      where: p.where,
      feature: p.feature,
      summary: p.summary,
      highlights: [],
      specs: [],
      faqs: [],
      idealFor: [],
    }));
  }
}

async function loadProduct(slug: string): Promise<CmsProduct | null> {
  try {
    const row = await prisma.product.findFirst({
      where: { slug, isPublished: true },
      include: {
        packMedia: true,
        lifeMedia: true,
        highlights: { orderBy: { order: "asc" } },
        specs: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
    return row ? mapProduct(row) : null;
  } catch {
    return null;
  }
}

export const getProducts = unstable_cache(loadProducts, ["cms-products"], {
  tags: [CMS_TAG],
  revalidate: 60,
});

export async function getProduct(slug: string) {
  return unstable_cache(() => loadProduct(slug), ["cms-product", slug], {
    tags: [CMS_TAG],
    revalidate: 60,
  })();
}
