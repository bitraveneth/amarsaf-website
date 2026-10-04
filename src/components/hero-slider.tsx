"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { HeroSlide } from "@/lib/hero-slides";
import { cn, delay } from "@/lib/utils";

const SLIDE_MS = 7000;
const pad = (n: number) => String(n).padStart(2, "0");

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const ctaBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  // null = follow the default (autoplay unless the visitor prefers reduced motion).
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [announce, setAnnounce] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );

  const paused = userPaused ?? reducedMotion;
  const running = !paused && !hovered;
  const slide = slides[index];
  // Other slides sit in the viewport at opacity 0, so the browser would fetch them
  // with the LCP image. Keep them out until the first paint has finished.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setWarm(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  function go(next: number, manual = true) {
    setIndex((next + count) % count);
    if (manual) setAnnounce(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  // Keyboard focus inside the carousel stops rotation until the visitor presses play.
  function onFocus(event: FocusEvent<HTMLElement>) {
    if (event.target.matches(":focus-visible") && userPaused === null) setUserPaused(true);
  }

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") swipeStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="on-dark relative isolate touch-pan-y overflow-hidden bg-night text-white"
    >
      <h1 className="sr-only">SAF packaged drinking water — Simply Pure</h1>

      {slides.map((item, i) => {
        const active = i === index;
        if (!active && !(warm && i === (index + 1) % count)) return null;
        return (
          <div
            key={item.id}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 -z-20 transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={item.image}
              alt={item.alt}
              sizes="100vw"
              preload={active}
              fetchPriority={active ? "high" : "low"}
              quality={65}
              placeholder="blur"
              className={cn(
                "h-full w-full object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none",
                active ? "scale-100" : "scale-[1.12]",
              )}
              style={{ objectPosition: item.focus ?? "center" }}
            />
          </div>
        );
      })}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/10 lg:bg-gradient-to-r lg:from-night/90 lg:via-night/40 lg:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-56 bg-gradient-to-t from-night/90 to-transparent lg:block"
      />

      <div className="shell flex min-h-[min(100svh,62rem)] flex-col justify-end pt-40 pb-8 lg:pt-48 lg:pb-10">
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}: ${slide.tab}`}
          className="max-w-3xl lg:my-auto"
        >
          <p className="rise eyebrow flex items-center gap-3 text-[#d6c8ff]">
            <span aria-hidden className="h-px w-8 bg-current" />
            {slide.eyebrow}
          </p>
          <h2
            className="rise mt-5 max-w-[13ch] text-[clamp(2.5rem,1.3rem+5.2vw,6.25rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance"
            style={delay(80)}
          >
            {slide.title}
          </h2>
          <p className="rise text-lede mt-6 max-w-[34rem] text-white/85" style={delay(160)}>
            {slide.body}
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(240)}>
            <Link href={slide.cta.href} className={cn(ctaBase, "bg-white text-purple hover:bg-lavender")}>
              {slide.cta.label}
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            {slide.secondary ? (
              <Link
                href={slide.secondary.href}
                className={cn(
                  ctaBase,
                  "border border-white/35 text-white hover:border-white hover:bg-white/10",
                )}
              >
                {slide.secondary.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4 border-t border-white/15 pt-5 md:mt-16 lg:grid-cols-[auto_1fr_auto] lg:gap-x-10">
          <p aria-hidden className="whitespace-nowrap tabular-nums">
            <span className="text-3xl font-bold tracking-[-0.03em]">{pad(index + 1)}</span>
            <span className="text-white/55"> / {pad(count)}</span>
          </p>

          <ul
            aria-label="Choose a slide"
            className="col-span-2 row-start-2 flex gap-2 lg:col-span-1 lg:row-start-auto lg:gap-4"
          >
            {slides.map((item, i) => {
              const active = i === index;
              return (
                <li key={item.id} className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show slide ${i + 1}: ${item.tab}`}
                    aria-current={active ? "true" : undefined}
                    className="group block w-full rounded-lg py-3 text-left lg:py-2"
                  >
                    <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                      {active ? (
                        <span
                          key={`${item.id}-${index}`}
                          onAnimationEnd={() => go(index + 1, false)}
                          className="slide-progress absolute inset-0 origin-left rounded-full bg-white"
                          style={{
                            animationDuration: `${SLIDE_MS}ms`,
                            animationPlayState: running ? "running" : "paused",
                          }}
                        />
                      ) : (
                        <span
                          className={cn(
                            "absolute inset-0 rounded-full bg-white/50 transition-opacity group-hover:opacity-100",
                            i < index ? "opacity-100" : "opacity-0",
                          )}
                        />
                      )}
                    </span>
                    <span className="mt-3 hidden items-center gap-3 lg:flex">
                      <span
                        className={cn(
                          "relative hidden size-11 shrink-0 overflow-hidden rounded-xl ring-1 transition xl:block",
                          active ? "ring-white" : "opacity-60 ring-white/20 group-hover:opacity-100",
                        )}
                      >
                        <Image src={item.image} alt="" sizes="44px" className="h-full w-full object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.6875rem] font-semibold text-white/55 tabular-nums">
                          {pad(i + 1)}
                        </span>
                        <span
                          className={cn(
                            "block truncate text-sm font-semibold transition-colors",
                            active ? "text-white" : "text-white/60 group-hover:text-white",
                          )}
                        >
                          {item.tab}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused(!paused)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="flex size-11 items-center justify-center rounded-full bg-white text-purple transition-colors hover:bg-lavender"
            >
              {paused ? (
                <Play aria-hidden className="size-4 fill-current" />
              ) : (
                <Pause aria-hidden className="size-4 fill-current" />
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live={announce ? "polite" : "off"} aria-atomic="true">
        Slide {index + 1} of {count}: {slide.title}
      </p>
    </section>
  );
}
