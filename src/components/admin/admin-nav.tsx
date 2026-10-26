"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Contact,
  FileText,
  HelpCircle,
  Home,
  ImageIcon,
  LayoutDashboard,
  LayoutTemplate,
  Newspaper,
  Package,
  Scale,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/roles";
import { canEditSettings, canManageUsers } from "@/lib/roles";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  adminOnly?: boolean;
  superOnly?: boolean;
};

type NavGroup = { label: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/hero", label: "Hero", icon: LayoutTemplate },
      { href: "/admin/home", label: "Homepage", icon: Home },
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/news", label: "News", icon: Newspaper },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
      { href: "/admin/pages", label: "Pages", icon: FileText },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/legal", label: "Legal", icon: Scale },
      { href: "/admin/contact", label: "Contact", icon: Contact },
      { href: "/admin/settings", label: "Settings", icon: Settings, adminOnly: true },
    ],
  },
  {
    label: "System",
    items: [{ href: "/admin/users", label: "Users", icon: Users, superOnly: true }],
  },
];

export function AdminNav({ role }: { role: Role }) {
  const pathname = usePathname();

  return (
    <nav className="admin-sidebar-nav flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-5 lg:gap-7 lg:px-4 lg:py-6">
      {GROUPS.map((group) => {
        const items = group.items.filter((item) => {
          if (item.adminOnly && !canEditSettings(role)) return false;
          if (item.superOnly && !canManageUsers(role)) return false;
          return true;
        });
        if (items.length === 0) return null;

        return (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase lg:mb-2.5 lg:text-xs">
              {group.label}
            </p>
            <ul className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] font-medium transition-colors lg:gap-3.5 lg:px-3.5 lg:py-3 lg:text-base",
                        active
                          ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"
                          : "text-slate-400 hover:bg-white/6 hover:text-slate-100",
                      )}
                    >
                      <Icon
                        aria-hidden
                        className={cn(
                          "size-5 shrink-0 lg:size-[1.35rem]",
                          active ? "text-violet-300" : "text-slate-500 group-hover:text-slate-300",
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
