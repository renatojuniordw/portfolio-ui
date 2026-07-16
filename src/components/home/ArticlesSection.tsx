"use client";

import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

export function ArticlesSection() {
  return (
    <section
      id="artigos"
      aria-labelledby="artigos-heading"
      className="section-wrapper bg-bg"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <Link
            href="/blog"
            className="group block p-8 md:p-12 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-14 h-14 rounded-2xl bg-ia/10 border border-ia/20 items-center justify-center shrink-0">
                  <PenLine className="w-6 h-6 text-ia" />
                </div>
                <div>
                  <h2 id="artigos-heading" className="text-2xl md:text-3xl font-display font-bold text-text mb-2">
                    Blog
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    Artigos sobre engenharia de software, IA, automação e tecnologia.
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-sm font-medium text-text whitespace-nowrap group-hover:gap-3 transition-all shrink-0">
                Ver todos os artigos
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
