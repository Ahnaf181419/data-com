# Plan 006: Add the slide's binary checksum example and two small slide facts

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/data/ch10.js src/data/ch5_1.js src/data/ch7_1.js src/data/checks.js src/data/guide.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP. NOTE: plans 001 edits ch1/ch7_1/checks/guide too — if 001 already landed, its sections will show as diffs; that is expected, do not remove them.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (coordinate file edits with 001 — different sections, same files)
- **Category**: direction (content gap)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

The slides' own 8-bit **binary checksum example** (the one that demonstrates carry wrap-around in binary *and* that a checksum catches a 4-bit burst) is missing from the ch10 lesson — only the 4-bit decimal variant is taught, while the binary variant survives solely inside a solver test where no student sees it. Fall 2024 reused the decimal variant; the binary one is the equally likely next ask. Two one-line slide facts are also absent: BASK "1 bit interval = 2 or 3 carrier cycles", and the periodic→discrete / non-periodic→continuous spectrum contrast — classic 1-mark questions.

## Current state

- `src/data/ch10.js:56-63` — the Checksum section (only the decimal example):

```js
{
  heading: 'Checksum',
  blocks: [
    { type: 'p', text: 'A checksum adds chunks of data. ...' },
    { type: 'list', items: ['**Sender:** divide the unit into $k$ sections of $n$ bits, ...', '**Receiver:** add all sections including the checksum ...'] },
    { type: 'p', text: '4-bit example: data (7, 11, 12, 0, 6). Sum = 36 = 100100; wrap the extra 10 → 0100 + 10 = 0110 = 6; checksum = complement = 1001 = 9. Send (7, 11, 12, 0, 6, 9).' },
    { type: 'p', text: 'Receiver: sum = 45 = 101101 → 1101 + 10 = 1111 → complement 0000 → no error.' },
  ],
},
```

- Transcript (docs/source-transcript.md line 1833, Part 2 transcription of the slides): the binary example is **10101001 + 00111001 → sum 11100010, checksum 00011101; receiver adds and complements → 0 (no error)**; then a 5-bit noise burst corrupts 4 bits so the received checksum becomes 00111001 → the receiver's complemented sum is non-zero → **error detected**. Slide-text reference also at transcript lines 1678-1683 ("Checksum-example-1", three slides).
- `src/data/ch5_1.js:26-37` — the ASK section (no cycles-per-bit fact; add to the BASK paragraph at line 29 or as a note after it). Transcript line 1846 (R9): "1 bit interval = 2 or 3 cycles".
- `src/data/ch5_1.js:8-15` — "What and why" section (no periodic/non-periodic spectrum contrast). Transcript line 1847 (R10): "Alarm periodic → discrete (f domain); voice non-periodic → continuous".
- Conventions: `$...$` math, `**bold**`; sections added **inside existing sections as new `p` blocks need no new checks/guide keys** (keys are per section heading, and these sections already have both).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/data/ch10.js`, `src/data/ch5_1.js`.
**Out of scope**: `checks.js`/`guide.js` (no new sections), solvers/tests, components.

## Git workflow

- Branch: `claude/006-slide-facts`. Commit: `Add the slide's binary checksum example and two slide facts`. Commit as the student. Do not push.

## Steps

### Step 1: Add the binary checksum example to ch10.js

After the decimal receiver paragraph (ch10.js:61), add two blocks:

```js
{ type: 'p', text: '8-bit example (from the slides): data **10101001 + 00111001**. One’s-complement sum = 11100010 (no carry to wrap); checksum = complement **00011101**. Receiver: 10101001 + 00111001 + 00011101 = 111111111 → wraps to 11111111 + 1 → 00000000 → complement 11111111...' }
```

**STOP and recompute before writing**: verify the sum 10101001+00111001 = 11100010 (no carry) and work the receiver side correctly — one's complement arithmetic wraps any carry. Use `node -e` to double-check. Then a second block for the burst case: a 5-bit noise burst corrupts bits so one section arrives differently (transcribe the corrupted section from the slide description) and the receiver's complemented total is non-zero → error detected. Write only arithmetic you have re-verified; the existing `checksum` solver in `src/lib/solvers.js` can confirm (its binary path is tested).

### Step 2: Add the two ch5_1 facts

1. In the ASK section, after the BASK implementation paragraph (ch5_1.js:29), add:

```js
{ type: 'p', text: 'The carrier is chosen so that one bit interval spans about **2–3 carrier cycles** (a fact the notes call out for BASK).' },
```

2. In "What and why", after the baseband/broadband table (ch5_1.js:14), add:

```js
{ type: 'p', text: 'Spectrum reminder from the notes: a **periodic** signal (like an alarm tone) has a **discrete** frequency spectrum; a **non-periodic** signal (like voice) has a **continuous** one.' },
```

**Verify**: `npm test` → all pass (new `$`/`**` markup compiles).

### Step 3: Build check

**Verify**: `npm run build` succeeds; only the two in-scope files modified.

## Test plan

No new test files. Recompute the binary checksum arithmetic with `node` (or the existing `checksum` solver) before writing — done criteria includes a self-check line in the commit body or report.

## Done criteria

- [ ] `grep -n "10101001" src/data/ch10.js` finds the binary example (sender AND burst case)
- [ ] `grep -n "2–3 carrier cycles" src/data/ch5_1.js` and `grep -n "discrete" src/data/ch5_1.js` find the two facts
- [ ] `npm test`, `npm run build` pass; only the two files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The transcript excerpt at line 1833 doesn't match the arithmetic you compute (transcription ambiguity) — report the discrepancy, don't guess.
- ch10's Checksum section gained a new heading (would need a checks/guide key you can't add in scope).

## Maintenance notes

- If plan 005's regression test later wants these numbers, add one assert: checksum of the binary pair equals 00011101 (the solver already has a binary path tested in solvers.test.js:96).
