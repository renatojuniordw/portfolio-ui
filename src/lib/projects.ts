import { PROJECT_CASES } from "@/lib/project-cases";
import type { ProjectCard } from "@/types/project";

export type Project = ProjectCard & { link: string };

export const PROJECTS: Project[] = PROJECT_CASES.map(({ card, pathSegments }) => ({
  ...card,
  link: `/projetos/${pathSegments?.join("/") ?? card.id}`,
}));
