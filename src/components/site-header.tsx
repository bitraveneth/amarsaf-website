"use client";

import { Dialog } from "@base-ui/react/dialog";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Landmark,
  Mail,
  Palette,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type KeyboardEvent } from "react";
import { aboutPages } from "@/lib/about";
import { images, productImages } from "@/lib/images";
import { company, isCurrentPath, nav, products, stories } from "@/lib/site";
import { cn } from "@/lib/utils";

const aboutLinks = [
  {
    href: "/heritage",
    label: "Heritage",
    body: "Our story so far, and what comes next.",
    icon: Landmark,
  },
  {
    href: "/media-kit",
    label: "Media kit",
    body: "Logos, colours, and brand guidelines to download.",
    icon: Palette,
  },
]

const latest = [...stories].sort((a, b) => b.iso.localeCompare(a.iso))[0];

const itemClass =
  "relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-medium whitespace-nowrap text-white/75 transition-colors duration-200 outline-none hover:bg-white/[0.07] hover:text-white data-[popup-open]:bg-white/10 data-[popup-open]:text-white xl:px-5";

// The current page (or the section it belongs to) reads as a pressed white button.
const currentClass =
  "bg-white font-semibold text-purple shadow-[0_8px_24px_-10px_rgb(0_0_0/0.6)] hover:bg-white hover:text-purple data-[popup-open]:bg-white data-[popup-open]:text-purple";

const contentClass =
  "transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:-translate-x-1/4 data-[starting-style]:data-[activation-direction=right]:translate-x-1/4 data-[ending-style]:data-[activation-direction=left]:translate-x-1/4 data-[ending-style]:data-[activation-direction=right]:-translate-x-1/4 motion-reduce:transition-none";

// Base UI's guards let Tab fall through to the document between cycles; wrap directly instead.
function wrapFocus(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key !== "Tab") return;
  const items = [
    ...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
  ];
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function Chevron() {
  return (
    <NavigationMenu.Icon className="transition-transform duration-300 data-[popup-open]:rotate-180 motion-reduce:transition-none">
      <ChevronDown aria-hidden className="size-3.5" />
    </NavigationMenu.Icon>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  // Tied to the path it was opened on, so any navigation closes the menu.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpenPath(null);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const productsCurrent = isCurrentPath(pathname, "/products");
  const aboutCurrent =
    isCurrentPath(pathname, "/about") || aboutLinks.some((link) => isCurrentPath(pathname, link.href));
  const contactCurrent = isCurrentPath(pathname, "/contact");

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50 text-white">
      <div className="header-shift">
        <div className="hidden h-10 border-b border-white/[0.08] bg-violet text-[0.8125rem] whitespace-nowrap text-white/75 lg:block">
          <div className="shell flex h-full items-center justify-between gap-6">
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-2">
                <Truck aria-hidden className="size-4 text-[#c9b5ff]" />
                Home and office delivery across Dhaka
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck aria-hidden className="size-4 text-[#c9b5ff]" />
                BSTI &amp; ISO 22000 certified
              </li>
            </ul>
            <p className="flex items-center gap-2">
              <Phone aria-hidden className="size-4 text-[#c9b5ff]" />
              Hotline
              <span className="font-semibold text-white tabular-nums">{company.hotline}</span>
            </p>
          </div>
        </div>

        <div className="header-solid relative bg-night/90 backdrop-blur-xl backdrop-saturate-150">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          />
          <div className="shell flex h-16 items-center justify-between lg:grid lg:h-[4.5rem] lg:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/"
              className="-m-1.5 shrink-0 justify-self-start rounded-lg p-1.5"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <Image
                src="/brand/saf-horizontal-tight-white.svg"
                alt="SAF home"
                width={1106}
                height={303}
                unoptimized
                className="h-7 w-auto sm:h-8"
              />
            </Link>

            <NavigationMenu.Root aria-label="Primary" className="hidden lg:block">
              <NavigationMenu.List className="flex items-center gap-1">
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    active={pathname === "/"}
                    aria-current={pathname === "/" ? "page" : undefined}
                    render={<Link href="/" />}
                    className={cn(itemClass, pathname === "/" && currentClass)}
                  >
                    Home
                  </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <NavigationMenu.Trigger
                    className={cn(itemClass, aboutCurrent && currentClass)}
                    data-current={aboutCurrent ? "" : undefined}
                  >
                    About us
                    <Chevron />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className={cn(contentClass, "w-[min(60rem,calc(100vw-2.5rem))] p-3")}>
                    <div className="grid grid-cols-[1.2fr_1fr_15rem] gap-3">
                      <div className="rounded-2xl bg-haze p-2">
                        <NavigationMenu.Link
                          active={pathname === "/about"}
                          aria-current={pathname === "/about" ? "page" : undefined}
                          render={<Link href="/about" />}
                          className="group/head flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white"
                        >
                          <span>
                            <span className="eyebrow block text-purple">About us</span>
                            <span className="mt-1.5 block font-semibold text-ink">Who we are</span>
                          </span>
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-purple text-white transition-transform duration-300 group-hover/head:translate-x-0.5">
                            <ArrowRight aria-hidden className="size-4" />
                          </span>
                        </NavigationMenu.Link>
                        <ul className="mt-1 grid gap-0.5">
                          {aboutPages.slice(1).map(({ href, label, body, icon: Icon }) => {
                            const current = pathname === href;
                            return (
                              <li key={href}>
                                <NavigationMenu.Link
                                  active={current}
                                  aria-current={current ? "page" : undefined}
                                  render={<Link href={href} />}
                                  className="group/link flex gap-3 rounded-xl p-3 transition-colors hover:bg-white aria-[current=page]:bg-white"
                                >
                                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple shadow-sm transition-colors group-hover/link:bg-purple group-hover/link:text-white">
                                    <Icon aria-hidden className="size-[1.125rem]" />
                                  </span>
                                  <span>
                                    <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
                                      {label}
                                      {current ? (
                                        <span className="rounded-full bg-purple px-2 py-0.5 text-[0.625rem] font-semibold text-white">
                                          Current
                                        </span>
                                      ) : null}
                                    </span>
                                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink/60">
                                      {body}
                                    </span>
                                  </span>
                                </NavigationMenu.Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <ul className="grid content-start gap-1 py-1">
                        {aboutLinks.map(({ href, label, body, icon: Icon }) => {
                          const current = isCurrentPath(pathname, href);
                          return (
                            <li key={href}>
                              <NavigationMenu.Link
                                active={current}
                                aria-current={current ? "page" : undefined}
                                render={<Link href={href} />}
                                className="group/link flex gap-4 rounded-2xl p-3.5 transition-colors hover:bg-haze aria-[current=page]:bg-lavender/70"
                              >
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lavender text-purple transition-colors group-hover/link:bg-purple group-hover/link:text-white">
                                  <Icon aria-hidden className="size-5" />
                                </span>
                                <span>
                                  <span className="flex items-center gap-2 font-semibold text-ink">
                                    {label}
                                    {current ? (
                                      <span className="rounded-full bg-purple px-2 py-0.5 text-[0.625rem] font-semibold text-white">
                                        Current
                                      </span>
                                    ) : null}
                                  </span>
                                  <span className="mt-0.5 block text-sm leading-snug text-ink/65">
                                    {body}
                                  </span>
                                </span>
                              </NavigationMenu.Link>
                            </li>
                          );
                        })}
                      </ul>
                      <NavigationMenu.Link
                        render={<Link href="/news" />}
                        className="group/news block rounded-2xl bg-haze p-3 transition-colors hover:bg-lavender"
                      >
                        <span className="block overflow-hidden rounded-xl">
                          <Image
                            src={images[latest.image].src}
                            alt=""
                            sizes="240px"
                            className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 group-hover/news:scale-105 motion-reduce:transition-none"
                          />
                        </span>
                        <span className="eyebrow mt-4 block px-1 text-purple">Latest news</span>
                        <span className="mt-2 block px-1 leading-snug font-semibold text-ink">
                          {latest.title}
                        </span>
                        <span className="mt-1 block px-1 pb-1 text-xs text-ink/65">{latest.date}</span>
                      </NavigationMenu.Link>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <NavigationMenu.Trigger
                    className={cn(itemClass, productsCurrent && currentClass)}
                    data-current={productsCurrent ? "" : undefined}
                  >
                    Products
                    <Chevron />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className={cn(contentClass, "w-[min(56rem,calc(100vw-2.5rem))] p-3")}>
                    <div className="grid grid-cols-[1fr_15rem] gap-3">
                      <ul className="grid grid-cols-4 gap-2">
                        {products.map((product) => {
                          const image = productImages[product.id];
                          return (
                            <li key={product.id}>
                              <NavigationMenu.Link
                                render={<Link href={`/products/${product.id}`} />}
                                className="group/card block rounded-2xl p-2 transition-colors hover:bg-haze"
                              >
                                <span className="block overflow-hidden rounded-xl bg-lavender">
                                  <Image
                                    src={image.src}
                                    alt=""
                                    sizes="160px"
                                    className="aspect-square h-auto w-full object-cover transition-transform duration-500 group-hover/card:scale-105 motion-reduce:transition-none"
                                  />
                                </span>
                                <span className="mt-3 block text-sm font-semibold text-ink">
                                  {product.name}
                                </span>
                                <span className="mt-0.5 block text-xs text-ink/65">
                                  {product.size} · {product.pack}
                                </span>
                              </NavigationMenu.Link>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="on-dark relative flex flex-col justify-between overflow-hidden rounded-2xl bg-purple p-5 text-white">
                        <Image
                          src={images.lineup.src}
                          alt=""
                          sizes="240px"
                          className="absolute inset-x-0 bottom-0 h-1/2 w-full object-cover opacity-80 [mask-image:linear-gradient(to_top,black_40%,transparent)]"
                        />
                        <div className="relative">
                          <p className="eyebrow text-white/75">Case packs</p>
                          <p className="mt-3 text-xl leading-tight font-bold tracking-[-0.02em]">
                            Buy SAF by the case
                          </p>
                          <p className="mt-2 text-sm text-white/80">
                            Four sizes, one purified water.
                          </p>
                        </div>
                        <NavigationMenu.Link
                          render={<Link href="/products" />}
                          className="relative mt-24 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-purple transition-colors hover:bg-lavender"
                        >
                          All products
                          <ArrowRight aria-hidden className="size-4" />
                        </NavigationMenu.Link>
                      </div>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                {[
                  { href: "/careers", label: "Careers" },
                  { href: "/news", label: "News" },
                ].map((item) => {
                  const current = isCurrentPath(pathname, item.href);
                  return (
                    <NavigationMenu.Item key={item.href}>
                      <NavigationMenu.Link
                        active={current}
                        aria-current={current ? "page" : undefined}
                        render={<Link href={item.href} />}
                        className={cn(itemClass, current && currentClass)}
                      >
                        {item.label}
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  );
                })}
              </NavigationMenu.List>

              <NavigationMenu.Portal>
                <NavigationMenu.Positioner
                  sideOffset={22}
                  collisionPadding={16}
                  className="z-[55] h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[instant]:transition-none motion-reduce:transition-none"
                >
                  <NavigationMenu.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_90px_-30px_rgb(23_10_53/0.5)] ring-1 ring-ink/5 transition-[opacity,scale,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 motion-reduce:transition-none">
                    <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
                  </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Root>

            <div className="flex items-center gap-2 justify-self-end">
              <Link
                href="/contact"
                aria-current={contactCurrent ? "page" : undefined}
                className={cn(
                  "group hidden h-11 items-center gap-3 rounded-full pr-1.5 pl-5 text-sm font-semibold transition-colors lg:inline-flex",
                  contactCurrent
                    ? "bg-white text-purple"
                    : "bg-purple text-white shadow-[0_10px_30px_-12px_rgb(109_43_213/0.9)] hover:bg-[#7a3be6]",
                )}
              >
                Contact us
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none",
                    contactCurrent ? "bg-purple/10" : "bg-white/15",
                  )}
                >
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </Link>

              <Dialog.Root
                open={open}
                onOpenChange={(next) => setOpenPath(next ? pathname : null)}
              >
                <Dialog.Trigger className="inline-flex h-11 items-center gap-2.5 rounded-full bg-white/10 pr-4.5 pl-4 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/15 lg:hidden">
                  <span aria-hidden className="flex w-4 flex-col gap-[5px]">
                    <span className="h-0.5 w-full rounded-full bg-current" />
                    <span className="h-0.5 w-2/3 rounded-full bg-current" />
                  </span>
                  Menu
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Backdrop className="fixed inset-0 z-[60] bg-night/55 backdrop-blur-[3px] transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
                  <Dialog.Popup
                    onKeyDown={wrapFocus}
                    className="on-dark fixed inset-y-2 right-2 z-[70] flex w-[min(27rem,calc(100vw-3.25rem))] flex-col overflow-y-auto overscroll-contain rounded-[1.75rem] bg-night text-white shadow-[-24px_0_60px_-20px_rgb(0_0_0/0.5)] outline-none transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:translate-x-[105%] data-[starting-style]:translate-x-[105%] motion-reduce:transition-none"
                  >
                    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-night/95 pr-3 pl-6 backdrop-blur sm:pl-7">
                      <Dialog.Title className="eyebrow text-white/60">Menu</Dialog.Title>
                      <Dialog.Close className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 pr-4 pl-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                        <X aria-hidden className="size-4" />
                        Close
                      </Dialog.Close>
                    </div>
                    <nav aria-label="Mobile" className="px-3 py-4 sm:px-4">
                      <ul>
                        {nav.map((item, index) => {
                          const current = isCurrentPath(pathname, item.href);
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                aria-current={current ? "page" : undefined}
                                onClick={() => setOpenPath(null)}
                                className={cn(
                                  "group flex items-center gap-4 rounded-2xl px-3 py-2 transition-colors hover:bg-white/[0.06] sm:px-4",
                                  current && "bg-white/[0.08]",
                                )}
                              >
                                <span
                                  aria-hidden
                                  className={cn(
                                    "w-6 text-xs font-semibold tabular-nums",
                                    current ? "text-[#c9b5ff]" : "text-white/40",
                                  )}
                                >
                                  0{index + 1}
                                </span>
                                <span
                                  className={cn(
                                    "text-2xl leading-tight font-bold tracking-[-0.03em] sm:text-[1.75rem]",
                                    current ? "text-white" : "text-white/80 group-hover:text-white",
                                  )}
                                >
                                  {item.label}
                                </span>
                                {current ? (
                                  <span className="ml-auto rounded-full bg-purple px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-white">
                                    Current
                                  </span>
                                ) : null}
                              </Link>
                              {item.href === "/about" ? (
                                <ul aria-label="About us" className="mt-1 mb-2 ml-[3.25rem] flex flex-wrap gap-1.5 sm:ml-14">
                                  {[...aboutPages.slice(1), ...aboutLinks].map((page) => {
                                    const pageCurrent = pathname === page.href;
                                    return (
                                      <li key={page.href}>
                                        <Link
                                          href={page.href}
                                          aria-current={pageCurrent ? "page" : undefined}
                                          onClick={() => setOpenPath(null)}
                                          className={cn(
                                            "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] font-semibold transition-colors",
                                            pageCurrent
                                              ? "bg-purple text-white"
                                              : "bg-white/[0.07] text-white/80 ring-1 ring-white/10 hover:bg-white/[0.12] hover:text-white",
                                          )}
                                        >
                                          <page.icon aria-hidden className="size-3.5" />
                                          {page.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                    <section aria-labelledby="menu-products" className="border-t border-white/10 px-6 py-5 sm:px-7">
                      <h2 id="menu-products" className="eyebrow text-white/60">
                        Shop by size
                      </h2>
                      <ul className="mt-4 grid gap-2 min-[390px]:grid-cols-2">
                        {products.map((product) => {
                          const image = productImages[product.id];
                          return (
                            <li key={product.id}>
                              <Link
                                href={`/products/${product.id}`}
                                onClick={() => setOpenPath(null)}
                                className="flex items-center gap-2.5 rounded-2xl bg-white/[0.06] p-2 pr-2.5 transition-colors hover:bg-white/[0.12] sm:gap-3 sm:pr-3"
                              >
                                <Image
                                  src={image.src}
                                  alt=""
                                  sizes="48px"
                                  className="size-10 shrink-0 rounded-xl bg-lavender object-cover sm:size-12"
                                />
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold">{product.size}</span>
                                  <span className="block truncate text-xs text-white/65">
                                    {product.name.replace("SAF ", "")}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                    <div className="mt-auto border-t border-white/10 px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-7">
                      <dl className="grid gap-2.5 text-sm text-white/75">
                        <div className="flex items-center gap-2.5">
                          <dt>
                            <Phone aria-hidden className="size-4 text-[#c9b5ff]" />
                            <span className="sr-only">Hotline</span>
                          </dt>
                          <dd>{company.hotline}</dd>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <dt>
                            <Mail aria-hidden className="size-4 text-[#c9b5ff]" />
                            <span className="sr-only">Email</span>
                          </dt>
                          <dd>
                            <a
                              href={`mailto:${company.email}`}
                              className="rounded-sm underline-offset-4 hover:text-white hover:underline"
                            >
                              {company.email}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <dt>
                            <Truck aria-hidden className="size-4 text-[#c9b5ff]" />
                            <span className="sr-only">Delivery</span>
                          </dt>
                          <dd>Home and office delivery across Dhaka</dd>
                        </div>
                      </dl>
                    </div>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
