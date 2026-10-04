import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  Droplets,
  Factory,
  FlaskConical,
  House,
  Layers,
  Leaf,
  Recycle,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { heroSlides } from "@/lib/hero-slides";
import { images, productLifestyle } from "@/lib/images";
import { certifications, milestones, minerals, products, stages } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "SAF Packaged Drinking Water | Simply Pure Hydration Bangladesh",
  },
  description:
    "Order SAF packaged drinking water online. 8-stage purified water with essential minerals for home and office delivery across Dhaka.",
};

const ways = [
  {
    icon: House,
    title: "For homes",
    body: "18 L jars for the dispenser and 2 L bottles for the table, on a regular delivery day.",
    points: ["Jar swap on every delivery", "Tamper-proof seal on every jar", "Add cases of any size"],
    cta: "Set up home delivery",
    href: "/contact?type=product#enquiry",
    image: productLifestyle["saf-family"],
  },
  {
    icon: Building2,
    title: "For offices",
    body: "Jars for the pantry and bottles for meeting rooms, delivered on your office schedule.",
    points: ["Routes in Motijheel and Gulshan", "Ask about a dispenser", "One contact for every order"],
    cta: "Set up office supply",
    href: "/contact?type=business#enquiry",
    image: productLifestyle["saf-commercial"],
  },
  {
    icon: Store,
    title: "For shops and distributors",
    body: "Case packs for shelves, dealers, and distributors across Dhaka.",
    points: ["All four sizes by the case", "Dealership and distribution", "Logos for your shop in the media kit"],
    cta: "Become a stockist",
    href: "/contact?type=business#enquiry",
    image: images.lineup,
  },
];

const deliverySteps = [
  { title: "Tell us what you need", body: "Call the hotline or send an enquiry with your area and volume." },
  { title: "We confirm your route", body: "We agree a delivery day that suits your home or office." },
  { title: "Sealed delivery", body: "Jars and cases arrive sealed, straight from the plant." },
  { title: "Empties collected", body: "Empty jars go back on the next run to be washed and refilled." },
];

const heroStats = [
  {
    icon: Layers,
    label: "Purification",
    value: "8",
    unit: "stages",
    note: "Sand filtration through ozone",
  },
  {
    icon: ShieldCheck,
    label: "Certified",
    value: String(certifications.length),
    unit: "standards",
    note: "BSTI · ISO 22000 · HACCP · Halal",
  },
  {
    icon: Droplets,
    label: "Mineral balance",
    value: "7.0–7.8",
    unit: "pH",
    note: "Calcium, magnesium, potassium kept",
  },
  {
    icon: Factory,
    label: "Cleanroom",
    value: "100,000",
    unit: "class",
    note: "No human contact until sealed",
  },
];

const primaryCta =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors";

function CardHead({
  icon: Icon,
  index,
  className,
}: {
  icon: LucideIcon;
  index: string;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none",
          className,
        )}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <span aria-hidden className="text-sm font-semibold tabular-nums opacity-60">
        {index}
      </span>
    </div>
  );
}

const cardTitle = "mt-10 text-[1.625rem] leading-tight sm:text-[1.875rem]";

export default function Home() {
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section aria-labelledby="proof-title" className="bg-white">
        <div className="shell py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <p className="eyebrow flex items-center gap-2 text-purple">
                <span aria-hidden className="size-1.5 rounded-full bg-purple" />
                Purity, measured
              </p>
              <h2
                id="proof-title"
                className="mt-4 text-[2rem] leading-[1.05] font-extrabold tracking-[-0.04em] text-ink md:text-[2.75rem]"
              >
                Every bottle, by the numbers.
              </h2>
            </div>
            <Link
              href="/about"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-semibold text-ink transition-colors hover:border-purple hover:text-purple"
            >
              How we purify
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-5">
            {heroStats.map(({ icon: Icon, value, unit, label, note }) => (
              <li key={label} className="reveal">
                <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-haze p-6 ring-1 ring-ink/[0.06] transition-[translate,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_40px_80px_-40px_rgb(23_10_53/0.45)] motion-reduce:transition-none sm:p-7">
                  <span
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-1 origin-left scale-x-0 rounded-b-full bg-gradient-to-r from-purple to-[#4b2cd7] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <Icon
                    aria-hidden
                    strokeWidth={1.25}
                    className="absolute -right-8 -bottom-8 -z-10 size-44 text-purple/[0.06] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none"
                  />
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-[#4b2cd7] text-white shadow-[0_16px_32px_-14px_rgb(109_43_213/0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none">
                    <Icon aria-hidden className="size-7" />
                  </span>
                  <h3 className="mt-8 text-[0.75rem] leading-snug font-bold tracking-[0.16em] text-ink/55 uppercase">
                    {label}
                  </h3>
                  <p className="mt-3 mb-7 flex flex-wrap items-baseline gap-x-2 gap-y-1 leading-none text-ink">
                    <span className="text-[3rem] font-extrabold tracking-[-0.05em] whitespace-nowrap lg:text-[2.25rem] xl:text-[3rem]">
                      {value}
                    </span>
                    <span className="text-base font-semibold text-purple">{unit}</span>
                  </p>
                  <p className="mt-auto border-t border-ink/10 pt-5 text-sm leading-relaxed text-ink/65">
                    {note}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-title" className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-purple">Why SAF</p>
            <h2 id="why-title" className="text-headline mt-4 max-w-[13ch] text-ink">
              Four promises in every bottle.
            </h2>
          </div>
          <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
            From the aquifer to the cap — purified, mineral-balanced, certified,
            and packed to come back.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <li className="reveal lg:col-span-7">
            <article className="group on-dark relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-night p-7 text-white sm:p-9">
              <Image
                src={images.bottlingLine.src}
                alt=""
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25 transition-transform duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(109_43_213/0.6),transparent_55%)] bg-gradient-to-t from-night via-night/85 to-night/55"
              />
              <CardHead icon={FlaskConical} index="01" className="bg-white text-purple" />
              <h3 className={cardTitle}>Pure by science</h3>
              <p className="mt-3 max-w-md text-white/75">
                Deep-aquifer water runs through eight purification stages, then is
                bottled with the minerals kept.
              </p>
              <ol aria-label="Purification stages" className="mt-8 flex flex-wrap gap-2">
                {stages.map((stage, index) => (
                  <li
                    key={stage}
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/15 backdrop-blur-sm"
                  >
                    <span
                      aria-hidden
                      className="flex size-5 items-center justify-center rounded-full bg-white text-[0.625rem] font-bold text-purple"
                    >
                      {index + 1}
                    </span>
                    {stage}
                  </li>
                ))}
              </ol>
            </article>
          </li>

          <li className="reveal lg:col-span-5">
            <article className="group flex h-full flex-col rounded-[2rem] bg-lavender p-7 text-ink sm:p-9">
              <CardHead icon={Droplets} index="02" className="bg-purple text-white" />
              <h3 className={cardTitle}>Balanced hydration</h3>
              <p className="mt-3 text-ink/70">
                Calcium, magnesium, and potassium are put back at measured targets.
              </p>
              <dl className="mt-8 grid gap-2">
                {minerals.slice(0, 3).map((mineral) => (
                  <div
                    key={mineral.label}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3"
                  >
                    <dt className="flex items-center gap-2.5 text-sm font-medium text-ink/75">
                      <span aria-hidden className="size-2 rounded-full bg-purple" />
                      {mineral.label}
                    </dt>
                    <dd className="text-sm font-bold text-ink tabular-nums">{mineral.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </li>

          <li className="reveal lg:col-span-5">
            <article className="group flex h-full flex-col rounded-[2rem] bg-white p-7 text-ink ring-1 ring-ink/10 sm:p-9">
              <CardHead icon={ShieldCheck} index="03" className="bg-lavender text-purple" />
              <h3 className={cardTitle}>Certified safety</h3>
              <p className="mt-3 text-ink/70">
                Four standards cover the water, and it is tested right through
                bottling.
              </p>
              <ul aria-label="Certifications" className="mt-8 grid gap-2 min-[380px]:grid-cols-2">
                {certifications.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-2xl bg-haze px-3.5 py-3 text-sm leading-snug font-semibold text-ink"
                  >
                    <BadgeCheck aria-hidden className="size-4 shrink-0 text-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>

          <li className="reveal lg:col-span-7">
            <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#e7f6ee] p-7 text-ink sm:p-9">
              <Recycle
                aria-hidden
                className="absolute -right-10 -bottom-12 -z-10 size-64 text-[#22b573]/10 transition-transform duration-[1200ms] ease-out group-hover:rotate-45 motion-reduce:transition-none"
              />
              <CardHead icon={Recycle} index="04" className="bg-[#137a4b] text-white" />
              <h3 className={cardTitle}>Sustainable packs</h3>
              <p className="mt-3 max-w-md text-ink/70">
                Recyclable bottles, and 18 L jars that come back to be washed and
                refilled. Process water is recovered inside the plant.
              </p>
              <ul aria-label="Packaging" className="mt-8 flex flex-wrap gap-2">
                {["BPA-free rPET bottles", "Returnable 18 L jars", "Water recovered in the plant"].map(
                  (item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink/80 ring-1 ring-[#137a4b]/15"
                    >
                      <Leaf aria-hidden className="size-3.5 text-[#137a4b]" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </article>
          </li>
        </ul>
      </section>

      <section aria-labelledby="range-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-purple">The SAF range</p>
              <h2 id="range-title" className="text-headline mt-4 max-w-[13ch] text-ink">
                From the desk to the dispenser.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <p className="text-lede max-w-md text-ink/70">
                One purified, mineral-balanced water in four sizes — from a
                500 ml grip bottle to an 18 L returnable jar, sold by the case.
              </p>
              <Link
                href="/products"
                className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-purple"
              >
                Compare all sizes
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id} className="reveal">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="label-title" className="on-dark relative isolate overflow-hidden bg-night py-20 text-white md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_0%_0%,rgb(109_43_213/0.55),transparent_60%),radial-gradient(40rem_26rem_at_100%_100%,rgb(75_44_215/0.4),transparent_60%)]"
        />
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[#c9b5ff]">Know what you drink</p>
            <h2 id="label-title" className="text-headline mt-4 max-w-[12ch]">
              Nothing hidden on our label.
            </h2>
            <p className="text-lede mt-5 max-w-md text-white/75">
              Every batch is held to the same targets: essential minerals put
              back, low sodium, and a gently balanced pH.
            </p>
            <ul className="mt-8 grid gap-3">
              {[
                "Calcium, magnesium, and potassium at measured targets",
                "Low sodium — under 10 mg/L",
                "Tested through bottling, batch after batch",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/85">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <Check aria-hidden className="size-4 text-[#c9b5ff]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about/quality"
              className={cn(primaryCta, "mt-9 bg-white text-purple hover:bg-lavender")}
            >
              See the full analysis
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="relative min-h-72 overflow-hidden rounded-[2rem] sm:min-h-0">
              <Image
                src={images.pour.src}
                alt={images.pour.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
              />
            </div>
            <div className="reveal rounded-[2rem] bg-white p-6 text-ink sm:p-7">
              <p className="flex items-baseline justify-between gap-3 border-b-4 border-ink pb-3">
                <span className="text-xl font-extrabold tracking-[-0.02em]">Mineral facts</span>
                <span className="text-xs font-semibold text-ink/55">Typical, per litre</span>
              </p>
              <dl>
                {minerals.slice(0, 4).map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3">
                    <dt className="text-sm font-medium text-ink/75">{item.label}</dt>
                    <dd className="text-sm font-bold tabular-nums">{item.value}</dd>
                  </div>
                ))}
              </dl>
              {[
                { label: "pH", value: "7.0–7.8", min: 0, max: 14, from: 7, to: 7.8, ticks: ["0", "7", "14"] },
                { label: "TDS", value: "70–120 ppm", min: 0, max: 500, from: 70, to: 120, ticks: ["0", "250", "500"] },
              ].map((gauge) => (
                <div key={gauge.label} className="mt-5">
                  <p className="flex items-baseline justify-between text-sm">
                    <span className="font-semibold">{gauge.label}</span>
                    <span className="font-bold tabular-nums text-purple">{gauge.value}</span>
                  </p>
                  <div aria-hidden className="relative mt-2 h-2.5 rounded-full bg-lavender">
                    <span
                      className="absolute inset-y-0 rounded-full bg-purple"
                      style={{
                        left: `${((gauge.from - gauge.min) / (gauge.max - gauge.min)) * 100}%`,
                        width: `max(0.5rem, ${((gauge.to - gauge.from) / (gauge.max - gauge.min)) * 100}%)`,
                      }}
                    />
                  </div>
                  <p aria-hidden className="mt-1.5 flex justify-between text-[0.6875rem] text-ink/45 tabular-nums">
                    {gauge.ticks.map((tick) => (
                      <span key={tick}>{tick}</span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ways-title" className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-purple">Get SAF your way</p>
            <h2 id="ways-title" className="text-headline mt-4 max-w-[14ch] text-ink">
              One water. Three easy ways to get it.
            </h2>
          </div>
          <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
            A household, a busy office, or a shop shelf — there is a simple way
            to keep SAF coming.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {ways.map(({ icon: Icon, title, body, points, cta, href, image }) => (
            <li key={title} className="reveal">
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/[0.07] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_40px_80px_-45px_rgb(23_10_53/0.5)] motion-reduce:transition-none">
                <div className="relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <span className="absolute top-4 left-4 flex size-12 items-center justify-center rounded-2xl bg-white text-purple shadow-sm">
                    <Icon aria-hidden className="size-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl text-ink">{title}</h3>
                  <p className="mt-2 text-ink/70">{body}</p>
                  <ul className="mt-5 grid gap-2">
                    {points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-ink/75">
                        <Check aria-hidden className="size-4 shrink-0 text-[#137a4b]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-semibold text-purple"
                  >
                    {cta}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-[2rem] bg-haze p-6 ring-1 ring-ink/[0.05] sm:p-8 lg:p-10">
          <h3 className="text-xl text-ink">How delivery works</h3>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {deliverySteps.map((step, index) => (
              <li key={step.title} className="relative flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple text-base font-extrabold text-white tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-ink">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-dark relative isolate overflow-hidden bg-night text-white">
        <Image
          src={images.heritage.src}
          alt={images.heritage.alt}
          placeholder="blur"
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/0"
        />
        <div className="shell flex min-h-[36rem] flex-col justify-end py-14 md:min-h-[42rem] md:py-20">
          <p className="eyebrow text-[#d6c8ff]">The SAF story</p>
          <h2 className="text-headline mt-4 max-w-[15ch]">
            From one idea to a certified Dhaka plant.
          </h2>
          <ol className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-4xl" aria-label="Recent milestones">
            {milestones
              .filter((milestone) => milestone.status === "done" && milestone.iso)
              .map((milestone) => (
                <li
                  key={milestone.title}
                  className="rounded-2xl border border-white/15 bg-night/45 p-5 backdrop-blur-md"
                >
                  <time dateTime={milestone.iso} className="text-xs font-semibold text-[#d6c8ff]">
                    {milestone.when}
                  </time>
                  <p className="mt-2 font-semibold">{milestone.title}</p>
                </li>
              ))}
          </ol>
          <Link
            href="/heritage"
            className={cn(primaryCta, "mt-10 w-fit bg-white text-purple hover:bg-lavender")}
          >
            Read our story
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-purple text-white sm:rounded-[2.5rem]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_0%,rgb(255_255_255/0.16),transparent_42%),radial-gradient(circle_at_0%_100%,#2a0e5c,transparent_60%)]"
          />
          <div className="grid lg:grid-cols-12">
            <div className="p-7 sm:p-12 lg:col-span-7 lg:p-16">
              <p className="eyebrow text-white/80">Case packs</p>
              <h2 className="text-headline mt-4 max-w-[12ch]">Buy SAF by the case.</h2>
              <p className="text-lede mt-5 max-w-lg text-white/85">
                Retailers, offices, and households take SAF in case packs — the
                same purified water in every size.
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Case packs">
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.id}`}
                      className="group block h-full rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition-colors hover:bg-white hover:text-purple"
                    >
                      <span className="block text-2xl font-extrabold tracking-[-0.03em]">
                        {product.size}
                      </span>
                      <span className="mt-1 block text-sm text-white/80 group-hover:text-ink/70">
                        {product.pack}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className={cn(primaryCta, "bg-white text-purple hover:bg-lavender")}
                >
                  Request case pricing
                  <ArrowUpRight aria-hidden className="size-4" />
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    primaryCta,
                    "border border-white/40 text-white hover:border-white hover:bg-white/10",
                  )}
                >
                  See all products
                </Link>
              </div>
              <p className="mt-8 flex items-center gap-2.5 text-sm text-white/85">
                <span aria-hidden className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-fresh/70 motion-reduce:animate-none" />
                  <span className="relative size-2.5 rounded-full bg-fresh" />
                </span>
                Online ordering for case packs is on the way.
              </p>
            </div>
            <div className="relative min-h-72 sm:min-h-96 lg:col-span-5 lg:min-h-full">
              <Image
                src={images.lineup.src}
                alt={images.lineup.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-purple via-purple/10 to-transparent lg:bg-gradient-to-r lg:via-transparent"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
