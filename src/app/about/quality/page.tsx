import {
  Atom,
  BadgeCheck,
  Factory,
  Filter,
  FlaskConical,
  Layers,
  Microscope,
  ShieldCheck,
  Sparkles,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AboutExplore } from "@/components/about-explore";
import { AboutNav } from "@/components/about-nav";
import { PageIntro } from "@/components/page-intro";
import { images } from "@/lib/images";
import { minerals } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quality & Safety",
  description:
    "How SAF purifies water in eight stages, keeps essential minerals, and bottles in a Class 100,000 cleanroom under BSTI, ISO 22000, HACCP, and Halal.",
};

const process: { name: string; body: string; icon: LucideIcon }[] = [
  { name: "Sand", body: "Sand filtration traps sediment and suspended particles.", icon: Layers },
  { name: "Carbon", body: "Activated carbon takes out chlorine, odour, and organic compounds.", icon: Atom },
  { name: "Sediment", body: "Fine micron filters remove the smallest particles left.", icon: Filter },
  { name: "Reverse osmosis", body: "A semi-permeable membrane removes dissolved impurities.", icon: Microscope },
  { name: "Mineral re-infusion", body: "Calcium, magnesium, and potassium go back in at measured targets.", icon: FlaskConical },
  { name: "UV", body: "Ultraviolet light disinfects the water without added chemicals.", icon: Sun },
  { name: "Ozone", body: "Ozone gives a final disinfection just before bottling.", icon: Wind },
  { name: "Cleanroom bottling", body: "Bottles are blown, filled, and capped in a Class 100,000 cleanroom.", icon: Sparkles },
];

const standards = [
  {
    name: "BSTI BDS 1240:2001",
    body: "The Bangladesh standard for packaged drinking water, from the Bangladesh Standards and Testing Institution.",
  },
  {
    name: "ISO 22000",
    body: "An international food-safety management system that covers the whole chain, source to shelf.",
  },
  {
    name: "HACCP",
    body: "Hazard Analysis and Critical Control Points: each risk identified and controlled at the step where it can occur.",
  },
  {
    name: "Halal",
    body: "Production and materials certified Halal.",
  },
];

export default function QualityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Quality & safety"
        title="Quality you can measure, batch after batch."
        lede="Eight purification stages, measured mineral targets, a Class 100,000 cleanroom, and four certifications — checked through bottling."
        image={images.lab}
        imagePosition="35% center"
      />
      <AboutNav />

      <section aria-labelledby="process-title" className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-purple">Process</p>
            <h2 id="process-title" className="text-headline mt-4 max-w-[13ch] text-ink">
              Eight stages, aquifer to cap.
            </h2>
          </div>
          <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
            Filtered, purified by reverse osmosis, re-mineralised, and
            disinfected before it ever meets a bottle.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(({ name, body, icon: Icon }, index) => (
            <li
              key={name}
              className="reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-haze p-6 ring-1 ring-ink/[0.05] transition-colors duration-300 hover:bg-lavender"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-purple shadow-[0_8px_20px_-10px_rgb(23_10_53/0.35)] transition-colors duration-300 group-hover:bg-purple group-hover:text-white">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="text-xs font-bold tracking-[0.14em] text-purple uppercase tabular-nums">
                  Stage {index + 1}
                </span>
              </div>
              <h3 className="mt-8 text-xl text-ink">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-haze py-20 md:py-28">
        <div className="shell grid gap-5 lg:grid-cols-12">
          <article className="reveal on-dark relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-night p-8 text-white sm:p-10 lg:col-span-7">
            <Image
              src={images.cleanroom.src}
              alt={images.cleanroom.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/10" />
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-purple">
              <Factory aria-hidden className="size-6" />
            </span>
            <h2 className="eyebrow mt-8 text-[#c9b5ff]">Manufacturing</h2>
            <p className="mt-3 text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
              Class 100,000 cleanroom
            </p>
            <p className="mt-4 max-w-lg text-white/80">
              Bottle blowing through cap sealing runs with no human contact until
              the case is sealed.
            </p>
          </article>

          <div className="reveal rounded-[2rem] bg-white p-8 ring-1 ring-ink/[0.06] sm:p-10 lg:col-span-5">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-lavender text-purple">
              <FlaskConical aria-hidden className="size-6" />
            </span>
            <h2 className="eyebrow mt-8 text-purple">Mineral targets</h2>
            <p className="mt-3 text-3xl font-bold tracking-[-0.03em] text-ink">Typical analysis</p>
            <dl className="mt-6 grid gap-2">
              {minerals.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-haze px-4 py-3"
                >
                  <dt className="flex items-center gap-2.5 text-sm font-medium text-ink/75">
                    <span aria-hidden className="size-2 rounded-full bg-purple" />
                    {item.label}
                  </dt>
                  <dd className="text-sm font-bold text-ink tabular-nums">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="standards-title" className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-purple">Assurance</p>
          <h2 id="standards-title" className="text-headline mt-4 max-w-[12ch] text-ink">
            Four certifications.
          </h2>
          <p className="text-lede mt-5 max-w-md text-ink/70">
            Independent standards cover the water, the plant, and the way
            food-safety risks are managed.
          </p>
          <Image
            src={images.lab.src}
            alt={images.lab.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="reveal mt-10 aspect-[4/3] h-auto w-full rounded-[1.75rem] object-cover"
          />
        </div>
        <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {standards.map(({ name, body }) => (
            <li
              key={name}
              className="reveal flex flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/10"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-[#4b2cd7] text-white">
                {name === "Halal" ? (
                  <BadgeCheck aria-hidden className="size-5" />
                ) : (
                  <ShieldCheck aria-hidden className="size-5" />
                )}
              </span>
              <h3 className="mt-6 text-xl text-ink">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <AboutExplore current="/about/quality" />
    </>
  );
}
