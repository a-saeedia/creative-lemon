// Smoke test: boots the built server, speaks raw JSON-RPC over stdio,
// and verifies every tool responds. Line-delimited JSON per MCP spec.
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const child = spawn(process.execPath, [join(root, 'dist', 'index.js')], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

const rl = createInterface({ input: child.stdout });
const pending = new Map();
let nextId = 0;

function call(method, params) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  });
}

rl.on('line', (line) => {
  const msg = JSON.parse(line);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id).resolve(msg);
    pending.delete(msg.id);
  }
});

async function main() {
  const init = await call('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'lemon-smoke', version: '0.0.0' },
  });
  console.log('✓ initialize →', init.result?.serverInfo?.name, init.result?.serverInfo?.version);

  const list = await call('tools/list', {});
  const tools = list.result?.tools ?? [];
  console.log(`✓ tools/list → ${tools.length} tools`);
  const ids = new Set(tools.map((t) => t.name));
  const expected = [
    'lemon_trend_report', 'lemon_motion_recipe', 'lemon_design_principles',
    'lemon_critique', 'lemon_palette', 'lemon_type_spec', 'lemon_section_recipe',
    'lemon_references', 'lemon_design_tokens',
  ];
  for (const name of expected) {
    if (!ids.has(name)) throw new Error(`missing tool: ${name}`);
  }
  if (tools.length !== expected.length) throw new Error(`expected ${expected.length} tools, got ${tools.length}`);

  const probes = [
    ['lemon_trend_report', { trendId: 'kinetic-type' }],
    ['lemon_motion_recipe', { id: 'gsap-lenis-setup' }],
    ['lemon_motion_recipe', { category: 'css' }],
    ['lemon_design_principles', { topic: 'motion' }],
    ['lemon_critique', { design: 'A hero with a huge headline, default system font, no mention of palette, no reduced-motion handling, stock images', intent: 'hire me' }],
    ['lemon_palette', { mood: 'cyber', constraint: 'must ship on black' }],
    ['lemon_type_spec', { voice: 'tech' }],
    ['lemon_section_recipe', { id: 'story' }],
    ['lemon_references', { rubric: true }],
    ['lemon_design_tokens', { mood: 'luxury', voice: 'Maison Noire' }],
  ];
  for (const [tool, params] of probes) {
    const res = await call('tools/call', { name: tool, arguments: params });
    if (res.result?.isError) throw new Error(`${tool} returned isError: ${JSON.stringify(res.result)}`);
    const text = res.result?.content?.[0]?.text ?? '';
    if (!text || text.length < 40) throw new Error(`${tool} returned empty/too-short text`);
    console.log(`✓ ${tool} → ${text.split('\n')[0].slice(0, 70)} (${text.length} chars)`);
  }

  console.log('\nAll good. Creative lemon is sour and working. 🍋');
  child.kill();
  process.exit(0);
}

main().catch((e) => {
  console.error('✗ smoke failed:', e.message);
  child.kill();
  process.exit(1);
});
