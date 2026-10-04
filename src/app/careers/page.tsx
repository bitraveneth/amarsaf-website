import {
  ArrowRight,
  GraduationCap,
  Handshake,
  HeartHandshake,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JobBoard } from "@/components/job-board";
import { PageIntro } from "@/components/page-intro";
import { jobs } from "@/lib/careers";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work at SAF Food & Beverage Ltd. in Dhaka: open roles in sales, quality, production, logistics, marketing, and customer care.",
};

const values = [
  { icon: Users, title: "Diversity", body: "Different perspectives. Stronger together." },
  { icon: Scale, title: "Equity", body: "Equal opportunity. Fairness for everyone." },
  { icon: HeartHandshake, title: "Inclusivity", body: "Every voice matters. Everyone belongs." },
  { icon: TrendingUp, title: "Growth", body: "Keep learning. Keep growing. Keep moving forward." },
];

const promise = [
  { icon: GraduationCap, label: "Hands-on training on modern plant systems" },
  { icon: ShieldCheck, label: "A safety-first, certified workplace" },
  { icon: Sprout, label: "Clear paths to grow with the company" },
  { icon: MessagesSquare, label: "A team that listens and gives feedback" },
];

const steps = [
  { title: "Apply", body: "Pick a role and send your details. A phone number is enough to start." },
  { title: "Conversation", body: "A short call with the hiring team about the work and what you want next." },
  { title: "Meet the team", body: "Visit the plant or the Dhaka office and meet the people you would work with." },
  { title: "Offer", body: "We confirm the role, the start date, and your first weeks of training." },
];

export default function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Careers"
        title="Build the future of pure water in Bangladesh."
        lede="Join a team that treats the cleanroom, the lab, and the delivery route as one job — and keeps raising the bar."
        image={images.lab}
        imagePosition="30% center"
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#roles"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-purple transition-colors hover:bg-lavender"
          >
            See open roles
            <span className="rounded-full bg-purple px-2 text-xs text-white tabular-nums">{jobs.length}</span>
          </a>
          <Link
            href="/contact?type=careers&role=open-application#enquiry"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Open application
          </Link>
        </div>
      </PageIntro>

      <section aria-labelledby="why-title" className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-purple">Life at SAF</p>
            <h2 id="why-title" className="text-headline mt-4 max-w-[13ch] text-ink">
              Why choose SAF?
            </h2>
          </div>
          <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
            Four values shape how we hire, how we work together, and how we grow.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, body }, index) => (
            <li
              key={title}
              className={cn(
                "reveal group relative isolate overflow-hidden rounded-[2rem] p-7 transition-[translate] duration-500 hover:-translate-y-1 motion-reduce:transition-none sm:p-8",
                index % 2 === 0 ? "bg-lavender" : "on-dark bg-purple text-white",
              )}
            >
              <Icon
                aria-hidden
                strokeWidth={1}
                className={cn(
                  "absolute -right-6 -bottom-6 -z-10 size-40 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none",
                  index % 2 === 0 ? "text-purple/[0.08]" : "text-white/10",
                )}
              />
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-2xl shadow-[0_16px_32px_-14px_rgb(109_43_213/0.7)]",
                  index % 2 === 0 ? "bg-gradient-to-br from-purple to-[#4b2cd7] text-white" : "bg-white text-purple",
                )}
              >
                <Icon aria-hidden className="size-7" />
              </span>
              <h3 className={cn("mt-10 text-2xl", index % 2 === 0 ? "text-ink" : "text-white")}>{title}</h3>
              <p className={cn("mt-2 leading-relaxed", index % 2 === 0 ? "text-ink/70" : "text-white/80")}>{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="on-dark relative isolate grid overflow-hidden rounded-[2rem] bg-night text-white lg:grid-cols-12">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(109_43_213/0.6),transparent_55%)]" />
          <div className="p-8 sm:p-12 lg:col-span-7">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-purple">
              <Handshake aria-hidden className="size-6" />
            </span>
            <p className="eyebrow mt-8 text-[#c9b5ff]">Our workplace promise</p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em] text-balance">
              A workplace built on trust, respect, collaboration, and continuous
              growth.
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {promise.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-4 text-sm font-medium ring-1 ring-white/12">
                  <Icon aria-hidden className="size-5 shrink-0 text-[#c9b5ff]" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-72 lg:col-span-5">
            <Image
              src={images.cleanroom.src}
              alt="The SAF cleanroom bottling hall."
              placeholder="blur"
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night via-night/20 to-transparent lg:bg-gradient-to-r" />
          </div>
        </div>
      </section>

      <section id="roles" aria-labelledby="roles-title" className="bg-haze py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-purple">Open roles</p>
              <h2 id="roles-title" className="text-headline mt-4 max-w-[14ch] text-ink">
                Explore opportunities.
              </h2>
            </div>
            <p className="text-lede max-w-md text-ink/70 lg:col-span-5 lg:justify-self-end">
              Find a role that matches your skills, passion, and ambition.
            </p>
          </div>
          <JobBoard jobs={jobs} />
        </div>
      </section>

      <section aria-labelledby="hiring-title" className="shell py-20 md:py-28">
        <p className="eyebrow text-purple">How we hire</p>
        <h2 id="hiring-title" className="text-headline mt-4 max-w-[14ch] text-ink">
          Four simple steps.
        </h2>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="reveal rounded-[1.75rem] bg-haze p-6 ring-1 ring-ink/[0.05] sm:p-7">
              <span className="flex size-12 items-center justify-center rounded-full bg-purple text-lg font-extrabold text-white tabular-nums">
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="on-dark relative isolate flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-purple p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(255_255_255/0.18),transparent_45%),radial-gradient(circle_at_0%_100%,#2a0e5c,transparent_60%)]" />
          <div>
            <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em]">
              Don’t see the right role?
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              Send an open application. Tell us the work you want to do, and we
              will reach out when something fits.
            </p>
          </div>
          <Link
            href="/contact?type=careers&role=open-application#enquiry"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-purple transition-colors hover:bg-lavender"
          >
            Send an open application
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
