export default {
  id: 'ch6-1',
  chapter: '6.1',
  title: 'Multiplexing: FDM',
  wave: 'fdm',
  sources: ['ch6_1 slides', 'Raiyan notes pp. 31–41', 'Medha notes pp. 15–19'],
  sections: [
    {
      heading: 'Multiplexing',
      blocks: [
        { type: 'p', text: 'Multiplexing is the set of techniques that allows the simultaneous transmission of multiple signals across a single data link (e.g. many WiFi users sharing one line to the ISP).' },
        { type: 'list', items: ['A **link** is the physical path.', 'A **channel** is the portion of a link that carries a transmission between a given pair of lines. One link can have $n$ channels.', 'The **MUX** combines $n$ lines into one stream (many-to-one); the **DEMUX** separates it back (one-to-many).'] },
        { type: 'p', text: 'Categories: **FDM** (analog), **WDM** (analog), **TDM** (digital).' },
      ],
    },
    {
      heading: 'Frequency-Division Multiplexing',
      blocks: [
        { type: 'p', text: 'FDM is an analog technique used when the link bandwidth (Hz) is greater than the combined bandwidths of the signals. Each sender’s signal modulates a different carrier frequency, and the modulated signals are combined into one composite signal. Channels can be separated by unused strips of bandwidth called **guard bands** so the signals do not overlap.' },
        { type: 'p', text: '**Multiplexing:** each source produces a signal in a similar frequency range. Inside the MUX they modulate different carriers ($f_1, f_2, f_3$), and the results are added into a composite signal.' },
        { type: 'math', tex: 's_1(t) + f_{c1} = M_1(t),\\ \\ s_2(t) + f_{c2} = M_2(t),\\ \\dots \\ \\to \\ \\text{composite}' },
        { type: 'p', text: '**Demultiplexing:** a series of filters splits the composite signal into its components. Each is passed to a demodulator that removes the carrier: $M_1(t) - f_{c1} = s_1(t)$.' },
      ],
    },
    {
      heading: 'Checklist for FDM math',
      blocks: [
        { type: 'list', ordered: true, items: ['Are the input lines analog or digital?', 'If analog → fine, go to step 5.', 'If digital → convert to analog (ASK, FSK, PSK, QPSK, QAM).', 'Find every input line’s bandwidth using that technique’s formula.', 'Check: total input bandwidth ≤ link bandwidth.'] },
        { type: 'note', text: 'Analog inputs come with a bandwidth; digital inputs come with a bit rate. Bandwidth is a difference value, spectrum is a range (low to high).' },
        { type: 'math', tex: 'B_{link} = n \\times B_{ch} + (n-1) \\times B_{guard}' },
      ],
    },
    {
      heading: 'Analog hierarchy (AT&T)',
      blocks: [
        { type: 'p', text: 'Lower-bandwidth lines are combined into higher-bandwidth lines (many leased lines → fewer but bigger channels). For analog lines, FDM is used.' },
        { type: 'table', head: ['Level', 'Made of', 'Voice channels', 'Bandwidth (slide)'], rows: [['Group', '12 voice channels × 4 kHz', '12', '48 kHz'], ['Supergroup', '5 groups', '60', '240 kHz'], ['Master group', '10 supergroups', '600', '2.52 MHz'], ['Jumbo group', '6 master groups', '3600', '16.984 MHz']] },
        { type: 'note', text: 'The master and jumbo bandwidths on the slide include guard bands (10 × 240 kHz = 2.40 MHz without them; 6 × 2.52 MHz = 15.12 MHz).' },
      ],
    },
    {
      heading: 'Applications of FDM',
      blocks: [
        { type: 'list', items: ['**AM radio**: 530–1700 kHz, 10 kHz per station. Each station shifts its signal to its own carrier. The receiver gets all signals and filters (tunes) the one it wants.', '**FM radio**: 88–108 MHz, 200 kHz per station.', 'There is no physical multiplexer or demultiplexer in broadcasting; the air is the common link.', '**Television**: each TV channel has 6 MHz.', '**First-generation cellular (AMPS)**: 824–849 MHz uplink (from phones) and 869–894 MHz downlink (to phones). Voice (3 kHz, 300–3300 Hz) is FM modulated, so each channel is $10 \\times 3 = 30$ kHz. Each user gets two 30 kHz channels, i.e. 60 kHz.'] },
        { type: 'note', text: 'In cellular FDM there is no physical MUX/DEMUX either; multiplexing is done at the data-link layer.' },
      ],
    },
  ],
  formulas: [
    { label: 'FDM link bandwidth', tex: 'B_{link} = nB_{ch} + (n-1)B_{g}', where: 'n channels need n−1 guard bands' },
    { label: 'Digital input over FDM (QAM, d = 0)', tex: 'B = \\frac{N}{r} \\Rightarrow r = \\frac{N}{B},\\ L = 2^r', where: '' },
  ],
  examples: [
    { title: 'Example 6.1', source: 'ch6_1 slides + notes', question: 'Three voice channels of 4 kHz each go into a 12 kHz link (20–32 kHz) with no guard bands. Show the configuration.', steps: ['Shift channel 1 to 20–24 kHz, channel 2 to 24–28 kHz, channel 3 to 28–32 kHz.', 'Combine them into the 20–32 kHz composite. Input total = 12 kHz = link BW, so there is no room for guard bands.', 'Receiver: bandpass filters 20–24, 24–28, 28–32 kHz, then shift each back to 0–4 kHz.', 'With a 1 kHz guard band: $12 + (3-1)\\times1$'], answer: 'Link = 20–32 kHz; with 1 kHz guards the link needs 14 kHz' },
    { title: 'Example 6.2', source: 'ch6_1 slides', question: 'Five channels of 100 kHz each are multiplexed with a 10 kHz guard band between channels. Minimum link bandwidth?', steps: ['Five channels need at least four guard bands.', '$5 \\times 100 + 4 \\times 10$'], answer: '540 kHz' },
    { title: 'Example 6.3', source: 'ch6_1 slides + notes', question: 'Four 1 Mbps digital channels share a 1 MHz satellite channel using FDM. Design the configuration.', steps: ['Each channel gets $1\\text{ MHz}/4 = 250$ kHz.', 'QAM with $d = 0$: $B = (1+0)\\,N \\times \\frac1r = \\frac{N}{r}$', '$r = \\frac{N}{B} = \\frac{1\\text{ Mbps}}{250\\text{ kHz}} = 4$', '$L = 2^4 = 16$'], answer: '16-QAM per channel, 250 kHz each' },
    { title: 'Example 6.4 (AMPS)', source: 'ch6_1 slides', question: 'AMPS uses 824–849 MHz to send and 869–894 MHz to receive; each user has 30 kHz in each direction. How many users simultaneously?', steps: ['Each band is 25 MHz.', '$25\\text{ MHz}/30\\text{ kHz} = 833.33$; in reality 832 channels.', '42 channels are used for control.'], answer: '790 channels for users' },
    { title: 'FDM analog hierarchy (Quiz-3 type)', source: 'Raiyan pp. 38–41, Medha pp. 18–19', question: 'Each channel carries 16 kbps of digital data in the default 4 kHz voice bandwidth. Guard band = 1 kHz, spectrum starts at 50 kHz. Find the modulation and the bandwidth at each level up to the jumbo group.', steps: ['$B_{min} = (1+0)S = N/r \\Rightarrow r = 16\\text{ kbps}/4\\text{ kHz} = 4$ bits/element, $L = 2^4 = 16$ (16-QAM).', 'Groups/supergroup $= 60/12 = 5$; supergroups/master $= 600/60 = 10$; masters/jumbo $= 3600/600 = 6$.', 'Without guards: group $12\\times4 = 48$ kHz, supergroup $5\\times48 = 240$ kHz, master $10\\times240 = 2.4$ MHz, jumbo $6\\times2.4 = 14.4$ MHz.', '$n$ units need $n-1$ guard bands: group 11, supergroup 4, master 9, jumbo 5.', 'Group $= 48 + 11 = 59$ kHz (spectrum 50–109 kHz).', 'Supergroup $= 5\\times59 + 4 = 299$ kHz; master $= 10\\times299 + 9 = 2999$ kHz; jumbo $= 6\\times2999 + 5 = 17999$ kHz.'], answer: '16-QAM; total ≈ 18 MHz (17.999 MHz), spectrum 50 kHz – 18.049 MHz', note: 'The two notes differ here. Raiyan nests the guard bands inside each lower level (the method above). Medha adds each level’s guards to the no-guard totals, which gives about 13.4 MHz. Both notes also write 6 × 2.4 = 13.4 MHz, which is an arithmetic slip (it is 14.4). Confirm with your teacher which method is expected.' },
  ],
  flashcards: [
    { front: 'Link vs channel', back: 'Link: the physical path. Channel: the portion of a link carrying one transmission. One link can have n channels.' },
    { front: 'Three multiplexing categories', back: 'FDM (analog), WDM (analog), TDM (digital).' },
    { front: 'When can FDM be used?', back: 'When the link bandwidth is greater than the combined bandwidths of the signals.' },
    { front: 'What is a guard band?', back: 'An unused strip of bandwidth between channels so signals do not overlap.' },
    { front: 'FDM link bandwidth formula', back: '$nB_{ch} + (n-1)B_g$' },
    { front: 'How does an FDM DEMUX work?', back: 'Filters split the composite signal; demodulators remove the carriers.' },
    { front: 'Analog hierarchy levels', back: 'Group (12 voice), supergroup (60), master group (600), jumbo group (3600).' },
    { front: 'AMPS channel per user', back: 'Two 30 kHz channels (one each way) = 60 kHz; 790 user channels.' },
    { front: 'TV channel bandwidth', back: '6 MHz.' },
  ],
  quiz: [
    { q: 'Five 100 kHz channels with 10 kHz guard bands need a link of:', options: ['500 kHz', '540 kHz', '550 kHz', '510 kHz'], answer: 1, explain: '$5\\times100 + 4\\times10$.' },
    { q: 'FDM is in principle:', options: ['A digital technique', 'An analog technique', 'Only for fiber', 'A switching method'], answer: 1, explain: 'FDM is analog; TDM is digital.' },
    { q: 'Four 1 Mbps channels over 1 MHz with QAM ($d = 0$) need:', options: ['4-QAM', '8-QAM', '16-QAM', '64-QAM'], answer: 2, explain: '$r = 1\\text{M}/250\\text{k} = 4$, $L = 16$.' },
    { q: 'A supergroup contains how many voice channels?', options: ['12', '60', '600', '3600'], answer: 1, explain: '5 groups × 12.' },
    { q: 'In the AMPS system, how many channels are left for users?', options: ['832', '833', '790', '42'], answer: 2, explain: '832 − 42 control channels.' },
    { q: 'The FDM demultiplexer first uses:', options: ['Modulators', 'Filters', 'Adders', 'A VCO'], answer: 1, explain: 'Filters decompose the composite signal, then demodulators remove carriers.' },
    { q: 'Each first-generation cellular voice channel is 30 kHz because:', options: ['Voice is 30 kHz', 'FM bandwidth ≈ 10 × 3 kHz', 'Guard bands', 'QAM'], answer: 1, explain: 'Voice is 3 kHz and FM needs about 10×.' },
  ],
  solvers: ['fdm'],
};
