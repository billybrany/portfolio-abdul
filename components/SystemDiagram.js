// "How the disciplines connect": a small circuit-style system diagram for the
// About section. Four nodes (with years of experience from the CV's skills)
// wire into a central YA node; signal pulses travel along the links, and a
// node lights up on hover. Pure SVG, drawn at build time.
const NODES = [
  { key: "Product Design", label: "Design", x: 70, y: 46 },
  { key: "Front-End Engineering", label: "Engineering", x: 390, y: 46 },
  { key: "User Research", label: "Research", x: 70, y: 214 },
  { key: "Leadership", label: "Leadership", x: 390, y: 214 },
];
const CX = 230;
const CY = 130;

export default function SystemDiagram({ skills, monogram }) {
  const years = Object.fromEntries(skills.map((s) => [s.group, s.years]));
  return (
    <figure className="sysdiagram mt-10">
      <svg viewBox="0 0 460 260" className="h-auto w-full" role="img" aria-label="Diagram: design, engineering, research and leadership all connect into one practice">
        <defs>
          <pattern id="sys-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect x="0.5" y="0.5" width="459" height="259" rx="14" fill="url(#sys-grid)" stroke="var(--line)" />
        {/* corner registration marks */}
        {[[14, 14], [446, 14], [14, 246], [446, 246]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} stroke="var(--ink-mute)" strokeWidth="1" />
        ))}

        {NODES.map((n, i) => {
          // orthogonal "circuit" route from the node to the center
          const d = `M${n.x} ${n.y} H${CX + (n.x < CX ? -58 : 58)} V${CY} H${CX + (n.x < CX ? -30 : 30)}`;
          return (
            <g key={n.key}>
              <path d={d} fill="none" stroke="var(--line)" strokeWidth="1.5" />
              <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.5" className="sys-wire" pathLength="1" style={{ "--d": `${i * 180}ms` }} />
              <circle r="3" fill="var(--accent)" className="sys-pulse">
                <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}

        {/* center */}
        <circle cx={CX} cy={CY} r="44" fill="none" stroke="var(--accent)" strokeOpacity="0.25" className="sys-halo" />
        <circle cx={CX} cy={CY} r="30" fill="var(--ink)" />
        <text x={CX} y={CY + 7} textAnchor="middle" className="font-display italic" fontSize="20" fill="var(--bg)">{monogram}</text>

        {NODES.map((n) => (
          <g key={n.key} className="sys-node">
            <rect x={n.x - 62} y={n.y - 24} width="124" height="48" rx="10" fill="var(--bg-elev)" stroke="var(--line)" />
            <circle cx={n.x - 47} cy={n.y} r="4" className="sys-dot" />
            <text x={n.x - 36} y={n.y - 2} fontSize="14" fontWeight="600" fill="var(--ink)">{n.label}</text>
            <text x={n.x - 36} y={n.y + 14} fontSize="10.5" className="font-mono" fill="var(--ink-mute)">{years[n.key]} YRS</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Fig. 1 · Four disciplines, one practice</figcaption>
    </figure>
  );
}
