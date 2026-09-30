# Relatório de implementação do plano de melhorias

Data: 29/09/2026. Plano de referência: [PLANO-DE-MELHORIAS.md](PLANO-DE-MELHORIAS.md).

Todos os 17 itens foram implementados na ordem de etapas do plano (A → F). Nada foi publicado nem commitado; o resultado é código revisável no working tree. Este relatório separa o que foi verificado do que ficou pendente.

## Verificação final

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Passou, sem avisos |
| `npx tsc --noEmit --incremental false` | Passou |
| `npm test` (Vitest) | 10 arquivos, 73 testes aprovados (baseline: 6 arquivos, 23 testes) |
| `npm run build` | Passou; as fontes do Google baixaram normalmente neste ambiente |
| `npm run test:e2e` | 188 aprovados (Chromium desktop, Chromium mobile/Pixel 7, WebKit smoke e offline). 17 falhas, todas do projeto Firefox, que não inicia neste ambiente (ver limitações). 40 ignorados: o gerador de capturas, que só roda com `EVIDENCE=1` |

Uma execução feita com a máquina sobrecarregada (load average ~16 e um servidor Next órfão de uma execução anterior) teve 5 timeouts em testes axe; repetidos com a máquina livre, passaram. Por isso o Playwright agora nunca reaproveita um servidor já aberto na porta.

Os testes de navegador rodam contra o build de produção servido pelo servidor standalone (`npm run start:standalone`), o mesmo modo do Docker.

### Limitações do ambiente

- **Firefox**: o navegador do Playwright (build 1543) não inicia neste macOS (Darwin 27): "Could not find profile folder", antes de qualquer teste. Reinstalar e rodar fora do sandbox não resolveu. Os 17 testes `@smoke` do projeto `firefox-smoke` estão prontos, mas não foram executados aqui.
- **Leitor de tela**: VoiceOver/NVDA **não** foram usados. A semântica foi verificada por papel/nome acessível no Playwright e por axe-core; isso não substitui o teste manual.
- **Manual não executado**: teclado virtual em aparelho real, visualização do PDF em aparelho, compartilhamento real no app do WhatsApp (a URL foi validada, a escolha de destinatário no app não).

## Desempenho

Medição com Playwright (Chromium headless) comparando o build do commit original (`68f51a3`, "antes") com o build final ("depois"), ambos no servidor standalone local. Condições: cache limpo a cada execução, service worker bloqueado, Google Analytics/Unsplash/Instagram bloqueados, rede emulada (150 ms de latência, ~10 Mbit/s), CPU 4× mais lenta no perfil mobile (Pixel 7), 1440×900 no desktop, movimento **não** reduzido. Mediana de 5 execuções. "h1 visível" = primeiro instante (amostragem de 50 ms) em que o centro do h1 não está coberto por outro elemento. JS e total = bytes transferidos.

| Perfil | Página | Versão | LCP (ms) | h1 visível (ms) | CLS | JS (KB) | Total (KB) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | Home | antes | 496 | 3701 | 0,005 | 218 | 396 |
| Mobile | Home | depois | 1056 | 455 | 0 | 218 | 453 |
| Mobile | Artigo | antes | 480 | 3630 | 0,005 | 220 | 342 |
| Mobile | Artigo | depois | 448 | 426 | 0 | 217 | 338 |
| Desktop | Home | antes | 452 | 3672 | 0,013 | 252 | 440 |
| Desktop | Home | depois | 976 | 417 | 0 | 225 | 425 |
| Desktop | Artigo | antes | 468 | 3601 | 0,004 | 253 | 399 |
| Desktop | Artigo | depois | 420 | 405 | 0 | 228 | 381 |

Leitura:

- O conteúdo deixa de esperar a intro: o h1 fica visível em ~0,4 s em vez de ~3,6 s, em todas as rotas (antes a intro cobria qualquer rota, inclusive artigos).
- CLS caiu a zero nas amostras. JS transferido caiu ~25 KB no desktop e ficou igual no mobile. A home transfere mais bytes no mobile por causa das duas miniaturas dos projetos.
- **O LCP da home piorou** (~0,5 s → ~1 s). No "antes" o LCP era registrado enquanto a intro cobria a página, então não é comparável com a experiência real. Numa captura sob as mesmas condições, texto e foto do hero já estão pintados cerca de 0,55 s após o início da resposta, mas o navegador registra a entrada de LCP da foto perto de 1 s. Remover a animação de entrada do hero não mudou o número. A causa não foi identificada e fica como pendência de investigação.
- Não foram feitas medições de Lighthouse nem de campo; os números acima valem só para estas condições.

## Itens

### 01 — Títulos animados acessíveis

- `SplitText` virou componente de servidor com animação só em CSS. O elemento semântico (`as`) é preservado; o texto completo aparece uma vez em `sr-only` e os caracteres animados ficam em `aria-hidden`. Palavras são blocos `inline-flex`, sem `overflow-hidden`: quebram entre palavras e não somem em 320 px. Sem JS a animação CSS termina visível; com movimento reduzido não anima.
- Arquivos: `src/components/fx/SplitText.tsx`, `src/app/globals.css`.
- Testes: `a11y.spec.ts` (h1 com nome completo em 10 rotas), `motion.spec.ts` (sem JS), `responsive.spec.ts` (h1 inteiro em 320 px).

### 02 — Menu mobile e terminal

- Novo `ModalDialog` sobre `<dialog>` nativo com `showModal()`, usado pelos dois: título, botão fechar visível, foco inicial (fechar no menu; input no terminal), Tab/Shift+Tab presos, Esc/backdrop real/botão fecham, rolagem travada e restaurada, foco devolvido ao acionador quando o usuário fecha.
- Menu: fecha ao navegar (inclusive voltar/avançar) e ao atingir 1024 px. Terminal: histórico e saída preservados entre aberturas, atalho exibido como ⌘K ou Ctrl+K conforme a plataforma, não abre sobre o menu, altura em `dvh` com log rolável e `min-w-0` no input, botão flutuante respeita safe areas.
- Arquivos: `ModalDialog.tsx` (novo), `LayoutWrapper.tsx`, `CommandPalette.tsx`, `TerminalPane.tsx`, `globals.css`.
- Testes: `menu.spec.ts`, `terminal.spec.ts` (foco, Esc, backdrop, resize, histórico, `theme`, `cd`, `cv`, 375×667 e paisagem 667×375).
- Desvio: o pulso infinito do botão do terminal foi removido em vez de só desligado com movimento reduzido.

### 03 — Diferenciais por teclado e toque

- A partir de 1024 px: abas APG completas com botões nativos, setas/Home/End, `tablist`/`tab`/`tabpanel` com `aria-controls`/`aria-labelledby`; hover só visual. Abaixo de 1024 px: os quatro diferenciais em cards empilhados, sem imagens. A versão oculta usa `display:none` (fora da árvore de acessibilidade e sem carregar as imagens lazy). Imagens decorativas (`alt=""`).
- Desvio justificado: o plano citava "telas amplas"; o corte ficou em 1024 px (não 768) porque as abas não cabiam sem rolagem lateral entre 768 e 1023 px.
- Arquivos: `interactive-image-accordion.tsx`, `DifferentialsSection.tsx`. Testes: `differentials.spec.ts`.

### 04 — Contraste

- Tokens separados por tema e por função (`--on-accent` para texto sobre acento preenchido, `--success` novo), cores fixas trocadas por tokens (`CaseStudyBlock`, botões, `ArrowCta`), syntax highlighting revisado. Tabela antes/depois em [design-system.md](design-system.md#contraste).
- Estado ativo da navegação agora tem borda além da cor.
- Testes: `contrast.test.ts` (lê os tokens reais; 4,5:1 em todas as superfícies, nos dois temas, inclusive highlighting); axe (`color-contrast`) em 10 rotas × 2 temas sem violações.

### 05 — Tema único e classes/tokens

- `@custom-variant dark` segue `.dark`; highlighting usa `.dark` em vez de `prefers-color-scheme`. `bg-surface` (inexistente) migrado para `surface-1`; `font-inter`, `animate-in`, `fade-in`, `slide-in-*` e `fill-mode-*` (sem efeito no CSS compilado) removidos. Raios/easing autorreferentes no `@theme` viraram valores literais. Hovers `#111111`/`hover:bg-black` trocados por tokens/opacidade.
- `ThemeToggle` e comando `theme` usam `resolvedTheme`; o botão se chama "Ativar tema escuro/claro" e tem 44×44 px.
- Testes: `theme.spec.ts` (sistema escuro + site claro e vice-versa, persistência, código, hover, sem aviso de hidratação).

### 06 — Sem intro bloqueadora; movimento padronizado

- `IntroLoader` removido. Intro decorativa de ~550 ms no logo, só na primeira visita à home na sessão, marcada por script no `<head>` (não captura foco nem cliques; falha de storage ignorada).
- Conteúdo visível no HTML inicial e sem JS: `ScrollReveal` só oculta, depois de montar, o que ainda está abaixo da dobra; `/links`, 404 e grid de projetos trocaram Framer Motion por CSS. `MotionConfig reducedMotion="user"`; magnetismo, parallax, partículas e animações CSS respeitam movimento reduzido. Partículas pausam fora da viewport e com a aba oculta, sem loops duplicados.
- A animação de entrada do hero foi removida depois da medição (ela atrasava o LCP da home).
- Testes: `motion.spec.ts` (sem tela bloqueadora em home/blog/case/`/links`, intro uma vez por sessão, storage indisponível, nenhuma animação CSS ativa com movimento reduzido, 5 rotas sem JS).

### 07 — Compartilhar no WhatsApp

- `whatsappShareUrl()` gera `https://wa.me/?text=` sem destinatário, com título, autoria e URL canônica codificados uma vez. Contato continua em `SOCIALS.personal.whatsapp`.
- Arquivos: `src/lib/share.ts` (novo), `src/app/blog/[slug]/page.tsx`. Testes: `share.test.ts` (acentos, `&`, `#`, quebra de linha), `share.spec.ts`.

### 08 — Landmarks, IDs e nomes de links

- `<main>` aninhado removido do template de case e de `/links`; um `<main id="main-content" tabIndex={-1}>` por página. Seções extras: âncora na `<section>` e `<id>-heading` no heading; sem `id`, ID determinístico `<projeto>-secao-<n>`. Links repetidos com complemento `sr-only` ("Ver projeto Radar Unificando"). `scroll-padding-top` para o cabeçalho fixo.
- Testes: `a11y.spec.ts` (um main, zero IDs duplicados e zero referências ARIA quebradas em 10 rotas; skip link; âncora de seção), `projects.test.ts` (IDs únicos em todos os cases).

### 09 — Ações do hero e Contato na navegação

- Hero: "Ver projetos" (primário, `/projetos`) e "Vamos conversar" (`/contato`, mesma aba); LinkedIn/GitHub abaixo, com nome, cargo e foto preservados. "Contato" em `NAV_ROUTES` e ícone em `NAV_ICONS` (tipado para não faltar ícone). Navegação desktop a partir de 1024 px; gaveta abaixo disso. Logo com nome "Renato Bezerra — página inicial".
- Testes: `home.spec.ts`, `menu.spec.ts` (Contato ativo e sem sobreposição em 1024/1180/1440 px).

### 10 — Três projetos na home

- `FeaturedProjectsSection` logo após o hero, resolvida por `FEATURED_PROJECT_IDS` (Radar, Med, Seu Barraco Esperto) sem duplicar dados. Card com área, resumo, áreas funcionais e "Ver case"; "Ver todos os projetos".
- Imagens: capturas reais das páginas públicas `radar.unificando.com.br` e `med.unificando.com.br` (1280×640, sem login, sem dados pessoais, recortadas acima do aviso de cookies do Radar), com origem registrada em `thumbnail.source`. Seu Barraco Esperto não tem página de produto: usa fallback editorial (nome e cor), sem imagem simulada.
- Testes: `home.spec.ts` (ordem, três links corretos, imagens carregadas), `projects.test.ts` (arquivos existem, `alt` e origem preenchidos).

### 11 — Responsividade e legibilidade

- Hero com escala fluida que cabe em 320 px, margens menores no mobile, foto abaixo do conteúdo com proporção 4:5 reservada. Transbordamentos corrigidos na origem (títulos mono e endpoints nos cards de ferramentas, botões `nowrap` do case, CTAs de contato, código inline) — o `overflow-x-hidden` da home foi removido. Rodapé com espaço para o botão do terminal. Alvos principais de 44 px.
- Testes: `responsive.spec.ts` (8 rotas × 320/375/768/1024/1440 px sem rolagem lateral e h1 inteiro; reflow com zoom de 200%; alvos de toque; botão do terminal não cobre conteúdo).
- Evidências: `docs/evidencias/` — home, catálogo, case, artigo e contato em 375 e 1440 px, temas claro e escuro (20 capturas de página inteira, Chromium, movimento reduzido, terceiros bloqueados).

### 12 — Filtros e cases

- Modelo: `areas` obrigatório (`ia`, `automacao`, `frontend`), `thumbnail` opcional e `role` opcional no detalhe. Áreas preenchidas a partir do conteúdo de cada case.
- Filtros: botões com `aria-pressed`, contagem em `role="status"`, estado vazio com "Limpar filtro", `?area=` na URL com `router.push` (reload e voltar/avançar funcionam), valor inválido = Todos, outros parâmetros preservados, grupos vazios ocultos, foco não se move. A página segue estática: o fallback do `Suspense` é o catálogo completo. O client recebe só DTOs.
- Cases: ordem contexto → participação → desafio → solução → resultado. "Participação" preenchida apenas nos 8 produtos autorais do Unificando, com texto sustentado pela página `/unificando`.
- Testes: `projects.test.ts` (áreas, filtros, `?area=toString` tratado como inválido — bug achado pelo teste —, DTO serializável, fronteira client), `projects.spec.ts` (URL, reload, histórico, 404, redirect legado, ordem do case).

### 13 — Blog

- Busca local (título, descrição, tags; sem acentos; todos os termos), label visível, limpar, contagem, estado vazio, Enter sem recarregar, `?q=` com atraso de 250 ms via `replace`. Client recebe só metadados.
- Sumário a partir da árvore Markdown (remark), com IDs compartilhados com a renderização; duplicados viram `sql`, `sql-1`...; `<details>` nativo no mobile.
- Copiar código por bloco, com sucesso só após a Clipboard API confirmar e seleção manual em falha; `<pre>` focável para rolagem por teclado.
- Relacionados por tags normalizadas, ou "Outros artigos". Datas formatadas em UTC (corrige dia anterior no fuso de Brasília) com `dateTime`.
- Dependências: `unified`, `remark-parse`, `mdast-util-to-string`, `unist-util-visit` (já estavam no lockfile como dependências do react-markdown; agora declaradas) e `@types/mdast`.
- Testes: `blog-features.test.ts`, `blog.spec.ts` (acentos, vazio, URL sem entrada por letra, voltar, heading duplicado `#sql-2`, `#` em bloco de código, cópia real e falha, relacionados).

### 14 — Offline

- `sw.js` reescrito com a política do plano; `offline.html` honesto, acessível, sem dependências externas, com tema escuro. Registro só em produção e agora também quando `load` já passou (antes o registro podia nunca acontecer).
- Testes (`offline.spec.ts`, projeto `offline`, em série): instalação, remoção de `portfolio-v1` preservando cache alheio, nada de HTML/RSC/`_next`/terceiros em cache, fallback offline, script e imagem não cacheados dão erro de rede (não HTML), PDF do cache, 404 preservado, reconexão, troca v2 → v3 com aba aberta sem reload. Estável em 5 execuções seguidas.
- Observação: o worker novo nem sempre ativa enquanto a aba antiga está aberta (às vezes fica em espera até ela ficar ociosa ou fechar). Como ele só serve o fallback e dois arquivos, isso não afeta o usuário; o teste valida esse contrato.

### 15 — SEO e indicadores

- FAQPage removido da home, com o helper e o teste específicos. Metas arbitrárias `X-Robots-Tag` e `X-Default-Language` removidas. Sitemap sem `new Date()`: `lastModified` só nos artigos.
- "131 downloads/semana" removido do card do `@unificando/refina` e do case: sem data de medição registrada (o número entrou num commit de 02/09/2026, mas isso não é a data da medição).
- Metadados de `/projetos` citavam "LegalTech com API do CNJ", que não é um case do catálogo: trocado. "+7 anos" fixo virou `getYearsOfExperience()` em layout, home, currículo e resumo do perfil. `llms.txt` ganhou o case Fábia Souza, que faltava.
- GitHub: a seção diz sobre quantos repositórios estrelas e linguagens foram calculadas e que a linguagem é a principal de cada repositório; falha aparece como indisponibilidade, com link para o perfil. Timeout agora é sempre limpo e respostas inválidas viram indisponibilidade.
- Testes: `seo.spec.ts`, `github.test.ts`, `blog-features.test.ts` (datas).

### 16 — Testes e evidências

- Playwright 1.63 + `@axe-core/playwright` 4.13 em `devDependencies`; `playwright.config.ts`, `tests/e2e/*` (14 arquivos) e scripts `test:e2e`, `test:e2e:ui`, `start:standalone`. Vitest continua só com `src/**/*.test.ts`.
- Todos os fluxos obrigatórios da tabela do plano têm teste, exceto o que está listado em "Limitações do ambiente".

### 17 — Documentação

- README reescrito; `docs/ARCHITECTURE.md` reescrito para o estado real (remove GSAP, Lenis, cmdk e snap scroll; explica `standalone` × `export`, ISR e GitHub); `docs/design-system.md` com tokens, contraste e padrões; este relatório.

## Pendências editoriais

- **Capturas reais**: Seu Barraco Esperto está com fallback editorial; se houver uma imagem própria do projeto, adicione em `thumbnail`.
- **Downloads do `@unificando/refina`**: se quiser voltar a exibir o número, informe valor, fonte (npm) e período/data da medição.
- **Participação nos freelas** (Maria Clara Santos, Fábia Souza, 18IA, Diego Sheik, Ariano Suassuna, Seu Barraco Esperto): função, período e status não estão no repositório; o campo ficou omitido.
- **Resultados dos cases**: os blocos "Resultado" existentes não distinguem explicitamente resultado observado de benefício esperado; revisar o texto exige conhecimento do proprietário.
- **`llms.txt`** ainda diz "+7 anos" em texto fixo (é um arquivo estático); atualizar quando o número mudar.
- **LCP da home** registrado ~0,5 s mais tarde que no baseline (ver "Desempenho"); investigar com o painel Performance do DevTools.
- **Área de alguns projetos**: PDF Unificando foi classificado como Front-end (o case destaca interface e desempenho no navegador); confirme se prefere outra área.
