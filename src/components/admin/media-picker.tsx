"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { ImageIcon, Loader2, Upload } from "lucide-react";

type MediaItem = {
  id: string;
  url: string;
  alt: string;
  filename: string | null;
};

export function MediaPicker({
  name,
  media,
  defaultValue,
  label = "Image",
}: {
  name: string;
  media: MediaItem[];
  defaultValue?: string | null;
  label?: string;
}) {
  const [items, setItems] = useState(media);
  const [selectedId, setSelectedId] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const selected = items.find((m) => m.id === selectedId) ?? null;

  function onUpload(file: File | undefined) {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      const body = new FormData();
      body.set("file", file);
      body.set("alt", file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
      const res = await fetch("/api/admin/media", { method: "POST", body });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Upload failed");
        return;
      }
      const created = (await res.json()) as MediaItem;
      setItems((prev) => [created, ...prev]);
      setSelectedId(created.id);
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  return (
    <div className="space-y-3">
      <label className="!mb-0">{label}</label>
      <input type="hidden" name={name} value={selectedId} />

      <div className="overflow-hidden rounded-xl border border-[var(--admin-border)] bg-slate-50">
        <div className="relative aspect-[16/9] w-full bg-slate-100">
          {selected?.url ? (
            <Image
              src={selected.url}
              alt={selected.alt || ""}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              unoptimized={selected.url.startsWith("/")}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
              <ImageIcon className="size-8" />
              <span className="text-xs">No image selected</span>
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-[var(--admin-border)] bg-white p-3">
          <div>
            <label className="!text-[11px]">Choose from library</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={pending}
            >
              <option value="">— None —</option>
              {items.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.filename || m.alt || m.url}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="!text-[11px]">Or upload a new image</label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                disabled={pending}
                onChange={(e) => onUpload(e.target.files?.[0])}
                className="!min-h-0 flex-1 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-violet-800 hover:file:bg-violet-100"
              />
              <button
                type="button"
                data-variant="outline"
                disabled={pending}
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--admin-border-strong)] bg-white px-3 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60"
              >
                {pending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Upload className="size-3.5" />
                )}
                {pending ? "Uploading…" : "Browse"}
              </button>
            </div>
            {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
