"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ProjectVisual from "@/components/ProjectVisual";

// Scroll-driven project showcase.
// The stage stays pinned while you scroll; every ~70% of a screen of scrolling
// moves to the next project. The category buttons jump straight to a project
// and always show which one you're on. Normal page scrolling is never blocked.
const STEP_VH = 70; // scroll distance per project

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export default function WorkShowcase({ projects }) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const outer = useRef(null);
  const bar = useRef(null);
  const chips = useRef(null);
  const activeRef = useRef(0);

  // Scroll → active project (state only changes when the project changes).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = outer.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stage = el.firstElementChild.offsetHeight;
      const distance = Math.max(rect.height - stage, 1);
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      const i = Math.min(n - 1, Math.floor(progress * n));
      if (i !== activeRef.current) {
        activeRef.current = i;
        setActive(i);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [n]);

  // Keep the active category button visible in the (mobile) chip row.
  useEffect(() => {
    const row = chips.current;
    const btn = row?.children[active];
    if (!row || !btn || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: btn.offsetLeft - row.clientWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  // Button → scroll the page to that project's slot.
  const goTo = useCallback(
    (i) => {
      const el = outer.current;
      if (!el) return;
      const stage = el.firstElementChild.offsetHeight;
      const distance = el.offsetHeight - stage;
      const top = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / n) * distance;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [n],
  );

  const p = projects[active];
  const num = (i) => String(i + 1).padStart(2, "0");

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100svh - 4rem + ${(n - 1) * STEP_VH}svh)` }}>
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center py-4 lg:py-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-10">
          {/* Category buttons: a vertical index on desktop, a swipeable row on mobile */}
          <div className="min-w-0 lg:col-span-4 lg:flex lg:flex-col lg:justify-center">
            <p className="mb-3 hidden font-mono text-xs uppercase tracking-[0.18em] text-mute lg:block">
              Scroll, or pick a category
            </p>
            <div
              ref={chips}
              role="group"
              aria-label="Projects by category"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line"
            >
              {projects.map((proj, i) => {
                const on = i === active;
                return (
                  <button
                    key={proj.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={on ? "true" : undefined}
                    aria-label={`${proj.category}: ${proj.name}`}
                    className={`group/chip shrink-0 rounded-[999px] border px-4 py-2 text-sm transition-colors duration-300 lg:flex lg:items-baseline lg:gap-4 lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-3 lg:text-start ${
                      on ? "border-ink bg-ink text-bg lg:bg-transparent lg:text-ink" : "border-line text-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    <span className={`hidden font-mono text-xs transition-colors lg:inline ${on ? "text-accent" : "text-mute"}`}>{num(i)}</span>
                    <span className="lg:flex-1">
                      <span className={`block transition-all duration-300 ${on ? "lg:translate-x-1 lg:font-medium" : ""}`}>{proj.category}</span>
                      <span className={`hidden overflow-hidden text-xs text-mute transition-all duration-500 lg:block ${on ? "max-h-6 opacity-100" : "max-h-0 opacity-0"}`}>
                        {proj.name}
                      </span>
                    </span>
                    <span aria-hidden="true" className={`hidden size-1.5 rounded-full bg-accent transition-opacity lg:block ${on ? "opacity-100" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>
            <div className="mt-4 hidden h-px w-full bg-line lg:block" aria-hidden="true">
              <div ref={bar} className="h-px origin-left scale-x-0 bg-accent" />
            </div>
          </div>

          {/* Stage */}
          <div className="min-w-0 lg:col-span-8">
            <Link href={`/projects/${p.slug}/`} className="group block" aria-label={`${p.name}: view case study`}>
              <div className="relative mx-auto w-[min(100%,calc(34svh*1.6))] sm:w-[min(100%,calc(44svh*1.6))] lg:w-[min(100%,calc(50svh*1.6))]" style={{ aspectRatio: "16 / 10" }}>
                {projects.map((proj, i) => (
                  <div
                    key={proj.slug}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                      i === active
                        ? "opacity-100 [transform:none]"
                        : i < active
                          ? "pointer-events-none -translate-y-6 scale-[0.98] opacity-0 blur-[2px]"
                          : "pointer-events-none translate-y-6 scale-[0.98] opacity-0 blur-[2px]"
                    }`}
                  >
                    <ProjectVisual project={proj} image={proj.images[0]} fit="cover" ratio="16 / 10" hover={i === active} priority={i === 0} sizes="(min-width: 1024px) 760px, 100vw" />
                  </div>
                ))}
              </div>
            </Link>

            <div key={p.slug} className="animate-fade-up mx-auto mt-5 w-[min(100%,calc(34svh*1.6))] sm:w-[min(100%,calc(44svh*1.6))] lg:mt-6 lg:w-[min(100%,calc(50svh*1.6))]">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
                <span className="text-accent">{num(active)}</span> / {num(n - 1)} · {p.organization}
              </p>
              <h3 className="mt-2 font-display text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">
                <Link href={`/projects/${p.slug}/`} className="transition-colors hover:text-accent">{p.name}</Link>
              </h3>
              <p className="mt-2 line-clamp-2 text-soft sm:line-clamp-none">{p.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="hidden rounded-full border border-line px-3 py-1 font-mono text-xs text-soft sm:inline-block">{t}</span>
                ))}
                <Link href={`/projects/${p.slug}/`} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg hover:bg-accent hover:text-accent-ink sm:ms-2">
                  View case study <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All case studies as plain links, for screen readers and no-JS */}
      <nav aria-label="All case studies" className="sr-only">
        <ul>
          {projects.map((proj) => (
            <li key={proj.slug}>
              <Link href={`/projects/${proj.slug}/`}>{proj.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
