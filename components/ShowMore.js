"use client";

import { Children, useState } from "react";
import { ChevronDown } from "@/components/Icons";

// Shows the first `initial` children of a list, with a button to show the rest.
export default function ShowMore({ initial = 6, label = "items", as: Tag = "ul", className = "", children }) {
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hidden = items.length - initial;

  return (
    <>
      <Tag className={className}>{expanded ? items : items.slice(0, initial)}</Tag>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition hover:border-ink"
        >
          {expanded ? `Show fewer ${label}` : `Show all ${items.length} ${label}`}
          <ChevronDown className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
