import Link from "next/link";

export function AdminPageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-[var(--admin-muted)]">
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden className="text-[var(--admin-faint)]">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[var(--admin-accent)]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--admin-text)]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] text-[var(--admin-text)] lg:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--admin-muted)] lg:text-[0.9375rem]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
