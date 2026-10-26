import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
    include: { packMedia: true },
  });

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Four packs for the public catalogue. Click a card to edit copy and images."
        breadcrumbs={[{ label: "Content" }, { label: "Products" }]}
        actions={
          <Link
            href="/admin/products/new"
            className="admin-btn-primary inline-flex h-10 items-center gap-1.5 px-4 text-sm"
          >
            <Plus aria-hidden className="size-4" />
            New product
          </Link>
        }
      />

      {products.length === 0 ? (
        <div className="admin-panel flex flex-col items-center justify-center px-6 py-20 text-center">
          <Package className="size-10 text-slate-300" />
          <p className="mt-4 text-sm font-medium text-[var(--admin-muted)]">No products yet</p>
          <Link href="/admin/products/new" className="admin-btn-primary mt-5">
            Create first product
          </Link>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/products/${p.id}`}
                className="admin-panel group flex h-full flex-col overflow-hidden p-0 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-28px_rgb(15_23_42/0.5)]"
              >
                <span className="relative block aspect-square bg-[#ece9f3]">
                  {p.packMedia?.url ? (
                    <Image
                      src={p.packMedia.url}
                      alt={p.packMedia.alt || p.name}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 90vw"
                      unoptimized={p.packMedia.url.startsWith("/")}
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-slate-400">
                      <Package className="size-10" />
                    </span>
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-violet-800 shadow-sm">
                    {p.size}
                  </span>
                  <span
                    className={`admin-status-pill absolute top-3 right-3 ${
                      p.isPublished ? "is-live" : "is-draft"
                    }`}
                  >
                    {p.isPublished ? "Live" : "Draft"}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-lg font-semibold tracking-tight text-[var(--admin-text)]">
                    {p.name}
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm text-[var(--admin-muted)]">
                    {p.summary}
                  </span>
                  <span className="mt-auto flex items-center justify-between pt-5 text-sm">
                    <span className="font-mono text-[11px] text-[var(--admin-faint)]">{p.slug}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--admin-accent)]">
                      Edit
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
