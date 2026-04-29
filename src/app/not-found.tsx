"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center selection:bg-[#111111] selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 z-10 max-w-xl"
      >
        {/* Hero Text (404) */}
        <h1 className="text-[10rem] md:text-[15rem] font-light leading-none text-[#111111]/5 select-none tracking-tighter">
          404
        </h1>

        {/* Text Area */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-medium text-[#111111] tracking-tight">
            Página não encontrada
          </h2>
          <p className="text-base md:text-lg text-[#666666] max-w-md mx-auto leading-relaxed">
            O recurso que você procura não existe ou foi movido. 
            Use os links abaixo para voltar ao caminho certo.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="bg-[#111111] text-white px-8 rounded-full font-medium hover:bg-[#1A1A1A] transition-all w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <Home size={18} className="mr-2" />
              Início
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-8 rounded-full font-medium border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] transition-all w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

