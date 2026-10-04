import { ArrowUpRight, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { productImages } from "@/lib/images";
import type { products } from "@/lib/site";

type Product = (typeof products)[number];

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const image = productImages[product.id];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgb(23_10_53/0.5)] motion-reduce:transition-none"
    >
      <span className="relative block overflow-hidden bg-[#ece9f3]">
        <Image
          src={image.src}
          alt=""
          placeholder="blur"
          preload={priority}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 48vw"
          className="aspect-square h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-sm font-bold text-purple shadow-sm sm:top-4 sm:left-4">
          {product.size}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="text-base font-bold tracking-[-0.02em] text-ink sm:text-lg">{product.name}</span>
        <span className="mt-1 line-clamp-2 min-h-8 text-xs leading-4 text-ink/60 sm:min-h-10 sm:text-sm sm:leading-5">
          {product.where}
        </span>
        <span className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold text-ink/70">
            <Package aria-hidden className="size-3.5 shrink-0 text-purple" />
            {product.pack}
          </span>
          <span className="hidden size-9 shrink-0 items-center justify-center sm:flex rounded-full bg-lavender text-purple transition-colors duration-300 group-hover:bg-purple group-hover:text-white">
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none"
            />
          </span>
        </span>
      </span>
    </Link>
  );
}
