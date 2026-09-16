// The Creative Lemon — typography system specs + fluid scale generator.
// The Verge's DESIGN.md-style lesson: pairs, sizes and rhythm as data, not vibes.

export interface TypeSpec {
  voice: string;
  display: { family: string; weight: string; size: string; lh: string };
  text: string;
  mono?: string;
  formula: string;
  rationale: string;
}

export const TYPE_SPECS: TypeSpec[] = [
  {
    voice: 'editorial / magazine',
    display: { family: 'Fraunces (variable serif) or Playfair Display', weight: '600–900', size: 'clamp(3.5rem, 9vw, 8rem)', lh: '0.95' },
    text: 'Inter, Public Sans or system sans · 1rem–1.125rem · lh 1.6 · measure 65ch',
    mono: 'Space Grotesk / IBM Plex Mono for labels, dates, URLs',
    formula: 'display fluid via clamp(rem, vw, rem); body fixed; labels uppercase mono 0.75rem letterspaced',
    rationale: 'The magazine law: one giant serif voice + quiet text = instant authority. Letterspaced mono labels give "designed" texture for free.',
  },
  {
    voice: 'tech / developer',
    display: { family: 'Geist, JetBrains Mono or Inter Tight', weight: '600–800', size: 'clamp(2.75rem, 7vw, 6rem)', lh: '1.0' },
    text: 'Geist sans · 0.9375–1rem · lh 1.55 · measure 70ch',
    mono: 'Geist Mono / JetBrains Mono — in ALL labels, code, numbers',
    formula: 'display geometric sans + mono everywhere else; terminals and counters in mono = character',
    rationale: 'Mono text is the tech-brand smell: counters, tickers, file paths, version tags. Sans display keeps it calm.',
  },
  {
    voice: 'brutalist / loud',
    display: { family: 'Archivo Black, Anton or Space Grotesk 700', weight: '900', size: 'clamp(4rem, 12vw, 11rem)', lh: '0.88' },
    text: 'Space Grotesk · 1.0625rem · lh 1.5 · measure 60ch',
    mono: '—',
    formula: 'one weight (900), one size rule (huge), tight lh; everything else derails to legible',
    rationale: 'Brutalism is a single confident decision: type the size of the claim.',
  },
  {
    voice: 'luxury / fashion',
    display: { family: 'Cormorant Garamond, Italiana or Didot-class serif', weight: '400–600', size: 'clamp(3rem, 8vw, 7rem)', lh: '1.1' },
    text: 'Inter or Montserrat Light · 0.9375rem · lh 1.7 · generous measure 55ch',
    mono: 'Space Grotesk for tiny labels',
    formula: 'light serif + airy spacing; uppercase tracking-wide labels; lots of white space',
    rationale: 'Luxury = restraint: thin strokes, wide letterspacing, breathing room. Size is earned by the serenity.',
  },
  {
    voice: 'playful / bright',
    display: { family: 'Nunito 800–900, Baloo 2 or Fredoka', weight: '800', size: 'clamp(3rem, 8vw, 6.5rem)', lh: '1.0' },
    text: 'Nunito / Quicksand · 1.0625rem · lh 1.55 · measure 65ch',
    mono: '—',
    formula: 'rounded geometric pairs; big rounded buttons; accent colour does the energy',
    rationale: 'Rounded = friendly; but keep type scale disciplined so cute doesn\u2019t become childish.',
  },
];

// Fluid type scale: modular 1.25, expressed as clamp for every step.
export function fluidScale(basePx = 16, ratio = 1.25): string {
  const steps: { name: string; step: number }[] = [
    { name: 'display', step: 6 }, { name: 'h1', step: 5 }, { name: 'h2', step: 4 },
    { name: 'h3', step: 3 }, { name: 'h4', step: 2 }, { name: 'lead', step: 1 },
    { name: 'body', step: 0 }, { name: 'small', step: -1 }, { name: 'label', step: -2 },
  ];
  return steps
    .map((s) => {
      const size = basePx * Math.pow(ratio, s.step);
      const min = Math.round(size * 0.75);
      const max = Math.round(size);
      return `--fs-${s.name}: clamp(${min}px, ${Math.round(size / 16 * 100) / 100}rem + ${Math.round((max - min) / 2)}cqw, ${max}px);`;
    })
    .join('\n');
}

export const TYPE_PRINCIPLES = [
  'Two families max: one display + one text (mono counts as text voice).',
  'Fluid display via clamp(); fixed body so paragraphs stay readable.',
  'Measure: 55–75ch; heading lh 0.9–1.1; body lh 1.5–1.65.',
  'Letterspacing on uppercase labels (0.08–0.15em) is the cheap "designed" lever.',
  'Wait for fonts before splitting/animating type.',
  'tabular-nums on counters so numbers don\u2019t jiggle mid-animation.',
];