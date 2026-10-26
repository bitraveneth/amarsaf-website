import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { canEditSettings } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { updateSettings } from "@/lib/admin-actions";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  if (!canEditSettings(user.role)) redirect("/admin");
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const params = await searchParams;

  async function save(formData: FormData) {
    "use server";
    const result = await updateSettings(formData);
    if (!result.ok) {
      redirect(`/admin/settings?error=${encodeURIComponent(result.error)}`);
    }
    redirect("/admin/settings?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="Site settings"
        description="Company info, top bar notice, contact details, and SEO defaults."
        breadcrumbs={[{ label: "Site" }, { label: "Settings" }]}
      />
      <FormSuccess message={params.saved ? "Settings saved." : null} />
      <FormMessage message={params.error} />

      <form action={save} className="space-y-6">
        <div className="admin-panel space-y-4 p-5 sm:p-6">
          <p className="admin-section-label">Top bar notice</p>
          <p className="text-sm text-[var(--admin-muted)]">
            Thin banner above the site navigation — promos, delivery updates, or temporary alerts.
          </p>
          <label className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-slate-50/80 px-4 py-3 text-sm font-medium">
            <input
              type="checkbox"
              name="noticeEnabled"
              value="true"
              defaultChecked={settings?.noticeEnabled ?? false}
              className="size-4 rounded border-slate-300 text-violet-700"
            />
            Show notice on the public site
          </label>
          <div className="admin-field-grid admin-field-grid-2">
            <div className="sm:col-span-2">
              <label htmlFor="noticeText">Notice text</label>
              <input
                id="noticeText"
                name="noticeText"
                defaultValue={settings?.noticeText ?? ""}
                placeholder="e.g. Free delivery this week in Gulshan and Banani"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="noticeHref">Optional link</label>
              <input
                id="noticeHref"
                name="noticeHref"
                defaultValue={settings?.noticeHref ?? ""}
                placeholder="/contact or https://…"
              />
            </div>
          </div>
        </div>

        <div className="admin-panel space-y-4 p-5 sm:p-6">
          <p className="admin-section-label">Company</p>
          <div className="admin-field-grid admin-field-grid-2">
            <div>
              <label htmlFor="companyName">Company name</label>
              <input
                id="companyName"
                name="companyName"
                defaultValue={settings?.companyName ?? ""}
                required
              />
            </div>
            <div>
              <label htmlFor="tagline">Tagline</label>
              <input id="tagline" name="tagline" defaultValue={settings?.tagline ?? ""} required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addressLines">Address (one line per row)</label>
              <textarea
                id="addressLines"
                name="addressLines"
                rows={4}
                defaultValue={(settings?.addressLines ?? []).join("\n")}
              />
            </div>
            <div>
              <label htmlFor="hotline">Hotline</label>
              <input id="hotline" name="hotline" defaultValue={settings?.hotline ?? ""} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={settings?.email ?? ""}
                required
              />
            </div>
          </div>
        </div>

        <div className="admin-panel space-y-4 p-5 sm:p-6">
          <p className="admin-section-label">SEO defaults</p>
          <div className="admin-field-grid admin-field-grid-2">
            <div className="sm:col-span-2">
              <label htmlFor="seoTitle">SEO title</label>
              <input id="seoTitle" name="seoTitle" defaultValue={settings?.seoTitle ?? ""} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="seoDescription">SEO description</label>
              <textarea
                id="seoDescription"
                name="seoDescription"
                rows={3}
                defaultValue={settings?.seoDescription ?? ""}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="admin-btn-primary min-w-[10rem]">
          Save settings
        </button>
      </form>
    </div>
  );
}
