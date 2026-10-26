import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  HelpCircle,
  ImageIcon,
  LayoutTemplate,
  Newspaper,
  Package,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { canEditSettings, canManageUsers } from "@/lib/roles";

type ModuleCard = {
  href: string;
  label: string;
  body: string;
  count: number;
  icon: LucideIcon;
  tone: string;
};

export default async function AdminDashboardPage() {
  const user = await requireAdmin();

  const [products, news, faqs, jobs, media, slides, pages] = await Promise.all([
    prisma.product.count(),
    prisma.newsPost.count(),
    prisma.faqItem.count(),
    prisma.job.count(),
    prisma.media.count(),
    prisma.heroSlide.count(),
    prisma.page.count(),
  ]);

  const modules: ModuleCard[] = [
    {
      href: "/admin/hero",
      label: "Hero slides",
      body: "Homepage carousel — image, headline, CTAs, and order.",
      count: slides,
      icon: LayoutTemplate,
      tone: "from-violet-600 to-indigo-700",
    },
    {
      href: "/admin/products",
      label: "Products",
      body: "Pack shots, sizes, specs, and product detail pages.",
      count: products,
      icon: Package,
      tone: "from-fuchsia-600 to-violet-700",
    },
    {
      href: "/admin/news",
      label: "News",
      body: "Stories from the plant and delivery routes.",
      count: news,
      icon: Newspaper,
      tone: "from-sky-600 to-indigo-700",
    },
    {
      href: "/admin/media",
      label: "Media",
      body: "Upload, replace, and caption site images.",
      count: media,
      icon: ImageIcon,
      tone: "from-amber-500 to-orange-600",
    },
    {
      href: "/admin/pages",
      label: "Pages",
      body: "Section blocks for home and other pages.",
      count: pages,
      icon: FileText,
      tone: "from-emerald-600 to-teal-700",
    },
    {
      href: "/admin/faq",
      label: "FAQ",
      body: "Questions on the FAQ page and homepage.",
      count: faqs,
      icon: HelpCircle,
      tone: "from-rose-500 to-pink-600",
    },
    {
      href: "/admin/jobs",
      label: "Jobs",
      body: "Open roles on the careers page.",
      count: jobs,
      icon: Briefcase,
      tone: "from-slate-600 to-slate-800",
    },
  ];

  if (canEditSettings(user.role)) {
    modules.push({
      href: "/admin/settings",
      label: "Settings",
      body: "Company name, hotline, email, and SEO.",
      count: 1,
      icon: Settings,
      tone: "from-violet-700 to-purple-900",
    });
  }
  if (canManageUsers(user.role)) {
    modules.push({
      href: "/admin/users",
      label: "Users",
      body: "Create and manage CMS editor accounts.",
      count: 0,
      icon: Users,
      tone: "from-indigo-700 to-slate-900",
    });
  }

  return (
    <div>
      <AdminPageHeader
        title={`Welcome back${user.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        description="Choose a module. Saves refresh the live SAF site within seconds."
      />

      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="admin-panel group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden p-0 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(15_23_42/0.45)]"
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.tone}`}
                />
                <span className="flex flex-1 flex-col p-6 pt-7 sm:p-7 sm:pt-8">
                  <span className="flex items-start justify-between gap-4">
                    <span
                      className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-white shadow-lg shadow-violet-900/10`}
                    >
                      <Icon aria-hidden className="size-6" />
                    </span>
                    {item.href !== "/admin/settings" && item.href !== "/admin/users" ? (
                      <span className="text-4xl font-semibold tracking-tight tabular-nums text-[var(--admin-text)] sm:text-5xl">
                        {item.count}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[var(--admin-text)]">
                    {item.label}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--admin-muted)]">
                    {item.body}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--admin-accent)]">
                    Open
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
