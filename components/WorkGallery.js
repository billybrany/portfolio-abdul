"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

// Horizontal project gallery.
//   • Native overflow scrolling with snap points (touch swipe + trackpad for free)
//   • Mouse wheel scrolls it sideways, then hands back to the page at either end
//   • Click-and-drag with momentum (mouse); a drag never triggers a click
//   • ← → buttons (disabled at the ends), ← → keys when focused
//   • Category tabs jump to a project and follow the scroll; the focused card
//     fades to full strength while the others dim
const Arrow = ({ dir = "right", className = "size-5" }) =>
  dir === "right" ? (
    <ArrowRight className={className} strokeWidth={1.8} aria-hidden="true" />
  ) : (
    <ArrowLeft className={className} strokeWidth={1.8} aria-hidden="true" />
  );

export default function WorkGallery({ projects, hint }) {
  const track = useRef(null);
  const tabs = useRef(null);
  const activeRef = useRef(0);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0, v: 0, t: 0, raf: 0 });
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const n = projects.length;
  const num = (i) => String(i + 1).padStart(2, "0");
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cards = () => [...(track.current?.querySelectorAll("[data-card]") || [])];

  // Which card is closest to the start edge; are we at an end?
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    const anchor = el.getBoundingClientRect().left + pad;
    let best = 0;
    let bestDist = Infinity;
    cards().forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - anchor);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    const max = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= max - 4) best = n - 1; // fully scrolled: last card
    activeRef.current = best;
    setActive((a) => (a === best ? a : best));
    // Ends: the first card is at the start, or the last card is reached.
    const start = el.scrollLeft <= 4;
    const end = best === n - 1 || el.scrollLeft >= max - 4;
    setEdges((e) => (e.start === start && e.end === end ? e : { start, end }));
  }, [n]);

  const goTo = useCallback((i) => {
    const el = track.current;
    const card = cards()[Math.max(0, Math.min(i, cards().length - 1))];
    if (!el || !card) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    const left = el.scrollLeft + card.getBoundingClientRect().left - el.getBoundingClientRect().left - pad;
    el.scrollTo({ left, behavior: reduce() ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()));
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Mouse wheel / vertical trackpad scroll → one project per gesture.
    // At the first or last project the page scrolls vertically as normal.
    let lastWheel = 0;
    let lastStep = 0;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // sideways trackpad: native scrolling
      if (Math.abs(e.deltaY) < 1) return;
      const now = performance.now();
      const dir = e.deltaY > 0 ? 1 : -1;
      const i = activeRef.current;
      const sameGesture = now - lastWheel < 200;
      lastWheel = now;
      const atEdge = dir > 0 ? i >= n - 1 : i <= 0 && el.scrollLeft <= 4;
      if (atEdge && now - lastStep > 600) return; // hand back to the page
      e.preventDefault();
      if (sameGesture && now - lastStep < 700) return; // one step per flick
      lastStep = now;
      if (!atEdge) goTo(i + dir);
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [measure, goTo, n]);

  // Keep the active tab visible in its own row (mobile).
  useEffect(() => {
    const row = tabs.current;
    const btn = row?.children[active];
    if (!row || !btn || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: btn.offsetLeft - row.clientWidth / 2 + btn.offsetWidth / 2, behavior: reduce() ? "auto" : "smooth" });
  }, [active]);


  const step = (dir) => goTo(active + dir);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(n - 1);
    }
  };

  // ── Click-and-drag with momentum (mouse only; touch/pen scroll natively) ──
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const d = drag.current;
    cancelAnimationFrame(d.raf);
    Object.assign(d, { active: true, moved: false, x: e.clientX, left: track.current.scrollLeft, v: 0, t: performance.now(), lastX: e.clientX });
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      track.current.classList.add("is-dragging");
      track.current.setPointerCapture?.(e.pointerId);
    }
    if (!d.moved) return;
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(now - d.t, 1); // px per ms
    d.lastX = e.clientX;
    d.t = now;
    track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const el = track.current;
    if (!d.moved) return;
    // Momentum, then let CSS snap settle on the nearest card.
    let v = d.v * 16;
    const glide = () => {
      if (Math.abs(v) < 0.5 || reduce()) {
        el.classList.remove("is-dragging");
        return;
      }
      el.scrollLeft -= v;
      v *= 0.92;
      d.raf = requestAnimationFrame(glide);
    };
    d.raf = requestAnimationFrame(glide);
  };
  // A drag must not open the card underneath.
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div>
      {/* Category tabs + controls */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          ref={tabs}
          role="tablist"
          aria-label="Projects by category"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`card-${p.slug}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => goTo(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const j = (i + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
                  goTo(j);
                  tabs.current.children[j]?.focus();
                }
              }}
              className={`shrink-0 rounded-[999px] border px-4 py-2 text-sm transition-[background-color,color,border-color] duration-500 ${
                i === active ? "border-ink bg-ink text-bg" : "border-line text-soft hover:border-ink hover:text-ink"
              }`}
            >
              {p.category}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <p className="font-mono text-sm text-mute" aria-live="polite">
            <span className="text-ink">{num(active)}</span> / {num(n - 1)}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous project"
              className="grid size-12 place-items-center rounded-full border border-line text-ink disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-bg">
              <Arrow dir="left" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next project"
              className="grid size-12 place-items-center rounded-full border border-line text-ink disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-bg">
              <Arrow />
            </button>
          </div>
        </div>
      </div>

      {/* Track: runs to the right edge of the window on large screens */}
      <div className="relative lg:mr-[calc(50%-50vw)]">
        {/* edge fades: more projects this way */}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 -left-5 z-10 w-10 sm:-left-8 bg-gradient-to-r from-bg to-transparent transition-opacity duration-500 sm:w-16 ${edges.start ? "opacity-0" : "opacity-100"}`} />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent transition-opacity duration-500 sm:w-16 ${edges.end ? "opacity-0" : "opacity-100"}`} />

        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects. Use the left and right arrow keys to move between them."
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className="gallery -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 pt-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:me-0 lg:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => {
            const on = i === active;
            return (
              <article
                key={p.slug}
                id={`card-${p.slug}`}
                data-card
                role="group"
                aria-roledescription="slide"
                aria-label={`${num(i)} of ${num(n - 1)}: ${p.name}`}
                className={`w-[86%] shrink-0 snap-start transition-[opacity,filter] duration-700 ease-out sm:w-[72%] lg:w-[min(760px,56vw)] ${
                  on ? "opacity-100" : "opacity-45 saturate-50"
                }`}
              >
                <Link
                  href={`/projects/${p.slug}/`}
                  draggable={false}
                  className="group block h-full rounded-[1.75rem] border border-line bg-elev p-3 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.45)] sm:p-4"
                >
                  <ProjectVisual project={p} image={p.images[0]} fit="cover" ratio="16 / 10" hover priority={i < 2} sizes="(min-width: 1024px) 720px, 86vw" />
                  <div className="px-2 pb-3 pt-5 sm:px-3">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-mute">
                      <span className="text-accent">{num(i)}</span> · {p.category} · {p.period}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-[1.05] transition-colors group-hover:text-accent sm:text-4xl">{p.name}</h3>
                    <p className="mt-2 max-w-xl text-soft">{p.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                        {p.tech.slice(0, 3).map((t) => (
                          <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-soft">{t}</li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 font-medium">
                        View case study
                        <span className="grid size-9 place-items-center rounded-full bg-ink text-bg transition-[transform,background-color] duration-500 group-hover:-rotate-45 group-hover:bg-accent">
                          <Arrow className="size-4" />
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
          {/* spacer so the last card can snap to the start */}
          <div aria-hidden="true" className="w-[14%] shrink-0 sm:w-[28%] lg:w-[calc(100vw-min(760px,56vw)-6rem)]" />
        </div>
      </div>
      {hint && <p className="mt-2 hidden text-sm text-mute lg:block">{hint}</p>}
    </div>
  );
}
