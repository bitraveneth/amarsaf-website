import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CMS_TAG } from "@/lib/revalidate";
import {
  legalDocs as staticDocs,
  legalUpdated as staticUpdated,
  type LegalDoc,
  type LegalSection,
} from "@/lib/legal";

async function loadLegalDocs(): Promise<LegalDoc[]> {
  try {
    const rows = await prisma.legalDoc.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return staticDocs;
    return rows.map((r) => ({
      slug: r.slug,
      label: r.label,
      title: r.title,
      description: r.description,
      intro: r.intro,
      sections: r.sections as LegalSection[],
    }));
  } catch {
    return staticDocs;
  }
}

async function loadLegalDoc(slug: string): Promise<LegalDoc | null> {
  const docs = await loadLegalDocs();
  return docs.find((d) => d.slug === slug) ?? null;
}

async function loadLegalUpdated() {
  try {
    const row = await prisma.legalDoc.findFirst({
      where: { isPublished: true },
      orderBy: { updatedAt: "desc" },
    });
    if (row?.updatedLabel && row.updatedIso) {
      return { label: row.updatedLabel, iso: row.updatedIso };
    }
  } catch {
    /* fall through */
  }
  return staticUpdated;
}

export const getLegalDocs = unstable_cache(loadLegalDocs, ["cms-legal"], {
  tags: [CMS_TAG],
  revalidate: 60,
});

export async function getLegalDoc(slug: string) {
  return unstable_cache(() => loadLegalDoc(slug), ["cms-legal", slug], {
    tags: [CMS_TAG],
    revalidate: 60,
  })();
}

export const getLegalUpdated = unstable_cache(loadLegalUpdated, ["cms-legal-updated"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
