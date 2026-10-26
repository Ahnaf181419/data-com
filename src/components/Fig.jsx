// Shared frame and colour tokens for the SVG teaching diagrams.
export const G = 'var(--color-gold)', A = 'var(--color-ash)', L = 'var(--color-line)', T = 'var(--color-text)', R = 'var(--color-red)', RAISE = 'var(--color-raise)';

export function Fig({ caption, children, label }) {
  return (
    <figure className="not-prose my-7 rounded-2xl border border-line bg-panel p-4 font-sans">
      <div role="img" aria-label={label}>
        {children}
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-ash">{caption}</figcaption>}
    </figure>
  );
}

// Arrowhead marker; reference it with markerEnd="url(#arrow-…)".
export function Arrows() {
  return (
    <defs>
      {[
        ['arrow-a', A],
        ['arrow-g', G],
        ['arrow-r', R],
        ['arrow-t', T],
      ].map(([id, c]) => (
        <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1 L10 5 L0 9 Z" fill={c} />
        </marker>
      ))}
    </defs>
  );
}
