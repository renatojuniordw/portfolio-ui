"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

// Extrai categorias únicas dos dados
function getFilters(projects: Project[]) {
  const cats = Array.from(new Set(projects.map((p) => p.category)));
  return ["Todos", ...cats];
}

export function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filters = useMemo(() => getFilters(PROJECTS), []);

  const filtered = useMemo(
    () =>
      activeFilter === "Todos"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const hoveredProject = PROJECTS.find((p) => p.id === hoveredId) ?? null;

  const accentColorMap: Record<string, string> = {
    ia: "text-ia border-ia/30 bg-ia/5",
    tech: "text-tech border-tech/30 bg-tech/5",
    barraco: "text-barraco border-barraco/30 bg-barraco/5",
  };

  const accentDotMap: Record<string, string> = {
    ia: "bg-ia",
    tech: "bg-tech",
    barraco: "bg-barraco",
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Main column */}
      <div className="flex-1 min-w-0">
        {/* Filter Bar */}
        <ScrollReveal>
          <div
            role="tablist"
            aria-label="Filtrar projetos por categoria"
            className="flex flex-wrap gap-2 mb-10"
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-text text-bg border-text"
                    : "bg-transparent text-text-secondary border-border hover:border-text hover:text-text"
                }`}
              >
                {f}
                {f !== "Todos" && (
                  <span className="ml-1.5 opacity-50 text-xs">
                    {PROJECTS.filter((p) => p.category === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={project.link}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(project.id)}
                  onBlur={() => setHoveredId(null)}
                  className={`group relative block p-8 rounded-2xl border transition-all duration-300 ${
                    hoveredId === project.id
                      ? "bg-surface-2 border-text -translate-y-1 shadow-soft-2"
                      : "bg-surface border-border hover:border-text-secondary"
                  }`}
                >
                  <div className="flex flex-col gap-5">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-display font-light text-border group-hover:text-muted transition-colors duration-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          accentColorMap[project.accent] ??
                          "text-muted border-border bg-surface"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${accentDotMap[project.accent] ?? "bg-muted"}`}
                        />
                        {project.category}
                      </span>
                    </div>

                    {/* Title + description */}
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-text leading-tight mb-2">
                        {project.title}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Techs */}
                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2.5 py-1 bg-bg border border-border text-muted text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-end">
                      <div className="w-10 h-10 rounded-full bg-text flex items-center justify-center text-bg group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-text-secondary text-center py-16">
            Nenhum projeto nessa categoria.
          </p>
        )}
      </div>

      {/* Hover Preview Panel — desktop only */}
      <div className="hidden lg:block w-72 shrink-0 sticky top-32">
        <AnimatePresence mode="wait">
          {hoveredProject ? (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-surface-2 border border-border"
            >
              {/* Accent dot + category */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`w-2 h-2 rounded-full ${accentDotMap[hoveredProject.accent] ?? "bg-muted"}`}
                />
                <span className="text-xs font-medium text-muted uppercase tracking-widest">
                  {hoveredProject.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text mb-3 leading-snug">
                {hoveredProject.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {hoveredProject.description}
              </p>

              {/* Techs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {hoveredProject.techs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block px-3 py-1 bg-bg border border-border text-text text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={hoveredProject.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-text hover:text-text-secondary transition-colors group"
              >
                Ver case completo
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center gap-3 min-h-[200px]"
            >
              <span className="text-3xl">🖱️</span>
              <p className="text-sm text-muted">
                Passe o mouse sobre um projeto para ver o preview
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
