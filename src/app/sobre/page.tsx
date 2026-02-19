import { SplitText } from "@/components/fx/SplitText";
import { PROFILE } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <header className="mb-16 text-center">
        <SplitText
          text="Sobre Mim"
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        />
        <Card className="bg-s2/30 border-tech/20">
          <CardContent className="p-8">
            <p className="text-xl text-text leading-relaxed">
              {PROFILE.summary}
            </p>
          </CardContent>
        </Card>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-border"></span>
          Carreira & Formação
          <span className="h-px flex-1 bg-border"></span>
        </h2>

        <div className="space-y-12">
          <div className="relative pl-8 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-tech" />
            <span className="text-sm font-bold text-tech uppercase">
              Experiência Recente
            </span>
            <h3 className="text-xl font-bold mt-1">Software Engineer</h3>
            <p className="text-text-secondary">
              Foco em ecossistemas Frontend.
            </p>
          </div>

          <div className="relative pl-8 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-border" />
            <span className="text-sm font-bold text-text-secondary uppercase">
              Pós-Graduação
            </span>
            <h3 className="text-xl font-bold mt-1">Software Architecture</h3>
            <p className="text-text-secondary">
              FIAP - Especialização em decisões estratégicas e sistemas
              escaláveis.
            </p>
          </div>

          <div className="relative pl-8 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-border" />
            <span className="text-sm font-bold text-text-secondary uppercase">
              Certificações
            </span>
            <h3 className="text-xl font-bold mt-1">Microsoft Specialist</h3>
            <p className="text-text-secondary">HTML5, JavaScript e CSS3.</p>
          </div>
        </div>
      </section>

      <section className="p-8 rounded-xl bg-s1 border border-border text-center">
        <h3 className="text-lg font-bold mb-2">Nota PCD</h3>
        <p className="text-text-secondary">{PROFILE.pcdNote}</p>
      </section>
    </div>
  );
}
