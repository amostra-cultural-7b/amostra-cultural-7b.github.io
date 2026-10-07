# Museu digital — Uma viagem ao Egito Antigo

Site responsivo em português para a amostra cultural. Criado com React, TypeScript e Vite, publicado gratuitamente no GitHub Pages. As seis páginas são pré-renderizadas em HTML e hidratadas no navegador. Inclui galeria de divindades com modal, filtros de linha do tempo, conversor visual de nome, QR Codes e quiz.

## Site e repositório

- Site: [amostra-cultural-7b.github.io/index.html](https://amostra-cultural-7b.github.io/index.html)
- Repositório: [amostra-cultural-7b/amostra-cultural-7b.github.io](https://github.com/amostra-cultural-7b/amostra-cultural-7b.github.io)
- O GitHub Actions valida tipos, lint e testes, compila o site e publica o diretório `dist/` no Pages.

## Desenvolvimento

Requer Node.js 24 ou compatível com a versão registrada no lockfile.

```sh
npm ci
npm run dev
```

Antes de enviar mudanças, execute:

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Use `npm run preview` para conferir localmente a compilação final.

## Estrutura

- `index.html`, `nilo.html`, `monumentos.html`, `escrita.html`, `linha-do-tempo.html`, `egito-hoje.html` — entradas multipágina; os endereços preservam links externos e QR Codes.
- `src/main.tsx` — ponto de entrada React e seleção da página.
- `src/render.tsx` — mapa de páginas e classes de corpo compartilhadas entre renderização e hidratação.
- `src/pages.tsx` — conteúdo e composição das seis páginas.
- `src/components.tsx` — navegação, tema, cartões, galeria de divindades, cronologia, atividade e quiz.
- `src/data.ts` — dados tipados de navegação, divindades, cronologia, quiz e QR Codes.
- `src/Sources.tsx` — referências organizadas por página.
- `scripts/prerender.mjs` — pré-renderiza as rotas para manter conteúdo HTML disponível antes do JavaScript.
- `styles.css` — identidade visual, temas claro/escuro, responsividade e impressão.
- `public/assets/` — ilustrações, fotos, favicon e QR Codes prontos para impressão.
- `AGENTS.md` — padrões de arquitetura, conteúdo, acessibilidade, testes e colaboração assistida por IA.

## Rotas preservadas

- `/` e `/index.html` — página inicial.
- `/nilo.html`, `/monumentos.html`, `/escrita.html`, `/linha-do-tempo.html`, `/egito-hoje.html` — estações temáticas.
- Âncoras usadas pelos QR Codes: `#quiz`, `#piramides`, `#mapa` e `#rosetta`.

As imagens de acervo do The Metropolitan Museum of Art têm créditos individuais e licença Open Access/CC0. As ilustrações `egypt-hero.jpg` e `cairo-contemporary.jpg` foram criadas para o site e não representam fotografias documentais.
