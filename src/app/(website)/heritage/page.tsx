import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { images } from "@/lib/images";
import { milestones, monuments } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Heritage",
  description:
    "The SAF story: how SAF Food & Beverage Ltd. grew from one belief to a certified plant in Bashundhara, and what comes next.",
};

export default function HeritagePage() {
  return (
    <>
      <PageIntro
        eyebrow="The SAF story"
        title="Our heritage, one milestone at a time."
        lede="From one belief about laboratory-verified water to a certified plant in Bashundhara, city delivery routes — and where SAF goes next."
        image={images.heritage}
        imagePosition="65% center"
      />

      <section className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-purple">Timeline</p>
            <h2 className="text-headline mt-4 text-ink">Our story so far</h2>
            <p className="text-lede mt-5 max-w-sm text-ink/70">
              What is done, and what we are building toward.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink/75" aria-label="Legend">
              <li className="flex items-center gap-2.5">
                <span aria-hidden className="size-3 rounded-full bg-purple" />
                Done
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden className="size-3 rounded-full border-2 border-dashed border-purple" />
                Coming next
              </li>
            </ul>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {milestones.map((milestone, index) => {
            const next = milestone.status === "next";
            const last = index === milestones.length - 1;
            const nextIsPlanned = milestones[index + 1]?.status === "next";
            return (
              <li key={milestone.title} className="relative pb-14 pl-12 last:pb-0 sm:pl-16">
                {!last ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-8 -bottom-1 left-[11px] border-l-2",
                      nextIsPlanned ? "border-dashed border-purple/40" : "border-purple",
                    )}
                  />
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1 left-0 flex size-6 items-center justify-center rounded-full ring-[6px] ring-white",
                    next ? "border-2 border-dashed border-purple bg-white" : "bg-purple",
                  )}
                >
                  {next ? null : <span className="size-2 rounded-full bg-white" />}
                </span>

                <div
                  className={cn(
                    "reveal",
                    next && "rounded-[1.75rem] border-2 border-dashed border-purple/30 bg-haze p-6 sm:p-8",
                  )}
                >
                  <p className="flex flex-wrap items-center gap-3">
                    {milestone.iso ? (
                      <time dateTime={milestone.iso} className="eyebrow text-purple">
                        {milestone.when}
                      </time>
                    ) : (
                      <span className="eyebrow text-purple">{milestone.when}</span>
                    )}
                    {next ? (
                      <span className="rounded-full bg-purple px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white">
                        Planned
                      </span>
                    ) : null}
                  </p>
                  <h3 className="text-title mt-3 text-ink">{milestone.title}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink/70">
                    {milestone.body}
                  </p>
                  {milestone.image ? (
                    <Image
                      src={images[milestone.image].src}
                      alt={images[milestone.image].alt}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                      className="mt-6 aspect-[16/9] h-auto w-full max-w-2xl rounded-[1.5rem] object-cover"
                    />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-lavender py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-purple">On every label</p>
              <h2 className="text-headline mt-4 max-w-[14ch] text-ink">
                Dhaka’s landmarks, drawn for SAF.
              </h2>
            </div>
            <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
              A custom set of illustrations, designed for our bottle packaging,
              anchors the SAF brand in the city where it is made.
            </p>
          </div>
          <Image
            src={images.monuments.src}
            alt={images.monuments.alt}
            placeholder="blur"
            sizes="(min-width: 1344px) 1264px, 100vw"
            className="reveal mt-12 aspect-[21/9] h-auto w-full rounded-[2rem] object-cover"
          />
          <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {monuments.map((monument, index) => (
              <li
                key={monument.name}
                className="reveal flex min-h-48 flex-col justify-between rounded-[1.5rem] bg-white p-6"
              >
                <span className="text-sm font-semibold text-purple tabular-nums">
                  0{index + 1}
                </span>
                <div className="mt-8">
                  <h3 className="text-xl leading-tight text-ink">{monument.name}</h3>
                  <p className="mt-2 text-sm text-ink/70">{monument.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
