// Past-paper questions that ask the same thing, grouped by hand from pastPapers.js.
// refs: [paper, item id], paper = the title without " semester final". exact: at least two are word for word.
// Chapter weight (marks, counts) is computed from pastPapers.js in the Question bank tab, not stored here.
export default [
  {
    title: 'CRC: generate and check',
    module: 'ch10',
    refs: [
      ['Spring 2025', '3(a)'],
      ['Spring 2024', '3(e)'],
      ['Fall 2021', '1(a)'],
      ['Fall 2022', '3(c)'],
      ['Spring 2022', '7(a)'],
      ['Spring 2023', '3(c)'],
      ['Fall 2023', '3(c)'],
      ['Fall 2023', '3(e)'],
    ],
    note: 'In 7 of the 8 papers (everything except Fall 2024). The generator is usually 10111 or $x^4+x+1$ = 1011; the dataword and the bit that gets corrupted change. Show both divisions, and prove the corrupted codeword gives a non-zero syndrome.',
  },
  {
    title: 'Multistage switch: 100 inputs, 10 and 6 crossbars',
    module: 'ch8-2',
    exact: true,
    refs: [
      ['Fall 2022', '2(a)'],
      ['Spring 2023', '2(g)'],
      ['Spring 2022', '2(b)'],
    ],
    note: 'Word for word in three papers: $N = 100$, 10 crossbars in the first and third stages, 6 in the middle → $n = 10$, $k = 6$ → $600 + 600 + 600 = 1800$ crosspoints.',
  },
  {
    title: '8-bit checksum of the same data unit',
    module: 'ch10',
    exact: true,
    refs: [
      ['Fall 2021', '5(b)'],
      ['Fall 2022', '3(e)'],
      ['Spring 2022', '1(a)'],
      ['Spring 2023', '3(e)'],
      ['Fall 2023', '3(f)'],
    ],
    note: 'Three papers print the identical 32-bit unit 10011001111000100010010010000100 → checksum 11011010. The other two print different units (37 bits in Spring 2023, 31 bits in Fall 2023) — group the bits into 8-bit words, note any leftover bits, and sum with end-around carry.',
  },
  {
    title: 'PCM quantization tables',
    module: 'pcm',
    exact: true,
    refs: [
      ['Fall 2024', '3(e)'],
      ['Spring 2024', '3(g)'],
      ['Fall 2022', '3(f)'],
      ['Spring 2023', '3(f)'],
    ],
    note: 'Fall 2022 and Spring 2023 use the identical nine amplitudes −6.1, 7.5, 16.2, 19.7, 11.0, −5.5, −11.3, −9.4, −6.0 V over −20…+20 V with L = 8 (codes 010, 101, 111, 111, 110, 010, 001, 010, 010); Fall 2024 and Spring 2024 use five samples with 3-bit codes. Always: Δ = range/L, zones counted from 0 at the bottom, quantized value = zone midpoint.',
  },
  {
    title: 'QAM: 10 channels on 1 MHz',
    module: 'ch5-1',
    refs: [
      ['Spring 2025', '3(b)'],
      ['Spring 2024', '3(c)'],
      ['Fall 2022', '2(d)'],
      ['Spring 2023', '2(d)'],
    ],
    note: 'The same numbers every time: 100 kHz per channel → $S = 100$ kbaud → $r = 100$ bits per element → $L = 2^{100}$ points (the wording varies slightly from paper to paper).',
  },
  {
    title: 'Datagram arrival order',
    module: 'ch8',
    exact: true,
    refs: [
      ['Spring 2025', '3(e)'],
      ['Spring 2024', '3(f)'],
      ['Fall 2022', '3(g)'],
      ['Spring 2023', '3(g)'],
    ],
    note: 'The same five paths (3200, 11,700, 12,200, 10,200, 10,700 km via switches 1,3,5 / 1,2,5 / 1,2,3,5 / 1,4,5 / 1,4,3,5). The order came out 1 → 4 → 2 → 5 → 3 every time, but the switch delays differ (Spring 2025 uses 4, 11, 22, 9, 20 ms), so the totals differ — work each paper\u2019s own numbers.',
  },
  {
    title: 'Line coding: maximum data rates',
    module: 'ch4x',
    refs: [
      ['Fall 2021', '3(a)'],
      ['Fall 2022', '2(f)'],
      ['Spring 2022', '5(b)'],
    ],
    note: 'Out of your notes, but the same standard table in all three papers: NRZ-L $B=N$, AMI $B=N/2$, Manchester $B=2N$, 8B6T $B=6N/8$, MLT-3 $B=4N/3$, 2B1Q $B=N/2$ (2 bits per element), 4D-PAM5 $B=4N/5$ — only the channel bandwidth changes (3 MHz, 5 MHz). Check the 2B1Q row against your own copy of Forouzan before the exam.',
  },
  {
    title: '2B1Q signal-level graphs',
    module: 'ch4x',
    refs: [
      ['Fall 2021', '6(a)'],
      ['Fall 2022', '3(a)'],
      ['Spring 2022', '4(a)'],
    ],
    note: 'Out of your notes: 00 → −1, 01 → −3, 11 → +3, 10 → +1. Learn the mapping and the two streams they use (0110011001100110 and 0011001100110011).',
  },
  {
    title: 'Scrambling: B8ZS and HDB3',
    module: 'ch4x',
    refs: [
      ['Fall 2021', '3(b)'],
      ['Fall 2022', '3(b)'],
      ['Fall 2023', '3(g)'],
    ],
    note: 'Out of your notes, and the same sequence every time: 11100000000000. B8ZS swaps eight zeros for 000VB0VB; HDB3 swaps four zeros for 000V (odd count of non-zero pulses) or 000VB (even). The wording changes, the method does not.',
  },
  {
    title: 'HDLC frames',
    module: 'ch10',
    refs: [
      ['Spring 2023', '1(f)'],
      ['Fall 2022', '1(f)'],
      ['Fall 2023', '1(c)'],
    ],
    note: 'Out of your notes: I/S/U frames and the flag → address → control → information → FCS → flag layout with bit stuffing.',
  },
  {
    title: 'Guard bands and the ARP packet',
    module: 'ch6-1',
    refs: [
      ['Spring 2023', '1(b)'],
      ['Fall 2022', '1(e)'],
      ['Spring 2022', '3(b)'],
    ],
    note: 'The guard-band half is taught in Ch 6.1; the ARP packet diagram is not in your notes — know the Ethernet header plus the 28-byte ARP payload.',
  },
  {
    title: 'TCP/IP layers and their data units',
    module: 'ch1',
    refs: [
      ['Fall 2021', '1(b)'],
      ['Spring 2023', '1(a)'],
    ],
    note: 'Out of your notes: message → segment/datagram → datagram → frame → bits.',
  },
  {
    title: 'Five components of a data communication system',
    module: 'ch1',
    refs: [
      ['Fall 2021', '4(a)'],
      ['Spring 2023', '1(e)'],
      ['Fall 2023', '1(a)'],
    ],
    note: 'Sender, receiver, transmission medium, message, protocol — always the first part of the question. In your notes (Ch 1): the easiest question in the whole set.',
  },
  {
    title: 'Constellation with two points',
    module: 'ch5-1',
    exact: true,
    refs: [
      ['Fall 2022', '3(d)'],
      ['Spring 2022', '6(b)'],
    ],
    note: 'Word for word: (2,0) and (3,0) → ASK, peak 3 V; (0,2) and (0,−2) → PSK, peak 2 V. Same idea as the QPSK constellation, one axis at a time.',
  },
  {
    title: 'DSSS with the Barker sequence',
    module: 'ch7-1',
    refs: [
      ['Spring 2023', '2(c)'],
      ['Fall 2022', '2(e)'],
    ],
    note: 'Out of your notes: spread spectrum, the two techniques (FHSS, DSSS) and the number of channels the spreading factor allows.',
  },
  {
    title: 'Pure Aloha',
    module: 'ch10',
    refs: [
      ['Spring 2023', '2(f)'],
      ['Spring 2022', '4(b)'],
    ],
    note: 'Out of your notes: throughput $S = G e^{-2G}$ (peak 18.4% at $G = 1/2$) and the vulnerable time $2T$.',
  },
  {
    title: 'Baseband vs broadband, and random access',
    module: 'ch5-1',
    refs: [
      ['Fall 2022', '1(a)'],
      ['Spring 2022', '6(a)'],
    ],
    note: 'The baseband/broadband half is taught in Ch 5.1; the random-access protocols (pure/slotted Aloha, CSMA/CD) are not.',
  },
  {
    title: 'Transmission impairment',
    module: 'ch1',
    refs: [
      ['Fall 2021', '2(a)'],
      ['Spring 2023', '1(c)'],
    ],
    note: 'Now taught in Ch 1 as a flagged lesson: attenuation, distortion, noise — with their fixes and examples.',
  },
  {
    title: 'Decibels and cable loss',
    module: 'ch7-1',
    refs: [
      ['Spring 2023', '2(a)'],
      ['Fall 2023', '2(f)'],
    ],
    note: 'Taught in Ch 7.1 as a flagged lesson: $P_2 = P_1 \\times 10^{\\text{dB}/10}$; −3 dB ≈ half the power.',
  },
  {
    title: 'Refraction and the critical angle',
    module: 'ch7-1',
    refs: [
      ['Spring 2023', '3(b)'],
      ['Spring 2022', '7(b)'],
    ],
    note: 'Taught in Ch 7.1: below the critical angle the ray refracts away from the normal, above it there is total internal reflection.',
  },
  {
    title: 'Baud rate from bit rate',
    module: 'ch5-1',
    refs: [
      ['Fall 2021', '6(b)'],
      ['Fall 2023', '2(g)'],
    ],
    note: '$S = N/r$ with $r = \\log_2 L$: QPSK halves the rate, 64-QAM divides it by 6.',
  },
  {
    title: 'Hamming code: find the bad bit',
    module: 'ch10',
    refs: [
      ['Fall 2024', '3(b)'],
      ['Spring 2025', '3(c)'],
      ['Spring 2024', '3(b)'],
      ['Fall 2023', '3(b)'],
    ],
    note: 'In 4 of the 8 papers. Fall 2024 and Spring 2025 gave the same code 10011000101; Spring 2024 changed it to 11001110111; Fall 2023 asks for position 4.',
  },
  {
    title: 'Multistage switches and blocking',
    module: 'ch8',
    refs: [
      ['Fall 2024', '1(d)'],
      ['Spring 2024', '2(g)'],
      ['Fall 2024', '2(e)'],
      ['Fall 2021', '4(b)'],
    ],
    note: 'Blocking and the Clos criterion ($N = 200$, then $N = 100$), plus a time-space-time design and the circuit-switched delay budget.',
  },
  {
    title: 'Analog hierarchy',
    module: 'ch6-1',
    refs: [
      ['Fall 2024', '2(b)'],
      ['Spring 2025', '1(d)'],
      ['Spring 2024', '1(e)'],
      ['Fall 2023', '1(f)'],
    ],
    note: 'In 4 of the 8 papers. Learn the levels, what each is made of and the bandwidths, and draw the diagram.',
  },
  {
    title: 'Switching delays',
    module: 'ch8',
    refs: [
      ['Fall 2024', '1(e)'],
      ['Spring 2025', '2(d)'],
      ['Spring 2024', '2(f)'],
      ['Fall 2021', '4(b)'],
    ],
    note: 'In 4 of the 8 papers: circuit-switched delays (setup = 2P+2T, teardown = P+T, then the data phase), datagram delays, and datagram vs virtual-circuit delays, each with the timing diagram.',
  },
  {
    title: 'Multilevel TDM: ten sources',
    module: 'ch6-2',
    exact: true,
    refs: [
      ['Spring 2025', '3(d)'],
      ['Spring 2024', '3(a)'],
    ],
    note: 'Word for word: 7-bit frame, 400,000 frames/s, 2.5 µs, 2.8 Mbps.',
  },
  {
    title: 'TDM data rate management',
    module: 'ch6-2',
    refs: [
      ['Spring 2025', '1(c)'],
      ['Fall 2024', '3(c)'],
      ['Fall 2021', '2(b)'],
    ],
    note: 'Theory of the three techniques, a multiple-slot calculation, and pulse stuffing with unequal rates.',
  },
  {
    title: 'AM / FM band allocation',
    module: 'ch5-2',
    refs: [
      ['Fall 2024', '1(a)'],
      ['Spring 2025', '2(a)'],
    ],
    note: 'FM (100 stations) in Fall, AM (117 stations) in Spring 2025.',
  },
  {
    title: 'FDM multiplexing',
    module: 'ch6-1',
    refs: [
      ['Fall 2024', '1(b)'],
      ['Spring 2025', '2(c)'],
      ['Fall 2022', '1(c)'],
    ],
    note: 'MUX/DEMUX with a diagram, an FDM design with guard bands, and the applications of FDM.',
  },
  {
    title: 'Transmission media',
    module: 'ch7-1',
    refs: [
      ['Fall 2024', '1(c)'],
      ['Spring 2024', '1(f)'],
      ['Fall 2021', '4(a)'],
      ['Spring 2022', '3(a)'],
    ],
    note: 'Guided vs unguided and wireless propagation modes; signal form in each cable and optical modes; the two categories of media.',
  },
  {
    title: '4B/5B and differential Manchester',
    module: 'ch4x',
    refs: [
      ['Fall 2024', '2(d)'],
      ['Spring 2024', '2(d)'],
      ['Fall 2021', '6(a)'],
    ],
    note: 'Same method and table; the input stream changes. Differential Manchester is the one line-coding scheme in your notes.',
  },
  {
    title: 'BFSK bandwidth proof',
    module: 'ch5-1',
    exact: true,
    refs: [
      ['Fall 2024', '2(a)'],
      ['Spring 2025', '2(b)'],
      ['Spring 2024', '2(c)'],
      ['Spring 2025', '1(b)'],
    ],
    note: 'Fall asked for the maximum $(1+d)S + 2\\Delta f$; both Springs asked for the minimum $2S$ word for word. Spring 2025 1(b) asks the same proof as "why FSK can’t match ASK".',
  },
  {
    title: 'Virtual-circuit phases and VCIs',
    module: 'ch8',
    refs: [
      ['Spring 2025', '1(e)'],
      ['Spring 2024', '1(g)'],
    ],
    note: 'Spring 2025 asked the setup phase; Spring 2024 all three phases. Same VCI tables either way.',
  },
  {
    title: 'OSI layers',
    module: 'ch1',
    refs: [
      ['Fall 2023', '1(b)'],
      ['Spring 2023', '1(d)'],
      ['Fall 2022', '1(d)'],
    ],
    note: 'Now taught in Ch 1 as a flagged lesson: the seven layers and what each one does.',
  },
];
