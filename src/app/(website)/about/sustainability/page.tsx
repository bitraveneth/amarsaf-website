import { ArrowRight, RotateCcw } from "lucide-react";
import type { Metadata } from "next";
import { AboutExplore } from "@/components/about-explore";
import { AboutNav } from "@/components/about-nav";
import { PageIntro } from "@/components/page-intro";
import { images } from "@/lib/images";
import { careTips, commitments, jarLoop } from "@/lib/sustainability";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Recyclable BPA-free rPET bottles, returnable 18 L jars, and process water recovered inside the SAF plant in Bashundhara.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Sustainability"
        title="Packed to come back."
        lede="Recyclable bottles, returnable jars, and water recovered inside the plant — how SAF keeps its footprint small."
        image={images.sustainability}
        imagePosition="70% center"
      />
      <AboutNav />

      <section aria-labelledby="commit-title" className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[#137a4b]">Our commitments</p>
            <h2 id="commit-title" className="text-headline mt-4 max-w-[14ch] text-ink">
              Three ways we tread lightly.
            </h2>
          </div>
          <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
            Built into the packs we choose and the way the plant runs, not added
            on afterwards.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {commitments.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="reveal group relative isolate overflow-hidden rounded-[2rem] bg-[#e7f6ee] p-7 sm:p-9"
            >
              <Icon
                aria-hidden
                strokeWidth={1}
                className="absolute -right-8 -bottom-8 -z-10 size-48 text-[#22b573]/[0.12] transition-transform duration-[1200ms] ease-out group-hover:rotate-12 motion-reduce:transition-none"
              />
              <span className="flex size-14 items-center justify-center rounded-2xl bg-[#137a4b] text-white shadow-[0_16px_32px_-14px_rgb(19_122_75/0.8)]">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="mt-10 text-2xl text-ink">{title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink/70">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="loop-title" className="on-dark relative isolate overflow-hidden bg-night py-20 text-white md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,rgb(34_181_115/0.25),transparent_45%),radial-gradient(circle_at_10%_90%,rgb(109_43_213/0.45),transparent_50%)]"
        />
        <div className="shell">
          <p className="eyebrow text-[#7fe0b3]">The jar loop</p>
          <h2 id="loop-title" className="text-headline mt-4 max-w-[15ch]">
            One jar, round and round.
          </h2>
          <p className="text-lede mt-5 max-w-xl text-white/75">
            Every SAF Commercial jar is built to make the trip many times.
          </p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jarLoop.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className="reveal relative rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-white/12 backdrop-blur-sm sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-[#137a4b]">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.14em] text-white/55 uppercase tabular-nums">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
                {index < jarLoop.length - 1 ? (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-1/2 -right-3.5 hidden size-7 -translate-y-1/2 rounded-full bg-[#22b573] p-1.5 text-white lg:block"
                  />
                ) : (
                  <RotateCcw
                    aria-hidden
                    className="absolute top-1/2 -right-3.5 hidden size-7 -translate-y-1/2 rounded-full bg-[#22b573] p-1.5 text-white lg:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="help-title" className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#137a4b]">Your part</p>
            <h2 id="help-title" className="text-headline mt-4 text-ink">
              Small habits, big loop.
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {careTips.map(({ icon: Icon, title, body }) => (
              <li key={title} className="reveal rounded-[1.75rem] bg-haze p-6 ring-1 ring-ink/[0.05] sm:p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#137a4b] shadow-[0_8px_20px_-10px_rgb(23_10_53/0.3)]">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-6 text-lg text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AboutExplore current="/about/sustainability" />
    </>
  );
}
