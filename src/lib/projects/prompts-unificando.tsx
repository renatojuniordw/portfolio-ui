import { ArrowRight, ClipboardCopy, ShieldCheck, TerminalSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { organizationJsonLd } from "@/lib/structured-data";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <p>
      O <strong>prompts-unificando</strong> nasceu de um problema recorrente:
      toda vez que eu precisava auditar código, revisar segurança ou checar
      cobertura de testes em um projeto novo, eu reescrevia o mesmo prompt do
      zero. Criei uma <strong>biblioteca de prompts padronizados</strong>,
      agnóstica de stack e de LLM, distribuída como pacote npm e acessível via
      CLI em qualquer terminal.
    </p>
  );
}

function TemplatesContent() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">Seis templates especializados</h3>
        <p>
          Frontend (React/Next.js), Fullstack (Next.js), Backend (NestJS),
          Testes (cobertura), Auditoria de Engenharia (qualidade de código) e
          Auditoria de Segurança (OWASP/LGPD), além de revisão de copy.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">Agnóstico de stack e de LLM</h3>
        <p>
          Funciona com qualquer stack e qualquer modelo — Claude, ChatGPT,
          Gemini — em qualquer IDE. O prompt sai padronizado, o modelo que
          você escolhe fica livre.
        </p>
      </div>
    </>
  );
}

function NpmCard() {
  return (
    <>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        Disponível como pacote público no npm, pronto para rodar via npx sem
        instalação.
      </p>
      <Button variant="outline" size="sm" className="w-full rounded-full" asChild>
        <a
          href="https://www.npmjs.com/package/prompts-unificando"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no npm <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </>
  );
}

export const promptsUnificandoCase: ProjectCase = {
  id: "prompts-unificando",
  pathSegments: ["prompts-unificando"],
  schemas: [organizationJsonLd()],
  card: card(
    "prompts-unificando",
    "prompts-unificando",
    "Ferramenta / DevTools",
    "CLI e biblioteca npm com prompts padronizados para auditoria de código, segurança, testes e copy — agnóstica de stack e de LLM.",
    "tech",
    ["Node.js", "CLI", "npm", "TypeScript"],
  ),
  jsonLd: {
    name: "prompts-unificando",
    description:
      "Biblioteca de prompts padronizados para auditoria de código, refatoração, testes, segurança/LGPD e revisão de copy, agnóstica de stack e de LLM.",
    url: "https://github.com/renatojuniordw/prompts-unificando",
  },
  breadcrumbs: breadcrumbs({
    name: "prompts-unificando",
    item: "/projetos/prompts-unificando",
  }),
  categoryBadge: "DevTools",
  title: "prompts-unificando",
  shortDescription: (
    <>
      Uma <strong>biblioteca de prompts</strong> para padronizar auditoria de
      código, segurança e testes, publicada como <strong>pacote npm</strong> e
      usável via CLI em qualquer terminal, com qualquer LLM.
    </>
  ),
  themeColor: "tech",
  githubUrl: "https://github.com/renatojuniordw/prompts-unificando",
  liveUrl: "https://www.npmjs.com/package/prompts-unificando",
  overviewTitle: "O Problema: Prompts Reescritos Toda Vez",
  overviewContent: <Overview />,
  caseStudy: {
    challenge: (
      <p>
        Auditorias de código, revisões de segurança/LGPD e checagens de
        cobertura de testes exigem prompts longos e bem estruturados. Sem um
        padrão, cada projeto novo significava reescrever (ou garimpar em
        conversas antigas) o mesmo prompt, com risco de perder critérios
        importantes pelo caminho.
      </p>
    ),
    solution: (
      <p>
        Construí uma <strong>CLI Node.js</strong> distribuída via npm com seis
        templates de prompt versionados — frontend, fullstack, backend,
        testes, auditoria de engenharia, segurança e copy. Os comandos{" "}
        <code>list</code>, <code>get &lt;id&gt;</code> e{" "}
        <code>get &lt;id&gt; --copy</code> deixam o prompt certo a um comando
        de distância, pronto para colar em qualquer chat de IA.
      </p>
    ),
    result: (
      <p>
        Prompts consistentes e reutilizáveis entre projetos e ferramentas,
        independente de stack ou de qual LLM está sendo usado — reduzindo o
        tempo de setup de cada auditoria e padronizando a qualidade dos
        relatórios gerados pela IA.
      </p>
    ),
  },
  extraSections: [
    {
      id: "templates-title",
      icon: <TerminalSquare className="text-tech" aria-hidden="true" />,
      title: "Templates & Compatibilidade",
      content: <TemplatesContent />,
    },
  ],
  sidebarTechStackTitle: "Tech Stack",
  sidebarTechStack: [
    { label: "Runtime", name: "Node.js 18+" },
    { label: "Distribuição", name: "npm / npx" },
    { label: "Linguagem", name: "TypeScript" },
  ],
  sidebarExtraCards: [
    {
      icon: <ClipboardCopy size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Instalação",
      content: (
        <p className="text-sm text-text-secondary leading-relaxed">
          <code>npx prompts-unificando list</code>
        </p>
      ),
    },
    {
      icon: <ShieldCheck size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "npm Package",
      content: <NpmCard />,
    },
  ],
};
