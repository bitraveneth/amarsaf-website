import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { adminSignOut } from "@/lib/admin-actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { canAccessAdmin } from "@/lib/roles";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || !canAccessAdmin(user.role)) {
    redirect("/admin/login");
  }

  const initials = (user.name || user.email || "A")
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex min-h-screen">
      <aside className="admin-sidebar sticky top-0 flex h-screen w-[17.5rem] shrink-0 flex-col bg-[var(--admin-sidebar)] text-slate-300 lg:w-72 xl:w-80">
        <div className="flex items-center gap-3.5 border-b border-white/8 px-4 py-5 lg:gap-4 lg:px-5 lg:py-6">
          <Link href="/admin" className="flex min-w-0 items-center gap-3.5 lg:gap-4">
            <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15 lg:size-12">
              <Image
                src="/brand/saf-logomark.svg"
                alt=""
                width={36}
                height={36}
                className="size-8 lg:size-9"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold tracking-tight text-white lg:text-lg">
                SAF CMS
              </span>
              <span className="mt-0.5 block text-xs text-slate-400 lg:text-[0.8125rem]">
                Content studio
              </span>
            </span>
          </Link>
        </div>

        <AdminNav role={user.role} />

        <div className="mt-auto space-y-2 border-t border-white/8 p-3 lg:p-4">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
          >
            View site
            <ExternalLink aria-hidden className="size-4 opacity-70" />
          </Link>
          <div className="flex items-center gap-3 rounded-xl bg-white/6 px-3 py-2.5 lg:px-3.5 lg:py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white lg:size-11 lg:text-sm">
              {initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white lg:text-[0.9375rem]">
                {user.name || user.email}
              </span>
              <span className="mt-0.5 block text-[11px] font-semibold tracking-wide text-slate-400 uppercase lg:text-xs">
                {user.role}
              </span>
            </span>
            <form action={adminSignOut}>
              <button
                type="submit"
                title="Sign out"
                aria-label="Sign out"
                data-variant="ghost"
                className="flex size-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut aria-hidden className="size-5" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[90rem] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
