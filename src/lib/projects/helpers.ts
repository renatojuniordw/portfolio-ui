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
): ProjectCard {
  return { id, title, category, description, accent, techs };
}

export function breadcrumbs(
  ...items: Array<{ name: string; item: string }>
): ProjectBreadcrumb[] {
  return [{ name: "Home", item: "/" }, { name: "Projetos", item: "/projetos" }, ...items];
}
