import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import { CaseStudyBlock } from "@/components/ui/CaseStudyBlock";
import { ArrowLeft, ExternalLink, Github, Code2 } from "lucide-react";
import Link from "next/link";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectDetails } from "@/types/project";
import React from "react";

interface ProjectTemplateProps {
  project: ProjectDetails;
}

export function ProjectTemplate({ project }: ProjectTemplateProps) {
  const {
    id,
    jsonLd,
    breadcrumbs,
    categoryBadge,
    title,
    shortDescription,
    githubUrl,
    liveUrl,
    overviewTitle = "O Projeto",
    overviewContent,
    featuresTitle = "Funcionalidades Principais",
    features,
    extraSections,
    sidebarTechStackTitle = "Tech Stack",
    sidebarTechStack,
    sidebarExtraCards,
  } = project;

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto font-inter">
      <JsonLd data={projectJsonLd(jsonLd)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {project.schemas?.map((schema, index) => (
        <JsonLd key={`${id}-schema-${index}`} data={schema} />
      ))}

      <Link
        href="/projetos"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text transition-colors mb-8 group text-sm font-medium"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
          aria-hidden="true"
        />
        Voltar para Projetos
      </Link>

      <main>
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span
                className="inline-block px-4 py-1.5 bg-surface text-text text-xs font-medium rounded-full mb-4 uppercase tracking-wider"
              >
                {categoryBadge}
              </span>
              <h1 className="sr-only">{title}</h1>
              <SplitText
                text={title}
                className="text-4xl md:text-6xl font-display font-light tracking-tight mb-6 text-text"
              />
              <div className="text-xl text-text-secondary font-light leading-relaxed">
                {shortDescription}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {githubUrl && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-border text-text hover:border-text hover:bg-transparent font-medium text-sm"
                  asChild
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2" size={18} aria-hidden="true" />
                    Ver no GitHub
                  </a>
                </Button>
              )}
              {liveUrl && (
                <Button
                  size="lg"
                  className="bg-text text-bg hover:opacity-90 transition-opacity font-medium w-full sm:w-auto rounded-full text-sm"
                  asChild
                >
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    Acesse o site <ExternalLink className="ml-2" size={18} aria-hidden="true" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-16">
            {/* Overview */}
            {overviewContent && (
              <section className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-display font-light tracking-tight text-text">
                  {overviewTitle}
                </h2>
                <div className="text-text-secondary space-y-4 text-lg font-light leading-relaxed">
                  {overviewContent}
                </div>
              </section>
            )}

            {/* Case Study */}
            {project.caseStudy && (
              <section className="space-y-8">
                <h2 className="text-2xl lg:text-3xl font-display font-light tracking-tight text-text">
                  Case Study
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <CaseStudyBlock type="challenge">{project.caseStudy.challenge}</CaseStudyBlock>
                  <CaseStudyBlock type="solution">{project.caseStudy.solution}</CaseStudyBlock>
                  <CaseStudyBlock type="result">{project.caseStudy.result}</CaseStudyBlock>
                </div>
              </section>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-2xl lg:text-3xl font-display font-light tracking-tight text-text">
                  {featuresTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, i) => (
                    <article
                      key={i}
                      className="project-card hover:border-[#111111] transition-colors duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {feature.icon && (
                          <div className="mb-6 bg-bg w-12 h-12 rounded-full border border-border flex items-center justify-center">
                             {feature.icon}
                          </div>
                        )}
                        <h3 className="text-xl font-medium text-text mb-2">{feature.title}</h3>
                        <p className="text-text-secondary text-sm font-light leading-relaxed">{feature.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Extra Sections */}
            {extraSections && extraSections.map((section, idx) => (
              <section
                key={idx}
                id={section.id}
                className="project-card space-y-6"
                aria-labelledby={section.id}
              >
                {section.icon && (
                   <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center">
                      {section.icon}
                   </div>
                )}
                <h2
                  id={section.id}
                  className="text-2xl lg:text-3xl font-display font-light tracking-tight text-text flex items-center gap-3"
                >
                  {section.title}
                </h2>

                <div className="text-text-secondary text-lg font-light leading-relaxed space-y-4">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <aside className="space-y-8">
            {/* Tech Stack */}
            {sidebarTechStack && sidebarTechStack.length > 0 && (
              <div className="project-card">
                <h3 className="text-lg font-medium mb-6 flex items-center gap-2 text-text">
                  <Code2 size={20} className="text-text" aria-hidden="true" />{" "}
                  {sidebarTechStackTitle}
                </h3>
                <div className="space-y-4 font-inter text-sm">
                  {sidebarTechStack.map((tech, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-xs text-muted uppercase font-medium tracking-wider">
                        {tech.label}
                      </span>
                      <span className="text-text font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Cards */}
            {sidebarExtraCards && sidebarExtraCards.map((card, i) => (
              <div key={i} className="project-card">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-text">
                  {card.icon}
                  {card.title}
                </h3>
                <div className="text-sm text-text-secondary leading-relaxed font-light">
                  {card.content}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}
