export default {
  id: 'ch7-2',
  chapter: '7.2',
  title: 'Unguided Media',
  wave: 'radio',
  sources: ['ch7_2 slides'],
  sections: [
    {
      heading: 'Wireless communication',
      blocks: [
        { type: 'p', text: 'Unguided media carry electromagnetic waves without a physical conductor (wireless communication). Signals are broadcast through free space and are available to anyone with a capable receiver.' },
        { type: 'table', head: ['Range', 'Use'], rows: [['3 kHz – 300 GHz', 'Radio wave and microwave'], ['300 GHz – 400 THz', 'Infrared'], ['400 THz – 900 THz', 'Light wave']] },
      ],
    },
    {
      heading: 'Antennas',
      blocks: [
        { type: 'p', text: 'An antenna is an electrical conductor (or system of conductors). For **transmission** it radiates electromagnetic energy into space; for **reception** it collects energy from space. In two-way communication the same antenna does both.' },
        { type: 'list', items: ['**Isotropic** (idealized) – radiates equally in all directions; the radiation pattern is a sphere.', '**Half-wave dipole (Hertz)** – physical length $\\lambda/2$.', '**Quarter-wave vertical (Marconi)** – physical length $\\lambda/4$.', '**Parabolic reflector** – used in terrestrial microwave and satellite applications.'] },
      ],
    },
    {
      heading: 'Antenna gain and effective area',
      blocks: [
        { type: 'p', text: '**Gain** is the power output in a particular direction compared to a perfect omnidirectional (isotropic) antenna: $G = $ power radiated by the antenna / power radiated by the reference antenna.' },
        { type: 'p', text: '**Effective area** $A_e$ relates to the antenna’s physical size and shape; it measures how effective the antenna is at receiving power.' },
        { type: 'math', tex: 'G = \\frac{4\\pi A_e}{\\lambda^2} = \\frac{4\\pi f^2 A_e}{c^2}, \\qquad c = 3\\times10^8\\text{ m/s},\\ \\lambda = \\frac{c}{f}' },
        { type: 'table', head: ['Antenna', 'Effective area $A_e$ (m²)', 'Gain (vs isotropic)'], rows: [['Isotropic', '$\\lambda^2/4\\pi$', '1'], ['Infinitesimal dipole or loop', '$1.5\\lambda^2/4\\pi$', '1.5'], ['Half-wave dipole', '$1.64\\lambda^2/4\\pi$', '1.64'], ['Horn, mouth area A', '$0.81A$', '$10A/\\lambda^2$'], ['Parabolic, face area A', '$0.56A$', '$7A/\\lambda^2$'], ['Turnstile (two crossed dipoles)', '$1.15\\lambda^2/4\\pi$', '1.15']] },
      ],
    },
    {
      heading: 'Propagation modes',
      blocks: [
        { type: 'table', head: ['Mode', 'Frequency', 'Behaviour', 'Example'], rows: [['Ground wave', '< 3 MHz (30 Hz – 3 MHz: ELF, VF, VLF, LF, MF)', 'Follows the contour of the earth; travels considerable distances', 'AM radio'], ['Sky wave', '3 – 30 MHz (HF)', 'Reflected from the ionosphere; can hop back and forth between ionosphere and earth', 'International broadcast'], ['Line of sight', '> 30 MHz (30 MHz – 900 THz: VHF, UHF, SHF, EHF, infrared, optical)', 'Ground and sky wave do not work; antennas must be within effective LOS', 'Satellite, terrestrial microwave']] },
        { type: 'p', text: 'Above 30 MHz the ionosphere does not reflect signals, so satellites are reachable. On the ground, refraction extends the effective LOS beyond the optical horizon.' },
      ],
    },
    {
      heading: 'Line-of-sight calculations',
      blocks: [
        { type: 'p', text: '$h$ = antenna height (m), $d$ = distance between antenna and horizon (km), $K = 4/3$ (adjustment factor for refraction).' },
        { type: 'math', tex: '\\text{Optical LOS: } d = 3.57\\sqrt{h} \\qquad \\text{Radio LOS: } d = 3.57\\sqrt{Kh}' },
        { type: 'math', tex: 'd_{max} = 3.57\\left(\\sqrt{Kh_1} + \\sqrt{Kh_2}\\right)' },
        { type: 'note', text: 'Slide practice problems (no solution given): (1) find the optimum distance from the ground for a half-wave dipole antenna at 15 MHz; (2) find the height of a TV station antenna that must reach customers up to 80 km away (worked in Examples using the formula above).' },
      ],
    },
    {
      heading: 'Wireless transmission waves',
      blocks: [
        { type: 'table', head: ['', 'Radio waves', 'Microwaves', 'Infrared'], rows: [['Frequency', '3 kHz – 1 GHz', '1 – 300 GHz', '300 GHz – 400 THz (1 mm – 770 nm)'], ['Antenna', 'Omnidirectional', 'Unidirectional', '—'], ['Propagation', 'Sky mode; long distances', 'Line of sight', 'Line of sight, short range'], ['Walls', 'Penetrate', 'Very high frequencies cannot', 'Cannot (prevents interference between systems)'], ['Examples', 'AM and FM radio, television', 'Cellular phones, satellite networks, wireless LANs', 'Short-range communication in a closed area']] },
      ],
    },
  ],
  formulas: [
    { label: 'Antenna gain', tex: 'G = \\frac{4\\pi A_e}{\\lambda^2} = \\frac{4\\pi f^2 A_e}{c^2}', where: 'c = 3×10⁸ m/s' },
    { label: 'Wavelength', tex: '\\lambda = \\frac{c}{f}', where: '' },
    { label: 'Parabolic antenna', tex: 'A_e = 0.56A,\\ G = \\frac{7A}{\\lambda^2}', where: 'A = face area' },
    { label: 'Gain in dB', tex: 'G_{dB} = 10\\log_{10} G', where: '' },
    { label: 'Optical LOS', tex: 'd = 3.57\\sqrt{h}', where: 'h in m, d in km' },
    { label: 'Radio LOS', tex: 'd = 3.57\\sqrt{Kh}', where: 'K = 4/3' },
    { label: 'Max LOS distance', tex: 'd_{max} = 3.57(\\sqrt{Kh_1} + \\sqrt{Kh_2})', where: '' },
  ],
  examples: [
    { title: 'Parabolic antenna gain', source: 'ch7_2 slides', question: 'A parabolic reflector antenna has a 2 m diameter and operates at 12 GHz. Find the effective area and gain.', steps: ['$A = \\pi r^2 = \\pi (1)^2 = \\pi$ m²', '$A_e = 0.56A = 0.56\\pi \\approx 1.76$ m²', '$\\lambda = c/f = 3\\times10^8 / 12\\times10^9 = 0.025$ m', '$G = 7A/\\lambda^2 = 7\\pi / 0.025^2 \\approx 35{,}186$', '$G_{dB} = 10\\log_{10}(35186)$'], answer: '$A_e \\approx 1.76$ m², $G \\approx 35{,}186$ = 45.46 dB' },
    { title: 'LOS example 1', source: 'ch7_2 slides', question: 'Max LOS distance between two antennas if one is 100 m high and the other is at ground level?', steps: ['$d_{max} = 3.57(\\sqrt{Kh_1} + 0)$', '$= 3.57\\sqrt{\\tfrac43 \\times 100}$'], answer: '≈ 41 km' },
    { title: 'LOS example 2', source: 'ch7_2 slides', question: 'If the receiving antenna is 10 m high, how high must the transmitter be for the same 41 km?', steps: ['$41 = 3.57\\left(\\sqrt{Kh_1} + \\sqrt{\\tfrac43 \\times 10}\\right)$', '$\\sqrt{Kh_1} = 41/3.57 - \\sqrt{13.33} = 7.84$', '$h_1 = 7.84^2 / 1.33$'], answer: '$h_1 \\approx 46.2$ m (saving over 50 m)' },
    { title: 'TV antenna for 80 km', source: 'ch7_2 practice problem 2', question: 'Find the height of a TV station antenna that must reach customers up to 80 km away (receiver at ground level).', steps: ['$80 = 3.57\\sqrt{Kh}$', '$\\sqrt{Kh} = 80/3.57 = 22.41$', '$h = 22.41^2 / (4/3)$'], answer: '$h \\approx 376.6$ m' },
  ],
  flashcards: [
    { front: 'Half-wave dipole (Hertz) length', back: '$\\lambda/2$.' },
    { front: 'Quarter-wave vertical (Marconi) length', back: '$\\lambda/4$.' },
    { front: 'Isotropic antenna', back: 'Ideal; radiates equally in all directions (sphere). Gain = 1.' },
    { front: 'Gain–effective area relation', back: '$G = 4\\pi A_e/\\lambda^2 = 4\\pi f^2 A_e/c^2$.' },
    { front: 'Parabolic antenna $A_e$ and $G$', back: '$A_e = 0.56A$, $G = 7A/\\lambda^2$.' },
    { front: 'Ground wave range', back: 'Below 3 MHz; follows the earth’s contour (AM radio).' },
    { front: 'Sky wave range', back: '3–30 MHz (HF); reflects off the ionosphere (international broadcast).' },
    { front: 'Line-of-sight range', back: 'Above 30 MHz (VHF and up).' },
    { front: 'Radio LOS formula', back: '$d = 3.57\\sqrt{Kh}$, K = 4/3.' },
    { front: 'Radio vs micro vs infrared frequency', back: 'Radio 3 kHz–1 GHz, microwave 1–300 GHz, infrared 300 GHz–400 THz.' },
    { front: 'Which waves penetrate walls?', back: 'Radio waves. High-frequency microwaves and infrared cannot.' },
  ],
  quiz: [
    { q: 'An antenna of length λ/4 is called:', options: ['Hertz', 'Marconi', 'Isotropic', 'Turnstile'], answer: 1, explain: 'Quarter-wave vertical = Marconi.' },
    { q: 'Sky wave propagation uses frequencies of:', options: ['< 3 MHz', '3–30 MHz', '> 30 MHz', '1–300 GHz'], answer: 1, explain: 'HF band.' },
    { q: 'Gain of a half-wave dipole relative to isotropic:', options: ['1', '1.5', '1.64', '1.15'], answer: 2, explain: 'From the table.' },
    { q: 'Max LOS distance, h₁ = 100 m, h₂ = 0 (K = 4/3):', options: ['35.7 km', '41 km', '82 km', '20 km'], answer: 1, explain: '$3.57\\sqrt{133.3}$.' },
    { q: 'Microwaves use which kind of antenna?', options: ['Omnidirectional', 'Unidirectional', 'Isotropic', 'None'], answer: 1, explain: 'Radio waves use omnidirectional antennas.' },
    { q: 'Wavelength of a 12 GHz carrier:', options: ['0.25 m', '0.025 m', '2.5 m', '0.0025 m'], answer: 1, explain: '$3\\times10^8/12\\times10^9$.' },
    { q: 'Infrared cannot penetrate walls. This is useful because it:', options: ['Increases range', 'Prevents interference between systems', 'Lowers cost', 'Raises bandwidth'], answer: 1, explain: 'Each room’s system stays separate.' },
    { q: 'AM radio travels mainly by:', options: ['Ground wave', 'Sky wave', 'Line of sight', 'Fiber'], answer: 0, explain: 'Ground wave, below 3 MHz.' },
  ],
  solvers: ['los', 'antenna'],
};
