import { useState } from 'react';
import { Rich } from './NotesView.jsx';

export default function Quiz({ module, best, onFinish }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const total = module.quiz.length;

  if (i === total) {
    const restart = () => (setI(0), setPicked(null), setScore(0));
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-panel p-8 text-center">
        <p className="text-mute">Your score</p>
        <p className="my-2 font-serif text-6xl tabular-nums text-amber">
          {score}/{total}
        </p>
        <p className="mb-6 text-mute">{best != null ? `Best so far: ${Math.max(best, score)}/${total}` : 'First attempt saved.'}</p>
        <button onClick={restart} className="min-h-12 rounded-xl bg-amber px-6 font-semibold text-ink active:opacity-80">
          Retake quiz
        </button>
      </div>
    );
  }

  const q = module.quiz[i];
  const answered = picked !== null;
  const choose = (k) => {
    if (answered) return;
    setPicked(k);
    if (k === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 === total) onFinish(score);
    setPicked(null);
    setI(i + 1);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-mute">
        <span className="tabular-nums">
          Question {i + 1} of {total}
        </span>
        <span className="tabular-nums">Score {score}</span>
      </div>
      <div className="mb-5 h-1 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-amber transition-[width]" style={{ width: `${(i / total) * 100}%` }} />
      </div>
      <h2 className="prose-read mb-5 text-xl leading-snug">
        <Rich text={q.q} />
      </h2>
      <div className="grid gap-3">
        {q.options.map((o, k) => {
          const state = !answered ? '' : k === q.answer ? 'border-good bg-good/10' : k === picked ? 'border-bad bg-bad/10' : 'opacity-60';
          return (
            <button key={k} onClick={() => choose(k)} disabled={answered} className={`flex min-h-14 items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3 text-left text-[1.05rem] active:bg-raise ${state}`}>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-sm text-mute">{'ABCD'[k]}</span>
              <span>
                <Rich text={o} />
              </span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-5" aria-live="polite">
          <p className={`mb-1 font-semibold ${picked === q.answer ? 'text-good' : 'text-bad'}`}>{picked === q.answer ? 'Correct' : 'Not quite'}</p>
          <p className="prose-read text-text/85">
            <Rich text={q.explain} />
          </p>
          <button onClick={next} className="mt-5 min-h-12 w-full rounded-xl bg-amber px-6 font-semibold text-ink active:opacity-80">
            {i + 1 === total ? 'See score' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  );
}
