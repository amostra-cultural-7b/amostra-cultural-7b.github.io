import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Sources } from './Sources';
import { renderPage } from './render';
import type { PageKey } from './data';

const routes: Array<[PageKey, string]> = [
  ['home', 'Uma viagem'],
  ['nile', 'O rio que atravessa o deserto'],
  ['monuments', 'Monumentos feitos para durar'],
  ['writing', 'Palavras gravadas em pedra'],
  ['timeline', 'Uma história maior que as pirâmides'],
  ['modern', 'O Egito é mais do que seu passado antigo'],
];

describe('pré-renderização das rotas públicas', () => {
  it.each(routes)('%s entrega conteúdo sem depender da hidratação', (page, heading) => {
    const html = renderToStaticMarkup(renderPage(page, Sources));
    expect(html).toContain('<main id="conteudo">');
    expect(html).toContain(heading);
    expect(html).toContain('class="nav wrap"');
    expect(html).toContain('Pular para o conteúdo');
  });

  it('mantém os IDs históricos usados por links e QR Codes', () => {
    const timeline = renderToStaticMarkup(renderPage('timeline', Sources));
    for (const id of ['era-faraonica', 'era-ptolomaica', 'era-romana', 'era-medieval', 'era-moderna']) {
      expect(timeline).toContain(`id="${id}"`);
    }
    const nile = renderToStaticMarkup(renderPage('nile', Sources));
    expect(nile).toContain('id="mapa"');
    expect(nile).toContain('src="/assets/nile-map-illustration.jpg"');
    expect(nile).toContain('Mar Mediterrâneo');
    expect(nile).toContain('Mar Vermelho');
    expect(nile).toContain('Cairo');
    expect(nile).toContain('Luxor');
    expect(nile).toContain('Assuã');
    expect(nile).toContain('Ilustração criada com IA, esquemática e sem escala.');
    expect(renderToStaticMarkup(renderPage('monuments', Sources))).toContain('id="piramides"');
    expect(renderToStaticMarkup(renderPage('writing', Sources))).toContain('id="rosetta"');
    expect(renderToStaticMarkup(renderPage('home', Sources))).toContain('id="quiz"');
  });
});
