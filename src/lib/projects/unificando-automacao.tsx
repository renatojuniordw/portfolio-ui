import { ArrowRight, Cpu, Layout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { organizationJsonLd } from "@/lib/structured-data";
import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card, projectPath, UNIFICANDO_AUTHORIAL_ROLE } from "./helpers";

function Overview() {
  return (
    <p>
      O <strong>Unificando</strong> é um laboratório de projetos autorais, e a
      camada de <strong>IA aplicada</strong> é o que liga todos eles. O desafio
      foi fazer isso com <strong>privacidade por design</strong> e{" "}
      <strong>custo sob controle</strong>: embeddings rodando localmente,
      defesas contra prompt injection e fontes oficiais integradas por{" "}
      <strong>Model Context Protocol (MCP)</strong>.
    </p>
  );
}

function DecisionIntelligenceContent() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">
          Busca Semântica 100% Local
        </h3>
        <p>
          No Med Unificando, os embeddings (ONNX) rodam no próprio servidor:
          a busca em linguagem natural funciona sem enviar dados a APIs
          externas de IA.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">
          MCP: Produtos que Agentes Conseguem Usar
        </h3>
        <p>
          O Med expõe um servidor MCP com 12 ferramentas somente leitura, e o
          Radar consome vagas da Gupy via MCP com fallback automático. Os
          produtos servem tanto a pessoas quanto a <strong>agentes de IA</strong>.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">
          Robustez e Custo de IA
        </h3>
        <p>
          Defesa em três camadas contra prompt injection, limites de custo
          (controle de tokens e filas) e LGPD por design em produtos em
          produção.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">
          Hub de Conhecimento com RAG
        </h3>
        <p>
          O hub do ecossistema indexa a documentação dos projetos em pgvector
          e combina busca vetorial, textual e fuzzy (RRF). Ele entrega o
          resultado por REST, CLI e servidor MCP.
        </p>
      </div>
    </>
  );
}

function VitrineCard() {
  return (
    <>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        Quer conhecer o site do laboratório, com os produtos, ferramentas
        abertas e frentes de P&D da marca?
      </p>
      <Button variant="outline" size="sm" className="w-full rounded-full" asChild>
        <a href={projectPath("unificando", "vitrine")}>
          Ver Vitrine Digital <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </>
  );
}

export const unificandoAutomacaoCase: ProjectCase = {
  id: "unificando-automacao",
  pathSegments: ["unificando", "automacao"],
  schemas: [organizationJsonLd()],
  card: card(
    "unificando-automacao",
    "Unificando: IA & Automação",
    "Inteligência Artificial",
    "Camada de IA aplicada do laboratório: embeddings locais, RAG, servidores MCP e defesas contra prompt injection.",
    "ia",
    ["RAG", "MCP", "pgvector", "ONNX"],
    { group: "unificando", areas: ["ia", "automacao"] },
  ),
  jsonLd: {
    name: "Unificando - Automação & IA",
    description:
      "Camada de IA aplicada do laboratório Unificando: embeddings locais, RAG, servidores MCP e defesas contra prompt injection.",
    url: `${SOCIALS.personal.site}/projetos/unificando/automacao`,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/automacao" },
    { name: "Automação", item: "/projetos/unificando/automacao" },
  ),
  categoryBadge: "IA & Automação",
  role: UNIFICANDO_AUTHORIAL_ROLE,
  title: "Unificando: IA & Automação",
  shortDescription: (
    <>
      A <strong>engenharia de IA</strong> por trás do laboratório:{" "}
      <strong>busca semântica local</strong>, <strong>RAG</strong>,{" "}
      <strong>servidores MCP</strong> e defesas contra prompt injection em
      produtos reais.
    </>
  ),
  themeColor: "ia",
  liveUrl: SOCIALS.unificando.site,
  overviewTitle: "O Desafio: IA Aplicada com Privacidade e Custo Sob Controle",
  overviewContent: <Overview />,
  caseStudy: {
    challenge: (
      <p>
        Produtos com IA costumam depender de APIs externas: isso expõe dados
        sensíveis, torna o custo imprevisível e abre espaço para{" "}
        <strong>prompt injection</strong>. O laboratório precisava mostrar IA
        útil sem esses riscos, em produtos gratuitos e sustentáveis.
      </p>
    ),
    solution: (
      <p>
        Usei <strong>embeddings locais (ONNX)</strong> para a busca semântica,
        defesa em <strong>três camadas</strong> contra prompt injection,
        integração com fontes oficiais via <strong>MCP</strong> com fallback
        automático e um <strong>hub com RAG</strong> (pgvector) que indexa a
        documentação do ecossistema para humanos, CLIs e agentes.
      </p>
    ),
    result: (
      <p>
        Produtos no ar que demonstram a abordagem: o{" "}
        <a href={projectPath("unificando", "med")}>Med Unificando</a>, com
        busca 100% local e MCP próprio, e o{" "}
        <a href={projectPath("unificando", "radar")}>Radar Unificando</a>, com
        assistente de carreira por IA.
      </p>
    ),
  },
  extraSections: [
    {
      id: "tech-highlights-title",
      icon: <Cpu className="text-ia" aria-hidden="true" />,
      title: "Inteligência de Decisão",
      content: <DecisionIntelligenceContent />,
    },
  ],
  sidebarTechStackTitle: "Tech Stack",
  sidebarTechStack: [
    { label: "Embeddings", name: "ONNX local (Transformers.js)" },
    { label: "Vetores", name: "PostgreSQL + pgvector" },
    { label: "Agentes", name: "Model Context Protocol (MCP)" },
    { label: "Hub", name: "NestJS 11 + Prisma 7" },
  ],
  sidebarExtraCards: [
    {
      icon: <Layout size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Vitrine Digital",
      content: <VitrineCard />,
    },
  ],
};
