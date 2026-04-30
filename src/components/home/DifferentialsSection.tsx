import { ScrollReveal } from "@/components/fx/ScrollReveal";

const DIFFERENTIALS = [
  {
    index: "01",
    title: "Front-end de Alta Performance",
    description:
      "Arquiteturas React e Angular focadas em performance e DX. Código que não só funciona, funciona rápido, escala e é fácil de manter.",
    accent: "Front-end · React · Angular · TypeScript",
  },
  {
    index: "02",
    title: "IA & Automação desde a concepção",
    description:
      "Não adiciono IA como afterthought. Projeto sistemas onde LLMs, n8n e agentes são camadas nativas da arquitetura — reduzindo operação manual em semanas.",
    accent: "n8n · OpenAI",
  },
  {
    index: "03",
    title: "Visão de Produto, não só de Código",
    description:
      "Entrego com métricas. Taxa de conversão, tempo de carregamento, custo por operação — cada decisão técnica é justificada por impacto real no negócio.",
    accent: "Produto · UX · Métricas · Resultado",
  },
];

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-surface-2 relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-sm font-medium text-muted uppercase tracking-widest mb-4 block">
              Por que eu?
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-text">
              O que eu faço diferente
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="space-y-px">
          {DIFFERENTIALS.map((item, index) => (
            <ScrollReveal key={item.index} delay={index * 120} direction="left">
              <div className="group flex flex-col md:flex-row md:items-start gap-8 py-10 border-t border-border hover:border-text transition-colors duration-300 last:border-b last:border-border">
                {/* Index */}
                <span className="text-5xl font-display font-light text-border group-hover:text-muted transition-colors duration-300 shrink-0 w-16 leading-none">
                  {item.index}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-text mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className="text-xs font-medium text-muted uppercase tracking-widest">
                    {item.accent}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
