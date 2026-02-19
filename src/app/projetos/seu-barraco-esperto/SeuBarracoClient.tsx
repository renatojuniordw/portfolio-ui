"use client";

import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/constants";
import {
  ArrowLeft,
  ExternalLink,
  Home,
  Zap,
  Smartphone,
  ShieldCheck,
  Code2,
  Globe,
  Play,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

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

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <Link
        href="/projetos"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-barraco transition-colors mb-8 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
          aria-hidden="true"
        />
        Voltar para Projetos
      </Link>

      <main>
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-barraco/10 text-barraco text-xs font-bold uppercase tracking-widest mb-4">
                IoT & Automação Residencial
              </span>
              <h1 className="sr-only">
                Seu Barraco Esperto - Automação Residencial e Casa Inteligente
                em Recife
              </h1>
              <SplitText
                text="Seu Barraco Esperto"
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                <strong>Automação residencial</strong> prática, acessível e sem
                frescura para transformar qualquer casa em uma{" "}
                <strong>casa inteligente</strong> em Recife.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-barraco hover:bg-barraco/90 shadow-barraco/20 shadow-xl"
              asChild
            >
              <a
                href={SOCIALS.barraco.insta}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no Instagram{" "}
                <ExternalLink className="ml-2" size={18} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-16">
            {/* Overview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold">
                O Conceito: Automação com Alexa
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary space-y-4">
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
              </div>
            </section>

            {/* Video Area */}
            <section className="space-y-8" aria-labelledby="videos-title">
              <div className="flex items-center justify-between">
                <h2
                  id="videos-title"
                  className="text-2xl font-display font-bold flex items-center gap-2"
                >
                  <Play className="text-barraco" size={24} aria-hidden="true" />{" "}
                  Na Prática
                </h2>
                <span className="text-xs text-muted uppercase font-bold tracking-widest">
                  Vídeos & Reels
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isMounted &&
                  VIDEOS.map((video, i) => (
                    <div
                      key={i}
                      className="aspect-[9/16] rounded-2xl overflow-hidden bg-surface-1 border border-border group relative"
                    >
                      {video.type === "instagram" ? (
                        <iframe
                          src={`${video.url}${video.url.endsWith("/") ? "" : "/"}embed/`}
                          className="w-full h-full border-0"
                          allowTransparency
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
              <p className="text-sm text-center text-muted">
                Acompanhe as demonstrações completas de{" "}
                <strong>automação residencial em Recife</strong> nas redes
                sociais.
              </p>
            </section>

            {/* Pillars */}
            <section className="space-y-8" aria-labelledby="pillars-title">
              <h2
                id="pillars-title"
                className="text-2xl font-display font-bold"
              >
                Pilares do Projeto
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Home className="text-barraco" aria-hidden="true" />,
                    title: "Acessibilidade",
                    desc: "Uso de hardware custo-benefício que qualquer pessoa pode configurar para sua casa inteligente.",
                  },
                  {
                    icon: <Zap className="text-barraco" aria-hidden="true" />,
                    title: "Integração Total",
                    desc: "Conectividade avançada entre Alexa e hubs de automação residencial.",
                  },
                  {
                    icon: (
                      <Smartphone className="text-barraco" aria-hidden="true" />
                    ),
                    title: "Controle Remoto",
                    desc: "Gerenciamento completo da casa inteligente de qualquer lugar do mundo via app.",
                  },
                  {
                    icon: (
                      <ShieldCheck
                        className="text-barraco"
                        aria-hidden="true"
                      />
                    ),
                    title: "Segurança",
                    desc: "Monitoramento inteligente e automações de presença para seu barraco esperto.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-s1 border border-border group hover:border-barraco/30 transition-all"
                  >
                    <div className="mb-4 bg-barraco/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-8 rounded-3xl bg-surface-2 border border-border">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-barraco" aria-hidden="true" />{" "}
                Tecnologias
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Alexa", label: "Ecosystem" },
                  { name: "Tuya / Sonoff", label: "Hardware" },
                  { name: "Home Assistant", label: "Central Hub" },
                ].map((tech, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xs text-muted uppercase font-bold tracking-wider">
                      {tech.label}
                    </span>
                    <span className="text-text font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-barraco/5 border border-barraco/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Globe size={20} className="text-barraco" aria-hidden="true" />{" "}
                Presença Online
              </h3>
              <nav className="flex flex-col gap-3">
                <a
                  href={SOCIALS.barraco.insta}
                  className="text-sm text-text-secondary hover:text-barraco transition-colors flex items-center justify-between"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={SOCIALS.barraco.youtube}
                  className="text-sm text-text-secondary hover:text-barraco transition-colors flex items-center justify-between"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={SOCIALS.barraco.tiktok}
                  className="text-sm text-text-secondary hover:text-barraco transition-colors flex items-center justify-between"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok <ExternalLink size={14} aria-hidden="true" />
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
