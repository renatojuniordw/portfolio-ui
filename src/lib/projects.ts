import { PROJECT_CASES } from "@/lib/project-cases";
import type { ProjectCard } from "@/types/project";

/** DTO serializável do card com o link já resolvido. */
export type Project = ProjectCard & { link: string };

export const PROJECTS: Project[] = PROJECT_CASES.map(({ card, pathSegments }) => ({
  ...card,
  link: `/projetos/${pathSegments?.join("/") ?? card.id}`,
}));

/**
 * Seleção editorial exibida na home, em ordem. É uma escolha de apresentação
 * (ecossistema Unificando), não um ranking de uso ou receita.
 */
export const FEATURED_PROJECT_IDS = [
  "radar-unificando",
  "unificando-pdf",
  "unificando-med",
] as const;

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_IDS.map((id) => {
    const project = PROJECTS.find((item) => item.id === id);
    if (!project) throw new Error(`Projeto em destaque não encontrado: ${id}`);
    return project;
  });
}
