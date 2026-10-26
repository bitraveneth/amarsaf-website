import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { toCmsImage } from "@/lib/cms/media";
import { CMS_TAG } from "@/lib/revalidate";

export type CmsSectionBlock = {
  id: string;
  key: string | null;
  type: string;
  data: Record<string, unknown>;
  media: { src: string; alt: string } | null;
};

export type CmsSection = {
  id: string;
  key: string;
  title: string | null;
  blocks: CmsSectionBlock[];
};

async function loadSection(pageSlug: string, sectionKey: string): Promise<CmsSection | null> {
  try {
    const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
    if (!page) return null;
    const section = await prisma.section.findUnique({
      where: { pageId_key: { pageId: page.id, key: sectionKey } },
      include: {
        blocks: {
          orderBy: { order: "asc" },
          include: { media: true },
        },
      },
    });
    if (!section || !section.isPublished) return null;
    return {
      id: section.id,
      key: section.key,
      title: section.title,
      blocks: section.blocks.map((b) => ({
        id: b.id,
        key: b.key,
        type: b.type,
        data: (b.data ?? {}) as Record<string, unknown>,
        media: toCmsImage(b.media),
      })),
    };
  } catch {
    return null;
  }
}

export async function getSection(pageSlug: string, sectionKey: string) {
  return unstable_cache(
    () => loadSection(pageSlug, sectionKey),
    ["cms-section", pageSlug, sectionKey],
    { tags: [CMS_TAG], revalidate: 60 },
  )();
}

async function loadPageSections(pageSlug: string): Promise<CmsSection[]> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: pageSlug },
      include: {
        sections: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          include: {
            blocks: {
              orderBy: { order: "asc" },
              include: { media: true },
            },
          },
        },
      },
    });
    if (!page) return [];
    return page.sections.map((section) => ({
      id: section.id,
      key: section.key,
      title: section.title,
      blocks: section.blocks.map((b) => ({
        id: b.id,
        key: b.key,
        type: b.type,
        data: (b.data ?? {}) as Record<string, unknown>,
        media: toCmsImage(b.media),
      })),
    }));
  } catch {
    return [];
  }
}

export async function getPageSections(pageSlug: string) {
  return unstable_cache(
    () => loadPageSections(pageSlug),
    ["cms-page-sections", pageSlug],
    { tags: [CMS_TAG], revalidate: 60 },
  )();
}
