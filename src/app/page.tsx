import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROFILE } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { Accessibility, ArrowRight } from "lucide-react";
export const generateMetadata = () =>
  buildMetadata({
    title: "Engenheiro de Software & Arquiteto Front-end | Recife",
    description:
      "Portfólio de Renato Bezerra, Engenheiro de Software em Recife, especialista em React, Angular e automações com IA. Criando arquiteturas front-end de alta performance.",
  });

export default function Home() {
  return (
    <main className="w-full bg-[#FFFFFF] text-[#111111] relative overflow-x-hidden">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col lg:flex-row w-full">
        {/* Vertical Rotated Text - Left Edge (Only visible on large screens) */}
        <div className="hidden 2xl:flex absolute left-8 top-0 bottom-0 flex-col justify-between py-24 z-20 text-[#777777] text-sm uppercase tracking-widest pointer-events-none">
          <div className="origin-left -rotate-90 whitespace-nowrap -translate-x-[40%] mt-48">
            Engenheiro de Software
          </div>
          <div className="origin-left -rotate-90 whitespace-nowrap -translate-x-[40%] mb-12">
            2026
          </div>
        </div>

        {/* Left Content Area */}
        <div className="flex-1 flex flex-col justify-between px-8 pt-24 pb-12 md:pt-28 lg:px-24 lg:pt-32 lg:pb-16 2xl:pl-40 2xl:pr-24 z-10 bg-transparent">
          {/* Top Stats */}
          <div className="flex gap-12 lg:gap-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
            <div>
              <p className="text-4xl lg:text-[2.75rem] font-light mb-2 text-[#111111]">
                +{new Date().getFullYear() - 2017}
              </p>
              <p className="text-xs text-[#777777] uppercase tracking-wider">
                Anos de experiência
              </p>
            </div>
          </div>

          {/* Center Text */}
          <div
            className="mt-20 mb-20 lg:my-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards"
            style={{ animationDelay: "300ms" }}
          >
            <h1 className="text-[6rem] sm:text-[8rem] lg:text-[11rem] xl:text-[14rem] leading-none font-display font-light tracking-tighter text-[#111111] mb-6 -ml-2">
              Hello
            </h1>
            <p className="text-xl lg:text-2xl text-[#666666] font-medium">
              — Me chamo {PROFILE.fullName?.split(" ")[0] || "Renato"},
              Arquiteto Front-end & Especialista em Automações e IA
            </p>
          </div>

          {/* Bottom */}
          <div
            className="animate-in fade-in duration-1000 fill-mode-forwards"
            style={{ animationDelay: "600ms" }}
          >
            <a
              href="#sobre"
              className="inline-block text-sm font-medium flex items-center gap-2 cursor-pointer hover:text-[#666666] transition-colors w-max"
            >
              Deslize para baixo <span className="text-lg">↓</span>
            </a>
          </div>
        </div>

        {/* Right Image Area */}
        <div
          className="lg:w-[45%] xl:w-[50%] relative w-full animate-in fade-in slide-in-from-right-8 duration-1000 fill-mode-forwards z-0 px-6 sm:px-12 lg:px-0 pb-12 lg:pb-0"
          style={{ animationDelay: "800ms" }}
        >
          <div className="relative w-full h-[65vh] lg:h-screen rounded-[2rem] lg:rounded-none overflow-hidden bg-[#F9F9F9]">
            <Image
              src="/RenatoBezerra.png"
              alt={PROFILE.fullName || "Renato Bezerra"}
              fill
              priority
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section
        id="sobre"
        className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-[#F9F9F9] relative border-t border-[#E5E5E5]"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-[#111111] mb-8">
            Sobre mim
          </h2>
          <p className="text-xl lg:text-2xl text-[#666666] font-light leading-relaxed mb-20">
            <strong>Engenheiro de Software</strong>, com foco em arquitetura
            front-end e automação com IA para criação de produtos digitais de
            alto impacto.
          </p>

          <div className="space-y-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="col-span-1 p-8 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] flex flex-col justify-between hover:border-[#111111] transition-colors duration-300">
                <div>
                  <span className="text-sm font-medium text-[#777777] uppercase tracking-widest mb-4 block">
                    Experiência
                  </span>
                  <h3 className="text-6xl font-display font-light text-[#111111] mb-2">
                    {new Date().getFullYear() - 2017}+
                  </h3>
                  <p className="text-[#666666] text-lg font-light">
                    Anos de atuação com tecnologia
                  </p>
                </div>
              </article>

              <article className="col-span-1 md:col-span-2 p-8 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] flex flex-col justify-center hover:border-[#111111] transition-colors duration-300">
                <span className="text-sm font-medium text-[#777777] uppercase tracking-widest mb-6 block">
                  Foco e Formação
                </span>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-[#111111] mb-1">
                      Software Engineer
                    </h3>
                    <p className="text-[#666666] leading-relaxed">
                      CESAR & Unificando Digital • Front-end e Automações com IA
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[#E5E5E5]">
                    <h3 className="text-xl font-medium text-[#111111] mb-1">
                      Arquitetura de Software
                    </h3>
                    <p className="text-[#666666] leading-relaxed">
                      Especialização pela FIAP • Microsoft Specialist Certified
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="mb-20">
            <Link
              href="/curriculo"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#111111] text-white rounded-full font-medium text-sm hover:bg-black transition-colors group"
            >
              Ver currículo completo
              <span className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="transform -rotate-45 block text-xs">→</span>
              </span>
            </Link>
          </div>

          <div className="pt-20 border-t border-[#E5E5E5]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-[#111111] mb-4">
                  Projetos
                </h2>
                <p className="text-xl text-[#666666] font-light">
                  Uma seleção de <strong>{PROJECTS.length} cases</strong> de
                  sucesso.
                </p>
              </div>
              <Link
                href="/projetos"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#E5E5E5] text-[#111111] rounded-full font-medium text-sm hover:border-[#111111] transition-colors group"
              >
                Ver todos os projetos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.slice(0, 2).map((project) => (
                <Link
                  key={project.id}
                  href={project.link}
                  className="group p-8 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] hover:border-[#111111] transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-white border border-[#E5E5E5] text-[#111111] text-xs font-medium rounded-full mb-4">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-medium text-[#111111] mb-2 group-hover:text-[#666666] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#666666] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex justify-end mt-6">
                    <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-20 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-2xl mx-auto hover:border-[#111111] transition-colors duration-300">
            <div className="p-4 bg-[#F9F9F9] rounded-full shrink-0">
              <Accessibility size={24} className="text-[#111111]" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base font-medium text-[#111111] mb-2 uppercase tracking-wider text-xs">
                Acessibilidade e Inclusão (PCD)
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {PROFILE.pcdNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
