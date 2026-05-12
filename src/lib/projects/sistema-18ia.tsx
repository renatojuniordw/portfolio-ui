import { BarChart2, Globe, MousePointerClick, ShoppingCart, Zap, Code2 } from "lucide-react";

import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

const LIVE_URL = "https://18ia.meucria.com.br/";

function Overview() {
  return (
    <>
      <p>
        O cliente vendia um produto digital — uma coleção de{" "}
        <strong>18 prompts industriais de refatoração de código</strong> voltados
        a desenvolvedores React, Next.js e NestJS — mas não tinha uma página
        capaz de converter o tráfego orgânico em vendas reais.
      </p>
      <p>
        O desafio era construir uma <strong>landing page de alta conversão</strong>{" "}
        que transmitisse autoridade técnica ao público desenvolvedor, criasse
        percepção de valor imediata e guiasse o visitante até o checkout com o
        mínimo de fricção possível.
      </p>
    </>
  );
}

function ConversionContent() {
  return (
    <>
      <div className="space-y-2 text-lg">
        <h3 className="text-lg font-bold text-text">Copywriting Técnico</h3>
        <p>
          A comunicação foi estruturada em linguagem de terminal e snippets de
          código, criando identificação imediata com o público-alvo de
          desenvolvedores e aumentando a credibilidade da oferta.
        </p>
      </div>
      <div className="space-y-2 text-lg">
        <h3 className="text-lg font-bold text-text">
          Mecânicas de Urgência e Escassez
        </h3>
        <p>
          Implementação de countdown timer e contador de vagas disponíveis para
          reduzir o tempo de decisão e aumentar a taxa de conversão por sessão.
        </p>
      </div>
      <div className="space-y-2 text-lg">
        <h3 className="text-lg font-bold text-text">Prova Social Quantificada</h3>
        <p>
          Seção de resultados com métricas reais e comparativos antes/depois
          (código legado → otimizado), dando ao visitante evidências concretas
          de ROI antes da compra.
        </p>
      </div>
    </>
  );
}

function LinksCard() {
  return (
    <nav className="flex flex-col gap-3">
      <SocialLinkCard
        href={LIVE_URL}
        icon={Globe}
        label="Landing Page"
        hoverAccentClass="group-hover:bg-tech"
      />
    </nav>
  );
}

export const sistema18iaCase: ProjectCase = {
  id: "18ia",
  pathSegments: ["18ia"],
  card: card(
    "18ia",
    "Sistema 18IA",
    "Produto Digital / CRO",
    "Landing page de alta conversão para venda de produto digital técnico, com copywriting em linguagem de dev, mecânicas de urgência e checkout integrado.",
    "tech",
    ["Next.js", "React", "Tailwind CSS", "Kirvano"],
  ),
  jsonLd: {
    name: "Sistema 18IA - Landing Page de Produto Digital",
    description:
      "Landing page de alta conversão para venda de prompts industriais de refatoração, com design orientado a CRO e integração com plataforma de pagamento.",
    url: LIVE_URL,
  },
  breadcrumbs: breadcrumbs({ name: "Sistema 18IA", item: "/projetos/18ia" }),
  categoryBadge: "Produto Digital / CRO",
  title: "Sistema 18IA",
  shortDescription: (
    <>
      Landing page de <strong>alta conversão</strong> para produto digital
      técnico, com copywriting orientado a desenvolvedor,{" "}
      <strong>mecânicas de urgência</strong> e checkout integrado via Kirvano.
    </>
  ),
  themeColor: "tech",
  liveUrl: LIVE_URL,
  overviewTitle: "O Desafio",
  overviewContent: <Overview />,
  featuresTitle: "Estratégia de Conversão",
  features: [
    {
      icon: <MousePointerClick className="text-tech" aria-hidden="true" />,
      title: "CRO Orientado a Dev",
      description:
        "Hierarquia visual e copywriting em linguagem de terminal que geram identificação imediata com o público desenvolvedor.",
    },
    {
      icon: <Zap className="text-tech" aria-hidden="true" />,
      title: "Urgência e Escassez",
      description:
        "Countdown timer e contador de licenças disponíveis para reduzir o ciclo de decisão do visitante.",
    },
    {
      icon: <BarChart2 className="text-tech" aria-hidden="true" />,
      title: "Prova Social Técnica",
      description:
        "Comparativos antes/depois com métricas reais (Lighthouse, horas poupadas) para construir confiança e percepção de ROI.",
    },
    {
      icon: <ShoppingCart className="text-tech" aria-hidden="true" />,
      title: "Checkout de Baixa Fricção",
      description:
        "Integração com a plataforma Kirvano para entrega imediata do produto digital após confirmação do pagamento.",
    },
  ],
  extraSections: [
    {
      id: "conversion-strategy",
      icon: <Code2 className="text-tech" aria-hidden="true" />,
      title: "Diferenciais de Engenharia de Conversão",
      content: <ConversionContent />,
    },
  ],
  sidebarTechStackTitle: "Solução Técnica",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js (App Router)" },
    { label: "UI Library", name: "React + TypeScript" },
    { label: "Styling", name: "Tailwind CSS" },
    { label: "Pagamento & Entrega", name: "Kirvano" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech" aria-hidden="true" />,
      title: "Links",
      content: <LinksCard />,
    },
  ],
};
