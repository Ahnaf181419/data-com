# Plan 001: Teach the three flagged Spring 2024 topics (OSI, impairments, dB cable loss)

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/data/ch1.js src/data/ch7_1.js src/data/checks.js src/data/guide.js`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW (additive sections)
- **Depends on**: none
- **Category**: direction (content gap)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

Spring 2024's final asked three things the student's slides and notes do not cover: the OSI layers with physical/data-link responsibilities (5 marks), the three transmission impairments (5 marks), and a dB/km cable-loss calculation (4 marks). They are marked `flagged: true` in `src/data/pastPapers.js` and only exist as past-paper answer text. 14 marks of one real paper currently have no lesson — a flagged topic is exactly what a student cannot reconstruct alone. This plan turns those existing model answers into three short flagged lessons, following the repo's established flagged-content pattern (`src/data/lineCoding.js`, `src/data/pcm.js`).

## Current state

- `src/data/ch1.js` — module `id: 'ch1'`, "Data Communication Basics", 6 sections ending with "Connection types and topologies" (lines 61–79), then `formulas`, `examples: []`, `flashcards`, `quiz`, `solvers: ['delay']`. It has **no** OSI section and **no** impairments section.
- `src/data/ch7_1.js` — module `id: 'ch7-1'`, "Guided Media", 7 sections, `formulas: []`, `examples: []`. It has **no** decibel/dB content.
- `src/data/pastPapers.js:387-405` — the two flagged items whose answer text becomes the new lessons:

```js
{ id: '1(b)', marks: 5, module: 'ch1', flagged: true,
  q: 'List the layers of the OSI model. Briefly describe the responsibilities of the physical layer and data link layer in the OSI model.',
  answer: [
    'Not in your slides or notes beyond "end devices use all 7 OSI layers": standard textbook answer.',
    'Layers (bottom up): physical, data link, network, transport, session, presentation, application.',
    'Physical: moves individual bits over the medium; defines the interface and medium, how bits are represented (encoding), the data rate, bit synchronization, line configuration, topology and transmission mode.',
    'Data link: node-to-node (hop-to-hop) delivery of frames; framing, physical addressing, flow control, error control (detection and correction, as in Ch 10) and access control.',
  ],
},
{ id: '1(c)', marks: 5, module: 'ch1', flagged: true,
  q: 'Define signal impairment. Briefly discuss the three types of transmission impairment with an example.',
  answer: [ /* attenuation / distortion / noise — see file lines 397-405 */ ],
},
```

- `src/data/pastPapers.js:531-534` (Spring 2024 Q3(d), `module: 'ch7-1'`, flagged) asks a dB/km cable-loss question. Its worked numbers live in `src/data/answerScripts.js` around line 826.
- Repo conventions that apply:
  - **Flagged-content note pattern** — first block of the lesson is a note like `src/data/pcm.js:34`: `'**Not in your slides or notes.** <paper reference> asked it, so it is taught here using the standard textbook (Forouzan) method. Check with your teacher.'`
  - **Text styling**: `$inline math$` and `**bold**` inside `p`/`list` blocks; block types `p`, `list`, `math`, `table`, `note`.
  - **Every section needs a check-yourself question** in `src/data/checks.js` keyed `moduleid -> exact heading`, format `c(q, options, answerIndex, explain)` (see `checks.js:1-3`), AND a beginner-guide entry in `src/data/guide.js` (`plain`, `terms`, `recap`). Two tests enforce this (`src/lib/data.test.js:47-68`) — the suite fails until both are added.
  - Module `sources` arrays list provenance; flagged modules add the paper, e.g. `src/data/pcm.js:6`.
- CLAUDE.md content rules (authoritative): content comes only from the student's material; a past-paper topic the material lacks may be taught with the standard Forouzan method **but must be flagged** with a note block. Do not invent beyond what the past-paper answers + standard textbook definitions state.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass (26+ tests, count grows with content) |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope** (the only files you should modify):
- `src/data/ch1.js`
- `src/data/ch7_1.js`
- `src/data/checks.js`
- `src/data/guide.js`

**Out of scope** (do NOT touch):
- `src/data/pastPapers.js`, `src/data/answerScripts.js` — the answers already exist and are correct; this plan adds lessons, not answer changes.
- `src/data/examPrep.js` / `src/data/questionBank.js` — chapter weight is computed from pastPapers; no change needed.
- Any component file — no new diagrams in this plan.

## Git workflow

- Branch: `claude/001-flagged-lessons` (repo has used `claude/...` branches before, e.g. commit `73d3f58`).
- Commit as the student: `git -c user.name=Ahnaf181419 -c user.email=muhammad.ahnaf.sarker@gmail.com commit`.
- Message style (from `git log`): short imperative, e.g. `Teach the flagged OSI, impairment and dB topics`.
- Do NOT push. Never commit `Class Lecture/`, `Notes/`, `QuestionBank/`, `dist/`, `node_modules/`.

## Steps

### Step 1: Add the OSI section to ch1.js

Insert a new section object after "Connection types and topologies" (ch1.js:61-79), with heading `'The OSI model (flagged extra)'`. Blocks:
1. `{ type: 'note', text: '**Not in your slides or notes.** Spring 2024 Q1(b) asked it, so it is taught here using the standard textbook (Forouzan) method. Check with your teacher.' }`
2. A `p` listing the seven layers bottom-up (physical, data link, network, transport, session, presentation, application) — copy the wording from `pastPapers.js:391`.
3. A `list` of physical-layer responsibilities and data-link responsibilities — copy from `pastPapers.js:392-393`.

Also append 2 flashcards (OSI layers bottom-up; physical vs data link job) and 1 quiz item to `ch1.js` following the existing `quiz` shape `{ q, options, answer, explain }`.

### Step 2: Add the impairments section to ch1.js

Insert heading `'Signal impairment (flagged extra)'` after the OSI section. Blocks:
1. Note block as in Step 1 but referencing Spring 2024 Q1(c).
2. `p`: definition of impairment; `list`: the three types **attenuation / distortion / noise** with one-line definitions and the example each, copied from `pastPapers.js:401-404`.

Append 1-2 flashcards and 1 quiz item.

### Step 3: Add the decibel section to ch7_1.js

Insert a new section at the **end** of `ch7_1.js` sections (after "Fiber applications, pros and cons", line 58-63) with heading `'Decibels and cable loss (flagged extra)'`. Blocks:
1. Note block: `'**Not in your slides or notes.** Spring 2024 Q3(d) asked it...standard textbook method.'`
2. `math`: `\text{dB} = 10 \log_{10}\frac{P_2}{P_1}` plus the cascaded-loss form used by the past-paper answer (negative dB = loss, add losses along the cable: `$\text{total dB} = -\alpha\ (\text{dB/km}) \times \text{length}$`).
3. Re-work the Spring 2024 Q3(d) numbers as an `examples` entry (read the exact numbers from `src/data/answerScripts.js` around line 826 — the `given`/math steps there) with `source: 'Spring 2024 Q3(d) (flagged)'`.

Also add the formula to `ch7_1.js` `formulas` (currently empty) and 2 flashcards + 1 quiz item. Update the module `sources` line (ch7_1.js:6) to append `'Spring 2024 Q3(d) (flagged lesson)'`.

### Step 4: Add the check questions

In `src/data/checks.js`, inside the `ch1` object add two entries and create/extend `ch7-1` (the key is the module id string `'ch7-1'`; it already exists in checks.js around line 63):

```js
'The OSI model (flagged extra)': c('Which OSI layer delivers frames hop-to-hop?', ['Physical', 'Data link', 'Network', 'Transport'], 1, 'Framing, physical addressing, flow/error control.'),
'Signal impairment (flagged extra)': c('Loss of signal energy over distance is:', ['Distortion', 'Noise', 'Attenuation', 'Jitter'], 2, 'Fixed with amplifiers/repeaters; measured in dB.'),
'Decibels and cable loss (flagged extra)': c('A cable with −3 dB loss keeps what fraction of power?', ['All', 'Half', 'One tenth', 'Double'], 1, '−3 dB ≈ ×1/2.'),
```

Keys must match the section headings **exactly** (the test at data.test.js:47-57 fails otherwise).

### Step 5: Add the beginner-guide entries

In `src/data/guide.js`, add entries under `ch1` and `'ch7-1'` for each new heading, each `{ plain, terms, recap }`. `plain` = 2-3 sentences for a first-time reader; `terms` = `[word, meaning]` pairs (OSI, layer, attenuation, distortion, noise, dB…); `recap` = the layer list / three impairments / the dB formula. Restate only what the new sections say (guide.js header comment rule).

**Verify**: `npm test` → all pass, including "every lesson has a valid check question" and "every lesson has a beginner guide".

### Step 6: Final check

**Verify**: `npm run build` → builds. `git status` → only the four in-scope files modified.

## Test plan

No new test files. The existing suite enforces completeness: `npm test` must pass with the new sections present — that is the regression net (KaTeX compiles, quiz indices valid, checks/guides exist and compile).

## Done criteria

- [ ] `npm test` exits 0 with the three new sections present
- [ ] `grep -n "flagged extra" src/data/ch1.js src/data/ch7_1.js` shows 3 headings
- [ ] Each new section's first block is a note naming the paper and the textbook method
- [ ] `git status` shows only `src/data/ch1.js`, `src/data/ch7_1.js`, `src/data/checks.js`, `src/data/guide.js` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The past-paper items at `pastPapers.js:387-405` or `:531-534` are no longer `flagged: true` or their text changed materially.
- `npm test` fails on anything other than a missing check/guide key for the new headings (that means an excerpt mismatch — report it).
- You find an existing OSI/impairment/dB lesson already in the modules (do not duplicate).

## Maintenance notes

- If the teacher confirms these topics are out of syllabus, delete the three sections (and their checks/guide rows) — nothing else references them.
- The dB example numbers must stay identical to `answerScripts.js`'s Spring 2024 Q3(d) script; if one changes, change both.
