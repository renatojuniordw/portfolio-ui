import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PROJECT_CASES, getProjectCaseByPath } from "@/lib/project-cases";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";

type ProjectPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return PROJECT_CASES.map((project) => ({
    slug: project.pathSegments ?? [project.id],
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = getProjectCaseByPath(slug);

    return buildMetadata({
      title: project.title,
      description: project.jsonLd.description,
      path: `/projetos/${slug.join("/")}`,
    });
  } catch {
    return buildMetadata({
      title: "Projeto",
      noIndex: true,
    });
  }
}

function resolveProject(slug: string[]) {
  try {
    return getProjectCaseByPath(slug);
  } catch {
    notFound();
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = resolveProject(slug);

  return <ProjectTemplate project={project} />;
}
