import { buildMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/components/layout/ProjectTemplate";
import { ProjectDetails } from "@/types/project";
import {
  History,
  BookOpen,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";
import React from "react";

export const generateMetadata = () =>
  buildMetadata({
    title: "Ariano Suassuna - Site Tributo Educacional",
    description:
      "Site educacional sobre a vida e obra de Ariano Suassuna. Projeto comunitário focado na preservação da memória cultural.",
    path: "/projetos/ariano-suassuna",
  });

const project: ProjectDetails = {
  id: "ariano-suassuna",
  seoTitle: "Ariano Suassuna - Site Tributo Educacional",
  seoDescription:
    "Site educacional sobre a vida e obra de Ariano Suassuna. Projeto comunitário focado na preservação da memória cultural.",
  jsonLd: {
    name: "Ariano Suassuna - Tributo",
    description:
      "Site educacional sobre a vida e obra de Ariano Suassuna, originado de um projeto estudantil em 2016 e mantido como esforço da comunidade.",
    url: "https://ariano-suassuna.unificando.com.br/",
  },
  breadcrumbs: [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Ariano Suassuna", item: "/projetos/ariano-suassuna" },
  ],
  categoryBadge: "Educacional / Cultura",
  title: "Ariano Suassuna: Tributo",
  shortDescription: (
    <>
      Site educacional e colaborativo dedicado à vida e obra de{" "}
      <strong>Ariano Suassuna</strong>, preservando a cultura e memória nordestina na web.
    </>
  ),
  themeColor: "tech",
  githubUrl: "https://github.com/renatojuniordw/ui-ariano-suassuna",
  liveUrl: "https://ariano-suassuna.unificando.com.br/",
  overviewTitle: "O Projeto & História",
  overviewContent: (
    <>
      <p>
        A aplicação nasceu de um esforço estudantil colaborativo em{" "}
        <strong>2016</strong>, durante um curso no <strong>CRC Recife</strong>. Desde então, a plataforma evoluiu
        para se tornar um acervo digital mantido pela comunidade.
      </p>
      <p>
        O principal objetivo deste site é garantir que as gerações futuras tenham acesso facilitado e estruturado às
        contribuições literárias, teatrais e filosóficas de Ariano, promovendo a rica cultura do Nordeste brasileiro.
      </p>
    </>
  ),
  featuresTitle: "Pilares do Tributo",
  features: [
    {
      icon: <History className="text-tech" size={24} />,
      title: "Preservação Histórica",
      description: "Acervo digital detalhado sobre a vida, obra e impacto cultural do autor na literatura e dramaturgia.",
    },
    {
      icon: <BookOpen className="text-tech" size={24} />,
      title: "Foco Educacional",
      description: "Conteúdo estruturado e acessível, ideal para estudantes, professores e pesquisadores da cultura nordestina.",
    },
    {
      icon: <GraduationCap className="text-tech" size={24} />,
      title: "Origem Acadêmica",
      description: "Nascido em sala de aula no CRC Recife em 2016, refletindo o trabalho e dedicação de alunos em tecnologia.",
    },
    {
      icon: <ShieldAlert className="text-tech" size={24} />,
      title: "Transparência",
      description: "Iniciativa sem fins lucrativos e 100% não oficial. Sem vínculos institucionais com a família ou editores.",
    },
  ],
  sidebarTechStackTitle: "Detalhes",
  sidebarTechStack: [
    { label: "Início", name: "2016 (CRC Recife)" },
    { label: "Natureza", name: "Tributo / Acervo" },
    { label: "Stack (Atual)", name: "React / Vite" },
  ],
  sidebarExtraCards: [
    {
      icon: <ShieldAlert size={20} className="text-tech" aria-hidden="true" />,
      title: "Aviso Legal",
      content: (
        <p>
          Este é um site de caráter puramente <strong>educacional e de fã</strong>.
          Não possui qualquer vínculo oficial com os herdeiros, 
          representantes legais ou editoras das obras de Ariano Suassuna.
        </p>
      ),
    },
  ],
};

export default function ArianoSuassunaPage() {
  return <ProjectTemplate project={project} />;
}
