# CSE 2211 Data Communication — Study Portal

## Product Requirements Document

**Status:** Delivered (as-built specification)
**Version:** 1.0
**Date:** 2026-11-05
**Baseline commit:** `95bddf2`
**Live URL:** https://ahnaf181419.github.io/data-com/

> This document specifies the study portal **as it stands** — the behaviour that exists today,
> the decisions that produced it, how it is verified, and what it deliberately does not do.
> It is written to be read by someone who has never seen the project: a handover reader, a
> reviewer, or the student themselves in six months' time. Every quantity quoted below was
> measured from the running code, not remembered.

---

## Problem Statement

One student, one final exam, and a pile of material that does not want to be learned from.

The CSE 2211 *Data Communication* course is taught from three sources that disagree with each
other and none of which is designed for revision:

1. **Class lecture slides** — diagram-heavy, terse, and frequently *incomplete*. A slide may show
   a spectrum with no derivation, a switch structure with no rule for choosing `n`, a TDM frame
   with no explanation of where the guard time went.
2. **Two students' notes** (Raiyan's and Medha's) — richer than the slides, but they contradict
   the slides on real numbers (the FDM analog hierarchy, for example, is computed two different
   ways), and they were written to *pass the exam once*, not to be re-read.
3. **Eight past semester finals**, five of which are scanned images with no text layer at all —
   unreadable by search, by copy-paste, and by every study tool that exists.

Everything that makes revision actually work is missing from that pile:

- **There is no index of what repeats.** Across the eight papers, 139 items collapse into about
  **34 recurring question types**. The single most valuable fact for a student — *these 34
  questions are what the exam actually asks* — is invisible while the papers sit in a folder.
- **There is no way to practise the exam's *methods*.** The exam rewards a specific derivation
  for each numeric answer (a CRC long division, a Hamming syndrome, a TDM frame layout). Reading
  the worked answer teaches the answer; it does not teach the method.
- **There is no feedback loop.** A student cannot check whether they can compute a Shannon limit
  or a one's-complement checksum without doing it by hand, and cannot find out what they got wrong.
- **Some questions are not taught.** **43 of the 139 past-paper items** ask something the slides
  and notes never cover. A student who studies only the material will meet those in the hall and
  have no idea they were even reachable.
- **The reading medium is wrong.** The student studies on an iPad. Raw PDFs on an iPad mean
  pinch-zooming on scans, no internal navigation, no search, and no way to test a formula.

The failure this project exists to prevent: **a student who reads everything and still loses
marks** — on the questions that repeat every year, on the arithmetic they could not self-check,
and on the items that are outside the syllabus but still appear on the paper.

## Solution

A self-contained, installable-in-a-browser React study portal that turns the three sources into
one revision path, deployed free and continuously at a public URL.

It does five things the raw material cannot do:

1. **Teaches.** Every chapter is rebuilt as structured lessons (84 in total across 12 modules)
   from the slides and notes, with the explanation the slides leave out, the disagreement between
   sources made explicit, and 29 diagrams — 15 static teaching figures plus 14 parameterised
   exam diagrams — plus 7 interactive labs.
2. **Prioritises.** The Question bank groups the 139 past-paper items into **34 recurring
   question types**, shows how many papers each has appeared in, weights chapters by how often
   they are asked, and separates what is *in your notes* from what is *outside the current
   syllabus*.
3. **Shows the answer as the examiner wants it.** Every one of the 139 past-paper items and all
   24 likely questions carries both a key-point answer **and** a full exam-format script —
   the exact sequence of headings, givens, working and boxed final answer that scores the marks.
4. **Lets the student practise.** 34 numeric solvers take the exam's own inputs and return the
   worked steps; 104 multiple-choice questions, 131 flashcards, a mock exam and 21 named traps
   cover the self-testing side.
5. **Stays honest.** Anything not taught in the slides or notes is *flagged* in place, both on
   the item and in a dedicated section of the bank, so the student knows exactly where the
   course ends and the textbook begins.

Everything runs client-side. There is no account, no backend, no database, no network call, and
no external font or CDN request. Progress is stored in the browser on the device.

---

## User Stories

### The problem, from the student's side

1. As a student, I want one place that holds the slides, the notes and every past paper, so that I stop juggling four tabs and three folders.
2. As a student, I want to see the exam's recurring question types called out explicitly, so that I revise the 34 things that actually repeat instead of the 139 that were asked.
3. As a student, I want to know how often a topic has been asked, so that I can rank my revision time by expected marks.
4. As a student, I want to see which past-paper items are *not* covered by the course material, so that I am not surprised by an unreachable question in the exam hall.
5. As a student, I want the not-covered items collected in one list rather than scattered, so that I can judge how much extra study the course actually demands.
6. As a student, I want each past paper transcribed accurately, so that I can solve the paper myself rather than guess at a blurry scan.
7. As a student, I want the model solution written the way the examiner wants it, so that I learn to produce marks, not just to recognise answers.
8. As a student, I want every numeric answer reproducible, so that I can trust the site more than my own arithmetic.
9. As a student studying at night, I want to search for a term across all lessons, so that I can jump to the one page I need instead of scrolling.
10. As a student on an iPad, I want no horizontal scrolling and no tiny tap targets, so that I can study on the device I actually own.

### Learning the material

11. As a student, I want each chapter broken into short lessons, so that I can study in 15-minute sessions.
12. As a student, I want to walk a chapter step by step, one lesson at a time, so that I never have to decide where to continue.
13. As a student, I want to read a whole chapter in one scroll, so that I can review before an exam.
14. As a student, I want each lesson to open with a plain-language introduction, so that I know what I am about to read before I read it.
15. As a student, I want new vocabulary listed with a short gloss for every lesson, so that I can learn the jargon without hunting through notes.
16. As a student, I want a short recap at the end of each lesson, so that I can revise from memory immediately afterwards.
17. As a student, I want one "check yourself" question per lesson, so that I can confirm I understood before moving on.
18. As a student, I want the check-yourself answers to be immediate and explained, so that a wrong answer teaches me something.
19. As a student, I want to mark a lesson as read, so that the portal can track where I am.
20. As a student, I want the portal to remember the last module and mode I was in, so that it reopens where I left off.
21. As a student, I want to see which slides and notes each lesson came from, so that I can cross-check the site against the source material.
22. As a student, I want the source's own numbers used even when they are surprising, so that I learn the answer the examiner expects rather than a textbook's tidier version.
23. As a student, I want disagreements between my notes and the slides flagged where they occur, so that I am not caught out by a method difference.

### Working with the numbers

24. As a student, I want to plug a channel bandwidth into the line-coding calculator and get the maximum data rate, so that I can check my own arithmetic in seconds.
25. As a student, I want a CRC generator that shows the long division, so that I learn the layout the exam wants, not just the codeword.
26. As a student, I want a CRC checker that reports the syndrome, so that I can prove a corrupted codeword is detected.
27. As a student, I want a Hamming encoder and syndrome checker, so that I can place and find parity bits without guessing.
28. As a student, I want a one's-complement checksum calculator, so that I can verify a checksum I computed by hand.
29. As a student, I want a Shannon/Nyquist rate calculator, so that I can check a maximum data rate from SNR and bandwidth.
30. As a student, I want a PCM quantiser that returns the zone, midpoint and code for each sample, so that I can check a quantization table.
31. As a student, I want a delay calculator for circuit-switched and datagram networks, so that I can verify the arrival order of five packets.
32. As a student, I want every solver to show its steps in the same notation the exam uses, so that the answer is a method I can reproduce.
33. As a student, I want solver inputs validated before they compute, so that a nonsense input gives me a clear message instead of a wrong number.
34. As a student, I want worked examples from the slides shown with their full working, so that I can see how a textbook example is meant to be solved.

### Diagrams and labs

35. As a student, I want a labelled spectrum diagram for each modulation scheme, so that I can see bandwidth and nulls instead of imagining them.
36. As a student, I want a constellation diagram for QPSK and the other schemes, so that I can reproduce it in the exam.
37. As a student, I want a timing diagram for switching delays and setup times, so that I can draw the same shape under pressure.
38. As a student, I want a TDM frame diagram that expands to show slot contents, so that I can answer "draw the frame" questions.
39. As a student, I want a FDM hierarchy diagram, so that I can reconstruct the guard-band arithmetic.
40. As a student, I want a CRC and redundancy-bit diagram, so that I can place a parity bit correctly.
41. As a student, I want to run a modulation lab and watch the waveform respond to my inputs, so that I can connect a formula to a shape.
42. As a student, I want to run an FDM lab that shows channels separating into guard bands, so that I can see why the guard bands exist.
43. As a student, I want a TDM lab that plays through the slots, so that I can see time-slicing happen.
44. As a student, I want a coding lab that lets me toggle bits and watch the encoded output, so that I can see line coding as a transformation.
45. As a student, I want a Hamming lab that corrupts a codeword and shows the syndrome, so that I understand error detection as a mechanism.
46. As a student, I want the labs to animate with a visible playhead and trace, so that I can follow what is happening rather than guess.
47. As a student, I want every animation to respect my reduced-motion setting, so that nothing flashes or moves when I do not want it to.

### Exam preparation

48. As a student, I want all eight finals selectable, so that I can sit any year.
49. As a student, I want each question shown with its marks, so that I can spend my effort where the marks are.
50. As a student, I want a per-question toggle between key points and the full exam script, so that I can review fast or learn the format.
51. As a student, I want every exam script to end in one boxed final answer, so that I know exactly what to write in the last line.
52. As a student, I want items that are outside the syllabus badged at the point of use, so that I can see the warning exactly where it applies.
53. As a student, I want a "likely questions" list with the reason each question is likely, so that I can tell the teacher's hints apart from my own guesses.
54. As a student, I want a list of the traps that cost marks, so that I do not repeat them.
55. As a student, I want each trap to link straight to the lesson that explains it, so that the trap is fixable in one tap.
56. As a student, I want a mock exam that mixes chapters, so that I can practise under exam conditions.
57. As a student, I want my mock score broken down by chapter, so that I know which chapter to revise next.
58. As a student, I want to retake the mock with shuffled questions, so that I do not memorise the order.
59. As a student, I want my best mock score remembered, so that I can see my improvement.
60. As a student, I want a Question bank grouped by recurring question, so that I can learn the *method* once and reuse it across every paper it appears in.
61. As a student, I want each group to say whether the papers word it identically or only approximately, so that I know how much to memorise verbatim.
62. As a student, I want the most-asked chapters ranked by marks, so that my revision time is spent proportionally.
63. As a student, I want a single formula sheet across all chapters, filterable by chapter, so that I can check a formula mid-revision.
64. As a student, I want the formula sheet to open on the chapter I am reading, so that it is one tap, not a hunt.
65. As a student, I want a global search that covers lesson text, so that I can find "guard band" and land on the lesson that defines it.
66. As a student, I want to search from the bottom bar on a phone, so that search is reachable from anywhere.
67. As a student, I want the Exam prep entry at the top of the navigation, so that the thing I need most is one tap away.

### Keeping track of myself

68. As a student, I want a per-chapter mastery indicator, so that I can see which chapters are still weak.
69. As a student, I want mastery to weigh lessons read, quiz score and flashcards known, so that it reflects real understanding rather than one activity.
70. As a student, I want to mark flashcards I know, so that decks of known cards stop wasting my time.
71. As a student, I want my progress kept on my device without an account, so that there is nothing to sign up for or lose.
72. As a student, I want my progress to survive a page reload, so that I do not have to redo work because the tab closed.
73. As a student, I want the site to still work if my browser blocks storage, so that a private-mode error never stops me studying.
74. As a student, I want to see my progress summary on the overview, so that I can decide what to study next without opening every chapter.

### For whoever maintains this next

75. As a maintainer, I want the source slides and notes transcribed into one text document, so that any fact can be checked against its origin.
76. As a maintainer, I want every chapter's content stored as data rather than as component code, so that it can be searched, counted and asserted on automatically.
77. As a maintainer, I want the build to fail if a lesson loses its check question or its beginner guide, so that incomplete chapters cannot ship.
78. As a maintainer, I want the build to fail if any displayed mathematics does not compile, so that a student never sees a broken formula.
79. As a maintainer, I want the build to fail if a question bank group points at a past-paper item that does not exist, so that the cross-references stay true.
80. As a maintainer, I want the build to fail if a printed numeric answer drifts from the solver that produced it, so that content edits cannot silently desynchronise from the calculators.
81. As a maintainer, I want new past papers appended in one place, so that adding a year does not require touching the UI.
82. As a maintainer, I want every diagram and lab to be registered by id, so that a lesson referencing a missing figure fails the build instead of rendering a blank.
83. As a maintainer, I want the source PDFs and scans kept out of version control, so that the repository stays about code and text.
84. As a maintainer, I want one command to install, test and build, so that the same gate runs locally and in continuous integration.

---

## Implementation Decisions

### Platform and shape

- **Single-page React application, client-side only.** No server, no API, no database, no
  authentication, no analytics. The whole product is a static bundle served by GitHub Pages,
  redeployed automatically on every push to the main branch.
- **Content as data, not as components.** Each chapter is a data module with a fixed shape:
  identity, study wave, source list, sections (lessons), formulas, worked examples, flashcards,
  a quiz and the solvers it exposes. The same shape makes the content searchable, countable by
  the overview, and assertable in tests — none of which is possible if the lessons are JSX.
- **One shared block vocabulary.** Lesson content is a list of blocks — paragraph, list, maths,
  table, note, constellation, lab reference, diagram reference. Exam scripts add a few more:
  step heading, given, boxed answer, long division, column working. One renderer draws all of
  them, so an exam script and a lesson look identical in structure but differ in tone.
- **Inline markup rather than a rich-text model.** Text carries `$math$` and `**bold**`; a single
  renderer converts them to KaTeX and styled spans. Authors write plain strings, which keeps the
  content diffable and the maths testable.
- **Diagrams are a registry, not inline markup.** Static teaching figures and parameterised exam
  figures (spectrum, hierarchy, constellations, delay, TDM frame, TST, datagram network,
  redundancy bits and others) are looked up by id, so a lesson can request a figure with
  parameters. Figures live in a scrollable container with a minimum width so that a 640-unit
  view box stays legible on a 390 px phone instead of shrinking to unreadable 5 px text.
- **Labs are a registry too**, keyed by id, with motion implemented in CSS only. Labs have a
  visible playhead and trace rather than a bare slider.

### Numbers, methods and their verification

- **Solvers are pure functions** returning a result plus its steps in LaTeX. The UI configuration
  lives separately from the calculation, so a solver can be tested without a browser.
- **Every printed numeric answer is reproducible by a solver**, and a test asserts the printed
  value against the recomputed one. This is the mechanism that caught the wrong 2B1Q staircases,
  the reversed checksum conclusion and the four-fold-over signal-element count during review.
- **34 solvers** cover CRC generate/check, Hamming encode/check, one's-complement checksum,
  parity (scalar and 2-D), Shannon and Nyquist rates, BFSK/ASK/FSK bandwidth, baud rate and bits
  per element, cable loss, LOS height and distance, analog bandwidth, PCM sampling and
  quantization, FDM hierarchy and link, TDM and multislot TDM, circuit-switched delay, datagram
  arrival, multistage and Clos crosspoint counts, station plan, redundancy bits and 4B/5B block
  coding.
- **Solver inputs are guarded.** Out-of-range, zero or non-numeric inputs produce a clear message
  rather than a plausible-looking wrong number.

### Exam content

- **Every past-paper item carries two answers.** A key-point answer (what the marks are for) and
  a full exam-format script that always ends in one boxed final answer.
- **Out-of-syllabus is a first-class flag**, not a note. It can be set on a module or on an item,
  renders as a distinct badge at the point of use, and drives a dedicated section of the Question
  bank. 43 of 139 items are flagged out of syllabus; 60 in total are flagged as not appearing in
  the slides or notes (the 43 are a subset of the 60).
- **The bank groups by recurring question**, with cross-paper references by paper title and item
  id. A group states whether the papers word it identically (marked "word for word") or only
  approximately — the distinction matters for how much to memorise verbatim.
- **Chapter weighting is derived, not typed.** The "most asked chapters" list is computed from
  the past-paper data, so it cannot drift from the papers.
- **New papers are appended** to the end of the paper list, with index-matched scripts and new
  bank groups. The interface reads the list; no view needs editing.

### Study aids

- **Guides mirror lessons exactly.** Every lesson has a beginner guide with a plain introduction,
  new terms and a recap, and exactly one check question, both keyed by module and section
  heading. Tests fail if a lesson loses either.
- **Mastery is a weighted blend**: lessons read 50 %, best quiz score 30 %, flashcards marked
  known 20 %. It is a progress signal, not a grade.
- **Progress is stored locally under a single key**, wrapped in try/catch so that blocked storage
  degrades to "no persistence" instead of an error.
- **The mock exam** draws across chapters, scores per chapter on completion, can be retaken with
  shuffled questions, and persists the best score.

### Design and accessibility

- **Dark only.** One warm palette with four accent roles: ink, panel, raised, line, plus secondary
  text, warm white for body, gold for active/progress/correct, red for exam-critical and errors.
- **Two bundled fonts** (a serif for display and long-form reading, a sans for UI) shipped with
  the bundle — no external font or CDN request, so the site renders identically offline.
- **iPad first.** Touch targets are at least 44 px, there is no hover-only interaction, tap
  feedback is consistent, safe-area padding is respected, and there is no horizontal page scroll
  down to 390 px.
- **Motion is CSS-only**, driven by shared easing tokens and named utility classes, with a
  `prefers-reduced-motion` fallback on every animation. No animation library was added.
- **Semantics over styling**: tabs, dialogs, disclosure groups and pressed states carry the
  matching ARIA roles and attributes, and focus is always visible.

### Delivery

- **Continuous integration runs exactly three commands** on every push to main: a clean install,
  the test suite, and a production build. The same three commands are what a maintainer runs
  locally. A failed test blocks the deploy.
- **One bundle, no code splitting.** The single bundle is about 1.06 MB (roughly 327 kB
  compressed), dominated by KaTeX and the exam content. Splitting was evaluated and rejected as
  complexity without benefit for a single-user study site on a tablet.
- **Git hygiene is enforced by policy and by the ignore file.** Source PDFs, scans, build output
  and dependencies are never committed; the student is the sole commit author; history is never
  rewritten without the owner's explicit agreement.

### Content governance (the rules that shaped every decision)

- Content comes **only** from the student's material — the lecture slides, the two sets of notes,
  and the past papers. The full text of the slides and notes lives in one transcribed source
  document so any fact can be checked against its origin.
- Where a past paper asks something the material does not cover, it may be taught using the
  standard textbook method, but it **must be flagged** in place — both as a note in the lesson
  and as a flag on the module or item.
- Where sources disagree, **the slides win**, and the difference is recorded in a note next to
  the number rather than being silently resolved.
- Every worked numeric answer is reproducible by a solver, and a test pins the printed answer
  to the solver's result.

---

## Testing Decisions

**What makes a good test in this project:** it asserts *external behaviour* — the number a
student reads, the text they see, the reference they can follow — never the internal shape of a
component. A test that checks a component's props is worthless here because the risk being
managed is not "the component is wired wrong", it is "the content is wrong".

**The suite is 29 tests in two files, run by the built-in Node test runner.**

*Solver tests (18)* — recompute from first principles and assert the printed value:

- CRC generation and syndrome detection over the generators the papers actually use, including
  the assertion that a corrupted codeword produces a non-zero syndrome.
- Hamming encoding, syndrome extraction and the "error detected / error corrected" verdict.
- One's-complement checksum with end-around carry, including the case where compensating errors
  cancel and the receiver correctly computes zero.
- Shannon and Nyquist maximum rates, signal-element counts, bits per element.
- FDM hierarchy totals and multislot TDM frame arithmetic, including the delayed-line variant.
- Antenna LOS height, distance and cable loss in decibels.
- PCM quantization: zone, midpoint and code for each sample.
- Circuit-switched delay components and datagram arrival ordering.
- Multistage and Clos crosspoint counts.
- Input guards: invalid, zero and negative inputs must be rejected, not computed.

*Content-integrity tests (11)* — the specification for the content itself:

- Every module is complete and uniquely identified; every module id referenced anywhere resolves.
- Every lesson has a check question, and every check question's answer points at a real option.
- Every lesson has a beginner guide.
- Every displayed LaTeX string compiles — no student ever sees a broken formula.
- Every lab and diagram id referenced by a lesson exists in the registry.
- Every past-paper item points at a real chapter and its mathematics compiles.
- Every past-paper item and likely question has a valid exam script, and every past-paper script
  ends in a boxed answer.
- CRC divisions embedded in the exam scripts produce exactly the answers those scripts print.
- Every question-bank group points at real past-paper items, and every "word for word" claim is
  genuinely word for word.

**Manual and browser verification (not automated in the suite, run before every release):**

- A walk of every flow at 390 px, 820 px and 1280 px: overview, all five exam-prep tabs, all
  eight paper tabs with their answers opened, every question-bank group expanded, the likely
  list, a full mock exam, the traps, a module in both step-by-step and whole-chapter views, the
  formula sheet, global search, and the mobile drawer.
- Assertions made by hand each time: zero console errors or page errors, zero horizontal page
  overflow, no unrendered markup in any answer, touch targets at least 44 px, visible keyboard
  focus, and no duplicated or contradictory content between sections.

**Prior art in the codebase:** the existing solver and content-integrity suites are the
convention — plain Node test runner, `node:assert`, one behaviour per test, data files imported
directly. New tests follow that shape.

**Deliberate gap:** there is no React component testing library and no browser automation in
continuous integration. Component behaviour is covered by the manual browser walk and by the
build. Adding a component-test harness was considered and deferred, because the content — not
the components — is what carries the risk in this product.

---

## Out of Scope

The following are explicitly **not** part of this product, and none of them is planned:

- **Spaced repetition.** Flashcards are mark-as-known only; there is no forgetting curve, no
  scheduling, no "due today" queue.
- **Offline installation.** The site is a static bundle and works from a served page, but there is
  no service worker, web manifest, install prompt or offline badge.
- **Print and PDF export.** The formula sheet is screen-only; there is no print stylesheet or
  printable cheat sheet.
- **Deeper analytics.** Mastery is a single 0–1 blend per chapter. There are no time series, no
  study streaks, no heat map, no cross-device history.
- **Accounts, sync and collaboration.** No sign-in, no server, no shared or public progress, no
  comments, no leaderboards.
- **Content beyond the student's material.** No invented topics, no broad textbook coverage. The
  only material outside the slides and notes is the standard textbook method used to answer a
  past-paper question, and every instance of it is flagged.
- **Hosting the source PDFs and scans.** They stay untracked in the repository by policy.
- **Rewriting git history** to purge the scanned exams from old commits.
- **Code-splitting the bundle** and adding an animation library.
- **A next-phase feature roadmap.** This document specifies what exists; it is not a wish list.

---

## Further Notes

**One question cannot be closed by the project.** Forty-three past-paper items are outside the
current syllabus because the lecture slides and notes never cover them. Whether the unseen
textbook chapters (the blocks and line-coding material, the datagram and multiplexing chapters,
and the error-control chapters) are examinable is a question for the course teacher. The
resolution is recorded under a dedicated "Syllabus confirmations" heading in the source
transcript with the date of the answer, and the flags are updated the moment it is known.
Until then the honest position — visible on every affected item — is the correct one.

**One known source conflict, deliberately left visible.** The line-coding maximum-data-rate
table is not part of the course material and is not held in the repository. Two of its rows
reduce to the same relation, which cannot be true for schemes with different bit densities. The
site now prints the corrected row and instructs the student to check that row against their own
copy of the textbook before the exam. This is the correct handling of a conflict the project
cannot resolve: state the uncertainty instead of hiding it.

**The scans remain in git history.** The owner was asked and declined a history rewrite. They are
untracked going forward, but the earlier commits still contain them.

**Verification commands for anyone picking this up:**

- `npm ci` — clean install, exactly as continuous integration does it
- `npm test` — the 29-test suite; must pass before every commit
- `npm run build` — production build
- `npm audit --omit=dev` — dependency audit

**How to add a past paper:** append the paper to the paper list, add its index-matched exam
scripts, add or extend the matching Question bank groups, and update the "most asked chapters"
weighting only if the derivation is wrong. The interface, the weighting and the count all follow
the data.

---

### Appendix — repository map (informational)

Not part of the specification; a quick orientation for a new reader.

| Area | Where |
|---|---|
| App shell, routing, search, formula-sheet dialog | `src/App.jsx` |
| Navigation and mode tabs | `src/components/Nav.jsx` |
| Overview dashboard | `src/components/Dashboard.jsx` |
| Lesson views, examples, flashcards, quiz, solvers UI | `src/components/Learn.jsx`, `Examples.jsx`, `Flashcards.jsx`, `Quiz.jsx`, `Solvers.jsx` |
| Exam prep (papers, bank, likely, mock, traps) | `src/components/ExamPrep.jsx` |
| Lesson and script renderer (maths, tables, constellations, long division) | `src/components/NotesView.jsx` |
| Static teaching figures | `src/components/Diagrams.jsx` |
| Parameterised exam figures | `src/components/ExamDiagrams.jsx` |
| Interactive labs | `src/components/Labs.jsx` |
| Per-chapter content | `src/data/ch1.js`, `ch4x.js`, `ch5_1.js`, `ch5_2.js`, `ch6_1.js`, `ch6_2.js`, `pcm.js`, `ch7_1.js`, `ch7_2.js`, `ch8.js`, `ch8_2.js`, `ch10.js` |
| Module order | `src/data/syllabusData.js` |
| Past papers, bank, likely questions, traps | `src/data/pastPapers.js`, `questionBank.js`, `examPrep.js` |
| Exam-format scripts | `src/data/answerScripts.js` |
| Per-lesson check questions and beginner guides | `src/data/checks.js`, `guide.js` |
| Calculators and their tests | `src/lib/solvers.js`, `solvers.test.js` |
| Content-integrity tests | `src/lib/data.test.js` |
| Local progress storage | `src/lib/useProgress.js` |
| Slides and notes, fully transcribed | `docs/source-transcript.md` |
| Design tokens and motion classes | `src/index.css` |
| Content rules, commands, layout, git policy | `CLAUDE.md` |
| Completed and blocked implementation plans | `plans/` |
