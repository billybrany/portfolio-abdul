"use client";

import { useEffect, useRef } from "react";

// Fades its children in when they scroll into view.
// <Reveal delay={100}>...</Reveal>   ·   <Reveal as="li">...</Reveal>
// variant: left | right | scale | rise | cascade | draw | underline (Research)
//          wipe | pop | flip | tilt-l | tilt-r | spring (Recognition)
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "",
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
    let settle = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
          // After the entrance, mark as settled so hover reacts instantly.
          settle = setTimeout(() => el.classList.add("settled"), delay + 1200);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(settle);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${variant ? `rv-${variant}` : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
