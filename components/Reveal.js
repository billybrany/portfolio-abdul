"use client";

import { useEffect, useRef } from "react";

// Fades its children in when they scroll into view.
// <Reveal delay={100}>...</Reveal>   ·   <Reveal as="li">...</Reveal>
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Never leave content hidden: no observer support → show immediately.
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
