import { Box, Combine, FileDigit, Lock, ShieldCheck, Zap } from "lucide-react";

import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <div className="space-y-4">
      <p>
        O <strong>Unificando PDF</strong> nasceu para resolver uma necessidade
        real de produtividade documental com uma experiência rápida, acessível e,
        acima de tudo, segura. A proposta é oferecer ferramentas profissionais de
        forma gratuita, onde os arquivos são processados de forma{" "}
        <strong>efêmera</strong> e descartados imediatamente após o uso.
      </p>
      <p>
        Além da utilidade prática, o projeto funciona como uma vitrine técnica de
        domínio em{" "}
        <strong>processamento de arquivos em larga escala</strong>,
        arquitetura full-stack moderna e cuidados rigorosos com segurança e
        infraestrutura em contêineres.
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
          Implementação de uma camada de processamento temporário em{" "}
          <code>/tmp</code> com limpeza automatizada. Garantimos que nenhum dado
          sensível persista nos servidores após o download do usuário.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Infraestrutura Blindada</h3>
        <p className="text-sm">
          Container de produção configurado com usuário <code>non-root</code>,
          sistema de arquivos <code>read_only</code> e limites rígidos de recursos
          (CPU/RAM) via Docker para evitar abusos e garantir estabilidade.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Engine Híbrida</h3>
        <p className="text-sm">
          Orquestração entre bibliotecas TypeScript (<code>pdf-lib</code>) para
          manipulação rápida e binários nativos (<code>Ghostscript</code>,{" "}
          <code>qpdf</code>) para operações avançadas e complexas.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Controle de Concorrência</h3>
        <p className="text-sm">
          Uso de <code>p-limit</code> e filas de processamento no Node.js para
          gerenciar picos de tráfego sem comprometer a latência do sistema.
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
      Uma suíte online completa para <strong>manipulação de PDFs</strong> focada
      em <strong>privacidade e performance</strong>. Processamento seguro
      diretamente no navegador e em servidores otimizados, sem necessidade de
      cadastro.
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
        "Transforme PDFs em Word, texto, imagens (JPG/PNG) e Markdown, ou una JPGs em PDF com alta fidelidade.",
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
    { label: "Styling", name: "Tailwind CSS 4" },
    { label: "Core PDF", name: "pdf-lib & pdfjs-dist" },
    { label: "Image Processing", name: "Sharp & Canvas" },
    { label: "Infrastructure", name: "Docker & Docker Compose" },
    { label: "Native Tools", name: "Ghostscript, Poppler, qpdf" },
  ],
};
