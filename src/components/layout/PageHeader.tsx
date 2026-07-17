import { SplitText } from "@/components/fx/SplitText";

import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: ReactNode;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-16">
      <h1 className="sr-only">{title}</h1>
      <SplitText
        text={title}
        className="text-4xl md:text-6xl font-display font-bold mb-4"
      />
      <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
        {description}
      </p>
    </header>
  );
}
