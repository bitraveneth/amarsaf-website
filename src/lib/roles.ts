export type Role = "SUPERADMIN" | "ADMIN" | "STAFF";

export const ROLES = ["SUPERADMIN", "ADMIN", "STAFF"] as const;

export function canPublish(role: Role | undefined | null) {
  return role === "SUPERADMIN" || role === "ADMIN";
}

export function canEditSettings(role: Role | undefined | null) {
  return role === "SUPERADMIN" || role === "ADMIN";
}

export function canManageUsers(role: Role | undefined | null) {
  return role === "SUPERADMIN";
}

export function canDelete(role: Role | undefined | null) {
  return role === "SUPERADMIN" || role === "ADMIN";
}

export function canAccessAdmin(role: Role | undefined | null) {
  return role === "SUPERADMIN" || role === "ADMIN" || role === "STAFF";
}
