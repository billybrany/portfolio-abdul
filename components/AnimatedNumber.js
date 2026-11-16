"use client";

import { useEffect, useRef } from "react";

// Counts every number inside a value up from zero when it first scrolls into
// view, keeping the original formatting: "610,000", "9M+", "22 → 6",
// "20% → 3%", "SAR 2,300", "+19%", "3.1M". Text without digits just shows.
// The final value is in the HTML from the start (no-JS, SEO, screen readers),
// it runs once, and reduced-motion users see the final value immediately.
const NUM = /\d[\d,]*(?:\.\d+)?/g;

function format(n, template) {
  const decimals = (template.split(".")[1] || "").length;
  const fixed = n.toFixed(decimals);
  if (!template.includes(",")) return fixed;
  const [int, dec] = fixed.split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dec ? `.${dec}` : "");
}

export default function AnimatedNumber({ value, duration = 1600, className = "" }) {
  const ref = useRef(null);
  const text = String(value);

  useEffect(() => {
    const el = ref.current;
    const tokens = text.match(NUM);
    if (!el || !tokens) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = tokens.map((t) => parseFloat(t.replace(/,/g, "")));
    const render = (k) => {
      let i = 0;
      el.textContent = text.replace(NUM, (t) => format(targets[i++] * k, t));
    };

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          render(t === 1 ? 1 : 1 - Math.pow(2, -10 * t)); // easeOutExpo
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        render(0);
        el.classList.add("num-in");
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={`num tabular-nums ${className}`}>
      {text}
    </span>
  );
}
