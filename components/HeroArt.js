import { cv } from "@/data/cv";

// Typographic hero artwork: YA monogram, Arabic name and a geometric
// composition of arcs and a fine grid. No portrait, by design.
export default function HeroArt() {
  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
          <path id="hero-ring" d="M200,200 m-172,0 a172,172 0 1,1 344,0 a172,172 0 1,1 -344,0" />
        </defs>
        <rect x="20" y="20" width="360" height="360" rx="28" fill="url(#hero-grid)" />
        <circle cx="200" cy="200" r="150" fill="var(--bg-elev)" stroke="var(--line)" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="236 706" strokeLinecap="round" className="origin-center animate-[spin_24s_linear_infinite]" />
        <circle cx="200" cy="200" r="104" fill="none" stroke="var(--ink)" strokeOpacity="0.2" strokeDasharray="2 6" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="var(--line)" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="var(--line)" />
        <g className="origin-center animate-[spin_60s_linear_infinite_reverse]">
          <text className="fill-[var(--ink-mute)] font-mono text-[10px] uppercase tracking-[0.32em]">
            <textPath href="#hero-ring">
              Product · Design · Engineering · Research · Product · Design · Engineering · Research ·
            </textPath>
          </text>
        </g>
        <circle cx="306" cy="94" r="10" fill="var(--accent)" />
        <rect x="70" y="282" width="46" height="46" rx="10" fill="var(--ink)" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-display text-[clamp(4rem,10vw,7rem)] italic leading-none text-ink">{cv.monogram}</p>
          <p dir="rtl" lang="ar" className="font-arabic mt-1 text-3xl font-bold text-accent">{cv.nameArabic}</p>
        </div>
      </div>
    </div>
  );
}
