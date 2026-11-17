// Dot plot of awards by year, drawn from the awards data. Each dot is one
// award; major awards are larger and filled. Dots pop in along the axis.
export default function AwardsPlot({ awards }) {
  const years = awards.map((a) => Number(a.year));
  const min = Math.min(...years);
  const max = Math.max(...years);
  const W = 1000;
  const x = (y) => 30 + ((y - min) / (max - min)) * (W - 60);
  const stack = {};
  const sorted = [...awards].sort((a, b) => Number(a.year) - Number(b.year));
  return (
    <figure className="mb-10">
      <svg viewBox={`0 0 ${W} 96`} className="h-auto w-full" role="img" aria-label={`${awards.length} awards between ${min} and ${max}, most of them since 2020`}>
        <line x1="30" x2={W - 30} y1="64" y2="64" stroke="var(--line)" strokeWidth="1.5" />
        <line x1="30" x2={W - 30} y1="64" y2="64" stroke="var(--accent)" strokeWidth="1.5" className="draw-x" style={{ transformBox: "fill-box" }} />
        {Array.from({ length: max - min + 1 }, (_, k) => min + k).map((y) => {
          const major = y % 5 === 0;
          return (
            <g key={y}>
              <line x1={x(y)} x2={x(y)} y1="64" y2={major ? 76 : 70} stroke="var(--ink-mute)" strokeWidth="1" />
              {major && (
                <text x={x(y)} y="92" textAnchor="middle" fontSize="13" className="font-mono" fill="var(--ink-mute)">{y}</text>
              )}
            </g>
          );
        })}
        {sorted.map((a, i) => {
          const y = Number(a.year);
          const level = (stack[y] = (stack[y] || 0) + 1) - 1;
          return (
            <circle
              key={a.title}
              cx={x(y)}
              cy={50 - level * 20}
              r={a.major ? 8 : 6}
              fill={a.major ? "var(--accent)" : "var(--bg)"}
              stroke="var(--accent)"
              strokeWidth="2"
              className="pop-dot"
              style={{ "--d": `${300 + i * 90}ms` }}
            >
              <title>{`${a.year}: ${a.title}`}</title>
            </circle>
          );
        })}
      </svg>
      <figcaption className="mt-1 flex flex-wrap justify-between gap-x-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
        <span>Fig. 2 · Awards by year</span>
        <span>n = {awards.length} · ● major</span>
      </figcaption>
    </figure>
  );
}
