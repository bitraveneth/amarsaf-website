import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { productImages } from "@/lib/images";
import { productDetails } from "@/lib/product-details";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "SAF Daily 500 ml, Executive 1.0 L, Family 2 L, and Commercial 18 L returnable jars for home and office.",
};

const rows: { label: string; value: (id: string) => string }[] = [
  { label: "Case", value: (id) => products.find((p) => p.id === id)!.pack },
  { label: "Best for", value: (id) => products.find((p) => p.id === id)!.where },
  { label: "Pack", value: (id) => productDetails[id].specs[2].value },
  { label: "Water", value: () => "8-stage purified, pH 7.0–7.8" },
];

export default function ProductsPage() {
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
            <li key={product.id} className="reveal">
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
          <div className="relative mt-10 overflow-x-auto rounded-[2rem] bg-white ring-1 ring-ink/[0.06]">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  <th scope="col" className="w-40 p-5 align-bottom text-xs font-bold tracking-[0.14em] text-ink/50 uppercase">
                    Size
                  </th>
                  {products.map((product) => (
                    <th key={product.id} scope="col" className="p-5 align-bottom">
                      <Link href={`/products/${product.id}`} className="group flex items-center gap-3">
                        <Image
                          src={productImages[product.id].src}
                          alt=""
                          sizes="56px"
                          className="size-14 shrink-0 rounded-xl object-cover"
                        />
                        <span>
                          <span className="block text-lg font-extrabold tracking-[-0.03em] text-purple">{product.size}</span>
                          <span className="block font-semibold text-ink group-hover:text-purple">{product.name}</span>
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-ink/[0.07] last:border-0">
                    <th scope="row" className="p-5 text-xs font-bold tracking-[0.14em] text-ink/50 uppercase">
                      {row.label}
                    </th>
                    {products.map((product) => (
                      <td key={product.id} className="p-5 text-ink/80">
                        {row.value(product.id)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-5">
                    <span className="sr-only">Details</span>
                  </th>
                  {products.map((product) => (
                    <td key={product.id} className="p-5">
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-purple hover:underline"
                      >
                        View details
                        <span className="sr-only"> of {product.name}</span>
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="on-dark bg-night text-white">
        <div className="shell flex flex-col gap-8 py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-title max-w-xl md:text-5xl md:leading-[1.05]">Order any size by the case.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact?type=product#enquiry"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-purple transition-colors hover:bg-lavender"
            >
              Send a product enquiry
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <Link
              href="/contact?type=business#enquiry"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Business and bulk orders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
