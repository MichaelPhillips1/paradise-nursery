import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';

// Bundle scripts, CSS, and original SVG images into one file that opens offline.
const result = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  write: false,
  outfile: 'app.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.svg': 'dataurl' },
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  legalComments: 'inline',
});

const javascript = result.outputFiles.find((file) => file.path.endsWith('.js')).text;
const css = result.outputFiles.find((file) => file.path.endsWith('.css')).text;
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#244b38"><title>Paradise Nursery</title><style>${css}</style></head><body><div id="root"></div><script>${javascript.replaceAll('</script', '<\\/script')}</script></body></html>`;
await writeFile('OPEN-PREVIEW.html', html);
console.log('Created OPEN-PREVIEW.html — open it directly in a browser.');
