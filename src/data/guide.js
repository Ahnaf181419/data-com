// Beginner guide for every lesson, keyed by module id + exact section heading (like checks.js).
// plain: what the lesson is about, for someone meeting it for the first time.
// terms: [word, meaning] for every new word the lesson uses. recap: what to remember.
// Everything here restates the lesson and docs/source-transcript.md; nothing new is added.
export default {
  ch1: {
    'Communication and data': {
      plain: 'This course is about how information gets from one place to another. **Communication** just means sharing information, nearby (local) or far away (remote). What is shared is called **data**, and inside a computer every message ends up as bits.',
      terms: [
        ['Communication', 'Sharing of information, local or remote.'],
        ['Data', 'Information in a form both parties have agreed on. They also decide which data is accepted or rejected.'],
        ['Bits', 'How a computer represents a message; text, for example, becomes bits through Unicode.'],
      ],
      recap: ['Communication = sharing information, local or remote.', 'Voice, video and data can each travel wired (PSTN, cable TV, LAN) or wireless (cell phone, IP TV, WiFi).'],
    },
    'Five components': {
      plain: 'Every communication system, however big, is made of the same five parts: someone sends, someone receives, the message travels along some path, there is the message itself, and there are rules both sides follow. Once you can name these, you can describe any system in the course.',
      terms: [],
      recap: ['Sender, receiver, transmission medium, message, protocol.', 'Medium = the physical path (e.g. twisted wire). Protocol = the set of rules.'],
    },
    'Data flow': {
      plain: 'Data flow answers one question: which way can data travel between two devices, and can both talk at the same moment? There are only three answers.',
      terms: [],
      recap: ['**Simplex**: one way only.', '**Half-duplex**: both ways, but one at a time.', '**Full-duplex**: both ways at the same time.'],
    },
    'Effectiveness': {
      plain: 'How do we judge whether a communication system does its job? The notes give four tests: does the data reach the right place, is it correct, is it on time, and is the delay even?',
      terms: [['Jitter', 'Uneven delay in packet arrival time.']],
      recap: ['Delivery (addresses), accuracy (noise cancelled), timeliness (e.g. audio and video together), jitter.'],
    },
    Networks: {
      plain: 'When many devices need to communicate, they are joined into a **network**. Its performance is measured mainly by **delay**, and you must be able to calculate two kinds: propagation delay depends on the distance and the signal speed, and transmission delay depends on the message size and the data rate.',
      terms: [
        ['End device', 'Creates, reads and writes messages; can access all 7 OSI layers.'],
        ['Intermediate device', 'Only forwards messages; accesses up to the 3rd layer.'],
        ['Propagation delay $P_d$', 'Distance $D$ divided by propagation speed $S$.'],
        ['Transmission delay $T_d$', 'Message size $L$ (bits) divided by data rate $R$.'],
      ],
      recap: ['$P_d = D/S$ and $T_d = L/R$. Keep units matched: metres with m/s, bits with bps.', 'Reliability = fast recovery from failure. Security = encryption.'],
    },
    'Connection types and topologies': {
      plain: 'Two devices can have a link of their own (**point-to-point**), or many devices can share one link (**multipoint**). The pattern in which the links join all the devices is called the **topology**.',
      terms: [['Topology', 'The layout of the links between devices: mesh, star, ring or bus.']],
      recap: ['Mesh, star and ring are point-to-point; bus is multipoint.', 'Hybrids: star + bus, star + ring, ring + bus.'],
    },
  },

  ch4x: {
    'Why this chapter is here': {
      plain: 'This chapter is extra. Your slides and notes do not cover it, but a past final asked it, so treat it as a short method to follow rather than deep theory.',
      terms: [],
      recap: ['Two steps: 4B/5B coding first, then draw differential Manchester.', 'Ask your teacher whether it is still in the syllabus.'],
    },
    '4B/5B block coding': {
      plain: 'Long runs of 0s make it hard for the receiver to stay synchronized. 4B/5B fixes this by swapping each 4-bit group for a 5-bit code that never allows a long run of 0s. Doing it is pure table lookup.',
      terms: [
        ['Block coding', 'Replacing each fixed group of data bits with a longer code.'],
        ['Overhead', 'The extra bits added: 4 bits become 5, so 25% more.'],
      ],
      recap: ['Split into 4-bit groups from the left, look each up, write the codes in order.', 'Output is $5/4$ of the input; never more than three 0s in a row.'],
    },
    'Differential Manchester': {
      plain: 'Now the bits must be drawn as a signal. In differential Manchester you do not read a bit from the level; you read it from whether the line flips at the **start** of the bit. A flip in the **middle** happens on every bit.',
      terms: [['Transition', 'A flip of the line from high to low or low to high.']],
      recap: ['0 → flip at the start. 1 → no flip at the start.', 'Always flip in the middle.', 'Write down the starting level you assumed.'],
    },
  },

  'ch5-1': {
    'What and why': {
      plain: 'Computers produce digital data, but some channels only carry an analog signal in a band that does not start at 0 Hz (a **bandpass channel**). The fix: take an analog wave, the **carrier**, and change one of its properties to match the bits. Which property you change gives the methods of this chapter.',
      terms: [
        ['Carrier signal', 'The analog wave $s(t) = A\\sin(2\\pi f t + \\varphi)$ whose characteristic is changed by the data.'],
        ['$A$, $f$, $\\varphi$', 'Amplitude, frequency and phase: the three characteristics of $s(t)$ that can be changed.'],
        ['Bandpass channel', 'A channel whose bandwidth does not start from 0.'],
        ['Low-pass channel', 'A channel whose bandwidth starts from 0 (baseband transmission).'],
      ],
      recap: ['Amplitude → ASK, frequency → FSK, phase → PSK, amplitude + phase → QAM.', 'Digital-to-analog conversion needs a bandpass channel.'],
    },
    'Bit rate, baud rate, levels': {
      plain: 'Every calculation in this chapter starts here. A **signal element** can carry one bit or several. Bit rate counts bits per second, baud rate counts signal elements per second, and $r$ (bits per element) links them. The more bits each element carries, the fewer elements you need per second.',
      terms: [
        ['Bit rate $N$', 'Bits per second (bps).'],
        ['Baud rate $S$', 'Signal elements per second (baud).'],
        ['$r$', 'Data bits carried by one signal element.'],
        ['$L$', 'Number of different signal levels (elements): $L = 2^r$.'],
      ],
      recap: ['$S = N/r$ and $L = 2^r$.', '$r = 1$ means $S = N$; a bigger $r$ means $S < N$.', 'Example 5.1: 4 bits per element × 1000 elements/s = 4000 bps.'],
    },
    'Amplitude Shift Keying (ASK)': {
      plain: 'ASK is the simplest method: keep frequency and phase fixed and change only the amplitude of the carrier. In binary ASK a 1 keeps the carrier and a 0 makes its amplitude zero. Most exam questions here ask for the **bandwidth**: how many Hz the ASK signal needs.',
      terms: [
        ['Bit duration', 'The period of time that defines 1 bit. The peak amplitude stays constant during it.'],
        ['Unipolar NRZ', 'A digital signal at 1 V for high and 0 V for low.'],
        ['$d$', 'Modulation/filtering factor, between 0 and 1.'],
        ['$f_c$', 'The carrier frequency, placed in the middle of the band.'],
      ],
      recap: ['$B = (1+d)S$: $d = 0$ gives $B_{min} = S$, $d = 1$ gives $B_{max} = 2S$.', 'The band runs from $f_c - S/2$ to $f_c + S/2$.', 'Full-duplex: split the band in two, one carrier in the middle of each half.'],
    },
    'Frequency Shift Keying (FSK)': {
      plain: 'FSK keeps amplitude and phase fixed and uses two frequencies: one for 0 and one for 1, sitting $\\Delta f$ below and above $f_c$. Because two frequencies are used, FSK needs more bandwidth than ASK, and the derivation of that bandwidth can come in the exam.',
      terms: [
        ['$\\Delta f$', 'How far each of the two frequencies is from $f_c$; they are $2\\Delta f$ apart.'],
        ['Coherent / noncoherent', 'Whether the phase continues (coherent) or may jump (noncoherent) between signal elements.'],
        ['VCO', 'Voltage-controlled oscillator: its frequency rises when its input amplitude is positive.'],
      ],
      recap: ['$f_1 = f_c - \\Delta f$ (0), $f_2 = f_c + \\Delta f$ (1).', '$B = (1+d)S + 2\\Delta f$, and $B_{min} = 2S$.', 'Practise writing the derivation, not just the result.'],
    },
    'Multilevel FSK (MFSK)': {
      plain: 'MFSK extends FSK from 2 frequencies to $L$ frequencies, so each frequency stands for a group of bits. More frequencies means more bits per element, but every extra frequency adds bandwidth.',
      terms: [['$n_b$', 'Bits per signal element (the same idea as $r$).']],
      recap: ['$L = 2^{n_b}$.', '$B = (1+d)S + (L-1)\\,2\\Delta f$, and $B_{min} = L \\times S$.', 'Example 5.6: 8 frequencies 1 MHz apart → $B = 8$ MHz.'],
    },
    'Phase Shift Keying (PSK)': {
      plain: 'PSK keeps amplitude and frequency fixed and changes the phase each signal element starts at. **BPSK** uses two phases, 180° apart. **QPSK** sends 2 bits at once by adding two BPSK signals whose carriers are 90° apart.',
      terms: [
        ['Polar NRZ', 'A digital signal with a positive level for 1 and a negative level for 0.'],
        ['Quadrature', 'Shifted by 90°. The second QPSK carrier is in quadrature with the first.'],
        ['2/1 converter', 'Splits the bit stream: 1st bit to one carrier, 2nd bit to the other.'],
      ],
      recap: ['BPSK bandwidth is the same as ASK: $B = (1+d)S$.', 'QPSK phases: 11 → 45°, 01 → 135°, 00 → −135°, 10 → −45°, all at $\\sqrt2$ V.', 'With many phases they become hard to tell apart, which is why QAM exists.'],
    },
    'Constellation diagram': {
      plain: 'A constellation diagram draws every signal element as a dot. Read a dot like this: its **distance from the centre** is the amplitude and its **angle** is the phase. The horizontal axis is the in-phase carrier; the vertical axis is the quadrature carrier.',
      terms: [
        ['In-phase carrier', 'The X-axis carrier.'],
        ['Quadrature carrier', 'The Y-axis carrier, shifted 90°.'],
      ],
      recap: ['ASK (OOK): 0 at 0 V, 1 at 1 V, on the X-axis.', 'BPSK: 1 at +1, 0 at −1.', 'QPSK: four points at 45°, 135°, −135°, −45°.'],
    },
    'Quadrature Amplitude Modulation (QAM)': {
      plain: 'QAM combines ASK and PSK: it changes amplitude and phase together. On a constellation, dots can share an angle but sit at different distances, so more dots, and more bits per element, fit. The bandwidth formula does not change.',
      terms: [],
      recap: ['QAM = ASK + PSK, and $B = (1+d)S$.', '4-QAM with polar NRZ is exactly QPSK.', '8-QAM example: 24 bps at 8 baud → 3 bits per baud.'],
    },
  },

  'ch5-2': {
    'Why analog-to-analog': {
      plain: 'Here the information is already analog, but the medium is bandpass or only a bandpass channel is available. So the analog signal changes a carrier, as in chapter 5.1, except that the thing changing the carrier is now an analog signal instead of bits.',
      terms: [['Modulating signal', 'The analog information signal that changes the carrier.']],
      recap: ['Amplitude → AM, frequency → FM, phase → PM.', '$f_c$ always sits in the middle of the band.'],
    },
    'Amplitude Modulation (AM)': {
      plain: 'In AM the carrier amplitude follows the modulating signal, so the outline of the carrier, the **envelope**, has the shape of the original signal. Remember one formula: AM needs twice the bandwidth of the audio signal.',
      terms: [['Envelope', 'The outline of the AM carrier, shaped like the modulating signal.']],
      recap: ['$B_{AM} = 2B$.', 'Frequency and phase stay the same.', 'Made with a multiplier: modulating signal × carrier.'],
    },
    'AM band allocation': {
      plain: 'This lesson uses $B_{AM} = 2B$ on real AM radio. Each station gets a 10 kHz slot; you count how many slots fit into 530–1700 kHz and find where any station’s slot starts.',
      terms: [['FCC', 'Federal Communications Commission; it sets the AM spectrum.']],
      recap: ['5 kHz audio → 10 kHz per station; $(1700 - 530)/10 = 117$ stations.', 'Station $n$ starts at $(n-1) \\times 10 + 530$ kHz; its carrier is start + 5 kHz.'],
    },
    'Frequency Modulation (FM)': {
      plain: 'In FM the carrier frequency follows the amplitude of the modulating signal: positive pushes the frequency up, negative pulls it down. FM needs far more bandwidth than AM.',
      terms: [['$\\beta$', 'A factor in the FM bandwidth formula; commonly 4.']],
      recap: ['$B_{FM} = 2(1+\\beta)B$, about 10 times the modulating bandwidth.', 'Amplitude and phase stay constant. Made with a VCO.'],
    },
    'FM band allocation': {
      plain: 'Apply the FM formula to FM radio: 15 kHz stereo audio needs 150 kHz, plus a 50 kHz guard band, so each station gets 200 kHz between 88 and 108 MHz.',
      terms: [['Guard band', 'Unused frequencies between neighbours so they do not overlap.']],
      recap: ['$2(1+4) \\times 15 = 150$ kHz + 50 kHz = 200 kHz.', '20 MHz / 200 kHz = 100 slots, but only 50 operate in an area (alternate slots).', 'Station $n$ starts at $(n-1) \\times 200$ kHz + 88 MHz; carrier = start + 100 kHz.'],
    },
    'Phase Modulation (PM)': {
      plain: 'PM changes the carrier phase with the modulating signal. Mathematically it is the same as FM; the only difference is what drives the change: the amplitude of the modulating signal in FM, its **derivative** in PM.',
      terms: [['Derivative', 'The $d/dt$ step: PM passes the modulating signal through it before the VCO.']],
      recap: ['$B_{PM} = 2(1+\\beta)B$, with $\\beta = 2$ most often.', 'FM: amplitude drives the change. PM: derivative of the amplitude.'],
    },
  },

  'ch6-1': {
    Multiplexing: {
      plain: 'One link is often shared by many users, like many WiFi users sharing one line to the ISP. Multiplexing lets several signals travel over that single link at the same time: a MUX combines them at one end and a DEMUX separates them at the other.',
      terms: [
        ['Link', 'The physical path.'],
        ['Channel', 'The portion of a link that carries one transmission. One link can have $n$ channels.'],
        ['MUX / DEMUX', 'Many-to-one combiner / one-to-many separator.'],
      ],
      recap: ['FDM and WDM are analog; TDM is digital.'],
    },
    'Frequency-Division Multiplexing': {
      plain: 'In FDM each sender gets its own slice of the link’s frequency range. Each signal modulates a different carrier, so the signals sit side by side; the receiver uses filters to pull them apart again.',
      terms: [
        ['Composite signal', 'All the modulated signals added together on the link.'],
        ['Guard band', 'An unused strip of bandwidth between channels so signals do not overlap.'],
      ],
      recap: ['Used when link bandwidth > combined signal bandwidths.', 'MUX: modulate onto different carriers, then add. DEMUX: filter, then demodulate.', 'Example 6.1: three 4 kHz voice channels → 20–24, 24–28, 28–32 kHz.'],
    },
    'Checklist for FDM math': {
      plain: 'Every FDM question follows the same path: find each input’s bandwidth, then check that the total, with guard bands, fits in the link. If the inputs are digital, first turn their bit rates into bandwidths with the chapter 5.1 formulas.',
      terms: [
        ['Bandwidth', 'A difference value (high − low).'],
        ['Spectrum', 'A range, from low to high.'],
      ],
      recap: ['Analog inputs come with a bandwidth; digital inputs come with a bit rate.', '$B_{link} = n \\times B_{ch} + (n-1) \\times B_{guard}$.'],
    },
    'Analog hierarchy (AT&T)': {
      plain: 'Telephone companies build big channels from small ones in levels, using FDM. Twelve voice channels make a group, five groups a supergroup, ten supergroups a master group and six master groups a jumbo group.',
      terms: [],
      recap: ['12, 60, 600, 3600 voice channels.', '48 kHz, 240 kHz, 2.52 MHz, 16.984 MHz. The last two include guard bands.'],
    },
    'Applications of FDM': {
      plain: 'FDM is in AM and FM radio, television and first-generation cell phones. In broadcasting there is no physical MUX; the air is the shared link and the receiver filters (tunes) one station.',
      terms: [['AMPS', 'First-generation cellular: 824–849 MHz uplink, 869–894 MHz downlink.']],
      recap: ['AM 10 kHz, FM 200 kHz, TV 6 MHz per channel.', 'AMPS: 3 kHz voice, FM → 30 kHz channel; two per user = 60 kHz.'],
    },
  },

  'ch6-2': {
    'Time-Division Multiplexing': {
      plain: 'TDM shares a link by **time** instead of by frequency: each connection gets a turn on the link, one short time slot after another. It works on digital data only.',
      terms: [['Time slot', 'The portion of time on the link given to one connection.']],
      recap: ['FDM shares bandwidth; TDM shares time.', 'Two schemes: synchronous and statistical.'],
    },
    'Checklist for TDM math': {
      plain: 'TDM math has a fixed path too: make every input digital (PCM if it is analog), find each input’s data rate, and if the rates differ, fix that first.',
      terms: [],
      recap: ['Analog → PCM → digital.', 'Different rates → a data rate management technique.'],
    },
    'Synchronous TDM': {
      plain: 'In synchronous TDM every input gets its slot in every frame, whether or not it has data. A **frame** is one round: one unit from each input. The link must carry all $n$ inputs in the time one input sends one unit, so the link is $n$ times faster and each slot is $n$ times shorter.',
      terms: [
        ['Unit', 'The piece of an input’s data put into one slot: 1 bit or several bits.'],
        ['Frame', 'One unit from each input, in order. With $n$ inputs, at least $n$ slots.'],
      ],
      recap: ['Frame duration = one input unit duration $T$.', 'Output slot = $T/n$; link rate = $n$ × input rate; frame rate = $1/T$.'],
    },
    Interleaving: {
      plain: 'Interleaving is the name for how a frame is filled: take a unit from input 1, then input 2, and so on, in turn. Picture two fast switches, one at each end, rotating in step.',
      terms: [],
      recap: ['Interleaving = taking a group of bits from each input in turn.'],
    },
    'Data rate management': {
      plain: 'Synchronous TDM is simplest when every input has the same rate. When they do not, choose one of three fixes depending on how the rates relate to each other.',
      terms: [['Dummy bits', 'Extra bits added to a slower line so its rate matches.']],
      recap: ['Rates are multiples → **multilevel** multiplexing.', 'One line is a multiple of the others → **multiple-slot** allocation.', 'Not multiples → **pulse stuffing** up to the dominant rate.'],
    },
    'Frame synchronization': {
      plain: 'The receiver must know where each frame begins, or it hands bits to the wrong output. So a known pattern of sync bits, usually alternating 1, 0, 1, …, is placed between frames.',
      terms: [['Overhead', 'Bits sent that are not data, such as sync bits. They raise the link rate.']],
      recap: ['Wrong pattern at the receiver → error.', 'Sync bits add to the link data rate.'],
    },
    'Digital signal (DS) hierarchy': {
      plain: 'Like the analog hierarchy, phone companies stack digital channels in levels. DS-0 is one 64 kbps voice channel; each level multiplexes several of the level below and adds overhead. T lines are the physical lines that carry each level.',
      terms: [['DS / T', 'DS-n names the service; T-n is the line that implements it.']],
      recap: ['DS-1 = 24 DS-0 = 1.544 Mbps; DS-2 = 4 DS-1; DS-3 = 7 DS-2; DS-4 = 6 DS-3.', 'Only T-1 and T-3 are commercial. Europe uses E lines.'],
    },
    'T-1 for analog transmission': {
      plain: 'A T-1 line carries 24 telephone calls even though calls are analog: each call is first sampled (PCM), then the 24 digital streams are time-division multiplexed. You should be able to rebuild 1.544 Mbps from scratch.',
      terms: [],
      recap: ['Frame = $24 \\times 8 + 1 = 193$ bits.', '8000 frames/s → $193 \\times 8000 = 1.544$ Mbps.'],
    },
    'Statistical TDM': {
      plain: 'Synchronous TDM wastes slots on inputs with nothing to send. Statistical TDM gives slots only to inputs that have data, so frames have fewer slots, but each slot must now carry an address saying which output it belongs to.',
      terms: [['Round-robin', 'Checking the input lines one after another in a fixed order.']],
      recap: ['Address bits $= \\log_2 N$ (8 outputs → 3 bits).', 'No sync bits; link capacity below the sum of the inputs.', 'Keep each data block large compared with its address.'],
    },
  },

  pcm: {
    'Why PCM appears in TDM': {
      plain: 'TDM only takes digital input, but voice is analog. PCM is the converter in between: it turns each analog voice line into a stream of bits so it can enter the TDM multiplexer.',
      terms: [['PCM', 'Pulse code modulation: sampling, quantization, encoding.']],
      recap: ['Three steps: sampling, quantization, encoding.'],
    },
    '1. Sampling (Nyquist)': {
      plain: 'The first step decides how many samples to take per second. The Nyquist theorem gives the answer: twice the highest frequency in the signal.',
      terms: [['$f_h$', 'The highest frequency of the signal.']],
      recap: ['$f_s = 2 f_h$.', 'Voice: 0–4 kHz → 8000 samples/s.'],
    },
    '2. Quantization': {
      plain: 'Next, each sample is given a fixed number of bits. The bits per sample set how many levels are possible, and the bit rate is samples per second × bits per sample.',
      terms: [['$n_b$', 'Bits per sample.']],
      recap: ['$N = f_s \\times n_b$ and $L = 2^{n_b}$.', '64 kbps / 8000 = 8 bits/sample → 256 levels.'],
    },
    'Quantization zones and normalized error': {
      plain: 'This method is extra (not in your slides or notes) but a past final asked it. The idea: cut the voltage range into $L$ equal zones, replace each sample by the middle of its zone, and send the zone number in binary.',
      terms: [['$\\Delta$', 'The height of one zone: range ÷ $L$.']],
      recap: ['Normalized = sample ÷ $\\Delta$. Error = quantized − normalized, between −0.5 and +0.5.', 'Zones are numbered from 0 at the bottom.'],
    },
    'PCM bandwidth': {
      plain: 'Once voice is a bit stream, it needs a channel. For NRZ, the minimum bandwidth is half the bit rate.',
      terms: [],
      recap: ['$B_{min} = f_s \\times n_b / 2$.'],
    },
    'The full T-1 chain': {
      plain: 'This lesson ties TDM and PCM together: 24 voice channels → PCM → TDM → one T-1 line. If you can explain each arrow, you understand this whole part of the course.',
      terms: [],
      recap: ['24 × 64 kbps + 8 kbps overhead = 1.544 Mbps.', '1544 / 24 = 64.33 kbps; the part above 64 is overhead.'],
    },
  },

  'ch7-1': {
    'Transmission media': {
      plain: 'Until now everything travelled over “a link”. This chapter is about what that link physically is. There are two families: **guided** media, where a cable guides the signal, and **unguided** media, where it travels through free space.',
      terms: [['Transmission medium', 'The physical path between transmitter and receiver, directly controlled by the physical layer.']],
      recap: ['Guided: twisted-pair, coax, fiber. Unguided: free space.', 'Copper carries electric current; fiber carries light.'],
    },
    'Twisted-pair cable': {
      plain: 'Twisted-pair is two insulated copper wires twisted together. One carries the signal and one is the ground reference; the receiver uses the difference. Twisting balances the effect of unwanted signals, so noise and crosstalk are reduced.',
      terms: [
        ['STP / UTP', 'Shielded (metal foil around the pair) / unshielded twisted pair.'],
        ['Crosstalk', 'One of the unwanted effects, with interference and noise, that parallel wires suffer.'],
      ],
      recap: ['UTP connector: RJ-45.', 'Used in telephone lines, DSL, 10Base-T and 100Base-T LANs.', 'Cheap and easy, but noisy, low bandwidth, needs repeaters.'],
    },
    'Coaxial cable': {
      plain: 'Coax carries higher frequencies than twisted pair. A central conductor sits inside an insulator, then an outer metal conductor that both shields against noise and completes the circuit.',
      terms: [['BNC', 'The coax connector (also BNC T and the 50-Ω terminator).']],
      recap: ['Higher bandwidth (400–600 MHz), less interference than twisted pair.', 'Cable TV (RG-59), Thin Ethernet (RG-58, 185 m), Thick Ethernet (RG-11, 500 m).'],
    },
    'Fiber-optic cable: how light is guided': {
      plain: 'Fiber carries light instead of current. Whether light leaves the glass or bounces back depends on its angle compared with the **critical angle**. Fiber is built so the light always reflects back into the core.',
      terms: [
        ['Critical angle', 'The angle at which light bends along the interface instead of leaving or reflecting.'],
        ['Refraction / reflection', 'Bending into the other substance / bouncing back into the denser one.'],
        ['Core / cladding', 'The glass or plastic centre / the less dense layer around it.'],
      ],
      recap: ['Less than critical → refracts. Equal → along the interface. Greater → reflects.'],
    },
    'Propagation modes': {
      plain: 'Light can travel through the core along many paths (multimode) or almost one (single mode). The fewer the paths, the less the output pulse is distorted.',
      terms: [['Step-index / graded-index', 'Core density constant / highest at the centre and decreasing to the edge.']],
      recap: ['Most distorted: multimode step-index. Less: graded-index. Almost none: single mode.'],
    },
    'Fiber construction and connectors': {
      plain: 'A fiber cable is built in layers to protect the thin core, and it uses its own connectors.',
      terms: [['Kevlar', 'Strands that give the cable strength.']],
      recap: ['Outside in: jacket, Kevlar, buffer, cladding, core.', 'SC (cable TV), ST (networking devices), MT-RJ (RJ-45 size).'],
    },
    'Fiber applications, pros and cons': {
      plain: 'Fiber’s wide bandwidth makes it the choice for backbones. Its downsides are cost, the expertise it needs, and one-way light.',
      terms: [],
      recap: ['Pros: bandwidth, low attenuation, no EM interference, hard to tap, light.', 'Cons: expertise, two fibers for two-way, cost.'],
    },
  },

  'ch7-2': {
    'Wireless communication': {
      plain: 'Unguided (wireless) media send electromagnetic waves through free space, with no conductor. Anyone with a capable receiver can pick them up. Different frequency ranges are used for radio/microwave, infrared and light.',
      terms: [],
      recap: ['3 kHz–300 GHz radio and microwave; 300 GHz–400 THz infrared; 400–900 THz light.'],
    },
    Antennas: {
      plain: 'An antenna is the conductor that radiates waves into space and collects them back; in two-way communication the same antenna does both. The types differ by length compared with the wavelength, and by shape.',
      terms: [
        ['Isotropic antenna', 'An ideal antenna that radiates equally in all directions (a sphere).'],
        ['$\\lambda$', 'Wavelength: $\\lambda = c/f$.'],
      ],
      recap: ['Half-wave dipole (Hertz): $\\lambda/2$. Quarter-wave (Marconi): $\\lambda/4$.', 'Parabolic: terrestrial microwave and satellite.'],
    },
    'Antenna gain and effective area': {
      plain: '**Gain** says how much more power an antenna radiates in one direction than the isotropic antenna does. It depends on the **effective area**, which measures how good the antenna is at receiving power.',
      terms: [['Effective area $A_e$', 'Related to the antenna’s size and shape; how effective it is at receiving.']],
      recap: ['$G = 4\\pi A_e / \\lambda^2 = 4\\pi f^2 A_e / c^2$.', 'Parabolic dish: $A_e = 0.56A$.'],
    },
    'Propagation modes': {
      plain: 'How a wireless signal travels depends on its frequency. Below 3 MHz it follows the earth, from 3 to 30 MHz it bounces off the ionosphere, and above 30 MHz the two antennas must be in line of sight.',
      terms: [['Ionosphere', 'The layer that reflects sky waves (3–30 MHz) back to earth.']],
      recap: ['Ground wave < 3 MHz (AM radio). Sky wave 3–30 MHz. Line of sight > 30 MHz (satellite, microwave).'],
    },
    'Line-of-sight calculations': {
      plain: 'For line-of-sight signals, the curve of the earth limits the distance. These formulas give the distance from an antenna of height $h$ to the horizon, and the longest link between two antennas.',
      terms: [['$K$', 'Refraction adjustment factor, $4/3$.']],
      recap: ['$h$ in metres, $d$ in km.', 'Radio LOS: $d = 3.57\\sqrt{Kh}$; two antennas: $d = 3.57(\\sqrt{Kh_1} + \\sqrt{Kh_2})$.'],
    },
    'Wireless transmission waves': {
      plain: 'This lesson compares the three wave types side by side. Learn the table row by row: frequency, antenna, how they travel, walls and examples.',
      terms: [],
      recap: ['Radio: omnidirectional, through walls. Microwave: unidirectional, line of sight. Infrared: short range, no walls.'],
    },
  },

  ch8: {
    'Why switching': {
      plain: 'Wiring every device to every other device is impractical for a big network. Instead, devices connect through **switches**, which create temporary connections when needed.',
      terms: [['Switch', 'A device that creates temporary connections between two or more devices.']],
      recap: ['Circuit-switched, packet-switched (datagram, virtual-circuit), message-switched.'],
    },
    'Circuit switching': {
      plain: 'In circuit switching a dedicated path through the switches is set up before any data flows, then data flows, then the path is released. Because the path is reserved there is no delay during transfer, but there is a setup delay first.',
      terms: [
        ['Setup / teardown', 'Creating / releasing the dedicated channels.'],
        ['$P_d$, $T_d$', 'Propagation delay $D/S$ and transmission delay $L/R$ from chapter 1.'],
      ],
      recap: ['Physical layer; data not packetized.', 'Setup = $2P_d + 2T_d$; data and teardown = $P_d + T_d$ each.', 'Low efficiency: resources held even when idle.'],
    },
    'Message switching': {
      plain: 'Message switching sends the whole message hop by hop: each node stores it completely, then forwards it. It is not used today, but know the name **store-and-forward**.',
      terms: [],
      recap: ['No dedicated path; each node buffers the entire message.'],
    },
    'Packet switching: datagram networks': {
      plain: 'In a datagram network the message is cut into packets, and each packet travels on its own with its own addresses. Nothing is reserved, so packets may wait at switches, take different paths and arrive out of order.',
      terms: [
        ['Datagram', 'A packet treated independently of the others.'],
        ['Router', 'The switch in a datagram network.'],
        ['Routing table', 'Destination address → output port.'],
        ['Connectionless', 'No setup or teardown phase.'],
      ],
      recap: ['Network layer.', 'Two switches: total delay $= 3T + 3\\tau + w_1 + w_2$.'],
    },
    'Virtual-circuit networks': {
      plain: 'A virtual-circuit network mixes the two: it sets up a path first, like circuit switching, but sends data in packets, like a datagram network. Every packet follows the same path and carries a small label, the **VCI**, which each switch rewrites.',
      terms: [
        ['Global address', 'Unique address used only to set up the virtual circuit.'],
        ['VCI', 'Virtual-circuit identifier: small, used during data transfer, changes from link to link.'],
      ],
      recap: ['Data-link layer.', 'Total delay $= 3T + 3\\tau$ + setup + teardown.'],
    },
    'Switch structure: crossbar': {
      plain: 'Now look inside a switch. A crossbar is a grid: every input crosses every output, with a crosspoint at each crossing. Anyone can reach anyone at once (non-blocking), but the number of crosspoints grows very fast.',
      terms: [['Crosspoint', 'A transistor at one input/output intersection.']],
      recap: ['Crosspoints $= n \\times m$; $1000 \\times 1000 = 10^6$.'],
    },
    'Multistage switch': {
      plain: 'A multistage switch uses three stages of smaller crossbars to cut the crosspoint count. The risk is **blocking**: with too few middle crossbars some connections cannot be made. The Clos criterion says how many middle crossbars avoid it.',
      terms: [['Blocking', 'An input cannot reach a free output because the paths inside are busy.']],
      recap: ['Total $= 2kN + k(N/n)^2$.', 'Clos: $n = \\sqrt{N/2}$, $k \\ge 2n - 1$.'],
    },
    'Time-division switching': {
      plain: 'Time-division switching swaps time slots instead of wires. A TSI stores incoming slots in memory and reads them out in a new order. TST puts TSIs on both sides of a crossbar.',
      terms: [['TSI', 'Time-slot interchange: control unit + RAM that reorders slots.']],
      recap: ['Memory locations = time slots; location size = bits per slot.', 'TST: time → space → time, non-blocking.'],
    },
  },

  ch10: {
    Errors: {
      plain: 'Noise can change bits while they travel. This chapter is about noticing when that happens (**detection**) and fixing it (**correction**). First, know the two kinds of error.',
      terms: [
        ['Single-bit error', 'Only one bit of the data unit changes.'],
        ['Burst error', 'Two or more bits change; length runs from the first to the last bad bit.'],
      ],
      recap: ['Single-bit: possible in parallel transmission (one noisy wire).', 'Burst: likely in serial transmission (noise lasts longer than one bit).'],
    },
    'Redundancy and detection': {
      plain: 'The receiver has no copy of the original, so how can it tell the data is wrong? The sender adds extra bits worked out from the data; the receiver checks them and removes them.',
      terms: [
        ['Redundancy', 'The extra bits added for checking.'],
        ['Dataword / codeword', 'The data before / after the extra bits are added.'],
      ],
      recap: ['Detection methods: parity, CRC, checksum.', 'Correction also needs the number and positions of the bad bits.'],
    },
    'Parity check (VRC)': {
      plain: 'The simplest check: add one bit so the number of 1s is even (or odd). If a single bit flips, the count is wrong and the receiver notices.',
      terms: [['Even / odd parity', 'The parity bit makes the count of 1s even / odd.']],
      recap: ['Assume even if not stated.', 'Detects all single-bit errors and an odd number of flips; misses an even number.'],
    },
    'Two-dimensional parity': {
      plain: 'Arrange the data in rows, give every row a parity bit, then add a whole row of column parity bits. Each bit is now checked twice, once by its row and once by its column.',
      terms: [],
      recap: ['Row parity + a column-parity row.', 'Misses two bad bits in one unit matched by two in the same positions in another.'],
    },
    'Cyclic Redundancy Check (CRC)': {
      plain: 'CRC uses division instead of counting 1s. The sender picks a remainder, the CRC, so that data + CRC divides exactly by an agreed divisor. The receiver divides again; any remainder means an error. The division uses XOR for subtraction.',
      terms: [
        ['Modulo-2 division', 'Binary long division where subtraction is XOR.'],
        ['Divisor', 'The $n$-bit pattern both sides agree on.'],
        ['Syndrome', 'The receiver’s remainder; all 0 means accept.'],
      ],
      recap: ['Append $n - 1$ zeros, divide, the remainder is the CRC.', 'Leftmost bit 0 → divide by all zeros for that step.', 'Detects single-bit and burst errors.'],
    },
    Checksum: {
      plain: 'Checksum works by adding: split the data into sections, add them with one’s complement arithmetic, and send the complement of the sum. The receiver adds everything, including the checksum, and complements; 0 means the data is accepted.',
      terms: [['One’s complement addition', 'Add, then wrap any carry back around into the sum.']],
      recap: ['Example: 7, 11, 12, 0, 6 → sum 36 → wrap → 6 → checksum 9.', 'Receiver result 0 → accept.'],
    },
    'Error correction': {
      plain: 'Detection only says that something is wrong. Correction must also say **where**. To point at one bad bit among all positions, or say “no error”, the redundant bits need enough combinations.',
      terms: [['FEC', 'Forward error correction: the receiver fixes the error itself instead of asking for a resend.']],
      recap: ['$2^r \\ge k + r + 1$.', '4 data bits → 3 redundant bits (7 total); 7 data bits → 4 (11 total).'],
    },
    'Hamming code': {
      plain: 'Hamming code is the correction method in this course. Parity bits sit at positions 1, 2, 4, 8, …, and each checks a fixed set of positions. At the receiver, the checks that fail spell out, in binary, the position of the bad bit.',
      terms: [['$r_1, r_2, r_4, r_8$', 'Parity bits at positions 1, 2, 4, 8, each using even parity over its positions.']],
      recap: ['$r_1$: check 1 skip 1; $r_2$: check 2 skip 2; $r_4$: check 4 skip 4; $r_8$: check 8 skip 8.', 'Read $r_8 r_4 r_2 r_1$ → bad position; flip it; drop the parity bits.'],
    },
  },
};
