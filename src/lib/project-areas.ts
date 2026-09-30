import type { ProjectArea } from "@/types/project";

/**
 * Taxonomia de áreas e filtro do catálogo. Módulo sem JSX nem dados de case:
 * pode ser importado por componentes client.
 */
export const PROJECT_AREAS: Record<ProjectArea, string> = {
  ia: "IA",
  automacao: "Automação",
  frontend: "Front-end",
};

export type AreaFilter = ProjectArea | "todos";

export const AREA_FILTERS: { value: AreaFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  ...(Object.entries(PROJECT_AREAS) as [ProjectArea, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

/** Valor do parâmetro `area` da URL; ausente ou inválido equivale a "todos". */
export function parseAreaFilter(value: string | null | undefined): AreaFilter {
  return value && Object.hasOwn(PROJECT_AREAS, value) ? (value as ProjectArea) : "todos";
}

export function filterByArea<T extends { areas: ProjectArea[] }>(
  projects: T[],
  area: AreaFilter,
): T[] {
  return area === "todos" ? projects : projects.filter((p) => p.areas.includes(area));
}
