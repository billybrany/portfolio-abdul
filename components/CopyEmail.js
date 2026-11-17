"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/Icons";

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
      className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition hover:border-ink hover:bg-bg/10"
    >
      {copied ? (
        <Check className="size-4" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy className="size-4" strokeWidth={1.8} aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}
