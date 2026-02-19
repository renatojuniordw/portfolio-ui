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

const PROJECTS = [
  {
    id: "unificando",
    title: "Unificando",
    category: "Produto Próprio",
    description:
      "Ecosistema de atendimento, IA e automação para Instagram e WhatsApp.",
    accent: "ia",
    link: "/projetos/unificando",
  },
  {
    id: "mariaclarasantos",
    title: "Maria Clara Santos",
    category: "Freelance / Institucional",
    description:
      "Landing page de alta conversão para advocacia com sistema de anti-golpe integrado.",
    accent: "tech",
    link: "/projetos/mariaclarasantos",
  },
  {
    id: "seu-barraco-esperto",
    title: "Seu Barraco Esperto",
    category: "Produto Próprio",
    description:
      "Automação residencial prática e sem frescura com Alexa e IoT.",
    accent: "barraco",
    link: "/projetos/seu-barraco-esperto",
  },
  {
    id: "experiencia-senior",
    title: "Software Engineer",
    category: "Enterprise / Carreira",
    description:
      "Projetos em larga escala para grandes empresas (Avanade, CESAR, MV).",
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">
                {project.category}
              </span>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>

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
