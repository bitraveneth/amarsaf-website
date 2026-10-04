"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { aboutPages } from "@/lib/about";
import { cn } from "@/lib/utils";

export function AboutNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="About us"
      className="below-header sticky z-30 border-b border-ink/[0.07] bg-white/90 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="shell flex items-center gap-6">
        <p className="eyebrow hidden shrink-0 text-ink/45 lg:block">About us</p>
        <ul className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 py-2.5 [scrollbar-width:none] lg:justify-end">
          {aboutPages.map(({ href, label, icon: Icon }) => {
            const current = pathname === href;
            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                    current
                      ? "bg-purple text-white shadow-[0_10px_24px_-12px_rgb(109_43_213/0.9)]"
                      : "text-ink/70 hover:bg-lavender hover:text-ink",
                  )}
                >
                  <Icon aria-hidden className="size-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
