import Link from "next/link";
import { ArrowUpRight, Github, Package, Server } from "lucide-react";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  command?: string;
  endpoint?: string;
  npmUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  docsLabel?: string;
  casePath?: string;
  stats?: string;
}

const TOOLS: Tool[] = [
  {
    id: "prompts-unificando",
    name: "prompts-unificando",
    tagline: "Biblioteca de prompts para auditoria de código",
    description:
      "6 templates versionados — frontend, fullstack, backend, testes, auditoria de engenharia e segurança/LGPD. Agnóstica de stack e de LLM (Claude, ChatGPT, Gemini).",
    command: "npx prompts-unificando list",
    npmUrl: "https://www.npmjs.com/package/prompts-unificando",
    githubUrl: "https://github.com/renatojuniordw/prompts-unificando",
  },
  {
    id: "promptcraft-unificando",
    name: "promptcraft-unificando",
    tagline: "CLI de engenharia de prompt via npx",
    description:
      "Monta um prompt de Engenheiro de Prompt a partir de texto cru e imprime no stdout — pronto para pipe em Claude Code e Gemini CLI, com persistência em .md.",
    command: "npx promptcraft-unificando \"ideia\" | claude",
    npmUrl: "https://www.npmjs.com/package/promptcraft-unificando",
    githubUrl: "https://github.com/renatojuniordw/promptcraft-unificando",
    stats: "131 downloads/semana",
  },
  {
    id: "mcp-med-unificando",
    name: "MCP Med Unificando",
    tagline: "Servidor MCP aberto em produção",
    description:
      "A base ANVISA/CMED exposta como 12 ferramentas read-only para agentes de IA (Claude, Cursor, opencode) via Model Context Protocol — a mesma busca híbrida do site, sem scraping.",
    endpoint: "https://med.unificando.com.br/api/mcp",
    docsUrl: "https://med.unificando.com.br/mcp",
    docsLabel: "Página MCP",
    casePath: "/projetos/unificando/med",
    githubUrl: "https://github.com/renatojuniordw/med-unificando",
  },
];

function TerminalCommand({ command }: { command: string }) {
  return (
    <div className="mt-6 p-4 rounded-xl bg-bg border border-border font-mono text-sm overflow-x-auto">
      <span className="text-ia shrink-0">$ </span>
      <span className="text-text-secondary">{command}</span>
    </div>
  );
}

function EndpointBlock({ endpoint }: { endpoint: string }) {
  return (
    <div className="mt-6 p-4 rounded-xl bg-bg border border-border font-mono text-sm overflow-x-auto">
      <span className="text-ia shrink-0">▸ </span>
      <span className="text-text-secondary">{endpoint}</span>
    </div>
  );
}

export function ToolsSection() {
  return (
    <section
      id="ferramentas"
      aria-labelledby="ferramentas-heading"
      className="section-wrapper bg-surface-2"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">Open Source</span>
              <h2 id="ferramentas-heading" className="section-title">
                Ferramentas & Open Source
              </h2>
              <p className="text-xl text-text-secondary font-light mt-4">
                Pacotes no npm e um servidor MCP aberto — para LLMs via{" "}
                <code>npx</code> e agentes de IA via Model Context Protocol.
              </p>
            </div>
            <a
              href="https://www.npmjs.com/~renatojunior"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text rounded-full text-sm font-medium hover:border-[#111111] dark:hover:border-white transition-colors shrink-0"
            >
              Ver no npm →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool, index) => (
            <ScrollReveal key={tool.id} delay={index * 100}>
              <article className="group p-8 rounded-2xl bg-bg border border-border hover:border-[#111111] dark:hover:border-white transition-colors duration-300 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-muted uppercase tracking-widest">
                      {tool.tagline}
                    </span>
                    <h3 className="text-2xl font-medium text-text mt-2 font-mono">
                      {tool.name}
                    </h3>
                  </div>
                  <Package className="w-5 h-5 text-text-secondary shrink-0" aria-hidden="true" />
                  {tool.endpoint && (
                    <Server
                      className="w-5 h-5 text-text-secondary shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <p className="text-text-secondary leading-relaxed mt-4 flex-1">
                  {tool.description}
                </p>

                {tool.command ? (
                  <TerminalCommand command={tool.command} />
                ) : tool.endpoint ? (
                  <EndpointBlock endpoint={tool.endpoint} />
                ) : null}

                {tool.stats && (
                  <p className="text-xs font-medium text-ia mt-3">
                    {tool.stats}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
                  <Link
                    href={tool.casePath ?? `/projetos/${tool.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-text-secondary transition-colors"
                  >
                    Ver case <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  {tool.npmUrl && (
                    <a
                      href={tool.npmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text transition-colors"
                    >
                      npm <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {tool.docsUrl && (
                    <a
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text transition-colors"
                    >
                      {tool.docsLabel ?? "Docs"}{" "}
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {tool.githubUrl && (
                    <a
                      href={tool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text transition-colors"
                    >
                      <Github className="w-4 h-4" aria-hidden="true" /> GitHub
                    </a>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}