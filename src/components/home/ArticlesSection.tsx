"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

const ARTICLES = [
  {
    id: 1,
    title: "AWS Lambda + MySQL + JWT: Autenticação Serverless",
    description:
      "Como criar um projeto Lambda que conecta a um banco de dados SQL, valida usuários e gera tokens JWT para autenticação.",
    tags: ["AWS Lambda", "Node.js", "JWT", "MySQL"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "5 min",
    year: "2021",
  },
  {
    id: 2,
    title: "Envio de E-mails com Nodemailer e Gmail SMTP",
    description:
      "Guia completo de configuração do Nodemailer com Express e servidor SMTP do Google para envio de e-mails em Node.js.",
    tags: ["Node.js", "Nodemailer", "Express", "SMTP"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "4 min",
    year: "2021",
  },
  {
    id: 3,
    title: "Incorporando PDF em Páginas Web",
    description:
      "Duas abordagens para embedar PDFs — usando tags nativas do HTML e a biblioteca PDFObject — com dicas de CSS responsivo.",
    tags: ["HTML", "JavaScript", "PDF", "Web"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "3 min",
    year: "2020",
  },
  {
    id: 4,
    title: "PnP JS vs SQL: CRUD no SharePoint explicado",
    description:
      "Comparação lado a lado entre PnP JS e SQL para operações de SELECT, INSERT, UPDATE, DELETE e JOINs em listas SharePoint.",
    tags: ["SharePoint", "PnP JS", "SQL", "Microsoft 365"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "6 min",
    year: "2020",
  },
];

export function ArticlesSection() {
  return (
    <section
      id="artigos"
      className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-bg relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-text mb-4">
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
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-surface border border-border text-text text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#111111] dark:bg-white flex items-center justify-center text-white dark:text-[#111111] group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
