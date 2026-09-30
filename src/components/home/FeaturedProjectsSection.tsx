import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects, PROJECTS } from "@/lib/projects";
import { PROJECT_AREAS } from "@/lib/project-areas";
import { ACCENT_DOT } from "@/lib/project-theme";
import { cn } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const featured = getFeaturedProjects();

  return (
    <section
      id="projetos-selecionados"
      aria-labelledby="projetos-selecionados-heading"
      className="section-wrapper bg-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="section-label">Trabalho</span>
            <h2 id="projetos-selecionados-heading" className="section-title">
              Projetos selecionados
            </h2>
            <p className="mt-4 max-w-xl text-lg text-text-secondary font-light">
              Três cases entre {PROJECTS.length}: produtos com IA e automação
              residencial com IoT.
            </p>
          </div>
          <Link
            href="/projetos"
            className="inline-flex min-h-11 w-max items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-text transition-colors hover:border-text shrink-0"
          >
            Ver todos os projetos
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <li key={project.id} className="min-w-0">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-1 transition-colors duration-300 hover:border-text-secondary">
                <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-border bg-surface-2">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail.src}
                      alt={project.thumbnail.alt}
                      width={project.thumbnail.width}
                      height={project.thumbnail.height}
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    // Sem captura real disponível: fallback editorial, sem imagem simulada.
                    <div
                      aria-hidden="true"
                      className="flex h-full w-full flex-col justify-between p-6"
                    >
                      <span className={cn("h-2 w-2 rounded-full", ACCENT_DOT[project.accent])} />
                      <span className="font-display text-3xl font-light leading-tight text-text">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-medium leading-tight text-text">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                  <p className="text-xs text-text-secondary">
                    <span className="sr-only">Áreas: </span>
                    {project.areas.map((area) => PROJECT_AREAS[area]).join(" · ")}
                  </p>
                  <Link
                    href={project.link}
                    className="mt-auto inline-flex min-h-11 w-max items-center gap-2 text-sm font-medium text-text underline-offset-4 hover:underline"
                  >
                    Ver case<span className="sr-only"> {project.title}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
