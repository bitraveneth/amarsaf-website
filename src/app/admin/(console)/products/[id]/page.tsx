import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Package } from "lucide-react";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { deleteProduct, upsertProduct } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaPicker } from "@/components/admin/media-picker";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

export default async function AdminProductEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";

  const [product, media] = await Promise.all([
    isNew
      ? null
      : prisma.product.findUnique({
          where: { id },
          include: {
            highlights: { orderBy: { order: "asc" } },
            specs: { orderBy: { order: "asc" } },
            faqs: { orderBy: { order: "asc" } },
            packMedia: true,
            lifeMedia: true,
          },
        }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!isNew && !product) notFound();

  const sp = await searchParams;

  async function save(formData: FormData) {
    "use server";
    if (!isNew) formData.set("id", id);
    const result = await upsertProduct(formData);
    if (!result.ok) {
      redirect(
        `/admin/products/${isNew ? "new" : id}?error=${encodeURIComponent(result.error)}`,
      );
    }
    if (isNew && result.id) {
      redirect(`/admin/products/${result.id}?saved=1`);
    }
    redirect(`/admin/products/${id}?saved=1`);
  }

  async function remove(formData: FormData) {
    "use server";
    formData.set("id", id);
    const result = await deleteProduct(formData);
    if (!result.ok) redirect(`/admin/products/${id}?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/products");
  }

  const highlightsJson = product
    ? JSON.stringify(
        product.highlights.map(({ iconKey, title, body, order }) => ({
          iconKey,
          title,
          body,
          order,
        })),
        null,
        2,
      )
    : "[]";
  const specsJson = product
    ? JSON.stringify(
        product.specs.map(({ label, value, order }) => ({ label, value, order })),
        null,
        2,
      )
    : "[]";
  const faqsJson = product
    ? JSON.stringify(
        product.faqs.map(({ question, answer, order }) => ({ question, answer, order })),
        null,
        2,
      )
    : "[]";
  const idealForJson = product?.idealFor ? JSON.stringify(product.idealFor, null, 2) : "[]";

  return (
    <div>
      <AdminPageHeader
        title={isNew ? "New product" : product!.name}
        description={
          isNew
            ? "Create a catalogue pack with images and detail fields."
            : `${product!.size} · ${product!.pack}`
        }
        breadcrumbs={[
          { label: "Content" },
          { label: "Products", href: "/admin/products" },
          { label: isNew ? "New" : product!.name },
        ]}
        actions={
          !isNew ? (
            <Link
              href={`/products/${product!.slug}`}
              target="_blank"
              className="inline-flex h-10 items-center rounded-lg border border-[var(--admin-border-strong)] bg-white px-4 text-sm font-semibold hover:bg-slate-50"
            >
              View on site
            </Link>
          ) : null
        }
      />
      <FormSuccess message={sp.saved ? "Product saved." : null} />
      <FormMessage message={sp.error} />

      <form action={save} className="space-y-6">
        {/* Basics + preview */}
        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="admin-panel overflow-hidden p-0">
            <div className="relative aspect-square bg-[#ece9f3]">
              {product?.packMedia?.url ? (
                <Image
                  src={product.packMedia.url}
                  alt={product.packMedia.alt || product.name}
                  fill
                  className="object-contain p-6"
                  sizes="256px"
                  unoptimized={product.packMedia.url.startsWith("/")}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <Package className="size-12" />
                </div>
              )}
            </div>
            <div className="space-y-4 border-t border-[var(--admin-border)] p-4">
              <MediaPicker
                name="packMediaId"
                media={media}
                defaultValue={product?.packMediaId}
                label="Pack image"
              />
              <MediaPicker
                name="lifeMediaId"
                media={media}
                defaultValue={product?.lifeMediaId}
                label="Lifestyle image"
              />
              {!isNew && product?.isPublished != null ? (
                <span
                  className={`admin-status-pill ${product.isPublished ? "is-live" : "is-draft"}`}
                >
                  {product.isPublished ? "Published" : "Draft"}
                </span>
              ) : null}
            </div>
          </aside>

          <div className="admin-panel space-y-6 p-5 sm:p-6">
            <section>
              <p className="admin-section-label">Basics</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Name</label>
                  <input name="name" defaultValue={product?.name} required />
                </div>
                <div>
                  <label>Slug</label>
                  <input name="slug" defaultValue={product?.slug} required placeholder="saf-daily" />
                </div>
                <div>
                  <label>Size</label>
                  <input name="size" defaultValue={product?.size} required placeholder="500 ml" />
                </div>
                <div>
                  <label>Pack / case</label>
                  <input name="pack" defaultValue={product?.pack} required />
                </div>
                <div>
                  <label>Best for</label>
                  <input name="whereUsed" defaultValue={product?.whereUsed} required />
                </div>
                <div>
                  <label>Feature</label>
                  <input name="feature" defaultValue={product?.feature} required />
                </div>
                <div>
                  <label>Tagline</label>
                  <input name="tagline" defaultValue={product?.tagline ?? ""} />
                </div>
                <div>
                  <label>Order</label>
                  <input name="order" type="number" defaultValue={product?.order ?? 0} />
                </div>
                <div className="sm:col-span-2">
                  <label>Summary (cards)</label>
                  <textarea name="summary" rows={2} defaultValue={product?.summary} required />
                </div>
                <div className="sm:col-span-2">
                  <label>Description (detail page)</label>
                  <textarea
                    name="description"
                    rows={4}
                    defaultValue={product?.description ?? ""}
                  />
                </div>
              </div>
            </section>

            <PublishCheckbox role={user.role} defaultChecked={product?.isPublished ?? true} />
          </div>
        </div>

        {/* Advanced JSON sections */}
        <div className="admin-panel space-y-6 p-5 sm:p-6">
          <div>
            <p className="admin-section-label">Detail blocks (JSON)</p>
            <p className="mb-4 text-sm text-[var(--admin-muted)]">
              Advanced fields for highlights, specs, FAQs, and “ideal for”. Keep valid JSON arrays.
            </p>
            <div className="admin-field-grid admin-field-grid-2">
              <div>
                <label>Highlights</label>
                <textarea
                  name="highlightsJson"
                  rows={8}
                  defaultValue={highlightsJson}
                  className="font-mono text-xs"
                />
              </div>
              <div>
                <label>Specs</label>
                <textarea
                  name="specsJson"
                  rows={8}
                  defaultValue={specsJson}
                  className="font-mono text-xs"
                />
              </div>
              <div>
                <label>Product FAQs</label>
                <textarea
                  name="faqsJson"
                  rows={8}
                  defaultValue={faqsJson}
                  className="font-mono text-xs"
                />
              </div>
              <div>
                <label>Ideal for</label>
                <textarea
                  name="idealForJson"
                  rows={8}
                  defaultValue={idealForJson}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="admin-btn-primary min-w-[9rem]">
            Save product
          </button>
          <Link
            href="/admin/products"
            className="inline-flex h-10 items-center rounded-lg border border-[var(--admin-border-strong)] bg-white px-4 text-sm font-semibold hover:bg-slate-50"
          >
            Back to list
          </Link>
          {!isNew && canDelete(user.role) ? (
            <button
              formAction={remove}
              type="submit"
              data-variant="destructive"
              className="ml-auto inline-flex h-10 items-center rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Delete product
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
