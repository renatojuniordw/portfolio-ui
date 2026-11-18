import type { ProjectCase } from "@/types/project";

import { unificandoPdfCase } from "./projects/unificando-pdf";
import { unificandoAutomacaoCase } from "./projects/unificando-automacao";
import { unificandoVitrineCase } from "./projects/unificando-vitrine";
import { unificandoMedCase } from "./projects/unificando-med";
import { radarUnificandoCase } from "./projects/radar-unificando";
import { mariaClaraSantosCase } from "./projects/mariaclarasantos";
import { aventuraNicolasEloaCase } from "./projects/aventura-nicolas-eloa";
import { lojaDocesCase } from "./projects/loja-doces";
import { previandoCase } from "./projects/previando";
import { oferticandoCase } from "./projects/oferticando";
import { seuBarracoEspertoCase } from "./projects/seu-barraco-esperto";
import { arianoSuassunaCase } from "./projects/ariano-suassuna";
import { sheikCase } from "./projects/sheik";
import { sistema18iaCase } from "./projects/sistema-18ia";
import { promptsCase } from "./projects/prompts";
import { refinaCase } from "./projects/refina";

export const PROJECT_CASES: ProjectCase[] = [
  radarUnificandoCase,
  unificandoPdfCase,
  unificandoMedCase,
  promptsCase,
  refinaCase,
  unificandoAutomacaoCase,
  unificandoVitrineCase,
  mariaClaraSantosCase,
  lojaDocesCase,
  aventuraNicolasEloaCase,
  previandoCase,
  oferticandoCase,
  seuBarracoEspertoCase,
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
