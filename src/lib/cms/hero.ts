import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { mediaOrFallback } from "@/lib/cms/media";
import type { CmsHeroSlide } from "@/lib/cms/types";
import { CMS_TAG } from "@/lib/revalidate";
import { heroSlides as staticSlides } from "@/lib/hero-slides";

async function loadHeroSlides(): Promise<CmsHeroSlide[]> {
  try {
    const rows = await prisma.heroSlide.findMany({
      where: { isPublished: true },
      include: { media: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return fallbackSlides();
    return rows.map((row) => ({
      id: row.key,
      key: row.key,
      tab: row.tab,
      eyebrow: row.eyebrow,
      title: row.title,
      body: row.body,
      focus: row.focus,
      image: mediaOrFallback(row.media, {
        src: "/images/hero-slide-pure.jpg",
        alt: row.title,
      }),
      cta: { href: row.ctaHref, label: row.ctaLabel },
      secondary:
        row.secondaryHref && row.secondaryLabel
          ? { href: row.secondaryHref, label: row.secondaryLabel }
          : undefined,
    }));
  } catch {
    return fallbackSlides();
  }
}

function fallbackSlides(): CmsHeroSlide[] {
  return staticSlides.map((s) => ({
    id: s.id,
    key: s.id,
    tab: s.tab,
    eyebrow: s.eyebrow,
    title: s.title,
    body: s.body,
    focus: s.focus,
    image: {
      src: typeof s.image === "string" ? s.image : s.image.src,
      alt: s.alt,
      width: typeof s.image === "object" ? s.image.width : undefined,
      height: typeof s.image === "object" ? s.image.height : undefined,
    },
    cta: s.cta,
    secondary: s.secondary,
  }));
}

export const getHeroSlides = unstable_cache(loadHeroSlides, ["cms-hero"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
