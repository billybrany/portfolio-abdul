"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { cv } from "@/data/cv";
import { navLinks } from "@/lib/nav";
import { withBase } from "@/lib/withBase";
import { toggleTheme } from "@/components/ThemeToggle";

// Quick menu: press ⌘K / Ctrl+K (or "/") anywhere to jump to a section,
// open a project, copy the email or switch theme, all from the keyboard.
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const lastFocus = useRef(null);

  const items = useMemo(() => {
    const list = [
      ...navLinks.map((l) => ({
        group: "Go to",
        label: l.label,
        run: () => router.push(`/#${l.id}`),
      })),
      ...cv.projects.map((p) => ({
        group: "Projects",
        label: p.name,
        hint: p.category,
        run: () => router.push(`/projects/${p.slug}/`),
      })),
      {
        group: "Actions",
        label: "Copy email address",
        hint: cv.contact.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(cv.contact.email);
            setToast("Email copied");
          } catch {
            window.location.href = `mailto:${cv.contact.email}`;
          }
        },
      },
      { group: "Actions", label: "Switch light / dark", run: toggleTheme },
      cv.cvFile && {
        group: "Actions",
        label: "View résumé (PDF)",
        run: () => window.open(withBase(`/${cv.cvFile}`), "_blank"),
      },
      ...(cv.contactIsLive
        ? cv.contact.links.map((l) => ({
            group: "Links",
            label: l.label,
            run: () => window.open(l.url, "_blank", "noopener"),
          }))
        : []),
    ];
    return list.filter(Boolean);
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const show = () => {
    lastFocus.current = document.activeElement;
    setQuery("");
    setIndex(0);
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
    lastFocus.current?.focus?.();
  };

  // Global shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) hide();
        else show();
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", show);
    };
  });

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const runItem = (item) => {
    hide();
    item?.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(results[index]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && hide()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Quick menu"
            className="animate-pop w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-elev shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <svg
                viewBox="0 0 24 24"
                className="size-4 shrink-0 text-mute"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, project or action…"
                className="h-14 w-full bg-transparent text-ink outline-none focus-visible:outline-none placeholder:text-mute"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={
                  results[index] ? `palette-${index}` : undefined
                }
                aria-label="Search"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute">
                ESC
              </kbd>
            </div>
            <ul
              id="palette-list"
              role="listbox"
              className="max-h-[50vh] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-mute">
                  No results for “{query}”
                </li>
              )}
              {results.map((item, i) => {
                const header = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.group + item.label} role="presentation">
                    {header && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                        {item.group}
                      </p>
                    )}
                    <div
                      id={`palette-${i}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => runItem(item)}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm ${
                        i === index ? "bg-ink text-bg" : "text-ink"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hint && (
                        <span
                          className={`truncate font-mono text-xs ${i === index ? "opacity-70" : "text-mute"}`}
                        >
                          {item.hint}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-mute">
              <span>↑↓ move</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-bg transition-all duration-300 ${
          toast ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {toast}
      </div>
    </>
  );
}
