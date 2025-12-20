#!/usr/bin/env node

// This allows npx to run the CLI
import('../dist/index.js').catch((err) => {
  console.error('Failed to load groovy-ui CLI:', err);
  process.exit(1);
});