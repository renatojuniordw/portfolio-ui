import React from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: React.ReactNode[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Unificando (Laboratório de Projetos Autorais / P&D)",
    role: "Software Engineer / Criador de Produtos",
    period: "Nov 2025 - Presente",
    responsibilities: [
      <React.Fragment key="1"><strong>Desenvolvimento Web:</strong> Construção de ecossistema front-end moderno utilizando <strong>React 19, Next.js e TailwindCSS</strong>, priorizando Core Web Vitals, performance e SEO.</React.Fragment>,
      <React.Fragment key="2"><strong>Engenharia de IA & Automação:</strong> Criação de agentes de IA (GPT) focados em automação de atendimento (WhatsApp/Instagram), com detecção de intenção e sentimento para roteamento dinâmico.</React.Fragment>,
      <React.Fragment key="3"><strong>Orquestração & Dados:</strong> Implementação de agentes de triagem com saída estruturada (JSON) via n8n, aplicando técnicas de RAG sobre Google Docs e persistência de estado no Supabase.</React.Fragment>,
      <React.Fragment key="4"><strong>APIs & Integrações:</strong> Integração com a Instagram Graph API para automação de respostas a comentários com conversão estruturada para conversas privadas (DM).</React.Fragment>,
      <React.Fragment key="5"><strong>Produtos em Desenvolvimento:</strong> Automação para Afiliados (E-commerce) com APIs da Shopee e Mercado Livre; MVP de LegalTech para cálculos previdenciários com foco em precisão de dados; e agente jurídico via WhatsApp integrado à API oficial do CNJ (DataJud) com handoff estruturado para atendimento humano.</React.Fragment>,
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
  {
    company: "Iterpe - Instituto de Terras e Reforma Agrária do Estado de Pernambuco",
    role: "Estagiário de Suporte de Informática",
    period: "Mar 2017 - Jun 2017",
    responsibilities: [
      "Suporte técnico direto aos colaboradores, incluindo formatação e configuração de máquinas.",
      "Realização de ajustes em redes locais.",
      "Configuração de software e hardware e resolução de problemas técnicos dos usuários.",
    ],
  },
  {
    company: "CPRH - Agência Estadual de Meio Ambiente",
    role: "Estagiário",
    period: "Jan 2014 - Dez 2014",
    responsibilities: [
      "Suporte administrativo e técnico aos colaboradores da agência estadual de meio ambiente.",
    ],
  },
];
