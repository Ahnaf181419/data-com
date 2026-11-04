# Plan 007: Add the seven missing static teaching diagrams the slides had

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/components/Diagrams.jsx src/components/Fig.jsx src/lib/data.test.js src/data/ch7_1.js src/data/ch8.js src/data/ch10.js src/data/ch6_2.js src/data/ch7_2.js`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (learning UX)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

Seven topics the slides taught *with figures* are taught here as prose only. Each is a recognize-or-draw exam item. In priority order:

1. **Fiber refraction/critical angle** (ch7_1) — the lesson's entire content is that figure; the check-yourself question tests exactly its three cases.
2. **Crossbar grid** (ch8) — the base switch the exam asks to draw and count (quiz: 50×50 = 2500); students meet the multistage diagram without ever seeing the grid it optimizes.
3. **Burst-error bit strings** (ch10) — burst *length* (first-to-last corrupted bit) is the concept students get wrong; the slides taught it by highlighting the corrupted span.
4. **Coax and fiber cross-sections** (ch7_1) — layer-ordering recognize/draw items in both notes.
5. **Message-switching store-and-forward chain** (ch8), **frame sync bits** (ch6_2), **antenna silhouettes** (ch7_2) — small text-only topics that had figures.

All seven are static SVGs in the established `Fig` style — no new component machinery.

## Current state

- Diagram architecture: `src/components/Diagrams.jsx` exports `DIAGRAMS = { topologies, muxdemux, fiber, multistage, ...EXAM_DIAGRAMS }`. Static diagrams live in `Diagrams.jsx`; parameterized exam diagrams in `ExamDiagrams.jsx`. New static diagrams go in `Diagrams.jsx`.
- The pattern to copy — `Diagrams.jsx:39-70` (`MuxDemux`): a function component returning `<Fig caption="..." label="..."><svg viewBox="0 0 640 H" className="w-full">...</svg></Fig>`, using tokens from `src/components/Fig.jsx`:

```js
export const G = 'var(--color-gold)', A = 'var(--color-ash)', L = 'var(--color-line)', T = 'var(--color-text)', R = 'var(--color-red)', RAISE = 'var(--color-raise)';
```

- `src/components/Fig.jsx` also exports `Arrows()` (arrowhead markers, reference as `markerEnd="url(#arrow-g)"` etc.) — call `<Arrows />` inside the svg if you draw arrows.
- Block usage in modules: `{ type: 'diagram', id: '<key>' }` (optionally `props`).
- **Test gate**: `src/lib/data.test.js:13-14` hardcodes the known ids — every new id must be added to `DIAGRAMS` there or the test at line 82-85 fails:

```js
const DIAGRAMS = ['topologies', 'muxdemux', 'fiber', 'multistage', 'spectrum', 'hierarchy', 'qpskimpl', 'constellations', 'fdmsystem', 'delay', 'vcsetup', 'propagation', 'tst', 'waveform', 'tdmframe', 'modwave', 'datagramnet', 'redundancy'];
```

- Insertion points (all read at 294e0f3):
  - ch7_1.js:35-41 "Fiber-optic cable: how light is guided" — the 3-case list at line 38; add the diagram block after line 38's list, before the core/cladding paragraph.
  - ch8.js:63-71 "Switch structure: crossbar" — prose + `n × m` formula; add after the formula block (read lines 63-71 before editing).
  - ch10.js:7-17 "Errors" — single-bit and burst taught as prose; add after the burst paragraph.
  - ch7_1.js:26-33 (coax, sentence at :28) and :50-56 (fiber construction, sentence at :53).
  - ch8.js:30-34 "Message switching" (single paragraph at :33).
  - ch6_2.js:50-56 "Frame synchronization" (read it first; the TdmLab renders sync bits but in the Statistical-TDM lesson).
  - ch7_2.js:15-21 "Antennas" — the four-item list at :19.
- Slide-figure evidence (docs/source-transcript.md Part 2): refraction figure line 1799; crossbar (R61/M31) line 1897; single-bit + burst figures line 1824 (sent 00000010 → received 00001010; burst length 8: sent 0100010001000011, received 0101110101100011); coax/fiber cross-sections lines 1798, 1801; message-switching chain line 1818; sync-bit framing (fig 6.22) line 1787; antenna shapes line 1805.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| Build | `npm run build` | `✓ built in ...` |
| Visual smoke | `npm run dev` then open http://localhost:5173 | (optional) diagrams render, no console errors |

## Scope

**In scope**: `src/components/Diagrams.jsx`, `src/lib/data.test.js` (the DIAGRAMS list only), `src/data/ch7_1.js`, `src/data/ch8.js`, `src/data/ch10.js`, `src/data/ch6_2.js`, `src/data/ch7_2.js`.
**Out of scope**: `src/components/ExamDiagrams.jsx` (do not add static figures there), `src/components/Fig.jsx`, all labs (`Labs.jsx`), `src/lib/solvers.js`.

## Git workflow

- Branch: `claude/007-slide-diagrams`. One commit per diagram or one commit at the end: `Add the missing slide figures (refraction, crossbar, burst error, cross-sections, switching, sync bits, antennas)`. Commit as the student. Do not push.

## Steps

Do steps 1-3 (highest value) first; each leaves the suite green. Steps 4-7 follow the same loop.

### Step 1: Refraction diagram (id `refraction`)

Add to `Diagrams.jsx` a `Refraction` component: three side-by-side panels, each an air/glass interface (horizontal line; `glass` label below, `air (less dense)` above) with one ray hitting the interface at the origin, then:
- Panel 1 "I < critical": ray bends away from the normal (dashed normal line), exits into air.
- Panel 2 "I = critical": ray skims along the interface.
- Panel 3 "I > critical": ray reflects back into the glass (incident + reflected ray, equal angles to a dashed normal).

Use `Fig` + `Arrows`; gold rays, ash normals, text labels `T`/`A`. Export as `refraction` in `DIAGRAMS`. Add `'refraction'` to data.test.js's DIAGRAMS list. Insert `{ type: 'diagram', id: 'refraction' }` in ch7_1.js after the 3-case list.

**Verify**: `npm test` → all pass (id known; check untouched).

### Step 2: Crossbar grid (id `crossbar`)

`Crossbar` component: 3 vertical input lines, 4 horizontal output lines, a gold dot at each intersection (12 dots), one dot circled in red with label `crosspoint (transistor)`; caption `An n × m crossbar has n·m crosspoints — 3 × 4 = 12; every input can reach every output at once.` Insert in ch8.js "Switch structure: crossbar" after the `n × m` formula. Register id + test.

**Verify**: `npm test`.

### Step 3: Burst-error bit strings (id `biterrors`)

`BitErrors` component: two rows of monospace bit cells using the slide's exact strings — sent `00000010` / received `00001010` (single bit, red), and sent `0100010001000011` / received `0101110101100011` with a bracket (red line + label `burst length 8`) from first to last changed bit; changed bits red, rest text color. SVG or styled divs inside `Fig` — pick whichever renders cleanly at 390px (cells may need two visual lines; keep the bracket span correct). Insert in ch10.js "Errors" after the burst paragraph. Register id + test.

**Verify**: `npm test`.

### Step 4: Cable cross-sections (id `cablesection`, props-driven)

One `CableSection({ rings })` component taking `rings: [[label, cssColorOrToken], ...]` outermost-first; render concentric `<rect>`-framed circles with labels on the right connected by short ash leader lines. Use it twice:
- ch7_1.js coax (after :28): rings core conductor / insulator / outer conductor (foil+braid) / plastic cover.
- ch7_1.js fiber construction (after :53): outer jacket / Kevlar / buffer / cladding / core.

Register the single id `cablesection` + test. (Props on static diagrams: `Diagrams.jsx` components currently take no props — check how `NotesView.jsx`/`Learn.jsx` render `diagram` blocks and pass `props` through the same way `ExamDiagrams` receives them; if static diagrams genuinely can't take props in the current render path, make two components `coaxsection`/`fibersection` instead and register both.)

**Verify**: `npm test`.

### Step 5: Store-and-forward chain (id `storeforward`)

Three nodes in a row (Source → Switch 1 → Switch 2 → Destination per the slide figure, transcript :1818), arrows labelled "whole message stored, then forwarded" between switches; use `node()` helper style from `Diagrams.jsx:5`. Insert in ch8.js "Message switching" after the paragraph. Register + test.

### Step 6: Sync-bit framing (id `syncbits`)

Three frames side by side, each a bordered row of small slot cells with a leading red sync-bit cell reading `1`, `0`, `1` (alternating per frame — fig 6.22, transcript :1787), gold data cells. Caption: "A known sync-bit pattern (1, 0, 1, …) marks frame boundaries; it costs 1 bit per frame of overhead." Insert in ch6_2.js "Frame synchronization". Register + test.

### Step 7: Antenna silhouettes (id `antennas`)

Four small panels: sphere with outward arrows (isotropic), a vertical bar labelled `λ/2` (Hertz dipole), a vertical bar on a ground line labelled `λ/4` (Marconi), and a dish arc with a feed arm (parabolic). Insert in ch7_2.js "Antennas" after the list at :19. Register + test.

**Verify (all steps)**: `npm test` → all pass; `npm run build` succeeds.

## Test plan

The suite's diagram test (data.test.js:82-85) gates every new id; KaTeX/structure tests gate the inserted blocks. Visual sanity: run `npm run dev` once at the end and eyeball each new figure on a narrow viewport (≥390px, no horizontal page scroll).

## Done criteria

- [ ] `npm test` exits 0; DIAGRAMS list in data.test.js has the new ids
- [ ] `grep -c "type: 'diagram'" src/data/ch7_1.js src/data/ch8.js src/data/ch10.js src/data/ch6_2.js src/data/ch7_2.js` reflects the five insertions (7 blocks total incl. cablesection twice)
- [ ] `npm run build` succeeds; only in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The render path for static `diagram` blocks can't pass `props` and you've already made two `CableSection` variants (that's the fallback — don't build a new props system).
- Any figure's geometry can't be drawn correctly at 640 viewBox width without crowding — reduce content (fewer example bits/cells), never overflow.
- data.test.js structure changed such that adding ids to the list breaks other tests.

## Maintenance notes

- Keep static diagrams in Diagrams.jsx; only parameterized exam diagrams belong in ExamDiagrams.jsx (CLAUDE.md layout section).
- The burst strings must stay exactly the slide's (transcript :1824) — a quiz/check references the same concept.
