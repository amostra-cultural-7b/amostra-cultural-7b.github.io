import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';

const pages = [
  ['index.html', 'home'],
  ['nilo.html', 'nile'],
  ['monumentos.html', 'monuments'],
  ['escrita.html', 'writing'],
  ['linha-do-tempo.html', 'timeline'],
  ['egito-hoje.html', 'modern'],
];

const server = await createServer({
  configFile: resolve('vite.config.ts'),
  mode: 'production',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const [{ renderPage }, { Sources }] = await Promise.all([
    server.ssrLoadModule('/src/render.tsx'),
    server.ssrLoadModule('/src/Sources.tsx'),
  ]);
  for (const [filename, page] of pages) {
    const htmlPath = resolve('dist', filename);
    const html = await readFile(htmlPath, 'utf8');
    const marker = `<div id="root" data-page="${page}"></div>`;
    const prerendered = `<div id="root" data-page="${page}">${renderToString(renderPage(page, Sources))}</div>`;
    if (!html.includes(marker)) throw new Error(`Não foi encontrado o ponto de montagem em ${filename}.`);
    await writeFile(htmlPath, html.replace(marker, prerendered));
  }
} finally {
  await server.close();
}
