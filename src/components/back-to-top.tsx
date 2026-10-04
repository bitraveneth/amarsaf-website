"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

// Whole percent, so scrolling only re-renders when the ring actually moves.
function readProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
}

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const progress = useSyncExternalStore(subscribe, readProgress, () => 0);
  const visible = progress > 8;

  function toTop() {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    document.getElementById("content")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed right-4 bottom-[5.25rem] z-40 flex size-14 items-center justify-center rounded-full bg-night text-white shadow-[0_18px_40px_-16px_rgb(23_10_53/0.8)] ring-1 ring-white/10 transition-[opacity,translate] duration-300 hover:bg-purple sm:right-6 sm:bottom-[5.75rem] motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="#b69cff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
        />
      </svg>
      <ArrowUp
        aria-hidden
        className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </button>
  );
}
