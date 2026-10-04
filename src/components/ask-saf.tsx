"use client";

import { ArrowUp, Droplets, FlaskConical, Phone, Sparkles, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { answerAskSaf } from "@/lib/ask-saf";
import { company } from "@/lib/site";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const quickActions = [
  { id: "quality", label: "Water quality", icon: Droplets, prompt: "What is the TDS?" },
  { id: "purify", label: "Purification", icon: FlaskConical, prompt: "What does 8-stage purification mean?" },
  { id: "delivery", label: "Delivery", icon: Truck, prompt: "Do you deliver to Gulshan?" },
  { id: "minerals", label: "Minerals", icon: Sparkles, prompt: "Which minerals stay in the water?" },
  { id: "contact", label: "Contact", icon: Phone, prompt: "How do I contact SAF?" },
] as const;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function AskSaf() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const hello = useMemo(() => greeting(), []);
  const chatting = messages.length > 0;

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, suggestions, open]);

  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), reduce ? 0 : 180);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pushBot(text: string) {
    setMessages((prev) => [...prev, { id: `b-${prev.length}-${text.length}`, role: "bot", text }]);
  }

  function ask(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    const turn = answerAskSaf(trimmed);
    setSuggestions(turn.suggestions);
    setMessages((prev) => [...prev, { id: `u-${prev.length}`, role: "user", text: trimmed }]);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => pushBot(turn.reply), reduce ? 0 : 280);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    const value = input.trim();
    setInput("");
    ask(value);
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2.5 sm:inset-x-6 sm:bottom-6 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="rise pointer-events-auto flex max-h-[min(70dvh,34rem)] w-full max-w-[26rem] flex-col overflow-hidden rounded-[1.75rem] bg-haze shadow-[0_28px_70px_-24px_rgb(23_10_53/0.55)] ring-1 ring-ink/10"
        >
          <div className="on-dark relative flex items-center justify-between gap-3 bg-purple px-4 py-3.5 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_100%_0%,rgb(255_255_255/0.22),transparent_55%)]"
            />
            <span className="relative h-7 w-28 shrink-0">
              <Image
                src="/brand/saf-horizontal-tight-white.svg"
                alt="SAF"
                fill
                className="object-contain object-left"
                sizes="112px"
              />
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="Close Ask SAF"
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X aria-hidden className="size-4" strokeWidth={2.3} />
            </button>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
            {!chatting && (
              <div className="relative overflow-hidden rounded-[1.25rem] bg-white px-5 pt-5 pb-6 shadow-sm ring-1 ring-ink/[0.06]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-lavender to-transparent"
                />
                <div className="relative">
                  <div className="mx-auto flex size-[4.25rem] items-center justify-center rounded-2xl bg-purple shadow-[0_12px_28px_-12px_rgb(109_43_213/0.8)] ring-[5px] ring-lavender">
                    <span className="relative size-8">
                      <Image
                        src="/brand/saf-logomark.svg"
                        alt=""
                        fill
                        className="object-contain brightness-0 invert"
                        sizes="32px"
                      />
                    </span>
                  </div>
                  <h2
                    id={titleId}
                    className="mt-5 text-center text-[1.45rem] leading-[1.2] font-extrabold tracking-tight text-ink"
                  >
                    {hello},
                    <br />
                    How can we help?
                  </h2>
                  <p className="mx-auto mt-2.5 max-w-[19rem] text-center text-sm leading-relaxed text-ink/60">
                    Water quality, purification, minerals, and delivery. For pricing, call the hotline or use the{" "}
                    <Link href="/contact" className="font-semibold text-purple underline-offset-2 hover:underline">
                      contact form
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {chatting && (
              <ul className="space-y-3" aria-live="polite">
                {messages.map((message) => (
                  <li
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "bot" && (
                      <span className="mt-1 mr-2 flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple ring-2 ring-lavender">
                        <Droplets aria-hidden className="size-3.5 text-white" />
                      </span>
                    )}
                    <p
                      className={
                        message.role === "user"
                          ? "max-w-[82%] rounded-2xl rounded-br-md bg-purple px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white"
                          : "max-w-[82%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-ink shadow-sm ring-1 ring-ink/[0.06]"
                      }
                    >
                      {message.text}
                      {message.role === "bot" && /contact form/i.test(message.text) && (
                        <>
                          {" "}
                          <Link href="/contact" className="font-semibold text-purple underline underline-offset-2">
                            Open the contact form
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {chatting && suggestions.length > 0 && (
              <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                {suggestions.map((label, index) => {
                  const wide = index === suggestions.length - 1 && suggestions.length % 2 === 1;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => ask(label)}
                      className={`inline-flex min-h-11 items-center justify-center rounded-full border border-purple/25 bg-lavender px-3 py-2 text-center text-xs font-semibold text-purple transition-colors hover:border-purple hover:bg-white ${wide ? "min-[380px]:col-span-2" : ""}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const wide = index === quickActions.length - 1 && quickActions.length % 2 === 1;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => ask(action.prompt)}
                    className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-purple/40 hover:text-purple ${wide ? "min-[380px]:col-span-2" : ""}`}
                  >
                    <Icon aria-hidden className="size-3.5 text-purple" strokeWidth={2.2} />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={onSubmit} className="border-t border-ink/10 bg-white px-3 py-3">
            <div className="flex items-center gap-2 rounded-full bg-haze px-2 py-1.5 ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-purple/50">
              <label htmlFor="ask-saf-input" className="sr-only">
                Ask SAF
              </label>
              <input
                ref={inputRef}
                id="ask-saf-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about water quality, purification, delivery…"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple text-white transition-colors hover:bg-purple-deep disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowUp aria-hidden className="size-4" strokeWidth={2.5} />
              </button>
            </div>
            <p className="px-3 pt-2 text-xs leading-snug text-ink/45">
              Answers use this site only. Hotline {company.hotline}.
            </p>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close Ask SAF" : "Ask SAF"}
        className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-purple text-white shadow-[0_16px_40px_-12px_rgb(109_43_213/0.75)] transition duration-300 hover:scale-105 hover:bg-purple-deep motion-reduce:transition-none"
      >
        {open ? (
          <X aria-hidden className="size-6" strokeWidth={2.3} />
        ) : (
          <Droplets aria-hidden className="size-6" strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}
