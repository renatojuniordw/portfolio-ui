import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/constants";
import {
  ArrowLeft,
  ExternalLink,
  Bot,
  Zap,
  Cpu,
  MessageSquare,
  Code2,
  Globe,
  ShieldCheck,
  Layout,
  Github,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  organizationJsonLd,
  projectJsonLd,
  breadcrumbJsonLd,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Unificando - Atendimento WhatsApp com IA & Automação",
    description:
      "Case Unificando: Orquestração de LLMs (GPT-4) e automação via n8n para atendimento inteligente no WhatsApp e Instagram.",
    path: "/projetos/unificando/automacao",
  });

export default function UnificandoAutomationPage() {
  const projectData = {
    name: "Unificando - Automação & IA",
    description:
      "Ecossistema de atendimento inteligente com orquestração de LLMs e automação de processos via n8n.",
    url: `${SOCIALS.personal.site}/projetos/unificando/automacao`,
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Unificando", item: "/projetos/unificando/automacao" },
    { name: "Automação", item: "/projetos/unificando/automacao" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <JsonLd data={organizationJsonLd()} />
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
              <span className="inline-block px-3 py-1 rounded-full bg-ia/10 text-ia text-xs font-bold uppercase tracking-widest mb-4">
                IA & Automação
              </span>
              <h1 className="sr-only">
                Unificando - Atendimento WhatsApp com IA e Automação
              </h1>
              <SplitText
                text="Unificando: IA & Automação"
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Ecosistema completo de <strong>atendimento inteligente</strong>{" "}
                para redes sociais, transformando{" "}
                <strong>caixa de entrada unificada</strong> em conversões reais
                com <strong> automação com IA</strong>.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-ia text-white hover:bg-ia/90 shadow-ia/20 shadow-xl"
              asChild
            >
              <a
                href={SOCIALS.unificando.site}
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
                O Desafio Técnico: Atendimento WhatsApp
              </h2>
              <div className="prose max-w-none text-text-secondary space-y-4">
                <p>
                  O desafio central do <strong>Unificando</strong> foi criar um
                  <strong> painel de atendimento</strong> que não apenas
                  respondesse usuários, mas que entendesse a intenção de compra,
                  calculasse orçamentos em tempo real no{" "}
                  <strong>atendimento WhatsApp</strong> e soubesse o momento
                  exato de transferir para um humano.
                </p>
              </div>
            </section>

            {/* Highlights Técnicos */}
            <section
              className="p-8 rounded-3xl bg-ia/5 border border-ia/20 space-y-8"
              aria-labelledby="tech-highlights-title"
            >
              <h2
                id="tech-highlights-title"
                className="text-2xl font-display font-bold font-space flex items-center gap-3 text-text"
              >
                <Cpu className="text-ia" aria-hidden="true" /> Inteligência de
                Decisão
              </h2>

              <div className="space-y-8 text-text-secondary">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-text">
                    Roteamento Inteligente (Triage Agent)
                  </h3>
                  <p>
                    Desenvolvi um agente de triagem baseado em LLM que
                    classifica intenções (Lead, FAQ, Pricing, Human) em
                    milissegundos, para um
                    <strong> atendimento WhatsApp com IA</strong> mais fluido.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-text">
                    Arquitetura Dual-Agent
                  </h3>
                  <p>
                    Implementação de sub-agentes especializados que consultam
                    bases de conhecimento dinâmicas, reduzindo a carga do
                    suporte humano através da <strong>automação com IA</strong>.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-8 rounded-3xl bg-surface-2 border border-border">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space text-text">
                <Code2 size={20} className="text-ia" aria-hidden="true" /> Tech
                Stack
              </h3>
              <div className="space-y-4 font-inter text-sm">
                {[
                  { name: "n8n", label: "Orchestration" },
                  { name: "OpenAI (GPT-4)", label: "AI Engine" },
                  { name: "Supabase", label: "Database" },
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
                <Layout size={20} className="text-tech" aria-hidden="true" />{" "}
                Vitrine Digital
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Interessado na experiência visual e na calculadora de serviços
                deste projeto?
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/projetos/unificando/vitrine">
                  Ver Vitrine Digital <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
