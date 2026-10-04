import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Gauge,
  Layers,
  Package,
  Quote,
  Store,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutNav } from "@/components/about-nav";
import { PageIntro } from "@/components/page-intro";
import { aboutPages } from "@/lib/about";
import { images } from "@/lib/images";
import { leader } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SAF is a Bangladeshi food and beverage brand. We bottle laboratory-verified, mineral-balanced drinking water in Bashundhara, Dhaka.",
};

// Plant and product figures are confirmed; capacity and reach figures are placeholders until SAF supplies real numbers.
const glance = [
  { icon: Factory, value: "100,000", unit: "Class", label: "Cleanroom bottling" },
  { icon: Layers, value: "8", label: "Purification stages" },
  { icon: BadgeCheck, value: "4", label: "Safety certifications" },
  { icon: Package, value: "4", label: "Pack sizes, 500 ml to 18 L" },
  { icon: Gauge, value: "50,000 L+", label: "Production capacity per day" },
  { icon: Building2, value: "150+", label: "Offices on regular supply" },
  { icon: Store, value: "500+", label: "Retail outlets" },
  { icon: Truck, value: "30+", label: "Distribution partners" },
];

export default function AboutPage() {
  const sections = aboutPages.slice(1);

  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="Pure water, made in Dhaka with care."
        lede="SAF Food & Beverage Ltd. bottles laboratory-verified, mineral-balanced drinking water in Bashundhara, for homes and offices across Dhaka."
        image={images.bottlingLine}
        imagePosition="40% center"
      />
      <AboutNav />

      <section aria-labelledby="who-title" className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow text-purple">Who we are</p>
          <h2
            id="who-title"
            className="mt-6 text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink"
          >
            SAF is a Bangladeshi food and beverage brand.
          </h2>
        </div>
        <div className="text-lede space-y-5 text-ink/70 lg:col-span-6 lg:pt-12">
          <p>
            We are committed to safe, high-quality, and affordable products that
            our customers can rely on every day. Our journey began with drinking
            water, rooted in the belief that purity is the cornerstone of any food
            brand.
          </p>
          <p>
            From our plant in Bashundhara, we produce to rigorous quality and
            safety standards, with modern technology and thorough quality control
            at every step.
          </p>
        </div>
      </section>

      <section aria-labelledby="glance-title" className="on-dark relative isolate overflow-hidden bg-night py-20 text-white md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_100%_0%,rgb(109_43_213/0.55),transparent_60%),radial-gradient(40rem_26rem_at_0%_100%,rgb(75_44_215/0.4),transparent_60%)]"
        />
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-[#c9b5ff]">SAF at a glance</p>
              <h2 id="glance-title" className="text-headline mt-4 max-w-[14ch]">
                Growing across Dhaka.
              </h2>
            </div>
            <p className="text-lede max-w-md text-white/75 lg:col-span-5 lg:justify-self-end">
              The plant, the range, and the reach behind every SAF bottle.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map(({ icon: Icon, value, unit, label }) => (
              <li
                key={label}
                className="reveal group relative isolate overflow-hidden rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-white/12 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.1] sm:p-7"
              >
                <Icon
                  aria-hidden
                  strokeWidth={1}
                  className="absolute -right-6 -bottom-6 -z-10 size-36 text-white/[0.06] transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                />
                <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-purple text-white shadow-[0_18px_36px_-16px_rgb(109_43_213/0.9)] ring-1 ring-white/20 transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none">
                  <Icon aria-hidden className="size-7" />
                </span>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-2 leading-none">
                  {unit ? <span className="text-base font-semibold text-[#c9b5ff]">{unit}</span> : null}
                  <span className="text-[2.75rem] font-extrabold tracking-[-0.05em] whitespace-nowrap lg:text-[2.25rem] xl:text-[2.75rem]">
                    {value}
                  </span>
                </p>
                <p className="mt-3 text-white/75">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="leader-title" className="relative isolate overflow-hidden bg-lavender/60 py-20 md:py-28">
        <Quote
          aria-hidden
          strokeWidth={1}
          className="absolute -top-10 right-[-3rem] -z-10 size-[22rem] rotate-180 text-purple/[0.07]"
        />
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-50px_rgb(23_10_53/0.7)]">
              <Image
                src={images.leader.src}
                alt={images.leader.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
            <figcaption className="absolute inset-x-5 -bottom-7 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_24px_50px_-24px_rgb(23_10_53/0.5)] sm:inset-x-8 sm:p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple text-white">
                <Quote aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block font-bold text-ink">{leader.name}</span>
                <span className="block text-sm text-ink/60">{leader.role}, SAF Food &amp; Beverage Ltd.</span>
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="eyebrow text-purple">A message from our co-founder</p>
            <h2 id="leader-title" className="sr-only">
              Message from the co-founder and CEO
            </h2>
            <blockquote className="mt-6">
              <p className="text-[clamp(1.625rem,1.1rem+2vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance text-ink">
                “{leader.quote}”
              </p>
            </blockquote>
            <div className="text-lede mt-8 space-y-4 text-ink/70">
              {leader.message.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 flex items-center gap-4">
              <span aria-hidden className="h-px w-12 bg-purple" />
              <span>
                <span className="block text-lg font-bold text-ink">{leader.name}</span>
                <span className="block text-sm text-ink/60">{leader.role}</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="inside-title" className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-purple">Inside SAF</p>
            <h2 id="inside-title" className="text-headline mt-4 max-w-[14ch] text-ink">
              What drives the company.
            </h2>
          </div>
          <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
            Our purpose and values, how we keep the water safe, and how we keep
            our footprint small.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {sections.map(({ href, label, body, icon: Icon, image }) => (
            <li key={href} className="reveal">
              <Link
                href={href}
                className="group on-dark relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-night p-7 text-white sm:p-8"
              >
                <Image
                  src={image.src}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/5" />
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-purple">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="mt-6 text-2xl font-bold tracking-[-0.03em]">{label}</span>
                <span className="mt-2 text-white/80">{body}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Read more
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-lavender p-7 sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-7">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-purple text-white">
              <Factory aria-hidden className="size-5" />
            </span>
            <h2 className="mt-6 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em] text-ink">
              A Class 100,000 cleanroom in Bashundhara.
            </h2>
            <p className="mt-4 max-w-xl text-ink/70">
              Bottle blowing through cap sealing runs with no human contact until
              the case is sealed.
            </p>
            <Link
              href="/about/quality"
              className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-purple"
            >
              See how we keep it safe
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <Image
            src={images.cleanroom.src}
            alt={images.cleanroom.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="aspect-[4/3] h-auto w-full rounded-[1.5rem] object-cover lg:col-span-5"
          />
        </div>
      </section>
    </>
  );
}
