import { auth } from "@/lib/auth";
import {
  canAccessAdmin,
  canDelete,
  canEditSettings,
  canManageUsers,
  canPublish,
  type Role,
} from "@/lib/roles";

export type AdminSession = {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
};

export async function requireAdmin(): Promise<AdminSession> {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !canAccessAdmin(user.role)) {
    throw new Error("UNAUTHORIZED");
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function requireRole(
  check: (role: Role) => boolean,
): Promise<AdminSession> {
  const user = await requireAdmin();
  if (!check(user.role)) throw new Error("FORBIDDEN");
  return user;
}

export { canDelete, canEditSettings, canManageUsers, canPublish };
