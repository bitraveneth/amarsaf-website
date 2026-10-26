import { redirect } from "next/navigation";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { createMedia, deleteMedia, updateMediaAlt } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { MediaLibrary } from "@/components/admin/media-library";

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  const params = await searchParams;

  async function upload(formData: FormData) {
    "use server";
    const result = await createMedia(formData);
    if (!result.ok) redirect(`/admin/media?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/media?saved=1");
  }

  async function saveAlt(formData: FormData) {
    "use server";
    const result = await updateMediaAlt(formData);
    if (!result.ok) redirect(`/admin/media?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/media?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteMedia(formData);
    if (!result.ok) redirect(`/admin/media?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/media?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="Media library"
        description="WordPress-style gallery — select a thumbnail to edit details, copy the URL, or delete."
        breadcrumbs={[{ label: "Content" }, { label: "Media" }]}
      />
      <FormSuccess message={params.saved ? "Media library updated." : null} />
      <FormMessage message={params.error} />

      <MediaLibrary
        media={media.map((m) => ({
          id: m.id,
          url: m.url,
          alt: m.alt,
          filename: m.filename,
          width: m.width,
          height: m.height,
          mimeType: m.mimeType,
          sizeBytes: m.sizeBytes,
          createdAt: m.createdAt.toISOString(),
        }))}
        canDelete={canDelete(user.role)}
        uploadAction={upload}
        saveAltAction={saveAlt}
        deleteAction={remove}
      />
    </div>
  );
}
