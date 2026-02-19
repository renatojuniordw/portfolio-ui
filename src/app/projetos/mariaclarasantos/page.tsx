import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Search,
  Users,
  Scale,
  Code2,
  Globe,
  Lock,
  Github,
} from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { SOCIALS } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: "Maria Clara Santos - Landing Page de Alta Conversão",
    description:
      "Case Maria Clara Santos: Criação de landing page profissional para advocacia com sistema anti-golpe e SEO jurídico em Recife.",
    path: "/projetos/mariaclarasantos",
  });

export default function MariaClaraSantosProjectPage() {
  const projectData = {
    name: "Maria Clara Santos Advocacia",
    description:
      "Landing page de alta conversão para advocacia previdenciária com foco em segurança digital.",
    url: `${SOCIALS.personal.site}/projetos/mariaclarasantos`,
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Maria Clara Santos", item: "/projetos/mariaclarasantos" },
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
          aria-hidden="true"
        />
        Voltar para Projetos
      </Link>

      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-tech/10 text-tech text-xs font-bold uppercase tracking-widest mb-4">
              Freelance / Institucional
            </span>
            <h1 className="sr-only">
              Maria Clara Santos - Landing Page Profissional em Recife
            </h1>
            <SplitText
              text="Maria Clara Santos"
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              <strong>Criação de site profissional</strong> de alta conversão
              para advocacia previdenciária, com foco em segurança digital e{" "}
              <strong>SEO jurídico em Recife</strong>.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 shadow-xl"
            asChild
          >
            <a
              href="https://mariaclarasantos.adv.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Projeto{" "}
              <ExternalLink className="ml-2" size={18} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-16">
          {/* Overview */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold">O Desafio</h2>
            <div className="prose prose-invert max-w-none text-text-secondary space-y-4">
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
            </div>
          </section>

          {/* Highlight: Anti-Golpe */}
          <section
            className="p-8 rounded-3xl bg-tech/5 border border-tech/20 space-y-6"
            aria-labelledby="security-title"
          >
            <div className="w-12 h-12 rounded-2xl bg-tech/10 flex items-center justify-center">
              <Lock className="text-tech" aria-hidden="true" />
            </div>
            <h2 id="security-title" className="text-2xl font-display font-bold">
              Inovação em Segurança
            </h2>
            <p className="text-text-secondary">
              Desenvolvi um sistema de{" "}
              <strong>Verificação de Contato Oficial</strong>. O cliente pode
              digitar o número de telefone que o contatou e o site valida
              instantaneamente se aquele canal pertence ao escritório, reduzindo
              drasticamente o risco de fraudes.
            </p>
          </section>

          {/* Core Values */}
          <section className="space-y-8" aria-labelledby="core-values-title">
            <h2
              id="core-values-title"
              className="text-2xl font-display font-bold"
            >
              Foco Estratégico
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Search className="text-tech" aria-hidden="true" />,
                  title: "SEO Jurídico",
                  desc: "Estrutura otimizada para buscas locais em Recife e termos específicos do Direito Previdenciário.",
                },
                {
                  icon: <Users className="text-tech" aria-hidden="true" />,
                  title: "UX Humanizada",
                  desc: "Interface limpa e acessível, pensada para o público que busca auxílios e aposentadorias.",
                },
                {
                  icon: (
                    <ShieldCheck className="text-tech" aria-hidden="true" />
                  ),
                  title: "Segurança de Dados",
                  desc: "Implementação de práticas de proteção de dados e alertas de transparência.",
                },
                {
                  icon: <Scale className="text-tech" aria-hidden="true" />,
                  title: "Conversão Direta",
                  desc: "CTA estratégico integrado ao WhatsApp para agilizar o atendimento inicial.",
                },
              ].map((pill, i) => (
                <article
                  key={i}
                  className="p-6 rounded-2xl bg-s1 border border-border group hover:border-tech/30 transition-all font-inter"
                >
                  <div className="mb-4 bg-tech/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pill.icon}
                  </div>
                  <h3 className="font-bold mb-2">{pill.title}</h3>
                  <p className="text-sm text-text-secondary">{pill.desc}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-8 rounded-3xl bg-surface-2 border border-border">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space">
              <Code2 size={20} className="text-tech" aria-hidden="true" />{" "}
              Solução Técnica
            </h3>
            <div className="space-y-4 font-inter">
              {[
                { name: "React 19 / Next.js 15+", label: "Framework" },
                { name: "PrimeReact", label: "UI Components" },
                { name: "SASS / SCSS", label: "Styling" },
                { name: "React Hook Form", label: "Forms & Validation" },
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
              <Globe size={20} className="text-tech" aria-hidden="true" /> Links
            </h3>
            <nav className="flex flex-col gap-3">
              <a
                href="https://mariaclarasantos.adv.br/"
                className="text-sm text-text-secondary hover:text-tech transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website Oficial <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/renatojuniordw/portfolio-maria-clara"
                className="text-sm text-text-secondary hover:text-tech transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório GitHub <Github size={14} aria-hidden="true" />
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
