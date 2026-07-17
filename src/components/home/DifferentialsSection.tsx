"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import {
  InteractiveImageAccordion,
  type AccordionImageItem,
} from "@/components/ui/interactive-image-accordion";

interface Differential extends AccordionImageItem {
  index: string;
  description: string;
  accent: string;
}

const DIFFERENTIALS: Differential[] = [
  {
    id: "frontend",
    index: "01",
    title: "Front-end de Alta Performance",
    description:
      "Arquiteturas React e Angular focadas em performance e DX. Código que não só funciona, funciona rápido, escala e é fácil de manter.",
    accent: "Front-end · React · Angular · TypeScript",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "ia-generativa",
    index: "02",
    title: "IA Generativa",
    description:
      "Integração de LLMs, RAG e geração de conteúdo direto no produto — não como experimento isolado, mas como camada nativa da arquitetura.",
    accent: "IA Generativa · RAG · OpenAI",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "automacao",
    index: "03",
    title: "Automação & Agentes de IA",
    description:
      "Agentes e fluxos com n8n que reduzem operação manual em semanas, automatizando processos que antes dependiam de times inteiros.",
    accent: "n8n · Agentes de IA · Automação",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "produto",
    index: "04",
    title: "Visão de Produto, não só de Código",
    description:
      "Entrego com métricas. Taxa de conversão, tempo de carregamento, custo por operação — cada decisão técnica é justificada por impacto real no negócio.",
    accent: "Produto · UX · Métricas · Resultado",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
];

export function DifferentialsSection() {
  const [activeId, setActiveId] = useState(DIFFERENTIALS[0].id);
  const active =
    DIFFERENTIALS.find((item) => item.id === activeId) ?? DIFFERENTIALS[0];

  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="section-wrapper bg-surface-2"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="section-label">Por que eu?</span>
            <h2 id="diferenciais-heading" className="section-title">
              O que eu faço diferente
            </h2>
          </div>
        </ScrollReveal>

        {/* Accordion + description panel */}
        <ScrollReveal delay={120}>
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
            {/* Text panel */}
            <div className="w-full md:w-1/3 shrink-0">
              <span className="text-5xl font-display font-light text-border leading-none block mb-4">
                {active.index}
              </span>
              <h3 className="text-2xl font-medium text-text mb-3 leading-snug">
                {active.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                {active.description}
              </p>
              <span className="text-xs font-medium text-muted uppercase tracking-widest">
                {active.accent}
              </span>
            </div>

            {/* Accordion */}
            <div className="w-full md:flex-1 flex justify-center md:justify-end">
              <InteractiveImageAccordion
                items={DIFFERENTIALS}
                activeId={activeId}
                onActiveChange={setActiveId}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
