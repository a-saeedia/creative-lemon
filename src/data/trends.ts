// The Creative Lemon — 2026 web design & motion trend report.
// Distilled from: MotionKit "Web Animation Trends 2026", Chrome for Developers
// (scroll-driven animations), GSAP docs, Lenis docs, Awwwards judging activity.
// Use as the map an agent should check BEFORE designing a site.

export interface Trend {
  id: string;
  title: string;
  technique: string;
  difficulty: 'easy' | 'medium' | 'hard';
  verdict: string;
  do: string[];
  avoid: string[];
}

export interface TrendReport {
  year: string;
  headline: string;
  shifts: string[];
  trends: Trend[];
  fading: string[];
  stack: string[];
  sources: string[];
}

export const REPORT: TrendReport = {
  year: '2026',
  headline:
    'Motion grew up: scrollytelling, kinetic type and native scroll-driven CSS — filtered through a performance-first, accessibility-first lens. Motion is judged by Core Web Vitals (especially INP), so the best work is purposeful, restrained and prefers-reduced-motion aware.',
  shifts: [
    'GSAP went 100% free (April 2025) — ScrollTrigger, SplitText, ScrollSmoother included. It powers 12M+ sites. Complex scroll work no longer costs a licence.',
    'Scroll-driven CSS animations (animation-timeline: scroll()/view()) reached baseline in every major browser — the simple ~80% of scroll effects needs ZERO JavaScript and runs off the main thread on the compositor.',
    'INP (Interaction to Next Paint) is the new design-review question. 43% of sites fail Google\u2019s 200ms INP threshold; heavy JS animation is a named INP killer.',
    '"Design tokens as machine-readable spec" (DESIGN.md) went mainstream — whole systems (The Verge: shadcn.io/design/theverge) shipped as one file agents can consume.',
    'Restraint won. prefers-reduced-motion support is table stakes, not a badge of honour.',
  ],
  trends: [
    {
      id: 'scrollytelling',
      title: 'Scrollytelling / pinned scroll stories',
      technique: 'GSAP ScrollTrigger pin + scrub (or CSS view() ranges for simple cases)',
      difficulty: 'medium',
      verdict:
        'The flagship pattern of award sites: a section pins while a story plays as you scroll. The user feels like they are driving the narrative.',
      do: ['Pin ONE section at a time', 'Scrub animations to scroll position (ease: none — the scrollbar is the easing)', 'Design the section like a storyboard: frame 1 → frame 2 → frame 3', 'Show a progress cue (bar or counter) while pinned'],
      avoid: ['Pinning for longer than ~2–4 seconds of scroll', 'Pinned sections on mobile (they feel endless) — collapse to stacked steps', 'Letting pinned content overlap fixed headers'],
    },
    {
      id: 'kinetic-type',
      title: 'Kinetic & variable typography',
      technique: 'GSAP SplitText (chars/words/lines) + variable fonts',
      difficulty: 'medium',
      verdict:
        'Type is the star of 2026. Character reveals, line-mask reveals and scroll-scrubbed word reveals carry the personality that hero videos used to.',
      do: ['Split by chars for headlines (< 20 chars feels snappy with stagger 0.02)', 'Split by lines with overflow:hidden wrappers for the award-level mask reveal', 'Wait for fonts to load BEFORE splitting', 'Set aria-label on the container + aria-hidden on split spans'],
      avoid: ['Splitting long paragraphs (massive DOM cost) — lazy-split via ScrollTrigger onEnter', 'Line-splitting without handling resize (re-split or observeChanges: true)', 'Forgetting split.revert() on cleanup'],
    },
    {
      id: 'scroll-css',
      title: 'Native scroll-driven CSS animations',
      technique: 'animation-timeline: scroll() / view() + animation-range',
      difficulty: 'easy',
      verdict:
        'The single biggest platform shift: simple reveals, parallax and progress bars now need no library and run off the main thread.',
      do: ['Use view() for element-enters-viewport reveals', 'Use scroll() for scroller-linked effects (progress bars, headers)', 'Set animation-duration: auto (or omit it)', 'Keep animation-timeline AFTER the animation shorthand', 'Use animation-range: entry / exit for in-and-out choreography'],
      avoid: ['Animating layout properties (width, height, top, left) — transform/opacity only', 'Forgetting graceful fallbacks for pre-baseline browsers (the effect just won\u2019t run — design so it degrades to static)'],
    },
    {
      id: 'inp-motion',
      title: 'Performance-first, INP-aware motion',
      technique: 'transform/opacity only, lazy-load animation runtime, will-change sparingly',
      difficulty: 'medium',
      verdict:
        'Every trend is now filtered through responsiveness. Animation that blocks the main thread during interaction costs rankings and conversions.',
      do: ['Animate only transform + opacity (compositor-friendly, skip layout/paint)', 'Lazy-load GSAP only where needed (or use CSS for the simple 80%)', 'Test on mid-range hardware, not just the dev machine', 'Batch DOM reads/writes to avoid layout thrashing'],
      avoid: ['Animating width/height/margin/top/left', 'Heavy JS runtime on every page', 'will-change on many elements (consumes memory)'],
    },
    {
      id: 'bento',
      title: 'Bento-grid reveals',
      technique: 'CSS grid + staggered view() reveals or ScrollTrigger stagger',
      difficulty: 'easy',
      verdict:
        'The workhorse layout of 2026: an editorial bento grid where heterogeneous cards (sizes, media, text) reveal in a staggered cascade.',
      do: ['Use 12-col grid, varied card spans (2/4/6/8/12)', 'Stagger reveals by row (small delay increments read as a cascade)', 'Let one card be the hero (bigger, accent colour)'],
      avoid: ['Uniform card sizes (kills the bento feel)', 'Staggering everything the same 0.1 → feels mechanical'],
    },
    {
      id: 'webgl',
      title: '3D & WebGL moments',
      technique: 'Three.js / WebGL + GSAP; frame-by-frame canvas playback',
      difficulty: 'hard',
      verdict:
        'One tasteful 3D moment beats a video hero. Award sites ship a single 3D universe or an image sequence scrubbed by scroll — never a full 3D page.',
      do: ['Reserve 3D for the one moment that earns it', 'For "video" feel without video: render frames + draw on <canvas> scrubbed by scroll (More Nutrition technique — swapping <img> src is laggy, canvas is smooth)', 'Sync WebGL scroll scenes to one loop (Lenis raf driving the scene)'],
      avoid: ['Heavy hero videos as default', 'Full-page WebGL (kills INP and mobile)'],
    },
    {
      id: 'cursor',
      title: 'Cursor & micro-interactions',
      technique: 'pointer-driven GSAP tweens; hover states with intent',
      difficulty: 'easy',
      verdict:
        'The cursor becomes a brush: dot + trailing ring, magnetic buttons, hover states that change the mood of the whole page.',
      do: ['Small lag (lerp ~0.2) on a cursor ring feels premium', 'Magnetic hover: the element pulls toward the pointer, springs back on leave', 'Tie hover to content: image follows text, colour floods the section'],
      avoid: ['Custom cursors on touch devices (they don\u2019t exist) — feature-detect pointer: fine', 'Cursor effects that delay clicks or fight native focus'],
    },
    {
      id: 'smooth-scroll',
      title: 'Smooth scrolling done right',
      technique: 'Lenis (few KB, dependency-free, wraps native scroll)',
      difficulty: 'easy',
      verdict:
        'The buttery, slightly-inertial glide of high-end agency sites. Done well = premium; done badly (hijacked/janky) = one of the most hated patterns on the web.',
      do: ['Lenis + GSAP integration: lenis.on(\'scroll\', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)', 'Lenis honours prefers-reduced-motion out of the box', 'Use gsap ticker so scrub animations stay in sync'],
      avoid: ['Letting Lenis fight native scroll-snap (use lenis/snap)', 'Smooth scrolling on iframes (wheel events don\u2019t forward)'],
    },
    {
      id: 'svg-draw',
      title: 'SVG path & draw animation',
      technique: 'stroke-dasharray/offset keyframed by scroll; DrawSVG/MotionPath for complex',
      difficulty: 'medium',
      verdict:
        'A line draws itself as you scroll — perfect for a brand mark, a map, a signature. Cheap, crisp, timeless.',
      do: ['CSS: animate stroke-dashoffset with view() for the easy 80%', 'GSAP MotionPath for complex path-following choreography'],
      avoid: ['Drawing dozens of paths at once (reads as noise)'],
    },
    {
      id: 'restraint',
      title: 'Tasteful restraint & accessibility',
      technique: 'prefers-reduced-motion everywhere; fewer effects with intent',
      difficulty: 'easy',
      verdict:
        'The clearest trend of all: less. 35% of users request reduced motion when available. Respecting it is the discipline that separates professional work from autoplay chaos.',
      do: ['Wrap every animation in @media (prefers-reduced-motion: reduce)', 'Default to no transition when uncertain — add motion only where it improves understanding', 'Nothing flashes more than 3×/second (seizure risk)', 'Provide play/pause for auto-playing content; no autoplay video with sound'],
      avoid: ['Autoplaying entrance animations on every element', 'Fake loading spinners/preloaders (content delay = liability)', 'Motion that ignores INP'],
    },
  ],
  fading: [
    'Autoplay entrance animations on everything — reads dated, hurts perceived speed.',
    'Janky scroll-hijacking smooth scroll — the premium version stayed, the fighting-the-wheel version is gone.',
    'Decorative preloader spinners — a fake loading screen that delays content is a liability under Core Web Vitals.',
    'Heavy hero videos as default — replaced by lighter kinetic type, SVG, or one 3D moment.',
    'Motion that ignores INP — stutter during interaction is being ripped out for ranking and conversion reasons.',
  ],
  stack: [
    'CSS scroll-driven animations — simple ~80% of scroll effects, zero JS, compositor-thread.',
    'GSAP (free since Apr 2025) — ScrollTrigger, SplitText, ScrollSmoother — the complex ~20%: pinning, scrubbed timelines, sequences.',
    'Lenis — smooth scroll, few KB, dependency-free, native-scroll wrapper (accessibility first).',
    'Canvas + frame-by-frame scrub for "video" moments (smoother than swapping img src).',
    'WebGL/Three.js — exactly one moment per page.',
  ],
  sources: [
    'MotionKit — Web Animation Trends 2026 (motionkit.io/blog/web-animation-trends-2026)',
    'Chrome for Developers — Animate elements on scroll with scroll-driven animations',
    'GSAP docs + SplitText guide (lab.good-fella.com), Lenis docs (npm/lenis)',
    'Awwwards — SOTD judging rubric: Design 40%, Usability 30%, Creativity 20%, Content 10%',
    'shadcn.io/design/theverge — DESIGN.md spec movement',
  ],
};