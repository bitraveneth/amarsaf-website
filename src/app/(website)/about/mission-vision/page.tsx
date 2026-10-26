import {
  BadgeCheck,
  Droplets,
  Eye,
  Globe2,
  HeartHandshake,
  Leaf,
  Recycle,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Target,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import { AboutExplore } from "@/components/about-explore";
import { AboutNav } from "@/components/about-nav";
import { PageIntro } from "@/components/page-intro";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description:
    "SAF's mission, vision, goals, and core values: pure, nutritious, and reliable food and beverages that consumers trust.",
};

const goals = [
  {
    icon: BadgeCheck,
    status: "Ongoing",
    title: "Certified at every step",
    body: "Keep BSTI, ISO 22000, HACCP, and Halal current, and test the water through bottling, batch after batch.",
  },
  {
    icon: ShoppingBag,
    status: "Coming next",
    title: "Order by the case, online",
    body: "Let households and retail buyers order SAF case packs straight from the website.",
  },
  {
    icon: Globe2,
    status: "Coming next",
    title: "Further than Dhaka",
    body: "Reach beyond the city through distribution partners and corporate drops.",
  },
  {
    icon: Recycle,
    status: "Ongoing",
    title: "Every jar comes back",
    body: "Grow the returnable 18 L jar loop so more of our water travels in reusable packs.",
  },
];

const values = [
  {
    icon: Droplets,
    title: "Purity first",
    body: "Nothing leaves the plant that we would not pour at our own table.",
  },
  {
    icon: ShieldCheck,
    title: "Safety by system",
    body: "Food-safety management on the line — ISO 22000 and HACCP, not good intentions.",
  },
  {
    icon: Scale,
    title: "Integrity",
    body: "We publish what is in the water and say plainly what we do not do yet.",
  },
  {
    icon: Truck,
    title: "Reliability",
    body: "Homes and offices plan around our deliveries, so we plan around them.",
  },
  {
    icon: HeartHandshake,
    title: "Care",
    body: "For the families and teams who drink SAF every day, and the people who make it.",
  },
  {
    icon: Leaf,
    title: "Responsibility",
    body: "Recyclable bottles, returnable jars, and water recovered inside the plant.",
  },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageIntro
        eyebrow="Mission & vision"
        title="Safe water, within reach of every home."
        lede="The purpose behind SAF, where we are heading, and the values that shape every bottle we make."
        image={images.mission}
        imagePosition="70% center"
      />
      <AboutNav />

      <section aria-label="Mission and vision" className="shell py-20 md:py-28">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="reveal on-dark relative isolate overflow-hidden rounded-[2rem] bg-purple p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(255_255_255/0.18),transparent_45%),radial-gradient(circle_at_0%_100%,#2a0e5c,transparent_60%)]"
            />
            <Target
              aria-hidden
              strokeWidth={1}
              className="absolute -right-10 -bottom-10 -z-10 size-64 text-white/10"
            />
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-purple">
              <Target aria-hidden className="size-6" />
            </span>
            <h2 className="eyebrow mt-10 text-white/75">Our mission</h2>
            <p className="mt-4 text-[clamp(1.5rem,1.1rem+1.6vw,2.375rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance">
              To deliver pure, nutritious, and reliable food and beverages that
              consumers trust, driven by strict quality standards and continuous
              improvement.
            </p>
          </article>
          <article className="reveal on-dark relative isolate overflow-hidden rounded-[2rem] bg-night p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(109_43_213/0.55),transparent_55%)]"
            />
            <Eye
              aria-hidden
              strokeWidth={1}
              className="absolute -right-10 -bottom-10 -z-10 size-64 text-white/[0.07]"
            />
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
              <Eye aria-hidden className="size-6" />
            </span>
            <h2 className="eyebrow mt-10 text-[#c9b5ff]">Our vision</h2>
            <p className="mt-4 text-[clamp(1.5rem,1.1rem+1.6vw,2.375rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance">
              A country where safe and affordable nutrition is universally
              accessible to every person, anywhere, every single day.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="goals-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-purple">Our goals</p>
              <h2 id="goals-title" className="text-headline mt-4 max-w-[14ch] text-ink">
                What we are working toward.
              </h2>
            </div>
            <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
              Four goals that turn the mission into work on the line, on the
              route, and online.
            </p>
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map(({ icon: Icon, status, title, body }, index) => (
              <li
                key={title}
                className="reveal group flex flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgb(23_10_53/0.45)] motion-reduce:transition-none sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-[#4b2cd7] text-white shadow-[0_16px_32px_-14px_rgb(109_43_213/0.8)] transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <span aria-hidden className="text-3xl font-extrabold tracking-[-0.05em] text-ink/10 tabular-nums">
                    0{index + 1}
                  </span>
                </div>
                <span
                  className={cn(
                    "mt-8 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide uppercase",
                    status === "Ongoing" ? "bg-[#e7f6ee] text-[#137a4b]" : "bg-lavender text-purple",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("size-1.5 rounded-full", status === "Ongoing" ? "bg-[#22b573]" : "bg-purple")}
                  />
                  {status}
                </span>
                <h3 className="mt-4 text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="values-title" className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-40">
              <p className="eyebrow text-purple">Core values</p>
              <h2 id="values-title" className="text-headline mt-4 text-ink">
                How we work.
              </h2>
              <p className="text-lede mt-5 text-ink/70">
                Six values we hold ourselves to in the plant, on the route, and
                with every customer.
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {values.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="reveal group relative overflow-hidden rounded-[1.75rem] bg-haze p-6 ring-1 ring-ink/[0.05] transition-colors duration-300 hover:bg-lavender sm:p-7"
              >
                <Icon
                  aria-hidden
                  strokeWidth={1.25}
                  className="absolute -right-6 -bottom-6 size-32 text-purple/[0.06] transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                />
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-purple shadow-[0_8px_20px_-10px_rgb(23_10_53/0.35)]">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-6 text-xl text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AboutExplore current="/about/mission-vision" />
    </>
  );
}
