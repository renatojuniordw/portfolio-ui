import Image from "next/image";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { PROFILE, SOCIALS, getYearsOfExperience } from "@/lib/constants";
import { DynamicParticleField as ParticleField } from "@/components/fx/DynamicParticleField";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { ParallaxSection } from "@/components/fx/ParallaxSection";

export function HeroSection() {
  const anos = getYearsOfExperience();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex w-full flex-col lg:min-h-dvh lg:flex-row"
    >
      <ParticleField className="absolute inset-0 z-0" />

      {/* Texto vertical decorativo — só em telas muito largas */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex absolute left-8 top-0 bottom-0 flex-col justify-between py-24 z-20 text-muted text-sm uppercase tracking-widest pointer-events-none"
      >
        <div className="origin-left -rotate-90 whitespace-nowrap -translate-x-[40%] mt-48">
          Engenheiro de Software
        </div>
        <div className="origin-left -rotate-90 whitespace-nowrap -translate-x-[40%] mb-12">
          {new Date().getFullYear()}
        </div>
      </div>

      <div className="z-10 flex min-w-0 flex-1 flex-col justify-center px-6 pt-28 pb-12 sm:px-8 lg:px-24 lg:pt-32 lg:pb-16 2xl:pl-40 2xl:pr-24">
        <div>
          <p className="text-xs sm:text-sm text-muted uppercase tracking-widest mb-6 lg:mb-8 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-text/40" />+{anos} anos
            de experiência
          </p>

          <h1
            id="hero-heading"
            className="leading-[0.9] font-display font-bold tracking-tighter text-text mb-6 lg:mb-8"
          >
            {PROFILE.name.split(" ").map((part) => (
              <span key={part} className="block text-[clamp(3rem,10vw+1rem,13rem)] -ml-1">
                {part}
              </span>
            ))}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-text text-balance">
            Engenheiro de Software · IA aplicada & Automação
          </p>
          <p className="mt-4 max-w-md text-base sm:text-lg font-light text-text-secondary leading-relaxed">
            Criando arquiteturas escaláveis e automatizando processos com
            Inteligência Artificial para produtos digitais de alto impacto.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              as="link"
              href="/projetos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-text px-7 text-base font-medium text-bg transition-opacity hover:opacity-90"
            >
              Ver projetos
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="link"
              href="/contato"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-bg/60 px-7 text-base font-medium text-text transition-colors hover:border-text"
            >
              Vamos conversar
            </MagneticButton>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Redes profissionais">
            <li>
              <a
                href={SOCIALS.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                <Linkedin aria-hidden="true" className="w-4 h-4" />
                <span>in/renato-bezerra</span>
                <span className="sr-only"> no LinkedIn (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a
                href={SOCIALS.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                <Github aria-hidden="true" className="w-4 h-4" />
                <span>@renatojuniordw</span>
                <span className="sr-only"> no GitHub (abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Foto: abaixo do conteúdo em telas estreitas, com proporção reservada. */}
      <ParallaxSection
        speed={0.1}
        className="relative z-0 w-full px-6 pb-12 sm:px-12 lg:w-[45%] lg:px-0 lg:pb-0 xl:w-[50%]"
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-surface-2 lg:aspect-auto lg:h-dvh lg:max-w-none lg:rounded-none">
          <Image
            src="/RenatoBezerra.avif"
            alt={PROFILE.fullName || "Renato Bezerra"}
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            className="object-cover object-[center_20%] grayscale hover:grayscale-0 transition-[filter] duration-1000 ease-in-out"
            sizes="(max-width: 1024px) 28rem, 50vw"
          />
        </div>
      </ParallaxSection>
    </section>
  );
}
