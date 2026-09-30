"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import {
  AREA_FILTERS,
  filterByArea,
  parseAreaFilter,
  type AreaFilter,
} from "@/lib/project-areas";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { cn } from "@/lib/utils";

interface ProjectsClientProps {
  /** DTOs serializáveis dos cards, projetados no servidor. */
  projects: Project[];
}

/**
 * Catálogo filtrável por área. O HTML estático (fallback do Suspense) já traz
 * o catálogo completo; no cliente, o filtro lê e grava o parâmetro `area`.
 */
export function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <Suspense fallback={<Catalog projects={projects} area="todos" />}>
      <FilterableCatalog projects={projects} />
    </Suspense>
  );
}

function FilterableCatalog({ projects }: ProjectsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const area = parseAreaFilter(searchParams.get("area"));

  function select(next: AreaFilter) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "todos") params.delete("area");
    else params.set("area", next);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return <Catalog projects={projects} area={area} onSelect={select} />;
}

function Catalog({
  projects,
  area,
  onSelect,
}: ProjectsClientProps & { area: AreaFilter; onSelect?: (area: AreaFilter) => void }) {
  const visible = filterByArea(projects, area);
  const unificando = visible.filter((project) => project.group === "unificando");
  const standalone = visible.filter((project) => project.group !== "unificando");
  const totalUnificando = projects.filter((project) => project.group === "unificando").length;
  const areaLabel = AREA_FILTERS.find((f) => f.value === area)?.label;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div role="group" aria-label="Filtrar projetos por área" className="flex flex-wrap gap-2">
          {AREA_FILTERS.map((filter) => {
            const pressed = filter.value === area;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => onSelect?.(filter.value)}
                className={cn(
                  "min-h-11 rounded-full border px-5 text-sm font-medium transition-colors",
                  pressed
                    ? "border-text bg-text text-bg"
                    : "border-border bg-bg text-text-secondary hover:border-text hover:text-text",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="text-sm text-text-secondary">
          {visible.length === 1 ? "1 projeto encontrado" : `${visible.length} projetos encontrados`}
          {area !== "todos" && ` em ${areaLabel}`}
        </p>
      </div>

      {visible.length === 0 && (
        <div className="rounded-3xl border border-border p-8 text-center">
          <p className="text-text-secondary">Nenhum projeto nesta área por enquanto.</p>
          <button
            type="button"
            onClick={() => onSelect?.("todos")}
            className="mt-4 min-h-11 rounded-full border border-border px-5 text-sm font-medium text-text hover:border-text"
          >
            Limpar filtro
          </button>
        </div>
      )}

      {unificando.length > 0 && (
        <section aria-labelledby="grupo-unificando" className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1 p-8 md:p-10 shadow-soft-2">
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-text/[0.04] via-transparent to-text/[0.02]" />
            <div className="relative flex flex-col gap-4">
              <span className="inline-flex w-max items-center gap-1.5 rounded-full border border-ia/30 bg-ia/5 px-3 py-1 text-xs font-medium text-ia">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ia" />
                Laboratório de produtos
              </span>
              <h2 id="grupo-unificando" className="max-w-xl text-3xl font-semibold leading-tight text-text md:text-4xl">
                Unificando
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
                Meu maior projeto: um laboratório de P&amp;D onde levo ideias de
                IA aplicada e automação da arquitetura à operação —{" "}
                {totalUnificando} ferramentas reunidas sob a mesma marca.
              </p>
              <Link
                href="/unificando"
                className="inline-flex min-h-11 w-max items-center gap-2 rounded-full bg-text px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                Conheça o laboratório
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ProjectGrid projects={unificando} />
        </section>
      )}

      {standalone.length > 0 && (
        <section aria-labelledby="grupo-independentes" className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">Fora do Unificando</p>
            <h2 id="grupo-independentes" className="mt-2 text-2xl font-semibold text-text">
              Projetos independentes
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Freelas, tributos e produtos pontuais — cada um com seu case completo.
            </p>
          </div>
          <ProjectGrid projects={standalone} />
        </section>
      )}
    </div>
  );
}
