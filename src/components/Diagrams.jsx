// Static teaching diagrams redrawn from the slide figures.
const G = 'var(--color-gold)', A = 'var(--color-ash)', L = 'var(--color-line)', T = 'var(--color-text)', R = 'var(--color-red)';

function Fig({ caption, children, label }) {
  return (
    <figure className="not-prose my-7 rounded-2xl border border-line bg-panel p-4 font-sans">
      <div role="img" aria-label={label}>
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-ash">{caption}</figcaption>
    </figure>
  );
}

const node = (x, y, k) => <circle key={k} cx={x} cy={y} r="7" fill="var(--color-raise)" stroke={G} strokeWidth="1.5" />;

function Topologies() {
  const ring = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * 2 * Math.PI - Math.PI / 2), cy + r * Math.sin((i / n) * 2 * Math.PI - Math.PI / 2)]);
  const mesh = ring(70, 70, 42, 5);
  const star = ring(230, 70, 44, 5);
  const rg = ring(390, 70, 42, 6);
  return (
    <Fig caption="Mesh, star and ring are point-to-point; bus is multipoint." label="Mesh, star, ring and bus topologies">
      <svg viewBox="0 0 640 160" className="w-full">
        {mesh.flatMap((a, i) => mesh.slice(i + 1).map((b, j) => <line key={`m${i}${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={L} strokeWidth="1.5" />))}
        {mesh.map(([x, y], i) => node(x, y, `mn${i}`))}
        {star.map(([x, y], i) => <line key={`s${i}`} x1="230" y1="70" x2={x} y2={y} stroke={L} strokeWidth="1.5" />)}
        <rect x="220" y="60" width="20" height="20" rx="4" fill={G} />
        {star.map(([x, y], i) => node(x, y, `sn${i}`))}
        <circle cx="390" cy="70" r="42" fill="none" stroke={L} strokeWidth="1.5" />
        {rg.map(([x, y], i) => node(x, y, `rn${i}`))}
        <line x1="500" y1="70" x2="630" y2="70" stroke={G} strokeWidth="2" />
        {[515, 550, 585, 620].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="70" x2={x} y2={i % 2 ? 98 : 42} stroke={L} strokeWidth="1.5" />
            {node(x, i % 2 ? 105 : 35, `bn${i}`)}
          </g>
        ))}
        {[['Mesh', 70], ['Star', 230], ['Ring', 390], ['Bus', 565]].map(([t, x]) => (
          <text key={t} x={x} y="150" textAnchor="middle" fontSize="14" fill={T}>
            {t}
          </text>
        ))}
      </svg>
    </Fig>
  );
}

function MuxDemux() {
  const ys = [30, 70, 110];
  return (
    <Fig caption="n lines share one link: the MUX combines (many-to-one), the DEMUX separates (one-to-many)." label="Multiplexer and demultiplexer sharing one link divided into channels">
      <svg viewBox="0 0 640 140" className="w-full">
        {ys.map((y, i) => (
          <g key={y}>
            <line x1="20" y1={y} x2="150" y2={y} stroke={A} strokeWidth="1.5" />
            <line x1="490" y1={y} x2="620" y2={y} stroke={A} strokeWidth="1.5" />
            <text x="20" y={y - 6} fontSize="12" fill={A}>
              line {i + 1}
            </text>
          </g>
        ))}
        <path d="M150 15 L200 45 L200 95 L150 125 Z" fill="var(--color-raise)" stroke={G} strokeWidth="1.5" />
        <text x="172" y="75" textAnchor="middle" fontSize="13" fill={T}>
          MUX
        </text>
        <path d="M490 15 L440 45 L440 95 L490 125 Z" fill="var(--color-raise)" stroke={G} strokeWidth="1.5" />
        <text x="468" y="75" textAnchor="middle" fontSize="13" fill={T}>
          DEMUX
        </text>
        {[52, 70, 88].map((y, i) => (
          <line key={y} x1="200" y1={y} x2="440" y2={y} stroke={G} strokeOpacity={1 - i * 0.25} strokeWidth="5" />
        ))}
        <text x="320" y="40" textAnchor="middle" fontSize="13" fill={T}>
          1 link, n channels
        </text>
      </svg>
    </Fig>
  );
}

function Fiber() {
  const rows = [
    ['Multimode step-index', 'M10 30 L60 12 L110 48 L160 12 L210 48 L260 12 L300 30 M10 30 L300 30 M10 30 L80 48 L150 12 L220 48 L290 12', 'most distorted', 0],
    ['Multimode graded-index', 'M10 30 Q60 6 110 30 T210 30 T300 30 M10 30 Q70 50 130 30 T250 30 L300 30 M10 30 L300 30', 'less distorted', 1],
    ['Single mode', 'M10 30 L300 30 M10 28 L300 32', 'almost undistorted', 2],
  ];
  const pulse = (x, half, h) => `M${x - half} 46 Q${x} ${46 - h * 2} ${x + half} 46`;
  return (
    <Fig caption="Light is reflected at the core–cladding boundary. Beams that take different paths arrive at different times and spread the pulse." label="Fiber propagation modes: step-index, graded-index, single mode">
      <svg viewBox="0 -14 640 236" className="w-full">
        {rows.map(([name, d, out, i]) => (
          <g key={name} transform={`translate(0 ${i * 72})`}>
            <text x="10" y="8" fontSize="13" fill={T}>
              {name}
            </text>
            <g transform="translate(150 6)">
              <rect x="0" y={i === 2 ? 22 : 8} width="310" height={i === 2 ? 16 : 44} rx="6" fill={i === 1 ? 'url(#graded)' : 'rgb(240 195 90 / 0.07)'} stroke={L} />
              <path d={d} fill="none" stroke={G} strokeWidth="1.5" />
            </g>
            <path d={pulse(500, 24, 17)} fill="none" stroke={A} strokeWidth="1.5" />
            <path d={pulse(590, [40, 31, 25][i], [7, 11, 16][i])} fill="none" stroke={i === 0 ? R : G} strokeWidth="1.5" />
            <text x="590" y="62" textAnchor="middle" fontSize="11" fill={A}>
              {out}
            </text>
          </g>
        ))}
        <text x="500" y="214" textAnchor="middle" fontSize="11" fill={A}>
          input pulse
        </text>
        <defs>
          <linearGradient id="graded" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(240 195 90 / 0.02)" />
            <stop offset="0.5" stopColor="rgb(240 195 90 / 0.2)" />
            <stop offset="1" stopColor="rgb(240 195 90 / 0.02)" />
          </linearGradient>
        </defs>
      </svg>
    </Fig>
  );
}

function Multistage() {
  const s1 = [10, 68, 126], s2 = [36, 100], s3 = s1;
  return (
    <Fig caption="Three stages: N/n crossbars of n × k, then k crossbars of (N/n) × (N/n), then N/n crossbars of k × n. Every first-stage switch links to every middle switch." label="Three-stage multistage switch">
      <svg viewBox="0 0 640 196" className="w-full">
        {s1.flatMap((y1, i) => s2.map((y2, j) => <line key={`a${i}${j}`} x1="200" y1={y1 + 20} x2="290" y2={y2 + 20} stroke={L} strokeWidth="1.5" />))}
        {s2.flatMap((y2, j) => s3.map((y3, i) => <line key={`b${i}${j}`} x1="350" y1={y2 + 20} x2="440" y2={y3 + 20} stroke={L} strokeWidth="1.5" />))}
        {s1.map((y) => (
          <g key={`l${y}`}>
            {[8, 20, 32].map((d) => (
              <line key={d} x1="100" y1={y + d} x2="140" y2={y + d} stroke={A} />
            ))}
            <rect x="140" y={y} width="60" height="40" rx="6" fill="var(--color-raise)" stroke={G} />
            <text x="170" y={y + 25} textAnchor="middle" fontSize="12" fill={T}>
              n × k
            </text>
          </g>
        ))}
        {s2.map((y) => (
          <g key={`m${y}`}>
            <rect x="290" y={y} width="60" height="40" rx="6" fill="var(--color-raise)" stroke={G} />
            <text x="320" y={y + 25} textAnchor="middle" fontSize="11" fill={T}>
              N/n × N/n
            </text>
          </g>
        ))}
        {s3.map((y) => (
          <g key={`r${y}`}>
            <rect x="440" y={y} width="60" height="40" rx="6" fill="var(--color-raise)" stroke={G} />
            <text x="470" y={y + 25} textAnchor="middle" fontSize="12" fill={T}>
              k × n
            </text>
            {[8, 20, 32].map((d) => (
              <line key={d} x1="500" y1={y + d} x2="540" y2={y + d} stroke={A} />
            ))}
          </g>
        ))}
        {[['Stage 1', 170], ['Stage 2 (k switches)', 320], ['Stage 3', 470]].map(([t, x]) => (
          <text key={t} x={x} y="190" textAnchor="middle" fontSize="12" fill={A}>
            {t}
          </text>
        ))}
        <text x="60" y="90" textAnchor="middle" fontSize="12" fill={A}>
          N inputs
        </text>
        <text x="585" y="90" textAnchor="middle" fontSize="12" fill={A}>
          N outputs
        </text>
      </svg>
    </Fig>
  );
}

export const DIAGRAMS = { topologies: Topologies, muxdemux: MuxDemux, fiber: Fiber, multistage: Multistage };
