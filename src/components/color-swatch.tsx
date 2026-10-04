"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function toRgb(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function isLight(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return r * 0.299 + g * 0.587 + b * 0.114 > 170;
}

export function ColorSwatch({ name, hex, group }: { name: string; hex: string; group: string }) {
  const [copied, setCopied] = useState(false);
  const light = isLight(hex);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] bg-white text-left ring-1 ring-ink/[0.07] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgb(23_10_53/0.5)]"
    >
      <span
        className={cn(
          "relative flex aspect-[4/3] w-full items-start justify-between p-4",
          light ? "text-ink" : "text-white",
          light && "ring-1 ring-ink/[0.06] ring-inset",
        )}
        style={{ backgroundColor: hex }}
      >
        <span className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase opacity-75">{group}</span>
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
            light ? "bg-ink/10" : "bg-white/20",
            copied && "opacity-100",
          )}
        >
          {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-4">
        <span className="font-semibold text-ink">{name}</span>
        <span className="mt-1 font-mono text-sm text-ink/70">{hex}</span>
        <span className="font-mono text-xs text-ink/50">RGB {toRgb(hex)}</span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${hex} copied` : `Copy ${hex}`}
      </span>
    </button>
  );
}
