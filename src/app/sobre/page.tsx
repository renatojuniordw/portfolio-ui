import { SplitText } from "@/components/fx/SplitText";
import { PROFILE } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Sobre Renato Bezerra | Engenheiro de Software em Recife",
    description:
      "Conheça a trajetória de Renato Bezerra, arquiteto de software front-end e especialista em automação e IA. Atuação em Recife e projetos globais.",
    path: "/sobre",
  });

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Sobre", item: "/sobre" },
  ];

  return (
    <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <header className="mb-16 text-center">
        <h1 className="sr-only">
          Sobre {PROFILE.fullName} ({PROFILE.handle}) - Engenheiro de Software
          em Recife
        </h1>
        <SplitText
          text="Sobre Mim"
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        />
        <Card className="bg-s2/30 border-tech/20">
          <CardContent className="p-8">
            <p className="text-xl text-text leading-relaxed">
              <strong>Engenheiro de Software</strong>, com foco em arquitetura
              front-end e automação com IA para criação de produtos digitais de
              alto impacto.
            </p>
          </CardContent>
        </Card>
      </header>

      <section className="mb-16" aria-labelledby="career-title">
        <h2
          id="career-title"
          className="text-2xl font-display font-bold mb-8 flex items-center gap-4"
        >
          <span className="h-px flex-1 bg-border" aria-hidden="true"></span>
          Carreira & Formação
          <span className="h-px flex-1 bg-border" aria-hidden="true"></span>
        </h2>

        <div className="space-y-12">
          <article className="relative pl-8 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-tech" />
            <span className="text-sm font-bold text-tech uppercase">
              Foco Atual
            </span>
            <h3 className="text-xl font-bold mt-1">
              Software Engineer | Front-end & Automações
            </h3>
            <p className="text-text-secondary">
              Especialista no desenvolvimento de interfaces complexas e
              escaláveis com <strong>React e Angular</strong>, unindo a robustez
              do desenvolvimento Front-end com o poder da IA Generativa e
              Automação de processos em <strong>Recife</strong>.
            </p>
          </article>

          <article className="relative pl-8 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-border" />
            <span className="text-sm font-bold text-text-secondary uppercase">
              Pós-Graduação
            </span>
            <h3 className="text-xl font-bold mt-1">Software Architecture</h3>
            <p className="text-text-secondary">
              FIAP - Especialização em decisões estratégicas e sistemas
              escaláveis.
            </p>
          </article>

          <article className="relative pl-8 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-border" />
            <span className="text-sm font-bold text-text-secondary uppercase">
              Certificações
            </span>
            <h3 className="text-xl font-bold mt-1">Microsoft Specialist</h3>
            <p className="text-text-secondary">HTML5, JavaScript e CSS3.</p>
          </article>
        </div>
      </section>

      <section className="p-8 rounded-xl bg-s1 border border-border text-center">
        <h3 className="text-lg font-bold mb-2">Nota PCD</h3>
        <p className="text-sm text-text-secondary italic">{PROFILE.pcdNote}</p>
      </section>
    </main>
  );
}
