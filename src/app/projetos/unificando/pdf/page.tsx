import { buildMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";
import { ProjectDetails } from "@/types/project";
import {
  FileText,
  Combine,
  Scissors,
  Layout,
  RotateCw,
  Lock,
  Droplets,
  Eraser,
  FileDigit,
  ShieldCheck,
  Zap,
  Box,
} from "lucide-react";
import React from "react";
import { SOCIALS } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: "Unificando PDF - Manipulação de Documentos com Privacidade",
    description:
      "Case Unificando PDF: Uma suíte full-stack para processamento de documentos PDF com foco em segurança, performance e processamento efêmero.",
    path: "/projetos/unificando/pdf",
  });

const project: ProjectDetails = {
  id: "unificando/pdf",
  jsonLd: {
    name: "Unificando PDF",
    description:
      "Plataforma web para processamento de documentos PDF com foco em privacidade e performance.",
    url: `${SOCIALS.personal.site}/projetos/unificando/pdf`,
  },
  breadcrumbs: [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Unificando", item: "/projetos/unificando/pdf" },
    { name: "PDF", item: "/projetos/unificando/pdf" },
  ],
  categoryBadge: "SaaS & Utilitários",
  title: "Unificando PDF: Privacidade & Produtividade",
  shortDescription: (
    <>
      Uma suíte online completa para <strong>manipulação de PDFs</strong> focada em
      <strong> privacidade e performance</strong>. Processamento seguro de arquivos
      diretamente no navegador e em servidores otimizados, sem necessidade de cadastro.
    </>
  ),
  themeColor: "tech",
  liveUrl: SOCIALS.unificando.pdf,
  githubUrl: "https://github.com/renatojuniordw/pdf-unificando",
  overviewTitle: "Intenção do Projeto",
  overviewContent: (
    <div className="space-y-4">
      <p>
        O <strong>Unificando PDF</strong> nasceu para resolver uma necessidade real de
        produtividade documental com uma experiência rápida, acessível e, acima de tudo, segura. 
        A proposta é oferecer ferramentas profissionais de forma gratuita, onde os arquivos são 
        processados de forma <strong>efêmera</strong> e descartados imediatamente após o uso.
      </p>
      <p>
        Além da utilidade prática, o projeto funciona como uma vitrine técnica de domínio em 
        <strong> processamento de arquivos em larga escala</strong>, arquitetura full-stack moderna 
        e cuidados rigorosos com segurança e infraestrutura em contêineres.
      </p>
    </div>
  ),
  featuresTitle: "Ferramentas Integradas",
  features: [
    {
      icon: <Zap className="text-tech" size={24} />,
      title: "Alta Performance",
      description: "Compressão e conversão otimizadas para arquivos pesados, mantendo a qualidade visual.",
    },
    {
      icon: <Lock className="text-tech" size={24} />,
      title: "Proteção Total",
      description: "Adicione senhas, restrinja permissões e redija informações sensíveis com segurança.",
    },
    {
      icon: <Combine className="text-tech" size={24} />,
      title: "Edição Flexível",
      description: "Junte, divida, organize e rotacione páginas com uma interface drag-and-drop intuitiva.",
    },
    {
      icon: <FileDigit className="text-tech" size={24} />,
      title: "Conversão Inteligente",
      description: "Transforme PDFs em Word ou imagens (JPG/PNG) e vice-versa com alta fidelidade.",
    },
  ],
  extraSections: [
    {
      id: "technical-excellence",
      icon: <ShieldCheck className="text-tech" />,
      title: "Excelência Técnica & Segurança",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text">Processamento Efêmero</h3>
            <p className="text-sm">
              Implementação de uma camada de processamento temporário em <code>/tmp</code> com limpeza automatizada. 
              Garantimos que nenhum dado sensível persista nos servidores após o download do usuário.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text">Infraestrutura Blindada</h3>
            <p className="text-sm">
              Container de produção configurado com usuário <code>non-root</code>, sistema de arquivos <code>read_only</code> 
              e limites rígidos de recursos (CPU/RAM) via Docker para evitar abusos e garantir estabilidade.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text">Engine Híbrida</h3>
            <p className="text-sm">
              Orquestração entre bibliotecas TypeScript (<code>pdf-lib</code>) para manipulação rápida e binários nativos 
              (<code>Ghostscript</code>, <code>qpdf</code>) para operações avançadas e complexas.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text">Controle de Concorrência</h3>
            <p className="text-sm">
              Uso de <code>p-limit</code> e filas de processamento no Node.js para gerenciar picos de tráfego sem 
              comprometer a latência do sistema.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "stack-details",
      icon: <Box className="text-tech" />,
      title: "Operações Suportadas",
      content: (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm list-disc list-inside">
          <li>Comprimir PDF</li>
          <li>Juntar & Dividir</li>
          <li>Organizar Páginas</li>
          <li>Rotacionar PDF</li>
          <li>Proteger com Senha</li>
          <li>Marca d’água</li>
          <li>Redigir/Censurar</li>
          <li>PDF para Word</li>
          <li>PDF para Imagem</li>
          <li>Imagem para PDF</li>
        </ul>
      ),
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

export default function UnificandoPdfPage() {
  return <ProjectTemplate project={project} />;
}
