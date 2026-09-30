# Arquitetura

Portfólio de Renato Bezerra em Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, next-themes e Framer Motion. Este documento descreve o estado atual do código; o README cobre instalação, comandos e deploy.

## Rotas

| Rota | Arquivo | Geração | Conteúdo |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | Estática com revalidação de 1 h | Hero → Projetos selecionados → Sobre → Diferenciais → Ferramentas → GitHub → Artigos → Contato |
| `/projetos` | `src/app/projetos/page.tsx` | Estática | Catálogo com filtro por área (`?area=ia\|automacao\|frontend`) |
| `/projetos/[...slug]` | `src/app/projetos/[...slug]/page.tsx` | SSG (`generateStaticParams`, `dynamicParams = false`) | Estudo de caso (ex.: `/projetos/unificando/radar`) |
| `/projetos/unificando` | `next.config.ts` | Redirect 308 | → `/projetos/unificando/automacao` |
| `/unificando` | `src/app/unificando/page.tsx` | Estática | Laboratório de produtos |
| `/blog` | `src/app/blog/page.tsx` | Estática | Listagem com busca local (`?q=`) |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | SSG, `dynamicParams = false` | Artigo com sumário, cópia de código, compartilhamento e relacionados |
| `/curriculo`, `/certificacoes`, `/contato` | `src/app/*/page.tsx` | Estáticas | |
| `/links` | `src/app/links/page.tsx` | Estática, `noindex` | "Link na bio", sem cabeçalho/rodapé globais |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | `src/app/*.ts` | Estáticas | |

Rotas desconhecidas de projetos e artigos retornam 404.

**Build e servidor.** `output: "standalone"` empacota um servidor Node (`.next/standalone/server.js`); não é exportação estática. Ele serve as páginas pré-renderizadas e revalida a home a cada hora (ISR), que é o único ponto com dado buscado em tempo de execução: a API pública do GitHub (`src/lib/github.ts`). O Docker copia `public/` e `.next/static` para junto do servidor; `npm run start:standalone` faz o mesmo localmente.

## Fronteiras server/client

- Páginas, `ProjectTemplate`, `FeaturedProjectsSection`, `ProjectGrid`, `BlogCard`, `SplitText`, `ArticlesSection`, `GitHubSection` e `ToolsSection` são componentes de servidor.
- `src/lib/blog.ts` usa `fs` e só roda no servidor. Componentes client recebem `BlogPostSummary` (metadados, **sem** o Markdown).
- `PROJECT_CASES` (`src/lib/project-cases.ts`) contém JSX e ícones e só é importado no servidor. O catálogo client (`ProjectsClient`) recebe `Project[]`, o DTO serializável do card (`src/lib/projects.ts`). Um teste unitário impede que componentes client importem os cases completos.
- Módulos puros e seguros para o client: `project-areas.ts` (taxonomia e filtro), `search.ts` (normalização e busca), `dates.ts`, `share.ts`.
- Componentes client: `LayoutWrapper` (cabeçalho e menu), `ModalDialog`, `CommandPalette`/`TerminalPane` (carregados sob demanda, sem SSR), `ThemeToggle`, `ProjectsClient`, `BlogIndex`, `CodeBlock`, `DifferentialsSection`, `ScrollReveal`, `ParticleField`, `MagneticButton`, `ParallaxSection`.
- Filtros e busca leem a URL com `useSearchParams` dentro de `Suspense`; o fallback do Suspense é o catálogo/listagem completo, então o HTML estático (e a página sem JS) mostra todo o conteúdo e as páginas continuam estáticas.

## Dados

| Arquivo | Conteúdo |
| --- | --- |
| `src/lib/constants.ts` | Perfil, redes, `getYearsOfExperience()` (use em textos em vez de "+7 anos" fixo) |
| `src/lib/experience.ts`, `education.ts` | Currículo |
| `src/lib/project-cases.ts` | Registro único dos cases; gera as rotas, o catálogo, o sitemap e os destaques |
| `src/lib/projects/*.tsx` | Um arquivo por case |
| `src/lib/projects.ts` | `PROJECTS` (DTOs) e `FEATURED_PROJECT_IDS` (destaques da home, em ordem) |
| `src/lib/project-areas.ts` | Áreas: `ia` (IA), `automacao` (Automação), `frontend` (Front-end) |
| `src/content/blog/*.md` | Artigos |

### Modelo do card (`ProjectCard`)

`id`, `title`, `category`, `description`, `accent` (cor), `techs` (stack), `areas` (área funcional, uma ou mais, obrigatória), `group` (`unificando` ou independente) e `thumbnail` opcional (`src`, `width`, `height`, `alt`, `source` com a origem da captura). Área, stack, cor e grupo são independentes.

### Case (`ProjectDetails`)

A página segue contexto (`overviewContent`) → participação (`role`) → desafio/solução/resultado (`caseStudy`) → funcionalidades → seções extras → stack. `role` só é preenchido com informação explícita (hoje: produtos autorais do Unificando, `UNIFICANDO_AUTHORIAL_ROLE`); sem dado verificado, o campo é omitido. Não invente função, período, status ou métricas.

## Adicionar conteúdo

**Projeto**

1. Crie `src/lib/projects/<id>.tsx` exportando um `ProjectCase` (use `card()`, `breadcrumbs()` e, se aplicável, `projectPath()` de `helpers.ts`).
2. Em `card(...)`, informe `areas` com base no conteúdo do case; `group: "unificando"` quando fizer parte do laboratório.
3. `pathSegments` define a URL (`["unificando", "radar"]` → `/projetos/unificando/radar`); sem ele, usa o `id`.
4. Seções extras: dê um `id` estável (vira âncora pública); o heading recebe `<id>-heading`. Sem `id`, o template gera `<projeto>-secao-<n>`.
5. Registre em `PROJECT_CASES`. Rotas, catálogo, sitemap e filtros se atualizam sozinhos. Atualize `public/llms.txt`.
6. Thumbnail: só captura real (página pública do produto, sem login e sem dados pessoais), em `public/projetos/`, com `alt` e `source`. Nunca imagem gerada simulando interface.
7. Para destacar na home, adicione o `id` em `FEATURED_PROJECT_IDS`.

**Artigo:** arquivo em `src/content/blog/` com frontmatter `title`, `description`, `date: "AAAA-MM-DD"` (entre aspas, para não virar objeto Date), `tags`. Headings `##`/`###` alimentam o sumário (a partir de 3). A data é formatada em UTC para não mudar de dia com o fuso.

## Blog

- **Busca** (`BlogIndex`): local, em título, descrição e tags, sem acentos e sem diferenciar maiúsculas; todos os termos precisam aparecer. O termo vai para `?q=` com atraso de 250 ms via `router.replace` (sem uma entrada no histórico por letra). Sem busca, mostra o destaque editorial; com busca, uma única lista.
- **Sumário**: `extractHeadings` analisa a árvore Markdown (remark), então `#` dentro de blocos de código não conta. O mesmo plugin `remarkHeadingIds` gera os IDs na renderização, garantindo que sumário e headings batam, inclusive com títulos duplicados (`sql`, `sql-1`, ...).
- **Copiar código** (`CodeBlock`): copia o `textContent` do `<code>`; só mostra "Copiado" depois que a Clipboard API confirma. Em falha, seleciona o código e explica como copiar.
- **Relacionados** (`getRelatedPosts`): pontua por tags em comum normalizadas, desempata por data e slug, até dois. Sem nenhuma tag em comum, mostra os mais recentes como "Outros artigos".
- **Compartilhar**: `wa.me/?text=` sem destinatário e LinkedIn (`src/lib/share.ts`). O contato pessoal continua em `SOCIALS.personal.whatsapp`.

## Tema

- next-themes aplica `.dark` no `<html>`; o padrão é claro, preferências salvas continuam valendo.
- `globals.css` declara `@custom-variant dark (&:where(.dark, .dark *))`, então `dark:` segue o tema do site, não o do sistema. O syntax highlighting também usa `.dark`.
- Tokens de cor em `src/styles/tokens.css` (`:root` e `.dark`), mapeados para classes em `@theme` (`bg-bg`, `bg-surface-1`, `text-text-secondary`, `text-tech`, `text-on-accent`...). Detalhes e contraste em [design-system.md](design-system.md).
- Toggle e comando `theme` do terminal usam `resolvedTheme`.

## Movimento

- Nenhuma tela de abertura bloqueia conteúdo. A única intro é decorativa: o logo do cabeçalho anima ~550 ms na primeira visita à home na sessão, marcada por um script no `<head>` (`html[data-intro]`); falha de `sessionStorage` é ignorada.
- Conteúdo é visível no HTML inicial e sem JavaScript. Animações de entrada usam CSS com `fill-mode: both` (`.fx-rise`, `.split-char`); `ScrollReveal` só oculta, depois de montar, elementos que ainda estão abaixo da dobra.
- `prefers-reduced-motion`: CSS desliga animações e revelações; `MotionConfig reducedMotion="user"` cobre o Framer Motion; `MagneticButton`, `ParallaxSection` e `ParticleField` checam a preferência. O canvas de partículas pausa fora da viewport e com a aba oculta.

## Acessibilidade

- Um `<main id="main-content" tabIndex={-1}>` por página, vindo do layout; skip link visível ao focar. `scroll-padding-top` evita âncoras escondidas atrás do cabeçalho fixo.
- `SplitText` expõe o título completo uma vez (`sr-only`) e esconde os caracteres animados.
- `ModalDialog` (menu mobile e terminal): `<dialog>` nativo com `showModal()`, título, botão fechar visível, foco inicial, Tab preso, Esc/backdrop/botão fecham, rolagem travada e foco devolvido ao acionador. O menu fecha ao navegar e ao passar para a largura desktop (1024 px). Ctrl/⌘+K não abre o terminal com outro modal aberto.
- Diferenciais: abas completas (setas, Home/End, `tablist`/`tab`/`tabpanel`) a partir de 1024 px; abaixo disso, cards empilhados. Hover não muda seleção.
- Filtros com `aria-pressed` e contagem em `role="status"`; o foco não se move ao filtrar.
- Links repetidos ("Ver projeto", "Ver case", "Conectar") têm complemento `sr-only` com o nome do item; links externos avisam "abre em nova aba".
- Alvos principais com pelo menos 44×44 px.

## Offline (service worker)

Contrato: sem rede, qualquer navegação recebe `/offline.html` (página própria, sem fontes ou scripts externos, com "Tentar novamente"). Foto e `Profile.pdf` já acessados ficam em cache. **Não** há navegação offline pelas páginas já visitadas, de propósito, para não misturar HTML/RSC de releases diferentes.

Política (`public/sw.js`):

- Registrado só em produção (`NODE_ENV === "production"`), inclusive se o evento `load` já tiver ocorrido.
- Intercepta apenas GET do mesmo origin: navegações (rede primeiro, fallback offline só em falha de rede; 404/500 legítimos passam) e a lista fixa `RenatoBezerra.avif`/`Profile.pdf` (rede primeiro, cache só com status 200 e tipo `basic`, sem Range).
- `/_next/*`, RSC, prefetch, APIs e terceiros nunca passam pelo worker.
- Caches: `renato-portfolio-offline-<versão>` e `renato-portfolio-assets-<versão>`. Na ativação remove versões antigas com esse prefixo e o legado `portfolio-v1`; caches de outros apps do mesmo origin ficam intactos.
- Atualização: incremente `VERSION` ao mudar `sw.js` ou `offline.html`. O worker novo usa `skipWaiting`/`clients.claim` e assume quando o anterior fica ocioso (no máximo ao fechar a aba antiga), sem recarregar a página.

Validar uma atualização: `npm run test:e2e -- --project=offline` (instalação, migração, fallback, erro real de recurso, 404, reconexão e troca de versão com aba aberta).

## SEO

- `buildMetadata()` (`src/lib/seo.ts`): título, descrição, canonical, Open Graph, Twitter, robots. `noIndex` em `/links`.
- JSON-LD: Person e WebSite na home; BreadcrumbList nas páginas; CreativeWork nos cases; Article nos posts; Organization/Service onde aplicável. Não há FAQPage (não existe FAQ visível).
- Sitemap: páginas, artigos (com `lastModified` = data do artigo) e cases; sem data inventada para o que não tem data editorial; `/links` fica de fora.
- `public/llms.txt` resume o site para agentes; mantenha-o em sincronia com o catálogo.

## Checklist de publicação

1. `npm run lint`, `npx tsc --noEmit --incremental false`, `npm test`
2. `npm run test:e2e` (com rede para baixar as fontes no build)
3. Se `sw.js` ou `offline.html` mudaram, `VERSION` foi incrementada
4. Novo case/artigo: `llms.txt` atualizado; thumbnails com origem registrada
5. `docker compose up --build` e conferência manual de home, um case e um artigo
