import { buildMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";
import { ProjectDetails } from "@/types/project";
import {
  Cpu,
  Store,
  Globe,
  Github,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import React from "react";
import { SOCIALS } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const generateMetadata = () =>
  buildMetadata({
    title: "Unificando - Vitrine Digital & Experiência de Conversão",
    description:
      "Arquitetura da vitrine digital do Unificando: UX focada em conversão, calculadora de serviços interativa e performance extrema com React 19.",
    path: "/projetos/unificando/vitrine",
  });

const project: ProjectDetails = {
  id: "unificando/vitrine",
  seoTitle: "Unificando - Vitrine Digital & Experiência de Conversão",
  seoDescription:
    "Arquitetura da vitrine digital do Unificando: UX focada em conversão, calculadora de serviços interativa e performance extrema com React 19.",
  jsonLd: {
    name: "Unificando - Vitrine Digital",
    description:
      "Desenvolvimento de site institucional interativo com calculadora de planos e foco em conversão e branding.",
    url: `${SOCIALS.personal.site}/projetos/unificando/vitrine`,
  },
  breadcrumbs: [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Unificando", item: "/projetos/unificando/automacao" },
    { name: "Vitrine Digital", item: "/projetos/unificando/vitrine" },
  ],
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
  overviewContent: (
    <>
      <p>
        O site do <strong>Unificando</strong> foi projetado para ser a
        face digital de um ecossistema de atendimento. Ele funciona como
        uma <strong>vitrine interativa</strong> onde o usuário pode
        simular cenários e entender custos.
      </p>
      <p>
        A tecnologia (React 19 + Vite 6) garante autoridade através de{" "}
        <strong>performance absoluta</strong>.
      </p>
    </>
  ),
  featuresTitle: "Destaques da Experiência",
  features: [
    {
      icon: <Cpu className="text-tech" />,
      title: "Simulador de Planos",
      description: "Sistema dinâmico para configurar soluções e visualizar orçamentos na hora.",
    },
    {
      icon: <Store className="text-tech" />,
      title: "Brand Authority",
      description: "Design visual 'Tech-Clean' que posiciona a marca como referência tecnológica.",
    },
  ],
  extraSections: [
    {
      id: "technical-results",
      title: "Resultados Técnicos",
      content: (
        <>
          <p className="text-text-secondary">
            Utilizando <strong>React 19</strong>, o site atinge pontuações
            máximas em <strong>Core Web Vitals</strong>.
          </p>
          <div className="pt-4 mt-6 border-t border-tech/20">
            <p className="text-sm text-text-secondary italic mb-3">
              Quer saber sobre a Engenharia de IA por trás da marca?
            </p>
            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <Link href="/projetos/unificando/automacao">
                Ver Case de Automação & IA{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </>
      ),
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
      content: (
        <nav className="flex flex-col gap-3 font-bold">
          <a
            href={SOCIALS.unificando.site}
            className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors font-normal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Globe size={16} /> Website Oficial
            </span>
            <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-tech transition-colors">
              <ArrowUpRight className="text-surface-1" size={16} />
            </span>
          </a>
          <a
            href="https://github.com/renatojuniordw/ui-unificando"
            className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors font-normal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Github size={16} /> Repositório GitHub
            </span>
            <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-tech transition-colors">
              <ArrowUpRight className="text-surface-1" size={16} />
            </span>
          </a>
        </nav>
      ),
    },
  ],
};

export default function UnificandoVitrinePage() {
  return <ProjectTemplate project={project} />;
}
