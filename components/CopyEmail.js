"use client";

import { useState } from "react";

// Copies the email to the clipboard, with a mailto fallback.
export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition hover:border-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        {copied ? (
          <path d="m5 12 5 5 9-10" />
        ) : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}
