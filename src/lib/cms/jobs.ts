import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CMS_TAG } from "@/lib/revalidate";
import { jobs as staticJobs, type Job } from "@/lib/careers";

async function loadJobs(): Promise<Job[]> {
  try {
    const rows = await prisma.job.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return [...staticJobs];
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      team: r.team,
      experience: r.experience,
      location: r.location,
      type: r.type,
      summary: r.summary,
      requirements: r.requirements,
    }));
  } catch {
    return [...staticJobs];
  }
}

async function loadCareerPage() {
  try {
    const page = await prisma.careerPage.findUnique({ where: { id: 1 } });
    return (
      page ?? {
        title: "Build the future of pure water in Bangladesh.",
        intro:
          "Join a team that treats the cleanroom, the lab, and the delivery route as one job — and keeps raising the bar.",
      }
    );
  } catch {
    return {
      title: "Build the future of pure water in Bangladesh.",
      intro:
        "Join a team that treats the cleanroom, the lab, and the delivery route as one job — and keeps raising the bar.",
    };
  }
}

export const getJobs = unstable_cache(loadJobs, ["cms-jobs"], {
  tags: [CMS_TAG],
  revalidate: 60,
});

export const getCareerPage = unstable_cache(loadCareerPage, ["cms-career-page"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
