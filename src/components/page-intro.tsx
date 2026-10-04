import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/images";
import { cn, delay } from "@/lib/utils";

type Tone = "lavender" | "white" | "night";

const toneClass: Record<Tone, string> = {
  lavender: "bg-lavender text-ink",
  white: "bg-white text-ink",
  night: "on-dark bg-night text-white",
};

export function PageIntro({
  eyebrow,
  title,
  lede,
  image,
  imagePosition = "center",
  tone = "lavender",
  overlap = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  image?: SiteImage;
  imagePosition?: string;
  tone?: Tone;
  /** Leaves room at the bottom for a card that overlaps the hero on desktop. */
  overlap?: boolean;
  children?: ReactNode;
}) {
  const dark = Boolean(image) || tone === "night";

  return (
    <header
      className={cn(
        "relative isolate overflow-hidden",
        image ? "on-dark bg-night text-white" : toneClass[tone],
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            sizes="100vw"
            preload
            fetchPriority="high"
            placeholder="blur"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/75 to-night/20 lg:from-night/95 lg:via-night/30 lg:to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-night/70 via-night/15 to-transparent lg:block"
          />
        </>
      ) : (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-10 -right-32 -z-10 hidden h-[30rem] w-[44rem] [mask-image:radial-gradient(closest-side,black,transparent)] md:block",
            tone === "night" ? "opacity-[0.08]" : "opacity-[0.12]",
          )}
          style={{
            backgroundImage: `url(/brand/${tone === "night" ? "pattern-1-white" : "pattern-1"}.svg)`,
            backgroundSize: "340px auto",
          }}
        />
      )}
      <div
        className={cn(
          "shell grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10",
          image
            ? "content-end pt-44 pb-14 md:pb-20"
            : "pt-32 pb-14 md:pt-44 md:pb-20",
          image && !overlap && "min-h-[min(80svh,46rem)]",
          overlap && "lg:min-h-[min(80svh,50rem)] lg:pb-48",
        )}
      >
        <div className="lg:col-span-8">
          {eyebrow ? (
            <p
              className={cn(
                "rise eyebrow flex items-center gap-3",
                dark ? "text-[#d6c8ff]" : "text-purple",
              )}
            >
              <span aria-hidden className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="rise text-headline mt-5 max-w-[16ch]" style={delay(80)}>
            {title}
          </h1>
        </div>
        <div className="rise lg:col-span-4 lg:pb-2" style={delay(160)}>
          <p
            className={cn(
              "text-lede max-w-md",
              dark ? "text-white/85" : "text-ink/75",
            )}
          >
            {lede}
          </p>
          {children}
        </div>
      </div>
    </header>
  );
}
