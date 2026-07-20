# Unificando Med — Adição aos Portfólios

**Data**: 2026-07-20
**Repos afetados**: `portfolio-ui` (case study completo) e `ui-unificando` (card curto)
**Projeto de origem**: `/Users/renatobezerra/Repositórios/Medicine/medicamentos` — "Unificando Med", consulta de medicamentos intercambiáveis ANVISA com busca semântica por IA local. Ainda em desenvolvimento (dev em `localhost:11006`), URL final `https://med.unificando.com.br`, repo público `https://github.com/renatojuniordw/med-unificando`.

## Objetivo

Adicionar o projeto Unificando Med aos dois portfólios existentes, respeitando o formato de apresentação de cada um:

- **portfolio-ui**: case study individual completo (padrão dos outros projetos Unificando: PDF, Automação, Vitrine).
- **ui-unificando**: card resumido na seção de projetos da landing page, com status "Em desenvolvimento".

O projeto ainda não está no ar publicamente, mas o link final (`med.unificando.com.br`) e o repositório GitHub já podem ser referenciados desde já — serão atualizados quando o deploy de produção estiver disponível.

## 1. portfolio-ui

### `src/lib/constants.ts`
Adicionar `med: "https://med.unificando.com.br"` dentro de `SOCIALS.unificando`.

### `src/lib/projects/unificando-med.tsx` (novo arquivo)
Seguir o padrão de `unificando-pdf.tsx` / `sistema-18ia.tsx`.

- `id`: `"unificando-med"`
- `pathSegments`: `["unificando", "med"]`
- `card`: categoria "Healthcare / IA", accent `"ia"`, techs `["Next.js", "Prisma", "PostgreSQL", "IA Local"]`, descrição curta sobre busca semântica de medicamentos intercambiáveis
- `jsonLd` / `breadcrumbs`: seguindo helpers existentes (`breadcrumbs`, `card`)
- `categoryBadge`: "Healthcare / IA"
- `shortDescription`: menciona busca semântica com IA 100% local (sem chamadas externas) e comparação de preços CMED
- **Overview** ("O Desafio"): dados abertos da ANVISA sobre medicamentos intercambiáveis são extensos e tecnicamente difíceis de navegar; usuários buscam em linguagem natural, não por nomenclatura farmacêutica. Solução: busca semântica com embeddings gerados localmente (Xenova/all-MiniLM-L6-v2, ONNX), sincronização automática dos dados abertos ANVISA/CMED, navegação por classificação ATC.
- **Features** (grid, ícones lucide-react):
  1. Busca Semântica Local — embeddings rodando 100% no servidor, sem API externa, sem custo por consulta e sem dados saindo da infraestrutura
  2. Comparação Lado a Lado — destaque visual de diferenças entre medicamentos
  3. Preços CMED — visualização em gráfico de barras dos preços máximos ao consumidor
  4. Navegação ATC — árvore de classificação Anatômica/Terapêutica/Química
  5. Exportação de Dados — CSV, Excel e relatório em PDF por medicamento
  6. Sincronização Automática — importação periódica dos dados abertos ANVISA
- **Extra section**: "Arquitetura & Segurança" — Docker com rootfs read-only, non-root, `cap_drop ALL`, rate limiting nas rotas de API, autenticação via NextAuth nas rotas `/admin`, código orientado a princípios SOLID (citado no README do projeto)
- **Sidebar tech stack**: Next.js 16 (App Router + Turbopack), TypeScript 5, PostgreSQL 16 + Prisma 7, NextAuth v5, Xenova Transformers (ONNX local), pdfmake (PDF server-side), Docker Compose multi-stage
- `liveUrl`: `SOCIALS.unificando.med`
- `githubUrl`: `"https://github.com/renatojuniordw/med-unificando"`

### `src/lib/project-cases.tsx`
Importar `unificandoMedCase` e adicionar ao array `PROJECT_CASES` (logo após `unificandoVitrineCase`, mantendo os projetos Unificando agrupados).

## 2. ui-unificando

### `src/features/home/components/ProjectsSection.tsx`
Adicionar um novo objeto ao array `projects`, na posição 2 (logo após "PDF Unificando", antes de "Sistema de Afiliados") — por ser o projeto mais próximo de ir ao ar:

```js
{
  title: "Unificando Med",
  status: "Em desenvolvimento",
  statusColor: "bg-yellow-500",
  description: "Consulta inteligente de medicamentos intercambiáveis da ANVISA com busca semântica por IA local.",
  link: "https://med.unificando.com.br",
  tags: ["Next.js", "IA", "ANVISA"],
}
```

## Fora de escopo

- Alterar o status para "No ar" / trocar cores — será feito quando o deploy de produção existir.
- Qualquer mudança no projeto `Medicine/medicamentos` em si.
- Screenshots ou imagens de preview do projeto (não solicitado).
