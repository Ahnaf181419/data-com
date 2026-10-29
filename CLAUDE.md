# CSE 2211 Data Communication — study portal

A self-contained React study site for one student's final exam, used mostly on an iPad.
Live at https://ahnaf181419.github.io/data-com/ (GitHub Pages, deployed on every push to `main`).

## Commands

- `npm run dev` — dev server (also on the LAN, `--host`)
- `npm test` — node:test suites in `src/lib/*.test.js` (solvers + content integrity). Must pass before every commit.
- `npm run build` — production build. CI sets `GITHUB_ACTIONS`, which switches Vite `base` to `/data-com/`.

## Content rules (most important)

1. **Content comes only from the student's material**: the lecture slides, Raiyan's and Medha's notes, and
   the past papers. Their full text is in `docs/source-transcript.md`; the past papers are typed in
   `src/data/pastPapers.js`. Check every fact and formula against these before adding it. Never invent topics,
   formulas or numbers.
2. If a past paper asks something the material does not cover, it may be taught with the standard Forouzan
   textbook method, but it must be **flagged**: a `note` block saying it is not in the slides/notes, `flagged: true`
   on the module or past-paper item. Existing examples: `src/data/lineCoding.js`, the PCM quantization lesson.
3. Where sources disagree, follow the slides and record the difference in a `note` block (see the DS-3 rate,
   the FDM analog hierarchy method).
4. Every worked numeric answer should be reproducible by a solver in `src/lib/solvers.js` with a test asserting
   the answer printed in the source.

## Layout

- `src/data/*.js` — one module per chapter; `syllabusData.js` lists them in study order.
  Module shape: `{ id, chapter, title, wave, sources, sections: [{ heading, blocks }], formulas, examples,
  flashcards, quiz, solvers }`. Block types: `p`, `list`, `math`, `table`, `note`, `constellation`,
  `lab` (id in `components/Labs.jsx`), `diagram` (id in `components/Diagrams.jsx`; parameterised exam
  diagrams such as `spectrum`, `delay`, `tdmframe` are in `components/ExamDiagrams.jsx`).
  Text uses `$inline math$` and `**bold**`.
- `src/data/checks.js` — one "check yourself" question per lesson, keyed by module id + exact section heading.
  Every section needs one (a test enforces it).
- `src/data/guide.js` — the beginner guide for each lesson (`plain` intro, `terms`, `recap`), same keys as
  checks.js; shown in Learn's step-by-step view. Restate the lesson and transcript only. Every section needs one.
- `src/data/examPrep.js` (likely questions, traps), `src/data/pastPapers.js` (past finals with key-point answers).
- `src/data/answerScripts.js` — the full exam-format answer for every past-paper item and likely question
  (attached as `script`). Extra block types: `h` (step heading), `given`, `answer` (boxed final answer, every
  past-paper script ends with one), `division` (CRC long division), `pre` (column working). Diagrams take `props`.
- `src/lib/solvers.js` — pure calculators returning `{ result, steps }` (steps are LaTeX). UI configs in
  `components/Solvers.jsx`.
- `src/lib/data.test.js` — every LaTeX string compiles with KaTeX, quiz answer indices are valid, checks exist,
  lab/diagram ids exist. Add new lab/diagram ids to its `known` list.

## Design

- Dark only. Tokens in `src/index.css` `@theme`: `ink`, `panel`, `raise`, `line`, `ash` (secondary text),
  `text` (warm white), `gold` (active/progress/correct), `red` (exam-critical/errors). Fonts: Newsreader
  (`display`, `prose-read`) and Manrope, bundled via @fontsource — no external font or CDN requests.
- iPad first: touch targets ≥ 44px (`min-h-11`+), no hover-only UI, `press` class for tap feedback,
  safe-area padding, no horizontal page scroll down to 390px wide.
- Motion: CSS only, using the `--ease-*` tokens and classes in `index.css` (`enter`, `stagger`, `pop`, `shake`…);
  every animation has a `prefers-reduced-motion` fallback. Don't add an animation library.

## Git

- Commit as the student: `user.name` Ahnaf181419, `user.email` muhammad.ahnaf.sarker@gmail.com.
- **Never commit** the source PDFs or scans (`Class Lecture/`, `Notes/`, `fall 2024 question/`,
  `spring 2025 questions/`), `node_modules/` or `dist/`. Check `git status` before every commit.
- Never force-push or rewrite history without the student's explicit go-ahead.
