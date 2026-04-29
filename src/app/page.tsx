import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PROFILE } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: `${PROFILE.fullName} | Engenheiro de Software`,
    description:
      `Portfólio de ${PROFILE.fullName}, Engenheiro de Software em Recife, especialista em React, Angular e automações com IA. Criando arquiteturas front-end de alta performance.`,
  });

export default function Home() {
  return (
    <main className="w-full bg-[#FFFFFF] text-[#111111] relative overflow-x-hidden">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <HeroSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
