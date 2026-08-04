import {
  Search,
  Bot,
  FileText,
  GitCompare,
  MessageSquare,
  Download,
  ShieldCheck,
} from "lucide-react";

import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <div className="space-y-4">
      <p>
        Buscar vaga remota hoje significa abrir uma dezena de abas — cada
        empresa com seu próprio portal Gupy ou InHire — e repetir a mesma
        pesquisa em cada uma. O <strong>Radar Unificando</strong> resolve isso
        buscando em tempo real, sem base pré-carregada: cada consulta dispara
        uma busca ao vivo direto nas plataformas, então o resultado nunca fica
        desatualizado.
      </p>
      <p>
        O diferencial não é só agregar vagas — é um{" "}
        <strong>assistente de carreira com IA</strong> que lê o currículo do
        candidato, entende perfil, senioridade e skills, e usa isso para
        conversar sobre as vagas encontradas: qual tem melhor fit, o que falta
        para uma delas, como escrever a carta de apresentação, quais perguntas
        esperar na entrevista.
      </p>
    </div>
  );
}

function ArchitectureContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Busca via MCP + REST</h3>
        <p className="text-sm">
          A busca na Gupy usa o <strong>MCP oficial da Gupy</strong>{" "}
          (<code>candidates.mcp.api.gupy.io/mcp</code>, protocolo JSON-RPC)
          como fonte primária, com fallback automático para a API REST pública
          em caso de falha. A InHire é consultada via API pública própria,
          somente vagas <code>published</code>.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">
          IA como Ferramenta, Não Decisor
        </h3>
        <p className="text-sm">
          O chat expõe <em>tools</em> tipadas (Zod) que o modelo pode chamar —
          buscar vagas, analisar fit, comparar, gerar carta. O LLM nunca
          calcula nada com consequência real por conta própria: extrai
          parâmetros, o código decide.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">
          Defesa Contra Prompt Injection
        </h3>
        <p className="text-sm">
          Três camadas: validação de input (truncagem, remoção de tags),
          detecção de padrões de jailbreak via regex, e hardening do system
          prompt marcando conteúdo de vaga/currículo como{" "}
          <code>&lt;untrusted_content&gt;</code> — nunca como instrução.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Privacidade por Design</h3>
        <p className="text-sm">
          Redação automática de CPF, CNPJ, RG e telefone (LGPD) em toda
          mensagem antes de qualquer processamento. Usuários anônimos têm o
          perfil salvo apenas em <code>IndexedDB</code>, no navegador — sem
          conta obrigatória.
        </p>
      </div>
    </div>
  );
}

export const radarUnificandoCase: ProjectCase = {
  id: "radar-unificando",
  pathSegments: ["unificando", "radar"],
  card: card(
    "radar-unificando",
    "Radar Unificando",
    "Job Board / IA",
    "Plataforma de busca de vagas remotas em tempo real (Gupy + InHire) com assistente de carreira por IA, via MCP oficial da Gupy.",
    "ia",
    ["Next.js", "MCP", "Vercel AI SDK", "Prisma"],
  ),
  jsonLd: {
    name: "Radar Unificando",
    description:
      "Plataforma inteligente de busca de vagas remotas com IA, integrando Gupy (via MCP) e InHire.",
    url: SOCIALS.unificando.radar,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/radar" },
    { name: "Radar", item: "/projetos/unificando/radar" },
  ),
  categoryBadge: "Job Board / IA",
  title: "Radar Unificando: Vagas Remotas com Assistente de Carreira IA",
  shortDescription: (
    <>
      Busca de vagas remotas <strong>em tempo real</strong> em Gupy (via{" "}
      <strong>MCP oficial</strong>) e InHire, com <strong>chat de IA</strong>{" "}
      que analisa currículo, calcula fit com cada vaga e gera carta de
      apresentação — sem custo, sem base pré-carregada.
    </>
  ),
  themeColor: "ia",
  liveUrl: SOCIALS.unificando.radar,
  githubUrl: "https://github.com/renatojuniordw/radar-unificando",
  overviewTitle: "O Desafio",
  overviewContent: <Overview />,
  featuresTitle: "Funcionalidades Principais",
  features: [
    {
      icon: <Search className="text-ia" size={24} aria-hidden="true" />,
      title: "Busca em Tempo Real",
      description:
        "Consulta ao vivo em Gupy e InHire a cada pesquisa — sem base pré-carregada, sem vaga desatualizada.",
    },
    {
      icon: <Bot className="text-ia" size={24} aria-hidden="true" />,
      title: "Chat de Carreira com IA",
      description:
        "Assistente conversacional que busca vagas, analisa fit, compara oportunidades e simula entrevistas.",
    },
    {
      icon: <FileText className="text-ia" size={24} aria-hidden="true" />,
      title: "Importação de Currículo",
      description:
        "Upload de PDF (export do LinkedIn) ou texto colado — a IA extrai skills, senioridade, experiência e área de atuação automaticamente.",
    },
    {
      icon: <GitCompare className="text-ia" size={24} aria-hidden="true" />,
      title: "Análise de Match",
      description:
        "Compara perfil x vaga: skills que batem, skills que faltam, fit de senioridade e experiência, recomendação geral (alto/médio/baixo).",
    },
    {
      icon: <MessageSquare className="text-ia" size={24} aria-hidden="true" />,
      title: "Carta & Preparação de Entrevista",
      description:
        "Geração de carta de apresentação personalizada e perguntas de entrevista categorizadas, a partir do par currículo + vaga.",
    },
    {
      icon: <Download className="text-ia" size={24} aria-hidden="true" />,
      title: "Export CSV/JSON",
      description:
        "Exporte a tabela de resultados filtrada para uso fora da plataforma, sem travar os dados no produto.",
    },
  ],
  extraSections: [
    {
      id: "architecture-security",
      icon: <ShieldCheck className="text-ia" aria-hidden="true" />,
      title: "Arquitetura & Segurança",
      content: <ArchitectureContent />,
    },
  ],
  sidebarTechStackTitle: "Tecnologias Utilizadas",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js 15 (App Router)" },
    { label: "UI", name: "MUI 7 + Tailwind CSS v4" },
    { label: "Banco de Dados", name: "PostgreSQL + Prisma ORM" },
    { label: "Autenticação", name: "Auth.js v5 (credentials + JWT)" },
    { label: "Busca Gupy", name: "MCP oficial (JSON-RPC) + fallback REST" },
    { label: "IA", name: "Vercel AI SDK (OpenAI-compatible)" },
    { label: "Storage anônimo", name: "IndexedDB (idb)" },
  ],
};
