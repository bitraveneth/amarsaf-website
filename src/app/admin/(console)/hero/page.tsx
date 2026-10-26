import Image from "next/image";
import { redirect } from "next/navigation";
import { ImageIcon, Trash2 } from "lucide-react";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { deleteHeroSlide, upsertHeroSlide } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaPicker } from "@/components/admin/media-picker";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

export default async function AdminHeroPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string; edit?: string }>;
}) {
  const user = await requireAdmin();
  const [slides, media] = await Promise.all([
    prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
      include: { media: true },
    }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  const params = await searchParams;
  const editId = params.edit || slides[0]?.id || "new";
  const active = editId === "new" ? null : slides.find((s) => s.id === editId) ?? slides[0] ?? null;

  async function save(formData: FormData) {
    "use server";
    const result = await upsertHeroSlide(formData);
    if (!result.ok) redirect(`/admin/hero?error=${encodeURIComponent(result.error)}`);
    const id = result.id || String(formData.get("id") || "");
    redirect(id ? `/admin/hero?edit=${id}&saved=1` : "/admin/hero?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteHeroSlide(formData);
    if (!result.ok) redirect(`/admin/hero?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/hero?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="Hero slides"
        description="Manage the homepage carousel. Select a slide on the left, edit on the right."
        breadcrumbs={[{ label: "Content" }, { label: "Hero" }]}
      />
      <FormSuccess message={params.saved ? "Slide saved." : null} />
      <FormMessage message={params.error} />

      <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[22rem_minmax(0,1fr)]">
        {/* Slide list */}
        <aside className="admin-panel h-fit overflow-hidden lg:sticky lg:top-20">
          <div className="border-b border-[var(--admin-border)] px-4 py-3">
            <p className="text-sm font-semibold">Slides</p>
            <p className="text-xs text-[var(--admin-muted)]">{slides.length} in carousel order</p>
          </div>
          <ul className="divide-y divide-[var(--admin-border)]">
            {slides.map((slide, index) => {
              const selected = active?.id === slide.id;
              return (
                <li key={slide.id}>
                  <a
                    href={`/admin/hero?edit=${slide.id}`}
                    className={`flex gap-3 p-3 transition-colors ${
                      selected ? "bg-violet-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-[var(--admin-border)]">
                      {slide.media?.url ? (
                        <Image
                          src={slide.media.url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized={slide.media.url.startsWith("/")}
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-slate-400">
                          <ImageIcon className="size-5" />
                        </span>
                      )}
                      <span className="absolute top-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white tabular-nums">
                        {index + 1}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 py-0.5">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-[var(--admin-text)]">
                          {slide.tab || slide.key}
                        </span>
                        <span
                          className={`admin-status-pill ${slide.isPublished ? "is-live" : "is-draft"}`}
                        >
                          {slide.isPublished ? "Live" : "Draft"}
                        </span>
                      </span>
                      <span className="mt-1 line-clamp-2 text-xs leading-snug text-[var(--admin-muted)]">
                        {slide.title}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-[var(--admin-border)] p-3">
            <a
              href="/admin/hero?edit=new"
              className={`flex h-11 items-center justify-center rounded-lg border border-dashed text-sm font-semibold transition-colors ${
                editId === "new"
                  ? "border-violet-400 bg-violet-50 text-violet-800"
                  : "border-[var(--admin-border-strong)] text-[var(--admin-muted)] hover:border-violet-300 hover:text-violet-700"
              }`}
            >
              + New slide
            </a>
          </div>
        </aside>

        {/* Editor */}
        <div className="admin-panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--admin-border)] px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {active ? `Edit “${active.tab || active.key}”` : "New slide"}
              </h2>
              <p className="text-xs text-[var(--admin-muted)]">
                {active
                  ? `Key · ${active.key} · Order ${active.order}`
                  : "Fill in copy and attach media, then create."}
              </p>
            </div>
            {active && canDelete(user.role) ? (
              <form action={remove}>
                <input type="hidden" name="id" value={active.id} />
                <button
                  type="submit"
                  data-variant="destructive"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              </form>
            ) : null}
          </div>

          <form action={save} className="space-y-8 p-5 sm:p-6">
            {active ? <input type="hidden" name="id" value={active.id} /> : null}

            {/* Preview strip */}
            <div className="overflow-hidden rounded-xl bg-slate-950 ring-1 ring-black/5">
              <div className="relative aspect-[21/9] min-h-[10rem] w-full">
                {active?.media?.url ? (
                  <Image
                    src={active.media.url}
                    alt={active.media.alt || ""}
                    fill
                    className="object-cover opacity-90"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    style={{ objectPosition: active.focus || "center" }}
                    unoptimized={active.media.url.startsWith("/")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500">
                    <ImageIcon className="size-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="text-xs font-semibold tracking-wide text-violet-200 uppercase">
                    {active?.eyebrow || "Eyebrow"}
                  </p>
                  <p className="mt-1 max-w-lg text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {active?.title || "Slide title"}
                  </p>
                </div>
              </div>
            </div>

            <section>
              <p className="admin-section-label">Identity</p>
              <div className="admin-field-grid admin-field-grid-3">
                <div>
                  <label>Key (stable id)</label>
                  <input name="key" defaultValue={active?.key} required placeholder="pure" />
                </div>
                <div>
                  <label>Tab label</label>
                  <input name="tab" defaultValue={active?.tab} required placeholder="Simply Pure" />
                </div>
                <div>
                  <label>Order</label>
                  <input name="order" type="number" defaultValue={active?.order ?? slides.length} />
                </div>
              </div>
            </section>

            <section>
              <p className="admin-section-label">Copy</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Eyebrow</label>
                  <input name="eyebrow" defaultValue={active?.eyebrow} required />
                </div>
                <div>
                  <label>Focus (object-position)</label>
                  <input
                    name="focus"
                    defaultValue={active?.focus ?? ""}
                    placeholder="72% center"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label>Title</label>
                  <input name="title" defaultValue={active?.title} required />
                </div>
                <div className="sm:col-span-2">
                  <label>Body</label>
                  <textarea name="body" rows={3} defaultValue={active?.body} required />
                </div>
              </div>
            </section>

            <section>
              <p className="admin-section-label">Buttons</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Primary CTA label</label>
                  <input name="ctaLabel" defaultValue={active?.ctaLabel} required />
                </div>
                <div>
                  <label>Primary CTA link</label>
                  <input name="ctaHref" defaultValue={active?.ctaHref} required />
                </div>
                <div>
                  <label>Secondary CTA label</label>
                  <input name="secondaryLabel" defaultValue={active?.secondaryLabel ?? ""} />
                </div>
                <div>
                  <label>Secondary CTA link</label>
                  <input name="secondaryHref" defaultValue={active?.secondaryHref ?? ""} />
                </div>
              </div>
            </section>

            <section>
              <p className="admin-section-label">Media & publish</p>
              <div className="space-y-4">
                <MediaPicker
                  name="mediaId"
                  media={media}
                  defaultValue={active?.mediaId}
                  label="Slide image — pick from library or upload a new file"
                />
                <PublishCheckbox role={user.role} defaultChecked={active?.isPublished ?? true} />
              </div>
            </section>

            <div className="flex flex-wrap gap-3 border-t border-[var(--admin-border)] pt-5">
              <button type="submit" className="admin-btn-primary min-w-[8rem]">
                {active ? "Save slide" : "Create slide"}
              </button>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center rounded-lg border border-[var(--admin-border-strong)] bg-white px-4 text-sm font-semibold hover:bg-slate-50"
              >
                Preview homepage
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
