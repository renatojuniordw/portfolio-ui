import Link from "next/link";
import { Accessibility } from "lucide-react";
import { PROFILE, getYearsOfExperience } from "@/lib/constants";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

export function AboutSection() {
  const yearsOfExperience = getYearsOfExperience();

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="section-wrapper bg-surface-2"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 id="sobre-heading" className="section-title mb-8">
            Sobre mim
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary font-light leading-relaxed mb-12 lg:mb-20">
            Meu nome é <strong>{PROFILE.fullName}</strong>. Sou{" "}
            <strong>Engenheiro de Software</strong> com foco atual em{" "}
            <strong>IA aplicada e automação</strong> — apoiado em anos de base
            sólida em front-end (React, Angular, Next.js) e arquitetura.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="col-span-1 p-8 project-card flex flex-col justify-between hover:border-text transition-colors duration-300">
                <div>
                  <span className="text-sm font-medium text-muted uppercase tracking-widest mb-4 block">
                    Experiência
                  </span>
                  <h3 className="text-6xl font-display font-light text-text mb-2">
                    {yearsOfExperience}+
                  </h3>
                  <p className="text-text-secondary text-lg font-light">
                    Anos de atuação com tecnologia
                  </p>
                </div>
              </article>

              <article className="col-span-1 md:col-span-2 p-8 project-card flex flex-col justify-center hover:border-text transition-colors duration-300">
                <span className="text-sm font-medium text-muted uppercase tracking-widest mb-6 block">
                  Foco e Formação
                </span>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-text mb-1">
                      Software Engineer
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      CESAR & Unificando Digital • IA aplicada, automação e
                      front-end
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-xl font-medium text-text mb-1">
                      Formação
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      Especialização em NLP (UFG, em andamento) • Arquitetura de
                      Software (FIAP) • Microsoft Specialist Certified
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12">
          <Link
            href="/curriculo"
            className="inline-flex min-h-11 items-center justify-center px-8 py-4 bg-text text-bg rounded-full font-medium text-sm hover:opacity-90 transition-opacity group"
          >
            Ver currículo completo
            <span
              aria-hidden="true"
              className="ml-3 w-6 h-6 rounded-full bg-bg/20 flex items-center justify-center group-hover:bg-bg/30 transition-colors"
            >
              <span className="transform -rotate-45 block text-xs">→</span>
            </span>
          </Link>
        </div>

        <div className="mt-20 p-6 rounded-2xl bg-bg border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-2xl mx-auto hover:border-text transition-colors duration-300">
          <div className="p-4 bg-surface-2 rounded-full shrink-0">
            <Accessibility size={24} className="text-text" aria-hidden="true" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base font-medium text-text mb-2 uppercase tracking-wider text-xs">
              Acessibilidade e Inclusão (PCD)
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {PROFILE.pcdNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
