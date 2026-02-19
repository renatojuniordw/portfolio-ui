import { SplitText } from "@/components/fx/SplitText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    id: "unificando",
    title: "Unificando",
    description:
      "Ecosistema de atendimento, IA e automação para Instagram e WhatsApp.",
    tags: ["IA", "N8N", "Next.js", "Product"],
    accent: "ia",
    link: "/projetos/unificando",
  },
  {
    id: "seu-barraco-esperto",
    title: "Seu Barraco Esperto",
    description:
      "Automação residencial prática e sem frescura com Alexa e IoT.",
    tags: ["IoT", "Automação", "Mídia"],
    accent: "barraco",
    link: "/projetos/seu-barraco-esperto",
  },
  {
    id: "experiencia-senior",
    title: "Sênior Frontend",
    description:
      "Projetos em larga escala para grandes empresas (Avanade, CESAR, MV).",
    tags: ["React", "Angular", "Arquitetura"],
    accent: "tech",
    link: "/sobre",
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16">
        <SplitText
          text="Meus Projetos"
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        />
        <p className="text-xl text-text-secondary max-w-2xl">
          Uma seleção de trabalhos que unem código, design e impacto real no
          negócio.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <Card
            key={project.id}
            className="group overflow-hidden hover:border-text-primary/20 transition-all"
          >
            <div className={`h-2 w-full bg-${project.accent}`} />
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-sm bg-s2 text-[10px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
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
