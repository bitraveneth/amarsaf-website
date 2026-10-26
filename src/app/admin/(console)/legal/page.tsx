import { redirect } from "next/navigation";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { deleteLegal, upsertLegal } from "@/lib/admin-actions";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  LegalDocsEditor,
  type LegalDocDraft,
  type LegalSectionDraft,
} from "@/components/admin/legal-docs-editor";

function asSections(value: unknown): LegalSectionDraft[] {
  if (!Array.isArray(value)) return [];
  return value.map((raw, index) => {
    const item = (raw ?? {}) as Record<string, unknown>;
    const body = Array.isArray(item.body)
      ? item.body.map(String)
      : typeof item.body === "string"
        ? [item.body]
        : [""];
    const list = Array.isArray(item.list) ? item.list.map(String) : undefined;
    return {
      id: String(item.id ?? `section-${index + 1}`),
      title: String(item.title ?? `Section ${index + 1}`),
      body,
      list,
    };
  });
}

export default async function AdminLegalPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  const docs = await prisma.legalDoc.findMany({ orderBy: { order: "asc" } });
  const params = await searchParams;

  async function save(formData: FormData) {
    "use server";
    const result = await upsertLegal(formData);
    if (!result.ok) redirect(`/admin/legal?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/legal?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteLegal(formData);
    if (!result.ok) redirect(`/admin/legal?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/legal?saved=1");
  }

  const drafts: LegalDocDraft[] = docs.map((doc) => ({
    id: doc.id,
    slug: doc.slug,
    label: doc.label,
    title: doc.title,
    description: doc.description,
    intro: doc.intro,
    sections: asSections(doc.sections),
    updatedLabel: doc.updatedLabel,
    updatedIso: doc.updatedIso,
    order: doc.order,
    isPublished: doc.isPublished,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Legal"
        description="Open a document, then open a section to edit its title, paragraphs, and bullets — no JSON."
        breadcrumbs={[{ label: "Site" }, { label: "Legal" }]}
      />
      <FormSuccess message={params.saved ? "Legal document saved." : null} />
      <FormMessage message={params.error} />

      <LegalDocsEditor
        docs={drafts}
        role={user.role}
        canDelete={canDelete(user.role)}
        saveAction={save}
        deleteAction={remove}
      />
    </div>
  );
}
