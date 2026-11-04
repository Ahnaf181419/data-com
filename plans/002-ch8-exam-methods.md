# Plan 002: Teach the TST crosspoint rule and the n-switch datagram delay rule

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/data/ch8.js src/data/checks.js src/data/guide.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (content gap)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

Two exam methods exist only inside past-paper answer text, not in the lessons that should teach them:

1. **TST crosspoint sizing** — Fall 2024 Q2(e) (3.5 marks) asks for total crosspoints and memory locations of a 100-input TST switch. The rule ("each middle crossbar is #first-stage-TSIs × #third-stage-TSIs; total = k × that") appears only in `answerScripts.js:352-359`. The ch8 lesson teaches TSI memory but never the crossbar sizing.
2. **General datagram delay** — the lesson teaches only the two-switch case `3T + 3τ + w₁ + w₂`. Spring 2025 Q2(d) asks a one-switch topology; the generalization `(n switches → (n+1)T + (n+1)τ + Σw)` exists only in `pastPapers.js:293`. The question bank tags switching delays "in every paper".

## Current state

- `src/data/ch8.js:84-91` — the "Time-division switching" section (currently the last section):

```js
{
  heading: 'Time-division switching',
  blocks: [
    { type: 'p', text: '**Time-slot interchange (TSI)** is used with TDM. ... (e.g. slots arrive as 4 3 2 1 and leave reordered), so any input slot can be sent anywhere.' },
    { type: 'math', tex: '\\#\\text{locations} = \\#\\text{time slots}, \\qquad \\text{location size} = \\#\\text{bits per slot}' },
    { type: 'p', text: '**Time-space-time (TST)** combines TSIs with a crossbar (TSI → crossbar → TSI). The system is non-blocking and needs fewer crossbar crosspoints. Example: three TSIs of 4 slots on each side with a 3 × 3 crossbar: first stage 3 × 4 = 12 slots, third stage 12 slots, so 24 memory locations in total.' },
    { type: 'diagram', id: 'tst', props: { left: ['TSI 1', 'TSI 2', 'TSI 3'], mid: ['Crossbar'], midSize: '3 × 3', dots: false, caption: '...' } },
  ],
},
```

- `src/data/ch8.js:42-44` — the datagram delay block inside "Packet switching: datagram networks":

```js
{ type: 'p', text: '**Delay:** not uniform, since packets may wait at switches and take different routes. Through two switches (ignoring processing time):' },
{ type: 'math', tex: '\\text{Total delay} = 3T + 3\\tau + w_1 + w_2' },
{ type: 'diagram', id: 'delay', props: { kind: 'datagram', caption: 'Datagram delay through two switches: three transmission times, three propagation times, two waits.' } },
```

- `src/data/pastPapers.js:119-128` — Fall 2024 Q2(e) answer lines with the sizing rule (10 TSIs each side, 4 crossbars, each crossbar 10×10, total 4×100 = 400 crosspoints, (10+10)×10 = 200 memory locations).
- `src/data/pastPapers.js:287-295` — Spring 2025 Q2(d): one-switch topology, answer states the general rule.
- Conventions: text blocks use `$...$`/`**bold**`; every new/moved section needs checks.js + guide.js entries — here we only **extend existing sections**, so no new keys are needed; verify with the test at `src/lib/data.test.js:47-57` (keys are per section heading, headings unchanged).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/data/ch8.js` (and, only if you add flashcards/quiz items there, none else needed).
**Out of scope**: `src/data/pastPapers.js`, `src/data/answerScripts.js`, all components, `src/lib/*`.

## Git workflow

- Branch: `claude/002-ch8-methods`. Commit style: `Teach the TST crosspoint count and the general datagram delay rule`. Commit as the student (`Ahnaf181419` / `muhammad.ahnaf.sarker@gmail.com`). Do not push.

## Steps

### Step 1: Add the crosspoint-sizing math to the TST section

In `src/data/ch8.js`, inside the "Time-division switching" section, insert after the TST paragraph (before the `tst` diagram block):

```js
{ type: 'math', tex: '\\text{crossbar size} = (\\#\\text{stage-1 TSIs}) \\times (\\#\\text{stage-3 TSIs}), \\qquad \\text{total crosspoints} = k \\times \\text{crossbar size}' },
{ type: 'p', text: 'Fall 2024 Q2(e): 100 inputs, 10 TSIs per side, 4 middle crossbars → each crossbar is 10 × 10 = 100 crosspoints, total $4 \\times 100 = 400$ (vs 10,000 for a single 100 × 100 crossbar). Memory: 20 TSIs × 10 slots = 200 locations. State the assumption that each crossbar is (#stage-1 TSIs) × (#stage-3 TSIs).' },
```

### Step 2: Add the general delay rule to the datagram section

In the same file, replace the two-switch-only paragraph at ch8.js:42-43 with a version that keeps the two-switch math and adds the general line after it:

```js
{ type: 'p', text: 'In general, a path through $n$ switches has $n+1$ links: $(n+1)T + (n+1)\\tau + w_1 + \\dots + w_n$. One switch (Spring 2025 Q2(d)): $2T + 2\\tau + w_1$.' },
```

(Keep the existing `3T + 3\\tau` math block and diagram exactly as they are.)

### Step 3: Extend flashcards (optional but cheap)

Add to `ch8.js` `flashcards`: `{ front: 'TST total crosspoints', back: 'k × (#stage-1 TSIs × #stage-3 TSIs). Fall 2024: 4 × (10×10) = 400.' }` and `{ front: 'Datagram delay through n switches', back: '(n+1)T + (n+1)τ + Σw (one wait per switch).' }`.

**Verify**: `npm test` → all pass (LaTeX compiles; no structural change).

### Step 4: Build check

**Verify**: `npm run build` → `✓ built in ...`; `git status` shows only `src/data/ch8.js` modified.

## Test plan

No new tests — content-only addition inside existing sections; the existing data tests are the gate.

## Done criteria

- [ ] `grep -n "total crosspoints" src/data/ch8.js` finds the new math rule
- [ ] `grep -n "n+1" src/data/ch8.js` finds the general delay rule
- [ ] `npm test` exits 0; `npm run build` succeeds
- [ ] Only `src/data/ch8.js` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The ch8 section headings or the `tst`/`delay` diagram blocks no longer match the excerpts above.
- Any test failure not explained by a typo you just made.

## Maintenance notes

- If plan 005 (regression tests) runs first, its TST assert (400/200) already pins the numbers quoted here — keep them identical.
- The Fall 2024 numbers must stay in sync with `answerScripts.js:348-361`.
