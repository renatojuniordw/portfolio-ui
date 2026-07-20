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
