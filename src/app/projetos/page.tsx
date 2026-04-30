import { SplitText } from "@/components/fx/SplitText";
import { ProjectCard } from "@/components/ui/ProjectCard";
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
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
          Uma seleção de trabalhos que unem código, design e impacto real no
          negócio — de <strong>atendimento WhatsApp com IA</strong> a{" "}
          <strong>interações web de alto desempenho</strong>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            title={project.title}
            description={project.description}
            category={project.category}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
