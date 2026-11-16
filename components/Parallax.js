"use client";

import { useEffect, useRef } from "react";

// Small parallax: moves its content slightly slower than the page.
// Off on phones and for reduced-motion users.
export default function Parallax({ speed = 0.12, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.parentElement.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
