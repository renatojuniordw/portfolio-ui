"use client";

import { useState, useMemo } from "react";
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
    id: "ia-generativa",
    index: "01",
    title: "IA Generativa",
    description:
      "Integração de LLMs, RAG e geração de conteúdo direto no produto, como camada nativa da arquitetura — não como experimento isolado.",
    accent: "IA Generativa · RAG · OpenAI",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "automacao",
    index: "02",
    title: "Automação & Agentes de IA",
    description:
      "Agentes e fluxos com n8n que reduzem operação manual em semanas, automatizando processos que antes dependiam de times inteiros.",
    accent: "n8n · Agentes de IA · Automação",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "frontend",
    index: "03",
    title: "Front-end de Alta Performance",
    description:
      "Base de anos em React e Angular: arquiteturas focadas em performance e DX, código que escala e é fácil de manter. É o alicerce de engenharia por trás do resto.",
    accent: "Front-end · React · Angular · TypeScript",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
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

const PANEL_ID = "diferenciais-painel";
const tabId = (id: string) => `diferencial-aba-${id}`;

export function DifferentialsSection() {
  const [activeId, setActiveId] = useState(DIFFERENTIALS[0].id);
  const active = useMemo(
    () => DIFFERENTIALS.find((item) => item.id === activeId) ?? DIFFERENTIALS[0],
    [activeId],
  );

  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="section-wrapper bg-surface-2"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="section-label">Por que eu?</span>
            <h2 id="diferenciais-heading" className="section-title">
              O que eu faço diferente
            </h2>
          </div>
        </ScrollReveal>

        {/* Telas pequenas: os quatro diferenciais visíveis, sem depender de toque. */}
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
          {DIFFERENTIALS.map((item) => (
            <li key={item.id} className="project-card p-6">
              <span aria-hidden="true" className="block text-sm font-medium text-muted mb-2">
                {item.index}
              </span>
              <h3 className="text-xl font-medium text-text mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-3">
                {item.description}
              </p>
              <span className="text-xs font-medium text-muted uppercase tracking-widest">
                {item.accent}
              </span>
            </li>
          ))}
        </ol>

        {/* Telas amplas: abas interativas. Oculto (display:none) abaixo de lg. */}
        <ScrollReveal delay={120} className="hidden lg:block">
          <div className="flex flex-row items-center gap-12">
            <div
              role="tabpanel"
              id={PANEL_ID}
              aria-labelledby={tabId(active.id)}
              className="w-1/3 min-w-0 shrink-0"
            >
              <span
                aria-hidden="true"
                className="text-5xl font-display font-light text-muted leading-none block mb-4"
              >
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

            <div className="flex min-w-0 flex-1 justify-end">
              <InteractiveImageAccordion
                items={DIFFERENTIALS}
                activeId={activeId}
                onActiveChange={setActiveId}
                label="Diferenciais"
                panelId={PANEL_ID}
                tabId={tabId}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
