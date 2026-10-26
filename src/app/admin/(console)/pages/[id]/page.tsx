import { notFound, redirect } from "next/navigation";
import { Layers, Plus, Trash2 } from "lucide-react";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import {
  deleteSectionBlock,
  upsertSection,
  upsertSectionBlock,
} from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaPicker } from "@/components/admin/media-picker";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

export default async function AdminPageSectionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string; section?: string }>;
}) {
  const user = await requireAdmin();
  const { id: pageId } = await params;
  const sp = await searchParams;

  const [page, media] = await Promise.all([
    prisma.page.findUnique({
      where: { id: pageId },
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: {
            blocks: {
              orderBy: { order: "asc" },
              include: { media: true },
            },
          },
        },
      },
    }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!page) notFound();

  const activeSectionId = sp.section || page.sections[0]?.id || "new";
  const active =
    activeSectionId === "new"
      ? null
      : page.sections.find((s) => s.id === activeSectionId) ?? page.sections[0] ?? null;

  async function saveSection(formData: FormData) {
    "use server";
    formData.set("pageId", pageId);
    const result = await upsertSection(formData);
    if (!result.ok) redirect(`/admin/pages/${pageId}?error=${encodeURIComponent(result.error)}`);
    const sid = result.id || String(formData.get("id") || "");
    redirect(
      sid
        ? `/admin/pages/${pageId}?section=${sid}&saved=1`
        : `/admin/pages/${pageId}?saved=1`,
    );
  }

  async function saveBlock(formData: FormData) {
    "use server";
    formData.set("pageId", pageId);
    const result = await upsertSectionBlock(formData);
    if (!result.ok) redirect(`/admin/pages/${pageId}?error=${encodeURIComponent(result.error)}`);
    const sid = String(formData.get("sectionId") || sp.section || "");
    redirect(
      sid
        ? `/admin/pages/${pageId}?section=${sid}&saved=1`
        : `/admin/pages/${pageId}?saved=1`,
    );
  }

  async function removeBlock(formData: FormData) {
    "use server";
    formData.set("pageId", pageId);
    const result = await deleteSectionBlock(formData);
    if (!result.ok) redirect(`/admin/pages/${pageId}?error=${encodeURIComponent(result.error)}`);
    const sid = String(formData.get("sectionId") || active?.id || "");
    redirect(
      sid
        ? `/admin/pages/${pageId}?section=${sid}&saved=1`
        : `/admin/pages/${pageId}?saved=1`,
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={page.title}
        description={`Sections for /${page.slug}. Pick a section on the left, edit blocks on the right.`}
        breadcrumbs={[
          { label: "Content" },
          { label: "Pages", href: "/admin/pages" },
          { label: page.title },
        ]}
      />
      <FormSuccess message={sp.saved ? "Saved." : null} />
      <FormMessage message={sp.error} />

      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="admin-panel h-fit overflow-hidden lg:sticky lg:top-20">
          <div className="border-b border-[var(--admin-border)] px-4 py-3">
            <p className="text-sm font-semibold">Sections</p>
            <p className="text-xs text-[var(--admin-muted)]">{page.sections.length} on this page</p>
          </div>
          <ul className="divide-y divide-[var(--admin-border)]">
            {page.sections.map((section, index) => {
              const selected = active?.id === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`/admin/pages/${pageId}?section=${section.id}`}
                    className={`flex gap-3 p-3.5 transition-colors ${
                      selected ? "bg-violet-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 tabular-nums">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">
                        {section.title || section.key}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-[var(--admin-faint)]">
                        {section.key} · {section.blocks.length} blocks
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-[var(--admin-border)] p-3">
            <a
              href={`/admin/pages/${pageId}?section=new`}
              className={`flex h-11 items-center justify-center gap-1.5 rounded-lg border border-dashed text-sm font-semibold ${
                activeSectionId === "new"
                  ? "border-violet-400 bg-violet-50 text-violet-800"
                  : "border-[var(--admin-border-strong)] text-[var(--admin-muted)] hover:border-violet-300"
              }`}
            >
              <Plus className="size-4" />
              New section
            </a>
          </div>
        </aside>

        <div className="space-y-5">
          {!active ? (
            <div className="admin-panel p-5 sm:p-6">
              <h2 className="text-lg font-semibold">New section</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                A section is a named area on the page (e.g. <code>ways</code>,{" "}
                <code>know-what-you-drink</code>).
              </p>
              <form action={saveSection} className="mt-5 space-y-4">
                <input type="hidden" name="pageId" value={pageId} />
                <div className="admin-field-grid admin-field-grid-2">
                  <div>
                    <label>Key</label>
                    <input name="key" required placeholder="ways" />
                  </div>
                  <div>
                    <label>Title</label>
                    <input name="title" placeholder="Get SAF your way" />
                  </div>
                  <div>
                    <label>Order</label>
                    <input name="order" type="number" defaultValue={page.sections.length} />
                  </div>
                  <div className="flex items-end">
                    <PublishCheckbox role={user.role} defaultChecked />
                  </div>
                </div>
                <button type="submit" className="admin-btn-primary">
                  Create section
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="admin-panel overflow-hidden">
                <div className="flex items-center gap-3 border-b border-[var(--admin-border)] px-5 py-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <Layers className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold">{active.title || active.key}</h2>
                    <p className="font-mono text-xs text-[var(--admin-faint)]">{active.key}</p>
                  </div>
                </div>
                <form action={saveSection} className="space-y-4 p-5">
                  <input type="hidden" name="id" value={active.id} />
                  <input type="hidden" name="pageId" value={pageId} />
                  <div className="admin-field-grid admin-field-grid-3">
                    <div>
                      <label>Key</label>
                      <input name="key" defaultValue={active.key} required />
                    </div>
                    <div>
                      <label>Title</label>
                      <input name="title" defaultValue={active.title ?? ""} />
                    </div>
                    <div>
                      <label>Order</label>
                      <input name="order" type="number" defaultValue={active.order} />
                    </div>
                  </div>
                  <PublishCheckbox role={user.role} defaultChecked={active.isPublished} />
                  <button type="submit" className="admin-btn-primary">
                    Save section
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Content blocks</h3>
                    <p className="text-xs text-[var(--admin-muted)]">
                      Each block is a piece of copy/media inside this section.
                    </p>
                  </div>
                </div>

                {active.blocks.map((block, bi) => (
                  <div key={block.id} className="admin-panel overflow-hidden">
                    <div className="flex items-center justify-between gap-3 border-b border-[var(--admin-border)] px-5 py-3">
                      <p className="text-sm font-semibold">
                        Block {bi + 1}
                        {block.key ? (
                          <span className="ml-2 font-mono text-xs font-normal text-[var(--admin-faint)]">
                            {block.key}
                          </span>
                        ) : null}
                      </p>
                      {canDelete(user.role) ? (
                        <form action={removeBlock}>
                          <input type="hidden" name="id" value={block.id} />
                          <input type="hidden" name="sectionId" value={active.id} />
                          <button
                            type="submit"
                            data-variant="destructive"
                            className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="size-3.5" />
                            Delete
                          </button>
                        </form>
                      ) : null}
                    </div>
                    <form action={saveBlock} className="space-y-4 p-5">
                      <input type="hidden" name="id" value={block.id} />
                      <input type="hidden" name="sectionId" value={active.id} />
                      <div className="admin-field-grid admin-field-grid-3">
                        <div>
                          <label>Key</label>
                          <input name="key" defaultValue={block.key ?? ""} />
                        </div>
                        <div>
                          <label>Type</label>
                          <input name="type" defaultValue={block.type} />
                        </div>
                        <div>
                          <label>Order</label>
                          <input name="order" type="number" defaultValue={block.order} />
                        </div>
                      </div>
                      <div>
                        <label>Data (JSON)</label>
                        <textarea
                          name="dataJson"
                          rows={7}
                          className="font-mono text-xs"
                          defaultValue={JSON.stringify(block.data, null, 2)}
                        />
                      </div>
                      <MediaPicker
                        name="mediaId"
                        media={media}
                        defaultValue={block.mediaId}
                        label="Block image"
                      />
                      <button type="submit" className="admin-btn-primary">
                        Save block
                      </button>
                    </form>
                  </div>
                ))}

                <div className="admin-panel overflow-hidden border-dashed">
                  <div className="border-b border-[var(--admin-border)] px-5 py-3">
                    <p className="text-sm font-semibold">Add block</p>
                  </div>
                  <form action={saveBlock} className="space-y-4 p-5">
                    <input type="hidden" name="sectionId" value={active.id} />
                    <div className="admin-field-grid admin-field-grid-3">
                      <div>
                        <label>Key</label>
                        <input name="key" placeholder="copy" />
                      </div>
                      <div>
                        <label>Type</label>
                        <input name="type" defaultValue="text" />
                      </div>
                      <div>
                        <label>Order</label>
                        <input name="order" type="number" defaultValue={active.blocks.length} />
                      </div>
                    </div>
                    <div>
                      <label>Data (JSON)</label>
                      <textarea
                        name="dataJson"
                        rows={5}
                        className="font-mono text-xs"
                        defaultValue={`{\n  "title": "",\n  "body": ""\n}`}
                      />
                    </div>
                    <MediaPicker name="mediaId" media={media} label="Block image" />
                    <button type="submit" className="admin-btn-primary">
                      Add block
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
