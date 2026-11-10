"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function NoticeToggle({
  defaultEnabled,
  defaultText,
  defaultHref,
}: {
  defaultEnabled?: boolean;
  defaultText?: string;
  defaultHref?: string;
}) {
  const [enabled, setEnabled] = useState(Boolean(defaultEnabled));
  const [text, setText] = useState(defaultText ?? "");

  return (
    <div className="space-y-4">
      <input type="hidden" name="noticeEnabled" value={enabled ? "true" : "false"} />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--admin-border)] bg-white p-3 sm:p-3.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--admin-text)]">Public notice strip</p>
          <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
            {enabled
              ? "Live — visitors see this above the violet header."
              : "Off — the strip is hidden on the public site."}
          </p>
        </div>
        <div
          role="group"
          aria-label="Notice visibility"
          className="inline-flex rounded-xl bg-slate-100 p-1"
        >
          <button
            type="button"
            onClick={() => setEnabled(false)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-colors",
              !enabled
                ? "bg-white text-slate-700 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            <BellOff className="size-3.5" />
            Hidden
          </button>
          <button
            type="button"
            onClick={() => setEnabled(true)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-colors",
              enabled
                ? "bg-white text-violet-800 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            <Bell className="size-3.5" />
            Show
          </button>
        </div>
      </div>

      <div
        className={cn(
          "space-y-4 transition-opacity",
          enabled ? "opacity-100" : "opacity-55",
        )}
      >
        <div className="admin-field-grid admin-field-grid-2">
          <div className="sm:col-span-2">
            <label htmlFor="noticeText">Notice text</label>
            <input
              id="noticeText"
              name="noticeText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Free delivery this week in Gulshan and Banani"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="noticeHref">Optional link</label>
            <input
              id="noticeHref"
              name="noticeHref"
              defaultValue={defaultHref ?? ""}
              placeholder="/contact or https://…"
            />
            <p className="mt-1 text-xs text-[var(--admin-muted)]">
              If set, the whole notice becomes a clickable link.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-violet-200 bg-violet-700 text-white shadow-sm">
          <p className="px-4 py-2.5 text-center text-sm font-medium">
            {text.trim() || "Your notice text will appear here"}
            {defaultHref || text ? (
              <span className="ml-2 underline underline-offset-2 opacity-90">Learn more</span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
