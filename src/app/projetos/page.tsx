import { SplitText } from "@/components/fx/SplitText";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectsClient } from "@/components/ui/ProjectsClient";

export const generateMetadata = () =>
  buildMetadata({
    title: "Projetos | Engenheiro de Software & Automação",
    description:
      "Explore os projetos de Renato Bezerra: de ecossistemas de atendimento com IA (Unificando) a arquitetura front-end e automação residencial.",
    path: "/projetos",
  });

export default function ProjectsPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <header className="mb-16">
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

      <ProjectsClient />
    </div>
  );
}
