"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

const ACCENT_COLOR_MAP: Record<string, string> = {
  ia: "text-ia border-ia/30 bg-ia/5",
  tech: "text-tech border-tech/30 bg-tech/5",
  barraco: "text-barraco border-barraco/30 bg-barraco/5",
};

const ACCENT_DOT_MAP: Record<string, string> = {
  ia: "bg-ia",
  tech: "bg-tech",
  barraco: "bg-barraco",
};

export function ProjectsClient() {
  const featuredProject =
    PROJECTS.find((project) => project.id === "unificando-pdf") ??
    PROJECTS[0];
  const secondaryProjects = PROJECTS.filter(
    (project) => project.id !== featuredProject.id,
  );

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <section className="grid gap-6">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-10 shadow-soft-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-text/[0.04] via-transparent to-text/[0.02]" />
            <div className="relative flex h-full flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    ACCENT_COLOR_MAP[featuredProject.accent] ??
                    "text-muted border-border bg-surface"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT_MAP[featuredProject.accent] ?? "bg-muted"}`}
                  />
                  Projeto em destaque
                </span>
                <span className="text-xs uppercase tracking-widest text-muted">
                  {featuredProject.category}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="max-w-xl text-3xl font-semibold leading-tight text-text md:text-5xl">
                  {featuredProject.title}
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
                  {featuredProject.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredProject.techs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={featuredProject.link}
                  className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Ver projeto
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-sm text-muted">
                  Uma visão mais detalhada do trabalho mais representativo.
                </p>
              </div>
            </div>
          </motion.article>
        </section>
      </ScrollReveal>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Demais projetos
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-text">
              Uma grade objetiva e fácil de escanear
            </h3>
          </div>
          <p className="hidden text-sm text-muted md:block">
            Clique em qualquer card para abrir o case completo.
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {secondaryProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-text-secondary hover:bg-surface-2"
            >
              <div className="flex h-full flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-3xl font-display font-light text-border transition-colors duration-300 group-hover:text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                      ACCENT_COLOR_MAP[project.accent] ??
                      "text-muted border-border bg-surface"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT_MAP[project.accent] ?? "bg-muted"}`}
                    />
                    {project.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-semibold leading-tight text-text">
                    {project.title}
                  </h4>
                  <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-text-secondary"
                  >
                    Ver projeto
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
