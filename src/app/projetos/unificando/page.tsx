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
} from "lucide-react";
import Link from "next/link";

export default function UnificandoProjectPage() {
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
            <span className="inline-block px-3 py-1 rounded-full bg-ia/10 text-ia text-xs font-bold uppercase tracking-widest mb-4">
              IA & Automação
            </span>
            <SplitText
              text="Unificando"
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Ecosistema completo de atendimento inteligente para redes sociais,
              transformando interações em conversões reais.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-ia hover:bg-ia/90 shadow-ia/20 shadow-xl"
            asChild
          >
            <a
              href={SOCIALS.unificando.site}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acesse o site <ExternalLink className="ml-2" size={18} />
            </a>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {/* Overview */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold">
              O Que é o Unificando?
            </h2>
            <div className="prose prose-invert max-w-none text-text-secondary space-y-4">
              <p>
                O Unificando surgiu da necessidade de pequenas e médias empresas
                gerenciarem o grande fluxo de mensagens no Instagram e WhatsApp
                de forma organizada e escalável.
              </p>
              <p>
                Diferente de CRMs tradicionais, o foco aqui é o{" "}
                <strong>atendimento ativo</strong>. Desenvolvemos uma camada de
                inteligência capaz de entender o contexto da conversa, responder
                dúvidas frequentes e qualificar leads antes mesmo de um humano
                intervir.
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="space-y-8">
            <h2 className="text-2xl font-display font-bold">
              Funcionalidades Chave
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Bot className="text-ia" />,
                  title: "Chatbots com IA",
                  desc: "Agentes treinados com dados específicos do negócio para um atendimento humanizado.",
                },
                {
                  icon: <Zap className="text-ia" />,
                  title: "Automação via n8n",
                  desc: "Fluxos complexos que conectam o atendimento a planilhas, CRMs e agendas.",
                },
                {
                  icon: <MessageSquare className="text-ia" />,
                  title: "Multi-atendimento",
                  desc: "Centralização de múltiplas contas de WhatsApp e Instagram em uma única interface.",
                },
                {
                  icon: <Cpu className="text-ia" />,
                  title: "Dashboard de IA",
                  desc: "Métricas de sentimento das conversas e taxa de resolução automatizada.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-s1 border border-border group hover:border-ia/30 transition-all"
                >
                  <div className="mb-4 bg-ia/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-8 rounded-3xl bg-surface-2 border border-border">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Code2 size={20} className="text-ia" /> Tech Stack
            </h3>
            <div className="space-y-4">
              {[
                { name: "React", label: "Framework" },
                { name: "TailwindCSS", label: "Styling" },
                { name: "n8n", label: "Workflow Automation" },
                { name: "OpenAI", label: "IA Engine" },
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

          <div className="p-8 rounded-3xl bg-ia/5 border border-ia/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-ia" /> Links Úteis
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={SOCIALS.unificando.site}
                className="text-sm text-text-secondary hover:text-ia transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website Oficial <ExternalLink size={14} />
              </a>
              <a
                href={SOCIALS.unificando.insta}
                className="text-sm text-text-secondary hover:text-ia transition-colors flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
