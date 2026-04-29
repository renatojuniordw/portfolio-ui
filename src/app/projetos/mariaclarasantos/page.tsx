import { buildMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";
import { ProjectDetails } from "@/types/project";
import {
  ShieldCheck,
  Search,
  Users,
  Scale,
  Lock,
  Globe,
  Github,
  ArrowUpRight,
} from "lucide-react";
import React from "react";
import { SOCIALS } from "@/lib/constants";
import Link from "next/link";

export const generateMetadata = () =>
  buildMetadata({
    title: "Maria Clara Santos - Landing Page de Alta Conversão",
    description:
      "Case Maria Clara Santos: Criação de landing page profissional para advocacia com sistema anti-golpe e SEO jurídico em Recife.",
    path: "/projetos/mariaclarasantos",
  });

const project: ProjectDetails = {
  id: "mariaclarasantos",
  seoTitle: "Maria Clara Santos - Landing Page de Alta Conversão",
  seoDescription:
    "Case Maria Clara Santos: Criação de landing page profissional para advocacia com sistema anti-golpe e SEO jurídico em Recife.",
  jsonLd: {
    name: "Maria Clara Santos Advocacia",
    description:
      "Landing page de alta conversão para advocacia previdenciária com foco em segurança digital.",
    url: `${SOCIALS.personal.site}/projetos/mariaclarasantos`,
  },
  breadcrumbs: [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Maria Clara Santos", item: "/projetos/mariaclarasantos" },
  ],
  categoryBadge: "Freelance / Institucional",
  title: "Maria Clara Santos",
  shortDescription: (
    <>
      <strong>Criação de site profissional</strong> de alta conversão
      para advocacia previdenciária, com foco em segurança digital e{" "}
      <strong>SEO jurídico em Recife</strong>.
    </>
  ),
  themeColor: "tech",
  liveUrl: "https://mariaclarasantos.adv.br/",
  overviewTitle: "O Desafio",
  overviewContent: (
    <>
      <p>
        O objetivo era criar uma presença digital robusta para a Dra.
        Maria Clara Santos, especialista em Direito Previdenciário. A
        página precisava transmitir{" "}
        <strong>autoridade, seriedade e acolhimento</strong>, pontos
        cruciais para quem busca benefícios do INSS em{" "}
        <strong>Recife</strong>.
      </p>
      <p>
        Além da apresentação institucional, implementamos uma
        funcionalidade técnica estratégica para o setor jurídico: um
        sistema de validação de canais oficiais para proteção contra
        golpes.
      </p>
    </>
  ),
  featuresTitle: "Foco Estratégico",
  features: [
    {
      icon: <Search className="text-tech" aria-hidden="true" />,
      title: "SEO Jurídico",
      description: "Estrutura otimizada para buscas locais em Recife e termos específicos do Direito Previdenciário.",
    },
    {
      icon: <Users className="text-tech" aria-hidden="true" />,
      title: "UX Humanizada",
      description: "Interface limpa e acessível, pensada para o público que busca auxílios e aposentadorias.",
    },
    {
      icon: <ShieldCheck className="text-tech" aria-hidden="true" />,
      title: "Segurança de Dados",
      description: "Implementação de práticas de proteção de dados e alertas de transparência.",
    },
    {
      icon: <Scale className="text-tech" aria-hidden="true" />,
      title: "Conversão Direta",
      description: "CTA estratégico integrado ao WhatsApp para agilizar o atendimento inicial.",
    },
  ],
  extraSections: [
    {
      id: "security",
      icon: <Lock className="text-tech" aria-hidden="true" />,
      title: "Inovação em Segurança",
      content: (
        <p>
          Desenvolvi um sistema de{" "}
          <strong>Verificação de Contato Oficial</strong>. O cliente pode
          digitar o número de telefone que o contatou e o site valida
          instantaneamente se aquele canal pertence ao escritório, reduzindo
          drasticamente o risco de fraudes.
        </p>
      ),
    },
  ],
  sidebarTechStackTitle: "Solução Técnica",
  sidebarTechStack: [
    { label: "Framework", name: "React 19 / Next.js 15+" },
    { label: "UI Components", name: "PrimeReact" },
    { label: "Styling", name: "SASS / SCSS" },
    { label: "Forms & Validation", name: "React Hook Form" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech" aria-hidden="true" />,
      title: "Links",
      content: (
        <nav className="flex flex-col gap-3">
          <a
            href="https://mariaclarasantos.adv.br/"
            className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Globe size={16} aria-hidden="true" /> Website Oficial
            </span>
            <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-tech transition-colors">
              <ArrowUpRight className="text-surface-1" size={16} aria-hidden="true" />
            </span>
          </a>
          <a
            href="https://github.com/renatojuniordw/portfolio-maria-clara"
            className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Github size={16} aria-hidden="true" /> Repositório GitHub
            </span>
            <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-tech transition-colors">
              <ArrowUpRight className="text-surface-1" size={16} aria-hidden="true" />
            </span>
          </a>
        </nav>
      ),
    },
  ],
};

export default function MariaClaraSantosProjectPage() {
  return <ProjectTemplate project={project} />;
}
