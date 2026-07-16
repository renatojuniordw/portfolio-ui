# Modo terminal no Command Palette — Design

## Contexto

O site já tem um `CommandPalette` (`src/components/ui/CommandPalette.tsx`, `Cmd+K`/`Ctrl+K`) no estilo spotlight — lista clicável com navegação, alternância de tema e download do currículo — e um easter egg separado no console do navegador (`src/lib/easter-egg.ts`, `window.renato.hire()`).

O usuário quer uma feature mais ousada/criativa que reforce a marca técnica, sem duplicar infraestrutura: em vez de um easter egg escondido no console, um modo "terminal" acessível dentro do próprio Cmd+K, que qualquer visitante encontra navegando a paleta.

## Objetivo

Adicionar um segundo modo de interação ao `CommandPalette` existente — um terminal digitável — sem alterar o comportamento nem remover o modo spotlight atual.

## Escopo

### 1. Alternância de modo

- Novo estado `mode: "list" | "terminal"` em `CommandPalette`, inicializado em `"list"`.
- Botão/ícone (`SquareTerminal` do `lucide-react`) no cabeçalho da paleta, ao lado do input de busca existente, com `aria-pressed` refletindo o modo ativo e `aria-label` alternando entre "Ativar modo terminal" / "Voltar para lista".
- Ao alternar para `"terminal"`, o conteúdo do `Command` (input + lista) é substituído pelo novo `TerminalPane`; o cabeçalho e o container (backdrop, animação de abertura/fechamento, `Escape` para fechar) continuam os mesmos.
- O modo escolhido persiste enquanto o componente `CommandPalette` estiver montado (não reseta ao fechar/reabrir a paleta, só ao recarregar a página).

### 2. Novo componente `TerminalPane`

`src/components/ui/TerminalPane.tsx`, client component. Props: `onNavigate: (path: string) => void`, `onDownloadCv: () => void` (a paleta passa as mesmas funções já usadas pelo modo lista, para não duplicar lógica de navegação/tema/download).

**Estado interno:**
- `lines: { type: "input" | "output" | "error"; text: string }[]` — histórico exibido, começa com uma linha de boas-vindas (`Digite "help" para ver os comandos.`).
- `value: string` — texto atual do input.
- `history: string[]` + `historyIndex` — comandos previamente digitados nesta sessão, navegáveis com ↑/↓.

**Layout:**
- Área de saída com `role="log"` e `aria-live="polite"`, fonte monoespaçada (`font-mono`), scroll interno com altura máxima igual à lista do modo spotlight (`max-h-[300px]`).
- Linha de prompt fixa embaixo: `renato@portfolio:~$` + `<input>` (não usa `Command.Input` do `cmdk` — é um input HTML simples, já que o parsing de comando é customizado, não fuzzy-search).
- Cursor: bloco piscando via CSS (`animation`), sobreposto/adjacente ao input.

**Parsing de comando** (função pura `runTerminalCommand(input, ctx)`, testável isoladamente):
- Tokeniza por espaço: `[cmd, ...args]`.
- Comandos suportados:
  | Comando | Efeito |
  |---|---|
  | `help` | Lista os comandos disponíveis (linha de output) |
  | `cd <rota>` | Navega via `ctx.onNavigate`. Aliases: `home`\|`inicio` → `/`, `sobre` → `/#sobre`, `projetos` → `/projetos`, `curriculo` → `/curriculo`, `contato` → `/contato`, `blog` → `/blog`. Alias inválido → erro `cd: rota não encontrada: <x>` |
  | `theme` | Alterna tema (`ctx.toggleTheme`) |
  | `theme light` / `theme dark` | Define tema explicitamente (`ctx.setTheme`) |
  | `cv` | Aciona `ctx.onDownloadCv` |
  | `whoami` | Output: `PROFILE.name` + `PROFILE.title` |
  | `cat sobre.md` | Output: `PROFILE.summary` |
  | `sudo hire-me` | Output `🚀 Acesso concedido. Redirecionando para o LinkedIn...` e abre `SOCIALS.personal.linkedin` em nova aba |
  | `clear` | Limpa `lines` (mantém apenas a linha de boas-vindas) |
  | comando vazio | Nenhuma ação, apenas nova linha de prompt |
  | qualquer outro | Erro: `comando não encontrado: <cmd>. Digite "help".` |

- Cada submissão (`Enter`) empurra uma linha `type: "input"` com o texto digitado, executa o comando, empurra o(s) resultado(s) como `type: "output"`/`"error"`, limpa `value`, adiciona ao `history`, rola a área de output para o fim.
- `ArrowUp`/`ArrowDown` navegam `history` (mesmo padrão de um shell: não avança além dos extremos).

### 3. Reuso de lógica existente

`CommandPalette` continua sendo o dono do estado de tema (`useTheme`) e do router (`useRouter`). Extrai as duas ações já usadas pelo modo lista (`toggleTheme`, `downloadCv`) para funções nomeadas (hoje são inline dentro do `onSelect`) e passa as mesmas para `TerminalPane` — nenhuma duplicação de lógica de negócio entre os dois modos.

## Fora de escopo

- Persistência de histórico entre sessões (localStorage) — fica só em memória, reseta ao recarregar a página.
- Autocomplete/Tab-completion de comandos.
- Novos comandos além dos listados acima (sem `ls`, `pwd`, etc. — escopo mínimo do que foi combinado).
- Alterações no easter egg de console (`src/lib/easter-egg.ts`) — continua existindo em paralelo, sem relação com este componente.

## Teste / validação

Sem suite de testes automatizados de UI no projeto. Validação manual:

- `Cmd+K`/`Ctrl+K` abre a paleta no modo lista, como hoje.
- Alternar para o modo terminal via botão funciona e volta para lista sem perder o comportamento de `Escape`/clique fora para fechar.
- Cada comando listado produz o efeito esperado (navegação, tema, download, outputs de texto, easter egg).
- Comando desconhecido e `cd` com rota inválida mostram erro sem quebrar a paleta.
- ↑/↓ navegam o histórico de comandos digitados na sessão atual.
- Leitor de tela anuncia as saídas (`aria-live="polite"` na área de log).
