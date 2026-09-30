# Portfólio — Renato Bezerra

Portfólio pessoal de Renato Bezerra, Engenheiro de Software: home, catálogo de projetos com estudos de caso, blog técnico em Markdown, currículo, certificações, contato e a página "link na bio" (`/links`).

Publicado em <https://renatobezerra.com.br>.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Estilos | Tailwind CSS 4 (configuração CSS-first em `src/app/globals.css`) |
| Tema | next-themes (classe `.dark` no `<html>`) |
| Animações | Framer Motion 12 (poucos pontos) e animações CSS |
| Conteúdo | Markdown com frontmatter (gray-matter, react-markdown, remark-gfm, rehype-highlight) |
| Testes | Vitest (lógica) e Playwright + axe-core (navegador) |
| Deploy | Docker com `output: "standalone"` (node:22-alpine) |

## Requisitos

- Node.js 22 (mesma versão da imagem Docker; o projeto também foi validado com Node 24)
- npm (o lockfile é `package-lock.json`)

## Instalação e desenvolvimento

```bash
npm ci
npm run dev          # http://localhost:3000
```

Em desenvolvimento o service worker **não** é registrado.

## Build e execução local de produção

```bash
npm run build
npm run start:standalone   # copia public/ e .next/static para o build standalone e sobe em PORT (padrão 3000)
```

`output: "standalone"` gera um servidor Node mínimo em `.next/standalone/server.js` com só as dependências necessárias. Ele **não** é exportação estática (`output: "export"`): continua sendo um servidor Next, que serve as páginas pré-renderizadas e faz a revalidação da home (ISR de 1 hora, por causa dos números do GitHub). `next start` não é o comando certo para esse modo.

## Docker

```bash
docker compose up --build   # expõe 127.0.0.1:3100
```

O `Dockerfile` faz o build em estágios e roda `node server.js` como usuário sem privilégios na porta 3100. O `docker-compose.yml` sobe o container somente leitura, com `/tmp` e `.next/cache` em tmpfs.

## Testes

```bash
npm run lint
npx tsc --noEmit --incremental false
npm test             # Vitest: lógica pura, dados, contraste dos tokens
npm run test:e2e     # Playwright: gera o build e roda contra o servidor standalone
```

- `npm run test:e2e` usa a porta `E2E_PORT` (padrão 3210). Com `E2E_SKIP_BUILD=1` reaproveita um build existente.
- Na primeira vez instale os navegadores: `npx playwright install chromium firefox webkit`.
- Projetos do Playwright: `chromium-desktop` e `chromium-mobile` (suíte completa), `firefox-smoke` e `webkit-smoke` (testes `@smoke`), `offline` (service worker, testes `@offline`, em série).
- Hosts de terceiros (Google Analytics, Instagram, Unsplash) são bloqueados nos testes de UI.
- Capturas para revisão visual: `EVIDENCE=1 E2E_SKIP_BUILD=1 npx playwright test tests/e2e/evidence.spec.ts --project=chromium-desktop` (grava em `docs/evidencias/`).

Não há CI configurado neste repositório; os comandos acima são rodados manualmente.

## Serviços externos e variáveis

| Item | Uso | Se falhar |
| --- | --- | --- |
| Google Fonts (Inter, Space Grotesk) via `next/font` | Baixadas no **build** | O build falha; tente de novo com rede |
| API pública do GitHub | Números da seção "Código Aberto" na home (revalida a cada hora, timeout de 8 s) | A seção mostra "temporariamente indisponíveis" e mantém o link para o perfil |
| Google Analytics (`G-2WSFGQCP27`) | Script carregado após a hidratação da página (`afterInteractive`) | Nada no site depende dele |
| Embeds do Instagram | Galeria do case Seu Barraco Esperto | O restante do case continua legível |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Opcional: meta de verificação do Search Console | Sem a variável, a meta não é emitida |

Nenhuma variável é obrigatória e não há segredos no projeto.

## Conteúdo

- **Novo artigo:** crie `src/content/blog/<slug>.md` com `title`, `description`, `date` (formato `"AAAA-MM-DD"`, entre aspas), `tags` e, opcionalmente, `readingTime`. Use `##`/`###` para seções: com 3 ou mais, o sumário aparece sozinho. Artigos relacionados são escolhidos pelas tags em comum.
- **Novo projeto:** veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#adicionar-conteúdo).

## Documentação

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): rotas, fronteiras server/client, dados, tema, movimento, acessibilidade, offline e checklist de publicação.
- [docs/design-system.md](docs/design-system.md): tokens, contraste, componentes e padrões de interação.
- [docs/RELATORIO-DE-IMPLEMENTACAO.md](docs/RELATORIO-DE-IMPLEMENTACAO.md): o que foi feito em cada item do plano de melhorias, com testes e pendências.
