// The Creative Lemon — "how a good site should be": the permanent principles
// under the trends. These rarely change; consult them for any site build.

export interface Principle {
  id: string;
  title: string;
  laws: string[];
  questions: string[];
}

export const PRINCIPLES: Principle[] = [
  {
    id: 'hierarchy',
    title: 'One idea per screen',
    laws: [
      'Every viewport has ONE obvious focal point — if two things shout, nothing is heard.',
      'Type scale does the hierarchy job (size+weight+colour), not decorative boxes.',
      'F-shaped reading is a myth to fight; design a visual path that guides the eye diagonally: headline → proof → action.',
    ],
    questions: [
      'If a user glances for 3 seconds, which ONE element do they remember?',
      'Can I delete half the elements and still make the same claim?',
    ],
  },
  {
    id: 'typography',
    title: 'Typography is the interface',
    laws: [
      'Never ship a default font stack. Choose TWO families max: one display, one text/mono.',
      'Display type sizes: clamp() from ~fluid 5–10rem for heroes; body 1rem–1.125rem; line height 1.35–1.6; measure 55–75ch max.',
      'Spacing ascends from the type: padding/margins use the same base unit as the type scale (8px grid).',
      'Variable fonts = free motion (weight/width axes scrubbed by scroll) without layout shift.',
    ],
    questions: [
      'Would this page still look intentional in grayscale, single weight?',
      'Is the line length readable at desktop AND mobile?',
    ],
  },
  {
    id: 'colour',
    title: 'Colour is a language, used sparingly',
    laws: [
      'Small palette: 1–2 neutrals, 1 accent, 1 surface. Accent = the rarest colour on the page.',
      'Plan for both themes: every card/section needs a dark and light resolution; test contrast to WCAG AA (4.5:1 text).',
      'Colour carries meaning: error, on, off, new. System colors are tokens, not picker flights.',
    ],
    questions: [
      'Can I remove every colour except the accent and still recognise the brand?',
      'Does the accent colour appear exactly where action lives?',
    ],
  },
  {
    id: 'motion',
    title: 'Motion with intent (the 2026 law)',
    laws: [
      'Every animation answers: what does this motion TEACH the user (state, progress, causality)? Decorative-only motion is noise.',
      'Animate transform + opacity only. 60fps or it is off. INP < 200ms or it is off.',
      'One motion vocabulary for the whole site — same easing, same durations, same "hand". Durations 0.3–1s; scrub-driven for scroll.',
      'prefers-reduced-motion is a hard requirement: animation collapses to static, scrolling becomes instant.',
    ],
    questions: [
      'What would break in this design if all motion stopped?',
      'Which GPU safely amortises: transform, opacity, filter — never layout props?',
    ],
  },
  {
    id: 'performance',
    title: 'Performance is a design decision',
    laws: [
      'LCP < 2.5s, INP < 200ms, CLS < 0.1 — target them, measure them, doc them.',
      'No fake preloaders. Content-first: skeleton or real content immediately.',
      'Fonts: anticipate API, only the weights/axes actually used, font-display: swap.',
      'Images: AVIF/WebP, responsive srcset, lazy-load below the fold. Video: only where it earns its weight.',
    ],
    questions: [
      'What is the FIRST thing visible and how fast does it arrive?',
      'If this page loads on a 4G phone, does the story survive?',
    ],
  },
  {
    id: 'accessibility',
    title: 'Visitability before beauty',
    laws: [
      'Every interaction has a keyboard path; focus states are visible; nothing auto-moves focus.',
      'Semantic HTML5 landmarks + headings in order; aria only when native elements cannot do the job.',
      'Text contrast AA minimum; nothing flashes > 3×/s; no autoplay video with sound.',
      'Reduced-motion and zoom (200%) must not break layout or hide content.',
    ],
    questions: [
      'Tabbing through this page — does it make sense?',
      'With animations off and sound off, is the message still delivered?',
    ],
  },
  {
    id: 'content',
    title: 'Copy is design',
    laws: [
      'Say the specific thing: numbers, outcomes, artefacts. Delete adjectives (disruptive, innovative, cutting-edge).',
      'Headlines earn their size: if the words are generic, shrink the type.',
      'One voice, imperative and warm. No corporate filler, no AI-slop hedge words.',
      'Metadata is content: title, description, OG tags, favicon, alt text.',
    ],
    questions: [
      'Would a competitor\u2019s name fit on this page unchanged? (If yes — no point of view.)',
      'Every sentence: does it prove, or does it advertise?',
    ],
  },
  {
    id: 'craft',
    title: 'Craft is the differentiator',
    laws: [
      'The baseline of great sites is not novelty — it is 0.5px, 1 frame, 1 token of care everywhere.',
      'Empty states, focus rings, hover endings, 404 page, console cleanliness — the un-sexy 10% is the remembered 100%.',
      'Details compound: one consistent radius, one shadow system, one motion grammar.',
    ],
    questions: [
      'What happens on the LAST frame of every animation? The 404? The hover that missed?',
      'Which three pixels could be better aligned right now?',
    ],
  },
];

export const AUDIT_PLAN = [
  '1 · Goal: what is the ONE job of this page, and is it obvious in 3 seconds?',
  '2 · Hierarchy: pass the glance test (delete-elements drill).',
  '3 · Type system: pairings, fluid scale, measure, rhythm — never defaults.',
  '4 · Colour: tokenize, theme both modes, verify AA on text/surfaces.',
  '5 · Motion: vocabulary consistency, transform/opacity only, reduced-motion collapse.',
  '6 · Performance: measure LCP/INP/CLS, kill preloaders, preload hero + fonts.',
  '7 · Accessibility: keyboard walk, landmarks, contrast, no flashing.',
  '8 · Content: delete the adjectives, add the numbers, check metadata+OG.',
  '9 · Craft pass: focus rings, hover endings, 404, empty states, console errors.',
  '10 · Mobile-first: is the design resolved UP from mobile, not squeezed down?',
];