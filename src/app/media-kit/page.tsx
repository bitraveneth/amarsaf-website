import { ArrowRight, Download, FileText, Package, Type, X } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ColorSwatch } from "@/components/color-swatch";
import { LogoCard } from "@/components/logo-card";
import {
  avatars,
  bengaliLogos,
  downloads,
  logos,
  mockups,
  palette,
  patterns,
} from "@/lib/media-kit";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "Download SAF logos, colours, typography, patterns, and the brand guidelines for press, retail, and partner use.",
};

const sections = [
  { id: "logos", label: "Logos" },
  { id: "bengali", label: "Bengali" },
  { id: "avatar", label: "Avatar" },
  { id: "colours", label: "Colours" },
  { id: "type", label: "Typography" },
  { id: "patterns", label: "Patterns" },
  { id: "usage", label: "Usage" },
  { id: "in-use", label: "In use" },
];

const master = "/media-kit/logos/purple/saf-horizontal.svg";
const masterMask: CSSProperties = {
  maskImage: `url(${master})`,
  WebkitMaskImage: `url(${master})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

// Recreates the "don't" examples from the brand guidelines, so the rules read at a glance.
const donts: { label: string; render: React.ReactNode }[] = [
  {
    label: "Don’t rotate",
    // eslint-disable-next-line @next/next/no-img-element
    render: <img src={master} alt="" className="w-3/4 -rotate-12" />,
  },
  {
    label: "Don’t stretch or distort",
    // eslint-disable-next-line @next/next/no-img-element
    render: <img src={master} alt="" className="h-12 w-11/12 object-fill" />,
  },
  {
    label: "Don’t add unapproved gradients",
    render: (
      <span
        className="block aspect-[1209/401] w-3/4 bg-[linear-gradient(90deg,#facc15,#22d3ee,#6d2bd5)]"
        style={masterMask}
      />
    ),
  },
  {
    label: "Don’t add drop shadows",
    // eslint-disable-next-line @next/next/no-img-element
    render: <img src={master} alt="" className="w-3/4 drop-shadow-[6px_8px_0_rgb(14_15_20/0.35)]" />,
  },
  {
    label: "Don’t add strokes",
    render: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={master}
        alt=""
        className="w-3/4 [filter:drop-shadow(2px_0_0_#eb38f8)_drop-shadow(-2px_0_0_#eb38f8)_drop-shadow(0_2px_0_#eb38f8)_drop-shadow(0_-2px_0_#eb38f8)]"
      />
    ),
  },
  {
    label: "Don’t use unapproved colours",
    render: <span className="block aspect-[1209/401] w-3/4 bg-[#f97316]" style={masterMask} />,
  },
];

const buttonPrimary =
  "inline-flex min-h-12 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-full px-6 py-2.5 text-center text-[0.9375rem] font-semibold transition-colors";

function SectionHead({ id, eyebrow, title, body }: { id: string; eyebrow: string; title: string; body?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="eyebrow text-purple">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-headline mt-4 max-w-[16ch] text-ink">
          {title}
        </h2>
      </div>
      {body ? (
        <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">{body}</p>
      ) : null}
    </div>
  );
}

function FileButtons({ svg, png, label }: { svg: string; png: string; label: string }) {
  return (
    <div className="flex gap-2">
      {[
        { href: svg, format: "SVG" },
        { href: png, format: "PNG" },
      ].map(({ href, format }) => (
        <a
          key={format}
          href={href}
          download
          className="inline-flex h-10 items-center gap-2 rounded-full bg-haze px-4 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-purple hover:text-white hover:ring-purple"
        >
          <Download aria-hidden className="size-4" />
          {format}
          <span className="sr-only"> of the {label}</span>
        </a>
      ))}
    </div>
  );
}

export default function MediaKitPage() {
  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-night text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_10%,rgb(109_43_213/0.75),transparent_60%),radial-gradient(40rem_30rem_at_100%_100%,rgb(235_56_248/0.35),transparent_60%),radial-gradient(40rem_30rem_at_0%_100%,rgb(75_44_215/0.5),transparent_60%)]"
        />
        <div className="shell grid gap-12 pt-36 pb-16 md:pt-44 md:pb-24 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <p className="rise eyebrow flex items-center gap-3 text-[#d6c8ff]">
              <span aria-hidden className="h-px w-8 bg-current" />
              Media kit
            </p>
            <h1 className="rise text-headline mt-5 max-w-[13ch]">The SAF brand, ready to use.</h1>
            <p className="rise text-lede mt-6 max-w-lg text-white/80">
              Logos, colours, typography, and guidelines for press, retailers, and
              partners. Please follow the brand guidelines whenever you use them.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={downloads.kit.href} download className={cn(buttonPrimary, "bg-white text-purple hover:bg-lavender")}>
                <Package aria-hidden className="size-4" />
                Download full kit
                <span className="text-sm font-medium text-purple/60">ZIP · {downloads.kit.size}</span>
              </a>
              <a
                href={downloads.guidelines.href}
                download
                className={cn(buttonPrimary, "border border-white/35 text-white hover:border-white hover:bg-white/10")}
              >
                <FileText aria-hidden className="size-4" />
                Brand guidelines
                <span className="text-sm font-medium text-white/60">PDF · {downloads.guidelines.size}</span>
              </a>
            </div>
          </div>
          <div className="rise relative lg:col-span-6">
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#4b2cd7_0%,#6d2bd5_45%,#eb38f8_115%)] p-12 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/15 sm:p-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media-kit/logos/white/saf-horizontal-white.svg" alt="SAF master logo in white" className="w-full max-w-md" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25 backdrop-blur">
                Master logo · Gradient colourway
              </span>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden size-28 items-center justify-center rounded-[1.75rem] bg-white p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media-kit/logos/purple/saf-logomark.svg" alt="" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Media kit sections" className="below-header sticky z-30 border-b border-ink/[0.07] bg-white/90 backdrop-blur-xl">
        <ul className="shell flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none]">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-ink/70 transition-colors hover:bg-lavender hover:text-ink"
              >
                {section.label}
              </a>
            </li>
          ))}
          <li className="ml-auto shrink-0 pl-4">
            <a
              href={downloads.logos.href}
              download
              className="inline-flex h-10 items-center gap-2 rounded-full bg-purple px-4 text-sm font-semibold text-white transition-colors hover:bg-purple-deep"
            >
              <Download aria-hidden className="size-4" />
              All logos
              <span className="font-medium text-white/70">{downloads.logos.size}</span>
            </a>
          </li>
        </ul>
      </nav>

      <section id="logos" aria-labelledby="logos-title" className="shell py-20 md:py-28">
        <SectionHead
          id="logos"
          eyebrow="Logos"
          title="One mark, four lockups."
          body="Every file includes the clear space from the guidelines. Pick a colourway to preview it, then download the SVG or PNG."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <LogoCard logo={logos[0]} featured />
          </div>
          {logos.slice(1).map((logo) => (
            <LogoCard key={logo.id} logo={logo} />
          ))}
        </div>
      </section>

      <section id="bengali" aria-labelledby="bengali-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <SectionHead
            id="bengali"
            eyebrow="Bengali"
            title="সাফ, in Bengali script."
            body="Matching lockups with the Bengali wordmark, for local packaging, signage, and campaigns."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bengaliLogos.map((logo) => (
              <LogoCard key={logo.id} logo={logo} />
            ))}
          </div>
        </div>
      </section>

      <section id="avatar" aria-labelledby="avatar-title" className="shell py-20 md:py-28">
        <SectionHead
          id="avatar"
          eyebrow="Social avatar"
          title="Profile pictures."
          body="Square avatars for social media profiles and messaging apps. Platforms crop them to a circle."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {avatars.map((avatar) => (
            <li key={avatar.name} className="flex flex-col items-center gap-6 rounded-[2rem] bg-haze p-8 ring-1 ring-ink/[0.05] sm:flex-row sm:items-center sm:p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatar.svg} alt={avatar.name} className="size-32 rounded-full shadow-[0_24px_50px_-24px_rgb(23_10_53/0.6)]" />
              <div className="text-center sm:text-left">
                <h3 className="text-xl text-ink">{avatar.name}</h3>
                <p className="mt-1.5 text-sm text-ink/65">1024 × 1024 px</p>
                <div className="mt-5 flex justify-center sm:justify-start">
                  <FileButtons svg={avatar.svg} png={avatar.png} label={avatar.name} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="colours" aria-labelledby="colours-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <SectionHead
            id="colours"
            eyebrow="Colours"
            title="A vibrant purple, a rich indigo."
            body="Purple and Rich Indigo lead. Deep Black and Light Gray keep things legible, while Highlighter Pink and Fresh Green add energy. Select a swatch to copy its HEX value."
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {palette.map((colour) => (
              <li key={colour.hex} className={cn(colour.name === "Purple" && "col-span-2 sm:col-span-1")}>
                <ColorSwatch {...colour} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="type" aria-labelledby="type-title" className="shell py-20 md:py-28">
        <SectionHead
          id="type"
          eyebrow="Typography"
          title="Two typefaces, clear roles."
          body="Varien is reserved for the logo. Plus Jakarta Sans carries every headline, label, and paragraph."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="on-dark relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] bg-purple p-8 text-white sm:p-10 lg:col-span-5">
            <div>
              <p className="eyebrow text-white/75">Logo typeface</p>
              <h3 className="mt-3 text-3xl">Varien</h3>
              <p className="mt-3 max-w-sm text-white/80">
                Used only inside the SAF wordmark. Do not set other text in Varien
                or redraw the wordmark — always use the logo files.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media-kit/logos/white/saf-wordmark-white.svg" alt="" className="mt-10 w-2/3 max-w-xs" />
          </article>
          <article className="rounded-[2rem] bg-haze p-8 ring-1 ring-ink/[0.05] sm:p-10 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-purple">Primary typeface</p>
                <h3 className="mt-3 text-3xl text-ink">Plus Jakarta Sans</h3>
              </div>
              <a
                href="https://fonts.google.com/specimen/Plus+Jakarta+Sans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-purple hover:text-white"
              >
                <Type aria-hidden className="size-4" />
                Get the font
                <span className="sr-only"> (opens Google Fonts in a new tab)</span>
              </a>
            </div>
            <p aria-hidden className="mt-8 text-[clamp(4rem,2rem+8vw,8rem)] leading-none font-extrabold tracking-[-0.05em] text-ink">
              Aa
            </p>
            <p className="mt-6 text-lg text-ink/70 [overflow-wrap:anywhere]">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {[
                { weight: 400, name: "Regular", use: "Body copy" },
                { weight: 600, name: "SemiBold", use: "Labels and buttons" },
                { weight: 700, name: "Bold", use: "Titles" },
                { weight: 800, name: "ExtraBold", use: "Display headlines" },
              ].map(({ weight, name, use }) => (
                <li key={name} className="flex items-baseline justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                  <span className="text-lg text-ink" style={{ fontWeight: weight }}>
                    {name} {weight}
                  </span>
                  <span className="text-xs text-ink/55">{use}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="patterns" aria-labelledby="patterns-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <SectionHead
            id="patterns"
            eyebrow="Patterns"
            title="Two brand patterns."
            body="For backgrounds, packaging panels, and print. Keep them behind content, never on top of the logo."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {patterns.map((pattern) => (
              <li key={pattern.name} className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/[0.07]">
                <div
                  aria-hidden
                  className="aspect-[16/9] bg-lavender"
                  style={{ backgroundImage: `url(${pattern.svg})`, backgroundSize: "260px auto" }}
                />
                <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-7">
                  <h3 className="text-xl text-ink">{pattern.name}</h3>
                  <FileButtons svg={pattern.svg} png={pattern.png} label={pattern.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="usage" aria-labelledby="usage-title" className="shell py-20 md:py-28">
        <SectionHead
          id="usage"
          eyebrow="Usage"
          title="Give it room. Keep it true."
          body="Leave clear space equal to one sixth of the logo’s height on every side, and use the artwork exactly as supplied."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="flex flex-col rounded-[2rem] bg-haze p-8 ring-1 ring-ink/[0.05] sm:p-10 lg:col-span-5">
            <h3 className="text-xl text-ink">Clear space</h3>
            <p className="mt-2 text-sm text-ink/65">
              The dashed area stays free of text, images, and edges.
            </p>
            <div className="mt-8 flex flex-1 items-center justify-center rounded-[1.5rem] bg-white p-6">
              <div className="relative w-full max-w-sm border-2 border-dashed border-purple/40 p-[6%]">
                {["top-1 left-1/2 -translate-x-1/2", "bottom-1 left-1/2 -translate-x-1/2", "left-1 top-1/2 -translate-y-1/2", "right-1 top-1/2 -translate-y-1/2"].map((pos) => (
                  <span key={pos} aria-hidden className={cn("absolute text-[0.625rem] font-bold text-purple", pos)}>
                    1x
                  </span>
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media-kit/logos/no-clearspace/saf-horizontal-raw.svg" alt="SAF logo with clear space marked" className="w-full" />
              </div>
            </div>
          </article>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {donts.map(({ label, render }) => (
              <li key={label} className="flex flex-col overflow-hidden rounded-[1.5rem] bg-haze ring-1 ring-ink/[0.05]">
                <div aria-hidden className="flex aspect-[4/3] items-center justify-center p-6">
                  {render}
                </div>
                <p className="flex items-center gap-2 border-t border-ink/[0.06] bg-white px-4 py-3 text-sm font-semibold text-ink">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e11d48] text-white">
                    <X aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="in-use" aria-labelledby="in-use-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <SectionHead
            id="in-use"
            eyebrow="In use"
            title="The brand, out in the world."
            body="Reference mockups from the brand guidelines: signage, packaging, merchandise, and digital."
          />
          <ul className="mt-12 grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[16rem] md:grid-cols-3 lg:auto-rows-[18rem] lg:gap-4">
            {mockups.map((mockup, index) => (
              <li
                key={mockup.name}
                className={cn(
                  "group relative overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink/[0.06]",
                  index === 0 && "col-span-2 row-span-2",
                  index === 3 && "md:row-span-2",
                )}
              >
                <Image
                  src={mockup.src}
                  alt={`SAF branding on a ${mockup.name.toLowerCase()}`}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">
                  {mockup.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="on-dark relative isolate grid gap-8 overflow-hidden rounded-[2rem] bg-night p-8 text-white sm:p-12 lg:grid-cols-12 lg:items-center">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(109_43_213/0.6),transparent_55%)]" />
          <div className="lg:col-span-8">
            <p className="eyebrow text-[#c9b5ff]">Press and partners</p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em]">
              Need something that is not here?
            </h2>
            <p className="mt-3 max-w-xl text-white/75">
              Interviews, product photography, or co-branding approval — send a
              business enquiry and the team will get back to you. Please read the
              trademark usage policy before publishing.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <Link href="/contact?type=business" className={cn(buttonPrimary, "bg-white text-purple hover:bg-lavender")}>
              Contact the team
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link
              href="/legal/trademark"
              className="inline-flex h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              Trademark usage policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
