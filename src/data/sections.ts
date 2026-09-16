// The Creative Lemon — section skeletons: the structural DNA of award-winning
// pages. Each gives the HTML shape, the behaviour, and the one motion moment.

export interface SectionRecipe {
  id: string;
  title: string;
  useWhen: string;
  anatomy: string[];
  motion: string;
  html: string;
  pitfalls: string[];
}

export const SECTIONS: SectionRecipe[] = [
  {
    id: 'hero',
    title: 'The One-Idea Hero',
    useWhen: 'The first viewport. One giant claim + one proof + one action.',
    anatomy: [
      'Fluid display headline (clamp 3.5–8rem) — the ONLY shout',
      '1-sentence subtext (the specific proof, not an adjective)',
      'ONE primary CTA + optional quiet secondary link',
      'A single art directorate element right: image, canvas scrub, or kinetic type',
    ],
    motion: 'Kinetic type reveal (line mask) + subtle parallax on the art. Everything else stays still.',
    html: `<header class="hero">
  <h1>Headline that<br>earns its size</h1>
  <p class="lede">The specific proof, in numbers, not adjectives.</p>
  <a class="cta magnetic" href="#work">Start →</a>
  <div class="hero-art" aria-hidden="true"><!-- image / canvas / svg --></div>
  <a class="scroll-cue" href="#next" aria-label="Scroll down"></a>
</header>`,
    pitfalls: ['Two shouting headlines', 'Animation before fonts load', 'A hero that looks the same on mobile (design it stacked UP)'],
  },
  {
    id: 'work',
    title: 'Work / Case Studies',
    useWhen: 'Any site selling what you did — portfolio, agency, product.',
    anatomy: [
      'Bento or alternating 50/50 rows',
      'Every card: title, one-line outcome (numbers), a still or hover media',
      'Whole card is the link; hover = media swap or scale + arrow slide',
      '3–4 pieces max. Scarcity is confidence.',
    ],
    motion: 'Staggered view() reveals per row (CSS). Hover media cross-fade (0.3s). Optional pinned horizontal scroll for 4+ pieces on wide screens.',
    html: `<section id="work" class="bento">
  <h2>Selected work</h2>
  <div class="work-grid">
    <a class="card big" href="#">
      <figure><img src="thumb.webp" alt="Project" loading="lazy"></figure>
      <h3>Project title</h3>
      <p class="outcome">+212% activation · 60 days</p>
    </a>
    <!-- more cards -->
  </div>
</section>`,
    pitfalls: ['Listing everything ever made', 'Abstract project titles with no outcome', 'Stock screenshots'],
  },
  {
    id: 'story',
    title: 'The Message / Scrollytelling',
    useWhen: 'A claim to prove through narrative (process, manifesto, numbers rising).',
    anatomy: [
      'Sticky frame: one pinned art element',
      'Scrub corpus: 3–6 beat texts, each 1–2 lines',
      'Progress cue: counter (01/06) or bar — always',
      'Mobile fallback: beats reveal stacked (no pin)',
    ],
    motion: 'GSAP pin + scrub timeline cross-fading beats; counter syncs via tl.call.',
    html: `<section class="story" data-pin>
  <div class="stage"><div class="frame is-on">Beat one</div><div class="frame">Beat two</div></div>
  <div class="cue"><span class="counter">01</span><span class="bar" aria-hidden="true"></span></div>
</section>`,
    pitfalls: ['Pinning longer than ~3s of scroll', 'Hidden beats missing on reduced motion (stack them)', 'Scrub lag making text unreadable'],
  },
  {
    id: 'process',
    title: 'How It Works',
    useWhen: 'Explain a pipeline (services, methodology, build steps).',
    anatomy: [
      'Numbered steps, ideally a horizontal track on wide screens',
      'Each step: number, title, 1–2 sentence concrete description',
      'The whole thing is visualised as a line you walk',
    ],
    motion: 'Step numbers draw/scale as they enter; a progress line fills with scroll.',
    html: `<section id="process">
  <h2>How it works</h2>
  <ol class="steps">
    <li><span class="num">01</span><h3>Step</h3><p>Concrete description.</p></li>
  </ol>
</section>`,
    pitfalls: ['Steps that are buzzwords ("Align", "Ideate") with no content', 'A pipeline that never gets the user to the CTA'],
  },
  {
    id: 'testimonial',
    title: 'Proof / Testimonials',
    useWhen: 'Trust-building: quotes, logos, metrics.',
    anatomy: [
      'One strong quote at a time, large type',
      'Attribution with role (never just a first name)',
      'Metric strip: 3 real numbers with tabular-nums',
    ],
    motion: 'Cross-fade + word-scrub on quotes; metrics count up on enter (once).',
    html: `<section id="proof">
  <blockquote><p>“Specific outcome, real words.”</p><cite>Name · Role, Company</cite></blockquote>
  <div class="metrics"><b>212%</b><b>60d</b><b>4.9★</b></div>
</section>`,
    pitfalls: ['Anonymous testimonials', 'Metrics without units or context'],
  },
  {
    id: 'footer',
    title: 'The Final Word / Contact',
    useWhen: 'Close the page: a big claim, links, and a way to act.',
    anatomy: [
      'Huge closing line (repeats the hero idea, one size bigger)',
      'Direct contact: email as text link (mails start — low friction)',
      'Navigation echo + socials + small print (legal, credits)',
    ],
    motion: 'Marquee or line-draw on the closing word; footer links get hover slides.',
    html: `<footer>
  <p class="closing">Let\u2019s make yours.</p>
  <a class="email" href="mailto:you@site.com">you@site.com</a>
  <nav aria-label="Footer">…</nav>
  <p class="fineprint">© 2026 · credits</p>
</footer>`,
    pitfalls: ['Contact buried in a form with 8 fields (email link converts better for funnels)', 'Footer with no identity'],
  },
];