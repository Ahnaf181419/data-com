# Plan 011: Surface the modulation lab in the scheme lessons; grow PCM practice

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/data/ch5_1.js src/data/pcm.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP (plans 006 also edits ch5_1 — coordinate; different sections, additive blocks).

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (learning UX)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

1. **Lab discoverability**: the interactive `modulation` lab — the one tool that animates exactly the ASK/FSK/BPSK bit→waveform mapping — appears once, three lessons after those schemes, inside "Constellation diagram" (`ch5_1.js:83`). A student reads three sections of waveform prose before finding the tool that shows them. The slides gave each scheme its own implementation figure (transcript :1757, :1762, :1765).
2. **PCM practice gap**: PCM carries the flagged Fall 2024 quantization question but has the least practice in the repo: 4 quiz items / 5 flashcards / 1 example for 6 sections (compare ch5-1: 12/12/8). Nothing drills `Δ`, zone numbering from 0, or the ±0.5 normalized error — the flagged content.

## Current state

- `src/data/ch5_1.js` — scheme sections: "Amplitude Shift Keying (ASK)" (blocks end at line 36 with the full-duplex note), "Frequency Shift Keying (FSK)" (ends ~line 50 with the BFSK spectrum diagram), "Phase Shift Keying (PSK)" (BPSK paragraph at :68, QPSK table at :72). The lab block `{ type: 'lab', id: 'modulation' }` sits at :83 in "Constellation diagram".
- Lab registry: `src/components/Labs.jsx:523` — `LABS = { modulation: ModulationLab, analog: AnalogLab, fdm: FdmLab, tdm: TdmLab, crc: CrcLab, hamming: HammingLab, coding: CodingLab }`; `modulation` is whitelisted in `src/lib/data.test.js:13`. Re-using the same lab id in multiple sections is fine (it re-mounts, state resets — acceptable for a lab).
- `src/data/pcm.js` — full current shape:
  - `flashcards` (lines 66-72): 5 cards (3 steps, Nyquist rate, voice rate, bits/sample, why PCM).
  - `quiz` (73-78): 4 items (sampling rate, bits per sample, levels, not-a-step).
  - Worked table at :38: samples 5.3/12.7/−5.8/−17.4/18.5 V over −20…+20 V, L = 8, Δ = 5 V, codes 5/6/2/0/7.
  - Checks at `src/data/checks.js:59-60` drill Δ = 40/8 = 5 V and the NRZ bandwidth — mirror with different numbers.
- Quiz shape: `{ q, options, answer, explain }` — `data.test.js:26-27` validates indices automatically; no count is enforced.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/data/ch5_1.js`, `src/data/pcm.js`.
**Out of scope**: `src/components/*`, checks.js, guide.js, solvers, tests.

## Git workflow

- Branch: `claude/011-lab-placement`. Commit: `Put the modulation lab where the schemes are taught; grow PCM practice`. Commit as the student. Do not push.

## Steps

### Step 1: Add the modulation lab to the ASK section

At the end of "Amplitude Shift Keying (ASK)" (after the full-duplex note, ch5_1.js:36):

```js
{ type: 'lab', id: 'modulation' },
```

Then add one-line pointers at the end of the FSK and BPSK content (a `p` block): `'Flip the scheme selector in the lab above (ASK / BFSK / BPSK / QPSK) to watch frequency or phase carry the bits.'` — one pointer after the FSK spectrum diagram block, one after the BPSK paragraph at :68. Optionally remove the duplicate lab block from "Constellation diagram" (:83) if it feels redundant once it appears earlier — your call; leaving it is also fine (re-mount resets state).

**Verify**: `npm test` → all pass (`modulation` already whitelisted).

### Step 2: Add PCM flashcards

Append to `pcm.js` flashcards (~4 cards, mirroring checks.js:59-60 with different numbers):

```js
{ front: 'Zone height Δ', back: '$\\Delta = (V_{max} - V_{min})/L$; e.g. −20…20 V, L = 8 → 5 V.' },
{ front: 'Zone numbering', back: 'Zones are numbered from 0 at the bottom; the code word is the zone number in $n_b$ bits.' },
{ front: 'Normalized error bounds', back: 'Always between −0.5 and +0.5 (quantized − normalized, both in units of Δ).' },
{ front: 'Why the zone midpoint?', back: 'Every sample is replaced by the middle of its zone, which minimizes the maximum error.' },
```

### Step 3: Add PCM quiz items

Append ~4 items with fresh numbers (all recompute correctly — verify each with `node -e`):

```js
{ q: '3-bit codes over −10 V to +10 V: Δ is', options: ['1.25 V', '2.5 V', '5 V', '10 V'], answer: 1, explain: '$20/2^3 = 2.5$ V.' },
{ q: 'A sample of 6.1 V with Δ = 2.5 V normalizes to', options: ['2.0', '2.44', '3.0', '6.1'], answer: 1, explain: '$6.1/2.5 = 2.44$.' },
{ q: 'With Δ = 2.5 V, the quantized value of normalized 2.44 is', options: ['2.44', '2.5', '2.0', '3.5'], answer: 1, explain: 'The midpoint of zone 2 (2.0–3.0) is 2.5.' },
{ q: 'The normalized quantization error is always', options: ['0', 'between −0.5 and 0.5', 'exactly ±0.5', 'less than −1'], answer: 1, explain: 'Sample sits somewhere inside its zone; midpoint is at most half a zone away.' },
```

Recheck the arithmetic: 20/8 = 2.5 ✓; 6.1/2.5 = 2.44 ✓; zone 2 spans 2.0–3.0 normalized with midpoint 2.5 ✓; error 2.5 − 2.44 = +0.06 ∈ (−0.5, 0.5) ✓.

**Verify**: `npm test` → all pass (indices valid, LaTeX compiles).

### Step 4: Build check

**Verify**: `npm run build` succeeds; only the two in-scope files modified.

## Test plan

Suite validates quiz indices and LaTeX; arithmetic double-checked with `node -e` as written. No new test files.

## Done criteria

- [ ] `grep -n "lab" src/data/ch5_1.js` shows the modulation lab in the ASK section
- [ ] `node -e "import('./src/data/pcm.js').then(m=>console.log(m.default.quiz.length, m.default.flashcards.length))"` prints ≥ 8 and ≥ 9
- [ ] `npm test`, `npm run build` pass; only the two files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- ch5_1 section headings changed (affects nothing in scope, but signals drift).
- Any quiz arithmetic you recompute disagrees with the planned numbers — fix the numbers to correct arithmetic, never ship a wrong key (data.test only checks indices, not truth).

## Maintenance notes

- If plan 009's `zones` diagram landed, its figure is the visual answer key for these new quiz items — keep numbers consistent (the diagram uses Δ = 5 V; the quiz deliberately uses Δ = 2.5 V as a *different* exercise).
