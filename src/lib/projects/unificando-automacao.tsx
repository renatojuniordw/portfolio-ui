import { ArrowRight, Cpu, Layout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { organizationJsonLd } from "@/lib/structured-data";
import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card, projectPath } from "./helpers";

function Overview() {
  return (
    <p>
      O desafio central do <strong>Unificando</strong> foi criar um{" "}
      <strong>painel de atendimento</strong> que não apenas respondesse usuários,
      mas que entendesse a intenção de compra, calculasse orçamentos em tempo
      real no <strong>atendimento WhatsApp</strong> e soubesse o momento exato de
      transferir para um humano.
    </p>
  );
}

function DecisionIntelligenceContent() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">
          Roteamento Inteligente (Triage Agent)
        </h3>
        <p>
          Desenvolvi um agente de triagem baseado em LLM que classifica intenções
          (Lead, FAQ, Pricing, Human) em milissegundos, para um{" "}
          <strong>atendimento WhatsApp com IA</strong> mais fluido.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">Arquitetura Dual-Agent</h3>
        <p>
          Implementação de sub-agentes especializados que consultam bases de
          conhecimento dinâmicas, reduzindo a carga do suporte humano através da{" "}
          <strong>automação com IA</strong>.
        </p>
      </div>
    </>
  );
}

function VitrineCard() {
  return (
    <>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        Interessado na experiência visual e na calculadora de serviços deste
        projeto?
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
    "Engine de atendimento distribuído, orquestração de LLMs e automação de fluxos via n8n.",
    "ia",
    ["n8n", "OpenAI", "Node.js", "AWS Lambda"],
  ),
  jsonLd: {
    name: "Unificando - Automação & IA",
    description:
      "Ecossistema de atendimento inteligente com orquestração de LLMs e automação de processos via n8n.",
    url: `${SOCIALS.personal.site}/projetos/unificando/automacao`,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/automacao" },
    { name: "Automação", item: "/projetos/unificando/automacao" },
  ),
  categoryBadge: "IA & Automação",
  title: "Unificando: IA & Automação",
  shortDescription: (
    <>
      Ecossistema completo de <strong>atendimento inteligente</strong> para redes
      sociais, transformando <strong>caixa de entrada unificada</strong> em
      conversões reais com <strong>automação com IA</strong>.
    </>
  ),
  themeColor: "ia",
  liveUrl: SOCIALS.unificando.site,
  overviewTitle: "O Desafio Técnico: Atendimento WhatsApp",
  overviewContent: <Overview />,
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
    { label: "Orchestration", name: "n8n" },
    { label: "AI Engine", name: "OpenAI (GPT-4)" },
    { label: "Database", name: "Supabase" },
  ],
  sidebarExtraCards: [
    {
      icon: <Layout size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Vitrine Digital",
      content: <VitrineCard />,
    },
  ],
};
