# Unificando Med Portfolio Addition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Unificando Med" project to both `portfolio-ui` (full case study page) and `ui-unificando` (landing page project card), following each repo's existing patterns exactly.

**Architecture:** Both repos already have an established, working pattern for listing projects — `portfolio-ui` uses one `ProjectCase` object per file registered in an array; `ui-unificando` uses a plain array of plain objects rendered by `ProjectsSection`. No new abstractions are introduced; this plan only adds data following those patterns.

**Tech Stack:** Next.js 16 + TypeScript + Tailwind (portfolio-ui), Vite + React + TypeScript + Tailwind (ui-unificando).

## Global Constraints

- Project is not live yet. `liveUrl` / `link` point to `https://med.unificando.com.br` (final production domain, not yet resolving) — this is intentional per spec, not a bug to fix.
- GitHub repo is real and public now: `https://github.com/renatojuniordw/med-unificando`.
- In `ui-unificando`, status must be `"Em desenvolvimento"` with `statusColor: "bg-yellow-500"` (matches the two other unlaunched projects in the same array) — do NOT mark as "No ar".
- In `portfolio-ui`, accent theme is `"ia"` (not `"tech"` or `"barraco"`).
- Content (descriptions, features, stack) must stay factually grounded in `/Users/renatobezerra/Repositórios/Medicine/medicamentos/README.md` — no invented features.
- No screenshots/preview images are in scope.

---

### Task 1: Add SOCIALS.unificando.med constant (portfolio-ui)

**Files:**
- Modify: `/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui/src/lib/constants.ts:21-25`

**Interfaces:**
- Produces: `SOCIALS.unificando.med` (string) — consumed by Task 2.

- [ ] **Step 1: Add the `med` key to the `unificando` object**

Current (lines 21-25):
```ts
  unificando: {
    insta: "https://instagram.com/unificando.digital",
    site: "https://unificando.com.br",
    pdf: "https://pdf.unificando.com.br",
  },
```

New:
```ts
  unificando: {
    insta: "https://instagram.com/unificando.digital",
    site: "https://unificando.com.br",
    pdf: "https://pdf.unificando.com.br",
    med: "https://med.unificando.com.br",
  },
```

- [ ] **Step 2: Verify it compiles**

Run: `cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui" && npx tsc --noEmit`
Expected: no new errors (pre-existing errors, if any, are out of scope).

- [ ] **Step 3: Commit**

```bash
cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui"
git add src/lib/constants.ts
git commit -m "feat: add Unificando Med URL to SOCIALS constants"
```

---

### Task 2: Create the Unificando Med case study (portfolio-ui)

**Files:**
- Create: `/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui/src/lib/projects/unificando-med.tsx`

**Interfaces:**
- Consumes: `SOCIALS.unificando.med` from Task 1; `breadcrumbs`, `card` helpers from `./helpers` (`src/lib/projects/helpers.ts`); `ProjectCase` type from `@/types/project`.
- Produces: named export `unificandoMedCase: ProjectCase` with `id: "unificando-med"` and `pathSegments: ["unificando", "med"]` — consumed by Task 3.

- [ ] **Step 1: Write the file**

```tsx
import {
  Search,
  GitCompare,
  BarChart2,
  ListTree,
  Download,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <div className="space-y-4">
      <p>
        Os dados abertos da <strong>ANVISA</strong> sobre medicamentos
        intercambiáveis são extensos, mas tecnicamente difíceis de navegar —
        pensados para especialistas, não para quem digita o nome comercial de
        um remédio e quer saber quais similares existem, com preço, princípio
        ativo e classificação terapêutica correspondentes.
      </p>
      <p>
        O <strong>Unificando Med</strong> resolve isso com{" "}
        <strong>busca semântica em linguagem natural</strong>, rodando sobre
        um modelo de embeddings executado localmente no servidor — sem
        chamadas a APIs externas de IA. Os dados de medicamentos e preços
        (tabela CMED) são sincronizados automaticamente a partir dos portais
        abertos da ANVISA.
      </p>
    </div>
  );
}

function ArchitectureContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">IA 100% Local</h3>
        <p className="text-sm">
          Embeddings gerados com <code>Xenova Transformers</code> (modelo{" "}
          <code>all-MiniLM-L6-v2</code>, 384 dimensões) via ONNX, direto no
          servidor Node.js. Nenhum dado de busca trafega para provedores
          externos de IA.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Infraestrutura Blindada</h3>
        <p className="text-sm">
          Container de produção com rootfs <code>read-only</code>,{" "}
          <code>no-new-privileges</code>, <code>cap_drop ALL</code> e usuário
          non-root. Rate limiting de 60 req/min nas rotas <code>/api/*</code>.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Autenticação do Admin</h3>
        <p className="text-sm">
          Rotas <code>/admin/*</code> (login e sincronização de dados)
          protegidas via <code>NextAuth v5</code>, isoladas do restante da
          aplicação pública.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Código Orientado a SOLID</h3>
        <p className="text-sm">
          Componentes e Server Actions seguem SRP, OCP e DIP — configurações
          e constantes centralizadas, sem <code>any</code> e sem magic
          numbers.
        </p>
      </div>
    </div>
  );
}

const LIVE_URL = SOCIALS.unificando.med;

export const unificandoMedCase: ProjectCase = {
  id: "unificando-med",
  pathSegments: ["unificando", "med"],
  card: card(
    "unificando-med",
    "Unificando Med",
    "Healthcare / IA",
    "Consulta inteligente de medicamentos intercambiáveis da ANVISA, com busca semântica por IA local e comparação de preços CMED.",
    "ia",
    ["Next.js", "Prisma", "PostgreSQL", "IA Local"],
  ),
  jsonLd: {
    name: "Unificando Med",
    description:
      "Plataforma de consulta de medicamentos intercambiáveis da ANVISA com busca semântica por IA local.",
    url: LIVE_URL,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/med" },
    { name: "Med", item: "/projetos/unificando/med" },
  ),
  categoryBadge: "Healthcare / IA",
  title: "Unificando Med: Medicamentos Intercambiáveis com IA",
  shortDescription: (
    <>
      Consulta de medicamentos intercambiáveis da <strong>ANVISA</strong> com{" "}
      <strong>busca semântica por IA 100% local</strong> — sem chamadas
      externas — e comparação de preços máximos da tabela <strong>CMED</strong>.
    </>
  ),
  themeColor: "ia",
  liveUrl: LIVE_URL,
  githubUrl: "https://github.com/renatojuniordw/med-unificando",
  overviewTitle: "O Desafio",
  overviewContent: <Overview />,
  featuresTitle: "Funcionalidades Principais",
  features: [
    {
      icon: <Search className="text-ia" size={24} aria-hidden="true" />,
      title: "Busca Semântica Local",
      description:
        "Descreva o medicamento em linguagem natural — a busca por embeddings roda no próprio servidor, sem depender de APIs externas de IA.",
    },
    {
      icon: <GitCompare className="text-ia" size={24} aria-hidden="true" />,
      title: "Comparação Lado a Lado",
      description:
        "Compare medicamentos com destaque visual automático das diferenças entre eles.",
    },
    {
      icon: <BarChart2 className="text-ia" size={24} aria-hidden="true" />,
      title: "Preços CMED",
      description:
        "Visualize o preço máximo ao consumidor de cada medicamento em gráfico de barras, direto da tabela CMED.",
    },
    {
      icon: <ListTree className="text-ia" size={24} aria-hidden="true" />,
      title: "Navegação ATC",
      description:
        "Explore medicamentos pela árvore de classificação Anatômica/Terapêutica/Química oficial.",
    },
    {
      icon: <Download className="text-ia" size={24} aria-hidden="true" />,
      title: "Exportação de Dados",
      description:
        "Exporte resultados em CSV e Excel, ou gere um relatório em PDF com a identidade visual do medicamento.",
    },
    {
      icon: <RefreshCw className="text-ia" size={24} aria-hidden="true" />,
      title: "Sincronização Automática",
      description:
        "Importação periódica dos dados abertos de medicamentos e preços diretamente dos portais da ANVISA.",
    },
  ],
  extraSections: [
    {
      id: "architecture-security",
      icon: <ShieldCheck className="text-ia" aria-hidden="true" />,
      title: "Arquitetura & Segurança",
      content: <ArchitectureContent />,
    },
  ],
  sidebarTechStackTitle: "Tecnologias Utilizadas",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js 16 (App Router + Turbopack)" },
    { label: "Linguagem", name: "TypeScript 5" },
    { label: "Banco de Dados", name: "PostgreSQL 16 + Prisma 7" },
    { label: "Autenticação", name: "NextAuth v5" },
    { label: "IA (embeddings)", name: "Xenova Transformers (ONNX local)" },
    { label: "PDF", name: "pdfmake (server-side)" },
    { label: "Infraestrutura", name: "Docker Compose (multi-stage)" },
  ],
};
```

- [ ] **Step 2: Verify it compiles and lints**

Run: `cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui" && npx tsc --noEmit && npm run lint -- src/lib/projects/unificando-med.tsx`
Expected: no errors. (The file won't be reachable yet until Task 3 registers it — `tsc --noEmit` still type-checks it as part of the project.)

- [ ] **Step 3: Commit**

```bash
cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui"
git add src/lib/projects/unificando-med.tsx
git commit -m "feat: add Unificando Med project case study content"
```

---

### Task 3: Register the case in the projects list (portfolio-ui)

**Files:**
- Modify: `/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui/src/lib/project-cases.tsx`

**Interfaces:**
- Consumes: `unificandoMedCase` from Task 2 (`./projects/unificando-med`).
- Produces: `unificandoMedCase` included in the exported `PROJECT_CASES` array — consumed by `src/lib/projects.ts` (`PROJECTS` list, already generic) and by `getProjectCaseByPath`, so `/projetos` and `/projetos/unificando/med` both pick it up automatically. No changes needed in those consumer files.

- [ ] **Step 1: Add the import**

Current (top of file):
```tsx
import { unificandoPdfCase } from "./projects/unificando-pdf";
import { unificandoAutomacaoCase } from "./projects/unificando-automacao";
import { unificandoVitrineCase } from "./projects/unificando-vitrine";
```

New:
```tsx
import { unificandoPdfCase } from "./projects/unificando-pdf";
import { unificandoAutomacaoCase } from "./projects/unificando-automacao";
import { unificandoVitrineCase } from "./projects/unificando-vitrine";
import { unificandoMedCase } from "./projects/unificando-med";
```

- [ ] **Step 2: Add it to the `PROJECT_CASES` array, grouped with the other Unificando projects**

Current:
```tsx
export const PROJECT_CASES: ProjectCase[] = [
  unificandoPdfCase,
  unificandoAutomacaoCase,
  unificandoVitrineCase,
  mariaClaraSantosCase,
```

New:
```tsx
export const PROJECT_CASES: ProjectCase[] = [
  unificandoPdfCase,
  unificandoAutomacaoCase,
  unificandoVitrineCase,
  unificandoMedCase,
  mariaClaraSantosCase,
```

- [ ] **Step 3: Verify the build succeeds**

Run: `cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui" && npm run build`
Expected: build completes successfully, including a statically generated route for `/projetos/unificando/med`.

- [ ] **Step 4: Manually verify in dev server**

Run: `cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui" && npm run dev`
Open `http://localhost:3000/projetos` — confirm "Unificando Med" card appears.
Open `http://localhost:3000/projetos/unificando/med` — confirm the full case study page renders (header, overview, 6 features, architecture section, tech stack sidebar, GitHub + live buttons). Stop the dev server after checking.

- [ ] **Step 5: Commit**

```bash
cd "/Users/renatobezerra/Repositórios/Portfolios/portfolio-ui"
git add src/lib/project-cases.tsx
git commit -m "feat: register Unificando Med in the project list"
```

---

### Task 4: Add Unificando Med card to the company landing page (ui-unificando)

**Files:**
- Modify: `/Users/renatobezerra/Repositórios/Portfolios/ui-unificando/src/features/home/components/ProjectsSection.tsx:4-34`

**Interfaces:**
- None (self-contained — adds one object to the local `projects` array consumed only within this file's render).

- [ ] **Step 1: Insert the new project object as the second array entry**

Current (lines 4-19):
```tsx
const projects = [
  {
    title: "PDF Unificando",
    status: "No ar",
    statusColor: "bg-green-500",
    description: "Suíte de 16 ferramentas PDF gratuitas — comprimir, juntar, converter, dividir e mais.",
    link: "https://pdf.unificando.com.br",
    tags: ["Next.js", "PDF-lib", "IA"],
  },
  {
    title: "Sistema de Afiliados",
    status: "Em desenvolvimento",
    statusColor: "bg-yellow-500",
    description: "Plataforma inteligente para gestão e monitoramento de afiliados com IA.",
    tags: ["React", "IA", "Em breve"],
  },
```

New:
```tsx
const projects = [
  {
    title: "PDF Unificando",
    status: "No ar",
    statusColor: "bg-green-500",
    description: "Suíte de 16 ferramentas PDF gratuitas — comprimir, juntar, converter, dividir e mais.",
    link: "https://pdf.unificando.com.br",
    tags: ["Next.js", "PDF-lib", "IA"],
  },
  {
    title: "Unificando Med",
    status: "Em desenvolvimento",
    statusColor: "bg-yellow-500",
    description: "Consulta inteligente de medicamentos intercambiáveis da ANVISA com busca semântica por IA local.",
    link: "https://med.unificando.com.br",
    tags: ["Next.js", "IA", "ANVISA"],
  },
  {
    title: "Sistema de Afiliados",
    status: "Em desenvolvimento",
    statusColor: "bg-yellow-500",
    description: "Plataforma inteligente para gestão e monitoramento de afiliados com IA.",
    tags: ["React", "IA", "Em breve"],
  },
```

- [ ] **Step 2: Verify the build succeeds**

Run: `cd "/Users/renatobezerra/Repositórios/Portfolios/ui-unificando" && npm run build`
Expected: build completes successfully with no errors.

- [ ] **Step 3: Manually verify in dev server**

Run: `cd "/Users/renatobezerra/Repositórios/Portfolios/ui-unificando" && npm run dev`
Open the local URL shown in the terminal, scroll to the "O QUE CONSTRUÍMOS" section — confirm "Unificando Med" appears as the second card with the yellow "Em desenvolvimento" badge and an "Acessar Projeto →" link. Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
cd "/Users/renatobezerra/Repositórios/Portfolios/ui-unificando"
git add src/features/home/components/ProjectsSection.tsx
git commit -m "feat: add Unificando Med to projects section"
```

---

## Post-Launch Follow-up (not part of this plan)

Once `med.unificando.com.br` is live in production:
- `ui-unificando`: change `status` to `"No ar"` and `statusColor` to `"bg-green-500"` for the Unificando Med entry.
- `portfolio-ui`: no change needed — `liveUrl` already points to the correct final domain.
