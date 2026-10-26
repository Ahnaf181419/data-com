// Likely exam questions (flagged in the notes or worked on the slides) with model answers,
// plus the traps that cost marks. Built only from the class slides and notes.

import { likelyScripts } from './answerScripts.js';

const likelyQuestions = [
  {
    module: 'ch5-1',
    flag: 'Notes: "derivation can come in exam"',
    q: 'Derive the maximum and minimum bandwidth of BFSK.',
    answer: [
      'Two carriers: $f_1 = f_c - \\Delta f$, $f_2 = f_c + \\Delta f$, so $f_2 - f_1 = 2\\Delta f$.',
      'Each carrier occupies $(1+d)S$; half of each band lies outside the gap between carriers.',
      '$B_{max} = \\tfrac12(1+d)S + \\tfrac12(1+d)S + 2\\Delta f = (1+d)S + 2\\Delta f$ … (1)',
      'Minimum: the two bands just touch, so $2\\Delta f = \\tfrac12(1+d)S + \\tfrac12(1+d)S = (1+d)S$; with $d = 0$, $r = 1$: $2\\Delta f = S = N$ … (2)',
      'Put (2) into (1) with $d = 0$: $B_{min} = S + S = 2S$.',
    ],
  },
  {
    module: 'ch5-1',
    flag: 'Notes: QPSK "solved by constellation diagram"',
    q: 'Explain how QPSK is implemented and draw its constellation diagram.',
    answer: [
      'A 2/1 converter splits the bit stream (NRZ-L) into two streams: 1st bit and 2nd bit.',
      'The 1st bit multiplies carrier $f_{c1}$ (0°): 1 → 0°, 0 → 180°. The 2nd bit multiplies $f_{c2}$, shifted 90° (quadrature): 1 → 90°, 0 → 270°.',
      'The two BPSK signals are added (Σ), giving 4 signal elements ($L = 4$, $r = 2$).',
      'Results: 00 → −135°, 10 → −45°, 01 → 135°, 11 → 45°, all with amplitude $\\sqrt{V^2 + V^2} = \\sqrt2$ V.',
      'Constellation: X-axis = in-phase (1st bit), Y-axis = quadrature (2nd bit); four points on a circle at 45°, 135°, −135°, −45°.',
    ],
  },
  {
    module: 'ch5-1',
    flag: 'Notes: "QAM → design. Diagram to identify or draw"',
    q: 'Why is QAM used instead of high-order PSK? Identify the constellations of ASK, BPSK, QPSK, 4-QAM and 16-QAM.',
    answer: [
      'In L-PSK all points sit on one circle and differ only in phase. For large L ($n_b = \\log_2 L$, e.g. 256-PSK) the phases are very hard to distinguish — the limitation.',
      'QAM = ASK + PSK: points can share a phase and differ in amplitude, so more bits per signal element.',
      'ASK (OOK): two points on the X-axis, 0 at origin and 1 at +1. BPSK: 0 at −1 and 1 at +1.',
      'QPSK = 4-QAM with polar NRZ: four points at ±45°, ±135°. 4-QAM with unipolar NRZ: four points all in the positive quadrant.',
      '16-QAM: two positive and two negative levels on each carrier → a 4 × 4 grid.',
      'Minimum QAM bandwidth is the same as ASK and PSK: $B = (1+d)S$.',
    ],
  },
  {
    module: 'ch5-1',
    flag: 'Slide examples 5.1–5.7',
    q: 'Find the bandwidth for 12 Mbps QPSK with $d = 0$; and the bit rate for a 100 kHz ASK band with $d = 1$.',
    answer: ['QPSK: $r = 2$, $S = N/r = 6$ Mbaud, $B = (1+0)S = 6$ MHz.', 'ASK: $r = 1$, $B = (1+1)S = 2N$, so $N = 100/2 = 50$ kbps, with $f_c$ at the middle of the band.'],
  },
  {
    module: 'ch5-2',
    flag: 'Notes: "PM: how modulation works, formula"',
    q: 'Explain phase modulation, how it differs from FM, and its bandwidth.',
    answer: [
      'The carrier phase varies with the amplitude of the modulating signal; amplitude and frequency stay constant.',
      'PM is mathematically the same as FM with one difference: in FM the instantaneous frequency change is proportional to the amplitude; in PM it is proportional to the derivative of the amplitude.',
      'Implementation: modulating signal → $d/dt$ → VCO.',
      '$B_{PM} = 2(1+\\beta)B$, with $\\beta = 2$ most often (FM uses $\\beta = 4$).',
    ],
  },
  {
    module: 'ch5-2',
    flag: 'Notes + quiz: station counting',
    q: 'How many AM and FM stations fit in their bands? Find the range and carrier of AM station 3 and FM station 2.',
    answer: [
      'AM: 530–1700 kHz = 1170 kHz; channel $= 2 \\times 5 = 10$ kHz → 117 stations.',
      'AM station n starts at $(n-1)\\times10 + 530$ kHz: station 3 → 550–560 kHz, $f_c = 555$ kHz.',
      'FM: 88–108 MHz = 20 MHz; channel $= 2(1+4)\\times15 = 150$ kHz + 50 kHz guard = 200 kHz → 100 stations (only 50 used at a time).',
      'FM station n starts at $(n-1)\\times200$ kHz + 88 MHz: station 2 → 88.2–88.4 MHz, $f_c = 88.3$ MHz.',
    ],
  },
  {
    module: 'ch6-1',
    flag: 'Notes: "Q. Describe multiplexing technique? Draw diagram"',
    q: 'Describe frequency-division multiplexing with a diagram of the MUX and DEMUX.',
    answer: [
      'FDM is analog; used when the link bandwidth exceeds the combined input bandwidths.',
      'MUX: each input $s_i(t)$ modulates a different carrier $f_{ci}$ → $M_i(t)$; the modulated signals are added into one composite signal.',
      'Channels may be separated by guard bands so they do not overlap.',
      'DEMUX: bandpass filters split the composite; demodulators remove the carriers: $M_i(t) - f_{ci} = s_i(t)$.',
      'Draw: inputs → modulators ($f_1, f_2, f_3$) → Σ → link → filters → demodulators → outputs.',
    ],
  },
  {
    module: 'ch6-1',
    flag: 'Notes: Quiz-3 type',
    q: 'Each channel carries 16 kbps in a 4 kHz voice band; guard band 1 kHz; spectrum starts at 50 kHz. Find the modulation and the bandwidth up to the jumbo group.',
    answer: [
      '$B = N/r \\Rightarrow r = 16/4 = 4$ bits/element, $L = 2^4 = 16$ → 16-QAM.',
      'Groups/supergroup = 60/12 = 5; supergroups/master = 600/60 = 10; masters/jumbo = 3600/600 = 6.',
      '$n$ units need $n-1$ guard bands: 11, 4, 9, 5.',
      'Group $= 12\\times4 + 11 = 59$ kHz (50–109 kHz); supergroup $= 5\\times59 + 4 = 299$ kHz; master $= 10\\times299 + 9 = 2999$ kHz; jumbo $= 6\\times2999 + 5 = 17999$ kHz.',
      'The two notes add guard bands differently — show your method clearly.',
    ],
  },
  {
    module: 'ch6-2',
    flag: 'Slide example 6.10',
    q: 'Four sources each send 250 8-bit characters/s, one character per slot, 1 sync bit per frame. Find all rates and sizes.',
    answer: [
      'Source rate $= 250\\times8 = 2$ kbps; character (and frame) duration $= 1/250$ s $= 4$ ms.',
      'Frame rate = 250 frames/s; frame $= 4\\times8 + 1 = 33$ bits.',
      'Link rate $= 250 \\times 33 = 8250$ bps; overhead $= 8250 - 8000 = 250$ bps.',
    ],
  },
  {
    module: 'ch6-2',
    flag: 'Slides + notes',
    q: 'Explain the three data rate management techniques, with an example of each.',
    answer: [
      'Multilevel multiplexing: when rates are multiples. Two 20 kbps lines → 40 kbps, then with three 40 kbps lines → 160 kbps.',
      'Multiple-slot allocation: give a faster line more slots. A 50 kbps line → serial-to-parallel → two 25 kbps slots (125 kbps output).',
      'Pulse stuffing (bit padding): rates are not multiples, so add dummy bits to slower lines. 46 kbps → 50 kbps.',
    ],
  },
  {
    module: 'ch6-2',
    flag: 'Slides',
    q: 'Compare synchronous and statistical TDM.',
    answer: [
      'Synchronous: every input has a reserved slot even when idle (wasted bandwidth); no addressing; needs sync bits; link capacity = sum of inputs.',
      'Statistical: slots are given only to lines with data (round robin); each slot carries the destination address ($n = \\log_2 N$ bits); no sync bits; link capacity is less than the sum, based on load statistics.',
      'Slot size: the data-to-address ratio must be reasonable (1 data bit with a 3-bit address = 300% overhead).',
    ],
  },
  {
    module: 'pcm',
    flag: 'Notes',
    q: 'Show how 24 voice channels become a 1.544 Mbps T-1 line, including the overhead.',
    answer: [
      'Sampling: $f_s = 2f_h = 2\\times4$ k $= 8000$ samples/s. Quantization: $n_b = 64000/8000 = 8$ bits, $L = 256$.',
      '$24 \\times 64 = 1536$ kbps; table says 1544 kbps, so overhead = 8 kbps.',
      'Frame without overhead $= 24\\times8 = 192$ bits; frame rate $= 1536\\text{k}/192 = 8000$/s; overhead bits/frame $= 8\\text{k}/8\\text{k} = 1$.',
      'Frame $= 193$ bits; $193 \\times 8000 = 1.544$ Mbps.',
    ],
  },
  {
    module: 'ch7-1',
    flag: 'Slides',
    q: 'Compare twisted-pair, coaxial and fiber-optic cable.',
    answer: [
      'Twisted pair: cheap, flexible, easy; but noise-prone, repeaters every 5–6 km (analog) / 2–3 km (digital), low bandwidth. Used in telephone, DSL, 10/100Base-T.',
      'Coax: higher bandwidth (400–600 MHz, 10,800 voice calls), less interference, easy to tap; more expensive, thick cable hard to handle. Used in cable TV, Thin/Thick Ethernet.',
      'Fiber: highest bandwidth, low attenuation, EMI immune, corrosion resistant, light, hard to tap; but needs expertise, unidirectional, costly. Used in backbones, hybrid cable TV, 100Base-FX.',
    ],
  },
  {
    module: 'ch7-1',
    flag: 'Slides',
    q: 'Explain the propagation modes of optical fiber.',
    answer: [
      'Fiber guides light by reflection: angle of incidence > critical angle at the core–cladding interface.',
      'Multimode step-index: constant core density; beams take different paths; most distortion.',
      'Multimode graded-index: density highest at centre, decreasing to edge; beams bend smoothly; less distortion.',
      'Single mode: step-index, focused source, small diameter, critical angle near 90°; beams almost horizontal; almost no distortion.',
    ],
  },
  {
    module: 'ch7-2',
    flag: 'Slide example',
    q: 'A 2 m parabolic dish operates at 12 GHz. Find its effective area and gain in dB.',
    answer: ['$A = \\pi(1)^2 = \\pi$ m², $A_e = 0.56A \\approx 1.76$ m².', '$\\lambda = c/f = 0.025$ m.', '$G = 7A/\\lambda^2 = 35{,}186$; $G_{dB} = 10\\log_{10}G = 45.46$ dB.'],
  },
  {
    module: 'ch7-2',
    flag: 'Slide examples + problems',
    q: 'Find the LOS distance for antennas of 100 m and 0 m; and the transmitter height to reach 41 km if the receiver is 10 m high.',
    answer: ['$d_{max} = 3.57(\\sqrt{Kh_1} + \\sqrt{Kh_2})$, $K = 4/3$.', '$3.57\\sqrt{133.3} \\approx 41$ km.', '$\\sqrt{Kh_1} = 41/3.57 - \\sqrt{13.33} = 7.84$ → $h_1 = 7.84^2/1.33 \\approx 46.2$ m.'],
  },
  {
    module: 'ch8',
    flag: 'Slides + notes',
    q: 'Explain the three phases of circuit switching and its delay.',
    answer: [
      'Setup: reserve channels/resources using end-to-end addresses. Delay = request + acknowledgment $= 2P_d + 2T_d$.',
      'Data transfer: data flows on the dedicated circuit, not packetized, no addressing ($P_d + T_d$).',
      'Teardown: a signal releases resources at each switch ($P_d + T_d$).',
      'Example: $D = 5000$ km, $S = 2\\times10^8$ m/s → $P_d = 25$ ms; $L = 1000$ bits at 1 Mbps → $T_d = 1$ ms.',
    ],
  },
  {
    module: 'ch8',
    flag: 'Slides',
    q: 'Compare datagram and virtual-circuit networks.',
    answer: [
      'Datagram: network layer, connectionless, no setup/teardown, each packet independent (may take different paths, arrive out of order), routing table by destination address. Delay $= 3T + 3\\tau + w_1 + w_2$.',
      'Virtual circuit: data-link layer, setup and teardown phases, all packets follow one path, switching by VCI tables (global address only for setup). Delay $= 3T + 3\\tau$ + setup + teardown.',
    ],
  },
  {
    module: 'ch8',
    flag: 'Notes: "Design the switch in multistage, following Clos criterion, for 200 × 200"',
    q: 'Design a non-blocking 200 × 200 multistage switch using the Clos criterion and compare with a crossbar.',
    answer: [
      'Crossbar: $200 \\times 200 = 40{,}000$ crosspoints.',
      '$n = \\sqrt{N/2} = 10$, $k = 2n - 1 = 19$.',
      'Stage 1: $N/n = 20$ crossbars of 10 × 19 → 3800. Stage 2: 19 crossbars of 20 × 20 → 7600. Stage 3: 20 of 19 × 10 → 3800.',
      'Total = 15,200 crosspoints (38% of the crossbar), non-blocking.',
      'Compare: n = 20, k = 4 gives only 2000 (5%) but is blocking.',
    ],
  },
  {
    module: 'ch10',
    flag: 'Notes: exam question',
    q: 'What is an error? Name its types. Why does a single-bit error happen in parallel transmission and a burst error in serial?',
    answer: [
      'An error is data corrupted by noise during transmission (0110 sent, 0010 received).',
      'Single-bit error: only one bit changes. Burst error: two or more bits change; length from first to last corrupted bit.',
      'Parallel: each bit has its own wire; one noisy wire corrupts one bit per byte.',
      'Serial: noise usually lasts longer than one bit (1 µs at 1 Mbps), so several consecutive bits are hit.',
    ],
  },
  {
    module: 'ch10',
    flag: 'Slides + notes',
    q: 'Generate and check the CRC for data 1001 with divisor 1011, in binary and polynomial form.',
    answer: [
      'Append 3 zeros: 1001000. Divide modulo-2 by 1011 → quotient 1010, remainder 110.',
      'Codeword 1001110. Receiver: 1001110 ÷ 1011 → remainder 000 → accept.',
      'Polynomial: data $x^3 + 1$, divisor $x^3 + x + 1$; $(x^3+1)x^3 = x^6 + x^3$; remainder $x^2 + x$; codeword $x^6 + x^3 + x^2 + x$.',
    ],
  },
  {
    module: 'ch10',
    flag: 'Slides + notes',
    q: 'Compute the checksum of (7, 11, 12, 0, 6) using 4-bit words and verify it at the receiver.',
    answer: ['Sum = 36 = 100100 → wrap: 0100 + 10 = 0110 = 6.', 'Checksum = complement = 1001 = 9; send (7, 11, 12, 0, 6, 9).', 'Receiver: sum 45 = 101101 → 1101 + 10 = 1111 → complement 0000 → no error.'],
  },
  {
    module: 'ch10',
    flag: 'Slides + notes',
    q: 'Encode 1001101 with Hamming code and correct the received word 10010100101.',
    answer: [
      '$k = 7$: $2^r \\ge k + r + 1$ → $r = 4$, 11 bits; parity at 1, 2, 4, 8.',
      '$r_1$ (1,3,5,7,9,11) = 1, $r_2$ (2,3,6,7,10,11) = 0, $r_4$ (4–7) = 0, $r_8$ (8–11) = 1 → 10011100101.',
      'Receiver recomputes: $r_8 r_4 r_2 r_1 = 0111 = 7$ → flip bit 7 → 10011100101.',
    ],
  },
];

// Each likely question gets the exam-script answer at the same index in answerScripts.js.
export const likely = likelyQuestions.map((q, i) => ({ ...q, script: likelyScripts[i] }));

export const traps = [
  { module: 'ch5-1', text: '$r$ is bits per **signal element**, and $S = N/r$, so the baud rate is never above the bit rate.' },
  { module: 'ch5-1', text: '$d = 0$ gives the **minimum** bandwidth and $d = 1$ the **maximum**. Read which one the question wants.' },
  { module: 'ch5-1', text: 'BFSK minimum: $2\\Delta f = S$, so $B_{min} = 2S$, not $S$. MFSK minimum is $L \\times S$.' },
  { module: 'ch5-1', text: 'BASK uses **unipolar** NRZ; BPSK uses **polar** NRZ.' },
  { module: 'ch5-1', text: 'ASK can reach $B_{min} = N$, but FSK cannot: its carriers must be at least $S$ apart, so $B_{min} = 2S$ (Spring 2025 Q1b).' },
  { module: 'ch6-2', text: 'Multilevel TDM combines slower lines first (six 200 kbps → three 400 kbps); multiple-slot TDM gives a fast line extra slots. Don’t mix them up (Fall 2024 Q3c vs Spring 2025 Q3d).' },
  { module: 'ch5-2', text: 'FM: 100 possible stations in 88–108 MHz, but only **50** operate at once in an area. AM: 117 stations.' },
  { module: 'ch5-2', text: 'β is 4 for FM but 2 for PM.' },
  { module: 'ch6-1', text: '$n$ channels need $n - 1$ guard bands, not $n$.' },
  { module: 'ch6-1', text: 'Digital inputs to FDM must first be converted to analog (e.g. QAM). Then $r = N/B$.' },
  { module: 'ch6-2', text: 'Frame duration equals the **input** slot duration, not the output slot. Output slot = $T/n$.' },
  { module: 'ch6-2', text: 'Sync bits add overhead: the link rate goes up (Ex 6.10: 8000 → 8250 bps).' },
  { module: 'ch6-2', text: 'DS-3 shows 44.376 Mbps in the slide text but 44.736 Mbps in the table and notes. Quote the source you use.' },
  { module: 'pcm', text: 'Nyquist: $f_s = 2f_h$ (highest frequency), not twice the bandwidth of an arbitrary band.' },
  { module: 'ch7-2', text: 'In LOS formulas, $h$ is in **metres** and $d$ is in **kilometres**; $K = 4/3$ only for radio LOS.' },
  { module: 'ch8', text: 'Layers: circuit = physical, virtual circuit = data link, datagram = network.' },
  { module: 'ch8', text: 'Clos: $k = 2n - 1$ middle switches and $n = \\sqrt{N/2}$. Fewer middle switches → blocking.' },
  { module: 'ch10', text: 'VRC catches any **odd** number of flipped bits but misses an even number.' },
  { module: 'ch10', text: 'CRC: append (divisor bits − 1) zeros, and use an all-zero divisor when the leading bit is 0.' },
  { module: 'ch10', text: 'Checksum: wrap every carry back in **before** complementing; the receiver accepts only a zero result.' },
  { module: 'ch10', text: 'Hamming syndrome is read as $r_8 r_4 r_2 r_1$, highest first, to get the error position.' },
];
