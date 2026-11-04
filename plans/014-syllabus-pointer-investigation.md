# Plan 014: Investigate — confirm the syllabus pointer "Ch 2, 3.2, 3.3, 4.1, 4.2" with the teacher

> **Executor instructions**: This is an **investigate/decision plan**, not a build plan. It produces a recorded answer and possibly a follow-up decision — not code. Follow the steps, record the outcome in the transcript, update `plans/README.md`.

## Status

- **Priority**: P3
- **Effort**: S (one conversation) — M only if topics must then be added
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction (investigate)
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

Raiyan's notes carry an internal syllabus pointer (docs/source-transcript.md:1855, R18 header): `"Ch-2, 3-2, 3-3, 4-1, 4-2 analog to digital"`. The transcript contains **no slides** for Forouzan Ch 2 (protocols/layers), 3.2–3.3 (analog-to-digital topics beyond what the site has) or 4.1–4.2 (digital transmission: line codes, delta modulation, etc.). The site grounds its Ch 3/4 content only in two flagged past-paper items (`src/data/lineCoding.js` for 4B/5B + differential Manchester, `src/data/pcm.js` for quantization). If any of those sub-chapters is examinable without having appeared in a past paper yet, the site has a blind spot no audit of the current sources can close. If they are not examinable, recording that retires the question permanently.

## Current state

- The pointer: `docs/source-transcript.md:1855` — R18 header note, quoted verbatim above.
- Site coverage of adjacent topics: `src/data/pcm.js` (sampling/quantization from R51–R55/M1/M23), `src/data/lineCoding.js` (flagged, from Fall 2024 Q2(d) + Spring 2024 Q2(d)).
- CLAUDE.md rule 1: content comes only from the student's material; rule 2: past-paper-driven extras must be flagged. Adding unasked Forouzan sections without teacher confirmation would violate the spirit of rule 1 — hence investigate first.

## Steps

### Step 1: Ask the teacher (or check the official course outline)

One question, with the pointer in hand: *"The notes reference Forouzan Ch 2, 3.2, 3.3, 4.1, 4.2 for analog/digital conversion — which of these are examinable in the final?"* (Email or office hours; bring the past papers — all three finals' topics are the baseline already covered.)

### Step 2: Record the answer

Append a dated line to `docs/source-transcript.md` under a new `### Syllabus confirmations` heading at the end: date, who confirmed, and the verdict per sub-chapter (examinable / not examinable / already covered by existing flagged lessons).

### Step 3: Decide the follow-up

- **Not examinable / already covered** → done; note the verdict in `plans/README.md` and close this plan.
- **Examinable and uncovered** → open a follow-up content plan modeled exactly on `plans/001-flagged-lessons.md` (flagged sections + note blocks + checks + guide entries + solver asserts per CLAUDE.md rule 2). Do not build it inside this plan.

## Done criteria

- [ ] `docs/source-transcript.md` has a dated `### Syllabus confirmations` entry naming the verdict
- [ ] `plans/README.md` row updated: DONE with verdict, or BLOCKED (no teacher answer before the exam — then say what was covered anyway)
- [ ] No source content was added speculatively

## STOP conditions

- The teacher is unreachable before the exam → record that, mark BLOCKED, and (optional, cheap) skim Forouzan Ch 4.1–4.2 summaries as personal revision only — the site stays unchanged.

## Maintenance notes

- This is the audit's only LOW-confidence finding (COVERAGE-08); the transcript pointer may simply be a note-to-self, which is why no content was built.
