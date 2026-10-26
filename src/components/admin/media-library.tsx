"use client";

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import {
  Check,
  Copy,
  ImageIcon,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaItem = {
  id: string;
  url: string;
  alt: string;
  filename: string | null;
  width: number | null;
  height: number | null;
  mimeType: string | null;
  sizeBytes: number | null;
  createdAt: string;
};

function formatBytes(n: number | null) {
  if (!n || n <= 0) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function MediaLibrary({
  media,
  canDelete,
  uploadAction,
  saveAltAction,
  deleteAction,
}: {
  media: MediaItem[];
  canDelete: boolean;
  uploadAction: (formData: FormData) => Promise<void>;
  saveAltAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(media[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return media;
    return media.filter((m) => {
      const hay = `${m.alt} ${m.filename ?? ""} ${m.url}`.toLowerCase();
      return hay.includes(q);
    });
  }, [media, query]);

  const selected = media.find((m) => m.id === selectedId) ?? null;

  function copyUrl(url: string) {
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="space-y-5">
      <div className="admin-panel overflow-hidden">
        <div className="border-b border-[var(--admin-border)] bg-gradient-to-br from-slate-50 to-white px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="admin-section-label !mb-1">Add new</p>
              <h2 className="text-lg font-semibold tracking-tight">Upload media</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Drop images into the library — used across hero, products, homepage, and news.
              </p>
            </div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">
              {media.length} item{media.length === 1 ? "" : "s"}
            </span>
          </div>

          <form
            action={uploadAction}
            encType="multipart/form-data"
            className="mt-5"
            onSubmit={() => startTransition(() => undefined)}
          >
            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--admin-border-strong)] bg-white px-6 py-10 text-center transition-colors hover:border-violet-400 hover:bg-violet-50/40">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-transform group-hover:scale-105">
                <Upload className="size-6" />
              </span>
              <span className="mt-4 text-sm font-semibold text-[var(--admin-text)]">
                Choose files or drag them here
              </span>
              <span className="mt-1 text-xs text-[var(--admin-muted)]">
                JPG, PNG, WebP, or SVG · alt text recommended
              </span>
              <input
                name="file"
                type="file"
                accept="image/*"
                required
                className="sr-only"
                onChange={(e) => {
                  const form = e.currentTarget.form;
                  if (form && e.currentTarget.files?.length) {
                    form.requestSubmit();
                  }
                }}
              />
            </label>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div className="min-w-[16rem] flex-1">
                <label htmlFor="upload-alt">Alt text</label>
                <input id="upload-alt" name="alt" placeholder="Describe the image for accessibility" />
              </div>
              <button type="submit" className="admin-btn-primary" disabled={pending}>
                {pending ? "Uploading…" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="admin-panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--admin-border)] px-4 py-3 sm:px-5">
          <div className="relative min-w-[14rem] flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--admin-faint)]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search media…"
              className="!pl-9"
              aria-label="Search media"
            />
          </div>
          <p className="text-xs font-medium text-[var(--admin-muted)]">
            {filtered.length} shown
            {selected ? " · 1 selected" : ""}
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-h-[28rem] border-b border-[var(--admin-border)] p-4 sm:p-5 lg:border-r lg:border-b-0">
            {filtered.length === 0 ? (
              <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--admin-border)] bg-slate-50/80 px-6 text-center">
                <ImageIcon className="size-10 text-[var(--admin-faint)]" />
                <p className="mt-3 text-sm font-semibold text-[var(--admin-text)]">
                  {media.length === 0 ? "No media yet" : "No matches"}
                </p>
                <p className="mt-1 max-w-xs text-sm text-[var(--admin-muted)]">
                  {media.length === 0
                    ? "Upload your first image above to start the library."
                    : "Try a different search term."}
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {filtered.map((item) => {
                  const active = item.id === selectedId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={cn(
                          "group relative aspect-square w-full overflow-hidden rounded-xl border bg-slate-100 text-left transition-[box-shadow,transform] hover:-translate-y-0.5",
                          active
                            ? "border-violet-500 shadow-[0_0_0_3px_rgb(91_33_182/0.25)]"
                            : "border-[var(--admin-border)] hover:border-violet-300",
                        )}
                      >
                        <Image
                          src={item.url}
                          alt={item.alt || item.filename || "Media"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="180px"
                          unoptimized={item.url.startsWith("/uploads")}
                        />
                        {active ? (
                          <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-violet-600 text-white shadow">
                            <Check className="size-3.5" />
                          </span>
                        ) : null}
                        <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2.5 pt-6 pb-2 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                          {item.filename ?? item.url.split("/").pop()}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <aside className="bg-slate-50/70 p-5">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="admin-section-label !mb-1">Attachment details</p>
                    <h3 className="text-base font-semibold tracking-tight">
                      {selected.filename ?? "Untitled"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    data-variant="ghost"
                    onClick={() => setSelectedId(null)}
                    className="flex size-8 items-center justify-center rounded-lg text-[var(--admin-muted)] hover:bg-white"
                    aria-label="Clear selection"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--admin-border)] bg-white">
                  <Image
                    src={selected.url}
                    alt={selected.alt || ""}
                    fill
                    className="object-contain p-2"
                    sizes="320px"
                    unoptimized={selected.url.startsWith("/uploads")}
                  />
                </div>

                <dl className="grid gap-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--admin-muted)]">Uploaded</dt>
                    <dd className="font-medium">{formatDate(selected.createdAt)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--admin-muted)]">File size</dt>
                    <dd className="font-medium">{formatBytes(selected.sizeBytes)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--admin-muted)]">Dimensions</dt>
                    <dd className="font-medium">
                      {selected.width && selected.height
                        ? `${selected.width} × ${selected.height}`
                        : "—"}
                    </dd>
                  </div>
                  {selected.mimeType ? (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--admin-muted)]">Type</dt>
                      <dd className="font-medium">{selected.mimeType}</dd>
                    </div>
                  ) : null}
                </dl>

                <div>
                  <label className="!mb-1.5">File URL</label>
                  <div className="flex gap-2">
                    <input readOnly value={selected.url} className="font-mono text-xs" />
                    <button
                      type="button"
                      data-variant="outline"
                      onClick={() => copyUrl(selected.url)}
                      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--admin-border-strong)] bg-white px-3 text-xs font-semibold hover:bg-slate-50"
                    >
                      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <form action={saveAltAction} className="space-y-3">
                  <input type="hidden" name="id" value={selected.id} />
                  <div>
                    <label htmlFor={`alt-${selected.id}`}>Alt text</label>
                    <textarea
                      id={`alt-${selected.id}`}
                      name="alt"
                      rows={3}
                      defaultValue={selected.alt}
                      key={selected.id}
                    />
                  </div>
                  <button type="submit" className="admin-btn-primary w-full">
                    Save details
                  </button>
                </form>

                {canDelete ? (
                  <form
                    action={deleteAction}
                    onSubmit={(e) => {
                      if (!confirm("Delete this media item? This cannot be undone.")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={selected.id} />
                    <button
                      type="submit"
                      data-variant="destructive"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                      Delete permanently
                    </button>
                  </form>
                ) : null}
              </div>
            ) : (
              <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
                <ImageIcon className="size-8 text-[var(--admin-faint)]" />
                <p className="mt-3 text-sm font-semibold">Select an item</p>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Click a thumbnail to edit alt text or copy the URL.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
