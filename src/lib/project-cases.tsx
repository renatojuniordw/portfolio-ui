import type { ProjectCase } from "@/types/project";

import { unificandoPdfCase } from "./projects/unificando-pdf";
import { unificandoAutomacaoCase } from "./projects/unificando-automacao";
import { unificandoVitrineCase } from "./projects/unificando-vitrine";
import { mariaClaraSantosCase } from "./projects/mariaclarasantos";
import { seuBarracoEspertoCase } from "./projects/seu-barraco-esperto";
import { oferticandoCase } from "./projects/oferticando";
import { arianoSuassunaCase } from "./projects/ariano-suassuna";
import { sheikCase } from "./projects/sheik";
import { sistema18iaCase } from "./projects/sistema-18ia";

export const PROJECT_CASES: ProjectCase[] = [
  unificandoPdfCase,
  unificandoAutomacaoCase,
  unificandoVitrineCase,
  mariaClaraSantosCase,
  seuBarracoEspertoCase,
  oferticandoCase,
  arianoSuassunaCase,
  sheikCase,
  sistema18iaCase,
];

export function getProjectCaseByPath(segments: string[]) {
  const normalizedPath = segments.filter(Boolean).join("/");
  const projectCase = PROJECT_CASES.find(
    (item) => item.pathSegments?.join("/") === normalizedPath,
  );

  if (!projectCase) {
    throw new Error(`Project not found: ${normalizedPath}`);
  }

  return projectCase;
}
