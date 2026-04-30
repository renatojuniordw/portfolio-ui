import Link from "next/link";
import { Accessibility, ArrowRight } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { GitHubCalendarWrapper } from "@/components/ui/GitHubCalendarWrapper";


export function AboutSection() {
  const yearsOfExperience = new Date().getFullYear() - 2017;

  return (
    <section
      id="sobre"
      className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-surface-2 relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-text mb-8">
          Sobre mim
        </h2>
        <p className="text-xl lg:text-2xl text-text-secondary font-light leading-relaxed mb-20">
          Meu nome é <strong>{PROFILE.fullName}</strong>. Sou{" "}
          <strong>Engenheiro de Software</strong>, com foco em arquitetura
          front-end e automação com IA para criação de produtos digitais de
          alto impacto.
        </p>

        <div className="space-y-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="col-span-1 p-8 rounded-2xl bg-surface-2 border border-border flex flex-col justify-between hover:border-[#111111] transition-colors duration-300">
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

            <article className="col-span-1 md:col-span-2 p-8 rounded-2xl bg-surface-2 border border-border flex flex-col justify-center hover:border-[#111111] transition-colors duration-300">
              <span className="text-sm font-medium text-muted uppercase tracking-widest mb-6 block">
                Foco e Formação
              </span>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-text mb-1">
                    Software Engineer
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    CESAR & Unificando Digital • Front-end e Automações com IA
                  </p>
                </div>
                <div className="pt-6 border-t border-border">
                  <h3 className="text-xl font-medium text-text mb-1">
                    Arquitetura de Software
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Especialização pela FIAP • Microsoft Specialist Certified
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <GitHubCalendarWrapper />
        
        <div className="mb-20 mt-12">

          <Link
            href="/curriculo"
            className="inline-flex items-center justify-center px-8 py-4 bg-text text-bg rounded-full font-medium text-sm hover:bg-black transition-colors group"
          >
            Ver currículo completo
            <span className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <span className="transform -rotate-45 block text-xs">→</span>
            </span>
          </Link>
        </div>

        <div className="pt-20 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-text mb-4">
                Projetos
              </h2>
              <p className="text-xl text-text-secondary font-light">
                Uma seleção de <strong>{PROJECTS.length} cases</strong> de
                sucesso.
              </p>
            </div>
            <Link
              href="/projetos"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-text rounded-full font-medium text-sm hover:border-[#111111] transition-colors group"
            >
              Ver todos os projetos
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 2).map((project) => (
              <Link
                key={project.id}
                href={project.link}
                className="group p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-surface border border-border text-text text-xs font-medium rounded-full mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-medium text-text mb-2 group-hover:text-text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex justify-end mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-45" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 p-6 rounded-2xl bg-bg border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-2xl mx-auto hover:border-[#111111] transition-colors duration-300">
          <div className="p-4 bg-surface-2 rounded-full shrink-0">
            <Accessibility size={24} className="text-text" />
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
