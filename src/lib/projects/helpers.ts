import type { ProjectBreadcrumb, ProjectCard } from "@/types/project";

export function projectPath(...segments: string[]) {
  return `/projetos/${segments.join("/")}`;
}

export function card(
  id: string,
  title: string,
  category: string,
  description: string,
  accent: ProjectCard["accent"],
  techs: string[],
  {
    group,
    areas,
    thumbnail,
  }: Pick<ProjectCard, "areas"> & Partial<Pick<ProjectCard, "group" | "thumbnail">>,
): ProjectCard {
  return {
    id,
    title,
    category,
    description,
    accent,
    techs,
    areas,
    ...(group ? { group } : {}),
    ...(thumbnail ? { thumbnail } : {}),
  };
}

export function breadcrumbs(
  ...items: Array<{ name: string; item: string }>
): ProjectBreadcrumb[] {
  return [{ name: "Home", item: "/" }, { name: "Projetos", item: "/projetos" }, ...items];
}

/**
 * IDs determinísticos de uma seção extra do case: a âncora pública fica na
 * `<section>` e o heading recebe um ID próprio para `aria-labelledby`.
 */
export function extraSectionIds(projectId: string, sectionId: string | undefined, index: number) {
  const anchor = sectionId ?? `${projectId}-secao-${index + 1}`;
  return { anchor, heading: `${anchor}-heading` };
}

/**
 * Participação nos produtos autorais do Unificando, conforme descrito na
 * página /unificando ("desenho arquitetura, integro sistemas e opero produtos
 * autorais de ponta a ponta"). Projetos sem informação explícita omitem `role`.
 */
export const UNIFICANDO_AUTHORIAL_ROLE =
  "Produto autoral do laboratório Unificando: desenho da arquitetura, integração de sistemas, implementação e operação de ponta a ponta.";
