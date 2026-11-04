# Plan 013: Stop tracking the source PDFs and paper scans in git

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- .gitignore`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: MED (touches tracked files + history; needs the repo owner's go-ahead for the history step)
- **Depends on**: none
- **Category**: security / repo hygiene
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

The repo's own CLAUDE.md says: "**Never commit** the source PDFs or scans (`Class Lecture/`, `Notes/`, `fall 2024 question/`, `spring 2025 questions/`)". Despite commit `9a64f11` ("stop tracking paper scans"), `git ls-files` at 294e0f3 still tracks **all of them** — 8 lecture PDFs, 2 notes PDFs, and 4 paper scans (committed in `126ae42 "Source Files"`). The working tree currently shows them deleted (` D` in `git status`), uncommitted — so the GitHub remote `Ahnaf181419/data-com` still serves them at HEAD. These are the teacher's slides and the department's exam papers; the repo also deploys publicly via GitHub Pages. Also untracked: a new `QuestionBank/` directory of scans that must be ignored before it gets committed by accident.

Note: removing files from the index does **not** remove them from git history — they remain retrievable from old commits. Full removal requires history rewrite, which CLAUDE.md forbids without the owner's explicit go-ahead; this plan does the index-level fix and prepares (but does not execute) the history decision.

## Current state

- `git ls-files` (verified at 294e0f3) includes:

```
Class Lecture/ch10.ppt.pdf
Class Lecture/ch5_1.pdf
Class Lecture/ch5_2.ppt.pdf
Class Lecture/ch6_1.ppt.pdf
Class Lecture/ch6_2.ppt.pdf
Class Lecture/ch7_1.ppt.pdf
Class Lecture/ch7_2.ppt.pdf
Class Lecture/ch8_1.pptx.pdf
Notes/Data com final-raiyan.pdf
Notes/Dcom final note - medha.pdf
fall 2024 question/1
fall 2024 question/2
spring 2025 questions/1.png
spring 2025 questions/2.png
```

- `.gitignore` (entire file):

```
node_modules/
dist/
.playwright-mcp/
```

- `git status --short` shows ` D` for the four scan files (locally deleted, deletion not committed) and `?? QuestionBank/` (untracked: contains `Spring 2024.pdf` ~4.6 MB and two scan folders).
- Remote: `origin https://github.com/Ahnaf181419/data-com.git` (GitHub Pages site at ahnaf181419.github.io/data-com).
- CLAUDE.md git rules: commit as `Ahnaf181419 <muhammad.ahnaf.sarker@gmail.com>`; never force-push or rewrite history without the student's explicit go-ahead.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests (unchanged) | `npm test` | all pass |
| Tracked-source check | `git ls-files \| grep -iE "Class Lecture\|Notes/\|question"` | empty output |
| Status check | `git status --short` | no ` D` deletions pending, no untracked scan dirs |

## Scope

**In scope**: `.gitignore`, the git index (untracking), `plans/README.md`.
**Out of scope**: `docs/source-transcript.md` (the typed transcript stays — it is the site's source of truth and contains no scans), any `src/` file, history rewriting (separate decision, see Maintenance notes).

## Git workflow

- Work directly on `main` is acceptable (this is an index/policy fix, and the local deletions are already staged-ish in the worktree) — or branch `claude/013-untrack-sources` if preferred. Commit as the student: `Stop tracking the source PDFs and paper scans`. Do not push unless the owner says so — **but note the fix only takes effect publicly once pushed.**

## Steps

### Step 1: Extend .gitignore

Append:

```
Class Lecture/
Notes/
QuestionBank/
fall 2024 question/
spring 2025 questions/
```

### Step 2: Untrack the files

```
git rm -r --cached "Class Lecture" "Notes" "fall 2024 question" "spring 2025 questions"
```

(`--cached` keeps any local copies — here most are already deleted locally, which is fine either way.) Confirm `QuestionBank/` is now ignored: `git status --short` must NOT list it as untracked anymore.

### Step 3: Commit

Single commit with both changes. **Verify**: `git ls-files | grep -iE "Class Lecture|Notes/|question"` → empty. `npm test` → all pass (nothing in src changed).

### Step 4: Report the history situation (do NOT rewrite)

Write into the plan report (and tell the user): the files remain in history (commit `126ae42` and descendants) and thus on GitHub until history is rewritten. Options, requiring the owner's explicit decision per CLAUDE.md:
- accept history as-is (repo is the owner's; risk is continued availability of the scans at old commits), or
- `git filter-repo` / BFG to purge the paths + force-push (CLAUDE.md needs explicit go-ahead; also update any local clones).

**Verify**: `git log --oneline -3` shows the new commit; `git status --short` clean apart from expected noise.

## Test plan

`npm test` must still pass (no source change). The real gates are the two greps in the commands table.

## Done criteria

- [ ] `git ls-files | grep -iE "Class Lecture|Notes/|question"` → empty
- [ ] `.gitignore` contains the five directory patterns
- [ ] `QuestionBank/` no longer shows as untracked
- [ ] `npm test` passes
- [ ] History decision recorded in the report (accepted vs rewrite pending); `plans/README.md` status row updated

## STOP conditions

- `git rm -r --cached` wants to remove anything outside the four directories (path quoting issue) — stop and report.
- The owner has not confirmed whether pushing is okay — commit locally, do not push, report.

## Maintenance notes

- The next `git status` before any commit should be clean of scan noise — that was CLAUDE.md's original intent.
- If the owner later chooses the history rewrite: `git filter-repo --path "Class Lecture" --path "Notes" ... --invert-paths`, then force-push with the owner's explicit go-ahead; GitHub Pages will redeploy. Until then, treat the old commits as containing published scans.
