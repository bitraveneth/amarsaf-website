import { redirect } from "next/navigation";
import { Shield, UserPlus, Users } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { canManageUsers, ROLES } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { createUser, updateUser } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const actor = await requireAdmin();
  if (!canManageUsers(actor.role)) redirect("/admin");
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  const params = await searchParams;

  async function create(formData: FormData) {
    "use server";
    const result = await createUser(formData);
    if (!result.ok) redirect(`/admin/users?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/users?saved=1");
  }

  async function save(formData: FormData) {
    "use server";
    const result = await updateUser(formData);
    if (!result.ok) redirect(`/admin/users?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/users?saved=1");
  }

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description="Who can sign in to SAF CMS. Only SUPERADMIN can manage accounts."
        breadcrumbs={[{ label: "System" }, { label: "Users" }]}
      />
      <FormSuccess message={params.saved ? "Users updated." : null} />
      <FormMessage message={params.error} />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total accounts", value: users.length },
          { label: "Active", value: users.filter((u) => u.active).length },
          {
            label: "Admins",
            value: users.filter((u) => u.role === "ADMIN" || u.role === "SUPERADMIN").length,
          },
        ].map((s) => (
          <div key={s.label} className="admin-panel px-5 py-4">
            <p className="text-3xl font-semibold tabular-nums">{s.value}</p>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="admin-panel h-fit overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[var(--admin-border)] px-5 py-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <UserPlus className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">Invite editor</h2>
              <p className="text-xs text-[var(--admin-muted)]">Create a new CMS login</p>
            </div>
          </div>
          <form action={create} className="space-y-4 p-5">
            <div>
              <label>Email</label>
              <input name="email" type="email" required placeholder="editor@safwater.com" />
            </div>
            <div>
              <label>Display name</label>
              <input name="name" placeholder="Optional" />
            </div>
            <div>
              <label>Role</label>
              <select name="role" defaultValue="STAFF">
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--admin-muted)]">
                STAFF = draft only · ADMIN = publish + settings · SUPERADMIN = users too
              </p>
            </div>
            <div>
              <label>Temporary password</label>
              <input name="password" type="password" required minLength={8} placeholder="Min. 8 characters" />
            </div>
            <label className="!mb-0 flex items-center gap-2 rounded-lg border border-[var(--admin-border)] bg-slate-50 px-3 py-2.5 text-sm font-medium !normal-case">
              <input type="checkbox" name="active" defaultChecked className="size-4 accent-violet-700" />
              Account active
            </label>
            <button type="submit" className="admin-btn-primary w-full">
              Create account
            </button>
          </form>
        </aside>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
            <Users className="size-4" />
            {users.length} account{users.length === 1 ? "" : "s"}
          </div>

          {users.map((u) => {
            const initials = (u.name || u.email)
              .split(/[\s@]+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0]?.toUpperCase())
              .join("");
            const isYou = u.id === actor.id;

            return (
              <article key={u.id} className="admin-panel overflow-hidden">
                <div className="flex flex-wrap items-center gap-4 border-b border-[var(--admin-border)] px-5 py-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-sm font-bold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold">{u.name || u.email}</h3>
                      {isYou ? (
                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-800">
                          You
                        </span>
                      ) : null}
                      <span
                        className={`admin-status-pill ${u.active ? "is-live" : "is-draft"}`}
                      >
                        {u.active ? "Active" : "Disabled"}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-[var(--admin-muted)]">{u.email}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                    <Shield className="size-3.5" />
                    {u.role}
                  </span>
                </div>

                <form action={save} className="grid gap-4 p-5 sm:grid-cols-2">
                  <input type="hidden" name="id" value={u.id} />
                  <div>
                    <label>Display name</label>
                    <input name="name" defaultValue={u.name ?? ""} />
                  </div>
                  <div>
                    <label>Role</label>
                    <select name="role" defaultValue={u.role} disabled={isYou}>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Reset password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Leave blank to keep current"
                      minLength={8}
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="!mb-0 flex w-full items-center gap-2 rounded-lg border border-[var(--admin-border)] bg-slate-50 px-3 py-2.5 text-sm font-medium !normal-case">
                      <input
                        type="checkbox"
                        name="active"
                        defaultChecked={u.active}
                        disabled={isYou}
                        className="size-4 accent-violet-700"
                      />
                      Active account
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="admin-btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
