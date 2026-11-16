"use client";

import Link from "next/link";
import { useState } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";

// Editorial grid: flagship projects get large, varied layouts;
// supporting projects are listed as compact rows. Filterable by category.
const SPANS = ["lg:col-span-12", "lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const RATIOS = ["16 / 8", "16 / 11", "4 / 3.6", "4 / 3.6", "16 / 11"];

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export default function WorkGrid({ projects }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Flagship", ...new Set(projects.map((p) => p.category))];

  const matches = (p) =>
    filter === "All" || (filter === "Flagship" ? p.flagship : p.category === filter);
  const flagship = projects.filter((p) => p.flagship && matches(p));
  const supporting = projects.filter((p) => !p.flagship && matches(p));
  const count = flagship.length + supporting.length;
  const number = (p) => String(projects.indexOf(p) + 1).padStart(2, "0");

  return (
    <>
      <div role="group" aria-label="Filter projects" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              filter === c ? "border-ink bg-ink text-bg" : "border-line text-soft hover:border-ink hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {count} of {projects.length} projects
      </p>

      {flagship.length > 0 && (
        <ul className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {flagship.map((p, i) => {
            const big = i % 5 === 0;
            return (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 120} className={SPANS[i % 5]}>
                <Link href={`/projects/${p.slug}/`} className="group block">
                  <ProjectVisual
                    project={p}
                    image={p.images[0]}
                    fit="cover"
                    ratio={RATIOS[i % 5]}
                    priority={i === 0}
                    hover
                    sizes={big ? "(min-width: 1024px) 1150px, 100vw" : "(min-width: 1024px) 680px, 100vw"}
                  />
                  <div className={`mt-6 grid gap-4 ${big ? "lg:grid-cols-12" : ""}`}>
                    <div className={big ? "lg:col-span-7" : ""}>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
                        <span className="text-accent">{number(p)}</span> · {p.category} · {p.organization}
                      </p>
                      <h3 className={`mt-3 font-display leading-[1.02] transition-colors group-hover:text-accent ${big ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}>
                        {p.name}
                      </h3>
                    </div>
                    <div className={big ? "lg:col-span-5 lg:pt-8" : ""}>
                      <p className="text-soft">{p.summary}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {p.tech.slice(0, 4).map((t) => (
                          <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-soft">{t}</span>
                        ))}
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 font-medium">
                        <span className="link-u">View case study</span>
                        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><Arrow /></span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      )}

      {supporting.length > 0 && (
        <div className={flagship.length ? "mt-24" : ""}>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-mute">Supporting projects</h3>
          <ul className="border-t border-line">
            {supporting.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 90} className="border-b border-line">
                <Link href={`/projects/${p.slug}/`} className="group grid items-center gap-5 py-7 sm:grid-cols-12 sm:gap-6">
                  <span className="hidden font-mono text-xs text-accent sm:col-span-1 sm:block">{number(p)}</span>
                  <div className="sm:col-span-7 lg:col-span-6">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
                      <span className="sm:hidden">{number(p)} · </span>{p.category} · {p.period}
                    </p>
                    <h4 className="mt-2 font-display text-3xl leading-tight transition-colors group-hover:text-accent">{p.name}</h4>
                    <p className="mt-2 text-soft">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-soft">{t}</span>
                      ))}
                      <span className="inline-flex items-center gap-1.5 px-1 text-sm font-medium">
                        View case study <Arrow />
                      </span>
                    </div>
                  </div>
                  <div className="order-first sm:order-none sm:col-span-4 lg:col-span-4 lg:col-start-9">
                    <ProjectVisual project={p} image={p.images[0]} fit="cover" ratio="16 / 10" hover sizes="(min-width: 640px) 380px, 100vw" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
