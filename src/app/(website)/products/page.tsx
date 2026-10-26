import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/cms/products";
import { productImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Products",
  description:
    "SAF Daily 500 ml, Executive 1 L, Family 2 L, and Commercial 18 L returnable jars for home and office.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageIntro
        eyebrow="Products"
        title="Four sizes. The same purified water."
        lede="From a 500 ml grip bottle to an 18 L returnable jar — every SAF pack holds the same 8-stage purified, mineral-balanced water."
      />

      <section aria-labelledby="range-title" className="shell py-16 md:py-24">
        <h2 id="range-title" className="sr-only">
          The SAF range
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product, index) => (
            <li key={product.slug} className="reveal">
              <ProductCard product={product} priority={index === 0} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="compare-title" className="bg-haze py-20 md:py-24">
        <div className="shell">
          <p className="eyebrow text-purple">Compare</p>
          <h2 id="compare-title" className="text-headline mt-4 max-w-[14ch] text-ink">
            Find the right size.
          </h2>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink/15">
                  <th className="py-3 pr-4 font-semibold text-ink/60"> </th>
                  {products.map((p) => (
                    <th key={p.slug} className="px-3 py-3 font-bold text-ink">
                      <Link href={`/products/${p.slug}`} className="hover:text-purple">
                        {p.name}
                      </Link>
                      <span className="mt-1 block text-xs font-medium text-ink/55">{p.size}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink/10">
                  <th className="py-4 pr-4 font-semibold text-ink/60">Case</th>
                  {products.map((p) => (
                    <td key={p.slug} className="px-3 py-4 text-ink/80">
                      {p.pack}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-ink/10">
                  <th className="py-4 pr-4 font-semibold text-ink/60">Best for</th>
                  {products.map((p) => (
                    <td key={p.slug} className="px-3 py-4 text-ink/80">
                      {p.where}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-ink/10">
                  <th className="py-4 pr-4 font-semibold text-ink/60">Pack</th>
                  {products.map((p) => (
                    <td key={p.slug} className="px-3 py-4 text-ink/80">
                      {p.specs.find((s) => s.label === "Bottle" || s.label === "Jar")?.value ??
                        p.feature}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="py-4 pr-4 font-semibold text-ink/60">Water</th>
                  {products.map((p) => (
                    <td key={p.slug} className="px-3 py-4 text-ink/80">
                      8-stage purified, pH 7.0–7.8
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const image =
                product.packImage ??
                (productImages[product.slug]
                  ? {
                      src: productImages[product.slug].src,
                      alt: productImages[product.slug].alt,
                    }
                  : null);
              return (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ink/[0.06] transition-colors hover:ring-purple/30"
                  >
                    {image ? (
                      <Image
                        src={image.src}
                        alt=""
                        width={64}
                        height={64}
                        className="size-14 rounded-xl object-contain bg-[#ece9f3] p-1"
                      />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{product.name}</span>
                      <span className="text-xs text-ink/60">{product.size}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-purple opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10">
            <Link
              href="/contact?type=product#enquiry"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-purple px-6 text-sm font-semibold text-white hover:bg-purple/90"
            >
              Ask about supply
              <ArrowRight className="size-4" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
