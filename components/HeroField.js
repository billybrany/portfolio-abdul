"use client";

import { useEffect, useRef } from "react";

// Generative hero artwork: a wireframe "terrain" drawn on a canvas.
// • The surface is computed from layered sine waves and drifts slowly.
// • It rises under the cursor, and nearby grid nodes light up in the accent
//   color and link to the pointer.
// • Scrolling shifts the wave phase, so the surface changes as you leave.
// Kept light: ~1,200 points, paused when off-screen or in a hidden tab,
// fewer points on phones, and a single still frame for reduced motion.
export default function HeroField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const COLS = small ? 26 : 46;
    const ROWS = small ? 16 : 26;
    const pts = new Float32Array(COLS * ROWS * 2);
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let w = 0;
    let h = 0;
    let ink = "#16140f";
    let accent = "#1e6b52";
    let raf = 0;
    let visible = true;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      ink = s.getPropertyValue("--ink").trim() || ink;
      accent = s.getPropertyValue("--accent").trim() || accent;
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const t = time / 1000 + window.scrollY * 0.004;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.34;
      const amp = h * 0.11;
      // project the grid
      for (let r = 0; r < ROWS; r++) {
        const z = r / (ROWS - 1); // 0 = far, 1 = near
        const s = 0.3 + 0.7 * Math.pow(z, 1.5);
        const baseY = horizon + (h * 1.02 - horizon) * Math.pow(z, 1.35);
        for (let c = 0; c < COLS; c++) {
          const x = c / (COLS - 1) - 0.5;
          const sx = w / 2 + x * w * 1.9 * s;
          let y =
            Math.sin(x * 6.2 + t * 0.45) * Math.cos(z * 5.1 - t * 0.32) * 0.55 +
            Math.sin((x + z) * 11 + t * 0.7) * 0.22 +
            Math.cos(x * 15 - z * 7 + t * 0.25) * 0.12;
          let sy = baseY - y * amp * s;
          // the surface lifts under the cursor
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 48400) sy -= Math.exp(-d2 / 9000) * 26 * s;
          const i = (r * COLS + c) * 2;
          pts[i] = sx;
          pts[i + 1] = sy;
        }
      }

      // rows (strong) and every other column (faint)
      ctx.lineWidth = 1;
      ctx.strokeStyle = ink;
      for (let r = 0; r < ROWS; r++) {
        const z = r / (ROWS - 1);
        ctx.globalAlpha = 0.04 + z * 0.2;
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const i = (r * COLS + c) * 2;
          if (c === 0) ctx.moveTo(pts[i], pts[i + 1]);
          else ctx.lineTo(pts[i], pts[i + 1]);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 0.07;
      for (let c = 0; c < COLS; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < ROWS; r++) {
          const i = (r * COLS + c) * 2;
          if (r === 0) ctx.moveTo(pts[i], pts[i + 1]);
          else ctx.lineTo(pts[i], pts[i + 1]);
        }
        ctx.stroke();
      }

      // nodes near the cursor light up and link to it
      const R = 150;
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;
      for (let i = 0; i < pts.length; i += 2) {
        const dx = pts[i] - pointer.x;
        const dy = pts[i + 1] - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > R) continue;
        const k = 1 - d / R;
        ctx.globalAlpha = k * 0.9;
        ctx.beginPath();
        ctx.arc(pts[i], pts[i + 1], 1 + k * 2.2, 0, 6.283);
        ctx.fill();
        if (d < 90) {
          ctx.globalAlpha = k * 0.35;
          ctx.beginPath();
          ctx.moveTo(pts[i], pts[i + 1]);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      draw(time);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = -9999;
    };
    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    const mo = new MutationObserver(() => {
      readColors();
      if (reduce) draw(0);
    });

    readColors();
    resize();
    draw(0);
    io.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="hero-field pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2"
    />
  );
}
