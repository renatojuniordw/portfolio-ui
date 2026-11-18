import { FileSearch, Gavel, Scale, Sparkles } from "lucide-react";

import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        <strong>Previando</strong> é um SaaS para{" "}
        <strong>advocacia previdenciária brasileira</strong>. O objetivo é reunir
        em um só lugar o trabalho do escritório: clientes, casos, leitura do CNIS,
        cálculos de benefício, retroativos, BPC/LOAS, prazos e honorários.
      </p>
      <p>
        A IA auxilia na redação de pareceres e petições, sempre com{" "}
        <strong>revisão do advogado</strong>. Há ainda um portal para o cliente
        acompanhar o andamento do caso.
      </p>
      <p>
        <strong>Status:</strong> o projeto está em desenvolvimento e ainda não está
        aberto ao público.
      </p>
    </>
  );
}

export const previandoCase: ProjectCase = {
  id: "previando",
  pathSegments: ["previando"],
  card: card(
    "previando",
    "Previando",
    "SaaS / Jurídico",
    "SaaS para advocacia previdenciária com leitura de CNIS, cálculos de benefício e peças com IA revisadas pelo advogado.",
    "ia",
    ["Next.js", "TypeScript", "PostgreSQL", "IA"],
    { areas: ["ia", "frontend"], status: "em-desenvolvimento" },
  ),
  jsonLd: {
    name: "Previando",
    description:
      "SaaS em desenvolvimento para advocacia previdenciária brasileira.",
    url: "https://renatobezerra.com.br/projetos/previando",
  },
  breadcrumbs: breadcrumbs({ name: "Previando", item: "/projetos/previando" }),
  categoryBadge: "SaaS / Jurídico",
  title: "Previando",
  shortDescription: (
    <>
      <strong>SaaS para advocacia previdenciária</strong>, com cálculos de
      benefício e peças assistidas por IA. Projeto em desenvolvimento.
    </>
  ),
  themeColor: "ia",
  overviewTitle: "Objetivo",
  overviewContent: <Overview />,
  featuresTitle: "Escopo",
  features: [
    {
      icon: <FileSearch className="text-ia" aria-hidden="true" />,
      title: "Leitura do CNIS",
      description:
        "Importação e interpretação do extrato do CNIS para acelerar a análise do histórico contributivo.",
    },
    {
      icon: <Scale className="text-ia" aria-hidden="true" />,
      title: "Cálculos de benefício",
      description:
        "Cálculos de benefício, retroativos e BPC/LOAS para apoiar a decisão do advogado.",
    },
    {
      icon: <Sparkles className="text-ia" aria-hidden="true" />,
      title: "IA com revisão humana",
      description:
        "Pareceres e petições assistidos por IA, sempre revisados pelo advogado antes do uso.",
    },
    {
      icon: <Gavel className="text-ia" aria-hidden="true" />,
      title: "Gestão do escritório",
      description:
        "Clientes, casos, prazos, honorários e um portal para o cliente acompanhar o andamento.",
    },
  ],
  sidebarTechStackTitle: "Stack Planejada",
  sidebarTechStack: [
    { label: "Framework", name: "Next.js / React" },
    { label: "Linguagem", name: "TypeScript" },
    { label: "Banco", name: "PostgreSQL + Prisma" },
    { label: "Filas", name: "Redis + BullMQ" },
  ],
};
