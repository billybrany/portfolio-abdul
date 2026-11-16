"use client";

import { useEffect } from "react";

// Drives the scroll-linked color rotation of the Yara circle (hero) and the
// navbar monogram. Sets two CSS variables on every [data-scroll-hue] element:
//   --rot  rotation in degrees, tied to how far you've scrolled (both ways)
//   --p    page progress 0 → 1
// One rAF-throttled listener, no React re-renders. Off for reduced motion.
export default function ScrollHue() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let els = [];
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(y / max, 1) : 0;
      const rot = `${(y * 0.22).toFixed(1)}deg`;
      for (const el of els) {
        el.style.setProperty("--rot", rot);
        el.style.setProperty("--p", p.toFixed(4));
      }
    };
    const collect = () => {
      els = [...document.querySelectorAll("[data-scroll-hue]")];
      update();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    collect();
    // Pick up elements on client-side page changes.
    const mo = new MutationObserver(() => {
      if (document.querySelectorAll("[data-scroll-hue]").length !== els.length) collect();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
