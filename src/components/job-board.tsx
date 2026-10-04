"use client";

import { ArrowRight, BriefcaseBusiness, Check, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Job } from "@/lib/careers";
import { cn } from "@/lib/utils";

export function JobBoard({ jobs }: { jobs: Job[] }) {
  const teams = ["All teams", ...new Set(jobs.map((job) => job.team))];
  const [team, setTeam] = useState(teams[0]);
  const shown = team === teams[0] ? jobs : jobs.filter((job) => job.team === team);

  return (
    <div className="mt-10">
      <div role="group" aria-label="Filter by team" className="flex flex-wrap gap-2">
        {teams.map((item) => {
          const count = item === teams[0] ? jobs.length : jobs.filter((job) => job.team === item).length;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={item === team}
              onClick={() => setTeam(item)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 transition-colors",
                item === team
                  ? "bg-purple text-white ring-purple"
                  : "bg-white text-ink/75 ring-ink/10 hover:bg-lavender hover:text-ink",
              )}
            >
              {item}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  item === team ? "bg-white/20" : "bg-haze text-ink/60",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "role" : "roles"} shown
      </p>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {shown.map((job) => (
          <li key={job.slug}>
            <article className="group flex h-full flex-col rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.07] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_40px_80px_-45px_rgb(23_10_53/0.5)] motion-reduce:transition-none sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-lavender px-3 py-1 text-xs font-bold tracking-wide text-purple uppercase">
                  {job.team}
                </span>
                <span className="text-xs font-semibold text-ink/55">{job.type}</span>
              </div>
              <h3 className="mt-5 text-2xl text-ink">{job.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
                <li className="flex items-center gap-1.5">
                  <Clock aria-hidden className="size-4 text-purple" />
                  {job.experience}
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-4 text-purple" />
                  {job.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <BriefcaseBusiness aria-hidden className="size-4 text-purple" />
                  {job.team}
                </li>
              </ul>
              <p className="mt-5 leading-relaxed text-ink/75">{job.summary}</p>
              <h4 className="mt-6 text-xs font-bold tracking-[0.14em] text-ink/55 uppercase">What you bring</h4>
              <ul className="mt-3 grid gap-2">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#137a4b]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href={`/contact?type=careers&role=${job.slug}#enquiry`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-purple"
                >
                  Apply for this role
                  <span className="sr-only">: {job.title}</span>
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
