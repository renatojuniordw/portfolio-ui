"use client";

import { BookOpen, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { Tag } from "@/components/ui/Tag";
import { ARTICLES } from "@/lib/articles";

export function ArticlesSection() {
  return (
    <section
      id="artigos"
      aria-labelledby="artigos-heading"
      className="section-wrapper bg-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 id="artigos-heading" className="section-title mb-4">
                Artigos
              </h2>
              <p className="text-xl text-text-secondary font-light">
                Escrito no{" "}
                <strong className="text-text font-medium">Medium</strong> —
                compartilhando conhecimento técnico.
              </p>
            </div>
            <a
              href="https://medium.com/@renatobezerrajunior"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver no Medium (abre em nova aba)"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-text rounded-full font-medium text-sm hover:border-[#111111] dark:hover:border-white transition-colors group shrink-0"
            >
              Ver no Medium
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 100} direction="up">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${article.title} (abre em nova aba)`}
                className="group p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
              >
              <div>
                {/* Top row: year + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-muted uppercase tracking-widest">
                    {article.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <BookOpen className="w-3 h-3" />
                    {article.readTime} de leitura
                  </span>
                </div>

                <h3 className="text-xl font-medium text-text mb-3 group-hover:text-text-secondary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>

              {/* Footer: tags + arrow */}
              <div className="flex items-end justify-between mt-6 gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <ArrowCta />
              </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
