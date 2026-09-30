import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { PROJECT_AREAS } from "@/lib/project-areas";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <li key={project.id} className="min-w-0">
          <article className="group flex h-full flex-col gap-5 rounded-3xl border border-border bg-surface-1 p-7 transition-colors duration-300 hover:border-text-secondary hover:bg-surface-2">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                {project.category}
              </p>
              <h3 className="text-xl font-semibold leading-tight text-text break-words">
                {project.title}
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                {project.description}
              </p>
            </div>

            {project.areas.length > 0 && (
              <p className="text-xs text-text-secondary">
                <span className="sr-only">Áreas: </span>
                {project.areas.map((area) => PROJECT_AREAS[area]).join(" · ")}
              </p>
            )}

            <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
              {project.techs.map((tech) => (
                <li
                  key={tech}
                  className="inline-block rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-text-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2">
              <Link
                href={project.link}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text underline-offset-4 transition-colors hover:text-text-secondary hover:underline"
              >
                Ver projeto<span className="sr-only"> {project.title}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
