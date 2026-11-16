"use client";

import { useEffect } from "react";

// Smooth, repeatable in-page navigation.
//
// Next.js <Link href="/#work"> does nothing when the URL already ends in
// "#work", so section buttons only worked once. This catches every click on a
// same-page "#section" link, scrolls there smoothly (headings clear the sticky
// navbar via scroll-margin), updates the URL, and plays a short arrival
// highlight. Rapid or repeated clicks always land on the right section.
export default function SmoothAnchors() {
  useEffect(() => {
    let arriveTimer = 0;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

      const url = new URL(a.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin) return;
      // Only same-page links (the hash link points at the page we're on).
      const here = window.location.pathname.replace(/\/$/, "");
      if (url.pathname.replace(/\/$/, "") !== here) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Let things like the mobile menu close (and unlock scrolling) first.
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        if (window.location.hash !== url.hash) history.pushState(null, "", url.hash);

        // Arrival highlight
        target.classList.remove("arrived");
        void target.offsetWidth; // restart the animation on repeat clicks
        target.classList.add("arrived");
        clearTimeout(arriveTimer);
        arriveTimer = setTimeout(() => target.classList.remove("arrived"), 1800);

        // Move keyboard focus to the section without another jump.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(arriveTimer);
    };
  }, []);

  return null;
}
