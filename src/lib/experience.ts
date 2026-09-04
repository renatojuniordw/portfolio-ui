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
      "**Radar Unificando** (radar.unificando.com.br) — Plataforma de busca de vagas em tempo real, para todas as áreas e modalidades, integrando **Gupy via MCP oficial** com fallback para a API REST da InHire. Inclui assistente de carreira com IA: **score ATS 0-100**, currículo adaptado por vaga, carta de apresentação e recomendação de cursos. Stack: Next.js 16, Prisma, Redis, Vercel AI SDK.",
      "**Segurança e Custo no Radar:** defesa contra **prompt injection em 3 camadas**, redação LGPD automática (CPF/CNPJ/RG/telefone) e limites de tokens por usuário (100k/dia, 2M/mês) para manter o produto gratuito de forma sustentável.",
      "**Med Unificando** (med.unificando.com.br) — Busca semântica em linguagem natural sobre **medicamentos intercambiáveis da ANVISA** com **embeddings 100% locais** (Xenova Transformers/ONNX, sem APIs externas de IA), comparação lado a lado, preços da tabela CMED, navegação ATC e sincronização automática de dados abertos. Expõe um **MCP Server** (12 ferramentas read-only em /api/mcp) para agentes de IA como Claude, Cursor e opencode consultarem a mesma base sem scraping.",
      "**Unificando PDF** (pdf.unificando.com.br) — Suíte com **16 ferramentas de PDF** com **privacidade por design**: processamento server-side efêmero (arquivos em /tmp descartados após download, sem persistência), engine híbrida (pdf-lib/pdfjs-dist + Ghostscript, LibreOffice, Poppler, qpdf) e fila com controle de concorrência.",
      "**Engenharia de IA & Automação:** agentes de IA (GPT) para automação de atendimento (WhatsApp/Instagram) com detecção de intenção e sentimento para roteamento dinâmico; agentes de triagem com **saída estruturada JSON via n8n**, **RAG sobre Google Docs** e persistência de estado no Supabase; integração com a **Instagram Graph API** (comentário → DM).",
      "**Estudo de Caso Prático (Cliente de Advocacia):** agente jurídico via WhatsApp integrado à API oficial do CNJ (DataJud) para consultas processuais, validação de documentos, cache de dados e **handoff estruturado** para atendimento humano.",
      "**prompts-unificando:** biblioteca de prompts publicada como **pacote npm/CLI** (npx prompts-unificando list) com 6 templates (frontend, fullstack, backend, testes, auditoria de engenharia e segurança/LGPD), agnóstica de stack e de LLM.",
      "**promptcraft-unificando:** CLI via npx que monta prompts de engenharia a partir de texto cru, com pipe validado em Claude Code e Gemini CLI e persistência em .md (npx promptcraft-unificando \"ideia\" | claude).",
      "**Desenvolvimento Web:** construção de ecossistema front-end moderno com **React 19, Next.js e TailwindCSS**, priorizando Core Web Vitals, performance e SEO.",
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
    company:
      "Iterpe - Instituto de Terras e Reforma Agrária do Estado de Pernambuco",
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
