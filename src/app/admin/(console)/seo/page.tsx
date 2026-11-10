import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { canEditSettings } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { updateSiteSeo } from "@/lib/admin-actions";
import { SeoFields } from "@/components/admin/seo-fields";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

export default async function AdminSeoPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  if (!canEditSettings(user.role)) redirect("/admin");
  const params = await searchParams;
  const [settings, media] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  async function save(formData: FormData) {
    "use server";
    const result = await updateSiteSeo(formData);
    if (!result.ok) redirect(`/admin/seo?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/seo?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="SEO"
        description="Control how SAF appears in Google: homepage listing, page title pattern, social image, and indexing."
        breadcrumbs={[{ label: "Site" }, { label: "SEO" }]}
      />
      <FormSuccess message={params.saved ? "SEO settings saved." : null} />
      <FormMessage message={params.error} />

      <form action={save} className="max-w-3xl space-y-5">
        <SeoFields
          mode="site"
          media={media}
          fallbackTitle="SAF Packaged Drinking Water | Simply Pure Hydration Bangladesh"
          fallbackDescription="Order SAF packaged drinking water online. 8-stage purified water with essential minerals for home and office delivery across Dhaka."
          values={{
            seoTitle: settings?.seoTitle,
            seoDescription: settings?.seoDescription,
            seoKeywords: settings?.seoKeywords,
            titleTemplate: settings?.titleTemplate,
            ogImageId: settings?.ogImageId,
            allowIndexing: settings?.allowIndexing,
          }}
        />
        <button type="submit" className="admin-btn-primary min-w-[10rem]">
          Save SEO
        </button>
      </form>
    </div>
  );
}
