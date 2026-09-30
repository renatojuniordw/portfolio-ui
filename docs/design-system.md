# Design system

Identidade: base neutra (branco/quase preto), tipografia marcante (Space Grotesk nos títulos, Inter no texto), fotografia pessoal em escala de cinza e três acentos — azul (tech), roxo (IA) e laranja (Seu Barraco Esperto). Temas claro e escuro.

## Tokens de cor

Definidos em `src/styles/tokens.css` e expostos como classes Tailwind em `src/app/globals.css` (`@theme`).

| Token | Classe | Claro | Escuro | Uso |
| --- | --- | --- | --- | --- |
| `--bg` | `bg-bg` | `#FFFFFF` | `#0A0A0A` | Fundo da página |
| `--surface-1` | `bg-surface-1` | `#F5F5F5` | `#141414` | Cards, código, rodapé |
| `--surface-2` | `bg-surface-2` | `#F9F9F9` | `#1A1A1A` | Seções alternadas |
| `--border` | `border-border` | `#E5E5E5` | `#262626` | Bordas (decorativas) |
| `--text` | `text-text` | `#111111` | `#F5F5F5` | Texto principal; fundo de botão primário (`bg-text text-bg`) |
| `--text-2` | `text-text-secondary` | `#666666` | `#A3A3A3` | Texto secundário |
| `--muted` | `text-muted` | `#6B6B6B` | `#8F8F8F` | Labels e metadados |
| `--accent-tech` | `text-tech`, `bg-tech` | `#1D4ED8` | `#60A5FA` | Links, foco, botão primário azul |
| `--accent-ia` | `text-ia` | `#6D28D9` | `#A78BFA` | IA, Unificando |
| `--accent-barraco` | `text-barraco` | `#C2410C` | `#FB923C` | Seu Barraco Esperto |
| `--on-accent` | `text-on-accent` | `#FFFFFF` | `#0A0A0A` | Texto sobre `bg-tech`/`bg-danger` |
| `--danger` | `text-danger` | `#B91C1C` | `#F87171` | Erros, "Desafio" nos cases |
| `--success` | `text-success` | `#047857` | `#34D399` | "Resultado" nos cases |

Não existe `bg-surface` (sem sufixo): use `surface-1` ou `surface-2`. Não use cores fixas (`#111111`, `hover:bg-black`, `red-500`) em componentes; elas quebram um dos temas.

### Contraste

Meta WCAG 2.2 AA: 4,5:1 para texto normal, 3:1 para texto grande e indicadores de interface. `src/lib/__tests__/contrast.test.ts` lê os tokens reais e falha se qualquer token de texto ficar abaixo de 4,5:1 sobre `bg`, `surface-1` ou `surface-2` nos dois temas, ou se `on-accent` perder contraste. O mesmo teste cobre as cores de syntax highlighting.

Pares que mudaram nesta revisão (contraste calculado pela fórmula WCAG):

| Par | Antes | Depois |
| --- | --- | --- |
| IA sobre fundo escuro | `#6D28D9` / `#0A0A0A` = 2,79 | `#A78BFA` = 7,27 |
| Tech sobre fundo escuro | `#1D4ED8` / `#0A0A0A` = 2,95 | `#60A5FA` = 7,79 |
| Muted sobre surface-1 escuro | `#737373` / `#141414` = 3,89 | `#8F8F8F` = 5,70 |
| Barraco sobre branco | `#EA580C` / `#FFFFFF` = 3,56 | `#C2410C` = 5,18 |
| Danger sobre surface-1 claro | `#DC2626` / `#F5F5F5` = 4,43 | `#B91C1C` = 5,93 |
| Danger sobre fundo escuro | `#DC2626` / `#0A0A0A` = 4,10 | `#F87171` = 7,16 |
| Comentário de código (claro) | `#A3A3A3` / `#F5F5F5` = 2,31 | `#666666` = 5,27 |
| Comentário de código (escuro) | `#737373` / `#141414` = 3,89 | `#8F8F8F` = 5,70 |
| Texto branco em botão azul (escuro) | branco / `#60A5FA` = 2,54 | `on-accent` `#0A0A0A` = 7,79 |

Estados ativos não dependem só de cor: link ativo do menu tem peso e borda inferior (desktop) ou lateral (gaveta) além de `aria-current`; filtro ativo inverte fundo e usa `aria-pressed`.

## Tipografia

- Títulos: `font-display` (Space Grotesk). Corpo: `font-body` (Inter), 16–18 px, entrelinha 1,6–1,75.
- `.section-title`, `.section-label` e `.blog-content` em `globals.css`.
- Nome no hero com escala fluida `clamp(3rem, 10vw + 1rem, 13rem)`, que cabe em 320 px.
- Textos longos sem espaço (pacotes npm, endpoints) usam `overflow-wrap: anywhere`; código em bloco rola dentro do próprio bloco.

## Raios, sombras e easing

`--radius-sm/md/lg/xl` = 10/14/18/24 px e `--ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)`, com valores literais no `@theme`. Sombras: `shadow-soft-1`, `shadow-soft-2`.

## Componentes e padrões

| Padrão | Onde | Regras |
| --- | --- | --- |
| Botão primário | `bg-text text-bg rounded-full`, hover `opacity-90` | Altura mínima 44–48 px |
| Botão secundário | `border border-border`, hover `border-text` | |
| Card | `.project-card` ou `rounded-3xl border bg-surface-1`, hover `border-text`/`text-secondary` | Link com nome distinto do item |
| Pill/tag | `.tag-pill` | Decorativa; não é interativa |
| Diálogo | `ModalDialog` | Título, botão fechar, foco preso, Esc/backdrop |
| Filtro | botões com `aria-pressed` + `role="status"` com a contagem | Não usar semântica de abas para filtrar lista |
| Abas | `InteractiveImageAccordion` | Padrão APG com setas e Home/End |
| Título animado | `SplitText` | Texto completo em `sr-only`, animação só em CSS |
| Revelação | `ScrollReveal` | Nunca oculta conteúdo no HTML inicial |
| Seta de card | `ArrowCta` | Decorativa (`aria-hidden`) |

## Movimento

Duração curta (200–700 ms), `--ease-out`, sem bloquear conteúdo. Tudo que desloca, faz parallax, magnetismo, pulsa ou cascateia desliga com `prefers-reduced-motion`; transições de cor podem ficar. Nenhuma informação depende de animação.

## Foco

`:focus-visible` com contorno de 2 px em `--accent-tech` e afastamento de 3 px, visível nos dois temas. Não remova o contorno por estética.
