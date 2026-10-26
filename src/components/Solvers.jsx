import { useState } from 'react';
import { BlockMath } from 'react-katex';
import * as s from '../lib/solvers.js';

// Field types: num (positive number), num0 (number ≥ 0), bits (0/1 string), list (comma-separated numbers, 0x hex allowed), select.
// Defaults are the slide/note examples so each solver opens on a known answer.
const SOLVERS = {
  baud: [
    { title: 'Baud rate from bit rate', fields: [['N', 'Bit rate N (bps)', 'num', 4000], ['r', 'Bits per signal element r', 'num', 4]], run: s.baudRate },
    { title: 'Bits per element from N and S', fields: [['N', 'Bit rate N (bps)', 'num', 8000], ['S', 'Baud rate S', 'num', 1000]], run: s.bitsPerElement },
  ],
  askbw: [{ title: 'ASK / PSK / QAM bandwidth', fields: [['N', 'Bit rate N (bps)', 'num', 12e6], ['r', 'Bits per element r', 'num', 2], ['d', 'Factor d (0–1)', 'num0', 0]], run: s.askBandwidth }],
  fsk: [{ title: 'BFSK bandwidth', fields: [['N', 'Bit rate N (bps)', 'num', 25000], ['d', 'Factor d (0–1)', 'num0', 1], ['twoDf', '2Δf (Hz)', 'num0', 50000]], run: s.bfskBandwidth }],
  mfsk: [{ title: 'MFSK levels, baud rate, bandwidth', fields: [['N', 'Bit rate N (bps)', 'num', 3e6], ['r', 'Bits at a time r', 'num', 3], ['fc', 'Carrier fc (Hz)', 'num', 10e6]], run: s.mfsk }],
  analogbw: [{ title: 'AM / FM / PM bandwidth', fields: [['type', 'Modulation', 'select', 'FM', ['AM', 'FM', 'PM']], ['B', 'Modulating signal B (kHz)', 'num', 15], ['beta', 'β (FM 4, PM 2)', 'num0', 4]], run: s.analogBandwidth }],
  stations: [{ title: 'Station count and n-th station', fields: [['start', 'Band start', 'num', 530], ['end', 'Band end', 'num', 1700], ['channel', 'Channel width (same unit)', 'num', 10], ['n', 'Station number n', 'num', 3]], run: s.stationPlan }],
  fdm: [{ title: 'FDM link bandwidth', fields: [['n', 'Number of channels n', 'num', 5], ['bw', 'Bandwidth per channel', 'num', 100], ['guard', 'Guard band', 'num0', 10]], run: s.fdmLink }],
  tdm: [{ title: 'Synchronous TDM', fields: [['n', 'Number of inputs n', 'num', 4], ['rate', 'Rate per input (bps)', 'num', 2000], ['unitBits', 'Bits per slot', 'num', 8], ['syncBits', 'Sync bits per frame', 'num0', 1]], run: s.tdm }],
  pcm: [{ title: 'PCM: sampling and quantization', fields: [['fh', 'Highest frequency fh (Hz)', 'num', 4000], ['N', 'Bit rate N (bps)', 'num', 64000]], run: s.pcm }],
  los: [
    { title: 'Max LOS distance', fields: [['h1', 'Antenna 1 height (m)', 'num0', 100], ['h2', 'Antenna 2 height (m)', 'num0', 0]], run: s.losDistance },
    { title: 'Required transmitter height', fields: [['d', 'Distance (km)', 'num', 41], ['h2', 'Receiver height (m)', 'num0', 10]], run: s.losHeight },
  ],
  antenna: [{ title: 'Parabolic antenna gain', fields: [['diameter', 'Diameter (m)', 'num', 2], ['f', 'Frequency (Hz)', 'num', 12e9]], run: s.parabolicGain }],
  multistage: [
    { title: 'Multistage switch crosspoints', fields: [['N', 'Inputs N', 'num', 200], ['n', 'Stage-1 inputs n', 'num', 20], ['k', 'Middle switches k', 'num', 4]], run: s.multistage },
    { title: 'Clos non-blocking design', fields: [['N', 'Inputs N', 'num', 200]], run: s.clos },
  ],
  delay: [{ title: 'Propagation and transmission delay', fields: [['D', 'Distance D (m)', 'num', 5e6], ['S', 'Speed S (m/s)', 'num', 2e8], ['L', 'Message L (bits)', 'num', 1000], ['R', 'Rate R (bps)', 'num', 1e6]], run: s.circuitDelay }],
  parity: [
    { title: 'Parity bit', fields: [['data', 'Data bits', 'bits', '1011'], ['mode', 'Parity', 'select', 'even', ['even', 'odd']]], run: (v) => s.parity(v.data, v.mode) },
    { title: '2-D parity (even)', fields: [['rows', 'Rows, space-separated', 'bitrows', '1100111 1011101 0111001 0101001']], run: (v) => s.parity2D(v.rows) },
  ],
  crc: [
    { title: 'CRC generator', fields: [['data', 'Dataword', 'bits', '1001'], ['div', 'Divisor', 'bits', '1011']], run: (v) => s.crcGenerate(v.data, v.div) },
    { title: 'CRC checker', fields: [['cw', 'Received codeword', 'bits', '1001110'], ['div', 'Divisor', 'bits', '1011']], run: (v) => s.crcCheck(v.cw, v.div) },
  ],
  checksum: [{ title: 'One’s complement checksum', fields: [['words', 'Words (e.g. 7,11,12,0,6 or 0x466F,…)', 'list', '7, 11, 12, 0, 6'], ['nbits', 'Bits per word', 'num', 4], ['side', 'Side', 'select', 'sender', ['sender', 'receiver']]], run: (v) => s.checksum(v.words, v.nbits, v.side === 'receiver') }],
  hamming: [
    { title: 'Hamming encoder', fields: [['data', 'Data bits', 'bits', '1001101']], run: (v) => s.hammingEncode(v.data) },
    { title: 'Hamming error locator', fields: [['cw', 'Received codeword', 'bits', '10010100101']], run: (v) => s.hammingCheck(v.cw) },
    { title: 'Redundant bits needed', fields: [['k', 'Data bits k', 'num', 7]], run: (v) => s.redundancyBits(v.k) },
  ],
};

function parse([key, label, type], raw) {
  const t = String(raw).trim();
  if (type === 'select') return t;
  if (type === 'bits') {
    if (!/^[01]+$/.test(t)) throw new Error(`${label}: use only 0 and 1.`);
    return t;
  }
  if (type === 'bitrows') {
    const rows = t.split(/\s+/);
    if (!rows.every((r) => /^[01]+$/.test(r) && r.length === rows[0].length)) throw new Error(`${label}: rows must be 0/1 and the same length.`);
    return rows;
  }
  if (type === 'list') {
    const nums = t.split(/[\s,]+/).filter(Boolean).map(Number);
    if (!nums.length || nums.some((x) => !Number.isInteger(x) || x < 0)) throw new Error(`${label}: enter whole numbers separated by commas.`);
    return nums;
  }
  const x = Number(t);
  if (!Number.isFinite(x) || x < 0 || (type === 'num' && x === 0)) throw new Error(`${label}: enter a ${type === 'num' ? 'positive' : 'non-negative'} number.`);
  return x;
}

function Solver({ cfg }) {
  const [vals, setVals] = useState(() => Object.fromEntries(cfg.fields.map((f) => [f[0], String(f[3])])));
  let out, error;
  try {
    out = cfg.run(Object.fromEntries(cfg.fields.map((f) => [f[0], parse(f, vals[f[0]])])));
  } catch (e) {
    error = e.message;
  }
  return (
    <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold">{cfg.title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {cfg.fields.map(([key, label, type, , options]) => (
          <label key={key} className="grid gap-1 text-sm text-mute">
            {label}
            {type === 'select' ? (
              <select value={vals[key]} onChange={(e) => setVals({ ...vals, [key]: e.target.value })} className="min-h-12 rounded-lg border border-line bg-ink px-3 text-base text-text">
                {options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                value={vals[key]}
                onChange={(e) => setVals({ ...vals, [key]: e.target.value })}
                inputMode={type.startsWith('num') ? 'decimal' : type === 'bits' ? 'numeric' : 'text'}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-h-12 rounded-lg border border-line bg-ink px-3 font-mono text-base text-text"
              />
            )}
          </label>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto" aria-live="polite">
        {error ? (
          <p className="text-bad">{error}</p>
        ) : (
          <div className="math-block">
            {out.steps.map((t, i) => (
              <BlockMath key={i} math={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Solvers({ module }) {
  const cfgs = module.solvers.flatMap((id) => SOLVERS[id]);
  if (!cfgs.length) return <p className="rounded-xl border border-line bg-panel p-8 text-center text-mute">This chapter is all theory, with no calculations to solve. Use Flashcards or Quiz to practise it.</p>;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <p className="text-mute">Each solver opens on an example from the slides or notes. Change the numbers to check your own working.</p>
      {cfgs.map((c) => (
        <Solver key={c.title} cfg={c} />
      ))}
    </div>
  );
}
