export default {
  id: 'ch7-1',
  chapter: '7.1',
  title: 'Guided Media',
  wave: 'guided',
  sources: ['ch7_1 slides'],
  sections: [
    {
      heading: 'Transmission media',
      blocks: [
        { type: 'p', text: 'A transmission medium is the physical path between transmitter and receiver. It sits below the physical layer and is directly controlled by it.' },
        { type: 'list', items: ['**Guided (wired):** twisted-pair, coaxial, fiber-optic cable.', '**Unguided (wireless):** free space.'] },
        { type: 'p', text: 'Guided media guide waves along a physical path. Twisted pair and coax use metallic (copper) conductors that carry signals as **electric current**; optical fiber carries signals as **light**.' },
      ],
    },
    {
      heading: 'Twisted-pair cable',
      blocks: [
        { type: 'p', text: 'Two insulated copper conductors twisted together. One wire carries the signal, the other is the ground reference; the receiver uses the difference between them. Parallel wires suffer heavily from interference, noise and crosstalk; twisting balances the effect of unwanted signals and reduces it.' },
        { type: 'list', items: ['**STP (shielded)** – the pair is wrapped in metallic foil to block electromagnetic interference.', '**UTP (unshielded)** – each wire is insulated with plastic, and the pair is encased in an outer covering. Connector: **RJ-45**.'] },
        { type: 'p', text: '**Applications:** telephone lines (local loop) for voice and data, DSL lines, and LANs such as 10Base-T and 100Base-T.' },
        { type: 'table', head: ['Advantages', 'Disadvantages'], rows: [['Inexpensive and readily available', 'Susceptible to interference and noise'], ['Flexible and light weight', 'Attenuation: repeaters every 5–6 km (analog), 2–3 km (digital)'], ['Easy to work with and install', 'Relatively low bandwidth (3000 Hz)']] },
      ],
    },
    {
      heading: 'Coaxial cable',
      blocks: [
        { type: 'p', text: 'Coax carries higher frequency ranges than twisted pair. It has a solid central core conductor, an insulator, an outer conductor of metal foil and/or braid, and a plastic cover. The outer conductor is both a shield against noise and the second conductor that completes the circuit.' },
        { type: 'p', text: 'Connectors: **BNC** connector, BNC T connector, 50-Ω BNC terminator.' },
        { type: 'list', items: ['Analog telephone networks: one cable carried 10,000 voice signals; later digital telephone networks at 600 Mbps.', 'Cable TV: the traditional network used RG-59 coax throughout.', 'Traditional Ethernet: 10Base-2 (Thin Ethernet) uses RG-58 at 10 Mbps for 185 m; 10Base-5 (Thick Ethernet) uses RG-11 at 10 Mbps for 500 m.'] },
        { type: 'table', head: ['Advantages', 'Disadvantages'], rows: [['Higher bandwidth: 400–600 MHz, up to 10,800 voice conversations', 'More expensive to install than twisted pair'], ['Can be tapped easily (pros and cons)', 'The thicker the cable, the harder it is to work with'], ['Much less susceptible to interference than twisted pair', '']] },
      ],
    },
    {
      heading: 'Fiber-optic cable: how light is guided',
      blocks: [
        { type: 'p', text: 'Fiber is glass or plastic and carries signals as light. Light travels straight through a uniform substance but changes direction when it enters a substance of different density:' },
        { type: 'list', items: ['Angle of incidence **less than** the critical angle → the ray **refracts** and moves closer to the surface.', 'Angle **equal to** the critical angle → the light bends along the interface.', 'Angle **greater than** the critical angle → the ray **reflects** and travels again in the denser substance.'] },
        { type: 'p', text: 'Optical fibers use reflection: a glass or plastic **core** is surrounded by a less dense **cladding**, so a beam in the core reflects off the cladding instead of refracting into it.' },
      ],
    },
    {
      heading: 'Propagation modes',
      blocks: [
        { type: 'list', items: ['**Multimode step-index** – core density constant from centre to edge. Some beams go straight through; some hit the interface below the critical angle and are lost in the cladding; others reflect back and forth. The output pulse is the most distorted.', '**Multimode graded-index** – density is highest at the centre and decreases gradually to the edge, which bends beams back smoothly. Less distortion.', '**Single mode** – step-index fiber with a highly focused light source limiting beams to angles close to horizontal. Smaller diameter and much lower density, so the critical angle is close to 90° and propagation is almost horizontal. The pulse is almost undistorted.'] },
        { type: 'p', text: 'Multimode gets its name from multiple beams travelling through the core on different paths.' },
      ],
    },
    {
      heading: 'Fiber construction and connectors',
      blocks: [
        { type: 'p', text: 'From the outside in: outer jacket (PVC or Teflon), **Kevlar** strands for strength (the material used in bulletproof vests), a plastic buffer to cushion the fiber, then the cladding and core.' },
        { type: 'list', items: ['**SC** (subscriber channel) – cable TV.', '**ST** (straight-tip) – connecting cable to networking devices.', '**MT-RJ** – the same size as RJ-45.'] },
      ],
    },
    {
      heading: 'Fiber applications, pros and cons',
      blocks: [
        { type: 'list', items: ['Cable TV hybrid networks: fiber backbone, coax to the user.', 'LANs such as 100Base-FX (Fast Ethernet) and 1000Base-X.', 'Backbone networks, because of the wide bandwidth.'] },
        { type: 'table', head: ['Advantages', 'Disadvantages'], rows: [['Higher bandwidth', 'Installation and maintenance need expertise not available everywhere'], ['Less signal attenuation', 'Unidirectional light: two fibers needed for two-way'], ['Immune to electromagnetic interference', 'Cost: cable and interfaces cost more than other guided media'], ['Resists corrosive materials', ''], ['Light weight', ''], ['Greater immunity to tapping (copper acts like an antenna)', '']] },
      ],
    },
  ],
  formulas: [],
  examples: [],
  flashcards: [
    { front: 'Three guided media', back: 'Twisted-pair, coaxial, fiber-optic.' },
    { front: 'Why twist the pair?', back: 'Twisting balances the effect of noise and crosstalk on both wires, reducing interference.' },
    { front: 'STP vs UTP', back: 'STP has a metallic foil shield around the pair; UTP has only plastic insulation and an outer cover.' },
    { front: 'UTP connector', back: 'RJ-45.' },
    { front: 'Coax connectors', back: 'BNC connector, BNC T connector, BNC terminator.' },
    { front: 'Thin vs thick Ethernet', back: '10Base-2: RG-58, 185 m. 10Base-5: RG-11, 500 m. Both 10 Mbps.' },
    { front: 'Angle > critical angle', back: 'The light reflects back into the denser substance (the core).' },
    { front: 'Step-index vs graded-index', back: 'Step: constant core density. Graded: density highest at centre and decreasing to edge.' },
    { front: 'Single-mode fiber', back: 'Step-index, focused source, small diameter, critical angle near 90°, almost horizontal beams, least distortion.' },
    { front: 'Fiber connectors', back: 'SC (cable TV), ST (networking devices), MT-RJ (RJ-45 size).' },
    { front: 'Twisted-pair repeater spacing', back: 'Analog every 5–6 km, digital every 2–3 km.' },
    { front: 'Fiber disadvantages', back: 'Installation/maintenance expertise, unidirectional light, cost.' },
  ],
  quiz: [
    { q: 'Which guided medium carries signals as light?', options: ['UTP', 'STP', 'Coax', 'Optical fiber'], answer: 3, explain: 'Twisted pair and coax carry electric current.' },
    { q: 'If the angle of incidence equals the critical angle, the light:', options: ['Reflects', 'Refracts toward the surface', 'Bends along the interface', 'Is absorbed'], answer: 2, explain: 'Equal → along the interface.' },
    { q: 'Which fiber mode produces the least distorted pulse?', options: ['Multimode step-index', 'Multimode graded-index', 'Single mode', 'All equal'], answer: 2, explain: 'Beams are almost horizontal in single mode.' },
    { q: 'Thick Ethernet (10Base-5) uses:', options: ['RG-58', 'RG-59', 'RG-11', 'RJ-45'], answer: 2, explain: 'RG-11, 500 m.' },
    { q: 'The connector used for cable TV fiber is:', options: ['ST', 'SC', 'MT-RJ', 'BNC'], answer: 1, explain: 'SC = subscriber channel.' },
    { q: 'Coax bandwidth range from the slides:', options: ['3 kHz', '400–600 MHz', '10 GHz', '88–108 MHz'], answer: 1, explain: 'Up to 10,800 voice conversations.' },
    { q: 'In coax, the outer conductor acts as:', options: ['Only a shield', 'Only a second conductor', 'Both a shield and the second conductor', 'An insulator'], answer: 2, explain: 'It shields and completes the circuit.' },
    { q: 'A fiber disadvantage is:', options: ['Low bandwidth', 'EM interference', 'Unidirectional light propagation', 'Heavy weight'], answer: 2, explain: 'Two fibers are needed for bidirectional links.' },
  ],
  solvers: [],
};
