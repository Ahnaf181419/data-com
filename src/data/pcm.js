export default {
  id: 'pcm',
  chapter: '6.2+',
  title: 'Analog-to-Digital (PCM)',
  wave: 'pcm',
  sources: ['Raiyan notes pp. 51–55', 'Medha notes pp. 1, 23'],
  sections: [
    {
      heading: 'Why PCM appears in TDM',
      blocks: [
        { type: 'p', text: 'TDM only accepts digital input. Voice input lines are analog, so each one is converted with **PCM (pulse code modulation)** before it enters the TDM multiplexer. This is how 24 analog voice lines become one T-1.' },
        { type: 'p', text: 'PCM has three steps: **sampling**, **quantization**, **encoding**.' },
      ],
    },
    {
      heading: '1. Sampling (Nyquist)',
      blocks: [
        { type: 'p', text: 'By the Nyquist theorem, the sampling rate is twice the highest frequency of the signal.' },
        { type: 'math', tex: 'f_s = 2 \\times f_h' },
        { type: 'p', text: 'Voice bandwidth is 0–4 kHz, so $f_h = 4$ kHz and $f_s = 2 \\times 4\\text{ k} = 8000$ samples/s.' },
      ],
    },
    {
      heading: '2. Quantization',
      blocks: [
        { type: 'p', text: 'Find the number of bits per sample and the number of levels.' },
        { type: 'math', tex: 'N = f_s \\times n_b \\qquad n_b = \\frac{N}{f_s} \\qquad L = 2^{n_b}' },
        { type: 'p', text: 'For a 64 kbps DS-0 channel: $n_b = 64\\text{ kbps} / 8000 = 8$ bits/sample and $L = 2^8 = 256$ levels.' },
      ],
    },
    {
      heading: 'PCM bandwidth',
      blocks: [
        { type: 'p', text: 'From Medha’s notes, for NRZ ($r = 1$, $c = \\frac12$):' },
        { type: 'math', tex: 'B_{min} = c \\times N \\times \\frac1r = \\frac12 \\times f_s \\times n_b = \\frac{f_s \\times n_b}{2}' },
      ],
    },
    {
      heading: 'The full T-1 chain',
      blocks: [
        { type: 'p', text: '24 voice channels (4 kHz each) → PCM (8000 samples/s × 8 bits = 64 kbps each) → TDM → T-1 at 1.544 Mbps = 24 × 64 kbps + 8 kbps overhead.' },
        { type: 'note', text: '$1544/24 = 64.33$ kbps per channel. The fraction above 64 is the overhead.' },
      ],
    },
  ],
  formulas: [
    { label: 'Nyquist sampling rate', tex: 'f_s = 2f_h', where: 'f_h highest frequency' },
    { label: 'PCM bit rate', tex: 'N = f_s \\times n_b', where: 'n_b bits per sample' },
    { label: 'Quantization levels', tex: 'L = 2^{n_b}', where: '' },
    { label: 'PCM minimum bandwidth (NRZ)', tex: 'B_{min} = \\frac{f_s\\, n_b}{2}', where: 'c = 1/2, r = 1' },
  ],
  examples: [
    { title: 'Voice to DS-0', source: 'Raiyan pp. 51–52, Medha p. 23', question: 'A 0–4 kHz voice channel becomes a 64 kbps digital channel. Find the sampling rate, bits per sample and number of levels.', steps: ['$f_s = 2 \\times f_h = 2 \\times 4\\text{ k} = 8000$ samples/s', '$n_b = N/f_s = 64000/8000 = 8$ bits', '$L = 2^8$'], answer: '8000 samples/s, 8 bits, 256 levels' },
  ],
  flashcards: [
    { front: 'Three steps of PCM', back: 'Sampling, quantization, encoding.' },
    { front: 'Nyquist sampling rate', back: '$f_s = 2f_h$.' },
    { front: 'Voice sampling rate', back: '8000 samples/s (voice $f_h$ = 4 kHz).' },
    { front: 'Bits per sample for 64 kbps voice', back: '$64000/8000 = 8$ bits → 256 levels.' },
    { front: 'Why does TDM need PCM?', back: 'TDM accepts only digital input; voice lines are analog.' },
  ],
  quiz: [
    { q: 'A signal with highest frequency 4 kHz must be sampled at:', options: ['4000/s', '8000/s', '2000/s', '16000/s'], answer: 1, explain: '$f_s = 2f_h$.' },
    { q: 'A 64 kbps channel sampled at 8000/s uses how many bits per sample?', options: ['4', '6', '8', '16'], answer: 2, explain: '$64000/8000$.' },
    { q: '8 bits per sample gives how many quantization levels?', options: ['8', '64', '128', '256'], answer: 3, explain: '$2^8$.' },
    { q: 'Which is not a PCM step?', options: ['Sampling', 'Quantization', 'Encoding', 'Interleaving'], answer: 3, explain: 'Interleaving is part of TDM.' },
  ],
  solvers: ['pcm'],
};
