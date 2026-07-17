import { Star, Code2, Users } from "lucide-react";
import { SOCIALS } from "@/lib/constants";
import { fetchGitHubStats } from "@/lib/github";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

export async function GitHubSection() {
  const stats = await fetchGitHubStats();

  if (!stats) {
    return (
      <section className="section-wrapper bg-bg">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label">GitHub</span>
          <p className="text-text-secondary">
            Dados do GitHub temporariamente indisponíveis.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrapper bg-bg">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">GitHub</span>
              <h2 className="section-title">
                Código Aberto
              </h2>
            </div>
            <a
              href={SOCIALS.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text rounded-full text-sm font-medium hover:border-[#111111] dark:hover:border-white transition-colors shrink-0"
            >
              Ver no GitHub →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal delay={0}>
            <div className="p-8 rounded-2xl bg-surface-2 border border-border flex flex-col items-center text-center">
              <Code2 className="w-6 h-6 text-text-secondary mb-3" />
              <p className="text-4xl font-display font-bold text-text">
                {stats.publicRepos}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Repositórios
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="p-8 rounded-2xl bg-surface-2 border border-border flex flex-col items-center text-center">
              <Star className="w-6 h-6 text-text-secondary mb-3" />
              <p className="text-4xl font-display font-bold text-text">
                {stats.totalStars}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Stars
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="p-8 rounded-2xl bg-surface-2 border border-border flex flex-col items-center text-center">
              <Users className="w-6 h-6 text-text-secondary mb-3" />
              <p className="text-4xl font-display font-bold text-text">
                {stats.followers}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Seguidores
              </p>
            </div>
          </ScrollReveal>
        </div>

        {stats.topLanguages.length > 0 && (
          <ScrollReveal delay={300}>
            <div className="mt-8 p-8 rounded-2xl bg-surface-2 border border-border">
              <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-4">
                Linguagens mais usadas
              </h3>
              <div className="flex h-3 rounded-full overflow-hidden">
                {stats.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                    className="first:rounded-l-full last:rounded-r-full"
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                {stats.topLanguages.map((lang) => (
                  <span
                    key={lang.name}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.name}
                    <span className="text-muted">{lang.percentage}%</span>
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
