// The Creative Lemon — reference sites (Awwwards SOTD / notable 2025–26 work) with
// the ONE lesson worth stealing from each. Use as a taste compass, not a clone list.

export interface RefSite {
  id: string;
  name: string;
  year: string;
  stack?: string;
  lesson: string;
  steals: string[];
  avoids: string[];
}

export const REFERENCES: RefSite[] = [
  {
    id: 'untold',
    name: 'Untold (by /nk.studio)',
    year: 'Oct 2025 · SOTD 7.5/10',
    stack: 'Next.js, GSAP, Contentful, Figma',
    lesson:
      'Editorial minimalism + dynamic storytelling: a collective of creative companies unified by restraint. The website feels like a printed magazine that moves.',
    steals: ['Huge serif editorial type doing the personality work', 'Video-driven homepage but with scroll-staged narrative beats', 'Microinteractions on every card hover'],
    avoids: ['Adding noise to an already-loud collection of voices'],
  },
  {
    id: 'cartier-ww2025',
    name: 'Cartier Watches & Wonders 2025',
    year: '2025 · SOTD 7.64/10',
    stack: 'WebGL, 60fps, sound design',
    lesson:
      'Luxury = one perfect 3D universe. The 3D scenes are entered FROM scroll, not loaded as a blocking experience; products get their own interaction moments.',
    steals: ['Scroll-triggered 3D "universes" (not at page load)', 'Product interaction as theatre (rotate the watch, feel the material)', 'Sound design as part of the mood, muted by default'],
    avoids: ['Letting WebGL load-block the page', '3D everywhere'],
  },
  {
    id: 'more-nutrition',
    name: 'More Nutrition — "You deserve More"',
    year: 'Nov 2025 · SOTD',
    stack: 'GSAP, Canvas API',
    lesson:
      'The "3D video" section is a frame-by-frame image sequence scrubbed by scroll, drawn onto <canvas>. Swapping <img> src got laggy; canvas drawing stays smooth. This is THE technique for video-like moments without video weight.',
    steals: ['Frame-by-frame canvas scrub tied to scroll', 'Cohesive system: loader → hover effects → scroll-triggered animations → 3D-style visuals'],
    avoids: ['Pre-rendering giant videos as the default hero'],
  },
  {
    id: 'eddie',
    name: 'Eddie',
    year: 'Oct 2025 · SOTD',
    lesson: 'A personality site: single character/theme carried through every interaction with consistent voice and motion vocabulary.',
    steals: ['One recurring motive (a character/object) used to brand every interaction', 'Tight motion vocabulary — every tween feels like the same "hand"'],
    avoids: ['Dressing a generic template in a character'],
  },
  {
    id: 'trevor-noah',
    name: 'Trevor Noah (by OFF+BRAND)',
    year: '2025–26',
    lesson: 'A celebrity/agency site that feels alive: bold kinetic type, editorial photography, sharp transitions between sections.',
    steals: ['Kinetic typography carrying the headline energy', 'Confident colour blocking between sections'],
    avoids: ['Letting motion outrun the content'],
  },
  {
    id: 'paul-kalkbrenner',
    name: 'Paul Kalkbrenner (by HOLOGRAPHIK)',
    year: '2025–26',
    stack: 'WebGL heavy',
    lesson: 'Music/artist sites are the frontier of scroll-experimental design: the page performs.',
    steals: ['Full-viewport performative moments that reward scrolling', 'Audio-reactive or beat-aligned motion'],
    avoids: ['Porting that attitude into a portfolio where legibility matters more'],
  },
  {
    id: 'the-spark',
    name: 'The Spark (by The Digital Panda)',
    year: '2025 · SOTD 7.29/10',
    stack: 'Webflow, Cables, Blender',
    lesson: 'Character animation + scroll 3D landscape: illustration-first storytelling where the world builds as you scroll.',
    steals: ['Illustrated 3D landscapes revealed by scroll', 'Character animation giving the brand a face'],
    avoids: ['Heavy WebGL without a narrative reason'],
  },
  {
    id: 'huy-phan',
    name: 'Huy Phan Vol.2',
    year: '2026 nominee',
    lesson: 'Portfolio case: a designer selling work through pure curation — few pieces, big type, honest captions.',
    steals: ['Fewer pieces, bigger type — scarcity reads as confidence', 'Dry, honest project captions (no buzzword soup)'],
    avoids: ['Gallery walls of everything you ever made'],
  },
  {
    id: 'why-zero',
    name: 'Why Zero (by Sindhur Dutta)',
    year: '2026 nominee',
    lesson: 'Concept-first microsite: one question, one answer, one visual system. The whole page is the argument.',
    steals: ['A single strong concept driving every visual decision', 'Editorial structure: question → evidence → conclusion'],
    avoids: ['Concept pages that forget the scroll must remain a pleasure'],
  },
];

export const RUBRIC = {
  name: 'Awwwards SOTD-style evaluation rubric',
  weights: { design: 0.4, usability: 0.3, creativity: 0.2, content: 0.1 },
  designChecks: [
    'Visual hierarchy — one obvious focal point per viewport',
    'Typography — deliberate pairing, scale, and line length; type never defaults',
    'Colour — small deliberate palette, accent used with intent',
    'Spacing — rhythm that supports reading, not arbitrary margins',
    'Motion vocabulary — every tween feels like the same hand; restraint honoured',
    'Art direction — every image feels chosen, not stock-dropped',
  ],
  usabilityChecks: [
    'There is a contract for every interaction: what it does is obvious before the click',
    'Loading — skeleton/content-first, no fake preloaders',
    'Navigation always locatable; scroll position preserved',
    'Mobile-first resolution: the layout was designed up, not squished down',
    'INP-safe: animations never block interaction; 60fps on mid hardware',
    'prefers-reduced-motion honoured; no flashing > 3×/s; no autoplay sound',
  ],
  creativityChecks: [
    'A single original concept — one idea the whole site serves',
    'The chosen pattern (scrollytelling, kinetic type, 3D moment) is earned, not decorative',
    'Point of view: the design would be meaningless under a different brand',
  ],
  contentChecks: [
    'Copy is specific, honest and human (no AI-slop filler)',
    'Proof: outcomes, numbers, artefacts — not adjectives',
    'Metadata: title, description, OG tags, favicon, semantics',
  ],
};