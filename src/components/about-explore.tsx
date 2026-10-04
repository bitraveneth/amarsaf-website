import { ArrowUpRight, BriefcaseBusiness, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aboutPages } from "@/lib/about";
import { images } from "@/lib/images";

const companyPages = [
  {
    href: "/heritage",
    label: "Our heritage",
    body: "The timeline so far, and what comes next.",
    icon: Landmark,
    image: images.heritage,
  },
  {
    href: "/careers",
    label: "Careers",
    body: "Water quality and clean production work.",
    icon: BriefcaseBusiness,
    image: images.officeJars,
  },
];

/** "Keep exploring" cards for the About section; hides the page you are on. */
export function AboutExplore({ current }: { current: string }) {
  const pages = [...aboutPages, ...companyPages].filter((page) => page.href !== current);

  return (
    <section aria-labelledby="explore-title" className="bg-haze py-20 md:py-24">
      <div className="shell">
        <p className="eyebrow text-purple">Keep exploring</p>
        <h2 id="explore-title" className="text-headline mt-4 max-w-[16ch] text-ink">
          More about SAF
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pages.map(({ href, label, body, icon: Icon, image }) => (
            <li key={href} className="reveal">
              <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgb(23_10_53/0.5)] motion-reduce:transition-none"
              >
                <span className="relative block overflow-hidden">
                  <Image
                    src={image.src}
                    alt=""
                    placeholder="blur"
                    sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <span className="absolute top-3 left-3 flex size-10 items-center justify-center rounded-xl bg-white/90 text-purple shadow-sm backdrop-blur">
                    <Icon aria-hidden className="size-5" />
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="flex items-center justify-between gap-3 font-semibold text-ink">
                    {label === "Overview" ? "About us" : label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-purple transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none"
                    />
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-ink/65">{body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
