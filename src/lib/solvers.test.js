// Every expected value below is an answer printed in the slides or the class notes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as s from './solvers.js';

const near = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} ≈ ${b}`);

test('Ch5.1 bit/baud examples', () => {
  assert.equal(s.baudRate({ N: 4000, r: 4 }).result.S, 1000); // Ex 5.1 (N = 4000)
  assert.deepEqual(s.bitsPerElement({ N: 8000, S: 1000 }).result, { r: 8, L: 256 }); // Ex 5.2
  assert.equal(s.askBandwidth({ N: 50e3, d: 1 }).result.B, 100e3); // Ex 5.3
  assert.equal(s.askBandwidth({ N: 12e6, r: 2, d: 0 }).result.B, 6e6); // Ex 5.7
  assert.equal(s.bfskBandwidth({ N: 25e3, d: 1, twoDf: 50e3 }).result.B, 100e3); // Ex 5.5
  const m = s.mfsk({ N: 3e6, r: 3, fc: 10e6 }).result; // Ex 5.6
  assert.equal(m.L, 8);
  assert.equal(m.B, 8e6);
  assert.equal(m.freqs[0], 6.5e6);
  assert.equal(m.freqs[7], 13.5e6);
});

test('Ch5.2 AM/FM allocation', () => {
  assert.equal(s.analogBandwidth({ type: 'FM', B: 15, beta: 4 }).result.BW, 150);
  const am = s.stationPlan({ start: 530, end: 1700, channel: 10, n: 3 }).result;
  assert.equal(am.count, 117);
  assert.equal(am.lo, 550);
  assert.equal(am.fc, 555);
  const fm = s.stationPlan({ start: 88, end: 108, channel: 0.2, n: 2 }).result;
  assert.equal(fm.count, 100);
  near(fm.fc, 88.3, 1e-9);
});

test('Ch6 FDM and TDM', () => {
  assert.equal(s.fdmLink({ n: 5, bw: 100, guard: 10 }).result.B, 540); // Ex 6.2
  assert.equal(s.fdmLink({ n: 3, bw: 4, guard: 1 }).result.B, 14); // notes: Ex 6.1 with 1 kHz guard
  const t65 = s.tdm({ n: 3, rate: 1000 }).result; // Ex 6.5
  near(t65.inSlot, 1e-3, 1e-12);
  assert.equal(t65.frameRate, 1000);
  const t66 = s.tdm({ n: 4, rate: 1e6 }).result; // Ex 6.6
  assert.equal(t66.linkRate, 4e6);
  const t68 = s.tdm({ n: 4, rate: 800, unitBits: 8 }).result; // Ex 6.8
  assert.equal(t68.frameBits, 32);
  assert.equal(t68.linkRate, 3200);
  const t69 = s.tdm({ n: 4, rate: 100e3, unitBits: 2 }).result; // Ex 6.9
  assert.equal(t69.frameRate, 50000);
  const t610 = s.tdm({ n: 4, rate: 2000, unitBits: 8, syncBits: 1 }).result; // Ex 6.10
  assert.equal(t610.frameBits, 33);
  assert.equal(t610.linkRate, 8250);
  const t1 = s.tdm({ n: 24, rate: 64000, unitBits: 8, syncBits: 1 }).result; // T-1
  assert.equal(t1.frameBits, 193);
  assert.equal(t1.linkRate, 1.544e6);
});

test('PCM', () => {
  assert.deepEqual(s.pcm({ fh: 4000, N: 64000 }).result, { fs: 8000, nb: 8, L: 256, N: 64000 });
});

test('Ch7.2 LOS and antenna', () => {
  near(s.losDistance({ h1: 100, h2: 0 }).result.d, 41.2, 0.1); // slide: 41 km
  near(s.losHeight({ d: 41, h2: 10 }).result.h1, 46.2, 0.3); // slide: 46.2 m
  const g = s.parabolicGain({ diameter: 2, f: 12e9 }).result;
  near(g.G, 35186, 1);
  near(g.dB, 45.46, 0.01);
});

test('Ch8 switching', () => {
  assert.equal(s.multistage({ N: 200, n: 20, k: 4 }).result.total, 2000);
  const c = s.clos({ N: 200 }).result;
  assert.deepEqual([c.n, c.k, c.total], [10, 19, 15200]);
  const d = s.circuitDelay({ D: 5e6, S: 2e8, L: 1000, R: 1e6 }).result;
  near(d.Pd, 0.025, 1e-12);
  near(d.Td, 0.001, 1e-12);
});

test('Ch10 parity', () => {
  assert.equal(s.parity('1011').result.codeword, '10111');
  assert.equal(s.parity('1011', 'odd').result.codeword, '10110');
  assert.equal(s.parity2D(['1100111', '1011101', '0111001', '0101001']).result.codeword, '11001111 10111011 01110010 01010011 01010101');
});

test('Ch10 CRC', () => {
  assert.deepEqual(s.crcGenerate('1001', '1011').result, { quotient: '1010', remainder: '110', codeword: '1001110' });
  assert.equal(s.crcCheck('1001110', '1011').result.remainder, '000');
  assert.equal(s.crcCheck('1000110', '1011').result.remainder, '011');
  assert.equal(s.crcCheck('1101110', '1011').result.remainder, '111');
  assert.deepEqual(s.crcGenerate('100100', '1101').result, { quotient: '111101', remainder: '001', codeword: '100100001' });
});

test('Ch10 checksum', () => {
  const tx = s.checksum([7, 11, 12, 0, 6]).result;
  assert.deepEqual([tx.raw, tx.sum, tx.checksum], [36, 6, 9]);
  assert.equal(s.checksum([7, 11, 12, 0, 6, 9]).result.checksum, 0);
  assert.equal(s.checksum([7, 11, 12, 1, 6, 9]).result.checksum, 0b1110);
  const f = s.checksum([0x466f, 0x726f, 0x757a, 0x616e], 16).result; // "Forouzan"
  assert.equal(f.sum, 0x8fc7);
  assert.equal(f.checksum, 0x7038);
  assert.equal(s.checksum([0b10101001, 0b00111001], 8).result.checksum, 0b00011101);
});

test('Ch10 Hamming', () => {
  assert.deepEqual(s.redundancyBits(7).result, { r: 4, total: 11 });
  assert.equal(s.hammingEncode('1001101').result.codeword, '10011100101');
  assert.equal(s.hammingCheck('10010100101').result.pos, 7); // slide
  assert.equal(s.hammingCheck('10011100111').result.pos, 2); // Raiyan
  assert.equal(s.hammingCheck('10011000101').result.pos, 6); // Medha
  assert.equal(s.hammingCheck('10011100101').result.pos, 0);
});
