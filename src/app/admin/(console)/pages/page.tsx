import Link from "next/link";
import { ArrowRight, FileText, LayoutTemplate } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

const PAGE_BLURBS: Record<string, string> = {
  home: "Hero is separate — edit homepage section copy here (ways, know what you drink, etc.).",
  about: "About overview sections.",
  products: "Products landing page sections.",
  news: "News landing page sections.",
  faq: "FAQ page intro sections (Q&A list is under FAQ).",
  careers: "Careers page sections (job list is under Jobs).",
  contact: "Contact page sections (form labels are under Contact).",
};

export default async function AdminPagesListPage() {
  await requireAdmin();
  const pages = await prisma.page.findMany({
    orderBy: { slug: "asc" },
    include: { _count: { select: { sections: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Pages"
        description="Editable section blocks that power marketing pages. Open a page to edit its sections."
        breadcrumbs={[{ label: "Content" }, { label: "Pages" }]}
      />

      <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-950">
        Tip: homepage carousel lives in <Link href="/admin/hero" className="font-semibold underline">Hero</Link>.
        Products, news, FAQ items, and jobs have their own modules.
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              href={`/admin/pages/${page.id}`}
              className="admin-panel group flex h-full min-h-[10rem] flex-col p-0 transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="flex items-start justify-between gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    {page.slug === "home" ? (
                      <LayoutTemplate className="size-5" />
                    ) : (
                      <FileText className="size-5" />
                    )}
                  </span>
                  <span
                    className={`admin-status-pill ${page.isPublished ? "is-live" : "is-draft"}`}
                  >
                    {page.isPublished ? "Live" : "Draft"}
                  </span>
                </span>
                <span className="mt-4 text-lg font-semibold tracking-tight">{page.title}</span>
                <span className="mt-1 font-mono text-xs text-[var(--admin-faint)]">/{page.slug}</span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-[var(--admin-muted)]">
                  {PAGE_BLURBS[page.slug] || "Edit SEO and section blocks for this page."}
                </span>
                <span className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-[var(--admin-muted)]">
                    {page._count.sections} section{page._count.sections === 1 ? "" : "s"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[var(--admin-accent)]">
                    Edit
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
