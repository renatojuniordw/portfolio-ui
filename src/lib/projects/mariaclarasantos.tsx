import { Github, Globe, Lock, Scale, Search, ShieldCheck, Users } from "lucide-react";

import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

const LIVE_URL = "https://mariaclarasantos.adv.br/";
const GITHUB_URL = "https://github.com/renatojuniordw/portfolio-maria-clara";

function Overview() {
  return (
    <>
      <p>
        O objetivo era criar uma presença digital robusta para a Dra. Maria Clara
        Santos, especialista em Direito Previdenciário. A página precisava
        transmitir <strong>autoridade, seriedade e acolhimento</strong>, pontos
        cruciais para quem busca benefícios do INSS em <strong>Recife</strong>.
      </p>
      <p>
        Além da apresentação institucional, implementamos uma funcionalidade
        técnica estratégica para o setor jurídico: um sistema de validação de
        canais oficiais para proteção contra golpes.
      </p>
    </>
  );
}

function LinksCard() {
  return (
    <nav className="flex flex-col gap-3">
      <SocialLinkCard
        href={LIVE_URL}
        icon={Globe}
        label="Website Oficial"
        hoverAccentClass="group-hover:bg-tech"
      />
      <SocialLinkCard
        href={GITHUB_URL}
        icon={Github}
        label="Repositório GitHub"
        hoverAccentClass="group-hover:bg-tech"
      />
    </nav>
  );
}

export const mariaClaraSantosCase: ProjectCase = {
  id: "mariaclarasantos",
  pathSegments: ["mariaclarasantos"],
  card: card(
    "mariaclarasantos",
    "Maria Clara Santos",
    "Web Performance / Jurídico",
    "Landing page de alta conversão para advocacia com sistema de anti-golpe integrado.",
    "tech",
    ["Next.js", "React", "SEO", "Performance"],
  ),
  jsonLd: {
    name: "Maria Clara Santos Advocacia",
    description:
      "Landing page de alta conversão para advocacia previdenciária com foco em segurança digital.",
    url: "https://mariaclarasantos.adv.br/",
  },
  breadcrumbs: breadcrumbs({
    name: "Maria Clara Santos",
    item: "/projetos/mariaclarasantos",
  }),
  categoryBadge: "Freelance / Institucional",
  title: "Maria Clara Santos",
  shortDescription: (
    <>
      <strong>Criação de site profissional</strong> de alta conversão para
      advocacia previdenciária, com foco em segurança digital e{" "}
      <strong>SEO jurídico em Recife</strong>.
    </>
  ),
  themeColor: "tech",
  liveUrl: LIVE_URL,
  githubUrl: GITHUB_URL,
  overviewTitle: "O Desafio",
  overviewContent: <Overview />,
  featuresTitle: "Foco Estratégico",
  features: [
    {
      icon: <Search className="text-tech" aria-hidden="true" />,
      title: "SEO Jurídico",
      description:
        "Estrutura otimizada para buscas locais em Recife e termos específicos do Direito Previdenciário.",
    },
    {
      icon: <Users className="text-tech" aria-hidden="true" />,
      title: "UX Humanizada",
      description:
        "Interface limpa e acessível, pensada para o público que busca auxílios e aposentadorias.",
    },
    {
      icon: <ShieldCheck className="text-tech" aria-hidden="true" />,
      title: "Segurança de Dados",
      description:
        "Implementação de práticas de proteção de dados e alertas de transparência.",
    },
    {
      icon: <Scale className="text-tech" aria-hidden="true" />,
      title: "Conversão Direta",
      description:
        "CTA estratégico integrado ao WhatsApp para agilizar o atendimento inicial.",
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
          <strong>Verificação de Contato Oficial</strong>. O cliente pode digitar
          o número de telefone que o contatou e o site valida instantaneamente se
          aquele canal pertence ao escritório, reduzindo drasticamente o risco de
          fraudes.
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
      content: <LinksCard />,
    },
  ],
};
