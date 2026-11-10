import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { canEditSettings } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { updateSettings } from "@/lib/admin-actions";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NoticeToggle } from "@/components/admin/notice-toggle";

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
        description="Company info, violet header strip, footer bar, top notice, and contact details."
        breadcrumbs={[{ label: "Site" }, { label: "Settings" }]}
      />
      <FormSuccess message={params.saved ? "Settings saved." : null} />
      <FormMessage message={params.error} />

      <form action={save} className="space-y-6">
        <div className="admin-panel space-y-4 p-5 sm:p-6">
          <p className="admin-section-label">Header top bar</p>
          <p className="text-sm text-[var(--admin-muted)]">
            The three lines on the violet strip above the main navigation (desktop). Hotline also
            shows in the mobile menu and footer.
          </p>
          <div className="admin-field-grid admin-field-grid-2">
            <div className="sm:col-span-2">
              <label htmlFor="headerDelivery">Delivery line</label>
              <input
                id="headerDelivery"
                name="headerDelivery"
                defaultValue={
                  settings?.headerDelivery ?? "Home and office delivery across Dhaka"
                }
                placeholder="Home and office delivery across Dhaka"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="headerCert">Certification line</label>
              <input
                id="headerCert"
                name="headerCert"
                defaultValue={settings?.headerCert ?? "BSTI & ISO 22000 certified"}
                placeholder="BSTI & ISO 22000 certified"
                required
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
          <div className="rounded-xl border border-[var(--admin-border)] bg-violet-950 px-4 py-3 text-sm text-white/80">
            <p className="text-[11px] font-semibold tracking-wide text-violet-200 uppercase">
              Preview
            </p>
            <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[0.8125rem]">
              <span>{settings?.headerDelivery ?? "Home and office delivery across Dhaka"}</span>
              <span>{settings?.headerCert ?? "BSTI & ISO 22000 certified"}</span>
              <span>
                Hotline{" "}
                <span className="font-semibold text-white tabular-nums">
                  {settings?.hotline ?? "+880 96XX-XXXXXX"}
                </span>
              </span>
            </p>
          </div>
        </div>

        <div className="admin-panel overflow-hidden">
          <div className="border-b border-[var(--admin-border)] px-5 py-4 sm:px-6">
            <p className="text-base font-semibold tracking-tight">Top bar notice</p>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              Optional promo strip above the violet header — separate from the three header lines.
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <NoticeToggle
              defaultEnabled={settings?.noticeEnabled}
              defaultText={settings?.noticeText ?? ""}
              defaultHref={settings?.noticeHref ?? ""}
            />
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
          </div>
        </div>

        <div className="admin-panel space-y-4 p-5 sm:p-6">
          <p className="admin-section-label">Footer bar</p>
          <p className="text-sm text-[var(--admin-muted)]">
            Copyright line and certification badges at the bottom of the public site footer.
          </p>
          <div className="admin-field-grid admin-field-grid-2">
            <div className="sm:col-span-2">
              <label htmlFor="footerCopyright">Copyright</label>
              <input
                id="footerCopyright"
                name="footerCopyright"
                defaultValue={
                  settings?.footerCopyright ??
                  `© ${new Date().getFullYear()} ${settings?.companyName ?? "SAF Food & Beverage Ltd."}`
                }
                placeholder="© 2026 SAF Food & Beverage Ltd."
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="footerCertifications">
                Certifications (one badge per line)
              </label>
              <textarea
                id="footerCertifications"
                name="footerCertifications"
                rows={4}
                defaultValue={(
                  settings?.footerCertifications?.length
                    ? settings.footerCertifications
                    : [
                        "BSTI BDS 1240:2001",
                        "ISO 22000",
                        "HACCP",
                        "Halal",
                      ]
                ).join("\n")}
                placeholder={"BSTI BDS 1240:2001\nISO 22000\nHACCP\nHalal"}
              />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--admin-border)] bg-[#1a1030] px-4 py-3 text-xs text-white/60">
            <p className="text-[11px] font-semibold tracking-wide text-violet-200 uppercase">
              Preview
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>
                {settings?.footerCopyright ??
                  `© ${new Date().getFullYear()} ${settings?.companyName ?? "SAF Food & Beverage Ltd."}`}
              </p>
              <ul className="flex flex-wrap gap-2">
                {(settings?.footerCertifications?.length
                  ? settings.footerCertifications
                  : ["BSTI BDS 1240:2001", "ISO 22000", "HACCP", "Halal"]
                ).map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white/[0.06] px-3 py-1.5 font-semibold text-white/85 ring-1 ring-white/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
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
