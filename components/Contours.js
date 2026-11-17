// Digital-topography artwork: concentric contour lines generated from sine
// functions (so they're the same on every build). Alternate rings drift slowly
// in opposite directions. Decorative only.
function ring(i, n) {
  const base = 26 + i * 15;
  const steps = 72;
  let d = "";
  for (let k = 0; k <= steps; k++) {
    const a = (k / steps) * Math.PI * 2;
    const r =
      base +
      Math.sin(a * 3 + i * 0.55) * (5 + i * 0.9) +
      Math.cos(a * 5 - i * 0.8) * (2 + i * 0.5) +
      Math.sin(a * 2 + i * 1.7) * 4;
    const x = (200 + Math.cos(a) * r * 1.25).toFixed(1);
    const y = (200 + Math.sin(a) * r).toFixed(1);
    d += `${k ? "L" : "M"}${x} ${y}`;
  }
  return { d: d + "Z", opacity: (0.55 - (i / n) * 0.4).toFixed(2) };
}

export default function Contours({ className = "", count = 14 }) {
  const rings = Array.from({ length: count }, (_, i) => ring(i, count));
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={`contours pointer-events-none ${className}`}>
      {rings.map((r, i) => (
        <path key={i} d={r.d} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity={r.opacity} className={i % 2 ? "contour-a" : "contour-b"} />
      ))}
      <circle cx="200" cy="200" r="3" fill="currentColor" />
      <path d="M200 186v-10M200 214v10M186 200h-10M214 200h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
