# Plano de melhorias do portfólio — orientação para implementação

Data da análise: 29/09/2026.

Status: os 17 itens foram implementados em 29/09/2026. Resultado, testes e pendências em [RELATORIO-DE-IMPLEMENTACAO.md](RELATORIO-DE-IMPLEMENTACAO.md).

## 1. Objetivo e instrução para a próxima LLM

Melhorar acessibilidade, navegação, apresentação do trabalho, experiência mobile e confiabilidade técnica do portfólio de Renato Bezerra. Preservar a identidade visual existente: base neutra, tipografia marcante, fotografia pessoal, acentos azul/roxo/laranja e temas claro/escuro.

Ao receber este documento com a solicitação de implementação, executar os 17 itens na sequência sugerida. Não solicitar nova aprovação para cada item: o escopo foi aprovado. Resolver decisões rotineiras com os padrões deste documento e registrar desvios justificados. Pedir informação somente quando um fato ou recurso indispensável não puder ser obtido do repositório; continuar o trabalho independente dessa resposta.

Antes de editar, ler as instruções locais aplicáveis, verificar `git status` e reler os arquivos envolvidos. Os caminhos deste documento são relativos à raiz do repositório. O código pode ter evoluído desde a análise: confirmar os achados antes de alterá-los e preservar mudanças do usuário.

### Limites do escopo

- Manter Next.js App Router, TypeScript, Tailwind, Framer Motion e next-themes. Não fazer migração de framework ou atualização geral de dependências.
- Manter rotas públicas, slugs, links existentes, PDF do currículo e a página `/links` sem cabeçalho/rodapé globais.
- Preservar textos profissionais e dados pessoais, salvo ajustes de clareza sustentados pelo conteúdo existente.
- Não inventar números de usuários, receita, ganhos de desempenho, depoimentos, datas, responsabilidade profissional ou situação de operação dos produtos.
- Não criar backend, CMS, autenticação, chatbot, formulário com envio ou novos serviços pagos.
- Não expandir rastreamento/analytics nem publicar/deployar automaticamente. A entrega é código revisável, documentação e evidências de validação.
- Novas dependências precisam ter utilidade concreta. Preferir APIs nativas e a stack já instalada. Dependências de teste em `devDependencies` são esperadas no item 16.
- Não reescrever artigos nem transformar este trabalho em revisão geral de segurança, legislação ou conteúdo técnico dos produtos apresentados.

### O que foi efetivamente verificado

| Verificação | Resultado na análise |
| --- | --- |
| `npm run lint` | Passou |
| `npm test` | 6 arquivos, 23 testes aprovados |
| `npx tsc --noEmit --incremental false` | Passou |
| Compilação isolada do CSS com PostCSS/Tailwind | `bg-surface` ausente; variantes `dark:` geradas com preferência do sistema |
| Cálculo de contraste dos tokens | Combinações insuficientes identificadas, detalhadas no item 04 |
| `npm run build` | Falhou ao baixar Inter e Space Grotesk do Google Fonts por erro de conexão |
| Navegação visual, leitor de tela e auditoria no navegador | Não executados nesta análise |

A falha de download de fontes não comprova defeito no código. Também não significa que as demais etapas do build passaram. Reexecutar a validação de produção no ambiente de implementação. Não afirmar melhora de Lighthouse, LCP ou conversão sem medição.

## 2. Mapa do projeto e cuidados de arquitetura

| Área | Arquivos de referência |
| --- | --- |
| Layout global e scripts | `src/app/layout.tsx`, `src/components/layout/LayoutWrapper.tsx` |
| Navegação | `src/lib/navigation.ts`, `src/hooks/useActiveNavLink.ts` |
| Temas e estilos | `src/app/globals.css`, `src/styles/tokens.css`, `src/components/ui/ThemeProvider.tsx`, `ThemeToggle.tsx` |
| Home | `src/app/page.tsx`, `src/components/home/*` |
| Efeitos | `src/components/fx/*` |
| Terminal | `src/components/ui/CommandPalette.tsx`, `CommandPaletteLoader.tsx`, `TerminalPane.tsx` |
| Catálogo e cases | `src/lib/project-cases.ts`, `src/lib/projects.ts`, `src/lib/projects/*`, `src/types/project.ts` |
| Listagem e detalhe de projetos | `src/components/ui/ProjectsClient.tsx`, `ProjectGrid.tsx`, `src/components/layout/ProjectTemplate.tsx`, `src/app/projetos/[...slug]/page.tsx` |
| Blog | `src/lib/blog.ts`, `src/types/blog.ts`, `src/content/blog/*.md`, `src/app/blog/*`, `src/components/blog/BlogCard.tsx` |
| Dados profissionais | `src/lib/constants.ts`, `experience.ts`, `education.ts`, `public/Profile.pdf` |
| SEO | `src/lib/seo.ts`, `structured-data.ts`, `src/app/sitemap.ts`, `robots.ts`, `src/components/seo/JsonLd.tsx` |
| Offline | `public/sw.js`, `public/offline.html`, registro em `src/app/layout.tsx`, `src/app/manifest.ts` |
| Testes e deploy | `vitest.config.mts`, `src/lib/__tests__/*`, `package.json`, `Dockerfile`, `docker-compose.yml`, `next.config.ts` |

Stack declarada na análise: Next.js 16.1.6, React 19.2.3, Tailwind 4, Framer Motion 12, next-themes 0.4 e Vitest 4. Confirmar versões resolvidas no lockfile antes de adicionar dependências.

Regras de implementação:

- Manter conteúdo e leitura de Markdown no servidor; `src/lib/blog.ts` usa `fs` e não pode ser importado por componente client.
- `PROJECT_CASES` contém JSX, ícones e referências a componentes. Filtros client devem receber somente dados simples dos cards, projetados no servidor. Não enviar o objeto completo de case ao navegador nem ampliar o grafo de imports client com todos os detalhes dos projetos.
- Fazer busca e filtros locais: o catálogo atual tem 13 cases e o blog 10 arquivos Markdown. Recontar ao implementar; não codificar esses números como regra.
- Continuar usando o registro existente para gerar rotas. Não criar uma segunda lista de slugs divergente para home/filtros.
- Corrigir componentes compartilhados antes de compensar suas falhas em páginas individuais.
- Componentes sugeridos neste plano podem receber outro nome se a divisão de responsabilidades ficar equivalente.

## 3. Ordem de execução e dependências

| Etapa | Itens | Resultado esperado |
| --- | --- | --- |
| A — Preparação | Início do 16 | Baseline, ambiente de teste e inventário visual quando disponível |
| B — Fundação visual e acessibilidade | 05, 04, 01, 08, 02, 03, 06, 07 | Temas consistentes, conteúdo acessível e interações corrigidas |
| C — Conteúdo e apresentação | Modelagem do 12, 10, 09, restante do 12, 11 | Home orientada a projetos/contato e catálogo explorável |
| D — Blog e dados | 13, 15 | Busca, leitura e informações coerentes |
| E — Offline | 14 | Cache restrito e comportamento de atualização testado |
| F — Encerramento | Final do 16, 17 | Regressão completa, documentação e relatório de entrega |

Os testes de cada comportamento devem acompanhar sua implementação. A etapa F é a integração final, não o primeiro momento de testar. O item 11 exige conferir também as telas alteradas depois dele.

Dependências relevantes: 04 usa os estilos consolidados em 05; 10 e 12 compartilham dados dos cards; 09 precisa atualizar o mapa de ícones de navegação; 13 usa a política de âncoras do 08; 14 depende de ambiente de produção funcional; 17 deve descrever o resultado implementado.

## 4. Especificação dos 17 itens

### 01 — Tornar os títulos animados acessíveis

**Problema confirmado:** `SplitText.tsx` envolve todo o título em `aria-hidden="true"` sem alternativa textual. Isso deixa headings sem texto acessível em páginas consumidoras.

**Arquivos:** `src/components/fx/SplitText.tsx`; consumidores como `PageHeader.tsx`, `ProjectTemplate.tsx`, páginas de contato e currículo.

**Implementação:**

- Preservar o elemento semântico escolhido por `as` (`h1`, `h2`, `p`, `div`).
- Incluir uma única representação textual acessível dentro dele, por exemplo um `span.sr-only` com a string completa. Manter caracteres visuais animados ocultos para tecnologia assistiva.
- Não colocar `aria-hidden` no heading e não duplicar a leitura com múltiplas alternativas acessíveis.
- Sem movimento e sem JavaScript, o texto deve continuar visível; coordenar a renderização inicial com o item 06.
- Preservar palavras e quebras naturais em telas pequenas; a fragmentação em caracteres não deve obrigar uma palavra a transbordar ou sumir em `overflow-hidden`.

**Aceite:** headings encontrados por papel e nome completo; VoiceOver/NVDA lê o título uma vez; texto visível com movimento reduzido e sem JS; títulos longos não cortados a 320px.

### 02 — Completar acessibilidade do menu mobile e terminal

**Problema confirmado:** menu e terminal não implementam todo o ciclo de foco e `Escape`; o terminal não oferece botão visível de fechar. `aria-modal` no `aside` do menu não resolve essas interações.

**Arquivos:** `LayoutWrapper.tsx`, `CommandPalette.tsx`, `TerminalPane.tsx`; possível componente compartilhado de diálogo.

**Implementação:**

- Usar um mecanismo de diálogo consistente. Preferência inicial: `<dialog>` com `showModal()`, acessibilidade e ciclo de vida integrados ao React. Se usar biblioteca, justificar a escolha e reutilizar a mesma solução nas duas interfaces.
- Dar nome acessível ao menu e ao terminal. Ter botão de fechar visível, inclusive no mobile.
- Ao abrir o menu, mover foco para o botão de fechar ou primeiro link. Ao abrir terminal, mover para o input.
- `Tab`/`Shift+Tab` devem permanecer na janela; fundo indisponível enquanto modal aberto; impedir rolagem do fundo e restaurá-la ao fechar.
- `Escape`, botão de fechar e clique real no backdrop devem fechar. Clique dentro do conteúdo não pode fechar acidentalmente.
- Retornar foco ao acionador ao cancelar/fechar. Se houver navegação, respeitar o foco da nova página e não forçar foco para um acionador desmontado.
- Fechar menu ao navegar e quando a viewport mudar para desktop, evitando diálogo invisível que bloqueie a página.
- Coordenar menu e terminal para impedir dois modais simultâneos. Rever camadas fixas; `<dialog>` usa top layer.
- Preservar `Cmd+K` e `Ctrl+K`; exibir a indicação adequada à plataforma ou texto neutro. O atalho não deve abrir terminal por cima do menu.
- Acomodar teclado virtual e viewport baixa: altura máxima baseada em `dvh`, conteúdo rolável, input e fechar sempre alcançáveis. Aplicar `min-width: 0` onde o prompt do terminal comprime o input.
- Não apagar histórico de comandos como efeito colateral desnecessário. Preservar comandos existentes.

**Aceite:** fluxo abrir → percorrer → fechar → recuperar foco funciona por teclado; fundo não recebe foco; navegação e redimensionamento não deixam bloqueio de scroll; terminal utilizável em 375×667 e orientação horizontal.

Referência: [W3C — diálogo modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### 03 — Tornar os diferenciais exploráveis por teclado e toque

**Problema confirmado:** somente a aba ativa tem `tabIndex=0`, mas as outras não são alcançáveis por setas. O painel descritivo não está integrado a um padrão completo de abas.

**Arquivos:** `src/components/ui/interactive-image-accordion.tsx`, `src/components/home/DifferentialsSection.tsx`.

**Direção definida:** manter a apresentação interativa em telas amplas, com abas completas; em telas pequenas, apresentar os quatro diferenciais como cards empilhados, com título e descrição visíveis. Remover dependência de hover/toque em faixas estreitas no mobile.

**Implementação:**

- Abas desktop em botões nativos: setas esquerda/direita percorrem a lista; Home/End vão às extremidades; Enter/Espaço ativam quando necessário. Como o conteúdo é local, ativação ao mover foco é aceitável.
- Relacionar `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls` e `aria-labelledby` com IDs únicos.
- Hover não deve roubar foco nem sobrescrever seleção de quem navega por teclado. Preferir clique/foco para seleção e hover apenas visual.
- Se houver marcação responsiva separada, a versão oculta deve sair também da árvore de acessibilidade, sem IDs duplicados.
- Não duplicar os dados dos diferenciais. Definir imagens como decorativas quando título/descrição já transmitirem a informação.
- No mobile, evitar download de duas coleções de imagens para representações desktop/mobile e usar imagens pequenas ou nenhuma imagem nos cards compactos.

**Aceite:** quatro conteúdos alcançáveis sem mouse; seleção e painel associados; mobile sem rolagem horizontal obrigatória; todos os textos disponíveis mesmo sem animação.

Referência: [W3C — abas](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### 04 — Corrigir contraste nos dois temas

**Arquivos:** `src/styles/tokens.css`, `src/app/globals.css`, componentes com cores fixas como `CaseStudyBlock.tsx`, estados de links/botões e páginas `/links` e blog.

**Evidências calculadas a partir das cores atuais:**

| Texto | Fundo | Contraste aproximado |
| --- | --- | --- |
| `#6D28D9` | `#0A0A0A` | 2,79:1 |
| `#1D4ED8` | `#0A0A0A` | 2,95:1 |
| `#737373` | `#141414` | 3,89:1 |
| Comentário de código `#A3A3A3` | `#F5F5F5` | 2,31:1 |

**Implementação:**

- Definir acentos e texto muted adequados separadamente em `:root` e `.dark`, preservando a família visual das cores.
- Conferir cor computada e fundo real, inclusive transparências, pills, links inline, placeholders, avisos, legendas e syntax highlighting.
- Meta: pelo menos 4,5:1 em texto normal; 3:1 em texto grande conforme a definição da WCAG. Elementos gráficos essenciais e indicadores de interface também precisam de contraste adequado.
- Se uma mesma variável não servir para texto e fundo de botão, separar tokens por função. Não clarear toda a paleta indiscriminadamente.
- Estado ativo não pode ser identificado só pela cor; combinar com peso, borda, ícone, sublinhado ou semântica pertinente.
- Manter foco visível sem removê-lo para fins estéticos; conferir sobre fundos claros, escuros e acentuados.

**Aceite:** registrar tabela antes/depois de pares representativos; texto dos botões legível em hover/focus; ausência de falhas de contraste verificáveis nas telas auditadas. Conferência manual complementa a ferramenta automatizada.

Referência: [WCAG — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### 05 — Unificar temas e corrigir tokens/classes inconsistentes

**Problemas confirmados:** `bg-surface` não é gerado; `dark:` segue o sistema, enquanto next-themes aplica `.dark`; syntax highlighting usa media query do sistema; hover do CTA principal de contato pode ficar preto sobre quase preto no tema escuro.

**Arquivos:** `globals.css`, `tokens.css`, `ThemeProvider.tsx`, `ThemeToggle.tsx`, `CommandPalette.tsx`, `ContactSection.tsx`, `button.tsx`, cards e templates consumidores.

**Implementação:**

- Configurar o Tailwind 4 para que `dark:` acompanhe `.dark`, com `@custom-variant dark (&:where(.dark, .dark *));`, verificando compatibilidade com a versão instalada.
- Aplicar a mesma origem de tema ao syntax highlighting, substituindo a divergência por regras sob `.dark`.
- Preferir migrar usos de `bg-surface`/`hover:bg-surface` para `surface-1` ou `surface-2`, conforme função. Se criar alias, documentar e usá-lo consistentemente.
- Inventariar classes personalizadas como `font-inter`, `animate-in`, `fade-in` e `slide-in-*`; confirmar no CSS compilado se existem. Remover ou substituir as classes sem efeito de acordo com o comportamento desejado, sem instalar um pacote só para conservar nomes antigos.
- Rever variáveis autorreferentes no bloco `@theme` (raios/easing); garantir que resolvam para valores válidos. Renomear tokens de origem se necessário e verificar o resultado computado.
- Substituir hover de cor fixa em botões/links por tokens ou opacidade compatíveis com ambos os temas.
- Usar `resolvedTheme` onde a ação precisa saber o tema efetivo. Preservar o tema claro como padrão atual; não adicionar uma nova preferência de produto sem necessidade. Preferências salvas continuam funcionando.
- Dar ao toggle nome que descreva a próxima ação, como “Ativar tema escuro”, e área de toque confortável.

**Aceite:** sistema escuro + site claro e sistema claro + site escuro funcionam consistentemente; toggle e comando `theme` persistem após reload; sem avisos de hidratação; backgrounds, bordas e código acompanham o site.

Referência: [Tailwind — seletor manual para dark mode](https://tailwindcss.com/docs/dark-mode).

### 06 — Remover bloqueio de abertura e padronizar movimento

**Problema confirmado:** intro fixa soma 2,8s de espera e mais 0,5s de saída. É renderizada antes de efeitos que a dispensam, inclusive sobre `/links`; sem JS pode permanecer cobrindo conteúdo. Outros componentes já respeitam movimento reduzido parcialmente, mas não há política uniforme.

**Arquivos:** `IntroLoader.tsx`, `LayoutWrapper.tsx`, `ScrollReveal.tsx`, `SplitText.tsx`, `MagneticButton.tsx`, `ParallaxSection.tsx`, `ParticleField.tsx`, `ProjectGrid.tsx`, `CommandPalette.tsx`, `src/app/links/LinksClient.tsx` e CSS de animação.

**Direção definida:** substituir a intro de tela cheia por animação breve e decorativa da marca, sem capturar foco ou interceptar cliques. Se ocorrer uma vez por sessão, limitar a apresentação inicial à home; nenhuma rota profunda deve esperar por ela.

**Implementação:**

- Conteúdo visível e interativo desde o HTML inicial. Não trocar uma tela de espera por outra camada invisível bloqueadora.
- Animação decorativa da marca com duração alvo de até 600ms, omitida em movimento reduzido; falha em `sessionStorage` não pode quebrar a página.
- Cancelar timers/listeners no cleanup e evitar execução duplicada em Strict Mode.
- Sem JS, headings, links e cards não podem ficar presos em `opacity:0`. Usar melhoria progressiva para revelar/animação e validar HTML inicial de verdade.
- Movimento reduzido deve desligar deslocamentos, parallax, magnetismo, pulsos infinitos e cascatas desnecessárias. Um `MotionConfig` pode ajudar, mas efeitos manuais e animações CSS precisam de tratamento próprio.
- Transições curtas de cor e feedback de estado podem permanecer; nenhuma informação pode depender da animação.
- Pausar o canvas de partículas quando a seção sai da viewport e quando a aba fica oculta; evitar loops duplicados ao retomar.

**Aceite:** acesso direto a home, blog, case e `/links` sem tela bloqueadora; sessão nova/repetida e storage indisponível funcionam; navegação básica/conteúdo legíveis com JS desabilitado; sem pulsos/deslocamentos com movimento reduzido.

### 07 — Separar compartilhamento de contato no WhatsApp

**Arquivo principal:** `src/app/blog/[slug]/page.tsx`.

**Problema confirmado:** o link de compartilhar inclui o número pessoal, abrindo conversa com o proprietário.

**Implementação:**

- Gerar `https://wa.me/?text=...`, sem destinatário, codificando o texto completo uma única vez com título, autoria e URL canônica.
- Manter os CTAs de contato apontando para `SOCIALS.personal.whatsapp`.
- Preservar compartilhamento no LinkedIn e indicação de abertura em nova aba.
- Se extrair helper, fazê-lo somente para tornar construção/validação da URL clara, sem criar abstração extensa.

**Aceite:** URL não contém número de destinatário; acentos, `&`, `#` e quebras de linha codificados corretamente; contato continua apontando para o número original; confirmar manualmente a seleção de destinatário quando houver acesso ao aplicativo.

### 08 — Corrigir landmarks, identificadores e nomes de links

**Arquivos:** `LayoutWrapper.tsx`, `ProjectTemplate.tsx`, `src/app/links/LinksClient.tsx`, `ProjectGrid.tsx`, `globals.css` e demais consumidores identificados em busca global.

**Problemas confirmados:** `<main>` aninhado em cases e também em `/links`; `section.id` duplicado no elemento de seção e no heading em seções extras de projetos.

**Implementação:**

- Manter um único `<main id="main-content">` por página, fornecido pelo layout. Trocar contêineres internos por `article`, `section` ou `div` conforme função.
- Separar ID de âncora da seção e ID do heading: exemplo `arquitetura` e `arquitetura-heading`. `aria-labelledby` deve apontar para o heading.
- Quando `section.id` não existir, gerar IDs determinísticos e únicos por projeto/seção, ou não atribuir um nome ARIA inválido. Não usar aleatoriedade que gere divergência SSR/client.
- Preservar âncoras públicas existentes e evitar duplicidade entre versões responsivas.
- Manter um h1 descritivo por página e sequência compreensível de headings.
- Melhorar nome de links repetidos: “Ver projeto Radar Unificando”, mantendo o texto visível como parte do nome acessível. Não usar links aninhados ao tornar cards clicáveis.
- Validar o skip link: precisa mover o foco ao conteúdo, estar visível quando focado e funcionar com o cabeçalho fixo.
- Definir `scroll-margin-top`/`scroll-padding-top` para âncoras de seções e do blog não ficarem escondidas atrás do cabeçalho.

**Aceite:** um main por rota, nenhum ID duplicado, referências ARIA válidas, links distinguíveis na lista do leitor de tela; âncoras e skip link chegam ao conteúdo correto.

### 09 — Dar ações claras ao hero e acesso direto ao contato

**Arquivos:** `HeroSection.tsx`, `src/lib/navigation.ts`, `LayoutWrapper.tsx`, `ContactSection.tsx`, `TerminalPane.tsx`, hook de navegação.

**Implementação definida:**

- CTA primário “Ver projetos” → `/projetos`.
- CTA secundário “Vamos conversar” → `/contato`, em navegação interna na mesma aba.
- Manter LinkedIn/GitHub em posição secundária e preservar nome, cargo e fotografia.
- Adicionar “Contato” → `/contato` em `NAV_ROUTES`; incluir ícone correspondente em `NAV_ICONS`. Hoje os ícones são mapeados separadamente, portanto adicionar só a rota causa referência indefinida.
- Conferir aliases do terminal e estado ativo após atualização da lista compartilhada.
- Revisar o breakpoint do menu: mais um link pode não caber em 768px. Exibir gaveta até a largura em que todos os controles couberem confortavelmente.
- Garantir que o logo tenha nome acessível que identifique o destino, mesmo durante animação.

**Aceite:** projetos e contato alcançáveis diretamente do hero; “Contato” existe nos menus desktop/mobile e tem estado ativo; navegação sem sobreposição entre 768 e 1024px; links sociais preservados.

### 10 — Apresentar três projetos selecionados na home

**Arquivos:** `src/app/page.tsx`, novo componente sugerido `src/components/home/FeaturedProjectsSection.tsx`, dados de projetos, componentes de cards/imagens.

**Direção definida:** inserir a seleção imediatamente após o hero. Ordem inicial proposta: Hero → Projetos selecionados → Sobre → Diferenciais → Ferramentas → GitHub → Artigos → Contato. Ajustes pequenos são permitidos após inspeção visual, preservando projetos antes das seções extensas.

**Implementação:**

- Seleção inicial editorial: Radar Unificando, Med Unificando e Seu Barraco Esperto, cobrindo produtos com IA e automação/IoT. Isso é uma escolha de apresentação, não alegação de maior receita/uso.
- Resolver projetos pelos IDs do catálogo. Usar `featuredOrder` ou uma lista central de IDs; não duplicar título, descrição, URL e tecnologia em outra coleção.
- Cada card apresenta título, resumo do problema/benefício, área, síntese da participação/resultado quando sustentada pelo conteúdo e link para o case. Acrescentar “Ver todos os projetos”.
- Adicionar suporte a thumbnail com caminho, dimensões e texto alternativo. Preferir captura real obtida de material existente ou página pública do próprio produto, sem dados pessoais e sem login.
- Não usar geração de imagem para simular uma interface real do produto. Se não houver captura disponível, usar fallback editorial com nome/área e registrar imagem como pendência. Não bloquear toda a seção por isso.
- Capturas devem ter proporção reservada, otimização e carregamento apropriados. Evitar texto essencial embutido apenas na imagem e não aplicar `priority` a todos os cards.
- Preservar detalhes em seus respectivos cases. A home precisa de síntese, não cópia integral.

**Aceite:** três cards conectados ao catálogo, links corretos, ausência de métricas inventadas, fallback sem imagem quebrada e sem deslocamento de layout relevante; capturas reais com origem registrada quando usadas.

### 11 — Refinar responsividade, espaçamento e legibilidade

**Arquivos:** hero, layouts, navegação, cards, terminal, diferenciais, páginas de blog/case/currículo/contato e `globals.css`.

**Natureza do achado:** oportunidade inferida pelas classes e dimensões, ainda sem inspeção visual. Confirmar antes de alterar medidas.

**Implementação:**

- Ajustar o hero para que título, proposta de valor e CTAs tenham prioridade; reduzir as margens verticais fixas exageradas no mobile e usar escala tipográfica fluida compatível com a largura útil.
- Foto abaixo do conteúdo em telas estreitas, com proporção reservada e enquadramento preservado. Não deformar nem esconder o rosto para encaixar o layout.
- Padronizar paddings/limites de largura entre páginas. Manter corpo de texto confortável, normalmente 16–18px, e linhas de leitura de aproximadamente 60–75 caracteres quando aplicável.
- Resolver transbordamento na origem: `min-w-0`, quebra de títulos/endpoints, grid responsivo e dimensões das imagens. Não usar `overflow-x-hidden` global para disfarçar conteúdo cortado.
- Código e tabelas podem ter rolagem horizontal local; a página inteira não deve exigir rolagem lateral.
- Rever o botão flutuante do terminal para não cobrir links finais, CTA ou controles do blog. Considerar safe areas do dispositivo.
- Manter alvo de toque preferencial de 44×44 CSS px nos controles principais, com separação suficiente.
- Conferir zoom de texto/página e foco não encoberto pelo cabeçalho fixo; evitar truncamento de informação essencial.

**Matriz visual mínima:** 320, 375/390, 768, 1024 e 1440px de largura; temas claro/escuro; zoom 200%; reflow equivalente a 320 CSS px; viewport baixa e orientação horizontal para modais.

**Aceite:** nenhuma rolagem lateral global nas rotas amostradas; títulos/CTAs completos; sem colisões no header; imagens estáveis; screenshots de home, catálogo, case, artigo e contato em mobile/desktop.

### 12 — Filtros de projetos e cases mais informativos

**Arquivos:** `src/types/project.ts`, `src/lib/projects/helpers.ts`, `src/lib/projects/*`, `src/lib/projects.ts`, `src/app/projetos/page.tsx`, `ProjectsClient.tsx`, `ProjectGrid.tsx`, `ProjectTemplate.tsx`.

**Modelagem:**

- Acrescentar campos simples opcionais aos cards para `areas`, `thumbnail` e destaque. Separar área funcional de `techs`, `accent` e `group`.
- Taxonomia inicial: `ia`, `automacao`, `frontend`; labels “IA”, “Automação” e “Front-end”. Um projeto pode pertencer a mais de uma área. Preencher explicitamente com base no conteúdo existente, sem inferir que todo projeto com UI deve ser promovido como case de front-end.
- Campos opcionais do detalhe podem incluir `role`, `status`, `period` e síntese de resultados/evidências. Manter o `caseStudy` existente; evitar dois blocos repetindo a mesma narrativa.
- A falta de data/status verificado não deve produzir um rótulo inventado. Omitir o campo público e registrar a pendência editorial.
- Passar apenas o DTO serializável dos cards ao componente client; fazer a extração do catálogo no servidor.

**Filtros definidos:**

- Seleção única entre “Todos”, “IA”, “Automação” e “Front-end”, implementada com botões e `aria-pressed` ou radio group adequado. Não usar semântica de abas para simples filtragem de uma lista.
- Preservar grupos Unificando/independentes dentro dos resultados e ocultar grupos vazios sem deixar grandes lacunas.
- Exibir total encontrado, estado vazio e ação para limpar filtro. Anunciar alteração de contagem com região `aria-live="polite"` sem ler todo o grid novamente.
- Estado na URL por parâmetro `area`; carregar link direto, permitir reload e navegação voltar/avançar. Valor inválido equivale a “Todos”; preservar outros parâmetros relevantes.
- Não mover foco automaticamente para os cards após selecionar filtro. Evitar animação longa de reordenação e respeitar movimento reduzido.
- Preservar geração estática onde possível. Se usar `useSearchParams`, aplicar a fronteira `Suspense` necessária e verificar build. Não tornar a página dinâmica apenas por conveniência.

**Conteúdo dos cases:** organizar contexto → participação → desafio → solução → resultado, reaproveitando textos já presentes. Distinguir resultado observado de benefício esperado. Links para demonstração/repositório e stack continuam disponíveis.

**Aceite:** cada projeto aparece em filtros coerentes; catálogo sem duplicações; URL reproduz seleção; reset, vazio e histórico funcionam; rotas antigas seguem válidas; nenhum ReactNode de detalhe atravessa a fronteira client por conveniência.

### 13 — Busca, sumário, cópia de código e relacionados no blog

**Arquivos:** `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/lib/blog.ts`, `src/types/blog.ts`, `src/components/blog/*`, `globals.css`.

**Busca definida:**

- Busca local por título, descrição e tags, ignorando caixa e acentos. Não é busca no texto completo do artigo nesta entrega.
- Campo com label visível, limpar busca, contagem e estado vazio. Enter não pode recarregar a página inadvertidamente.
- Sem consulta, manter o destaque editorial atual; com consulta, apresentar uma única lista de resultados, sem duplicar o destaque.
- Persistir termo em `q` na URL, com atualização moderada (por exemplo 200–300ms) e sem criar uma entrada no histórico para cada letra. Ler link direto e refletir voltar/avançar.
- Renderizar lista inicial no servidor e enviar ao client somente metadados necessários, excluindo o Markdown completo de todos os artigos.

**Sumário definido:**

- Exibir em artigos com três ou mais headings h2/h3; não criar sumário vazio nem incluir h1 da página.
- Extrair headings da estrutura Markdown, não de regex ingênua que captura `##` dentro de blocos de código.
- Compartilhar a geração determinística de IDs entre extração e renderização; suportar acentos, pontuação, títulos duplicados, links e código inline nos headings.
- Links internos alcançam heading correto, com deslocamento do cabeçalho fixo. No mobile usar bloco compacto/expansível com HTML nativo, sem cobrir o artigo.

**Copiar código:**

- Adicionar botão por bloco cercado/pre, preservando syntax highlighting. Copiar o código original, sem número de linha, botão, markup ou prompt adicionado.
- Só anunciar sucesso após a promessa de clipboard resolver. Falha/permissão negada deve oferecer mensagem e seleção manual; não alegar “Copiado” falsamente.
- Nome acessível e feedback discreto com `aria-live`; botão alcançável por teclado. Código inline não recebe botão.
- Manter o corpo do artigo no servidor e isolar só a interatividade necessária.

**Relacionados:** pontuar por quantidade de tags em comum normalizadas; excluir o atual; desempatar por data e slug; retornar até dois. Se não houver correspondência, mostrar recentes com label “Outros artigos”, sem chamar relação inexistente de “relacionados”.

**Aceite:** busca com acentos e sem resultados; URLs e reset corretos; heading duplicado navega ao destino certo; bloco de código contendo `##` não entra no sumário; cópia conserva o texto; relacionados consistentes e sem o artigo atual.

### 14 — Restringir cache e definir o contrato offline

**Problema confirmado:** `sw.js` intercepta quase todo GET HTTP, inclusive terceiros e requisições internas do framework, usa cache genérico e aceita respostas sem validar status. Requisições sem cache podem terminar sem uma `Response` em falhas de rede.

**Arquivos:** `public/sw.js`, `public/offline.html`, registro em `src/app/layout.tsx`, documentação e testes dedicados.

**Contrato definido para esta entrega:** offline garante uma página explicativa acessível e os recursos locais explicitamente selecionados. Não promete navegação completa em todas as páginas já visitadas. Isso evita misturar HTML/RSC de releases distintos e deve ficar claro na documentação/interface offline.

**Política de implementação:**

- Registrar somente em produção. Não desregistrar indiscriminadamente workers de outros escopos/sites ao iniciar desenvolvimento.
- Interceptar apenas requisições do mesmo origin, GET e compatíveis com a política explícita. Deixar terceiros, analytics, APIs e respostas RSC/prefetch fora do cache do worker.
- Navegações de documento: priorizar rede; em indisponibilidade de rede, servir `/offline.html`. Preservar respostas HTTP legítimas, inclusive 404, em vez de substituí-las por conteúdo antigo. Não armazenar HTML das rotas indiscriminadamente.
- Precaching pequeno: página offline e recursos realmente necessários a ela. Foto/PDF podem usar cache sob demanda e versionado; não devem impedir instalação do fallback se falharem ou pesar em todo primeiro acesso.
- Para arquivos selecionados, validar resposta bem-sucedida antes de armazenar. Não guardar erro ou resposta opaque; preservar query string quando ela fizer parte da identidade do recurso.
- Deixar os assets internos do Next fora do cache customizado nesta implementação inicial, salvo necessidade demonstrada e política específica testada. Não usar um fallback HTML para solicitações de script/imagem/RSC.
- Quando uma requisição de recurso falhar sem cache, retornar uma resposta/erro apropriado, nunca `undefined`. Tratar rejeições de tarefas em segundo plano e usar `event.waitUntil` quando necessário.
- Adotar nomes de cache com prefixo exclusivo do portfólio e versão de release; limpar apenas versões próprias antigas. Incluir migração do cache legado `portfolio-v1` e não apagar todo Cache Storage do origin.
- Definir ativação sem reload forçado no meio do uso. Se usar `skipWaiting`/`clients.claim`, justificar a compatibilidade da transição e testar a atualização com uma aba antiga aberta.
- Limitar crescimento: whitelist pequena ou limite de entradas, sem armazenar todas as URLs visitadas.
- Página offline independente de fontes/scripts externos, com contraste, título, orientação honesta e ação de tentar novamente. A ausência de suporte a SW não pode impedir o site online.

**Aceite:** instalação e atualização em produção testadas; Google Analytics e RSC ausentes do cache customizado; offline mostra fallback; erros de recurso não recebem HTML; caches alheios preservados; versão antiga removida de forma controlada; reconexão permite navegação normal.

Referência conceitual: [MDN — service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers). As regras acima são a política específica deste portfólio.

### 15 — Alinhar SEO e indicadores ao conteúdo real

**Arquivos:** `src/app/page.tsx`, `src/lib/structured-data.ts`, `seo.ts`, `sitemap.ts`, `src/components/home/ToolsSection.tsx`, `GitHubSection.tsx`, `src/lib/github.ts`, metadados e `public/llms.txt` quando houver informação divergente.

**Implementação definida:**

- Remover da home o `FAQPage` atual, pois não há FAQ visível completa correspondente. Manter Person/WebSite e os schemas válidos dos cases/artigos. Não adicionar uma FAQ apenas para justificar a marcação.
- Se o helper de FAQ deixar de ter consumidores, remover código/testes específicos sem apagar cobertura dos demais schemas.
- Não prometer rich results ou aumento de ranking. Preservar canonical, Open Graph, Twitter, breadcrumbs e indexação das páginas públicas.
- Manter `/links` com `noIndex`; não incluí-la no sitemap por acidente. Rever metadados genéricos como `other["X-Robots-Tag"]`: uma meta tag arbitrária não equivale a header HTTP e não deve contradizer a configuração real de robots.
- Em métricas estáticas como “131 downloads/semana”, acrescentar fonte e período somente se conhecidos. Sem evidência de data, remover o número e manter descrição factual. Não atribuir a data da implementação como se fosse data da medição.
- Usar `getYearsOfExperience()` onde apropriado em textos/metadados hoje fixados em “+7 anos”, sem alterar datas reais de carreira.
- Conferir consistência entre conteúdo visível, schemas e arquivos de descoberta; corrigir apenas divergências verificáveis.
- Indicadores GitHub: a implementação atual calcula estrelas/linguagens sobre até 100 repositórios e linguagens pela contagem da linguagem principal por repo. Explicitar a amostra/metodologia ou agregar toda a paginação com limites e timeout; não apresentar a amostra como total completo se houver mais repositórios. Preferir a correção simples de rótulo nesta entrega.
- Mostrar indisponibilidade como indisponibilidade, nunca como zero; preservar link para o perfil mesmo quando a API falhar. Não criar dependência externa obrigatória para renderizar a página.
- Validar datas do blog e sua formatação para evitar dia deslocado por fuso. `dateTime` deve acompanhar os elementos `time` quando houver data ISO válida.
- Não inventar `lastModified` editorial com `new Date()` a cada execução; usar data conhecida ou omitir quando desconhecida, preservando URLs do sitemap.

**Aceite:** schema corresponde ao conteúdo; FAQ removida sem regressão dos demais tipos; noindex/canonicals corretos; números sem fonte/período não apresentados como atuais; erro de GitHub não quebra home; metadados coerentes com o catálogo.

Referência: [Google — diretrizes de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

### 16 — Testar os fluxos essenciais e registrar evidências

**Estado atual:** Vitest em ambiente Node cobre funções/dados; não existe suíte de navegador identificada. Ter 23 testes aprovados não valida layout, foco ou leitor de tela.

**Arquivos sugeridos:** `playwright.config.ts`, `tests/e2e/*`, helpers/fixtures de teste, `package.json`, lockfile e testes unitários existentes. Evitar que Vitest tente executar specs do Playwright.

**Implementação:**

- Manter Vitest para lógica pura: normalização de busca, filtros, ordenação de relacionados, IDs de headings, URLs de compartilhar e integridade do catálogo.
- Adicionar Playwright e integração axe compatíveis com a stack instalada como dependências de desenvolvimento. Configurar servidor por `webServer`, porta isolada e comandos documentados.
- Testes usuais de UI podem executar sem SW para isolamento; testes de offline/update devem permitir SW em suíte separada, com build de produção e contexto limpo.
- Usar fixtures ou interceptações para evitar dependência de GitHub/Instagram/analytics e resultados de terceiros. Separar validação de URLs externas de navegação efetiva nesses serviços.
- Rodar fluxos principais em Chromium desktop/mobile e smoke tests em Firefox/WebKit. Se o ambiente não permitir instalar/executar um navegador, registrar exatamente a limitação.
- Checagens axe em home, projetos, case, artigo, currículo, contato e `/links`; repetir cenários relevantes em ambos os temas e com modais abertos. Não declarar conformidade completa só porque axe passou.
- Não usar esperas fixas longas para animações. Aguardar estado/papel/URL; usar movimento reduzido quando o teste não for sobre animação.
- Screenshots são evidência de revisão, não snapshots de toda a implementação por padrão. Evitar testes frágeis baseados em classes CSS ou cópia integral de DOM.

**Casos obrigatórios:**

| Fluxo | Verificação |
| --- | --- |
| Headings e landmarks | H1 com nome; um main; IDs e ARIA válidos |
| Menu | Abrir, Tab/Shift+Tab, Esc, retorno de foco, navegação e resize |
| Terminal | Botão, atalhos, fechar, histórico e comandos de navegação/tema/CV |
| Diferenciais | Setas/Home/End, seleção, painel e alternativa mobile |
| Temas | Sistema e site em combinações opostas; persistência; hover/foco/código |
| Intro/movimento | Primeira visita, storage indisponível, movimento reduzido e JS desabilitado |
| Hero/home | CTAs, três projetos e link para catálogo |
| Filtros | Todos, áreas, vazio, contagem, URL inválida, reload e voltar/avançar |
| Blog | Busca normalizada, vazio, sumário duplicado, copiar sucesso/falha e relacionados |
| WhatsApp | Compartilhar sem destinatário; contato com destinatário preservado |
| Rotas | Todas as rotas geradas de cases/artigos acessíveis; desconhecidas retornam 404 |
| Currículo | Download dispara com nome esperado e resposta válida do PDF |
| Falha externa | Home continua utilizável quando GitHub/embeds falham |
| Offline | Instalar, ficar offline, fallback, recurso ausente, reconectar, atualizar worker |

**Validações manuais:** teclado sem mouse, VoiceOver/NVDA em ao menos um fluxo representativo, matriz visual do item 11, hover/contraste, teclado virtual, visualização do PDF e compartilhamento quando possível. Registrar verificações não executadas; não simular evidência.

**Comandos mínimos ao concluir:**

```bash
npm run lint
npx tsc --noEmit --incremental false
npm test
npm run build
npm run test:e2e
```

`test:e2e` é um script a criar e documentar. O comando do servidor deve corresponder ao modo usado: `next start` para build local ou servidor standalone com seus assets copiados no ambiente equivalente ao Docker.

**Build e fontes:** tentar novamente em ambiente com rede permitida. Se persistir a falha de fontes, documentar causa e, somente com arquivos obtidos legitimamente, considerar `next/font/local` preservando família/licença. Não substituir silenciosamente a tipografia nem marcar build como aprovado por ter passado TypeScript.

**Performance:** medir home e artigo representativo com condições registradas (build, viewport, ferramenta e cache). Comparar antes/depois quando o baseline puder ser obtido. Metas de projeto: conteúdo sem espera artificial, sem novos deslocamentos relevantes de layout e sem enviar todo o conteúdo de blog/cases ao client. Não inventar porcentagem de melhora nem fixar nota Lighthouse arbitrária como prova de qualidade.

Referência de configuração: [Playwright — servidor de testes](https://playwright.dev/docs/test-webserver).

### 17 — Atualizar documentação para refletir a implementação

**Arquivos:** `README.md`, `docs/ARCHITECTURE.md`, `docs/design-system.md`, este plano e novo relatório sugerido `docs/RELATORIO-DE-IMPLEMENTACAO.md`.

**Problema confirmado:** README é o template inicial; arquitetura menciona GSAP, Lenis, cmdk e slides/snap scroll que não correspondem ao estado atual. Também associa `standalone` a exportação estática sem servidor e afirma ausência de fetching em runtime apesar da integração GitHub/revalidação.

**Implementação:**

- README: propósito, stack real, requisitos Node/npm compatíveis com o projeto, instalação com `npm ci`, desenvolvimento, build, testes e execução local/Docker.
- Documentar portas: desenvolvimento padrão e produção Docker atual em 3100. Conferir arquivos reais antes de afirmar comandos.
- Explicar `output: "standalone"` como empacotamento de servidor e dependências necessárias, sem confundir com `output: "export"`. Descrever geração das páginas e revalidação conforme o build final.
- Documentar fontes externas, variáveis realmente usadas (por exemplo verificação do Google, se mantida), API GitHub e comportamento de falha. Não inventar variáveis obrigatórias nem incluir segredos.
- Documentar adição de projeto, metadados de cards/áreas/destaques/imagens, manutenção dos cases, publicação de artigo, headings, datas e escolha de relacionados.
- Atualizar mapa de rotas, fronteiras server/client, tema manual, tokens, contraste, movimento e padrões de acessibilidade.
- Explicar política offline, cache versionado, como validar uma atualização e limitações intencionais.
- Registrar comandos de testes e checklist de publicação; não afirmar que um CI foi configurado se nenhum workflow foi criado. Automação de CI adicional não é requisito desta entrega.
- Relatório final por item 01–17: alterações, arquivos, testes executados, resultado e pendências reais. Linkar evidências visuais e sua condição de captura.

**Aceite:** outra pessoa consegue executar o projeto e seus testes seguindo README; não há instruções de componentes removidos; conteúdo e assets pendentes identificados; documentação distingue testes executados de sugestões futuras.

Referência: [Next.js — output standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

## 5. Decisões editoriais e como lidar com informação ausente

| Situação | Conduta definida |
| --- | --- |
| Não há screenshot de um case | Implementar fallback editorial; registrar necessidade da captura real |
| Não se sabe a função, período ou status | Não inventar; reaproveitar só informação explícita e omitir o campo desconhecido |
| Resultado sem métrica numérica | Descrever entrega/resultado qualitativo sustentado pelo conteúdo |
| Número sem data/fonte | Remover número ou deixar pendência para confirmação; não datar artificialmente |
| Site externo indisponível | Não concluir que o produto foi encerrado; registrar tentativa e manter fallback |
| Não há credencial de teste/navegador/rede | Continuar trabalho independente; registrar o que não pôde ser validado |
| Preferência estética não detalhada | Preservar identidade atual e aplicar direção deste plano; não bloquear por detalhe rotineiro |

Nenhuma dessas situações exige interromper toda a implementação. Se uma informação permanecer ausente, reportar a limitação correspondente sem afirmar que o subitem editorial foi completamente entregue.

## 6. Critério global de conclusão

- [x] 01 — Headings animados acessíveis e legíveis sem JS. (Leitura única verificada via árvore de acessibilidade; falta confirmar com VoiceOver/NVDA.)
- [x] 02 — Menu/terminal com ciclo completo de foco e fechamento.
- [x] 03 — Diferenciais acessíveis por teclado e claros no mobile.
- [x] 04 — Contraste revisado com medições.
- [x] 05 — Tema único e classes/tokens funcionais.
- [x] 06 — Sem intro bloqueadora; movimento reduzido consistente.
- [x] 07 — Compartilhamento no WhatsApp corrigido.
- [x] 08 — Landmarks, IDs, âncoras e nomes de links corrigidos.
- [x] 09 — CTAs no hero e Contato na navegação.
- [x] 10 — Três cases destacados com imagens reais ou fallback documentado. (Seu Barraco Esperto em fallback editorial.)
- [x] 11 — Matriz de responsividade e zoom validada.
- [x] 12 — Filtros e apresentação dos cases implementados.
- [x] 13 — Busca, sumário, cópia e relacionados do blog implementados.
- [x] 14 — Offline/update com política restrita e testes de produção.
- [x] 15 — SEO e indicadores alinhados às evidências.
- [ ] 16 — Testes, build e evidências registrados sem omitir limitações. (Parcial: Firefox não inicia neste ambiente; VoiceOver/NVDA e checagens em aparelho real não executados.)
- [x] 17 — README, arquitetura e design system atualizados.

Ao entregar, informar o que mudou, quais verificações passaram, quais ficaram bloqueadas e eventuais decisões editoriais pendentes. Não publicar automaticamente. Não marcar itens como concluídos apenas porque arquivos foram criados: os critérios de aceite precisam ser atendidos ou a limitação explicitada.

## 7. Texto sugerido para iniciar a próxima LLM

> Implemente os 17 itens de `docs/PLANO-DE-MELHORIAS.md`. O escopo foi aprovado. Leia as instruções locais e o estado atual do repositório, preserve mudanças existentes e siga as dependências do plano. Mantenha a identidade visual e a stack. Não invente dados profissionais, métricas ou screenshots de produtos. Faça a implementação, os testes pertinentes e a documentação, registrando evidências e limitações no relatório indicado. Continue autonomamente nas decisões rotineiras e peça apenas informações indispensáveis que não estejam disponíveis. Não faça deploy automático.
