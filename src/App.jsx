import { useEffect, useMemo, useRef, useState } from 'react';
import modules from './data/syllabusData.js';
import { useProgress } from './lib/useProgress.js';
import { ModeTabs, ModuleList } from './components/Nav.jsx';
import NotesView from './components/NotesView.jsx';
import Examples from './components/Examples.jsx';
import Flashcards from './components/Flashcards.jsx';
import Quiz from './components/Quiz.jsx';
import Solvers from './components/Solvers.jsx';
import CheatSheet from './components/CheatSheet.jsx';
import Wave from './components/Wave.jsx';

export default function App() {
  const [progress, update] = useProgress();
  const [cheatOpen, setCheatOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const drawer = useRef(null);

  const mod = useMemo(() => modules.find((m) => m.id === progress.moduleId) ?? modules[0], [progress.moduleId]);
  const mode = progress.mode ?? 'notes';
  const known = progress.known?.[mod.id] ?? [];

  useEffect(() => {
    const d = drawer.current;
    if (navOpen && !d.open) d.showModal();
    if (!navOpen && d.open) d.close();
  }, [navOpen]);

  const pickModule = (id) => {
    update({ moduleId: id });
    setNavOpen(false);
    window.scrollTo(0, 0);
  };
  const pickMode = (m) => {
    update({ mode: m });
    window.scrollTo(0, 0);
  };
  const toggleKnown = (idx) =>
    update((p) => {
      const list = p.known?.[mod.id] ?? [];
      return { known: { ...p.known, [mod.id]: list.includes(idx) ? list.filter((x) => x !== idx) : [...list, idx] } };
    });
  const saveQuiz = (score) => update((p) => ({ quizBest: { ...p.quizBest, [mod.id]: Math.max(score, p.quizBest?.[mod.id] ?? 0) } }));

  const list = <ModuleList modules={modules} currentId={mod.id} progress={progress} onPick={pickModule} />;

  return (
    <div className="lg:grid lg:grid-cols-[19rem_1fr]">
      {/* Sidebar (landscape iPad and desktop) */}
      <aside className="sticky top-0 hidden h-dvh overflow-y-auto border-r border-line px-3 py-6 lg:block">
        <p className="px-2 font-serif text-2xl">CSE 2211</p>
        <p className="mb-5 px-2 text-sm text-mute">Data Communication, final exam</p>
        {list}
      </aside>

      {/* Chapter drawer (portrait iPad and phone) */}
      <dialog
        ref={drawer}
        onClose={() => setNavOpen(false)}
        onClick={(e) => e.target === drawer.current && setNavOpen(false)}
        aria-label="Chapters"
        className="m-0 h-dvh max-h-none w-[min(22rem,88vw)] border-r border-line bg-ink p-0 text-text"
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
          <p className="font-serif text-2xl">Chapters</p>
          <button onClick={() => setNavOpen(false)} className="min-h-11 rounded-xl border border-line px-4 text-mute active:bg-raise">
            Close
          </button>
        </div>
        <div className="px-2 pb-8">{list}</div>
      </dialog>

      <div className="min-w-0 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-16">
        {/* Top bar (below lg) */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-ink/95 px-4 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur lg:hidden">
          <button onClick={() => setNavOpen(true)} className="min-h-11 rounded-xl border border-line px-4 text-text active:bg-raise">
            Chapters
          </button>
          <span className="truncate text-sm text-mute">
            Ch {mod.chapter}: {mod.title}
          </span>
        </div>

        <header className="mx-auto max-w-3xl px-5 pt-8 sm:px-8">
          <p className="font-serif text-lg text-amber">Chapter {mod.chapter}</p>
          <h1 className="mt-1 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{mod.title}</h1>
          <div className="mt-4">
            <Wave type={mod.wave} id={mod.id} />
          </div>
          <p className="mt-2 text-sm text-mute">From {mod.sources.join(', ')}</p>
        </header>

        {/* Mode tabs: sticky under the header on lg, fixed bottom bar below lg */}
        <ModeTabs
          mode={mode}
          onMode={pickMode}
          className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:sticky lg:top-0 lg:mx-auto lg:mt-6 lg:max-w-3xl lg:border-t-0 lg:border-b lg:bg-ink/95 lg:px-6 lg:pb-0"
        />

        <main className="mx-auto max-w-3xl px-5 pt-8 sm:px-8">
          {mode === 'notes' && <NotesView module={mod} />}
          {mode === 'examples' && <Examples key={mod.id} module={mod} />}
          {mode === 'cards' && <Flashcards key={mod.id} module={mod} known={known} onToggleKnown={toggleKnown} />}
          {mode === 'quiz' && <Quiz key={mod.id} module={mod} best={progress.quizBest?.[mod.id]} onFinish={saveQuiz} />}
          {mode === 'solve' && <Solvers key={mod.id} module={mod} />}
        </main>
      </div>

      <button
        onClick={() => setCheatOpen(true)}
        aria-label="Open formula sheet"
        className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 z-30 flex min-h-14 items-center gap-2 rounded-full border border-cyan/50 bg-raise px-5 font-medium text-cyan shadow-lg shadow-black/40 active:scale-95 lg:bottom-6 lg:right-6"
      >
        <span className="font-serif text-xl leading-none">Σ</span> Formulas
      </button>

      <CheatSheet open={cheatOpen} onClose={() => setCheatOpen(false)} modules={modules} currentId={mod.id} />
    </div>
  );
}
