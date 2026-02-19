import { SplitText } from "@/components/fx/SplitText";
import { PROFILE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Download, FileText, Award, Star } from "lucide-react";

export default function CurriculoPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="flex-1">
          <SplitText
            text="Currículo"
            className="text-4xl md:text-6xl font-display font-bold mb-4"
          />
          <p className="text-xl text-text-secondary">{PROFILE.title}</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-tech text-white font-bold hover:brightness-110 transition-all shadow-lg active:scale-95">
          <Download size={20} /> Baixar PDF
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {/* Experiência */}
          <section>
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <FileText className="text-tech" size={24} /> Experiência
              Profissional
            </h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">
                    Sênior Software Engineer
                  </h3>
                  <span className="text-sm text-text-secondary">
                    2023 - Presente
                  </span>
                </div>
                <p className="text-tech text-sm font-medium mb-2">
                  Unificando Digital / Freelance
                </p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    Desenvolvimento de ecossistemas web complexos com Next.js e
                    React.
                  </li>
                  <li>
                    Integração de APIs de IA e automação de fluxos de
                    atendimento.
                  </li>
                  <li>
                    Arquitetura de sistemas focada em performance e
                    escalabilidade.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">
                    Engenheiro de Software Frontend
                  </h3>
                  <span className="text-sm text-text-secondary">
                    Anos Anteriores
                  </span>
                </div>
                <p className="text-tech text-sm font-medium mb-2">
                  Avanade / CESAR / MV
                </p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>Atuação em projetos críticos e de grande escala.</li>
                  <li>
                    Expertise em Angular e React para aplicações empresariais.
                  </li>
                  <li>Foco em boas práticas (SOLID, Clean Code) e Testes.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Formação */}
          <section>
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Award className="text-tech" size={24} /> Formação Acadêmica
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold">
                  Software Architecture (Pós-Graduação)
                </h3>
                <p className="text-text-secondary text-sm">FIAP | 2022</p>
              </div>
              <div>
                <h3 className="font-bold">Sistemas de Informação</h3>
                <p className="text-text-secondary text-sm">
                  Graduação Completa
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-12">
          {/* Skills */}
          <section>
            <h2 className="text-xl font-display font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Angular",
                "TypeScript",
                "Next.js",
                "Tailwind",
                "GSAP",
                "Three.js",
                "N8N",
                "IA / LLMs",
                "Node.js",
                "Architecture",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full border border-border bg-s1 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Certificações */}
          <section>
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Star className="text-tech" size={20} /> Certificações
            </h2>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>• Microsoft Specialist: HTML5 + JS + CSS3</li>
              <li>• Avançado em Arquitetura de Software</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
