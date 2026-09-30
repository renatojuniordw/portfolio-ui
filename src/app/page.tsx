import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PROFILE, getYearsOfExperience } from "@/lib/constants";
import { getRecentPosts } from "@/lib/blog";

export const revalidate = 3600;

export const generateMetadata = () =>
  buildMetadata({
    title: `${PROFILE.name} | Engenheiro de Software · IA Aplicada & Automação`,
    description: `Portfólio de ${PROFILE.name}, Engenheiro de Software com +${getYearsOfExperience()} anos de experiência. Atuação atual em IA aplicada à engenharia de software e automação — agentes, RAG, n8n — sobre uma base sólida de front-end (React, Angular, Next.js) e arquitetura (FIAP). Experiência no setor petrolífero, startups e produtos próprios.`,
    keywords: [
      "Renato Bezerra", "Engenheiro de Software", "IA aplicada", "IA Generativa",
      "Automação com IA", "RAG", "Agentes de IA", "Arquitetura de Software",
      "Front-end", "React", "Angular", "Next.js",
      "Portfólio", "Recife", "Paulista", "PCD",
    ],
  });

export default function Home() {
  const recentPosts = getRecentPosts(2);

  return (
    <div className="w-full bg-bg text-text relative transition-colors duration-300">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <HeroSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <DifferentialsSection />
      <ToolsSection />
      <GitHubSection />
      <ArticlesSection posts={recentPosts} />
      <ContactSection />
    </div>
  );
}
