import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { toCmsImage } from "@/lib/cms/media";
import { CMS_TAG } from "@/lib/revalidate";
import { stories as staticStories } from "@/lib/site";

export type CmsNewsPost = {
  id: string;
  slug: string;
  title: string;
  body: string;
  dateLabel: string;
  publishedAt: Date;
  image: { src: string; alt: string } | null;
};

async function loadNews(): Promise<CmsNewsPost[]> {
  try {
    const rows = await prisma.newsPost.findMany({
      where: { isPublished: true },
      include: { media: true },
      orderBy: [{ publishedAt: "desc" }, { order: "asc" }],
    });
    if (rows.length === 0) {
      return staticStories.map((s, i) => ({
        id: String(i),
        slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: s.title,
        body: s.body,
        dateLabel: s.date,
        publishedAt: new Date(s.iso),
        image: null,
      }));
    }
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      body: r.body,
      dateLabel: r.dateLabel,
      publishedAt: new Date(r.publishedAt),
      image: toCmsImage(r.media),
    }));
  } catch {
    return [];
  }
}

export const getNewsPosts = unstable_cache(loadNews, ["cms-news"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
