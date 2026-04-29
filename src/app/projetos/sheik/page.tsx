import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  BarChart3,
  Users,
  Instagram,
  Target,
  Code2,
  Github,
} from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Diego Sheik - Mídia Kit Interativo",
    description:
      "Mídia kit interativo desenvolvido para o criador de conteúdo Diego Sheik, focado em conversão, métricas de Instagram e prospecção de marcas.",
    path: "/projetos/sheik",
  });

export default function SheikPage() {
  const projectData = {
    name: "Diego Sheik - Mídia Kit",
    description:
      "Mídia kit dinâmico com insights de audiência e métricas em tempo real focado na atração de marcas e patrocínios.",
    url: "https://sheik.unificando.com.br/",
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Diego Sheik", item: "/projetos/sheik" },
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
                Mídia & Influência
              </span>
              <h1 className="sr-only">Diego Sheik - Mídia Kit</h1>
              <SplitText
                text="Diego Sheik: Mídia Kit"
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Mídia kit interativo projetado para o criador de conteúdo{" "}
                <strong>Diego Sheik</strong>, destacando métricas de audiência,{" "}
                formatos de parceria e engajamento no Instagram.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://github.com/renatojuniordw/sheik-mediakit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2" size={18} aria-hidden="true" />
                  Ver no GitHub
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-tech text-white hover:bg-tech/90 shadow-tech/20 shadow-xl w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://sheik.unificando.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acesse o site{" "}
                  <ExternalLink className="ml-2" size={18} aria-hidden="true" />
                </a>
              </Button>
            </div>
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
                  Criadores de conteúdo precisam de materiais profissionais para 
                  apresentar seus números a marcas e agências. O objetivo deste 
                  projeto foi desenvolver um <strong>Mídia Kit digital e interativo</strong>,
                  substituindo os tradicionais e estáticos PDFs por uma experiência 
                  imersiva e sempre atualizada.
                </p>
                <p>
                  A aplicação foca em expor de maneira clara o perfil da 
                  audiência, insights de alcance e os principais pacotes de 
                  parceria comercial que o influenciador oferece.
                </p>
              </div>
            </section>

            {/* Funcionalidades */}
            <section className="space-y-8">
              <h2 className="text-2xl font-display font-bold font-space text-text">
                Destaques da Plataforma
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <BarChart3 className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Métricas e Insights</h3>
                  <p className="text-sm text-text-secondary">
                    Exibição clara de métricas de alcance, impressões e taxas 
                    de engajamento do Instagram.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <Users className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Perfil do Público</h3>
                  <p className="text-sm text-text-secondary">
                    Demonstração demográfica detalhada para que as marcas
                    avaliem o alinhamento de público-alvo.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <Instagram className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Formatos de Parceria</h3>
                  <p className="text-sm text-text-secondary">
                    Seção dedicada aos pacotes comerciais disponíveis, como 
                    Stories, Reels, provadores e presenças VIP.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <Target className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Foco em Conversão</h3>
                  <p className="text-sm text-text-secondary">
                    Design responsivo e direto ao ponto, com CTAs otimizados 
                    para iniciar o contato com a assessoria.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-8 rounded-3xl bg-surface-2 border border-border">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space text-text">
                <Code2 size={20} className="text-tech" aria-hidden="true" />{" "}
                Detalhes
              </h3>
              <div className="space-y-4 font-inter text-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">
                    Cliente
                  </span>
                  <span className="text-text font-medium">Diego Sheik</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">
                    Categoria
                  </span>
                  <span className="text-text font-medium">Mídia Kit / Landing Page</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">
                    Foco
                  </span>
                  <span className="text-text font-medium">Parcerias e Patrocínios</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
