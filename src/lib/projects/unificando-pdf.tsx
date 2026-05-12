import { Box, Combine, FileDigit, Lock, ShieldCheck, Zap } from "lucide-react";

import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <div className="space-y-4">
      <p>
        O <strong>Unificando PDF</strong> reúne <strong>16 ferramentas</strong>{" "}
        de manipulação de documentos em uma única interface web, pensada para
        quem precisa de produtividade sem abrir mão da privacidade. Todo o
        processamento ocorre no servidor usando arquivos temporários em{" "}
        <code>/tmp</code> — descartados automaticamente após o download. Nenhum
        arquivo é persistido em banco ou armazenamento permanente.
      </p>
      <p>
        Além da utilidade prática, o projeto serve como vitrine técnica de
        domínio em <strong>processamento de arquivos em larga escala</strong>,
        arquitetura full-stack moderna com Next.js App Router, orquestração de
        binários nativos no servidor e infraestrutura containerizada com foco em
        segurança e isolamento.
      </p>
    </div>
  );
}

function TechnicalExcellenceContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Processamento Efêmero</h3>
        <p className="text-sm">
          Todo arquivo enviado é processado em <code>/tmp</code> com limpeza
          automatizada logo após o download. Nenhum dado sensível persiste nos
          servidores — o modelo de privacidade é aplicado por design, não por
          política.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Infraestrutura Blindada</h3>
        <p className="text-sm">
          Container de produção com usuário <code>non-root</code>, sistema de
          arquivos <code>read_only</code>, <code>tmpfs</code> para{" "}
          <code>/tmp</code> e limites rígidos de CPU/RAM via Docker Compose,
          evitando abusos e garantindo previsibilidade em produção.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Engine Híbrida</h3>
        <p className="text-sm">
          Orquestração entre bibliotecas TypeScript (<code>pdf-lib</code>,{" "}
          <code>pdfjs-dist</code>) para operações rápidas e binários nativos (
          <code>Ghostscript</code>, <code>LibreOffice</code>,{" "}
          <code>Poppler</code>, <code>qpdf</code>) para tarefas avançadas como
          compressão, conversão para Word e extração de páginas.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Controle de Concorrência</h3>
        <p className="text-sm">
          Fila de processamento no servidor com limite de concorrência,
          tamanho máximo de fila e retry configuráveis via variáveis de
          ambiente, garantindo estabilidade mesmo sob picos de tráfego.
        </p>
      </div>
    </div>
  );
}

function OperationsContent() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm list-disc list-inside">
      <li>Comprimir PDF</li>
      <li>Juntar PDF</li>
      <li>Dividir PDF</li>
      <li>Extrair Páginas</li>
      <li>PDF para Word</li>
      <li>PDF para TXT</li>
      <li>PDF para JPG</li>
      <li>JPG para PDF</li>
      <li>Rodar PDF</li>
      <li>Organizar PDF</li>
      <li>Proteger PDF</li>
      <li>Marca d&apos;Água</li>
      <li>Numerar Páginas</li>
      <li>PDF para PNG</li>
      <li>Censurar PDF</li>
      <li>PDF para Markdown</li>
    </ul>
  );
}

export const unificandoPdfCase: ProjectCase = {
  id: "unificando-pdf",
  pathSegments: ["unificando", "pdf"],
  card: card(
    "unificando-pdf",
    "Unificando PDF",
    "SaaS & Utilitários",
    "Uma suíte robusta de ferramentas para documentos, com foco em privacidade absoluta e processamento de alto desempenho.",
    "tech",
    ["Next.js", "pdf-lib", "Docker", "Ghostscript"],
  ),
  jsonLd: {
    name: "Unificando PDF",
    description:
      "Plataforma web para processamento de documentos PDF com foco em privacidade e performance.",
    url: `${SOCIALS.personal.site}/projetos/unificando/pdf`,
  },
  breadcrumbs: breadcrumbs(
    { name: "Unificando", item: "/projetos/unificando/pdf" },
    { name: "PDF", item: "/projetos/unificando/pdf" },
  ),
  categoryBadge: "SaaS & Utilitários",
  title: "Unificando PDF: Privacidade & Produtividade",
  shortDescription: (
    <>
      Suíte com <strong>16 ferramentas de PDF</strong> focada em{" "}
      <strong>privacidade por design</strong>: processamento server-side com
      arquivos temporários em <code>/tmp</code>, descartados após o download —
      sem cadastro, sem persistência.
    </>
  ),
  themeColor: "tech",
  liveUrl: SOCIALS.unificando.pdf,
  githubUrl: "https://github.com/renatojuniordw/pdf-unificando",
  overviewTitle: "Intenção do Projeto",
  overviewContent: <Overview />,
  featuresTitle: "Ferramentas Integradas",
  features: [
    {
      icon: <Zap className="text-tech" size={24} />,
      title: "Alta Performance",
      description:
        "Compressão e conversão otimizadas para arquivos pesados, mantendo a qualidade visual.",
    },
    {
      icon: <Lock className="text-tech" size={24} />,
      title: "Proteção Total",
      description:
        "Adicione senhas, restrinja permissões e oculte informações sensíveis com segurança.",
    },
    {
      icon: <Combine className="text-tech" size={24} />,
      title: "Edição Flexível",
      description:
        "Junte, divida, extraia, organize e rotacione páginas com uma interface drag-and-drop intuitiva.",
    },
    {
      icon: <FileDigit className="text-tech" size={24} />,
      title: "Conversão Inteligente",
      description:
        "Transforme PDFs em Word, texto, imagens (JPG/PNG) e Markdown estruturado — útil para pipelines de RAG e IA. Ou converta JPGs em PDF com alta fidelidade.",
    },
  ],
  extraSections: [
    {
      id: "technical-excellence",
      icon: <ShieldCheck className="text-tech" />,
      title: "Excelência Técnica & Segurança",
      content: <TechnicalExcellenceContent />,
    },
    {
      id: "stack-details",
      icon: <Box className="text-tech" />,
      title: "Operações Suportadas",
      content: <OperationsContent />,
    },
  ],
  sidebarTechStackTitle: "Tecnologias Utilizadas",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js 16 (App Router)" },
    { label: "Frontend", name: "React 19 & Framer Motion" },
    { label: "Drag & Drop", name: "dnd-kit" },
    { label: "Styling", name: "Tailwind CSS 4" },
    { label: "Core PDF", name: "pdf-lib & pdfjs-dist" },
    { label: "Image Processing", name: "Sharp & @napi-rs/canvas" },
    { label: "Archiving", name: "archiver (zip)" },
    { label: "Infrastructure", name: "Docker & Docker Compose" },
    { label: "Native Tools", name: "Ghostscript, LibreOffice, Poppler, qpdf" },
  ],
};
