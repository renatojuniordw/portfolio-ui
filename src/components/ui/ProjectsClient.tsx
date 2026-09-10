"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { ProjectGrid } from "@/components/ui/ProjectGrid";

export function ProjectsClient() {
  const unificando = PROJECTS.filter((project) => project.group === "unificando");
  const standalone = PROJECTS.filter((project) => project.group !== "unificando");

  return (
    <div className="space-y-16">
      <ScrollReveal>
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-10 shadow-soft-2">
            <div className="absolute inset-0 bg-gradient-to-br from-text/[0.04] via-transparent to-text/[0.02]" />
            <div className="relative flex flex-col gap-4">
              <span className="inline-flex w-max items-center gap-1.5 rounded-full border border-ia/30 bg-ia/5 px-3 py-1 text-xs font-medium text-ia">
                <span className="h-1.5 w-1.5 rounded-full bg-ia" />
                Laboratório de produtos
              </span>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight text-text md:text-4xl">
                Unificando
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
                Meu maior projeto: um laboratório de P&amp;D onde levo ideias de
                IA aplicada e automação da arquitetura à operação —{" "}
                {unificando.length} ferramentas reunidas sob a mesma marca.
              </p>
              <Link
                href="/unificando"
                className="inline-flex w-max items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
              >
                Conheça o laboratório
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ProjectGrid projects={unificando} />
        </section>
      </ScrollReveal>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            Fora do Unificando
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-text">
            Projetos independentes
          </h2>
          <p className="mt-1 text-sm text-muted">
            Freelas, tributos e produtos pontuais — cada um com seu case completo.
          </p>
        </div>
        <ProjectGrid projects={standalone} />
      </section>
    </div>
  );
}
