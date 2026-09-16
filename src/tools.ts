// The Creative Lemon — tool registry. Every tool returns markdown text the agent
// can apply immediately. No hidden state; everything is deterministic knowledge.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { REPORT } from './data/trends.js';
import { RECIPES } from './data/motion.js';
import { PRINCIPLES, AUDIT_PLAN } from './data/principles.js';
import { makePalette, CURATED, type PaletteResult } from './data/palettes.js';
import { TYPE_SPECS, fluidScale, TYPE_PRINCIPLES } from './data/typeSpecs.js';
import { SECTIONS } from './data/sections.js';
import { REFERENCES, RUBRIC } from './data/references.js';
import { designTokens } from './data/tokens.js';

const MOODS = ['editorial', 'tech', 'brutalist', 'luxury', 'playful', 'cyber'] as const;

export function registerAll(server: McpServer): void {
  // ── 1 · trends ────────────────────────────────────────────────────────────
  server.registerTool(
    'lemon_trend_report',
    {
      description:
        'The 2026 web design & motion trend report (distilled from MotionKit, Chrome scroll-driven animations, GSAP/Lenis, Awwwards). Call BEFORE designing a site. Optionally filter to one trend by id.',
      inputSchema: z.object({
        trendId: z
          .string()
          .optional()
          .describe('Filter to a single trend id, e.g. scrollytelling, kinetic-type, scroll-css. Omit for the full report.'),
      }),
    },
    async ({ trendId }) => {
      const lines: string[] = [];
      if (trendId) {
        const t = REPORT.trends.find((x) => x.id === trendId || x.id.includes(trendId.toLowerCase()));
        if (!t) return { content: [{ type: 'text', text: `Unknown trend id "${trendId}". Valid ids:\n${REPORT.trends.map((x) => `- ${x.id} — ${x.title}`).join('\n')}` }] };
        lines.push(`# ${t.title}`, `**Technique:** ${t.technique} · **Difficulty:** ${t.difficulty}`, '', t.verdict, '', '**Do:**');
        t.do.forEach((d) => lines.push(`- ${d}`));
        lines.push('', '**Avoid:**');
        t.avoid.forEach((a) => lines.push(`- ${a}`));
        lines.push('', `_Source: ${REPORT.sources[0]}_`);
      } else {
        lines.push(`# Web design trends ${REPORT.year}`, '', REPORT.headline, '', '## Platform shifts');
        REPORT.shifts.forEach((s) => lines.push(`- ${s}`));
        lines.push('', '## Trends');
        REPORT.trends.forEach((t) => {
          lines.push(`### ${t.title} (\`${t.id}\`, ${t.difficulty})`, t.verdict, '', '**Do:**');
          t.do.forEach((d) => lines.push(`- ${d}`));
          lines.push('', '**Avoid:**');
          t.avoid.forEach((a) => lines.push(`- ${a}`));
        });
        lines.push('', '## Fading out', ...REPORT.fading.map((f) => `- ${f}`));
        lines.push('', '## Winning stack', ...REPORT.stack.map((s) => `- ${s}`), '', '## Sources', ...REPORT.sources.map((s) => `- ${s}`));
      }
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 2 · motion recipe ─────────────────────────────────────────────────────
  server.registerTool(
    'lemon_motion_recipe',
    {
      description:
        'Copy-paste motion code recipes for 2026 patterns: native CSS scroll-driven (reveal, parallax, progress, marquee, svg-draw), GSAP (line mask, char reveal, word scrub, pinned story, horizontal scroll, magnetic, frame-scrub) and the GSAP+Lenis integration. Includes reduced-motion handling in every recipe.',
      inputSchema: z.object({
        id: z.string().optional().describe('Recipe id: css-reveal, css-scroll-progress, css-parallax, css-marquee, css-svg-draw, gsap-lenis-setup, gsap-line-mask, gsap-char-reveal, gsap-word-scrub, gsap-scramble, gsap-pinned-story, gsap-magnetic, gsap-frame-scrub, gsap-horizontal-scroll, reduced-motion-pattern. Omit to list all.'),
        category: z.enum(['css', 'gsap', 'integration']).optional().describe('Filter by runtime: pure CSS (zero JS), GSAP, or integration code.'),
        search: z.string().optional().describe('Keyword search across titles and descriptions.'),
      }),
    },
    async ({ id, category, search }) => {
      const all = [...RECIPES];
      const filtered = id
        ? all.filter((r) => r.id === id)
        : all.filter((r) => (!category || r.category === category) && (!search || `${r.title} ${r.when}`.toLowerCase().includes(search.toLowerCase())));
      if (id && filtered.length === 0) {
        return { content: [{ type: 'text', text: `Unknown recipe id "${id}". Valid ids:\n${RECIPES.map((r) => `- ${r.id} — ${r.title}`).join('\n')}` }] };
      }
      const lines: string[] = [];
      filtered.forEach((r, i) => {
        if (i > 0) lines.push('', '---', '');
        lines.push(`# ${r.title} (\`${r.id}\` · ${r.category} · ${r.difficulty})`, '', `**Use when:** ${r.when}`, '', `**Avoid:** ${r.avoids}`, '', '```');
        lines.push(r.code);
        lines.push('```', '', `**Reduced motion:** ${r.reducedMotion}`);
      });
      if (filtered.length === 0) lines.push('No recipes match. Try a category (css/gsap/integration) or listing all ids.');
      if (!id && !search) lines.splice(0, 0, `# Motion recipes (${RECIPES.length})\n\n` + RECIPES.map((r) => `- ${r.id} — ${r.title}`).join('\n'));
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 3 · principles ───────────────────────────────────────────────────────
  server.registerTool(
    'lemon_design_principles',
    {
      description:
        'The permanent laws of good web design (hierarchy, typography, colour, motion, performance, accessibility, content, craft) plus a 10-step audit plan. Consult for any build; everything else in the Lemon is these rules applied to 2026.',
      inputSchema: z.object({
        topic: z
          .string()
          .optional()
          .describe('One principle id: hierarchy, typography, colour, motion, performance, accessibility, content, craft. Omit for all + audit plan.'),
        audit: z.boolean().optional().describe('When true, also return the 10-step audit plan (default true when no topic given).'),
      }),
    },
    async ({ topic, audit }) => {
      const lines: string[] = [];
      if (topic) {
        const p = PRINCIPLES.find((x) => x.id === topic);
        if (!p) return { content: [{ type: 'text', text: `Unknown topic "${topic}". Valid: ${PRINCIPLES.map((x) => x.id).join(', ')}` }] };
        lines.push(`# ${p.title}`, ...p.laws.map((l) => `- ${l}`), '', '**Check yourself:**', ...p.questions.map((q) => `- ${q}`));
      } else {
        PRINCIPLES.forEach((p) => lines.push(`## ${p.title}`, ...p.laws.map((l) => `- ${l}`), ''));
        if (audit !== false) lines.push('# 10-Step Audit Plan', ...AUDIT_PLAN);
      }
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 4 · critique ─────────────────────────────────────────────────────────
  server.registerTool(
    'lemon_critique',
    {
      description:
        'Structured critique of a design (Awwwards SOTD rubric: Design 40 / Usability 30 / Creativity 20 / Content 10) with heuristics scanning your description for red flags, plus questions to answer about the real page. Honest — flags what it cannot see.',
      inputSchema: z.object({
        design: z.string().describe('Describe the design concretely: layout, type, colour, motion, sections, content. Or paste the code/markup.'),
        intent: z.string().optional().describe('What this site must achieve (convert, hire-me, showcase…).'),
      }),
    },
    async ({ design, intent }) => {
      const d = design.toLowerCase();
      const flags: string[] = [];
      const checks: { ok: string; fail: (s: string) => boolean; fix: string }[] = [
        { ok: 'Focal point per viewport described', fail: () => false, fix: 'Name the ONE element each viewport leads the eye to.' },
        { ok: 'Display type + body pair declared', fail: (s) => /font|type|family/.test(s) === false, fix: 'Choose two families and a fluid clamp() scale — never default stacks.' },
        { ok: 'Palette is small & intentional', fail: (s) => /palette|colour|color|hex|#[0-9a-f]{6}/.test(s) === false, fix: 'Pick ≤ 1 accent + 2 neutrals; accent on ≤ 1 action per screen.' },
        { ok: 'Motion has a vocabulary', fail: (s) => /animat|motion|tween|transition|gsap/.test(s) === false, fix: 'One easing/duration grammar; transform+opacity only; reduced-motion collapse.' },
        { ok: 'Performance addressed', fail: (s) => /lcp|inp|cls|vital|performance|lazy/.test(s) === false, fix: 'State LCP/INP targets, lazy images, no fake preloader.' },
        { ok: 'Reduced motion handled', fail: (s) => /prefers-reduced|reduced/.test(s) === false, fix: 'Add the global reduced-motion CSS from lemon_motion_recipe (reduced-motion-pattern).' },
        { ok: 'Copy is specific', fail: (s) => /\b(innovative|disruptive|cutting-edge|state-of-the-art|seamless|revolutionary)\b/.test(s), fix: 'Delete the adjective, add a number or an artefact.' },
        { ok: 'Accessible interaction model', fail: (s) => /keyboard|focus|aria|semantic|alt/.test(s) === false, fix: 'Keyboard path + visible focus + semantic landmarks.' },
      ];
      checks.forEach((c) => {
        if (c.fail(d)) flags.push(`- ⚠ ${c.fix}`);
      });
      const lines: string[] = [
        `# Critique — ${intent ? `intent: ${intent}` : 'intent not stated (state it: convert? hire? showcase?)'}`,
        '',
        'Rubric (Awwwards SOTD): Design 40% · Usability 30% · Creativity 20% · Content 10%',
        '',
        '## Red flags found by scan',
        flags.length ? flags.join('\n') : '- None matched by keyword scan (human review the rest).',
        '',
        '## Questions to answer against the live page',
      ];
      RUBRIC.designChecks.forEach((c) => lines.push(`- [ ] ${c}`));
      lines.push('');
      RUBRIC.usabilityChecks.forEach((c) => lines.push(`- [ ] ${c}`));
      lines.push('');
      RUBRIC.creativityChecks.forEach((c) => lines.push(`- [ ] ${c}`));
      lines.push('');
      RUBRIC.contentChecks.forEach((c) => lines.push(`- [ ] ${c}`));
      lines.push('', '## Read it fresh', '- Would a competitor\u2019s name fit on this page unchanged? If yes, the concept has no point of view.', '- Glance for 3 seconds: what do you remember? That is the focal point — make it the design.');
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 5 · palette ──────────────────────────────────────────────────────────
  server.registerTool(
    'lemon_palette',
    {
      description:
        'Generate a small, intentional, AA-checked palette token set from a mood (editorial, tech, brutalist, luxury, playful, cyber) + optional constraint. Use before styling anything.',
      inputSchema: z.object({
        mood: z.enum(MOODS).describe('Mood voice for the palette.'),
        constraint: z.string().optional().describe('Real constraint (brand colour, must ship 10 sub-brands, print uses, etc.).'),
      }),
    },
    async ({ mood, constraint }) => {
      const p: PaletteResult = makePalette(mood, constraint);
      const lines = [
        `# Palette — ${mood}`,
        '',
        p.voice,
        '',
        '```css',
        ':root {',
        ...Object.entries(p.roles).map(([k, v]) => `  ${k}: ${v};`),
        '}',
        '```',
        '',
        '## Usage laws',
        ...p.usage.map((u) => `- ${u}`),
        '',
        `**Contrast:** ${p.contrastNote}`,
        '',
        'Curated presets for reference:',
        ...CURATED.map((c) => `- ${c.voice} → ${Object.values(c.roles).join(' / ')}`),
      ];
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 6 · type spec ────────────────────────────────────────────────────────
  server.registerTool(
    'lemon_type_spec',
    {
      description:
        'A typography system for a voice (editorial, tech, brutalist, luxury, playful): family pairings, fluid clamp() scale tokens, and the type laws. The Verge-DESIGN.md-style discipline.',
      inputSchema: z.object({
        voice: z.enum(['editorial', 'tech', 'brutalist', 'luxury', 'playful']).optional().describe('Voice to spec. Omit for all + the fluid scale + laws.'),
      }),
    },
    async ({ voice }) => {
      const lines: string[] = [];
      if (voice) {
        const s = TYPE_SPECS.find((x) => x.voice.startsWith(voice));
        if (!s) return { content: [{ type: 'text', text: 'Invalid voice. Valid: editorial, tech, brutalist, luxury, playful.' }] };
        lines.push(
          `# Type — ${voice}`,
          '',
          `**Display:** ${s.display.family} · weight ${s.display.weight} · ${s.display.size} · lh ${s.display.lh}`,
          `**Text:** ${s.text}`,
          s.mono ? `**Mono:** ${s.mono}` : '**Mono:** —',
          '',
          `**Formula:** ${s.formula}`,
          '',
          `**Why:** ${s.rationale}`,
          '',
          '### Fluid scale (clamp tokens, 16px base, 1.25 ratio)',
          '```css',
          fluidScale(),
          '```'
        );
      } else {
        TYPE_SPECS.forEach((s) => lines.push(`## ${s.voice}`, `- Display: ${s.display.family} · ${s.display.size} · lh ${s.display.lh}`, `- Text: ${s.text}`, s.mono ? `- Mono: ${s.mono}` : '', s.formula, ''));
        lines.push('# Type laws', ...TYPE_PRINCIPLES.map((p) => `- ${p}`), '', '### Fluid scale (16px base, 1.25 ratio)', '```css', fluidScale(), '```');
      }
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 7 · section recipe ───────────────────────────────────────────────────
  server.registerTool(
    'lemon_section_recipe',
    {
      description:
        'Structural DNA + HTML skeleton + the ONE motion moment for award-grade sections: hero, work, story/scrollytelling, process, proof/testimonials, footer/contact.',
      inputSchema: z.object({
        id: z.enum(['hero', 'work', 'story', 'process', 'testimonial', 'footer']).optional().describe('Section id. Omit for all.'),
      }),
    },
    async ({ id }) => {
      const list = id ? SECTIONS.filter((s) => s.id === id) : SECTIONS;
      const lines: string[] = [];
      list.forEach((s, i) => {
        if (i > 0) lines.push('', '---', '');
        lines.push(
          `# ${s.title} (\`${s.id}\`)`,
          '',
          `**Use when:** ${s.useWhen}`,
          '',
          '**Anatomy:**',
          ...s.anatomy.map((a) => `- ${a}`),
          '',
          `**Motion:** ${s.motion}`,
          '',
          '```html',
          s.html,
          '```',
          '',
          '**Pitfalls:**',
          ...s.pitfalls.map((p) => `- ${p}`)
        );
      });
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  // ── 8 · references ───────────────────────────────────────────────────────
  server.registerTool(
    'lemon_references',
    {
      description:
        'Awwwards-awarded and notable 2025–26 sites with the ONE stealable lesson from each (Untold, Cartier WW 2025, More Nutrition canvas-scrub, Eddie, Trevor Noah, Paul Kalkbrenner, The Spark, Huy Phan, Why Zero). Taste compass, not clone list.',
      inputSchema: z.object({
        id: z.string().optional().describe('Reference id (untold, cartier-ww2025, more-nutrition, eddie, trevor-noah, paul-kalkbrenner, the-spark, huy-phan, why-zero). Omit for all.'),
        rubric: z.boolean().optional().describe('Also return the full SOTD evaluation rubric.'),
      }),
    },
    async ({ id, rubric }) => {
      const lines: string[] = [];
      const list = id ? REFERENCES.filter((r) => r.id === id) : REFERENCES;
      list.forEach((r, i) => {
        if (i > 0) lines.push('', '---', '');
        lines.push(
          `# ${r.name} — ${r.year}`,
          r.stack ? `**Stack:** ${r.stack}` : '',
          '',
          `**Lesson:** ${r.lesson}`,
          '',
          '**Steal:**',
          ...r.steals.map((s) => `- ${s}`),
          '',
          '**Avoid:**',
          ...r.avoids.map((a) => `- ${a}`)
        );
      });
      if (!id && list.length === 0) lines.push('Unknown id. Valid: ' + REFERENCES.map((r) => r.id).join(', '));
      if (rubric || (!id && rubric !== false)) {
        lines.push('', '# SOTD Rubric (weights)', `Design ${RUBRIC.weights.design * 100}% · Usability ${RUBRIC.weights.usability * 100}% · Creativity ${RUBRIC.weights.creativity * 100}% · Content ${RUBRIC.weights.content * 100}%`, '', '**Design checks:**', ...RUBRIC.designChecks.map((c) => `- ${c}`), '', '**Usability checks:**', ...RUBRIC.usabilityChecks.map((c) => `- ${c}`), '', '**Creativity checks:**', ...RUBRIC.creativityChecks.map((c) => `- ${c}`), '', '**Content checks:**', ...RUBRIC.contentChecks.map((c) => `- ${c}`));
      }
      return { content: [{ type: 'text', text: lines.join('\n').replace(/\n{3,}/g, '\n\n') }] };
    }
  );

  // ── 9 · design tokens (DESIGN.md) ────────────────────────────────────────
  server.registerTool(
    'lemon_design_tokens',
    {
      description:
        'Emit a complete DESIGN.md token spec (color + radius + spacing + motion + type + layout laws) for a brand voice — the machine-readable design system format agents can apply verbatim.',
      inputSchema: z.object({
        mood: z.enum(MOODS).describe('Mood driving the palette.'),
        voice: z.string().optional().describe('Brand/voice label for the spec title (e.g. "Alchemist OS · cyber").'),
        constraint: z.string().optional().describe('Constraint passed to the palette engine.'),
      }),
    },
    async ({ mood, voice, constraint }) => {
      const p = makePalette(mood, constraint);
      return { content: [{ type: 'text', text: designTokens({ pal: p.roles, voice: voice ?? mood }) }] };
    }
  );
}