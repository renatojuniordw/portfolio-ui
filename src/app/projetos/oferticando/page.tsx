import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/constants";
import {
  ArrowLeft,
  ExternalLink,
  ShoppingBag,
  Zap,
  LayoutDashboard,
  Users,
  Code2,
  Cpu,
  ShieldCheck,
  Search,
  MousePointer2,
} from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Oferticando - Plataforma de Ofertas & Cupons",
    description:
      "Case Oferticando: Frontend performático para gestão e descoberta de ofertas com Next.js 15, React 19 e Tailwind CSS 4.",
    path: "/projetos/oferticando",
  });

export default function OferticandoPage() {
  const projectData = {
    name: "Oferticando - Plataforma de Ofertas & Cupons",
    description:
      "Plataforma completa de centralização, publicação e gestão de promoções com painéis administrativos e de afiliados.",
    url: `${SOCIALS.personal.site}/projetos/oferticando`,
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Oferticando", item: "/projetos/oferticando" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <JsonLd data={projectJsonLd(projectData)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <Link
        href="/projetos"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-tech transition-colors mb-8 group"
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
              <span className="inline-block px-3 py-1 rounded-full bg-tech/10 text-tech text-xs font-bold uppercase tracking-widest mb-4">
                E-commerce / Afiliados
              </span>
              <h1 className="sr-only">
                Oferticando - Plataforma de Ofertas e Cupons
              </h1>
              <SplitText
                text="Oferticando: Ofertas & Cupons"
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Frontend de alto desempenho para uma plataforma de{" "}
                <strong>ofertas e cupons</strong>, focada em escalabilidade,{" "}
                <strong>gestão de afiliados</strong> e experiência de usuário
                fluida.
              </p>
            </div>
            {/* Link de exemplo se houver, ou apenas botão placeholder */}
            <Button
              size="lg"
              className="bg-tech text-white hover:bg-tech/90 shadow-tech/20 shadow-xl"
              asChild
            >
              <a
                href={SOCIALS.oferticando.site}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acesse o site{" "}
                <ExternalLink className="ml-2" size={18} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {/* Overview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold font-space text-text">
                O Projeto
              </h2>
              <div className="prose max-w-none text-text-secondary space-y-4 text-lg">
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
              </div>
            </section>

            {/* Funcionalidades Principais */}
            <section className="space-y-8">
              <h2 className="text-2xl font-display font-bold font-space text-text">
                Funcionalidades Principais
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <Search className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Feed Inteligente</h3>
                  <p className="text-sm text-text-secondary">
                    Busca em tempo real e scroll virtualizado para performance
                    extrema em listas longas.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <Zap className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Extração Automática</h3>
                  <p className="text-sm text-text-secondary">
                    Cadastro de ofertas simplificado com extração automática de
                    dados via LinkPreview.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <ShieldCheck className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Controle de Acesso</h3>
                  <p className="text-sm text-text-secondary">
                    Segurança robusta com JWT (jose) e middleware de rota para
                    diferentes perfis (Admin/User).
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <LayoutDashboard className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Dashboard de Métricas</h3>
                  <p className="text-sm text-text-secondary">
                    Painel administrativo intuitivo para acompanhamento de KPIs
                    e gestão de conteúdo.
                  </p>
                </div>
              </div>
            </section>

            {/* Destaque Técnico */}
            <section
              className="p-8 rounded-3xl bg-tech/5 border border-tech/20 space-y-8"
              aria-labelledby="tech-highlights-title"
            >
              <h2
                id="tech-highlights-title"
                className="text-2xl font-display font-bold font-space flex items-center gap-3 text-text"
              >
                <Cpu className="text-tech" aria-hidden="true" /> Diferenciais de
                Engenharia
              </h2>

              <div className="space-y-8 text-text-secondary">
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
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-8 rounded-3xl bg-surface-2 border border-border">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space text-text">
                <Code2 size={20} className="text-tech" aria-hidden="true" />{" "}
                Tech Stack
              </h3>
              <div className="space-y-4 font-inter text-sm">
                {[
                  { name: "Next.js 15 (App Router)", label: "Framework" },
                  { name: "React 19 + TypeScript", label: "Linguagem/Lib" },
                  { name: "PrimeReact + Tailwind 4", label: "UI/Styling" },
                  { name: "React Hook Form", label: "Forms" },
                  { name: "Axios + Interceptors", label: "HTTP Client" },
                  { name: "JWT (jose) + Middleware", label: "Auth & Security" },
                  { name: "Docker + Docker Compose", label: "DevOps" },
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

            <div className="p-8 rounded-3xl bg-tech/5 border border-tech/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text">
                <ShoppingBag
                  size={20}
                  className="text-tech"
                  aria-hidden="true"
                />{" "}
                Monetização
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Plataforma preparada para monetização via{" "}
                <strong>Google AdSense</strong>, incluindo configuração de
                ads.txt e componentes dedicados para banners.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
