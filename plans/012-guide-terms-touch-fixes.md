# Plan 012: Fill the empty guide terms lists, restore 44px touch targets, kill hover-only affordances

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/data/guide.js src/components/Labs.jsx src/components/ExamPrep.jsx src/components/Search.jsx src/components/Learn.jsx`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP (plans 001 add guide entries in ch1/ch7-1 — different keys, additive).

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx / learning UX
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

Three mechanical quality gaps on the primary iPad device:

1. **15 guide lessons have `terms: []`** — the step-by-step view renders a "New words" panel from `terms` (Learn.jsx ~114-130); for those lessons the panel is empty for exactly the vocabulary a beginner stumbles on (e.g. "Analog hierarchy" — its whole content *is* four new words: group/supergroup/master/jumbo). One lesson's recap also drops the dB conversion needed for the slide's 45.46 dB answer.
2. **Touch targets under the repo's own 44px rule** (CLAUDE.md: "touch targets ≥ 44px (`min-h-11`+)"): lab `Seg` buttons and bit toggles are `min-h-10`/`size-10` (40px); ExamPrep chapter links are `min-h-9` (36px). The densest tap surfaces (bit toggles) are the most mis-tapped.
3. **Hover-only affordances**: ExamPrep's chapter links underline only on `hover:`; Search rows highlight only on `hover:bg-panel`. On iPad nothing ever hovers — the links render as plain grey text with no tap affordance (CLAUDE.md bans hover-only UI).

## Current state

- `src/data/guide.js` — filled-terms shape (line 9-13): `terms: [['Communication', 'Sharing of information, local or remote.'], ...]`. Empty at lines **18, 23, 51, 133, 199, 217, 230, 250, 283, 288, 333, 341, 369, 390, 452** (verify with `grep -n "terms: \[\]" src/data/guide.js` — count may have shifted if plans 001/011 landed). Highest-value fills read directly from the lessons:
  - `:199` "Analog hierarchy (AT&T)" (ch6-1) → group / supergroup / master group / jumbo group (definitions in `ch6_1.js` "Analog hierarchy" section).
  - `:369` "Wireless transmission waves" (ch7-2) → omnidirectional / unidirectional (table at ch7_2.js:51).
  - `:452` "Two-dimensional parity" (ch10) → row parity / column parity (ch10.js Two-dimensional parity section).
  - `:133` QAM (ch5-1) → constellation point / amplitude-and-phase combination (ch5_1.js QAM section).
  - The rest: read each lesson's section and list its 1-3 genuinely new words; leave `terms: []` only where the section truly introduces none (a few are legit — e.g. "Data flow" already has its three modes in `plain`... but note lines 21-25 DO have words; fill what's real).
  - Also: `guide.js` "Antenna gain" recap (around :352-356) should append `$G_{dB} = 10\\log_{10}G$` — the module formula (ch7_2.js:59) needed for the 45.46 dB answer.
- `src/components/Labs.jsx` — under-sized targets:
  - `:27` Seg buttons `press min-h-10 rounded-lg px-3.5` → `min-h-11`
  - `:44` bit toggles `press size-10 rounded-lg` → `size-11` (3 occurrences: :44, :49, :52)
  - `:113` ModulationLab play button `min-h-10` → `min-h-11`
  - `:416` Hamming coverage buttons `min-h-10` → `min-h-11`
  - `:499` CodingLab "Draw first" number input `min-h-10` → `min-h-11`
  - `:265` TdmLab unit buttons `press h-10` → `h-11`
- `src/components/ExamPrep.jsx` — `:18` and `:140` chapter links `press min-h-9 rounded-lg px-2 text-ash underline-offset-4 hover:underline` → `min-h-11` + persistent affordance (step 3); `:275` paper radios `min-h-10` → `min-h-11`.
- `src/components/Search.jsx:79` — result rows `press block w-full rounded-xl px-4 py-3 text-left hover:bg-panel`.
- `src/components/Learn.jsx:76` — check-answer buttons `min-h-10` (verify line) → `min-h-11`.
- Test gate: `src/lib/data.test.js:59-68` requires every guide entry to have `Array.isArray(g.terms)` and compiles term text — filling terms is safe; empty arrays also pass, which is why they survived.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |
| Empty-terms count | `grep -c "terms: \[\]" src/data/guide.js` | 0 (or a number you can justify) |

## Scope

**In scope**: `src/data/guide.js`, `src/components/Labs.jsx`, `src/components/ExamPrep.jsx`, `src/components/Search.jsx`, `src/components/Learn.jsx`.
**Out of scope**: all other data files (guide must restate lessons only — no new content), solvers, tests, index.css.

## Git workflow

- Branch: `claude/012-terms-touch`. Commit: `Fill the empty guide terms; restore 44px targets; visible tap affordances`. Commit as the student. Do not push.

## Steps

### Step 1: Fill the terms lists

For each `grep -n "terms: \[\]" src/data/guide.js` hit: open the module section with that heading, extract its 1-4 new words, write `[word, one-line meaning]` pairs reusing the lesson's own wording. Rules: restate the lesson (guide.js header comment), LaTeX allowed inline (`data.test.js:64` compiles it). Append `$G_{dB} = 10\\log_{10}G$` to the "Antenna gain" recap array.

**Verify**: `npm test` → the guide test still passes; `grep -c "terms: \[\]" src/data/guide.js` → 0 or justified remainder.

### Step 2: Touch targets (mechanical class edits)

Apply the class replacements listed in "Current state" (`min-h-10` → `min-h-11`, `size-10` → `size-11`, `h-10` → `h-11`, `min-h-9` → `min-h-11`) at exactly the cited lines. Then `grep -n "min-h-10\|size-10\|min-h-9" src/components/Labs.jsx src/components/ExamPrep.jsx src/components/Learn.jsx` and fix any stragglers that are tappable controls (leave non-interactive elements alone).

**Verify**: `npm run build` succeeds; visually the Hamming grid still scrolls horizontally inside its `overflow-x-auto` container (cells grew 4px).

### Step 3: Persistent affordances

- `ExamPrep.jsx:18,140`: replace `hover:underline` with a persistent affordance: add `after:content-['→'] after:ml-1 after:text-gold` or keep the underline always (`underline decoration-line underline-offset-4`) — pick whichever matches the design (look at how `Nav.jsx` marks tappable rows; the `press` active state already exists).
- `Search.jsx:79`: add a persistent treatment — e.g. `bg-panel/50` resting state or `border border-line` on rows (match the drawer rows in Nav.jsx), removing reliance on `hover:bg-panel` (which may stay as a progressive enhancement alongside).

**Verify**: `npm run build`; open the Exam prep tab at a phone width — chapter links visibly look tappable without any hover.

## Test plan

Suite gates guide text compilation; class changes are build-gated. Manual: no layout wraps badly after the 4px growth (check the Hamming lab row and the ExamPrep header row at 390px).

## Done criteria

- [ ] `grep -c "terms: \[\]" src/data/guide.js` → 0 (or each remaining one justified in the report)
- [ ] `grep -n "G_{dB}" src/data/guide.js` finds the antenna recap line
- [ ] `grep -n "min-h-10\|size-10\|min-h-9" src/components/Labs.jsx src/components/ExamPrep.jsx src/components/Learn.jsx` returns no tappable controls
- [ ] `npm test`, `npm run build` pass; only in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- A `terms: []` lesson's module section doesn't exist under that heading (drift between guide and module keys — the test would fail too; report).
- The 4px growth breaks a layout with no quick fix (e.g. ExamPrep header wraps to 3 lines) — revert that one control and report rather than redesigning.

## Maintenance notes

- The guide test enforces existence, not quality — new lessons will reintroduce empty terms unless authors fill them; consider (later, not this plan) asserting `terms.length` where a section has new vocabulary. Deliberately out of scope: writing that test now would fail on the justified-remainder lessons.
