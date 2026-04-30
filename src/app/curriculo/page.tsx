import { Download, FileText, Award, Star } from "lucide-react";
import { SplitText } from "@/components/fx/SplitText";
import { PROFILE } from "@/lib/constants";
import { EXPERIENCES } from "@/lib/experience";
import { EDUCATIONS, CERTIFICATIONS } from "@/lib/education";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrintButton } from "@/components/ui/PrintButton";


export const generateMetadata = () =>
  buildMetadata({
    title: "Currículo | Renato Bezerra - Software Engineer",
    description:
      "Currículo profissional de Renato Bezerra: Engenheiro de Software com experiência em React, Angular, C# e automações com IA em grandes empresas como CESAR e Avanade.",
    path: "/curriculo",
  });

export default function CurriculoPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Currículo", item: "/curriculo" },
  ];

  return (
    <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="flex-1">
          <h1 className="sr-only">Currículo Profissional - Renato Bezerra</h1>
          <SplitText
            text="Currículo"
            className="text-4xl md:text-6xl font-display font-bold mb-4"
          />
          <p className="text-xl text-text-secondary">{PROFILE.title}</p>
        </div>
        <div className="flex shrink-0">
          <PrintButton />
        </div>
      </header>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section aria-labelledby="experience-title">
            <h2
              id="experience-title"
              className="text-xl font-display font-bold mb-6 flex items-center gap-2"
            >
              <FileText className="text-tech" size={24} aria-hidden="true" />{" "}
              Experiência Profissional
            </h2>
            <div className="flex flex-col border-t border-border mt-4">
              {EXPERIENCES.map((exp, index) => (
                <article key={index} className="flex flex-col md:flex-row gap-6 py-8 border-b border-border hover:bg-s1/50 transition-colors px-4 -mx-4 rounded-xl">
                  <div className="md:w-1/3 shrink-0">
                    <time className="text-sm text-text-secondary font-medium block mb-1">
                      {exp.period}
                    </time>
                    <p className="text-sm font-medium text-text-primary">
                      {exp.company}
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-medium text-text-primary mb-3">{exp.role}</h3>
                    <ul className="space-y-3 text-sm text-text-secondary">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="mt-2 block w-1.5 h-1.5 shrink-0 rounded-full bg-border"></span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="education-title">
            <h2
              id="education-title"
              className="text-xl font-display font-bold mb-6 flex items-center gap-2"
            >
              <Award className="text-tech" size={24} aria-hidden="true" />{" "}
              Formação Acadêmica
            </h2>
            <div className="space-y-6">
              {EDUCATIONS.map((edu, index) => (
                <article key={index}>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-text-secondary text-sm">
                    {edu.institution} {edu.period && `· ${edu.period}`}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-12">
          <section aria-labelledby="certs-title">
            <h2
              id="certs-title"
              className="text-xl font-display font-bold mb-6 flex items-center gap-2"
            >
              <Star className="text-tech" size={20} aria-hidden="true" />{" "}
              Certificações
            </h2>
            <ul className="space-y-3 text-sm text-text-secondary">
              {CERTIFICATIONS.map((cert, index) => (
                <li key={index}>
                  • {cert.name} {cert.year && `- Certified ${cert.year}`}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
