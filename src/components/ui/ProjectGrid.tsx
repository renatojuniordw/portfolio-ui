"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { EASE_OUT } from "@/lib/utils";

const CARD_INITIAL = { opacity: 0, y: 20 };
const CARD_ANIMATE = { opacity: 1, y: 0 };

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          layout
          initial={CARD_INITIAL}
          animate={CARD_ANIMATE}
          transition={{ duration: 0.35, delay: index * 0.04, ease: EASE_OUT }}
          className="group rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-text-secondary hover:bg-surface-2"
        >
          <div className="flex h-full flex-col gap-5">
            <span className="text-3xl font-display font-light text-border transition-colors duration-300 group-hover:text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold leading-tight text-text">
                {project.title}
              </h3>
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
  );
}
