# Regras de desenvolvimento assistido por IA

## Objetivo do projeto

Museu digital educativo sobre a história do Egito, publicado como site estático no GitHub Pages. Escreva em português do Brasil, preserve o endereço público, as rotas `.html`, as âncoras dos QR Codes, os créditos das imagens e a acessibilidade existente.

## Arquitetura

- React + TypeScript + Vite. A hospedagem não tem servidor: toda funcionalidade deve funcionar no navegador.
- Cada página pública tem uma entrada HTML própria (`index.html`, `nilo.html`, `monumentos.html`, `escrita.html`, `linha-do-tempo.html`, `egito-hoje.html`). Não converta o projeto em SPA com rotas que exijam fallback do servidor. Pré-renderize cada página no build e hidrate no navegador para manter conteúdo disponível antes do JavaScript.
- `src/main.tsx` hidrata a página; `src/render.tsx` associa páginas e classes do corpo; `src/pages.tsx` compõe o conteúdo; `src/components.tsx` contém componentes compartilhados e interativos; `src/data.ts` guarda conteúdo estruturado e tipado; `src/Sources.tsx` organiza referências; `scripts/prerender.mjs` gera HTML estático; `styles.css` define o sistema visual; `public/assets/` guarda imagens, favicon e QR Codes.
- Extraia componentes quando uma estrutura ou comportamento for repetido, tiver identidade semântica própria ou merecer teste isolado. Use componentes de apresentação pequenos e nomes ligados ao domínio (`PageHero`, `FactGrid`, `ObjectCard`, `PageNext`). Evite componentes genéricos com dezenas de propriedades condicionais.
- Mantenha dados editoriais repetidos em estruturas tipadas. Prefira renderização declarativa com React e chaves estáveis; não duplique navegação, tema, cards, rodapé ou padrões de página.
- Não use `dangerouslySetInnerHTML`, `innerHTML`, seletores globais para controlar a interface React, `any` ou casts para contornar tipos. Use estado, props, refs e efeitos com limpeza explícita.
- Mantenha a camada visual em CSS existente. Use variáveis e classes atuais antes de criar outro sistema de estilos ou adicionar biblioteca de UI.

## Compatibilidade e conteúdo

- Preserve nomes de arquivos públicos, caminhos, IDs de seção usados por QR Codes, links entre páginas, tema escuro persistente e imagens/legendas/créditos.
- Deixe as imagens locais em `public/assets/` e use caminhos absolutos como `/assets/nile-boat.jpg`, pois o site é publicado na raiz do domínio da organização.
- Ao adicionar dependências, prefira poucas dependências, versões reproduzíveis no lockfile e justifique qualquer biblioteca de runtime nova.
- Não invente fatos históricos. Use datas aproximadas quando necessário e mantenha ressalvas e fontes junto ao conteúdo relacionado.

## Padrões de interface

- Use HTML semântico, hierarquia de títulos correta, labels para controles, texto alternativo útil, foco visível, estados `aria-*` coerentes e suporte à navegação por teclado.
- Novas interfaces precisam funcionar em telas estreitas, com zoom, alto contraste do tema escuro e `prefers-reduced-motion` quando houver movimento.
- Diálogos devem manter foco dentro do contexto nativo, fechar por controles acessíveis e devolver foco ao acionador. Controles de filtro devem informar o estado selecionado.
- Nunca comunicar significado apenas por cor ou ícone sem rótulo acessível.

## Testes e validação

- Todo novo comportamento ou correção deve ter testes Vitest/Testing Library cobrindo o caminho principal e estados importantes, inclusive quando não há dados ou a ação é repetida.
- Antes de concluir mudanças de código, execute `npm run typecheck`, `npm run lint`, `npm test` e `npm run build`.
- Para mudanças visuais, verifique a homepage e as páginas afetadas em desktop e mobile, nos temas claro e escuro. Confira cada entrada `.html`, fragmentos, assets, navegação e console sem erros.
- Não altere ou remova conteúdo, imagens, rotas, IDs ou testes para silenciar uma falha. Investigue a causa e atualize o teste somente quando o comportamento esperado realmente mudou.

## Publicação e colaboração

- O workflow em `.github/workflows/pages.yml` publica o diretório `dist/` no GitHub Pages. Não volte a servir os fontes TypeScript como raiz publicada.
- Mantenha a pré-renderização do build: use componentes seguros para renderização no servidor e evite acessar `window`/`document` durante o render. Interações de tema e viewport devem iniciar em efeitos do cliente.
- Inclua alterações de dependência com `package-lock.json`. Nunca edite artefatos gerados em `dist/` manualmente.
- Faça commits pequenos e com mensagens descritivas; mantenha `main` alinhada ao remoto após concluir uma alteração solicitada.
- Agentes auxiliares devem informar caminhos, evidências e riscos. Coordenem arquivos antes de editar para não sobrescrever trabalho em paralelo.
