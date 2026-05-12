import { BarChart3, Instagram, Target, Users } from "lucide-react";

import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        Criadores de conteúdo precisam de materiais profissionais para apresentar
        seus números a marcas e agências. O objetivo deste projeto foi desenvolver
        um <strong>Mídia Kit digital e interativo</strong>, substituindo os
        tradicionais e estáticos PDFs por uma experiência imersiva e sempre
        atualizada.
      </p>
      <p>
        A aplicação foca em expor de maneira clara o perfil da audiência, insights
        de alcance e os principais pacotes de parceria comercial que o influenciador
        oferece.
      </p>
    </>
  );
}

export const sheikCase: ProjectCase = {
  id: "sheik",
  pathSegments: ["sheik"],
  card: card(
    "sheik",
    "Diego Sheik - Mídia Kit",
    "Mídia & Influência",
    "Mídia kit interativo com insights de audiência, formatos de parceria e métricas reais de Instagram para marcas.",
    "tech",
    ["React", "Next.js", "Framer Motion"],
  ),
  jsonLd: {
    name: "Diego Sheik - Mídia Kit",
    description:
      "Mídia kit dinâmico com insights de audiência e métricas em tempo real focado na atração de marcas e patrocínios.",
    url: "https://sheik.unificando.com.br/",
  },
  breadcrumbs: breadcrumbs({ name: "Diego Sheik", item: "/projetos/sheik" }),
  categoryBadge: "Mídia & Influência",
  title: "Diego Sheik: Mídia Kit",
  shortDescription: (
    <>
      Mídia kit interativo projetado para o criador de conteúdo{" "}
      <strong>Diego Sheik</strong>, destacando métricas de audiência, formatos de
      parceria e engajamento no Instagram.
    </>
  ),
  themeColor: "tech",
  githubUrl: "https://github.com/renatojuniordw/sheik-mediakit",
  liveUrl: "https://sheik.unificando.com.br/",
  overviewTitle: "O Projeto",
  overviewContent: <Overview />,
  featuresTitle: "Destaques da Plataforma",
  features: [
    {
      icon: <BarChart3 className="text-tech" size={24} />,
      title: "Métricas e Insights",
      description:
        "Exibição clara de métricas de alcance, impressões e taxas de engajamento do Instagram.",
    },
    {
      icon: <Users className="text-tech" size={24} />,
      title: "Perfil do Público",
      description:
        "Demonstração demográfica detalhada para que as marcas avaliem o alinhamento de público-alvo.",
    },
    {
      icon: <Instagram className="text-tech" size={24} />,
      title: "Formatos de Parceria",
      description:
        "Seção dedicada aos pacotes comerciais disponíveis, como Stories, Reels, provadores e presenças VIP.",
    },
    {
      icon: <Target className="text-tech" size={24} />,
      title: "Foco em Conversão",
      description:
        "Design responsivo e direto ao ponto, com CTAs otimizados para iniciar o contato com a assessoria.",
    },
  ],
  sidebarTechStackTitle: "Detalhes",
  sidebarTechStack: [
    { label: "Cliente", name: "Diego Sheik" },
    { label: "Categoria", name: "Mídia Kit / Landing Page" },
    { label: "Foco", name: "Parcerias e Patrocínios" },
  ],
};
