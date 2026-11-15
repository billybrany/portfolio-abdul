"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cv } from "@/data/cv";
import { navLinks } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";

const initials = cv.name
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

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

  // Highlight the section currently on screen.
  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
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
          <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-sm italic text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
            {initials}
          </span>
          <span className="hidden font-medium md:inline">{cv.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-elev/60 p-1 text-sm sm:flex">
          {navLinks.map((link) => {
            const isActive = isHome && active === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-4 py-2 transition-colors ${
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
            className="hidden h-10 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-mute transition hover:border-ink hover:text-ink lg:flex"
            aria-label="Open quick menu"
          >
            <kbd className="font-mono">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full bg-ink text-bg sm:hidden"
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
        className="h-[calc(100dvh-65px)] overflow-y-auto border-t border-line bg-bg px-5 pb-10 pt-6 sm:hidden"
      >
        <ul className="space-y-1">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <Link
                href={`/#${link.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl"
              >
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${cv.contact.email}`}
          className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 font-medium text-accent-ink"
        >
          {cv.contact.email}
        </a>
      </div>
    </header>
  );
}
