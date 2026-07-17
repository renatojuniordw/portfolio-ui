import type { ReactNode } from "react";

type CaseStudyType = "challenge" | "solution" | "result";

const CASE_STYLES: Record<CaseStudyType, { border: string; label: string }> = {
  challenge: { border: "border-l-red-500", label: "text-red-500" },
  solution: { border: "border-l-tech", label: "text-tech" },
  result: { border: "border-l-green-500", label: "text-green-500" },
};

const CASE_LABELS: Record<CaseStudyType, string> = {
  challenge: "Desafio",
  solution: "Solução",
  result: "Resultado",
};

interface CaseStudyBlockProps {
  type: CaseStudyType;
  children: ReactNode;
}

export function CaseStudyBlock({ type, children }: CaseStudyBlockProps) {
  const styles = CASE_STYLES[type];
  return (
    <div className={`p-6 rounded-2xl bg-surface-2 border border-border border-l-[3px] ${styles.border}`}>
      <span className={`text-xs font-medium ${styles.label} uppercase tracking-widest mb-2 block`}>
        {CASE_LABELS[type]}
      </span>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </div>
  );
}
