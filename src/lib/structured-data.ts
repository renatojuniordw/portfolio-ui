import { SOCIALS, PROFILE } from "./constants";

const SITE_URL = SOCIALS.personal.site;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: "Software Engineer",
    url: SITE_URL,
    sameAs: [
      SOCIALS.personal.linkedin,
      SOCIALS.personal.github,
      SOCIALS.personal.insta,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Recife",
      addressRegion: "PE",
      addressCountry: "BR",
    },
    description: PROFILE.summary,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PROFILE.name,
    url: SITE_URL,
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
    logo: `${SITE_URL}/unificando-logo.png`, // Placeholder
    description: "Ecosistema de suporte digital e automação com IA.",
    sameAs: [SOCIALS.unificando.insta],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Automação Residencial e Consultoria Tech",
    provider: {
      "@type": "Person",
      name: PROFILE.name,
    },
    areaServed: {
      "@type": "City",
      name: "Recife",
    },
    description:
      "Projetos de casa inteligente com Alexa, automação de processos e criação de sites profissionais.",
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
