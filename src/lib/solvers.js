// Pure calculators for the exam math taught in CSE 2211 (slides + class notes).
// Each returns { result, steps } where steps are LaTeX strings for the UI.

const fmt = (x, d = 4) => (Number.isInteger(x) ? String(x) : String(+x.toFixed(d)));

// ---- Ch 5.1: bit rate, baud rate, levels ----
export function baudRate({ N, r }) {
  const S = N / r;
  return {
    result: { S, L: 2 ** r },
    steps: [`S = N \\times \\frac{1}{r} = ${fmt(N)} \\times \\frac{1}{${r}} = ${fmt(S)}\\text{ baud}`, `L = 2^r = 2^{${r}} = ${2 ** r}`],
  };
}

export function bitsPerElement({ N, S }) {
  const r = N / S;
  return {
    result: { r, L: 2 ** r },
    steps: [`r = \\frac{N}{S} = \\frac{${fmt(N)}}{${fmt(S)}} = ${fmt(r)}`, `L = 2^r = ${fmt(2 ** r)}`],
  };
}

// ASK / BPSK / QPSK / QAM: B = (1+d)S
export function askBandwidth({ N, r = 1, d }) {
  const S = N / r;
  const B = (1 + d) * S;
  return {
    result: { S, B },
    steps: [`S = N \\times \\frac{1}{r} = \\frac{${fmt(N)}}{${r}} = ${fmt(S)}`, `B = (1+d)S = (1+${d}) \\times ${fmt(S)} = ${fmt(B)}`],
  };
}

// BFSK: B = (1+d)S + 2Δf
export function bfskBandwidth({ N, d, twoDf }) {
  const S = N;
  const B = (1 + d) * S + twoDf;
  return {
    result: { S, B },
    steps: [`r = 1 \\Rightarrow S = N = ${fmt(S)}`, `B = (1+d)S + 2\\Delta f = (1+${d})(${fmt(S)}) + ${fmt(twoDf)} = ${fmt(B)}`],
  };
}

// MFSK: with 2Δf = S and d = 0, B = L × S. Frequencies placed symmetrically around fc.
export function mfsk({ N, r, fc }) {
  if (!Number.isInteger(r) || r < 1 || r > 6) throw new Error('Bits at a time r: use a whole number from 1 to 6.');
  const L = 2 ** r;
  const S = N / r;
  const B = L * S;
  const freqs = Array.from({ length: L }, (_, i) => fc + (i - (L - 1) / 2) * S);
  return {
    result: { L, S, B, freqs },
    steps: [
      `L = 2^r = 2^{${r}} = ${L}`,
      `S = \\frac{N}{r} = \\frac{${fmt(N)}}{${r}} = ${fmt(S)}`,
      `2\\Delta f = S = ${fmt(S)}`,
      `B_{min} = L \\times S = ${L} \\times ${fmt(S)} = ${fmt(B)}`,
      `f_1 \\dots f_{${L}} = ${freqs.map((f) => fmt(f)).join(',\\ ')}`,
    ],
  };
}

// ---- Ch 5.2: AM / FM / PM ----
export function analogBandwidth({ type, B, beta }) {
  if (type === 'AM') return { result: { BW: 2 * B }, steps: [`B_{AM} = 2B = 2 \\times ${fmt(B)} = ${fmt(2 * B)}`] };
  const BW = 2 * (1 + beta) * B;
  return { result: { BW }, steps: [`B_{${type}} = 2(1+\\beta)B = 2(1+${beta}) \\times ${fmt(B)} = ${fmt(BW)}`] };
}

// Band allocation: number of stations, and the n-th station's range and carrier.
export function stationPlan({ start, end, channel, n }) {
  const count = Math.floor((end - start) / channel);
  const lo = (n - 1) * channel + start;
  return {
    result: { count, lo, hi: lo + channel, fc: lo + channel / 2 },
    steps: [
      `\\#\\text{stations} = \\frac{${fmt(end)} - ${fmt(start)}}{${fmt(channel)}} = ${count}`,
      `\\text{St}_{${n}}\\text{ start} = (n-1) \\times ${fmt(channel)} + ${fmt(start)} = ${fmt(lo)}`,
      `\\text{range} = ${fmt(lo)} \\sim ${fmt(lo + channel)}, \\quad f_c = ${fmt(lo + channel / 2)}`,
    ],
  };
}

// ---- Ch 6.1: FDM ----
export function fdmLink({ n, bw, guard }) {
  const B = n * bw + (n - 1) * guard;
  return { result: { B }, steps: [`B_{link} = n \\times B_{ch} + (n-1) \\times g = ${n} \\times ${fmt(bw)} + ${n - 1} \\times ${fmt(guard)} = ${fmt(B)}`] };
}

// ---- Ch 6.2: synchronous TDM ----
// units: rate in bps, unitBits = bits per slot, syncBits per frame
export function tdm({ n, rate, unitBits = 1, syncBits = 0 }) {
  const inSlot = unitBits / rate; // = frame duration
  const outSlot = inSlot / n;
  const frameBits = n * unitBits + syncBits;
  const frameRate = rate / unitBits;
  const linkRate = frameRate * frameBits;
  const steps = [
    `\\text{input slot} = T = \\frac{${unitBits}}{${fmt(rate)}} = ${fmt(inSlot, 9)}\\text{ s}`,
    `\\text{output slot} = \\frac{T}{n} = \\frac{${fmt(inSlot, 9)}}{${n}} = ${fmt(outSlot, 12)}\\text{ s}`,
    `\\text{frame size} = ${n} \\times ${unitBits}${syncBits ? ` + ${syncBits}` : ''} = ${frameBits}\\text{ bits}`,
    `\\text{frame rate} = \\frac{1}{T} = ${fmt(frameRate)}\\text{ frames/s}`,
    `\\text{link rate} = ${fmt(frameRate)} \\times ${frameBits} = ${fmt(linkRate)}\\text{ bps}`,
  ];
  if (syncBits) steps.push(`\\text{overhead} = ${fmt(linkRate)} - ${fmt(n * rate)} = ${fmt(linkRate - n * rate)}\\text{ bps}`);
  return { result: { inSlot, outSlot, frameBits, frameRate, linkRate }, steps };
}

// ---- PCM ----
export function pcm({ fh, N, nb }) {
  const fs = 2 * fh;
  const bits = nb ?? N / fs;
  const rate = fs * bits;
  return {
    result: { fs, nb: bits, L: 2 ** bits, N: rate },
    steps: [
      `f_s = 2 f_h = 2 \\times ${fmt(fh)} = ${fmt(fs)}\\text{ samples/s}`,
      nb == null ? `n_b = \\frac{N}{f_s} = \\frac{${fmt(N)}}{${fmt(fs)}} = ${fmt(bits)}\\text{ bits/sample}` : `N = f_s \\times n_b = ${fmt(fs)} \\times ${nb} = ${fmt(rate)}\\text{ bps}`,
      `L = 2^{n_b} = 2^{${fmt(bits)}} = ${fmt(2 ** bits)}\\text{ levels}`,
    ],
  };
}

// ---- Ch 7.2: line of sight (heights in m, distances in km), K = 4/3 ----
const K = 4 / 3;
export function losDistance({ h1, h2 }) {
  const d = 3.57 * (Math.sqrt(K * h1) + Math.sqrt(K * h2));
  return { result: { d }, steps: [`d_{max} = 3.57\\left(\\sqrt{K h_1} + \\sqrt{K h_2}\\right) = 3.57\\left(\\sqrt{\\tfrac43 \\cdot ${h1}} + \\sqrt{\\tfrac43 \\cdot ${h2}}\\right) = ${fmt(d, 2)}\\text{ km}`] };
}

export function losHeight({ d, h2 }) {
  const root = d / 3.57 - Math.sqrt(K * h2);
  const h1 = (root * root) / K;
  return {
    result: { h1 },
    steps: [
      `\\sqrt{K h_1} = \\frac{${d}}{3.57} - \\sqrt{\\tfrac43 \\cdot ${h2}} = ${fmt(root, 2)}`,
      `h_1 = \\frac{${fmt(root, 2)}^2}{4/3} = ${fmt(h1, 1)}\\text{ m}`,
    ],
  };
}

// Parabolic antenna: Ae = 0.56A, G = 7A/λ²
export function parabolicGain({ diameter, f }) {
  const A = Math.PI * (diameter / 2) ** 2;
  const lambda = 3e8 / f;
  const G = (7 * A) / lambda ** 2;
  const dB = 10 * Math.log10(G);
  return {
    result: { A, Ae: 0.56 * A, lambda, G, dB },
    steps: [
      `A = \\pi r^2 = ${fmt(A, 3)}\\text{ m}^2, \\quad A_e = 0.56A = ${fmt(0.56 * A, 3)}\\text{ m}^2`,
      `\\lambda = \\frac{c}{f} = \\frac{3\\times10^8}{${f.toExponential(2)}} = ${fmt(lambda, 5)}\\text{ m}`,
      `G = \\frac{7A}{\\lambda^2} = ${fmt(G, 0)}, \\quad G_{dB} = 10\\log_{10} G = ${fmt(dB, 2)}\\text{ dB}`,
    ],
  };
}

// ---- Ch 8: switching ----
export function multistage({ N, n, k }) {
  const g = N / n;
  const s1 = g * n * k, s2 = k * g * g, s3 = g * k * n;
  const total = s1 + s2 + s3;
  const pct = (total / (N * N)) * 100;
  return {
    result: { total, crossbar: N * N, pct },
    steps: [
      `\\tfrac{N}{n} = ${g}\\text{ switches of } ${n}\\times${k}\\text{ in stage 1}`,
      `\\text{Stage 1: } ${g}(${n}\\times${k}) = ${s1}`,
      `\\text{Stage 2: } ${k}(${g}\\times${g}) = ${s2}`,
      `\\text{Stage 3: } ${g}(${k}\\times${n}) = ${s3}`,
      `\\text{Total} = 2kN + k\\left(\\tfrac{N}{n}\\right)^2 = ${total} \\;(${fmt(pct, 1)}\\%\\text{ of } ${N}\\times${N} = ${N * N})`,
    ],
  };
}

// n = sqrt(N/2), taken as the divisor of N closest to it so every stage has whole crossbars.
export function clos({ N }) {
  const root = Math.sqrt(N / 2);
  let n = 1;
  for (let d = 1; d <= N; d++) if (N % d === 0 && Math.abs(d - root) < Math.abs(n - root)) n = d;
  const k = 2 * n - 1;
  const first = Number.isInteger(root) ? `n = \\sqrt{N/2} = \\sqrt{${N}/2} = ${n}` : `n = \\sqrt{${N}/2} \\approx ${fmt(root, 2)} \\to ${n}\\ (\\text{nearest divisor of } ${N})`;
  return { result: { n, k, ...multistage({ N, n, k }).result }, steps: [first, `k = 2n - 1 = ${k}`, ...multistage({ N, n, k }).steps] };
}

export function circuitDelay({ D, S, L, R }) {
  const Pd = D / S, Td = L / R;
  return {
    result: { Pd, Td, setup: 2 * Pd + 2 * Td },
    steps: [
      `P_d = \\frac{D}{S} = \\frac{${D.toExponential(2)}}{${S.toExponential(2)}} = ${fmt(Pd * 1000, 3)}\\text{ ms}`,
      `T_d = \\frac{L}{R} = \\frac{${L}}{${R.toExponential(2)}} = ${fmt(Td * 1000, 3)}\\text{ ms}`,
      `\\text{Setup} = 2P_d + 2T_d = ${fmt((2 * Pd + 2 * Td) * 1000, 3)}\\text{ ms}`,
    ],
  };
}

// ---- Ch 10: error detection & correction ----
const ones = (s) => [...s].filter((c) => c === '1').length;

export function parity(data, mode = 'even') {
  const c = ones(data);
  const bit = mode === 'even' ? c % 2 : 1 - (c % 2);
  return { result: { bit, codeword: data + bit }, steps: [`\\#1\\text{s in } ${data} = ${c}`, `\\text{${mode} parity bit} = ${bit} \\Rightarrow ${data}\\,\\mathbf{${bit}}`] };
}

export function parity2D(rows) {
  const withRow = rows.map((r) => r + (ones(r) % 2));
  const col = [...withRow[0]].map((_, i) => withRow.reduce((a, r) => a + +r[i], 0) % 2).join('');
  return { result: { rows: withRow, col, codeword: [...withRow, col].join(' ') }, steps: [...withRow.map((r) => `\\texttt{${r}}`), `\\text{column parity: } \\texttt{${col}}`] };
}

export function mod2div(dividend, divisor) {
  if (divisor.length < 2 || divisor[0] !== '1') throw new Error('Divisor must start with 1 and have at least 2 bits.');
  const n = divisor.length;
  let cur = dividend.slice(0, n);
  let q = '';
  const steps = [];
  for (let i = n; i <= dividend.length; i++) {
    const use = cur[0] === '1' ? divisor : '0'.repeat(n);
    q += cur[0];
    const x = [...cur].map((b, j) => (b === use[j] ? '0' : '1')).join('').slice(1);
    steps.push(`\\texttt{${cur}} \\oplus \\texttt{${use}} = \\texttt{${x}}`);
    cur = x + (dividend[i] ?? '');
  }
  return { quotient: q, remainder: cur, steps };
}

export function crcGenerate(data, divisor) {
  const aug = data + '0'.repeat(divisor.length - 1);
  const { quotient, remainder, steps } = mod2div(aug, divisor);
  return {
    result: { quotient, remainder, codeword: data + remainder },
    steps: [`\\text{augmented} = \\texttt{${aug}}`, ...steps, `\\text{quotient} = \\texttt{${quotient}},\\ \\text{remainder} = \\texttt{${remainder}}`, `\\text{codeword} = \\texttt{${data}}\\,\\mathbf{\\texttt{${remainder}}}`],
  };
}

export function crcCheck(codeword, divisor) {
  const { remainder, steps } = mod2div(codeword, divisor);
  const ok = !remainder.includes('1');
  return { result: { remainder, ok }, steps: [...steps, `\\text{syndrome} = \\texttt{${remainder}} \\Rightarrow \\text{${ok ? 'accept' : 'discard (error)'}}`] };
}

// one's complement checksum over n-bit words (n = 4 for the notes' decimal example, 16 for hex)
export function checksum(words, nbits = 4, received = false) {
  const mod = 2 ** nbits;
  const raw = words.reduce((a, b) => a + b, 0);
  let sum = raw;
  while (sum >= mod) sum = (sum % mod) + Math.floor(sum / mod);
  const cs = mod - 1 - sum;
  const bin = (v) => v.toString(2).padStart(nbits, '0');
  const steps = [`\\text{sum} = ${words.join(' + ')} = ${raw}`, `\\text{wrapped sum} = ${sum} = \\texttt{${bin(sum)}}`, `\\text{checksum} = \\overline{\\text{sum}} = ${cs} = \\texttt{${bin(cs)}}`];
  if (received) steps.push(cs === 0 ? '\\text{checksum} = 0 \\Rightarrow \\text{no error}' : '\\text{checksum} \\ne 0 \\Rightarrow \\text{error}');
  return { result: { raw, sum, checksum: cs, ok: cs === 0 }, steps };
}

export function redundancyBits(k) {
  let r = 1;
  while (2 ** r < k + r + 1) r++;
  return { result: { r, total: k + r }, steps: [`2^r \\ge k + r + 1`, `r = ${r}: 2^{${r}} = ${2 ** r} \\ge ${k} + ${r} + 1 = ${k + r + 1}`] };
}

// Hamming (even parity). Codeword strings are written MSB = highest position, as in the slides.
const isPow2 = (p) => (p & (p - 1)) === 0;

export function hammingEncode(data) {
  const k = data.length;
  const { r } = redundancyBits(k).result;
  const n = k + r;
  const bits = {}; // position -> bit
  const dataBits = [...data];
  for (let p = n; p >= 1; p--) if (!isPow2(p)) bits[p] = +dataBits.shift();
  const steps = [];
  for (let i = 0; i < r; i++) {
    const p = 2 ** i;
    const cover = [];
    for (let q = 1; q <= n; q++) if (q & p && q !== p) cover.push(q);
    const c = cover.reduce((a, q) => a + bits[q], 0);
    bits[p] = c % 2;
    steps.push(`r_{${p}} \\text{ covers } ${cover.map((q) => `b_{${q}}`).join(',')} = ${cover.map((q) => bits[q]).join(',')} \\Rightarrow r_{${p}} = ${bits[p]}`);
  }
  const codeword = Array.from({ length: n }, (_, i) => bits[n - i]).join('');
  steps.push(`\\text{codeword} = \\texttt{${codeword}}`);
  return { result: { r, codeword }, steps };
}

export function hammingCheck(codeword) {
  const n = codeword.length;
  const bit = (p) => +codeword[n - p];
  let pos = 0;
  const steps = [];
  for (let p = 1; p <= n; p *= 2) {
    const cover = [];
    for (let q = 1; q <= n; q++) if (q & p) cover.push(q);
    const c = cover.reduce((a, q) => a + bit(q), 0) % 2;
    if (c) pos += p;
    steps.push(`r_{${p}}: ${cover.map((q) => `b_{${q}}`).join(',')} = ${cover.map(bit).join(',')} \\Rightarrow ${c}`);
  }
  const corrected = pos ? [...codeword].map((b, i) => (n - i === pos ? (b === '1' ? '0' : '1') : b)).join('') : codeword;
  steps.push(pos ? `\\text{error at position } ${pos} \\Rightarrow \\texttt{${corrected}}` : '\\text{all checks } 0 \\Rightarrow \\text{no error}');
  return { result: { pos, corrected }, steps };
}

// ---- Past-paper topics taught from the Forouzan method (not in the class slides/notes) ----

// PCM quantization: L = 2^nb zones of height Δ between vmin and vmax; each sample is replaced by its zone's midpoint.
export function pcmQuantize({ values, vmin, vmax, nb }) {
  if (!(vmax > vmin)) throw new Error('Max voltage must be above min voltage.');
  if (!Number.isInteger(nb) || nb < 1 || nb > 8) throw new Error('Bits per code word: use a whole number from 1 to 8.');
  const L = 2 ** nb;
  const delta = (vmax - vmin) / L;
  const rows = values.map((v) => {
    const code = Math.min(L - 1, Math.max(0, Math.floor((v - vmin) / delta)));
    const norm = v / delta;
    const quant = (vmin + (code + 0.5) * delta) / delta;
    return { v, norm: +norm.toFixed(2), quant, error: +(quant - norm).toFixed(2), code, word: code.toString(2).padStart(nb, '0') };
  });
  return {
    result: { L, delta, rows },
    steps: [
      `L = 2^{${nb}} = ${L}\\text{ levels}, \\quad \\Delta = \\frac{${vmax} - (${vmin})}{${L}} = ${fmt(delta)}\\text{ V}`,
      ...rows.map((r) => `${r.v}\\text{ V} \\to \\tfrac{${r.v}}{${fmt(delta)}} = ${r.norm},\\ \\text{quantized } ${r.quant},\\ \\text{error } ${r.error},\\ \\text{code } ${r.code} = \\texttt{${r.word}}`),
    ],
  };
}

export const FOUR_B_FIVE_B = { '0000': '11110', '0001': '01001', '0010': '10100', '0011': '10101', '0100': '01010', '0101': '01011', '0110': '01110', '0111': '01111', '1000': '10010', '1001': '10011', '1010': '10110', '1011': '10111', '1100': '11010', '1101': '11011', '1110': '11100', '1111': '11101' };

export function blockCode4B5B(bits) {
  if (bits.length % 4) throw new Error('Input length must be a multiple of 4 bits.');
  const groups = bits.match(/..../g);
  const out = groups.map((g) => FOUR_B_FIVE_B[g]);
  return { result: { groups, out, stream: out.join('') }, steps: [...groups.map((g, i) => `\\texttt{${g}} \\to \\texttt{${out[i]}}`), `\\text{output} = \\texttt{${out.join('\\,')}}`] };
}

// Differential Manchester: always a mid-bit transition; a transition at the START of the bit means 0, none means 1.
// Returns [firstHalf, secondHalf] levels (1 = high, 0 = low) per bit, given the line level before the first bit.
export function diffManchester(bits, startHigh = true) {
  let level = startHigh ? 1 : 0;
  return [...bits].map((b) => {
    const first = b === '0' ? 1 - level : level;
    level = 1 - first;
    return [first, level];
  });
}

// Receiver side of 2-D even parity: every row (incl. parity bit) and every column must hold an even number of 1s.
export function parity2DCheck(rows) {
  const badRows = rows.map((r, i) => (ones(r) % 2 ? i + 1 : 0)).filter(Boolean);
  const badCols = [...rows[0]].map((_, c) => (rows.reduce((a, r) => a + +r[c], 0) % 2 ? c + 1 : 0)).filter(Boolean);
  const ok = !badRows.length && !badCols.length;
  return {
    result: { badRows, badCols, ok },
    steps: [
      ...rows.map((r, i) => `\\text{row ${i + 1}: } \\texttt{${r}} \\to ${ones(r)}\\text{ ones}${ones(r) % 2 ? '\\ \\text{(odd ✗)}' : ''}`),
      `\\text{odd columns: } ${badCols.length ? badCols.join(', ') : '\\text{none}'}`,
      ok ? '\\text{all even} \\Rightarrow \\text{accept}' : '\\text{parity broken} \\Rightarrow \\text{error, discard the block}',
    ],
  };
}

// Datagrams on different paths: delay = path length / speed + sum of the delays of the switches visited.
export function datagramArrival({ lengths, paths, delays, speed = 2e8 }) {
  if (lengths.length !== paths.length) throw new Error('Give one path for each path length.');
  if (paths.flat().some((k) => k > delays.length)) throw new Error('A path uses a switch with no delay given.');
  const rows = lengths.map((km, i) => {
    const prop = ((km * 1000) / speed) * 1000;
    const sw = paths[i].reduce((a, k) => a + delays[k - 1], 0);
    return { id: i + 1, prop, sw, total: prop + sw };
  });
  const order = [...rows].sort((a, b) => a.total - b.total).map((r) => r.id);
  return {
    result: { rows, order },
    steps: [
      ...rows.map((r, i) => `\\text{D${r.id}: } \\tfrac{${lengths[i]}\\text{ km}}{2\\times10^8} = ${fmt(r.prop)}\\text{ ms} + (${paths[i].map((k) => delays[k - 1]).join('+')}) = ${fmt(r.total)}\\text{ ms}`),
      `\\text{arrival order: } ${order.join(' \\to ')}`,
    ],
  };
}

// ---- Cable loss in dB/km (textbook method; Spring 2024 Q3d) ----
export function cableLoss({ P0, dbPerKm, km }) {
  const db = dbPerKm * km;
  const P = P0 * 10 ** (db / 10);
  return { result: { db, P }, steps: [`\\text{loss} = ${dbPerKm} \\times ${km} = ${fmt(db, 2)}\\text{ dB}`, `${fmt(db, 2)} = 10\\log_{10}\\frac{P}{${P0}} \\Rightarrow P = ${P0} \\times 10^{${fmt(db / 10, 3)}} = ${fmt(P, 3)}`] };
}
