import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronRight, Package } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { productImages, productLifestyle } from "@/lib/images";
import { productDetails } from "@/lib/product-details";
import { certifications, minerals, products, stages } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  if (!product) return {};
  return {
    title: `${product.name} ${product.size}`,
    description: `${product.name} ${product.size}: ${productDetails[product.id].description}`,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  if (!product) notFound();

  const detail = productDetails[product.id];
  const image = productImages[product.id];
  const lifestyle = productLifestyle[product.id];
  const others = products.filter((item) => item.id !== product.id);
  const enquire = `/contact?type=product&product=${encodeURIComponent(product.name)}#enquiry`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lavender">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-32 -z-10 hidden h-[30rem] w-[44rem] opacity-[0.12] [mask-image:radial-gradient(closest-side,black,transparent)] md:block"
          style={{ backgroundImage: "url(/brand/pattern-1.svg)", backgroundSize: "340px auto" }}
        />
        <div className="shell grid gap-10 pt-28 pb-14 md:pt-36 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] bg-[#ece9f3] shadow-[0_50px_100px_-50px_rgb(23_10_53/0.5)]">
              <Image
                src={image.src}
                alt={image.alt}
                placeholder="blur"
                preload
                sizes="(min-width: 1024px) 40vw, 448px"
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
            <nav aria-label="Other sizes" className="mt-4">
              <ul className="grid grid-cols-4 gap-2">
                {products.map((item) => {
                  const current = item.id === product.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/products/${item.id}`}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl p-2 text-center ring-1 transition-colors sm:p-2.5",
                          current ? "bg-white ring-purple" : "bg-white/60 ring-ink/10 hover:bg-white",
                        )}
                      >
                        <Image
                          src={productImages[item.id].src}
                          alt=""
                          sizes="48px"
                          className="size-10 shrink-0 rounded-xl object-cover sm:size-14"
                        />
                        <span className="min-w-0">
                          <span className={cn("block text-sm font-bold", current ? "text-purple" : "text-ink")}>
                            {item.size}
                          </span>
                          <span className="hidden text-xs text-ink/60 sm:block">
                            {item.name.replace("SAF ", "")}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-ink/60">
                <li>
                  <Link href="/products" className="rounded-sm hover:text-purple">
                    Products
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="font-semibold text-ink">
                  {product.name}
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em] text-ink">
              {product.name}
              <span className="mt-2 block text-[clamp(3.5rem,2.2rem+5.2vw,7rem)] text-purple">{product.size}</span>
            </h1>
            <p className="mt-6 text-2xl font-bold tracking-[-0.02em] text-ink">{detail.tagline}</p>
            <p className="text-lede mt-3 max-w-xl text-ink/70">{detail.description}</p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Key facts">
              {[product.pack, detail.specs[2].value, "pH 7.0–7.8"].map((fact) => (
                <li
                  key={fact}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-ink/80 ring-1 ring-ink/10"
                >
                  <BadgeCheck aria-hidden className="size-4 text-purple" />
                  {fact}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={enquire}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-purple px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-purple-deep"
              >
                Enquire about {product.name}
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
              <Link
                href="/contact?type=business#enquiry"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-purple hover:text-purple"
              >
                Bulk and business orders
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="highlights-title" className="shell py-20 md:py-24">
        <h2 id="highlights-title" className="text-headline max-w-[16ch] text-ink">
          Why you will like it.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detail.highlights.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="reveal group relative isolate overflow-hidden rounded-[1.75rem] bg-haze p-6 ring-1 ring-ink/[0.05] transition-colors duration-300 hover:bg-lavender sm:p-7"
            >
              <Icon
                aria-hidden
                strokeWidth={1.25}
                className="absolute -right-6 -bottom-6 -z-10 size-36 text-purple/[0.06] transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
              />
              <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-[#4b2cd7] text-white shadow-[0_16px_32px_-14px_rgb(109_43_213/0.8)] transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none">
                <Icon aria-hidden className="size-7" />
              </span>
              <h3 className="mt-8 text-xl text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ideal-title" className="shell pb-20 md:pb-24">
        <div className="grid gap-4 lg:grid-cols-12">
          <Image
            src={lifestyle.src}
            alt={lifestyle.alt}
            placeholder="blur"
            sizes="(min-width: 1344px) 740px, (min-width: 1024px) 56vw, 100vw"
            className="aspect-[4/3] h-auto w-full rounded-[2rem] object-cover lg:col-span-7"
          />
          <div className="on-dark relative isolate flex flex-col justify-end overflow-hidden rounded-[2rem] bg-night p-7 text-white sm:p-10 lg:col-span-5">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(109_43_213/0.55),transparent_60%)]" />
            <p className="eyebrow text-[#c9b5ff]">Made for</p>
            <h2 id="ideal-title" className="mt-3 max-w-[16ch] text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
              {detail.tagline}
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-2">
              {detail.idealFor.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.08] px-4 py-3.5 text-sm font-semibold ring-1 ring-white/15"
                >
                  <Icon aria-hidden className="size-5 shrink-0 text-[#c9b5ff]" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="specs-title" className="bg-haze py-20 md:py-24">
        <div className="shell grid gap-5 lg:grid-cols-12">
          <div className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-10 lg:col-span-7">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-lavender text-purple">
              <Package aria-hidden className="size-6" />
            </span>
            <h2 id="specs-title" className="mt-8 text-3xl text-ink">
              Specifications
            </h2>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {detail.specs.map((spec) => (
                <div key={spec.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-ink/55">{spec.label}</dt>
                  <dd className="font-semibold text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-night p-7 text-white sm:p-10 lg:col-span-5">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(109_43_213/0.6),transparent_60%)]" />
            <p className="eyebrow text-[#c9b5ff]">Inside every bottle</p>
            <h2 className="mt-3 text-3xl">Typical analysis</h2>
            <dl className="mt-6 grid gap-2">
              {minerals.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10"
                >
                  <dt className="text-sm text-white/75">{item.label}</dt>
                  <dd className="text-sm font-bold tabular-nums">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="purity-title" className="shell py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-purple">Same water, every size</p>
            <h2 id="purity-title" className="text-headline mt-4 max-w-[14ch] text-ink">
              Purified in eight stages.
            </h2>
            <p className="text-lede mt-5 text-ink/70">
              Every {product.name} is bottled in our Class 100,000 cleanroom, under
              four certifications.
            </p>
            <Link
              href="/about/quality"
              className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-purple"
            >
              How we keep it safe
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <ol aria-label="Purification stages" className="flex flex-wrap gap-2">
              {stages.map((stage, index) => (
                <li
                  key={stage}
                  className="inline-flex items-center gap-2.5 rounded-full bg-haze py-2 pr-4 pl-2 text-sm font-semibold text-ink ring-1 ring-ink/[0.06]"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-purple text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {stage}
                </li>
              ))}
            </ol>
            <ul aria-label="Certifications" className="mt-6 grid gap-2 sm:grid-cols-2">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-lavender px-4 py-3.5 text-sm font-semibold text-ink"
                >
                  <BadgeCheck aria-hidden className="size-5 shrink-0 text-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="shell pb-20 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h2 id="faq-title" className="text-headline text-ink lg:col-span-4">
            Questions
          </h2>
          <div className="lg:col-span-8">
            <Accordion className="border-t-2 border-ink">
              {detail.faqs.map((item) => (
                <AccordionItem key={item.q} value={item.q} className="border-b border-ink/15">
                  <AccordionTrigger className="items-center gap-4 rounded-none py-6 text-lg font-semibold text-ink hover:text-purple hover:no-underline [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-purple">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-ink/75">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple hover:underline">
              More answers in the FAQ
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="others-title" className="bg-haze py-20 md:py-24">
        <div className="shell">
          <h2 id="others-title" className="text-headline text-ink">
            Other sizes
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.id} className={cn(item.id === others[2]?.id && "max-lg:hidden")}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="on-dark relative isolate flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-purple p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(255_255_255/0.18),transparent_45%),radial-gradient(circle_at_0%_100%,#2a0e5c,transparent_60%)]" />
          <div>
            <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em]">
              Order {product.name} by the case.
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              {product.pack} — for homes, offices, and shops. Tell us your area and
              volume, and we will arrange the delivery.
            </p>
          </div>
          <Link
            href={enquire}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-purple transition-colors hover:bg-lavender"
          >
            Send a product enquiry
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
