---
title: "OpenSpec com Claude Code: combine o que construir antes de gerar código"
description: "Como usar o OpenSpec para transformar a conversa com a IA em arquivos Markdown versionados no Git: estrutura de pastas, comandos /opsx, fluxo propose → apply → archive, integração com Jira e Figma e a regra de ouro: o plano muda antes do código."
date: "2026-11-17"
tags:
  - IA
  - Claude Code
  - OpenSpec
  - Engenharia de Software
readingTime: "8 min"
---

## O problema: cada dev pede de um jeito

Quando um time começa a programar com IA, três problemas aparecem rápido:

- **Cada dev pede de um jeito.** O mesmo requisito vira prompts diferentes, e prompts diferentes viram resultados diferentes.
- **O porquê se perde.** O código muda, mas ninguém registra a decisão por trás dele.
- **Pedido diferente da entrega.** A divergência só aparece no review, quando corrigir já custa caro.

O [OpenSpec](https://openspec.dev/docs) ataca isso com uma ideia simples: uma **camada de acordo entre o time e a IA**. Você combina *o que construir* antes de gerar código, e esse combinado fica em arquivos.

Em três passos:

1. **Alinhar:** você e a IA definem o que será feito, em texto.
2. **Registrar:** tudo em Markdown, versionado no Git, visível para o time inteiro.
3. **Implementar:** o código nasce de um plano que já foi revisado.

Para ter uma ideia da escala do problema: uma única tela de criação de evento, num projeto em que trabalhei, acumulou mais de 12 decisões de design: bloqueio da tela, rascunho versus evento salvo, o que o botão "Excluir" faz. Sem registro, ninguém lembraria o porquê de nenhuma delas dali a um mês.

## Como fica no projeto

O OpenSpec adiciona duas pastas ao repositório:

```text
openspec/
├── config.yaml                 ← contexto do projeto e regras para a IA
├── specs/                      ← estado atual do sistema (fonte da verdade)
└── changes/                    ← mudanças em andamento
    ├── minha-change/
    │   ├── proposal.md
    │   ├── design.md
    │   ├── tasks.md
    │   └── specs/<capability>/spec.md
    └── archive/                ← mudanças concluídas, como histórico

.claude/
├── commands/opsx/              ← /opsx:explore, /opsx:propose, /opsx:apply...
└── skills/openspec-*/          ← as mesmas instruções, acionáveis pelo Claude
```

Cada arquivo em `commands/opsx/` vira um comando (`/opsx:propose`, `/opsx:apply`...). As skills em `skills/openspec-*` carregam as mesmas instruções, e o Claude pode acioná-las sozinho. Como tudo isso é commitado, o time inteiro recebe o mesmo fluxo.

### Anatomia de uma change

Cada mudança vira uma pasta com quatro artefatos:

| Artefato | Papel | Exemplo |
|---|---|---|
| `proposal.md` | Por que a mudança existe e o que muda | "O botão 'Novo evento' só inseria uma linha placeholder; esta change é a base da história maior" |
| Specs (deltas) | Requisitos adicionados, alterados ou removidos | Capability nova `event-creation`, com requisitos como estado bloqueado e validação do nome |
| `design.md` | Decisões técnicas, numeradas | Rota nova (Decisão 1), dois níveis de "salvo" (Decisão 18), "Excluir" sem backend (Decisão 19) |
| `tasks.md` | Checklist da implementação, marcado pelo `apply` | `[x] 2.1 useEventCreation.ts retornando { data, actions }` |

## CLAUDE.md e OpenSpec se complementam

Os dois resolvem problemas diferentes:

- **`CLAUDE.md`** guarda as regras **permanentes** do time: biblioteca de componentes, padrão de hooks, `data-testid`, idioma da interface.
- **`openspec/`** guarda o que **muda neste ticket**.

Quando funciona bem, o `design.md` cita componentes e tokens que já existem (um `Drawer`, um hook de bloqueio de navegação, um token de cor), porque a regra "pesquise antes de criar" do `CLAUDE.md` foi aplicada ao plano.

## Os comandos

O perfil padrão tem seis comandos:

| Comando | Função |
|---|---|
| `/opsx:explore` | Pensar na ideia, sem criar nada |
| `/opsx:propose` | Cria a change com todos os artefatos: proposal, specs, design e tasks |
| `/opsx:update` | Revisa o plano da change antes do código |
| `/opsx:apply` | Implementa as tasks e marca o progresso |
| `/opsx:sync` | Leva os deltas da change para `specs/`, sem arquivar |
| `/opsx:archive` | Move a change para o histórico |

Há comandos opcionais (`new`, `continue`, `ff`, `verify`, `bulk-archive`, `onboard`) que você ativa com `openspec config profile`.

Uma confusão comum: o `update` ajusta o **plano de uma change**. Quem leva a mudança para a spec principal em `openspec/specs/` é o `sync` ou o próprio `archive`.

## O fluxo

```text
explore → propose → update → apply → verify → archive
```

`explore` e `verify` são opcionais. Use o `explore` quando a ideia ainda está vaga: pense primeiro, proponha depois.

### Regra de ouro: o plano muda antes do código

Se o requisito mudou, **atualize a change com `/opsx:update` e só depois rode `/opsx:apply`**. Nunca o contrário.

Num caso real, o fluxo mudou de "drawer na aba de eventos" para "navega direto para uma tela bloqueada". O `design.md` registrou a troca explicitamente, com a frase "replaces the earlier decision", e só então o código seguiu. Meses depois, quem abrir a change entende não só o que existe, mas o que foi descartado e por quê.

### A spec acha contradições antes do código

Escrever o plano obriga a confrontar as fontes. No mesmo `design.md`, duas divergências apareceram antes de qualquer linha de código:

- **`CLAUDE.md` × código:** o `CLAUDE.md` citava um parâmetro de query `?integration=<id>`, mas o código usava `integrationId` e `integrationName`.
- **Jira × história colada:** o Jira pedia só o nome do evento, enquanto a história colada pedia também a data de início.

Sem a etapa de planejamento, a IA escolheria uma das versões em silêncio, e a divergência só seria descoberta no review.

### Terminou? Verifique e arquive

Antes de arquivar, rode as verificações do projeto: lint, testes, build e, se houver, E2E. Com tudo verde:

```text
/opsx:archive nome-da-change
```

O comando avisa se houver tasks incompletas e pergunta se deve sincronizar os deltas com as specs. O resultado:

- `specs/` passa a refletir o sistema real;
- o histórico fica guardado em `archive/`;
- a lista de changes ativas fica limpa.

### Mais de uma change ao mesmo tempo

Cada change tem seu nome, e os comandos aceitam esse nome: `/opsx:update nome`, `/opsx:apply nome`. Minha sugestão para times é **uma change por ticket**, com o código do ticket no nome, por exemplo `PROJ-123-filtro-pedidos`.

## Jira e Figma

### Jira

Com o conector do Claude para Jira, a IA lê o ticket (descrição, critérios de aceite e comentários) e já parte dele:

```text
/opsx:propose PROJ-123
```

Um detalhe: o conector lê o **texto** do ticket, incluindo o link do Figma, mas não abre o design pelo link.

### Figma sem MCP

Quando o MCP do Figma não está disponível, a API REST com um token pessoal resolve. Para o JSON de uma section:

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<FILE_KEY>/nodes?ids=<NODE_ID>" \
  -o secao.json
```

E para uma imagem PNG da mesma section:

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/<FILE_KEY>?ids=<NODE_ID>&format=png&scale=2"
```

O segundo comando devolve uma URL da imagem, que precisa ser baixada. Essas URLs expiram. Alguns cuidados:

- No link do Figma o `node-id` aparece com hífen (`15695-162167`); na API é com dois-pontos (`15695:162167`).
- O token é pessoal, de preferência somente leitura, e **não vai para o Git**.
- O JSON de uma section inteira pode ser enorme. Reduzir com `depth` ou `jq` melhora o resultado e economiza contexto.
- O JSON é um retrato do momento: se o design mudar, busque de novo.

### Sem acesso ao Figma, registre a lacuna

Numa das changes, o Figma não estava acessível na sessão. O `design.md` registrou isso com todas as letras: os detalhes de layout vieram apenas do Jira. Mais tarde, as decisões seguintes foram alinhadas com os frames do Figma.

O recado vale para qualquer contexto incompleto: **o plano deve registrar o que não se sabe**, em vez de fingir que sabe.

### Ajustando o layout depois

Dois caminhos funcionaram na prática:

1. Trazer o JSON da section pela API para o contexto.
2. Tirar um print do Figma, comparar com a tela implementada, pedir ao Claude a lista de diferenças e levar essa lista para o `/opsx:update`. Depois, o `apply` ajusta o código.

## Como o resto do time entra

Depois que o OpenSpec foi instalado e commitado, o onboarding de cada pessoa leva poucos minutos:

1. `git pull` (traz `openspec/` e `.claude/`).
2. `npm install -g @fission-ai/openspec@latest` (Node 20.19 ou superior, uma vez por máquina).
3. `openspec --version` para confirmar que a CLI está no PATH.
4. `openspec update`, só se a versão for diferente da do projeto.
5. Reiniciar o Claude Code e testar `/opsx:`.

Não é preciso rodar `init` de novo.

## Quatro dicas para tirar mais proveito

1. **Preencha o `config.yaml`.** Em muitos projetos ele fica só com o template comentado. Use `context:` para regras que a IA não infere sozinha (artefatos em inglês, textos de UI em português, nada de novo gerenciador de estado sem proposta) e `rules:` por artefato.
2. **Use o `explore` antes** quando a ideia ainda está vaga.
3. **Siga um mini-template de descrição:** problema, comportamento esperado, critérios de aceite e o que está fora do escopo.
4. **Gere a descrição do que já existe** com a extensão do Chrome do Claude e use o resultado para alimentar o `update`.

## Fechando

O ganho do OpenSpec não é gerar código mais rápido. É que o raciocínio por trás do código **deixa de morar na cabeça de quem conversou com a IA** e passa a morar no repositório: revisável em PR, consultável meses depois e igual para todo o time.

Se quiser começar, a [documentação oficial](https://openspec.dev/docs) é o melhor ponto de partida. A lista de comandos mudou entre versões (o fluxo antigo usava `/openspec:*`), então confira lá o que vale na versão que você instalar.
