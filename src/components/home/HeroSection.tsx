import Image from "next/image";
import { PROFILE, SOCIALS, getYearsOfExperience } from "@/lib/constants";
import { Linkedin, Github } from "lucide-react";
import { DynamicParticleField as ParticleField } from "@/components/fx/DynamicParticleField";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { ParallaxSection } from "@/components/fx/ParallaxSection";

export function HeroSection() {
  const anos = getYearsOfExperience();

  return (
    <section className="min-h-dvh relative flex flex-col lg:flex-row w-full">
      <ParticleField className="absolute inset-0 z-0" />

      {/* Vertical Rotated Text - Left Edge (Only visible on large screens) */}
      <div className="hidden 2xl:flex absolute left-8 top-0 bottom-0 flex-col justify-between py-24 z-20 text-muted text-sm uppercase tracking-widest pointer-events-none">
        <div className="origin-left -rotate-90 whitespace-nowrap -translate-x-[40%] mt-48">
          Engenheiro de Software
        </div>
        <div className="origin-left -rotate-90 whitespace-nowrap -translate-x-[40%] mb-12">
          {new Date().getFullYear()}
        </div>
      </div>

      {/* Left Content Area */}
      <div className="flex-1 flex flex-col justify-between px-8 pt-24 pb-12 md:pt-28 lg:px-24 lg:pt-32 lg:pb-16 2xl:pl-40 2xl:pr-24 z-10 bg-transparent">
        {/* Center Text */}
        <div
          className="mt-20 mb-20 lg:my-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-xs sm:text-sm text-muted uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-text/40" />+{anos} anos de
            experiência
          </p>

          <h1 className="leading-[0.9] font-display font-bold tracking-tighter text-text mb-8">
            {PROFILE.name.split(" ").map((part) => (
              <span
                key={part}
                className="block text-[clamp(4.5rem,11vw,13rem)] -ml-1"
              >
                {part}
              </span>
            ))}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-text">
            Engenheiro de Software Front-end & IA
          </p>
          <p className="mt-4 max-w-md text-base sm:text-lg font-light text-text-secondary leading-relaxed">
            Criando arquiteturas escaláveis e automatizando processos com
            Inteligência Artificial para produtos digitais de alto impacto.
          </p>

          <div className="flex flex-wrap gap-6 mt-8">
            <MagneticButton
              as="a"
              href={SOCIALS.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="in/renato-bezerra no LinkedIn (abre em nova aba)"
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors group"
            >
              <Linkedin
                aria-hidden="true"
                className="w-4 h-4 group-hover:scale-110 transition-transform"
              />
              <span>in/renato-bezerra</span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SOCIALS.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="@renatojuniordw no GitHub (abre em nova aba)"
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors group"
            >
              <Github
                aria-hidden="true"
                className="w-4 h-4 group-hover:scale-110 transition-transform"
              />
              <span>@renatojuniordw</span>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="animate-in fade-in duration-1000 fill-mode-forwards"
          style={{ animationDelay: "600ms" }}
        >
          <a
            href="#sobre"
            className="inline-block text-sm font-medium flex items-center gap-2 cursor-pointer hover:text-text-secondary transition-colors w-max"
          >
            Deslize para baixo <span className="text-lg">↓</span>
          </a>
        </div>
      </div>

      {/* Right Image Area */}
      <ParallaxSection
        speed={0.1}
        className="lg:w-[45%] xl:w-[50%] relative w-full animate-in fade-in slide-in-from-right-8 duration-1000 fill-mode-forwards z-0 px-6 sm:px-12 lg:px-0 pb-12 lg:pb-0"
      >
        <div style={{ animationDelay: "800ms" }}>
          <div className="relative w-full h-[65vh] lg:h-dvh rounded-[2rem] lg:rounded-none overflow-hidden bg-surface-2">
            <Image
              src="/RenatoBezerra.avif"
              alt={PROFILE.fullName || "Renato Bezerra"}
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
}
