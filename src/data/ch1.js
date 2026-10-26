export default {
  id: 'ch1',
  chapter: '1',
  title: 'Data Communication Basics',
  wave: 'sine',
  sources: ['Raiyan notes pp. 1–6'],
  sections: [
    {
      heading: 'Communication and data',
      blocks: [
        { type: 'p', text: 'Communication is the sharing of information. It can be local or remote.' },
        { type: 'p', text: 'Data is the information or message in a form agreed upon by the parties. The parties decide which data is accepted or rejected. In a computer, a message is represented as bits (for example, Unicode for text).' },
        {
          type: 'table',
          head: ['Kind', 'Wired example', 'Wireless example'],
          rows: [
            ['Voice', 'PSTN', 'Cell phone, radio, walkie-talkie'],
            ['Video', 'Cable TV', 'IP TV'],
            ['Data', 'LAN, MAN', 'WiFi'],
          ],
        },
      ],
    },
    {
      heading: 'Five components',
      blocks: [
        { type: 'list', ordered: true, items: ['**Sender** – the device that sends the message.', '**Receiver** – the device that receives the message.', '**Transmission medium** – the physical path (e.g. twisted wire).', '**Message** – the information to be communicated.', '**Protocol** – the set of rules both sides follow.'] },
      ],
    },
    {
      heading: 'Data flow',
      blocks: [
        {
          type: 'table',
          head: ['Mode', 'Direction'],
          rows: [
            ['Simplex', 'One way only, never both ways'],
            ['Half-duplex', 'Both ways, but not at the same time'],
            ['Full-duplex', 'Both ways at the same time'],
          ],
        },
      ],
    },
    {
      heading: 'Effectiveness',
      blocks: [
        { type: 'list', items: ['**Delivery** – data reaches the right destination; ensured by the address system.', '**Accuracy** – data arrives without errors; noise must be cancelled.', '**Timeliness** – data is delivered on time, e.g. audio and video together.', '**Jitter** – uneven delay in packet arrival time.'] },
      ],
    },
    {
      heading: 'Networks',
      blocks: [
        { type: 'p', text: 'A network is used for large-scale communication. It is made of end devices, intermediate devices and links.' },
        { type: 'list', items: ['**End device** – creates, reads and writes messages; can access all 7 OSI layers.', '**Intermediate device** – accesses only up to the 3rd layer and just forwards messages.'] },
        { type: 'p', text: 'Network performance is measured by delay:' },
        { type: 'math', tex: 'P_d = \\frac{D}{S} \\qquad T_d = \\frac{L}{R}' },
        { type: 'list', items: ['$P_d$ propagation delay: $D$ = link distance, $S$ = propagation speed (e.g. $3\\times10^8$ m/s).', '$T_d$ transmission delay: $L$ = message size (bits), $R$ = data rate (kbps, Mbps).', '**Response time** – the time a server (e.g. an HTTP server) takes to respond.'] },
        { type: 'p', text: '**Reliability** means fast recovery from failure. **Security** is provided by encryption.' },
      ],
    },
    {
      heading: 'Connection types and topologies',
      blocks: [
        { type: 'list', items: ['**Point-to-point** – a dedicated link between two devices.', '**Multipoint** – more than two devices share one link.'] },
        {
          type: 'table',
          head: ['Topology', 'Connection'],
          rows: [
            ['Mesh', 'Point-to-point'],
            ['Star', 'Point-to-point'],
            ['Ring', 'Point-to-point'],
            ['Bus', 'Multipoint'],
          ],
        },
        { type: 'p', text: '**Hybrid topologies** combine the basic ones: star with bus, star with ring (hubs, repeaters and stations), and ring with bus (taps and drop lines).' },
        { type: 'note', text: '802.11 is the protocol that describes how WiFi works.' },
      ],
    },
  ],
  formulas: [
    { label: 'Propagation delay', tex: 'P_d = \\frac{D}{S}', where: 'D link distance, S signal speed' },
    { label: 'Transmission delay', tex: 'T_d = \\frac{L}{R}', where: 'L message bits, R data rate' },
  ],
  examples: [],
  flashcards: [
    { front: 'Five components of data communication', back: 'Sender, receiver, transmission medium, message, protocol.' },
    { front: 'Simplex vs half-duplex vs full-duplex', back: 'Simplex: one way only. Half-duplex: both ways but not at the same time. Full-duplex: both ways at the same time.' },
    { front: 'Four effectiveness criteria', back: 'Delivery, accuracy, timeliness, jitter.' },
    { front: 'What is jitter?', back: 'Uneven delay in packet arrival time.' },
    { front: 'Propagation delay formula', back: '$P_d = D/S$ (distance ÷ propagation speed).' },
    { front: 'Transmission delay formula', back: '$T_d = L/R$ (message size ÷ data rate).' },
    { front: 'Which topology is multipoint?', back: 'Bus. Mesh, star and ring are point-to-point.' },
    { front: 'End device vs intermediate device', back: 'An end device creates/reads/writes messages (all 7 layers). An intermediate device only forwards (up to layer 3).' },
  ],
  quiz: [
    { q: 'Which data flow allows both directions but not at the same time?', options: ['Simplex', 'Half-duplex', 'Full-duplex', 'Multipoint'], answer: 1, explain: 'Half-duplex is two-way, one direction at a time.' },
    { q: 'Transmission delay depends on:', options: ['Distance and speed', 'Message size and data rate', 'Jitter', 'Topology'], answer: 1, explain: '$T_d = L/R$.' },
    { q: 'Uneven delay in packet arrival is called:', options: ['Latency', 'Jitter', 'Attenuation', 'Timeliness'], answer: 1, explain: 'Jitter is variation in packet arrival delay.' },
    { q: 'Which topology uses a multipoint connection?', options: ['Mesh', 'Star', 'Ring', 'Bus'], answer: 3, explain: 'Bus is multipoint; the rest are point-to-point.' },
    { q: 'Delivery effectiveness is ensured by:', options: ['Encryption', 'The address system', 'Noise cancellation', 'Repeaters'], answer: 1, explain: 'The notes say delivery is ensured by the address system.' },
    { q: 'A 3200 km link with signal speed $2\\times10^8$ m/s has propagation delay:', options: ['16 ms', '1.6 ms', '160 ms', '0.16 ms'], answer: 0, explain: '$3.2\\times10^6 / 2\\times10^8 = 0.016$ s = 16 ms.' },
  ],
  solvers: ['delay'],
};
