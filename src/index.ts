#!/usr/bin/env node
// The Creative Lemon — MCP server entry.
// Speaks Model Context Protocol over stdio.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAll } from './tools.js';

const server = new McpServer({ name: 'creative-lemon', version: '1.0.0' });
registerAll(server);

const transport = new StdioServerTransport();
await server.connect(transport);

// Clean shutdown (opencode/claude may SIGTERM the server)
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    process.exit(0);
  });
}
