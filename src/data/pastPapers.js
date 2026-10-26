// Fall 2024 semester final (exam held 30/10/2025), CSE 2211, AUST. Typed from the question paper.
// Model answers use the class slides/notes; items marked `flagged` need the textbook method (not in the notes).
export default [
  {
    title: 'Fall 2024 semester final',
    meta: '2.5 hours, 50 marks. Answer any 4 questions from each set.',
    sets: [
      {
        name: 'Question 1',
        rule: 'Answer any 4 (5 × 4 = 20)',
        items: [
          {
            id: '1(a)', marks: 5, module: 'ch5-2',
            q: 'Explain the analog-to-analog conversion technique of FM and its bandwidth allocation, where the FM spectrum gives 100 stations according to FCC criteria.',
            answer: [
              'FM: the carrier frequency follows the amplitude of the modulating signal (positive → higher, negative → lower); amplitude and phase stay constant. Implemented with a VCO.',
              'Bandwidth: $B_{FM} = 2(1+\\beta)B$ with $\\beta = 4$. Stereo audio $B = 15$ kHz → $2(1+4)\\times15 = 150$ kHz.',
              'FCC adds a 50 kHz guard band → 200 kHz per station.',
              'FM band 88–108 MHz = 20 MHz → $20\\text{ MHz}/200\\text{ kHz} = 100$ stations; only alternate ones (50) operate at a time in an area.',
              'Station $n$ occupies $(n-1)\\times200$ kHz + 88 MHz onward, with $f_c$ in the middle (station 1: 88–88.2 MHz, $f_c = 88.1$ MHz).',
            ],
          },
          {
            id: '1(b)', marks: 5, module: 'ch6-1',
            q: 'Describe the goals of multiplexing. Explain the analog multiplexing and demultiplexing techniques with a neat diagram.',
            answer: [
              'Goal: transmit multiple signals simultaneously across a single data link, so $n$ lines share one link’s bandwidth instead of needing $n$ separate links (e.g. many users sharing one line to the ISP; many leased lines replaced by fewer, larger ones).',
              'Analog multiplexing = FDM, used when the link bandwidth exceeds the sum of the input bandwidths.',
              'MUX: each input $s_i(t)$ modulates its own carrier $f_{ci}$ → $M_i(t)$; the modulated signals are added into one composite signal, with guard bands between channels.',
              'DEMUX: bandpass filters separate the composite; demodulators remove each carrier: $M_i(t) - f_{ci} = s_i(t)$.',
              'Diagram: inputs → modulators ($f_1, f_2, f_3$) → Σ → link → filters → demodulators → outputs (see the MUX/DEMUX figure in Ch 6.1).',
            ],
          },
          {
            id: '1(c)', marks: 5, module: 'ch7-2',
            q: 'Differentiate between guided and unguided media. Describe the three propagation modes through which an unguided signal can travel from source to destination.',
            answer: [
              'Guided media guide the signal along a physical conductor (twisted pair and coax carry electric current; fiber carries light). Unguided media send electromagnetic waves through free space without a conductor, available to anyone with a receiver.',
              'Ground wave (< 3 MHz): follows the contour of the earth; travels far. Example: AM radio.',
              'Sky wave (3–30 MHz, HF): reflected by the ionosphere, can hop between ionosphere and earth. Example: international broadcast.',
              'Line of sight (> 30 MHz): ground and sky waves do not work; antennas must be within effective LOS ($d = 3.57\\sqrt{Kh}$). Example: satellite, microwave.',
            ],
          },
          {
            id: '1(d)', marks: 5, module: 'ch8',
            q: 'Define blocking in a switched network. Describe how a multistage switch alleviates the blocking problem.',
            answer: [
              'Blocking: an input cannot be connected to a free output because the switch has no free path for it. A non-blocking switch lets every input talk to every output at the same time.',
              'A single crossbar is non-blocking but needs $N \\times N$ crosspoints (200 × 200 = 40,000), which is inefficient.',
              'A multistage switch uses three stages of smaller crossbars: $\\tfrac{N}{n}$ of $n \\times k$, $k$ of $\\tfrac{N}{n} \\times \\tfrac{N}{n}$, $\\tfrac{N}{n}$ of $k \\times n$; total $2kN + k(N/n)^2$.',
              'With few middle switches it saves crosspoints but blocks (n = 20, k = 4: 2000 crosspoints, 5%).',
              'Clos criterion removes blocking: $n = \\sqrt{N/2}$, $k = 2n - 1$. For 200 × 200: n = 10, k = 19 → 15,200 crosspoints, still far fewer than 40,000.',
            ],
          },
          {
            id: '1(e)', marks: 5, module: 'ch8',
            q: 'Compare and contrast a circuit-switched network and a packet-switched network. Explain the delays associated with the three phases of a circuit-switched network.',
            answer: [
              'Circuit-switched: dedicated path reserved in setup (FDM band or TDM slot), physical layer, data not packetized, no addressing during transfer, resources held for the whole call (less efficient). Used for voice.',
              'Packet-switched: message split into addressed packets, no reservation, resources on demand (first-come first-served, packets may be delayed or dropped). Datagram (network layer, independent packets) or virtual circuit (data-link layer, fixed path).',
              'Setup delay: request propagation + transfer, then acknowledgment propagation + transfer: $2P_d + 2T_d$.',
              'Data transfer delay: propagation + data transfer time ($P_d + T_d$); can be long for big data.',
              'Teardown delay: the release signal to each switch ($P_d + T_d$). $P_d = D/S$, $T_d = L/R$.',
            ],
          },
        ],
      },
      {
        name: 'Question 2',
        rule: 'Answer any 4 (3.5 × 4 = 14)',
        items: [
          {
            id: '2(a)', marks: 3.5, module: 'ch5-1',
            q: 'In BFSK, show that the maximum bandwidth is $B = (1+d)S + 2\\Delta f$.',
            answer: [
              'Two carriers: $f_1 = f_c - \\Delta f$ (bit 0) and $f_2 = f_c + \\Delta f$ (bit 1), so $f_2 - f_1 = 2\\Delta f$.',
              'Each carrier is ASK-like and occupies $(1+d)S$, centred on its carrier.',
              'Half of each band, $\\tfrac12(1+d)S$, lies outside the gap between the carriers.',
              '$B = \\tfrac12(1+d)S + 2\\Delta f + \\tfrac12(1+d)S = (1+d)S + 2\\Delta f$.',
            ],
          },
          {
            id: '2(b)', marks: 3.5, module: 'ch6-1',
            q: 'Design the analog hierarchy for a telephone company with voice channels (4 kHz), groups (48 kHz), supergroups (240 kHz), master groups (2.4 MHz) and jumbo groups (15.12 MHz).',
            answer: [
              'Group: 12 voice channels × 4 kHz = 48 kHz (FDM).',
              'Supergroup: 5 groups × 48 kHz = 240 kHz (60 voice channels).',
              'Master group: 10 supergroups × 240 kHz = 2.4 MHz (600 voice channels).',
              'Jumbo group: 6 master groups (3600 voice channels). 6 × 2.4 = 14.4 MHz; the given 15.12 MHz (= 6 × 2.52 MHz on the slide) includes guard bands.',
              'Draw each level as an FDM multiplexer feeding the next: voice → FDM → group → FDM → supergroup → FDM → master → FDM → jumbo.',
            ],
          },
          {
            id: '2(c)', marks: 3.5, module: 'ch5-1',
            q: 'Show the constellation diagrams for ASK (OOK), BPSK, QPSK and 4-QAM. Identify the signal type, amplitude and phase of each.',
            answer: [
              'ASK (OOK): in-phase carrier only (1-D). 0 → 0 V; 1 → 1 V at 0°.',
              'BPSK: in-phase only, polar NRZ (1-D). 1 → 1 V at 0°; 0 → 1 V at 180°.',
              'QPSK: in-phase + quadrature (2-D). 11 → 45°, 01 → 135°, 00 → −135°, 10 → −45°, each $\\sqrt2$ V.',
              '4-QAM (unipolar NRZ, 0 or +1 on each carrier): 00 → 0 V; 10 → 1 V at 0°; 01 → 1 V at 90°; 11 → $\\sqrt2$ V at 45°. (4-QAM with polar NRZ is the same as QPSK.)',
            ],
          },
          {
            id: '2(d)', marks: 3.5, module: 'ch4x', flagged: true,
            q: 'The input stream 010100010011000000010010 goes to a 4B/5B block encoder. Using the given table, find the output stream and draw differential Manchester for the first 8 output bits.',
            answer: [
              'Groups: 0101 | 0001 | 0011 | 0000 | 0001 | 0010.',
              'Codes: 01011 | 01001 | 10101 | 11110 | 01001 | 10100.',
              'Output: 010110100110101111100100110100.',
              'First 8 bits: 0 1 0 1 1 0 1 0. Differential Manchester: always a mid-bit transition; a transition at the start of a bit means 0.',
              'Starting high, the half-bit levels are: L H | H L | H L | L H | H L | H L | L H | L H (draw with the lab in Ch 4).',
            ],
          },
          {
            id: '2(e)', marks: 3.5, module: 'ch8',
            q: 'Design a three-stage time-space-time switch with 100 inputs, 10 TSIs at the first and third stages, and 4 crossbars in the middle stage. Find the total crosspoints and memory locations.',
            answer: [
              'Each TSI serves $100/10 = 10$ inputs, so each handles 10 time slots.',
              'Middle stage: 4 crossbars, each connecting the 10 first-stage TSIs to the 10 third-stage TSIs: 10 × 10 = 100 crosspoints each.',
              'Total crosspoints = 4 × 100 = 400 (a single 100 × 100 crossbar would need 10,000).',
              'Memory: # locations = # time slots per TSI = 10; 10 TSIs on each side → (10 + 10) × 10 = 200 locations.',
              'Method from the notes’ TST example (3 TSIs × 4 slots per side = 12 + 12 = 24 locations). State your assumption that each crossbar is 10 × 10.',
            ],
          },
        ],
      },
      {
        name: 'Question 3',
        rule: 'Answer any 4 (4 × 4 = 16)',
        items: [
          {
            id: '3(a)', marks: 4, module: 'ch10',
            q: 'Our data is a list of 4-bit numbers (6, 10, 11, 4, 5). Find the checksum at the sender and at the receiver if there is no error.',
            answer: [
              'Sender: sum = 6 + 10 + 11 + 4 + 5 = 36 = 100100.',
              'Wrap the carry: 0100 + 10 = 0110 = 6 (wrapped sum).',
              'Checksum = complement of 0110 = 1001 = 9. Send (6, 10, 11, 4, 5, 9).',
              'Receiver: 36 + 9 = 45 = 101101 → 1101 + 10 = 1111 → complement 0000 → no error.',
              'The paper says “six numbers” but lists five; work with the five given and say so.',
            ],
          },
          {
            id: '3(b)', marks: 4, module: 'ch10',
            q: 'A receiver gets the code 10011000101. Using the Hamming algorithm, find the bit in error and give the correct code.',
            answer: [
              '11 bits → 4 parity bits at positions 1, 2, 4, 8 (7 data bits).',
              'Recompute each check (even parity) over the received bits: $r_1$ (1,3,5,7,9,11) → 0, $r_2$ (2,3,6,7,10,11) → 1, $r_4$ (4,5,6,7) → 1, $r_8$ (8,9,10,11) → 0.',
              'Syndrome $r_8 r_4 r_2 r_1 = 0110 = 6$ → bit 6 is wrong.',
              'Flip bit 6: corrected code = 10011100101 (data 1001101).',
            ],
          },
          {
            id: '3(c)', marks: 4, module: 'ch6-2',
            q: 'Four channels, two at 200 kbps and two at 150 kbps, are multiplexed using multiple-slot TDM. Each output slot carries 1 bit, no sync bits. Find the frame size, frame rate, frame duration and output data rate.',
            answer: [
              'Rates are not equal, so use multiple-slot allocation with a common unit of 50 kbps: 200 kbps → 4 slots, 150 kbps → 3 slots.',
              'Frame size = 4 + 4 + 3 + 3 = 14 bits.',
              'Frame rate = 50,000 frames/s (each slot unit is 50 kbps).',
              'Frame duration = 1/50,000 s = 20 µs.',
              'Output rate = 14 × 50,000 = 700 kbps (= 2 × 200 + 2 × 150).',
            ],
          },
          {
            id: '3(d)', marks: 4, module: 'ch5-1',
            q: 'Send data 3 bits at a time at 3 Mbps using MFSK with carrier 30 MHz. Find the number of levels, the baud rate and the bandwidth.',
            answer: ['$L = 2^3 = 8$ frequencies.', '$S = N/r = 3\\text{ Mbps}/3 = 1$ Mbaud, so carriers are $2\\Delta f = S = 1$ MHz apart.', '$B = L \\times S = 8$ MHz, from 26 to 34 MHz.', 'Frequencies: 26.5, 27.5, … , 33.5 MHz around $f_c = 30$ MHz.'],
          },
          {
            id: '3(e)', marks: 4, module: 'pcm', flagged: true,
            q: 'Sampled values 5.3, 12.7, −5.8, −17.4, 18.5 V. Using PCM with 3-bit code words between −20 V and +20 V, find the normalized error and quantization code.',
            answer: [
              '$L = 2^3 = 8$ zones; $\\Delta = (20 - (-20))/8 = 5$ V.',
              'Normalize each sample (÷ 5), take the zone midpoint as the quantized value, error = quantized − normalized.',
              '5.3 → 1.06 → 1.5, error +0.44, code 5 = 101. 12.7 → 2.54 → 2.5, error −0.04, code 6 = 110.',
              '−5.8 → −1.16 → −1.5, error −0.34, code 2 = 010. −17.4 → −3.48 → −3.5, error −0.02, code 0 = 000.',
              '18.5 → 3.70 → 3.5, error −0.20, code 7 = 111.',
            ],
          },
        ],
      },
    ],
  },
];
