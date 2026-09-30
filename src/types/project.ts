import { ReactNode } from "react";

/** Área funcional do projeto (independente de stack, cor ou grupo). */
export type ProjectArea = "ia" | "automacao" | "frontend";

export interface ProjectThumbnail {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Origem da captura (registrada para manutenção; não é exibida). */
  source: string;
}

/**
 * Dados simples e serializáveis do card. É o único formato de projeto que
 * pode atravessar a fronteira server → client.
 */
export interface ProjectCard {
  id: string;
  title: string;
  category: string;
  description: string;
  accent: "ia" | "tech" | "barraco";
  techs: string[];
  areas: ProjectArea[];
  thumbnail?: ProjectThumbnail;
  link?: string;
  group?: "unificando" | "standalone";
}

export interface ProjectFeature {
  icon?: ReactNode;
  title: string;
  description: string;
  link?: { href: string; label: string };
}

export interface ProjectExtraSection {
  id?: string;
  title: string;
  icon?: ReactNode;
  content: string | ReactNode;
}

export interface ProjectCaseStudy {
  challenge: string | ReactNode;
  solution: string | ReactNode;
  result: string | ReactNode;
}

export interface SidebarTechStack {
  label: string;
  name: string;
}

export interface SidebarExtraCard {
  icon?: ReactNode;
  title: string;
  content: string | ReactNode;
}

export interface ProjectBreadcrumb {
  name: string;
  item: string;
}

export interface ProjectJsonLdData {
  name: string;
  description: string;
  url: string;
}

export interface ProjectDetails {
  id: string;
  pathSegments?: string[];

  // Structured Data (JSON-LD)
  jsonLd: ProjectJsonLdData;
  schemas?: Array<Record<string, unknown>>;
  breadcrumbs: ProjectBreadcrumb[];

  // Header
  categoryBadge: string;
  title: string;
  shortDescription: string | ReactNode;
  themeColor: string;

  // Links
  githubUrl?: string;
  liveUrl?: string;

  // Content - Overview (contexto)
  overviewTitle?: string;
  overviewContent: string | ReactNode;

  /**
   * Participação no projeto. Preencher somente com informação explícita;
   * sem dado verificado, omitir (não inventar função, período ou status).
   */
  role?: string | ReactNode;

  // Content - Features
  featuresTitle?: string;
  features?: ProjectFeature[];

  // Content - Case Study (Desafio → Solução → Resultado)
  caseStudy?: ProjectCaseStudy;

  // Content - Extra Sections
  extraSections?: ProjectExtraSection[];

  // Sidebar
  sidebarTechStackTitle?: string;
  sidebarTechStack?: SidebarTechStack[];
  sidebarExtraCards?: SidebarExtraCard[];
}

export interface ProjectCase extends ProjectDetails {
  card: ProjectCard;
}
