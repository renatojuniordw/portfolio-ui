import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PROFILE } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: `${PROFILE.name} | Engenheiro de Software`,
    description: `Portfólio de ${PROFILE.name}, Engenheiro de Software em Recife, especialista em React, Angular e automações com IA. Criando arquiteturas front-end de alta performance.`,
  });

export default function Home() {
  return (
    <main className="w-full bg-bg text-text relative overflow-x-hidden transition-colors duration-300">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <HeroSection />
      <AboutSection />
      <DifferentialsSection />
      {/* <SkillsSection /> */}
      <ArticlesSection />
      <ContactSection />
    </main>
  );
}
