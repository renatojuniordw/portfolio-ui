import { Star, Code2, Users } from "lucide-react";
import { SOCIALS } from "@/lib/constants";
import { fetchGitHubStats } from "@/lib/github";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

function ProfileLink() {
  return (
    <a
      href={SOCIALS.personal.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 px-6 py-3 border border-border text-text rounded-full text-sm font-medium hover:border-text transition-colors shrink-0"
    >
      Ver perfil no GitHub <span aria-hidden="true">→</span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

export async function GitHubSection() {
  const stats = await fetchGitHubStats();

  return (
    <section aria-labelledby="github-heading" className="section-wrapper bg-bg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">GitHub</span>
            <h2 id="github-heading" className="section-title">
              Código Aberto
            </h2>
          </div>
          <ProfileLink />
        </div>

        {!stats ? (
          // Falha da API é mostrada como indisponibilidade, nunca como zero.
          <p className="text-text-secondary">
            Os números do GitHub estão temporariamente indisponíveis. Os
            repositórios continuam acessíveis pelo perfil.
          </p>
        ) : (
          <>
            <ScrollReveal>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Code2, label: "Repositórios públicos", value: stats.publicRepos },
                  { icon: Star, label: "Estrelas", value: stats.totalStars },
                  { icon: Users, label: "Seguidores", value: stats.followers },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="p-8 project-card flex flex-col-reverse items-center text-center"
                  >
                    <dt className="text-sm text-text-secondary mt-1">{label}</dt>
                    <dd className="flex flex-col items-center text-4xl font-display font-bold text-text">
                      <Icon aria-hidden="true" className="w-6 h-6 text-text-secondary mb-3" />
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>

            {stats.topLanguages.length > 0 && (
              <ScrollReveal delay={300}>
                <div className="mt-8 p-8 project-card">
                  <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-4">
                    Linguagens principais dos repositórios
                  </h3>
                  <div aria-hidden="true" className="flex h-3 rounded-full overflow-hidden">
                    {stats.topLanguages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                        className="first:rounded-l-full last:rounded-r-full"
                      />
                    ))}
                  </div>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                    {stats.topLanguages.map((lang) => (
                      <li key={lang.name} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span
                          aria-hidden="true"
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        {lang.name}
                        <span className="text-muted">{lang.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            <p className="mt-6 text-sm text-text-secondary">
              {stats.sampledRepos < stats.publicRepos
                ? `Estrelas e linguagens calculadas sobre os ${stats.sampledRepos} repositórios públicos atualizados mais recentemente (de ${stats.publicRepos}).`
                : `Estrelas e linguagens calculadas sobre os ${stats.sampledRepos} repositórios públicos.`}{" "}
              A distribuição considera a linguagem principal de cada repositório,
              não o volume de código. Dados da API pública do GitHub, atualizados a cada hora.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
