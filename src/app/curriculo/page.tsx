import { Download, FileText, Award, Star } from "lucide-react";

import { SplitText } from "@/components/fx/SplitText";
import { PROFILE } from "@/lib/constants";

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
            <div className="space-y-10">
              {/* Unificando */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">Software Engineer</h3>
                  <span className="text-sm text-text-secondary">
                    2026 - Presente
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

              {/* CESAR */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">Software Engineer</h3>
                  <span className="text-sm text-text-secondary">
                    Out 2021 - Presente
                  </span>
                </div>
                <p className="text-tech text-sm font-medium mb-2">
                  CESAR (Centro de Estudos e Sistemas Avançados do Recife)
                </p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    <strong>Plataforma de Gestão de Moedas:</strong> Atuação com
                    Angular e C#, decisões de design e testes automatizados.
                  </li>
                  <li>
                    <strong>Projeto Social (ONG):</strong> Responsável pelo
                    frontend utilizando React JS.
                  </li>
                  <li>
                    <strong>Setor Petrolífero:</strong> Desenvolvimento frontend
                    e colaboração estratégica com equipes de design e testes.
                  </li>
                </ul>
              </div>

              {/* Avanade (Pleno) */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">
                    Software Engineer (Pleno)
                  </h3>
                  <span className="text-sm text-text-secondary">
                    Mai 2019 - Set 2021
                  </span>
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
                  <li>
                    Manipulação de Banco de Dados com Microsoft SQL Server.
                  </li>
                </ul>
              </div>

              {/* Avanade (Junior) */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">
                    Associate Software Engineer (Junior)
                  </h3>
                  <span className="text-sm text-text-secondary">
                    Mai 2018 - Mai 2019
                  </span>
                </div>
                <p className="text-tech text-sm font-medium mb-2">Avanade</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    Desenvolvimento Web APIs com C# e conectividade Azure.
                  </li>
                  <li>
                    Implementação de testes automatizados e soluções SharePoint.
                  </li>
                </ul>
              </div>

              {/* MV */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">Desenvolvedor 1</h3>
                  <span className="text-sm text-text-secondary">
                    Jul 2017 - Mai 2018
                  </span>
                </div>
                <p className="text-tech text-sm font-medium mb-2">MV S/A</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>
                    Execução de testes manuais e elaboração de casos de teste.
                  </li>
                  <li>
                    Automação de testes de produto com Selenium, C# e
                    JavaScript.
                  </li>
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
                  Pós-graduação Lato Sensu - Especialização, Software
                  Architecture
                </h3>
                <p className="text-text-secondary text-sm">FIAP | Completo</p>
              </div>
              <div>
                <h3 className="font-bold">Graduação, Sistema para internet</h3>
                <p className="text-text-secondary text-sm">
                  FICR - Faculdade Católica Imaculada Conceição do Recife |
                  Completo
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-12">
          {/* Certificações */}
          <section>
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Star className="text-tech" size={20} /> Certificações
            </h2>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>• Exam 480: Programming in HTML5 with JavaScript and CSS3</li>
              <li>• MTA: Introduction to Programming Using JavaScript</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
