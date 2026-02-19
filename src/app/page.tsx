import { HeroScene } from "@/components/three/HeroScene";
import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Brain, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <HeroScene />
        <div className="z-10 text-center max-w-4xl">
          <SplitText
            text="Eu construo experiências web com cara de produto."
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          />
          <p
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto opacity-0 animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-forwards"
            style={{ animationDelay: "800ms" }}
          >
            Frontend (Angular/React), automação e IA — do código à estratégia.
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-forwards"
            style={{ animationDelay: "1000ms" }}
          >
            <Button size="lg" asChild>
              <Link href="/projetos">
                Ver Projetos <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sobre">Sobre Mim</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Focus Area Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:border-tech/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-tech/10 flex items-center justify-center text-tech mb-4 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <CardTitle>Frontend Engineer</CardTitle>
              <CardDescription>
                Especialista em React e Angular, criando interfaces
                performáticas e acessíveis.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-ia/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-ia/10 flex items-center justify-center text-ia mb-4 group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <CardTitle>Automação & IA</CardTitle>
              <CardDescription>
                Soluções inteligentes com N8N e LLMs para otimizar processos
                reais.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-barraco/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-barraco/10 flex items-center justify-center text-barraco mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <CardTitle>Visão de Produto</CardTitle>
              <CardDescription>
                Foco no usuário e estratégia de negócio, indo além do simples
                código.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* PCD Note Subfooter */}
      {/* <section className="py-12 border-t border-border/50 text-center">
        <p className="text-sm text-text-secondary italic">
          PCD: deficiência física que não requer adaptações para a realização
          das atividades profissionais.
        </p>
      </section> */}
    </div>
  );
}
