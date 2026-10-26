import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CMS_TAG } from "@/lib/revalidate";
import { faqs as staticFaqs } from "@/lib/site";

export type CmsFaq = { id: string; q: string; a: string };

async function loadFaqs(): Promise<CmsFaq[]> {
  try {
    const rows = await prisma.faqItem.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) {
      return staticFaqs.map((f, i) => ({ id: String(i), q: f.q, a: f.a }));
    }
    return rows.map((r) => ({ id: r.id, q: r.question, a: r.answer }));
  } catch {
    return staticFaqs.map((f, i) => ({ id: String(i), q: f.q, a: f.a }));
  }
}

export const getFaqs = unstable_cache(loadFaqs, ["cms-faqs"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
