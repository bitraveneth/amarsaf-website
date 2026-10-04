import { CalendarDays, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { legalDocs, legalUpdated } from "@/lib/legal";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs.find((item) => item.slug === slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = legalDocs.find((item) => item.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageIntro eyebrow="Legal" title={doc.title} lede={doc.intro}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink/75 ring-1 ring-ink/10">
          <CalendarDays aria-hidden className="size-4 text-purple" />
          Last updated <time dateTime={legalUpdated.iso}>{legalUpdated.label}</time>
        </p>
      </PageIntro>

      <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="lg:sticky lg:top-32">
            <nav aria-label="Legal" className="rounded-[1.5rem] bg-haze p-2 ring-1 ring-ink/[0.05]">
              <ul className="grid gap-0.5">
                {legalDocs.map((item) => {
                  const current = item.slug === doc.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/legal/${item.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors",
                          current ? "bg-purple text-white" : "text-ink/75 hover:bg-white hover:text-ink",
                        )}
                      >
                        <FileText aria-hidden className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <p className="eyebrow px-3.5 text-ink/45">On this page</p>
              <ol className="mt-3 grid gap-1 border-l border-ink/10">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm text-ink/60 transition-colors hover:border-purple hover:text-ink"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <article className="lg:col-span-8 xl:col-span-7">
          {doc.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className={cn("py-8", index > 0 && "border-t border-ink/10")}
            >
              <h2 id={`${section.id}-title`} className="flex items-baseline gap-3 text-2xl text-ink">
                <span aria-hidden className="text-sm font-bold text-purple tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-4 grid gap-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink/75">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
