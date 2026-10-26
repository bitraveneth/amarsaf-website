import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { getNewsPosts } from "@/lib/cms/news";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "News",
  description:
    "Notes from SAF: the brand launch, BSTI and ISO certification, and office jar delivery in Dhaka.",
};

export default async function NewsPage() {
  const stories = await getNewsPosts();
  if (stories.length === 0) {
    return (
      <PageIntro
        eyebrow="News"
        title="Notes from the plant and the route."
        lede="Updates will appear here soon."
      />
    );
  }
  const [lead, ...rest] = stories;
  const leadImage = lead.image ?? { src: images.lineup.src.src, alt: images.lineup.alt };

  return (
    <>
      <PageIntro
        eyebrow="News"
        title="Notes from the plant and the route."
        lede="Short updates you can replace later. Each one is about SAF water in Dhaka."
      />

      <section className="shell pb-16 md:pb-24">
        <article className="grid gap-8 border-t border-ink/15 pt-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-14">
          <Image
            src={leadImage.src}
            alt={leadImage.alt}
            width={1200}
            height={900}
            loading="eager"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="aspect-[4/3] h-auto w-full rounded-[2rem] object-cover lg:col-span-7"
          />
          <div className="lg:col-span-5">
            <p className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-purple px-3 py-1 font-semibold text-white">
                Latest
              </span>
              <time
                className="font-medium text-purple"
                dateTime={new Date(lead.publishedAt).toISOString()}
              >
                {lead.dateLabel}
              </time>
            </p>
            <h2 className="text-title mt-5 text-ink md:text-5xl md:leading-[1.05]">
              {lead.title}
            </h2>
            <p className="text-lede mt-5 text-ink/75">{lead.body}</p>
          </div>
        </article>

        <div className="mt-16 grid gap-12 border-t border-ink/15 pt-10 md:mt-24 md:grid-cols-2 md:gap-8 lg:gap-14 lg:pt-14">
          {rest.map((story) => {
            const img = story.image ?? { src: images.lab.src.src, alt: images.lab.alt };
            return (
              <article key={story.id} className="reveal">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={533}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="aspect-[3/2] h-auto w-full rounded-[1.75rem] object-cover"
                />
                <time
                  dateTime={new Date(story.publishedAt).toISOString()}
                  className="mt-5 block text-sm font-semibold text-purple"
                >
                  {story.dateLabel}
                </time>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-ink">{story.title}</h2>
                <p className="mt-3 text-ink/70">{story.body}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
