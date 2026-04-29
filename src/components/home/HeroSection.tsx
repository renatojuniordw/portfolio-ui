import Image from "next/image";
import { PROFILE } from "@/lib/constants";

export function HeroSection() {
  return (
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
  );
}
