# Plan 003: Fix the DS-3 overhead cell and record the PSK mapping conflict

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/data/ch6_2.js src/data/ch5_1.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug (factual inconsistency)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

Two small factual corrections:

1. **DS-3 row mixes two slide figures.** `ch6_2.js:60` pairs rate **44.736 Mbps** with overhead **1.368 Mbps**. But 672 × 64 kbps = 43.008 Mbps, so 44.736 implies overhead **1.728 Mbps**; 1.368 only reconciles with the slide *text's* 44.376 (the existing note at `ch6_2.js:62` records that conflict). The chapter teaches overhead as "table rate − n×64k" (DS-1/DS-2 worked examples at ch6_2.js:103-104), so a student applying the chapter's own method to DS-3 gets a different number than the table prints. An exam line "44.736 = 672×64k + 1.368" would be arithmetically wrong.
2. **Rule-3 gap on PSK mappings.** CLAUDE.md rule 3: where the student's sources disagree, the slides win *and the difference is recorded in a note*. The MFSK conflict got its note (`ch5_1.js:61`); the Raiyan-vs-slide BPSK/QPSK phase-mapping conflicts (transcript lines 1856 and 1860, R19/R23, both marked "FOLLOW SLIDE" / "use R20") did not.

## Current state

- `src/data/ch6_2.js:60` — the DS hierarchy table row (inside section "Digital signal (DS) hierarchy"):

```js
['DS-3','T-3','44.736','672','7 × DS-2 (28 DS-1)','1.368 Mbps']
```

- `src/data/ch6_2.js:62` — the existing note (keep, extend by one clause):

```js
{ type: 'note', text: 'The DS-3 slide text says 44.376 Mbps (= 672 × 64 kbps + 1.368 Mbps), while the slide table and both notes show 44.736 Mbps.' },
```

- `src/data/ch5_1.js:68` — BPSK teaching (slide mapping, correct): `'**BPSK** – $n_b = 1$, two elements: bit 1 starts at phase 0°, bit 0 starts at phase 180°...'`
- `src/data/ch5_1.js:72` — QPSK table (slide mapping, correct): `[['00', '−135°', ...], ['10', '−45°', ...], ['01', '135°', ...], ['11', '45°', ...]]`
- `src/data/ch5_1.js:61` — the MFSK note to mirror in style:

```js
{ type: 'note', text: 'Raiyan’s notes list 00→$f_1$, 10→$f_2$, 01→$f_3$, 11→$f_4$; Medha’s list the table above. Either assignment works as long as it is stated.' },
```

- Transcript evidence (docs/source-transcript.md): line 1856 (R19): Raiyan's text says "0 → 0°, 1 → 180°" while the slides say 1 → 0°, 0 → 180° — "FOLLOW SLIDE". Line 1860 (R23): Raiyan's QPSK circuit mapping conflicts with R20/the slide constellation.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/data/ch6_2.js`, `src/data/ch5_1.js`.
**Out of scope**: everything else — in particular `pastPapers.js`/`answerScripts.js` (no printed answer uses 1.368), `flashcards`/`quiz` in ch6_2 (the DS-2 card at ch6_2.js:114 is correct and untouched).

## Git workflow

- Branch: `claude/003-ds3-psk-notes`. Commit: `Fix the DS-3 overhead figure; note the PSK mapping conflict`. Commit as the student. Do not push.

## Steps

### Step 1: Correct the DS-3 overhead cell

In `src/data/ch6_2.js:60` change the row's last cell from `'1.368 Mbps'` to `'1.728 Mbps'` (44.736 − 672×0.064 = 1.728).

### Step 2: Extend the DS-3 note

Replace the note at `ch6_2.js:62` with:

```js
{ type: 'note', text: 'The DS-3 slide text says 44.376 Mbps (= 672 × 64 kbps + 1.368 Mbps), while the slide table and both notes show 44.736 Mbps (= 672 × 64 kbps + 1.728 Mbps). Use 44.736 with 1.728, or 44.376 with 1.368 — never mix the two.' },
```

### Step 3: Add the PSK mapping note

In `src/data/ch5_1.js`, inside the "Phase Shift Keying (PSK)" section, insert a note block right after the QPSK table (after line 72):

```js
{ type: 'note', text: 'Raiyan’s notes flip the BPSK 0/1 phase assignment in places and the QPSK circuit mapping on p. 23 disagrees with the constellation on p. 20. The slide assignment in the table above is the one to use in the exam.' },
```

**Verify**: `npm test` → all pass (KaTeX compiles the new note text).

### Step 4: Build check

**Verify**: `npm run build` succeeds; `git status` shows only the two in-scope files.

## Test plan

No new tests — no test asserts these cells (that's why the error survived); plan 005 adds DS-2 asserts only. Manual recompute gate: 672 × 64 = 43,008 kbps; 44,736 − 43,008 = 1,728 kbps.

## Done criteria

- [ ] `grep -n "1.728" src/data/ch6_2.js` finds the corrected cell and note
- [ ] `grep -n "1.368" src/data/ch6_2.js` finds it only inside the note (paired with 44.376)
- [ ] `grep -n "slide assignment" src/data/ch5_1.js` finds the new note
- [ ] `npm test` and `npm run build` pass; only the two files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The DS-3 row or note text doesn't match the excerpts (drift).
- You find 1.368 used anywhere outside the note (e.g. in an answer script) — report instead of editing that file.

## Maintenance notes

- The two source figures (44.736 table vs 44.376 text) are a slide-internal conflict; if the teacher ever settles it, update table + note together.
- Optional one-line follow-up from the audit (not required): add a source note on `G_dB = 10log₁₀G` in ch7_2 for strict traceability — the formula is implied by the slide's 45.46 dB answer.
