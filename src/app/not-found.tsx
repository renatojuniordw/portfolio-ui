"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden text-center selection:bg-text selection:text-bg">
      <div className="fx-rise space-y-8 z-10 max-w-xl">
        <p
          aria-hidden="true"
          className="text-[8rem] md:text-[15rem] font-light leading-none text-text/5 select-none tracking-tighter"
        >
          404
        </p>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-medium text-text tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
            O recurso que você procura não existe ou foi movido.
            Use os links abaixo para voltar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="bg-tech text-on-accent px-8 rounded-full font-medium hover:brightness-110 transition-all w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <Home size={18} className="mr-2" aria-hidden="true" />
              Início
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-8 rounded-full font-medium border-border text-text hover:bg-surface-1 transition-all w-full sm:w-auto"
            onClick={() => { if (window.history.length > 1) window.history.back(); else window.location.href = "/"; }}
          >
            <ArrowLeft size={18} className="mr-2" aria-hidden="true" />
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
