# Plan 010: Animate the four static labs (playhead, trace, pop, slot cycle)

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/components/Labs.jsx src/index.css`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (teaching motion)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

The site's motion rule (CLAUDE.md): **CSS only**, using the `--ease-*` tokens and classes in `index.css`; every animation needs a `prefers-reduced-motion` fallback; never add an animation library. Four labs are static exactly where motion would teach:

1. **AnalogLab** (AM/FM/PM) draws message + carrier with no playhead — the message↔carrier correspondence is what a sweep shows. ModulationLab already got a playhead; AnalogLab is the sibling without one.
2. **CodingLab**'s differential-Manchester waveform appears instantly; the repo already has a one-shot draw-on class (`.trace`) used only decoratively in `Wave.jsx`.
3. **TdmLab** never shows the "rotating switch" interleaving the lesson text describes (ch6_2's "Interleaving" check: "like a rotating switch").
4. **HammingLab**'s corrupted bit flips with no emphasis, though `.pop`/`.shake` both exist.

## Current state

- `src/index.css` motion classes (all with reduced-motion fallbacks at lines 274-301):
  - `.playhead` (261-272): `animation: sweep var(--dur, 4s) linear infinite;` sweeping `translateX(0) → translateX(var(--w))`.
  - `.trace` (127-136): `stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.1s ...` (draws once). **Caveat**: `stroke-dasharray: 1` means "1 user-unit dashes" — it works for paths whose `pathLength` is normalized. `Wave.jsx` sets `pathLength="1"` on its traced path (check `src/components/Wave.jsx:30`); plain paths need `pathLength={1}` added or the dash math is wrong.
  - `.pop` (165-172), `.shake` (173-185).
- `src/components/Labs.jsx`:
  - ModulationLab playhead usage (line 132): `{play && <div className="playhead pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-red/80" style={{ '--w': 'calc(100% - 2px)', '--dur': `${n * 0.9}s` }} />}` — plus a toggle button (line 113) `className="press min-h-10 rounded-xl border border-line px-4 text-sm text-ash"` with `{play ? 'Stop playhead' : 'Play playhead'}`.
  - **AnalogLab** (146-181): `<svg viewBox="0 0 640 190">` containing the message path (line 171) and carrier path (line 173), no playhead, no play state.
  - **CodingLab** waveform path (line 514): `<path d={d} fill="none" stroke="var(--color-gold)" strokeWidth="2.2" strokeLinejoin="round" />` — instant.
  - **TdmLab** (237-297): frames mount with `enter` + stagger delays (line 276); slot cells rendered from `frames`; no cycling highlight. The lab has a `Seg` mode switch and tappable unit buttons.
  - **HammingLab** bit buttons (423-439): className switches on `flip === pos` (`border-red bg-red/15`) — no animation class.
- Design constraints (CLAUDE.md): touch targets ≥ 44px (`min-h-11`+) — the new AnalogLab play button must be `min-h-11`; no hover-only UI; keep animations transform/opacity/stroke-dashoffset only.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |
| Motion smoke | `npm run dev` → labs | playhead sweeps; waveform draws once; reduced-motion (OS setting) disables all |

## Scope

**In scope**: `src/components/Labs.jsx`, `src/index.css`.
**Out of scope**: all data files, `src/components/Diagrams.jsx`, `src/components/ExamDiagrams.jsx`, solvers, tests.

## Git workflow

- Branch: `claude/010-lab-motion`. Commit: `Teach with motion: AnalogLab playhead, drawn waveform, TDM slot cycle, Hamming pop`. Commit as the student. Do not push.

## Steps

### Step 1: AnalogLab playhead

Copy ModulationLab's pattern: `const [play, setPlay] = useState(false);`, a toggle button next to the `Seg` (line 168) with `min-h-11`, and wrap the svg in `<div className="relative">` with the same playhead div (`--dur: 8s` fits the 1.5-cycle message). Keep `pointer-events-none`.

### Step 2: CodingLab trace draw-on

Add `pathLength={1}` and `className="trace"` to the waveform path at Labs.jsx:514. Because CodingLab re-renders on `count`/`startHigh`/input changes, the one-shot animation replays per change — that is desired ("draw first N bits"). Verify the dash renders correctly (if the path renders fully dashed/broken, the pathLength normalization didn't apply — fix before shipping; this is the step most likely to need iteration).

### Step 3: HammingLab pop on the corrupted bit

On the bit button at Labs.jsx:432, when `flip === pos` add `pop` to the className (it re-mounts the class per flip via the conditional, which retriggers the animation). Optionally add `shake` to the syndrome paragraph (line 449) when `chk.pos` is truthy — pick one if both feels noisy; pop on the bit is the priority.

### Step 4: TdmLab slot-cycle animation (the M part)

Goal: show interleaving as a cycling highlight, paused by default.
1. Add `const [cycle, setCycle] = useState(false);` and a `min-h-11` toggle "Show interleaving" near the `Seg`.
2. When `cycle` is on in Synchronous mode, a highlight should visit slots in frame order: slot (frame 0, line A) → (frame 0, line B) → … → (frame 1, line A) → … i.e. one cell per animation tick. CSS-only implementation: give each slot cell `style={{ animationDelay: `${visitIndex * 300}ms` }}` and class `slot-cycle` running an infinite keyframe (`outline`/`background-color` pulse or a `transform: scale(1.08)` pop each `T` where `T = cells × 300ms`): `animation: slotPulse ${cells * 0.3}s infinite; animation-delay: ${i * 0.3}s;` with a short `8%` pulse window so one cell lights at a time.
3. Add `.slot-cycle` + `@keyframes slotPulse` to index.css (transform/opacity/background only) **and** disable it in the reduced-motion block (lines 274-301).

**Verify (all steps)**: `npm test` → all pass (labs aren't test-covered; the suite guards regressions elsewhere); `npm run build` succeeds; run dev and check each lab: playhead sweeps both traces' full width, waveform draws left→right once, corrupted bit pops, TDM highlight visits cells in frame order A1→B1→C1→D1→A2→…, and with OS reduced-motion enabled none of it moves.

## Test plan

No unit tests (components untested in this repo). Manual gates listed above; the reduced-motion check is mandatory for every animation added (repo rule).

## Done criteria

- [ ] `grep -n "playhead" src/components/Labs.jsx` finds it in AnalogLab (not just ModulationLab)
- [ ] `grep -n "trace" src/components/Labs.jsx` finds the CodingLab path with `pathLength`
- [ ] `grep -n "slotPulse" src/index.css` finds the keyframes **and** a rule inside the `prefers-reduced-motion` block disabling it
- [ ] `npm test`, `npm run build` pass; only the two in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The `.trace` dash math won't behave on CodingLab's path after two attempts — drop step 2 (report it) rather than shipping a broken-looking waveform.
- The slot-cycle highlight can't visit cells in true frame order with pure CSS delays (e.g. React re-renders reset the loop) after one fix attempt — ship steps 1-3 and report.

## Maintenance notes

- New labs must follow this pattern (CSS classes + reduced-motion entries), per CLAUDE.md's motion section — no animation library.
- The pulse duration scales with cell count; if TdmLab later gains a "more frames" control, compute `cells` from data, don't hardcode.
