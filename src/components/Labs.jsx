import { useState } from 'react';
import { InlineMath } from 'react-katex';
import { fdmLink, hammingEncode, hammingCheck, blockCode4B5B, diffManchester } from '../lib/solvers.js';

export function LabFrame({ title, hint, children }) {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-line bg-panel font-sans">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-3">
        <span className="font-semibold text-text">{title}</span>
        <span className="text-xs font-medium text-gold">Interactive</span>
      </figcaption>
      <div className="p-5">{children}</div>
      {hint && <p className="border-t border-line px-5 py-3 text-sm leading-relaxed text-ash">{hint}</p>}
    </figure>
  );
}

function Seg({ value, options, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-ink p-1">
      {options.map((o) => (
        <button
          key={o}
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`press min-h-10 rounded-lg px-3.5 text-sm font-medium ${value === o ? 'bg-gold text-ink' : 'text-ash'}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function BitToggles({ bits, setBits, max = 12 }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {[...bits].map((b, i) => (
        <button
          key={i}
          onClick={() => setBits(bits.slice(0, i) + (b === '1' ? '0' : '1') + bits.slice(i + 1))}
          aria-label={`Bit ${i + 1} is ${b}, tap to flip`}
          className={`press size-10 rounded-lg border font-mono text-lg ${b === '1' ? 'border-gold/60 bg-gold/15 text-gold' : 'border-line text-ash'}`}
        >
          {b}
        </button>
      ))}
      <button onClick={() => bits.length < max && setBits(bits + '0')} disabled={bits.length >= max} aria-label="Add a bit" className="press size-10 rounded-lg border border-dashed border-line text-ash disabled:opacity-30">
        +
      </button>
      <button onClick={() => bits.length > 2 && setBits(bits.slice(0, -1))} disabled={bits.length <= 2} aria-label="Remove last bit" className="press size-10 rounded-lg border border-dashed border-line text-ash disabled:opacity-30">
        −
      </button>
    </div>
  );
}

const path = (n, fx, fy) => {
  let d = '';
  for (let i = 0; i <= n; i++) d += `${i ? 'L' : 'M'}${fx(i).toFixed(1)} ${fy(i).toFixed(1)}`;
  return d;
};

// ---------- Digital-to-analog modulation ----------
const QPSK_PHASE = { '00': -135, '10': -45, '01': 135, '11': 45 };

export function ModulationLab() {
  const [bits, setBits] = useState('10110010');
  const [scheme, setScheme] = useState('ASK');
  const [play, setPlay] = useState(false);
  const W = 640;
  const sym = scheme === 'QPSK' ? (bits.length % 2 ? bits + '0' : bits).match(/../g) : [...bits];
  const n = sym.length;
  const sw = W / n;

  // carrier value at x (0..W), with continuous phase for FSK
  let fskPhase = 0;
  const samples = [];
  const N = 900;
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W;
    const k = Math.min(n - 1, Math.floor(x / sw));
    const s = sym[k];
    const t = x / sw; // time in symbol units
    let y;
    if (scheme === 'ASK') y = (s === '1' ? 1 : 0) * Math.sin(2 * Math.PI * 3 * t);
    else if (scheme === 'BPSK') y = Math.sin(2 * Math.PI * 3 * t + (s === '1' ? 0 : Math.PI));
    else if (scheme === 'QPSK') y = Math.sin(2 * Math.PI * 3 * t + (QPSK_PHASE[s] * Math.PI) / 180);
    else {
      fskPhase += (2 * Math.PI * (s === '1' ? 5 : 2) * (W / N)) / sw;
      y = Math.sin(fskPhase);
    }
    samples.push(y);
  }
  const digital = (i) => {
    const x = (i / N) * W;
    const s = sym[Math.min(n - 1, Math.floor(x / sw))];
    const one = scheme === 'QPSK' ? s[0] === '1' : s === '1';
    return one ? 8 : 52;
  };
  const info = {
    ASK: ['Unipolar NRZ × carrier: 1 keeps the carrier, 0 makes it zero.', 'r = 1,\\ S = N,\\ B = (1+d)S'],
    BFSK: ['Coherent BFSK: 1 → higher frequency $f_2$, 0 → lower frequency $f_1$; the phase stays continuous.', 'B = (1+d)S + 2\\Delta f'],
    BPSK: ['Polar NRZ × carrier: 1 starts at 0°, 0 starts at 180°. Amplitude and frequency stay the same.', 'r = 1,\\ B = (1+d)S'],
    QPSK: ['Bits go in pairs: 00 → −135°, 10 → −45°, 01 → 135°, 11 → 45°. Half as many signal elements.', 'r = 2,\\ S = N/2'],
  }[scheme];

  return (
    <LabFrame title="Modulation lab" hint="Tap bits to flip them. Watch which carrier property changes: amplitude (ASK), frequency (FSK) or phase (PSK/QPSK).">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Seg label="Scheme" value={scheme} options={['ASK', 'BFSK', 'BPSK', 'QPSK']} onChange={setScheme} />
        <button onClick={() => setPlay(!play)} aria-pressed={play} className="press min-h-10 rounded-xl border border-line px-4 text-sm text-ash">
          {play ? 'Stop playhead' : 'Play playhead'}
        </button>
      </div>
      <BitToggles bits={bits} setBits={setBits} />
      <div className="relative mt-4">
        <svg viewBox={`0 -6 ${W} 200`} className="w-full" role="img" aria-label={`${scheme} waveform for bits ${bits}`}>
          {sym.map((s, i) => (
            <g key={i}>
              <line x1={i * sw} x2={i * sw} y1="-6" y2="194" stroke="var(--color-line)" strokeDasharray="3 4" />
              <text x={i * sw + sw / 2} y="74" textAnchor="middle" fontSize="13" fill="var(--color-ash)" fontFamily="var(--font-mono)">
                {s}
              </text>
            </g>
          ))}
          <path d={path(N, (i) => (i / N) * W, digital)} fill="none" stroke="var(--color-ash)" strokeWidth="1.5" />
          <line x1="0" x2={W} y1="140" y2="140" stroke="var(--color-line)" />
          <path d={path(N, (i) => (i / N) * W, (i) => 140 - samples[i] * 46)} fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        {play && <div className="playhead pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-red/80" style={{ '--w': 'calc(100% - 2px)', '--dur': `${n * 0.9}s` }} />}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-ash">
        <span>
          {bits.length} bits → {n} signal elements
        </span>
        <InlineMath math={info[1]} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text/85">{info[0].split('$').map((p, i) => (i % 2 ? <InlineMath key={i} math={p} /> : p))}</p>
    </LabFrame>
  );
}

// ---------- Analog-to-analog ----------
export function AnalogLab() {
  const [type, setType] = useState('AM');
  const W = 640, N = 900;
  const m = (t) => Math.sin(2 * Math.PI * 1.5 * t);
  const fc = 14;
  let phase = 0;
  const out = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    if (type === 'AM') out.push((0.55 + 0.4 * m(t)) * Math.sin(2 * Math.PI * fc * t));
    else if (type === 'FM') {
      phase += (2 * Math.PI * (fc + 8 * m(t))) / N;
      out.push(Math.sin(phase));
    } else out.push(Math.sin(2 * Math.PI * fc * t + 2.2 * m(t)));
  }
  const text = {
    AM: ['The amplitude follows the message; the message becomes the envelope.', 'B_{AM} = 2B'],
    FM: ['The frequency follows the message amplitude: positive → higher, negative → lower.', 'B_{FM} = 2(1+\\beta)B,\\ \\beta = 4'],
    PM: ['The phase follows the message; frequency change ∝ derivative of the amplitude.', 'B_{PM} = 2(1+\\beta)B,\\ \\beta = 2'],
  }[type];
  return (
    <LabFrame title="AM, FM and PM side by side" hint="The ash line is the modulating (message) signal; gold is the transmitted carrier.">
      <Seg label="Modulation" value={type} options={['AM', 'FM', 'PM']} onChange={setType} />
      <svg viewBox="0 0 640 190" className="mt-4 w-full" role="img" aria-label={`${type} modulated carrier`}>
        <line x1="0" x2={W} y1="40" y2="40" stroke="var(--color-line)" />
        <path d={path(N, (i) => (i / N) * W, (i) => 40 - m(i / N) * 30)} fill="none" stroke="var(--color-ash)" strokeWidth="1.5" />
        <line x1="0" x2={W} y1="135" y2="135" stroke="var(--color-line)" />
        <path d={path(N, (i) => (i / N) * W, (i) => 135 - out[i] * 48)} fill="none" stroke="var(--color-gold)" strokeWidth="1.8" />
      </svg>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-text/85">{text[0]}</span>
        <InlineMath math={text[1]} />
      </div>
    </LabFrame>
  );
}

// ---------- FDM spectrum ----------
export function FdmLab() {
  const [n, setN] = useState(5);
  const [bw, setBw] = useState(100);
  const [g, setG] = useState(10);
  const total = fdmLink({ n, bw, guard: g }).result.B;
  const W = 640;
  const sc = W / total;
  return (
    <LabFrame title="FDM spectrum builder" hint="Gold blocks are channels, red strips are guard bands. n channels always need n − 1 guard bands.">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ['Channels n', n, setN, 2, 8, 1],
          ['Channel BW (kHz)', bw, setBw, 4, 200, 4],
          ['Guard band (kHz)', g, setG, 0, 50, 1],
        ].map(([l, v, set, min, max, step]) => (
          <label key={l} className="grid gap-1 text-sm text-ash">
            <span className="flex justify-between">
              {l} <span className="font-mono text-text">{v}</span>
            </span>
            <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} className="h-10 accent-[var(--color-gold)]" />
          </label>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} 74`} className="mt-4 w-full" role="img" aria-label={`${n} channels of ${bw} kHz with ${g} kHz guard bands, total ${total} kHz`}>
        {Array.from({ length: n }, (_, i) => {
          const x = i * (bw + g) * sc;
          return (
            <g key={i}>
              <rect x={x} y="8" width={bw * sc} height="40" rx="5" fill="rgb(240 195 90 / 0.22)" stroke="var(--color-gold)" />
              <text x={x + (bw * sc) / 2} y="33" textAnchor="middle" fontSize="13" fill="var(--color-text)">
                {i + 1}
              </text>
              {i < n - 1 && g > 0 && <rect x={x + bw * sc} y="8" width={g * sc} height="40" fill="rgb(232 88 74 / 0.35)" />}
            </g>
          );
        })}
        <line x1="0" x2={W} y1="62" y2="62" stroke="var(--color-ash)" />
        <text x="0" y="74" fontSize="11" fill="var(--color-ash)">
          0
        </text>
        <text x={W} y="74" fontSize="11" fill="var(--color-ash)" textAnchor="end">
          {total} kHz
        </text>
      </svg>
      <p className="mt-3 text-center text-[1.05rem]">
        <InlineMath math={`B = ${n}\\times${bw} + ${n - 1}\\times${g} = ${total}\\text{ kHz}`} />
      </p>
    </LabFrame>
  );
}

// ---------- TDM frame builder ----------
const LINES = ['A', 'B', 'C', 'D'];
export function TdmLab({ mode: initial = 'sync' }) {
  const [mode, setMode] = useState(initial === 'stat' ? 'Statistical' : 'Synchronous');
  const [data, setData] = useState(['1111', '1010', '0110', '0001']);
  const toggle = (l, t) => setData(data.map((row, i) => (i === l ? row.slice(0, t) + (row[t] === '1' ? '0' : '1') + row.slice(t + 1) : row)));
  const T = 4;
  let frames;
  if (mode === 'Synchronous') frames = Array.from({ length: T }, (_, t) => LINES.map((L, l) => (data[l][t] === '1' ? `${L}${t + 1}` : null)));
  else {
    const queue = [];
    for (let t = 0; t < T; t++) LINES.forEach((L, l) => data[l][t] === '1' && queue.push(`${L}${t + 1}`));
    const slots = 3;
    frames = [];
    for (let i = 0; i < queue.length; i += slots) frames.push(queue.slice(i, i + slots));
  }
  const used = data.join('').split('').filter((b) => b === '1').length;
  const slotsSent = frames.reduce((a, f) => a + f.length, 0);
  return (
    <LabFrame title="TDM frame builder" hint="Tap a unit to give that line data or make it idle. Synchronous TDM keeps a slot for every line (wasted when empty); statistical TDM sends only units with data and tags each with its line address.">
      <Seg label="TDM type" value={mode} options={['Synchronous', 'Statistical']} onChange={setMode} />
      <div className="mt-4 grid gap-2">
        {LINES.map((L, l) => (
          <div key={L} className="flex items-center gap-2">
            <span className="w-14 text-sm text-ash">Line {L}</span>
            {Array.from({ length: T }, (_, t) => (
              <button
                key={t}
                onClick={() => toggle(l, t)}
                aria-label={`Line ${L} unit ${t + 1}: ${data[l][t] === '1' ? 'has data' : 'idle'}`}
                className={`press h-10 flex-1 rounded-lg border font-mono text-sm ${data[l][t] === '1' ? 'border-gold/60 bg-gold/15 text-gold' : 'border-dashed border-line text-ash/50'}`}
              >
                {data[l][t] === '1' ? `${L}${t + 1}` : 'idle'}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="mb-2 mt-5 text-sm text-ash">Output on the link</p>
      <div className="flex flex-wrap gap-3">
        {frames.map((f, i) => (
          <div key={`${mode}-${i}`} className="enter flex items-stretch gap-1 rounded-xl border border-line bg-ink p-1.5" style={{ animationDelay: `${i * 60}ms` }}>
            {mode === 'Synchronous' && (
              <span title="Sync bit" className="grid w-6 place-items-center rounded-md bg-red/20 font-mono text-xs text-red">
                {i % 2 ? 0 : 1}
              </span>
            )}
            {f.map((u, j) => (
              <span key={j} className={`grid min-w-12 place-items-center rounded-md px-2 py-1.5 font-mono text-sm ${u ? 'bg-gold/15 text-gold' : 'border border-dashed border-red/40 text-red/70'}`}>
                {u ? (mode === 'Statistical' ? <span>{u}<sub className="ml-0.5 text-[0.65rem] text-ash">→{u[0]}</sub></span> : u) : 'empty'}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-text/85">
        {mode === 'Synchronous'
          ? `${frames.length} frames × ${LINES.length} slots = ${frames.length * LINES.length} slots for ${used} units of data; ${frames.length * LINES.length - used} slots wasted. Sync bits alternate 1, 0, 1, 0.`
          : `${slotsSent} slots in ${frames.length} frames of up to 3 slots (fewer slots than the 4 lines). No slot is wasted, and no sync bits are needed, but every slot carries an address.`}
      </p>
    </LabFrame>
  );
}

// ---------- CRC long division ----------
function divideSteps(dividend, divisor) {
  const n = divisor.length;
  const steps = [];
  let cur = dividend.slice(0, n);
  let q = '';
  for (let i = 0; i + n <= dividend.length; i++) {
    const use = cur[0] === '1' ? divisor : '0'.repeat(n);
    q += cur[0];
    const x = [...cur].map((b, j) => (b === use[j] ? '0' : '1')).join('');
    steps.push({ i, cur, use, x });
    cur = x.slice(1) + (dividend[i + n] ?? '');
  }
  return { steps, q, rem: cur };
}

export function CrcLab() {
  const [side, setSide] = useState('Sender');
  const [data, setData] = useState('1001');
  const [div, setDiv] = useState('1011');
  const [shown, setShown] = useState(0);
  const valid = /^[01]+$/.test(data) && /^1[01]+$/.test(div);
  const dividend = valid ? (side === 'Sender' ? data + '0'.repeat(div.length - 1) : data) : '';
  const { steps, q, rem } = valid && dividend.length >= div.length ? divideSteps(dividend, div) : { steps: [], q: '', rem: '' };
  const k = Math.min(shown, steps.length);
  const done = k === steps.length && steps.length > 0;
  const reset = (fn) => (v) => (fn(v), setShown(0));
  const pad = (s, i) => ' '.repeat(i) + s;
  return (
    <LabFrame title="CRC long division, step by step" hint="Each step XORs the divisor (or 0000 when the leading bit is 0) and brings down the next bit, exactly like the handwritten method.">
      <div className="flex flex-wrap items-end gap-3">
        <Seg label="Side" value={side} options={['Sender', 'Receiver']} onChange={reset(setSide)} />
        <label className="grid gap-1 text-sm text-ash">
          {side === 'Sender' ? 'Dataword' : 'Received codeword'}
          <input value={data} onChange={(e) => reset(setData)(e.target.value.trim())} inputMode="numeric" className="min-h-11 w-40 rounded-lg border border-line bg-ink px-3 font-mono text-base text-text" />
        </label>
        <label className="grid gap-1 text-sm text-ash">
          Divisor
          <input value={div} onChange={(e) => reset(setDiv)(e.target.value.trim())} inputMode="numeric" className="min-h-11 w-28 rounded-lg border border-line bg-ink px-3 font-mono text-base text-text" />
        </label>
      </div>
      {!valid ? (
        <p className="mt-4 text-red">Use only 0 and 1; the divisor must start with 1 and have at least 2 bits.</p>
      ) : (
        <>
          <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-[1.05rem] leading-7 text-text">
            <span className="text-ash">{pad(q.slice(0, k), 2 * div.length + 2)}</span>
            {'\n'}
            <span className="text-ash">{div} ) </span>
            {dividend}
            {steps.slice(0, k).map((s) => (
              <span key={s.i}>
                {'\n'}
                <span className={s.use[0] === '1' ? 'text-gold' : 'text-ash'}>{pad(s.use, s.i + div.length + 3)}</span>
                {'\n'}
                {pad('─'.repeat(div.length), s.i + div.length + 3)}
                {'\n'}
                {pad(s.x.slice(1) + (dividend[s.i + div.length] ?? ''), s.i + 1 + div.length + 3)}
              </span>
            ))}
          </pre>
          {done && (
            <p className="enter mt-3 rounded-lg bg-gold/10 px-4 py-3">
              {side === 'Sender' ? (
                <>
                  Remainder <b className="font-mono text-gold">{rem}</b> → codeword <b className="font-mono">{data}<span className="text-gold">{rem}</span></b>
                </>
              ) : rem.includes('1') ? (
                <span className="text-red">Syndrome {rem} is not zero → error, discard.</span>
              ) : (
                <>Syndrome {rem} → no error, accept.</>
              )}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            {!done && (
              <button onClick={() => setShown(k + 1)} className="press min-h-11 rounded-xl bg-gold px-5 font-semibold text-ink">
                {k === 0 ? 'Start dividing' : 'Next step'}
              </button>
            )}
            {!done && (
              <button onClick={() => setShown(steps.length)} className="press min-h-11 rounded-xl border border-line px-5 text-ash">
                Show all
              </button>
            )}
            {k > 0 && (
              <button onClick={() => setShown(0)} className="press min-h-11 rounded-xl border border-line px-5 text-ash">
                Reset
              </button>
            )}
          </div>
        </>
      )}
    </LabFrame>
  );
}

// ---------- Hamming grid ----------
export function HammingLab() {
  const [data, setData] = useState('1001101');
  const [focus, setFocus] = useState(1);
  const [flip, setFlip] = useState(0);
  const enc = hammingEncode(data).result;
  const n = enc.codeword.length;
  const received = flip ? [...enc.codeword].map((b, i) => (n - i === flip ? (b === '1' ? '0' : '1') : b)).join('') : enc.codeword;
  const chk = hammingCheck(received).result;
  const parities = Array.from({ length: enc.r }, (_, i) => 2 ** i);
  const covers = (p) => (pos) => (pos & p) !== 0;
  return (
    <LabFrame title="Hamming code grid" hint="Pick a parity bit to see which positions it checks. Then tap any bit to corrupt it; the receiver’s syndrome points straight at it.">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-ash">Data</span>
        <BitToggles bits={data} setBits={(b) => (setData(b), setFlip(0))} max={11} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-ash">Show coverage of</span>
        {parities.map((p) => (
          <button key={p} onClick={() => setFocus(p)} aria-pressed={focus === p} className={`press min-h-10 rounded-lg px-3 text-sm ${focus === p ? 'bg-gold text-ink' : 'border border-line text-ash'}`}>
            <InlineMath math={`r_{${p}}`} />
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <div className="flex min-w-max gap-1.5">
          {[...received].map((b, i) => {
            const pos = n - i;
            const isP = (pos & (pos - 1)) === 0;
            const inCover = covers(focus)(pos);
            return (
              <button
                key={pos}
                onClick={() => setFlip(flip === pos ? 0 : pos)}
                aria-label={`Position ${pos}, ${isP ? 'parity' : 'data'} bit ${b}${flip === pos ? ', corrupted' : ''}`}
                className={`press grid w-12 gap-0.5 rounded-lg border py-1.5 text-center ${flip === pos ? 'border-red bg-red/15' : inCover ? 'border-gold/70 bg-gold/10' : 'border-line'}`}
              >
                <span className="text-[0.7rem] text-ash">{isP ? `r${pos}` : `b${pos}`}</span>
                <span className={`font-mono text-lg ${isP ? 'text-gold' : 'text-text'}`}>{b}</span>
                <span className="text-[0.7rem] text-ash/70">{pos}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 grid gap-1 text-[1.02rem]">
        <p>
          <InlineMath math={`r_{${focus}}\\text{ checks positions } ${Array.from({ length: n }, (_, i) => i + 1).filter(covers(focus)).join(', ')}`} />
        </p>
        <p>
          Sent codeword: <span className="font-mono text-gold">{enc.codeword}</span>
        </p>
        <p className={chk.pos ? 'text-red' : 'text-text/85'}>
          {chk.pos ? `Receiver syndrome ${[...parities].reverse().map((p) => `r${p}`).join(' ')} = ${chk.pos.toString(2).padStart(enc.r, '0')} = ${chk.pos} → flip bit ${chk.pos} to correct.` : `Receiver syndrome = ${'0'.repeat(enc.r)} → no error. Tap a bit above to corrupt it.`}
        </p>
      </div>
    </LabFrame>
  );
}

// ---------- 4B/5B + differential Manchester (flagged past-paper topic) ----------
export function CodingLab() {
  const [input, setInput] = useState('010100010011000000010010');
  const [startHigh, setStartHigh] = useState(true);
  const [count, setCount] = useState(8);
  const clean = input.replace(/\s/g, '');
  let coded, err;
  try {
    if (!/^[01]+$/.test(clean)) throw new Error('Use only 0 and 1.');
    coded = blockCode4B5B(clean).result;
  } catch (e) {
    err = e.message;
  }
  const bits = coded ? coded.stream.slice(0, count) : '';
  const halves = diffManchester(bits, startHigh);
  const W = 640, bw = W / Math.max(1, bits.length), hi = 18, lo = 78;
  let d = `M0 ${startHigh ? hi : lo}`;
  halves.forEach(([a, b], i) => {
    const x = i * bw;
    d += ` L${x} ${a ? hi : lo} L${x + bw / 2} ${a ? hi : lo} L${x + bw / 2} ${b ? hi : lo} L${x + bw} ${b ? hi : lo}`;
  });
  return (
    <LabFrame title="4B/5B then differential Manchester" hint="Red ticks mark a transition at the start of a bit (that bit is 0). The middle of every bit always has a transition.">
      <label className="grid gap-1 text-sm text-ash">
        Data stream (multiple of 4 bits)
        <input value={input} onChange={(e) => setInput(e.target.value)} inputMode="numeric" className="min-h-11 rounded-lg border border-line bg-ink px-3 font-mono text-base text-text" />
      </label>
      {err ? (
        <p className="mt-3 text-red">{err}</p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-sm">
            {coded.groups.map((g, i) => (
              <span key={i} className="rounded-lg border border-line bg-ink px-2.5 py-1.5">
                <span className="text-ash">{g}</span> → <span className="text-gold">{coded.out[i]}</span>
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ash">
            <Seg label="Starting level" value={startHigh ? 'Start high' : 'Start low'} options={['Start high', 'Start low']} onChange={(v) => setStartHigh(v === 'Start high')} />
            <label className="flex items-center gap-2">
              Draw first
              <input type="number" min="2" max="30" value={count} onChange={(e) => setCount(Math.max(2, Math.min(30, +e.target.value || 2)))} className="min-h-10 w-16 rounded-lg border border-line bg-ink px-2 text-base text-text" />
              bits
            </label>
          </div>
          <svg viewBox={`0 -4 ${W} 112`} className="mt-4 w-full" role="img" aria-label={`Differential Manchester signal for ${bits}`}>
            {[...bits].map((b, i) => (
              <g key={i}>
                <line x1={i * bw} x2={i * bw} y1="0" y2="92" stroke="var(--color-line)" strokeDasharray="3 4" />
                <line x1={i * bw + bw / 2} x2={i * bw + bw / 2} y1="10" y2="86" stroke="var(--color-line)" strokeOpacity="0.4" />
                {b === '0' && <line x1={i * bw} x2={i * bw} y1={hi} y2={lo} stroke="var(--color-red)" strokeWidth="3" />}
                <text x={i * bw + bw / 2} y="106" textAnchor="middle" fontSize="13" fill="var(--color-ash)" fontFamily="var(--font-mono)">
                  {b}
                </text>
              </g>
            ))}
            <path d={d} fill="none" stroke="var(--color-gold)" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 break-all font-mono text-sm text-text/85">Output: {coded.stream}</p>
        </>
      )}
    </LabFrame>
  );
}

export const LABS = { modulation: ModulationLab, analog: AnalogLab, fdm: FdmLab, tdm: TdmLab, crc: CrcLab, hamming: HammingLab, coding: CodingLab };
