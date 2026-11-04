// Static teaching diagrams redrawn from the slide figures.
import { Fig, G, A, L, T, R, Arrows } from './Fig.jsx';
import EXAM_DIAGRAMS from './ExamDiagrams.jsx';

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

function Multistage({ first = 'n × k', middle = 'N/n × N/n', last = 'k × n', stages = ['Stage 1', 'Stage 2 (k switches)', 'Stage 3'], caption }) {
  const s1 = [10, 68, 126], s2 = [36, 100], s3 = s1;
  return (
    <Fig caption={caption ?? 'Three stages: N/n crossbars of n × k, then k crossbars of (N/n) × (N/n), then N/n crossbars of k × n. Every first-stage switch links to every middle switch.'} label="Three-stage multistage switch">
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
              {first}
            </text>
          </g>
        ))}
        {s2.map((y) => (
          <g key={`m${y}`}>
            <rect x="290" y={y} width="60" height="40" rx="6" fill="var(--color-raise)" stroke={G} />
            <text x="320" y={y + 25} textAnchor="middle" fontSize="11" fill={T}>
              {middle}
            </text>
          </g>
        ))}
        {s3.map((y) => (
          <g key={`r${y}`}>
            <rect x="440" y={y} width="60" height="40" rx="6" fill="var(--color-raise)" stroke={G} />
            <text x="470" y={y + 25} textAnchor="middle" fontSize="12" fill={T}>
              {last}
            </text>
            {[8, 20, 32].map((d) => (
              <line key={d} x1="500" y1={y + d} x2="540" y2={y + d} stroke={A} />
            ))}
          </g>
        ))}
        {stages.map((t, i) => [t, 170 + i * 150]).map(([t, x]) => (
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

function Refraction() {
  const panel = (x0, title, body) => {
    const cx = x0 + 100;
    return (
      <g key={title}>
        <rect x={x0} y="0" width="200" height="110" fill="none" />
        <rect x={x0} y="110" width="200" height="72" fill="rgb(240 195 90 / 0.07)" stroke={L} />
        <line x1={x0} y1="110" x2={x0 + 200} y2="110" stroke={G} strokeWidth="1.5" />
        <line x1={cx} y1="18" x2={cx} y2="178" stroke={A} strokeDasharray="4 5" />
        <text x={x0 + 6} y="14" fontSize="11" fill={A}>air (less dense)</text>
        <text x={x0 + 6} y="126" fontSize="11" fill={A}>glass (denser)</text>
        {body(cx)}
        <text x={cx} y="196" textAnchor="middle" fontSize="13" fill={T}>{title}</text>
      </g>
    );
  };
  const ray = (x1, y1, x2, y2) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={G} strokeWidth="2" markerEnd="url(#arrow-g)" />;
  return (
    <Fig caption="Light leaving the denser glass: below the critical angle it refracts into the air; at the critical angle it bends along the interface; above it, it reflects back into the glass — the case fiber exploits." label="Refraction and the critical angle">
      <svg viewBox="0 0 640 204" className="w-full">
        <Arrows />
        {panel(10, 'I < critical → refracts', (cx) => (<g key="a">{ray(cx - 46, 172, cx, 110)}{ray(cx, 110, cx + 62, 34)}</g>))}
        {panel(220, 'I = critical → bends along', (cx) => (<g key="b">{ray(cx - 46, 172, cx, 110)}{ray(cx, 110, cx + 72, 110)}</g>))}
        {panel(430, 'I > critical → reflects', (cx) => (<g key="c">{ray(cx - 46, 172, cx, 110)}{ray(cx, 110, cx + 46, 172)}</g>))}
      </svg>
    </Fig>
  );
}

function Crossbar() {
  const ins = [50, 95, 140], outs = [220, 340, 460, 570];
  return (
    <Fig caption="An n × m crossbar: one crosspoint (transistor) per intersection — 3 × 4 = 12 here, so any input can reach any output at once (non-blocking)." label="Crossbar switch grid with crosspoints">
      <svg viewBox="0 0 640 190" className="w-full">
        {ins.map((y) => (
          <g key={y}>
            <line x1="70" y1={y} x2="570" y2={y} stroke={A} strokeWidth="1.5" />
            <text x="62" y={y + 4} fontSize="12" fill={A} textAnchor="end">in {ins.indexOf(y) + 1}</text>
          </g>
        ))}
        {outs.map((x) => (
          <g key={x}>
            <line x1={x} y1="25" x2={x} y2="165" stroke={A} strokeWidth="1.5" />
            <text x={x} y="18" fontSize="12" fill={A} textAnchor="middle">out {outs.indexOf(x) + 1}</text>
          </g>
        ))}
        {ins.flatMap((y) => outs.map((x) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill={G} />
        )))}
        <circle cx="340" cy="95" r="11" fill="none" stroke={R} strokeWidth="2" />
        <line x1="350" y1="88" x2="420" y2="52" stroke={R} strokeWidth="1.2" />
        <text x="426" y="50" fontSize="12" fill={R}>crosspoint (transistor)</text>
        <text x="320" y="184" textAnchor="middle" fontSize="12" fill={A}>#crosspoints = n × m (3 × 4 = 12)</text>
      </svg>
    </Fig>
  );
}

function BitErrors() {
  const row = (bits, wrong, y, x0, cw) =>
    [...bits].map((b, i) => (
      <g key={i}>
        <rect x={x0 + i * cw} y={y} width={cw - 3} height="30" rx="4" fill={wrong.includes(i) ? 'rgb(232 88 74 / 0.2)' : 'var(--color-raise)'} stroke={wrong.includes(i) ? R : L} />
        <text x={x0 + (i + 0.5) * cw - 1.5} y={y + 20} textAnchor="middle" fontSize="13" fontFamily="var(--font-mono)" fill={wrong.includes(i) ? R : T}>{b}</text>
      </g>
    ));
  const burstWrong = [3, 4, 7, 10];
  return (
    <Fig caption="Single-bit error: one bit flips. Burst error: the length runs from the first corrupted bit to the last, even if bits in between are fine (here 4 corrupted bits inside an 8-bit burst)." label="Single-bit and burst errors in bit strings">
      <svg viewBox="0 0 640 250" className="w-full">
        <text x="40" y="24" fontSize="12" fill={A}>single-bit (parallel)</text>
        {row('00000010', [], 34, 40, 44)}
        {row('00001010', [4], 70, 40, 44)}
        <text x="40" y="136" fontSize="12" fill={A}>burst, length 8 (serial)</text>
        {row('0100010001000011', [], 146, 40, 36)}
        {row('0101110101100011', burstWrong, 182, 40, 36)}
        <line x1="147" y1="176" x2="435" y2="176" stroke={R} strokeWidth="1.5" />
        <line x1="147" y1="172" x2="147" y2="180" stroke={R} strokeWidth="1.5" />
        <line x1="435" y1="172" x2="435" y2="180" stroke={R} strokeWidth="1.5" />
        <text x="291" y="170" textAnchor="middle" fontSize="12" fill={R}>burst length 8 (first → last corrupted bit)</text>
        <text x="40" y="238" fontSize="12" fill={A}>sent above, received below · changed bits in red</text>
      </svg>
    </Fig>
  );
}

function CableSection({ rings = [] }) {
  const rad = (i) => 82 - i * 15;
  return (
    <Fig caption="Cross-section, outside in: each layer surrounds the next." label="Cable cross-section">
      <svg viewBox="0 0 640 200" className="w-full">
        {rings.map(([label, fill], i) => (
          <circle key={label} cx="170" cy="100" r={rad(i)} fill={fill} stroke={i === rings.length - 1 ? G : L} strokeWidth={i === rings.length - 1 ? 1.8 : 1} />
        ))}
        {rings.map(([label], i) => {
          const r = rad(i), a = -Math.PI / 3;
          const px = 170 + r * Math.cos(a), py = 100 + r * Math.sin(a);
          const ly = 30 + i * 36;
          return (
            <g key={`l${label}`}>
              <line x1={px} y1={py} x2="300" y2={ly} stroke={A} strokeWidth="1" />
              <text x="308" y={ly + 4} fontSize="12" fill={T}>{label}</text>
            </g>
          );
        })}
      </svg>
    </Fig>
  );
}

function StoreForward() {
  const boxes = [['Source', 30], ['Switch 1', 220], ['Switch 2', 410], ['Destination', 545]];
  return (
    <Fig caption="Message switching: each switch stores the entire message in its buffer, then forwards it when the next hop is free." label="Store-and-forward message switching">
      <svg viewBox="0 0 640 140" className="w-full">
        <Arrows />
        {boxes.map(([t, x], i) => (
          <g key={t}>
            <rect x={x} y="52" width="72" height="36" rx="6" fill="var(--color-raise)" stroke={G} strokeWidth={i === 0 || i === 3 ? 1.2 : 1.6} />
            <text x={x + 36} y="74" textAnchor="middle" fontSize="12" fill={T}>{t}</text>
            {i > 0 && i < 3 && <rect x={x + 10} y="92" width="52" height="12" rx="3" fill="rgb(232 88 74 / 0.18)" stroke={R} strokeWidth="0.8" />}
            {i > 0 && i < 3 && <text x={x + 36} y="118" textAnchor="middle" fontSize="10" fill={A}>buffer</text>}
          </g>
        ))}
        {[[104, 'whole message'], [294, 'store, then forward'], [484, 'store, then forward']].map(([x, t]) => (
          <g key={x}>
            <line x1={x} y1="70" x2={x + 114} y2="70" stroke={A} markerEnd="url(#arrow-a)" />
            <text x={x + 57} y="42" textAnchor="middle" fontSize="11" fill={A}>{t}</text>
          </g>
        ))}
      </svg>
    </Fig>
  );
}

function SyncBits() {
  const frames = [1, 0, 1];
  const base = (f) => 35 + f * 195;
  return (
    <Fig caption="A known sync-bit pattern (1, 0, 1, …) marks frame boundaries. It costs 1 bit per frame of overhead, so the link rate rises." label="Frame synchronization bits between TDM frames">
      <svg viewBox="0 0 640 120" className="w-full">
        {frames.map((s, f) => (
          <g key={f}>
            <rect x={base(f)} y="34" width="38" height="44" rx="6" fill="rgb(232 88 74 / 0.2)" stroke={R} />
            <text x={base(f) + 19} y="62" textAnchor="middle" fontSize="16" fill={R} fontFamily="var(--font-mono)">{s}</text>
            {[0, 1, 2, 3].map((d) => (
              <g key={d}>
                <rect x={base(f) + 38 + d * 38} y="34" width="35" height="44" rx="6" fill="rgb(240 195 90 / 0.12)" stroke={G} strokeWidth="0.9" />
                <text x={base(f) + 55.5 + d * 38} y="62" textAnchor="middle" fontSize="15" fill={G} fontFamily="var(--font-mono)">d</text>
              </g>
            ))}
            <text x={base(f) + 95} y="98" textAnchor="middle" fontSize="11" fill={A}>frame {f + 1}</text>
          </g>
        ))}
        <text x="35" y="18" fontSize="11" fill={A}>S = sync bit, d = data slot</text>
      </svg>
    </Fig>
  );
}

function Antennas() {
  const label = (x, t, s) => (
    <g key={t}>
      <text x={x} y="168" textAnchor="middle" fontSize="12" fill={T}>{t}</text>
      <text x={x} y="182" textAnchor="middle" fontSize="10" fill={A}>{s}</text>
    </g>
  );
  return (
    <Fig caption="Isotropic (ideal sphere), Hertz half-wave dipole (λ/2), Marconi quarter-wave vertical (λ/4), and a parabolic reflector." label="Antenna types">
      <svg viewBox="0 0 640 190" className="w-full">
        <Arrows />
        <circle cx="85" cy="85" r="30" fill="none" stroke={G} strokeWidth="1.5" />
        {[[85, 85, 85, 35], [85, 85, 85, 135], [85, 85, 35, 85], [85, 85, 135, 85]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={G} markerEnd="url(#arrow-g)" />
        ))}
        <rect x="247" y="35" width="6" height="80" rx="3" fill={G} />
        <text x="262" y="78" fontSize="11" fill={A}>λ/2</text>
        <line x1="250" y1="115" x2="250" y2="135" stroke={A} />
        <line x1="370" y1="130" x2="455" y2="130" stroke={A} strokeWidth="1.5" />
        <rect x="408" y="55" width="6" height="75" rx="3" fill={G} />
        <text x="423" y="98" fontSize="11" fill={A}>λ/4</text>
        <path d="M540 40 Q580 85 540 130" fill="none" stroke={G} strokeWidth="2" />
        <line x1="566" y1="85" x2="596" y2="85" stroke={A} markerEnd="url(#arrow-a)" />
        <circle cx="566" cy="85" r="3.5" fill={G} />
        {label(85, 'Isotropic', 'radiates equally (ideal)')}
        {label(250, 'Hertz dipole', 'λ/2')}
        {label(412, 'Marconi vertical', 'λ/4 over ground')}
        {label(560, 'Parabolic dish', 'microwave + satellite')}
      </svg>
    </Fig>
  );
}

function Sampling() {
  const sine = (yc, x0, w, amp, cycles) => {
    let d = '';
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      d += `${i ? 'L' : 'M'}${(x0 + t * w).toFixed(1)} ${(yc - amp * Math.sin(2 * Math.PI * cycles * t)).toFixed(1)}`;
    }
    return d;
  };
  const stroke = (x, yTop, yBot, color) => <line key={x} x1={x} y1={yTop} x2={x} y2={yBot} stroke={color} strokeWidth="2" />;
  return (
    <Fig caption="Sampling too slowly loses the signal: one sample per cycle lands on every peak, and those samples fit a constant line just as well (aliasing). At fs = 2f_h the samples pin the sine down." label="Nyquist sampling rate">
      <svg viewBox="0 0 640 300" className="w-full">
        <text x="40" y="20" fontSize="12" fill={R}>too slow: 1 sample per cycle</text>
        <line x1="40" y1="70" x2="600" y2="70" stroke={L} />
        <path d={sine(70, 40, 560, 38, 2)} fill="none" stroke={G} strokeWidth="1.8" />
        {stroke(130, 32, 108, R)}
        {stroke(410, 32, 108, R)}
        <line x1="130" y1="32" x2="410" y2="32" stroke={R} strokeDasharray="6 5" strokeWidth="1.5" />
        <text x="330" y="24" textAnchor="middle" fontSize="11" fill={R}>the samples also fit this flat line</text>
        <text x="40" y="165" fontSize="12" fill={G}>at fs = 2f_h: 2 samples per cycle</text>
        <line x1="40" y1="215" x2="600" y2="215" stroke={L} />
        <path d={sine(215, 40, 560, 38, 2)} fill="none" stroke={G} strokeWidth="1.8" />
        {[180, 320, 460].map((x) => stroke(x, 177, 253, G))}
        {[180, 320, 460].map((x) => <circle key={`d${x}`} cx={x} cy={215 - 38 * Math.sin(2 * Math.PI * 2 * ((x - 40) / 560))} r="4" fill={G} />)}
      </svg>
    </Fig>
  );
}

function Zones() {
  const y = (v) => 5 + (20 - v) * 5; // 5 px per volt, top margin 5
  const codes = ['000', '001', '010', '011', '100', '101', '110', '111'];
  return (
    <Fig caption="Fall 2024's table as a picture: 8 zones of Δ = 5 V over −20…+20 V, zone codes numbered from 0 at the bottom. The 5.3 V sample snaps to the middle of zone 5 (code 101), with error +0.44." label="Quantization zones and normalized error">
      <svg viewBox="0 0 640 242" className="w-full">
        <Arrows />
        {codes.map((_, i) => (
          <g key={i}>
            {/* band i spans voltages (20-5i) down to (15-5i); the course numbers zones from 0 at the BOTTOM, so this band is zone 7-i */}
            <rect x="120" y={y(20 - i * 5)} width="240" height="25" fill={i % 2 ? 'rgb(240 195 90 / 0.02)' : 'rgb(240 195 90 / 0.09)'} stroke={L} strokeWidth="0.7" />
            <text x="368" y={y(20 - i * 5) + 17} fontSize="11" fontFamily="var(--font-mono)" fill={i === 2 ? G : A}>{codes[7 - i]}</text>
            <text x="390" y={y(20 - i * 5) + 17} fontSize="11" fill={A}>zone {7 - i}</text>
          </g>
        ))}
        {[-17.5, -12.5, -7.5, -2.5, 2.5, 7.5, 12.5, 17.5].map((v) => (
          <line key={v} x1="120" y1={y(v)} x2="360" y2={y(v)} stroke={A} strokeDasharray="3 5" strokeWidth="0.8" />
        ))}
        {[20, 10, 0, -10, -20].map((v) => (
          <text key={v} x="112" y={y(v) + 4} fontSize="11" fill={A} textAnchor="end">{v} V</text>
        ))}
        <line x1="120" y1={y(10)} x2="120" y2={y(5)} stroke={G} strokeWidth="2" markerEnd="url(#arrow-g)" />
        <text x="86" y={y(7.5) + 4} fontSize="10" fill={G}>Δ = 5 V</text>
        <circle cx="245" cy={y(5.3)} r="5" fill={G} />
        <text x="258" y={y(5.3) - 8} fontSize="11" fill={G}>sample 5.3 V</text>
        <line x1="252" y1={y(5.3)} x2="330" y2={y(7.5)} stroke={R} strokeWidth="1.6" markerEnd="url(#arrow-r)" />
        <text x="330" y={y(7.5) - 8} fontSize="11" fill={R}>midpoint 7.5 V (error +0.44)</text>
      </svg>
    </Fig>
  );
}

export const DIAGRAMS = { topologies: Topologies, muxdemux: MuxDemux, fiber: Fiber, multistage: Multistage, refraction: Refraction, crossbar: Crossbar, biterrors: BitErrors, cablesection: CableSection, storeforward: StoreForward, syncbits: SyncBits, antennas: Antennas, sampling: Sampling, zones: Zones, ...EXAM_DIAGRAMS };
