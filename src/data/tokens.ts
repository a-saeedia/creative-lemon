// The Creative Lemon — DESIGN.md emitter.
// Emits a token spec (The Verge / shadcn-style) an agent can apply directly.

export function designTokens(opts: { pal: Record<string, string>; voice: string }): string {
  const { pal, voice } = opts;
  return `# ${voice} · DESIGN.md

A machine-readable design spec. Apply tokens verbatim.

## Colour
\`\`\`css
:root {
  --bg: ${pal['--bg']};
  --surface: ${pal['--surface']};
  --ink: ${pal['--ink']};
  --ink-dim: ${pal['--ink-dim']};
  --accent: ${pal['--accent']};
  --accent-dim: ${pal['--accent-dim']};
  --accent-on-dark: ${pal['--accent-on-dark']};
  --accent-on-light: ${pal['--accent-on-light']};
  --line: ${pal['--line']};
}
\`\`\`
Laws: accent on ≤ 1 action per screen · dark & light themes resolve · AA contrast on text.

## Corner radius (8px grid)
\`\`\`css
--r-sm: 8px; --r-md: 16px; --r-lg: 24px; --r-pill: 999px;
\`\`\`
Pick ONE radius for the whole system (plus pill for chips/avatars).

## Spacing (8px unit)
\`\`\`css
--s-1: 8px; --s-2: 16px; --s-3: 24px; --s-4: 32px; --s-5: 48px; --s-6: 64px; --s-7: 96px; --s-8: 128px;
\`\`\`
Section rhythm: --s-8 (space between sections), --s-5 (card padding), --s-2/--s-3 (inline).

## Motion
- Durations: 0.3s micro (hover), 0.6–1s entrances, scrub for scroll (ease: none).
- Easing: expo.out for heroic, power2.out for UI; one vocabulary.
- Properties: transform + opacity only. 60fps. INP < 200ms.
- prefers-reduced-motion: collapse to static, instant scrolling.
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

## Type (fluid)
Use --fs-* tokens from a clamp() scale; display one voice per token set; measure ≤ 75ch.
Uppercase labels: letter-spacing: 0.12em; font-size: 0.75rem; mono where fitting.

## Layout
12-column grid · bento card spans 2/4/6/8/12 · max-width 1200px content · sticky nav.
`;
}