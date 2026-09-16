# 🍋 The Creative Lemon

**An MCP server that gives AI agents eyes for creating.**

The Creative Lemon packages the 2026 winning-motion, award-grade web design knowledge
(Awwwards SOTD, MotionKit trends, Chrome scroll-driven animations, GSAP/Lenis practice)
into ~9 deterministic tools an agent can call while building: trend reports, copy-paste
motion code recipes, the permanent laws of good design, honest critique, palettes,
type systems, section skeletons, reference sites to steal one lesson from, and a
DESIGN.md token emitter.

No hidden state, no network calls at runtime, no API keys. Just knowledge.

## Tools

| Tool | What it gives an agent |
|---|---|
| `lemon_trend_report` | The 2026 trend map (scrollytelling, kinetic type, native scroll-driven CSS, INP-aware motion…) with do/avoid per trend |
| `lemon_motion_recipe` | 15 copy-paste recipes: CSS scroll reveals/parallax/progress/marquee/svg-draw, GSAP line-mask/char/word-scrub/pinned story/horizontal/magnetic/frame-scrub, the GSAP+Lenis glue — every one with reduced-motion handling |
| `lemon_design_principles` | The permanent laws (hierarchy, type, colour, motion, performance, a11y, content, craft) + a 10-step audit plan |
| `lemon_critique` | Structured critique on the SOTD rubric (Design 40 / Usability 30 / Creativity 20 / Content 10) with red-flag scans |
| `lemon_palette` | Small, intentional, AA-checked palette token sets from a mood (editorial / tech / brutalist / luxury / playful / cyber) |
| `lemon_type_spec` | Type pairings + fluid `clamp()` scale per voice, plus the type laws |
| `lemon_section_recipe` | Structural DNA + HTML skeleton + the one motion moment per section (hero, work, story, process, proof, footer) |
| `lemon_references` | Awwwards/notable 2025–26 sites with the ONE stealable lesson from each, plus the SOTD rubric |
| `lemon_design_tokens` | A full machine-readable DESIGN.md (colour/radius/spacing/motion/type/layout) for a brand voice |

## Use with opencode

Add to `opencode.json` (or `~/.config/opencode/opencode.jsonc`):

```jsonc
{
  "mcp": {
    "creative-lemon": {
      "type": "local",
      "command": ["node", "/absolute/path/to/creative-lemon/dist/index.js"],
      "enabled": true
    }
  }
}
```

## Use with Claude Desktop / Claude Code

```json
{
  "mcpServers": {
    "creative-lemon": {
      "command": "node",
      "args": ["/absolute/path/to/creative-lemon/dist/index.js"]
    }
  }
}
```

Point `node` at your Node 18+ binary. Then ask for a trend report, a pinned-story
recipe, or a palette — and watch the design stop being generic.

## Build & test

```sh
npm install
npm run build       # tsc → dist/
npm run smoke       # boots the server, talks raw JSON-RPC over stdio, probes all 9 tools
```

## Design rules baked in

- **Restraint is a feature:** every motion recipe ships with `prefers-reduced-motion` handling.
- **Performance is a design decision:** animate `transform`/`opacity` only; INP < 200ms; no fake preloaders.
- **Copy is design:** numbers over adjectives; delete the AI-slop words.
- **One vocabulary:** same easing, same durations, same "hand" across a whole site.

## Sources
MotionKit "Web Animation Trends 2026", Chrome for Developers scroll-driven animations,
GSAP & Lenis docs, Awwwards SOTD judging, shadcn/Vox Verge DESIGN.md movement.

## License
MIT — sour, free, share it.
