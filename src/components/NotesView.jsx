import { BlockMath, InlineMath } from 'react-katex';
import { LABS } from './Labs.jsx';
import { DIAGRAMS } from './Diagrams.jsx';

// Renders text with $inline math$ and **bold**.
export function Rich({ text }) {
  if (!text) return null;
  return text.split(/(\*\*[^*]+\*\*|\$[^$]+\$)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-text"><Rich text={part.slice(2, -2)} /></strong>;
    if (part.length > 1 && part.startsWith('$') && part.endsWith('$')) return <InlineMath key={i} math={part.slice(1, -1)} />;
    return part;
  });
}

export function MathBlock({ tex }) {
  return (
    <div className="math-block my-4">
      <BlockMath math={tex} />
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse font-sans text-[0.95rem] leading-snug">
        <thead className="bg-raise text-left text-ash">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-3 py-2.5 font-medium">
                <Rich text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line">
              {r.map((c, j) => (
                <td key={j} className={`px-3 py-2.5 align-top ${j === 0 ? 'text-text' : 'text-text/85'}`}>
                  <Rich text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ASK (OOK), BPSK, QPSK constellations as drawn in the ch5_1 slides.
function Constellation() {
  const plots = [
    { name: 'ASK (OOK)', pts: [[0, 0, '0'], [1, 0, '1']] },
    { name: 'BPSK', pts: [[-1, 0, '0'], [1, 0, '1']] },
    { name: 'QPSK', pts: [[1, 1, '11'], [-1, 1, '01'], [-1, -1, '00'], [1, -1, '10']] },
  ];
  return (
    <div className="my-5 grid grid-cols-3 gap-3 font-sans">
      {plots.map((p) => (
        <figure key={p.name} className="rounded-lg border border-line bg-panel p-2">
          <svg viewBox="-1.6 -1.6 3.2 3.2" className="w-full" role="img" aria-label={`${p.name} constellation: ${p.pts.map((q) => q[2]).join(', ')}`}>
            <line x1="-1.5" y1="0" x2="1.5" y2="0" stroke="var(--color-line)" strokeWidth="0.03" />
            <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="var(--color-line)" strokeWidth="0.03" />
            {p.name === 'QPSK' && <circle r={Math.SQRT2} fill="none" stroke="var(--color-line)" strokeWidth="0.02" strokeDasharray="0.08 0.06" />}
            {p.pts.map(([x, y, l]) => (
              <g key={l}>
                <circle cx={x} cy={-y} r="0.11" fill="var(--color-gold)" />
                <text x={x} y={-y + (y > 0 ? -0.25 : 0.42)} fontSize="0.3" fill="var(--color-text)" textAnchor="middle">
                  {l}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="text-center text-sm text-ash">{p.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Block({ b }) {
  switch (b.type) {
    case 'math':
      return <MathBlock tex={b.tex} />;
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul';
      return (
        <L className={`my-4 space-y-2 pl-6 ${b.ordered ? 'list-decimal' : 'list-disc marker:text-gold'}`}>
          {b.items.map((t, i) => (
            <li key={i} className="pl-1">
              <Rich text={t} />
            </li>
          ))}
        </L>
      );
    }
    case 'table':
      return <Table head={b.head} rows={b.rows} />;
    case 'note':
      return (
        <aside className="my-5 rounded-r-xl border-l-2 border-red/70 bg-red/[0.06] px-4 py-3 font-sans text-[0.98rem] leading-relaxed">
          <Rich text={b.text} />
        </aside>
      );
    case 'constellation':
      return <Constellation />;
    case 'lab': {
      const Lab = LABS[b.id];
      return <Lab mode={b.mode} />;
    }
    case 'diagram': {
      const D = DIAGRAMS[b.id];
      return <D />;
    }
    default:
      return (
        <p className="my-4">
          <Rich text={b.text} />
        </p>
      );
  }
}

export default function NotesView({ module }) {
  return (
    <article className="prose-read text-text/90">
      {module.sections.map((s) => (
        <section key={s.heading} id={s.heading} className="mb-12">
          <h2 className="display mb-3 text-[1.7rem] font-medium leading-tight text-text">{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </section>
      ))}
    </article>
  );
}
