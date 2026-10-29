// Guards the content payload: every module is complete, quiz keys are valid, and all math compiles.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import modules from '../data/syllabusData.js';
import checks from '../data/checks.js';
import guides from '../data/guide.js';
import { likely, traps } from '../data/examPrep.js';
import papers from '../data/pastPapers.js';
import { mod2div } from './solvers.js';

const LABS = ['modulation', 'analog', 'fdm', 'tdm', 'crc', 'hamming', 'coding'];
const DIAGRAMS = ['topologies', 'muxdemux', 'fiber', 'multistage', 'spectrum', 'hierarchy', 'qpskimpl', 'constellations', 'fdmsystem', 'delay', 'vcsetup', 'propagation', 'tst', 'waveform', 'tdmframe', 'modwave', 'datagramnet', 'redundancy'];
const tex = (s) => katex.renderToString(s, { throwOnError: true });
const inline = (text = '') => (text.match(/\$[^$]+\$/g) ?? []).forEach((m) => tex(m.slice(1, -1)));

test('modules are complete and unique', () => {
  assert.equal(new Set(modules.map((m) => m.id)).size, modules.length);
  for (const m of modules) {
    for (const k of ['id', 'title', 'chapter', 'sections', 'formulas', 'examples', 'flashcards', 'quiz', 'solvers']) assert.ok(m[k] !== undefined, `${m.id}.${k}`);
    assert.ok(m.flashcards.length && m.quiz.length, `${m.id} has cards and quiz`);
  }
});

test('quiz answers point at a real option', () => {
  for (const m of modules) for (const q of m.quiz) assert.ok(q.answer >= 0 && q.answer < q.options.length, `${m.id}: ${q.q}`);
});

test('all LaTeX compiles', () => {
  for (const m of modules) {
    for (const s of m.sections)
      for (const b of s.blocks) {
        if (b.type === 'math') tex(b.tex);
        inline(b.text);
        b.items?.forEach(inline);
        b.head?.forEach(inline);
        b.rows?.flat().forEach(inline);
      }
    m.formulas.forEach((f) => tex(f.tex));
    m.examples.forEach((e) => [e.question, e.answer, e.note, ...e.steps].forEach(inline));
    m.flashcards.forEach((c) => [c.front, c.back].forEach(inline));
    m.quiz.forEach((q) => [q.q, q.explain, ...q.options].forEach(inline));
  }
});

test('every lesson has a valid check question', () => {
  for (const m of modules)
    for (const s of m.sections) {
      const c = checks[m.id]?.[s.heading];
      assert.ok(c, `missing check: ${m.id} / ${s.heading}`);
      assert.ok(c.answer >= 0 && c.answer < c.options.length, `${m.id}: ${c.q}`);
      [c.q, c.explain, ...c.options].forEach(inline);
    }
  const headings = new Set(modules.flatMap((m) => m.sections.map((s) => `${m.id}/${s.heading}`)));
  for (const [id, byHeading] of Object.entries(checks)) for (const h of Object.keys(byHeading)) assert.ok(headings.has(`${id}/${h}`), `orphan check: ${id} / ${h}`);
});

test('every lesson has a beginner guide', () => {
  for (const m of modules)
    for (const s of m.sections) {
      const g = guides[m.id]?.[s.heading];
      assert.ok(g?.plain && g.recap?.length && Array.isArray(g.terms), `missing guide: ${m.id} / ${s.heading}`);
      [g.plain, ...g.recap, ...g.terms.flat()].forEach(inline);
    }
  const headings = new Set(modules.flatMap((m) => m.sections.map((s) => `${m.id}/${s.heading}`)));
  for (const [id, byHeading] of Object.entries(guides)) for (const h of Object.keys(byHeading)) assert.ok(headings.has(`${id}/${h}`), `orphan guide: ${id} / ${h}`);
});

test('exam prep points at real chapters and its math compiles', () => {
  const ids = new Set(modules.map((m) => m.id));
  for (const q of likely) {
    assert.ok(ids.has(q.module), q.q);
    [q.q, ...q.answer].forEach(inline);
  }
  for (const t of traps) {
    assert.ok(ids.has(t.module), t.text);
    inline(t.text);
  }
});

test('labs and diagrams referenced by lessons exist', () => {
  const known = { lab: LABS, diagram: DIAGRAMS };
  for (const m of modules) for (const s of m.sections) for (const b of s.blocks) if (known[b.type]) assert.ok(known[b.type].includes(b.id), `${m.id}: ${b.type} ${b.id}`);
});

test('past paper items point at real chapters and their math compiles', () => {
  const ids = new Set(modules.map((m) => m.id));
  for (const p of papers)
    for (const set of p.sets)
      for (const it of set.items) {
        assert.ok(ids.has(it.module), it.id);
        [it.q, ...it.answer].forEach(inline);
      }
});

// Checks one block of lesson or exam-script content: math compiles, diagrams exist, divisions are well formed.
function checkBlock(b, where) {
  if (b.type === 'math') tex(b.tex);
  [b.text, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows?.flat() ?? [])].forEach(inline);
  if (b.type === 'diagram') assert.ok(DIAGRAMS.includes(b.id), `${where}: diagram ${b.id}`);
  if (b.type === 'lab') assert.ok(LABS.includes(b.id), `${where}: lab ${b.id}`);
  if (b.type === 'division') assert.match(b.dividend + b.divisor, /^[01]+$/, where);
  if (b.type === 'pre') assert.ok(b.lines.length, where);
}

test('every past-paper item and likely question has a valid exam-script answer', () => {
  for (const p of papers)
    for (const set of p.sets)
      for (const it of set.items) {
        assert.ok(it.script?.length, `${p.title} ${it.id} has no script`);
        assert.equal(it.script.at(-1).type, 'answer', `${p.title} ${it.id} ends with a boxed answer`);
        it.script.forEach((b) => checkBlock(b, `${p.title} ${it.id}`));
      }
  for (const q of likely) {
    assert.ok(q.script?.length, `likely: ${q.q}`);
    q.script.forEach((b) => checkBlock(b, q.q));
  }
});

test('CRC divisions in the exam scripts give the answers they print', () => {
  const crc = papers[1].sets[2].items.find((it) => it.id === '3(a)').script.filter((b) => b.type === 'division');
  assert.equal(mod2div(crc[0].dividend, crc[0].divisor).remainder, '1010');
  assert.equal(mod2div(crc[1].dividend, crc[1].divisor).remainder, '0000');
  assert.equal(crc[1].dividend, '1010011110' + '1010');
});
