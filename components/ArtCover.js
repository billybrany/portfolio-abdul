// Designed cover artwork for a project, drawn in SVG from `project.art`.
// Shown wherever a project image file has not been added yet, so every
// project always has a distinctive, on-brand visual (never stock photos).

function Motif({ motif, fg, accent }) {
  const line = { stroke: fg, strokeOpacity: 0.22, fill: "none", strokeWidth: 1.2 };
  switch (motif) {
    case "grid": // design tokens: swatch grid
      return (
        <g>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={430 + c * 36} y={70 + r * 36} width="26" height="26" rx="7"
                fill={(r + c) % 7 === 0 ? accent : fg} fillOpacity={(r + c) % 7 === 0 ? 0.95 : 0.06 + ((r * c) % 5) * 0.04} />
            )),
          )}
          <circle cx="640" cy="400" r="70" {...line} strokeOpacity="0.35" />
          <circle cx="640" cy="400" r="40" fill={accent} fillOpacity="0.25" />
        </g>
      );
    case "pulse": // telemedicine: heartbeat line + rings
      return (
        <g>
          {[60, 110, 160, 210].map((r) => (
            <circle key={r} cx="620" cy="220" r={r} {...line} />
          ))}
          <path d="M0 330 H380 l25 -60 30 120 30 -170 30 140 20 -30 H800" stroke={accent} strokeWidth="4" fill="none" strokeLinejoin="round" />
        </g>
      );
    case "rings": // savings goals: progress rings
      return (
        <g transform="translate(610 230)">
          {[150, 115, 80].map((r, i) => (
            <g key={r}>
              <circle r={r} {...line} strokeWidth="14" strokeOpacity="0.1" />
              <circle r={r} fill="none" stroke={i === 0 ? accent : fg} strokeOpacity={i === 0 ? 1 : 0.5 - i * 0.12}
                strokeWidth="14" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * r * (0.78 - i * 0.18)} 2000`} transform="rotate(-90)" />
            </g>
          ))}
        </g>
      );
    case "code": // code editor: code lines + cursor
      return (
        <g>
          {[[0, 180], [30, 120], [30, 220], [60, 90], [30, 160], [0, 60], [0, 200], [30, 140]].map(([x, w], i) => (
            <rect key={i} x={440 + x} y={80 + i * 34} width={w} height="12" rx="6" fill={i === 4 ? accent : fg} fillOpacity={i === 4 ? 0.9 : 0.16} />
          ))}
          <rect x="440" y="76" width="2" height="280" fill={fg} fillOpacity="0.15" />
          <rect x="640" y="210" width="3" height="22" fill={accent} />
        </g>
      );
    case "type": // typography: baselines with varying density
      return (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="420" x2="780" y1={70 + i * (22 + i * 3)} y2={70 + i * (22 + i * 3)} {...line} strokeOpacity={0.12 + i * 0.03} />
          ))}
          <rect x="420" y="250" width="200" height="4" fill={accent} />
        </g>
      );
    case "mirror": // RTL: mirrored blocks
      return (
        <g>
          <line x1="600" x2="600" y1="40" y2="460" stroke={accent} strokeWidth="2" strokeDasharray="6 8" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={600 - 40 - (i % 2 ? 90 : 150)} y={90 + i * 80} width={i % 2 ? 90 : 150} height="44" rx="12" fill={fg} fillOpacity="0.14" />
              <rect x="640" y={90 + i * 80} width={i % 2 ? 90 : 150} height="44" rx="12" fill={i === 1 ? accent : fg} fillOpacity={i === 1 ? 0.9 : 0.14} />
            </g>
          ))}
        </g>
      );
    case "scan": // accessibility: scanned boxes with flags
      return (
        <g>
          {[[440, 80, 150, 90], [610, 80, 150, 40], [610, 140, 150, 30], [440, 190, 320, 70], [440, 280, 200, 60], [660, 280, 100, 60]].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="none" stroke={i % 3 === 0 ? accent : fg} strokeOpacity={i % 3 === 0 ? 0.95 : 0.25} strokeWidth="2" strokeDasharray={i % 3 === 0 ? "0" : "5 6"} />
          ))}
          <rect x="420" y="225" width="360" height="2" fill={accent} fillOpacity="0.7" />
        </g>
      );
    case "route": // ride matching: route between points
      return (
        <g>
          <path d="M440 380 C 520 200, 600 420, 680 230 S 760 120, 760 110" stroke={fg} strokeOpacity="0.35" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
          {[[440, 380], [600, 330], [760, 110]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="18" fill={i === 2 ? accent : "none"} stroke={i === 2 ? accent : fg} strokeOpacity="0.6" strokeWidth="2" />
              <circle cx={x} cy={y} r="5" fill={i === 2 ? fg : accent} />
            </g>
          ))}
        </g>
      );
    default:
      return null;
  }
}

export default function ArtCover({ project, label, className = "" }) {
  const { bg, fg, accent, motif } = project.art;
  return (
    <div
      role="img"
      aria-label={`${project.name}: cover artwork`}
      className={`@container relative h-full w-full overflow-hidden ${className}`}
      style={{ background: bg, color: fg }}
    >
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`dots-${project.slug}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill={fg} fillOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#dots-${project.slug})`} />
        <Motif motif={motif} fg={fg} accent={accent} />
      </svg>

      {project.nameArabic && (
        <span
          aria-hidden="true"
          dir="rtl"
          lang="ar"
          className="font-arabic pointer-events-none absolute bottom-[4%] start-[5%] leading-[1.1]"
          style={{ fontSize: "clamp(3rem, 22cqw, 13rem)", color: accent, opacity: 0.95, fontWeight: 800 }}
        >
          {project.nameArabic}
        </span>
      )}
      {!project.nameArabic && (
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute bottom-[7%] start-[5%] max-w-[55%] italic leading-[0.9]"
          style={{ fontSize: "clamp(1.8rem, 9cqw, 5rem)", color: accent }}
        >
          {project.name.split(" ").slice(0, 2).join(" ")}
        </span>
      )}
      {label && (
        <span className="absolute end-4 top-4 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ background: `${fg}1a`, color: fg }}>
          {label}
        </span>
      )}
    </div>
  );
}
