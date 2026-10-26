import { cn } from "@/lib/utils";

export function AdminPanel({
  children,
  className,
  title,
  description,
  actions,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className={cn("admin-panel overflow-hidden", className)}>
      {(title || actions) && (
        <div className="admin-panel-header">
          <div className="min-w-0">
            {title ? <h2 className="text-sm font-semibold text-[var(--admin-text)]">{title}</h2> : null}
            {description ? (
              <p className="mt-0.5 text-xs text-[var(--admin-muted)]">{description}</p>
            ) : null}
          </div>
          {actions}
        </div>
      )}
      <div className="admin-panel-body">{children}</div>
    </section>
  );
}
