export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Unificando (Laboratório de Projetos Autorais / P&D)",
    role: "Software Engineer / Criador de Produtos",
    period: "Nov 2025 - Presente",
    responsibilities: [
      "**Desenvolvimento Web:** Construção de ecossistema front-end moderno utilizando **React 19, Next.js e TailwindCSS**, priorizando Core Web Vitals, performance e SEO.",
      "**Engenharia de IA & Automação:** Criação de agentes de IA (GPT) focados em automação de atendimento (WhatsApp/Instagram), com detecção de intenção e sentimento para roteamento dinâmico.",
      "**Orquestração & Dados:** Implementação de agentes de triagem com saída estruturada (JSON) via n8n, aplicando técnicas de RAG sobre Google Docs e persistência de estado no Supabase.",
      "**APIs & Integrações:** Integração com a Instagram Graph API para automação de respostas a comentários com conversão estruturada para conversas privadas (DM).",
      "**Produtos em Desenvolvimento:** Automação para Afiliados (E-commerce) com APIs da Shopee e Mercado Livre; MVP de LegalTech para cálculos previdenciários com foco em precisão de dados; e agente jurídico via WhatsApp integrado à API oficial do CNJ (DataJud) com handoff estruturado para atendimento humano.",
    ],
  },
  {
    company: "CESAR",
    role: "Software Engineer",
    period: "Out 2021 - Presente",
    responsibilities: [
      "**Plataforma de Gestão de Moedas:** Atuei com Angular e C#, além de participar das decisões de design e testes automatizados.",
      "**Projeto para ONG Social:** Responsável pelo front-end, utilizando React JS.",
      "**Empresa do Setor Petrolífero:** Participei de dois projetos, atuando no front-end e colaborando ativamente nas decisões junto à equipe de design.",
      "**Contribuições Adicionais:** Minha atuação vai além do desenvolvimento, participando de decisões estratégicas sobre design e testes em cada projeto.",
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
