import { SplitText } from "@/components/fx/SplitText";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Projetos | Engenheiro de Software & Automação",
    description:
      "Explore os projetos de Renato Bezerra: de ecossistemas de atendimento com IA (Unificando) a arquitetura front-end e automação residencial.",
    path: "/projetos",
  });

const PROJECTS = [
  {
    id: "unificando",
    title: "Unificando: IA & Automação",
    category: "Inteligência Artificial",
    description:
      "Engine de atendimento distribuído, orquestração de LLMs e automação de fluxos via n8n.",
    accent: "ia",
    link: "/projetos/unificando",
  },
  {
    id: "unificando-plataforma",
    title: "Unificando: Vitrine Digital",
    category: "Branding & Conversão",
    description:
      "Site institucional interativo com foco em autoridade de marca e calculadora de planos em tempo real.",
    accent: "tech",
    link: "/projetos/unificando-plataforma",
  },
  {
    id: "mariaclarasantos",
    title: "Maria Clara Santos",
    category: "Web Performance / Jurídico",
    description:
      "Landing page de alta conversão para advocacia com sistema de anti-golpe integrado.",
    accent: "tech",
    link: "/projetos/mariaclarasantos",
  },
  {
    id: "seu-barraco-esperto",
    title: "Seu Barraco Esperto",
    category: "IoT / Automação Residencial",
    description:
      "Automação residencial prática e sem frescura com Alexa e IoT.",
    accent: "barraco",
    link: "/projetos/seu-barraco-esperto",
  },
];

export default function ProjectsPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <header className="mb-16">
        <h1 className="sr-only">Portfólio de Projetos - Renato Bezerra</h1>
        <SplitText
          text="Meus Projetos"
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        />
        <p className="text-xl text-text-secondary max-w-2xl">
          Uma seleção de trabalhos que unem código, design e impacto real no
          negócio — de <strong>atendimento WhatsApp com IA</strong> a{" "}
          <strong>arquitetura SaaS de alto nível</strong>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <Card
            key={project.id}
            className="group overflow-hidden hover:border-text-primary/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className={`h-2 w-full bg-${project.accent}`} />
              <CardHeader>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">
                  {project.category}
                </span>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
            </div>

            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={project.link}>
                  Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
