import { ArrowRight, Bot, FlaskConical, Github, Globe, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card, projectPath, UNIFICANDO_AUTHORIAL_ROLE } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        O site do <strong>Unificando</strong> é a vitrine do{" "}
        <strong>laboratório de projetos autorais &amp; IA</strong>: um único
        lugar que reúne os produtos no ar (PDF, Med e Radar), as ferramentas
        abertas (pacotes npm e servidor MCP) e as frentes de pesquisa e
        desenvolvimento por trás deles.
      </p>
      <p>
        Cada projeto publicado funciona como prova prática de conhecimento em{" "}
        <strong>IA aplicada</strong>, automação e engenharia web — o site
        organiza essa evidência e a torna fácil de encontrar, tanto para pessoas
        quanto para buscadores e agentes de IA.
      </p>
    </>
  );
}

function TechnicalResultsContent() {
  return (
    <>
      <p className="text-text-secondary">
        Front-end em <strong>React 19</strong> e <strong>TypeScript</strong>{" "}
        estrito, com rotas carregadas sob demanda, conteúdo separado da
        apresentação e <strong>SEO técnico</strong> pensado desde o início:
        sitemap gerado no build, dados estruturados (JSON-LD) e{" "}
        <code>llms.txt</code> para crawlers de IA.
      </p>
      <div className="pt-4 mt-6 border-t border-tech/20">
        <p className="text-sm text-text-secondary italic mb-3">
          Quer ver a engenharia de IA por trás do laboratório?
        </p>
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <a href={projectPath("unificando", "automacao")}>
            Ver Case de Automação & IA{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </>
  );
}

function LinksCard() {
  return (
    <nav className="flex flex-col gap-3">
      <SocialLinkCard
        href={SOCIALS.unificando.site}
        icon={Globe}
        label="Website Oficial"
        hoverAccentClass="group-hover:bg-tech"
      />
      <SocialLinkCard
        href="https://github.com/renatojuniordw/ui-unificando"
        icon={Github}
        label="Repositório GitHub"
        hoverAccentClass="group-hover:bg-tech"
      />
    </nav>
  );
}

export const unificandoVitrineCase: ProjectCase = {
  id: "unificando-vitrine",
  pathSegments: ["unificando", "vitrine"],
  card: card(
    "unificando-vitrine",
    "Unificando: Vitrine Digital",
    "Laboratório & Vitrine",
    "Site do laboratório Unificando: vitrine dos produtos com IA, ferramentas abertas e frentes de P&D.",
    "tech",
    ["React", "Vite", "TypeScript", "Tailwind"],
    { group: "unificando", areas: ["frontend"] },
  ),
  jsonLd: {
    name: "Unificando - Vitrine Digital",
    description:
      "Site do laboratório Unificando: vitrine de produtos com IA, ferramentas abertas e frentes de P&D, construído com React 19, Vite e Tailwind.",
    url: `${SOCIALS.personal.site}/projetos/unificando/vitrine`,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/automacao" },
    { name: "Vitrine Digital", item: "/projetos/unificando/vitrine" },
  ),
  categoryBadge: "Laboratório & Vitrine Case",
  role: UNIFICANDO_AUTHORIAL_ROLE,
  title: "Unificando: Vitrine Digital",
  shortDescription: (
    <>
      A <strong>vitrine digital</strong> do laboratório Unificando: reúne os{" "}
      <strong>produtos com IA</strong>, as ferramentas abertas e as frentes de{" "}
      <strong>P&amp;D</strong> que demonstram o que a marca sabe fazer.
    </>
  ),
  themeColor: "tech",
  liveUrl: SOCIALS.unificando.site,
  overviewTitle: "Um Laboratório Mostrando o que Faz",
  overviewContent: <Overview />,
  featuresTitle: "O que o Site Reúne",
  features: [
    {
      icon: <Search className="text-tech" />,
      title: "Portfólio de Produtos no Ar",
      description:
        "PDF, Med e Radar Unificando apresentados como demonstrações práticas, cada um com seu subdomínio.",
    },
    {
      icon: <Bot className="text-tech" />,
      title: "Ferramentas Abertas",
      description:
        "Pacotes npm (@unificando/prompts e @unificando/refina) e o servidor MCP do Med para agentes de IA.",
    },
    {
      icon: <FlaskConical className="text-tech" />,
      title: "Frentes de P&D",
      description:
        "Busca semântica 100% local, robustez contra prompt injection, MCP com fontes oficiais e engenharia de custo de IA.",
    },
  ],
  extraSections: [
    {
      id: "technical-results",
      title: "Resultados Técnicos",
      content: <TechnicalResultsContent />,
    },
  ],
  sidebarTechStackTitle: "Stack Tecnológica",
  sidebarTechStack: [
    { label: "Core", name: "React 19 / TS 5.8" },
    { label: "Styling", name: "Tailwind CSS 4" },
    { label: "Build Tool", name: "Vite 6" },
    { label: "Animação", name: "Framer Motion 12" },
    { label: "Roteamento", name: "React Router 7" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech mr-2" />,
      title: "Links",
      content: <LinksCard />,
    },
  ],
};
