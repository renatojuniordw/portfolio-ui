import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/structured-data";
import { PROJECTS } from "@/lib/projects";
import { SOCIALS } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: "Unificando — Laboratório de Produtos",
    description:
      "Unificando é o laboratório de produtos e P&D de Renato Bezerra: ferramentas de IA aplicada, automação e utilitários — Radar (vagas com IA), Med (busca semântica local), PDF (suíte de documentos) e pacotes open source no npm.",
    path: "/unificando",
    keywords: [
      "Unificando",
      "Laboratório de produtos",
      "P&D",
      "IA aplicada",
      "Automação",
      "Radar Unificando",
      "Med Unificando",
      "PDF Unificando",
    ],
  });

export default function UnificandoPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Unificando", item: "/unificando" },
  ];

  const tools = PROJECTS.filter((project) => project.group === "unificando");

  return (
    <PageLayout maxWidth="5xl">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={organizationJsonLd()} />

      <PageHeader
        title="Unificando"
        description="Meu laboratório de produtos — onde levo ideias de IA aplicada e automação da arquitetura à operação."
      />

      <section className="mb-16 max-w-2xl space-y-4">
        <p className="text-lg font-light leading-relaxed text-text-secondary">
          O <strong>Unificando</strong> nasceu de organizar repositórios soltos
          em um lugar só: uma organização no GitHub e um site que reúne{" "}
          <strong>{tools.length} ferramentas</strong> em produção. É onde eu
          desenho arquitetura, integro sistemas e opero produtos autorais de
          ponta a ponta — de agentes e RAG a automações com n8n.
        </p>
        <p className="text-lg font-light leading-relaxed text-text-secondary">
          Cada ferramenta abaixo tem um estudo de caso próprio. Projetos
          independentes (freelas, tributos e produtos pontuais) ficam na página
          de projetos.
        </p>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
          <a
            href={SOCIALS.unificando.site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Acessar unificando.com.br
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={SOCIALS.unificando.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-text transition-colors hover:border-text"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub da organização
          </a>
        </div>
      </section>

      <section aria-labelledby="ferramentas-unificando" className="space-y-6">
        <h2
          id="ferramentas-unificando"
          className="text-2xl font-display font-bold"
        >
          Ferramentas
        </h2>
        <ProjectGrid projects={tools} />
      </section>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-text-secondary"
        >
          Ver todos os projetos, incluindo trabalhos independentes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </PageLayout>
  );
}
