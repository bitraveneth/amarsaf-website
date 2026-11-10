"use client";

import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { MediaPicker } from "@/components/admin/media-picker";
import { cn } from "@/lib/utils";

type MediaItem = {
  id: string;
  url: string;
  alt: string;
  filename: string | null;
};

export type SeoFieldValues = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageId?: string | null;
  noIndex?: boolean;
  titleTemplate?: string | null;
  allowIndexing?: boolean;
};

const TEMPLATE_PRESETS = [
  { label: "Brand after", value: "%s | SAF Water" },
  { label: "Brand before", value: "SAF Water | %s" },
  { label: "Dash", value: "%s — SAF" },
  { label: "Page only", value: "%s" },
] as const;

const TEMPLATE_EXAMPLES = ["About Us", "Products", "FAQ"] as const;

function countTone(length: number, limit: number) {
  if (length === 0) return "text-[var(--admin-faint)]";
  if (length <= limit) return "text-emerald-700";
  return "text-amber-700";
}

function applyTemplate(template: string, pageTitle: string) {
  const pattern = template.trim() || "%s | SAF Water";
  return pattern.includes("%s") ? pattern.replace(/%s/g, pageTitle) : `${pageTitle} | ${pattern}`;
}

function GooglePreview({
  host,
  title,
  description,
}: {
  host: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[var(--admin-muted)]">
        <Search className="size-3.5 text-violet-600" />
        Google preview
      </div>
      <div className="rounded-xl bg-[#f8f9fa] px-4 py-3.5">
        <p className="truncate text-xs text-[#202124]">{host}</p>
        <p className="mt-1 text-xl leading-snug font-normal text-[#1a0dab]">{title || "Page title"}</p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#4d5156]">
          {description || "Meta description"}
        </p>
      </div>
    </div>
  );
}

export function SeoFields({
  values,
  media,
  fallbackTitle,
  fallbackDescription,
  mode = "entry",
  siteHost = "safwater.com",
}: {
  values?: SeoFieldValues | null;
  media: MediaItem[];
  fallbackTitle: string;
  fallbackDescription: string;
  mode?: "entry" | "site";
  siteHost?: string;
}) {
  const [title, setTitle] = useState(values?.seoTitle ?? "");
  const [description, setDescription] = useState(values?.seoDescription ?? "");
  const [template, setTemplate] = useState(values?.titleTemplate ?? "%s | SAF Water");
  const [noIndex, setNoIndex] = useState(Boolean(values?.noIndex));
  const [allowIndexing, setAllowIndexing] = useState(values?.allowIndexing !== false);

  const previewTitle = title.trim() || fallbackTitle;
  const previewDescription = description.trim() || fallbackDescription;
  const templateExamples = useMemo(
    () => TEMPLATE_EXAMPLES.map((page) => ({ page, result: applyTemplate(template, page) })),
    [template],
  );

  if (mode === "site") {
    return (
      <div className="space-y-5">
        <section className="admin-panel overflow-hidden">
          <div className="border-b border-[var(--admin-border)] px-5 py-4 sm:px-6">
            <p className="text-base font-semibold tracking-tight">Homepage search listing</p>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              What Google shows for the homepage. Keep the title near 60 characters and the
              description near 160.
            </p>
          </div>
          <div className="space-y-5 p-5 sm:p-6">
            <GooglePreview host={siteHost} title={previewTitle} description={previewDescription} />
            <div className="admin-field-grid admin-field-grid-2">
              <div className="sm:col-span-2">
                <label htmlFor="seoTitle" className="flex items-center justify-between">
                  SEO title
                  <span className={`text-[11px] font-semibold ${countTone(previewTitle.length, 60)}`}>
                    {previewTitle.length}/60
                  </span>
                </label>
                <input
                  id="seoTitle"
                  name="seoTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={fallbackTitle}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="seoDescription" className="flex items-center justify-between">
                  Meta description
                  <span
                    className={`text-[11px] font-semibold ${countTone(previewDescription.length, 160)}`}
                  >
                    {previewDescription.length}/160
                  </span>
                </label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={fallbackDescription}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="seoKeywords">Keywords</label>
                <input
                  id="seoKeywords"
                  name="seoKeywords"
                  defaultValue={values?.seoKeywords ?? ""}
                  placeholder="drinking water, Dhaka, SAF"
                />
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Optional. Separate with commas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-panel overflow-hidden">
          <div className="border-b border-[var(--admin-border)] px-5 py-4 sm:px-6">
            <p className="text-base font-semibold tracking-tight">Title template</p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--admin-muted)]">
              Pattern for every other page. Use <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] font-semibold text-violet-800">%s</code> where the page name should go. Homepage uses the SEO title above instead.
            </p>
          </div>
          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {TEMPLATE_PRESETS.map((preset) => {
                const active = template === preset.value;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    data-variant="ghost"
                    onClick={() => setTemplate(preset.value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      active
                        ? "border-violet-300 bg-violet-50 text-violet-800"
                        : "border-[var(--admin-border-strong)] bg-white text-[var(--admin-muted)] hover:border-violet-200 hover:text-violet-800",
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div>
              <label htmlFor="titleTemplate">Template</label>
              <input
                id="titleTemplate"
                name="titleTemplate"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                placeholder="%s | SAF Water"
                className="!font-mono"
              />
            </div>

            <div className="rounded-2xl border border-[var(--admin-border)] bg-slate-50/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[var(--admin-muted)]">
                <Eye className="size-3.5 text-violet-600" />
                Live examples
              </div>
              <ul className="space-y-2.5">
                {templateExamples.map((example) => (
                  <li
                    key={example.page}
                    className="grid gap-1 rounded-xl border border-[var(--admin-border)] bg-white px-3.5 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center sm:gap-4"
                  >
                    <span className="text-xs font-semibold tracking-wide text-[var(--admin-faint)] uppercase">
                      {example.page}
                    </span>
                    <span className="truncate text-sm font-medium text-[var(--admin-text)]">
                      {example.result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="admin-panel space-y-4 p-5 sm:p-6">
          <div>
            <p className="text-base font-semibold tracking-tight">Social & indexing</p>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              Default image for link previews, and whether the public site can appear in Google.
            </p>
          </div>
          <MediaPicker
            name="ogImageId"
            media={media}
            defaultValue={values?.ogImageId}
            label="Default social image"
          />
          <label className="flex items-start gap-3 rounded-xl border border-[var(--admin-border)] bg-slate-50/80 px-4 py-3.5 text-sm">
            <input type="hidden" name="allowIndexing" value={allowIndexing ? "true" : "false"} />
            <input
              type="checkbox"
              checked={allowIndexing}
              onChange={(e) => setAllowIndexing(e.target.checked)}
              className="mt-0.5 size-4 rounded border-slate-300 text-violet-700"
            />
            <span>
              <span className="block font-semibold text-[var(--admin-text)]">
                Allow search engines to index the site
              </span>
              <span className="mt-0.5 block text-[var(--admin-muted)]">
                Turn off while the site is private. This also empties the sitemap.
              </span>
            </span>
          </label>
        </section>
      </div>
    );
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-slate-50/70 p-4 sm:p-5">
      <div>
        <p className="admin-section-label !mb-1">Search appearance</p>
        <p className="text-sm text-[var(--admin-muted)]">
          Title, description, and keywords used in Google and social previews.
        </p>
      </div>

      <GooglePreview host={siteHost} title={previewTitle} description={previewDescription} />

      <div className="admin-field-grid admin-field-grid-2">
        <div className="sm:col-span-2">
          <label htmlFor="seoTitle" className="flex items-center justify-between">
            SEO title
            <span className={`text-[11px] font-semibold ${countTone(previewTitle.length, 60)}`}>
              {previewTitle.length}/60
            </span>
          </label>
          <input
            id="seoTitle"
            name="seoTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={fallbackTitle}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="seoDescription" className="flex items-center justify-between">
            Meta description
            <span className={`text-[11px] font-semibold ${countTone(previewDescription.length, 160)}`}>
              {previewDescription.length}/160
            </span>
          </label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={fallbackDescription}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="seoKeywords">Keywords</label>
          <input
            id="seoKeywords"
            name="seoKeywords"
            defaultValue={values?.seoKeywords ?? ""}
            placeholder="drinking water, Dhaka, SAF"
          />
          <p className="mt-1 text-xs text-[var(--admin-muted)]">Comma-separated.</p>
        </div>
        <div>
          <label htmlFor="ogTitle">Social title</label>
          <input
            id="ogTitle"
            name="ogTitle"
            defaultValue={values?.ogTitle ?? ""}
            placeholder="Same as SEO title"
          />
        </div>
        <div>
          <label htmlFor="ogDescription">Social description</label>
          <input
            id="ogDescription"
            name="ogDescription"
            defaultValue={values?.ogDescription ?? ""}
            placeholder="Same as meta description"
          />
        </div>
      </div>

      <MediaPicker
        name="ogImageId"
        media={media}
        defaultValue={values?.ogImageId}
        label="Social image"
      />

      <label className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3 text-sm font-medium">
        <input type="hidden" name="noIndex" value={noIndex ? "true" : "false"} />
        <input
          type="checkbox"
          checked={noIndex}
          onChange={(e) => setNoIndex(e.target.checked)}
          className="size-4 rounded border-slate-300 text-violet-700"
        />
        Hide this page from search engines (noindex)
      </label>
    </section>
  );
}
