import React from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: React.ReactNode[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Unificando Digital / Freelance",
    role: "Software Engineer",
    period: "2026 - Presente",
    responsibilities: [
      <React.Fragment key="1">Desenvolvimento do ecossistema web (Front-end) utilizando <strong>React 19, Next.js e TailwindCSS</strong>, com foco em performance e SEO.</React.Fragment>,
      <React.Fragment key="2">Desenvolvimento de <strong>Decision Intelligence Engines</strong> baseados em LLM (GPT-4) para orquestração de fluxos de vendas e atendimento.</React.Fragment>,
      <React.Fragment key="3">Implementação de agentes de triagem (Triage Agents) com saída Strict-JSON para integração com webhooks e <strong>n8n</strong>.</React.Fragment>,
    ],
  },
  {
    company: "CESAR",
    role: "Software Engineer",
    period: "Out 2021 - Presente",
    responsibilities: [
      <React.Fragment key="1"><strong>Plataforma de Gestão de Moedas:</strong> Atuei com Angular e C#, além de participar das decisões de design e testes automatizados.</React.Fragment>,
      <React.Fragment key="2"><strong>Projeto para ONG Social:</strong> Responsável pelo front-end, utilizando React JS.</React.Fragment>,
      <React.Fragment key="3"><strong>Empresa do Setor Petrolífero:</strong> Participei de dois projetos, atuando no front-end e colaborando ativamente nas decisões junto à equipe de design.</React.Fragment>,
      <React.Fragment key="4"><strong>Contribuições Adicionais:</strong> Minha atuação vai além do desenvolvimento, participando de decisões estratégicas sobre design e testes em cada projeto.</React.Fragment>,
    ],
  },
  {
    company: "Avanade",
    role: "Software Engineer (Pleno)",
    period: "Mai 2019 - Set 2021",
    responsibilities: [
      "Desenvolvimento e manutenção de sistemas no SharePoint.",
      "Desenvolvimento e manutenção de sistemas web utilizando HTML5, CSS3 e JavaScript.",
      "Manipulação de Banco de Dados utilizando o Microsoft SQL Server.",
      "Desenvolvimento de aplicações SharePoint Framework com React.",
      "Desenvolvimento e manutenção de sistemas em Angular.",
    ],
  },
  {
    company: "Avanade",
    role: "Associate Software Engineer (Junior)",
    period: "Mai 2018 - Mai 2019",
    responsibilities: [
      "Desenvolvimento web utilizando HTML5, CSS3 e JavaScript.",
      "Desenvolvimento de soluções no SharePoint.",
      "Testes automatizados de software.",
      "Implementação de serviços corporativos de conectividade no SharePoint, utilizando o Microsoft SQL Server no ambiente do Azure.",
      "Desenvolvimento de Web APIs com C#.",
    ],
  },
  {
    company: "MV S/A",
    role: "Desenvolvedor 1",
    period: "Jul 2017 - Mai 2018",
    responsibilities: [
      "Execução de testes manuais na aplicação Sistemas Estratégicos para liberação de releases.",
      "Elaboração de casos de teste do produto.",
      "Elaboração de testes automatizados do produto utilizando Selenium, C# e JavaScript.",
      "Abertura de tickets para sinalização de erros e possíveis melhorias no software.",
    ],
  },
];
