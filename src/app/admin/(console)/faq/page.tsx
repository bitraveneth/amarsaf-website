import { redirect } from "next/navigation";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { deleteFaq, upsertFaq } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string; edit?: string }>;
}) {
  const user = await requireAdmin();
  const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  const params = await searchParams;
  const editId = params.edit || items[0]?.id || "new";
  const active = editId === "new" ? null : items.find((i) => i.id === editId) ?? items[0] ?? null;

  async function save(formData: FormData) {
    "use server";
    const result = await upsertFaq(formData);
    if (!result.ok) redirect(`/admin/faq?error=${encodeURIComponent(result.error)}`);
    const id = result.id || String(formData.get("id") || "");
    redirect(id ? `/admin/faq?edit=${id}&saved=1` : "/admin/faq?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteFaq(formData);
    if (!result.ok) redirect(`/admin/faq?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/faq?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="FAQ"
        description="Answers visitors see on /faq and the homepage accordion."
        breadcrumbs={[{ label: "Content" }, { label: "FAQ" }]}
      />
      <FormSuccess message={params.saved ? "FAQ saved." : null} />
      <FormMessage message={params.error} />

      <div className="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="admin-panel h-fit overflow-hidden lg:sticky lg:top-20">
          <div className="border-b border-[var(--admin-border)] px-4 py-3">
            <p className="text-sm font-semibold">Questions</p>
            <p className="text-xs text-[var(--admin-muted)]">{items.length} items</p>
          </div>
          <ul className="divide-y divide-[var(--admin-border)]">
            {items.map((item, index) => {
              const selected = active?.id === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/admin/faq?edit=${item.id}`}
                    className={`flex gap-3 p-3.5 transition-colors ${
                      selected ? "bg-violet-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-800 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 text-sm font-semibold text-[var(--admin-text)]">
                        {item.question}
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <span
                          className={`admin-status-pill ${item.isPublished ? "is-live" : "is-draft"}`}
                        >
                          {item.isPublished ? "Live" : "Draft"}
                        </span>
                        <span className="text-[11px] text-[var(--admin-faint)]">#{item.order}</span>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-[var(--admin-border)] p-3">
            <a
              href="/admin/faq?edit=new"
              className={`flex h-11 items-center justify-center gap-1.5 rounded-lg border border-dashed text-sm font-semibold ${
                editId === "new"
                  ? "border-violet-400 bg-violet-50 text-violet-800"
                  : "border-[var(--admin-border-strong)] text-[var(--admin-muted)] hover:border-violet-300 hover:text-violet-700"
              }`}
            >
              <Plus className="size-4" />
              New question
            </a>
          </div>
        </aside>

        <div className="admin-panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--admin-border)] px-5 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <HelpCircle className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {active ? "Edit question" : "New question"}
                </h2>
                <p className="text-xs text-[var(--admin-muted)]">
                  Keep answers short and concrete — visitors skim these.
                </p>
              </div>
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

          <form action={save} className="space-y-5 p-5 sm:p-6">
            {active ? <input type="hidden" name="id" value={active.id} /> : null}
            <div>
              <label>Question</label>
              <input name="question" defaultValue={active?.question} required placeholder="What does 8-stage purification mean?" />
            </div>
            <div>
              <label>Answer</label>
              <textarea
                name="answer"
                rows={6}
                defaultValue={active?.answer}
                required
                placeholder="Clear, short answer…"
              />
            </div>
            <div className="admin-field-grid admin-field-grid-2">
              <div>
                <label>Display order</label>
                <input name="order" type="number" defaultValue={active?.order ?? items.length} />
              </div>
              <div className="flex items-end">
                <PublishCheckbox role={user.role} defaultChecked={active?.isPublished ?? true} />
              </div>
            </div>
            <div className="border-t border-[var(--admin-border)] pt-5">
              <button type="submit" className="admin-btn-primary min-w-[8rem]">
                {active ? "Save question" : "Create question"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
