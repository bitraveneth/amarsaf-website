"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { colorways, type Colorway, type Logo } from "@/lib/media-kit";
import { cn } from "@/lib/utils";

export function LogoCard({ logo, featured = false }: { logo: Logo; featured?: boolean }) {
  const [colorway, setColorway] = useState<Colorway>(featured ? "gradient" : "light");
  const active = colorways.find((c) => c.id === colorway) ?? colorways[0];
  const art = logo[active.tone];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/[0.07]">
      <div
        className={cn(
          "relative flex items-center justify-center transition-colors duration-500",
          featured ? "aspect-[16/9] p-12 sm:p-20" : "aspect-[4/3] p-10 sm:p-12",
          active.className,
        )}
      >
        {/* Plain <img>: the SVGs are downloads first, so the preview shows the exact file. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={art.svg}
          alt={`${logo.name}, ${active.tone} on ${active.label.toLowerCase()}`}
          className="max-h-full w-auto max-w-full"
          style={{ aspectRatio: logo.ratio, height: logo.ratio < 1.2 ? "78%" : undefined }}
        />
        <div
          role="radiogroup"
          aria-label={`Background for ${logo.name}`}
          className="absolute top-4 right-4 flex gap-1.5 rounded-full bg-white/80 p-1 shadow-sm ring-1 ring-ink/5 backdrop-blur"
        >
          {colorways.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={c.id === colorway}
              aria-label={c.label}
              title={c.label}
              onClick={() => setColorway(c.id)}
              className={cn(
                "size-6 rounded-full ring-1 ring-ink/10 transition-transform hover:scale-110",
                c.className,
                c.id === colorway && "ring-2 ring-ink ring-offset-2 ring-offset-white",
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div>
          <h3 className="text-xl text-ink">{logo.name}</h3>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink/65">{logo.body}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          {(["svg", "png"] as const).map((format) => (
            <a
              key={format}
              href={art[format]}
              download
              className="inline-flex h-10 items-center gap-2 rounded-full bg-haze px-4 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-purple hover:text-white hover:ring-purple"
            >
              <Download aria-hidden className="size-4" />
              {format.toUpperCase()}
              <span className="sr-only">
                {" "}
                of the {active.tone} {logo.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
