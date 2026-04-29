import { buildMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";
import { ProjectDetails } from "@/types/project";
import {
  ShoppingBag,
  Zap,
  LayoutDashboard,
  ShieldCheck,
  Search,
  Cpu,
} from "lucide-react";
import React from "react";
import { SOCIALS } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: "Oferticando - Plataforma de Ofertas & Cupons",
    description:
      "Case Oferticando: Frontend performático para gestão e descoberta de ofertas com Next.js 15, React 19 e Tailwind CSS 4.",
    path: "/projetos/oferticando",
  });

const project: ProjectDetails = {
  id: "oferticando",
  seoTitle: "Oferticando - Plataforma de Ofertas & Cupons",
  seoDescription:
    "Case Oferticando: Frontend performático para gestão e descoberta de ofertas com Next.js 15, React 19 e Tailwind CSS 4.",
  jsonLd: {
    name: "Oferticando - Plataforma de Ofertas & Cupons",
    description:
      "Plataforma completa de centralização, publicação e gestão de promoções com painéis administrativos e de afiliados.",
    url: `${SOCIALS.personal.site}/projetos/oferticando`,
  },
  breadcrumbs: [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Oferticando", item: "/projetos/oferticando" },
  ],
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
  overviewContent: (
    <>
      <p>
        O <strong>Oferticando</strong> nasceu da necessidade de
        centralizar a publicação e gestão de promoções. A plataforma
        foi estruturada em três pilares fundamentais:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Área Pública:</strong> Feed dinâmico com busca e
          scroll virtualizado para descoberta rápida de ofertas.
        </li>
        <li>
          <strong>Área de Afiliado:</strong> Painel dedicado para
          usuários criarem e gerenciarem suas próprias promoções.
        </li>
        <li>
          <strong>Área Administrativa:</strong> Controle total sobre
          ofertas, usuários, lojas e vitrines da plataforma.
        </li>
      </ul>
    </>
  ),
  featuresTitle: "Funcionalidades Principais",
  features: [
    {
      icon: <Search className="text-tech" size={24} />,
      title: "Feed Inteligente",
      description: "Busca em tempo real e scroll virtualizado para performance extrema em listas longas.",
    },
    {
      icon: <Zap className="text-tech" size={24} />,
      title: "Extração Automática",
      description: "Cadastro de ofertas simplificado com extração automática de dados via LinkPreview.",
    },
    {
      icon: <ShieldCheck className="text-tech" size={24} />,
      title: "Controle de Acesso",
      description: "Segurança robusta com JWT (jose) e middleware de rota para diferentes perfis (Admin/User).",
    },
    {
      icon: <LayoutDashboard className="text-tech" size={24} />,
      title: "Dashboard de Métricas",
      description: "Painel administrativo intuitivo para acompanhamento de KPIs e gestão de conteúdo.",
    },
  ],
  extraSections: [
    {
      id: "tech-highlights-title",
      icon: <Cpu className="text-tech" aria-hidden="true" />,
      title: "Diferenciais de Engenharia",
      content: (
        <>
          <div className="space-y-2 text-lg">
            <h3 className="text-lg font-bold text-text">
              Next.js 15 & React 19
            </h3>
            <p>
              Utilização das versões mais recentes do ecossistema React,
              aproveitando o App Router e os novos padrões de renderização
              para SEO e performance.
            </p>
          </div>

          <div className="space-y-2 text-lg">
            <h3 className="text-lg font-bold text-text">
              Design Moderno com Tailwind 4 & PrimeReact
            </h3>
            <p>
              Combinação da flexibilidade do Tailwind CSS 4 com a robustez
              dos componentes do PrimeReact, garantindo uma UI premium e
              acessível.
            </p>
          </div>

          <div className="space-y-2 text-lg">
            <h3 className="text-lg font-bold text-text">
              Infraestrutura com Docker
            </h3>
            <p>
              Ambiente conteinerizado com Docker multi-stage para builds
              otimizados e facilidade de deploy via docker-compose.
            </p>
          </div>
        </>
      ),
    },
  ],
  sidebarTechStackTitle: "Tech Stack",
  sidebarTechStack: [
    { name: "Next.js 15 (App Router)", label: "Framework" },
    { name: "React 19 + TypeScript", label: "Linguagem/Lib" },
    { name: "PrimeReact + Tailwind 4", label: "UI/Styling" },
    { name: "React Hook Form", label: "Forms" },
    { name: "Axios + Interceptors", label: "HTTP Client" },
    { name: "JWT (jose) + Middleware", label: "Auth & Security" },
    { name: "Docker + Docker Compose", label: "DevOps" },
  ],
  sidebarExtraCards: [
    {
      icon: <ShoppingBag size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Monetização",
      content: (
        <p>
          Plataforma preparada para monetização via{" "}
          <strong>Google AdSense</strong>, incluindo configuração de
          ads.txt e componentes dedicados para banners.
        </p>
      ),
    },
  ],
};

export default function OferticandoPage() {
  return <ProjectTemplate project={project} />;
}
