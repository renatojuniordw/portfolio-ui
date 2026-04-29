import { ReactNode } from "react";

export interface ProjectFeature {
  iconName?: string; // We'll pass the name of the icon as a string if using a dynamic icon loader, or we can map it in the template
  icon?: ReactNode; // For now we can accept the ReactNode directly since it's static, but string is better for Supabase
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
  content: string | ReactNode; // HTML string or ReactNode
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
  id: string; // The project slug
  // SEO
  seoTitle: string;
  seoDescription: string;
  
  // Structured Data (JSON-LD)
  jsonLd: ProjectJsonLdData;
  breadcrumbs: ProjectBreadcrumb[];

  // Header
  categoryBadge: string;
  title: string;
  shortDescription: string | ReactNode; // Allow HTML string for Supabase later
  themeColor: string; // Tailwind color name like "tech", "ia", etc.
  
  // Links
  githubUrl?: string;
  liveUrl?: string;
  
  // Content - Overview
  overviewTitle?: string; // Default: "O Projeto"
  overviewContent: string | ReactNode;
  
  // Content - Features
  featuresTitle?: string; // Default: "Funcionalidades"
  features?: ProjectFeature[];
  
  // Content - Extra Sections
  extraSections?: ProjectExtraSection[];

  // Sidebar
  sidebarTechStackTitle?: string; // Default: "Tech Stack"
  sidebarTechStack?: SidebarTechStack[];
  sidebarExtraCards?: SidebarExtraCard[];
}
