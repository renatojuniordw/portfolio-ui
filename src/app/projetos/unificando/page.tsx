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
  Component,
  Server,
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
    path: "/projetos/unificando",
  });

export default function UnificandoProjectPage() {
  const projectData = {
    name: "Unificando",
    description:
      "Ecosistema completo de atendimento inteligente para redes sociais, focado em atendimento WhatsApp com IA e automação de processos.",
    url: `${SOCIALS.personal.site}/projetos/unificando`,
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Unificando", item: "/projetos/unificando" },
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
                text="Unificando"
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Ecosistema completo de <strong>atendimento inteligente</strong>{" "}
                para redes sociais, transformando{" "}
                <strong>caixa de entrada unificada</strong> em conversões reais
                com <strong>automação com IA</strong>.
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
              <h2 className="text-2xl font-display font-bold font-space">
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
                <p>
                  O sistema precisava ser resiliente a falhas e, acima de tudo,
                  seguro contra <strong>prompt injections</strong> em ambientes
                  públicos de rede social, mantendo a{" "}
                  <strong>centralização de atendimento</strong> eficiente.
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
                className="text-2xl font-display font-bold font-space flex items-center gap-3"
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
                    <strong> atendimento WhatsApp com IA</strong> mais fluido,
                    utilizando saída estritamente em JSON.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-text">
                    Arquitetura Dual-Agent
                  </h3>
                  <p>
                    Implementação de sub-agentes especializados que consultam
                    bases de conhecimento dinâmicas, reduzindo a carga do
                    suporte humano em mais de 70% através da{" "}
                    <strong>automação com IA</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-text">
                    Gateway de Segurança
                  </h3>
                  <p>
                    Criação de um middleware em{" "}
                    <strong>Cloudflare Workers (Node.js)</strong> para validação
                    de leads, proteção contra bots (Turnstile) e verificações de
                    idempotência antes de processar dados no n8n.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section className="space-y-8" aria-labelledby="features-title">
              <h2
                id="features-title"
                className="text-2xl font-display font-bold font-space"
              >
                Destaques da Implementação
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Bot className="text-ia" aria-hidden="true" />,
                    title: "Prompt Strict-JSON",
                    desc: "Protocolos de segurança contra injeção e filtragem de tópicos para garantir respostas determinísticas.",
                  },
                  {
                    icon: <Zap className="text-ia" aria-hidden="true" />,
                    title: "Orquestração n8n",
                    desc: "Fluxos com tratamento de erro global, workflows modulares e persistência em Supabase.",
                  },
                  {
                    icon: (
                      <MessageSquare className="text-ia" aria-hidden="true" />
                    ),
                    title: "Human-in-the-loop",
                    desc: "Handoff inteligente que notifica a equipe via WhatsApp/CRM em casos de alta prioridade.",
                  },
                  {
                    icon: (
                      <ShieldCheck
                        className="text-ia"
                        size={24}
                        aria-hidden="true"
                      />
                    ),
                    title: "QA de IA",
                    desc: "Sistemas de avaliação automática de diálogos para garantir a qualidade das respostas dos agentes.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-s1 border border-border group hover:border-ia/30 transition-all font-inter"
                  >
                    <div className="mb-4 bg-ia/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space">
                <Code2 size={20} className="text-ia" aria-hidden="true" /> Tech
                Stack
              </h3>
              <div className="space-y-4 font-inter">
                {[
                  { name: "n8n", label: "Orchestration" },
                  { name: "OpenAI (GPT-4)", label: "AI Engine" },
                  { name: "Cloudflare Workers", label: "Security Gateway" },
                  { name: "Supabase", label: "Database" },
                  { name: "React 19 / Next.js", label: "Frontend" },
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
                <Layout size={20} className="text-tech" aria-hidden="true" />{" "}
                Engenharia de Software
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Interessado na stack técnica (React 19, Vite 6, Tailwind 4) e na
                arquitetura desta plataforma?
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/projetos/unificando-plataforma">
                  Ver Vitrine Digital <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="p-8 rounded-3xl bg-ia/5 border border-ia/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Globe size={20} className="text-ia" aria-hidden="true" /> Links
                Úteis
              </h3>
              <nav className="flex flex-col gap-3">
                <a
                  href={SOCIALS.unificando.site}
                  className="text-sm text-text-secondary hover:text-ia transition-colors flex items-center justify-between"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website Oficial <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/renatojuniordw/ui-unificando"
                  className="text-sm text-text-secondary hover:text-ia transition-colors flex items-center justify-between"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repositório GitHub <Github size={14} aria-hidden="true" />
                </a>
                <a
                  href={SOCIALS.unificando.insta}
                  className="text-sm text-text-secondary hover:text-ia transition-colors flex items-center justify-between"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram <ExternalLink size={14} aria-hidden="true" />
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
