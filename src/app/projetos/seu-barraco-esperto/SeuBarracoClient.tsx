"use client";

import { SOCIALS } from "@/lib/constants";
import {
  Home,
  Zap,
  Smartphone,
  ShieldCheck,
  Globe,
  Play,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";
import { ProjectDetails } from "@/types/project";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as React.ComponentType<any>;

export function SeuBarracoClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const VIDEOS = [
    {
      url: "https://www.instagram.com/p/C_lssYLS_Rk/",
      type: "instagram",
    },
    {
      url: "https://www.instagram.com/p/DAbh7p9vch0/",
      type: "instagram",
    },
    {
      url: "https://www.instagram.com/p/DPEwSVijpOE/",
      type: "instagram",
    },
  ];

  const project: ProjectDetails = {
    id: "seu-barraco-esperto",
    seoTitle: "Seu Barraco Esperto - Automação Residencial & Alexa em Recife",
    seoDescription:
      "Aprenda como transformar sua casa em uma casa inteligente com Alexa, dispositivos Tuya e Sonoff. Automação residencial acessível em Recife.",
    jsonLd: {
      name: "Seu Barraco Esperto",
      description:
        "Projeto focado em automação residencial acessível e casa inteligente com Alexa em Recife.",
      url: `${SOCIALS.personal.site}/projetos/seu-barraco-esperto`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Seu Barraco Esperto", item: "/projetos/seu-barraco-esperto" },
    ],
    categoryBadge: "IoT & Automação Residencial",
    title: "Seu Barraco Esperto",
    shortDescription: (
      <>
        <strong>Automação residencial</strong> prática, acessível e sem
        frescura para transformar qualquer casa em uma{" "}
        <strong>casa inteligente</strong> em Recife.
      </>
    ),
    themeColor: "barraco",
    liveUrl: SOCIALS.barraco.insta, // Acesso principal é o instagram
    overviewTitle: "O Conceito: Automação com Alexa",
    overviewContent: (
      <>
        <p>
          O <strong>Seu Barraco Esperto</strong> nasceu para
          desmistificar a ideia de que{" "}
          <strong>automação residencial</strong> é algo caro ou
          extremamente complexo.
        </p>
        <p>
          O foco é utilizar dispositivos acessíveis (como{" "}
          <strong>Alexa</strong>, Tuya e Sonoff) para criar soluções de{" "}
          <strong>casa inteligente</strong> que realmente facilitam o
          dia a dia: desde controle de iluminação inteligente até
          monitoramento de segurança e economia de energia em{" "}
          <strong>Recife</strong>.
        </p>
      </>
    ),
    featuresTitle: "Pilares do Projeto",
    features: [
      {
        icon: <Home className="text-barraco" aria-hidden="true" />,
        title: "Acessibilidade",
        description: "Uso de hardware custo-benefício que qualquer pessoa pode configurar para sua casa inteligente.",
      },
      {
        icon: <Zap className="text-barraco" aria-hidden="true" />,
        title: "Integração Total",
        description: "Conectividade avançada entre Alexa e hubs de automação residencial.",
      },
      {
        icon: <Smartphone className="text-barraco" aria-hidden="true" />,
        title: "Controle Remoto",
        description: "Gerenciamento completo da casa inteligente de qualquer lugar do mundo via app.",
      },
      {
        icon: <ShieldCheck className="text-barraco" aria-hidden="true" />,
        title: "Segurança",
        description: "Monitoramento inteligente e automações de presença para seu barraco esperto.",
      },
    ],
    extraSections: [
      {
        id: "videos-title",
        icon: <Play className="text-barraco" aria-hidden="true" />,
        title: "Na Prática",
        content: (
          <div className="space-y-4">
            <span className="text-xs text-muted uppercase font-bold tracking-widest block mb-4">
              Vídeos & Reels
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isMounted &&
                VIDEOS.map((video, i) => (
                  <div
                    key={i}
                    className="aspect-[9/16] rounded-lg overflow-hidden bg-surface-1 border border-border group relative"
                  >
                    {video.type === "instagram" ? (
                      <iframe
                        src={`${video.url}${video.url.endsWith("/") ? "" : "/"}embed/`}
                        className="w-full h-full border-0"
                        allow="encrypted-media"
                        title={`Demonstração de automação ${i + 1}`}
                      />
                    ) : (
                      <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        controls={true}
                        config={{
                          youtube: {
                            playerVars: { modestbranding: 1, rel: 0 },
                          },
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
            <p className="text-sm text-center text-muted mt-4">
              Acompanhe as demonstrações completas de{" "}
              <strong>automação residencial em Recife</strong> nas redes
              sociais.
            </p>
          </div>
        ),
      },
    ],
    sidebarTechStackTitle: "Tecnologias",
    sidebarTechStack: [
      { label: "Ecosystem", name: "Alexa" },
      { label: "Hardware", name: "Tuya / Sonoff" },
      { label: "Central Hub", name: "Home Assistant" },
    ],
    sidebarExtraCards: [
      {
        icon: <Globe size={20} className="text-barraco mr-2" aria-hidden="true" />,
        title: "Presença Online",
        content: (
          <nav className="flex flex-col gap-3">
            <a
              href={SOCIALS.barraco.insta}
              className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={16} aria-hidden="true" /> Instagram
              </span>
              <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-barraco transition-colors">
                <ArrowUpRight className="text-surface-1" size={16} aria-hidden="true" />
              </span>
            </a>
            <a
              href={SOCIALS.barraco.youtube}
              className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={16} aria-hidden="true" /> YouTube
              </span>
              <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-barraco transition-colors">
                <ArrowUpRight className="text-surface-1" size={16} aria-hidden="true" />
              </span>
            </a>
            <a
              href={SOCIALS.barraco.tiktok}
              className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={16} aria-hidden="true" /> TikTok
              </span>
              <span className="w-8 h-8 rounded-full bg-text flex items-center justify-center group-hover:bg-barraco transition-colors">
                <ArrowUpRight className="text-surface-1" size={16} aria-hidden="true" />
              </span>
            </a>
          </nav>
        ),
      },
    ],
  };

  return <ProjectTemplate project={project} />;
}
