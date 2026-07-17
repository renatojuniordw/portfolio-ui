import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PROFILE } from "@/lib/constants";
import { getRecentPosts } from "@/lib/blog";

export const generateMetadata = () =>
  buildMetadata({
    title: `${PROFILE.name} | Engenheiro de Software Front-end & IA Generativa`,
    description: `Portfólio de ${PROFILE.name}, Engenheiro de Software especializado em React, Angular, Next.js e Inteligência Artificial Generativa. Mais de 7 anos criando aplicações escaláveis no setor petrolífero, startups e projetos próprios com automação, RAG e agentes de IA. Pós-graduado em Arquitetura de Software (FIAP).`,
    keywords: [
      "Renato Bezerra", "Engenheiro de Software", "Front-end", "React",
      "Angular", "Next.js", "IA Generativa", "Automação com IA",
      "Portfólio", "Recife", "Paulista", "PCD",
    ],
  });

export default function Home() {
  const recentPosts = getRecentPosts(2);

  return (
    <div className="w-full bg-bg text-text relative overflow-x-hidden transition-colors duration-300">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <HeroSection />
      <AboutSection />
      <DifferentialsSection />
      <GitHubSection />
      <ArticlesSection posts={recentPosts} />
      <ContactSection />
    </div>
  );
}
