import { ArrowRight, Cpu, Github, Globe, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card, projectPath } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        O site do <strong>Unificando</strong> foi projetado para ser a face
        digital de um ecossistema de atendimento. Ele funciona como uma{" "}
        <strong>vitrine interativa</strong> onde o usuário pode simular cenários e
        entender custos.
      </p>
      <p>
        A tecnologia (React 19 + Vite 6) garante autoridade através de{" "}
        <strong>performance absoluta</strong>.
      </p>
    </>
  );
}

function TechnicalResultsContent() {
  return (
    <>
      <p className="text-text-secondary">
        Utilizando <strong>React 19</strong>, o site atinge pontuações máximas em{" "}
        <strong>Core Web Vitals</strong>.
      </p>
      <div className="pt-4 mt-6 border-t border-tech/20">
        <p className="text-sm text-text-secondary italic mb-3">
          Quer saber sobre a Engenharia de IA por trás da marca?
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
    "Branding & Conversão",
    "Site institucional interativo com foco em autoridade de marca e calculadora de planos em tempo real.",
    "tech",
    ["Next.js", "React", "TypeScript", "Tailwind"],
  ),
  jsonLd: {
    name: "Unificando - Vitrine Digital",
    description:
      "Desenvolvimento de site institucional interativo com calculadora de planos e foco em conversão e branding.",
    url: `${SOCIALS.personal.site}/projetos/unificando/vitrine`,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/automacao" },
    { name: "Vitrine Digital", item: "/projetos/unificando/vitrine" },
  ),
  categoryBadge: "Branding & Conversion Case",
  title: "Unificando: Vitrine Digital",
  shortDescription: (
    <>
      Criação de uma <strong>experiência de marca</strong> focada em{" "}
      <strong>conversão</strong>, unindo design premium a uma{" "}
      <strong>calculadora de serviços interativa</strong>.
    </>
  ),
  themeColor: "tech",
  liveUrl: SOCIALS.unificando.site,
  overviewTitle: "O Desafio da Conversão",
  overviewContent: <Overview />,
  featuresTitle: "Destaques da Experiência",
  features: [
    {
      icon: <Cpu className="text-tech" />,
      title: "Simulador de Planos",
      description:
        "Sistema dinâmico para configurar soluções e visualizar orçamentos na hora.",
    },
    {
      icon: <Store className="text-tech" />,
      title: "Brand Authority",
      description:
        "Design visual 'Tech-Clean' que posiciona a marca como referência tecnológica.",
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
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech mr-2" />,
      title: "Links",
      content: <LinksCard />,
    },
  ],
};
