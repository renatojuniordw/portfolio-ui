import { ReactNode } from "react";

export interface ProjectFeature {
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface ProjectExtraSection {
  id?: string;
  title: string;
  icon?: ReactNode;
  content: string | ReactNode;
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

  // Structured Data (JSON-LD)
  jsonLd: ProjectJsonLdData;
  breadcrumbs: ProjectBreadcrumb[];

  // Header
  categoryBadge: string;
  title: string;
  shortDescription: string | ReactNode;
  themeColor: string;

  // Links
  githubUrl?: string;
  liveUrl?: string;

  // Content - Overview
  overviewTitle?: string;
  overviewContent: string | ReactNode;

  // Content - Features
  featuresTitle?: string;
  features?: ProjectFeature[];

  // Content - Extra Sections
  extraSections?: ProjectExtraSection[];

  // Sidebar
  sidebarTechStackTitle?: string;
  sidebarTechStack?: SidebarTechStack[];
  sidebarExtraCards?: SidebarExtraCard[];
}
