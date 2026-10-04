import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageIntro } from "@/components/page-intro";
import { company, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on SAF 8-stage purification, minerals, Dhaka delivery, returnable 18 L jars, certifications, and starting a supply.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Straight answers before you order."
        lede="Purification, minerals, where the trucks go, and how a jar comes back."
      />
      <section className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="text-lede text-ink/70">
              Six questions we hear from households and office managers in
              Dhaka. Anything else goes through the contact form.
            </p>
            <div className="on-dark mt-8 rounded-[1.75rem] bg-night p-7 text-white">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">Still deciding?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Write to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="rounded-sm font-semibold text-white underline underline-offset-4"
                >
                  {company.email}
                </a>{" "}
                or send the form.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-purple transition-colors hover:bg-lavender"
              >
                Contact the desk
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </aside>
        <Accordion className="border-t-2 border-ink lg:col-span-8">
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={item.q} className="border-b border-ink/15">
              <AccordionTrigger className="items-center gap-4 rounded-none py-6 text-lg font-semibold text-ink hover:no-underline hover:text-purple md:gap-6 md:py-7 md:text-xl [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-purple">
                <span className="w-7 shrink-0 text-sm font-semibold text-purple tabular-nums">
                  0{index + 1}
                </span>
                <span className="flex-1 tracking-[-0.015em]">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-7 pl-11 text-base leading-relaxed text-ink/75 md:pl-[3.25rem] md:text-lg">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
