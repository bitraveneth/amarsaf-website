import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { images } from "@/lib/images";
import { stories } from "@/lib/site";

export const metadata: Metadata = {
  title: "News",
  description:
    "Notes from SAF: the brand launch, BSTI and ISO certification, and office jar delivery in Dhaka.",
};

export default function NewsPage() {
  const [lead, ...rest] = stories;

  return (
    <>
      <PageIntro
        eyebrow="News"
        title="Notes from the plant and the route."
        lede="Short updates you can replace later. Each one is about SAF water in Dhaka."
        tone="white"
      />

      <section className="shell pb-16 md:pb-24">
        <article className="grid gap-8 border-t border-ink/15 pt-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-14">
          <Image
            src={images[lead.image].src}
            alt={images[lead.image].alt}
            placeholder="blur"
            loading="eager"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="aspect-[4/3] h-auto w-full rounded-[2rem] object-cover lg:col-span-7"
          />
          <div className="lg:col-span-5">
            <p className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-purple px-3 py-1 font-semibold text-white">
                Latest
              </span>
              <time className="font-medium text-purple" dateTime={lead.iso}>
                {lead.date}
              </time>
            </p>
            <h2 className="text-title mt-5 text-ink md:text-5xl md:leading-[1.05]">
              {lead.title}
            </h2>
            <p className="text-lede mt-5 text-ink/75">{lead.body}</p>
          </div>
        </article>

        <div className="mt-16 grid gap-12 border-t border-ink/15 pt-10 md:mt-24 md:grid-cols-2 md:gap-8 lg:gap-14 lg:pt-14">
          {rest.map((story) => (
            <article key={story.title} className="reveal">
              <Image
                src={images[story.image].src}
                alt={images[story.image].alt}
                placeholder="blur"
                sizes="(min-width: 768px) 45vw, 100vw"
                className="aspect-[3/2] h-auto w-full rounded-[1.75rem] object-cover"
              />
              <time
                className="mt-6 block text-sm font-medium text-purple"
                dateTime={story.iso}
              >
                {story.date}
              </time>
              <h2 className="mt-3 text-2xl text-ink md:text-3xl">{story.title}</h2>
              <p className="mt-3 max-w-prose leading-relaxed text-ink/75">{story.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
