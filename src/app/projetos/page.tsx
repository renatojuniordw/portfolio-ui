import { SplitText } from "@/components/fx/SplitText";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Projetos | Engenheiro de Software & Automação",
    description:
      "Explore os projetos de Renato Bezerra: de ecossistemas de atendimento com IA (Unificando) a arquitetura front-end e automação residencial.",
    path: "/projetos",
  });

import { PROJECTS } from "@/lib/projects";

export default function ProjectsPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <header className="mb-20">
        <h1 className="sr-only">Portfólio de Projetos - Renato Bezerra</h1>
        <SplitText
          text="Meus Projetos"
          className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight"
        />
        <p className="text-lg md:text-xl text-[#666666] max-w-2xl leading-relaxed">
          Uma seleção de trabalhos que unem código, design e impacto real no
          negócio — de <strong>atendimento WhatsApp com IA</strong> a{" "}
          <strong>interações web de alto desempenho</strong>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <Link
            key={project.id}
            href={project.link}
            className="group relative block bg-[#F9F9F9] hover:bg-[#F4F4F4] p-8 md:p-10 rounded-xl transition-all duration-300 ease-out border border-transparent hover:border-[#E5E5E5] hover:-translate-y-1"
          >
            <div className="flex flex-col h-full justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-5xl md:text-6xl font-display font-light text-[#E5E5E5] group-hover:text-[#CCCCCC] transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="inline-block px-4 py-1.5 bg-white text-[#111111] text-xs font-medium rounded-full border border-[#EEEEEE]">
                    {project.category}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#111111] leading-tight">
                  {project.title}
                </h2>
                <p className="text-[#666666] text-base md:text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-end">
                <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
