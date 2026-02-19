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
import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroScene } from "@/components/three/HeroSceneWrapper";
import { PROFILE } from "@/lib/constants";

export const generateMetadata = () =>
  buildMetadata({
    title: "Engenheiro de Software & Arquiteto Front-end | Recife",
    description:
      "Portfólio de Renato Bezerra, Engenheiro de Software em Recife, especialista em React, Angular e automações com IA. Criando arquiteturas front-end de alta performance.",
  });

export default function Home() {
  return (
    <div className="relative">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <HeroScene />
        <div className="z-10 text-center max-w-4xl">
          <SplitText
            text="Eu construo experiências web com cara de produto."
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          />
          <h1 className="sr-only">
            {PROFILE.fullName} - {PROFILE.handle} | Renato Bezerra - Engenheiro
            de Software Front-end em Recife
          </h1>
          <p
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto opacity-0 animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-forwards"
            style={{ animationDelay: "800ms" }}
          >
            Especialista em <strong>arquitetura front-end</strong> e{" "}
            <strong>IA</strong> — baseado em Recife, conectando código e
            estratégia para o mundo.
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
      <section
        className="py-24 px-6 max-w-7xl mx-auto"
        aria-labelledby="focus-areas-title"
      >
        <h2
          id="focus-areas-title"
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          O que eu construo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:border-tech/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-tech/10 flex items-center justify-center text-tech mb-4 group-hover:scale-110 transition-transform">
                <Code size={24} aria-hidden="true" />
              </div>
              <CardTitle>Frontend Engineer</CardTitle>
              <CardDescription>
                Especialista em <strong>React</strong> e{" "}
                <strong>Angular</strong>, criando interfaces performáticas,
                acessíveis.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-ia/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-ia/10 flex items-center justify-center text-ia mb-4 group-hover:scale-110 transition-transform">
                <Brain size={24} aria-hidden="true" />
              </div>
              <CardTitle>Automação & IA</CardTitle>
              <CardDescription>
                Soluções inteligentes com <strong>N8N</strong> e{" "}
                <strong>LLMs</strong> para otimizar processos reais e{" "}
                <strong>atendimento WhatsApp com IA</strong>.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-barraco/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-barraco/10 flex items-center justify-center text-barraco mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} aria-hidden="true" />
              </div>
              <CardTitle>Visão de Produto</CardTitle>
              <CardDescription>
                Foco no usuário e estratégia de negócio, entregando de
                <strong> criação de site profissional</strong> a{" "}
                <strong>automação residencial</strong>.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
