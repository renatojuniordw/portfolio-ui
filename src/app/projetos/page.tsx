import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectsClient } from "@/components/ui/ProjectsClient";

export const generateMetadata = () =>
  buildMetadata({
    title: "Projetos | Renato Bezerra — Engenharia de Software & IA",
    description:
      "Conheça os projetos de Renato Bezerra: ecossistema de atendimento com IA (Unificando), automação residencial (Seu Barraco Esperto), sites profissionais, LegalTech com API do CNJ, automação para afiliados e mais 9 cases reais.",
    path: "/projetos",
    keywords: [
      "Projetos", "Renato Bezerra", "Unificando", "Seu Barraco Esperto",
      "Oferticando", "IA", "Automação", "Portfólio", "Cases",
    ],
  });

export default function ProjectsPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
  ];

  return (
    <PageLayout maxWidth="6xl">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHeader
        title="Meus Projetos"
        description={<>Uma seleção de trabalhos que unem código, design e impacto real no negócio — de <strong>atendimento WhatsApp com IA</strong> a <strong>interações web de alto desempenho</strong>.</>}
      />

      <ProjectsClient />
    </PageLayout>
  );
}
