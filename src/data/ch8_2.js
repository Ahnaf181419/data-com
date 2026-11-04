// Chapter 8 part 2: Structure of Switching — from the ch8_2 slide deck (Class Lecture/ch8_2.pdf).
// Deepens Ch 8: the switch taxonomy, blocking/Clos in depth, the TDM bus, the time-vs-space
// comparison, the slide's own TST example (= Fall 2024 Q2(e)), and the banyan switch.
export default {
  id: 'ch8-2',
  chapter: '8.2',
  title: 'Structure of Switching',
  wave: 'switch',
  sources: ['ch8_2 slides'],
  sections: [
    {
      heading: 'Which switch where',
      blocks: [
        { type: 'p', text: 'Switches are used in both circuit-switched and packet-switched networks, and the two families use different hardware:' },
        { type: 'table', head: ['Network', 'Switching type', 'Switches'], rows: [['Circuit-switched', 'Space-division', 'Crossbar, multistage'], ['Circuit-switched', 'Time-division', 'Time-slot interchange (TSI), TDM bus'], ['Packet-switched', 'Multistage routing', 'Banyan switch']] },
        { type: 'p', text: 'Ch 8 introduced these ideas; this chapter goes into their **structure**: how each switch is built, counted and compared.' },
      ],
    },
    {
      heading: 'Space-division switching and the crossbar',
      blocks: [
        { type: 'p', text: 'In **space-division switching**, the paths inside the switch are separated from each other **spatially**: different ongoing connections, at the same instant of time, use different physical paths. The two space switches are the crossbar and the multistage switch.' },
        { type: 'p', text: 'A **crossbar** connects $n$ inputs to $m$ outputs in a grid, with an electronic microswitch (transistor) at each crosspoint. Every station can connect to every other combination as long as the called party is free, so the crossbar is **non-blocking**.' },
        { type: 'math', tex: '\\#\\text{crosspoints} = n \\times m' },
        { type: 'diagram', id: 'crossbar' },
        { type: 'p', text: '**Limitations:** the crosspoint count — 1000 inputs × 1000 outputs needs $10^6$ crosspoints, which is impractical. It is also inefficient: in practice **fewer than 25%** of the crosspoints are in use at any moment; the rest sit idle.' },
      ],
    },
    {
      heading: 'Multistage switch structure',
      blocks: [
        { type: 'p', text: 'In a single crossbar, only one row/column (one path) is active per connection — so an $N \\times N$ crossbar needs $N^2$ crosspoints mostly sitting idle. The **multistage switch** allows *multiple paths* between input and output, which cuts the crosspoint count: each middle-stage crosspoint can be reached from several first- and third-stage crosspoints.' },
        { type: 'list', ordered: true, items: ['Divide the $N$ inputs into groups of $n$ lines. Each group gets one crossbar of $n \\times k$ → stage 1 has $N/n$ crossbars of $n \\times k$.', 'Stage 2: $k$ crossbars, each $(N/n) \\times (N/n)$.', 'Stage 3: $N/n$ crossbars, each $k \\times n$.'] },
        { type: 'math', tex: '\\text{Total} = \\tfrac{N}{n}(n \\times k) + k\\left(\\tfrac{N}{n} \\times \\tfrac{N}{n}\\right) + \\tfrac{N}{n}(n \\times k) = 2kN + k\\left(\\tfrac{N}{n}\\right)^2' },
        { type: 'diagram', id: 'multistage' },
      ],
    },
    {
      heading: 'Blocking and the Clos criterion',
      blocks: [
        { type: 'p', text: '**Blocking** happens when an input cannot be connected to an output because no path is available — every possible intermediate switch is occupied. A single-stage (crossbar) switch never blocks: every input–output pair owns its crosspoint. In a multistage switch the *small number of middle-stage crossbars* creates blocking: **if $k < n$, the switch is blocking**.' },
        { type: 'p', text: '**Non-blocking** means all stations can connect (in pairs) at once. Clos found the condition for a non-blocking multistage switch:' },
        { type: 'math', tex: 'n = \\sqrt{N/2}, \\qquad k \\ge 2n - 1' },
      ],
    },
    {
      heading: 'Time-slot interchange (TSI)',
      blocks: [
        { type: 'p', text: 'Time-division switching uses TDM **inside** the switch. The **time-slot interchange (TSI)** is RAM with several memory locations:' },
        { type: 'list', items: ['Each location holds exactly one **time slot** (location size = slot size).', 'The **number of locations = the number of inputs** (inputs and outputs are usually equal).', 'The RAM fills with incoming slots in the order received; a **control unit** then reads them out in a new order.'] },
        { type: 'p', text: 'Example from the slides: four inputs to four outputs with the pattern $1 \\to 3$, $2 \\to 4$, $3 \\to 1$, $4 \\to 2$ — the RAM stores slots 1–4 as they arrive and the control unit releases them reordered.' },
        { type: 'math', tex: '\\#\\text{locations} = \\#\\text{inputs}, \\qquad \\text{location size} = \\text{slot size}' },
      ],
    },
    {
      heading: 'The TDM bus',
      blocks: [
        { type: 'p', text: 'The second time-division technology connects every input and output line to one **high-speed bus** through **gates** (microswitches). During one time slot, **only one input gate and one output gate** are closed — that pair lets a burst of data cross the bus from one specific input to one specific output. A **control unit** opens and closes the gates as switching needs change.' },
        { type: 'diagram', id: 'tdmbus' },
      ],
    },
    {
      heading: 'Time vs space switching',
      blocks: [
        { type: 'table', head: ['', 'Space-division (crossbar/multistage)', 'Time-division (TSI/TDM bus)'], rows: [['Advantage', 'Instantaneous — the path is physical', 'Needs **no crosspoints** at all'], ['Disadvantage', 'The number of crosspoints needed to keep blocking low', 'Delay: each time slot must be **stored in RAM**, then retrieved and passed on']] },
        { type: 'p', text: 'This trade-off is why the two are combined in the TST switch: time stages (cheap, no crosspoints) around one space stage (fast, few crosspoints).' },
      ],
    },
    {
      heading: 'Time-space-time (TST)',
      blocks: [
        { type: 'p', text: 'A TST switch has two time stages around one space stage. The slide\'s example: 12 inputs, split into **three groups of four**, each group served by its own TSI. Because three TSIs work in parallel, the **average delay is one-third** of a single TSI handling all 12 inputs. The last stage mirrors the first; the middle stage is a crossbar connecting the TSI groups, so any input can reach any output (e.g. input 3 of group 1 → output 7 of group 2).' },
        { type: 'math', tex: '\\text{crossbar size} = (\\#\\text{stage-1 TSIs}) \\times (\\#\\text{stage-3 TSIs}), \\qquad \\text{total crosspoints} = k \\times \\text{crossbar size}' },
        { type: 'diagram', id: 'tst', props: { left: ['TSI 1', 'TSI 2', 'TSI 3'], mid: ['Crossbar'], midSize: '3 × 3', dots: false, caption: 'Time-space-time: TSIs (time) → crossbar (space) → TSIs (time).' } },
      ],
    },
    {
      heading: 'The banyan switch',
      blocks: [
        { type: 'p', text: 'For **packet switching**, the banyan switch is a multistage switch of **microswitches** that route each packet using its output port written as a **binary string**:' },
        { type: 'list', items: ['For $n$ inputs and $n$ outputs there are $\\log_2 n$ **stages**, each with $n/2$ microswitches (each microswitch is a 2 × 2 switch).', 'Stage 1 routes on the **high-order bit** of the binary string, stage 2 on the second bit, and so on — each stage consumes one bit.', 'Example: 8 inputs × 8 outputs → $\\log_2 8 = 3$ stages with 4 microswitches each (12 in total).'] },
        { type: 'math', tex: '\\text{stages} = \\log_2 n, \\qquad \\text{microswitches} = \\frac{n}{2}\\log_2 n' },
        { type: 'diagram', id: 'banyan' },
        { type: 'p', text: 'The banyan is the packet-switched counterpart of the circuit-switched multistage switch: instead of reserving a physical path, each microswitch reads one bit of the destination port and forwards.' },
      ],
    },
  ],
  formulas: [
    { label: 'Crossbar crosspoints', tex: 'n \\times m', where: 'non-blocking, but grows fast' },
    { label: 'Multistage crosspoints', tex: '2kN + k\\left(\\frac{N}{n}\\right)^2', where: '' },
    { label: 'Clos criterion', tex: 'n = \\sqrt{N/2},\\ k \\ge 2n - 1', where: 'non-blocking' },
    { label: 'TSI memory', tex: '\\#\\text{locations} = \\#\\text{inputs}', where: 'location size = slot size' },
    { label: 'TST crosspoints', tex: 'k \\times (\\#\\text{TSI}_1 \\times \\#\\text{TSI}_3)', where: '' },
    { label: 'Banyan switch', tex: '\\text{stages} = \\log_2 n,\\ \\text{microswitches} = \\tfrac{n}{2}\\log_2 n', where: 'n/2 microswitches per stage' },
  ],
  examples: [
    { title: 'Multistage 200 × 200 (slide)', source: 'ch8_2 slides', question: 'Design a three-stage 200 × 200 switch with k = 4 and n = 20. How many crosspoints?', steps: ['Stage 1: $N/n = 10$ crossbars of $20 \\times 4$', 'Stage 2: $k = 4$ crossbars of $10 \\times 10$', 'Stage 3: 10 crossbars of $4 \\times 20$', 'Total $= 2kN + k(N/n)^2 = 2 \\times 4 \\times 200 + 4 \\times 100 = 2000$'], answer: '2000 crosspoints (5% of the 40,000 a single-stage switch needs)' },
    { title: 'Clos redesign 200 × 200 (slide)', source: 'ch8_2 slides', question: 'Redesign the 200 × 200 switch as non-blocking using the Clos criterion.', steps: ['$n = \\sqrt{200/2} = 10$, $k = 2n - 1 = 19$', 'Stage 1: 20 crossbars of $10 \\times 19$ → 3800', 'Stage 2: 19 crossbars of $20 \\times 20$ → 7600', 'Stage 3: 20 crossbars of $19 \\times 10$ → 3800'], answer: '15,200 crosspoints (non-blocking)' },
    { title: 'TST with N = 100 (slide Example 1)', source: 'ch8_2 slides (= Fall 2024 Q2(e))', question: 'A three-stage TST switch has N = 100, with 10 TSIs in the first and third stages and 4 crossbars in the middle. Find the total crosspoints and TSI memory locations.', steps: ['Each TSI serves $100/10 = 10$ inputs → 10 time slots each.', 'Each middle crossbar is $10 \\times 10 = 100$ crosspoints → total $4 \\times 100 = 400$.', 'First stage: $10 \\times 10 = 100$ slots; third stage: 100 slots.'], answer: '400 crosspoints, 200 memory locations', note: 'This is exactly Fall 2024 Q2(e) — the slides now confirm the method taught in Ch 8.' },
    { title: 'Banyan 8 × 8', source: 'ch8_2 slides', question: 'How many stages and microswitches does an 8 × 8 banyan switch need?', steps: ['Stages $= \\log_2 8 = 3$', 'Microswitches per stage $= 8/2 = 4$', 'Total $= 4 \\times 3 = 12$'], answer: '3 stages, 4 microswitches each, 12 total' },
  ],
  flashcards: [
    { front: 'Two space-division switches', back: 'Crossbar and multistage.' },
    { front: 'Two time-division switch technologies', back: 'Time-slot interchange (TSI) and the TDM bus.' },
    { front: 'Why is a crossbar non-blocking?', back: 'Every input–output pair has its own crosspoint, so a path always exists (if the called party is free).' },
    { front: 'Crossbar inefficiency figure', back: 'Fewer than 25% of crosspoints are in use at any time.' },
    { front: 'When is a multistage switch blocking?', back: 'When k < n (too few middle-stage crossbars — all paths to an output can be occupied).' },
    { front: 'Clos criterion', back: 'n = √(N/2), k ≥ 2n − 1 makes a multistage switch non-blocking.' },
    { front: 'TSI memory rule', back: '#locations = #inputs; each location holds one time slot.' },
    { front: 'TDM bus gate rule', back: 'Only one input gate and one output gate are closed per time slot.' },
    { front: 'Space vs time switching trade-off', back: 'Space: instantaneous but many crosspoints. Time: no crosspoints but RAM store-and-retrieve delay per slot.' },
    { front: 'TST delay benefit', back: 'Splitting inputs across several TSIs cuts average delay proportionally (3 TSIs → one-third the delay).' },
    { front: 'Banyan switch stages', back: 'log₂n stages, n/2 microswitches (2×2) per stage.' },
    { front: 'Which bit does banyan stage 1 read?', back: 'The high-order bit of the binary output-port string; each later stage reads the next bit.' },
  ],
  quiz: [
    { q: 'Which switch belongs to packet switching?', options: ['Crossbar', 'Multistage', 'Banyan', 'TSI'], answer: 2, explain: 'The banyan routes packets by their binary output port.' },
    { q: 'An 8 × 8 banyan switch has how many stages?', options: ['2', '3', '4', '8'], answer: 1, explain: '$\\log_2 8 = 3$.' },
    { q: 'A 16 × 16 banyan switch has how many microswitches in total?', options: ['8', '16', '32', '4'], answer: 2, explain: '$(16/2) \\times \\log_2 16 = 8 \\times 4 = 32$.' },
    { q: 'A multistage switch blocks when:', options: ['k ≥ 2n − 1', 'k < n', 'N is even', 'n = √(N/2)'], answer: 1, explain: 'Too few middle-stage crossbars: every path can be occupied.' },
    { q: 'In a TSI, the number of RAM locations equals:', options: ['The number of outputs', 'The number of inputs', 'The slot size', 'The number of stages'], answer: 1, explain: 'One location per input, each one time slot wide.' },
    { q: 'In one TDM-bus time slot, how many gates are closed?', options: ['All of them', 'One input gate and one output gate', 'Only input gates', 'Two input gates'], answer: 1, explain: 'One pair per slot transfers one burst across the bus.' },
    { q: 'The advantage of time-division switching is:', options: ['It is instantaneous', 'It needs no crosspoints', 'No RAM is required', 'It never delays'], answer: 1, explain: 'The trade-off is the RAM store/retrieve delay per slot.' },
    { q: 'The slides\' TST example splits 12 inputs into three TSIs, so the average delay is:', options: ['The same', 'Half', 'One-third', 'One-twelfth'], answer: 2, explain: 'Three TSIs work in parallel.' },
    { q: '1000 × 1000 crossbar needs how many crosspoints?', options: ['10,000', '100,000', '1,000,000', '25,000'], answer: 2, explain: '$n \\times m = 10^6$ — impractical.' },
  ],
  solvers: ['multistage'],
};
