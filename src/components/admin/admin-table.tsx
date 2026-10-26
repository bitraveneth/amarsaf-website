import { cn } from "@/lib/utils";

export function AdminTable({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="admin-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className={cn("w-full min-w-[640px] text-left text-sm", className)}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function AdminTh({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <th
      className={cn(
        "border-b border-[var(--admin-border)] bg-slate-50/80 px-4 py-3 text-[11px] font-semibold tracking-[0.06em] text-[var(--admin-muted)] uppercase",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function AdminTd({
  className,
  children,
  colSpan,
}: {
  className?: string;
  children: React.ReactNode;
  colSpan?: number;
}) {
  return (
    <td
      className={cn(
        "border-b border-[var(--admin-border)] px-4 py-3.5 align-middle text-[var(--admin-text)] last:border-b-0",
        className,
      )}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}
