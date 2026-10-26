export default {
  id: 'ch5-2',
  chapter: '5.2',
  title: 'Analog-to-Analog Conversion',
  wave: 'am',
  sources: ['ch5_2 slides', 'Raiyan notes pp. 25–30', 'Medha notes pp. 10–14'],
  sections: [
    {
      heading: 'Why analog-to-analog',
      blocks: [
        { type: 'p', text: 'Analog-to-analog conversion represents analog information with an analog signal. It is needed when the medium is bandpass in nature or only a bandpass channel is available, so the signal can be sent in a specific bandwidth.' },
        { type: 'math', tex: 's(t) = A\\sin(2\\pi f t + \\varphi)' },
        { type: 'p', text: 'Vary the amplitude → **AM**, the frequency → **FM**, the phase → **PM**. The carrier frequency $f_c$ always sits in the middle of the band.' },
        { type: 'lab', id: 'analog' },
      ],
    },
    {
      heading: 'Amplitude Modulation (AM)',
      blocks: [
        { type: 'list', items: ['The carrier amplitude follows the amplitude of the modulating signal; frequency and phase stay the same.', 'A positive signal gives proportionally high amplitude, a negative signal proportionally low amplitude.', 'The modulating signal becomes an **envelope** to the carrier.', 'Normally implemented with a simple multiplier (modulating signal × carrier from an oscillator).', 'The final signal is non-periodic, so its frequency domain is continuous.'] },
        { type: 'math', tex: 'B_{AM} = 2B' },
        { type: 'diagram', id: 'modwave', props: { kind: 'am' } },
        { type: 'p', text: 'The AM bandwidth is twice the bandwidth $B$ of the modulating (audio) signal, centred on the carrier frequency.' },
      ],
    },
    {
      heading: 'AM band allocation',
      blocks: [
        { type: 'list', items: ['Audio signal bandwidth is usually 5 kHz, so an AM station needs $2 \\times 5 = 10$ kHz.', 'The FCC (Federal Communications Commission) sets the AM spectrum and allows 10 kHz per station.', 'AM carrier frequencies: 530–1700 kHz.', 'Carriers must be at least 10 kHz apart. If one station uses 1100 kHz, the next cannot be lower than 1110 kHz.'] },
        { type: 'math', tex: '\\#\\text{stations} = \\frac{\\text{total BW}}{\\text{channel BW}} = \\frac{1700 - 530}{10} = 117' },
        { type: 'diagram', id: 'spectrum', props: { segs: [{ label: 'St 1', fc: '535' }, { label: 'St 2', fc: '545' }, { label: 'St 3', fc: '555' }, { kind: 'gap', w: 1.5 }, { label: 'St 117', fc: '1695' }], spans: [{ from: 0, to: 5, label: '1170 kHz → 117 stations' }, { from: 0, to: 1, label: '10 kHz', row: 1 }], ticks: [[0, '530'], [1, '540'], [2, '550'], [3, '560'], [4, '1690'], [5, '1700']], unit: 'kHz', caption: 'AM band allocation: 10 kHz per station.' } },
        { type: 'math', tex: '\\text{St}_n\\text{ starts at } (n-1)\\times 10\\text{ kHz} + 530\\text{ kHz}, \\quad f_{c,n} = \\text{start} + 5\\text{ kHz}' },
      ],
    },
    {
      heading: 'Frequency Modulation (FM)',
      blocks: [
        { type: 'list', items: ['The carrier frequency follows the amplitude of the modulating signal; amplitude and phase stay constant.', 'Positive signal → higher frequency, negative signal → lower frequency.', 'Normally implemented with a voltage-controlled oscillator (VCO), as with FSK.'] },
        { type: 'math', tex: 'B_{FM} = 2(1+\\beta)B, \\quad \\beta = 4\\ (\\text{common})' },
        { type: 'diagram', id: 'modwave', props: { kind: 'fm' } },
        { type: 'p', text: 'The exact bandwidth is hard to determine and is found empirically. It is about 10 times the modulating signal’s bandwidth.' },
      ],
    },
    {
      heading: 'FM band allocation',
      blocks: [
        { type: 'list', items: ['Stereo audio broadcast bandwidth is about 15 kHz.', '$B_{FM} = 2(1+4) \\times 15 = 150$ kHz, plus a 50 kHz guard band (unused frequencies so neighbours do not overlap) = **200 kHz** per station.', 'FM carriers range from 88 to 108 MHz, at least 200 kHz apart.', 'Total 20 MHz / 200 kHz = 100 possible stations, but the FCC allows only alternate allocations in an area, so only 50 operate at any one time.'] },
        { type: 'math', tex: '\\text{St}_n\\text{ starts at } (n-1) \\times 200\\text{ kHz} + 88\\text{ MHz}, \\quad f_{c,n} = \\text{start} + 100\\text{ kHz}' },
        { type: 'diagram', id: 'spectrum', props: { segs: [{ label: 'St 1', fc: '88.1' }, { kind: 'empty', label: 'no station' }, { label: 'St 3', fc: '88.5' }, { kind: 'gap', w: 1.4 }, { label: 'St 99', fc: '107.7' }, { kind: 'empty', label: 'no st.' }], spans: [{ from: 0, to: 6, label: '20 MHz → 100 possible, 50 used' }, { from: 0, to: 1, label: '200 kHz', row: 1 }], ticks: [[0, '88'], [1, '88.2'], [2, '88.4'], [6, '108']], unit: 'MHz', caption: 'FM band allocation: alternate 200 kHz slots are left empty.' } },
      ],
    },
    {
      heading: 'Phase Modulation (PM)',
      blocks: [
        { type: 'list', items: ['The carrier phase follows the amplitude of the modulating signal; amplitude and frequency stay constant.', 'PM is mathematically the same as FM with one difference:', 'In **FM**, the instantaneous change in carrier frequency is proportional to the **amplitude** of the modulating signal.', 'In **PM**, it is proportional to the **derivative** of the amplitude.', 'Implementation: the modulating signal passes through $d/dt$ and then a VCO.'] },
        { type: 'math', tex: 'B_{PM} = 2(1+\\beta)B, \\quad \\beta = 2\\ (\\text{most often})' },
        { type: 'diagram', id: 'modwave', props: { kind: 'pm' } },
      ],
    },
  ],
  formulas: [
    { label: 'AM bandwidth', tex: 'B_{AM} = 2B', where: 'B = modulating signal bandwidth' },
    { label: 'FM bandwidth', tex: 'B_{FM} = 2(1+\\beta)B', where: 'β = 4 commonly' },
    { label: 'PM bandwidth', tex: 'B_{PM} = 2(1+\\beta)B', where: 'β = 2 most often' },
    { label: 'Number of stations', tex: '\\frac{\\text{total band}}{\\text{channel BW}}', where: 'AM 117, FM 100' },
    { label: 'n-th AM station start', tex: '(n-1)\\times10\\text{ kHz} + 530\\text{ kHz}', where: '' },
    { label: 'n-th FM station start', tex: '(n-1)\\times200\\text{ kHz} + 88\\text{ MHz}', where: '' },
  ],
  examples: [
    { title: 'Number of AM stations', source: 'Raiyan p. 26, Medha p. 12', question: 'How many AM stations fit in the FCC AM band?', steps: ['AM band: 530–1700 kHz, so total BW = 1170 kHz.', 'Audio $B_s = 5$ kHz, so channel BW $= 2 \\times 5 = 10$ kHz.', '$1170/10$'], answer: '117 stations' },
    { title: 'AM station 3', source: 'Raiyan p. 27', question: 'Find the spectrum range and carrier of AM station 3.', steps: ['Start $= (3-1)\\times10 + 530 = 550$ kHz', 'Range: 550–560 kHz', '$f_c = 550 + 5$'], answer: '550–560 kHz, $f_c = 555$ kHz' },
    { title: 'FM channel and stations', source: 'Raiyan pp. 28–29, Medha pp. 13–14', question: 'Find the FM channel bandwidth, the number of FM stations, and the range and carrier of station 2.', steps: ['$B_{FM} = 2(1+4)\\times15 = 150$ kHz; add a 50 kHz guard band → 200 kHz', '$\\#\\text{stations} = 20\\text{ MHz} / 200\\text{ kHz} = 100$', 'Station 2 start $= (2-1)\\times200\\text{ kHz} + 88\\text{ MHz} = 88.2$ MHz', 'Range 88.2–88.4 MHz; $f_c = 88.2 + 0.1$'], answer: '200 kHz, 100 stations, $f_{c2} = 88.3$ MHz' },
  ],
  flashcards: [
    { front: 'AM bandwidth', back: '$B_{AM} = 2B$: twice the modulating signal bandwidth.' },
    { front: 'FM bandwidth', back: '$B_{FM} = 2(1+\\beta)B$, β usually 4 (about 10× the audio bandwidth).' },
    { front: 'PM bandwidth', back: '$B_{PM} = 2(1+\\beta)B$, β = 2 most often.' },
    { front: 'FM vs PM difference', back: 'FM: frequency change ∝ amplitude. PM: frequency change ∝ derivative of amplitude.' },
    { front: 'AM band and station width', back: '530–1700 kHz, 10 kHz each → 117 stations.' },
    { front: 'FM band and station width', back: '88–108 MHz, 200 kHz each → 100 slots, only 50 used at a time in an area.' },
    { front: 'How is FM implemented?', back: 'With a voltage-controlled oscillator (VCO).' },
    { front: 'How is AM implemented?', back: 'With a simple multiplier; the modulating signal becomes the envelope.' },
  ],
  quiz: [
    { q: 'An audio signal of 5 kHz needs an AM bandwidth of:', options: ['5 kHz', '10 kHz', '50 kHz', '200 kHz'], answer: 1, explain: '$B_{AM} = 2B$.' },
    { q: 'With β = 4 and B = 15 kHz, $B_{FM}$ (without guard band) is:', options: ['30 kHz', '120 kHz', '150 kHz', '200 kHz'], answer: 2, explain: '$2(1+4)\\times15 = 150$ kHz.' },
    { q: 'How many FM stations can operate at the same time in one area?', options: ['100', '50', '117', '200'], answer: 1, explain: 'Only alternate allocations are used.' },
    { q: 'In PM, the instantaneous frequency change is proportional to:', options: ['Amplitude', 'Derivative of amplitude', 'Carrier frequency', 'β'], answer: 1, explain: 'PM uses the derivative; FM uses the amplitude itself.' },
    { q: 'The carrier of AM station 1 is:', options: ['530 kHz', '535 kHz', '540 kHz', '525 kHz'], answer: 1, explain: 'Range 530–540 kHz, carrier in the middle.' },
    { q: 'The usual β for PM is:', options: ['1', '2', '4', '10'], answer: 1, explain: '$B_{PM} = 2(1+\\beta)B$ with β = 2 most often.' },
    { q: 'If one AM station uses 1100 kHz, the next carrier cannot be lower than:', options: ['1105 kHz', '1110 kHz', '1120 kHz', '1200 kHz'], answer: 1, explain: 'Carriers must be at least 10 kHz apart.' },
  ],
  solvers: ['analogbw', 'stations'],
};
