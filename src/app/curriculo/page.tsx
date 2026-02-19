import { Download, FileText, Award, Star } from "lucide-react";
import { SplitText } from "@/components/fx/SplitText";
import { PROFILE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

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
            <div className="space-y-10">
              <article>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">Software Engineer</h3>
                  <time className="text-sm text-text-secondary">
                    2026 - Presente
                  </time>
                </div>
                <p className="text-tech text-sm font-medium mb-2">
                  Unificando Digital / Freelance
                </p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    Desenvolvimento do ecossistema web (Front-end) utilizando{" "}
                    <strong>React 19, Next.js e TailwindCSS</strong>, com foco
                    em performance e SEO.
                  </li>
                  <li>
                    Desenvolvimento de{" "}
                    <strong>Decision Intelligence Engines</strong> baseados em
                    LLM (GPT-4) para orquestração de fluxos de vendas e
                    atendimento.
                  </li>
                  <li>
                    Implementação de agentes de triagem (Triage Agents) com
                    saída Strict-JSON para integração com webhooks e{" "}
                    <strong>n8n</strong>.
                  </li>
                </ul>
              </article>

              <article>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">Software Engineer</h3>
                  <time className="text-sm text-text-secondary">
                    Out 2021 - Presente
                  </time>
                </div>
                <p className="text-tech text-sm font-medium mb-2">
                  CESAR (Centro de Estudos e Sistemas Avançados do Recife)
                </p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    <strong>Plataforma de Gestão de Moedas:</strong> Atuação com
                    Angular e C#, decisões de design.
                  </li>
                  <li>
                    <strong>Setor Petrolífero:</strong> Desenvolvimento frontend
                    e colaboração estratégica com equipes de design e testes.
                  </li>
                </ul>
              </article>

              <article>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">
                    Software Engineer (Pleno)
                  </h3>
                  <time className="text-sm text-text-secondary">
                    Mai 2019 - Set 2021
                  </time>
                </div>
                <p className="text-tech text-sm font-medium mb-2">Avanade</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    Desenvolvimento SPFx (SharePoint Framework) com React e
                    Angular.
                  </li>
                  <li>
                    Manutenção de sistemas críticos em HTML5, CSS3 e JavaScript.
                  </li>
                </ul>
              </article>
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
              <article>
                <h3 className="font-bold">
                  Pós-graduação Lato Sensu - Especialização, Software
                  Architecture
                </h3>
                <p className="text-text-secondary text-sm">
                  FIAP | Recife/Remoto
                </p>
              </article>
              <article>
                <h3 className="font-bold">Graduação, Sistema para internet</h3>
                <p className="text-text-secondary text-sm">
                  FICR - Faculdade Católica Imaculada Conceição do Recife
                </p>
              </article>
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
              <li>• Exam 480: Programming in HTML5 with JavaScript and CSS3</li>
              <li>• MTA: Introduction to Programming Using JavaScript</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
