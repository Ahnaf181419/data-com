# Plan 008: Add the T-1 frame layout and the voice→PCM→TDM chain figure

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/components/ExamDiagrams.jsx src/data/ch6_2.js src/data/pcm.js src/lib/data.test.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (learning UX)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

The **T-1 frame (24×8 + 1 = 193 bits)** is a draw-it-in-the-exam figure — both notes redraw it (transcript :1791-1792, M24 at :1938) — but no visual of it exists anywhere on the site; `ch6_2.js:70` states it as prose math. Likewise the **full chain** (24 analog voice → PCM (8000/s × 8 bits = 64 kbps each) → TDM → T-1 at 1.544 Mbps) is the conceptual spine of two chapters and is prose-only in `src/data/pcm.js:50-54`. The existing `TdmFrame` exam diagram already renders slot rows with per-input labels — the frame layout is mostly a prop-tuning job.

## Current state

- `src/components/ExamDiagrams.jsx:521-591` — `TdmFrame({ inputs, groupRate, out, frame, caption })`: renders per-input rows (rate + tag), a MUX wedge, then one row of slot cells built from `inputs` (`slots` from `p.slots ?? 1`, groups via `p.group`), with `frame` and `out` labels. Registered as `tdmframe`.
- Used with props e.g. `src/data/answerScripts.js:380-384`:

```js
dia('tdmframe', {
  inputs: [{ rate: '200 kbps', tag: 'A', slots: 4 }, ...],
  out: '700 kbps',
  frame: '14 bits, 20 µs',
}),
```

  Note `gap = n > 6 ? 21 : 30` — with 24 inputs the SVG height grows (ys to 26+23×24 ≈ 578); check readability. A **compact variant** may be needed: if you add one (e.g. `mode: 'compact'` prop that renders "24 × 64 kbps voice" as a single grouped row using the existing `group` machinery), keep it inside `TdmFrame`, not a new file.
- `src/components/ExamDiagrams.jsx` — also contains `Hierarchy` (registered `hierarchy`, used with `kind: 'TDM'` and levels array — see `ch6_2.js:61` for the DS-hierarchy usage pattern).
- `src/data/ch6_2.js:66-72` — "T-1 for analog transmission" section:

```js
{ type: 'math', tex: '\\text{frame} = 24 \\times 8 + 1 = 193\\text{ bits}, \\quad 193 \\times 8000 = 1.544\\text{ Mbps}' },
{ type: 'p', text: 'Each slot holds one 8-bit sample from each channel, plus 1 sync bit; there are 8000 frames per second (one per sampling period).' },
```

- `src/data/pcm.js:50-55` — "The full T-1 chain" section (two prose/note blocks).
- `src/lib/data.test.js:14` — `tdmframe` already in DIAGRAMS; no id changes needed unless you add a new id.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/components/ExamDiagrams.jsx`, `src/data/ch6_2.js`, `src/data/pcm.js` (and `src/lib/data.test.js` only if a new diagram id is introduced).
**Out of scope**: `src/components/Diagrams.jsx`, `src/components/Labs.jsx`, solvers, checks/guide (no new section headings).

## Git workflow

- Branch: `claude/008-t1-visuals`. Commit: `Show the T-1 frame layout and the voice-to-T-1 chain visually`. Commit as the student. Do not push.

## Steps

### Step 1: T-1 frame diagram in ch6_2.js

Add after the math block in "T-1 for analog transmission":

```js
{ type: 'diagram', id: 'tdmframe', props: { inputs: [/* 24 entries is too tall — see below */], out: '1.544 Mbps', frame: '24 × 8 + 1 = 193 bits', caption: 'One T-1 frame: 24 channels × 8-bit PCM samples, plus 1 sync bit, 8000 times a second.' } },
```

Recommended shape: use the `group` mechanism or a compact mode so the 24 inputs collapse into a few visual rows (e.g. group 0 = "channels 1–12", group 1 = "channels 13–24" at 64 kbps each) while the **slot row is the point**: 24 gold `8-bit` cells + 1 red sync cell. If the slot row (25 cells × ~30px) overflows the 640 viewBox, lower `sw` (TdmFrame already computes `sw = Math.min(30, 210 / slots.length)` → 8.4px; cells will be small — acceptable if labels move to `8` and `S`, with the caption carrying the explanation). Verify on a narrow viewport.

**Verify**: `npm test` → all pass (existing `tdmframe` id, valid props).

### Step 2: Voice→PCM→T-1 chain diagram in pcm.js

Add to "The full T-1 chain" section. Prefer reusing `hierarchy` with a `kind` if the component supports custom levels (read `Hierarchy`'s props in ExamDiagrams.jsx first):

```js
{ type: 'diagram', id: 'hierarchy', props: { kind: 'PCM', first: '4 kHz voice', levels: [
  { input: '24 analog lines', name: 'PCM', bw: '8000 samples/s × 8 bits = 64 kbps each' },
  { input: 'TDM', name: 'T-1', bw: '24 × 64 kbps + 8 kbps = 1.544 Mbps' },
], caption: 'Analog voice becomes digital (PCM) before TDM can interleave it into a T-1.' } },
```

If `Hierarchy`'s layout can't express a 2-level chain without looking wrong, instead draw a small dedicated chain figure **inside ExamDiagrams.jsx** (`function PcmChain()`), export/register it as `pcmchain`, and add `'pcmchain'` to data.test.js's DIAGRAMS list.

**Verify**: `npm test` → all pass; `npm run build` succeeds; only in-scope files modified.

## Test plan

Suite gates: props validity (blocks compile), diagram ids known. Visual check on a phone-width viewport (390px): slot row readable or caption carries it; no horizontal page scroll (svg is `w-full`).

## Done criteria

- [ ] `grep -n "193" src/data/ch6_2.js` shows the math plus the new diagram block
- [ ] pcm.js "The full T-1 chain" contains a diagram block
- [ ] `npm test`, `npm run build` pass; only in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- `TdmFrame` cannot show 24+1 slots legibly even after `sw`/label changes — fall back to 4 representative channels (`Ch 1 … Ch 4` with `⋮`) and say so; do not rebuild the component.
- `Hierarchy` can't take the PCM chain and you've already added `PcmChain` — stop there, don't generalize further.

## Maintenance notes

- `TdmFrame` is shared by three answer scripts — any prop-shape change must keep those usages working (the data.test.js script checks run them).
- If plan 007 landed, the DIAGRAMS list already grew; append, don't reorder.
