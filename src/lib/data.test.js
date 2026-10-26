// Guards the content payload: every module is complete, quiz keys are valid, and all math compiles.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import modules from '../data/syllabusData.js';

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
