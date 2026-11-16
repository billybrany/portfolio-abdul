import { cv } from "@/data/cv";

// Typographic hero artwork: the "Yara circle".
// Its colored ring, glow, orbiting dot and lettering ring all turn with the
// page scroll (driven by ScrollHue via --rot), so the circle keeps evolving as
// the visitor scrolls, in both directions. Colors come from --hue-1…6 in
// globals.css, chosen to sit on the warm paper background.
export default function HeroArt() {
  return (
    <div data-scroll-hue className="relative aspect-square w-full" aria-hidden="true">
      {/* soft colored glow behind the circle */}
      <div className="hue-ring absolute inset-[16%] rounded-full opacity-40 blur-2xl dark:opacity-30" />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
          <path id="hero-ring" d="M200,200 m-172,0 a172,172 0 1,1 344,0 a172,172 0 1,1 -344,0" />
        </defs>
        <rect x="20" y="20" width="360" height="360" rx="28" fill="url(#hero-grid)" />
        <circle cx="200" cy="200" r="150" fill="var(--bg-elev)" />
        <circle cx="200" cy="200" r="104" fill="none" stroke="var(--ink)" strokeOpacity="0.18" strokeDasharray="2 6" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="var(--line)" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="var(--line)" />
        <g style={{ transformBox: "view-box", transformOrigin: "200px 200px", transform: "rotate(calc(var(--rot, 0deg) * -0.6))" }}>
          <text className="fill-[var(--ink-mute)] font-mono text-[10px] uppercase tracking-[0.32em]">
            <textPath href="#hero-ring">
              Product · Design · Engineering · Research · Product · Design · Engineering · Research ·
            </textPath>
          </text>
        </g>
        <rect x="70" y="282" width="46" height="46" rx="10" fill="var(--ink)" />
      </svg>

      {/* the colored ring: a conic gradient that rotates with scroll */}
      <div className="hue-ring hue-ring-mask absolute inset-[12.5%] rounded-full" />

      {/* orbiting dot */}
      <div className="absolute inset-[12.5%]" style={{ transform: "rotate(calc(var(--rot, 0deg) * 1.6 + 40deg))" }}>
        <span className="absolute left-1/2 top-0 size-[5%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg bg-[var(--hue-1)]" />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-display text-[clamp(4rem,10vw,7rem)] italic leading-none text-ink">{cv.monogram}</p>
          <p dir="rtl" lang="ar" className="font-arabic mt-1 text-3xl font-bold text-accent">{cv.nameArabic}</p>
        </div>
      </div>
    </div>
  );
}
