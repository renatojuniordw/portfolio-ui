import { Cpu, LayoutDashboard, Search, ShieldCheck, ShoppingBag, Zap } from "lucide-react";

import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        O <strong>Oferticando</strong> nasceu da necessidade de centralizar a
        publicação e gestão de promoções. A plataforma foi estruturada em três
        pilares fundamentais:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Área Pública:</strong> Feed dinâmico com busca e scroll
          virtualizado para descoberta rápida de ofertas.
        </li>
        <li>
          <strong>Área de Afiliado:</strong> Painel dedicado para usuários
          criarem e gerenciarem suas próprias promoções.
        </li>
        <li>
          <strong>Área Administrativa:</strong> Controle total sobre ofertas,
          usuários, lojas e vitrines da plataforma.
        </li>
      </ul>
    </>
  );
}

function EngineeringHighlightsContent() {
  return (
    <>
      <div className="space-y-2 text-lg">
        <h3 className="text-lg font-bold text-text">Next.js 15 & React 19</h3>
        <p>
          Utilização das versões mais recentes do ecossistema React, aproveitando
          o App Router e os novos padrões de renderização para SEO e performance.
        </p>
      </div>
      <div className="space-y-2 text-lg">
        <h3 className="text-lg font-bold text-text">
          Design Moderno com Tailwind 4 & PrimeReact
        </h3>
        <p>
          Combinação da flexibilidade do Tailwind CSS 4 com a robustez dos
          componentes do PrimeReact, garantindo uma UI premium e acessível.
        </p>
      </div>
      <div className="space-y-2 text-lg">
        <h3 className="text-lg font-bold text-text">Infraestrutura com Docker</h3>
        <p>
          Ambiente conteinerizado com Docker multi-stage para builds otimizados e
          facilidade de deploy via docker-compose.
        </p>
      </div>
    </>
  );
}

export const oferticandoCase: ProjectCase = {
  id: "oferticando",
  pathSegments: ["oferticando"],
  card: card(
    "oferticando",
    "Oferticando",
    "E-commerce / Afiliados",
    "Plataforma de ofertas e cupons com painéis administrativos e de afiliados, busca performática e extração automática de dados.",
    "tech",
    ["Angular", "Node.js", "PostgreSQL", "Docker"],
  ),
  jsonLd: {
    name: "Oferticando - Plataforma de Ofertas & Cupons",
    description:
      "Plataforma completa de centralização, publicação e gestão de promoções com painéis administrativos e de afiliados.",
    url: `${SOCIALS.personal.site}/projetos/oferticando`,
  },
  breadcrumbs: breadcrumbs({ name: "Oferticando", item: "/projetos/oferticando" }),
  categoryBadge: "E-commerce / Afiliados",
  title: "Oferticando: Ofertas & Cupons",
  shortDescription: (
    <>
      Frontend de alto desempenho para uma plataforma de{" "}
      <strong>ofertas e cupons</strong>, focada em escalabilidade,{" "}
      <strong>gestão de afiliados</strong> e experiência de usuário fluida.
    </>
  ),
  themeColor: "tech",
  liveUrl: SOCIALS.oferticando.site,
  overviewTitle: "O Projeto",
  overviewContent: <Overview />,
  featuresTitle: "Funcionalidades Principais",
  features: [
    {
      icon: <Search className="text-tech" size={24} />,
      title: "Feed Inteligente",
      description:
        "Busca em tempo real e scroll virtualizado para performance extrema em listas longas.",
    },
    {
      icon: <Zap className="text-tech" size={24} />,
      title: "Extração Automática",
      description:
        "Cadastro de ofertas simplificado com extração automática de dados via LinkPreview.",
    },
    {
      icon: <ShieldCheck className="text-tech" size={24} />,
      title: "Controle de Acesso",
      description:
        "Segurança robusta com JWT (jose) e middleware de rota para diferentes perfis (Admin/User).",
    },
    {
      icon: <LayoutDashboard className="text-tech" size={24} />,
      title: "Dashboard de Métricas",
      description:
        "Painel administrativo intuitivo para acompanhamento de KPIs e gestão de conteúdo.",
    },
  ],
  extraSections: [
    {
      id: "tech-highlights-title",
      icon: <Cpu className="text-tech" aria-hidden="true" />,
      title: "Diferenciais de Engenharia",
      content: <EngineeringHighlightsContent />,
    },
  ],
  sidebarTechStackTitle: "Tech Stack",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js 15 (App Router)" },
    { label: "Linguagem/Lib", name: "React 19 + TypeScript" },
    { label: "UI/Styling", name: "PrimeReact + Tailwind 4" },
    { label: "Forms", name: "React Hook Form" },
    { label: "HTTP Client", name: "Axios + Interceptors" },
    { label: "Auth & Security", name: "JWT (jose) + Middleware" },
    { label: "DevOps", name: "Docker + Docker Compose" },
  ],
  sidebarExtraCards: [
    {
      icon: <ShoppingBag size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Monetização",
      content: (
        <p>
          Plataforma preparada para monetização via <strong>Google AdSense</strong>,
          incluindo configuração de ads.txt e componentes dedicados para banners.
        </p>
      ),
    },
  ],
};
