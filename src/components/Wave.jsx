// The module's signal trace: one small waveform drawn for each topic.
const bit = (bits, x) => bits[Math.min(bits.length - 1, Math.floor(x * bits.length))];

const SHAPES = {
  sine: (x) => Math.sin(x * 2 * Math.PI * 3),
  ask: (x) => (bit([1, 0, 1, 1, 0], x) ? 1 : 0.08) * Math.sin(x * 2 * Math.PI * 14),
  am: (x) => (0.55 + 0.45 * Math.sin(x * 2 * Math.PI * 1.5)) * Math.sin(x * 2 * Math.PI * 18),
  fdm: (x) => Math.sin(x * 2 * Math.PI * [5, 10, 17][bit([0, 1, 2], x)]),
  tdm: (x) => [0.9, 0.5, 0.75, 0.35][Math.floor(x * 12) % 4] * Math.sin(x * 2 * Math.PI * 16),
  pcm: (x) => Math.round(Math.sin(x * 2 * Math.PI * 2) * 4) / 4,
  guided: (x) => Math.exp(-x * 2.4) * Math.sin(x * 2 * Math.PI * 12),
  radio: (x) => Math.sin(2 * Math.PI * (4 * x + 10 * x * x)),
  switch: (x) => Math.sin(x * 2 * Math.PI * 12 + (bit([0, 1, 1, 0, 1], x) ? Math.PI : 0)),
  error: (x) => Math.sin(x * 2 * Math.PI * 9) * (x > 0.58 && x < 0.66 ? -0.35 : 1),
};

const W = 640, H = 56;

export default function Wave({ type, id }) {
  const f = SHAPES[type] ?? SHAPES.sine;
  let d = '';
  for (let i = 0; i <= 480; i++) {
    const x = i / 480;
    const y = H / 2 - Math.max(-1, Math.min(1, f(x))) * (H / 2 - 4);
    d += `${i ? 'L' : 'M'}${(x * W).toFixed(1)} ${y.toFixed(1)}`;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
      <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="var(--color-line)" strokeWidth="1" />
      <path key={id} d={d} pathLength="1" className="trace" fill="none" stroke="var(--color-gold)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}
