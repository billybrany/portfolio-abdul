"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cv } from "@/data/cv";
import { navLinks } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";
import { withBase } from "@/lib/withBase";
import { ArrowRight, ArrowUpRight, FileText, Search } from "@/components/Icons";

const initials = cv.monogram;

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Highlight the section currently on screen: the last section whose
  // top has passed 40% of the viewport height.
  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      setActive(current);
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
  }, [isHome]);

  // Border appears once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, move focus in.
  useEffect(() => {
    if (!open) return;
    const button = buttonRef.current;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${cv.name}, home`}
        >
          {/* mini Yara circle: its color ring turns with the page scroll */}
          <span data-scroll-hue className="hue-ring grid size-10 place-items-center rounded-full p-[2px]">
            <span className="grid size-full place-items-center rounded-full bg-ink font-display text-sm italic text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
              {initials}
            </span>
          </span>
          <span className="hidden font-medium xl:inline">{cv.name}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 rounded-full border border-line bg-elev/60 p-1 text-sm lg:flex">
          {navLinks.map((link) => {
            const isActive = isHome && active === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-2 transition-colors ${
                    isActive
                      ? "bg-ink text-bg"
                      : "text-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-10 items-center gap-2 rounded-full border border-line pe-2 ps-3 text-xs text-mute transition hover:border-ink hover:text-ink lg:flex"
            aria-label="Open quick menu (Ctrl or Command + K)"
          >
            <Search className="size-3.5" strokeWidth={2} aria-hidden="true" />
            <kbd className="rounded border border-line px-1 font-mono">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full bg-ink text-bg lg:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="h-[calc(100dvh-65px)] overflow-y-auto border-t border-line bg-bg px-5 pb-10 pt-6 lg:hidden"
      >
        <ul className="space-y-1">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <Link
                href={`/#${link.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 border-b border-line py-4 font-display text-4xl transition-colors active:text-accent"
              >
                <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-accent" />
                {link.label}
                <ArrowRight className="ms-auto size-5 text-mute transition-transform group-hover:translate-x-1 group-hover:text-ink" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        {cv.cvFile && (
          <a
            href={withBase(`/${cv.cvFile}`)}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink"
          >
            <FileText className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {cv.site.heroCtaResume} (PDF)
            <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </header>
  );
}
