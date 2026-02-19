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

export default function MariaClaraSantosProjectPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
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
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-tech/10 text-tech text-xs font-bold uppercase tracking-widest mb-4">
              Freelance / Institucional
            </span>
            <SplitText
              text="Maria Clara Santos"
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Landing page de alta conversão para advocacia previdenciária, com
              foco em segurança digital e experiência humanizada.
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
              Ver Projeto <ExternalLink className="ml-2" size={18} />
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
                cruciais para quem busca benefícios do INSS.
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
          <section className="p-8 rounded-3xl bg-tech/5 border border-tech/20 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-tech/10 flex items-center justify-center">
              <Lock className="text-tech" />
            </div>
            <h2 className="text-2xl font-display font-bold">
              Inovação em Segurança
            </h2>
            <p className="text-text-secondary">
              Desenvolvi um sistema de{" "}
              <strong>Verificação de Contato Oficial</strong>. O cliente pode
              digitar o número de telefone que o contatou e o site valida
              instantaneamente se aquele canal pertence ao escritório, reduzindo
              drasticamente o risco de fraudes e garantindo a segurança jurídica
              das informações.
            </p>
          </section>

          {/* Core Values */}
          <section className="space-y-8">
            <h2 className="text-2xl font-display font-bold">
              Foco Estratégico
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Search className="text-tech" />,
                  title: "SEO Jurídico",
                  desc: "Estrutura otimizada para buscas locais em Recife e termos específicos do Direito Previdenciário.",
                },
                {
                  icon: <Users className="text-tech" />,
                  title: "UX Humanizada",
                  desc: "Interface limpa e acessível, pensada para o público que busca auxílios e aposentadorias.",
                },
                {
                  icon: <ShieldCheck className="text-tech" />,
                  title: "Segurança de Dados",
                  desc: "Implementação de práticas de proteção de dados e alertas de transparência.",
                },
                {
                  icon: <Scale className="text-tech" />,
                  title: "Conversão Direta",
                  desc: "CTA estratégico integrado ao WhatsApp para agilizar o atendimento inicial.",
                },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-s1 border border-border group hover:border-tech/30 transition-all"
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
        </div>

        <aside className="space-y-8">
          <div className="p-8 rounded-3xl bg-surface-2 border border-border">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Code2 size={20} className="text-tech" /> Solução Técnica
            </h3>
            <div className="space-y-4">
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
              <Globe size={20} className="text-tech" /> Links
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://mariaclarasantos.adv.br/"
                className="text-sm text-text-secondary hover:text-tech transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website Oficial <ExternalLink size={14} />
              </a>
              <a
                href="https://github.com/renatojuniordw/portfolio-maria-clara"
                className="text-sm text-text-secondary hover:text-tech transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório GitHub <Github size={14} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
