// Parameterised exam diagrams, redrawn from the slide and note figures so answers can be drawn the same way.
// Each one is used from data blocks as { type: 'diagram', id, props }.
import { Fig, Arrows, G, A, L, T, R, RAISE } from './Fig.jsx';
import { diffManchester } from '../lib/solvers.js';

const txt = (x, y, s, o = {}) => (
  <text x={x} y={y} fontSize={o.size ?? 12} fill={o.fill ?? T} textAnchor={o.anchor ?? 'middle'} fontWeight={o.bold ? 600 : undefined} fontStyle={o.italic ? 'italic' : undefined}>
    {s}
  </text>
);

// ---------- Frequency spectrum: bands, guard bands, carriers and dimension lines ----------
// segs: [{ w, kind: 'band' | 'guard' | 'gap' | 'none' | 'empty', label, fc }]; positions are segment index + fraction.
function Spectrum({ segs, spans = [], ticks = [], unit = '', caption, label = 'Frequency spectrum' }) {
  const x0 = 26, x1 = 596;
  const total = segs.reduce((a, s) => a + (s.w ?? 1), 0);
  const edges = [x0];
  segs.forEach((s) => edges.push(edges.at(-1) + ((s.w ?? 1) / total) * (x1 - x0)));
  const at = (p) => {
    const i = Math.min(Math.floor(p), segs.length - 1);
    return edges[i] + (p - i) * (edges[i + 1] - edges[i]);
  };
  const rows = spans.length ? Math.max(...spans.map((s) => s.row ?? 0)) + 1 : 0;
  const top = 14 + rows * 26;
  const base = top + 70;
  const H = base + 46;
  return (
    <Fig caption={caption} label={label}>
      <svg viewBox={`0 0 640 ${H}`} className="w-full">
        <Arrows />
        {spans.map((s, i) => {
          const y = 18 + (s.row ?? 0) * 26;
          const a = at(s.from), b = at(s.to);
          return (
            <g key={`s${i}`}>
              <line x1={a} y1={y - 6} x2={a} y2={y + 6} stroke={A} />
              <line x1={b} y1={y - 6} x2={b} y2={y + 6} stroke={A} />
              <line x1={a + 1} y1={y} x2={b - 1} y2={y} stroke={A} markerStart="url(#arrow-a)" markerEnd="url(#arrow-a)" />
              <rect x={(a + b) / 2 - s.label.length * 3.4 - 4} y={y - 9} width={s.label.length * 6.8 + 8} height="16" rx="4" fill="var(--color-panel)" />
              {txt((a + b) / 2, y + 4, s.label, { size: 12, fill: s.red ? R : T })}
            </g>
          );
        })}
        {segs.map((s, i) => {
          const a = edges[i], b = edges[i + 1], c = (a + b) / 2;
          const kind = s.kind ?? 'band';
          if (kind === 'gap') return <g key={i}>{txt(c, base - 26, '· · ·', { size: 16, fill: A })}</g>;
          if (kind === 'none') return null;
          if (kind === 'guard')
            return (
              <g key={i}>
                <rect x={a} y={top + 30} width={b - a} height={base - top - 30} fill="rgb(232 88 74 / 0.12)" stroke={R} strokeDasharray="3 3" />
                {b - a > 14 && txt(c, base - 12, s.label ?? 'G', { size: 10, fill: R })}
              </g>
            );
          const r = Math.min(10, (b - a) / 3);
          const d = `M${a} ${base} C${a} ${top + r} ${a} ${top} ${a + r} ${top} L${b - r} ${top} C${b} ${top} ${b} ${top + r} ${b} ${base} Z`;
          return (
            <g key={i}>
              <path d={d} fill={kind === 'empty' ? 'none' : `rgb(240 195 90 / ${i % 2 ? 0.3 : 0.18})`} stroke={kind === 'empty' ? A : G} strokeDasharray={kind === 'empty' ? '4 3' : undefined} strokeWidth="1.3" />
              {s.label && txt(c, top + 18, s.label, { size: (b - a) < 44 ? 10 : 12, fill: kind === 'empty' ? A : T })}
              {s.sub && txt(c, top + 32, s.sub, { size: 10, fill: A })}
              {s.fc && (
                <>
                  <line x1={c} y1={base} x2={c} y2={top + 40} stroke={R} strokeWidth="1.5" markerEnd="url(#arrow-r)" />
                  {txt(c, base + 32, s.fc, { size: 11, fill: R })}
                </>
              )}
            </g>
          );
        })}
        <line x1={x0 - 10} y1={base} x2={x1 + 30} y2={base} stroke={A} strokeWidth="1.3" markerEnd="url(#arrow-a)" />
        {txt(x1 + 30, base + 32, unit, { size: 11, fill: A, anchor: 'end' })}
        {ticks.map(([p, t], i) => (
          <g key={`t${i}`}>
            <line x1={at(p)} y1={base} x2={at(p)} y2={base + 5} stroke={A} />
            {txt(at(p), base + 17, t, { size: 11, fill: A })}
          </g>
        ))}
      </svg>
    </Fig>
  );
}

// ---------- FDM analog hierarchy (staircase of multiplexers) ----------
const HIERARCHY = [
  { input: '12 voice ch', name: 'Group', bw: '48 kHz' },
  { input: '5 groups', name: 'Supergroup', bw: '240 kHz' },
  { input: '10 supergroups', name: 'Master group', bw: '2.52 MHz' },
  { input: '6 master groups', name: 'Jumbo group', bw: '16.984 MHz' },
];
function Hierarchy({ levels = HIERARCHY, kind = 'FDM', first = '4 kHz each', caption = 'Each level is an FDM multiplexer whose output is one input of the next level.' }) {
  const mux = (x, y) => `M${x} ${y} L${x + 26} ${y + 14} L${x + 26} ${y + 56} L${x} ${y + 70} Z`;
  return (
    <Fig caption={caption} label={`${kind} hierarchy`}>
      <svg viewBox="0 0 640 290" className="w-full">
        <Arrows />
        {levels.map((lv, i) => {
          const x = 92 + i * 140, y = 30 + i * 46;
          const next = i < levels.length - 1;
          return (
            <g key={lv.name}>
              {[12, 26, 44, 58].map((dy, k) => (i === 0 || k > 0 ? <line key={dy} x1={x - 46} y1={y + dy} x2={x - 2} y2={y + dy} stroke={A} markerEnd="url(#arrow-a)" /> : null))}
              {txt(x - 26, y + 39, '⋮', { size: 12, fill: A })}
              <path d={mux(x, y)} fill={RAISE} stroke={G} strokeWidth="1.5" />
              <text x={x + 16} y={y + 35} fontSize="10" fill={T} textAnchor="middle" transform={`rotate(90 ${x + 16} ${y + 35})`}>
                {kind}
              </text>
              {txt(x - 4, y + 88, lv.input, { size: 11, fill: A })}
              {i === 0 && txt(x - 4, y + 101, first, { size: 10, fill: A })}
              {next ? (
                <path d={`M${x + 26} ${y + 35} L${x + 116} ${y + 35} L${x + 116} ${y + 58} L${x + 138} ${y + 58}`} fill="none" stroke={G} strokeWidth="1.5" markerEnd="url(#arrow-g)" />
              ) : (
                <line x1={x + 26} y1={y + 35} x2={630} y2={y + 35} stroke={G} strokeWidth="1.5" markerEnd="url(#arrow-g)" />
              )}
              {txt(x + 72, y + 12, lv.name, { size: 12, bold: true })}
              {txt(x + 72, y + 27, lv.bw, { size: 11, fill: G })}
            </g>
          );
        })}
      </svg>
    </Fig>
  );
}

// ---------- QPSK implementation (Fig 5.11) ----------
function QpskImpl() {
  return (
    <Fig caption="The 2/1 converter sends the 1st bit to the in-phase branch and the 2nd bit to the quadrature branch (carrier shifted 90°). The two BPSK signals are added." label="QPSK implementation block diagram">
      <svg viewBox="0 0 640 210" className="w-full">
        <Arrows />
        {txt(36, 96, 'NRZ-L', { size: 12 })}
        {txt(36, 112, '00 10 01 11', { size: 10, fill: A })}
        <line x1="10" y1="122" x2="78" y2="122" stroke={A} markerEnd="url(#arrow-a)" />
        <rect x="80" y="100" width="70" height="44" rx="6" fill={RAISE} stroke={G} />
        {txt(115, 120, '2/1', { size: 12 })}
        {txt(115, 134, 'converter', { size: 10 })}
        <path d="M150 112 L190 112 L190 46 L364 46" fill="none" stroke={A} markerEnd="url(#arrow-a)" />
        <path d="M150 132 L190 132 L190 176 L364 176" fill="none" stroke={A} markerEnd="url(#arrow-a)" />
        {txt(278, 38, '1st bit (in-phase)', { size: 11, fill: A })}
        {txt(278, 196, '2nd bit (quadrature)', { size: 11, fill: A })}
        {[46, 176].map((y) => (
          <g key={y}>
            <circle cx="380" cy={y} r="15" fill={RAISE} stroke={G} strokeWidth="1.5" />
            {txt(380, y + 5, '×', { size: 16 })}
          </g>
        ))}
        <rect x="340" y="98" width="80" height="26" rx="6" fill={RAISE} stroke={G} />
        {txt(380, 115, 'Oscillator fc', { size: 10 })}
        <line x1="380" y1="98" x2="380" y2="63" stroke={A} markerEnd="url(#arrow-a)" />
        <line x1="380" y1="124" x2="380" y2="134" stroke={A} />
        <rect x="358" y="134" width="44" height="18" rx="4" fill={RAISE} stroke={A} />
        {txt(380, 147, '90°', { size: 10 })}
        <line x1="380" y1="152" x2="380" y2="159" stroke={A} markerEnd="url(#arrow-a)" />
        <path d="M395 46 L470 46 L501 98" fill="none" stroke={A} markerEnd="url(#arrow-a)" />
        <path d="M395 176 L470 176 L501 124" fill="none" stroke={A} markerEnd="url(#arrow-a)" />
        {txt(440, 30, '1 → 0°, 0 → 180°', { size: 10, fill: G })}
        {txt(440, 200, '1 → 90°, 0 → 270°', { size: 10, fill: G })}
        <circle cx="510" cy="111" r="15" fill={RAISE} stroke={G} strokeWidth="1.5" />
        {txt(510, 116, 'Σ', { size: 15 })}
        <line x1="525" y1="111" x2="630" y2="111" stroke={G} strokeWidth="1.5" markerEnd="url(#arrow-g)" />
        {txt(578, 101, 'QPSK signal', { size: 11 })}
        {txt(578, 130, 'L = 4, r = 2', { size: 10, fill: A })}
      </svg>
    </Fig>
  );
}

// ---------- Constellation diagrams ----------
const SETS = {
  ask: { name: 'ASK (OOK)', R: 1.8, pts: [[0, 0, '0'], [1, 0, '1']], note: 'unipolar, I only' },
  bpsk: { name: 'BPSK', R: 1.8, pts: [[-1, 0, '0'], [1, 0, '1']], note: 'polar, I only' },
  qpsk: { name: 'QPSK (= 4-QAM polar)', R: 1.9, pts: [[1, 1, '11'], [-1, 1, '01'], [-1, -1, '00'], [1, -1, '10']], circle: Math.SQRT2, vector: [1, 1, '√2 V, 45°'], note: 'I + Q' },
  qam4: { name: '4-QAM (unipolar)', R: 1.9, pts: [[0, 0, '00'], [1, 0, '10'], [0, 1, '01'], [1, 1, '11']], vector: [1, 1, ''], note: '0 or +1 on each' },
  qam4b: { name: '4-QAM (two + levels)', R: 2.6, pts: [[1, 1], [2, 1], [1, 2], [2, 2]], note: 'two positive levels' },
  qam16: { name: '16-QAM', R: 2.6, pts: [-2, -1, 1, 2].flatMap((x) => [-2, -1, 1, 2].map((y) => [x, y])), note: '±1, ±2 on each' },
};
function Constellations({ show = ['ask', 'bpsk', 'qpsk'], caption = 'X-axis = in-phase carrier (I), Y-axis = quadrature carrier (Q). Distance from the origin = amplitude, angle = phase.' }) {
  return (
    <Fig caption={caption} label={`Constellation diagrams: ${show.map((k) => SETS[k].name).join(', ')}`}>
      <div className={`grid gap-3 ${show.length > 2 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
        {show.map((k) => {
          const s = SETS[k];
          const f = s.R / 1.8;
          return (
            <div key={k} className="rounded-lg border border-line p-1.5">
              <svg viewBox={`${-s.R} ${-s.R} ${2 * s.R} ${2 * s.R}`} className="w-full">
                <line x1={-s.R + 0.1} y1="0" x2={s.R - 0.1} y2="0" stroke={A} strokeWidth={0.025 * f} />
                <line x1="0" y1={s.R - 0.1} x2="0" y2={-s.R + 0.1} stroke={A} strokeWidth={0.025 * f} />
                <text x={s.R - 0.12} y={-0.1 * f} fontSize={0.24 * f} fill={A} textAnchor="end">
                  I
                </text>
                <text x={0.1 * f} y={-s.R + 0.3 * f} fontSize={0.24 * f} fill={A}>
                  Q
                </text>
                {s.circle && <circle r={s.circle} fill="none" stroke={L} strokeWidth={0.02} strokeDasharray="0.08 0.06" />}
                {s.vector && (
                  <>
                    <line x1="0" y1="0" x2={s.vector[0] * 0.93} y2={-s.vector[1] * 0.93} stroke={R} strokeWidth={0.025} />
                    <text x={0.2} y={0.42} fontSize={0.2} fill={R}>
                      {s.vector[2]}
                    </text>
                  </>
                )}
                {s.pts.map(([x, y, l], i) => (
                  <g key={i}>
                    <circle cx={x} cy={-y} r={0.1 * f} fill={G} />
                    {l && (
                      <text x={x} y={-y + (y > 0 ? -0.2 : 0.4) * f} fontSize={0.26 * f} fill={T} textAnchor="middle">
                        {l}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
              <p className="text-center text-[0.8rem] leading-tight text-text">{s.name}</p>
              <p className="text-center text-[0.72rem] leading-tight text-ash">{s.note}</p>
            </div>
          );
        })}
      </div>
    </Fig>
  );
}

// ---------- FDM multiplexer and demultiplexer ----------
function FdmSystem({ inputs = ['0–4 kHz', '0–4 kHz', '0–4 kHz'], bands = ['20–24 kHz', '24–28 kHz', '28–32 kHz'], link = '20–32 kHz', caption = 'MUX: each input modulates its own carrier and the results are added. DEMUX: bandpass filters separate the bands, demodulators remove the carriers.' }) {
  const n = inputs.length;
  const ys = inputs.map((_, i) => 46 + i * (n > 3 ? 46 : 64));
  const H = ys.at(-1) + 50;
  const mid = (ys[0] + ys.at(-1)) / 2;
  return (
    <Fig caption={caption} label="FDM multiplexing and demultiplexing">
      <svg viewBox={`0 0 640 ${H}`} className="w-full">
        <Arrows />
        <rect x="70" y="14" width="152" height={H - 24} rx="10" fill="none" stroke={L} strokeDasharray="5 4" />
        <rect x="336" y="14" width="214" height={H - 24} rx="10" fill="none" stroke={L} strokeDasharray="5 4" />
        {txt(146, 28, 'MUX (sender)', { size: 11, fill: A })}
        {txt(443, 28, 'DEMUX (receiver)', { size: 11, fill: A })}
        {ys.map((y, i) => (
          <g key={y}>
            {txt(36, y - 8, `s${i + 1}(t)`, { size: 12 })}
            {txt(36, y + 18, inputs[i], { size: 10, fill: A })}
            <line x1="8" y1={y} x2="78" y2={y} stroke={A} markerEnd="url(#arrow-a)" />
            <rect x="80" y={y - 15} width="78" height="30" rx="5" fill={RAISE} stroke={G} />
            {txt(119, y - 2, 'Modulator', { size: 10 })}
            {txt(119, y + 10, `fc${i + 1}`, { size: 10, fill: G })}
            <line x1="158" y1={y} x2="191" y2={mid + (y - mid) * 0.12} stroke={A} markerEnd="url(#arrow-a)" />
            <line x1="352" y1={mid} x2="368" y2={y} stroke={A} markerEnd="url(#arrow-a)" />
            <rect x="370" y={y - 15} width="78" height="30" rx="5" fill={RAISE} stroke={G} />
            {txt(409, y - 2, 'Bandpass', { size: 10 })}
            {txt(409, y + 10, bands[i], { size: 9, fill: G })}
            <line x1="448" y1={y} x2="464" y2={y} stroke={A} markerEnd="url(#arrow-a)" />
            <rect x="466" y={y - 15} width="78" height="30" rx="5" fill={RAISE} stroke={G} />
            {txt(505, y - 2, 'Demodulator', { size: 10 })}
            {txt(505, y + 10, `− fc${i + 1}`, { size: 10, fill: G })}
            <line x1="544" y1={y} x2="628" y2={y} stroke={A} markerEnd="url(#arrow-a)" />
            {txt(592, y - 8, `s${i + 1}(t)`, { size: 12 })}
            {txt(592, y + 18, inputs[i], { size: 10, fill: A })}
          </g>
        ))}
        <circle cx="204" cy={mid} r="13" fill={RAISE} stroke={G} strokeWidth="1.5" />
        {txt(204, mid + 5, '+', { size: 16 })}
        <line x1="217" y1={mid} x2="346" y2={mid} stroke={G} strokeWidth="4" />
        <circle cx="348" cy={mid} r="4" fill={G} />
        {txt(282, mid - 12, 'composite', { size: 11 })}
        {txt(282, mid + 20, link, { size: 11, fill: G })}
      </svg>
    </Fig>
  );
}

// ---------- Time-space delay diagrams (circuit, datagram, virtual circuit) ----------
function Delay({ nodes = ['A', 'Switch 1', 'Switch 2', 'B'], kind = 'datagram', paths, waits = [], caption }) {
  const n = nodes.length;
  const xs = nodes.map((_, i) => 116 + (i * 450) / (n - 1));
  const T0 = 26, TAU = 14, W = 18, THIN = 8;
  const parts = [];
  const notes = [];
  let y = 48;
  const band = (a, b, y0, h, slope, fill, key) => (
    <polygon key={key} points={`${xs[a]},${y0} ${xs[a]},${y0 + h} ${xs[b]},${y0 + h + slope} ${xs[b]},${y0 + slope}`} fill={fill} stroke={G} strokeWidth="1" />
  );
  const thin = (from, to, label) => {
    const slope = TAU * Math.abs(to - from) * 0.9;
    parts.push(band(from, to, y, THIN, slope, 'rgb(240 195 90 / 0.55)', `th${y}`));
    notes.push([y + (THIN + slope) / 2, label]);
    y += THIN + slope + 6;
  };
  let first = true;
  const hops = (seq, waitLabels = []) => {
    seq.slice(0, -1).forEach((a, k) => {
      const b = seq[k + 1];
      parts.push(band(a, b, y, T0, TAU, 'rgb(240 195 90 / 0.22)', `h${y}${a}`));
      if (first) {
        parts.push(<line key="tl" x1={xs[a] - 8} y1={y} x2={xs[a] - 8} y2={y + T0} stroke={T} />);
        parts.push(<g key="tt">{txt(xs[a] - 16, y + T0 / 2 + 4, 'T', { size: 12, anchor: 'end' })}</g>);
        parts.push(<g key="tau">{txt((xs[a] + xs[b]) / 2, y + T0 + TAU / 2 + 14, 'τ (propagation)', { size: 10, fill: A })}</g>);
        first = false;
      }
      y += T0 + TAU;
      const w = waitLabels[k];
      if (k < seq.length - 2 && w) {
        parts.push(<line key={`w${y}`} x1={xs[b]} y1={y} x2={xs[b]} y2={y + W} stroke={R} strokeWidth="3" />);
        parts.push(<g key={`wt${y}`}>{txt(xs[b] + 8, y + W / 2 + 4, w, { size: 11, fill: R, anchor: 'start' })}</g>);
        y += W;
      }
      y -= T0;
    });
    y += T0 + 10;
  };
  const top = y;
  if (kind === 'circuit' || kind === 'vc') {
    thin(0, n - 1, 'Setup request');
    parts.push(band(n - 1, 0, y, THIN, TAU * (n - 1) * 0.9, 'rgb(240 195 90 / 0.55)', 'ack'));
    notes.push([y + (THIN + TAU * (n - 1) * 0.9) / 2, 'Setup ack']);
    y += THIN + TAU * (n - 1) * 0.9 + 10;
  }
  if (kind === 'circuit') {
    const slope = TAU * (n - 1) * 0.9;
    parts.push(band(0, n - 1, y, 64, slope, 'rgb(240 195 90 / 0.2)', 'data'));
    notes.push([y + 32 + slope / 2, 'Data transfer']);
    y += 64 + slope + 8;
  } else (paths ?? [nodes.map((_, i) => i)]).forEach((p, i) => hops(p, waits[i] ?? (kind === 'vc' ? [] : p.slice(1, -1).map((_, k) => `w${k + 1}`))));
  if (kind === 'circuit' || kind === 'vc') thin(0, n - 1, 'Teardown');
  const H = y + 26;
  return (
    <Fig caption={caption} label={`${kind} delay diagram`}>
      <svg viewBox={`0 0 640 ${H}`} className="w-full">
        <Arrows />
        {xs.map((x, i) => (
          <g key={x}>
            <rect x={x - (n > 4 ? 34 : 40)} y="10" width={n > 4 ? 68 : 80} height="24" rx="6" fill={RAISE} stroke={i === 0 || i === n - 1 ? A : G} />
            {txt(x, 26, nodes[i], { size: n > 4 ? 10 : 11 })}
            <line x1={x} y1="34" x2={x} y2={H - 6} stroke={A} markerEnd="url(#arrow-a)" />
          </g>
        ))}
        {txt(xs[0] - 6, H - 8, 'time', { size: 10, fill: A, anchor: 'end' })}
        {parts}
        {notes.map(([ny, l]) => (
          <g key={ny}>{txt(xs[0] - 50, ny + 4, l, { size: 10, fill: A, anchor: 'middle' })}</g>
        ))}
        <line x1="612" y1={top} x2="612" y2={y - 10} stroke={T} markerStart="url(#arrow-t)" markerEnd="url(#arrow-t)" />
        <text x="626" y={(top + y) / 2} fontSize="11" fill={T} textAnchor="middle" transform={`rotate(90 626 ${(top + y) / 2})`}>
          Total delay
        </text>
      </svg>
    </Fig>
  );
}

// ---------- Virtual-circuit setup with VCI tables ----------
function VcSetup() {
  const sw = [
    { x: 170, name: 'Switch 1', inP: 1, inV: 14, outP: 3, outV: 66 },
    { x: 320, name: 'Switch 2', inP: 1, inV: 66, outP: 2, outV: 22 },
    { x: 470, name: 'Switch 3', inP: 2, inV: 22, outP: 3, outV: 77 },
  ];
  const vcis = [[100, 14], [245, 66], [395, 22], [540, 77]];
  return (
    <Fig caption="Setup request (A → B): each switch notes the incoming port and VCI and finds the outgoing port from its global table. Acknowledgment (B → A): B picks VCI 77 and each switch fills in its outgoing VCI." label="Virtual-circuit setup with VCI tables">
      <svg viewBox="0 0 640 210" className="w-full">
        <Arrows />
        <line x1="44" y1="70" x2="596" y2="70" stroke={A} strokeWidth="1.5" />
        {[[30, 'A'], [610, 'B']].map(([x, l]) => (
          <g key={l}>
            <rect x={x - 16} y="58" width="32" height="24" rx="4" fill={RAISE} stroke={A} />
            {txt(x, 75, l, { size: 13, bold: true })}
          </g>
        ))}
        {vcis.map(([x, v]) => (
          <g key={x}>
            <rect x={x - 15} y="61" width="30" height="18" rx="4" fill="var(--color-panel)" stroke={G} />
            {txt(x, 75, String(v), { size: 11, fill: G })}
          </g>
        ))}
        <line x1="60" y1="34" x2="580" y2="34" stroke={G} markerEnd="url(#arrow-g)" />
        {txt(320, 26, 'setup request (global addresses) →', { size: 11, fill: G })}
        <line x1="580" y1="108" x2="60" y2="108" stroke={A} markerEnd="url(#arrow-a)" />
        {txt(320, 103, '← acknowledgment (fills outgoing VCIs)', { size: 11, fill: A })}
        {sw.map((s) => (
          <g key={s.name}>
            <rect x={s.x - 20} y="56" width="40" height="28" rx="6" fill={RAISE} stroke={G} strokeWidth="1.5" />
            {txt(s.x, 74, s.name.replace('Switch ', 'S'), { size: 12 })}
            {txt(s.x - 26, 64, String(s.inP), { size: 10, fill: A })}
            {txt(s.x + 26, 64, String(s.outP), { size: 10, fill: A })}
            <g transform={`translate(${s.x - 60} 122)`}>
              <rect width="120" height="54" rx="4" fill="var(--color-panel)" stroke={L} />
              <line x1="60" y1="0" x2="60" y2="54" stroke={L} />
              <line x1="0" y1="18" x2="120" y2="18" stroke={L} />
              <line x1="0" y1="34" x2="120" y2="34" stroke={L} />
              {txt(30, 13, 'Incoming', { size: 9, fill: A })}
              {txt(90, 13, 'Outgoing', { size: 9, fill: A })}
              {txt(30, 29, 'Port | VCI', { size: 9, fill: A })}
              {txt(90, 29, 'Port | VCI', { size: 9, fill: A })}
              {txt(30, 48, `${s.inP}  |  ${s.inV}`, { size: 11 })}
              {txt(90, 48, `${s.outP}  |  ${s.outV}`, { size: 11, fill: G })}
            </g>
            {txt(s.x, 196, s.name, { size: 10, fill: A })}
          </g>
        ))}
      </svg>
    </Fig>
  );
}

// ---------- Ground, sky and line-of-sight propagation ----------
function Propagation() {
  const panel = (x0, title, band, ex, kind) => (
    <g key={title} transform={`translate(${x0} 0)`}>
      <path d="M0 150 Q100 128 200 150 L200 168 L0 168 Z" fill="rgb(163 157 148 / 0.15)" stroke={A} />
      {txt(100, 164, 'Earth', { size: 10, fill: A })}
      {kind === 'sky' && (
        <>
          <path d="M0 48 Q100 22 200 48" fill="none" stroke={A} strokeDasharray="5 4" />
          {txt(100, 22, 'Ionosphere', { size: 10, fill: A })}
        </>
      )}
      {[22, 178].map((ax) => (
        <g key={ax}>
          <line x1={ax} y1={kind === 'los' ? 96 : 120} x2={ax} y2={146} stroke={T} strokeWidth="2" />
          <circle cx={ax} cy={kind === 'los' ? 94 : 118} r="3" fill={T} />
        </g>
      ))}
      {kind === 'ground' && <path d="M24 136 Q100 112 176 136" fill="none" stroke={G} strokeWidth="2" markerEnd="url(#arrow-g)" />}
      {kind === 'sky' && <path d="M24 118 L100 38 L176 118" fill="none" stroke={G} strokeWidth="2" markerEnd="url(#arrow-g)" />}
      {kind === 'los' && <line x1="25" y1="94" x2="173" y2="94" stroke={G} strokeWidth="2" markerEnd="url(#arrow-g)" />}
      {txt(100, kind === 'sky' ? 108 : 62, title, { size: 13, bold: true })}
      {txt(100, 188, band, { size: 11, fill: G })}
      {txt(100, 203, ex, { size: 10, fill: A })}
    </g>
  );
  return (
    <Fig caption="Ground wave follows the earth; sky wave is reflected by the ionosphere; line of sight goes straight between antennas." label="Ground wave, sky wave and line-of-sight propagation">
      <svg viewBox="0 0 640 212" className="w-full">
        <Arrows />
        {panel(10, 'Ground wave', '< 3 MHz', 'AM radio', 'ground')}
        {panel(220, 'Sky wave', '3–30 MHz (HF)', 'international broadcast', 'sky')}
        {panel(430, 'Line of sight', '> 30 MHz', 'satellite, microwave', 'los')}
      </svg>
    </Fig>
  );
}

// ---------- Time-space-time switch ----------
function Tst({ left = ['TSI 1', 'TSI 2', 'TSI 10'], mid = ['Crossbar 1', 'Crossbar 4'], midSize = '10 × 10', dots = true, caption = 'Stage 1: TSIs (time), stage 2: crossbars (space), stage 3: TSIs (time). Every TSI connects to every crossbar.' }) {
  const ly = [30, 80, 166], my = mid.length === 1 ? [96] : [52, 140];
  return (
    <Fig caption={caption} label="Time-space-time switch">
      <svg viewBox="0 0 640 226" className="w-full">
        <Arrows />
        {ly.flatMap((a) => my.map((b) => <line key={`l${a}${b}`} x1="150" y1={a + 14} x2="268" y2={b + 22} stroke={L} strokeWidth="1.3" />))}
        {my.flatMap((b) => ly.map((a) => <line key={`r${a}${b}`} x1="372" y1={b + 22} x2="490" y2={a + 14} stroke={L} strokeWidth="1.3" />))}
        {ly.map((y, i) => (
          <g key={y}>
            <line x1="20" y1={y + 14} x2="76" y2={y + 14} stroke={A} markerEnd="url(#arrow-a)" />
            <rect x="78" y={y} width="72" height="28" rx="5" fill={RAISE} stroke={G} />
            {txt(114, y + 18, left[i], { size: 11 })}
            <rect x="490" y={y} width="72" height="28" rx="5" fill={RAISE} stroke={G} />
            {txt(526, y + 18, left[i], { size: 11 })}
            <line x1="562" y1={y + 14} x2="626" y2={y + 14} stroke={A} markerEnd="url(#arrow-a)" />
          </g>
        ))}
        {dots && txt(114, 132, '⋮', { size: 16, fill: A })}
        {dots && txt(526, 132, '⋮', { size: 16, fill: A })}
        {mid.length > 1 && txt(320, 112, '⋮', { size: 16, fill: A })}
        {my.map((y, i) => (
          <g key={y}>
            <rect x="268" y={y} width="104" height="44" rx="6" fill={RAISE} stroke={G} strokeWidth="1.5" />
            {txt(320, y + 19, mid[i], { size: 11 })}
            {txt(320, y + 34, midSize, { size: 10, fill: G })}
          </g>
        ))}
        {[['Stage 1: time (TSI)', 114], ['Stage 2: space', 320], ['Stage 3: time (TSI)', 526]].map(([t, x]) => (
          <g key={t}>{txt(x, 218, t, { size: 11, fill: A })}</g>
        ))}
      </svg>
    </Fig>
  );
}

// ---------- Digital waveform (differential Manchester) ----------
function Waveform({ bits = '01011010', startHigh = true, caption = 'Differential Manchester: always a transition in the middle of the bit; an extra transition at the start of the bit means 0, none means 1.' }) {
  const lv = diffManchester(bits, startHigh);
  const x0 = 70, bw = 540 / bits.length, hi = 46, lo = 104;
  const Y = (v) => (v ? hi : lo);
  let d = `M${x0 - 24} ${Y(startHigh ? 1 : 0)} L${x0} ${Y(startHigh ? 1 : 0)}`;
  lv.forEach(([a, b], i) => {
    const x = x0 + i * bw;
    d += ` L${x} ${Y(a)} L${x + bw / 2} ${Y(a)} L${x + bw / 2} ${Y(b)} L${x + bw} ${Y(b)}`;
  });
  return (
    <Fig caption={caption} label={`Differential Manchester waveform for ${bits}`}>
      <svg viewBox="0 0 640 140" className="w-full">
        {[...bits].map((b, i) => (
          <g key={i}>
            <line x1={x0 + i * bw} y1="30" x2={x0 + i * bw} y2="120" stroke={L} strokeDasharray="3 3" />
            {txt(x0 + (i + 0.5) * bw, 22, b, { size: 14, fill: b === '0' ? R : G, bold: true })}
          </g>
        ))}
        <line x1={x0 + 540} y1="30" x2={x0 + 540} y2="120" stroke={L} strokeDasharray="3 3" />
        <line x1={x0 - 30} y1="75" x2="626" y2="75" stroke={L} />
        {txt(x0 - 34, hi + 4, '+V', { size: 11, fill: A, anchor: 'end' })}
        {txt(x0 - 34, lo + 4, '−V', { size: 11, fill: A, anchor: 'end' })}
        <path d={d} fill="none" stroke={G} strokeWidth="2.2" />
        {txt(x0 + 270, 136, 'red 0 = transition at the start of the bit · gold 1 = no transition at the start', { size: 10, fill: A })}
      </svg>
    </Fig>
  );
}

// ---------- TDM frame (multiple-slot, multilevel, pulse stuffing) ----------
// inputs: [{ rate, tag, slots = 1, group, stuff }]; inputs sharing a group go through a first-level MUX at groupRate.
function TdmFrame({ inputs, groupRate, out, frame, caption }) {
  const n = inputs.length;
  const gap = n > 6 ? 21 : 30;
  const ys = inputs.map((_, i) => 26 + i * gap);
  const H = ys.at(-1) + 56;
  const top = ys[0] - 10, bot = ys.at(-1) + 10;
  const mid = (top + bot) / 2;
  const groups = {};
  inputs.forEach((p, i) => p.group != null && (groups[p.group] ??= []).push(i));
  const slots = [];
  inputs.forEach((p, i) => {
    if (p.group != null) {
      if (groups[p.group][0] === i) slots.push(groups[p.group].map((k) => inputs[k].tag).join('/'));
    } else for (let k = 0; k < (p.slots ?? 1); k++) slots.push(p.tag);
  });
  const sw = Math.min(30, 210 / slots.length);
  return (
    <Fig caption={caption} label="TDM frame">
      <svg viewBox={`0 0 640 ${H}`} className="w-full">
        <Arrows />
        {inputs.map((p, i) => {
          const y = ys[i];
          const g = p.group != null ? groups[p.group] : null;
          return (
            <g key={i}>
              {txt(10, y + 4, p.rate, { size: 11, anchor: 'start', fill: A })}
              {txt(92, y + 4, p.tag, { size: 12, fill: G, bold: true })}
              {g ? (
                <line x1="104" y1={y} x2="150" y2={y} stroke={A} />
              ) : (
                <line x1="104" y1={y} x2="306" y2={y} stroke={A} markerEnd="url(#arrow-a)" />
              )}
              {!g && (p.slots ?? 1) > 1 && txt(230, y - 4, `${p.slots} slots / frame`, { size: 10, fill: G })}
              {p.stuff && (
                <>
                  <rect x="170" y={y - 9} width="62" height="18" rx="3" fill={RAISE} stroke={R} />
                  {txt(201, y + 4, p.stuff, { size: 9, fill: R })}
                </>
              )}
            </g>
          );
        })}
        {Object.values(groups).map((g) => {
          const a = ys[g[0]] - 6, b = ys[g.at(-1)] + 6, c = (a + b) / 2;
          return (
            <g key={g[0]}>
              <path d={`M150 ${a} L172 ${a + 5} L172 ${b - 5} L150 ${b} Z`} fill={RAISE} stroke={G} />
              <line x1="172" y1={c} x2="306" y2={c} stroke={G} markerEnd="url(#arrow-g)" />
              {txt(240, c - 4, groupRate, { size: 10, fill: G })}
            </g>
          );
        })}
        <path d={`M308 ${top} L340 ${top + 14} L340 ${bot - 14} L308 ${bot} Z`} fill={RAISE} stroke={G} strokeWidth="1.5" />
        <text x="324" y={mid + 4} fontSize="10" fill={T} textAnchor="middle" transform={`rotate(90 324 ${mid})`}>
          MUX
        </text>
        <line x1="340" y1={mid} x2="366" y2={mid} stroke={G} strokeWidth="1.5" />
        {slots.map((s, i) => (
          <g key={i}>
            <rect x={366 + i * sw} y={mid - 14} width={sw} height="28" fill={i % 2 ? 'rgb(240 195 90 / 0.25)' : 'rgb(240 195 90 / 0.12)'} stroke={G} strokeWidth="0.8" />
            {txt(366 + (i + 0.5) * sw, mid + 4, s, { size: s.length > 2 ? 8 : 10 })}
          </g>
        ))}
        <line x1={366 + slots.length * sw} y1={mid} x2="630" y2={mid} stroke={G} strokeWidth="1.5" markerEnd="url(#arrow-g)" />
        {txt(366 + (slots.length * sw) / 2, mid + 32, frame, { size: 11 })}
        {txt(366 + (slots.length * sw) / 2, mid - 22, '1 frame', { size: 10, fill: A })}
        {txt(630, mid + 32, out, { size: 11, fill: G, anchor: 'end' })}
      </svg>
    </Fig>
  );
}

// ---------- AM / FM / PM waveforms and implementation ----------
function ModWave({ kind = 'am' }) {
  const N = 400, x0 = 18, w = 420;
  const m = (t) => Math.sin(2 * Math.PI * t);
  const path = (f, yc, amp) =>
    Array.from({ length: N + 1 }, (_, i) => {
      const t = i / N;
      return `${i ? 'L' : 'M'}${(x0 + t * w).toFixed(1)} ${(yc - amp * f(t)).toFixed(1)}`;
    }).join(' ');
  const fc = 14;
  let phase = 0;
  const fm = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    phase += (2 * Math.PI * fc * (1 + 0.55 * m(t))) / N;
    return Math.sin(phase);
  });
  const mod = {
    am: (t) => (1 + 0.6 * m(t)) * Math.sin(2 * Math.PI * fc * t) * 0.62,
    fm: (t) => fm[Math.round(t * N)],
    pm: (t) => Math.sin(2 * Math.PI * fc * t + 2.2 * m(t)),
  }[kind];
  const name = { am: 'AM signal', fm: 'FM signal', pm: 'PM signal' }[kind];
  const bw = { am: 'B_AM = 2B', fm: 'B_FM = 2(1 + β)B, β = 4', pm: 'B_PM = 2(1 + β)B, β = 2' }[kind];
  return (
    <Fig caption={{ am: 'The amplitude of the carrier follows the modulating signal (the envelope). Implemented with a multiplier.', fm: 'The frequency of the carrier follows the amplitude of the modulating signal: positive → higher, negative → lower. Implemented with a VCO.', pm: 'The phase of the carrier follows the derivative of the modulating signal. Implemented with d/dt and a VCO.' }[kind]} label={`${name} waveform and implementation`}>
      <svg viewBox="0 0 640 236" className="w-full">
        <Arrows />
        {txt(x0, 14, 'Modulating signal (audio)', { size: 11, fill: A, anchor: 'start' })}
        <path d={path(m, 44, 20)} fill="none" stroke={R} strokeWidth="1.8" />
        {txt(x0, 84, 'Carrier fc', { size: 11, fill: A, anchor: 'start' })}
        <path d={path((t) => Math.sin(2 * Math.PI * fc * t), 110, 16)} fill="none" stroke={A} strokeWidth="1.3" />
        {txt(x0, 146, name, { size: 11, fill: A, anchor: 'start' })}
        {kind === 'am' && <path d={path((t) => (1 + 0.6 * m(t)) * 0.62, 190, 30)} fill="none" stroke={R} strokeDasharray="4 3" />}
        <path d={path(mod, 190, 30)} fill="none" stroke={G} strokeWidth="1.6" />
        <g transform="translate(460 30)">
          {kind === 'am' ? (
            <>
              <line x1="0" y1="40" x2="62" y2="40" stroke={A} markerEnd="url(#arrow-a)" />
              <circle cx="78" cy="40" r="15" fill={RAISE} stroke={G} strokeWidth="1.5" />
              {txt(78, 45, '×', { size: 16 })}
              <rect x="44" y="92" width="68" height="24" rx="5" fill={RAISE} stroke={G} />
              {txt(78, 108, 'Oscillator', { size: 10 })}
              <line x1="78" y1="92" x2="78" y2="57" stroke={A} markerEnd="url(#arrow-a)" />
              <line x1="93" y1="40" x2="170" y2="40" stroke={G} markerEnd="url(#arrow-g)" />
              {txt(30, 30, 'm(t)', { size: 10, fill: A })}
              {txt(78, 132, 'Multiplier', { size: 10, fill: A })}
            </>
          ) : (
            <>
              <line x1="0" y1="40" x2={kind === 'pm' ? 30 : 74} y2="40" stroke={A} markerEnd="url(#arrow-a)" />
              {kind === 'pm' && (
                <>
                  <rect x="32" y="28" width="38" height="24" rx="5" fill={RAISE} stroke={G} />
                  {txt(51, 44, 'd/dt', { size: 10 })}
                  <line x1="70" y1="40" x2="88" y2="40" stroke={A} markerEnd="url(#arrow-a)" />
                </>
              )}
              <rect x={kind === 'pm' ? 90 : 76} y="26" width="56" height="28" rx="5" fill={RAISE} stroke={G} />
              {txt(kind === 'pm' ? 118 : 104, 44, 'VCO', { size: 11 })}
              <line x1={kind === 'pm' ? 146 : 132} y1="40" x2="172" y2="40" stroke={G} markerEnd="url(#arrow-g)" />
              {txt(88, 80, 'voltage-controlled oscillator', { size: 9, fill: A })}
            </>
          )}
          {txt(86, 170, bw, { size: 11, fill: G })}
        </g>
      </svg>
    </Fig>
  );
}

// ---------- Datagram network (packets on different paths) ----------
function DatagramNet() {
  const sw = { 1: [150, 100], 2: [290, 40], 3: [330, 110], 4: [290, 176], 5: [470, 100] };
  const links = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 5], [3, 5], [4, 3], [4, 5]];
  return (
    <Fig caption="Datagram network: each packet is routed independently, so packets of one message can take different paths and arrive out of order." label="Datagram network with five switches">
      <svg viewBox="0 0 640 214" className="w-full">
        <Arrows />
        <line x1="62" y1="100" x2="134" y2="100" stroke={A} />
        <line x1="486" y1="100" x2="566" y2="100" stroke={A} markerEnd="url(#arrow-a)" />
        {links.map(([a, b]) => (
          <line key={`${a}${b}`} x1={sw[a][0]} y1={sw[a][1]} x2={sw[b][0]} y2={sw[b][1]} stroke={L} strokeWidth="1.5" />
        ))}
        {Object.entries(sw).map(([k, [x, y]]) => (
          <g key={k}>
            <circle cx={x} cy={y} r="16" fill={RAISE} stroke={G} strokeWidth="1.5" />
            {txt(x, y + 5, k, { size: 13, bold: true })}
          </g>
        ))}
        {[[38, 'Source'], [600, 'Destination']].map(([x, l]) => (
          <g key={l}>
            <rect x={x - 32} y="86" width="64" height="28" rx="5" fill={RAISE} stroke={A} />
            {txt(x, 104, l, { size: 10 })}
          </g>
        ))}
      </svg>
    </Fig>
  );
}

// ---------- Error detection with redundancy ----------
function Redundancy() {
  return (
    <Fig caption="The sender adds redundant bits (dataword → codeword); the receiver checks them, then accepts and removes them or rejects the data." label="Error detection with redundancy">
      <svg viewBox="0 0 640 120" className="w-full">
        <Arrows />
        {txt(70, 20, 'Sender', { size: 12, bold: true })}
        <rect x="20" y="34" width="100" height="26" rx="4" fill={RAISE} stroke={G} />
        {txt(70, 51, 'data 0010101', { size: 10 })}
        <line x1="120" y1="47" x2="150" y2="47" stroke={A} markerEnd="url(#arrow-a)" />
        <rect x="152" y="34" width="132" height="26" rx="4" fill={RAISE} stroke={G} />
        {txt(218, 51, 'data + redundancy 010', { size: 10 })}
        <line x1="284" y1="47" x2="376" y2="47" stroke={G} strokeWidth="2" markerEnd="url(#arrow-g)" />
        {txt(330, 40, 'medium', { size: 10, fill: A })}
        <rect x="378" y="34" width="84" height="26" rx="4" fill={RAISE} stroke={G} />
        {txt(420, 51, 'check', { size: 11 })}
        <line x1="462" y1="47" x2="500" y2="30" stroke={A} markerEnd="url(#arrow-a)" />
        <line x1="462" y1="47" x2="500" y2="80" stroke={R} markerEnd="url(#arrow-r)" />
        {txt(506, 32, 'OK → accept', { size: 10, anchor: 'start' })}
        {txt(506, 86, 'not OK → reject', { size: 10, fill: R, anchor: 'start' })}
        {txt(420, 20, 'Receiver', { size: 12, bold: true })}
      </svg>
    </Fig>
  );
}

const EXAM_DIAGRAMS = {
  spectrum: Spectrum,
  hierarchy: Hierarchy,
  qpskimpl: QpskImpl,
  constellations: Constellations,
  fdmsystem: FdmSystem,
  delay: Delay,
  vcsetup: VcSetup,
  propagation: Propagation,
  tst: Tst,
  waveform: Waveform,
  tdmframe: TdmFrame,
  modwave: ModWave,
  datagramnet: DatagramNet,
  redundancy: Redundancy,
};
export default EXAM_DIAGRAMS;
