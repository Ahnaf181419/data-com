# Plan 004: Guard the solvers against malformed input and the negative LOS root

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 294e0f3..HEAD -- src/lib/solvers.js src/lib/solvers.test.js src/components/Solvers.jsx`
> On any diff, compare "Current state" excerpts against live code; mismatch = STOP.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `294e0f3`, 2026-11-04

## Why this matters

The Solvers tab is the student's self-check tool. Three functions return confident wrong results on plausible input:

1. `losHeight({d, h2})` squares a negative root. If the receiver's own horizon already covers `d` (e.g. `d=41` km, `h2=200` m → horizon ≈ 58 km), the algebra wants a negative `√(Kh₁)`, and squaring hides the sign: it returns `h1 = 17.6 m`, but `losDistance(17.6, 200)` gives **75.6 km**, not 41. Reproduced at commit 294e0f3.
2. `mod2div('101','1011')` returns `{quotient:'', remainder:'101', steps:[]}` (empty division), so `crcCheck` prints "discard (error)" for a mistyped short codeword instead of an input error.
3. `hammingCheck('10101010')` happily "corrects" position 8 of an 8-bit word that is not a valid Hamming length.

## Current state

- `src/lib/solvers.js:130-140`:

```js
export function losHeight({ d, h2 }) {
  const root = d / 3.57 - Math.sqrt(K * h2);
  const h1 = (root * root) / K;
  return { result: { h1 }, steps: [ ...two LaTeX steps using root and h1... ] };
}
```

  (`K = 4/3` defined near the top of the file; `losDistance` at lines 124-128 is correct.)

- `src/lib/solvers.js:213-227` — `mod2div` has no length guard; the loop `for (let i = 0; i + n <= dividend.length; i++)` simply never runs when `dividend.length < divisor.length`.
- `src/lib/solvers.js:287-302` — `hammingCheck` derives parity positions from the word length and reports a syndrome-derived position without checking the length is a valid Hamming codeword length.
- Existing validation style to mirror — `mfsk`/`pcmQuantize` throw plain `Error` with a human message, e.g. (see the top of solvers.js): `if (!(fh > 0)) throw new Error('Highest frequency must be positive');`
- `src/components/Solvers.jsx` — the UI catches solver throws and shows the message in red (the CRC lab already renders `err.message` at `Labs.jsx:485`); check how Solvers.jsx renders errors for the `los`/`crc`/`hamming` entries and reuse that path — no UI change should be needed.
- `src/lib/solvers.test.js` — node:test + `assert` from `node:assert/strict`; pattern: `test('name', () => { assert.equal(...) });`

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Tests | `npm test` | all pass |
| One-off repro (before fix) | `node -e "import('./src/lib/solvers.js').then(s=>console.log(s.losHeight({d:41,h2:200})))"` | prints h1 ≈ 17.6 (the bug) |
| Build | `npm run build` | `✓ built in ...` |

## Scope

**In scope**: `src/lib/solvers.js`, `src/lib/solvers.test.js`.
**Out of scope**: `src/components/*` (error rendering already exists; only touch if a thrown message renders raw — then wrap in the existing pattern, and say so in the report), all data files.

## Git workflow

- Branch: `claude/004-solver-guards`. Commit: `Guard losHeight, mod2div and hammingCheck against bad input`. Commit as the student. Do not push.

## Steps

### Step 1: Fix losHeight

In `losHeight`, after computing `root`, throw when it is negative:

```js
if (root < 0) throw new Error(`h₂ = ${h2} m already reaches ${fmt(3.57 * Math.sqrt(K * h2), 1)} km on its own — no positive h₁ can give d = ${d} km (h₁ = 0 suffices)`);
```

Keep everything else identical. (`fmt` already exists in the file.)

### Step 2: Guard mod2div

At the top of `mod2div`:

```js
if (dividend.length < divisor.length) throw new Error(`Dividend (${dividend.length} bits) must be at least as long as the divisor (${divisor.length} bits)`);
```

### Step 3: Guard hammingCheck

At the top of `hammingCheck`, after computing the implied `r` from the length, validate the length: the codeword length must equal k + r for some k where `2**r >= k + r + 1` and r is the smallest such value (i.e. recompute r from k the way `hammingEncode` does, then check `word.length === k + r`). Throw: `Error('Not a Hamming codeword length (need k data + r parity bits, e.g. 11 = 7 + 4)')`. If hammingCheck currently derives r differently, mirror its own convention — read it first; the guard must reject `'10101010'` (8) and accept `'10011000101'` (11) and `'1001110'` (7).

### Step 4: Add regression tests

In `src/lib/solvers.test.js` add one test:

```js
test('solvers reject malformed input instead of guessing', () => {
  assert.throws(() => s.losHeight({ d: 41, h2: 200 }), /no positive h₁|h₂/u);
  assert.throws(() => s.mod2div('101', '1011'), /at least as long/u);
  assert.throws(() => s.hammingCheck('10101010'), /Hamming/u);
  // valid inputs still work:
  assert.ok(s.losHeight({ d: 41, h2: 10 }).result.h1 > 45);
  assert.equal(s.mod2div('1010', '1011').remainder.length, 4);
});
```

Adjust the regexes/messages to what you actually implemented — the assertions must match the shipped error strings.

**Verify**: `npm test` → all pass including the new test.

### Step 5: Build check

**Verify**: `npm run build` succeeds; `git status` shows only the two in-scope files.

## Test plan

Covered in Step 4: negative-root LOS, short dividend, non-Hamming length, plus three sanity checks that valid inputs still solve. Model after the existing `test('Past paper: ...')` blocks in `solvers.test.js`.

## Done criteria

- [ ] `node -e "import('./src/lib/solvers.js').then(s=>s.losHeight({d:41,h2:200}).catch?0:0)"` — simpler: `npm test` passes and the new `assert.throws` cases are in it
- [ ] `npm test` exits 0; `npm run build` succeeds
- [ ] Only `src/lib/solvers.js` and `src/lib/solvers.test.js` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- Any existing test fails after the guards (means a legit test input is now rejected — report which, do not weaken the guard silently).
- `hammingCheck`'s existing length convention doesn't match the assumption in Step 3 (report your findings instead of guessing).
- A UI component calls these functions in a context where a throw breaks rendering (Solvers/Labs catch errors today — verify before finishing).

## Maintenance notes

- If plan 005 adds more solver asserts, they use valid inputs and are unaffected.
- `data.test.js` imports `mod2div` (line 11) for CRC script checks — those dividends are valid codewords, unaffected by the guard.
