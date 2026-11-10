import { redirect } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { requireAdmin, canDelete } from "@/lib/admin";
import { canEditSettings } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { deleteSocial, upsertSocial } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { SocialIcon } from "@/components/social-icon";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";

const PLATFORM_HINTS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
  { key: "x", label: "X" },
  { key: "tiktok", label: "TikTok" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "telegram", label: "Telegram" },
  { key: "threads", label: "Threads" },
] as const;

export default async function AdminSocialsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  if (!canEditSettings(user.role)) redirect("/admin");
  const params = await searchParams;
  const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

  async function save(formData: FormData) {
    "use server";
    const result = await upsertSocial(formData);
    if (!result.ok) redirect(`/admin/socials?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/socials?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteSocial(formData);
    if (!result.ok) redirect(`/admin/socials?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/socials?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="Socials"
        description="Links under Follow SAF in the footer and on the contact page. Add platforms or update URLs."
        breadcrumbs={[{ label: "Site" }, { label: "Socials" }]}
      />
      <FormSuccess message={params.saved ? "Social links saved." : null} />
      <FormMessage message={params.error} />

      <div className="mb-6 rounded-2xl border border-[var(--admin-border)] bg-white p-4 sm:p-5">
        <p className="text-sm font-semibold text-[var(--admin-text)]">Known icons</p>
        <p className="mt-1 text-xs text-[var(--admin-muted)]">
          Use these keys for matching icons. Any other key still works with a generic icon.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PLATFORM_HINTS.map((p) => (
            <li
              key={p.key}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--admin-border)] bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[var(--admin-muted)]"
            >
              <SocialIcon id={p.key} className="size-3.5" />
              {p.label}
              <code className="font-mono text-[10px] text-violet-700">{p.key}</code>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <article key={link.id} className="admin-panel overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--admin-border)] px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <SocialIcon id={link.key} className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{link.label}</p>
                  <p className="truncate text-xs text-[var(--admin-muted)]">{link.href}</p>
                </div>
              </div>
              <span className={`admin-status-pill ${link.isPublished ? "is-live" : "is-draft"}`}>
                {link.isPublished ? "Live" : "Hidden"}
              </span>
            </div>
            <form action={save} className="space-y-4 p-5">
              <input type="hidden" name="id" value={link.id} />
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Label</label>
                  <input name="label" defaultValue={link.label} required />
                </div>
                <div>
                  <label>Icon key</label>
                  <input name="key" defaultValue={link.key} required className="!font-mono" />
                </div>
                <div className="sm:col-span-2">
                  <label>URL</label>
                  <input name="href" type="url" defaultValue={link.href} required />
                </div>
                <div>
                  <label>Order</label>
                  <input name="order" type="number" defaultValue={link.order} />
                </div>
              </div>
              <PublishCheckbox role={user.role} defaultChecked={link.isPublished} />
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="admin-btn-primary">
                  Save link
                </button>
                {canDelete(user.role) ? (
                  <ConfirmSubmitButton
                    formAction={remove}
                    message={`Remove ${link.label}?`}
                    data-variant="destructive"
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </ConfirmSubmitButton>
                ) : null}
              </div>
            </form>
          </article>
        ))}
      </div>

      <form action={save} className="admin-panel mt-6 space-y-4 border-dashed border-violet-300 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Plus className="size-4" />
          </span>
          <div>
            <p className="text-base font-semibold">Add social link</p>
            <p className="text-sm text-[var(--admin-muted)]">
              Appears in Follow SAF once published.
            </p>
          </div>
        </div>
        <div className="admin-field-grid admin-field-grid-2">
          <div>
            <label>Label</label>
            <input name="label" required placeholder="TikTok" />
          </div>
          <div>
            <label>Icon key</label>
            <input name="key" placeholder="tiktok" className="!font-mono" />
          </div>
          <div className="sm:col-span-2">
            <label>URL</label>
            <input name="href" type="url" required placeholder="https://…" />
          </div>
          <div>
            <label>Order</label>
            <input name="order" type="number" defaultValue={links.length} />
          </div>
        </div>
        <PublishCheckbox role={user.role} defaultChecked />
        <button type="submit" className="admin-btn-primary">
          Create link
        </button>
      </form>
    </div>
  );
}
