import {
  Search,
  Bot,
  FileText,
  GitCompare,
  MessageSquare,
  Download,
  ShieldCheck,
  GraduationCap,
  Puzzle,
} from "lucide-react";

import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <div className="space-y-4">
      <p>
        Buscar vaga hoje significa abrir uma dezena de abas — cada empresa com
        seu próprio portal Gupy ou InHire — e repetir a mesma pesquisa em
        cada uma. O <strong>Radar Unificando</strong> resolve isso buscando
        em tempo real, sem base pré-carregada: cada consulta dispara uma
        busca ao vivo direto nas plataformas, para qualquer área
        profissional e qualquer modalidade (remoto, híbrido ou presencial),
        então o resultado nunca fica desatualizado.
      </p>
      <p>
        O diferencial não é só agregar vagas — é um{" "}
        <strong>assistente de carreira com IA</strong> que lê o currículo do
        candidato, entende perfil, senioridade e skills, e usa isso para
        conversar sobre as vagas encontradas: qual tem melhor fit, o que
        falta para uma delas, como escrever a carta de apresentação, quais
        perguntas esperar na entrevista — além de gerar um score ATS,
        adaptar o currículo para uma vaga específica e recomendar cursos
        para fechar as lacunas técnicas encontradas.
      </p>
      <p>
        A plataforma é <strong>100% gratuita para o usuário</strong>,
        mantida por doações via PIX, com tetos justos de uso de IA (janela
        de contexto por conversa, limite diário e mensal de tokens).
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
          (<code>candidates.mcp.api.gupy.io/mcp</code>, protocolo JSON-RPC,
          com paginação por offset) como fonte primária, com fallback
          automático para a API REST pública em caso de falha. A InHire é
          consultada via API pública própria, somente vagas{" "}
          <code>published</code>. Um cache SWR (5 min stale / 30 min expire)
          evita reprocessar a mesma consulta em rajada.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">
          Busca Inteligente
        </h3>
        <p className="text-sm">
          Expansão híbrida de queries (mapa de sinônimos PT/EN curado + IA
          com cache global no Redis), dedupe de vagas quase-duplicadas,
          filtro de relevância (descarta, por exemplo, design físico em
          buscas por &quot;design&quot;) e filtro de frescor (remove vagas
          com mais de 20 dias), com ordenação final por recência.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">
          IA como Ferramenta, Não Decisor
        </h3>
        <p className="text-sm">
          O chat expõe <em>tools</em> tipadas (Zod) que o modelo pode chamar
          — buscar vagas, analisar fit, comparar, gerar carta, gerar
          currículo adaptado, recomendar cursos. O LLM nunca calcula nada
          com consequência real por conta própria: extrai parâmetros, o
          código decide.
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
          Mesmo bloco de regras reaplicado em todos os prompts (chat,
          análise de vaga, carta, entrevista, ATS) via helper compartilhado.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Privacidade por Design</h3>
        <p className="text-sm">
          Redação automática de CPF, CNPJ, RG e telefone (LGPD) em toda
          mensagem antes de qualquer processamento. Usuários anônimos têm o
          perfil salvo apenas em <code>IndexedDB</code>, no navegador, com
          auto-sync a cada 15 min — sem conta obrigatória.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">
          Limites de Uso e Custo
        </h3>
        <p className="text-sm">
          Controle de orçamento diário global (USD) e tetos de tokens por
          usuário (100k/dia, 2M/mês) e por IP, além de rate limiting
          (Redis + in-memory) em auth, pipeline, chat, ATS e geração de
          currículo — tudo para manter o produto gratuito de forma
          sustentável.
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
    "Plataforma de busca de vagas em tempo real (Gupy + InHire, todas as áreas) com assistente de carreira por IA: score ATS, currículo adaptado e recomendação de cursos.",
    "ia",
    ["Next.js 16", "MCP", "Vercel AI SDK", "Prisma", "Redis"],
  ),
  jsonLd: {
    name: "Radar Unificando",
    description:
      "Plataforma inteligente de busca de vagas com IA, integrando Gupy (via MCP) e InHire, com análise ATS, currículo adaptado e recomendação de cursos.",
    url: SOCIALS.unificando.radar,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/radar" },
    { name: "Radar", item: "/projetos/unificando/radar" },
  ),
  categoryBadge: "Job Board / IA",
  title: "Radar Unificando: Vagas com Assistente de Carreira IA",
  shortDescription: (
    <>
      Busca de vagas <strong>em tempo real</strong> em Gupy (via{" "}
      <strong>MCP oficial</strong>) e InHire, para qualquer área e
      modalidade, com <strong>chat de IA</strong> que analisa currículo,
      calcula fit e score ATS, gera carta de apresentação, currículo
      adaptado e recomenda cursos — sem custo, sem base pré-carregada.
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
      title: "Busca em Tempo Real e Inteligente",
      description:
        "Consulta ao vivo em Gupy e InHire a cada pesquisa, para todas as áreas — com expansão de queries, dedupe e filtros de relevância e frescor.",
    },
    {
      icon: <Bot className="text-ia" size={24} aria-hidden="true" />,
      title: "Chat de Carreira com IA",
      description:
        "Assistente conversacional que busca vagas, analisa fit, compara oportunidades, simula entrevistas e recomenda cursos.",
    },
    {
      icon: <FileText className="text-ia" size={24} aria-hidden="true" />,
      title: "Importação de Currículo",
      description:
        "Upload de PDF (export do LinkedIn) ou texto colado — a IA extrai skills, senioridade, experiência, cargo e área de atuação automaticamente.",
    },
    {
      icon: <GitCompare className="text-ia" size={24} aria-hidden="true" />,
      title: "Análise de Match & ATS",
      description:
        "Compara perfil x vaga (skills, senioridade, experiência) e gera score ATS 0-100 dedicado, com palavras-chave faltando e recomendações.",
    },
    {
      icon: <MessageSquare className="text-ia" size={24} aria-hidden="true" />,
      title: "Carta, Entrevista & Currículo Adaptado",
      description:
        "Geração de carta de apresentação, perguntas de entrevista categorizadas e uma versão do currículo adaptada à vaga, com download em PDF.",
    },
    {
      icon: <GraduationCap className="text-ia" size={24} aria-hidden="true" />,
      title: "Cursos Recomendados",
      description:
        "Sugestões de capacitação na Udemy (catálogo curado + busca na API Impact) a partir das lacunas técnicas identificadas no currículo.",
    },
    {
      icon: <Puzzle className="text-ia" size={24} aria-hidden="true" />,
      title: "Extensão Chrome (Side Panel)",
      description:
        "Analisa a vaga aberta na página atual e mostra score ATS e cursos recomendados sem sair do site da empresa. Em homologação na Chrome Web Store.",
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
    { label: "Framework", name: "Next.js 16 (App Router)" },
    { label: "UI", name: "MUI 7 + Tailwind CSS v4 (Neo-Brutalism)" },
    { label: "Banco de Dados", name: "PostgreSQL + Prisma ORM" },
    { label: "Cache/Filas", name: "Redis (rate limiting, cache, tokens)" },
    { label: "Autenticação", name: "Auth.js v5 (credentials + JWT + bcrypt)" },
    { label: "Busca Gupy", name: "MCP oficial (JSON-RPC) + fallback REST" },
    { label: "IA", name: "Vercel AI SDK (OpenAI-compatible)" },
    { label: "Storage anônimo", name: "IndexedDB (idb)" },
    { label: "Extensão", name: "Chrome MV3 (side panel)" },
  ],
};
