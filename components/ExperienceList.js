"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronsUpDown } from "@/components/Icons";

// Career timeline with expandable entries.
// The first role starts open; "Expand all" opens every entry.
export default function ExperienceList({ roles, projectNames }) {
  const [open, setOpen] = useState(() => new Set([0]));
  const allOpen = open.size === roles.length;

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(roles.map((_, i) => i)))}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-soft transition hover:border-ink hover:text-ink"
        >
          <ChevronsUpDown className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ol className="relative border-t border-line">
        {roles.map((job, i) => {
          const isOpen = open.has(i);
          const id = `role-${i}`;
          return (
            <li key={job.role + job.period} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-6 gap-y-1 py-6 text-start sm:grid-cols-[11rem_1fr_auto] sm:py-7"
                >
                  <span className="order-2 col-span-2 font-mono text-xs uppercase tracking-widest text-mute sm:order-none sm:col-span-1 sm:pt-2">
                    {job.period}
                  </span>
                  <span className="order-1 sm:order-none">
                    <span className="block font-display text-2xl leading-tight transition-colors group-hover:text-accent sm:text-3xl">
                      {job.role}
                    </span>
                    <span className="mt-1 block text-soft">
                      {job.company} <span className="text-mute">· {job.location}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`order-1 mt-1 grid size-9 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-ink sm:order-none ${
                      isOpen ? "rotate-45 bg-ink text-bg" : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={id}
                role="region"
                aria-label={`${job.role}, ${job.company}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="pb-8 sm:ms-[calc(11rem+1.5rem)] sm:pe-16">
                    <ul className="space-y-3 text-soft">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {(job.tech?.length > 0 || job.projects?.length > 0) && (
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        {job.tech?.map((t) => (
                          <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-soft">
                            {t}
                          </span>
                        ))}
                        {job.projects?.map((slug) => (
                          <Link
                            key={slug}
                            href={`/projects/${slug}/`}
                            className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-bg transition hover:bg-accent hover:text-accent-ink"
                          >
                            Case study: {projectNames[slug]}
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
