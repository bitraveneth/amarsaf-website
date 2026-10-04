import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
import { legalDocs } from "@/lib/legal";
import { certifications, company, products, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

const columns = [
  {
    label: "Brand",
    links: [
      { href: "/about", label: "About us" },
      { href: "/heritage", label: "Heritage" },
      { href: "/careers", label: "Careers" },
      { href: "/news", label: "News" },
      { href: "/media-kit", label: "Media kit" },
    ],
  },
  {
    label: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Products",
    links: products.map((product) => ({
      href: `/products/${product.id}`,
      label: `${product.name} ${product.size}`,
    })),
  },
  {
    label: "Legal",
    links: legalDocs.map((doc) => ({ href: `/legal/${doc.slug}`, label: doc.label })),
  },
];

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-night text-white sm:rounded-[2.5rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(48rem_26rem_at_100%_0%,rgb(109_43_213/0.5),transparent_65%),radial-gradient(36rem_22rem_at_0%_100%,rgb(75_44_215/0.32),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-24 -z-10 h-[26rem] w-[38rem] opacity-[0.07] [mask-image:radial-gradient(closest-side,black,transparent)]"
          style={{ backgroundImage: "url(/brand/pattern-2-white.svg)", backgroundSize: "400px auto" }}
        />

        <div className="@container mx-auto max-w-[84rem] px-6 pt-14 sm:px-10 md:pt-20 lg:px-14">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Link href="/" className="-m-1.5 inline-block rounded-lg p-1.5">
                <Image
                  src="/brand/saf-horizontal-tight-white.svg"
                  alt="SAF home"
                  width={1106}
                  height={303}
                  unoptimized
                  className="h-10 w-auto"
                />
              </Link>
              <address className="mt-9 grid gap-4 text-sm leading-relaxed text-white/70 not-italic">
                <p className="flex gap-3">
                  <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-[#c9b5ff]" />
                  <span>
                    <span className="block font-semibold text-white">{company.name}</span>
                    {company.address[0]}, {company.address[1]}
                    <br />
                    {company.address[2]}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone aria-hidden className="size-4 shrink-0 text-[#c9b5ff]" />
                  <span>
                    <span className="sr-only">Hotline: </span>
                    {company.hotline}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail aria-hidden className="size-4 shrink-0 text-[#c9b5ff]" />
                  <a
                    href={`mailto:${company.email}`}
                    className="rounded-sm underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {company.email}
                  </a>
                </p>
              </address>
              <Link
                href="/contact"
                className="group mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-white pr-1.5 pl-6 text-[0.9375rem] font-semibold text-purple transition-colors hover:bg-lavender"
              >
                Order Home/Office Water
                <span className="flex size-9 items-center justify-center rounded-full bg-purple text-white transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </Link>
              <div className="mt-10">
                <h2 className="eyebrow text-[#c9b5ff]">Follow SAF</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`SAF on ${social.label} (opens in a new tab)`}
                        className="flex size-11 items-center justify-center rounded-full bg-white/[0.07] text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white hover:text-purple"
                      >
                        <SocialIcon id={social.id} className="size-[1.125rem]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:pt-2 lg:pl-8">
              {columns.map((column) => (
                <nav
                  key={column.label}
                  aria-label={column.label}
                  className={cn(column.label === "Products" && "max-sm:order-last")}
                >
                  <h2 className="eyebrow text-[#c9b5ff]">{column.label}</h2>
                  <ul className="mt-6 space-y-3.5 text-[0.9375rem]">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 rounded-sm text-white/75 transition-colors hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 -translate-x-1 text-[#c9b5ff] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <p className="mt-16 -mb-[0.08em] bg-gradient-to-b from-white via-white/75 to-white/20 bg-clip-text text-[17.8cqw] leading-[0.9] font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent select-none md:mt-24">
            {company.tagline}
          </p>

          <div className="mt-8 flex flex-col gap-5 border-t border-white/10 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© 2026 {company.name}</p>
            <ul aria-label="Certifications" className="flex flex-wrap gap-2">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 font-semibold text-white/85 ring-1 ring-white/10"
                >
                  <ShieldCheck aria-hidden className="size-3.5 text-[#c9b5ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
