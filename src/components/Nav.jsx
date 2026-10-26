export const MODES = [
  { id: 'notes', label: 'Notes' },
  { id: 'examples', label: 'Examples' },
  { id: 'cards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'solve', label: 'Solve' },
];

export function ModuleList({ modules, currentId, progress, onPick }) {
  return (
    <ul className="grid gap-1">
      {modules.map((m) => {
        const active = m.id === currentId;
        const known = progress.known?.[m.id]?.length ?? 0;
        const best = progress.quizBest?.[m.id];
        return (
          <li key={m.id}>
            <button
              onClick={() => onPick(m.id)}
              aria-current={active ? 'page' : undefined}
              className={`grid min-h-14 w-full grid-cols-[3.25rem_1fr] items-center rounded-xl px-2 py-2 text-left ${active ? 'bg-raise' : 'active:bg-raise'}`}
            >
              <span className={`font-serif text-lg tabular-nums ${active ? 'text-amber' : 'text-mute'}`}>{m.chapter}</span>
              <span>
                <span className="block leading-tight text-text">{m.title}</span>
                {(known > 0 || best != null) && (
                  <span className="mt-1 block text-xs text-mute">
                    {best != null && `Quiz best ${best}/${m.quiz.length}`}
                    {best != null && known > 0 && ', '}
                    {known > 0 && `${known}/${m.flashcards.length} cards known`}
                  </span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function ModeTabs({ mode, onMode, className = '' }) {
  return (
    <div role="tablist" aria-label="Study mode" className={className}>
      {MODES.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={mode === m.id}
          onClick={() => onMode(m.id)}
          className={`relative min-h-12 flex-1 px-2 text-[0.95rem] ${mode === m.id ? 'font-semibold text-amber' : 'text-mute active:text-text'}`}
        >
          {m.label}
          <span className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full ${mode === m.id ? 'bg-amber' : 'bg-transparent'}`} />
        </button>
      ))}
    </div>
  );
}
