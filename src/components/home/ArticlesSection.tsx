"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { Tag } from "@/components/ui/Tag";

interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

interface ArticlesSectionProps {
  posts?: BlogPostSummary[];
}

export function ArticlesSection({ posts = [] }: ArticlesSectionProps) {
  return (
    <section
      id="artigos"
      aria-labelledby="artigos-heading"
      className="section-wrapper bg-bg"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">Blog</span>
              <h2 id="artigos-heading" className="section-title">
                Artigos Recentes
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text rounded-full text-sm font-medium hover:border-[#111111] dark:hover:border-white transition-colors shrink-0 group"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 100} direction="up">
              <Link
                href={`/blog/${post.slug}`}
                className="group p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <time className="text-xs font-medium text-muted uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "short",
                      })}
                    </time>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <BookOpen className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-text mb-3 group-hover:text-text-secondary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
