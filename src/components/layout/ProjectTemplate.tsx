import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Code2 } from "lucide-react";
import Link from "next/link";
import { projectJsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/structured-data";
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
    themeColor,
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

  // We map the color dynamic classes here to avoid purge issues,
  // or we can just rely on the existing classes if they are safelisted.
  // Assuming they are safelisted or we interpolate correctly.
  // Tailwind v4 uses variable composition, but string interpolation `bg-${themeColor}` works if the classes are used elsewhere.

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto font-inter">
      {/* We can include organizationJsonLd conditionally if needed, but project pages usually just have project + breadcrumb */}
      {id === "unificando/automacao" && <JsonLd data={organizationJsonLd()} />}
      <JsonLd data={projectJsonLd(jsonLd)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <Link
        href="/projetos"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-tech transition-colors mb-8 group"
      >
        <ArrowLeft
          size={18}
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
                className={`inline-block px-3 py-1 rounded-full bg-${themeColor}/10 text-${themeColor} text-xs font-bold uppercase tracking-widest mb-4`}
              >
                {categoryBadge}
              </span>
              <h1 className="sr-only">{title}</h1>
              <SplitText
                text={title}
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              />
              <div className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                {shortDescription}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {githubUrl && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
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
                  className={`bg-${themeColor} text-white hover:brightness-110 shadow-xl font-bold w-full sm:w-auto`}
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
                <h2 className="text-2xl font-display font-bold text-text">
                  {overviewTitle}
                </h2>
                <div className="prose max-w-none text-text-secondary space-y-4 text-lg">
                  {overviewContent}
                </div>
              </section>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-2xl font-display font-bold text-text">
                  {featuresTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, i) => (
                    <article
                      key={i}
                      className="p-6 rounded-2xl bg-surface-2 border border-border group hover:border-tech/30 transition-all font-inter space-y-3"
                    >
                      {feature.icon && (
                        <div className={`mb-4 bg-${themeColor}/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                           {feature.icon}
                        </div>
                      )}
                      <h3 className="font-bold text-text">{feature.title}</h3>
                      <p className="text-sm text-text-secondary">{feature.description}</p>
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
                className={`p-8 rounded-3xl bg-${themeColor}/5 border border-${themeColor}/20 space-y-8`}
                aria-labelledby={section.id}
              >
                {section.icon && (
                   <div className={`w-12 h-12 rounded-2xl bg-${themeColor}/10 flex items-center justify-center`}>
                      {section.icon}
                   </div>
                )}
                <h2
                  id={section.id}
                  className="text-2xl font-display font-bold font-space flex items-center gap-3 text-text"
                >
                  {section.title}
                </h2>

                <div className="space-y-8 text-text-secondary">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <aside className="space-y-8">
            {/* Tech Stack */}
            {sidebarTechStack && sidebarTechStack.length > 0 && (
              <div className="p-8 rounded-3xl bg-surface-2 border border-border">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-space text-text">
                  <Code2 size={20} className={`text-${themeColor}`} aria-hidden="true" />{" "}
                  {sidebarTechStackTitle}
                </h3>
                <div className="space-y-4 font-inter text-sm">
                  {sidebarTechStack.map((tech, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-xs text-muted uppercase font-bold tracking-wider">
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
              <div key={i} className={`p-8 rounded-3xl bg-${themeColor}/5 border border-${themeColor}/10`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text">
                  {card.icon}
                  {card.title}
                </h3>
                <div className="text-sm text-text-secondary leading-relaxed">
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
