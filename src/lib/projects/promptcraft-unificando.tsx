import { ArrowRight, ClipboardCopy, ShieldCheck, TerminalSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { organizationJsonLd } from "@/lib/structured-data";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <p>
      Melhorar um prompt cru geralmente significa reescrever na mão uma
      estrutura enorme de system prompt — ou pedir para a IA fazer isso
      conversando. O <strong>promptcraft-unificando</strong> é um{" "}
      <strong>CLI Node.js</strong>, distribuído via <code>npx</code>, que monta
      um prompt de &quot;Engenheiro de Prompt&quot; concatenando um prompt-base
      fixo com o texto cru que o usuário digita, e imprime o resultado no{" "}
      <code>stdout</code> — pronto para colar ou &quot;pipal&quot; em qualquer
      CLI de LLM (Claude Code, Gemini CLI, etc.).
    </p>
  );
}

function FlagsContent() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">Posicional</h3>
        <p>
          <code>[texto]</code> — o texto cru do prompt a ser melhorado.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">--project</h3>
        <p>
          Ativa o bloco <code>&lt;arquitetura&gt;</code> no template, pedindo
          que o LLM de destino explore a arquitetura do projeto atual antes de
          gerar o prompt.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">--save</h3>
        <p>
          Muda o modo de operação: em vez de gerar, lê stdin e salva o resultado
          como <code>.md</code> no diretório atual (com{" "}
          <code>--title</code> para override do título).
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-text">Compatibilidade</h3>
        <p>
          Validado com pipe em <code>claude</code> e <code>gemini</code>; para
          outras CLIs, fallback de copiar e colar manualmente.
        </p>
      </div>
    </>
  );
}

function NpmCard() {
  return (
    <>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        Publicado no npm (v0.2.0) e disponível via <code>npx</code> sem
        instalação.
      </p>
      <Button variant="outline" size="sm" className="w-full rounded-full" asChild>
        <a
          href="https://www.npmjs.com/package/promptcraft-unificando"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no npm <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </>
  );
}

export const promptcraftUnificandoCase: ProjectCase = {
  id: "promptcraft-unificando",
  pathSegments: ["promptcraft-unificando"],
  schemas: [organizationJsonLd()],
  card: card(
    "promptcraft-unificando",
    "promptcraft-unificando",
    "Ferramenta / DevTools",
    "CLI via npx que monta prompts de 'Engenheiro de Prompt' a partir de texto cru, imprimindo no stdout para uso com qualquer CLI de LLM (Claude Code, Gemini CLI).",
    "tech",
    ["Node.js", "CLI", "npm", "npx"],
  ),
  jsonLd: {
    name: "promptcraft-unificando",
    description:
      "CLI via npx que transforma prompts crus em prompts de engenheiro, com suporte a --project (contexto de arquitetura) e --save (salvar .md), pronto para pipe em CLIs de LLM.",
    url: "https://github.com/renatojuniordw/promptcraft-unificando",
  },
  breadcrumbs: breadcrumbs({
    name: "promptcraft-unificando",
    item: "/projetos/promptcraft-unificando",
  }),
  categoryBadge: "DevTools",
  title: "promptcraft-unificando",
  shortDescription: (
    <>
      Um <strong>CLI via npx</strong> que monta um prompt de{" "}
      <strong>Engenheiro de Prompt</strong> a partir do seu texto cru e imprime
      no stdout — pronto para <strong>pipe</strong> em qualquer CLI de LLM
      (Claude Code, Gemini CLI), com suporte a <code>--project</code> e{" "}
      <code>--save</code>.
    </>
  ),
  themeColor: "tech",
  githubUrl: "https://github.com/renatojuniordw/promptcraft-unificando",
  liveUrl: "https://www.npmjs.com/package/promptcraft-unificando",
  overviewTitle: "O Problema: Prompts Crus em Qualquer CLI de LLM",
  overviewContent: <Overview />,
  caseStudy: {
    challenge: (
      <p>
        Cada CLI de LLM tem seu próprio fluxo, e melhorar um prompt cru
        geralmente exige colar texto em um chat e negociar a reescrita. Faltava
        uma forma rápida e reproduzível de transformar uma ideia bruta em um
        prompt estruturado, sem depender de plataforma ou modelo específico.
      </p>
    ),
    solution: (
      <p>
        Construí um <strong>CLI Node.js</strong> distribuído via{" "}
        <code>npx</code> que concatena um prompt-base fixo de engenharia de
        prompt com o texto cru do usuário e imprime o resultado no stdout.
        Com <code>--project</code> ativa o contexto de arquitetura e com{" "}
        <code>--save</code> persiste o resultado como <code>.md</code>.
      </p>
    ),
    result: (
      <p>
        Prompts de engenheiro disponíveis em um comando, com{" "}
        <strong>pipe validado</strong> em Claude Code e Gemini CLI — 131
        downloads semanais no npm em poucos dias de publicação.
      </p>
    ),
  },
  extraSections: [
    {
      id: "flags-title",
      icon: <TerminalSquare className="text-tech" aria-hidden="true" />,
      title: "Flags & Compatibilidade",
      content: <FlagsContent />,
    },
  ],
  sidebarTechStackTitle: "Tech Stack",
  sidebarTechStack: [
    { label: "Runtime", name: "Node.js" },
    { label: "Distribuição", name: "npm / npx" },
    { label: "Linguagem", name: "TypeScript" },
  ],
  sidebarExtraCards: [
    {
      icon: <ClipboardCopy size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Uso",
      content: (
        <p className="text-sm text-text-secondary leading-relaxed">
          <code>npx promptcraft-unificando &quot;sua ideia crua&quot; | claude</code>
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
