import { SOCIALS, PROFILE } from "./constants";
import { EDUCATIONS } from "./education";

const SITE_URL = SOCIALS.personal.site;

const SKILLS = [
  "React", "Angular", "Next.js", "TypeScript", "JavaScript",
  "TailwindCSS", "Node.js", "C#", "Python",
  "OpenAI", "LLM", "Prompt Engineering", "n8n", "RAG",
  "SharePoint", "SQL Server", "MySQL", "AWS Lambda",
  "Git", "Docker", "HTML5", "CSS3",
];

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.fullName,
    alternateName: [PROFILE.name, PROFILE.handle],
    jobTitle: PROFILE.title,
    url: SITE_URL,
    sameAs: [
      SOCIALS.personal.linkedin,
      SOCIALS.personal.github,
      SOCIALS.personal.insta,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paulista",
      addressRegion: "PE",
      addressCountry: "BR",
    },
    description: PROFILE.summary.slice(0, 300),
    knowsAbout: SKILLS,
    alumniOf: EDUCATIONS.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Recife",
        addressRegion: "PE",
        addressCountry: "BR",
      },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PROFILE.fullName} — Portfólio`,
    url: SITE_URL,
    description: `${PROFILE.name} — ${PROFILE.title}.`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Unificando",
    url: SOCIALS.unificando.site,
    logo: `${SITE_URL}/unificando-logo.png`,
    description: "Ecossistema de suporte digital e automação com IA.",
    sameAs: [SOCIALS.unificando.insta],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Engenharia de Software, Front-end & Automação com IA",
    provider: {
      "@type": "Person",
      name: PROFILE.name,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Brasil" },
      { "@type": "Country", name: "Worldwide" },
    ],
    description:
      "Engenharia de software front-end (React, Angular, Next.js), consultoria em automação com IA (GPT, n8n, RAG) e criação de produtos digitais de alta performance.",
  };
}

export function projectJsonLd(project: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    author: {
      "@type": "Person",
      name: PROFILE.name,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.item}`,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedTime,
    author: {
      "@type": "Person",
      name: PROFILE.name,
      url: SITE_URL,
    },
    keywords: article.tags.join(", "),
  };
}
