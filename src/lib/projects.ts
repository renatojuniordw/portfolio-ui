export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  link: string;
}

export const PROJECTS: Project[] = [
  {
    id: "unificando-automacao",
    title: "Unificando: IA & Automação",
    category: "Inteligência Artificial",
    description:
      "Engine de atendimento distribuído, orquestração de LLMs e automação de fluxos via n8n.",
    accent: "ia",
    link: "/projetos/unificando/automacao",
  },
  {
    id: "unificando-vitrine",
    title: "Unificando: Vitrine Digital",
    category: "Branding & Conversão",
    description:
      "Site institucional interativo com foco em autoridade de marca e calculadora de planos em tempo real.",
    accent: "tech",
    link: "/projetos/unificando/vitrine",
  },
  {
    id: "mariaclarasantos",
    title: "Maria Clara Santos",
    category: "Web Performance / Jurídico",
    description:
      "Landing page de alta conversão para advocacia com sistema de anti-golpe integrado.",
    accent: "tech",
    link: "/projetos/mariaclarasantos",
  },
  {
    id: "seu-barraco-esperto",
    title: "Seu Barraco Esperto",
    category: "IoT / Automação Residencial",
    description:
      "Automação residencial prática e sem frescura com Alexa e IoT.",
    accent: "barraco",
    link: "/projetos/seu-barraco-esperto",
  },
  {
    id: "oferticando",
    title: "Oferticando",
    category: "E-commerce / Afiliados",
    description:
      "Plataforma completa de ofertas e cupons com painéis administrativos e de afiliados, busca performática e extração automática de dados.",
    accent: "tech",
    link: "/projetos/oferticando",
  },
  {
    id: "ariano-suassuna",
    title: "Ariano Suassuna - Tributo",
    category: "Educacional / Cultura",
    description:
      "Site educacional sobre a vida e obra de Ariano Suassuna, originado em 2016 no CRC Recife como um esforço da comunidade para preservar sua memória.",
    accent: "tech",
    link: "/projetos/ariano-suassuna",
  },
  {
    id: "sheik",
    title: "Diego Sheik - Mídia Kit",
    category: "Mídia & Influência",
    description:
      "Mídia kit interativo com insights de audiência, formatos de parceria e métricas reais de Instagram para marcas.",
    accent: "tech",
    link: "/projetos/sheik",
  },
];
