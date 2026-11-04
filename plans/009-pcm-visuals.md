# Plan 009: Add sampling and quantization-zone visuals to the PCM module

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/components/Diagrams.jsx src/data/pcm.js src/lib/data.test.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (learning UX)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

PCM is the module carrying the **flagged** Fall 2024 quantization question, and its two graphical concepts are taught without pictures: sampling at `f_s = 2f_h` (the notes teach it from the slide's sample-train figure, transcript :1887) and zone-midpoint rounding (`Δ` zones, midpoints, ±0.5 error) which currently leans on a 5-row table (`pcm.js:38`). Both are inherently visual; the flagged lesson is the hardest one in the module and has no figure.

## Current state

- `src/data/pcm.js:15-22` — "1. Sampling (Nyquist)" section: prose + `f_s = 2f_h` math + voice example. No diagram.
- `src/data/pcm.js:32-41` — "Quantization zones and normalized error": note (flag), prose, `Δ` math, ordered list, the Fall 2024 table (samples 5.3, 12.7, −5.8, −17.4, 18.5 V over −20…+20 V, L = 8, Δ = 5 V; zone codes 5, 6, 2, 0, 7; words 101, 110, 010, 000, 111).
- Diagram pattern: `Fig` component + tokens from `src/components/Fig.jsx` (G gold, A ash, L line, T text, R red, RAISE); static diagrams in `src/components/Diagrams.jsx`, registered in `DIAGRAMS`, ids whitelisted in `src/lib/data.test.js:14`.
- A waveform-drawing helper exists in `src/components/Labs.jsx:59-63` (`path(n, fx, fy)` building an SVG polyline path) — reuse the technique inline, not the import (Labs is a component module; copy the 4-line helper if needed).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/components/Diagrams.jsx`, `src/data/pcm.js`, `src/lib/data.test.js` (DIAGRAMS list only).
**Out of scope**: `src/components/Labs.jsx`, `src/components/ExamDiagrams.jsx`, solvers, checks/guide (no new headings).

## Git workflow

- Branch: `claude/009-pcm-visuals`. Commit: `Picture sampling and quantization zones in the PCM lesson`. Commit as the student. Do not push.

## Steps

### Step 1: Sampling diagram (id `sampling`)

`Sampling` component in `Diagrams.jsx`: two small stacked panels, each a sine (2 cycles) in gold:
- Panel 1 (red tint): sample strokes at a rate **below** `2f_h` (e.g. every 1.5 cycles) — a few vertical ash lines through the curve, caption line: "too slow: the samples also fit a different (dashed red) curve — aliasing".
- Panel 2: strokes at exactly `2` per cycle (4+ sample lines), caption line: "at $f_s = 2f_h$ the samples capture the signal".

Keep it schematic (dashed red alias curve in panel 1 optional if geometry is easy: a second, lower-frequency sine through the same sample points). Insert `{ type: 'diagram', id: 'sampling' }` in pcm.js "1. Sampling (Nyquist)" after the math block.

**Verify**: `npm test` → pass after whitelisting `sampling` in data.test.js:14.

### Step 2: Zones diagram (id `zones`)

`Zones` component: vertical axis −20…+20 V; 8 horizontal bands (zone 0 bottom → 7 top) in alternating faint gold fills; band boundary labels at multiples of 5 V; zone midpoints marked (dotted line) at ±2.5, ±7.5, ±12.5, ±17.5 V with the 3-bit code word at each band's right (000…111); one gold sample dot at 5.3 V with a short arrow to the zone-5 midpoint 7.5 V and a red `error +0.44` label. This mirrors the Fall 2024 table's first row exactly — same numbers.

Insert `{ type: 'diagram', id: 'zones' }` in pcm.js "Quantization zones and normalized error" after the `Δ` math block (before the ordered list).

**Verify**: `npm test` → pass; `npm run build` succeeds.

## Test plan

Suite gates the ids and block structure; visual check: zone codes must read 000 at the **bottom** (zone numbering from 0 — the whole point of the flagged method), 8 bands visible at phone width.

## Done criteria

- [ ] `grep -n "sampling\|zones" src/data/pcm.js` finds both diagram blocks
- [ ] `npm test` (with both ids whitelisted) and `npm run build` pass
- [ ] Only the three in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The aliasing panel can't be drawn honestly (sample points not actually on a lower-frequency sine) — draw only the sample strokes and make the caption do the work; never draw a wrong curve.
- pcm.js section headings changed (checks/guide keys depend on them).

## Maintenance notes

- The zones diagram hardcodes the Fall 2024 numbers by design (it illustrates that exact table); if the table ever changes, change both.
- If plan 011 adds PCM quiz items, one can ask which zone a sample falls into — the figure is the answer key.
