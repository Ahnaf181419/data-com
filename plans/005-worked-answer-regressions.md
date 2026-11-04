# Plan 005: Pin the unverified worked answers with regression tests

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/lib/solvers.js src/lib/solvers.test.js src/lib/data.test.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P1
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none (but land before/with content plans 001/002 so their numbers are pinned too)
- **Category**: tests
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

CLAUDE.md rule 4: "Every worked numeric answer should be reproducible by a solver in `src/lib/solvers.js` with a test asserting the answer printed in the source." Four high-frequency exam answer families are hand-typed with zero machine verification — all were recomputed by hand during the audit and are **correct today**; these tests stop them drifting silently:

1. **Multislot TDM** (Fall 2024 Q3(c): 14-bit frame, 50,000 f/s, 20 µs, 700 kbps; Spring 2025 3(d)/Spring 2024 3(a): 7 bits, 400,000 f/s, 2.5 µs, 2.8 Mbps) — appears in all three papers, ~12 marks. The test at `solvers.test.js:122` is *named* "multislot TDM" but asserts only MFSK/checksum/Hamming values.
2. **FDM hierarchy chain** 59/299/2999/17999 kHz (ch6_1 Quiz-3 example, examPrep #8, answerScripts #7).
3. **TST switch design** 400 crosspoints / 200 memory locations (Fall 2024 Q2(e)).
4. **80-km TV antenna** ≈ 376.6 m (ch7_2 example; `losHeight` only tested at 46.2 m).

Plus one rule-enforcement gap: the boxed-final-answer test covers past-paper items only (`data.test.js:112`), not the 23 likely-question scripts.

## Current state

- `src/lib/solvers.js:91-106` — `tdm({ n, rate, unitBits, syncBits })` assumes all `n` inputs share one `rate`; it cannot express unequal slot counts. No TST or hierarchy-nesting solver exists. `fdmLink({ n, bw, guard })` (lines 84-87) does one level.
- `src/lib/solvers.test.js:122-127` — the misleadingly named test:

```js
test('Past paper: multislot TDM and MFSK (Fall 2024 Q3c, Q3d)', () => {
  const m = s.mfsk({ N: 3e6, r: 3, fc: 30e6 }).result;
  assert.deepEqual([m.L, m.S, m.B, m.freqs[0], m.freqs[7]], [8, 1e6, 8e6, 26.5e6, 33.5e6]);
  assert.equal(s.checksum([6, 10, 11, 4, 5]).result.checksum, 9);
  assert.equal(s.hammingCheck('10011000101').result.pos, 6);
});
```

- `src/lib/data.test.js:107-119` — past-paper loop asserts `it.script.at(-1).type === 'answer'` (line 112); the `likely` loop (115-118) does not.
- The answers to pin (all read and recomputed at commit 294e0f3):
  - `src/data/answerScripts.js:377-388` — Fall 2024 3(c): rates [200,200,150,150] kbps, common unit 50 kbps → slots [4,4,3,3], frame 14 bits, 50,000 f/s, 20 µs, 700 kbps.
  - `src/data/answerScripts.js:558-582` — Spring 2025 3(d): four channels, one 400 kbps with 1 slot + three... (read the item; printed answer 7 bits, 400,000 f/s, 2.5 µs, 2.8 Mbps).
  - `src/data/ch6_1.js:62` — hierarchy: group 48+11=59, supergroup 5×59+4=299, master 10×299+9=2999, jumbo 6×2999+5=17999 (all kHz).
  - `src/data/pastPapers.js:119-128` / `answerScripts.js:348-361` — TST: inputs/TSI = 100/10 = 10 slots; crosspoints 4 × (10×10) = 400; locations (10+10) × 10 = 200.
  - `src/data/ch7_2.js:68` — 80 km: h = (80/3.57)²/(4/3) ≈ 376.6 m.
  - Cheap extras from the audit: ch6_1.js:60 (Ex 6.3: r=4, L=16), ch6_2.js:104 (DS-2: 789-bit frames, 6.312 Mbps — computable as `tdm(96, 64000, 8, 21)`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/lib/solvers.js` (two small new pure functions), `src/lib/solvers.test.js`, `src/lib/data.test.js` (one assert line).
**Out of scope**: all `src/data/*.js` content files (their printed answers are the reference — if an assert disagrees with the source, STOP and report), all components.

## Git workflow

- Branch: `claude/005-answer-regressions`. Commit: `Pin the multislot TDM, FDM hierarchy, TST and antenna answers with tests`. Commit as the student. Do not push.

## Steps

### Step 1: Add `tdmMultislot` to solvers.js

New pure function next to `tdm` (mirror its `{ result, steps }` + LaTeX-steps style):

```js
// Multiple-slot TDM: unequal input rates share a frame via a common unit (gcd of rates).
// slotsPerInput defaults to rate/unit. Frame size = Σ slots (+ syncBits), frame rate = unit (per 1-bit slot),
// duration = 1/unit, link rate = frameBits × unit.
export function tdmMultislot({ rates, syncBits = 0 }) { ... }
```

Compute the common unit as the GCD of the rates (integer kbps values in practice), slots per input = rate/unit, then frame size, frame rate = unit (slots carry 1 bit), frame duration, link rate. Throw if any rate is not a multiple of the unit (can't happen with gcd, but guard division by zero for empty rates).

### Step 2: Add `fdmHierarchy` to solvers.js

```js
// FDM analog hierarchy (Raiyan's nested-guard method): units[i] units of level i's input.
// level bw = units×inBw + (units-1)×guard, feeding the next level.
export function fdmHierarchy({ units, bw, guard }) { ... } // returns { levels: [59, 299, 2999, 17999] ... }
```

Iterate: `cur = bw; for (const n of units) cur = n * cur + (n - 1) * guard; collect cur`. Reuses `fdmLink`'s math; return each level plus LaTeX steps naming group/supergroup/master/jumbo generically.

### Step 3: Add the regression asserts to solvers.test.js

New test (adjust to actual returned shapes):

```js
test('worked answers printed in the lessons reproduce exactly', () => {
  const t = s.tdmMultislot({ rates: [200e3, 200e3, 150e3, 150e3] }).result;
  assert.deepEqual([t.frameBits, t.frameRate, t.duration, t.linkRate].map(Math.round), [14, 50000, 2e-5, 700e3]);
  const t2 = s.tdmMultislot({ rates: [400e3, 400e3, 400e3, 400e3, 400e3, 400e3, 400e3] /* read Spring 2025 3(d) for the real mix */ }).result;
  // assert 7 bits, 400000 f/s, 2.5 µs, 2.8 Mbps — READ answerScripts.js:558-582 first and encode its actual rates
  const h = s.fdmHierarchy({ units: [12, 5, 10, 6], bw: 4, guard: 1 }).levels;
  assert.deepEqual(h, [59, 299, 2999, 17999]);
  const a = s.losHeight({ d: 80, h2: 0 }).result.h1;
  assert.ok(Math.abs(a - 376.6) < 0.5, `antenna ${a}`);
  // TST (pure arithmetic, no solver needed):
  const crosspoints = 4 * (10 * 10), locations = (10 + 10) * 10;
  assert.deepEqual([crosspoints, locations], [400, 200]);
  // cheap extras:
  const ds2 = s.tdm({ n: 96, rate: 64000, unitBits: 8, syncBits: 21 }).result;
  assert.deepEqual([ds2.frameBits, ds2.frameRate, ds2.linkRate], [789, 8000, 6312000]);
});
```

Read `answerScripts.js:558-582` before writing the t2 line — encode the paper's actual rates, not a guess. `losHeight({d:80, h2:0})`: if h2=0 is rejected by validation, use `h2: 1e-9` or compute `(80/3.57)**2/(4/3)` directly as an assert — pick what the existing signature allows.

### Step 4: Extend the boxed-answer assert to likely scripts

In `src/lib/data.test.js`, in the `likely` loop (lines 115-118), add after the length assert:

```js
assert.equal(q.script.at(-1).type, 'answer', `likely ends with a boxed answer: ${q.q}`);
```

(All 23 currently do — verified by hand; if this assert fails, the script that fails has drifted and must be inspected, not the assert weakened.)

**Verify**: `npm test` → all pass. **If any new assert fails against a printed answer, STOP — that means a source number is wrong; report which.**

### Step 5: Build check

**Verify**: `npm run build` succeeds; only the three in-scope files modified.

## Test plan

This plan *is* the test plan. Model after existing `test('Past paper: ...')` blocks; keep asserts numeric and exact (round where floats demand).

## Done criteria

- [ ] `npm test` exits 0 with the new test(s) present
- [ ] `grep -n "tdmMultislot\|fdmHierarchy" src/lib/solvers.js` finds both functions
- [ ] `grep -n "likely ends with a boxed answer" src/lib/data.test.js` finds the new assert
- [ ] Only `src/lib/solvers.js`, `src/lib/solvers.test.js`, `src/lib/data.test.js` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- Any assert disagrees with a printed source answer — the whole point is that the source wins; report the mismatch.
- Spring 2025 3(d)'s rates in `answerScripts.js:558-582` don't fit `tdmMultislot`'s gcd model (e.g. mixed slot widths) — extend the function minimally, or encode that item as plain arithmetic asserts, and note the choice.
- `losHeight` signature/validation (possibly changed by plan 004) makes the 376.6 m assert impossible — fall back to the direct arithmetic assert.

## Maintenance notes

- New worked examples added to modules should get a line in this test — that is now the repo's cheapest way to honor CLAUDE.md rule 4.
- If the teacher settles the Raiyan-vs-Medha hierarchy method (see the note in ch6_1.js:62), only this test's expected chain changes.
