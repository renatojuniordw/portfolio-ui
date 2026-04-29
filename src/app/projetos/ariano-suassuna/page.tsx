import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  GraduationCap,
  History,
  ShieldAlert,
  Code2,
  Github,
} from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Ariano Suassuna - Site Tributo Educacional",
    description:
      "Site educacional sobre a vida e obra de Ariano Suassuna. Projeto comunitário focado na preservação da memória cultural.",
    path: "/projetos/ariano-suassuna",
  });

export default function ArianoSuassunaPage() {
  const projectData = {
    name: "Ariano Suassuna - Tributo",
    description:
      "Site educacional sobre a vida e obra de Ariano Suassuna, originado de um projeto estudantil em 2016 e mantido como esforço da comunidade.",
    url: "https://ariano-suassuna.unificando.com.br/",
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Ariano Suassuna", item: "/projetos/ariano-suassuna" },
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
                Educacional / Cultura
              </span>
              <h1 className="sr-only">Ariano Suassuna - Tributo</h1>
              <SplitText
                text="Ariano Suassuna: Tributo"
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Site educacional e colaborativo dedicado à vida e obra de{" "}
                <strong>Ariano Suassuna</strong>, preservando a cultura e
                memória nordestina na web.
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
                  href="https://github.com/renatojuniordw/ui-ariano-suassuna"
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
                  href="https://ariano-suassuna.unificando.com.br/"
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
                O Projeto & História
              </h2>
              <div className="prose max-w-none text-text-secondary space-y-4 text-lg">
                <p>
                  A aplicação nasceu de um esforço estudantil colaborativo em{" "}
                  <strong>2016</strong>, durante um curso no{" "}
                  <strong>CRC Recife</strong>. Desde então, a plataforma evoluiu
                  para se tornar um acervo digital mantido pela comunidade.
                </p>
                <p>
                  O principal objetivo deste site é garantir que as gerações
                  futuras tenham acesso facilitado e estruturado às
                  contribuições literárias, teatrais e filosóficas de Ariano,
                  promovendo a rica cultura do Nordeste brasileiro.
                </p>
              </div>
            </section>

            {/* Funcionalidades / Pilares */}
            <section className="space-y-8">
              <h2 className="text-2xl font-display font-bold font-space text-text">
                Pilares do Tributo
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <History className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Preservação Histórica</h3>
                  <p className="text-sm text-text-secondary">
                    Acervo digital detalhado sobre a vida, obra e impacto
                    cultural do autor na literatura e dramaturgia.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <BookOpen className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Foco Educacional</h3>
                  <p className="text-sm text-text-secondary">
                    Conteúdo estruturado e acessível, ideal para estudantes,
                    professores e pesquisadores da cultura nordestina.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <GraduationCap className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Origem Acadêmica</h3>
                  <p className="text-sm text-text-secondary">
                    Nascido em sala de aula no CRC Recife em 2016, refletindo o
                    trabalho e dedicação de alunos em tecnologia.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <ShieldAlert className="text-tech" size={24} />
                  <h3 className="font-bold text-text">Transparência</h3>
                  <p className="text-sm text-text-secondary">
                    Iniciativa sem fins lucrativos e 100% não oficial. Sem
                    vínculos institucionais com a família ou editores.
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
                    Início
                  </span>
                  <span className="text-text font-medium">2016 (CRC Recife)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">
                    Natureza
                  </span>
                  <span className="text-text font-medium">Tributo / Acervo</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">
                    Stack (Atual)
                  </span>
                  <span className="text-text font-medium">React / Vite</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-tech/5 border border-tech/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text">
                <ShieldAlert
                  size={20}
                  className="text-tech"
                  aria-hidden="true"
                />{" "}
                Aviso Legal
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Este é um site de caráter puramente <strong>educacional e de fã</strong>.
                Não possui qualquer vínculo oficial com os herdeiros, 
                representantes legais ou editoras das obras de Ariano Suassuna.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
