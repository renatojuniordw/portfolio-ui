import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd, faqJsonLd } from "@/lib/structured-data";
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

  const faqItems = [
    {
      question: "O que diferencia seu trabalho como engenheiro de software front-end?",
      answer: "Arquiteturas React e Angular focadas em performance e DX. Código que não só funciona, funciona rápido, escala e é fácil de manter.",
    },
    {
      question: "Como você usa IA Generativa nos seus projetos?",
      answer: "Integração de LLMs, RAG e geração de conteúdo direto no produto — não como experimento isolado, mas como camada nativa da arquitetura.",
    },
    {
      question: "Você trabalha com automação e agentes de IA?",
      answer: "Agentes e fluxos com n8n que reduzem operação manual em semanas, automatizando processos que antes dependiam de times inteiros.",
    },
    {
      question: "Qual sua abordagem em relação à visão de produto?",
      answer: "Entrego com métricas. Taxa de conversão, tempo de carregamento, custo por operação — cada decisão técnica é justificada por impacto real no negócio.",
    },
  ];

  return (
    <div className="w-full bg-bg text-text relative overflow-x-hidden transition-colors duration-300">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(faqItems)} />

      <HeroSection />
      <AboutSection />
      <DifferentialsSection />
      <GitHubSection />
      <ArticlesSection posts={recentPosts} />
      <ContactSection />
    </div>
  );
}
