import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Droplets,
  Factory,
  FlaskConical,
  House,
  Layers,
  Leaf,
  Phone,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { heroSlides } from "@/lib/hero-slides";
import { images, productLifestyle } from "@/lib/images";
import {
  certifications,
  company,
  faqs,
  minerals,
  products,
  stages,
  stories,
} from "@/lib/site";
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

const stageBarTone = [
  "bg-white/30",
  "bg-white/30",
  "bg-white/30",
  "bg-white/55",
  "bg-[#c9b5ff]",
  "bg-white",
  "bg-white",
  "bg-white",
] as const;

const certificationScope: Record<(typeof certifications)[number], string> = {
  "BSTI BDS 1240:2001": "Bangladesh standard",
  "ISO 22000": "Food-safety management",
  HACCP: "Risk control at each step",
  Halal: "Production and materials",
};

const latestStories = [...stories].sort((a, b) => b.iso.localeCompare(a.iso)).slice(0, 3);

const homeFaqQuestions: (typeof faqs)[number]["q"][] = [
  "How do I start a home or office supply?",
  "Where do you deliver?",
  "How do the returnable 18 L jars work?",
  "Which certifications cover the water?",
  "What does 8-stage purification mean?",
];
const homeFaqs = homeFaqQuestions.flatMap((q) => faqs.filter((item) => item.q === q));

const primaryCta =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors";

const outlinePill =
  "group inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-semibold text-ink transition-colors hover:border-purple hover:text-purple";

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

function CardFigure({
  value,
  unit,
  className,
}: {
  value: number;
  unit: string;
  className?: string;
}) {
  return (
    <p className="flex shrink-0 items-baseline gap-2 leading-none">
      <span className="text-[3.75rem] font-extrabold tracking-[-0.06em] tabular-nums sm:text-[4.5rem]">
        {value}
      </span>
      <span className={cn("text-sm font-semibold", className)}>{unit}</span>
    </p>
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
            <Link href="/about" className={outlinePill}>
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
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25 transition-transform duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(109_43_213/0.6),transparent_55%)] bg-gradient-to-t from-night via-night/85 to-night/55"
              />
              <CardHead icon={FlaskConical} index="01" className="bg-white text-purple" />
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
                <div className="min-w-0 flex-1 basis-64">
                  <h3 className={cardTitle}>Pure by science</h3>
                  <p className="mt-3 max-w-md text-white/75">
                    Deep-aquifer water runs through eight purification stages, then is
                    bottled with the minerals kept.
                  </p>
                </div>
                <CardFigure value={stages.length} unit="stages" className="text-[#c9b5ff]" />
              </div>
              <div className="mt-auto pt-10">
                <div aria-hidden className="flex gap-1">
                  {stages.map((stage, index) => (
                    <span
                      key={stage}
                      style={{ transitionDelay: `${index * 70}ms` }}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-[background-color,box-shadow] duration-500 group-hover:bg-white group-hover:shadow-[0_0_12px_rgb(201_181_255/0.9)] motion-reduce:transition-none",
                        stageBarTone[index],
                      )}
                    />
                  ))}
                </div>
                <ol
                  aria-label="Purification stages"
                  className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4 xl:grid-cols-8"
                >
                  {stages.map((stage, index) => (
                    <li key={stage} className="min-w-0">
                      <p className="text-xs font-bold tracking-[0.14em] text-[#c9b5ff] uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 text-xs leading-snug font-semibold text-white/85">{stage}</p>
                    </li>
                  ))}
                </ol>
              </div>
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
            <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-7 text-ink ring-1 ring-ink/10 sm:p-9">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,var(--color-lavender),transparent_60%)]"
              />
              <ShieldCheck
                aria-hidden
                className="absolute -right-10 -bottom-12 -z-10 size-64 text-purple/[0.08] transition-transform duration-[1200ms] ease-out group-hover:rotate-12 motion-reduce:transition-none"
              />
              <CardHead icon={ShieldCheck} index="03" className="bg-lavender text-purple" />
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
                <div className="min-w-0 flex-1 basis-56">
                  <h3 className={cardTitle}>Certified safety</h3>
                  <p className="mt-3 text-ink/70">
                    Four standards cover the water, and it is tested right through
                    bottling.
                  </p>
                </div>
                <CardFigure value={certifications.length} unit="standards" className="text-purple" />
              </div>
              <ul aria-label="Certifications" className="mt-auto grid gap-2 pt-10 sm:grid-cols-2">
                {certifications.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-haze px-4 py-3.5 ring-1 ring-ink/[0.04] transition-colors duration-300 group-hover:bg-lavender/70 motion-reduce:transition-none sm:p-4"
                  >
                    <BadgeCheck aria-hidden className="mt-px size-5 shrink-0 text-purple" />
                    <span className="min-w-0">
                      <span className="block text-sm leading-snug font-bold">{item}</span>
                      <span className="mt-1 block text-xs leading-snug text-ink/60">
                        {certificationScope[item]}
                      </span>
                    </span>
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
              <ul aria-label="Packaging" className="mt-auto flex flex-wrap gap-2 pt-8">
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

      <section aria-labelledby="news-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className="eyebrow text-purple">News</p>
              <h2 id="news-title" className="text-headline mt-4 text-ink">
                Latest from SAF.
              </h2>
              <p className="text-lede mt-5 max-w-md text-ink/70">
                Notes from the plant and the route.
              </p>
            </div>
            <Link href="/news" className={outlinePill}>
              See all news
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul className="mt-12 grid gap-3 md:grid-cols-3 md:gap-5 lg:mt-16">
            {latestStories.map((story) => (
              <li key={story.iso} className="reveal">
                <article className="group relative grid h-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-4 rounded-[1.75rem] bg-white p-3 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_40px_80px_-45px_rgb(23_10_53/0.5)] motion-reduce:transition-none md:flex md:flex-col md:items-stretch md:gap-0">
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={images[story.image].src}
                      alt={images[story.image].alt}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 28vw, (min-width: 768px) 31vw, 7rem"
                      className="aspect-square h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none md:aspect-[4/3]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col py-1 pr-2 md:px-4 md:pt-6 md:pb-4">
                    <time dateTime={story.iso} className="text-xs font-semibold text-purple md:text-sm">
                      {story.date}
                    </time>
                    <h3 className="mt-1.5 text-base leading-snug text-ink md:mt-3 md:text-[1.375rem] md:leading-tight">
                      <Link
                        href="/news"
                        className="rounded-sm after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-offset-4"
                      >
                        {story.title}
                      </Link>
                    </h3>
                    <p className="mt-3 hidden text-sm leading-relaxed text-ink/65 md:block">
                      {story.body}
                    </p>
                    <span
                      aria-hidden
                      className="mt-auto hidden items-center gap-2 pt-6 text-sm font-semibold text-purple md:inline-flex"
                    >
                      Read the story
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="faq-title"
        className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10"
      >
        <div className="lg:col-span-5">
          <p className="eyebrow text-purple">FAQ</p>
          <h2 id="faq-title" className="text-headline mt-4 max-w-[11ch] text-ink">
            Questions, answered.
          </h2>
          <p className="text-lede mt-5 max-w-md text-ink/70">
            Straight answers before you order: starting a supply, where we
            deliver, how the jars come back, and what keeps the water safe.
          </p>
        </div>

        <Accordion
          defaultValue={[homeFaqs[0].q]}
          className="border-t-2 border-ink lg:col-span-7 lg:row-span-2"
        >
          {homeFaqs.map((item, index) => (
            <AccordionItem key={item.q} value={item.q} className="border-b border-ink/15">
              <AccordionTrigger className="items-center gap-4 rounded-none py-5 text-[1.0625rem] font-semibold text-ink hover:no-underline hover:text-purple md:gap-6 md:py-6 md:text-xl [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-purple">
                <span className="w-7 shrink-0 text-sm font-semibold text-purple tabular-nums">
                  0{index + 1}
                </span>
                <span className="flex-1 tracking-[-0.015em]">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-11 text-base leading-relaxed text-ink/75 md:pb-7 md:pl-[3.25rem] md:text-[1.0625rem]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="grid content-start gap-6 lg:col-span-5">
          <Link href="/faq" className={cn(outlinePill, "w-fit")}>
            All questions
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <div className="flex max-w-md items-start gap-4 rounded-[1.75rem] bg-haze p-5 ring-1 ring-ink/[0.05] sm:p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-purple shadow-sm">
              <Phone aria-hidden className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-ink">Still deciding?</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">
                Call the hotline on{" "}
                <span className="font-semibold whitespace-nowrap text-ink tabular-nums">
                  {company.hotline}
                </span>
                , or{" "}
                <Link
                  href="/contact"
                  className="rounded-sm font-semibold text-purple underline underline-offset-4 hover:text-purple-deep"
                >
                  send us a message
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
