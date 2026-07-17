import { Award, Star, Calendar } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { EDUCATIONS, CERTIFICATIONS } from "@/lib/education";

export const generateMetadata = () =>
  buildMetadata({
    title: "Certificações | Renato Bezerra",
    description:
      "Formação acadêmica e certificações profissionais de Renato Bezerra: Pós-graduação em Arquitetura de Software pela FIAP, certificações Microsoft em HTML5, JavaScript e CSS3.",
    path: "/certificacoes",
  });

export default function CertificacoesPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Certificações", item: "/certificacoes" },
  ];

  return (
    <PageLayout maxWidth="4xl">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHeader
        title="Certificações"
        description="Formação acadêmica e certificações que consolidam minha base técnica."
        srTitle="Certificações - Renato Bezerra"
      />

      <section aria-labelledby="education-title" className="mb-20">
        <h2
          id="education-title"
          className="text-2xl font-display font-bold mb-8 flex items-center gap-3"
        >
          <Award className="text-tech" size={28} aria-hidden="true" />
          Formação Acadêmica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATIONS.map((edu, index) => (
            <article
              key={index}
              className="p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-colors"
            >
              <span className="text-sm font-medium text-muted uppercase tracking-widest block mb-3">
                {edu.period && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                )}
              </span>
              <h3 className="text-lg font-medium text-text mb-2">
                {edu.degree}
              </h3>
              <p className="text-text-secondary text-sm">{edu.institution}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="certs-title">
        <h2
          id="certs-title"
          className="text-2xl font-display font-bold mb-8 flex items-center gap-3"
        >
          <Star className="text-tech" size={28} aria-hidden="true" />
          Certificações Profissionais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <article
              key={index}
              className="p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-colors"
            >
              {cert.issuer && (
                <span className="text-xs font-medium text-muted uppercase tracking-widest block mb-3">
                  {cert.issuer}
                </span>
              )}
              <h3 className="text-base font-medium text-text mb-2">
                {cert.name}
              </h3>
              {cert.year && (
                <p className="text-text-secondary text-sm">
                  Certificado em {cert.year}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
