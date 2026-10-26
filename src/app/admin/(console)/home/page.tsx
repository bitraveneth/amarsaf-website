import Link from "next/link";
import { ArrowRight, Droplets, FlaskConical, House, LayoutGrid } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

const MODULES = [
  {
    key: "purity-measured",
    label: "Purity, measured",
    body: "Stat cards under the hero — “Every bottle, by the numbers.”",
    icon: LayoutGrid,
  },
  {
    key: "why-saf",
    label: "Why SAF",
    body: "Bento cards — Pure by science, Balanced hydration, Certified, Sustainable packs.",
    icon: FlaskConical,
  },
  {
    key: "know-what-you-drink",
    label: "Know what you drink",
    body: "Dark mineral section — headline, bullets, and image.",
    icon: Droplets,
  },
  {
    key: "ways",
    label: "Get SAF your way",
    body: "Homes / offices / shops cards with images and CTAs.",
    icon: House,
  },
] as const;

export default async function AdminHomeHubPage() {
  await requireAdmin();
  const home = await prisma.page.findUnique({
    where: { slug: "home" },
    include: {
      sections: { include: { _count: { select: { blocks: true } } } },
    },
  });

  const byKey = new Map(home?.sections.map((s) => [s.key, s]) ?? []);

  return (
    <div>
      <AdminPageHeader
        title="Homepage"
        description="Edit the marketing sections below the hero. Hero slides are under Hero."
        breadcrumbs={[{ label: "Content" }, { label: "Homepage" }]}
        actions={
          <Link
            href="/admin/hero"
            className="inline-flex h-10 items-center rounded-lg border border-[var(--admin-border-strong)] bg-white px-4 text-sm font-semibold hover:bg-slate-50"
          >
            Edit hero slides
          </Link>
        }
      />

      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        Looking for a thin banner above the nav? That is the{" "}
        <Link href="/admin/settings" className="font-semibold underline">
          top bar notice in Settings
        </Link>
        .
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const section = byKey.get(mod.key);
          return (
            <li key={mod.key}>
              <Link
                href={`/admin/home/${mod.key}`}
                className="admin-panel group flex h-full min-h-[11rem] flex-col p-6 transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={`admin-status-pill ${section ? "is-live" : "is-draft"}`}
                  >
                    {section ? `${section._count.blocks} fields` : "Not seeded"}
                  </span>
                </span>
                <span className="mt-4 text-xl font-semibold tracking-tight">{mod.label}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--admin-muted)]">
                  {mod.body}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--admin-accent)]">
                  Edit section
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
