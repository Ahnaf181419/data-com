// Past-paper questions that ask the same thing, grouped by hand from pastPapers.js.
// refs: [paper, item id], paper = the title without " semester final". exact: at least two are word for word.
// Chapter weight (marks, counts) is computed from pastPapers.js in the Question bank tab, not stored here.
export default [
  {
    title: 'BFSK bandwidth proof',
    module: 'ch5-1',
    exact: true,
    refs: [['Fall 2024', '2(a)'], ['Spring 2025', '2(b)'], ['Spring 2024', '2(c)'], ['Spring 2025', '1(b)']],
    note: 'Fall asked for the maximum $(1+d)S + 2\\Delta f$; both Springs asked for the minimum $2S$ word for word. Spring 2025 1(b) asks the same proof as "why FSK can’t match ASK".',
  },
  {
    title: 'Analog hierarchy',
    module: 'ch6-1',
    exact: true,
    refs: [['Fall 2024', '2(b)'], ['Spring 2025', '1(d)'], ['Spring 2024', '1(e)']],
    note: 'In every paper. Learn the levels, what each is made of and the bandwidths, and draw the diagram.',
  },
  {
    title: 'Switching delays',
    module: 'ch8',
    refs: [['Fall 2024', '1(e)'], ['Spring 2025', '2(d)'], ['Spring 2024', '2(f)']],
    note: 'In every paper: circuit-switched delays, datagram delays, and datagram vs virtual-circuit delays, each with the timing diagram.',
  },
  {
    title: 'Hamming code: find the bad bit',
    module: 'ch10',
    exact: true,
    refs: [['Fall 2024', '3(b)'], ['Spring 2025', '3(c)'], ['Spring 2024', '3(b)']],
    note: 'In every paper. Fall 2024 and Spring 2025 gave the same code 10011000101; Spring 2024 changed it to 11001110111.',
  },
  {
    title: 'QPSK and constellation diagrams',
    module: 'ch5-1',
    exact: true,
    refs: [['Spring 2025', '1(a)'], ['Spring 2024', '1(d)'], ['Fall 2024', '2(c)']],
    note: 'QPSK implementation with its constellation, word for word in both Springs. Fall asked for the ASK, BPSK, QPSK and 4-QAM constellations.',
  },
  {
    title: 'Virtual-circuit phases and VCIs',
    module: 'ch8',
    refs: [['Spring 2025', '1(e)'], ['Spring 2024', '1(g)']],
    note: 'Spring 2025 asked the setup phase; Spring 2024 all three phases. Same VCI tables either way.',
  },
  {
    title: 'Datagram arrival order',
    module: 'ch8',
    refs: [['Spring 2025', '3(e)'], ['Spring 2024', '3(f)']],
    note: 'Same five paths and lengths; only the switch delays change. Order came out 1 → 4 → 2 → 5 → 3 both times.',
  },
  {
    title: 'Multilevel TDM: ten sources',
    module: 'ch6-2',
    exact: true,
    refs: [['Spring 2025', '3(d)'], ['Spring 2024', '3(a)']],
    note: 'Word for word: 7-bit frame, 400,000 frames/s, 2.5 µs, 2.8 Mbps.',
  },
  {
    title: 'QAM: 10 channels on 1 MHz',
    module: 'ch5-1',
    exact: true,
    refs: [['Spring 2025', '3(b)'], ['Spring 2024', '3(c)']],
    note: 'Word for word: 100 bits per baud, $2^{100}$ points.',
  },
  {
    title: 'CRC: generate and check',
    module: 'ch10',
    refs: [['Spring 2025', '3(a)'], ['Spring 2024', '3(e)']],
    note: 'Same divisor 10111; the dataword changes. Show both divisions.',
  },
  {
    title: 'PCM quantization table',
    module: 'pcm',
    refs: [['Fall 2024', '3(e)'], ['Spring 2024', '3(g)']],
    note: 'Same 3-bit method; the voltage range (±20 V, ±40 V) and samples change. Not in your notes.',
  },
  {
    title: '4B/5B and differential Manchester',
    module: 'ch4x',
    refs: [['Fall 2024', '2(d)'], ['Spring 2024', '2(d)']],
    note: 'Same method and table; the input stream changes. Not in your notes.',
  },
  {
    title: 'Multistage switches and blocking',
    module: 'ch8',
    refs: [['Fall 2024', '1(d)'], ['Spring 2024', '2(g)'], ['Fall 2024', '2(e)']],
    note: 'Blocking and the Clos criterion ($N = 200$, then $N = 100$), plus a time-space-time design.',
  },
  {
    title: 'TDM data rate management',
    module: 'ch6-2',
    refs: [['Spring 2025', '1(c)'], ['Fall 2024', '3(c)']],
    note: 'Theory of the three techniques, and a multiple-slot calculation.',
  },
  {
    title: 'AM / FM band allocation',
    module: 'ch5-2',
    refs: [['Fall 2024', '1(a)'], ['Spring 2025', '2(a)']],
    note: 'FM (100 stations) in Fall, AM (117 stations) in Spring 2025.',
  },
  {
    title: 'FDM multiplexing',
    module: 'ch6-1',
    refs: [['Fall 2024', '1(b)'], ['Spring 2025', '2(c)']],
    note: 'MUX/DEMUX with a diagram, and an FDM design with guard bands.',
  },
  {
    title: 'Transmission media',
    module: 'ch7-1',
    refs: [['Fall 2024', '1(c)'], ['Spring 2024', '1(f)']],
    note: 'Guided vs unguided and wireless propagation modes; signal form in each cable and optical modes.',
  },
];
