import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd, faqJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PROFILE } from "@/lib/constants";
import { getRecentPosts } from "@/lib/blog";

export const revalidate = 3600;

export const generateMetadata = () =>
  buildMetadata({
    title: `${PROFILE.name} | Engenheiro de Software · IA Aplicada & Automação`,
    description: `Portfólio de ${PROFILE.name}, Engenheiro de Software com +7 anos de experiência. Atuação atual em IA aplicada à engenharia de software e automação — agentes, RAG, n8n — sobre uma base sólida de front-end (React, Angular, Next.js) e arquitetura (FIAP). Experiência no setor petrolífero, startups e produtos próprios.`,
    keywords: [
      "Renato Bezerra", "Engenheiro de Software", "IA aplicada", "IA Generativa",
      "Automação com IA", "RAG", "Agentes de IA", "Arquitetura de Software",
      "Front-end", "React", "Angular", "Next.js",
      "Portfólio", "Recife", "Paulista", "PCD",
    ],
  });

export default function Home() {
  const recentPosts = getRecentPosts(2);

  const faqItems = [
    {
      question: "O que diferencia seu trabalho como engenheiro de software front-end?",
      answer: "Combino arquiteturas React e Angular com decisões orientadas a produto: performance, DX e manutenibilidade guiam cada escolha técnica.",
    },
    {
      question: "Como você usa IA Generativa nos seus projetos?",
      answer: "Integração de LLMs, RAG e geração de conteúdo direto no produto, como camada nativa da arquitetura — não como experimento isolado.",
    },
    {
      question: "Você trabalha com automação e agentes de IA?",
      answer: "Agentes e fluxos com n8n que reduzem operação manual em semanas, automatizando processos que antes dependiam de times inteiros.",
    },
    {
      question: "Qual sua abordagem em relação à visão de produto?",
      answer: "Entrego com métricas. Taxa de conversão, tempo de carregamento, custo por operação — cada decisão técnica é justificada por impacto real no negócio.",
    },
    {
      question: "Como posso começar a trabalhar com você?",
      answer: "O caminho mais rápido é pelo WhatsApp: conte sobre o projeto e eu respondo com um diagnóstico e os próximos passos. Para demandas maiores, marcamos uma call antes da proposta.",
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
      <ToolsSection />
      <ArticlesSection posts={recentPosts} />
      <ContactSection />
    </div>
  );
}
