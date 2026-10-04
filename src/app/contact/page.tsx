import { ArrowRight, BriefcaseBusiness, CircleHelp, MapPin, Palette, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { SocialIcon } from "@/components/social-icon";
import { enquiryTypes, isEnquiryType } from "@/lib/contact";
import { images } from "@/lib/images";
import { company, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SAF Food & Beverage Ltd. in Bashundhara, Dhaka: product enquiries, business and distribution, customer support, and careers.",
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.address.join(", ")}`,
)}`;

const moreHelp = [
  { href: "/faq", label: "FAQ", body: "Quick answers on delivery, jars, and minerals.", icon: CircleHelp },
  { href: "/careers", label: "Careers", body: "Open roles at the plant and in Dhaka.", icon: BriefcaseBusiness },
  { href: "/media-kit", label: "Media kit", body: "Logos and brand guidelines for press.", icon: Palette },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { type, role, product } = await searchParams;
  const defaultType = isEnquiryType(type) ? type : "product";
  const defaultRole = typeof role === "string" ? role : undefined;
  const defaultProduct = typeof product === "string" ? product : undefined;

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="How can we help?"
        lede="Choose the kind of enquiry and the right team picks it up. Prefer to talk? Call the hotline."
        image={images.texture}
        overlap
      />

      <section aria-label="Ways to reach SAF" className="shell relative z-10 lg:-mt-40">
        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-0">
          {enquiryTypes.slice(0, 3).map(({ id, title, body, cta, icon: Icon }) => (
            <li key={id}>
              <Link
                href={`/contact?type=${id}#enquiry`}
                className="group flex h-full flex-col rounded-[2rem] bg-white p-7 shadow-[0_40px_90px_-50px_rgb(23_10_53/0.6)] ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_50px_100px_-50px_rgb(23_10_53/0.7)] motion-reduce:transition-none sm:p-8"
              >
                <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-[#4b2cd7] text-white shadow-[0_16px_32px_-14px_rgb(109_43_213/0.8)] transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none">
                  <Icon aria-hidden className="size-7" />
                </span>
                <span className="mt-8 text-2xl font-bold tracking-[-0.03em] text-ink">{title}</span>
                <span className="mt-2 flex-1 text-ink/65">{body}</span>
                <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-haze px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors group-hover:bg-purple group-hover:text-white group-hover:ring-purple">
                  {cta}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="shell grid gap-6 py-20 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="grid content-start gap-4 lg:col-span-4">
          <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-night p-7 text-white sm:p-8">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(109_43_213/0.6),transparent_60%)]" />
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-purple">
              <Phone aria-hidden className="size-5" />
            </span>
            <h2 className="eyebrow mt-8 text-[#c9b5ff]">Hotline</h2>
            <p className="mt-2 text-[1.75rem] font-extrabold tracking-[-0.03em] tabular-nums">{company.hotline}</p>
            <p className="mt-2 text-sm text-white/70">The fastest way to reach us about a delivery or an order.</p>
          </div>

          <div className="rounded-[2rem] bg-haze p-7 ring-1 ring-ink/[0.05] sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-purple shadow-sm">
              <MapPin aria-hidden className="size-5" />
            </span>
            <h2 className="eyebrow mt-8 text-ink/55">Visit us</h2>
            <address className="mt-2 leading-relaxed text-ink not-italic">
              <span className="font-semibold">{company.name}</span>
              <br />
              {company.address[0]}, {company.address[1]}
              <br />
              {company.address[2]}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple underline-offset-4 hover:underline"
            >
              Open in Google Maps
              <ArrowRight aria-hidden className="size-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="rounded-[2rem] bg-haze p-7 ring-1 ring-ink/[0.05] sm:p-8">
            <h2 className="eyebrow text-ink/55">Follow SAF</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SAF on ${social.label} (opens in a new tab)`}
                    className="flex size-11 items-center justify-center rounded-full bg-white text-ink/75 ring-1 ring-ink/10 transition-colors hover:bg-purple hover:text-white hover:ring-purple"
                  >
                    <SocialIcon id={social.id} className="size-[1.125rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/[0.07] shadow-[0_40px_100px_-60px_rgb(23_10_53/0.5)] sm:p-10 lg:col-span-8">
          <h2 id="enquiry-title" className="text-title text-ink">
            Send an enquiry
          </h2>
          <p className="mt-2 mb-8 text-ink/65">Phone is enough — email is optional.</p>
          <ContactForm
            key={`${defaultType}-${defaultRole ?? ""}-${defaultProduct ?? ""}`}
            defaultType={defaultType}
            defaultRole={defaultRole}
            defaultProduct={defaultProduct}
          />
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-haze py-16 md:py-20">
        <div className="shell">
          <h2 id="more-title" className="text-2xl text-ink">
            Other ways we can help
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {moreHelp.map(({ href, label, body, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full items-center gap-5 rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/[0.06] transition-colors hover:ring-purple/40"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lavender text-purple transition-colors group-hover:bg-purple group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{label}</span>
                    <span className="mt-0.5 block text-sm text-ink/60">{body}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-purple transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
