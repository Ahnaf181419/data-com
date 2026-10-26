// Not in the class slides or notes. Added because Fall 2024 Q2(d) asks it; taught with the standard
// Forouzan method the course follows. Every lesson here carries a "verify with your teacher" flag.
export default {
  id: 'ch4x',
  chapter: '4',
  title: 'Block and Line Coding',
  wave: 'pcm',
  flagged: true,
  sources: ['Fall 2024 final Q2(d)', 'standard Forouzan method (not in your slides/notes)'],
  sections: [
    {
      heading: 'Why this chapter is here',
      blocks: [
        { type: 'note', text: '**Not in your slides or notes.** The Fall 2024 final asked it (Q2d, 3.5 marks), so it is taught here using the standard textbook (Forouzan) method. Check with your teacher that it is still in the syllabus.' },
        { type: 'p', text: 'The question combines two ideas: **4B/5B block coding** (turn each 4-bit group into a 5-bit code) and **differential Manchester** line coding (draw the signal for the coded bits).' },
      ],
    },
    {
      heading: '4B/5B block coding',
      blocks: [
        { type: 'p', text: 'Block coding replaces each group of 4 data bits with a 5-bit code. The 5-bit codes are chosen so the output never has long runs of 0s: each code has at most one leading 0 and at most two trailing 0s, so the stream never has more than three 0s in a row. This keeps the receiver synchronized.' },
        { type: 'p', text: 'The cost is 25% overhead: every 4 bits become 5, so the rate goes up by a factor of $5/4$.' },
        { type: 'list', ordered: true, items: ['Split the input into 4-bit groups from the left.', 'Replace each group with its 5-bit code from the table.', 'Write the codes one after another; that is the output stream.'] },
        {
          type: 'table',
          head: ['Data', 'Code', 'Data', 'Code'],
          rows: [
            ['0000', '11110', '1000', '10010'],
            ['0001', '01001', '1001', '10011'],
            ['0010', '10100', '1010', '10110'],
            ['0011', '10101', '1011', '10111'],
            ['0100', '01010', '1100', '11010'],
            ['0101', '01011', '1101', '11011'],
            ['0110', '01110', '1110', '11100'],
            ['0111', '01111', '1111', '11101'],
          ],
        },
        { type: 'note', text: 'In the exam the table is supplied (Fall 2024 gave the rows 0000–0101), so you do not need to memorize it.' },
      ],
    },
    {
      heading: 'Differential Manchester',
      blocks: [
        { type: 'p', text: 'Every bit has a transition **in the middle**; this mid-bit transition is used for synchronization. The bit value is decided at the **start** of the bit:' },
        { type: 'list', items: ['**0** → there is a transition at the beginning of the bit.', '**1** → there is no transition at the beginning of the bit.'] },
        { type: 'p', text: 'So to draw it: start from the line level before the first bit, then for each bit flip at the start only if the bit is 0, and always flip in the middle.' },
        { type: 'lab', id: 'coding' },
        { type: 'note', text: 'State the starting level you assumed (high or low). The shape flips but the transitions, and therefore the bits, are the same.' },
      ],
    },
  ],
  formulas: [
    { label: '4B/5B overhead', tex: '\\text{output rate} = \\tfrac54 \\times \\text{input rate}', where: '25% more bits' },
    { label: 'Differential Manchester rule', tex: '0 \\Rightarrow \\text{transition at start};\\ 1 \\Rightarrow \\text{none}', where: 'always a mid-bit transition' },
  ],
  examples: [
    {
      title: 'Fall 2024 Q2(d)',
      source: 'Past paper (flagged topic)',
      question: 'Encode 010100010011000000010010 with 4B/5B, then draw differential Manchester for the first 8 output bits.',
      steps: ['Groups: 0101, 0001, 0011, 0000, 0001, 0010', 'Codes: 01011, 01001, 10101, 11110, 01001, 10100', 'Output: 010110100110101111100100110100', 'First 8 output bits: 0 1 0 1 1 0 1 0', 'Starting high: 0 flips at the start (low→high), 1 does not (high→low), 0 flips (high→low), 1 (low→high), 1 (high→low), 0 flips (high→low), 1 (low→high), 0 flips (low→high).'],
      answer: 'Output 01011 01001 10101 11110 01001 10100; the drawing follows the lab above',
    },
  ],
  flashcards: [
    { front: '4B/5B in one line', back: 'Each 4-bit group is replaced by a 5-bit code with no long runs of 0s; 25% overhead.' },
    { front: 'Differential Manchester: when is there a transition at the start of a bit?', back: 'When the bit is 0. A 1 has no transition at the start.' },
    { front: 'Differential Manchester: the mid-bit transition', back: 'Always present; it provides synchronization.' },
    { front: 'Max consecutive 0s after 4B/5B', back: 'Three (at most one leading and two trailing 0s per code).' },
  ],
  quiz: [
    { q: '4B/5B code for 0000 is:', options: ['00000', '11110', '01001', '10100'], answer: 1, explain: 'From the table.' },
    { q: 'In differential Manchester, a bit with NO transition at its start is:', options: ['0', '1', 'Either', 'An error'], answer: 1, explain: 'A transition at the start means 0.' },
    { q: '4B/5B increases the bit rate by:', options: ['10%', '20%', '25%', '50%'], answer: 2, explain: '5/4 = 1.25.' },
    { q: 'The mid-bit transition in differential Manchester is used for:', options: ['Error correction', 'Synchronization', 'Addressing', 'Compression'], answer: 1, explain: 'It is always there, so the receiver can lock onto it.' },
  ],
  solvers: ['block'],
};
