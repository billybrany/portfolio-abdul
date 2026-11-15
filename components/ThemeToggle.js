"use client";

import { useSyncExternalStore } from "react";

// Watches the "dark" class on <html> so every toggle stays in sync
// (the navbar button and the ⌘K menu both change it).
function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export function toggleTheme() {
  const root = document.documentElement;
  const dark = !root.classList.contains("dark");
  root.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

export function useIsDark() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function ThemeToggle({ className = "" }) {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`grid size-10 place-items-center rounded-full border border-line text-ink transition hover:border-ink ${className}`}
    >
      {/* Sun / moon, swapped with a rotation */}
      <svg
        viewBox="0 0 24 24"
        className="size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {dark ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
