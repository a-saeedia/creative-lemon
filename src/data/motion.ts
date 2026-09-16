// The Creative Lemon — motion recipe library.
// Every pattern here is a real 2025–26 winning technique, reduced to copy-paste code.
// Rule of thumb: try CSS (compositor, zero JS) FIRST for the simple ~80%;
// reach for GSAP only when you need pinning, scrubbing or splitting.

export interface MotionRecipe {
  id: string;
  title: string;
  category: 'css' | 'gsap' | 'integration';
  difficulty: 'easy' | 'medium' | 'hard';
  when: string;
  avoids: string;
  code: string;
  reducedMotion: string;
}

const reducedMotionCss = `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

export const RECIPES: MotionRecipe[] = [
  {
    id: 'css-reveal',
    title: 'Reveal on view (native, zero JS)',
    category: 'css',
    difficulty: 'easy',
    when:
      'The default entrance for ANY element. Fades/slides in as it crosses the viewport. Runs on the compositor — safe for dozens of elements.',
    avoids: 'Elements that must stay animated on exit choreography beyond a simple fade — that needs GSAP scrubbing.',
    code: `/* HTML: add .reveal to anything */
.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 35%;
}
@keyframes reveal {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: none; }
}
/* stagger siblings by nth-child delay */
.stagger > * { animation-range: entry 0% cover 30%; }
.stagger > *:nth-child(1) { --del: 0s; } /* customize per row if needed */`,
    reducedMotion: reducedMotionCss,
  },
  {
    id: 'css-scroll-progress',
    title: 'Scroll progress bar (native)',
    category: 'css',
    difficulty: 'easy',
    when:
      'The classic top progress bar, or any element driven by the scroller (timeline scrub, header shrinking).',
    avoids: 'Driving transform based on percentage of TWO different scroll containers (use named timelines + timeline-scope).',
    code: `/* HTML: <div id="progress"></div> */
#progress {
  position: fixed; inset: 0 0 auto 0; height: 3px;
  background: currentColor;
  transform-origin: left;
  transform: scaleX(0);
  animation: grow linear both;
  animation-timeline: scroll();
  animation-duration: auto;
}
@keyframes grow { to { transform: scaleX(1); } }

/* Shrinking fixed header tied to scroll */
header {
  animation: compact linear both;
  animation-timeline: scroll();
  animation-range: 0 200px;
}
@keyframes compact { to { padding-block: 10px; backdrop-filter: blur(12px); } }`,
    reducedMotion: reducedMotionCss,
  },
  {
    id: 'css-parallax',
    title: 'Image parallax + scale (native)',
    category: 'css',
    difficulty: 'easy',
    when:
      'A hero image that parallaxes as you scroll away, or an image that scales from 1.2 → 1 as it enters. The award-site depth effect with zero JS.',
    avoids: 'Multiple parallax layers moving at different speeds over long sections — keep speed deltas subtle, animate transform only.',
    code: `/* Parallax on scroll-out (hero): image drifts up slower than the page */
.parallax {
  animation: drift linear both;
  animation-timeline: view();
  animation-range: exit 0% exit 100%;
}
@keyframes drift { to { transform: translateY(-15%); } }

/* Scale-in on entry — classic hero "settle" */
.hero-media {
  animation: settle linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
@keyframes settle { from { transform: scale(1.15); } to { transform: scale(1); } }`,
    reducedMotion: reducedMotionCss,
  },
  {
    id: 'css-marquee',
    title: 'Infinite marquee (native + a11y)',
    category: 'css',
    difficulty: 'easy',
    when:
      'The scrolling discipline ticker / tool names / logos band. Pure CSS, pauses for reduced motion.',
    avoids: 'Marquees with interactive content inside (links in a CSS marquee are an accessibility nightmare).',
    code: `/* HTML: <div class="marquee"><span>Content doubled…</span></div> */
.marquee { overflow: hidden; white-space: nowrap; }
.marquee span {
  display: inline-block;
  padding-right: 2rem;
  animation: marquee 26s linear infinite;
}
.marquee span > * { display: inline-block; padding-inline: 1.5rem; }
@keyframes marquee { to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .marquee span { animation: none; }
  .marquee { overflow-x: auto; }
}`,
    reducedMotion: 'Handled inline — marquee pauses and becomes scrollable.',
  },
  {
    id: 'css-svg-draw',
    title: 'SVG draws itself on scroll (native)',
    category: 'css',
    difficulty: 'easy',
    when:
      'A logo, signature line, map or pattern that draws itself as it enters view. Crisp at any DPI, zero JS.',
    avoids: 'More than a few paths at once, or complex multi-subpath figures without careful dash tuning.',
    code: `/* SVG needs: stroke-dasharray = path length; stroke-dashoffset animated */
.line {
  stroke-dasharray: 1200;          /* roughly path length */
  stroke-dashoffset: 1200;
  animation: draw linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 60%;
}
@keyframes draw { to { stroke-dashoffset: 0; } }`,
    reducedMotion: reducedMotionCss,
  },
  {
    id: 'gsap-lenis-setup',
    title: 'GSAP + ScrollTrigger + Lenis (the glue)',
    category: 'integration',
    difficulty: 'medium',
    when:
      'ANY site doing serious scroll work: smooth scroll + scrubbed animations that stay in sync. This is the canonical wiring.',
    avoids: 'Forgetting lagSmoothing(0) → scrubbed animations stutter/freeze under Lenis. Also: do not run Lenis on reduced-motion users (it already auto-disables).',
    code: `import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// 1 · init smooth scroll (wraps NATIVE scroll — a11y & anchors keep working)
const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
// SAFARI+iOS tap fix: keep ScrollTrigger usable
ScrollTrigger.addEventListener('pointerDown', () => lenis.stop());
ScrollTrigger.addEventListener('pointerUp', () => lenis.start());

// 2 · sync both loops on GSAP's ticker (this is the fix)
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// 3 · enable the anchors you need
gsap.registerPlugin(ScrollToPlugin);`,
    reducedMotion: 'Lenis respects prefers-reduced-motion automatically (lerp forced to 1, scrolls are instant).',
  },
  {
    id: 'gsap-line-mask',
    title: 'Line mask reveal (award-level headline)',
    category: 'gsap',
    difficulty: 'medium',
    when:
      'The signature 2026 headline: each line slides up from behind a clipping wrapper. The text appears to emerge from nothing.',
    avoids: 'Splitting before fonts load (positions wrong). Body copy under ~18px. No resize handling → add observeChanges.',
    code: `import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(SplitText, ScrollTrigger);

async function revealHeadline(el) {
  // wait for fonts first — positions must be final
  await document.fonts.ready;
  const split = SplitText.create(el, { type: 'lines', linesClass: 'ln' });
  gsap.set('.ln', { overflow: 'hidden' });
  gsap.from(split.lines, {
    yPercent: 110,
    duration: 1,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 82%', once: true }
  });
  // a11y: expose text, hide the split soup
  el.setAttribute('aria-label', el.textContent.trim());
  split.lines.forEach((l) => l.setAttribute('aria-hidden', 'true'));
}

revealHeadline(document.querySelector('h1'));`,
    reducedMotion: 'Guard with gsap.matchMedia() and skip entirely when reduced (see reduced-motion recipe).',
  },
  {
    id: 'gsap-char-reveal',
    title: 'Character cascade reveal',
    category: 'gsap',
    difficulty: 'medium',
    when:
      'Short, punchy headlines (< 20 chars). Each character pops in reading order. 20ms stagger = snappy but readable.',
    avoids: 'Long paragraphs (DOM explosion). Use words for body-ish text, lines for display text.',
    code: `import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(SplitText, ScrollTrigger);

const el = document.querySelector('.hero h1');
const split = SplitText.create(el, { type: 'chars', charsClass: 'ch' });
gsap.from(split.chars, {
  y: 40, opacity: 0, force3D: true,
  duration: 0.6, stagger: 0.02, ease: 'expo.out',
  scrollTrigger: { trigger: el, start: 'top 85%', once: true }
});
el.setAttribute('aria-label', el.textContent.trim());
split.chars.forEach((c) => c.setAttribute('aria-hidden', 'true'));`,
    reducedMotion: 'Skip entirely under reduced motion (gsap.matchMedia).',
  },
  {
    id: 'gsap-word-scrub',
    title: 'Scroll-scrubbed word reveal',
    category: 'gsap',
    difficulty: 'medium',
    when:
      'A block of copy that "wakes up" word-by-word as you scroll — pauses when you stop, reverses when you scroll back. Paragraphs that feel alive.',
    avoids: 'Scrubbing huge paragraphs (cheap fade only: opacity, no y on every word).',
    code: `import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(SplitText, ScrollTrigger);

const el = document.querySelector('.story p');
const split = SplitText.create(el, { type: 'words', wordsClass: 'wd' });
gsap.from(split.words, {
  opacity: 0.1,
  duration: 1,
  stagger: 0.08,
  ease: 'none',             // the scrollbar is the easing
  scrollTrigger: {
    trigger: el,
    start: 'top 72%',
    end: 'bottom 45%',
    scrub: 1                 // 1s lag = feels physical
  }
});`,
    reducedMotion: 'Skip entirely under reduced motion.',
  },
  {
    id: 'gsap-scramble',
    title: 'Scramble / decode text',
    category: 'gsap',
    difficulty: 'medium',
    when:
      'Hacker-flavoured brand moments: a label that decodes into its final word. 80% of the effect with no plugin.',
    avoids: 'Using it for body copy or anything users need to read fast.',
    code: `function scramble(el) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const original = el.textContent;
  let iterations = 0;
  const timer = setInterval(() => {
    el.textContent = original
      .split('')
      .map((ch, i) => (ch === ' ' ? ' ' : i < iterations ? ch : chars[Math.floor(Math.random() * chars.length)]))
      .join('');
    if (iterations >= original.length) { clearInterval(timer); el.textContent = original; }
    iterations++;
  }, 40);
}
scramble(document.querySelector('.decode'));`,
    reducedMotion: 'Under reduced motion, set the text directly with no interval.',
  },
  {
    id: 'gsap-pinned-story',
    title: 'Scrollytelling: pinned story',
    category: 'gsap',
    difficulty: 'hard',
    when:
      'The flagship pattern: a section pins while frames of a story scrub past (image swaps, text swaps, progress counter).',
    avoids: 'Pinning on mobile (collapse to stacked steps); pinning longer than ~3s of scroll; overlapping the fixed header.',
    code: `import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.story');
const frames = gsap.utils.toArray('.story .frame');   // full-viewport stages
const counter = document.querySelector('.story .counter');
const progress = document.querySelector('.story .bar');
gsap.set(frames, { autoAlpha: 0, position: 'absolute', inset: 0 });
gsap.set(frames[0], { autoAlpha: 1 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: () => '+=' + frames.length * 100 + '%',
    pin: true,
    scrub: 1,
    anticipatePin: 1
  }
});
frames.forEach((frame, i) => {
  if (i === 0) return;
  tl.to(frames[i - 1], { autoAlpha: 0, duration: 0.5 })
    .to(frame, { autoAlpha: 1, duration: 0.5 });
});
// progress counter
tl.to(progress, { scaleX: 1, ease: 'none' }, 0);
let step = 0;
tl.call(() => { counter.textContent = String(++step).padStart(2, '0'); }, [], 1);`,
    reducedMotion: 'Run gsap.matchMedia and skip pinning; show all frames stacked.',
  },
  {
    id: 'gsap-magnetic',
    title: 'Magnetic button + cursor ring',
    category: 'gsap',
    difficulty: 'medium',
    when:
      'Premium micro-interaction pair: the CTA pulls toward the pointer, a cursor ring trails it. Agency-standard polish.',
    avoids: 'Pointer effects on touch (feature-detect); magnetic hitboxes that make targets hard to click; blocking native focus.',
    code: `import gsap from 'gsap';

// magnetic button
document.querySelectorAll('.magnetic').forEach((btn) => {
  const strength = 0.35;
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.3, ease: 'power3.out'
    });
  });
  btn.addEventListener('pointerleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  });
});

// cursor ring (fine pointer only)
if (window.matchMedia('(pointer: fine)').matches) {
  const ring = document.createElement('div');
  ring.style.cssText = 'position:fixed;width:28px;height:28px;border:1px solid currentColor;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);';
  document.body.appendChild(ring);
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.2;   // lerp trail
    pos.y += (target.y - pos.y) * 0.2;
    gsap.set(ring, { x: pos.x, y: pos.y });
  });
  addEventListener('pointermove', (e) => { target.x = e.clientX; target.y = e.clientY; });
  addEventListener('pointerdown', () => gsap.to(ring, { scale: 0.6, duration: 0.2 }));
  addEventListener('pointerup', () => gsap.to(ring, { scale: 1, duration: 0.2 }));
}`,
    reducedMotion: 'Cursor ring and magnetic pull are motion — disable both under reduced motion.',
  },
  {
    id: 'gsap-frame-scrub',
    title: 'Frame-by-frame canvas scrub (video without video)',
    category: 'gsap',
    difficulty: 'hard',
    when:
      'The More Nutrition technique: a pre-rendered image sequence played by scroll on <canvas>. The "3D video" hero that still passes Core Web Vitals.',
    avoids: 'Swapping <img> src per frame (laggy on fast scroll). Rendering frames inline (this needs a pre-generated sequence — generate at build).',
    code: `import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const FRAMES = 60;              // your pre-generated frame count
const urls = Array.from({ length: FRAMES }, (_, i) => \`/frames/f-\${i}.webp\`);
const imgs = urls.map((src) => { const i = new Image(); i.src = src; return i; });
let current = -1;

function draw(idx) {
  if (idx === current) return;
  current = idx;
  const img = imgs[idx];
  if (!img.complete) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

gsap.to({}, {
  duration: FRAMES,
  ease: 'none',
  scrollTrigger: {
    trigger: canvas,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  },
  onUpdate() { draw(Math.round(this.progress * (FRAMES - 1))); }
});`,
    reducedMotion: 'Draw only the final frame, no scrub.',
  },
  {
    id: 'gsap-horizontal-scroll',
    title: 'Pinned horizontal scroll section',
    category: 'gsap',
    difficulty: 'hard',
    when:
      'Work gallery / case studies that travel sideways while the page scrolls vertically. Enduring award favourite.',
    avoids: 'On small screens (content becomes unusable) — linearize. Long tracks punish scroll-heavy reading.',
    code: `import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector('.track');
const panels = gsap.utils.toArray('.panel');
gsap.to(track, {
  x: () => -(track.scrollWidth - innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.wrap',
    start: 'top top',
    end: () => '+=' + (track.scrollWidth - innerWidth),
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true
  }
});
// optional: progress rail
gsap.to('.hprogress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.wrap', start: 'top top', end: '+=200%', scrub: 1 } });`,
    reducedMotion: 'Skip pinning; stack panels vertically.',
  },
  {
    id: 'reduced-motion-pattern',
    title: 'The reduced-motion discipline (GSAP)',
    category: 'integration',
    difficulty: 'easy',
    when:
      'Every GSAP project, day one. Converts all the above from "animation" to "static layout" for motion-sensitive users without forks in the code.',
    avoids: 'Forgetting that silent scroll/jump links still need handling.',
    code: `import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: reduce)', () => {
  // everything static: kill pins, skip tweens, jump to final state
  gsap.globalTimeline.clear();
  return () => {};   // cleanup
});
// …your normal animation code lives in mm.add('(prefers-reduced-motion: no-preference)', …)`,
    reducedMotion: 'This IS the pattern.',
  },
];
