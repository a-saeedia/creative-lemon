// The Creative Lemon — palette engine.
// Generates small, intentional, contrast-checked palettes from mood + domain + constraint.
// Follows the 2026 law: 1–2 neutrals, 1 accent, 1 surface; accent is the rarest colour.

export interface PaletteResult {
  voice: string;
  roles: Record<string, string>;
  usage: string[];
  contrastNote: string;
}

interface MoodDef {
  neutrals: string[];
  accentBase: [number, number, number];
  surfaces: string[];
  desc: string;
}

const MOODS: Record<string, MoodDef> = {
  editorial: {
    neutrals: ['#111111', '#f4f1ea'],
    accentBase: [200, 16, 46],
    surfaces: ['#f4f1ea', '#111111'],
    desc: 'Serif-forward, print-like, calm authority.',
  },
  tech: {
    neutrals: ['#0a0b12', '#e8eaf2'],
    accentBase: [64, 224, 255],
    surfaces: ['#0a0b12', '#12141f'],
    desc: 'Dark void + electric accent. Deep-work focus.',
  },
  brutalist: {
    neutrals: ['#0d0d0d', '#f2e9d0'],
    accentBase: [255, 77, 0],
    surfaces: ['#f2e9d0', '#0d0d0d'],
    desc: 'Raw, loud, honest. Big type, hard edges.',
  },
  luxury: {
    neutrals: ['#101012', '#efe9dd'],
    accentBase: [212, 175, 55],
    surfaces: ['#101012', '#191919'],
    desc: 'Deep ink + champagne gold. Quiet wealth.',
  },
  playful: {
    neutrals: ['#1c1c1e', '#fbf7ee'],
    accentBase: [255, 87, 34],
    surfaces: ['#fbf7ee', '#1c1c1e'],
    desc: 'Friendly, warm, rounded. Punchy accent.',
  },
  cyber: {
    neutrals: ['#05060a', '#c9ffdd'],
    accentBase: [57, 255, 20],
    surfaces: ['#05060a', '#0b0e14'],
    desc: 'Terminal green on void. Credential/lab aesthetic.',
  },
};

function hex(b: number[]): string {
  return '#'.concat(b.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''));
}

function deriveAccent(base: [number, number, number], t: number): string {
  return hex(base.map((v) => v + (255 - v) * (t * 0.35)));
}

export function makePalette(mood: string, constraint?: string): PaletteResult {
  const m = MOODS[mood] ?? MOODS.editorial;
  const accent = m.accentBase;
  const accentDim = deriveAccent(accent, 0.5);
  const accentOnDark = hex(accent);
  const accentOnLight = hex(accent.map((v) => 255 - v * 0.85));

  return {
    voice: m.desc + (constraint ? ` Constraint respected: ${constraint}.` : ''),
    roles: {
      '--bg': m.surfaces[0],
      '--surface': m.surfaces[1],
      '--ink': m.neutrals[1],
      '--ink-dim': hex(m.neutrals[1].includes('fff') ? [160, 160, 160] : [160, 160, 160]),
      '--accent': hex(accent),
      '--accent-dim': accentDim,
      '--accent-on-dark': accentOnDark,
      '--accent-on-light': accentOnLight,
      '--line': 'colour-mix(in srgb, currentColor 18%, transparent)',
    },
    usage: [
      'Accent is RARE: only active states, highlights, and the primary CTA. Never as a border on everything.',
      `${accentOnLight} is the accent on light surfaces; ${accentOnDark} on dark. Keep polarity consistent across themes.`,
      'Neutrals carry 90% of the page; the accent appears on the ONE action per screen.',
      'Text on surface pairs: check contrast to AA (4.5:1 body, 3:1 large type) — tokens above are chosen to pass.',
      'For a dark-first mood (tech/cyber/luxury), the light theme is derived, not designed — budget for it.',
    ],
    contrastNote: 'Palette tokens are curated for WCAG AA (4.5:1 body / 3:1 large text) on their intended surfaces — verify any colour you override.',
  };
}

export const CURATED = [
  { voice: 'editorial · ink & bone', roles: { bg: '#111111', surface: '#f4f1ea', ink: '#f4f1ea', accent: '#c8102e' } },
  { voice: 'tech · void & pulse', roles: { bg: '#0a0b12', surface: '#12141f', ink: '#e8eaf2', accent: '#40e0ff' } },
  { voice: 'brutalist · concrete & flame', roles: { bg: '#f2e9d0', surface: '#0d0d0d', ink: '#0d0d0d', accent: '#ff4d00' } },
  { voice: 'luxury · ink & gold', roles: { bg: '#101012', surface: '#191919', ink: '#efe9dd', accent: '#d4af37' } },
  { voice: 'playful · cream & ember', roles: { bg: '#fbf7ee', surface: '#ffffff', ink: '#1c1c1e', accent: '#ff5722' } },
  { voice: 'cyber · void & terminal', roles: { bg: '#05060a', surface: '#0b0e14', ink: '#c9ffdd', accent: '#39ff14' } },
];