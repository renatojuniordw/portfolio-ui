import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Cpu,
  Zap,
  ShieldCheck,
  Layout,
  Globe,
  ArrowRight,
  MousePointer2,
  Store,
  Github,
} from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { SOCIALS } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: "Unificando - Landing Page & Conversão de Alta Performance",
    description:
      "Arquitetura da vitrine digital do Unificando: UX focada em conversão, calculadora de serviços interativa e performance extrema com React 19.",
    path: "/projetos/unificando-site",
  });

export default function UnificandoSitePage() {
  const projectData = {
    name: "Unificando - Vitrine Digital",
    description:
      "Desenvolvimento de site institucional interativo com calculadora de planos e foco em conversão e branding.",
    url: `${SOCIALS.personal.site}/projetos/unificando-site`,
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Unificando Vitrine", item: "/projetos/unificando-site" },
  ];

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <JsonLd data={projectJsonLd(projectData)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <Link
        href="/projetos"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-tech transition-colors mb-8 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Voltar para Projetos
      </Link>

      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-tech/10 text-tech text-xs font-bold uppercase tracking-widest mb-4">
              Branding & Conversion Case
            </span>
            <h1 className="sr-only">
              Unificando - Site Institucional e Calculadora Interativa
            </h1>
            <SplitText
              text="Unificando: Vitrine Digital"
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Criação de uma <strong>experiência de marca</strong> focada em{" "}
              <strong>conversão</strong>, unindo design premium a uma{" "}
              <strong>calculadora de serviços interativa</strong> em tempo real.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-tech text-text-primary hover:brightness-110 shadow-xl"
            asChild
          >
            <a
              href={SOCIALS.unificando.site}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Site ao Vivo <ExternalLink className="ml-2" size={18} />
            </a>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-16">
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold">
              O Desafio da Conversão
            </h2>
            <div className="prose prose-invert max-w-none text-text-secondary space-y-4">
              <p>
                O site do <strong>Unificando</strong> foi projetado para ser a
                face digital de um ecossistema complexo. Mais do que um site
                informativo, ele funciona como uma{" "}
                <strong>vitrine interativa</strong> onde o usuário pode
                descobrir serviços, entender valores e simular cenários de
                atendimento.
              </p>
              <p>
                A engenharia por trás (React 19 + Vite 6) serve ao propósito
                comercial: garantir que a página carregue instantaneamente em
                qualquer dispositivo, transmitindo{" "}
                <strong>autoridade e confiança</strong> desde o primeiro
                segundo.
              </p>
            </div>
          </section>

          <section className="space-y-8" aria-labelledby="highlights-title">
            <h2
              id="highlights-title"
              className="text-2xl font-display font-bold"
            >
              Destaques da Experiência
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Cpu className="text-tech" />,
                  title: "Simulador de Planos",
                  desc: "Sistema dinâmico que permite ao cliente configurar sua solução e visualizar o orçamento na hora.",
                },
                {
                  icon: <MousePointer2 className="text-tech" />,
                  title: "UX de Alta Conversão",
                  desc: "Navegação fluida e CTAs estratégicos desenhados para reduzir a fricção no funil de vendas.",
                },
                {
                  icon: <Store className="text-tech" />,
                  title: "Brand Authority",
                  desc: "Design visual 'SaaS-Clean' que posiciona a marca como referência tecnológica no mercado.",
                },
                {
                  icon: <ShieldCheck className="text-tech" />,
                  title: "Segurança & Confiança",
                  desc: "Forms robustos e transparência de dados, cruciais para a conversão de B2B.",
                },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-s1 border border-border group hover:border-tech/30 transition-all font-inter"
                >
                  <div className="mb-4 bg-tech/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pill.icon}
                  </div>
                  <h3 className="font-bold mb-2">{pill.title}</h3>
                  <p className="text-sm text-text-secondary">{pill.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-tech/5 border border-tech/20 space-y-4">
            <h2 className="text-2xl font-display font-bold">
              Resultados Técnicos
            </h2>
            <p className="text-text-secondary">
              Utilizando <strong>React 19</strong> e renderização otimizada, o
              site atinge pontuações máximas em
              <strong> Core Web Vitals</strong>. A acessibilidade foi tratada
              como prioridade, garantindo que a vitrine seja acessível por
              qualquer pessoa em qualquer dispositivo.
            </p>
            <div className="pt-4 mt-6 border-t border-tech/20">
              <p className="text-sm text-text-secondary italic mb-3">
                Quer saber sobre a Engenharia de IA por trás da marca?
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/projetos/unificando">
                  Ver Case de Automação & IA{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-8 rounded-3xl bg-surface-2 border border-border">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space">
              <Code2 size={20} className="text-tech" /> Stack Tecnológica
            </h3>
            <div className="space-y-4 font-inter text-sm">
              {[
                { name: "React 19 / TS 5.8", label: "Core" },
                { name: "Tailwind CSS 4", label: "Styling" },
                { name: "Framer Motion 12", label: "Animations" },
                { name: "Vite 6", label: "Build Tool" },
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
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-tech" /> Links
            </h3>
            <nav className="flex flex-col gap-3">
              <a
                href={SOCIALS.unificando.site}
                className="text-sm text-text-secondary hover:text-tech transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website Oficial <ExternalLink size={14} />
              </a>
              <a
                href="https://github.com/renatojuniordw/ui-unificando"
                className="text-sm text-text-secondary hover:text-tech transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório GitHub <Github size={14} />
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
