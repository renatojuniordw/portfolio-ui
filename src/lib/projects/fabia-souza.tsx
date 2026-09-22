import { Globe, MessageCircleWarning, Scale, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

const LIVE_URL = "https://fabia.adv.br";

function Overview() {
  return (
    <>
      <p>
        A Dra. <strong>Fábia Souza</strong> é advogada especialista em{" "}
        <strong>Direito da Saúde e Saúde Suplementar</strong> em Recife, atuando
        contra negativas de plano de saúde, reajustes abusivos e recusas de
        cobertura. O site precisava transmitir <strong>autoridade técnica</strong>{" "}
        sem perder o acolhimento — o público chega ali em um momento de urgência
        médica ou financeira.
      </p>
      <p>
        Além da apresentação institucional, o projeto trouxe duas peças
        estratégicas pouco comuns em sites de advocacia: uma{" "}
        <strong>triagem de falso coletivo</strong> (para o cliente identificar se
        seu &quot;plano coletivo&quot; se comporta, na prática, como individual) e
        uma seção de <strong>verificação de canal oficial</strong>, reduzindo o
        risco de golpes que se passam pelo escritório.
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
    </nav>
  );
}

export const fabiaSouzaCase: ProjectCase = {
  id: "fabia-souza",
  pathSegments: ["fabia-souza"],
  card: card(
    "fabia-souza",
    "Fábia Souza Advocacia",
    "Web Performance / Jurídico",
    "Site institucional para advocacia em Direito da Saúde, com triagem de falso coletivo e verificação de canal oficial anti-golpe.",
    "tech",
    ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  ),
  jsonLd: {
    name: "Fábia Souza Advocacia",
    description:
      "Site institucional para advocacia especializada em Direito da Saúde e Saúde Suplementar em Recife, com ferramentas de triagem e segurança digital.",
    url: LIVE_URL,
  },
  breadcrumbs: breadcrumbs({
    name: "Fábia Souza Advocacia",
    item: "/projetos/fabia-souza",
  }),
  categoryBadge: "Freelance / Institucional",
  title: "Fábia Souza Advocacia",
  shortDescription: (
    <>
      <strong>Site institucional</strong> para advocacia especializada em{" "}
      <strong>Direito da Saúde e Saúde Suplementar</strong>, com triagem de
      falso coletivo e verificação de canal oficial contra golpes.
    </>
  ),
  themeColor: "tech",
  liveUrl: LIVE_URL,
  overviewTitle: "O Desafio",
  overviewContent: <Overview />,
  featuresTitle: "Foco Estratégico",
  features: [
    {
      icon: <Stethoscope className="text-tech" aria-hidden="true" />,
      title: "Autoridade em Direito da Saúde",
      description:
        "Conteúdo por área de atuação (negativa de cirurgia, reajuste abusivo, recusa de cobertura) fundamentado em lei, sem promessa de resultado — em conformidade com o Código de Ética da OAB.",
    },
    {
      icon: <MessageCircleWarning className="text-tech" aria-hidden="true" />,
      title: "Triagem de Falso Coletivo",
      description:
        "Ferramenta que ajuda o visitante a identificar se seu plano 'coletivo' se comporta, na prática, como individual — situação que muda a análise jurídica do caso.",
    },
    {
      icon: <ShieldCheck className="text-tech" aria-hidden="true" />,
      title: "Verificação de Canal Oficial",
      description:
        "Seção dedicada a validar os contatos oficiais do escritório, reduzindo o risco de golpes que se passam por atendimento jurídico.",
    },
    {
      icon: <Scale className="text-tech" aria-hidden="true" />,
      title: "Conversão Direta",
      description:
        "Jornada de uma página com CTA integrado ao WhatsApp, pré-preenchido por área de atuação, para agilizar o primeiro contato.",
    },
  ],
  extraSections: [
    {
      id: "arquitetura",
      icon: <Sparkles className="text-tech" aria-hidden="true" />,
      title: "Arquitetura do Conteúdo",
      content: (
        <p>
          O conteúdo jurídico vive em camadas de <strong>dados e repositórios</strong>{" "}
          (áreas de atuação, credenciais, trajetória, FAQ), consumidas por
          componentes de seção puros. Isso mantém a redação sensível às regras da
          OAB — primeira pessoa, sem valores e sem casos concretos — isolada da
          camada de apresentação, facilitando revisão jurídica sem tocar em código.
        </p>
      ),
    },
  ],
  sidebarTechStackTitle: "Solução Técnica",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js 16 / React 19" },
    { label: "Styling", name: "Tailwind CSS 4" },
    { label: "Animações", name: "Motion" },
    { label: "Linguagem", name: "TypeScript" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Links",
      content: <LinksCard />,
    },
  ],
};
